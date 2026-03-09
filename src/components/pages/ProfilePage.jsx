import { HomeTemplate } from '../templates/HomeTemplate'
import { ProfileInfo } from '../organisms/ProfileInfo'
import { ProfileTabs } from '../organisms/ProfileTabs'
import { useUser } from '../../context/UserContext'

export function ProfilePage() {
  const { user } = useUser()

  // Si no hay usuario logueado, evitamos romper la UI
  const activeUser = user || {
    name: 'Invitad@',
    username: 'usuario',
    photo: null,
    verified: false,
    points: 0,
    swaps: 0,
  }

  return (
    <HomeTemplate activeTab="perfil">
      <ProfileInfo user={activeUser} />
      <ProfileTabs />
    </HomeTemplate>
  )
}
