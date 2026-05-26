function getKind(module) {
  const id = module?.id
  const title = module?.title || ''
  if (!id) return null
  if (id.includes('lunch') || /обедна/i.test(title)) return 'lunch'
  if (id.startsWith('break-')) return 'break'
  if (id.startsWith('qa-')) return 'qa'
  return null
}

const PRESETS = {
  break: {
    symbol: '☕',
    accent: 'text-amber-600',
    glow: 'from-amber-100/60 via-orange-50/40 to-transparent',
  },
  lunch: {
    symbol: '🍽️',
    accent: 'text-rose-600',
    glow: 'from-rose-100/60 via-orange-50/40 to-transparent',
  },
  qa: {
    symbol: '💬',
    accent: 'text-indigo-600',
    glow: 'from-indigo-100/60 via-blue-50/40 to-transparent',
  },
}

export default function PauseSlide({ module }) {
  const kind = getKind(module)
  const preset = kind ? PRESETS[kind] : null
  if (!preset) return null

  return (
    <div className="relative -mx-8 -mt-8 h-[calc(100vh-6rem)] flex items-center justify-center select-none overflow-hidden">
      <div className={`absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b ${preset.glow} pointer-events-none`} />

      <div className="relative flex flex-col items-center text-center px-8 max-h-full">
        <div className={`text-[clamp(80px,18vh,160px)] leading-none mb-[clamp(16px,3vh,32px)] ${preset.accent} drop-shadow-sm`} aria-hidden>
          {preset.symbol}
        </div>

        <h1 className="text-[clamp(36px,7vh,80px)] font-extrabold text-gray-900 tracking-tight mb-[clamp(8px,1.5vh,16px)] leading-tight">
          {module.title}
        </h1>

        <div className="flex items-center gap-3 text-[clamp(14px,2vh,18px)] text-gray-500">
          <span>{module.timeMarker}</span>
          <span className="text-gray-300">·</span>
          <span className={`font-semibold ${preset.accent}`}>{module.duration}</span>
        </div>
      </div>
    </div>
  )
}
