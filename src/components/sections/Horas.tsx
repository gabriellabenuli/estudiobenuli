'use client';

import { useFetch } from '@/hooks/useFetch';
import { RegistroHoras } from '@/types';

export default function HorasSection() {
  const { data: registros } = useFetch<RegistroHoras[]>('/api/registros-horas');

  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: '400', marginBottom: '24px', color: '#1a1a1a' }}>Contadora de Horas</h1>
      {registros && registros.length > 0 ? (
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e3de', overflow: 'hidden' }}>
          {registros.map((r) => (
            <div key={r.id} style={{ padding: '16px', borderBottom: '1px solid #e5e3de' }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#1a1a1a' }}>
                {r.cliente} - {r.tipo}
              </p>
              <p style={{ margin: '0', fontSize: '12px', color: '#938d85' }}>
                R$ {Number(r.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e3de', textAlign: 'center', color: '#938d85' }}>
          Nenhum registro de horas.
        </div>
      )}
    </div>
  );
}
