import { useNavigate } from 'react-router-dom'
import { HomeTemplate } from "../templates/HomeTemplate";
import { HeroSection } from "../organisms/HeroSection";
import { ProductGrid } from "../organisms/ProductGrid";

export function HomePage() {
  const navigate = useNavigate()
  return (
    <HomeTemplate activeTab="inicio">
      <HeroSection
        onRegister={() => navigate('/register')}
        onGuest={() => navigate('/login')}
      />
      <ProductGrid onViewAll={() => navigate('/explore')} />
    </HomeTemplate>
  )
}

