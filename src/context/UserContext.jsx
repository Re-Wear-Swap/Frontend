import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => setUser(null)

  const updatePhoto = (photoUrl) => {
    setUser(prev => ({ ...prev, photo: photoUrl }))
  }

  return (
    <UserContext.Provider value={{ user, login, logout, updatePhoto }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
