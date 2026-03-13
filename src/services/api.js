import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getUser = async (userId) => {
  const res = await fetch(`http://localhost:8080/api/users/${userId}`)
  if (!res.ok) throw new Error('Error obteniendo usuario')
  return res.json()
}
