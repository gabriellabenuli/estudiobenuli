import { getDb } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const sql = getDb();
  const rows = await sql`SELECT config FROM configuracoes WHERE id=1`;
  return NextResponse.json(rows[0]?.config ?? {});
}

export async function POST(req: NextRequest) {
  const sql = getDb();
  const config = await req.json();
  await sql`UPDATE configuracoes SET config=${JSON.stringify(config)} WHERE id=1`;
  return NextResponse.json({ ok: true });
}
