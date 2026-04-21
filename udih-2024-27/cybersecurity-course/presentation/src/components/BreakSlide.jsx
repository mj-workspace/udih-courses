import { useEffect, useRef, useState } from 'react'

const STEP_SMALL = 60   // +/- 1 min
const STEP_BIG = 300    // +/- 5 min
const TOTAL_SHRINK_THRESHOLD = 15 * 60 // when removing time above this, recalc the total

function formatTime(totalSeconds) {
  const s = Math.max(0, totalSeconds)
  const mm = Math.floor(s / 60).toString().padStart(2, '0')
  const ss = Math.floor(s % 60).toString().padStart(2, '0')
  return `${mm}:${ss}`
}

function StartingSoonBanner() {
  return (
    <div className="relative my-4 flex flex-col items-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="absolute w-[560px] h-[180px] rounded-full border border-pink-400/40"
          style={{ animation: 'break-halo-expand 3.2s ease-out infinite' }}
        />
        <div
          className="absolute w-[560px] h-[180px] rounded-full border border-blue-400/40"
          style={{ animation: 'break-halo-expand 3.2s ease-out infinite 1.1s' }}
        />
        <div
          className="absolute w-[560px] h-[180px] rounded-full border border-amber-300/40"
          style={{ animation: 'break-halo-expand 3.2s ease-out infinite 2.2s' }}
        />
      </div>

      <h2
        className="relative text-6xl font-black tracking-tight text-transparent bg-clip-text leading-tight"
        style={{
          backgroundImage:
            'linear-gradient(90deg, #fbbf24, #f472b6, #60a5fa, #34d399, #fbbf24)',
          backgroundSize: '300% 100%',
          animation:
            'break-breathe 3s ease-in-out infinite, break-shimmer 6s linear infinite',
        }}
      >
        Започваме всеки момент
      </h2>

      <div className="mt-4 flex items-center gap-2" aria-hidden="true">
        {[0, 0.15, 0.3].map((delay, i) => (
          <span
            key={i}
            className="block w-3 h-3 rounded-full bg-gradient-to-br from-pink-300 to-blue-300"
            style={{
              animation: `break-dot 1.4s ease-in-out infinite ${delay}s`,
              boxShadow: '0 0 12px rgba(244,114,182,0.6)',
            }}
          />
        ))}
      </div>

      <p className="mt-6 text-sm uppercase tracking-[0.35em] text-slate-400">
        Добре дошли обратно
      </p>
    </div>
  )
}

function RunToggle({ running, onChange }) {
  const baseBtn =
    'px-5 h-9 flex items-center justify-center rounded-full text-sm font-semibold uppercase tracking-wider transition-colors'
  const active = 'bg-white text-slate-900 shadow-sm'
  const idle = 'text-slate-500 hover:text-slate-300'

  return (
    <div
      role="tablist"
      aria-label="Старт / Стоп на таймера"
      className="flex items-center gap-1 p-1 rounded-full bg-slate-900/70 border border-slate-600"
    >
      <button
        role="tab"
        aria-selected={running}
        onClick={() => onChange(true)}
        className={`${baseBtn} ${running ? active : idle}`}
      >
        Старт
      </button>
      <button
        role="tab"
        aria-selected={!running}
        onClick={() => onChange(false)}
        className={`${baseBtn} ${!running ? active : idle}`}
      >
        Стоп
      </button>
    </div>
  )
}

