import { router } from "@inertiajs/react"
import AdminLayout from "@/layouts/admin-layout"
import { 
  Building2, 
  Mail, 
  User, 
  CheckCircle, 
  XCircle,
  Clock,
  Shield
} from "lucide-react"

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
  const handleApprove = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menyetujui akun EO ini?')) {
      router.post(`/admin/eo/${id}/approve`)
    }
  }

  const handleReject = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menolak akun EO ini?')) {
      router.post(`/admin/eo/${id}/reject`)
    }
  }

  return (
    <AdminLayout title="Persetujuan Akun">
      <div className="space-y-6 p-6 lg:p-8">
        {/* Header Section */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
              <Shield className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Persetujuan Akun EO
              </h2>
              <p className="text-sm text-slate-600">
                Tinjau dan setujui pendaftaran Event Organizer
              </p>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-100 p-3">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Menunggu</p>
                <p className="text-2xl font-bold text-slate-900">
                  {eoRequests.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Disetujui Hari Ini</p>
                <p className="text-2xl font-bold text-slate-900">0</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-100 p-3">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Ditolak Hari Ini</p>
                <p className="text-2xl font-bold text-slate-900">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {eoRequests.map(eo => (
            <div 
              key={eo.id} 
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* EO Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100">
                      <Building2 className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {eo.company_name}
                      </h3>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <User className="h-4 w-4 text-slate-400" />
                          <span>{eo.user.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail className="h-4 w-4 text-slate-400" />
                          <span>{eo.user.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                    <Clock className="h-4 w-4" />
                    <span>Menunggu Persetujuan</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(eo.id)}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                  >
                    <CheckCircle className="h-5 w-5" />
                    Setujui
                  </button>

                  <button
                    onClick={() => handleReject(eo.id)}
                    className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
                  >
                    <XCircle className="h-5 w-5" />
                    Tolak
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {eoRequests.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                <CheckCircle className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Tidak Ada Permintaan Pending
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Tidak ada akun EO yang menunggu persetujuan saat ini
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}