import { getDb } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const sql = getDb();
  const rows = await sql`SELECT * FROM artigos ORDER BY criado_em DESC`;
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const sql = getDb();
  const body = await req.json();
  const { id, titulo, categoria, conteudo } = body;
  const row = await sql`
    INSERT INTO artigos (id, titulo, categoria, conteudo)
    VALUES (${id}, ${titulo}, ${categoria}, ${conteudo ?? ''})
    ON CONFLICT (id) DO UPDATE SET titulo=${titulo}, categoria=${categoria}, conteudo=${conteudo ?? ''}
    RETURNING *
  `;
  return NextResponse.json(row[0]);
}

export async function DELETE(req: NextRequest) {
  const sql = getDb();
  const { id } = await req.json();
  await sql`DELETE FROM artigos WHERE id=${id}`;
  return NextResponse.json({ ok: true });
}
