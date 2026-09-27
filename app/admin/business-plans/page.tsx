import { getAllBusinessPlanRequests } from "@/lib/services/business-plan-service";
import { GraduationCap, CheckCircle, Clock, XCircle, MoreVertical } from "lucide-react";
import { acceptPlanRequest, markPlanAsPending, cancelPlanRequest } from "./actions";

export default async function AdminBusinessPlansPage() {
  const { data: plans } = await getAllBusinessPlanRequests(1, 100);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Business Plan Requests</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage users who have requested to purchase learning plans.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Business Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">{new Date(plan.created_at).toLocaleDateString('en-GB')}</p>
                    <p className="text-xs text-gray-400">{new Date(plan.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">{plan.business_name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{plan.phone_number}</p>
                    {plan.reason && (
                      <p className="text-xs text-gray-400 mt-1 max-w-[200px] truncate" title={plan.reason}>
                        "{plan.reason}"
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-900">{plan.plan_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {plan.status === "accepted" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                        <CheckCircle className="w-3.5 h-3.5" /> Accepted
                      </span>
                    ) : plan.status === "rejected" || plan.status === "cancelled" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                        <XCircle className="w-3.5 h-3.5" /> Cancelled
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end items-center gap-2">
                      {plan.status === "pending" && (
                        <>
                          <form action={acceptPlanRequest.bind(null, plan.id)}>
                            <button type="submit" className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors">
                              Accept
                            </button>
                          </form>
                          <form action={cancelPlanRequest.bind(null, plan.id)}>
                            <button type="submit" className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors">
                              Cancel
                            </button>
                          </form>
                        </>
                      )}
                      {(plan.status === "accepted" || plan.status === "cancelled") && (
                        <form action={markPlanAsPending.bind(null, plan.id)}>
                          <button type="submit" className="text-amber-600 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors">
                            Mark Pending
                          </button>
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {plans.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <GraduationCap className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No requests yet</h3>
                    <p className="text-gray-500 text-sm">When users request a business plan, they will appear here.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
