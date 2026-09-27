"use server";

import { updateBusinessPlanStatus } from "@/lib/services/business-plan-service";
import { revalidatePath } from "next/cache";

export async function acceptPlanRequest(id: string) {
  await updateBusinessPlanStatus(id, "accepted");
  revalidatePath("/admin/business-plans");
}

export async function markPlanAsPending(id: string) {
  await updateBusinessPlanStatus(id, "pending");
  revalidatePath("/admin/business-plans");
}

export async function cancelPlanRequest(id: string) {
  await updateBusinessPlanStatus(id, "cancelled");
  revalidatePath("/admin/business-plans");
}
