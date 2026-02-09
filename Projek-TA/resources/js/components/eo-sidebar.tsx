import { Link, usePage } from "@inertiajs/react"

export default function EOSidebar() {
  const { url } = usePage()

  const menus = [
    { label: "Dashboard", href: "/eo/dashboard" },
    { label: "Event", href: "/eo/manage-event" },
    { label: "Laporan", href: "/eo/reports" },
  ]

  return (
    <aside className="w-64 bg-white border-r min-h-screen px-4 py-6">
      <h2 className="text-lg font-bold text-gray-800 mb-6">
        EO Panel
      </h2>

      <nav className="space-y-1">
        {menus.map((menu) => {
          const active = url.startsWith(menu.href)

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`block px-4 py-2 rounded-md text-sm font-medium transition
                ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              {menu.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}