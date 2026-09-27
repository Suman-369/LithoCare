"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function setHasBusiness(hasBusiness: boolean, mobileNumber?: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const client = await clerkClient();
  
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      hasBusiness,
      ...(mobileNumber ? { mobileNumber } : {}),
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/admin/users");
}
