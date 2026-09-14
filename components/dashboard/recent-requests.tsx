import Link from "next/link";
import { ChevronRight, BatteryCharging } from "lucide-react";
import { getBatteryServices } from "@/lib/services/battery-service";
import { auth } from "@clerk/nextjs/server";
import { BatteryService } from "@/types/battery-service";
import { RequestStatusBadge } from "./request-status-badge";

export async function RecentRequests() {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }
  
  let services: BatteryService[] = [];
  try {
    const res = await getBatteryServices(userId, 1, 4);
    services = res.data;
  } catch (error) {
    console.error("Failed to fetch recent requests:", error);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="px-5 py-4 border-b border-gray-50 flex justify-between items-center">
        <h2 className="text-[15px] font-semibold text-gray-900 tracking-tight">Recent Requests</h2>
      </div>
      
      <div className="flex-1 p-0 flex flex-col">
        {services.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500 text-sm">
            <p>You haven&apos;t submitted any service requests.</p>
            <Link href="/dashboard/battery-service" className="text-black font-medium mt-2 hover:underline">
              Create a Request
            </Link>
          </div>
        ) : (
          <div className="flex flex-col h-full justify-between">
            <ul className="divide-y divide-gray-50">
              {services.map((req) => {
                const dateStr = req.created_at ? new Date(req.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "";
                
                return (
                  <li key={req.id}>
                    <Link href={`/dashboard/requests/${req.id}`} className="block px-5 py-3.5 hover:bg-gray-50/70 transition-colors group">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-white group-hover:border-gray-200 transition-colors shrink-0">
                            <BatteryCharging className="w-4 h-4 text-gray-500" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-[13px] font-medium text-gray-900 truncate">
                              {req.battery_brand} {req.battery_type}
                            </h4>
                            <p className="text-[11px] text-gray-500 mt-0.5 font-medium">{req.request_number || "REQ-PENDING"}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 shrink-0">
                          <RequestStatusBadge status={req.status} className="hidden sm:inline-flex" />
                          <div className="text-right">
                            <span className="block text-[11px] text-gray-400 font-medium">{dateStr}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
            
            <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/30">
              <Link href="/dashboard/requests" className="text-[13px] font-medium text-gray-600 hover:text-black flex items-center justify-center gap-1.5 transition-colors">
                View all requests <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
