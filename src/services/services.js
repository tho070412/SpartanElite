import api from './api'

export function createService(endpoint) {
  return {
    getAll: async () => {
      const { data } = await api.get(endpoint)
      return data
    },
    getById: async (id) => {
      const { data } = await api.get(`${endpoint}/${id}`)
      return data
    },
    create: async (payload) => {
      const { data } = await api.post(endpoint, payload)
      return data
    },
    update: async (id, payload) => {
      const { data } = await api.put(`${endpoint}/${id}`, payload)
      return data
    },
    remove: async (id) => {
      const { data } = await api.delete(`${endpoint}/${id}`)
      return data
    },
  }
}

import { ENDPOINTS } from './api'

export const sociosService     = createService(ENDPOINTS.socios)
export const membresiasService = createService(ENDPOINTS.membresias)
export const pagosService      = createService(ENDPOINTS.pagos)
export const entrenadoresService = createService(ENDPOINTS.entrenadores)
export const clasesService     = createService(ENDPOINTS.clases)
export const equiposService    = createService(ENDPOINTS.equipos)
