import { useNavigate } from 'react-router-dom'
import { HomeTemplate } from '../templates/HomeTemplate'
import { HeroSection } from '../organisms/HeroSection'
import { ProductGrid } from '../organisms/ProductGrid'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <HomeTemplate
      hero={
        <HeroSection
          onRegister={() => navigate('/register')}
          onGuest={() => navigate('/login')}
        />
      }
      grid={<ProductGrid onViewAll={() => navigate('/explore')} />}
    />
  )
}