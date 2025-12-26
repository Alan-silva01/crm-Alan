export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  avatar?: string;
  tags: string[];
  fonte?: string;
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
  dadosCustomizados?: Record<string, string>;
  criadoEm: Date;
  ultimaInteracao: Date;
}

export interface Mensagem {
  id: string;
  conversaId: string;
  tipo: 'texto' | 'imagem' | 'audio' | 'video' | 'documento';
  conteudo: string;
  direcao: 'entrada' | 'saida';
  enviadaEm: Date;
  lida: boolean;
}

export interface Card {
  id: string;
  clienteId: string;
  cliente: Cliente;
  colunaId: string;
  titulo: string;
  descricao?: string;
  atendenteId?: string;
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
  tags: string[];
  dataPrevista?: Date;
  criadoEm: Date;
  atualizadoEm: Date;
  posicao: number;
}

export interface Coluna {
  id: string;
  titulo: string;
  cor: string;
  icone: string;
  ordem: number;
  limite?: number;
}

export interface Atendente {
  id: string;
  nome: string;
  email: string;
  avatar?: string;
  status: 'online' | 'offline' | 'ausente';
  atendimentosAtivos: number;
  limiteAtendimentos: number;
}
