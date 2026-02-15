import { Head, router, usePage } from '@inertiajs/react';
import EOLayout from '@/layouts/eo-layout';
import { useState } from 'react';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Ticket {
    id: number;
    name: string;
    price: number;
    kuota: number;
    sold: number;
    status: 'active' | 'inactive';
}

interface Event {
    id: number;
    title: string;
    tickets: Ticket[];
}

export default function ManageTicket() {
    const { event } = usePage<{ event: Event }>().props;

    const [form, setForm] = useState({
        
        name: '',
        price: '',
        kuota: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        router.post(
            `/eo/events/${event.id}/tickets`,
            {
                name: form.name,
                price: form.price,
                kuota: form.kuota,
            },
            {
                onSuccess: () => {
                    setForm({ name: '', price: '', kuota: '' });
                },
            },
        );
    };

    const deleteTicket = (id: number) => {
        if (confirm('Yakin hapus ticket ini?')) {
            router.delete(`/eo/tickets/${id}`);
        }
    };

    const toggleStatus = (ticket: Ticket) => {
        router.put(`/eo/tickets/${ticket.id}`, {
            name: ticket.name,
            price: ticket.price,
            kuota: ticket.kuota,
            status: ticket.status === 'active' ? 'inactive' : 'active',
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <EOLayout>
            <Head title="Kelola Ticket" />

            <div className="space-y-8 p-6 lg:p-8">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            Kelola Ticket
                        </h1>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-500">
                                Event:
                            </span>
                            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                                {event.title}
                            </span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        onClick={() => router.get('/eo/manage-event')}
                        className="flex items-center gap-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Event
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                        <div className="text-sm font-medium text-slate-500">
                            Total Ticket
                        </div>
                        <div className="mt-2 text-3xl font-bold text-slate-900">
                            {event.tickets.length}
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                        <div className="text-sm font-medium text-slate-500">
                            Ticket Aktif
                        </div>
                        <div className="mt-2 text-3xl font-bold text-green-600">
                            {
                                event.tickets.filter(
                                    (t) => t.status === 'active',
                                ).length
                            }
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                        <div className="text-sm font-medium text-slate-500">
                            Total Terjual
                        </div>
                        <div className="mt-2 text-3xl font-bold text-blue-600">
                            {event.tickets.reduce(
                                (acc, t) => acc + t.sold,
                                0,
                            )}
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                        <div className="text-sm font-medium text-slate-500">
                            Total Kuota
                        </div>
                        <div className="mt-2 text-3xl font-bold text-indigo-600">
                            {event.tickets.reduce(
                                (acc, t) => acc + t.kuota,
                                0,
                            )}
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <form
                    onSubmit={submit}
                    className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
                >
                    <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                            <Plus className="h-5 w-5 text-indigo-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-900">
                            Tambah Ticket Baru
                        </h2>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="space-y-2 lg:col-span-3">
                            <Label className="text-sm font-medium text-slate-700">
                                Nama Ticket
                            </Label>
                            <Input
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                                placeholder="Contoh: VIP, Regular, Early Bird"
                                className="h-11 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">
                                Harga (Rp)
                            </Label>
                            <Input
                                type="number"
                                min={0}
                                value={form.price}
                                onChange={(e) =>
                                    setForm({ ...form, price: e.target.value })
                                }
                                placeholder="0"
                                className="h-11 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">
                                Kuota
                            </Label>
                            <Input
                                type="number"
                                min={1}
                                value={form.kuota}
                                onChange={(e) =>
                                    setForm({ ...form, kuota: e.target.value })
                                }
                                placeholder="0"
                                className="h-11 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div className="flex items-end">
                            <Button
                                type="submit"
                                className="h-11 w-full bg-indigo-600 text-white hover:bg-indigo-700"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Simpan Ticket
                            </Button>
                        </div>
                    </div>
                </form>

                {/* Table Section */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                        <h3 className="text-lg font-semibold text-slate-900">
                            Daftar Ticket
                        </h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50/50">
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Nama Ticket
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Harga
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Kuota
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Terjual
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Progress
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {event.tickets.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-6 py-12 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                                                    <Plus className="h-8 w-8 text-slate-400" />
                                                </div>
                                                <p className="text-sm font-medium text-slate-500">
                                                    Belum ada ticket
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                    Tambahkan ticket pertama Anda
                                                    menggunakan form di atas
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}

                                {event.tickets.map((ticket) => {
                                    const soldPercentage =
                                        (ticket.sold / ticket.kuota) * 100;
                                    return (
                                        <tr
                                            key={ticket.id}
                                            className="transition-colors hover:bg-slate-50"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-900">
                                                    {ticket.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="font-semibold text-slate-900">
                                                    {formatCurrency(
                                                        ticket.price,
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-slate-700">
                                                    {ticket.kuota}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="font-semibold text-blue-600">
                                                    {ticket.sold}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col items-center gap-1">
                                                    <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
                                                        <div
                                                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all"
                                                            style={{
                                                                width: `${Math.min(soldPercentage, 100)}%`,
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-medium text-slate-600">
                                                        {soldPercentage.toFixed(
                                                            0,
                                                        )}
                                                        %
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Button
                                                    size="sm"
                                                    variant={
                                                        ticket.status ===
                                                        'active'
                                                            ? 'default'
                                                            : 'secondary'
                                                    }
                                                    onClick={() =>
                                                        toggleStatus(ticket)
                                                    }
                                                    className={
                                                        ticket.status ===
                                                        'active'
                                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                                    }
                                                >
                                                    {ticket.status === 'active'
                                                        ? 'Aktif'
                                                        : 'Nonaktif'}
                                                </Button>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center gap-2">
                                                    <Button
                                                        size="icon"
                                                        variant="destructive"
                                                        onClick={() =>
                                                            deleteTicket(
                                                                ticket.id,
                                                            )
                                                        }
                                                        className="h-9 w-9 bg-red-600 text-white hover:bg-red-700"
                                                    >
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </EOLayout>
    );
}