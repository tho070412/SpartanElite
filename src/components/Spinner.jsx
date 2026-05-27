export default function Spinner({ label = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <div className="w-8 h-8 border-2 border-border border-t-red rounded-full animate-spin" />
      <span className="text-muted text-sm uppercase tracking-widest font-display">{label}</span>
    </div>
  )
}
