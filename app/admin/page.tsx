import { Users, Briefcase, ChevronRight, Clock, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { getAllUsers, getAllBatteryServices, getServiceRequestStats } from "@/lib/services/admin-service";
import { RequestStatusBadge } from "@/components/dashboard/request-status-badge";

export default async function AdminDashboardPage() {
  const users = await getAllUsers();
  const { data: requests } = await getAllBatteryServices(1, 100);
  const stats = await getServiceRequestStats();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-500">Total Users</p>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{users.length}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-500">Total Requests</p>
            <Briefcase className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-500">Pending</p>
            <Clock className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-500">Processing</p>
            <AlertCircle className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.processing}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-500">Resolved</p>
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-500">Cancelled</p>
            <XCircle className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
        </div>

      </div>

      {/* All Service Requests Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mt-6">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50/80 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-800">All Service Requests</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] whitespace-nowrap border-collapse">
            <thead className="bg-gray-100 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-4 py-2.5 border-r border-gray-200">Request No.</th>
                <th className="px-4 py-2.5 border-r border-gray-200">Name</th>
                <th className="px-4 py-2.5 border-r border-gray-200">Battery Type</th>
                <th className="px-4 py-2.5 border-r border-gray-200">Status</th>
                <th className="px-4 py-2.5 border-r border-gray-200">Date</th>
                <th className="px-4 py-2.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-blue-50/50 transition-colors even:bg-gray-50/30">
                  <td className="px-4 py-2 border-r border-gray-200 font-medium text-gray-900">
                    {req.request_number || "PENDING"}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-200 font-medium text-gray-800">
                    {req.customer_name || "Unknown"}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-200">
                    {req.battery_brand} {req.battery_type}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-200">
                    <RequestStatusBadge status={req.status} className="scale-90 origin-left" />
                  </td>
                  <td className="px-4 py-2 border-r border-gray-200 text-gray-500">
                    {req.created_at ? new Date(req.created_at).toLocaleDateString('en-GB') : ""}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Link 
                      href={`/admin/requests/${req.id}`}
                      className="inline-flex items-center justify-center p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="View Details"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No service requests found.
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
