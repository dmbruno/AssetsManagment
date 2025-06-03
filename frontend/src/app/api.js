// Utilidad para hacer fetch autenticado con JWT
export const authFetch = (url, options = {}) => {
  const token = localStorage.getItem('token');
  // Si la URL no empieza con http, la completa con la API base
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  return fetch(fullUrl, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
