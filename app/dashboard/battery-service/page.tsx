import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BatteryServiceForm } from "@/components/dashboard/battery-service-form";

export default function BatteryServicePage() {
  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm font-medium text-gray-500 mb-2">
        <Link href="/dashboard" className="hover:text-black transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900">Battery Service</span>
      </nav>

      {/* Header moved to navbar */}

      <BatteryServiceForm />
    </div>
  );
}
