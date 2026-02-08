import { router, usePage } from "@inertiajs/react"

export default function AdminHeader({ title }: { title: string }) {
  const { auth }: any = usePage().props

  const logout = () => {
    router.post("/logout")
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
      {/* Judul halaman */}
      <h1 className="text-xl font-semibold text-gray-800">
        {title}
      </h1>

      {/* Info admin + logout */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-700">
            {auth?.user?.name}
          </p>
          <p className="text-xs text-gray-500">Admin</p>
        </div>

        <button
          onClick={logout}
          className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  )
}