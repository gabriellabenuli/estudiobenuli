'use client';

import { useState, useEffect } from 'react';
import { Cliente } from '@/types';
import { useFetch, apiPost, apiDelete } from '@/hooks/useFetch';

export default function ClientesSection() {
  const { data: clientes, loading, error } = useFetch<Cliente[]>('/api/clientes');
  const [showForm, setShowForm] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome) return;

    setSubmitting(true);
    try {
      await apiPost('/api/clientes', {
        id: Date.now(),
        nome,
        email,
        tel,
        status: 'Ativo',
      });
      setNome('');
      setEmail('');
      setTel('');
      setShowForm(false);
      // Reload page to refresh data
      window.location.reload();
    } catch (err) {
      alert('Erro ao salvar cliente');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Excluir este cliente?')) return;
    try {
      await apiDelete('/api/clientes', id);
      window.location.reload();
    } catch (err) {
      alert('Erro ao excluir cliente');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '400', margin: 0, color: '#1a1a1a' }}>Clientes</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '10px 20px',
            background: '#1a1a1a',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px',
            fontFamily: 'inherit',
          }}
        >
          + Novo cliente
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e3de', marginBottom: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '6px', color: '#1a1a1a' }}>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do cliente"
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #d3d1c7',
                borderRadius: '6px',
                fontSize: '13px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
              required
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '6px', color: '#1a1a1a' }}>Telefone</label>
              <input
                type="tel"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                placeholder="(11) 99999-9999"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #d3d1c7',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '6px', color: '#1a1a1a' }}>E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #d3d1c7',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                padding: '10px 20px',
                background: 'transparent',
                color: '#938d85',
                border: '1px solid #d3d1c7',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontFamily: 'inherit',
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: '10px 20px',
                background: '#1a1a1a',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontFamily: 'inherit',
                opacity: submitting ? 0.6 : 1,
              }}
            >
              {submitting ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      )}

      {loading && <p style={{ color: '#938d85' }}>Carregando...</p>}
      {error && <p style={{ color: '#d32f2f' }}>Erro ao carregar clientes</p>}

      {clientes && clientes.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {clientes.map((c) => (
            <div key={c.id} style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e3de' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1a1a1a' }}>{c.nome}</h3>
              {c.email && <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#938d85' }}>{c.email}</p>}
              {c.tel && <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#938d85' }}>{c.tel}</p>}
              <button
                onClick={() => handleDelete(c.id)}
                style={{
                  padding: '6px 12px',
                  background: '#ffebee',
                  color: '#c62828',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: 'inherit',
                }}
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e3de', textAlign: 'center', color: '#938d85' }}>
          Nenhum cliente cadastrado.
        </div>
      )}
    </div>
  );
}
