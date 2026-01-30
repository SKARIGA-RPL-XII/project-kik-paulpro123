import { Link } from '@inertiajs/react';
import AppLogo from './app-logo';

export function AppHeader() {
    return (
        <header className="sticky top-0 z-50 border-b bg-black">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <AppLogo />
                </Link>

                {/* Right Action */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/login"
                        className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                        Login
                    </Link>

                    <Link
                        href="/register"
                        className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </header>
    );
}
