import { usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';

function DatePicker({
    value,
    onChange,
}: {
    value: string;
    onChange: (val: string) => void;
}) {
    const today = new Date();
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<'day' | 'month' | 'year'>('day');

    const parsed = value ? new Date(value) : null;

    const monthNames = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ];
    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const selectDate = (day: number) => {
        const d = new Date(viewYear, viewMonth, day);
        const formatted = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        onChange(formatted);
        setOpen(false);
    };

    const displayValue = parsed
        ? `${parsed.getDate()} ${monthNames[parsed.getMonth()]} ${parsed.getFullYear()}`
        : '';

    const years = Array.from(
        { length: 100 },
        (_, i) => today.getFullYear() - i,
    );

    const prevMonth = () => {
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear((y) => y - 1);
        } else setViewMonth((m) => m - 1);
    };
    const nextMonth = () => {
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear((y) => y + 1);
        } else setViewMonth((m) => m + 1);
    };

    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return (
        <div className="relative">
            {/* Input trigger */}
            <button
                type="button"
                onClick={() => {
                    setOpen((o) => !o);
                    setMode('day');
                }}
                className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100 focus:outline-none"
            >
                <span
                    className={displayValue ? 'text-gray-900' : 'text-gray-400'}
                >
                    {displayValue || 'Pilih tanggal lahir'}
                </span>
                <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"
                    />
                </svg>
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 mt-2 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
                    {/* Day View */}
                    {mode === 'day' && (
                        <>
                            <div className="mb-3 flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={prevMonth}
                                    className="rounded-lg p-1 transition hover:bg-gray-100"
                                >
                                    <svg
                                        className="h-4 w-4 text-gray-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setMode('month')}
                                    className="text-sm font-semibold text-gray-800 transition hover:text-teal-500"
                                >
                                    {monthNames[viewMonth]} {viewYear}
                                </button>

                                <button
                                    type="button"
                                    onClick={nextMonth}
                                    className="rounded-lg p-1 transition hover:bg-gray-100"
                                >
                                    <svg
                                        className="h-4 w-4 text-gray-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="mb-1 grid grid-cols-7">
                                {dayNames.map((d) => (
                                    <div
                                        key={d}
                                        className="py-1 text-center text-xs font-semibold text-gray-400"
                                    >
                                        {d}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-y-1">
                                {cells.map((day, i) => {
                                    if (!day) return <div key={`e-${i}`} />;
                                    const isSelected =
                                        parsed &&
                                        parsed.getDate() === day &&
                                        parsed.getMonth() === viewMonth &&
                                        parsed.getFullYear() === viewYear;
                                    return (
                                        <button
                                            key={day}
                                            type="button"
                                            onClick={() => selectDate(day)}
                                            className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm transition ${
                                                isSelected
                                                    ? 'bg-teal-500 font-semibold text-white'
                                                    : 'text-gray-700 hover:bg-teal-50'
                                            }`}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    {/* Month View */}
                    {mode === 'month' && (
                        <>
                            <div className="mb-3 flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={() => setViewYear((y) => y - 1)}
                                    className="rounded-lg p-1 transition hover:bg-gray-100"
                                >
                                    <svg
                                        className="h-4 w-4 text-gray-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMode('year')}
                                    className="text-sm font-semibold text-gray-800 transition hover:text-teal-500"
                                >
                                    {viewYear}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setViewYear((y) => y + 1)}
                                    className="rounded-lg p-1 transition hover:bg-gray-100"
                                >
                                    <svg
                                        className="h-4 w-4 text-gray-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {monthNames.map((m, i) => (
                                    <button
                                        key={m}
                                        type="button"
                                        onClick={() => {
                                            setViewMonth(i);
                                            setMode('day');
                                        }}
                                        className={`rounded-xl py-2 text-sm transition ${
                                            viewMonth === i
                                                ? 'bg-teal-500 font-semibold text-white'
                                                : 'text-gray-700 hover:bg-teal-50'
                                        }`}
                                    >
                                        {m.slice(0, 3)}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Year View */}
                    {mode === 'year' && (
                        <>
                            <p className="mb-3 text-center text-sm font-semibold text-gray-800">
                                Pilih Tahun
                            </p>
                            <div className="grid max-h-48 grid-cols-4 gap-1.5 overflow-y-auto">
                                {years.map((y) => (
                                    <button
                                        key={y}
                                        type="button"
                                        onClick={() => {
                                            setViewYear(y);
                                            setMode('month');
                                        }}
                                        className={`rounded-xl py-1.5 text-sm transition ${
                                            viewYear === y
                                                ? 'bg-teal-500 font-semibold text-white'
                                                : 'text-gray-700 hover:bg-teal-50'
                                        }`}
                                    >
                                        {y}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default function Customer() {
    const { auth } = usePage().props as any;

    const [form, setForm] = useState({
        full_name: '',
        phone: '',
        gender: 'male',
        birth_date: '',
    });

    const submit = () => {
        router.post('/checkout/customer', form);
    };

    return (
        <AppLayout>
            <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-100 to-indigo-50 p-6">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        c
                        <p className="mb-1 text-xs font-semibold tracking-widest text-teal-500 uppercase">
                            Langkah 1 dari 3
                        </p>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Data Pembeli
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Isi informasi diri Anda untuk melanjutkan pembelian.
                        </p>
                    </div>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                    >
                        <svg
                            width="16"
                            height="16"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Kembali
                    </button>
                </div>

                {/* Card */}
                <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {/* Nama Lengkap */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">
                                Nama Lengkap
                            </label>
                            <input
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100 focus:outline-none"
                                placeholder="Contoh: Budi Santoso"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        full_name: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* No Handphone */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">
                                No. Handphone
                            </label>
                            <input
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100 focus:outline-none"
                                placeholder="08xxxxxxxxxx"
                                onChange={(e) =>
                                    setForm({ ...form, phone: e.target.value })
                                }
                            />
                        </div>

                        {/* Jenis Kelamin */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">
                                Jenis Kelamin
                            </label>
                            <select
                                className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 transition focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100 focus:outline-none"
                                onChange={(e) =>
                                    setForm({ ...form, gender: e.target.value })
                                }
                            >
                                <option value="male">Laki-laki</option>
                                <option value="female">Perempuan</option>
                            </select>
                        </div>

                        {/* Tanggal Lahir */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">
                                Tanggal Lahir
                            </label>
                            <DatePicker
                                value={form.birth_date}
                                onChange={(val) =>
                                    setForm({ ...form, birth_date: val })
                                }
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700">
                                Email
                            </label>
                            <input
                                className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-black"
                                value={auth.user.email}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="my-6 border-t border-gray-100" />

                    <button
                        onClick={submit}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3.5 text-sm font-bold text-white transition hover:bg-teal-600 active:bg-teal-700"
                    >
                        Lanjutkan
                        <svg
                            width="18"
                            height="18"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M5 12h14M13 6l6 6-6 6"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
