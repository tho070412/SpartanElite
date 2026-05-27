import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { saveSession, isAuthenticated } from '../../utils/auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ usuario: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  useEffect(() => {
    if (isAuthenticated()) navigate('/admin/dashboard', { replace: true })
  }, [navigate])

  const validate = () => {
    const errs = {}
    if (!form.usuario.trim()) errs.usuario = 'Ingresa tu usuario.'
    if (!form.password.trim()) errs.password = 'Ingresa tu contraseña.'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      saveSession({ usuario: form.usuario.trim() })
      navigate('/admin/dashboard', { replace: true })
    }, 600)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-red" />

      <div className="relative w-full max-w-sm animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="font-display font-black text-4xl uppercase tracking-tight">
              <span className="text-red">S</span>PARTAN <span className="text-red">E</span>LITE
            </h1>
            <p className="text-muted text-xs font-display tracking-widest mt-1">GYM — EST. 2024</p>
          </Link>
        </div>

        <div className="bg-surface border border-border p-6 shadow-modal">
          <h2 className="font-display font-bold uppercase tracking-wider text-light text-lg mb-1">
            Acceso Admin
          </h2>
          <p className="text-muted text-sm mb-6">Ingresa tus credenciales para continuar</p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">
                Usuario
              </label>
              <input
                name="usuario"
                value={form.usuario}
                onChange={handleChange}
                placeholder="admin"
                autoFocus
                className="input-field"
              />
              {errors.usuario && <p className="text-red text-xs mt-1">{errors.usuario}</p>}
            </div>

            <div>
              <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-field pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-light transition-colors text-xs"
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <p className="text-red text-xs mt-1">{errors.password}</p>}
              <p className="text-muted text-xs mt-1">Cualquier contraseña (simulación).</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-red w-full flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verificando...
                </>
              ) : 'INGRESAR AL PANEL'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-border text-center">
            <Link to="/" className="text-muted text-xs hover:text-red transition-colors">
              ← Volver al sitio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
