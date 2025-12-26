import { create } from 'zustand';
import { Card, Coluna, Cliente, Atendente } from '@/types';

interface SidebarState {
    isCollapsed: boolean;
    toggleSidebar: () => void;
    setCollapsed: (collapsed: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
    isCollapsed: false,
    toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
    setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
}));

interface KanbanState {
    colunas: Coluna[];
    cards: Card[];
    selectedCard: Card | null;

    // Actions
    setColunas: (colunas: Coluna[]) => void;
    setCards: (cards: Card[]) => void;
    addCard: (card: Card) => void;
    updateCard: (id: string, updates: Partial<Card>) => void;
    deleteCard: (id: string) => void;
    moveCard: (cardId: string, targetColunaId: string, newPosition: number) => void;
    selectCard: (card: Card | null) => void;
}

// Dados iniciais de exemplo
const colunasIniciais: Coluna[] = [
    { id: 'novos', titulo: 'Novos', cor: '#8b5cf6', icone: 'inbox', ordem: 0 },
    { id: 'em-atendimento', titulo: 'Em Atendimento', cor: '#3b82f6', icone: 'message-circle', ordem: 1 },
    { id: 'aguardando', titulo: 'Aguardando', cor: '#f59e0b', icone: 'clock', ordem: 2 },
    { id: 'follow-up', titulo: 'Follow-up', cor: '#06b6d4', icone: 'bell', ordem: 3 },
    { id: 'convertido', titulo: 'Convertido', cor: '#10b981', icone: 'check-circle', ordem: 4 },
    { id: 'perdido', titulo: 'Perdido', cor: '#ef4444', icone: 'x-circle', ordem: 5 },
];

const clientesExemplo: Cliente[] = [
    {
        id: '1',
        nome: 'Maria Silva',
        telefone: '+55 11 99999-1234',
        email: 'maria@email.com',
        tags: ['vip', 'whatsapp'],
        prioridade: 'alta',
        criadoEm: new Date('2024-12-20'),
        ultimaInteracao: new Date(),
    },
    {
        id: '2',
        nome: 'João Santos',
        telefone: '+55 11 98888-5678',
        email: 'joao@email.com',
        tags: ['lead-quente'],
        prioridade: 'media',
        criadoEm: new Date('2024-12-22'),
        ultimaInteracao: new Date(),
    },
    {
        id: '3',
        nome: 'Ana Costa',
        telefone: '+55 11 97777-9012',
        tags: ['instagram'],
        prioridade: 'baixa',
        criadoEm: new Date('2024-12-24'),
        ultimaInteracao: new Date(),
    },
    {
        id: '4',
        nome: 'Pedro Lima',
        telefone: '+55 11 96666-3456',
        email: 'pedro@empresa.com',
        tags: ['b2b', 'orçamento'],
        prioridade: 'urgente',
        criadoEm: new Date('2024-12-25'),
        ultimaInteracao: new Date(),
    },
    {
        id: '5',
        nome: 'Carla Mendes',
        telefone: '+55 11 95555-7890',
        tags: ['whatsapp', 'retorno'],
        prioridade: 'media',
        criadoEm: new Date('2024-12-23'),
        ultimaInteracao: new Date(),
    },
];

