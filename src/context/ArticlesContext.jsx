import { createContext, useState, useEffect, useContext } from 'react'
import { getArticles, createArticle, updateArticle, deleteArticle, updateArticleStatus } from '../services/articlesService'
import { uploadImage } from '../services/imageService'
import { UserContext } from './UserContext'
import { createReservation, cancelReservationByArticle, confirmExchange } from '../services/reservationsService'

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
  const { user, saveUser } = useContext(UserContext)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await getArticles()
        setArticles(data.map(a => mapArticle(a, user?.id)))
      } catch (err) {
        console.error('Error cargando articulos:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user])

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await getArticles()
      setArticles(data.map(a => mapArticle(a, user?.id)))
    }, 60000)
    return () => clearInterval(interval)
  }, [user])

  const addArticle = async (formData) => {
    let imageUrl = ''
    if (formData.image) imageUrl = await uploadImage(formData.image)
    const newArticle = {
      title: formData.name, description: formData.description,
      itemCondition: formData.itemCondition, category: formData.category,
      imageUrl, articleStatus: 'DISPONIBLE', user: { id: user?.id },
    }
    const saved = await createArticle(newArticle)
    setArticles(prev => [{ ...mapArticle(saved, user?.id), isOwn: true }, ...prev])
  }

  const editArticle = async (id, formData) => {
    let imageUrl = formData.imageUrl || formData.image
    if (formData.image instanceof File) imageUrl = await uploadImage(formData.image)
    const updated = {
      title: formData.name, description: formData.description,
      itemCondition: formData.itemCondition, category: formData.category,
      imageUrl, articleStatus: formData.status || 'DISPONIBLE', user: { id: user?.id },
    }
    const saved = await updateArticle(id, updated)
    setArticles(prev => prev.map(a => a.id === Number(id) ? { ...mapArticle(saved, user?.id), isOwn: true } : a))
  }

  const removeArticle = async (id) => {
    await deleteArticle(id)
    setArticles(prev => prev.filter(a => a.id !== id))
  }

  const changeStatus = async (id, newStatus) => {
    if (newStatus === 'INTERCAMBIADO') {
      await confirmExchange(id)
      setArticles(prev => prev.map(a => a.id === id ? { ...a, status: 'INTERCAMBIADO', articleStatus: 'INTERCAMBIADO' } : a))
      if (user) saveUser({ ...user, points: (user.points || 0) + 1 })
      return
    }
    if (newStatus === 'DISPONIBLE') {
      await cancelReservationByArticle(id)
      setArticles(prev => prev.map(a => a.id === id ? { ...a, status: 'DISPONIBLE', articleStatus: 'DISPONIBLE' } : a))
      return
    }
    const saved = await updateArticleStatus(id, newStatus)
    setArticles(prev => prev.map(a => a.id === id ? { ...a, ...mapArticle(saved, user?.id) } : a))
  }

  const reserveArticle = async (articleId) => {
    try {
      const reservation = await createReservation(articleId, user?.id)
      setArticles(prev => prev.map(a => a.id === articleId ? { ...a, reservation, status: 'RESERVADO' } : a))
    } catch (err) {
      console.error('Error reservando:', err)
    }
  }

  const cancelReservation = async (reservationId, articleId) => {
    try {
      await cancelReservationByArticle(articleId)
      setArticles(prev => prev.map(a => a.id === articleId ? { ...a, reservation: null, status: 'DISPONIBLE' } : a))
    } catch (err) {
      console.error('Error cancelando reserva:', err)
    }
  }

  return (
    <ArticlesContext.Provider value={{ articles, addArticle, editArticle, removeArticle, changeStatus, reserveArticle, cancelReservation, loading }}>
      {children}
    </ArticlesContext.Provider>
  )
}
