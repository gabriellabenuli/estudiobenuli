import { getDb } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const sql = getDb();
  const rows = await sql`SELECT * FROM todos ORDER BY criado_em DESC`;
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const sql = getDb();
  const body = await req.json();
  const { id, texto, prioridade, concluida } = body;
  const row = await sql`
    INSERT INTO todos (id, texto, prioridade, concluida)
    VALUES (${id}, ${texto}, ${prioridade}, ${concluida ?? false})
    ON CONFLICT (id) DO UPDATE SET texto=${texto}, prioridade=${prioridade}, concluida=${concluida ?? false}
    RETURNING *
  `;
  return NextResponse.json(row[0]);
}

export async function PUT(req: NextRequest) {
  const sql = getDb();
  const { id, concluida } = await req.json();
  const row = await sql`UPDATE todos SET concluida=${concluida} WHERE id=${id} RETURNING *`;
  return NextResponse.json(row[0]);
}

export async function DELETE(req: NextRequest) {
  const sql = getDb();
  const { id } = await req.json();
  await sql`DELETE FROM todos WHERE id=${id}`;
  return NextResponse.json({ ok: true });
}
