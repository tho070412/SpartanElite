import CrudPage from '../../components/CrudPage'
import { membresiasService } from '../../services/services'
import { getBadgeEstado, formatPrice } from '../../utils/helpers'
import { useState, useEffect } from 'react'

function MembresiaForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '', duracion_dias: '', beneficios: '', estado: 'activo' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initial) setForm({
      nombre: initial.nombre || '',
      descripcion: initial.descripcion || '',
      precio: initial.precio || '',
      duracion_dias: initial.duracion_dias || '',
      beneficios: initial.beneficios || '',
      estado: initial.estado || 'activo',
    })
  }, [initial])

  const validate = () => {
    const errs = {}
    if (!form.nombre.trim()) errs.nombre = 'El nombre es obligatorio.'
    if (!form.precio || Number(form.precio) < 0) errs.precio = 'Precio inválido.'
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
    onSubmit({ ...form, precio: Number(form.precio), duracion_dias: Number(form.duracion_dias) })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Nombre *</label>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Plan Élite" className="input-field" autoFocus />
        {errors.nombre && <p className="text-red text-xs mt-1">{errors.nombre}</p>}
      </div>
      <div>
        <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Descripción</label>
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows={2} className="input-field resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Precio (COP) *</label>
          <input type="number" name="precio" value={form.precio} onChange={handleChange} min="0" placeholder="220000" className="input-field" />
          {errors.precio && <p className="text-red text-xs mt-1">{errors.precio}</p>}
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Duración (días)</label>
          <input type="number" name="duracion_dias" value={form.duracion_dias} onChange={handleChange} min="1" placeholder="30" className="input-field" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Beneficios</label>
        <input name="beneficios" value={form.beneficios} onChange={handleChange} placeholder="Acceso 24/7, clases grupales..." className="input-field" />
      </div>
      <div>
        <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Estado</label>
        <select name="estado" value={form.estado} onChange={handleChange} className="input-field">
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-ghost">Cancelar</button>
        <button type="submit" disabled={loading} className="btn-red">
          {loading ? 'Guardando...' : initial ? 'Actualizar' : 'Crear membresía'}
        </button>
      </div>
    </form>
  )
}

const COLUMNS = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'descripcion', label: 'Descripción' },
  { key: 'precio', label: 'Precio', render: (v) => formatPrice(v) },
  { key: 'duracion_dias', label: 'Duración', render: (v) => v ? `${v} días` : '—' },
  { key: 'estado', label: 'Estado', render: (v) => <span className={getBadgeEstado(v)}>{v}</span> },
]

export default function MembresiasPage() {
  return (
    <CrudPage
      title="Membresías"
      service={membresiasService}
      entityName="membresía"
      columns={COLUMNS}
      FormComponent={MembresiaForm}
      searchField="nombre"
    />
  )
}
