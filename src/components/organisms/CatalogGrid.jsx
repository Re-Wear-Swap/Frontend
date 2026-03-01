import { CatalogCard } from '../molecules/CatalogCard'

const PRODUCTS = [
    {
        id: 1, name: 'Chaqueta Denim', description: 'Estilo sin género',
        condition: 'NUEVO', points: 1,
        owners: [{ photo: null }, { photo: null }],
    },
    {
        id: 2, name: 'Camiseta Algodón', description: 'Talla única',
        condition: 'USADO: BUEN ESTADO', points: 1,
        owners: [{ photo: null }],
    },
    {
        id: 3, name: 'Pantalón Cargo', description: 'Prenda versátil',
        condition: 'USADO: REGULAR', points: 1,
        owners: [{ photo: null }],
    },
    {
        id: 4, name: 'Jersey de Lana', description: 'Acogedor y unisex',
        condition: 'NUEVO', points: 1,
        owners: [{ photo: null }, { photo: null }],
    },
]

export const CatalogGrid = ({ filter }) => {
    const filtered = filter && filter !== 'Todos'
        ? PRODUCTS.filter(p => p.condition.includes(filter.toUpperCase()))
        : PRODUCTS

    return (
        <div style={{ padding: '0 16px 120px' }}>
            <div style={{ marginBottom: 16 }}>
                <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800 }}>Prendas disponibles</h2>
                <p style={{ margin: 0, fontSize: 13, color: '#aaa' }}>Para Cris, Alex y todo el mundo</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
                {filtered.map(p => <CatalogCard key={p.id} {...p} />)}
            </div>
        </div>
    )
}