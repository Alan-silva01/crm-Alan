'use client';

import { useSidebarStore } from '@/store';
import { Header } from '@/components/layout';
import { DonutChart, AreaChart, BarChart } from '@/components/dashboard/Charts';
import {
  ShieldAlert,
  Users,
  Activity,
  AlertTriangle,
  MoreVertical,
  Filter,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowUpRight
} from 'lucide-react';

export default function Home() {
  const { isCollapsed } = useSidebarStore();

  const stats = [
    {
      label: 'Alertas Críticos',
      value: '6,462',
      change: '+12.5%',
      isPositive: false,
      icon: <ShieldAlert size={20} className="text-[var(--accent-red)]" />,
      subtext: 'Semana Anterior',
      color: 'var(--accent-red)'
    },
    {
      label: 'Alertas Não Atribuídos',
      value: '15,540',
      change: '-58.8%',
      isPositive: true,
      icon: <AlertTriangle size={20} className="text-[var(--accent-orange)]" />,
      subtext: 'Semana Anterior',
      color: 'var(--accent-orange)'
    },
    {
      label: 'Ativos Ausentes',
      value: '8,078',
      change: '-12.2%',
      isPositive: true,
      icon: <HelpCircle size={20} className="text-[var(--accent-purple)]" />,
      subtext: 'Semana Anterior',
      color: 'var(--accent-purple)'
    },
    {
      label: 'Agentes Com Atenção',
      value: '428',
      change: '+25.5%',
      isPositive: false,
      icon: <Users size={20} className="text-[var(--accent-green)]" />,
      subtext: 'Semana Anterior',
      color: 'var(--accent-green)'
    },
  ];

  const alerts = [
    { id: 1, name: 'Parked: velocidrone.exe', vendor: 'Palo Alto Networks', time: 'Sep 4, 2024', severity: 'info', icon: 'P' },
    { id: 2, name: 'Weak Cipher Suite', vendor: 'Revbits', time: 'Sep 7, 2024', severity: 'info', icon: 'R' },
    { id: 3, name: 'Deprecated SSL/TLS', vendor: 'Zclassic', time: 'Sep 15, 2024', severity: 'info', icon: 'Z' },
    { id: 4, name: 'Parked: chihuahua.exe', vendor: 'ExtraHop', time: 'Sep 18, 2024', severity: 'info', icon: 'E' },
    { id: 5, name: 'ARP Scan', vendor: 'SentinelOne', time: 'Sep 25, 2024', severity: 'info', icon: 'S' },
  ];

  return (
    <main
      style={{
        paddingLeft: isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        paddingTop: '5rem'
      }}
      className="min-h-screen bg-[var(--bg-primary)] transition-all duration-300 ease-in-out overflow-x-hidden"
    >
      <Header title="Dashboard" subtitle="Visão Geral de Segurança" />

      <div className="p-10 space-y-8">

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-subtle)] hover:border-[var(--border-hover)] transition-all group flex flex-col justify-center">
              <div className="flex justify-between items-start mb-3">
                <div className="w-9 h-9 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center group-hover:bg-[var(--bg-hover)] transition-colors border border-[var(--border-subtle)]">
                  {stat.icon}
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold ${stat.isPositive ? 'text-[var(--accent-green)] bg-[var(--accent-green)]/10' : 'text-[var(--accent-red)] bg-[var(--accent-red)]/10'}`}>
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-0.5 leading-none">{stat.value}</h3>
              <p className="text-xs text-[var(--text-secondary)] font-medium truncate">{stat.label}</p>
              <p className="text-[10px] text-[var(--text-muted)] mt-1">{stat.subtext}</p>
            </div>
          ))}
        </div>

        {/* Middle Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* High Alerts Chart */}
          <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-subtle)] flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="font-semibold text-white">Alertas Altos</h3>
              <select className="bg-[var(--bg-elevated)] text-[var(--text-secondary)] text-xs rounded border border-[var(--border-subtle)] px-2 py-1 outline-none">
                <option>Semana</option>
                <option>Mês</option>
              </select>
            </div>
            <div className="mb-4 relative z-10">
              <p className="text-xs text-[var(--text-muted)]">Tempo total trabalhado</p>
              <p className="text-xl font-bold text-white">16 hr 30 min</p>
            </div>

            <div className="flex-1 relative z-10">
              <AreaChart />
            </div>

            {/* Decorative gradient background glow */}
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[var(--accent-purple)]/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Open Alerts Donut */}
          <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-subtle)] flex flex-col items-center justify-center relative">
            <div className="w-full flex justify-between items-start mb-2">
              <h3 className="font-semibold text-white">Alertas Abertos por Classificação</h3>
            </div>
            <div className="flex items-center gap-8 mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-purple)]" />
                  <span>Hacktool 13.5%</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-green)]" />
                  <span>Vírus 30%</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-orange)]" />
                  <span>Spyware 15%</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-yellow)]" />
                  <span>Malware 25%</span>
                </div>
              </div>
              <DonutChart />
            </div>
          </div>

          {/* Agents Attention Bar */}
          <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-subtle)] flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-white">Agentes Requerendo Atenção</h3>
              <button className="text-[var(--text-muted)] hover:text-white"><MoreVertical size={16} /></button>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-white">$21,374.00</h2>
              <p className="text-xs text-[var(--text-muted)]">-$30.00 esta semana</p>
            </div>
            <BarChart />
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-orange)]" /> Depreciação Pendente
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-purple)]" /> Reiniciar Menos Amplo
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-pink)]" /> Exclusivo Estendido
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)]" /> NE CF Not A
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Table Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table */}
          <div className="lg:col-span-2 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden">
            <div className="p-6 border-b border-[var(--border-subtle)] flex items-center justify-between">
              <h3 className="font-semibold text-white">Top 5 Alertas Abertos por Gravidade</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input type="text" placeholder="Buscar Identidades" className="bg-[var(--bg-elevated)] text-xs pl-8 pr-3 py-1.5 rounded border border-[var(--border-subtle)] outline-none text-[var(--text-primary)] w-40" />
                </div>
                <button className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] px-3 py-1.5 bg-[var(--bg-elevated)] rounded border border-[var(--border-subtle)]">
                  <Filter size={12} /> Filtrar
                </button>
              </div>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs text-[var(--text-muted)] border-b border-[var(--border-subtle)]">
                    <th className="p-4 font-medium pl-6">Nome do Alerta</th>
                    <th className="p-4 font-medium">Fornecedor</th>
                    <th className="p-4 font-medium">Data Reportada</th>
                    <th className="p-4 font-medium">Gravidade</th>
                    <th className="p-4 font-medium text-right pr-6">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.map((alert) => (
                    <tr key={alert.id} className="group hover:bg-[var(--bg-hover)] transition-colors text-sm text-[var(--text-secondary)]">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3 text-white">
                          <div className="w-4 h-4 rounded border border-[var(--text-muted)] flex items-center justify-center opacity-50 group-hover:opacity-100 cursor-pointer">
                          </div>
                          {alert.name}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white
                                                ${alert.vendor.startsWith('P') ? 'bg-orange-500' :
                              alert.vendor.startsWith('R') ? 'bg-purple-500' :
                                alert.vendor.startsWith('Z') ? 'bg-yellow-500' :
                                  alert.vendor.startsWith('E') ? 'bg-blue-500' : 'bg-pink-500'
                            }`}
                          >
                            {alert.icon}
                          </div>
                          {alert.vendor}
                        </div>
                      </td>
                      <td className="p-4">{alert.time}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full border border-[var(--text-muted)]" />
                          {alert.severity}
                        </div>
                      </td>
                      <td className="p-4 text-right pr-6">
                        <button className="p-1 rounded hover:bg-[var(--bg-elevated)] text-[var(--text-muted)]"><MoreVertical size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Small Side Widget or List */}
          <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-white">Alertas Abertos por Gravidade</h3>
            </div>
            <div className="space-y-4">
              {['Crítico', 'Alto', 'Médio', 'Baixo'].map((sev, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-10 rounded-full ${sev === 'Crítico' ? 'bg-[var(--accent-red)]' :
                      sev === 'Alto' ? 'bg-[var(--accent-orange)]' :
                        sev === 'Médio' ? 'bg-[var(--accent-yellow)]' : 'bg-[var(--accent-blue)]'
                      }`} />
                    <div>
                      <p className="text-sm font-medium text-white">{sev}</p>
                      <p className="text-xs text-[var(--text-muted)]">{idx * 12 + 4} Alertas</p>
                    </div>
                  </div>
                  <button className="icon-btn w-8 h-8 hover:bg-[var(--bg-hover)]">
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
