import CrudPage from '../../components/CrudPage'
import { sociosService } from '../../services/services'
import { getBadgeEstado, formatDate } from '../../utils/helpers'
import { useState, useEffect } from 'react'

const ESTADOS = ['activo', 'inactivo']

function SocioForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({
    nombre: '', correo: '', telefono: '',
    fecha_inscripcion: '', estado: 'activo', id_membresia: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initial) setForm({
      nombre: initial.nombre || '',
      correo: initial.correo || '',
      telefono: initial.telefono || '',
      fecha_inscripcion: initial.fecha_inscripcion || '',
      estado: initial.estado || 'activo',
      id_membresia: initial.id_membresia || '',
    })
  }, [initial])

  const validate = () => {
    const errs = {}
    if (!form.nombre.trim()) errs.nombre = 'El nombre es obligatorio.'
    if (!form.correo.trim()) errs.correo = 'El correo es obligatorio.'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Nombre completo *</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Juan García" className="input-field" autoFocus />
          {errors.nombre && <p className="text-red text-xs mt-1">{errors.nombre}</p>}
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Correo *</label>
          <input name="correo" type="email" value={form.correo} onChange={handleChange} placeholder="juan@email.com" className="input-field" />
          {errors.correo && <p className="text-red text-xs mt-1">{errors.correo}</p>}
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Teléfono</label>
          <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="3001234567" className="input-field" />
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Fecha inscripción</label>
          <input type="date" name="fecha_inscripcion" value={form.fecha_inscripcion} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Estado</label>
          <select name="estado" value={form.estado} onChange={handleChange} className="input-field">
            {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">ID Membresía</label>
          <input name="id_membresia" value={form.id_membresia} onChange={handleChange} placeholder="1" className="input-field" />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-ghost">Cancelar</button>
        <button type="submit" disabled={loading} className="btn-red">
          {loading ? 'Guardando...' : initial ? 'Actualizar' : 'Crear socio'}
        </button>
      </div>
    </form>
  )
}

const COLUMNS = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'correo', label: 'Correo' },
  { key: 'telefono', label: 'Teléfono' },
  { key: 'fecha_inscripcion', label: 'Inscripción', render: (v) => formatDate(v) },
  { key: 'estado', label: 'Estado', render: (v) => <span className={getBadgeEstado(v)}>{v}</span> },
  { key: 'id_membresia', label: 'Membresía' },
]

export default function SociosPage() {
  return (
    <CrudPage
      title="Socios"
      service={sociosService}
      entityName="socio"
      columns={COLUMNS}
      FormComponent={SocioForm}
      searchField="nombre"
    />
  )
}