export default function BreakSlide({ minutes = 15, label = 'Почивка' }) {
  const initialSeconds = minutes * 60
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds)
  const [remaining, setRemaining] = useState(initialSeconds)
  const [running, setRunning] = useState(false)
  const endAtRef = useRef(null)

  // Reset when the slide is re-mounted with different minutes
  useEffect(() => {
    setTotalSeconds(initialSeconds)
    setRemaining(initialSeconds)
    setRunning(false)
    endAtRef.current = null
  }, [initialSeconds])

  // Tick loop anchored to wall clock
  useEffect(() => {
    if (!running) return
    if (endAtRef.current == null) {
      endAtRef.current = Date.now() + remaining * 1000
    }
    const id = setInterval(() => {
      const left = Math.max(0, Math.round((endAtRef.current - Date.now()) / 1000))
      setRemaining(left)
      if (left <= 0) setRunning(false)
    }, 250)
    return () => clearInterval(id)
  }, [running])

  const stop = (e) => e.stopPropagation()

  function setRunState(next) {
    if (next === running) return
    if (next) {
      endAtRef.current = Date.now() + remaining * 1000
      setRunning(true)
    } else {
      endAtRef.current = null
      setRunning(false)
    }
  }

  function adjust(delta) {
    // Above the threshold any +/- rescales the whole break: total changes,
    // remaining resets to the full new total so the ring is always full again.
    // At or below the threshold removing time simply drains `remaining`
    // without touching total (ring keeps its proportion, label stays).
    let newTotal
    let newRemaining
    if (delta >= 0) {
      newTotal = totalSeconds + delta
      newRemaining = newTotal
    } else if (totalSeconds > TOTAL_SHRINK_THRESHOLD) {
      newTotal = Math.max(TOTAL_SHRINK_THRESHOLD, totalSeconds + delta)
      newRemaining = newTotal
    } else {
      newTotal = totalSeconds
      newRemaining = Math.max(0, remaining + delta)
    }
    setTotalSeconds(newTotal)
    setRemaining(newRemaining)
    if (running) {
      endAtRef.current = newRemaining > 0 ? Date.now() + newRemaining * 1000 : null
    }
  }

  const done = remaining <= 0
  const progress = totalSeconds > 0 ? remaining / totalSeconds : 0
  const ringCirc = 2 * Math.PI * 140
  const dash = ringCirc * progress

  const adjustBtn =
    'px-4 h-10 rounded-full border bg-slate-900/70 border-slate-500 text-slate-100 ' +
    'hover:bg-slate-700 hover:border-slate-400 font-mono tabular-nums text-sm transition ' +
    'disabled:opacity-35 disabled:cursor-not-allowed'

  return (
    <div className="relative h-full flex items-center justify-center px-16 overflow-hidden">
      {/* Ambient halos */}
      <div
        className="absolute -top-32 -left-20 w-[460px] h-[460px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.3), transparent 70%)' }}
      />
      <div
        className="absolute -bottom-32 -right-20 w-[460px] h-[460px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3), transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300 mb-6">
          {label}
        </p>

        {done ? (
          <StartingSoonBanner />
        ) : (
          <>
            <h1 className="text-5xl font-bold text-white mb-8 tracking-tight">
              Почивка
            </h1>

            <div className="relative mb-8">
              <svg width="340" height="340" viewBox="0 0 340 340">
                <defs>
                  <linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#60a5fa" />
                  </linearGradient>
                </defs>
                <circle
                  cx="170" cy="170" r="140"
                  fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="14"
                />
                <circle
                  cx="170" cy="170" r="140"
                  fill="none"
                  stroke="url(#ring-gradient)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${ringCirc}`}
                  transform="rotate(-90 170 170)"
                  style={{ transition: 'stroke-dasharray 0.4s linear' }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="text-7xl font-black tabular-nums tracking-tight text-white"
                  style={{ textShadow: '0 4px 24px rgba(0,0,0,0.6)' }}
                >
                  {formatTime(remaining)}
                </span>
                <span className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                  от {Math.round(totalSeconds / 60)} мин
                </span>
              </div>
            </div>
          </>
        )}

        {/* Controls: -5 | -1 | [Старт/Стоп] | +1 | +5 */}
        <div
          className="flex flex-wrap items-center justify-center gap-3"
          onKeyDown={stop}
        >
          <button
            onClick={() => adjust(-STEP_BIG)}
            onMouseDown={stop}
            disabled={remaining <= 0}
            className={adjustBtn}
            title="Махни 5 минути"
          >
            − 5 мин
          </button>
          <button
            onClick={() => adjust(-STEP_SMALL)}
            onMouseDown={stop}
            disabled={remaining <= 0}
            className={adjustBtn}
            title="Махни 1 минута"
          >
            − 1 мин
          </button>

          <RunToggle running={running} onChange={setRunState} />

          <button
            onClick={() => adjust(STEP_SMALL)}
            onMouseDown={stop}
            className={adjustBtn}
            title="Добави 1 минута"
          >
            + 1 мин
          </button>
          <button
            onClick={() => adjust(STEP_BIG)}
            onMouseDown={stop}
            className={adjustBtn}
            title="Добави 5 минути"
          >
            + 5 мин
          </button>
        </div>
      </div>
    </div>
  )
}
