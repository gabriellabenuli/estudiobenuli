'use client';

export default function FinanceiroSection() {
  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: '400', marginBottom: '24px', color: '#1a1a1a' }}>Financeiro</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e3de' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#938d85' }}>Receita Total</p>
          <p style={{ margin: '0', fontSize: '24px', fontWeight: '600', color: '#789273' }}>R$ 0,00</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e3de' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#938d85' }}>Despesas</p>
          <p style={{ margin: '0', fontSize: '24px', fontWeight: '600', color: '#d32f2f' }}>R$ 0,00</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e3de' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#938d85' }}>Saldo</p>
          <p style={{ margin: '0', fontSize: '24px', fontWeight: '600', color: '#1a1a1a' }}>R$ 0,00</p>
        </div>
      </div>
    </div>
  );
}
