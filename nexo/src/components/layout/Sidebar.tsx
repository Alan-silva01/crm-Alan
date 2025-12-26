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
            style={{ width: isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)' }}
            className="fixed top-0 left-0 h-screen bg-[var(--bg-secondary)] border-r border-[var(--border-subtle)] flex flex-col z-50 transition-all duration-300 ease-in-out"
        >
            {/* Logo */}
            <div className={`
        flex items-center h-20 px-4 mb-2
        ${isCollapsed ? 'justify-center' : 'justify-between'}
      `}>
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-blue)] flex items-center justify-center shadow-[var(--shadow-glow-purple)]">
                        <Zap size={22} className="text-white" />
                    </div>
                    {!isCollapsed && (
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            Nexo
                        </span>
                    )}
                </Link>

                {!isCollapsed && (
                    <button
                        onClick={toggleSidebar}
                        className="icon-btn hover:text-[var(--text-primary)]"
                    >
                        <ChevronLeft size={20} />
                    </button>
                )}
            </div>

            {/* Quick Actions */}
            {!isCollapsed && (
                <div className="px-4 mb-6">
                    <button className="btn w-full bg-[var(--accent-purple)] text-white hover:bg-[var(--accent-purple)]/90 shadow-[var(--shadow-glow-purple)] border-0 h-11">
                        <Plus size={20} />
                        <span className="font-semibold">Novo Lead</span>
                    </button>
                </div>
            )}

            {isCollapsed && (
                <div className="mb-6 flex justify-center">
                    <button className="w-11 h-11 rounded-full bg-[var(--accent-purple)] flex items-center justify-center hover:opacity-90 transition-opacity shadow-[var(--shadow-glow-purple)]">
                        <Plus size={22} className="text-white" />
                    </button>
                </div>
            )}

            {/* Main Navigation */}
            <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
                {mainNavItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                flex items-center h-11 px-3 rounded-xl
                                transition-all duration-200 group relative
                                ${isActive
                                    ? 'bg-[var(--accent-purple)]/10 text-[var(--accent-purple-light)]'
                                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                                }
                                ${isCollapsed ? 'justify-center' : 'gap-3'}
                            `}
                        >
                            <span className={`
                                flex-shrink-0 flex items-center justify-center
                                transition-transform duration-200 group-hover:scale-110
                                ${isActive ? 'text-[var(--accent-purple)]' : ''}
                            `}>
                                {item.icon}
                            </span>

                            {!isCollapsed && (
                                <>
                                    <span className="flex-1 font-medium truncate">{item.label}</span>
                                    {item.badge && (
                                        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)]">
                                            {item.badge}
                                        </span>
                                    )}
                                </>
                            )}

                            {isCollapsed && item.badge && (
                                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--accent-purple)] border border-[var(--bg-secondary)]" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Navigation */}
            <div className="p-4 mt-auto space-y-1">
                {bottomNavItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`
                            flex items-center gap-3 px-3 py-3 rounded-xl
                            text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]
                            transition-all duration-200
                            ${isCollapsed ? 'justify-center' : ''}
                        `}
                    >
                        {item.icon}
                        {!isCollapsed && (
                            <span className="font-medium">{item.label}</span>
                        )}
                    </Link>
                ))}

                {/* Collapse Toggle (when collapsed) */}
                {isCollapsed && (
                    <button
                        onClick={toggleSidebar}
                        className="w-full flex justify-center pt-2"
                    >
                        <ChevronRight size={20} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]" />
                    </button>
                )}

                {/* User Profile */}
                {!isCollapsed && (
                    <div className="mt-4 p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] group cursor-pointer hover:border-[var(--border-hover)] transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-orange)] to-[var(--accent-pink)] flex items-center justify-center font-bold text-white shadow-lg">
                                RC
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm truncate text-white group-hover:text-[var(--accent-purple-light)] transition-colors">
                                    Rafael Costa
                                </p>
                                <p className="text-xs text-[var(--text-muted)] flex items-center gap-1.5 mt-0.5">
                                    <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
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
