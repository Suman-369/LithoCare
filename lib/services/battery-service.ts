import { supabaseAdmin } from "@/lib/supabase/server";
import { BatteryService, CreateBatteryServiceInput, UpdateBatteryServiceInput, BatteryServiceWithHistory } from "@/types/battery-service";

export async function createBatteryService(
  clerkUserId: string,
  input: CreateBatteryServiceInput
): Promise<BatteryService> {
  const { data, error } = await supabaseAdmin
    .from("battery_services")
    .insert({
      clerk_user_id: clerkUserId,
      status: "pending",
      ...input,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create battery service: ${error.message}`);
  }

  return data as BatteryService;
}

export async function getBatteryServices(
  clerkUserId: string,
  page: number = 1,
  limit: number = 10
): Promise<{ data: BatteryService[]; total: number }> {
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabaseAdmin
    .from("battery_services")
    .select("*", { count: "exact" })
    .eq("clerk_user_id", clerkUserId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw new Error(`Failed to get battery services: ${error.message}`);
  }

  return {
    data: data as BatteryService[],
    total: count || 0,
  };
}

export async function getBatteryServiceById(
  id: string,
  clerkUserId: string
): Promise<BatteryService | null> {
  const { data, error } = await supabaseAdmin
    .from("battery_services")
    .select("*")
    .eq("id", id)
    .eq("clerk_user_id", clerkUserId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // Not found
    }
    throw new Error(`Failed to get battery service: ${error.message}`);
  }

  return data as BatteryService;
}

export async function getBatteryServiceWithHistory(
  id: string,
  clerkUserId: string
): Promise<BatteryServiceWithHistory | null> {
  const service = await getBatteryServiceById(id, clerkUserId);
  if (!service) return null;

  const { data: history, error } = await supabaseAdmin
    .from("request_status_history")
    .select("*")
    .eq("request_id", id)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to get request history: ${error.message}`);
  }

  return {
    ...service,
    history: history || [],
  };
}

export async function updateBatteryService(
  id: string,
  clerkUserId: string,
  input: UpdateBatteryServiceInput
): Promise<BatteryService | null> {
  // First, verify ownership
  const existingService = await getBatteryServiceById(id, clerkUserId);
  if (!existingService) {
    return null;
  }

  const { data, error } = await supabaseAdmin
    .from("battery_services")
    .update(input)
    .eq("id", id)
    .eq("clerk_user_id", clerkUserId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update battery service: ${error.message}`);
  }

  // If status changed, log it
  if (input.status && input.status !== existingService.status) {
    let title = "Status Updated";
    let desc = `Request status changed to ${input.status}.`;
    
    if (input.status === 'processing') {
      title = "Service In Progress";
      desc = "Our team is now processing your request.";
    } else if (input.status === 'completed') {
      title = "Service Completed";
      desc = "Your service request has been completed successfully.";
    } else if (input.status === 'cancelled') {
      title = "Request Cancelled";
      desc = "This request has been cancelled.";
    }

    await supabaseAdmin.from("request_status_history").insert({
      request_id: id,
      status: input.status,
      title,
      description: desc,
      created_by: clerkUserId,
    });
  }

  return data as BatteryService;
}

export async function deleteBatteryService(
  id: string,
  clerkUserId: string,
  hardDelete: boolean = false
): Promise<boolean> {
  // Verify ownership
  const existingService = await getBatteryServiceById(id, clerkUserId);
  if (!existingService) {
    return false;
  }

  if (hardDelete) {
    const { error } = await supabaseAdmin
      .from("battery_services")
      .delete()
      .eq("id", id)
      .eq("clerk_user_id", clerkUserId);

    if (error) {
      throw new Error(`Failed to delete battery service: ${error.message}`);
    }
  } else {
    // Soft delete / Cancel
    const { error } = await supabaseAdmin
      .from("battery_services")
      .update({ status: "cancelled" })
      .eq("id", id)
      .eq("clerk_user_id", clerkUserId);

    if (error) {
      throw new Error(`Failed to cancel battery service: ${error.message}`);
    }

    if (existingService.status !== 'cancelled') {
      await supabaseAdmin.from("request_status_history").insert({
        request_id: id,
        status: "cancelled",
        title: "Request Cancelled",
        description: "This request has been cancelled by the user.",
        created_by: clerkUserId,
      });
    }
  }

  return true;
}
