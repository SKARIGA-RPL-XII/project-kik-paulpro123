import { Link } from '@inertiajs/react';
import { Home, Ticket, User, LifeBuoy } from 'lucide-react';
import type { NavItem } from '@/types';

export default function NavFooter() {
  const items: NavItem[] = [
    { title: 'Dashboard', href: '/dashboard', icon: Home },
    { title: 'Ticket', href: '/user', icon: Ticket },
    { title: 'Profile', href: '/profile', icon: User },
    { title: 'Support', href: '/support', icon: LifeBuoy },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white dark:bg-neutral-900">
      <ul className="flex justify-around">
        {items.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              className="flex flex-col items-center gap-1 px-3 py-2 text-xs text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              {item.icon && <item.icon className="h-6 w-6" />}
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}