import { Suspense } from "react";
import { BatteryCharging, Bike } from "lucide-react";
import { ServiceCard } from "@/components/dashboard/service-card";
import { RecentRequests } from "@/components/dashboard/recent-requests";
import { SupportCard } from "@/components/dashboard/support-card";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Services column - smaller cards */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Services</h2>
            <p className="text-sm text-gray-500 mt-1">Choose a service to get started.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
            <ServiceCard 
              title="E-Rickshaw Battery Service"
              description="Get assistance with battery inspection, replacement and service requests."
              icon={BatteryCharging}
              href="/dashboard/battery-service"
              badge="Available"
              badgeVariant="default"
              accentClass="bg-green-50 text-green-600"
              ctaText="Apply service"
              image="/images/b1.png"
            />
            <ServiceCard 
              title="Two Wheeler Services"
              description="Explore products and solutions for your two-wheeler."
              icon={Bike}
              href="/dashboard/two-wheelers"
              badge="Products"
              badgeVariant="secondary"
              accentClass="bg-blue-50 text-blue-600"
              ctaText="Apply service"
              image="/images/image1.png"
            />
          </div>
        </div>

        {/* Recent requests next to the services */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="mb-4 lg:hidden"></div>
          <div className="flex-grow pt-0 lg:pt-[3.25rem]">
            <Suspense fallback={<div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center text-sm text-gray-500">Loading requests...</div>}>
              <RecentRequests />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="w-full">
        <SupportCard />
      </section>
    </div>
  );
}
