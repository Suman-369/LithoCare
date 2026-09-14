import { auth } from "@clerk/nextjs/server";
import { getBatteryServiceWithHistory } from "@/lib/services/battery-service";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, User, BatteryCharging, Tag } from "lucide-react";
import { RequestStatusBadge } from "@/components/dashboard/request-status-badge";
import { RequestTimeline } from "@/components/requests/request-timeline";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return {
    title: `Request Details - LITHOCARE`,
  };
}

export default async function RequestTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  const resolvedParams = await params;
  
  if (!userId) return null;

  const request = await getBatteryServiceWithHistory(resolvedParams.id, userId);

  if (!request) {
    notFound();
  }

  const dateStr = new Date(request.created_at).toLocaleDateString('en-US', { 
    month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
  });

  return (
    <div className="max-w-5xl mx-auto pb-10">
      
      {/* Back Navigation & Actions */}
      <div className="mb-6 flex items-center justify-between">
        <Link 
          href="/dashboard/requests" 
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to My Requests
        </Link>

        {/* Mobile Call Button */}
        <a 
          href="tel:+919382802304"
          className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-green-50 text-green-700 border border-green-100 active:bg-green-100 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" /> Call Support
        </a>
      </div>

      {/* Unified Top Section & Timeline */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        
        {/* Top Details (Side-by-side on all screens) */}
        <div className="p-4 sm:p-8 grid grid-cols-2 gap-4 sm:gap-8 border-b border-gray-50">
          
          {/* Left: Request Identity */}
          <div className="flex flex-col justify-center min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
              <RequestStatusBadge status={request.status} className="px-2 py-0.5 text-[10px] sm:text-xs" />
              <span className="text-[11px] sm:text-sm font-semibold text-gray-900 truncate">{request.request_number || "REQ-PENDING"}</span>
            </div>
            <h1 className="text-base sm:text-2xl font-semibold text-gray-900 tracking-tight mb-1 sm:mb-2 truncate">
              {request.battery_brand} {request.battery_type}
            </h1>
            <p className="text-[10px] sm:text-[13px] text-gray-500 font-medium truncate">
              Submitted {new Date(request.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
            </p>
          </div>

          {/* Right: Customer Info Card */}
          <div className="bg-gray-50/50 rounded-xl p-3 sm:p-5 border border-gray-100 flex flex-col justify-center min-w-0">
            <div className="flex flex-col space-y-2.5 sm:space-y-4">
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5 sm:mb-1 flex items-center gap-1"><User className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" /> Customer</p>
                <p className="text-[11px] sm:text-sm font-medium text-gray-900 truncate">{request.customer_name}</p>
              </div>
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5 sm:mb-1 flex items-center gap-1"><Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" /> Phone</p>
                <p className="text-[11px] sm:text-sm font-medium text-gray-900 truncate">{request.phone_number}</p>
              </div>
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5 sm:mb-1 flex items-center gap-1"><MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" /> Address</p>
                <p className="text-[11px] sm:text-sm font-medium text-gray-900 truncate">{request.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="p-5 sm:p-8 bg-gray-50/30">
          <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-6">Tracking Progress</h2>
          <RequestTimeline 
            currentStatus={request.status} 
            history={request.history} 
            createdAt={request.created_at} 
          />
        </div>
      </div>

      <div className="space-y-6">
        {/* Battery Info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-50">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-400" /> Battery Information
            </h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              {request.battery_image_url ? (
                <img 
                  src={request.battery_image_url} 
                  alt="Battery" 
                  className="w-20 h-20 rounded-xl border border-gray-200 object-cover bg-gray-50 shrink-0" 
                />
              ) : (
                <div className="w-20 h-20 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center shrink-0">
                  <BatteryCharging className="w-8 h-8 text-gray-300" />
                </div>
              )}
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Brand</p>
                  <p className="text-[15px] font-semibold text-gray-900">{request.battery_brand}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Type</p>
                  <p className="text-[15px] font-medium text-gray-700">{request.battery_type}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
