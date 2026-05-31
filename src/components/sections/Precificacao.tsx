'use client';

import { useFetch } from '@/hooks/useFetch';
import { Desdobramento } from '@/types';

export default function PrecificacaoSection() {
  const { data: desdobramentos } = useFetch<Desdobramento[]>('/api/desdobramentos');

  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: '400', marginBottom: '24px', color: '#1a1a1a' }}>Precificação</h1>
      {desdobramentos && desdobramentos.length > 0 ? (
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e3de', overflow: 'hidden' }}>
          {desdobramentos.map((d) => (
            <div key={d.id} style={{ padding: '16px', borderBottom: '1px solid #e5e3de', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#1a1a1a' }}>{d.nome}</span>
              <span style={{ fontSize: '13px', color: '#789273', fontWeight: '500' }}>
                R$ {Number(d.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e3de', textAlign: 'center', color: '#938d85' }}>
          Nenhum desdobramento cadastrado.
        </div>
      )}
    </div>
  );
}
