'use client';

import { useState } from 'react';
import ClientesSection from './sections/Clientes';
import ProjetosSection from './sections/Projetos';
import GestaoSection from './sections/Gestao';
import TodosSection from './sections/Todos';
import PrecificacaoSection from './sections/Precificacao';
import HorasSection from './sections/Horas';
import PropostaSection from './sections/Proposta';
import FinanceiroSection from './sections/Financeiro';
import DocumentosSection from './sections/Documentos';
import EstudoSection from './sections/Estudo';
import ArtigosSection from './sections/Artigos';

type Page = 'dashboard' | 'clientes' | 'projetos' | 'gestao' | 'todos' | 'precificacao' | 'horas' | 'proposta' | 'financeiro' | 'documentos' | 'estudo' | 'artigos';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#faf9f7', fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <nav style={{ width: '200px', background: '#f8f7f4', borderRight: '1px solid #e5e3de', padding: '24px 16px', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px', color: '#1a1a1a' }}>Estúdio Benuli</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'clientes', label: 'Clientes' },
            { id: 'projetos', label: 'Projetos' },
            { id: 'gestao', label: 'Gestão' },
            { id: 'todos', label: 'To Do List' },
            { id: 'precificacao', label: 'Precificação' },
            { id: 'horas', label: 'Contadora de Horas' },
            { id: 'proposta', label: 'Proposta Comercial' },
            { id: 'financeiro', label: 'Financeiro' },
            { id: 'documentos', label: 'Documentos' },
            { id: 'estudo', label: 'Estudo' },
            { id: 'artigos', label: 'Artigos' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id as Page)}
              style={{
                padding: '10px 14px',
                border: 'none',
                background: currentPage === item.id ? '#f0efec' : 'transparent',
                color: currentPage === item.id ? '#1a1a1a' : '#938d85',
                cursor: 'pointer',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: currentPage === item.id ? '500' : '400',
                fontFamily: 'inherit',
                textAlign: 'left',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'clientes' && <ClientesSection />}
        {currentPage === 'projetos' && <ProjetosSection />}
        {currentPage === 'gestao' && <GestaoSection />}
        {currentPage === 'todos' && <TodosSection />}
        {currentPage === 'precificacao' && <PrecificacaoSection />}
        {currentPage === 'horas' && <HorasSection />}
        {currentPage === 'proposta' && <PropostaSection />}
        {currentPage === 'financeiro' && <FinanceiroSection />}
        {currentPage === 'documentos' && <DocumentosSection />}
        {currentPage === 'estudo' && <EstudoSection />}
        {currentPage === 'artigos' && <ArtigosSection />}
      </main>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: '400', marginBottom: '24px', color: '#1a1a1a' }}>Dashboard</h1>
      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e3de' }}>
        <p style={{ color: '#938d85' }}>Bem-vindo ao Studio Dashboard. Selecione uma seção na barra lateral.</p>
      </div>
    </div>
  );
}
