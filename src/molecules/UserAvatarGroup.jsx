import { Avatar } from '../components/atoms/Avatar';

export const UserAvatarGroup = ({ users }) => (
    <div className="avatar-group">
        {users.map((u, i) => <Avatar key={i} src={u.photo} online={u.online} />)}
    </div>
);