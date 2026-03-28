import { Head, Link } from '@inertiajs/react';
import AdminLayout from "@/layouts/admin-layout";
import {
    Users,
    Briefcase,
    Calendar,
    DollarSign,
    AlertCircle,
    ArrowRight,
    Activity,
    Ticket,
    Trophy,
    History
} from 'lucide-react';

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
}: AdminDashboardProps) {
    
    const formatCurrency = (amount: number) => {
        if (amount >= 1000000000) return `Rp ${(amount / 1000000000).toFixed(2)} M`;
        if (amount >= 1000000) return `Rp ${(amount / 1000000).toFixed(1)} Jt`;
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    const stats = [
        {
            title: 'Perputaran Uang',
            value: formatCurrency(total_revenue),
            desc: 'Total GMV (Gross Merchandise Value)',
            icon: DollarSign,
            color: 'text-emerald-600',
            bg: 'bg-emerald-100',
            border: 'border-emerald-200'
        },
        {
            title: 'Total Tiket Terjual',
            value: total_tickets_sold.toLocaleString('id-ID'),
            desc: 'Tiket sukses dibayar',
            icon: Ticket,
            color: 'text-blue-600',
            bg: 'bg-blue-100',
            border: 'border-blue-200'
        },
        {
            title: 'Mitra EO Aktif',
            value: total_eos.toLocaleString('id-ID'),
            desc: 'Penyelenggara terverifikasi',
            icon: Briefcase,
            color: 'text-indigo-600',
            bg: 'bg-indigo-100',
            border: 'border-indigo-200'
        },
        {
            title: 'Total Pengguna',
            value: total_users.toLocaleString('id-ID'),
            desc: 'Pembeli terdaftar di sistem',
            icon: Users,
            color: 'text-orange-600',
            bg: 'bg-orange-100',
            border: 'border-orange-200'
        },
    ];

    return (
        <AdminLayout title="Dashboard Admin">
            <Head title="Pusat Kendali Admin" />

            <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
                
                {/* Header Welcome */}
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Pusat Kendali Utama 🌍</h1>
                    <p className="mt-2 text-slate-600">Pantau perputaran finansial dan data platform secara real-time.</p>
                </div>

                {/* ALERTS SECTION (Muncul berdampingan jika keduanya ada) */}
                {(pending_eos > 0 || pending_events > 0) && (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {pending_eos > 0 && (
                            <div className="flex items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-amber-100 p-2"><AlertCircle className="h-6 w-6 text-amber-600" /></div>
                                    <div>
                                        <h3 className="text-sm font-bold text-amber-900">Verifikasi EO Baru</h3>
                                        <p className="text-sm text-amber-700"><strong>{pending_eos}</strong> akun EO menunggu disetujui.</p>
                                    </div>
                                </div>
                                <Link href="/admin/manage-eo" className="shrink-0 rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-amber-600">Cek</Link>
                            </div>
                        )}

                        {pending_events > 0 && (
                            <div className="flex items-center justify-between gap-4 rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-blue-100 p-2"><Calendar className="h-6 w-6 text-blue-600" /></div>
                                    <div>
                                        <h3 className="text-sm font-bold text-blue-900">Persetujuan Event</h3>
                                        <p className="text-sm text-blue-700"><strong>{pending_events}</strong> event menunggu moderasi.</p>
                                    </div>
                                </div>
                                <Link href="/admin/manage-events" className="shrink-0 rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-600">Cek</Link>
                            </div>
                        )}
                    </div>
                )}

                {/* GRID STATISTIK GLOBAL */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div key={index} className={`relative overflow-hidden rounded-2xl border ${stat.border} bg-white p-6 shadow-sm transition-all hover:shadow-md`}>
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.title}</p>
                                    <h3 className="mt-2 text-3xl font-black text-slate-800">{stat.value}</h3>
                                </div>
                                <div className={`rounded-xl p-3 ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="h-6 w-6" strokeWidth={2.5} />
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <p className="text-sm text-slate-500 flex items-center gap-1.5">
                                    <Activity size={14} className="text-slate-400" /> {stat.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* BOTTOM SECTION: Leaderboard & Recent Transactions */}
                <div className="grid gap-6 lg:grid-cols-3">
                    
                    {/* Transaksi Terbaru (Takes 2 columns) */}
                    <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                        <div className="border-b border-slate-100 bg-slate-50/50 p-5 flex items-center gap-2">
                            <History className="h-5 w-5 text-indigo-600" />
                            <h3 className="font-bold text-slate-800">Transaksi Berhasil Terbaru</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100 text-slate-500">
                                        <th className="p-4 font-semibold">Pembeli</th>
                                        <th className="p-4 font-semibold">Event</th>
                                        <th className="p-4 font-semibold text-right">Nominal</th>
                                        <th className="p-4 font-semibold text-right">Waktu</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {recent_transactions.length === 0 && (
                                        <tr><td colSpan={4} className="p-8 text-center text-slate-400">Belum ada transaksi.</td></tr>
                                    )}
                                    {recent_transactions.map((tx, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50">
                                            <td className="p-4">
                                                <p className="font-semibold text-slate-800">{tx.buyer_name}</p>
                                                <p className="text-xs text-slate-500">{tx.invoice}</p>
                                            </td>
                                            <td className="p-4 text-slate-600 truncate max-w-37.5">{tx.event_title}</td>
                                            <td className="p-4 text-right font-bold text-emerald-600">
                                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(tx.total_price)}
                                            </td>
                                            <td className="p-4 text-right text-slate-500 text-xs">{tx.date_formatted}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Top Events Leaderboard (Takes 1 column) */}
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                        <div className="border-b border-slate-100 bg-slate-50/50 p-5 flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-amber-500" />
                            <h3 className="font-bold text-slate-800">Top 5 Event Terlaris</h3>
                        </div>
                        <div className="p-5 space-y-5">
                            {top_events.length === 0 && (
                                <p className="text-center text-slate-400 py-4">Belum ada data event.</p>
                            )}
                            {top_events.map((event, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold text-xs ${idx === 0 ? 'bg-amber-100 text-amber-700' : idx === 1 ? 'bg-slate-200 text-slate-700' : idx === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'}`}>
                                            #{idx + 1}
                                        </div>
                                        <div className="truncate">
                                            <p className="font-bold text-slate-800 truncate text-sm">{event.title}</p>
                                            <p className="text-xs text-slate-500 truncate">Oleh: {event.eo_name}</p>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0 ml-2">
                                        <p className="font-bold text-slate-800 text-sm">{formatCurrency(event.revenue)}</p>
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