'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import AllergyForm from '@/components/AllergyForm'
import MenuDisplay from '@/components/MenuDisplay'
import OrderSummary from '@/components/OrderSummary'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export default function Home() {
  const searchParams = useSearchParams()
  const tableNumber = parseInt(searchParams.get('mesa') || '0', 10)
  
  const [step, setStep] = useState<'allergy' | 'menu' | 'summary'>('allergy')
  const [allergies, setAllergies] = useState<string[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  useEffect(() => {
    if (!tableNumber || tableNumber <= 0) {
      alert('Número da mesa inválido. Por favor, escaneie o QR Code novamente.')
    }
  }, [tableNumber])

  const handleAllergySubmit = async (allergiesList: string[]) => {
    setAllergies(allergiesList)
    
    try {
      const response = await fetch(`${API_URL}/api/customer/allergies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tableNumber,
          allergies: allergiesList,
        }),
      })

      if (response.ok) {
        setStep('menu')
      } else {
        alert('Erro ao registrar alergias. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao conectar com o servidor.')
    }
  }

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId)
      }
      return [...prev, itemId]
    })
  }

  const handleOrderSubmit = async () => {
    if (selectedItems.length === 0) {
      alert('Selecione pelo menos um item')
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tableNumber,
          itemIds: selectedItems,
        }),
      })

      if (response.ok) {
        setStep('summary')
      } else {
        const data = await response.json()
        alert(data.error || 'Erro ao criar pedido')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao conectar com o servidor.')
    }
  }

  if (!tableNumber || tableNumber <= 0) {
    return (
      <div className="container">
        <div className="card">
          <h1>Erro</h1>
          <p>Número da mesa inválido. Por favor, escaneie o QR Code novamente.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: 'white', fontSize: '36px', marginBottom: '10px' }}>
          🍽️ Menu Digital
        </h1>
        <p style={{ color: 'white', fontSize: '18px' }}>
          Mesa {tableNumber}
        </p>
      </div>

      {step === 'allergy' && (
        <AllergyForm onSubmit={handleAllergySubmit} />
      )}

      {step === 'menu' && (
        <MenuDisplay
          tableNumber={tableNumber}
          selectedItems={selectedItems}
          onItemSelect={handleItemSelect}
          onOrderSubmit={handleOrderSubmit}
        />
      )}

      {step === 'summary' && (
        <OrderSummary tableNumber={tableNumber} />
      )}
    </div>
  )
}

