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
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });

    return (
        <header
            style={{ left: isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)' }}
            className="fixed top-0 right-0 h-20 z-40 flex items-center justify-between px-10 bg-[var(--bg-primary)]/80 backdrop-blur-xl transition-all duration-300 ease-in-out border-b border-[var(--border-subtle)]"
        >
            {/* Left Side - Title */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-sm text-[var(--text-secondary)] mt-0.5">{subtitle}</p>
                )}
            </div>

            {/* Right Side - Actions */}
            <div className="flex items-center gap-6">
                {/* Search */}
                <div className="relative group">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--accent-purple)] transition-colors"
                    />
                    <input
                        type="text"
                        placeholder="Buscar em alertas..."
                        className="
              w-72 h-11 pl-10 pr-4
              bg-[var(--bg-secondary)] 
              rounded-xl text-sm text-[var(--text-primary)]
              placeholder:text-[var(--text-muted)]
              focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]/50
              transition-all duration-200
            "
                    />
                </div>

                {/* Date */}
                <div className="hidden md:flex items-center gap-2 text-sm text-[var(--text-secondary)] bg-[var(--bg-secondary)] px-3 py-2 rounded-lg">
                    <Calendar size={16} />
                    <span className="capitalize">{today}</span>
                </div>

                {/* Notifications */}
                <button className="relative w-11 h-11 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-white transition-all">
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-3 w-2.5 h-2.5 rounded-full bg-[var(--accent-red)] border-2 border-[var(--bg-secondary)] box-content" />
                </button>

                {/* User Avatar */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-blue)] p-0.5 cursor-pointer hover:shadow-[var(--shadow-glow-purple)] transition-all">
                    <div className="w-full h-full rounded-full bg-[var(--bg-primary)] p-0.5">
                        <img src="https://ui-avatars.com/api/?name=Alex+Robert&background=random" alt="User" className="w-full h-full rounded-full" />
                    </div>
                </div>
            </div>
        </header>
    );
}
