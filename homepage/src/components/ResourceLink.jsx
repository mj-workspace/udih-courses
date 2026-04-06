const typeStyles = {
  app: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
  document: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  external: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
}

const typeLabels = {
  app: 'Приложение',
  document: 'Документ',
  external: 'Външен линк',
}

export default function ResourceLink({ label, url, type = 'app' }) {
  return (
    <a
      href={url}
      target={type === 'external' ? '_blank' : undefined}
      rel={type === 'external' ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${typeStyles[type] || typeStyles.app}`}
    >
      <span className="text-xs opacity-70">{typeLabels[type] || type}</span>
      {label}
    </a>
  )
}
