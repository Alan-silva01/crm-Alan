'use client';

import { useSidebarStore, useKanbanStore, useAtendentesStore } from '@/store';
import { KanbanBoard } from '@/components/kanban';
import {
    Users,
    MessageSquare,
    TrendingUp,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    RefreshCw,
    Settings2,
} from 'lucide-react';

export default function KanbanPage() {
    const { isCollapsed } = useSidebarStore();
    const { cards, colunas } = useKanbanStore();
    const { atendentes } = useAtendentesStore();

    const totalCards = cards.length;
    const atendentesOnline = atendentes.filter(a => a.status === 'online').length;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white">
                        Quadro de Atividades
                    </h2>
                    <p className="text-sm text-[var(--text-muted)]">
                        {totalCards} cards em {colunas.length} colunas • {atendentesOnline} atendentes online
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button className="btn bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]">
                        <Filter size={16} />
                        Filtrar
                    </button>
                    <button className="btn bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]">
                        <RefreshCw size={16} />
                        Atualizar
                    </button>
                </div>
            </div>

            <div className="h-[calc(100vh-220px)] min-h-[500px]">
                <KanbanBoard />
            </div>
        </div>
    );
}
