const HOST = import.meta.env.VITE_API_HOST

export function Http(method, endpoint, body) {
  return fetch(`${HOST}${endpoint}`, {
    method: method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'User-Lang': localStorage.getItem('user-lang') || 'en',
    },
    body: JSON.stringify(body),
  })
}
