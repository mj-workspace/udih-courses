// Scene 3.1 — Password strength cracker
// Live brute-force demo: five sample passwords shown side-by-side with
// filling "attempt" bars. Weak passwords fill completely within seconds;
// the long passphrase barely moves. A jittering attempts-per-second
// counter at the top reinforces the scale of modern cracking rigs.

import { useEffect, useState } from 'react'

// Sample passwords, ordered weakest → strongest
// crack: duration for bar to fill 100% (in seconds). > 999 = never fills
const samples = [
  { pw: '123456',                     bits: 20, status: 'слаба', color: '#ef4444', crack: 1.0, label: '0.1 сек' },
  { pw: 'password',                   bits: 28, status: 'слаба', color: '#ef4444', crack: 1.6, label: '2 сек'    },
  { pw: 'Qwerty2024!',                bits: 50, status: 'средна', color: '#f59e0b', crack: 5.0, label: '5 часа'   },
  { pw: 'Tr0ub4dor&3',                bits: 60, status: 'средна', color: '#f59e0b', crack: 7.0, label: '3 дни'    },
  { pw: 'correct horse battery staple', bits: 104, status: 'силна', color: '#10b981', crack: 9999, label: '10¹⁵ години' },
]

const ROW_H = 58
const BAR_X = 280
const BAR_W = 420
const LABEL_X = BAR_X + BAR_W + 18

const rows = samples.map((s, i) => ({
  ...s,
  y: 160 + i * ROW_H,
}))

// Fake CPU rate jitter — animated per-frame in React
function useBruteForceRate() {
  const [rate, setRate] = useState(1.2e12)
  useEffect(() => {
    const id = setInterval(() => {
      const base = 1.2e12
      const jitter = (Math.random() - 0.5) * 0.8e11
      setRate(base + jitter)
    }, 110)
    return () => clearInterval(id)
  }, [])
  return rate
}

function formatRate(r) {
  // e.g. 1.2e12 → "1.24 трлн"
  const trln = r / 1e12
  return `${trln.toFixed(2)} трлн`
}

export default function Scene_3_1() {
  const rate = useBruteForceRate()

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* HUD — Cracking rate */}
      <div className="absolute top-4 right-6 z-10 flex items-center gap-3 px-4 py-2 rounded-md border border-red-500/30 bg-slate-950/70 backdrop-blur-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.18em] text-red-300/80">
            Brute-force · опити / сек
          </span>
          <span className="font-mono text-sm font-bold text-red-200 tabular-nums">
            {formatRate(rate)}
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="pw-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="row-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="#0b1220" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          {rows.map((r, i) => (
            <linearGradient key={i} id={`fill-${i}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"  stopColor={r.color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={r.color} stopOpacity="0.5" />
            </linearGradient>
          ))}
        </defs>

        {/* Title */}
        <text x="50" y="86" fill="#94a3b8" fontSize="14" fontWeight="500" style={{ letterSpacing: '0.25em' }}>
          ВРЕМЕ ЗА РАЗБИВАНЕ · BRUTE-FORCE СИМУЛАЦИЯ
        </text>
        <text x="50" y="108" fill="#475569" fontSize="11.5">
          колкото по-дълга паролата → толкова по-непреодолима
        </text>

        {/* Rows */}
        {rows.map((r, i) => (
          <g key={i}>
            {/* Row backdrop */}
            <rect
              x="40" y={r.y - 22}
              width="820" height="44"
              rx="6"
              fill="url(#row-grad)"
              stroke={r.color}
              strokeWidth="0.6"
              opacity="0.85"
            >
              <animate attributeName="stroke-opacity" values="0.35;0.8;0.35" dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
            </rect>

            {/* Password text (monospace) */}
            <text
              x="56" y={r.y + 4}
              fill={r.color}
              fontSize="14"
              fontWeight="600"
              style={{ fontFamily: 'ui-monospace, monospace', letterSpacing: '0.04em' }}
              filter="url(#pw-glow)"
            >
              {r.pw}
            </text>

            {/* Progress track */}
            <rect x={BAR_X} y={r.y - 8} width={BAR_W} height="16" rx="3"
              fill="#020617" stroke={r.color} strokeWidth="0.6" opacity="0.85" />
            {/* Progress fill */}
            {r.crack > 500 ? (
              // Strong — barely moves, stays at ~3%
              <g>
                <rect x={BAR_X} y={r.y - 8} width="12" height="16" rx="3" fill={`url(#fill-${i})`}>
                  <animate attributeName="width" values="8;14;8" dur="4s" repeatCount="indefinite" />
                </rect>
              </g>
            ) : (
              // Weak / medium — fills completely, resets
              <rect x={BAR_X} y={r.y - 8} width="0" height="16" rx="3" fill={`url(#fill-${i})`}>
                <animate
                  attributeName="width"
                  values={`0;${BAR_W};${BAR_W}`}
                  keyTimes="0;0.88;1"
                  dur={`${r.crack}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="1;1;0"
                  keyTimes="0;0.9;1"
                  dur={`${r.crack}s`}
                  repeatCount="indefinite"
                />
              </rect>
            )}

            {/* Moving scan line on the bar */}
            {r.crack <= 500 && (
              <line x1={BAR_X} y1={r.y - 8} x2={BAR_X} y2={r.y + 8} stroke="#fff" strokeWidth="1.4" opacity="0.7">
                <animate attributeName="x1" values={`${BAR_X};${BAR_X + BAR_W}`} dur={`${r.crack}s`} repeatCount="indefinite" />
                <animate attributeName="x2" values={`${BAR_X};${BAR_X + BAR_W}`} dur={`${r.crack}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0.8;0" keyTimes="0;0.9;1" dur={`${r.crack}s`} repeatCount="indefinite" />
              </line>
            )}

            {/* Time label */}
            <text x={LABEL_X} y={r.y + 4} fill={r.color} fontSize="13" fontWeight="700"
              style={{ fontFamily: 'ui-monospace, monospace' }}>
              {r.label}
            </text>

            {/* Small status pill on the very right inside row */}
            <g transform={`translate(${LABEL_X + 80} ${r.y - 10})`}>
              <rect x="0" y="0" width="58" height="20" rx="10" fill={r.color + '22'} stroke={r.color} strokeWidth="0.8" />
              <text x="29" y="13" textAnchor="middle" fill={r.color} fontSize="10" fontWeight="700"
                style={{ letterSpacing: '0.1em' }}>
                {r.status.toUpperCase()}
              </text>
            </g>

            {/* Entropy bits indicator dots on left edge */}
            <g transform={`translate(50 ${r.y + 18})`}>
              {Array.from({ length: 12 }).map((_, k) => {
                const filled = k < Math.min(12, Math.round(r.bits / 10))
                return (
                  <circle
                    key={k}
                    cx={k * 6} cy={0} r="1.2"
                    fill={filled ? r.color : '#1e293b'}
                    opacity={filled ? 0.8 : 1}
                  />
                )
              })}
            </g>
          </g>
        ))}

        {/* Bottom message */}
        <text x="50" y="510" fill="#64748b" fontSize="12" style={{ letterSpacing: '0.15em' }}>
          ДЪЛЖИНАТА БИЕ СЛОЖНОСТТА · passphrase &gt; паролa
        </text>
      </svg>
    </div>
  )
}
