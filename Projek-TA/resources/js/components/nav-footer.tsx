import type { ComponentPropsWithoutRef } from 'react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { toUrl } from '@/lib/utils';
import { Home, Ticket, User, LifeBuoy } from 'lucide-react'; 
import type { NavItem } from '@/types';

export function NavFooter({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup>) {
    // Footer menu items
    const items: NavItem[] = [
        { title: 'Dashboard', href: '/dashboard', icon: Home },
        { title: 'Ticket', href: '/tickets', icon: Ticket },
        { title: 'Profile', href: '/profile', icon: User },
        { title: 'Support', href: '/support', icon: LifeBuoy },
    ];

    return (
        <SidebarGroup
            {...props}
            className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}
        >
            <SidebarGroupContent>
                <SidebarMenu className="flex justify-around">
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                className="flex flex-col items-center justify-center text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100"
                            >
                                <a href={toUrl(item.href)}>
                                    {item.icon && (
                                        <item.icon className="h-6 w-6 mb-1" />
                                    )}
                                    <span className="text-xs">{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}