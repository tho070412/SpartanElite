import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { getSession, clearSession } from '../utils/auth'
import Swal from 'sweetalert2'

const NAV_ITEMS = [
  { path: '/admin/dashboard',    label: 'Dashboard',     icon: '📊' },
  { path: '/admin/socios',       label: 'Socios',        icon: '👥' },
  { path: '/admin/membresias',   label: 'Membresías',    icon: '🏆' },
  { path: '/admin/pagos',        label: 'Pagos',         icon: '💰' },
  { path: '/admin/entrenadores', label: 'Entrenadores',  icon: '💪' },
  { path: '/admin/clases',       label: 'Clases',        icon: '🥊' },
  { path: '/admin/equipos',      label: 'Equipos',       icon: '🏋️' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const session = getSession()

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Salir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#c0392b',
      cancelButtonColor: '#2a2a2a',
      background: '#111111',
      color: '#e8e8e8',
    })
    if (result.isConfirmed) {
      clearSession()
      navigate('/login')
    }
  }

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Sidebar */}
      <aside className="w-60 bg-surface border-r border-border flex flex-col sticky top-0 h-screen">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-border">
          <NavLink to="/" className="block">
            <span className="font-display font-black text-xl uppercase tracking-tight">
              <span className="text-red">S</span>PARTAN <span className="text-red">E</span>LITE
            </span>
            <p className="text-muted text-xs mt-0.5 font-display tracking-widest">PANEL ADMIN</p>
          </NavLink>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => isActive ? 'sidebar-link-active' : 'sidebar-link'}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-border">
          <p className="text-light text-sm font-semibold truncate">{session?.usuario}</p>
          <p className="text-muted text-xs mb-3">Administrador</p>
          <button onClick={handleLogout} className="btn-ghost w-full text-center text-xs py-1.5">
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
