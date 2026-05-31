'use client';

import { useFetch } from '@/hooks/useFetch';
import { Todo } from '@/types';

export default function TodosSection() {
  const { data: todos, loading } = useFetch<Todo[]>('/api/todos');

  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: '400', marginBottom: '24px', color: '#1a1a1a' }}>To Do List</h1>
      {loading && <p style={{ color: '#938d85' }}>Carregando...</p>}
      {todos && todos.length > 0 ? (
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e3de', overflow: 'hidden' }}>
          {todos.map((t) => (
            <div key={t.id} style={{ padding: '16px', borderBottom: '1px solid #e5e3de', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input type="checkbox" checked={t.concluida} style={{ cursor: 'pointer' }} />
              <span style={{ flex: 1, fontSize: '13px', color: t.concluida ? '#c9c4bd' : '#1a1a1a', textDecoration: t.concluida ? 'line-through' : 'none' }}>
                {t.texto}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e3de', textAlign: 'center', color: '#938d85' }}>
          Nenhuma tarefa cadastrada.
        </div>
      )}
    </div>
  );
}
