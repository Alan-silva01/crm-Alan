'use client';

import { useDroppable } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Coluna, Card } from '@/types';
import KanbanCard from './KanbanCard';
import { Plus, MoreHorizontal, Inbox, MessageCircle, Clock, Bell, CheckCircle, XCircle } from 'lucide-react';

interface KanbanColumnProps {
    coluna: Coluna;
    cards: Card[];
}

const icones: Record<string, React.ReactNode> = {
    inbox: <Inbox size={16} />,
    'message-circle': <MessageCircle size={16} />,
    clock: <Clock size={16} />,
    bell: <Bell size={16} />,
    'check-circle': <CheckCircle size={16} />,
    'x-circle': <XCircle size={16} />,
};

export default function KanbanColumn({ coluna, cards }: KanbanColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: coluna.id,
    });

    const cardIds = cards.map((card) => card.id);

    return (
        <div
            className={`
        flex flex-col w-[320px] min-w-[320px] h-full
        bg-[var(--bg-secondary)]/50 rounded-xl
        border border-[var(--border-subtle)]
        ${isOver ? 'border-[var(--accent-purple)] bg-[var(--accent-purple)]/5' : ''}
        transition-all duration-200
      `}
        >
            {/* Column Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-3">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${coluna.cor}20`, color: coluna.cor }}
                    >
                        {icones[coluna.icone]}
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                            {coluna.titulo}
                        </h3>
                        <p className="text-xs text-[var(--text-muted)]">
                            {cards.length} {cards.length === 1 ? 'card' : 'cards'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <button className="icon-btn w-7 h-7 hover:text-[var(--accent-purple)]">
                        <Plus size={16} />
                    </button>
                    <button className="icon-btn w-7 h-7">
                        <MoreHorizontal size={16} />
                    </button>
                </div>
            </div>

            {/* Column Content */}
            <div
                ref={setNodeRef}
                className="flex-1 p-3 space-y-3 overflow-y-auto"
            >
                <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
                    {cards.map((card) => (
                        <KanbanCard key={card.id} card={card} />
                    ))}
                </SortableContext>

                {/* Empty State */}
                {cards.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                            style={{ backgroundColor: `${coluna.cor}15`, color: coluna.cor }}
                        >
                            {icones[coluna.icone]}
                        </div>
                        <p className="text-sm text-[var(--text-muted)]">
                            Nenhum card aqui
                        </p>
                        <button className="btn btn-ghost mt-2 text-xs">
                            <Plus size={14} />
                            Adicionar
                        </button>
                    </div>
                )}
            </div>

            {/* Quick Add */}
            <div className="p-3 border-t border-[var(--border-subtle)]">
                <button className="w-full py-2 px-3 rounded-lg text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all flex items-center gap-2 justify-center">
                    <Plus size={16} />
                    Adicionar card
                </button>
            </div>
        </div>
    );
}
