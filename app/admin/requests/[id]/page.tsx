import { getBatteryServiceByIdAdmin } from "@/lib/services/admin-service";
import { notFound } from "next/navigation";
import { RequestStatusBadge } from "@/components/dashboard/request-status-badge";
import { ArrowLeft, User, Phone, MapPin, BatteryCharging, Calendar, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { AdminStatusUpdater } from "./admin-status-updater";
import Image from "next/image";

export default async function AdminRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const service = await getBatteryServiceByIdAdmin(resolvedParams.id);

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/admin"
          className="p-2 -ml-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            {service.request_number || "PENDING"}
            <RequestStatusBadge status={service.status} />
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Submitted on {new Date(service.created_at).toLocaleString('en-GB')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-50 pb-4">Customer Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-2 mb-1"><User className="w-4 h-4"/> Name</p>
                <p className="font-medium text-gray-900">{service.customer_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-2 mb-1"><Phone className="w-4 h-4"/> Phone</p>
                <p className="font-medium text-gray-900">{service.phone_number}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500 flex items-center gap-2 mb-1"><MapPin className="w-4 h-4"/> Address</p>
                <p className="font-medium text-gray-900">{service.address}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-50 pb-4">Battery Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-2 mb-1"><BatteryCharging className="w-4 h-4"/> Brand & Type</p>
                <p className="font-medium text-gray-900">{service.battery_brand} - {service.battery_type}</p>
              </div>
            </div>

            {service.battery_image_url && (
              <div className="mt-6">
                <p className="text-sm text-gray-500 flex items-center gap-2 mb-3"><ImageIcon className="w-4 h-4"/> Attached Image</p>
                <div className="relative h-64 w-full rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                  <Image 
                    src={service.battery_image_url} 
                    alt="Battery" 
                    fill 
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Actions & Status */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-50 pb-4">Update Status</h2>
            <AdminStatusUpdater currentStatus={service.status} requestId={service.id} />
          </div>

          {/* Status Timeline */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-50 pb-4">Timeline</h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              {service.history.map((item, index) => (
                <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-600 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-slate-200 shadow-sm bg-white">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-slate-900 text-sm">{item.title}</div>
                      <time className="text-xs text-slate-500">{new Date(item.created_at).toLocaleDateString('en-GB')}</time>
                    </div>
                    <div className="text-slate-500 text-xs">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
