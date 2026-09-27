import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SetupForm } from "./setup-form";

export default async function SetupPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  if (user.publicMetadata?.hasBusiness !== undefined) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-900">
          Welcome to LITHOCARE ENERGY!
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          To help us tailor your experience, please tell us: <br />
          <strong>Do you own or manage a business?</strong>
        </p>
        
        <SetupForm userId={userId} />
      </div>
    </div>
  );
}
