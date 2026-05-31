import { getDb } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const sql = getDb();
  const rows = await sql`SELECT * FROM clientes ORDER BY criado_em DESC`;
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const sql = getDb();
  const body = await req.json();
  const { id, nome, email, tel, tipo, pagamento, status } = body;
  const row = await sql`
    INSERT INTO clientes (id, nome, email, tel, tipo, pagamento, status)
    VALUES (${id}, ${nome}, ${email}, ${tel}, ${tipo}, ${pagamento}, ${status})
    ON CONFLICT (id) DO UPDATE SET nome=${nome}, email=${email}, tel=${tel}, tipo=${tipo}, pagamento=${pagamento}, status=${status}
    RETURNING *
  `;
  return NextResponse.json(row[0]);
}

export async function DELETE(req: NextRequest) {
  const sql = getDb();
  const { id } = await req.json();
  await sql`DELETE FROM clientes WHERE id=${id}`;
  return NextResponse.json({ ok: true });
}
