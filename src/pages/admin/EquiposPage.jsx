import CrudPage from '../../components/CrudPage'
import { equiposService } from '../../services/services'
import { getBadgeEstado, formatDate } from '../../utils/helpers'
import { useState, useEffect } from 'react'

function EquipoForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({ nombre: '', tipo: '', estado_funcionamiento: 'Bueno', fecha_adquisicion: '', observaciones: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initial) setForm({
      nombre: initial.nombre || '',
      tipo: initial.tipo || '',
      estado_funcionamiento: initial.estado_funcionamiento || 'Bueno',
      fecha_adquisicion: initial.fecha_adquisicion || '',
      observaciones: initial.observaciones || '',
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
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Nombre *</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Cinta de correr" className="input-field" autoFocus />
          {errors.nombre && <p className="text-red text-xs mt-1">{errors.nombre}</p>}
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Tipo</label>
          <input name="tipo" value={form.tipo} onChange={handleChange} placeholder="Cardio, Fuerza..." className="input-field" />
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Estado</label>
          <select name="estado_funcionamiento" value={form.estado_funcionamiento} onChange={handleChange} className="input-field">
            {['Bueno', 'Regular', 'Malo', 'En reparación'].map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Fecha adquisición</label>
          <input type="date" name="fecha_adquisicion" value={form.fecha_adquisicion} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Observaciones</label>
          <input name="observaciones" value={form.observaciones} onChange={handleChange} className="input-field" />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-ghost">Cancelar</button>
        <button type="submit" disabled={loading} className="btn-red">
          {loading ? 'Guardando...' : initial ? 'Actualizar' : 'Agregar equipo'}
        </button>
      </div>
    </form>
  )
}

const COLUMNS = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'estado_funcionamiento', label: 'Estado', render: (v) => {
    const cls = v === 'Bueno' ? 'badge-activo' : v === 'Malo' || v === 'En reparación' ? 'badge-inactivo' : 'badge-pendiente'
    return <span className={cls}>{v}</span>
  }},
  { key: 'fecha_adquisicion', label: 'Adquisición', render: (v) => formatDate(v) },
  { key: 'observaciones', label: 'Observaciones' },
]

export default function EquiposPage() {
  return (
    <CrudPage
      title="Equipos"
      service={equiposService}
      entityName="equipo"
      columns={COLUMNS}
      FormComponent={EquipoForm}
      searchField="nombre"
    />
  )
}
