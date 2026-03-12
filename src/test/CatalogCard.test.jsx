import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../context/useArticles', () => ({
  useArticles: () => ({ changeStatus: vi.fn() })
}))

vi.mock('../context/UserContext', () => ({
  useUser: () => ({ user: { id: 1, name: 'Ana', points: 3 } }),
}))

vi.mock('../context/useTheme', () => ({
  useTheme: () => ({
    surface: 'white', text: '#000', border: '#eee',
    bg: '#fff', accent: '#9333ea', isDark: false,
  })
}))

vi.mock('../services/reservationsService', () => ({
  createReservation: vi.fn().mockResolvedValue({ id: 1 }),
}))

vi.mock('../services/articlesService', () => ({
  getReservationByArticle: vi.fn().mockResolvedValue({
    id: 1,
    expiresAt: new Date(Date.now() + 3600000).toISOString(),
  }),
}))

vi.mock('../context/useModal', () => ({
  useModal: () => ({
    modal: { isOpen: false },
    showConfirm: vi.fn().mockResolvedValue(true),
    showAlert: vi.fn().mockResolvedValue(undefined),
  })
}))

vi.mock('../components/atoms/Modal', () => ({
  Modal: () => null,
}))

import { CatalogCard } from '../components/molecules/CatalogCard'

const renderCard = (props) =>
  render(
    <MemoryRouter>
      <CatalogCard id={1} name="Camiseta" description="Bonita" condition="NUEVO" points={1} {...props} />
    </MemoryRouter>
  )

describe('CatalogCard', () => {
  it('muestra botón Reservar cuando está disponible y no es propia', () => {
    renderCard({ status: 'DISPONIBLE', isOwn: false })
    expect(screen.getByText('Reservar')).toBeInTheDocument()
  })

  it('muestra Tu prenda cuando está disponible y es propia', () => {
    renderCard({ status: 'DISPONIBLE', isOwn: true })
    expect(screen.getByText('Tu prenda')).toBeInTheDocument()
  })

  it('muestra botón deshabilitado cuando está reservado y no es propio', async () => {
    await act(async () => { renderCard({ status: 'RESERVADO', isOwn: false }) })
    const btn = screen.getByRole('button', { name: /Reservado/ })
    expect(btn).toBeDisabled()
  })

  it('muestra Marcar intercambiado cuando está reservado y es propio', () => {
    renderCard({ status: 'RESERVADO', isOwn: true })
    expect(screen.getByText('✅ Marcar intercambiado')).toBeInTheDocument()
  })

  it('muestra Intercambiado cuando está intercambiado', () => {
    renderCard({ status: 'INTERCAMBIADO', isOwn: false })
    expect(screen.getByText('✓ Intercambiado')).toBeInTheDocument()
  })

  it('muestra el countdown cuando está reservado', async () => {
    await act(async () => { renderCard({ status: 'RESERVADO', isOwn: false }) })
    await waitFor(() =>
      expect(screen.getByText(/Expira en/)).toBeInTheDocument()
    , { timeout: 3000 })
  })
})
