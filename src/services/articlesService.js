const API_URL = 'http://localhost:8080/api/articles'

export const getArticles = async ({ category, startDate, endDate } = {}) => {
  const params = new URLSearchParams()
  if (category && category !== 'Todas') params.append('category', category)
  if (startDate) params.append('startDate', startDate)
  if (endDate) params.append('endDate', endDate)

  const url = params.toString() ? `${API_URL}?${params}` : API_URL
  const res = await fetch(url)
  if (!res.ok) throw new Error('Error cargando articulos')
  const data = await res.json()
  return data.content || data
}

export const createArticle = async (article) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(article),
  })
  if (!res.ok) throw new Error('Error creando articulo')
  return res.json()
}

export const updateArticle = async (id, article) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(article),
  })
  if (!res.ok) throw new Error('Error actualizando articulo')
  return res.json()
}

export const deleteArticle = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Error eliminando articulo')
}

export const updateArticleStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/${id}/status?status=${status}`, {
    method: 'PATCH',
  })
  if (!res.ok) throw new Error('Error actualizando estado')
  return res.json()
}
