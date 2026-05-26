import AnimatedBackground from './AnimatedBackground'

function renderBoldText(text) {
  const parts = text.split(/(\*\*.*?\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

export default function ModuleSlide({
  moduleTitle,
  sectionNumber,
  title,
  points = [],
  children,
}) {
  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <AnimatedBackground />

      {/* Header — consistent position (top-left, anchored) */}
      <header className="relative z-10 px-14 pt-7 pb-3 shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-md bg-blue-500/15 border border-blue-400/40 text-blue-200 text-xs font-semibold tracking-wider">
            {sectionNumber}
          </span>
          <span className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
            {moduleTitle}
          </span>
        </div>
        <h2 className="text-[26px] font-bold text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
          {title}
        </h2>
        <div
          className="mt-2.5 h-[2px] w-24 rounded-full"
          style={{
            background:
              'linear-gradient(90deg, #3b82f6 0%, #22d3ee 60%, rgba(34,211,238,0) 100%)',
            boxShadow: '0 0 12px rgba(59,130,246,0.55)',
          }}
        />
      </header>

      {/* Body: bullets left + scene right */}
      <div className="relative z-10 flex-1 flex items-stretch min-h-0">
        {/* Bullets column */}
        <aside className="w-[320px] shrink-0 px-10 pt-2 pb-8 flex flex-col justify-center gap-4">
          {points.map((point, i) => (
            <div key={i} className="flex items-start gap-3">
              <span
                className="mt-[7px] w-[7px] h-[7px] rounded-full shrink-0"
                style={{
                  background: '#60a5fa',
                  boxShadow: '0 0 10px rgba(96,165,250,0.85)',
                }}
              />
              <span className="text-[15px] text-slate-300 leading-[1.55]">
                {renderBoldText(point.text)}
              </span>
            </div>
          ))}
        </aside>

        {/* Scene */}
        <div className="flex-1 min-w-0 relative">
          {children}
        </div>
      </div>
    </div>
  )
}
