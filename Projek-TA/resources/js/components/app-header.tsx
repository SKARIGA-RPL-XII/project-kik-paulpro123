import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLogo from './app-logo';
import UserChatbot from '@/components/user-chatbot';

export function AppHeader() {
    const page = usePage();
    const auth = (page.props as any).auth;

    // Hanya butuh state untuk Chatbot sekarang
    const [isChatOpen, setIsChatOpen] = useState(false);

    // MENDENGARKAN PERINTAH DARI HALAMAN LAIN UNTUK MEMBUKA CHATBOT
    useEffect(() => {
        const openChat = () => setIsChatOpen(true);
        window.addEventListener('open-chatbot', openChat);

        // Cleanup listener saat komponen mati
        return () => window.removeEventListener('open-chatbot', openChat);
    }, []);

    return (
        <>
            <header className="sticky top-0 z-50 border-b bg-black">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <AppLogo />
                    </Link>

                    <div className="flex items-center gap-3">
                        {!auth?.user ? (
                            <>
                                <Link
                                    href="/login"
                                    className="text-white hover:text-gray-300"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="text-white hover:text-gray-300"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/register/eo"
                                    className="rounded-md px-2 py-2 text-sm font-semibold text-gray-300 hover:text-white"
                                >
                                    Event Organizer?
                                </Link>
                                <Link
                                    href="/tickets"
                                    className="rounded-md px-2 py-2 text-sm font-semibold text-gray-300 hover:text-white"
                                >
                                    My Ticket
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className="rounded-md px-2 py-2 text-sm font-semibold text-gray-300 hover:text-white"
                                >
                                    Dashboard
                                </Link>
                                {/* IKON PROFIL SEKARANG MENJADI LINK LANGSUNG KE /profile */}
                                <Link
                                    href="/profile"
                                    className="ml-2 flex items-center gap-2 focus:outline-none"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-gray-600 bg-gray-800 transition-all hover:border-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                                        {auth?.user?.avatar ? (
                                            <img
                                                src={`/storage/${auth.user.avatar}`}
                                                alt="Avatar"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-300"
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
                                        )}
                                    </div>
                                </Link>{' '}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <UserChatbot
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
            />
        </>
    );
}
