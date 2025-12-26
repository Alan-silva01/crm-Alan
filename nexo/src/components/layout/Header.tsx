'use client';

import { useSidebarStore } from '@/store';
import { Search, Bell, Calendar } from 'lucide-react';

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
    const { isCollapsed } = useSidebarStore();

    const today = new Date().toLocaleDateString('pt-BR', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    return (
        <header
            className={`
        fixed top-0 right-0 h-16 z-30
        flex items-center justify-between px-6
        bg-[var(--bg-primary)]/80 backdrop-blur-xl
        border-b border-[var(--border-subtle)]
        transition-all duration-300
        ${isCollapsed ? 'left-[68px]' : 'left-[240px]'}
      `}
        >
            {/* Left Side - Title */}
            <div>
                <h1 className="text-lg font-semibold text-[var(--text-primary)]">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-sm text-[var(--text-muted)]">{subtitle}</p>
                )}
            </div>

            {/* Right Side - Actions */}
            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="
              w-64 h-10 pl-10 pr-4
              bg-[var(--bg-secondary)] border border-[var(--border-subtle)]
              rounded-lg text-sm text-[var(--text-primary)]
              placeholder:text-[var(--text-muted)]
              focus:outline-none focus:border-[var(--accent-purple)]
              transition-colors
            "
                    />
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Calendar size={16} />
                    <span className="capitalize">{today}</span>
                </div>

                {/* Notifications */}
                <button className="icon-btn relative">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--accent-red)]" />
                </button>

                {/* User Avatar */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--accent-orange)] to-[var(--accent-pink)] flex items-center justify-center text-sm font-semibold cursor-pointer hover:ring-2 hover:ring-[var(--accent-purple)] transition-all">
                    RC
                </div>
            </div>
        </header>
    );
}
