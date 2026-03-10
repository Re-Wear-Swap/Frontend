const API_URL = 'http://localhost:8080/api/articles'
const CURRENT_USER_ID = 1

export const getArticles = async () => {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error('Error cargando articulos')
  const data = await res.json()
  return data.content || data
}

export const createArticle = async (article) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...article, user: { id: CURRENT_USER_ID } }),
  })
  if (!res.ok) throw new Error('Error creando articulo')
  return res.json()
}

export const updateArticle = async (id, article) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...article, user: { id: CURRENT_USER_ID } }),
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
