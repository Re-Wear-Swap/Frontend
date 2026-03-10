import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useArticles } from '../../context/useArticles'
import { TabItem } from '../atoms/TabItem'
import { ClothingCard } from '../molecules/ClothingCard'

const TABS = ['Mi Armario', 'Intercambios', 'Reservas']

export const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('Mi Armario')
  const navigate = useNavigate()
  const { articles } = useArticles()
  const myArticles = articles.filter(a => a.isOwn)

  return (
    <div style={{ padding: '0 16px 100px' }}>
      <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid #e9d5ff', marginBottom: 20 }}>
        {TABS.map(tab => (
          <TabItem key={tab} label={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {activeTab === 'Mi Armario' && (
          <>
            {myArticles.map(item => (
              <ClothingCard key={item.id} {...item} />
            ))}
            <ClothingCard isEmpty onAdd={() => navigate('/upload')} />
          </>
        )}
        {activeTab === 'Intercambios' && (
          <p style={{ color: '#aaa', gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>No hay intercambios aún</p>
        )}
        {activeTab === 'Reservas' && (
          <p style={{ color: '#aaa', gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>No hay reservas aún</p>
        )}
      </div>
    </div>
  )
}
