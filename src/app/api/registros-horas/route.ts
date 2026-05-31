import { getDb } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const sql = getDb();
  const rows = await sql`SELECT * FROM registros_horas ORDER BY data DESC`;
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const sql = getDb();
  const body = await req.json();
  const { id, cliente, tipo, valor, data } = body;
  const row = await sql`
    INSERT INTO registros_horas (id, cliente, tipo, valor, data)
    VALUES (${id}, ${cliente}, ${tipo}, ${valor}, ${data})
    ON CONFLICT (id) DO UPDATE SET cliente=${cliente}, tipo=${tipo}, valor=${valor}, data=${data}
    RETURNING *
  `;
  return NextResponse.json(row[0]);
}

export async function DELETE(req: NextRequest) {
  const sql = getDb();
  const { id } = await req.json();
  await sql`DELETE FROM registros_horas WHERE id=${id}`;
  return NextResponse.json({ ok: true });
}
