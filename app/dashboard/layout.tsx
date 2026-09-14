import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar"
import { checkRole } from "@/lib/roles"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAdmin = await checkRole("admin");
  
  if (isAdmin) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen bg-[#FDFDFD] font-sans">
      <div className="hidden md:flex w-[260px] flex-col fixed inset-y-0 z-40 border-r border-gray-100 bg-white">
        <AppSidebar />
      </div>
      <div className="flex flex-1 flex-col md:pl-[260px] min-w-0">
        <DashboardNavbar />
        <main className="flex-1">
          <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
