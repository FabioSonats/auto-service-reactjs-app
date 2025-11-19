'use client'

import { useEffect, useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  type: string
  allergens: string[]
}

interface MenuDisplayProps {
  tableNumber: number
  selectedItems: string[]
  onItemSelect: (itemId: string) => void
  onOrderSubmit: () => void
}

export default function MenuDisplay({
  tableNumber,
  selectedItems,
  onItemSelect,
  onOrderSubmit,
}: MenuDisplayProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMenu()
  }, [])

  const fetchMenu = async () => {
    try {
      const response = await fetch(`${API_URL}/api/menu`)
      if (response.ok) {
        const data = await response.json()
        setMenuItems(data.data)
      } else {
        setError('Erro ao carregar menu')
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor')
    } finally {
      setLoading(false)
    }
  }

  const groupByCategory = (items: MenuItem[]) => {
    const grouped: { [key: string]: MenuItem[] } = {}
    items.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = []
      }
      grouped[item.category].push(item)
    })
    return grouped
  }

  const getCategoryName = (category: string) => {
    const names: { [key: string]: string } = {
      APPETIZER: 'Entradas',
      MAIN_COURSE: 'Pratos Principais',
      DESSERT: 'Sobremesas',
      DRINK: 'Bebidas',
    }
    return names[category] || category
  }

  if (loading) {
    return <div className="loading">Carregando menu...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  const groupedItems = groupByCategory(menuItems)

  return (
    <div>
      <div className="card" style={{ marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '10px', color: '#333' }}>
          Selecione seus itens
        </h2>
        <p style={{ color: '#666' }}>
          {selectedItems.length} item(s) selecionado(s)
        </p>
      </div>

      {Object.entries(groupedItems).map(([category, items]) => (
        <div key={category} className="category-section">
          <h2 className="category-title">{getCategoryName(category)}</h2>
          <div className="menu-grid">
            {items.map(item => (
              <div
                key={item.id}
                className={`menu-item ${selectedItems.includes(item.id) ? 'selected' : ''}`}
                onClick={() => onItemSelect(item.id)}
              >
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <div className="price">R$ {item.price.toFixed(2)}</div>
                {item.allergens.length > 0 && (
                  <div>
                    {item.allergens.map((allergen, idx) => (
                      <span key={idx} className="allergen-tag">
                        {allergen}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedItems.length > 0 && (
        <div className="card" style={{ position: 'sticky', bottom: '20px' }}>
          <button
            className="btn"
            onClick={onOrderSubmit}
            style={{ width: '100%', fontSize: '18px', padding: '16px' }}
          >
            Confirmar Pedido ({selectedItems.length} item(s))
          </button>
        </div>
      )}
    </div>
  )
}

