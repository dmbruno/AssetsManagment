// src/features/users/usersApi.js
import { authFetch } from '../../app/api';

export async function fetchUsers() {
    const response = await authFetch('http://localhost:5001/usuarios')
    if (!response.ok) {
      throw new Error('Error al obtener usuarios')
    }
    return await response.json()
  }