import CrudPage from '../../components/CrudPage'
import { pagosService } from '../../services/services'
import { getBadgeEstado, formatPrice, formatDate } from '../../utils/helpers'
import { useState, useEffect } from 'react'

function PagoForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({ id_socio: '', id_membresia: '', fecha_pago: '', monto: '', metodo_pago: 'efectivo', estado_pago: 'pendiente', referencia: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initial) setForm({
      id_socio: initial.id_socio || '',
      id_membresia: initial.id_membresia || '',
      fecha_pago: initial.fecha_pago || '',
      monto: initial.monto || '',
      metodo_pago: initial.metodo_pago || 'efectivo',
      estado_pago: initial.estado_pago || 'pendiente',
      referencia: initial.referencia || '',
    })
  }, [initial])

  const validate = () => {
    const errs = {}
    if (!form.id_socio) errs.id_socio = 'Requerido.'
    if (!form.monto || Number(form.monto) < 0) errs.monto = 'Monto inválido.'
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
    onSubmit({ ...form, monto: Number(form.monto) })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">ID Socio *</label>
          <input name="id_socio" value={form.id_socio} onChange={handleChange} placeholder="1" className="input-field" autoFocus />
          {errors.id_socio && <p className="text-red text-xs mt-1">{errors.id_socio}</p>}
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">ID Membresía</label>
          <input name="id_membresia" value={form.id_membresia} onChange={handleChange} placeholder="1" className="input-field" />
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Monto (COP) *</label>
          <input type="number" name="monto" value={form.monto} onChange={handleChange} min="0" placeholder="220000" className="input-field" />
          {errors.monto && <p className="text-red text-xs mt-1">{errors.monto}</p>}
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Fecha de pago</label>
          <input type="datetime-local" name="fecha_pago" value={form.fecha_pago} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Método de pago</label>
          <select name="metodo_pago" value={form.metodo_pago} onChange={handleChange} className="input-field">
            {['efectivo', 'tarjeta', 'transferencia', 'nequi', 'daviplata'].map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Estado</label>
          <select name="estado_pago" value={form.estado_pago} onChange={handleChange} className="input-field">
            {['pendiente', 'pagado', 'fallido'].map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-display uppercase tracking-wider text-muted mb-1.5">Referencia</label>
          <input name="referencia" value={form.referencia} onChange={handleChange} placeholder="REF-001" className="input-field" />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-ghost">Cancelar</button>
        <button type="submit" disabled={loading} className="btn-red">
          {loading ? 'Guardando...' : initial ? 'Actualizar' : 'Registrar pago'}
        </button>
      </div>
    </form>
  )
}

const COLUMNS = [
  { key: 'id_socio', label: 'Socio ID' },
  { key: 'monto', label: 'Monto', render: (v) => formatPrice(v) },
  { key: 'metodo_pago', label: 'Método' },
  { key: 'fecha_pago', label: 'Fecha', render: (v) => formatDate(v) },
  { key: 'estado_pago', label: 'Estado', render: (v) => <span className={getBadgeEstado(v)}>{v}</span> },
  { key: 'referencia', label: 'Referencia' },
]

export default function PagosPage() {
  return (
    <CrudPage
      title="Pagos"
      service={pagosService}
      entityName="pago"
      columns={COLUMNS}
      FormComponent={PagoForm}
      searchField="referencia"
    />
  )
}
