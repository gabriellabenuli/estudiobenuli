import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const sql = getDb();

  await sql`CREATE TABLE IF NOT EXISTS clientes (
    id BIGINT PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT,
    tel TEXT,
    tipo TEXT,
    pagamento TEXT,
    status TEXT DEFAULT 'Projeto em andamento',
    criado_em TIMESTAMPTZ DEFAULT NOW()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS projetos (
    id BIGINT PRIMARY KEY,
    nome TEXT NOT NULL,
    cliente TEXT,
    tipo TEXT,
    pacote TEXT,
    valor NUMERIC(12,2),
    data DATE,
    pagamento TEXT,
    progresso INTEGER DEFAULT 0,
    etapa TEXT DEFAULT 'Início',
    criado_em TIMESTAMPTZ DEFAULT NOW()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS painel_config (
    projeto_id BIGINT PRIMARY KEY,
    config JSONB DEFAULT '{}'
  )`;

  await sql`CREATE TABLE IF NOT EXISTS propostas_enviadas (
    id BIGINT PRIMARY KEY,
    cliente TEXT,
    tipo TEXT,
    valor NUMERIC(12,2),
    link TEXT,
    data TIMESTAMPTZ DEFAULT NOW()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS todos (
    id BIGINT PRIMARY KEY,
    texto TEXT NOT NULL,
    prioridade TEXT,
    concluida BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMPTZ DEFAULT NOW()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS artigos (
    id BIGINT PRIMARY KEY,
    titulo TEXT NOT NULL,
    categoria TEXT,
    conteudo TEXT DEFAULT '',
    criado_em TIMESTAMPTZ DEFAULT NOW()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS desdobramentos (
    id BIGINT PRIMARY KEY,
    nome TEXT NOT NULL,
    valor NUMERIC(12,2) NOT NULL
  )`;

  await sql`CREATE TABLE IF NOT EXISTS documentos (
    id BIGINT PRIMARY KEY,
    nome TEXT NOT NULL,
    ext TEXT
  )`;

  await sql`CREATE TABLE IF NOT EXISTS registros_horas (
    id BIGINT PRIMARY KEY,
    cliente TEXT,
    tipo TEXT,
    valor NUMERIC(12,2),
    data TIMESTAMPTZ DEFAULT NOW()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS configuracoes (
    id INTEGER PRIMARY KEY DEFAULT 1,
    config JSONB DEFAULT '{}'
  )`;

  await sql`INSERT INTO configuracoes (id, config) VALUES (1, '{}') ON CONFLICT DO NOTHING`;

  return NextResponse.json({ ok: true, message: 'Tabelas criadas com sucesso' });
}
