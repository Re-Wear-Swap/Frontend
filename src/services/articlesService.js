import { api } from './api'

export const getArticles = async (page = 0, category, startDate, endDate) => {
  const params = { page }

  if (category) params.category = category
  if (startDate && endDate) {
    params.startDate = startDate
    params.endDate = endDate
  }

  const res = await api.get('/articles', { params })
  return res.data.content || res.data
}

export const createArticle = async (article) => {
  const res = await api.post('/articles', article)
  return res.data
}

export const updateArticle = async (id, article) => {
  const res = await api.put(`/articles/${id}`, article)
  return res.data
}

export const deleteArticle = async (id) => {
  await api.delete(`/articles/${id}`)
}

export const getArticleById = async (id) => {
  const res = await api.get(`/articles/${id}`)
  return res.data
}
