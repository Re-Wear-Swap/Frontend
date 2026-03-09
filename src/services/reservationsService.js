import { api } from './api'

export const createReservation = async (articleId, userId) => {
  const res = await api.post('/reservations', null, {
    params: { articleId, userId },
  })
  return res.data
}

export const deleteReservation = async (id) => {
  await api.delete(`/reservations/${id}`)
}
