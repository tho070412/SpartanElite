const SESSION_KEY = 'spartan_session'

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function saveSession(data) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(data))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function isAuthenticated() {
  return getSession() !== null
}
