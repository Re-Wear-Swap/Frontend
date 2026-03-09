import { createContext, useContext, useState } from 'react'
import { uploadImage } from '../services/imageService'
import { api } from '../services/api'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  // REGISTRO
  const register = async ({ name, email, photo, isAdult }) => {
    try {
      let photoUrl = null
      if (photo) photoUrl = await uploadImage(photo)

      const res = await api.post('/users', {
        name,
        email,
        isAdult,
        photo: photoUrl,
      })

      setUser(res.data) // <-- usuario guardado correctamente
    } catch (err) {
      console.error('Error registrando usuario:', err)
      alert('Error registrando usuario')
    }
  }

  // LOGIN
  const login = async ({ email }) => {
    try {
      const name = email.split('@')[0]

      const res = await api.post('/users/login', null, {
        params: { name, email },
      })

      setUser(res.data)
    } catch (err) {
      console.error('Error iniciando sesión:', err)
      alert('Error iniciando sesión')
    }
  }

  const logout = () => setUser(null)

  return (
    <UserContext.Provider value={{ user, register, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
