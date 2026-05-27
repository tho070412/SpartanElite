export function formatPrice(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', minimumFractionDigits: 0,
  }).format(value)
}

export function formatDate(str) {
  if (!str) return '—'
  try {
    return new Date(str).toLocaleDateString('es-CO', {
      day: '2-digit', month: 'short', year: 'numeric',
    })
  } catch { return str }
}

export function getBadgeEstado(estado) {
  const map = {
    activo: 'badge-activo',
    Activo: 'badge-activo',
    inactivo: 'badge-inactivo',
    Inactivo: 'badge-inactivo',
    pagado: 'badge-pagado',
    Pagado: 'badge-pagado',
    pendiente: 'badge-pendiente',
    Pendiente: 'badge-pendiente',
    fallido: 'badge-inactivo',
    Fallido: 'badge-inactivo',
  }
  return map[estado] || 'badge-pendiente'
}
