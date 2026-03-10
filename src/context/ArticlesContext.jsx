import { createContext, useState, useEffect, useContext } from 'react'
import { getArticles, createArticle, updateArticle, deleteArticle, updateArticleStatus } from '../services/articlesService'
import { uploadImage } from '../services/imageService'
import { UserContext } from './UserContext'

export const ArticlesContext = createContext()

const mapArticle = (a, userId) => ({
  ...a,
  name: a.title,
  condition: a.itemCondition,
  image: a.imageUrl,
  status: a.articleStatus,
  isOwn: a.user?.id === userId,
})

export const ArticlesProvider = ({ children }) => {
  const { user } = useContext(UserContext)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getArticles()
      .then(data => setArticles(data.map(a => mapArticle(a, user?.id))))
      .catch(err => console.error('Error cargando articulos:', err))
      .finally(() => setLoading(false))
  }, [user])

  const addArticle = async (formData) => {
    let imageUrl = ''
    if (formData.image) {
      imageUrl = await uploadImage(formData.image)
    }
    const newArticle = {
      title: formData.name,
      description: formData.description,
      itemCondition: formData.itemCondition,
      category: formData.category,
      imageUrl,
      articleStatus: 'DISPONIBLE',
      user: { id: user?.id },
    }
    const saved = await createArticle(newArticle)
    setArticles(prev => [{ ...mapArticle(saved, user?.id), isOwn: true }, ...prev])
  }

  const editArticle = async (id, formData) => {
    let imageUrl = formData.imageUrl || formData.image
    if (formData.image instanceof File) {
      imageUrl = await uploadImage(formData.image)
    }
    const updated = {
      title: formData.name,
      description: formData.description,
      itemCondition: formData.itemCondition,
      category: formData.category,
      imageUrl,
      articleStatus: formData.status || 'DISPONIBLE',
      user: { id: user?.id },
    }
    const saved = await updateArticle(id, updated)
    setArticles(prev => prev.map(a => a.id === Number(id) ? { ...mapArticle(saved, user?.id), isOwn: true } : a))
  }

  const removeArticle = async (id) => {
    await deleteArticle(id)
    setArticles(prev => prev.filter(a => a.id !== id))
  }

  const changeStatus = async (id, newStatus) => {
    const saved = await updateArticleStatus(id, newStatus)
    setArticles(prev => prev.map(a => a.id === id ? { ...a, ...mapArticle(saved, user?.id) } : a))
  }

  return (
    <ArticlesContext.Provider value={{ articles, addArticle, editArticle, removeArticle, changeStatus, loading }}>
      {children}
    </ArticlesContext.Provider>
  )
}
