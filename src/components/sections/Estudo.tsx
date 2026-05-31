'use client';

import { useFetch } from '@/hooks/useFetch';
import { Artigo } from '@/types';

export default function EstudoSection() {
  const { data: artigos } = useFetch<Artigo[]>('/api/artigos');

  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: '400', marginBottom: '24px', color: '#1a1a1a' }}>Estudo</h1>
      {artigos && artigos.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {artigos.map((a) => (
            <div key={a.id} style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e3de' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1a1a1a', fontWeight: '500' }}>{a.titulo}</h3>
              {a.categoria && <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#938d85' }}>{a.categoria}</p>}
              {a.conteudo && <p style={{ margin: '0', fontSize: '12px', color: '#1a1a1a', lineHeight: '1.5' }}>{a.conteudo.substring(0, 100)}...</p>}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e3de', textAlign: 'center', color: '#938d85' }}>
          Nenhum artigo de estudo cadastrado.
        </div>
      )}
    </div>
  );
}
