import { useEffect, useState } from 'react'
import { formatTime, getPopupTargetSeconds } from '../utils/timing'
import { usePopupBudgetModule } from './PopupBudgetContext'
import { useProgress } from './ProgressContext'
import { useTimer } from './TimerContext'

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

export default function DetailPopup({ title, detail, onClose, pointId = null }) {
  const module = usePopupBudgetModule()
  const target = getPopupTargetSeconds(detail, module)
  const { setCovered, setLastOpened, isCovered } = useProgress()
  const {
    popupTimers,
    setPopupElapsed,
    resetPopup,
    isRunning,
    isSectionPaused,
    activeSectionId,
  } = useTimer()

  const persistedElapsed = pointId ? popupTimers[pointId] || 0 : 0
  const [elapsed, setElapsed] = useState(persistedElapsed)

  // Re-sync if persisted value changes from outside (reset, scrub elsewhere)
  useEffect(() => {
    setElapsed(persistedElapsed)
  }, [persistedElapsed])

  const covered = pointId ? isCovered(pointId) : false
  const sectionPaused = isSectionPaused(activeSectionId)
  const shouldTick = !!pointId && isRunning && !sectionPaused && !covered

  const handleClose = () => {
    if (pointId) setLastOpened(pointId)
    onClose()
  }

  const handleConfirm = () => {
    if (pointId) {
      setCovered(pointId, true)
      setLastOpened(pointId)
    }
    onClose()
  }

  const handleResetTimer = () => {
    if (!pointId) return
    resetPopup(pointId)
    setElapsed(0)
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, pointId])

  useEffect(() => {
    if (!shouldTick) return
    const id = setInterval(() => {
      setElapsed((s) => {
        const next = s + 1
        if (pointId) setPopupElapsed(pointId, next)
        return next
      })
    }, 1000)
    return () => clearInterval(id)
  }, [shouldTick, pointId, setPopupElapsed])

  const tickStateLabel = !pointId
    ? null
    : covered
      ? 'паузиран (точката е маркирана)'
      : sectionPaused
        ? 'паузиран (секцията е на пауза)'
        : !isRunning
          ? 'паузиран (глобална пауза)'
          : 'активен'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleClose}
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
            {pointId && (
              <button
                type="button"
                onClick={handleConfirm}
                title="Маркирай точката като казана и затвори"
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                <span aria-hidden="true">✓</span> Готово
              </button>
            )}
            <div className="flex items-center gap-1">
              <span
                className={`tabular-nums text-sm font-medium px-2 py-0.5 rounded-md transition-colors ${timerColor(elapsed, target)} ${
                  pointId && !shouldTick ? 'opacity-70' : ''
                }`}
                title={
                  tickStateLabel
                    ? `Цел: ${formatTime(target)} · таймер ${tickStateLabel}`
                    : `Цел: ${formatTime(target)}`
                }
              >
                {formatTime(elapsed)}
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-gray-500">{formatTime(target)}</span>
              </span>
              {pointId && (
                <button
                  type="button"
                  onClick={handleResetTimer}
                  title="Нулирай таймера на този popup"
                  className="text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-md px-1.5 py-0.5 cursor-pointer transition-colors text-sm leading-none"
                >
                  ⟲
                </button>
              )}
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-xl leading-none mt-0.5 cursor-pointer"
              title="Затвори без маркиране (запазва кой беше последният popup)"
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
