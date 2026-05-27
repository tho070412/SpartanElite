import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { sociosService, membresiasService, pagosService, entrenadoresService, clasesService, equiposService } from '../../services/services'
import Spinner from '../../components/Spinner'
import { formatPrice } from '../../utils/helpers'

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [socios, membresias, pagos, entrenadores, clases, equipos] = await Promise.all([
          sociosService.getAll(),
          membresiasService.getAll(),
          pagosService.getAll(),
          entrenadoresService.getAll(),
          clasesService.getAll(),
          equiposService.getAll(),
        ])
        const ingresos = pagos.filter(p => p.estado_pago === 'pagado').reduce((acc, p) => acc + Number(p.monto || 0), 0)
        setStats({
          socios: socios.length,
          sociosActivos: socios.filter(s => s.estado === 'activo').length,
          membresias: membresias.length,
          pagos: pagos.length,
          ingresos,
          entrenadores: entrenadores.length,
          clases: clases.length,
          equipos: equipos.length,
        })
      } catch {
        setStats({ socios: 0, sociosActivos: 0, membresias: 0, pagos: 0, ingresos: 0, entrenadores: 0, clases: 0, equipos: 0 })
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  const CARDS = stats ? [
    { label: 'Total Socios', value: stats.socios, sub: `${stats.sociosActivos} activos`, icon: '👥', link: '/admin/socios', color: 'border-blue-800' },
    { label: 'Membresías', value: stats.membresias, sub: 'planes activos', icon: '🏆', link: '/admin/membresias', color: 'border-yellow-800' },
    { label: 'Ingresos', value: formatPrice(stats.ingresos), sub: `${stats.pagos} pagos`, icon: '💰', link: '/admin/pagos', color: 'border-green-800' },
    { label: 'Entrenadores', value: stats.entrenadores, sub: 'certificados', icon: '💪', link: '/admin/entrenadores', color: 'border-red' },
    { label: 'Clases', value: stats.clases, sub: 'disciplinas', icon: '🥊', link: '/admin/clases', color: 'border-purple-800' },
    { label: 'Equipos', value: stats.equipos, sub: 'en inventario', icon: '🏋️', link: '/admin/equipos', color: 'border-orange-800' },
  ] : []

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display font-black text-4xl uppercase text-light">Dashboard</h1>
        <p className="text-muted mt-1">Resumen general de Spartan Elite GYM</p>
      </div>

      {loading ? <Spinner label="Cargando estadísticas..." /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CARDS.map((card) => (
            <Link key={card.label} to={card.link}
              className={`bg-surface border-l-4 ${card.color} border-t border-r border-b border-border p-6 hover:bg-surface2 transition-all duration-200 group`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{card.icon}</span>
                <span className="text-muted text-xs font-display uppercase tracking-wider group-hover:text-red transition-colors">Ver →</span>
              </div>
              <p className="font-display font-black text-3xl text-light mb-0.5">{card.value}</p>
              <p className="text-muted text-xs font-display uppercase tracking-wider">{card.label}</p>
              <p className="text-muted text-xs mt-1">{card.sub}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Quick actions */}
      <div className="mt-10">
        <h2 className="font-display font-bold text-xl uppercase text-light mb-4">Acciones rápidas</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/socios" className="btn-red text-xs">+ Nuevo socio</Link>
          <Link to="/admin/pagos" className="btn-ghost text-xs">+ Registrar pago</Link>
          <Link to="/admin/clases" className="btn-ghost text-xs">+ Nueva clase</Link>
        </div>
      </div>
    </div>
  )
}
