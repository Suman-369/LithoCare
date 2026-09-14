"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  Bell,
  Search,
  LayoutDashboard,
  BatteryCharging,
  Bike,
  History,
  ArrowLeft,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { UserButton, useUser } from "@clerk/nextjs";

const navItems = [
  {
    title: "MAIN",
    items: [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    title: "SERVICES",
    items: [
      { name: "Two Wheelers", href: "/dashboard/two-wheelers", icon: Bike },
      {
        name: "Battery Service",
        href: "/dashboard/battery-service",
        icon: BatteryCharging,
      },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      { name: "My Requests", href: "/dashboard/requests", icon: History },
    ],
  },
];

export function DashboardNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  // Helper to get a nice title based on the route
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/dashboard/two-wheelers") return "Two Wheeler Products & Services";
    if (pathname === "/dashboard/battery-service") return "Tell us about your battery";
    if (pathname === "/dashboard/requests") return "My Requests";
    if (pathname === "/dashboard/profile") return "Profile";
    if (pathname === "/dashboard/support") return "Help & Support";
    return "Dashboard";
  };

  const isDashboard = pathname === "/dashboard";
  const isBatteryService = pathname === "/dashboard/battery-service";
  const isTwoWheelers = pathname === "/dashboard/two-wheelers";

  return (
    <header className="sticky top-0 z-30 flex min-h-[4rem] items-center gap-4 border-b border-gray-100 bg-white/95 px-4 md:px-6 backdrop-blur-md py-3 md:py-0">
      {/* Mobile Hamburger & Logo */}
      <div className="md:hidden flex items-center gap-3">
        <Sheet>
          <SheetTrigger className="p-2 -ml-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer outline-none">
            <Menu className="w-5 h-5" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[280px] p-0 border-r-0 rounded-r-2xl"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex h-full flex-col bg-white">
              <div className="flex h-16 items-center px-6 border-b border-gray-50">
                <Link
                  href="/dashboard"
                  className="text-2xl font-serif font-bold tracking-wider text-black"
                >
                  LITHOCARE ENERGY
                </Link>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
                {navItems.map((section) => (
                  <div key={section.title}>
                    <h3 className="mb-3 px-2 text-[11px] font-bold text-gray-400 tracking-wider">
                      {section.title}
                    </h3>
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                              isActive
                                ? "bg-gray-900 text-white shadow-sm"
                                : "text-gray-600 hover:text-black hover:bg-gray-50"
                            }`}
                          >
                            <Icon
                              className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`}
                            />
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Link
          href="/dashboard"
          className="text-xl font-serif font-bold tracking-wide text-black block md:hidden"
        >
          LITHOCARE ENERGY
        </Link>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="p-2 -ml-1 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors outline-none flex items-center justify-center shrink-0"
        title="Go back"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Dynamic Route Title & Subtitle */}
      <div className="flex flex-col flex-1 min-w-0 md:justify-center h-full">
        <h1 className="text-lg md:text-xl font-semibold text-gray-900 truncate">
          {getPageTitle()}
        </h1>
        {isDashboard && (
          <p className="text-xs md:text-sm text-gray-500 truncate mt-0.5">
            Welcome back, {user ? user.firstName : "Loading..."}. What would you
            like to take care of today?
          </p>
        )}
        {isTwoWheelers && (
          <p className="text-xs md:text-sm text-gray-500 truncate mt-0.5">
            Explore products designed for your ride. Filter by category to find exactly what you need
          </p>
        )}
        {isBatteryService && (
          <p className="text-xs md:text-sm text-gray-500 truncate mt-0.5">
            Provide a few details about your e-rickshaw battery so we can understand your requirement and schedule a service.
          </p>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 md:gap-4 shrink-0 self-start md:self-center mt-1 md:mt-0">
        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors outline-none hidden sm:block">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center pl-1 sm:pl-2 sm:border-l sm:border-gray-100 h-8">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8 shadow-sm border border-gray-100",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
