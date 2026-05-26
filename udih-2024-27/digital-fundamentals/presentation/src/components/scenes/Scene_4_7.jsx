// Scene 4.7 — Гласови асистенти
// Pattern: hub & orbit. A stylised phone at the centre shows an animated Siri-
// style voice waveform on its screen; a "wake word" speech bubble above the
// phone alternates between „Hey Google" and „Hey Siri". Five task tiles orbit
// the phone — alarm, call, weather, timer, navigation — each with a small icon
// and a distinct color. A voice "sound packet" travels phone → task and pulse
// rings emanate from the mic to suggest the spoken command spreading out.

const CX = 470
const CY = 296
const R = 190

const tasks = [
  { id: 'alarm', label: 'Будилник',  color: '#60a5fa', glow: '#93c5fd', angle: -90 },
  { id: 'weather', label: 'Време',    color: '#22d3ee', glow: '#67e8f9', angle: -18 },
  { id: 'timer', label: 'Таймер',    color: '#f59e0b', glow: '#fbbf24', angle: 54 },
  { id: 'nav', label: 'Навигация', color: '#10b981', glow: '#34d399', angle: 126 },
  { id: 'call', label: 'Обаждане',  color: '#a78bfa', glow: '#c4b5fd', angle: 198 },
].map((t) => {
  const rad = (t.angle * Math.PI) / 180
  return { ...t, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

function renderTaskIcon(id, color) {
  switch (id) {
    case 'alarm':
      // clock with bells on top
      return (
        <g fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
          <circle cx="0" cy="2" r="12" fill={color} fillOpacity="0.16" />
          <path d="M -10 -10 L -14 -14" />
          <path d="M 10 -10 L 14 -14" />
          <line x1="0" y1="2" x2="0" y2="-4" />
          <line x1="0" y1="2" x2="5" y2="5" />
          <circle cx="0" cy="2" r="1.2" fill={color} stroke="none" />
        </g>
      )
    case 'weather':
      // sun + cloud
      return (
        <g fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
          <circle cx="-6" cy="-6" r="4.5" fill={color} fillOpacity="0.25" />
          <line x1="-6" y1="-15" x2="-6" y2="-12" />
          <line x1="-15" y1="-6" x2="-12" y2="-6" />
          <line x1="-12.5" y1="-12.5" x2="-10.5" y2="-10.5" />
          <path
            d="M -2 6 Q -8 6 -8 1 Q -8 -3 -3 -3 Q -2 -8 4 -8 Q 11 -8 12 -2 Q 16 -2 16 3 Q 16 8 11 8 L -2 8 Z"
            fill={color} fillOpacity="0.22"
          />
        </g>
      )
    case 'timer':
      // hourglass / timer
      return (
        <g fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
          <circle cx="0" cy="2" r="12" fill={color} fillOpacity="0.16" />
          <path d="M 0 2 L 0 -6" />
          <path d="M 0 2 L 7 2" />
          <rect x="-4" y="-15" width="8" height="3" rx="0.8" fill={color} fillOpacity="0.4" stroke="none" />
        </g>
      )
    case 'nav':
      // map pin with route
      return (
        <g fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
          <path d="M -14 10 Q -8 0 0 2 Q 8 4 14 -8" stroke={color} strokeWidth="1.2" strokeDasharray="2 3" opacity="0.75" />
          <path
            d="M 0 -14 C -7 -14 -10 -9 -10 -5 C -10 3 0 12 0 12 C 0 12 10 3 10 -5 C 10 -9 7 -14 0 -14 Z"
            fill={color} fillOpacity="0.22"
          />
          <circle cx="0" cy="-5" r="3" fill={color} stroke="none" />
        </g>
      )
    case 'call':
      // phone handset
      return (
        <g fill="none" stroke={color} strokeWidth="1.9" strokeLinejoin="round" strokeLinecap="round">
          <path
            d="M -11 -10 Q -13 -12 -10 -14 L -6 -14 Q -3 -14 -2 -10 L 0 -4 Q 0 -1 -3 1 Q 0 7 7 10 Q 9 7 12 7 L 14 7 Q 18 7 18 11 L 18 14 Q 18 17 16 17 Q 4 17 -8 5 Q -14 -3 -11 -10 Z"
            fill={color} fillOpacity="0.22"
          />
        </g>
      )
    default:
      return null
  }
}

// Siri-style waveform bars on the phone screen
const wavBars = [
  { x: -22, base: 7, hi: 22 },
  { x: -14, base: 14, hi: 32 },
  { x:  -6, base: 20, hi: 44 },
  { x:   2, base: 16, hi: 36 },
  { x:  10, base: 22, hi: 48 },
  { x:  18, base: 12, hi: 28 },
]

export default function Scene_4_7() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s47-core-grad">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.42" />
            <stop offset="75%" stopColor="#1e3a8a" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s47-wave-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <filter id="s47-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="s47-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient rotating rings */}
        <circle cx={CX} cy={CY} r="262" fill="none" stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 10">
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="60s" repeatCount="indefinite"
          />
        </circle>
        <circle cx={CX} cy={CY} r="236" fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 14" opacity="0.55">
          <animateTransform
            attributeName="transform" type="rotate"
            from={`360 ${CX} ${CY}`} to={`0 ${CX} ${CY}`}
            dur="46s" repeatCount="indefinite"
          />
        </circle>

        {/* Connections phone → task tile, with traveling voice-command packet */}
        {tasks.map((t, i) => (
          <g key={`link-${t.id}`}>
            <line
              x1={CX} y1={CY} x2={t.x} y2={t.y}
              stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.55"
            >
              <animate
                attributeName="stroke-dashoffset" from="10" to="0"
                dur="2s" repeatCount="indefinite"
              />
            </line>
            <circle r="3.5" fill={t.glow} filter="url(#s47-glow)">
              <animateMotion
                dur={`${5 + i * 0.45}s`} repeatCount="indefinite"
                path={`M ${CX} ${CY} L ${t.x} ${t.y}`}
              />
            </circle>
          </g>
        ))}

        {/* Halo around phone */}
        <circle cx={CX} cy={CY} r="124" fill="url(#s47-core-grad)" />

        {/* Wake-word speech bubble above the phone */}
        <g transform={`translate(${CX} ${CY - 134})`}>
          <g filter="url(#s47-glow)">
            <rect x="-72" y="-18" width="144" height="34" rx="17" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.6">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="3.2s" repeatCount="indefinite" />
            </rect>
            {/* bubble tail */}
            <path d="M -6 16 L 0 26 L 6 16 Z" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.6" />
            {/* mask line so the tail merges with the bubble */}
            <line x1="-7" y1="16" x2="7" y2="16" stroke="#0b1220" strokeWidth="2.4" />
          </g>
          {/* Two alternating wake words */}
          <text
            x="0" y="5" textAnchor="middle"
            fill="#e2e8f0" fontSize="14" fontWeight="700"
            style={{ letterSpacing: '0.04em' }}
          >
            „Hey Google"
            <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.45;0.5;0.95;1" dur="6s" repeatCount="indefinite" />
          </text>
          <text
            x="0" y="5" textAnchor="middle"
            fill="#e2e8f0" fontSize="14" fontWeight="700"
            style={{ letterSpacing: '0.04em' }}
          >
            „Hey Siri"
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.45;0.5;0.95;1" dur="6s" repeatCount="indefinite" />
          </text>
        </g>

        {/* Central phone */}
        <g transform={`translate(${CX} ${CY})`}>
          {/* breathing rings — voice spreading outward */}
          {[0, 1.6, 3.2].map((d, i) => (
            <circle key={i} r="64" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="64;118" dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.45;0" dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* phone outline */}
          <g filter="url(#s47-glow)">
            <rect x="-50" y="-90" width="100" height="180" rx="14" fill="#0b1220" stroke="#60a5fa" strokeWidth="2.2">
              <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="3.6s" repeatCount="indefinite" />
            </rect>
            <line x1="-10" y1="-82" x2="10" y2="-82" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            <circle cx="0" cy="82" r="2.2" fill="none" stroke="#334155" strokeWidth="1.4" />
          </g>

          {/* phone screen */}
          <g>
            <rect x="-42" y="-72" width="84" height="138" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="0.8" />

            {/* status bar */}
            <circle cx="-32" cy="-66" r="1" fill="#475569" />
            <circle cx="-28" cy="-66" r="1" fill="#475569" />
            <circle cx="-24" cy="-66" r="1" fill="#475569" />
            <rect x="28" y="-68" width="10" height="4" rx="1" fill="none" stroke="#475569" strokeWidth="0.7" />

            {/* mic glyph at top of screen */}
            <g transform="translate(0 -40)" filter="url(#s47-soft-glow)">
              <rect x="-6" y="-10" width="12" height="16" rx="6" fill="#22d3ee" fillOpacity="0.22" stroke="#22d3ee" strokeWidth="1.4">
                <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" />
              </rect>
              <path d="M -10 4 Q -10 12 0 12 Q 10 12 10 4" fill="none" stroke="#22d3ee" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="0" y1="12" x2="0" y2="17" stroke="#22d3ee" strokeWidth="1.4" strokeLinecap="round" />
            </g>

            {/* Siri-style live waveform */}
            <g transform="translate(0 18)">
              {wavBars.map((b, i) => (
                <rect
                  key={i}
                  x={b.x} y={-b.base / 2}
                  width="4" height={b.base} rx="2"
                  fill="url(#s47-wave-grad)"
                >
                  <animate
                    attributeName="height"
                    values={`${b.base};${b.hi};${b.base * 0.6};${b.hi * 0.8};${b.base}`}
                    dur={`${1.3 + i * 0.15}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y"
                    values={`${-b.base / 2};${-b.hi / 2};${-b.base * 0.3};${-b.hi * 0.4};${-b.base / 2}`}
                    dur={`${1.3 + i * 0.15}s`}
                    repeatCount="indefinite"
                  />
                </rect>
              ))}
            </g>

            {/* listening hint */}
            <text
              x="0" y="56" textAnchor="middle"
              fill="#94a3b8" fontSize="8.5"
              style={{ letterSpacing: '0.18em' }}
            >
              СЛУШАМ…
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
            </text>
          </g>

          {/* hub label */}
          <text
            x="0" y="118" textAnchor="middle"
            fill="#e2e8f0" fontSize="13" fontWeight="700"
            style={{ letterSpacing: '0.22em' }}
          >
            АСИСТЕНТ
          </text>
        </g>

        {/* Satellite task tiles */}
        {tasks.map((t, i) => {
          // place the label chip on the side that has the most room
          const labelBelow = t.angle > -90 && t.angle < 90
          const labelY = labelBelow ? 56 : -56
          return (
            <g key={t.id} transform={`translate(${t.x} ${t.y})`}>
              {/* pulsing halos */}
              <circle r="40" fill="none" stroke={t.color} strokeWidth="1" opacity="0">
                <animate attributeName="r" values="40;72" dur="4.4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0" dur="4.4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
              </circle>
              <circle r="40" fill="none" stroke={t.color} strokeWidth="1" opacity="0">
                <animate attributeName="r" values="40;72" dur="4.4s" begin={`${i * 0.6 + 2.2}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0" dur="4.4s" begin={`${i * 0.6 + 2.2}s`} repeatCount="indefinite" />
              </circle>

              {/* tile */}
              <rect
                x="-32" y="-32" width="64" height="64" rx="14"
                fill="#0b1220" stroke={t.color} strokeWidth="2"
                filter="url(#s47-glow)"
              >
                <animate
                  attributeName="stroke-opacity"
                  values="0.55;1;0.55"
                  dur={`${3.4 + i * 0.35}s`}
                  repeatCount="indefinite"
                />
              </rect>

              {/* icon */}
              {renderTaskIcon(t.id, t.color)}

              {/* label chip */}
              <g transform={`translate(0 ${labelY})`}>
                <rect
                  x="-50" y="-12" width="100" height="24" rx="12"
                  fill="#0b1220" stroke={t.color} strokeWidth="1" opacity="0.94"
                />
                <text
                  x="0" y="4.5" textAnchor="middle"
                  fill="#e2e8f0" fontSize="12.5" fontWeight="700"
                >
                  {t.label}
                </text>
              </g>
            </g>
          )
        })}

        {/* Drifting ambient nodes for life */}
        <g opacity="0.55">
          <circle r="2" fill="#22d3ee" filter="url(#s47-glow)">
            <animateMotion
              dur="24s" repeatCount="indefinite"
              path={`M 110 120 Q 260 70 460 100 T 800 140`}
            />
          </circle>
          <circle r="1.8" fill="#a78bfa" filter="url(#s47-glow)">
            <animateMotion
              dur="28s" repeatCount="indefinite"
              path={`M 820 460 Q 600 500 380 470 T 90 450`}
            />
          </circle>
        </g>
      </svg>
    </div>
  )
}
