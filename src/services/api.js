import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const getUser = async (userId) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`)
  if (!res.ok) throw new Error('Error obteniendo usuario')
  return res.json()
}