const cardsIniciais: Card[] = [
    {
        id: 'card-1',
        clienteId: '1',
        cliente: clientesExemplo[0],
        colunaId: 'novos',
        titulo: 'Maria Silva - Orçamento',
        descricao: 'Interessada em consultoria. Aguardando retorno.',
        prioridade: 'alta',
        tags: ['vip', 'urgente'],
        criadoEm: new Date('2024-12-26T10:00:00'),
        atualizadoEm: new Date(),
        posicao: 0,
    },
    {
        id: 'card-2',
        clienteId: '2',
        cliente: clientesExemplo[1],
        colunaId: 'novos',
        titulo: 'João Santos - Produto A',
        descricao: 'Veio pelo Instagram, quer saber preços.',
        prioridade: 'media',
        tags: ['lead-quente'],
        criadoEm: new Date('2024-12-26T11:30:00'),
        atualizadoEm: new Date(),
        posicao: 1,
    },
    {
        id: 'card-3',
        clienteId: '3',
        cliente: clientesExemplo[2],
        colunaId: 'em-atendimento',
        titulo: 'Ana Costa - Dúvidas',
        descricao: 'Em atendimento com Rafael.',
        prioridade: 'baixa',
        tags: ['suporte'],
        atendenteId: 'atendente-1',
        criadoEm: new Date('2024-12-25T14:00:00'),
        atualizadoEm: new Date(),
        posicao: 0,
    },
    {
        id: 'card-4',
        clienteId: '4',
        cliente: clientesExemplo[3],
        colunaId: 'aguardando',
        titulo: 'Pedro Lima - B2B',
        descricao: 'Enviamos proposta, aguardando resposta.',
        prioridade: 'urgente',
        tags: ['b2b', 'proposta'],
        criadoEm: new Date('2024-12-24T09:00:00'),
        atualizadoEm: new Date(),
        posicao: 0,
    },
    {
        id: 'card-5',
        clienteId: '5',
        cliente: clientesExemplo[4],
        colunaId: 'follow-up',
        titulo: 'Carla Mendes - Retorno',
        descricao: 'Ligar amanhã às 14h.',
        prioridade: 'media',
        tags: ['agendar'],
        dataPrevista: new Date('2024-12-27T14:00:00'),
        criadoEm: new Date('2024-12-23T16:00:00'),
        atualizadoEm: new Date(),
        posicao: 0,
    },
];

export const useKanbanStore = create<KanbanState>((set) => ({
    colunas: colunasIniciais,
    cards: cardsIniciais,
    selectedCard: null,

    setColunas: (colunas) => set({ colunas }),
    setCards: (cards) => set({ cards }),

    addCard: (card) => set((state) => ({
        cards: [...state.cards, card]
    })),

    updateCard: (id, updates) => set((state) => ({
        cards: state.cards.map((card) =>
            card.id === id ? { ...card, ...updates, atualizadoEm: new Date() } : card
        ),
    })),

    deleteCard: (id) => set((state) => ({
        cards: state.cards.filter((card) => card.id !== id),
    })),

    moveCard: (cardId, targetColunaId, newPosition) => set((state) => {
        const cardIndex = state.cards.findIndex((c) => c.id === cardId);
        if (cardIndex === -1) return state;

        const updatedCards = [...state.cards];
        const card = { ...updatedCards[cardIndex] };

        // Atualiza a coluna e posição do card
        card.colunaId = targetColunaId;
        card.posicao = newPosition;
        card.atualizadoEm = new Date();

        updatedCards[cardIndex] = card;

        return { cards: updatedCards };
    }),

    selectCard: (card) => set({ selectedCard: card }),
}));

// Store de Atendentes
interface AtendentesState {
    atendentes: Atendente[];
    currentAtendente: Atendente | null;
    setAtendentes: (atendentes: Atendente[]) => void;
    setCurrentAtendente: (atendente: Atendente | null) => void;
}

const atendentesIniciais: Atendente[] = [
    {
        id: 'atendente-1',
        nome: 'Rafael Costa',
        email: 'rafael@nexo.com',
        status: 'online',
        atendimentosAtivos: 3,
        limiteAtendimentos: 10,
    },
    {
        id: 'atendente-2',
        nome: 'Julia Fernandes',
        email: 'julia@nexo.com',
        status: 'online',
        atendimentosAtivos: 5,
        limiteAtendimentos: 10,
    },
    {
        id: 'atendente-3',
        nome: 'Carlos Mendes',
        email: 'carlos@nexo.com',
        status: 'ausente',
        atendimentosAtivos: 0,
        limiteAtendimentos: 10,
    },
];

export const useAtendentesStore = create<AtendentesState>((set) => ({
    atendentes: atendentesIniciais,
    currentAtendente: atendentesIniciais[0],
    setAtendentes: (atendentes) => set({ atendentes }),
    setCurrentAtendente: (atendente) => set({ currentAtendente: atendente }),
}));
