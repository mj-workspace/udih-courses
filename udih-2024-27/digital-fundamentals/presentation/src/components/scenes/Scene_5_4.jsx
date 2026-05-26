// Scene 5.4 — Етикет при онлайн срещи
// Pattern: annotated mock — a single "my" video tile in the centre with four
// orbiting etiquette badges (mic, camera, background+light, courtesy). Each
// badge has its own icon and a pulsing status mark that demonstrates the rule.

const CX = 450
const CY = 290

// Central video tile
const TW = 240
const TH = 168
const TX = CX - TW / 2
const TY = CY - TH / 2

// Satellite badges at R=205 around the tile
const R = 205
const badges = [
  { id: 'mic',   label: 'Микрофон', sub: 'mute по подразбиране', color: '#10b981', angle: -90 },
  { id: 'cam',   label: 'Камера',   sub: 'по преценка',          color: '#22d3ee', angle: 0   },
  { id: 'light', label: 'Фон + светлина', sub: 'огледай преди',  color: '#f59e0b', angle: 90  },
  { id: 'etiq',  label: 'Учтивост', sub: 'време • име • ред',    color: '#a78bfa', angle: 180 },
].map((b) => {
  const rad = (b.angle * Math.PI) / 180
  return { ...b, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

// Edge anchor on the tile rectangle in the direction of the badge
function tileAnchor(angle) {
  const rad = (angle * Math.PI) / 180
  const dx = Math.cos(rad)
  const dy = Math.sin(rad)
  // ray from tile centre to badge — clip at rectangle edge
  const tx = (TW / 2) / Math.abs(dx || 0.0001)
  const ty = (TH / 2) / Math.abs(dy || 0.0001)
  const t = Math.min(tx, ty)
  return { x: CX + dx * t, y: CY + dy * t }
}

export default function Scene_5_4() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s54-tile" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0f172a" />
            <stop offset="100%" stopColor="#06101f" />
          </linearGradient>
          <radialGradient id="s54-halo">
            <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.22" />
            <stop offset="70%"  stopColor="#1e3a8a" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s54-face">
            <stop offset="0%"   stopColor="#93c5fd" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.5" />
          </radialGradient>
          <filter id="s54-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ============================================================ */}
        {/* Ambient                                                       */}
        {/* ============================================================ */}
        <circle cx={CX} cy={CY} r="270" fill="url(#s54-halo)" />

        {/* Slow rotating dashed ring */}
        <ellipse
          cx={CX} cy={CY} rx="340" ry="230" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 11"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="62s" repeatCount="indefinite"
          />
        </ellipse>

        {/* ============================================================ */}
        {/* Badge connections (tile edge → badge), with pulsing dash      */}
        {/* ============================================================ */}
        {badges.map((b, i) => {
          const a = tileAnchor(b.angle)
          return (
            <g key={`link-${b.id}`}>
              <line
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={b.color} strokeOpacity="0.45" strokeWidth="1"
                strokeDasharray="4 6"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="10" to="0" dur="2s" repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  values="0.25;0.7;0.25"
                  dur="3.4s" begin={`${i * 0.7}s`} repeatCount="indefinite"
                />
              </line>
            </g>
          )
        })}

        {/* ============================================================ */}
        {/* Central "my" video tile                                       */}
        {/* ============================================================ */}
        <g>
          {/* Tile background */}
          <rect
            x={TX} y={TY} width={TW} height={TH} rx="10"
            fill="url(#s54-tile)"
            stroke="#60a5fa" strokeWidth="2"
            filter="url(#s54-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.55;1;0.55" dur="3.2s" repeatCount="indefinite"
            />
          </rect>

          {/* Person silhouette — head + shoulders */}
          <g>
            <circle cx={CX} cy={CY - 8} r="22" fill="url(#s54-face)" />
            <path
              d={`M ${CX - 56} ${TY + TH - 4}
                  Q ${CX} ${CY + 24} ${CX + 56} ${TY + TH - 4}
                  L ${CX + 56} ${TY + TH}
                  L ${CX - 56} ${TY + TH}
                  Z`}
              fill="#3b82f6" opacity="0.55"
            />
          </g>

          {/* Name tag — top-left */}
          <rect
            x={TX + 8} y={TY + 8} width="62" height="18" rx="3"
            fill="#0b1220" stroke="#475569" strokeWidth="0.8"
          />
          <text
            x={TX + 14} y={TY + 21}
            fill="#e2e8f0" fontSize="11" fontWeight="600">
            Аз
          </text>

          {/* LIVE dot — bottom-left */}
          <circle cx={TX + 14} cy={TY + TH - 14} r="3.2"
            fill="#ef4444" filter="url(#s54-glow)">
            <animate attributeName="opacity"
              values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <text
            x={TX + 22} y={TY + TH - 11}
            fill="#94a3b8" fontSize="9" fontWeight="700"
            style={{ letterSpacing: '0.14em' }}>
            LIVE
          </text>

          {/* Inline mic indicator (muted) — bottom-right */}
          <g transform={`translate(${TX + TW - 22} ${TY + TH - 16})`}>
            <rect x="-9" y="-10" width="18" height="14" rx="3"
              fill="#0b1220" stroke="#ef4444" strokeWidth="1" />
            <g transform="translate(0 -2)">
              <rect x="-2.4" y="-5" width="4.8" height="7" rx="2"
                fill="none" stroke="#ef4444" strokeWidth="1.1" />
              <path d="M -4 1.6 Q -4 4.6 0 4.6 Q 4 4.6 4 1.6"
                fill="none" stroke="#ef4444" strokeWidth="1.1" />
              <line x1="-5" y1="-6" x2="5" y2="5"
                stroke="#ef4444" strokeWidth="1.3" />
            </g>
          </g>
        </g>

        {/* ============================================================ */}
        {/* Satellite badges                                              */}
        {/* ============================================================ */}
        {badges.map((b, i) => (
          <g key={b.id} transform={`translate(${b.x} ${b.y})`}>
            {/* Pulse rings */}
            {[0, 1.6].map((d, k) => (
              <circle
                key={k} r="42" fill="none"
                stroke={b.color} strokeWidth="1" opacity="0"
              >
                <animate attributeName="r"
                  values="42;66" dur="3.6s"
                  begin={`${i * 0.5 + d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity"
                  values="0.5;0" dur="3.6s"
                  begin={`${i * 0.5 + d}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* Badge body */}
            <circle r="42" fill="#0b1220"
              stroke={b.color} strokeWidth="2"
              filter="url(#s54-glow)" />

            {/* Icon */}
            <g transform="translate(0 -6)">
              <BadgeIcon id={b.id} color={b.color} />
            </g>

            {/* Status mark — small ✓ that pulses */}
            <g transform="translate(22 -22)">
              <circle r="9" fill="#0b1220"
                stroke="#10b981" strokeWidth="1.2" />
              <path
                d="M -4 0 L -1 3 L 4 -3"
                fill="none" stroke="#10b981"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              >
                <animate
                  attributeName="stroke-opacity"
                  values="0.5;1;0.5"
                  dur="2.6s" begin={`${i * 0.4}s`} repeatCount="indefinite"
                />
              </path>
            </g>

            {/* Label */}
            <text x="0" y="22"
              textAnchor="middle"
              fill="#e2e8f0" fontSize="12.5" fontWeight="700">
              {b.label}
            </text>
            <text x="0" y="36"
              textAnchor="middle"
              fill="#94a3b8" fontSize="10" fontWeight="500">
              {b.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ---------- icons (drawn around 0,0) ----------

function BadgeIcon({ id, color }) {
  switch (id) {
    case 'mic':   return <MicIcon  color={color} />
    case 'cam':   return <CamIcon  color={color} />
    case 'light': return <LightIcon color={color} />
    case 'etiq':  return <HandIcon color={color} />
    default: return null
  }
}

function MicIcon({ color }) {
  return (
    <g>
      <rect x="-5" y="-12" width="10" height="16" rx="4.6"
        fill="none" stroke={color} strokeWidth="1.6" />
      <path d="M -9 0 Q -9 8 0 8 Q 9 8 9 0"
        fill="none" stroke={color} strokeWidth="1.6" />
      <line x1="0" y1="8" x2="0" y2="13"
        stroke={color} strokeWidth="1.6" />
      <line x1="-7" y1="-2" x2="7" y2="2"
        stroke={color} strokeWidth="1.4" opacity="0.85" />
    </g>
  )
}

function CamIcon({ color }) {
  return (
    <g>
      <rect x="-11" y="-7" width="18" height="14" rx="2.4"
        fill="none" stroke={color} strokeWidth="1.6" />
      <path d="M 7 -3 L 13 -7 L 13 7 L 7 3 Z"
        fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <circle r="1.6" cx="-4" cy="0" fill={color}>
        <animate attributeName="opacity"
          values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </g>
  )
}

function LightIcon({ color }) {
  // sun + window-frame mash-up: rays + a soft square (background)
  return (
    <g>
      {/* background frame */}
      <rect x="-12" y="-12" width="24" height="24" rx="2.4"
        fill="none" stroke={color} strokeWidth="1.3" opacity="0.55" />
      <line x1="-12" y1="0" x2="12" y2="0"
        stroke={color} strokeWidth="1" opacity="0.45" />
      <line x1="0" y1="-12" x2="0" y2="12"
        stroke={color} strokeWidth="1" opacity="0.45" />
      {/* sun */}
      <circle r="5" fill="none" stroke={color} strokeWidth="1.8">
        <animate attributeName="r"
          values="5;6;5" dur="3s" repeatCount="indefinite" />
      </circle>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180
        const x1 = Math.cos(rad) * 7.6
        const y1 = Math.sin(rad) * 7.6
        const x2 = Math.cos(rad) * 10.4
        const y2 = Math.sin(rad) * 10.4
        return (
          <line
            key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={color} strokeWidth="1.6" strokeLinecap="round"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.4;1;0.4"
              dur="2.8s" begin={`${i * 0.18}s`}
              repeatCount="indefinite"
            />
          </line>
        )
      })}
    </g>
  )
}

function HandIcon({ color }) {
  // raised hand — finger up, palm; with a subtle wave animation
  return (
    <g>
      <g>
        <animateTransform
          attributeName="transform" type="rotate"
          values="-6 0 8; 6 0 8; -6 0 8"
          dur="3.4s" repeatCount="indefinite"
        />
        {/* palm */}
        <rect x="-7" y="-2" width="14" height="12" rx="3.4"
          fill="none" stroke={color} strokeWidth="1.6" />
        {/* fingers */}
        <line x1="-4.5" y1="-2" x2="-4.5" y2="-10"
          stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="-1.5" y1="-2" x2="-1.5" y2="-12"
          stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="1.5" y1="-2" x2="1.5" y2="-11"
          stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="4.5" y1="-2" x2="4.5" y2="-9"
          stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        {/* thumb */}
        <path d="M -7 3 Q -11 5 -8 9"
          fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      </g>
    </g>
  )
}
