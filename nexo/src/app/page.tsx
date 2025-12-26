'use client';

import {
  Users,
  MessageCircle,
  TrendingUp,
  DollarSign,
  MoreVertical,
  ArrowUpRight,
  UserPlus,
  MessageSquare
} from 'lucide-react';
import { DonutChart, AreaChart, BarChart } from '@/components/dashboard/Charts';

export default function Home() {
  // CRM Stats for WhatsApp Context
  const stats = [
    {
      label: 'Novos Leads (WhatsApp)',
      value: '124',
      change: '+18.2%',
      isPositive: true,
      icon: <UserPlus size={20} className="text-[var(--accent-blue)]" />,
      subtext: 'vs. semana anterior',
      color: 'var(--accent-blue)'
    },
    {
      label: 'Conversas Ativas',
      value: '48',
      change: '+5.4%',
      isPositive: true,
      icon: <MessageCircle size={20} className="text-[var(--accent-purple)]" />,
      subtext: 'Agora',
      color: 'var(--accent-purple)'
    },
    {
      label: 'Vendas Fechadas',
      value: 'R$ 42.5k',
      change: '+12.5%',
      isPositive: true,
      icon: <DollarSign size={20} className="text-[var(--accent-green)]" />,
      subtext: 'Este mês',
      color: 'var(--accent-green)'
    },
    {
      label: 'Taxa de Conversão',
      value: '22.4%',
      change: '-2.1%',
      isPositive: false,
      icon: <TrendingUp size={20} className="text-[var(--accent-orange)]" />,
      subtext: 'Média geral',
      color: 'var(--accent-orange)'
    },
  ];

  // Recent Leads Data
  const recentLeads = [
    { id: 1, name: 'Ana Silva', origin: 'WhatsApp', time: '10 min atrás', status: 'Novo', statusColor: 'bg-blue-500' },
    { id: 2, name: 'Carlos Oliveira', origin: 'Instagram', time: '35 min atrás', status: 'Em negociação', statusColor: 'bg-yellow-500' },
    { id: 3, name: 'Marcos Santos', origin: 'Indicação', time: '1h atrás', status: 'Agendado', statusColor: 'bg-purple-500' },
    { id: 4, name: 'Julia Costa', origin: 'WhatsApp', time: '2h atrás', status: 'Novo', statusColor: 'bg-blue-500' },
    { id: 5, name: 'Pedro Alves', origin: 'Site', time: '3h atrás', status: 'Qualificado', statusColor: 'bg-green-500' },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fadeIn pb-10">
      {/* Top Stats Row - Inspiration: Paycent/Metric Flow */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[var(--bg-card)] p-10 rounded-3xl border border-[var(--border-subtle)] hover:border-[var(--border-hover)] transition-all group flex flex-col justify-between min-h-[190px] shadow-lg hover:shadow-[var(--shadow-glow-blue)] relative overflow-hidden">
            {/* Subtle Gradient Background */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br from-[${stat.color}] to-transparent`} />

            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform scale-150 pointer-events-none">
              {stat.icon}
            </div>
            <div className="flex justify-between items-start relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[var(--bg-elevated)] flex items-center justify-center group-hover:scale-110 transition-transform border border-[var(--border-subtle)] shadow-inner">
                {stat.icon}
              </div>
              <div className={`px-3 py-1.5 rounded-full text-[12px] font-bold border border-[var(--border-subtle)] ${stat.isPositive ? 'text-[var(--accent-green)] bg-[var(--accent-green)]/10' : 'text-[var(--accent-red)] bg-[var(--accent-red)]/10'}`}>
                {stat.change}
              </div>
            </div>

            <div className="mt-8 relative z-10">
              <h3 className="text-4xl font-bold text-white mb-1.5 leading-none">{stat.value}</h3>
              <p className="text-sm text-[var(--text-secondary)] font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-[var(--bg-card)] p-10 rounded-3xl border border-[var(--border-subtle)] shadow-lg relative overflow-hidden">
          <div className="flex justify-between items-center mb-10 relative z-10">
            <div>
              <h3 className="font-bold text-xl text-white">Fluxo de Mensagens</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">Atividade nos últimos 7 dias</p>
            </div>
            <select className="bg-[var(--bg-elevated)] text-[var(--text-secondary)] text-sm rounded-xl border border-[var(--border-subtle)] px-4 py-2.5 outline-none focus:border-[var(--accent-purple)] transition-colors">
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
            </select>
          </div>
          <div className="h-[340px] w-full relative z-10">
            <AreaChart />
          </div>
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent-blue)]/5 rounded-full blur-[100px] pointer-events-none" />
        </div>

        {/* Status Distribution */}
        <div className="bg-[var(--bg-card)] p-10 rounded-3xl border border-[var(--border-subtle)] flex flex-col shadow-lg relative overflow-hidden">
          <h3 className="font-bold text-xl text-white mb-1 relative z-10">Status dos Leads</h3>
          <p className="text-sm text-[var(--text-muted)] mb-10 relative z-10">Distribuição atual</p>

          <div className="flex-1 flex items-center justify-center relative z-10 min-h-[250px]">
            <DonutChart />
          </div>

          {/* Subtle Glow */}
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--accent-purple)]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-blue)]" /> Novo
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-yellow)]" /> Negociação
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-green)]" /> Ganho
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-red)]" /> Perdido
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Activities / Leads */}
      <div className="bg-[var(--bg-card)] rounded-3xl border border-[var(--border-subtle)] overflow-hidden shadow-lg">
        <div className="p-6 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <h3 className="font-semibold text-lg text-white">Últimos Leads (Tempo Real)</h3>
          <button className="text-sm text-[var(--accent-purple)] hover:underline">Ver todos</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[var(--bg-elevated)]">
              <tr className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                <th className="p-4 pl-6 font-medium">Nome</th>
                <th className="p-4 font-medium">Origem</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Chegou em</th>
                <th className="p-4 text-right pr-6">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="group hover:bg-[var(--bg-hover)] transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--accent-purple)] to-[var(--accent-blue)] flex items-center justify-center text-xs font-bold text-white">
                        {lead.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-white">{lead.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                      {lead.origin === 'WhatsApp' && <MessageSquare size={14} className="text-[var(--accent-green)]" />}
                      {lead.origin}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white ${lead.statusColor}/20 ${lead.statusColor.replace('bg-', 'text-')}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-[var(--text-secondary)]">{lead.time}</td>
                  <td className="p-4 text-right pr-6">
                    <button className="p-2 hover:bg-[var(--bg-elevated)] rounded-lg text-[var(--text-muted)] hover:text-white transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
