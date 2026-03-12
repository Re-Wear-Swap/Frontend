import { useNavigate } from 'react-router-dom'
import { HomeTemplate } from '../templates/HomeTemplate'
import { HeroSection } from '../organisms/HeroSection'
import { ProductGrid } from '../organisms/ProductGrid'
import { useUser } from '../../context/UserContext'

export function HomePage() {
  const navigate = useNavigate()
  const { user } = useUser()

  const handleViewAll = () => {
    user ? navigate('/catalog') : navigate('/login')
  }

  return (
    <HomeTemplate activeTab="inicio">
      <HeroSection
        onRegister={() => navigate('/register')}
        onGuest={() => navigate('/login')}
      />
      <ProductGrid onViewAll={handleViewAll} />
    </HomeTemplate>
  )
}
