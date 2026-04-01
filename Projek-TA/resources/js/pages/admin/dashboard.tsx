import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import {
    Users,
    Briefcase,
    Calendar,
    DollarSign,
    AlertCircle,
    Activity,
    Ticket,
    Trophy,
    History,
} from 'lucide-react';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface AdminDashboardProps {
    total_users: number;
    total_eos: number;
    pending_eos: number;
    total_events: number;
    pending_events: number;
    total_revenue: number;
    total_tickets_sold: number;
    top_events: Array<{
        id: number;
        title: string;
        eo_name: string;
        revenue: number;
    }>;
    recent_transactions: Array<{
        invoice: string;
        buyer_name: string;
        event_title: string;
        total_price: number;
        date_formatted: string;
    }>;
    revenue_data: Array<{
        date: string;
        revenue: number;
    }>;
}

export default function AdminDashboard({
    total_users = 0,
    total_eos = 0,
    pending_eos = 0,
    total_events = 0,
    pending_events = 0,
    total_revenue = 0,
    total_tickets_sold = 0,
    top_events = [],
    recent_transactions = [],
    revenue_data = [],
}: AdminDashboardProps) {
    const formatCurrency = (amount: number) => {
        if (amount >= 1000000000)
            return `Rp ${(amount / 1000000000).toFixed(2)} M`;
        if (amount >= 1000000) return `Rp ${(amount / 1000000).toFixed(1)} Jt`;
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const stats = [
        {
            title: 'Perputaran Uang',
            value: formatCurrency(total_revenue),
            desc: 'Total GMV (Gross Merchandise Value)',
            icon: DollarSign,
            color: 'text-emerald-600',
            bg: 'bg-emerald-100',
            border: 'border-emerald-200',
        },
        {
            title: 'Total Tiket Terjual',
            value: total_tickets_sold.toLocaleString('id-ID'),
            desc: 'Tiket sukses dibayar',
            icon: Ticket,
            color: 'text-blue-600',
            bg: 'bg-blue-100',
            border: 'border-blue-200',
        },
        {
            title: 'Mitra EO Aktif',
            value: total_eos.toLocaleString('id-ID'),
            desc: 'Penyelenggara terverifikasi',
            icon: Briefcase,
            color: 'text-indigo-600',
            bg: 'bg-indigo-100',
            border: 'border-indigo-200',
        },
        {
            title: 'Total Pengguna',
            value: total_users.toLocaleString('id-ID'),
            desc: 'Pembeli terdaftar di sistem',
            icon: Users,
            color: 'text-orange-600',
            bg: 'bg-orange-100',
            border: 'border-orange-200',
        },
    ];

    return (
        <AdminLayout title="Dashboard Admin">
            <Head title="Pusat Kendali Admin" />

            <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Pusat Kendali Utama 🌍
                    </h1>
                    <p className="mt-2 text-slate-600">
                        Pantau perputaran finansial dan data platform secara
                        real-time.
                    </p>
                </div>

                {(pending_eos > 0 || pending_events > 0) && (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {pending_eos > 0 && (
                            <div className="flex items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-amber-100 p-2">
                                        <AlertCircle className="h-6 w-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-amber-900">
                                            Verifikasi EO Baru
                                        </h3>
                                        <p className="text-sm text-amber-700">
                                            <strong>{pending_eos}</strong> akun
                                            EO menunggu disetujui.
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href="/admin/manage-eo"
                                    className="shrink-0 rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-amber-600"
                                >
                                    Cek
                                </Link>
                            </div>
                        )}

                        {pending_events > 0 && (
                            <div className="flex items-center justify-between gap-4 rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-blue-100 p-2">
                                        <Calendar className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-blue-900">
                                            Persetujuan Event
                                        </h3>
                                        <p className="text-sm text-blue-700">
                                            <strong>{pending_events}</strong>{' '}
                                            event menunggu moderasi.
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href="/admin/manage-events"
                                    className="shrink-0 rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-600"
                                >
                                    Cek
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`relative overflow-hidden rounded-2xl border ${stat.border} bg-white p-6 shadow-sm transition-all hover:shadow-md`}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                        {stat.title}
                                    </p>
                                    <h3 className="mt-2 text-3xl font-black text-slate-800">
                                        {stat.value}
                                    </h3>
                                </div>
                                <div
                                    className={`rounded-xl p-3 ${stat.bg} ${stat.color}`}
                                >
                                    <stat.icon
                                        className="h-6 w-6"
                                        strokeWidth={2.5}
                                    />
                                </div>
                            </div>
                            <div className="mt-4 border-t border-slate-100 pt-4">
                                <p className="flex items-center gap-1.5 text-sm text-slate-500">
                                    <Activity
                                        size={14}
                                        className="text-slate-400"
                                    />{' '}
                                    {stat.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 👇 FIX DITERAPKAN DI SINI (overflow-hidden & width="99%") 👇 */}
                <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">
                                Grafik GMV (Pendapatan Global)
                            </h3>
                            <p className="text-sm text-slate-500">
                                Perputaran uang di seluruh platform dalam 7 hari
                                terakhir.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                            <Activity size={16} /> Real-time Data
                        </div>
                    </div>
                    <div className="h-80 w-full overflow-hidden">
                        {/* 👇 UBAH BAGIAN INI 👇 */}
                        <div className="flex h-80 w-full justify-center overflow-hidden">
                            {/* Hapus ResponsiveContainer, langsung gunakan AreaChart dengan width dan height pasti */}
                            <AreaChart
                                width={800}
                                height={300}
                                data={revenue_data}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: -20,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="colorAdminRevenue"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#10b981"
                                            stopOpacity={0.4}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#10b981"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="#f1f5f9"
                                />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#64748b' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(value) =>
                                        value >= 1000000
                                            ? `${value / 1000000}Jt`
                                            : `${value / 1000}k`
                                    }
                                />
                                <Tooltip
                                    formatter={(value: any) => [
                                        new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                            minimumFractionDigits: 0,
                                        }).format(Number(value)),
                                        'Total GMV',
                                    ]}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorAdminRevenue)"
                                />
                            </AreaChart>
                        </div>{' '}
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
                        <div className="flex shrink-0 items-center gap-2 border-b border-slate-100 bg-slate-50/50 p-5">
                            <History className="h-5 w-5 text-indigo-600" />
                            <h3 className="font-bold text-slate-800">
                                Transaksi Berhasil Terbaru
                            </h3>
                        </div>
                        <div className="flex-1 overflow-x-auto">
                            <table className="h-full w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 text-slate-500">
                                        <th className="p-4 font-semibold whitespace-nowrap">
                                            Pembeli
                                        </th>
                                        <th className="p-4 font-semibold whitespace-nowrap">
                                            Event
                                        </th>
                                        <th className="p-4 text-right font-semibold whitespace-nowrap">
                                            Nominal
                                        </th>
                                        <th className="p-4 text-right font-semibold whitespace-nowrap">
                                            Waktu
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {recent_transactions.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="p-8 text-center text-slate-400"
                                            >
                                                Belum ada transaksi.
                                            </td>
                                        </tr>
                                    )}
                                    {recent_transactions.map((tx, idx) => (
                                        <tr
                                            key={idx}
                                            className="transition-colors hover:bg-slate-50"
                                        >
                                            <td className="p-4">
                                                <p className="font-semibold text-slate-800">
                                                    {tx.buyer_name}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {tx.invoice}
                                                </p>
                                            </td>
                                            <td
                                                className="max-w-37.5 truncate p-4 text-slate-600"
                                                title={tx.event_title}
                                            >
                                                {tx.event_title}
                                            </td>
                                            <td className="p-4 text-right font-bold whitespace-nowrap text-emerald-600">
                                                {new Intl.NumberFormat(
                                                    'id-ID',
                                                    {
                                                        style: 'currency',
                                                        currency: 'IDR',
                                                        minimumFractionDigits: 0,
                                                    },
                                                ).format(tx.total_price)}
                                            </td>
                                            <td className="p-4 text-right text-xs whitespace-nowrap text-slate-500">
                                                {tx.date_formatted}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex shrink-0 items-center gap-2 border-b border-slate-100 bg-slate-50/50 p-5">
                            <Trophy className="h-5 w-5 text-amber-500" />
                            <h3 className="font-bold text-slate-800">
                                Top 5 Event Terlaris
                            </h3>
                        </div>
                        <div className="flex-1 space-y-5 overflow-y-auto p-5">
                            {top_events.length === 0 && (
                                <p className="py-4 text-center text-slate-400">
                                    Belum ada data event.
                                </p>
                            )}
                            {top_events.map((event, idx) => (
                                <div
                                    key={idx}
                                    className="group flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div
                                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-transform group-hover:scale-110 ${idx === 0 ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-200' : idx === 1 ? 'bg-slate-200 text-slate-700' : idx === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'}`}
                                        >
                                            #{idx + 1}
                                        </div>
                                        <div className="truncate">
                                            <p
                                                className="truncate text-sm font-bold text-slate-800"
                                                title={event.title}
                                            >
                                                {event.title}
                                            </p>
                                            <p
                                                className="truncate text-xs text-slate-500"
                                                title={`Oleh: ${event.eo_name}`}
                                            >
                                                Oleh: {event.eo_name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="ml-3 shrink-0 text-right">
                                        <p className="text-sm font-bold whitespace-nowrap text-emerald-600">
                                            {formatCurrency(event.revenue)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
