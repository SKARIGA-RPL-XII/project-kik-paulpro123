import { Link, usePage } from '@inertiajs/react';

export default function EOSidebar() {
    const { url } = usePage();

    const menus = [
        { label: 'Dashboard', href: '/eo/dashboard' },
        { label: 'Event', href: '/eo/manage-event' },
        { label: 'Customer', href: '/eo/customers' },
        { label: 'Payment Settings', href: '/eo/payment-methods' },
        { label: 'Laporan', href: '/eo/reports' },
    ];

    return (
        <aside className="min-h-screen w-64 border-r bg-white px-4 py-6">
            <h2 className="mb-6 text-lg font-bold text-gray-800">EO Panel</h2>

            <nav className="space-y-1">
                {menus.map((menu) => {
                    const active = url.startsWith(menu.href);

                    return (
                        <Link
                            key={menu.href}
                            href={menu.href}
                            className={`block rounded-md px-4 py-2 text-sm font-medium transition ${
                                active
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                            } `}
                        >
                            {menu.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
