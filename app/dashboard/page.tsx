import Link from "next/link";
import { BatteryWarning, GraduationCap, ArrowRight, Wrench } from "lucide-react";
import { SupportCard } from "@/components/dashboard/support-card";

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Services Overview</h1>
        <p className="text-gray-500 mt-2">Select an option below to proceed.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Battery Complaint */}
        <div className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <Wrench className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Register Battery Complaint</h2>
          <p className="text-gray-500 mb-8 flex-grow text-sm leading-relaxed">
            Register your complaint or request assistance regarding your battery. Our technical team will assist you with inspection and service.
          </p>
          <Link 
            href="/dashboard/battery-service"
            className="inline-flex items-center justify-center gap-2 w-full bg-black text-white px-5 py-3.5 rounded-xl font-medium hover:bg-gray-900 transition-colors"
          >
            Register Complaint
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Card 2: Business Plan */}
        <div className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Business Learning Plan</h2>
          <p className="text-gray-500 mb-8 flex-grow text-sm leading-relaxed">
            If you own a business, purchase our exclusive plan to learn comprehensive battery services and grow your expertise.
          </p>
          <Link 
            href="/dashboard/plans"
            className="inline-flex items-center justify-center gap-2 w-full bg-white border border-gray-200 text-gray-900 px-5 py-3.5 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Purchase Plan
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      <section className="w-full mt-6">
        <SupportCard />
      </section>
    </div>
  );
}
