import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import EOLayout from '@/layouts/eo-layout';
import { Calendar, MapPin, Plus, Clock, Edit3 } from 'lucide-react';

interface Event {
    id: number;
    title: string;
    location: string;
    start_date: string;
    end_date: string;
    status: 'draft' | 'published';
}

export default function ManageEvent() {
    const { events } = usePage<{ events: Event[] }>().props;

    const [form, setForm] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        location: '',
    });
    const [editingId, setEditingId] = useState<number | null>(null);
    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            router.put(`/eo/manage-event/${editingId}`, form, {
                preserveScroll: true,
                onSuccess: () => {
                    setEditingId(null);
                    setForm({
                        title: '',
                        description: '',
                        start_date: '',
                        end_date: '',
                        location: '',
                    });
                },
            });
        } else {
            router.post('/eo/manage-event', form, {
                preserveScroll: true,
                onSuccess: () =>
                    setForm({
                        title: '',
                        description: '',
                        start_date: '',
                        end_date: '',
                        location: '',
                    }),
            });
        }
    };

    return (
        <EOLayout>
            <Head title="Kelola Event" />

            <div className="-m-6">
                {/* Minimalist Header */}
                <div className="border-b border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-blue-400 to-cyan-400"></div>
                            <div>
                                <h1 className="text-xl font-semibold text-white">
                                    Events
                                </h1>
                                <p className="mt-0.5 text-xs text-slate-400">
                                    Manage your events
                                </p>
                            </div>
                        </div>
                        <div className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-1.5">
                            <span className="text-xs text-slate-300">
                                {events.length} Total
                            </span>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="border-b border-slate-200 bg-white px-8 py-6">
                    <div className="max-w-4xl">
                        <div className="mb-5 flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
                                <Plus className="h-4 w-4 text-blue-600" />
                            </div>
                            <h2 className="text-base font-semibold text-slate-800">
                                New Event
                            </h2>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Event Title */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium tracking-wide text-slate-600 uppercase">
                                        Event Title *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Tech Conference 2024"
                                        value={form.title}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                title: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                        required
                                    />
                                </div>

                                {/* Location */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium tracking-wide text-slate-600 uppercase">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Jakarta Convention Center"
                                        value={form.location}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                location: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                        required
                                    />
                                </div>

                                {/* Start Date */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium tracking-wide text-slate-600 uppercase">
                                        Start Date & Time *
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={form.start_date}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                start_date: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 transition-all outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                        required
                                    />
                                </div>

                                {/* End Date */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium tracking-wide text-slate-600 uppercase">
                                        End Date & Time *
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={form.end_date}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                end_date: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 transition-all outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium tracking-wide text-slate-600 uppercase">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Tell us about your event..."
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            description: e.target.value,
                                        })
                                    }
                                    rows={3}
                                    className="w-full resize-none rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div className="flex justify-end pt-2">
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-slate-800"
                                >
                                    <Plus className="h-4 w-4" />
                                    Create Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Events List */}
                <div className="min-h-screen bg-slate-50 px-8 py-6">
                    <div className="max-w-4xl">
                        {events.length === 0 ? (
                            <div className="rounded-xl border border-slate-200 bg-white p-16 text-center">
                                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                                    <Calendar className="h-7 w-7 text-slate-400" />
                                </div>
                                <p className="font-medium text-slate-600">
                                    No events created yet
                                </p>
                                <p className="mt-1 text-sm text-slate-400">
                                    Start by creating your first event above
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="group cursor-pointer border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-md"
                                    >
                                        <div className="flex items-center justify-between p-4">
                                            {/* Left Content */}
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-2 flex items-center gap-3">
                                                    <h3 className="truncate text-sm font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
                                                        {event.title}
                                                    </h3>
                                                    <span
                                                        className={`rounded px-2 py-0.5 text-xs font-medium ${
                                                            event.status ===
                                                            'published'
                                                                ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                                                                : 'border border-amber-200 bg-amber-50 text-amber-700'
                                                        }`}
                                                    >
                                                        {event.status}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                                    <div className="flex items-center gap-1.5">
                                                        <MapPin className="h-3.5 w-3.5" />
                                                        <span>
                                                            {event.location}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="h-3.5 w-3.5" />
                                                        <span>
                                                            {new Date(
                                                                event.start_date,
                                                            ).toLocaleDateString(
                                                                'en-US',
                                                                {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric',
                                                                },
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        <span>
                                                            {new Date(
                                                                event.start_date,
                                                            ).toLocaleTimeString(
                                                                'en-US',
                                                                {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                },
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Action */}
                                            <button
                                                onClick={() => {
                                                    setEditingId(event.id);
                                                    setForm({
                                                        title: event.title,
                                                        description: '',
                                                        start_date:
                                                            event.start_date,
                                                        end_date:
                                                            event.end_date,
                                                        location:
                                                            event.location,
                                                    });
                                                }}
                                                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900"
                                            >
                                                <Edit3 className="h-3.5 w-3.5" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            'Hapus event ini?',
                                                        )
                                                    ) {
                                                        router.delete(
                                                            `/eo/manage-event/${event.id}`,
                                                            {
                                                                preserveScroll: true,
                                                            },
                                                        );
                                                    }
                                                }}
                                                className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 transition-all hover:bg-red-50"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </EOLayout>
    );
}
