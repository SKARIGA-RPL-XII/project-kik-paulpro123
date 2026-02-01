import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import NavFooter from '@/components/nav-footer';
import type { AppLayoutProps } from '@/types';

export default function AppHeaderLayout({
    children,
    breadcrumbs,
}: AppLayoutProps) {
    return (
        <AppShell>
            <AppHeader/>
            <AppContent className="pb-16" >{children}</AppContent>
            <NavFooter/>
        </AppShell>
    );
}
