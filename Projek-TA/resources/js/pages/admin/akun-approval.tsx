import { router } from "@inertiajs/react"
import { useState } from "react"
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

// 1. Tambahkan status ke Interface
interface EORequest {
  id: number
  company_name: string
  status: 'pending' | 'active' | 'rejected'
  user: {
    name: string
    email: string
  }
}

type Tab = 'pending' | 'active' | 'rejected';

export default function AccountApproval({
  eoRequests,
}: {
  eoRequests: EORequest[]
}) {
  // 2. Buat state untuk Tab
  const [activeTab, setActiveTab] = useState<Tab>('pending');

  const handleApprove = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menyetujui akun EO ini?')) {
      router.post(`/admin/eo/${id}/approve`, {}, { preserveScroll: true })
    }
  }

  const handleReject = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menolak akun EO ini?')) {
      router.post(`/admin/eo/${id}/reject`, {}, { preserveScroll: true })
    }
  }

  // 3. Filter data berdasarkan tab
  const filteredRequests = eoRequests.filter((req) => req.status === activeTab);

  // 4. Hitung Statistik All Time
  const totalPending = eoRequests.filter(req => req.status === 'pending').length;
  const totalApproved = eoRequests.filter(req => req.status === 'active').length;
  const totalRejected = eoRequests.filter(req => req.status === 'rejected').length;

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
                Tinjau dan kelola status pendaftaran Event Organizer
              </p>
            </div>
          </div>
        </div>

        {/* Stats Card (ALL TIME) */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-100 p-3">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Menunggu</p>
                <p className="text-2xl font-bold text-slate-900">{totalPending}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Disetujui</p>
                <p className="text-2xl font-bold text-slate-900">{totalApproved}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-100 p-3">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Ditolak</p>
                <p className="text-2xl font-bold text-slate-900">{totalRejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex gap-2 border-b border-slate-200 pb-4">
            {(['pending', 'active', 'rejected'] as Tab[]).map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                        activeTab === tab
                            ? tab === 'active' ? 'bg-emerald-600 text-white' 
                            : tab === 'rejected' ? 'bg-red-600 text-white' 
                            : 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                >
                    {tab === 'active' ? 'DISETUJUI' : tab.toUpperCase()}
                    <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                        {eoRequests.filter(e => e.status === tab).length}
                    </span>
                </button>
            ))}
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map(eo => (
            <div 
              key={eo.id} 
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                
                {/* EO Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
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

                  {/* Status Badge Dinamis */}
                  <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                      eo.status === 'active' ? 'bg-green-50 text-green-700' :
                      eo.status === 'rejected' ? 'bg-red-50 text-red-700' :
                      'bg-amber-50 text-amber-700'
                  }`}>
                    {eo.status === 'active' ? <CheckCircle className="h-4 w-4" /> : 
                     eo.status === 'rejected' ? <XCircle className="h-4 w-4" /> : 
                     <Clock className="h-4 w-4" />}
                    
                    <span>
                      {eo.status === 'active' ? 'Disetujui' : 
                       eo.status === 'rejected' ? 'Ditolak' : 'Menunggu Persetujuan'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons (Hanya tampil jika status pending) */}
                <div className="flex gap-3">
                  {eo.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleApprove(eo.id)}
                          className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                        >
                          <CheckCircle className="h-5 w-5" /> Setujui
                        </button>

                        <button
                          onClick={() => handleReject(eo.id)}
                          className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
                        >
                          <XCircle className="h-5 w-5" /> Tolak
                        </button>
                      </>
                  ) : (
                      <span className="text-xs text-slate-400 italic">Akun sudah diproses</span>
                  )}
                </div>

              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredRequests.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                <CheckCircle className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Tidak Ada Permintaan {activeTab === 'active' ? 'Disetujui' : activeTab}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Saat ini tidak ada akun EO dengan status tersebut.
              </p>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  )
}