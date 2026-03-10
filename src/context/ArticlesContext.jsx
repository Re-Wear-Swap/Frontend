import { createContext, useState, useEffect } from 'react'
import { getArticles, createArticle, deleteArticle } from '../services/articlesService'
import { uploadImage } from '../services/imageService'

export const ArticlesContext = createContext()

const CURRENT_USER_ID = 1

const mapArticle = (a) => ({
  ...a,
  name: a.title,
  condition: a.itemCondition,
  image: a.imageUrl,
  isOwn: a.user?.id === CURRENT_USER_ID,
})

export const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getArticles()
      .then(data => setArticles(data.map(mapArticle)))
      .catch(err => console.error('Error cargando articulos:', err))
      .finally(() => setLoading(false))
  }, [])

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
      user: { id: CURRENT_USER_ID },
    }
    const saved = await createArticle(newArticle)
    setArticles(prev => [{ ...mapArticle(saved), isOwn: true }, ...prev])
  }

  const removeArticle = async (id) => {
    await deleteArticle(id)
    setArticles(prev => prev.filter(a => a.id !== id))
  }

  return (
    <ArticlesContext.Provider value={{ articles, addArticle, removeArticle, loading }}>
      {children}
    </ArticlesContext.Provider>
  )
}
