import { PropsWithChildren } from "react"
import AdminSidebar from "@/components/admin-sidebar"
import AdminHeader from "@/components/admin-header"

interface AdminLayoutProps extends PropsWithChildren {
  title?: string
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader title={title ?? "Admin"} />
        <main className="flex-1 p-6">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}