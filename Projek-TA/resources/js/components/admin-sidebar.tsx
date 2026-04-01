import { Link, usePage } from "@inertiajs/react"
import { 
    LayoutDashboard, 
    Users, 
    UserCheck, 
    LogOut, 
    CreditCard, // Ikon baru untuk Pembayaran
    FileText,   // Ikon baru untuk Laporan
    CalendarCheck // Ikon baru untuk Persetujuan Event
} from "lucide-react"

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
    label: "Persetujuan Event",
    href: "/admin/event-approval",
    icon: CalendarCheck,
  },
   {
    id: "payment-providers",
    label: "Kelola Metode Pembayaran",
    href: "/admin/payment-providers",
    icon: CreditCard, 
  },
   {
    id: "transaction history",
    label: "Riwayat Transaksi",
    href: "/admin/transactions",
    icon: FileText, 
  },
  {
    id: "sales-report",
    label: "Laporan Penjualan",
    href: "/admin/laporan",
    icon: FileText, 
  },
   {
    id: "chatbot",
    label: "Kelola Chatbot",
    href: "/admin/chat",
    icon: FileText, 
  },
]

export default function AdminSidebar() {
  const { url } = usePage()

  return (
    <aside className="w-64 h-screen border-r bg-white px-4 py-6 flex flex-col">
      <div className="text-xl font-bold mb-8 text-slate-800">Admin Panel</div>

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
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }
              `}
            >
              <Icon size={18} className={isActive ? "text-white" : "text-slate-400"} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <Link
        href="/logout"
        method="post"
        as="button"
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition font-medium text-sm mt-auto"
      >
        <LogOut size={18} />
        Logout
      </Link>
    </aside>
  )
}