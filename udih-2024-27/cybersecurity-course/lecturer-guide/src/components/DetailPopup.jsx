import { useEffect, useState } from 'react'
import { formatTime, getPopupTargetSeconds } from '../utils/timing'

function timerColor(elapsed, target) {
  const ratio = target > 0 ? elapsed / target : 0
  if (ratio < 0.85) return 'bg-emerald-50 text-emerald-700'
  if (ratio <= 1) return 'bg-amber-100 text-amber-600'
  return 'bg-red-100 text-red-700'
}

function renderFormattedText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|!![^!]+!!)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('!!') && part.endsWith('!!')) {
      return <span key={i} className="text-red-600 font-medium">{part.slice(2, -2)}</span>
    }
    return part
  })
}

export default function DetailPopup({ title, detail, onClose }) {
  const [elapsed, setElapsed] = useState(0)
  const target = getPopupTargetSeconds(detail)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-white rounded-xl shadow-2xl w-fit min-w-[400px] max-w-[90vw] max-h-[90vh] overflow-y-auto animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-start justify-between gap-4 rounded-t-xl">
          <h3 className="text-base font-semibold text-gray-900 leading-snug">
            {renderFormattedText(title)}
          </h3>
          <div className="flex items-center gap-3 shrink-0">
            <span
              className={`tabular-nums text-sm font-medium px-2 py-0.5 rounded-md transition-colors ${timerColor(elapsed, target)}`}
              title={`Цел: ${formatTime(target)} (изчислено по дължина на съдържанието)`}
            >
              {formatTime(elapsed)}
              <span className="text-gray-400 mx-1">/</span>
              <span className="text-gray-500">{formatTime(target)}</span>
            </span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl leading-none mt-0.5 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 text-[17px] text-gray-700 leading-relaxed whitespace-pre-line">
          {renderFormattedText(detail)}
        </div>
      </div>
    </div>
  )
}
