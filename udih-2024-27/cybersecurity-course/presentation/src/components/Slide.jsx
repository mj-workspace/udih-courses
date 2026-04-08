import illustrations from './illustrations'

function renderBoldText(text) {
  const parts = text.split(/(\*\*.*?\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export default function Slide({ moduleTitle, sectionNumber, title, points }) {
  const Illustration = illustrations[sectionNumber]

  if (Illustration) {
    return (
      <div className="h-full flex flex-col px-16 py-10">
        {/* Header */}
        <p className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
          {moduleTitle}
        </p>
        <h2 className="text-3xl font-bold text-white mb-2">
          {sectionNumber} {title}
        </h2>
        <div className="w-16 h-1 bg-blue-500 rounded-full mb-6" />

        {/* 40/60 layout: text left, illustration right */}
        <div className="flex-1 flex items-center gap-12 min-h-0 pb-4">
          {/* Text — 40% */}
          <div className="w-2/5 shrink-0 space-y-4">
            {points.map((point, i) => (
              <div key={i} className="flex items-start gap-3 text-base text-slate-300 leading-relaxed">
                <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                <span>{renderBoldText(point.text)}</span>
              </div>
            ))}
          </div>

          {/* Illustration — 60% */}
          <div className="w-3/5 flex items-center justify-center pr-4">
            <Illustration />
          </div>
        </div>
      </div>
    )
  }

  // Default layout for slides without illustrations
  return (
    <div className="h-full flex flex-col px-16 py-12">
      <p className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-4">
        {moduleTitle}
      </p>
      <h2 className="text-3xl font-bold text-white mb-2">
        {sectionNumber} {title}
      </h2>
      <div className="w-16 h-1 bg-blue-500 rounded-full mb-8" />

      <div className="flex-1 overflow-y-auto space-y-4 pr-4">
        {points.map((point, i) => (
          <div key={i}>
            <div className="flex items-start gap-3 text-xl text-slate-200">
              <span className="text-blue-400 mt-1 shrink-0">•</span>
              <span>{renderBoldText(point.text)}</span>
            </div>
            {point.children && (
              <div className="ml-8 mt-2 space-y-2">
                {point.children.map((child, j) => (
                  <div key={j} className="flex items-start gap-3 text-lg text-slate-300">
                    <span className="text-slate-500 mt-1 shrink-0">◦</span>
                    <span>{renderBoldText(child.text)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
