'use client'

interface OrderSummaryProps {
  tableNumber: number
}

export default function OrderSummary({ tableNumber }: OrderSummaryProps) {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>
        Pedido Confirmado!
      </h2>
      <p style={{ marginBottom: '20px', color: '#666', fontSize: '18px' }}>
        Seu pedido foi enviado para a cozinha e/ou bar.
      </p>
      <p style={{ color: '#999' }}>
        Mesa {tableNumber}
      </p>
      <p style={{ marginTop: '20px', color: '#999', fontSize: '14px' }}>
        Aguarde enquanto preparamos seu pedido. Obrigado!
      </p>
    </div>
  )
}

