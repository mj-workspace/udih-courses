import { useEffect, useRef, useState } from 'react'
import { useTimer } from './TimerContext'
import { formatTime, parseTime } from '../utils/timing'

function getStatus(elapsed, target) {
  if (!target) return { ratio: 0, color: 'bg-gray-300', text: 'text-gray-600', border: 'border-gray-400' }
  const ratio = elapsed / target
  if (ratio < 0.85) return { ratio, color: 'bg-emerald-400', text: 'text-emerald-700', border: 'border-emerald-500' }
  if (ratio <= 1) return { ratio, color: 'bg-amber-400', text: 'text-amber-600', border: 'border-amber-500' }
  return { ratio, color: 'bg-red-500', text: 'text-red-700', border: 'border-red-500' }
}

function ScrubBar({ elapsed, target, color, border, onScrub }) {
  const trackRef = useRef(null)

  // Scrub range = exactly the target. Past target, fill stays at 100%; the
  // overrun is shown numerically next to the bar.
  const max = target || 0
  const ratio = max > 0 ? elapsed / max : 0
  const fillPct = Math.min(ratio * 100, 100)

  const updateFromEvent = (e) => {
    const track = trackRef.current
    if (!track || max <= 0) return
    const rect = track.getBoundingClientRect()
    if (rect.width === 0) return
    const rel = (e.clientX - rect.left) / rect.width
    const clamped = Math.max(0, Math.min(1, rel))
    onScrub(Math.round(clamped * max))
  }

  const handlePointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    e.preventDefault()
    trackRef.current?.setPointerCapture(e.pointerId)
    updateFromEvent(e)
  }

  const handlePointerMove = (e) => {
    if (!trackRef.current?.hasPointerCapture(e.pointerId)) return
    updateFromEvent(e)
  }

  const handlePointerUp = (e) => {
    if (trackRef.current?.hasPointerCapture(e.pointerId)) {
      trackRef.current.releasePointerCapture(e.pointerId)
    }
  }

  return (
    <div
      ref={trackRef}
      className="relative flex-1 h-3 bg-gray-100 rounded-full cursor-ew-resize min-w-[80px] select-none touch-none group"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      title="Влачи или цъкни за нагласяне на времето (за стойности над целта — цъкни на цифрата)"
    >
      <div
        className={`absolute inset-y-0 left-0 ${color} rounded-full pointer-events-none`}
        style={{ width: `${fillPct}%` }}
      />
      <div
        className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 ${border} shadow-sm pointer-events-none transition-transform group-hover:scale-110`}
        style={{ left: `${fillPct}%` }}
      />
    </div>
  )
}

function EditableTime({ elapsed, onCommit, accent }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const beginEdit = () => {
    setValue(formatTime(elapsed))
    setEditing(true)
  }

  const commit = () => {
    const parsed = parseTime(value)
    if (parsed != null) onCommit(parsed)
    setEditing(false)
  }

  const cancel = () => setEditing(false)

  if (editing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit()
          else if (e.key === 'Escape') cancel()
        }}
        className={`tabular-nums text-sm font-semibold ${accent} bg-white border border-blue-300 rounded px-1.5 py-0.5 w-16 outline-none focus:ring-2 focus:ring-blue-200`}
        placeholder="м:сс"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={beginEdit}
      title="Цъкни за ръчна корекция (формат м:сс или сек)"
      className={`tabular-nums text-sm font-semibold ${accent} hover:bg-gray-100 rounded px-1.5 py-0.5 cursor-pointer transition-colors`}
    >
      {formatTime(elapsed)}
    </button>
  )
}

function ProgressRow({ label, elapsed, target, onCommit }) {
  const { color, text, border } = getStatus(elapsed, target)
  const overrun = target > 0 && elapsed > target
  const overBy = overrun ? elapsed - target : 0

  return (
    <div className="flex items-center gap-3 min-w-0">
      <span className="text-xs font-medium text-gray-600 w-28 shrink-0 truncate">{label}</span>
      <div className="flex items-baseline gap-1.5 shrink-0">
        <EditableTime elapsed={elapsed} onCommit={onCommit} accent={text} />
        <span className="text-xs text-gray-400 tabular-nums">/ {formatTime(target)}</span>
      </div>
      <ScrubBar elapsed={elapsed} target={target} color={color} border={border} onScrub={onCommit} />
      {overrun && (
        <span className="text-[11px] font-medium text-red-600 tabular-nums shrink-0">
          +{formatTime(overBy)}
        </span>
      )}
    </div>
  )
}

export default function TimerBar({
  moduleLabel,
  moduleTarget,
  sectionLabel,
  sectionTarget,
  sectionIds,
}) {
  const {
    moduleElapsed,
    sectionElapsed,
    activeModuleId,
    activeSectionId,
    isRunning,
    toggle,
    resetModule,
    resetSection,
    resetAll,
    setModuleElapsed,
    setSectionElapsed,
  } = useTimer()

  const confirmAndRun = (message, fn) => {
    if (typeof window !== 'undefined' && !window.confirm(message)) return
    fn()
  }

  const handleResetSection = () =>
    confirmAndRun(
      'Сигурни ли сте, че искате да нулирате таймера на текущата подточка?',
      () => resetSection(activeSectionId),
    )

  const handleResetModule = () =>
    confirmAndRun(
      sectionLabel
        ? 'Сигурни ли сте, че искате да нулирате таймера на модула и всички негови подточки?'
        : 'Сигурни ли сте, че искате да нулирате таймера на модула?',
      () => resetModule(activeModuleId, sectionIds),
    )

  const handleResetAll = () =>
    confirmAndRun(
      'Сигурни ли сте, че искате да нулирате ВСИЧКИ таймери (всички модули и подточки)?',
      () => resetAll(),
    )

  const resetBtn =
    'inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md cursor-pointer ' +
    'text-gray-600 bg-gray-50 border border-gray-200 hover:text-rose-700 hover:bg-rose-50 hover:border-rose-200 ' +
    'transition-colors'

  return (
    <div className="sticky -top-8 z-30 -mx-8 px-8 py-3 bg-white/95 backdrop-blur-sm border-b border-gray-200 mb-3">
      <div className="flex items-center gap-4">
        <div className="flex-1 space-y-1.5 min-w-0">
          <ProgressRow
            label={moduleLabel}
            elapsed={moduleElapsed}
            target={moduleTarget}
            onCommit={(secs) => setModuleElapsed(activeModuleId, secs)}
          />
          {sectionLabel && (
            <ProgressRow
              label={sectionLabel}
              elapsed={sectionElapsed}
              target={sectionTarget}
              onCommit={(secs) => setSectionElapsed(activeSectionId, secs)}
            />
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggle}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
              isRunning
                ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
            title={isRunning ? 'Пауза (таймерите спират)' : 'Старт (таймерите тръгват)'}
          >
            {isRunning ? '⏸ Пауза' : '▶ Старт'}
          </button>

          <span className="h-6 w-px bg-gray-200" aria-hidden="true" />

          {sectionLabel && activeSectionId && (
            <button
              type="button"
              onClick={handleResetSection}
              className={resetBtn}
              title="Нулирай таймера на текущата подточка"
            >
              <span aria-hidden="true">⟲</span> подт.
            </button>
          )}

          <button
            type="button"
            onClick={handleResetModule}
            className={resetBtn}
            title={sectionLabel ? 'Нулирай таймера на модула и всички негови подточки' : 'Нулирай таймера на модула'}
          >
            <span aria-hidden="true">⟲</span> модул
          </button>

          <button
            type="button"
            onClick={handleResetAll}
            className={resetBtn}
            title="Нулирай всички таймери (всички модули и подточки)"
          >
            <span aria-hidden="true">⟲</span> всичко
          </button>
        </div>
      </div>
    </div>
  )
}
