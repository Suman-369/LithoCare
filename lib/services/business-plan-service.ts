import { supabaseAdmin } from "@/lib/supabase/server";
import { BusinessPlanRequest, CreateBusinessPlanRequestInput } from "@/types/business-plan";

export async function createBusinessPlanRequest(
  clerkUserId: string,
  input: CreateBusinessPlanRequestInput
): Promise<BusinessPlanRequest> {
  const { data, error } = await supabaseAdmin
    .from("business_plan_requests")
    .insert({
      clerk_user_id: clerkUserId,
      status: "pending",
      ...input,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create business plan request: ${error.message}`);
  }

  return data as BusinessPlanRequest;
}

export async function getAllBusinessPlanRequests(
  page: number = 1,
  limit: number = 20
): Promise<{ data: BusinessPlanRequest[]; total: number }> {
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabaseAdmin
    .from("business_plan_requests")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw new Error(`Failed to get business plan requests: ${error.message}`);
  }

  return {
    data: data as BusinessPlanRequest[],
    total: count || 0,
  };
}

export async function getUserBusinessPlans(
  clerkUserId: string
): Promise<BusinessPlanRequest[]> {
  const { data, error } = await supabaseAdmin
    .from("business_plan_requests")
    .select("*")
    .eq("clerk_user_id", clerkUserId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to get user business plans: ${error.message}`);
  }

  return data as BusinessPlanRequest[];
}

export async function updateBusinessPlanStatus(
  id: string,
  status: string
): Promise<BusinessPlanRequest> {
  const { data, error } = await supabaseAdmin
    .from("business_plan_requests")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update business plan status: ${error.message}`);
  }

  return data as BusinessPlanRequest;
}
