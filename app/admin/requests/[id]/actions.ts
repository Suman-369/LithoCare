"use server";

import { updateBatteryServiceStatusAdmin } from "@/lib/services/admin-service";
import { BatteryServiceStatus } from "@/types/battery-service";
import { checkRole } from "@/lib/roles";
import { auth } from "@clerk/nextjs/server";

export async function updateAdminRequestStatus(id: string, status: BatteryServiceStatus) {
  const isAdmin = await checkRole("admin");
  const { userId } = await auth();
  
  if (!isAdmin || !userId) {
    throw new Error("Unauthorized");
  }

  await updateBatteryServiceStatusAdmin(id, status, userId);
}
