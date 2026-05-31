'use client';

import { useFetch } from '@/hooks/useFetch';
import { Documento } from '@/types';

export default function DocumentosSection() {
  const { data: documentos } = useFetch<Documento[]>('/api/documentos');

  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: '400', marginBottom: '24px', color: '#1a1a1a' }}>Documentos</h1>
      {documentos && documentos.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {documentos.map((d) => (
            <div key={d.id} style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e3de', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', background: '#f0efec', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#938d85', fontWeight: '600', textTransform: 'uppercase', flexShrink: 0 }}>
                {d.ext || 'DOC'}
              </div>
              <div>
                <p style={{ margin: '0', fontSize: '13px', color: '#1a1a1a', fontWeight: '500' }}>{d.nome}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e3de', textAlign: 'center', color: '#938d85' }}>
          Nenhum documento cadastrado.
        </div>
      )}
    </div>
  );
}
