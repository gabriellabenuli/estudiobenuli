'use client';

import { useFetch } from '@/hooks/useFetch';
import { Proposta } from '@/types';

export default function PropostaSection() {
  const { data: propostas } = useFetch<Proposta[]>('/api/propostas');

  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: '400', marginBottom: '24px', color: '#1a1a1a' }}>Proposta Comercial</h1>
      {propostas && propostas.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {propostas.map((p) => (
            <div key={p.id} style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e3de' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#1a1a1a' }}>Cliente: {p.cliente}</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#1a1a1a' }}>Tipo: {p.tipo}</p>
              <p style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: '500', color: '#789273' }}>
                R$ {Number(p.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#1a7ee6', textDecoration: 'none' }}>
                  Ver proposta
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e3de', textAlign: 'center', color: '#938d85' }}>
          Nenhuma proposta cadastrada.
        </div>
      )}
    </div>
  );
}
