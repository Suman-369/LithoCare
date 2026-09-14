import { clerkClient } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { BatteryService, BatteryServiceStatus, BatteryServiceWithHistory } from "@/types/battery-service";

export async function getAllUsers() {
  const client = await clerkClient();
  const users = await client.users.getUserList();
  
  return users.data.map(user => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddresses[0]?.emailAddress,
    imageUrl: user.imageUrl,
    role: (user.publicMetadata?.role as string) || "user",
    createdAt: user.createdAt,
  }));
}

export async function getAllBatteryServices(
  page: number = 1,
  limit: number = 50
): Promise<{ data: BatteryService[]; total: number }> {
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabaseAdmin
    .from("battery_services")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw new Error(`Failed to get all battery services: ${error.message}`);
  }

  return {
    data: data as BatteryService[],
    total: count || 0,
  };
}

export async function getServiceRequestStats() {
  const { data, error } = await supabaseAdmin
    .from("battery_services")
    .select("status");

  if (error) {
    throw new Error(`Failed to get stats: ${error.message}`);
  }

  const stats = {
    pending: 0,
    processing: 0,
    completed: 0,
    cancelled: 0,
    total: data.length
  };

  data.forEach((req) => {
    if (stats[req.status as keyof typeof stats] !== undefined) {
      stats[req.status as keyof typeof stats]++;
    }
  });

  return stats;
}

export async function getBatteryServiceByIdAdmin(id: string): Promise<BatteryServiceWithHistory | null> {
  const { data: service, error: serviceError } = await supabaseAdmin
    .from("battery_services")
    .select("*")
    .eq("id", id)
    .single();

  if (serviceError) {
    if (serviceError.code === "PGRST116") return null;
    throw new Error(`Failed to get service: ${serviceError.message}`);
  }

  const { data: history, error: historyError } = await supabaseAdmin
    .from("request_status_history")
    .select("*")
    .eq("request_id", id)
    .order("created_at", { ascending: true });

  if (historyError) {
    throw new Error(`Failed to get history: ${historyError.message}`);
  }

  return {
    ...(service as BatteryService),
    history: history || [],
  };
}

export async function updateBatteryServiceStatusAdmin(id: string, status: BatteryServiceStatus, adminUserId: string): Promise<void> {
  const { data: existingService, error: fetchError } = await supabaseAdmin
    .from("battery_services")
    .select("status")
    .eq("id", id)
    .single();

  if (fetchError || !existingService) {
    throw new Error("Service request not found.");
  }

  if (existingService.status === status) return;

  const { error: updateError } = await supabaseAdmin
    .from("battery_services")
    .update({ status })
    .eq("id", id);

  if (updateError) {
    throw new Error(`Failed to update status: ${updateError.message}`);
  }

  let title = "Status Updated";
  let desc = `Request status changed to ${status}.`;
  
  if (status === 'processing') {
    title = "Service In Progress";
    desc = "Our team is now processing your request.";
  } else if (status === 'completed') {
    title = "Service Completed";
    desc = "Your service request has been completed successfully.";
  } else if (status === 'cancelled') {
    title = "Request Cancelled";
    desc = "This request has been cancelled by the administration.";
  }

  await supabaseAdmin.from("request_status_history").insert({
    request_id: id,
    status,
    title,
    description: desc,
    created_by: adminUserId, // Record the admin who made the change
  });
}
