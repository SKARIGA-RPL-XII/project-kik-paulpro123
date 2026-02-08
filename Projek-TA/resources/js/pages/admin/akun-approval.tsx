import { router } from "@inertiajs/react"
import AdminLayout from "@/layouts/admin-layout"
interface EORequest {
  id: number
  company_name: string
  user: {
    name: string
    email: string
  }
}

export default function AccountApproval({
  eoRequests,
}: {
  eoRequests: EORequest[]
}) {
  return (
    <AdminLayout title="Persetujuan Akun">
      <h2 className="text-xl font-semibold mb-6">
        Persetujuan Akun EO
      </h2>

      <div className="space-y-4">
        {eoRequests.map(eo => (
          <div key={eo.id} className="border rounded-lg p-4">
            <p className="font-medium">{eo.company_name}</p>
            <p className="text-sm text-gray-600">
              {eo.user.name} · {eo.user.email}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => router.post(`/admin/eo/${eo.id}/approve`)}
                className="px-4 py-2 bg-green-600 text-white rounded-md text-sm"
              >
                Setujui
              </button>

              <button
                onClick={() => router.post(`/admin/eo/${eo.id}/reject`)}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm"
              >
                Tolak
              </button>
            </div>
          </div>
        ))}

        {eoRequests.length === 0 && (
          <p className="text-gray-500">
            Tidak ada akun EO yang menunggu persetujuan
          </p>
        )}
      </div>
    </AdminLayout>
  )
}