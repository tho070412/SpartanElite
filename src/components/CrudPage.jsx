import { useState, useMemo } from 'react'
import { useCrud } from "../hooks/useCrud";
import Modal from "./Modal";
import Spinner from "./Spinner";
import Swal from 'sweetalert2'

export default function CrudPage({ title, service, entityName, columns, FormComponent, searchField = 'nombre' }) {
  const { items, loading, error, fetchAll, add, edit, remove } = useCrud(service, entityName)
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return items
    return items.filter(item =>
      String(item[searchField] || '').toLowerCase().includes(search.toLowerCase())
    )
  }, [items, search, searchField])

  const openCreate = () => { setEditTarget(null); setShowModal(true) }
  const openEdit = (item) => { setEditTarget(item); setShowModal(true) }
  const closeModal = () => { setShowModal(false); setEditTarget(null) }

  const handleSubmit = async (formData) => {
    setSaving(true)
    const result = editTarget ? await edit(editTarget.id, formData) : await add(formData)
    setSaving(false)
    if (result.ok) {
      closeModal()
      Swal.fire({
        icon: 'success',
        title: editTarget ? 'Actualizado' : '¡Creado!',
        timer: 1800,
        showConfirmButton: false,
        background: '#111111',
        color: '#e8e8e8',
      })
    } else {
      Swal.fire({ icon: 'error', title: 'Error', text: result.message, background: '#111111', color: '#e8e8e8', confirmButtonColor: '#c0392b' })
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-black text-4xl uppercase text-light">{title}</h1>
          <p className="text-muted mt-1">{filtered.length} registros</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchAll} className="btn-ghost text-xs">↻ Actualizar</button>
          <button onClick={openCreate} className="btn-red text-sm">+ Nuevo</button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Buscar por ${searchField}...`}
          className="input-field max-w-sm"
        />
      </div>

      {/* Content */}
      {loading && <Spinner label={`Cargando ${title.toLowerCase()}...`} />}

      {!loading && error && (
        <div className="text-center py-16 border border-dashed border-red/30">
          <p className="text-red text-sm mb-2">{error}</p>
          <p className="text-muted text-xs mb-4">
            Ejecuta: <code className="bg-surface2 px-2 py-0.5 text-light">json-server --watch db.json --port 3005</code>
          </p>
          <button onClick={fetchAll} className="btn-ghost">Reintentar</button>
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {columns.map(col => (
                  <th key={col.key} className="text-left py-3 px-4 text-xs font-display uppercase tracking-wider text-muted">
                    {col.label}
                  </th>
                ))}
                <th className="text-right py-3 px-4 text-xs font-display uppercase tracking-wider text-muted">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-16 text-muted">
                    No hay registros.
                    <button onClick={openCreate} className="block mx-auto mt-3 btn-red text-xs">
                      Crear primero
                    </button>
                  </td>
                </tr>
              ) : (
                filtered.map(item => (
                  <tr key={item.id} className="border-b border-border hover:bg-surface2 transition-colors animate-fade-in">
                    {columns.map(col => (
                      <td key={col.key} className="py-3 px-4 text-sm">
                        {col.render ? col.render(item[col.key], item) : (item[col.key] ?? '—')}
                      </td>
                    ))}
                    <td className="py-3 px-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => openEdit(item)} className="btn-ghost text-xs py-1 px-3">
                          Editar
                        </button>
                        <button
                          onClick={() => remove(item.id, item[searchField])}
                          className="btn-danger text-xs py-1 px-3"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <Modal title={editTarget ? `Editar ${entityName}` : `Nuevo ${entityName}`} onClose={closeModal}>
          <FormComponent initial={editTarget} onSubmit={handleSubmit} onCancel={closeModal} loading={saving} />
        </Modal>
      )}
    </div>
  )
}
