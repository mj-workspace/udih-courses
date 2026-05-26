// Scene 4.3 — Основни настройки
// Pattern: hub & orbit. The lecturer-guide names the gear icon as the way you
// recognise Settings, then walks four entries (Wi-Fi, Bluetooth, Известия,
// Акаунт). The scene mirrors that: a rotating gear is the hub; the four key
// settings orbit around it with their own icon + colour.

const CX = 450
const CY = 292
const R = 162

const items = [
  { id: 'wifi', label: 'Wi-Fi', color: '#22d3ee', angle: 270, labelY: -50 },
  { id: 'bt', label: 'Bluetooth', color: '#3b82f6', angle: 0, labelY: 60 },
  { id: 'notif', label: 'Известия', color: '#f59e0b', angle: 90, labelY: 60 },
  { id: 'acct', label: 'Акаунт', color: '#a78bfa', angle: 180, labelY: 60 },
].map((n) => {
  const rad = (n.angle * Math.PI) / 180
  return { ...n, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

function renderIcon(id, color) {
  switch (id) {
    case 'wifi':
      return (
        <g stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round">
          <path d="M -16 -2 A 18 18 0 0 1 16 -2" />
          <path d="M -11 3 A 12 12 0 0 1 11 3" />
          <path d="M -5 8 A 6 6 0 0 1 5 8" />
          <circle cx="0" cy="14" r="1.8" fill={color} stroke="none" />
        </g>
      )
    case 'bt':
      return (
        <g stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -5 -7 L 5 6 L 0 11 L 0 -11 L 5 -6 L -5 7" />
        </g>
      )
    case 'notif':
      return (
        <g stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -10 6 Q -10 -10 0 -10 Q 10 -10 10 6 L 12 9 L -12 9 Z" fill={color} fillOpacity="0.18" />
          <path d="M -3 11 Q 0 15 3 11" fill="none" />
          <line x1="0" y1="-13" x2="0" y2="-11" />
        </g>
      )
    case 'acct':
      return (
        <g stroke={color} strokeWidth="2" fill="none" strokeLinecap="round">
          <circle cx="0" cy="-4" r="5.2" />
          <path d="M -10 13 Q -10 2 0 2 Q 10 2 10 13" />
        </g>
      )
    default:
      return null
  }
}

export default function Scene_4_3() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s43-core-grad">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.42" />
            <stop offset="75%" stopColor="#1e3a8a" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <filter id="s43-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient outer rings */}
        <circle cx={CX} cy={CY} r="248" fill="none" stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 10">
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="56s" repeatCount="indefinite"
          />
        </circle>
        <circle cx={CX} cy={CY} r="222" fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 14" opacity="0.55">
          <animateTransform
            attributeName="transform" type="rotate"
            from={`360 ${CX} ${CY}`} to={`0 ${CX} ${CY}`}
            dur="46s" repeatCount="indefinite"
          />
        </circle>

        {/* Connections hub → satellite, with traveling packet */}
        {items.map((n, i) => (
          <g key={`link-${n.id}`}>
            <line
              x1={CX} y1={CY} x2={n.x} y2={n.y}
              stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.55"
            >
              <animate
                attributeName="stroke-dashoffset" from="10" to="0"
                dur="2s" repeatCount="indefinite"
              />
            </line>
            <circle r="3.6" fill={n.color} filter="url(#s43-glow)">
              <animateMotion
                dur={`${4.6 + i * 0.4}s`} repeatCount="indefinite"
                path={`M ${CX} ${CY} L ${n.x} ${n.y}`}
              />
            </circle>
          </g>
        ))}

        {/* Halo around hub */}
        <circle cx={CX} cy={CY} r="108" fill="url(#s43-core-grad)" />

        {/* Central gear */}
        <g transform={`translate(${CX} ${CY})`}>
          {/* expanding rings */}
          {[0, 1.6, 3.2].map((d, i) => (
            <circle key={i} r="56" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="56;104" dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.45;0" dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Gear teeth — rotating group */}
          <g filter="url(#s43-glow)">
            <animateTransform
              attributeName="transform" type="rotate"
              from="0" to="360" dur="24s" repeatCount="indefinite"
            />
            {Array.from({ length: 8 }, (_, i) => (
              <polygon
                key={i}
                points="-8,-60 8,-60 6,-44 -6,-44"
                fill="#3b82f6"
                stroke="#60a5fa"
                strokeWidth="0.8"
                transform={`rotate(${i * 45})`}
              />
            ))}
          </g>

          {/* Gear body */}
          <circle r="48" fill="#0b1220" stroke="#60a5fa" strokeWidth="2.2" filter="url(#s43-glow)">
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="3.6s" repeatCount="indefinite" />
          </circle>
          <circle r="36" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.5" />
          <circle r="22" fill="none" stroke="#22d3ee" strokeWidth="1.4" opacity="0.85" />
          <circle r="9" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.2" />

          {/* Hub label */}
          <text
            x="0" y="84" textAnchor="middle"
            fill="#e2e8f0" fontSize="14" fontWeight="700"
            style={{ letterSpacing: '0.22em' }}
          >
            НАСТРОЙКИ
          </text>
        </g>

        {/* Satellites */}
        {items.map((n, i) => (
          <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
            {/* pulsing ring */}
            <circle r="40" fill="none" stroke={n.color} strokeWidth="1" opacity="0">
              <animate attributeName="r" values="40;70" dur="4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
            </circle>
            {/* second pulse */}
            <circle r="40" fill="none" stroke={n.color} strokeWidth="1" opacity="0">
              <animate attributeName="r" values="40;70" dur="4s" begin={`${i * 0.6 + 2}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="4s" begin={`${i * 0.6 + 2}s`} repeatCount="indefinite" />
            </circle>
            {/* disk */}
            <circle r="40" fill="#0b1220" stroke={n.color} strokeWidth="2" filter="url(#s43-glow)">
              <animate
                attributeName="stroke-opacity"
                values="0.55;1;0.55"
                dur={`${3.4 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
            {/* icon */}
            {renderIcon(n.id, n.color)}
            {/* label chip */}
            <g transform={`translate(0 ${n.labelY})`}>
              <rect
                x="-46" y="-12" width="92" height="24" rx="12"
                fill="#0b1220" stroke={n.color} strokeWidth="0.9" opacity="0.94"
              />
              <text
                x="0" y="4" textAnchor="middle"
                fill="#e2e8f0" fontSize="13" fontWeight="700"
              >
                {n.label}
              </text>
            </g>
          </g>
        ))}
      </svg>
    </div>
  )
}
