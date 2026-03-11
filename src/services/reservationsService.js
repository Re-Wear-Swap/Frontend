const API_URL = 'http://localhost:8080/api/reservations'

export const createReservation = async (articleId, userId) => {
  const res = await fetch(`${API_URL}?articleId=${articleId}&userId=${userId}`, {
    method: 'POST',
  })
  if (!res.ok) throw new Error('Error creando reserva')
  return res.json()
}

export const deleteReservation = async (reservationId) => {
  const res = await fetch(`${API_URL}/${reservationId}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Error eliminando reserva')
}
