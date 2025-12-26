'use client';

import { useState } from 'react';
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useKanbanStore } from '@/store';
import { Card } from '@/types';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';

export default function KanbanBoard() {
    const { colunas, cards, moveCard, setCards } = useKanbanStore();
    const [activeCard, setActiveCard] = useState<Card | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const card = cards.find((c) => c.id === active.id);
        if (card) {
            setActiveCard(card);
        }
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        const activeCard = cards.find((c) => c.id === activeId);
        if (!activeCard) return;

        // Check if dropped over a column
        const overColumn = colunas.find((col) => col.id === overId);
        if (overColumn && activeCard.colunaId !== overId) {
            moveCard(activeId, overId, 0);
        }

        // Check if dropped over another card
        const overCard = cards.find((c) => c.id === overId);
        if (overCard && activeCard.colunaId !== overCard.colunaId) {
            moveCard(activeId, overCard.colunaId, overCard.posicao);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveCard(null);

        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        if (activeId === overId) return;

        const activeCard = cards.find((c) => c.id === activeId);
        const overCard = cards.find((c) => c.id === overId);

        if (!activeCard) return;

        // If dropped on a card in the same column, reorder
        if (overCard && activeCard.colunaId === overCard.colunaId) {
            const columnCards = cards.filter((c) => c.colunaId === activeCard.colunaId);
            const activeIndex = columnCards.findIndex((c) => c.id === activeId);
            const overIndex = columnCards.findIndex((c) => c.id === overId);

            if (activeIndex !== overIndex) {
                const newCards = [...cards];
                const reorderedColumnCards = arrayMove(columnCards, activeIndex, overIndex);

                // Update positions
                reorderedColumnCards.forEach((card, index) => {
                    const cardIndex = newCards.findIndex((c) => c.id === card.id);
                    if (cardIndex !== -1) {
                        newCards[cardIndex] = { ...newCards[cardIndex], posicao: index };
                    }
                });

                setCards(newCards);
            }
        }
    };

    // Ordena cards por posição
    const getCardsPorColuna = (colunaId: string) => {
        return cards
            .filter((card) => card.colunaId === colunaId)
            .sort((a, b) => a.posicao - b.posicao);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="flex gap-4 h-full overflow-x-auto pb-4 px-1">
                {colunas
                    .sort((a, b) => a.ordem - b.ordem)
                    .map((coluna) => (
                        <KanbanColumn
                            key={coluna.id}
                            coluna={coluna}
                            cards={getCardsPorColuna(coluna.id)}
                        />
                    ))}
            </div>

            {/* Drag Overlay */}
            <DragOverlay>
                {activeCard && (
                    <div className="rotate-2 scale-105">
                        <KanbanCard card={activeCard} />
                    </div>
                )}
            </DragOverlay>
        </DndContext>
    );
}
