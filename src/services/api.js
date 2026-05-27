import axios from 'axios'

const BASE_URL = 'http://localhost:3005'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const ENDPOINTS = {
  socios: '/socios',
  membresias: '/membresias',
  pagos: '/pagos',
  entrenadores: '/entrenadores',
  clases: '/clases',
  equipos: '/equipos',
  inscripciones: '/inscripciones',
  uso_equipos: '/uso_equipos',
}

export default api