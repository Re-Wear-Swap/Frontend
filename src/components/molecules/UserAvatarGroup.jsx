import { Avatar } from '../atoms/Avatar'

export const UserAvatarGroup = ({ users }) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    {users.map((u, i) => (
      <div key={i} style={{ marginLeft: i > 0 ? -16 : 0 }}>
        <Avatar src={u.photo} online={u.online} />
      </div>
    ))}
  </div>
)
