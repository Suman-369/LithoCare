import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getUserRole() {
  const { userId, sessionClaims } = await auth();
  
  if (!userId) {
    return null;
  }

  // Try to get from session claims first (if JWT template is configured)
  if (sessionClaims?.metadata?.role) {
    return sessionClaims.metadata.role as string;
  }

  // Fallback: fetch from clerk client
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    return (user.publicMetadata?.role as string) || "user";
  } catch (error) {
    console.error("Error fetching user role:", error);
    return "user";
  }
}

export async function checkRole(role: string) {
  const userRole = await getUserRole();
  return userRole === role;
}
