import { useNavigate } from 'react-router-dom'
import { ProfileHeader } from '../molecules/ProfileHeader'
import { ProfileInfo } from '../organisms/ProfileInfo'
import { ProfileTabs } from '../organisms/ProfileTabs'
import { BottomNav } from '../organisms/BottomFooter'


// http://localhost:5173/profile


const USER = {
    name: 'Daniel',
    username: 'daniel_re',
    photo: null,
    verified: true,
    points: 3,
    swaps: 12,
}

export function ProfilePage() {
    const navigate = useNavigate()

    return (
        <div style={{ width: '100%', minHeight: '100vh', background: '#f8f5ff', fontFamily: 'sans-serif' }}>
            <ProfileHeader
                username={USER.username}
                onBack={() => navigate('/')}
                onSettings={() => alert('Ajustes')}
            />
            <main style={{ maxWidth: 900, margin: '0 auto' }}>
                <ProfileInfo user={USER} />
                <ProfileTabs />
            </main>
            <BottomNav active="perfil" />
        </div>
    )
}