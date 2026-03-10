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

export const deleteArticle = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Error eliminando articulo')
}

export const getArticlesByUser = async (userId) => {
  const res = await fetch(`${API_URL}/user/${userId}`)
  if (!res.ok) throw new Error('Error cargando articulos del usuario')
  const data = await res.json()
  return data.content || data
}
