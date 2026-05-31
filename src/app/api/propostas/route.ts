import { getDb } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const sql = getDb();
  const rows = await sql`SELECT * FROM propostas_enviadas ORDER BY data DESC`;
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const sql = getDb();
  const body = await req.json();
  const { id, cliente, tipo, valor, link, data } = body;
  const row = await sql`
    INSERT INTO propostas_enviadas (id, cliente, tipo, valor, link, data)
    VALUES (${id}, ${cliente}, ${tipo}, ${valor}, ${link}, ${data})
    ON CONFLICT (id) DO UPDATE SET cliente=${cliente}, tipo=${tipo}, valor=${valor}, link=${link}, data=${data}
    RETURNING *
  `;
  return NextResponse.json(row[0]);
}

export async function DELETE(req: NextRequest) {
  const sql = getDb();
  const { id } = await req.json();
  await sql`DELETE FROM propostas_enviadas WHERE id=${id}`;
  return NextResponse.json({ ok: true });
}
