import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useContext } from 'react'

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      post: vi.fn(),
      get: vi.fn(),
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() }
      },
    })),
  }
}))

vi.mock('../context/useTheme', () => ({
  useTheme: () => ({
    surface: 'white', text: '#000', border: '#eee',
    bg: '#fff', accent: '#9333ea', isDark: false,
  })
}))

import { UserContext, UserProvider } from '../context/UserContext'

const TestConsumer = () => {
  const { user, logout } = useContext(UserContext)
  return (
    <div>
      <span data-testid="user">{user ? user.name : 'sin sesión'}</span>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

const renderWithProvider = () =>
  render(<UserProvider><TestConsumer /></UserProvider>)

describe('UserContext', () => {
  it('muestra sin sesión por defecto', () => {
    renderWithProvider()
    expect(screen.getByTestId('user')).toHaveTextContent('sin sesión')
  })

  it('hace logout y limpia el usuario', async () => {
    renderWithProvider()
    await userEvent.click(screen.getByText('Logout'))
    expect(screen.getByTestId('user')).toHaveTextContent('sin sesión')
  })
})
