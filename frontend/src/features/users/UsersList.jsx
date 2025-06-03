// src/features/users/UsersList.jsx
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUsers } from './usersSlice'

const UsersList = () => {
  const dispatch = useDispatch()
  const { list, status } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(loadUsers())
  }, [dispatch])

  if (status === 'loading') return <p>Cargando...</p>
  if (status === 'failed') return <p>Error al cargar usuarios</p>

  return (
    <ul>
      {list.map((user) => (
        <li key={user.id}>{user.email}</li>
      ))}
    </ul>
  )
}

export default UsersList