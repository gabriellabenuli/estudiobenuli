import { getDb } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const sql = getDb();
  const rows = await sql`SELECT * FROM projetos ORDER BY criado_em DESC`;
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const sql = getDb();
  const body = await req.json();
  const { id, nome, cliente, tipo, pacote, valor, data, pagamento, progresso, etapa } = body;
  const row = await sql`
    INSERT INTO projetos (id, nome, cliente, tipo, pacote, valor, data, pagamento, progresso, etapa)
    VALUES (${id}, ${nome}, ${cliente}, ${tipo}, ${pacote}, ${valor}, ${data}, ${pagamento}, ${progresso ?? 0}, ${etapa ?? 'Início'})
    ON CONFLICT (id) DO UPDATE SET
      nome=${nome}, cliente=${cliente}, tipo=${tipo}, pacote=${pacote},
      valor=${valor}, data=${data}, pagamento=${pagamento},
      progresso=${progresso ?? 0}, etapa=${etapa ?? 'Início'}
    RETURNING *
  `;
  return NextResponse.json(row[0]);
}

export async function PUT(req: NextRequest) {
  const sql = getDb();
  const body = await req.json();
  const { id, progresso, etapa } = body;
  const row = await sql`
    UPDATE projetos SET progresso=${progresso}, etapa=${etapa} WHERE id=${id} RETURNING *
  `;
  return NextResponse.json(row[0]);
}

export async function DELETE(req: NextRequest) {
  const sql = getDb();
  const { id } = await req.json();
  await sql`DELETE FROM projetos WHERE id=${id}`;
  return NextResponse.json({ ok: true });
}
