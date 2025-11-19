'use client'

import { useState } from 'react'

interface AllergyFormProps {
  onSubmit: (allergies: string[]) => void
}

export default function AllergyForm({ onSubmit }: AllergyFormProps) {
  const [hasAllergies, setHasAllergies] = useState<boolean | null>(null)
  const [allergiesText, setAllergiesText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const allergies = hasAllergies && allergiesText.trim()
      ? allergiesText.split(',').map(a => a.trim()).filter(a => a.length > 0)
      : []

    onSubmit(allergies)
  }

  return (
    <div className="card">
      <h2 style={{ marginBottom: '20px', color: '#333' }}>
        ⚠️ Informações de Alergia
      </h2>
      <p style={{ marginBottom: '24px', color: '#666' }}>
        Você possui alguma alergia ou restrição alimentar?
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <button
            type="button"
            className={`btn ${hasAllergies === true ? '' : 'btn-secondary'}`}
            style={{ marginRight: '10px', marginBottom: '10px' }}
            onClick={() => setHasAllergies(true)}
          >
            Sim
          </button>
          <button
            type="button"
            className={`btn ${hasAllergies === false ? '' : 'btn-secondary'}`}
            onClick={() => {
              setHasAllergies(false)
              setAllergiesText('')
            }}
          >
            Não
          </button>
        </div>

        {hasAllergies === true && (
          <div>
            <label className="label">
              Descreva suas alergias ou restrições (separadas por vírgula):
            </label>
            <textarea
              className="input"
              rows={4}
              placeholder="Ex: Glúten, Lactose, Amendoim..."
              value={allergiesText}
              onChange={(e) => setAllergiesText(e.target.value)}
            />
          </div>
        )}

        <button
          type="submit"
          className="btn"
          disabled={hasAllergies === null}
          style={{ width: '100%', marginTop: '20px' }}
        >
          Continuar para o Menu
        </button>
      </form>
    </div>
  )
}

