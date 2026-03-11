import { createContext, useState, useEffect, useContext } from 'react'
import { getArticles, createArticle, updateArticle, deleteArticle, updateArticleStatus } from '../services/articlesService'
import { uploadImage } from '../services/imageService'
import { UserContext } from './UserContext'
import { createReservation, deleteReservation } from '../services/reservationsService'



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

  // ⭐ FIX: evitar warning de React moviendo setLoading dentro de una función async
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

  // ⭐⭐⭐ RESERVAR PRENDA (conectado a Spring Boot)
  const reserveArticle = async (articleId) => {
    try {
      const reservation = await createReservation(articleId, user?.id)

      setArticles(prev =>
        prev.map(a =>
          a.id === articleId
            ? { ...a, reservation, articleStatus: 'RESERVADO' }
            : a
        )
      )
    } catch (err) {
      console.error('Error reservando:', err)
    }
  }

  // ⭐⭐⭐ CANCELAR RESERVA (conectado a Spring Boot)
  const cancelReservation = async (reservationId, articleId) => {
    try {
      await deleteReservation(reservationId)

      setArticles(prev =>
        prev.map(a =>
          a.id === articleId
            ? { ...a, reservation: null, articleStatus: 'DISPONIBLE' }
            : a
        )
      )
    } catch (err) {
      console.error('Error cancelando reserva:', err)
    }
  }

  return (
  <ArticlesContext.Provider value={{ 
    articles,
    addArticle,
    editArticle,
    removeArticle,
    changeStatus,
    reserveArticle,     
    cancelReservation,   
    loading
  }}>
    {children}
  </ArticlesContext.Provider>
)

}

