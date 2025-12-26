'use client';

import {
    MoreHorizontal,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

export const DonutChart = () => (
    <div className="relative w-40 h-40">
        <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
            {/* Background Circle */}
            <circle cx="50" cy="50" r="40" stroke="#1f1f29" strokeWidth="15" fill="none" />

            {/* Segments - CRM Status */}
            {/* Won/Qualified - Green */}
            <circle cx="50" cy="50" r="40" stroke="#10b981" strokeWidth="15" fill="none"
                strokeDasharray="90 251" strokeDashoffset="0" className="opacity-100" />

            {/* Negotiation - Yellow/Orange */}
            <circle cx="50" cy="50" r="40" stroke="#f59e0b" strokeWidth="15" fill="none"
                strokeDasharray="70 251" strokeDashoffset="-95" className="opacity-100" />

            {/* New/Lost - Blue/Purple */}
            <circle cx="50" cy="50" r="40" stroke="#3b82f6" strokeWidth="15" fill="none"
                strokeDasharray="80 251" strokeDashoffset="-170" className="opacity-100" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">482</span>
            <span className="text-xs text-[var(--text-muted)]">Leads</span>
        </div>
    </div>
);

export const AreaChart = () => (
    <div className="w-full h-full flex items-end justify-between gap-1 relative overflow-hidden min-h-[200px]">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-50">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-[1px] bg-[var(--border-subtle)]" />
            ))}
        </div>

        {/* Path for the line */}
        <svg className="absolute inset-0 w-full h-full pb-6" preserveAspectRatio="none">
            <defs>
                <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path
                d="M0,80 C20,70 40,90 60,60 C80,30 100,50 120,40 C140,30 160,50 180,20 C200,10 220,30 240,40 L240,150 L0,150 Z"
                fill="url(#areaGradient)"
            />
            <path
                d="M0,80 C20,70 40,90 60,60 C80,30 100,50 120,40 C140,30 160,50 180,20 C200,10 220,30 240,40"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
            />

            {/* Dot at the end */}
            <circle cx="95%" cy="20%" r="5" fill="#18181b" stroke="#3b82f6" strokeWidth="2" />
        </svg>

        {/* Tooltip mockup at the dot */}
        <div className="absolute right-[5%] top-[5%] bg-[var(--bg-elevated)] px-2 py-1 rounded text-xs border border-[var(--border-subtle)] text-white shadow-lg">
            42 Leads hoje
        </div>
    </div>
);

export const BarChart = () => {
    // Generate some random heights for bars
    const heights = [40, 65, 45, 80, 55, 70, 45, 60, 35, 50, 75, 60, 40, 55];

    return (
        <div className="w-full h-32 flex items-end gap-1.5 pt-4">
            {heights.map((h, i) => (
                <div
                    key={i}
                    className="flex-1 rounded-sm transition-all hover:opacity-80 relative group"
                    style={{
                        height: `${h}%`,
                        backgroundColor: i % 2 === 0 ? 'var(--accent-purple)' : 'var(--accent-blue)',
                        opacity: i > 8 ? 0.3 : 1
                    }}
                >
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-1.5 py-0.5 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        {h} msg
                    </div>
                </div>
            ))}
        </div>
    );
};
