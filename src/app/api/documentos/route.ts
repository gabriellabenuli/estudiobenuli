import { getDb } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const sql = getDb();
  const rows = await sql`SELECT * FROM documentos ORDER BY id DESC`;
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const sql = getDb();
  const body = await req.json();
  const { id, nome, ext } = body;
  const row = await sql`
    INSERT INTO documentos (id, nome, ext)
    VALUES (${id}, ${nome}, ${ext})
    ON CONFLICT (id) DO UPDATE SET nome=${nome}, ext=${ext}
    RETURNING *
  `;
  return NextResponse.json(row[0]);
}

export async function DELETE(req: NextRequest) {
  const sql = getDb();
  const { id } = await req.json();
  await sql`DELETE FROM documentos WHERE id=${id}`;
  return NextResponse.json({ ok: true });
}
