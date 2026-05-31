'use client';

import { useFetch } from '@/hooks/useFetch';
import { Artigo } from '@/types';

export default function ArtigosSection() {
  const { data: artigos, loading } = useFetch<Artigo[]>('/api/artigos');

  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: '400', marginBottom: '24px', color: '#1a1a1a' }}>Artigos</h1>
      {loading && <p style={{ color: '#938d85' }}>Carregando...</p>}
      {artigos && artigos.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {artigos.map((a) => (
            <div key={a.id} style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e3de' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1a1a1a' }}>{a.titulo}</h3>
              {a.categoria && <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#938d85' }}>{a.categoria}</p>}
              <button
                style={{
                  padding: '8px 14px',
                  background: '#f0efec',
                  color: '#1a1a1a',
                  border: '1px solid #d3d1c7',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: 'inherit',
                }}
              >
                Editar
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e3de', textAlign: 'center', color: '#938d85' }}>
          Nenhum artigo cadastrado.
        </div>
      )}
    </div>
  );
}
