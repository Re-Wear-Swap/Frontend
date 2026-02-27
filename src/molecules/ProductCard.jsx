import { Badge } from '../atoms/Badge';
import { StatusDot } from '../atoms/StatusDot';

export const ProductCard = ({ image, name, condition, points }) => (
    <div className="product-card">
        <div className="product-card__image-wrapper">
            <img src={image} alt={name} />
            <Badge label={`${points} PUNTO`} />
        </div>
        <div className="product-card__info">
            <h3>{name}</h3>
            <p><StatusDot status={condition} /> {condition}</p>
        </div>
    </div>
);