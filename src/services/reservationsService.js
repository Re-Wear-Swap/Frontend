const API_URL = 'http://localhost:8080/api/reservations'

export const createReservation = async (articleId, userId) => {
  const res = await fetch(`${API_URL}?articleId=${articleId}&userId=${userId}`, { method: 'POST' })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const err = new Error(body.message || 'Error creando reserva')
    err.status = res.status
    throw err
  }
  return res.json()
}

export const cancelReservationByArticle = async (articleId) => {
  const res = await fetch(`${API_URL}/article/${articleId}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Error cancelando reserva')
}

export const getReservationsByUser = async (userId) => {
  const res = await fetch(`${API_URL}/user/${userId}`)
  if (!res.ok) throw new Error('Error obteniendo reservas')
  return res.json()
}

export const confirmExchange = async (articleId) => {
  const res = await fetch(`http://localhost:8080/api/reservations/${articleId}/confirm`, {
    method: 'PUT',
  })
  if (!res.ok) throw new Error('Error confirmando intercambio')
}
