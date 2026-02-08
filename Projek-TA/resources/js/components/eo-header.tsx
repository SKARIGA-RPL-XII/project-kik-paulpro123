import { router } from "@inertiajs/react"

export default function EOHeader({ title }: { title?: string }) {
  const logout = () => {
    router.post("/logout")
  }

  return (
    <header className="bg-white border-b h-16 px-8 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">
        {title ?? "Dashboard EO"}
      </h1>

      <button
        onClick={logout}
        className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Logout
      </button>
    </header>
  )
}