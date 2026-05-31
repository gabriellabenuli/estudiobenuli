import { getDb } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const sql = getDb();
  const rows = await sql`SELECT * FROM desdobramentos ORDER BY id ASC`;
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const sql = getDb();
  const body = await req.json();
  const { id, nome, valor } = body;
  const row = await sql`
    INSERT INTO desdobramentos (id, nome, valor)
    VALUES (${id}, ${nome}, ${valor})
    ON CONFLICT (id) DO UPDATE SET nome=${nome}, valor=${valor}
    RETURNING *
  `;
  return NextResponse.json(row[0]);
}

export async function DELETE(req: NextRequest) {
  const sql = getDb();
  const { id } = await req.json();
  await sql`DELETE FROM desdobramentos WHERE id=${id}`;
  return NextResponse.json({ ok: true });
}
