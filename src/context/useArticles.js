import { useContext } from 'react'
import { ArticlesContext } from './ArticlesContext'

export const useArticles = () => useContext(ArticlesContext)
