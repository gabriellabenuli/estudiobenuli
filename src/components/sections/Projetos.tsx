'use client';

import { useFetch } from '@/hooks/useFetch';
import { Projeto } from '@/types';

export default function ProjetosSection() {
  const { data: projetos, loading } = useFetch<Projeto[]>('/api/projetos');

  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: '400', marginBottom: '24px', color: '#1a1a1a' }}>Projetos</h1>
      {loading && <p style={{ color: '#938d85' }}>Carregando...</p>}
      {projetos && projetos.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {projetos.map((p) => (
            <div key={p.id} style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e3de' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1a1a1a' }}>{p.nome}</h3>
              <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#938d85' }}>Cliente: {p.cliente || '—'}</p>
              <p style={{ margin: '0', fontSize: '12px', color: '#938d85' }}>Etapa: {p.etapa || 'Início'}</p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e3de', textAlign: 'center', color: '#938d85' }}>
          Nenhum projeto cadastrado.
        </div>
      )}
    </div>
  );
}
