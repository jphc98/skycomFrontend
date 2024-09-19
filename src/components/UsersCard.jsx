export function UsersCard({ user }) {
  return (
    <div>
        <h1>{user.name}</h1>
        <p>{user.surname}</p>
        <hr/>
    </div>
  )
}
