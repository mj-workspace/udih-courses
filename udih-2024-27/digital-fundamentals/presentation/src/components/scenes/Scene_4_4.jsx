// Scene 4.4 — Инсталиране на приложения
// Pattern: hub & orbit. The guide's central metaphor is the official store —
// one safe place from which every app arrives. The scene puts a store tile
// (with shield = official) at the centre and four real-life app tiles around
// it (банка, карти, време, чат). Packets flow outward from the store toward
// each app to read as "installing". The банка tile shows a live progress bar
// to anchor the install action.

const CX = 450
const CY = 296
const R = 178

const apps = [
  { id: 'bank', label: 'Банка', color: '#10b981', angle: -90, labelY: -54 },
  { id: 'map', label: 'Карти', color: '#22d3ee', angle: 0, labelY: 58 },
  { id: 'chat', label: 'Чат', color: '#a78bfa', angle: 90, labelY: 58 },
  { id: 'weather', label: 'Време', color: '#f59e0b', angle: 180, labelY: 58 },
].map((a) => {
  const rad = (a.angle * Math.PI) / 180
  return { ...a, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

function renderAppIcon(id, color) {
  switch (id) {
    case 'bank':
      return (
        <g stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round">
          <path d="M -12 -6 L 0 -12 L 12 -6" />
          <line x1="-12" y1="-6" x2="12" y2="-6" />
          <line x1="-9" y1="-4" x2="-9" y2="8" />
          <line x1="-3" y1="-4" x2="-3" y2="8" />
          <line x1="3" y1="-4" x2="3" y2="8" />
          <line x1="9" y1="-4" x2="9" y2="8" />
          <line x1="-13" y1="10" x2="13" y2="10" />
        </g>
      )
    case 'map':
      return (
        <g stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 0 -12 C -6 -12 -9 -7 -9 -3 C -9 4 0 12 0 12 C 0 12 9 4 9 -3 C 9 -7 6 -12 0 -12 Z" />
          <circle cx="0" cy="-3" r="3" fill={color} stroke="none" />
        </g>
      )
    case 'chat':
      return (
        <g stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -12 -8 Q -12 -12 -8 -12 L 8 -12 Q 12 -12 12 -8 L 12 4 Q 12 8 8 8 L -4 8 L -10 12 L -8 8 Q -12 8 -12 4 Z" fill={color} fillOpacity="0.15" />
          <circle cx="-4" cy="-2" r="1.1" fill={color} stroke="none" />
          <circle cx="0" cy="-2" r="1.1" fill={color} stroke="none" />
          <circle cx="4" cy="-2" r="1.1" fill={color} stroke="none" />
        </g>
      )
    case 'weather':
      return (
        <g stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="4" cy="-4" r="4" fill={color} fillOpacity="0.25" />
          <path d="M -10 4 Q -12 -2 -6 -3 Q -4 -8 2 -7 Q 9 -7 9 0 Q 13 0 12 5 L -8 5 Q -12 5 -10 4 Z" fill={color} fillOpacity="0.18" />
        </g>
      )
    default:
      return null
  }
}

export default function Scene_4_4() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s44-core-grad">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.42" />
            <stop offset="75%" stopColor="#1e3a8a" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s44-awning" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <filter id="s44-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient rotating rings */}
        <circle cx={CX} cy={CY} r="252" fill="none" stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 10">
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="58s" repeatCount="indefinite"
          />
        </circle>
        <circle cx={CX} cy={CY} r="226" fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 14" opacity="0.55">
          <animateTransform
            attributeName="transform" type="rotate"
            from={`360 ${CX} ${CY}`} to={`0 ${CX} ${CY}`}
            dur="48s" repeatCount="indefinite"
          />
        </circle>

        {/* Connections store → app, traveling install packet */}
        {apps.map((a, i) => (
          <g key={`link-${a.id}`}>
            <line
              x1={CX} y1={CY} x2={a.x} y2={a.y}
              stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.55"
            >
              <animate
                attributeName="stroke-dashoffset" from="10" to="0"
                dur="2s" repeatCount="indefinite"
              />
            </line>
            <circle r="3.6" fill={a.color} filter="url(#s44-glow)">
              <animateMotion
                dur={`${4.4 + i * 0.4}s`} repeatCount="indefinite"
                path={`M ${CX} ${CY} L ${a.x} ${a.y}`}
              />
            </circle>
            <circle r="2.2" fill={a.color} opacity="0.7">
              <animateMotion
                dur={`${4.4 + i * 0.4}s`} begin={`${1.6 + i * 0.2}s`} repeatCount="indefinite"
                path={`M ${CX} ${CY} L ${a.x} ${a.y}`}
              />
            </circle>
          </g>
        ))}

        {/* Halo around hub */}
        <circle cx={CX} cy={CY} r="112" fill="url(#s44-core-grad)" />

        {/* Central store tile */}
        <g transform={`translate(${CX} ${CY})`}>
          {/* expanding rings = safe-zone breathing */}
          {[0, 1.6, 3.2].map((d, i) => (
            <circle key={i} r="58" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="58;108" dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.45;0" dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* store card */}
          <g filter="url(#s44-glow)">
            <rect x="-50" y="-46" width="100" height="92" rx="14" fill="#0b1220" stroke="#60a5fa" strokeWidth="2.2">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="3.6s" repeatCount="indefinite" />
            </rect>
            {/* awning */}
            <path d="M -50 -28 L 50 -28 L 50 -46 Q 50 -50 46 -50 L -46 -50 Q -50 -50 -50 -46 Z" fill="url(#s44-awning)" opacity="0.85" />
            {/* awning stripes */}
            <line x1="-30" y1="-50" x2="-30" y2="-28" stroke="#1e3a8a" strokeWidth="1.2" opacity="0.7" />
            <line x1="-10" y1="-50" x2="-10" y2="-28" stroke="#1e3a8a" strokeWidth="1.2" opacity="0.7" />
            <line x1="10" y1="-50" x2="10" y2="-28" stroke="#1e3a8a" strokeWidth="1.2" opacity="0.7" />
            <line x1="30" y1="-50" x2="30" y2="-28" stroke="#1e3a8a" strokeWidth="1.2" opacity="0.7" />
            {/* awning bottom edge ripple */}
            <path d="M -50 -28 L -42 -22 L -34 -28 L -26 -22 L -18 -28 L -10 -22 L -2 -28 L 6 -22 L 14 -28 L 22 -22 L 30 -28 L 38 -22 L 46 -28 L 50 -28" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.6" />
          </g>

          {/* shield with checkmark — official / safe */}
          <g transform="translate(0 10)">
            <path
              d="M 0 -16 L 18 -10 L 18 6 Q 18 18 0 24 Q -18 18 -18 6 L -18 -10 Z"
              fill="#10b981" fillOpacity="0.2" stroke="#34d399" strokeWidth="1.8"
              filter="url(#s44-glow)"
            >
              <animate attributeName="stroke-opacity" values="0.65;1;0.65" dur="3.2s" repeatCount="indefinite" />
            </path>
            <path
              d="M -7 3 L -1 9 L 9 -3"
              fill="none" stroke="#34d399" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
            />
          </g>

          {/* hub label */}
          <text
            x="0" y="76" textAnchor="middle"
            fill="#e2e8f0" fontSize="13" fontWeight="700"
            style={{ letterSpacing: '0.22em' }}
          >
            МАГАЗИН
          </text>
          <text
            x="0" y="92" textAnchor="middle"
            fill="#94a3b8" fontSize="10"
            style={{ letterSpacing: '0.14em' }}
          >
            Google Play · App Store
          </text>
        </g>

        {/* Satellite app tiles */}
        {apps.map((a, i) => (
          <g key={a.id} transform={`translate(${a.x} ${a.y})`}>
            {/* pulsing rings */}
            <circle r="40" fill="none" stroke={a.color} strokeWidth="1" opacity="0">
              <animate attributeName="r" values="40;70" dur="4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
            </circle>
            <circle r="40" fill="none" stroke={a.color} strokeWidth="1" opacity="0">
              <animate attributeName="r" values="40;70" dur="4s" begin={`${i * 0.6 + 2}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="4s" begin={`${i * 0.6 + 2}s`} repeatCount="indefinite" />
            </circle>

            {/* app tile (rounded square — app icon shape) */}
            <rect x="-32" y="-32" width="64" height="64" rx="14" fill="#0b1220" stroke={a.color} strokeWidth="2" filter="url(#s44-glow)">
              <animate
                attributeName="stroke-opacity"
                values="0.55;1;0.55"
                dur={`${3.4 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </rect>

            {/* icon */}
            {renderAppIcon(a.id, a.color)}

            {/* install progress bar — only on bank tile, the focal example */}
            {a.id === 'bank' && (
              <g transform="translate(0 24)">
                <rect x="-22" y="-2" width="44" height="4" rx="2" fill="#1e293b" />
                <rect x="-22" y="-2" width="0" height="4" rx="2" fill={a.color}>
                  <animate attributeName="width" values="0;44;44;0" keyTimes="0;0.7;0.9;1" dur="5s" repeatCount="indefinite" />
                </rect>
              </g>
            )}

            {/* label chip */}
            <g transform={`translate(0 ${a.labelY})`}>
              <rect
                x="-38" y="-12" width="76" height="24" rx="12"
                fill="#0b1220" stroke={a.color} strokeWidth="0.9" opacity="0.94"
              />
              <text
                x="0" y="4" textAnchor="middle"
                fill="#e2e8f0" fontSize="13" fontWeight="700"
              >
                {a.label}
              </text>
            </g>
          </g>
        ))}

        {/* Bottom-right install button hint */}
        <g transform="translate(770 488)">
          <rect x="-58" y="-16" width="116" height="32" rx="16" fill="#10b981" fillOpacity="0.18" stroke="#34d399" strokeWidth="1.4" filter="url(#s44-glow)">
            <animate attributeName="stroke-opacity" values="0.65;1;0.65" dur="2.6s" repeatCount="indefinite" />
          </rect>
          <text x="0" y="5" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="700" style={{ letterSpacing: '0.12em' }}>
            ИНСТАЛИРАЙ
          </text>
        </g>
      </svg>
    </div>
  )
}
