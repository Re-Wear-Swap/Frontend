import { ProductCard } from '../molecules/ProductCard';
import { SectionHeader } from '../molecules/SectionHeader';

export const ProductGrid = ({ products, onViewAll }) => (
    <section className="product-grid">
        <SectionHeader title="Catálogo Reciente" onAction={onViewAll} actionLabel="Ver todo" />
        <div className="product-grid__items">
            {products.map(p => <ProductCard key={p.id} {...p} />)}
        </div>
    </section>
);