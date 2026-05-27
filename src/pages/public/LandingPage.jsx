import { Link } from 'react-router-dom'

const STATS = [
  { value: '1200+', label: 'Miembros Activos' },
  { value: '15+', label: 'Entrenadores Certificados' },
  { value: '3000M²', label: 'De Instalaciones' },
  { value: '8', label: 'Años de Excelencia' },
]

const PLANES = [
  {
    nombre: 'BÁSICO',
    precio: '$150.000',
    beneficios: ['Acceso sala de pesas', 'Vestuarios', 'Horario estándar'],
    popular: false,
  },
  {
    nombre: 'ÉLITE',
    precio: '$220.000',
    beneficios: ['Todo el plan básico', 'Clases grupales', 'Evaluación mensual', 'App de seguimiento'],
    popular: true,
  },
  {
    nombre: 'SPARTAN',
    precio: '$300.000',
    beneficios: ['Todo el plan élite', 'Entrenador personal', 'Nutrición personalizada', 'Acceso 24/7'],
    popular: false,
  },
]

const CLASES = [
  { nombre: 'CROSSFIT', horario: '07:00 – 08:00', cupos: '12 lugares', icon: '⚡' },
  { nombre: 'MUSCULACIÓN', horario: '09:00 – 10:30', cupos: 'Libre', icon: '💪' },
  { nombre: 'BOXING', horario: '18:00 – 19:00', cupos: '8 lugares', icon: '🥊' },
  { nombre: 'FUNCTIONAL', horario: '19:30 – 20:30', cupos: '10 lugares', icon: '🔥' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-light">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div>
            <span className="font-display font-black text-xl uppercase tracking-tight">
              <span className="text-red">S</span>PARTAN <span className="text-red">E</span>LITE
            </span>
            <p className="text-muted text-[10px] font-display tracking-widest leading-none">GYM — EST. 2024</p>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['INICIO', 'NOSOTROS', 'PLANES', 'CLASES', 'CONTACTO'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-xs font-display tracking-widest text-muted hover:text-light transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-outline text-xs py-2 px-4">INGRESAR</Link>
            <Link to="/login" className="btn-red text-xs py-2 px-4">ÚNETE AHORA</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="inicio" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red/10 via-transparent to-transparent" />
        <div className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(ellipse at 70% 50%, rgba(192,57,43,0.08) 0%, transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <p className="text-red text-xs font-display tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-red inline-block" />
            SPARTAN ELITE GYM — ÚNETE A LA ÉLITE
          </p>
          <h1 className="font-display font-black text-7xl sm:text-8xl lg:text-9xl uppercase leading-none mb-6">
            FORJA TU<br />
            <span className="text-red">LEGADO</span>
          </h1>
          <p className="text-muted text-lg max-w-lg mb-10 leading-relaxed">
            No entrenamos para sobrevivir. Entrenamos para dominar.<br />
            Instalaciones de clase mundial. Entrenadores de élite.<br />
            Resultados reales.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link to="/login" className="btn-red">COMENZAR AHORA</Link>
            <a href="#planes" className="btn-outline">VER PLANES</a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-red py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center border-r border-red-hover/50 last:border-0">
                <p className="font-display font-black text-5xl text-white mb-1">{s.value}</p>
                <p className="text-xs font-display tracking-widest uppercase text-white/80">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="bg-surface2 border border-border aspect-square flex items-center justify-center">
            <div className="text-center">
              <p className="text-red font-display font-black text-6xl">⚔️</p>
              <p className="btn-red mt-4 inline-block">+8 AÑOS FORJANDO ÉLITES</p>
            </div>
          </div>
          <div>
            <p className="text-red text-xs font-display tracking-widest uppercase mb-3">SOBRE NOSOTROS</p>
            <h2 className="font-display font-black text-6xl uppercase leading-none mb-4">
              MÁS QUE<br />UN GYM
            </h2>
            <div className="w-12 h-1 bg-red mb-6" />
            <p className="text-muted leading-relaxed mb-4">
              Un templo donde la disciplina, la fuerza y la excelencia se fusionan.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              En Spartan Elite GYM creemos que cada persona lleva dentro un guerrero. Nuestra misión
              es ayudarte a despertar ese potencial con infraestructura de primera, metodología probada
              y una comunidad que te empuja al límite.
            </p>
            {[
              'Equipamiento de última generación importado',
              'Entrenadores certificados internacionalmente',
              'Programas personalizados con tecnología',
              'Ambiente que inspira y desafía cada día',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 bg-red shrink-0" />
                <p className="font-semibold text-sm">{item}</p>
              </div>
            ))}
            <a href="#planes" className="btn-red inline-block mt-6">CONOCÉ MÁS</a>
          </div>
        </div>
      </section>

      {/* Planes */}
      <section id="planes" className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-red text-xs font-display tracking-widest uppercase mb-3">MEMBRESÍAS</p>
            <h2 className="font-display font-black text-6xl uppercase">ELEGÍ TU PLAN</h2>
            <div className="w-12 h-1 bg-red mx-auto mt-4 mb-4" />
            <p className="text-muted">Planes diseñados para todos los niveles. Sin excusas, solo resultados.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANES.map((plan) => (
              <div
                key={plan.nombre}
                className={`relative border p-8 ${plan.popular
                  ? 'bg-red border-red-hover'
                  : 'bg-surface2 border-border hover:border-red/50'
                } transition-all duration-200`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-bg text-xs font-bold px-4 py-1 font-display uppercase tracking-wider">
                    ⭐ MÁS POPULAR
                  </div>
                )}
                <h3 className="font-display font-black text-2xl uppercase mb-2">{plan.nombre}</h3>
                <p className="font-display font-black text-5xl mb-1">{plan.precio}</p>
                <p className="text-sm opacity-70 mb-6">/ mes</p>
                <div className="space-y-3 mb-8">
                  {plan.beneficios.map((b) => (
                    <div key={b} className="flex items-center gap-2 text-sm">
                      <span className="text-xs">✓</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                <Link to="/login"
                  className={`block text-center font-display font-bold uppercase tracking-wider text-sm py-3 transition-all ${
                    plan.popular
                      ? 'bg-white text-red hover:bg-gray-100'
                      : 'border border-red text-red hover:bg-red hover:text-white'
                  }`}
                >
                  ELEGIR PLAN
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clases */}
      <section id="clases" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-red text-xs font-display tracking-widest uppercase mb-3">DISCIPLINAS</p>
            <h2 className="font-display font-black text-6xl uppercase">NUESTRAS CLASES</h2>
            <div className="w-12 h-1 bg-red mx-auto mt-4 mb-4" />
            <p className="text-muted">Disciplinas variadas para que nunca pares de crecer.</p>
          </div>
          <div className="grid md:grid-cols-2 border border-border">
            {CLASES.map((clase, i) => (
              <div
                key={clase.nombre}
                className={`flex items-center gap-5 p-6 border-border ${
                  i % 2 === 0 ? 'border-r' : ''
                } ${i < 2 ? 'border-b' : ''} hover:bg-surface2 transition-colors`}
              >
                <div className="w-14 h-14 bg-red/20 border border-red/30 flex items-center justify-center shrink-0 text-2xl">
                  {clase.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-xl uppercase">{clase.nombre}</h3>
                  <p className="text-muted text-sm">{clase.horario}</p>
                </div>
                <span className="text-red text-xs font-display font-bold uppercase tracking-wider">
                  {clase.cupos}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-24 bg-surface">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-red text-xs font-display tracking-widest uppercase mb-3">CONTACTO</p>
          <h2 className="font-display font-black text-6xl uppercase mb-4">¿LISTO PARA<br />EL RETO?</h2>
          <div className="w-12 h-1 bg-red mx-auto mb-8" />
          <p className="text-muted mb-10">Únete hoy y empieza tu transformación. Sin pretextos.</p>
          <Link to="/login" className="btn-red text-base px-10 py-4">
            ÚNETE AHORA
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display font-black text-lg uppercase">
            <span className="text-red">S</span>PARTAN <span className="text-red">E</span>LITE GYM
          </span>
          <p className="text-muted text-xs">© 2024 Spartan Elite GYM. Todos los derechos reservados.</p>
          <Link to="/login" className="text-red text-xs font-display uppercase tracking-wider hover:text-red-hover">
            Panel Admin →
          </Link>
        </div>
      </footer>
    </div>
  )
}