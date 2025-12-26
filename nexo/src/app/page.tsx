'use client';

import { useSidebarStore, useKanbanStore, useAtendentesStore } from '@/store';
import { Header } from '@/components/layout';
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

export default function Home() {
  const { isCollapsed } = useSidebarStore();
  const { cards, colunas } = useKanbanStore();
  const { atendentes } = useAtendentesStore();

  // Calcula estatísticas
  const totalCards = cards.length;
  const cardsNovos = cards.filter(c => c.colunaId === 'novos').length;
  const cardsEmAtendimento = cards.filter(c => c.colunaId === 'em-atendimento').length;
  const cardsConvertidos = cards.filter(c => c.colunaId === 'convertido').length;
  const taxaConversao = totalCards > 0 ? ((cardsConvertidos / totalCards) * 100).toFixed(1) : '0';
  const atendentesOnline = atendentes.filter(a => a.status === 'online').length;

  const stats = [
    {
      titulo: 'Novos Leads',
      valor: cardsNovos,
      variacao: '+12%',
      positivo: true,
      icone: <Users size={20} />,
      cor: 'var(--accent-purple)',
    },
    {
      titulo: 'Em Atendimento',
      valor: cardsEmAtendimento,
      variacao: '+5%',
      positivo: true,
      icone: <MessageSquare size={20} />,
      cor: 'var(--accent-blue)',
    },
    {
      titulo: 'Taxa Conversão',
      valor: `${taxaConversao}%`,
      variacao: '+2.1%',
      positivo: true,
      icone: <TrendingUp size={20} />,
      cor: 'var(--accent-green)',
    },
    {
      titulo: 'Tempo Médio',
      valor: '8m 32s',
      variacao: '-15%',
      positivo: true,
      icone: <Clock size={20} />,
      cor: 'var(--accent-cyan)',
    },
  ];

  return (
    <main
      className={`
        min-h-screen pt-16
        transition-all duration-300
        ${isCollapsed ? 'pl-[68px]' : 'pl-[240px]'}
      `}
    >
      <Header title="Dashboard" subtitle="Visão geral do atendimento" />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card p-5 hover:border-[var(--border-hover)] animate-slideIn"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.cor}20`, color: stat.cor }}
                >
                  {stat.icone}
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${stat.positivo ? 'text-[var(--accent-green)]' : 'text-[var(--accent-red)]'}`}>
                  {stat.positivo ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.variacao}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-semibold text-[var(--text-primary)]">
                  {stat.valor}
                </p>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  {stat.titulo}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Kanban Section */}
        <div className="space-y-4">
          {/* Kanban Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Kanban de Atendimento
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                {totalCards} cards em {colunas.length} colunas • {atendentesOnline} atendentes online
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="btn btn-ghost">
                <Filter size={16} />
                Filtrar
              </button>
              <button className="btn btn-ghost">
                <RefreshCw size={16} />
                Atualizar
              </button>
              <button className="btn btn-ghost">
                <Settings2 size={16} />
              </button>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="h-[calc(100vh-340px)] min-h-[500px]">
            <KanbanBoard />
          </div>
        </div>
      </div>
    </main>
  );
}
