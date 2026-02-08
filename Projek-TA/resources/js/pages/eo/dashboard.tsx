import { Head } from "@inertiajs/react"
import EOLayout from "@/layouts/eo-layout"

export default function EODashboard({ status }: { status: string }) {
  return (
    <EOLayout title="Dashboard Event Organizer">
      <Head title="Dashboard EO" />

      {status === "pending" ? (
        <div className="text-center py-24">
          <h2 className="text-2xl font-bold">
            Akun EO Menunggu Persetujuan Admin
          </h2>
          <p className="text-gray-500 mt-2">
            Silakan tunggu, fitur akan aktif setelah disetujui.
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Selamat Datang 👋
          </h2>
          <p className="text-gray-600">
            Kelola event, tiket, dan laporan kamu di sini.
          </p>
        </div>
      )}
    </EOLayout>
  )
}