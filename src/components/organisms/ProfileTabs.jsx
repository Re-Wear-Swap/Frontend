import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useArticles } from '../../context/useArticles'
import { useTheme } from '../../context/useTheme'
import { useUser } from '../../context/UserContext'
import { getReservationsByUser } from '../../services/reservationsService'
import { TabItem } from '../atoms/TabItem'
import { ClothingCard } from '../molecules/ClothingCard'

const TABS = ['Mi Armario', 'Reservas', 'Intercambios']

export const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('Mi Armario')
  const [userReservations, setUserReservations] = useState([])
  const navigate = useNavigate()
  const { articles } = useArticles()
  const { border } = useTheme()
  const { user } = useUser()

  useEffect(() => {
    if (user?.id) {
      getReservationsByUser(user.id)
        .then(reservations => setUserReservations(reservations))
        .catch(err => console.error('Error cargando reservas:', err))
    }
  }, [user, articles])

  // Artículos propios disponibles o reservados (armario activo)
  const myArticles = articles.filter(a => a.isOwn && a.status !== 'INTERCAMBIADO')

  // Reservas hechas por el usuario como comprador (artículos RESERVADO que no son suyos)
  const reservasComoComprador = userReservations
    .filter(r => r.article?.articleStatus === 'RESERVADO')
    .map(r => ({
      ...r.article,
      name: r.article.title,
      condition: r.article.itemCondition,
      image: r.article.imageUrl,
      status: r.article.articleStatus,
      isOwn: false,
      reservationId: r.id,
    }))

  // Artículos propios que están reservados por otros
  const reservasComoVendedor = articles.filter(a => a.isOwn && a.status === 'RESERVADO')

  const todasLasReservas = [
    ...reservasComoVendedor,
    ...reservasComoComprador.filter(rc => !reservasComoVendedor.find(rv => rv.id === rc.id))
  ]

  // Intercambios
  const myIntercambiados = articles.filter(a => a.isOwn && a.status === 'INTERCAMBIADO')
  const intercambiadosComoComprador = userReservations
    .filter(r => r.article?.articleStatus === 'INTERCAMBIADO')
    .map(r => ({
      ...r.article,
      name: r.article.title,
      condition: r.article.itemCondition,
      image: r.article.imageUrl,
      status: r.article.articleStatus,
      isOwn: false,
    }))
  const allIntercambios = [
    ...myIntercambiados,
    ...intercambiadosComoComprador.filter(ic => !myIntercambiados.find(mi => mi.id === ic.id))
  ]

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
        {activeTab === 'Reservas' && (
          todasLasReservas.length === 0
            ? <p style={{ color: '#aaa', gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>No hay reservas activas</p>
            : todasLasReservas.map(item => (
                <ClothingCard key={item.id} {...item} />
              ))
        )}
        {activeTab === 'Intercambios' && (
          allIntercambios.length === 0
            ? <p style={{ color: '#aaa', gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>No hay intercambios aún</p>
            : allIntercambios.map(item => (
                <ClothingCard key={item.id} {...item} />
              ))
        )}
      </div>
    </div>
  )
}
