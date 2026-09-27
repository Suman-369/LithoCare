import { Check } from "lucide-react";
import Link from "next/link";

export default function PlansPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {/* Basic Plan */}
        <div className="flex flex-col bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-gray-50 to-transparent opacity-50 pointer-events-none"></div>

          <div className="relative z-10 flex-grow flex flex-col">
            <div className="mb-8">
              <span className="inline-block px-5 py-2 bg-[#2c2c2e] text-white text-sm font-semibold rounded-full mb-6">
                Basic
              </span>
              <div className="flex items-center text-gray-800 font-medium">
                <div className="w-0.5 h-5 bg-gray-300 mr-3 rounded-full"></div>
                Optimized for individuals
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow text-sm text-gray-600 font-medium">
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-900 shrink-0"
                  strokeWidth={2.5}
                />
                2 Weeks / Training Sprint
              </li>
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-900 shrink-0"
                  strokeWidth={2.5}
                />
                Basic Battery Inspection
              </li>
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-900 shrink-0"
                  strokeWidth={2.5}
                />
                Lead-Acid Maintenance
              </li>
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-900 shrink-0"
                  strokeWidth={2.5}
                />
                Standard Support
              </li>
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-900 shrink-0"
                  strokeWidth={2.5}
                />
                Bi-weekly Q&A Meeting
              </li>
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-900 shrink-0"
                  strokeWidth={2.5}
                />
                Limited Service Manuals
              </li>
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-900 shrink-0"
                  strokeWidth={2.5}
                />
                Pause or cancel anytime
              </li>
            </ul>

            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-gray-900">₹5000</span>
              <span className="text-sm font-medium text-gray-500">/mo</span>
            </div>

            <Link 
              href="/dashboard/plans/checkout?plan=Basic"
              className="flex w-full justify-center py-3.5 bg-[#1c1c1e] text-white rounded-2xl font-semibold shadow-[0_8px_20px_rgb(0,0,0,0.2)] hover:bg-black transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Growth Plan */}
        <div className="flex flex-col bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-purple-50 to-transparent opacity-50 pointer-events-none"></div>

          <div className="relative z-10 flex-grow flex flex-col">
            <div className="mb-8">
              <span className="inline-block px-5 py-2 bg-[#7c5bfa] text-white text-sm font-semibold rounded-full mb-6">
                Growth
              </span>
              <div className="flex items-center text-gray-800 font-medium">
                <div className="w-0.5 h-5 bg-gray-300 mr-3 rounded-full"></div>
                Optimized for large projects
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow text-sm text-gray-600 font-medium">
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-900 shrink-0"
                  strokeWidth={2.5}
                />
                1 Week / Fast-track Sprint
              </li>
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-900 shrink-0"
                  strokeWidth={2.5}
                />
                Advanced Diagnostics
              </li>
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-900 shrink-0"
                  strokeWidth={2.5}
                />
                Lithium-Ion Expertise
              </li>
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-900 shrink-0"
                  strokeWidth={2.5}
                />
                Priority Support
              </li>
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-900 shrink-0"
                  strokeWidth={2.5}
                />
                Weekly Training Meeting
              </li>
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-900 shrink-0"
                  strokeWidth={2.5}
                />
                Unlimited tasks & revisions
              </li>
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-900 shrink-0"
                  strokeWidth={2.5}
                />
                Pause or cancel anytime
              </li>
            </ul>

            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-gray-900">₹10,000</span>
              <span className="text-sm font-medium text-gray-500">/mo</span>
            </div>

            <Link 
              href="/dashboard/plans/checkout?plan=Growth"
              className="flex w-full justify-center py-3.5 bg-gradient-to-r from-[#6b4efa] to-[#8c74fc] text-white rounded-2xl font-semibold shadow-[0_8px_20px_rgba(124,91,250,0.3)] hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="flex flex-col bg-[#1f1f22] rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.1)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#2c2c2e] to-transparent opacity-50 pointer-events-none"></div>

          <div className="relative z-10 flex-grow flex flex-col">
            <div className="mb-8">
              <span className="inline-block px-5 py-2 bg-[#2c2c2e] text-gray-200 border border-gray-700 text-sm font-semibold rounded-full mb-6">
                Most Popular
              </span>
              <div className="flex items-center text-gray-100 font-medium">
                <div className="w-0.5 h-5 bg-gray-600 mr-3 rounded-full"></div>
                Optimized for your needs
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow text-sm text-gray-300 font-medium">
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-200 shrink-0"
                  strokeWidth={2.5}
                />
                Custom Training Sprint
              </li>
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-200 shrink-0"
                  strokeWidth={2.5}
                />
                2 Dedicated Master Technicians
              </li>
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-200 shrink-0"
                  strokeWidth={2.5}
                />
                Full EV Battery Overhaul
              </li>
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-200 shrink-0"
                  strokeWidth={2.5}
                />
                24/7 Priority Support
              </li>
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-200 shrink-0"
                  strokeWidth={2.5}
                />
                Custom Development Meeting
              </li>
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-200 shrink-0"
                  strokeWidth={2.5}
                />
                Unlimited tasks & revisions
              </li>
              <li className="flex items-center gap-3">
                <Check
                  className="w-4 h-4 text-gray-200 shrink-0"
                  strokeWidth={2.5}
                />
                Pause or cancel anytime
              </li>
            </ul>

            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">₹20,000</span>
              <span className="text-sm font-medium text-gray-500">/mo</span>
            </div>

            <Link 
              href="/dashboard/plans/checkout?plan=Enterprise"
              className="flex w-full justify-center py-3.5 bg-gradient-to-r from-[#6b4efa] to-[#8c74fc] text-white rounded-2xl font-semibold shadow-[0_8px_20px_rgba(124,91,250,0.3)] hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
