'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarStore } from '@/store';
import {
    LayoutDashboard,
    Kanban,
    Users,
    MessageSquare,
    BarChart3,
    Settings,
    HelpCircle,
    ChevronLeft,
    ChevronRight,
    Bell,
    Search,
    Plus,
    Zap,
} from 'lucide-react';

interface NavItem {
    icon: React.ReactNode;
    label: string;
    href: string;
    badge?: number;
}

const mainNavItems: NavItem[] = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/' },
    { icon: <Kanban size={20} />, label: 'Kanban', href: '/kanban', badge: 5 },
    { icon: <MessageSquare size={20} />, label: 'Conversas', href: '/conversas', badge: 12 },
    { icon: <Users size={20} />, label: 'Clientes', href: '/clientes' },
    { icon: <BarChart3 size={20} />, label: 'Relatórios', href: '/relatorios' },
];

const bottomNavItems: NavItem[] = [
    { icon: <Settings size={20} />, label: 'Configurações', href: '/config' },
    { icon: <HelpCircle size={20} />, label: 'Ajuda', href: '/ajuda' },
];

export default function Sidebar() {
    const { isCollapsed, toggleSidebar } = useSidebarStore();
    const pathname = usePathname();

    return (
        <aside
            className={`
        fixed left-0 top-0 h-screen z-40
        flex flex-col
        bg-[var(--bg-secondary)] border-r border-[var(--border-subtle)]
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-[68px]' : 'w-[240px]'}
      `}
        >
            {/* Logo */}
            <div className={`
        flex items-center h-16 px-4 border-b border-[var(--border-subtle)]
        ${isCollapsed ? 'justify-center' : 'justify-between'}
      `}>
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-blue)] flex items-center justify-center">
                        <Zap size={20} className="text-white" />
                    </div>
                    {!isCollapsed && (
                        <span className="text-lg font-semibold text-[var(--text-primary)]">
                            Nexo
                        </span>
                    )}
                </Link>

                {!isCollapsed && (
                    <button
                        onClick={toggleSidebar}
                        className="icon-btn"
                    >
                        <ChevronLeft size={18} />
                    </button>
                )}
            </div>

            {/* Quick Actions */}
            {!isCollapsed && (
                <div className="px-3 py-4">
                    <button className="btn btn-primary w-full">
                        <Plus size={18} />
                        <span>Novo Lead</span>
                    </button>
                </div>
            )}

            {isCollapsed && (
                <div className="py-4 flex justify-center">
                    <button className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-blue)] flex items-center justify-center hover:opacity-90 transition-opacity">
                        <Plus size={18} className="text-white" />
                    </button>
                </div>
            )}

            {/* Main Navigation */}
            <nav className="flex-1 px-3 py-2 overflow-y-auto">
                <ul className="space-y-1">
                    {mainNavItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-all duration-200
                    ${isActive
                                            ? 'bg-[var(--accent-purple)]/15 text-[var(--accent-purple-light)]'
                                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                                        }
                    ${isCollapsed ? 'justify-center tooltip' : ''}
                  `}
                                    data-tooltip={isCollapsed ? item.label : undefined}
                                >
                                    <span className={isActive ? 'text-[var(--accent-purple)]' : ''}>
                                        {item.icon}
                                    </span>

                                    {!isCollapsed && (
                                        <>
                                            <span className="flex-1 text-sm font-medium">{item.label}</span>
                                            {item.badge && (
                                                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-[var(--accent-purple)]/20 text-[var(--accent-purple-light)]">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </>
                                    )}

                                    {isCollapsed && item.badge && (
                                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--accent-purple)]" />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Bottom Navigation */}
            <div className="px-3 py-4 border-t border-[var(--border-subtle)]">
                <ul className="space-y-1">
                    {bottomNavItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-all duration-200
                    ${isActive
                                            ? 'bg-[var(--bg-hover)] text-[var(--text-primary)]'
                                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                                        }
                    ${isCollapsed ? 'justify-center tooltip' : ''}
                  `}
                                    data-tooltip={isCollapsed ? item.label : undefined}
                                >
                                    {item.icon}
                                    {!isCollapsed && (
                                        <span className="text-sm font-medium">{item.label}</span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Collapse Toggle (when collapsed) */}
                {isCollapsed && (
                    <button
                        onClick={toggleSidebar}
                        className="w-full mt-4 flex justify-center"
                    >
                        <div className="icon-btn">
                            <ChevronRight size={18} />
                        </div>
                    </button>
                )}

                {/* User Profile */}
                {!isCollapsed && (
                    <div className="mt-4 p-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--accent-orange)] to-[var(--accent-pink)] flex items-center justify-center text-sm font-semibold">
                                RC
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                                    Rafael Costa
                                </p>
                                <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-[var(--accent-green)]" />
                                    Online
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}
