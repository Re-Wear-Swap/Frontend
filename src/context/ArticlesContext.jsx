import { createContext, useContext, useState, useEffect } from 'react'
import { useUser } from './UserContext'
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleById,
} from '../services/articlesService'
import { uploadImage } from '../services/imageService'
import {
  createReservation,
  deleteReservation,
} from '../services/reservationsService'

export const ArticlesContext = createContext()

export const ArticlesProvider = ({ children }) => {
  const { user } = useUser()

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  // filtros y paginación
  const [page, setPage] = useState(0)
  const [categoryFilter, setCategoryFilter] = useState(null)
  const [dateRange, setDateRange] = useState({ start: null, end: null })

  // 🔥 Mapea artículos del backend a tu UI sin romper diseño
  const mapArticle = (a) => ({
  id: a.id,
  title: a.title,
  description: a.description,
  itemCondition: a.itemCondition,
  category: a.category,
  imageUrl: a.imageUrl,
  createdAt: a.createdAt,
  articleStatus: a.articleStatus,
  reservation: a.reservation || null,
  points: 1,
  isOwn: user ? a.user?.id === user.id : false,
})



  // 🔥 Cargar artículos desde backend
  const loadArticles = async () => {
    setLoading(true)
    try {
      const data = await getArticles(
        page,
        categoryFilter,
        dateRange.start,
        dateRange.end
      )

      // Ordenar por fecha descendente
      const sorted = [...data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      setArticles(sorted.map(mapArticle))

    } catch (err) {
      console.error('Error cargando artículos:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadArticles()
  }, [page, categoryFilter, dateRange.start, dateRange.end])

  // 🔥 Crear artículo
  const addArticle = async (formData) => {
    if (!user) return alert('Debes iniciar sesión')

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
      user: { id: user.id },
      createdAt: new Date().toISOString()
    }



    const saved = await createArticle(newArticle)
    setArticles((prev) => [{ ...mapArticle(saved), isOwn: true }, ...prev])
  }

  // 🔥 Eliminar artículo
  const removeArticle = async (id) => {
    await deleteArticle(id)
    setArticles((prev) => prev.filter((a) => a.id !== id))
  }

  // 🔥 Editar artículo
  const editArticle = async (id, updates) => {
    const existing = await getArticleById(id)

    const updated = await updateArticle(id, {
      ...existing,
      ...updates,
    })

    setArticles((prev) =>
      prev.map((a) => (a.id === id ? mapArticle(updated) : a))
    )
  }

  // 🔥 Reservar artículo
  const reserveArticle = async (articleId) => {
    if (!user) return alert('Debes iniciar sesión')

    try {
      const reservation = await createReservation(articleId, user.id)

      setArticles((prev) =>
        prev.map((a) =>
          a.id === articleId
            ? { ...a, articleStatus: 'RESERVADO', reservation }
            : a
        )
      )
    } catch (err) {
      alert('Este artículo ya está reservado')
    }
  }

  // 🔥 Cancelar reserva
  const cancelReservation = async (reservationId, articleId) => {
    await deleteReservation(reservationId)

    setArticles((prev) =>
      prev.map((a) =>
        a.id === articleId
          ? { ...a, articleStatus: 'DISPONIBLE', reservation: null }
          : a
      )
    )
  }

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        loading,
        addArticle,
        removeArticle,
        editArticle,
        reserveArticle,
        cancelReservation,
        page,
        setPage,
        setCategoryFilter,
        setDateRange,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  )
}

export const useArticles = () => useContext(ArticlesContext)
