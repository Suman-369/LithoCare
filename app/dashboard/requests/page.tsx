import { auth } from "@clerk/nextjs/server";
import { getBatteryServices } from "@/lib/services/battery-service";
import Link from "next/link";
import { ChevronRight, BatteryCharging, ArrowRight } from "lucide-react";
import { RequestStatusBadge } from "@/components/dashboard/request-status-badge";
import { BatteryService } from "@/types/battery-service";

export const metadata = {
  title: "My Requests - LITHOCARE",
  description: "Track and manage your battery service requests.",
};

export default async function RequestsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { userId } = await auth();
  const resolvedParams = await searchParams;
  const currentFilter = (resolvedParams?.status as string) || "all";
  
  if (!userId) return null;

  // Fetch all requests (pagination can be added later via searchParams)
  let requests: BatteryService[] = [];
  let total = 0;
  
  try {
    const res = await getBatteryServices(userId, 1, 100);
    requests = res.data;
    total = res.total;
  } catch (error) {
    console.error("Failed to fetch requests:", error);
  }

  const pending = requests.filter(r => r.status === "pending").length;
  const inProgress = requests.filter(r => r.status === "processing").length;
  const completed = requests.filter(r => r.status === "completed").length;

  const filteredRequests = currentFilter === "all" 
    ? requests 
    : requests.filter(r => r.status === currentFilter);

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">My Requests</h1>
        <p className="text-sm text-gray-500 mt-1">Track and manage all your service requests in one place.</p>
      </div>

      {/* Summary Cards as Clickable Filters */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        <Link 
          href="/dashboard/requests?status=all"
          className={`bg-white rounded-xl border p-3 sm:p-4 shadow-sm flex flex-col justify-center text-center sm:text-left transition-all ${currentFilter === "all" ? "border-black ring-1 ring-black bg-gray-50/50" : "border-gray-100 hover:border-gray-300"}`}
        >
          <p className="text-[10px] sm:text-[13px] font-medium text-gray-500 mb-0.5 truncate">Total</p>
          <p className="text-lg sm:text-xl font-semibold text-gray-900">{total}</p>
        </Link>
        <Link 
          href="/dashboard/requests?status=pending"
          className={`bg-white rounded-xl border p-3 sm:p-4 shadow-sm flex flex-col justify-center text-center sm:text-left transition-all ${currentFilter === "pending" ? "border-black ring-1 ring-black bg-gray-50/50" : "border-gray-100 hover:border-gray-300"}`}
        >
          <p className="text-[10px] sm:text-[13px] font-medium text-gray-500 mb-0.5 truncate">Pending</p>
          <p className="text-lg sm:text-xl font-semibold text-gray-900">{pending}</p>
        </Link>
        <Link 
          href="/dashboard/requests?status=processing"
          className={`bg-white rounded-xl border p-3 sm:p-4 shadow-sm flex flex-col justify-center text-center sm:text-left transition-all ${currentFilter === "processing" ? "border-black ring-1 ring-black bg-gray-50/50" : "border-gray-100 hover:border-gray-300"}`}
        >
          <p className="text-[10px] sm:text-[13px] font-medium text-gray-500 mb-0.5 truncate">Working</p>
          <p className="text-lg sm:text-xl font-semibold text-gray-900">{inProgress}</p>
        </Link>
        <Link 
          href="/dashboard/requests?status=completed"
          className={`bg-white rounded-xl border p-3 sm:p-4 shadow-sm flex flex-col justify-center text-center sm:text-left transition-all ${currentFilter === "completed" ? "border-black ring-1 ring-black bg-gray-50/50" : "border-gray-100 hover:border-gray-300"}`}
        >
          <p className="text-[10px] sm:text-[13px] font-medium text-gray-500 mb-0.5 truncate">Completed</p>
          <p className="text-lg sm:text-xl font-semibold text-gray-900">{completed}</p>
        </Link>
      </div>

      {/* Requests List */}
      <div className="bg-white sm:bg-transparent rounded-2xl sm:rounded-none border sm:border-0 border-gray-100 shadow-sm sm:shadow-none overflow-hidden sm:overflow-visible">
        {filteredRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
              <BatteryCharging className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No requests found</h3>
            <p className="text-sm text-gray-500 mt-2 max-w-sm">
              {currentFilter === "all" ? "You haven't submitted any service requests yet." : `You don't have any ${currentFilter} requests.`}
            </p>
            {currentFilter === "all" ? (
              <Link 
                href="/dashboard/battery-service" 
                className="mt-6 px-5 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition-colors"
              >
                Create a Request
              </Link>
            ) : (
              <Link 
                href="/dashboard/requests?status=all" 
                className="mt-6 px-5 py-2.5 bg-gray-100 text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear Filter
              </Link>
            )}
          </div>
        ) : (
          <ul className="flex flex-col divide-y divide-gray-50">
            {filteredRequests.map(req => {
              const dateStr = new Date(req.created_at).toLocaleDateString('en-US', { 
                month: 'short', day: 'numeric', year: 'numeric' 
              });
              
              const updatedStr = new Date(req.updated_at).toLocaleDateString('en-US', { 
                month: 'short', day: 'numeric'
              });

              return (
                <li key={req.id} className="w-full">
                  <Link 
                    href={`/dashboard/requests/${req.id}`}
                    className="block px-4 py-4 sm:px-5 hover:bg-gray-50/70 transition-colors group"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                      
                      <div className="flex items-center gap-3 w-full">
                        {/* Image Thumbnail */}
                        {req.battery_image_url ? (
                          <div className="w-12 h-12 rounded-lg border border-gray-200 overflow-hidden shrink-0 bg-gray-50">
                            <img src={req.battery_image_url} alt="Battery" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center shrink-0">
                            <BatteryCharging className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        
                        {/* Core Content */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 truncate">
                                {req.battery_brand} {req.battery_type}
                              </h3>
                              <RequestStatusBadge status={req.status} className="sm:hidden shrink-0 scale-90 origin-right" />
                            </div>
                            <RequestStatusBadge status={req.status} className="hidden sm:inline-flex px-2 py-0.5" />
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 text-[12px] text-gray-500 font-medium">
                            <span className="text-gray-900 font-semibold">{req.request_number || "REQ-PENDING"}</span>
                            <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                            <span className="truncate">Submitted {dateStr}</span>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Right Info */}
                      <div className="hidden sm:flex items-center justify-end gap-5 shrink-0 ml-auto">
                        <div className="text-right">
                          <p className="text-[12px] text-gray-500 font-medium">Last updated</p>
                          <p className="text-[12px] text-gray-900 font-medium">{updatedStr}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600 transition-colors shrink-0" />
                      </div>

                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
