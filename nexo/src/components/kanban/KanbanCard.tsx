'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/types';
import { useKanbanStore } from '@/store';
import {
    MessageSquare,
    Phone,
    MoreHorizontal,
    Clock,
    User,
    Tag,
} from 'lucide-react';

interface KanbanCardProps {
    card: Card;
}

const prioridadeCores: Record<string, string> = {
    baixa: 'var(--accent-green)',
    media: 'var(--accent-blue)',
    alta: 'var(--accent-yellow)',
    urgente: 'var(--accent-red)',
};

const tagCores: Record<string, string> = {
    vip: 'badge-purple',
    'lead-quente': 'badge-yellow',
    whatsapp: 'badge-green',
    b2b: 'badge-blue',
    urgente: 'badge-red',
    orçamento: 'badge-purple',
    suporte: 'badge-blue',
    agendar: 'badge-yellow',
    proposta: 'badge-purple',
    instagram: 'badge-pink',
    retorno: 'badge-blue',
};

export default function KanbanCard({ card }: KanbanCardProps) {
    const { selectCard } = useKanbanStore();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: card.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const tempoDecorrido = () => {
        const agora = new Date();
        const diff = agora.getTime() - new Date(card.criadoEm).getTime();
        const minutos = Math.floor(diff / 60000);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);

        if (dias > 0) return `${dias}d`;
        if (horas > 0) return `${horas}h`;
        return `${minutos}m`;
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => selectCard(card)}
            className={`
        card p-4 cursor-grab active:cursor-grabbing
        hover:border-[var(--accent-purple)]/50
        ${isDragging ? 'opacity-50 shadow-lg scale-[1.02]' : ''}
        transition-all duration-200
        animate-fadeIn
      `}
        >
            {/* Priority indicator */}
            <div
                className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
                style={{ backgroundColor: prioridadeCores[card.prioridade] }}
            />

            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-blue)] flex items-center justify-center text-xs font-semibold">
                        {card.cliente.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-[var(--text-primary)] line-clamp-1">
                            {card.cliente.nome}
                        </h4>
                        <p className="text-xs text-[var(--text-muted)]">
                            {card.cliente.telefone}
                        </p>
                    </div>
                </div>
                <button
                    className="icon-btn w-7 h-7"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Menu de opções
                    }}
                >
                    <MoreHorizontal size={14} />
                </button>
            </div>

            {/* Description */}
            {card.descricao && (
                <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">
                    {card.descricao}
                </p>
            )}

            {/* Tags */}
            {card.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {card.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className={`badge ${tagCores[tag] || 'badge-purple'} text-[10px]`}
                        >
                            {tag}
                        </span>
                    ))}
                    {card.tags.length > 3 && (
                        <span className="badge badge-purple text-[10px]">
                            +{card.tags.length - 3}
                        </span>
                    )}
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                        <Clock size={12} />
                        <span>{tempoDecorrido()}</span>
                    </div>

                    {card.atendenteId && (
                        <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                            <User size={12} />
                            <span>Atribuído</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-1">
                    <button className="icon-btn w-7 h-7 hover:text-[var(--accent-green)]">
                        <Phone size={14} />
                    </button>
                    <button className="icon-btn w-7 h-7 hover:text-[var(--accent-blue)]">
                        <MessageSquare size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
