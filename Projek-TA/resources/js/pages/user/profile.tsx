import React, { useState } from 'react';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Profile() {
    const { auth } = usePage().props as any;
    const [activeTab, setActiveTab] = useState('akun');

    // State baru untuk mengontrol mode Edit di tab Akun
    const [isEditing, setIsEditing] = useState(false);

    const [isChatOpen, setIsChatOpen] = useState(false);

    // Form untuk Update Profil & Avatar (tambahkan destruct 'reset' di sini)
    const {
        data,
        setData,
        post,
        processing: processingProfile,
        reset: resetProfile,
    } = useForm({
        name: auth.user.name || '',
        phone: auth.user.phone || '',
        avatar: null as File | null,
        _method: 'PUT',
    });

    // Form untuk Ganti Password
    const {
        data: passwordData,
        setData: setPasswordData,
        post: postPassword,
        processing: processingPassword,
        reset: resetPassword,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/profile/update', {
            onSuccess: () => setIsEditing(false),
        });
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postPassword('/profile/password', {
            onSuccess: () => resetPassword(),
        });
    };
    // Fungsi membatalkan edit profil
    const cancelEdit = () => {
        resetProfile(); // Kembalikan form ke data original
        setIsEditing(false); // Tutup mode edit
    };

    return (
        <AppLayout>
            <div className="min-h-screen bg-gray-50 py-10">
                <Head title="Profil Saya" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="mb-8 text-2xl font-bold text-gray-900">
                        Pengaturan Akun
                    </h1>

                    <div className="flex flex-col gap-8 md:flex-row">
                        {/* --- SIDEBAR TAB --- */}
                        <aside className="flex w-full flex-shrink-0 flex-col gap-2 md:w-64">
                            <button
                                onClick={() => {
                                    setActiveTab('akun');
                                    setIsEditing(false);
                                }}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${activeTab === 'akun' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                Detail Akun
                            </button>

                            <button
                                onClick={() => setActiveTab('keamanan')}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${activeTab === 'keamanan' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                                Keamanan
                            </button>

                            <button
                                onClick={() => setActiveTab('status-eo')}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${activeTab === 'status-eo' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                                Status EO
                            </button>

                            {/* Area Bawah Sidebar (Logout & Bantuan) */}
                            <div className="mt-6 flex flex-col gap-2 border-t border-gray-200 pt-6">
                                {/* Tombol Logout Baru */}
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-bold text-red-600 transition hover:bg-red-50"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    Logout
                                </Link>

                                {/* Tombol Bantuan */}
                                <button
                                    onClick={() =>
                                        window.dispatchEvent(
                                            new Event('open-chatbot'),
                                        )
                                    }
                                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-bold text-blue-600 transition hover:bg-blue-50"
                                >
                                    💬 Butuh Bantuan?
                                </button>
                            </div>
                        </aside>

                        {/* --- CONTENT AREA --- */}
                        <main className="w-full flex-1 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
                            {/* TAB: DETAIL AKUN */}
                            {activeTab === 'akun' && (
                                <div className="w-full">
                                    <h2 className="mb-6 border-b pb-4 text-xl font-bold text-gray-900">
                                        Informasi Pribadi
                                    </h2>

                                    {!isEditing ? (
                                        /* MODE READ-ONLY (HANYA BACA) */
                                        <div className="space-y-6">
                                            {/* Tampilan Foto Profil */}
                                            <div className="flex items-center gap-6">
                                                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                                                    {auth.user.avatar ? (
                                                        <img
                                                            src={`/storage/${auth.user.avatar}`}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-xs text-gray-400">
                                                            No Photo
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Tampilan Data */}
                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                <div className="md:col-span-2">
                                                    <p className="text-sm font-medium text-gray-500">
                                                        Username
                                                    </p>
                                                    <p className="mt-1 text-lg font-medium text-gray-900">
                                                        {auth.user.name || '-'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">
                                                        Email
                                                    </p>
                                                    <p className="mt-1 text-base text-gray-900">
                                                        {auth.user.email}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">
                                                        Nomor Hp
                                                    </p>
                                                    <p className="mt-1 text-base text-gray-900">
                                                        {auth.user.phone || '-'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="pt-4">
                                                <button
                                                    onClick={() =>
                                                        setIsEditing(true)
                                                    }
                                                    className="rounded-lg bg-blue-600 px-6 py-2.5 font-bold text-white transition hover:bg-blue-700"
                                                >
                                                    Edit Profile
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* MODE EDIT (FORM) */
                                        <form
                                            onSubmit={handleProfileSubmit}
                                            className="w-full space-y-6"
                                        >
                                            {/* Upload Avatar */}
                                            <div className="flex items-center gap-6">
                                                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                                                    {data.avatar ? (
                                                        // Menampilkan preview jika user memilih file baru
                                                        <img
                                                            src={URL.createObjectURL(
                                                                data.avatar,
                                                            )}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : auth.user.avatar ? (
                                                        <img
                                                            src={`/storage/${auth.user.avatar}`}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-xs text-gray-400">
                                                            No Photo
                                                        </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                                        Pilih Foto Baru
                                                    </label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) =>
                                                            setData(
                                                                'avatar',
                                                                e.target.files
                                                                    ? e.target
                                                                          .files[0]
                                                                    : null,
                                                            )
                                                        }
                                                        className="text-sm text-gray-500 transition file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Username
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.name}
                                                        onChange={(e) =>
                                                            setData(
                                                                'name',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        value={auth.user.email}
                                                        disabled
                                                        className="mt-1 block w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Nomor Hp
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.phone}
                                                        onChange={(e) =>
                                                            setData(
                                                                'phone',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                        placeholder="0812xxxx"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 pt-4">
                                                <button
                                                    type="submit"
                                                    disabled={processingProfile}
                                                    className="rounded-lg bg-blue-600 px-6 py-2.5 font-bold text-white transition hover:bg-blue-700"
                                                >
                                                    Simpan Perubahan
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={cancelEdit}
                                                    disabled={processingProfile}
                                                    className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 font-bold text-gray-700 transition hover:bg-gray-50"
                                                >
                                                    Batal
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            )}

                            {/* TAB: KEAMANAN (Tetap sama seperti sebelumnya) */}
                            {activeTab === 'keamanan' && (
                                <form
                                    onSubmit={handlePasswordSubmit}
                                    className="w-full space-y-6"
                                >
                                    <h2 className="border-b pb-4 text-xl font-bold text-gray-900">
                                        Ganti Password
                                    </h2>
                                    <div className="space-y-4 md:w-2/3 lg:w-1/2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Password Saat Ini
                                            </label>
                                            <input
                                                type="password"
                                                value={
                                                    passwordData.current_password
                                                }
                                                onChange={(e) =>
                                                    setPasswordData(
                                                        'current_password',
                                                        e.target.value,
                                                    )
                                                }
                                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Password Baru
                                            </label>
                                            <input
                                                type="password"
                                                value={passwordData.password}
                                                onChange={(e) =>
                                                    setPasswordData(
                                                        'password',
                                                        e.target.value,
                                                    )
                                                }
                                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Konfirmasi Password Baru
                                            </label>
                                            <input
                                                type="password"
                                                value={
                                                    passwordData.password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setPasswordData(
                                                        'password_confirmation',
                                                        e.target.value,
                                                    )
                                                }
                                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={processingPassword}
                                            className="rounded-lg bg-blue-600 px-6 py-2.5 font-bold text-white transition hover:bg-blue-700"
                                        >
                                            Update Password
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* TAB: STATUS EO (Tetap sama seperti sebelumnya) */}
                            {activeTab === 'status-eo' && (
                                <div className="w-full space-y-6">
                                    <h2 className="border-b pb-4 text-xl font-bold text-gray-900">
                                        Status Akun Organizer
                                    </h2>
                                    <div className="flex flex-col items-start gap-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 md:flex-row md:items-center">
                                        {auth.user.role === 'eo' ? (
                                            <>
                                                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-8 w-8"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900">
                                                        Anda adalah Event
                                                        Organizer
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Anda sudah bisa membuat
                                                        dan mengelola event Anda
                                                        sendiri di dashboard EO.
                                                    </p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-8 w-8"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-gray-900">
                                                        Tertarik Menjadi EO?
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Mulai buat event-mu
                                                        sendiri dan jual tiket
                                                        secara mudah dengan
                                                        bergabung sebagai
                                                        Organizer.
                                                    </p>
                                                </div>
                                                <a
                                                    href="/register/eo"
                                                    className="mt-4 rounded-lg bg-blue-600 px-6 py-2.5 text-center font-bold whitespace-nowrap text-white transition hover:bg-blue-700 md:mt-0"
                                                >
                                                    Daftar EO Sekarang
                                                </a>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
