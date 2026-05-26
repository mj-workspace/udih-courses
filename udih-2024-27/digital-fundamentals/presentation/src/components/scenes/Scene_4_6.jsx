// Scene 4.6 — Полезни приложения
// Pattern: hub & orbit. A stylised phone at the centre shows a home-screen grid
// of app tiles; four large category tiles orbit it — one for each useful group
// from the guide: communication, productivity, navigation, banking. Each tile
// has a distinct color, a category icon, and a small example-app glyph. A
// data packet travels phone → category and back to suggest "the phone runs
// these things". Banking tile has a small lock badge — the guide stresses the
// extra security of bank apps.

const CX = 450
const CY = 296
const R = 188

const groups = [
  {
    id: 'comm',
    label: 'Общуване',
    example: 'Viber · WhatsApp',
    color: '#10b981',
    glow: '#34d399',
    angle: -90,
  },
  {
    id: 'prod',
    label: 'Продуктивност',
    example: 'Календар · Бележки',
    color: '#3b82f6',
    glow: '#60a5fa',
    angle: 0,
  },
  {
    id: 'bank',
    label: 'Банкиране',
    example: 'Банка · Сигурно',
    color: '#a78bfa',
    glow: '#c4b5fd',
    angle: 90,
    secure: true,
  },
  {
    id: 'nav',
    label: 'Навигация',
    example: 'Google Maps',
    color: '#f59e0b',
    glow: '#fbbf24',
    angle: 180,
  },
].map((g) => {
  const rad = (g.angle * Math.PI) / 180
  return { ...g, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

function renderGroupIcon(id, color) {
  switch (id) {
    case 'comm':
      // two overlapping chat bubbles
      return (
        <g fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
          <path
            d="M -16 -10 Q -16 -16 -10 -16 L 6 -16 Q 12 -16 12 -10 L 12 -2 Q 12 4 6 4 L -2 4 L -8 9 L -8 4 L -10 4 Q -16 4 -16 -2 Z"
            fill={color} fillOpacity="0.18"
          />
          <path
            d="M -2 0 Q -2 -4 2 -4 L 14 -4 Q 18 -4 18 0 L 18 8 Q 18 12 14 12 L 10 12 L 14 16 L 14 12 Q 18 12 18 8 Z"
            fill={color} fillOpacity="0.30"
          />
        </g>
      )
    case 'prod':
      // a small calendar
      return (
        <g fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
          <rect x="-14" y="-12" width="28" height="22" rx="2.5" fill={color} fillOpacity="0.14" />
          <line x1="-14" y1="-5" x2="14" y2="-5" />
          <line x1="-8" y1="-15" x2="-8" y2="-10" />
          <line x1="8" y1="-15" x2="8" y2="-10" />
          <rect x="-9" y="-1" width="5" height="4" rx="0.8" fill={color} stroke="none" />
          <rect x="-2" y="-1" width="5" height="4" rx="0.8" fill={color} fillOpacity="0.5" stroke="none" />
          <rect x="5" y="-1" width="5" height="4" rx="0.8" fill={color} fillOpacity="0.25" stroke="none" />
          <rect x="-9" y="5" width="5" height="4" rx="0.8" fill={color} fillOpacity="0.25" stroke="none" />
          <rect x="-2" y="5" width="5" height="4" rx="0.8" fill={color} fillOpacity="0.5" stroke="none" />
        </g>
      )
    case 'nav':
      // map pin on a folded map fragment
      return (
        <g fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
          {/* faint route */}
          <path d="M -14 8 Q -8 -4 0 0 Q 8 4 14 -8" stroke={color} strokeWidth="1.2" strokeDasharray="2 3" opacity="0.7" />
          {/* pin */}
          <path
            d="M 0 -14 C -7 -14 -10 -9 -10 -5 C -10 3 0 12 0 12 C 0 12 10 3 10 -5 C 10 -9 7 -14 0 -14 Z"
            fill={color} fillOpacity="0.22"
          />
          <circle cx="0" cy="-5" r="3" fill={color} stroke="none" />
        </g>
      )
    case 'bank':
      // a credit card
      return (
        <g fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
          <rect x="-16" y="-10" width="32" height="20" rx="2.5" fill={color} fillOpacity="0.18" />
          <line x1="-16" y1="-4" x2="16" y2="-4" />
          {/* chip */}
          <rect x="-12" y="1" width="6" height="5" rx="0.8" fill={color} fillOpacity="0.55" stroke="none" />
          {/* contactless waves */}
          <path d="M 4 2 Q 7 5 4 8" />
          <path d="M 8 0 Q 12 5 8 10" />
        </g>
      )
    default:
      return null
  }
}

export default function Scene_4_6() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s46-core-grad">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.42" />
            <stop offset="75%" stopColor="#1e3a8a" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <filter id="s46-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="s46-strong-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.4" result="b" />
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

        {/* Connections phone → group tile, with traveling app-launch packet */}
        {groups.map((g, i) => (
          <g key={`link-${g.id}`}>
            <line
              x1={CX} y1={CY} x2={g.x} y2={g.y}
              stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.55"
            >
              <animate
                attributeName="stroke-dashoffset" from="10" to="0"
                dur="2s" repeatCount="indefinite"
              />
            </line>
            <circle r="3.5" fill={g.glow} filter="url(#s46-glow)">
              <animateMotion
                dur={`${4.8 + i * 0.45}s`} repeatCount="indefinite"
                path={`M ${CX} ${CY} L ${g.x} ${g.y}`}
              />
            </circle>
          </g>
        ))}

        {/* Halo around phone */}
        <circle cx={CX} cy={CY} r="118" fill="url(#s46-core-grad)" />

        {/* Central phone — home screen of grouped apps */}
        <g transform={`translate(${CX} ${CY})`}>
          {/* breathing rings */}
          {[0, 1.7, 3.4].map((d, i) => (
            <circle key={i} r="64" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="64;112" dur="5s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.42;0" dur="5s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* phone outline */}
          <g filter="url(#s46-glow)">
            <rect x="-50" y="-90" width="100" height="180" rx="14" fill="#0b1220" stroke="#60a5fa" strokeWidth="2.2">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="3.6s" repeatCount="indefinite" />
            </rect>
            <line x1="-10" y1="-82" x2="10" y2="-82" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            <circle cx="0" cy="82" r="2.2" fill="none" stroke="#334155" strokeWidth="1.4" />
          </g>

          {/* phone screen with 2×2 mini-tiles matching the four groups */}
          <g>
            <rect x="-42" y="-72" width="84" height="138" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="0.8" />

            {/* faint status bar dots */}
            <circle cx="-32" cy="-66" r="1" fill="#475569" />
            <circle cx="-28" cy="-66" r="1" fill="#475569" />
            <circle cx="-24" cy="-66" r="1" fill="#475569" />
            <rect x="28" y="-68" width="10" height="4" rx="1" fill="none" stroke="#475569" strokeWidth="0.7" />

            {/* 2×2 grid of mini app icons, each color matches its group */}
            {[
              { x: -22, y: -38, c: '#10b981', d: 0 },
              { x:  22, y: -38, c: '#3b82f6', d: 0.6 },
              { x: -22, y:   6, c: '#f59e0b', d: 1.2 },
              { x:  22, y:   6, c: '#a78bfa', d: 1.8 },
            ].map((t, k) => (
              <g key={k} transform={`translate(${t.x} ${t.y})`}>
                <rect x="-13" y="-13" width="26" height="26" rx="6" fill={t.c} fillOpacity="0.18" stroke={t.c} strokeWidth="1.2">
                  <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="3.2s" begin={`${t.d}s`} repeatCount="indefinite" />
                </rect>
                <circle r="3.4" fill={t.c} stroke="none">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="3.2s" begin={`${t.d}s`} repeatCount="indefinite" />
                </circle>
              </g>
            ))}

            {/* dock hint */}
            <rect x="-32" y="38" width="64" height="22" rx="6" fill="#0b1220" stroke="#1e293b" strokeWidth="0.8" />
            <circle cx="-18" cy="49" r="3" fill="#334155" />
            <circle cx="-4"  cy="49" r="3" fill="#334155" />
            <circle cx="10"  cy="49" r="3" fill="#334155" />
            <circle cx="24"  cy="49" r="3" fill="#334155" />
          </g>

          {/* hub label */}
          <text
            x="0" y="112" textAnchor="middle"
            fill="#e2e8f0" fontSize="13" fontWeight="700"
            style={{ letterSpacing: '0.22em' }}
          >
            ТЕЛЕФОНЪТ
          </text>
        </g>

        {/* Satellite group tiles */}
        {groups.map((g, i) => {
          // bottom tile pushes its label above (otherwise it would fall off
          // the canvas); every other tile gets the label below
          const labelBelow = g.angle !== 90
          const labelY = labelBelow ? 60 : -60
          const exampleY = labelBelow ? 82 : -82
          return (
            <g key={g.id} transform={`translate(${g.x} ${g.y})`}>
              {/* pulsing halos */}
              <circle r="44" fill="none" stroke={g.color} strokeWidth="1" opacity="0">
                <animate attributeName="r" values="44;76" dur="4.4s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0" dur="4.4s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
              </circle>
              <circle r="44" fill="none" stroke={g.color} strokeWidth="1" opacity="0">
                <animate attributeName="r" values="44;76" dur="4.4s" begin={`${i * 0.7 + 2.2}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0" dur="4.4s" begin={`${i * 0.7 + 2.2}s`} repeatCount="indefinite" />
              </circle>

              {/* tile */}
              <rect
                x="-36" y="-36" width="72" height="72" rx="16"
                fill="#0b1220" stroke={g.color} strokeWidth="2"
                filter={g.secure ? 'url(#s46-strong-glow)' : 'url(#s46-glow)'}
              >
                <animate
                  attributeName="stroke-opacity"
                  values="0.55;1;0.55"
                  dur={`${3.4 + i * 0.35}s`}
                  repeatCount="indefinite"
                />
              </rect>

              {/* icon */}
              {renderGroupIcon(g.id, g.color)}

              {/* security lock badge — only on banking tile */}
              {g.secure && (
                <g transform="translate(26 -26)">
                  <circle r="10" fill="#0b1220" stroke="#10b981" strokeWidth="1.4" filter="url(#s46-glow)">
                    <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <rect x="-3.5" y="-1" width="7" height="6" rx="1" fill="#10b981" fillOpacity="0.3" stroke="#34d399" strokeWidth="0.9" />
                  <path d="M -2 -1 L -2 -3.5 Q -2 -5.5 0 -5.5 Q 2 -5.5 2 -3.5 L 2 -1" fill="none" stroke="#34d399" strokeWidth="0.9" />
                </g>
              )}

              {/* group label chip */}
              <g transform={`translate(0 ${labelY})`}>
                <rect
                  x="-58" y="-12" width="116" height="24" rx="12"
                  fill="#0b1220" stroke={g.color} strokeWidth="1" opacity="0.94"
                />
                <text
                  x="0" y="4.5" textAnchor="middle"
                  fill="#e2e8f0" fontSize="13" fontWeight="700"
                >
                  {g.label}
                </text>
              </g>

              {/* example apps line — small secondary label */}
              <text
                x="0" y={exampleY} textAnchor="middle"
                fill="#94a3b8" fontSize="10.5"
                style={{ letterSpacing: '0.02em' }}
              >
                {g.example}
              </text>
            </g>
          )
        })}

        {/* Drifting ambient nodes for life */}
        <g opacity="0.55">
          <circle r="2" fill="#60a5fa" filter="url(#s46-glow)">
            <animateMotion
              dur="22s" repeatCount="indefinite"
              path={`M 110 110 Q 250 60 450 90 T 800 130`}
            />
          </circle>
          <circle r="1.8" fill="#a78bfa" filter="url(#s46-glow)">
            <animateMotion
              dur="26s" repeatCount="indefinite"
              path={`M 820 470 Q 600 510 380 480 T 90 460`}
            />
          </circle>
        </g>
      </svg>
    </div>
  )
}
