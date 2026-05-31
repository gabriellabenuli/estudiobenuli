export interface Cliente {
  id: number;
  nome: string;
  email?: string;
  tel?: string;
  tipo?: string;
  pagamento?: string;
  status?: string;
  criado_em?: string;
}

export interface Projeto {
  id: number;
  nome: string;
  cliente?: string;
  tipo?: string;
  pacote?: string;
  valor?: number;
  data?: string;
  pagamento?: string;
  progresso?: number;
  etapa?: string;
  criado_em?: string;
}

export interface Todo {
  id: number;
  texto: string;
  prioridade?: string;
  concluida?: boolean;
  criado_em?: string;
}

export interface Artigo {
  id: number;
  titulo: string;
  categoria?: string;
  conteudo?: string;
  criado_em?: string;
}
