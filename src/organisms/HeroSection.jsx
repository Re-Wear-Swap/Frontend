import { UserAvatarGroup } from '../molecules/UserAvatarGroup';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

export const HeroSection = ({ users, onRegister, onGuest }) => (
    <section className="hero">
        <UserAvatarGroup users={users} />
        <h1>¡Bienvenid@!</h1>
        <p>Trueque juvenil e inclusivo
            TEXTO EXPLICATIVO APP
        </p>

        <Badge label="SISTEMA 1:1" variant="outline" />
        <Button variant="primary" onClick={onRegister}>Registrarse</Button>
        <Button variant="ghost" onClick={onGuest}>Iniciar Sesión</Button>
    </section>
);