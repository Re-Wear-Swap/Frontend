import { createContext, useContext, useState, useEffect } from 'react'
import { uploadImage } from '../services/imageService'
import { api } from '../services/api'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  // ⭐ Cargar usuario guardado al iniciar la app
  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (saved) setUser(JSON.parse(saved))
  }, [])

  // ⭐ Guardar usuario cuando inicia sesión o se registra
  const saveUser = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

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

      saveUser(res.data)
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

      saveUser(res.data)
    } catch (err) {
      console.error('Error iniciando sesión:', err)
      alert('Error iniciando sesión')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <UserContext.Provider value={{ user, register, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
