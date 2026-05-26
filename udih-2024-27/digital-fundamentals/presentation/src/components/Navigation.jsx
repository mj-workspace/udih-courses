import { useState, useCallback, useEffect } from 'react'

function FullscreenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  )
}

function ExitFullscreenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 14 10 14 10 20" />
      <polyline points="20 10 14 10 14 4" />
      <line x1="14" y1="10" x2="21" y2="3" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  )
}

export default function Navigation({
  current,
  total,
  onPrev,
  onNext,
  selectedDay,
  onSelectDay,
}) {
  const isFirst = current === 0
  const isLast = current === total - 1
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }, [])

  const btnClass = "w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer disabled:cursor-not-allowed"
  const dayBtnClass =
    "px-3 h-8 flex items-center justify-center rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"

  return (
    <div className="flex items-center gap-3">
      {/* Day selector — switches visible slide deck */}
      {onSelectDay && (
        <div
          className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 pr-2 mr-1 border border-slate-200"
          role="tablist"
          aria-label="Избор на ден"
        >
          {[1, 2].map(day => {
            const active = selectedDay === day
            return (
              <button
                key={day}
                role="tab"
                aria-selected={active}
                onClick={() => onSelectDay(day)}
                className={`${dayBtnClass} ${
                  active
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-white'
                }`}
                title={day === 1 ? 'Ден 1 — само слайдовете за ден 1' : 'Ден 2 — само слайдовете за ден 2'}
              >
                Ден {day}
              </button>
            )
          })}
        </div>
      )}

      <button
        onClick={onPrev}
        disabled={isFirst}
        className={`${btnClass} disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-500`}
        aria-label="Предишен слайд"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <span className="text-sm text-slate-400 tabular-nums min-w-[4rem] text-center">
        {current + 1} / {total}
      </span>

      <button
        onClick={onNext}
        disabled={isLast}
        className={`${btnClass} disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-500`}
        aria-label="Следващ слайд"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <button
        onClick={toggleFullscreen}
        className={btnClass}
        aria-label={isFullscreen ? 'Изход от цял екран' : 'Цял екран'}
      >
        {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
      </button>
    </div>
  )
}
