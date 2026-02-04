import { Link, usePage } from '@inertiajs/react';
import AppLogo from './app-logo';

export function AppHeader() {
    const page = usePage();
    const auth = (page.props as any).auth;

    return (
        <header className="sticky top-0 z-50 border-b bg-black">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-2">
                    <AppLogo />
                </Link>

                <div className="flex items-center gap-3">
                    {!auth?.user ? (
                        <>
                            <Link href="/login">Login</Link>
                            <Link href="/register">Register</Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/register/eo"
                                className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
                            >
                                Jadi Event Organizer
                            </Link>

                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="rounded-md bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800"
                            >
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
