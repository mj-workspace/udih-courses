// Shared dark animated background for Module slides.
// Pulsing grid, drifting gradient blobs, horizontal scan beams,
// right-side data streams, slow particle field, subtle vignette.

const particles = Array.from({ length: 32 }).map((_, i) => ({
  x: (i * 53) % 100,
  y: (i * 37 + 7) % 100,
  r: 0.8 + ((i * 13) % 5) * 0.35,
  dur: 14 + (i % 9) * 2.5,
  delay: (i * 1.3) % 12,
  opacity: 0.18 + (i % 6) * 0.06,
}))

// Vertical data-stream "rain" concentrated on the left half
const streams = Array.from({ length: 14 }).map((_, i) => ({
  leftPct: (i * 3.1) % 45,
  dur: 4 + (i % 5) * 1.1,
  delay: (i * 0.6) % 5,
  length: 40 + (i % 4) * 25,
  hue: i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#60a5fa' : '#a78bfa',
}))

// Grid intersection glows — points on the grid that light up in sequence
const gridPulses = Array.from({ length: 12 }).map((_, i) => ({
  xPct: 10 + (i * 7) % 85,
  yPct: 15 + (i * 11) % 75,
  delay: (i * 0.8) % 10,
  dur: 3 + (i % 4) * 0.5,
  hue: i % 4 === 0 ? '#22d3ee' : i % 4 === 1 ? '#60a5fa' : i % 4 === 2 ? '#34d399' : '#a78bfa',
}))

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient blobs — weighted left */}
      {/* Left-side: bigger + brighter */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          top: '18%', left: '-180px',
          width: '620px', height: '620px',
          background: 'radial-gradient(circle, rgba(14,165,233,0.28), transparent 72%)',
          animation: 'drift-a 24s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          top: '-180px', left: '12%',
          width: '540px', height: '540px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.22), transparent 70%)',
          animation: 'drift-b 22s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          bottom: '-180px', left: '8%',
          width: '420px', height: '420px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.22), transparent 70%)',
          animation: 'drift-c 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          bottom: '-160px', right: '30%',
          width: '520px', height: '520px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.16), transparent 70%)',
          animation: 'drift-c 32s ease-in-out infinite',
        }}
      />

      {/* Pulsing grid — base + breathing overlay */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="module-grid" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M 44 0 L 0 0 0 44" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
          </pattern>
          <pattern id="module-grid-hot" width="88" height="88" patternUnits="userSpaceOnUse">
            <path d="M 88 0 L 0 0 0 88" fill="none" stroke="#60a5fa" strokeWidth="0.7" />
          </pattern>
          <linearGradient id="grid-bias" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="#ffffff" stopOpacity="1" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.35" />
          </linearGradient>
          <mask id="grid-mask">
            <rect width="100%" height="100%" fill="url(#grid-bias)" />
          </mask>
        </defs>
        {/* Faint base grid */}
        <rect width="100%" height="100%" fill="url(#module-grid)" opacity="0.07" />
        {/* Accent grid weighted to the right side */}
        <rect width="100%" height="100%" fill="url(#module-grid-hot)" mask="url(#grid-mask)" opacity="0.09">
          <animate attributeName="opacity" values="0.04;0.14;0.04" dur="5s" repeatCount="indefinite" />
        </rect>
      </svg>

      {/* Soft aurora bands — wide, heavily blurred, slow drift.
          Feel like a spotlight sweeping, not a hard line. Weighted left. */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: 0,
          height: '180px',
          background:
            'radial-gradient(ellipse 60% 100% at 30% 50%, rgba(34,211,238,0.2), rgba(34,211,238,0.07) 45%, transparent 75%)',
          filter: 'blur(22px)',
          animation: 'aurora-v 28s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: 0,
          height: '140px',
          background:
            'radial-gradient(ellipse 45% 100% at 60% 50%, rgba(167,139,250,0.14), rgba(167,139,250,0.04) 50%, transparent 78%)',
          filter: 'blur(28px)',
          animation: 'aurora-v 38s ease-in-out infinite -12s',
          willChange: 'transform',
        }}
      />

      {/* Soft vertical aurora — drifts across left half */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          left: 0,
          width: '240px',
          background:
            'radial-gradient(ellipse 100% 55% at 50% 40%, rgba(96,165,250,0.16), rgba(96,165,250,0.05) 45%, transparent 75%)',
          filter: 'blur(26px)',
          animation: 'aurora-h-left 34s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Grid intersection pulses */}
      <svg className="absolute inset-0 w-full h-full">
        {gridPulses.map((g, i) => (
          <g key={i} style={{ color: g.hue }}>
            <circle cx={`${g.xPct}%`} cy={`${g.yPct}%`} r="0" fill={g.hue} opacity="0.5">
              <animate attributeName="r" values="0;3;0" dur={`${g.dur}s`} begin={`${g.delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.8;0" dur={`${g.dur}s`} begin={`${g.delay}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={`${g.xPct}%`} cy={`${g.yPct}%`} r="0" fill="none" stroke={g.hue} strokeWidth="0.5" opacity="0.3">
              <animate attributeName="r" values="0;18;0" dur={`${g.dur}s`} begin={`${g.delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.5;0" dur={`${g.dur}s`} begin={`${g.delay}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>

      {/* Right-side data streams (digital "rain" trails) */}
      <div
        className="absolute top-0 bottom-0"
        style={{ left: 0, right: 0 }}
      >
        {streams.map((s, i) => (
          <div
            key={i}
            className="absolute w-[1px]"
            style={{
              left: `${s.leftPct}%`,
              top: `-${s.length}px`,
              height: `${s.length}px`,
              background: `linear-gradient(180deg, transparent, ${s.hue}, transparent)`,
              opacity: 0.55,
              filter: 'blur(0.5px)',
              animation: `stream-fall ${s.dur}s linear ${s.delay}s infinite`,
              willChange: 'transform',
            }}
          />
        ))}
      </div>

      {/* Slow drifting particles */}
      <svg className="absolute inset-0 w-full h-full">
        {particles.map((p, i) => {
          const y1 = `${p.y}%`
          const y2 = `${(p.y + 9) % 100}%`
          return (
            <circle key={i} cx={`${p.x}%`} cy={y1} r={p.r} fill="#60a5fa">
              <animate
                attributeName="cy"
                values={`${y1};${y2};${y1}`}
                dur={`${p.dur}s`}
                begin={`${p.delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values={`0;${p.opacity};${p.opacity};0`}
                dur={`${p.dur}s`}
                begin={`${p.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          )
        })}
      </svg>

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(2,6,23,0.55) 100%)',
        }}
      />
    </div>
  )
}
