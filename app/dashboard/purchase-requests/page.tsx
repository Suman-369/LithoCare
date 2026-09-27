import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserBusinessPlans } from "@/lib/services/business-plan-service";
import { GraduationCap, Clock, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { PaymentButton } from "@/components/dashboard/payment-button";

export default async function PurchaseRequestsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const plans = await getUserBusinessPlans(userId);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Purchase Requests</h1>
        <p className="text-gray-500 mt-2">Track the status of your business learning plans.</p>
      </div>

      {plans.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Plans Requested</h2>
          <p className="text-gray-500 mb-6">You haven't requested any business learning plans yet.</p>
          <Link 
            href="/dashboard/plans"
            className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors"
          >
            Explore Plans
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-gray-900">{plan.plan_name} Plan</h2>
                  {plan.status === "accepted" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                      <CheckCircle className="w-3.5 h-3.5" /> Request Accepted
                    </span>
                  ) : plan.status === "rejected" || plan.status === "cancelled" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                      <XCircle className="w-3.5 h-3.5" /> Cancelled
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      <Clock className="w-3.5 h-3.5" /> Payment Pending
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500 space-y-1">
                  <p><strong>Business:</strong> {plan.business_name}</p>
                  <p><strong>Requested on:</strong> {new Date(plan.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
              
              <div className="shrink-0 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6 text-left sm:text-right">
                {plan.status === "pending" ? (
                  <>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Action Required</p>
                    <PaymentButton planName={plan.plan_name} />
                  </>
                ) : plan.status === "accepted" ? (
                  <>
                    <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">Active</p>
                    <p className="text-sm text-gray-500">Your plan is active.</p>
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
