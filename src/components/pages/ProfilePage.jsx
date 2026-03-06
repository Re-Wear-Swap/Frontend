import { HomeTemplate } from '../templates/HomeTemplate'
import { ProfileInfo } from '../organisms/ProfileInfo'
import { ProfileTabs } from '../organisms/ProfileTabs'

export function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <p>No has iniciado sesión.</p>;

  return (
    <HomeTemplate activeTab="perfil">
      <ProfileInfo user={user} />
      <ProfileTabs userId={user.id} />
    </HomeTemplate>
  );
}
