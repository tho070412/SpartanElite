import CrudPage from '../../components/CrudPage'
import { entrenadoresService } from '../../services/services'
import { getBadgeEstado, formatDate } from '../../utils/helpers'
import { useState, useEffect } from 'react'

function EntrenadorForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({ nombre: '', correo: '', telefono: '', especialidad: '', estado: 'activo', fecha_ingreso: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initial) setForm({
      nombre: initial.nombre || '',
      correo: initial.correo || '',
      telefono: initial.telefono || '',
      especialidad: initial.especialidad || '',
      estado: initial.estado || 'activo',
      fecha_ingreso: initial.fecha_ingreso || '',
    })
  }, [initial])

  const validate = () => {
    const errs = {}
    if (!form.nombre.trim()) errs.nombre = 'El nombre es obligatorio.'
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
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Carlos Ramírez" className="input-field" autoFocus />
          {errors.nombre && <p className="text-red text-xs mt-1">{errors.nombre}</p>}
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Correo</label>
          <input name="correo" type="email" value={form.correo} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Teléfono</label>
          <input name="telefono" value={form.telefono} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Especialidad</label>
          <input name="especialidad" value={form.especialidad} onChange={handleChange} placeholder="CrossFit, Musculación..." className="input-field" />
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Fecha ingreso</label>
          <input type="date" name="fecha_ingreso" value={form.fecha_ingreso} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Estado</label>
          <select name="estado" value={form.estado} onChange={handleChange} className="input-field">
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-ghost">Cancelar</button>
        <button type="submit" disabled={loading} className="btn-red">
          {loading ? 'Guardando...' : initial ? 'Actualizar' : 'Crear entrenador'}
        </button>
      </div>
    </form>
  )
}

const COLUMNS = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'correo', label: 'Correo' },
  { key: 'especialidad', label: 'Especialidad' },
  { key: 'telefono', label: 'Teléfono' },
  { key: 'fecha_ingreso', label: 'Ingreso', render: (v) => formatDate(v) },
  { key: 'estado', label: 'Estado', render: (v) => <span className={getBadgeEstado(v)}>{v}</span> },
]

export default function EntrenadoresPage() {
  return (
    <CrudPage
      title="Entrenadores"
      service={entrenadoresService}
      entityName="entrenador"
      columns={COLUMNS}
      FormComponent={EntrenadorForm}
      searchField="nombre"
    />
  )
}
