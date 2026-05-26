// Scene 4.9 — Сигурност на мобилните устройства
// Pattern: hub & orbit. A smartphone at the centre, wrapped in a glowing
// protective shield. Three defense badges orbit around it — the three
// pillars from the guide:
//   • Lock screen   (padlock with face / fingerprint / PIN mini-icons)
//   • Updates       (circular refresh arrow with v1 → v2 hint)
//   • Find My       (radar sweep with a location pin)
// Breathing rings + traveling protection packets tie the shield to each
// defense, saying "all three protect the same device".

const CX = 450
const CY = 290
const R = 178

const defenses = [
  { id: 'lock',   label: 'ЗАКЛЮЧВАНЕ',   color: '#60a5fa', glow: '#93c5fd', angle: -110 },
  { id: 'update', label: 'ОБНОВЯВАНЕ',   color: '#34d399', glow: '#6ee7b7', angle: -10 },
  { id: 'find',   label: 'НАМЕРИ ТЕЛЕФОНА', color: '#f59e0b', glow: '#fbbf24', angle: 100 },
].map((n) => {
  const rad = (n.angle * Math.PI) / 180
  return { ...n, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

function renderDefenseIcon(id, color) {
  switch (id) {
    case 'lock':
      return (
        <g>
          {/* shackle */}
          <path
            d="M -10 -4 L -10 -12 A 10 10 0 0 1 10 -12 L 10 -4"
            fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round"
          />
          {/* body */}
          <rect x="-14" y="-4" width="28" height="22" rx="3" fill="#0b1220" stroke={color} strokeWidth="2" />
          {/* tiny biometric dots inside: face / finger / PIN */}
          <circle cx="-7" cy="6" r="2" fill={color} fillOpacity="0.85" />
          <circle cx="0"  cy="6" r="2" fill={color} fillOpacity="0.85" />
          <circle cx="7"  cy="6" r="2" fill={color} fillOpacity="0.85" />
          <animate attributeName="opacity" values="0.95;1;0.95" dur="3.4s" repeatCount="indefinite" />
        </g>
      )
    case 'update':
      return (
        <g>
          {/* circular refresh arrow */}
          <path
            d="M -14 0 A 14 14 0 1 1 -7 12"
            fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform" type="rotate"
              from="0 0 0" to="360 0 0"
              dur="4.8s" repeatCount="indefinite"
            />
          </path>
          {/* arrow head */}
          <path d="M -14 0 L -10 -5 L -10 5 Z" fill={color}>
            <animateTransform
              attributeName="transform" type="rotate"
              from="0 0 0" to="360 0 0"
              dur="4.8s" repeatCount="indefinite"
            />
          </path>
          {/* version hint inside */}
          <text x="0" y="3" textAnchor="middle" fill="#e2e8f0" fontSize="8.5" fontWeight="700" style={{ fontFamily: 'monospace', letterSpacing: '0.08em' }}>
            v2
          </text>
        </g>
      )
    case 'find':
      return (
        <g>
          {/* radar rings */}
          {[0, 1.2, 2.4].map((d, i) => (
            <circle key={i} r="6" fill="none" stroke={color} strokeWidth="1" opacity="0">
              <animate attributeName="r" values="6;18" dur="3.6s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0" dur="3.6s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {/* radar sweep wedge */}
          <path d="M 0 0 L 16 0 A 16 16 0 0 1 11 11 Z" fill={color} fillOpacity="0.22">
            <animateTransform
              attributeName="transform" type="rotate"
              from="0 0 0" to="360 0 0"
              dur="3.8s" repeatCount="indefinite"
            />
          </path>
          {/* location pin */}
          <g transform="translate(0 -2)">
            <path d="M 0 -10 A 6 6 0 0 1 6 -4 C 6 0 0 8 0 8 C 0 8 -6 0 -6 -4 A 6 6 0 0 1 0 -10 Z" fill={color} stroke="#0b1220" strokeWidth="1" />
            <circle cx="0" cy="-4" r="2" fill="#0b1220" />
          </g>
        </g>
      )
    default:
      return null
  }
}

export default function Scene_4_9() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s49-shield-grad" cx="50%" cy="50%" r="60%">
            <stop offset="0%"  stopColor="#22d3ee" stopOpacity="0.32" />
            <stop offset="55%" stopColor="#1e3a8a" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s49-shield-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#1e3a8a" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0b1220" stopOpacity="0.92" />
          </linearGradient>
          <filter id="s49-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="s49-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient rotating outer rings */}
        <circle
          cx={CX} cy={CY} r="252"
          fill="none" stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 11"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="52s" repeatCount="indefinite"
          />
        </circle>
        <circle
          cx={CX} cy={CY} r="220"
          fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 14" opacity="0.55"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`360 ${CX} ${CY}`} to={`0 ${CX} ${CY}`}
            dur="42s" repeatCount="indefinite"
          />
        </circle>

        {/* Connecting lines from defenses → device, dashed flowing inward */}
        {defenses.map((n) => (
          <line
            key={`link-${n.id}`}
            x1={n.x} y1={n.y} x2={CX} y2={CY}
            stroke="#334155" strokeWidth="1" strokeDasharray="4 7" opacity="0.55"
          >
            <animate
              attributeName="stroke-dashoffset" from="11" to="0"
              dur="2.4s" repeatCount="indefinite"
            />
          </line>
        ))}

        {/* Protection packets traveling from each defense into the device */}
        {defenses.map((n, i) => (
          <g key={`pkt-${n.id}`}>
            <circle r="3.6" fill={n.color} filter="url(#s49-glow)">
              <animateMotion
                dur={`${4.6 + i * 0.4}s`} repeatCount="indefinite"
                path={`M ${n.x} ${n.y} L ${CX} ${CY}`}
              />
              <animate
                attributeName="opacity" values="0;1;1;0"
                keyTimes="0;0.15;0.85;1"
                dur={`${4.6 + i * 0.4}s`} repeatCount="indefinite"
              />
            </circle>
            <circle r="3.6" fill={n.color} filter="url(#s49-glow)">
              <animateMotion
                dur={`${4.6 + i * 0.4}s`} begin={`${2.3 + i * 0.2}s`} repeatCount="indefinite"
                path={`M ${n.x} ${n.y} L ${CX} ${CY}`}
              />
              <animate
                attributeName="opacity" values="0;1;1;0"
                keyTimes="0;0.15;0.85;1"
                dur={`${4.6 + i * 0.4}s`} begin={`${2.3 + i * 0.2}s`} repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* Central halo behind the shield */}
        <circle cx={CX} cy={CY} r="118" fill="url(#s49-shield-grad)" />

        {/* Breathing shield-shaped rings emanating outward */}
        {[0, 1.8, 3.6].map((d, i) => (
          <path
            key={i}
            d={shieldPath(CX, CY, 102)}
            fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0"
          >
            <animate attributeName="opacity" values="0.45;0" dur="5.4s" begin={`${d}s`} repeatCount="indefinite" />
            <animateTransform
              attributeName="transform" type="scale"
              additive="sum"
              values="1;1.35" dur="5.4s" begin={`${d}s`} repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform" type="translate"
              additive="sum"
              values={`0 0; ${-CX * 0.35} ${-CY * 0.35}`}
              dur="5.4s" begin={`${d}s`} repeatCount="indefinite"
            />
          </path>
        ))}

        {/* Central shield (the device's protection) */}
        <g filter="url(#s49-glow)">
          <path
            d={shieldPath(CX, CY, 102)}
            fill="url(#s49-shield-fill)"
            stroke="#22d3ee" strokeWidth="2.2"
          >
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Smartphone sitting inside the shield */}
        <g transform={`translate(${CX} ${CY + 4})`} filter="url(#s49-soft)">
          {/* phone body */}
          <rect
            x="-32" y="-56" width="64" height="112" rx="10"
            fill="#0b1220" stroke="#60a5fa" strokeWidth="2.2"
          >
            <animate attributeName="stroke-opacity" values="0.7;1;0.7" dur="3.4s" repeatCount="indefinite" />
          </rect>
          {/* screen */}
          <rect x="-26" y="-48" width="52" height="88" rx="3" fill="#0f172a" stroke="#1e293b" strokeWidth="0.6" />
          {/* notch */}
          <rect x="-6" y="-55" width="12" height="3" rx="1.5" fill="#1e293b" />
          {/* big padlock on screen — the "locked" state */}
          <g transform="translate(0 -8)">
            <path
              d="M -8 -3 L -8 -10 A 8 8 0 0 1 8 -10 L 8 -3"
              fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round"
            />
            <rect x="-12" y="-3" width="24" height="18" rx="2.5" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.8" />
            <circle cx="0" cy="5" r="2.2" fill="#22d3ee" />
            <rect x="-0.8" y="5" width="1.6" height="5" fill="#22d3ee" />
            <animate attributeName="opacity" values="0.85;1;0.85" dur="2.8s" repeatCount="indefinite" />
          </g>
          {/* hint text on screen below the lock */}
          <text x="0" y="22" textAnchor="middle" fill="#94a3b8" fontSize="6.5" style={{ letterSpacing: '0.18em', fontFamily: 'monospace' }}>
            LOCKED
          </text>
          {/* home indicator */}
          <rect x="-10" y="46" width="20" height="2" rx="1" fill="#334155" />
        </g>

        {/* Three defense badges around the device */}
        {defenses.map((n, i) => (
          <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
            {[0, 1.5].map((d, k) => (
              <circle key={k} r="40" fill="none" stroke={n.color} strokeWidth="1" opacity="0">
                <animate attributeName="r" values="40;70" dur="4.2s" begin={`${i * 0.5 + d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0" dur="4.2s" begin={`${i * 0.5 + d}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <circle r="40" fill="#0b1220" stroke={n.color} strokeWidth="2.2" filter="url(#s49-glow)">
              <animate attributeName="stroke-opacity" values="0.65;1;0.65" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>
            <g>{renderDefenseIcon(n.id, n.color)}</g>
            <text
              x="0" y="60" textAnchor="middle"
              fill="#e2e8f0" fontSize="11.5" fontWeight="700"
              style={{ letterSpacing: '0.22em' }}
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* Drifting ambient particles for life */}
        <g opacity="0.55">
          <circle r="2" fill="#22d3ee" filter="url(#s49-glow)">
            <animateMotion
              dur="28s" repeatCount="indefinite"
              path="M 100 110 Q 280 80 460 100 T 820 140"
            />
          </circle>
          <circle r="1.8" fill="#f59e0b" filter="url(#s49-glow)">
            <animateMotion
              dur="34s" repeatCount="indefinite"
              path="M 820 500 Q 600 510 380 495 T 80 500"
            />
          </circle>
          <circle r="1.6" fill="#60a5fa" filter="url(#s49-glow)">
            <animateMotion
              dur="40s" repeatCount="indefinite"
              path="M 130 360 Q 250 320 400 360 T 800 360"
            />
          </circle>
        </g>
      </svg>
    </div>
  )
}

// Classic shield silhouette centred at (cx,cy), `w` is half-width.
function shieldPath(cx, cy, w) {
  const top = cy - w * 1.1
  const sideY = cy - w * 0.3
  const curveY = cy + w * 0.5
  const bottom = cy + w * 1.25
  return (
    `M ${cx} ${top} ` +
    `L ${cx - w} ${sideY} ` +
    `L ${cx - w} ${curveY} ` +
    `Q ${cx - w} ${bottom} ${cx} ${bottom} ` +
    `Q ${cx + w} ${bottom} ${cx + w} ${curveY} ` +
    `L ${cx + w} ${sideY} Z`
  )
}
