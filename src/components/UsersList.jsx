import { useEffect, useState } from "react"
import { getAllUsers } from "../api/users.api"
import { UsersCard } from "./UsersCard";

export function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function users() {
            const res = await getAllUsers()
            setUsers(res.data);
        }
        users();
    }, [])
  return <div>
    {users.map(user => (
        <UsersCard key={user.id} user={user}/>
    ))}
  </div>
    
}
