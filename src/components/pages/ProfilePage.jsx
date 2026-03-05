import { HomeTemplate } from '../templates/HomeTemplate'
import { ProfileInfo } from '../organisms/ProfileInfo'
import { ProfileTabs } from '../organisms/ProfileTabs'

const USER = {
  name: 'Daniel',
  username: 'daniel_re',
  photo: null,
  verified: true,
  points: 3,
  swaps: 12,
}

export function ProfilePage() {
  return (
    <HomeTemplate activeTab="perfil">
      <ProfileInfo user={USER} />
      <ProfileTabs />
    </HomeTemplate>
  )
}