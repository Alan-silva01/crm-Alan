'use client';

import { useSidebarStore } from '@/store';
import { Sidebar, Header } from '@/components/layout';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { isCollapsed } = useSidebarStore();

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            {/* Sidebar - Fixed Left */}
            <Sidebar />

            {/* Header - Fixed Top (Adjusts with Sidebar) */}
            <Header title="Dashboard" subtitle="Visão Geral" />

            {/* Main Content Area */}
            <main
                style={{
                    paddingLeft: isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
                    paddingTop: '5rem' // Header Height
                }}
                className="transition-all duration-300 ease-in-out min-h-screen"
            >
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
