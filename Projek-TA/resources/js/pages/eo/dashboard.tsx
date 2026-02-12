import { Head } from "@inertiajs/react"
import EOLayout from "@/layouts/eo-layout"
import { 
  Calendar, 
  Ticket, 
  DollarSign, 
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  BarChart3,
  Plus,
  Eye,
  Edit,
  AlertCircle
} from "lucide-react"

export default function EODashboard({ status }: { status: string }) {
  const stats = [
    {
      title: "Total Event",
      value: "12",
      change: "+3 bulan ini",
      icon: Calendar,
      color: "blue"
    },
    {
      title: "Tiket Terjual",
      value: "3,847",
      change: "+23.5% dari target",
      icon: Ticket,
      color: "green"
    },
    {
      title: "Total Pendapatan",
      value: "Rp 125jt",
      change: "+18.2% bulan ini",
      icon: DollarSign,
      color: "purple"
    },
    {
      title: "Total Pengunjung",
      value: "4,521",
      change: "+892 minggu ini",
      icon: Users,
      color: "orange"
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Conference 2026",
      date: "18 Feb 2026",
      time: "09:00 WIB",
      location: "Jakarta Convention Center",
      tickets: "450/500",
      revenue: "Rp 45jt",
      status: "active"
    },
    {
      id: 2,
      title: "Music Festival",
      date: "25 Feb 2026",
      time: "15:00 WIB",
      location: "GBK Stadium",
      tickets: "1200/1500",
      revenue: "Rp 120jt",
      status: "active"
    },
    {
      id: 3,
      title: "Food Carnival",
      date: "5 Mar 2026",
      time: "10:00 WIB",
      location: "Senayan Park",
      tickets: "680/1000",
      revenue: "Rp 68jt",
      status: "draft"
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: "sale",
      message: "25 tiket terjual untuk Tech Conference 2026",
      time: "10 menit yang lalu"
    },
    {
      id: 2,
      type: "update",
      message: "Event Music Festival berhasil diperbarui",
      time: "2 jam yang lalu"
    },
    {
      id: 3,
      type: "sale",
      message: "15 tiket terjual untuk Food Carnival",
      time: "5 jam yang lalu"
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600"
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getActivityIcon = (type: string) => {
    switch(type) {
      case "sale":
        return <Ticket className="h-5 w-5 text-green-500" />
      case "update":
        return <Edit className="h-5 w-5 text-blue-500" />
      default:
        return <CheckCircle className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <EOLayout title="Dashboard Event Organizer">
      <Head title="Dashboard EO" />

      {status === "pending" ? (
        <div className="flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
          <div className="w-full max-w-2xl">
            <div className="rounded-2xl border border-slate-200 bg-white p-12 shadow-lg">
              <div className="text-center">
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
                  <Clock className="h-10 w-10 text-amber-600" />
                </div>

                {/* Title */}
                <h2 className="mb-3 text-3xl font-bold text-slate-900">
                  Akun EO Menunggu Persetujuan Admin
                </h2>

                {/* Description */}
                <p className="mb-8 text-lg text-slate-600">
                  Silakan tunggu, fitur akan aktif setelah disetujui.
                </p>

                {/* Status Timeline */}
                <div className="mx-auto mb-8 max-w-md">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-slate-900">Pendaftaran Berhasil</p>
                        <p className="text-sm text-slate-500">Akun EO telah dibuat</p>
                      </div>
                    </div>

                    <div className="ml-5 h-8 w-0.5 bg-slate-200"></div>

                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 ring-4 ring-amber-50">
                        <Clock className="h-6 w-6 text-amber-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-slate-900">Menunggu Verifikasi</p>
                        <p className="text-sm text-slate-500">Admin sedang meninjau akun Anda</p>
                      </div>
                    </div>

                    <div className="ml-5 h-8 w-0.5 bg-slate-200"></div>

                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                        <CheckCircle className="h-6 w-6 text-slate-400" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-slate-400">Akun Disetujui</p>
                        <p className="text-sm text-slate-400">Akses penuh ke dashboard</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="rounded-lg bg-blue-50 p-4 text-left">
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        Informasi
                      </p>
                      <p className="mt-1 text-sm text-blue-700">
                        Proses verifikasi biasanya memakan waktu 1-2 hari kerja. 
                        Anda akan menerima notifikasi email setelah akun disetujui.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Welcome Section */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">
                    Selamat Datang 👋
                  </h2>
                  <p className="mt-2 text-slate-600">
                    Kelola event, tiket, dan laporan kamu di sini.
                  </p>
                </div>
                <div className="hidden sm:block">
                  <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700">
                    <Plus className="h-5 w-5" />
                    Buat Event Baru
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-600">
                        {stat.title}
                      </p>
                      <h3 className="mt-2 text-3xl font-bold text-slate-900">
                        {stat.value}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500">
                        {stat.change}
                      </p>
                    </div>
                    <div className={`rounded-lg p-3 ${getColorClasses(stat.color)}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-slate-200 to-slate-200 transition-all group-hover:from-indigo-500 group-hover:to-purple-500" />
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Upcoming Events */}
              <div className="lg:col-span-2">
                <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900">
                          Event Mendatang
                        </h3>
                      </div>
                      <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                        Lihat Semua
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div
                          key={event.id}
                          className="rounded-lg border border-slate-200 p-5 transition-all hover:border-indigo-300 hover:shadow-md"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-slate-900">
                                  {event.title}
                                </h4>
                                <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                                  event.status === 'active' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-gray-100 text-gray-700'
                                }`}>
                                  {event.status}
                                </span>
                              </div>
                              <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  <span>{event.time}</span>
                                </div>
                              </div>
                              <p className="mt-2 text-sm text-slate-500">
                                📍 {event.location}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-slate-500">Tiket Terjual</p>
                              <div className="mt-1 flex items-center justify-between text-sm font-semibold text-slate-900">
                                <span>{event.tickets}</span>
                              </div>
                              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                                  style={{
                                    width: `${(parseInt(event.tickets.split('/')[0]) / parseInt(event.tickets.split('/')[1])) * 100}%`
                                  }}
                                />
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Pendapatan</p>
                              <p className="mt-1 text-sm font-semibold text-green-600">
                                {event.revenue}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 flex gap-2">
                            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
                              <Eye className="h-4 w-4" />
                              Detail
                            </button>
                            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
                              <Edit className="h-4 w-4" />
                              Edit
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activities & Quick Stats */}
              <div className="space-y-6">
                {/* Recent Activities */}
                <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-200 p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900">
                        Aktivitas Terbaru
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 transition-colors hover:bg-slate-50"
                        >
                          <div className="mt-0.5">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">
                              {activity.message}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 font-semibold text-slate-900">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <button className="flex w-full items-center gap-3 rounded-lg border-2 border-dashed border-slate-300 p-3 text-left transition-all hover:border-indigo-500 hover:bg-indigo-50">
                      <div className="rounded-lg bg-blue-100 p-2">
                        <BarChart3 className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">Lihat Laporan</span>
                    </button>
                    <button className="flex w-full items-center gap-3 rounded-lg border-2 border-dashed border-slate-300 p-3 text-left transition-all hover:border-indigo-500 hover:bg-indigo-50">
                      <div className="rounded-lg bg-green-100 p-2">
                        <Ticket className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">Kelola Tiket</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </EOLayout>
  )
}