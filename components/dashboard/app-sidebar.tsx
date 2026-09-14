"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BatteryCharging,
  Bike,
  History,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser, useClerk } from "@clerk/nextjs";

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

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Brand */}
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link
          href="/dashboard"
          className="text-2xl font-serif font-bold tracking-wider text-black"
        >
          LITHOCARE ENERGY
        </Link>
      </div>

      {/* Nav */}
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4 space-y-8">
        {navItems.map((section) => (
          <div key={section.title}>
            <h3 className="mb-2 px-2 text-xs font-semibold text-gray-400 tracking-wider">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || (item.href === "/dashboard/requests" && pathname.startsWith("/dashboard/requests/"));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-gray-100/80 text-black"
                        : "text-gray-500 hover:text-black hover:bg-gray-50"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${isActive ? "text-black" : "text-gray-400"}`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Area */}
      <div className="p-4 border-t border-gray-100">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-xl p-2 hover:bg-gray-50 transition-colors outline-none cursor-pointer">
            <Avatar className="h-9 w-9 border border-gray-100">
              <AvatarImage src={user?.imageUrl || ""} />
              <AvatarFallback className="bg-black text-white text-xs">
                {user?.firstName?.charAt(0) || ""}
                {user?.lastName?.charAt(0) || ""}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col text-left overflow-hidden">
              <span className="text-sm font-semibold text-gray-900 leading-none truncate">
                {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
              </span>
              <span className="text-xs text-gray-500 mt-1 truncate">
                {user?.primaryEmailAddress?.emailAddress || ""}
              </span>
            </div>
            <div className="text-gray-400 px-1 shrink-0">⋮</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[220px] rounded-xl shadow-sm border-gray-100"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none truncate">
                  {user ? `${user.firstName} ${user.lastName}` : ""}
                </p>
                <p className="text-xs leading-none text-muted-foreground truncate">
                  {user?.primaryEmailAddress?.emailAddress || ""}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-sm">
              <User className="mr-2 h-4 w-4 text-gray-500" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm">
              <Settings className="mr-2 h-4 w-4 text-gray-500" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-sm text-red-600 focus:text-red-600"
              onClick={() => signOut({ redirectUrl: "/" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
