import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminNavbar } from "@/components/admin/admin-navbar"
import { checkRole } from "@/lib/roles"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAdmin = await checkRole("admin");
  
  if (!isAdmin) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-[#FDFDFD] font-sans">
      <div className="hidden md:flex w-[260px] flex-col fixed inset-y-0 z-40 border-r border-gray-100 bg-white">
        <AdminSidebar />
      </div>
      <div className="flex flex-1 flex-col md:pl-[260px] min-w-0">
        <AdminNavbar />
        <main className="flex-1">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
