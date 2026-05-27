import { useState, useEffect, useCallback } from 'react'
import Swal from 'sweetalert2'

export function useCrud(service, nombreEntidad = 'registro') {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await service.getAll()
      setItems(data)
    } catch {
      setError(`No se pudieron cargar los ${nombreEntidad}s.`)
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: '¿Está corriendo JSON Server en el puerto 3005?',
        background: '#111111',
        color: '#e8e8e8',
        confirmButtonColor: '#c0392b',
      })
    } finally {
      setLoading(false)
    }
  }, [service, nombreEntidad])

  useEffect(() => { fetchAll() }, [fetchAll])

  const add = async (payload) => {
    try {
      const nuevo = await service.create(payload)
      setItems((prev) => [...prev, nuevo])
      return { ok: true }
    } catch {
      return { ok: false, message: `Error al crear el ${nombreEntidad}.` }
    }
  }

  const edit = async (id, payload) => {
    try {
      const actualizado = await service.update(id, payload)
      setItems((prev) => prev.map((item) => (item.id === id ? actualizado : item)))
      return { ok: true }
    } catch {
      return { ok: false, message: `Error al actualizar el ${nombreEntidad}.` }
    }
  }

  const remove = async (id, nombre = '') => {
    const result = await Swal.fire({
      title: `¿Eliminar ${nombreEntidad}?`,
      text: nombre ? `"${nombre}" será eliminado permanentemente.` : 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#c0392b',
      cancelButtonColor: '#2a2a2a',
      background: '#111111',
      color: '#e8e8e8',
    })

    if (!result.isConfirmed) return { ok: false, cancelled: true }

    try {
      await service.remove(id)
      setItems((prev) => prev.filter((item) => item.id !== id))
      Swal.fire({
        icon: 'success',
        title: '¡Eliminado!',
        timer: 1800,
        showConfirmButton: false,
        background: '#111111',
        color: '#e8e8e8',
      })
      return { ok: true }
    } catch {
      return { ok: false, message: `Error al eliminar el ${nombreEntidad}.` }
    }
  }

  return { items, loading, error, fetchAll, add, edit, remove }
}