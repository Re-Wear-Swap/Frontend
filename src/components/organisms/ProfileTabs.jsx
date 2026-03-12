import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useArticles } from '../../context/useArticles'
import { useTheme } from '../../context/useTheme'
import { TabItem } from '../atoms/TabItem'
import { ClothingCard } from '../molecules/ClothingCard'

const TABS = ['Mi Armario', 'Intercambios']

export const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('Mi Armario')
  const navigate = useNavigate()
  const { articles } = useArticles()
  const { border } = useTheme()

  const myArticles = articles.filter(a => a.isOwn && a.status !== 'INTERCAMBIADO')
  const intercambiados = articles.filter(a => a.isOwn && a.status === 'INTERCAMBIADO')

  return (
    <div style={{ padding: '0 16px 100px' }}>
      <div style={{ display: 'flex', gap: 24, borderBottom: `1px solid ${border}`, marginBottom: 20 }}>
        {TABS.map(tab => (
          <TabItem key={tab} label={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {activeTab === 'Mi Armario' && (
          <>
            {myArticles.map(item => (
              <ClothingCard key={item.id} {...item} isOwn />
            ))}
            <ClothingCard isEmpty onAdd={() => navigate('/upload')} />
          </>
        )}
        {activeTab === 'Intercambios' && (
          intercambiados.length === 0
            ? <p style={{ color: '#aaa', gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>No hay intercambios aún</p>
            : intercambiados.map(item => (
                <ClothingCard key={item.id} {...item} isOwn />
              ))
        )}
      </div>
    </div>
  )
}
