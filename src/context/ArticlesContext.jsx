import { createContext, useState } from 'react'

export const ArticlesContext = createContext()

export const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState([
    { id: 1, name: 'Chaqueta Denim', description: 'Estilo sin género', condition: 'Nuevo', category: 'chaquetas', points: 1, image: null, owners: [{ photo: null }, { photo: null }], isOwn: false },
    { id: 2, name: 'Camiseta Algodón', description: 'Talle inclusivo', condition: 'Buen estado', category: 'camisetas', points: 1, image: null, owners: [{ photo: null }], isOwn: false },
    { id: 3, name: 'Pantalón Cargo', description: 'Prenda versátil', condition: 'Regular', category: 'pantalones', points: 1, image: null, owners: [{ photo: null }], isOwn: false },
    { id: 4, name: 'Jersey de Lana', description: 'Acogedor y unisex', condition: 'Nuevo', category: 'camisetas', points: 1, image: null, owners: [{ photo: null }, { photo: null }], isOwn: false },
  ])

  const addArticle = (formData) => {
    const newArticle = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      condition: formData.condition,
      category: formData.category,
      points: 1,
      image: formData.image ? URL.createObjectURL(formData.image) : null,
      owners: [{ photo: null }],
      status: 'Disponible',
      isOwn: true,
    }
    console.log('ArticlesContext - añadiendo:', newArticle)
    setArticles(prev => {
      const updated = [newArticle, ...prev]
      console.log('ArticlesContext - total artículos:', updated.length)
      return updated
    })
  }

  return (
    <ArticlesContext.Provider value={{ articles, addArticle }}>
      {children}
    </ArticlesContext.Provider>
  )
}
