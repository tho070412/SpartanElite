import CrudPage from '../../components/CrudPage'
import { clasesService } from '../../services/services'
import { getBadgeEstado } from '../../utils/helpers'
import { useState, useEffect } from 'react'

function ClaseForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({ nombre: '', descripcion: '', horario: '', cupos_maximos: '', nivel: 'Principiante', id_entrenador: '', estado: 'activo' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initial) setForm({
      nombre: initial.nombre || '',
      descripcion: initial.descripcion || '',
      horario: initial.horario || '',
      cupos_maximos: initial.cupos_maximos || '',
      nivel: initial.nivel || 'Principiante',
      id_entrenador: initial.id_entrenador || '',
      estado: initial.estado || 'activo',
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
    onSubmit({ ...form, cupos_maximos: Number(form.cupos_maximos) })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Nombre *</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="CrossFit" className="input-field" autoFocus />
          {errors.nombre && <p className="text-red text-xs mt-1">{errors.nombre}</p>}
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Descripción</label>
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows={2} className="input-field resize-none" />
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Horario</label>
          <input name="horario" value={form.horario} onChange={handleChange} placeholder="07:00 - 08:00" className="input-field" />
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Cupos máximos</label>
          <input type="number" name="cupos_maximos" value={form.cupos_maximos} onChange={handleChange} min="1" placeholder="20" className="input-field" />
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Nivel</label>
          <select name="nivel" value={form.nivel} onChange={handleChange} className="input-field">
            {['Principiante', 'Intermedio', 'Avanzado'].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">ID Entrenador</label>
          <input name="id_entrenador" value={form.id_entrenador} onChange={handleChange} placeholder="1" className="input-field" />
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
          {loading ? 'Guardando...' : initial ? 'Actualizar' : 'Crear clase'}
        </button>
      </div>
    </form>
  )
}

const COLUMNS = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'horario', label: 'Horario' },
  { key: 'cupos_maximos', label: 'Cupos' },
  { key: 'nivel', label: 'Nivel' },
  { key: 'id_entrenador', label: 'Entrenador ID' },
  { key: 'estado', label: 'Estado', render: (v) => <span className={getBadgeEstado(v)}>{v}</span> },
]

export default function ClasesPage() {
  return (
    <CrudPage
      title="Clases"
      service={clasesService}
      entityName="clase"
      columns={COLUMNS}
      FormComponent={ClaseForm}
      searchField="nombre"
    />
  )
}