import { Link, usePage } from "@inertiajs/react"
import { LayoutDashboard, Users, UserCheck, LogOut } from "lucide-react"

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "manage-akun",
    label: "Kelola Akun",
    href: "/admin/manage-akun",
    icon: Users,
  },
  {
    id: "akun-approval",
    label: "Persetujuan Akun",
    href: "/admin/akun-approval",
    icon: UserCheck,
  },
  {
    id: "event-approval",
    label: "Kelola Event",
    href: "/admin/event-approval",
    icon: UserCheck,
  },
  {
    id: "sales-report",
    label: "Laporan Penjualan",
    href: "/admin/laporan.tsx",
    icon: UserCheck,
  },
]

export default function AdminSidebar() {
  const { url } = usePage()

  return (
    <aside className="w-64 h-screen border-r bg-white px-4 py-6 flex flex-col">
      <div className="text-xl font-bold mb-8">Admin Panel</div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = url.startsWith(item.href)

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition
                ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <Link
        href="/logout"
        method="post"
        as="button"
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50"
      >
        <LogOut size={18} />
        Logout
      </Link>
    </aside>
  )
}