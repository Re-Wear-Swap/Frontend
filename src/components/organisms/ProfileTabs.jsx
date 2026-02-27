import { useState } from 'react'
import { TabItem } from '../atoms/TabItem'
import { ClothingCard } from '../molecules/ClothingCard'

const TABS = ['Mi Armario', 'Intercambios', 'Favoritos']

const ITEMS = [
    { id: 1, name: 'Camiseta Oversize', condition: 'Usado: buen estado', points: 1, status: 'Disponible' },
    { id: 2, name: 'Gorra Streetwear', condition: 'Nuevo', points: 1, status: 'Reservado' },
    { id: 3, name: 'Sudadera Basic', condition: 'Usado: regular', points: 1, status: 'Intercambiado' },
    { id: 4, isEmpty: true },
]

export const ProfileTabs = () => {
    const [activeTab, setActiveTab] = useState('Mi Armario')

    return (
        <div style={{ padding: '0 16px 100px' }}>
            <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid #e9d5ff', marginBottom: 20 }}>
                {TABS.map(tab => (
                    <TabItem key={tab} label={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)} />
                ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {activeTab === 'Mi Armario' && ITEMS.map(item => (
                    <ClothingCard key={item.id} {...item} onAdd={() => alert('Subir prenda')} />
                ))}
                {activeTab === 'Intercambios' && (
                    <p style={{ color: '#aaa', gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>No hay intercambios aún</p>
                )}
                {activeTab === 'Favoritos' && (
                    <p style={{ color: '#aaa', gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>No hay favoritos aún</p>
                )}
            </div>
        </div>
    )
}