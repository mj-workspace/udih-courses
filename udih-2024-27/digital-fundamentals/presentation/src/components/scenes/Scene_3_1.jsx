// Scene 3.1 — Имейл и основни платформи
// Pattern: hub & orbit — a central "letter card" showing the anatomy of an
// email address (user @ domain, with the @ glowing as the key separator),
// surrounded by five platform satellites: Gmail, Outlook, abv.bg, the
// encrypted pair (Tuta · Proton), and a temporary mailbox.

const CX = 450
const CY = 290

// Envelope card
const ENV_W = 280
const ENV_H = 150
const ENV_X = CX - ENV_W / 2
const ENV_Y = CY - ENV_H / 2

// Platforms on an elliptical orbit around the envelope
// (wider horizontally so chips stay further from the central card without
// pushing the top satellite off the canvas).
const RX = 290
const RY = 200

const PLATFORMS = [
  {
    id: 'temp',
    angle: 210, // left
    color: '#94a3b8',
    label: 'Временна',
    sub: '10 минути',
    icon: 'clock',
  },
  {
    id: 'gmail',
    angle: 260, // top-left of right side
    color: '#ef4444',
    label: 'Gmail',
    sub: 'най-разпространена',
    icon: 'envelope',
  },
  {
    id: 'outlook',
    angle: 330, // top-right
    color: '#3b82f6',
    label: 'Outlook',
    sub: 'служебна поща',
    icon: 'envelope',
  },
  {
    id: 'abv',
    angle: 40, // right-bottom
    color: '#f59e0b',
    label: 'abv.bg',
    sub: 'остаряла',
    icon: 'warning',
  },
  {
    id: 'secure',
    angle: 115, // bottom-left
    color: '#10b981',
    label: 'Tuta · Proton',
    sub: 'криптирани',
    icon: 'lock',
  },
].map((p) => {
  const rad = (p.angle * Math.PI) / 180
  return { ...p, x: CX + RX * Math.cos(rad), y: CY + RY * Math.sin(rad) }
})

// Anchor point on envelope edge closest to a given platform
function envelopeAnchor(px, py) {
  // clamp the line from envelope centre to platform at the envelope rect
  const dx = px - CX
  const dy = py - CY
  const halfW = ENV_W / 2
  const halfH = ENV_H / 2
  const tx = halfW / Math.abs(dx || 0.0001)
  const ty = halfH / Math.abs(dy || 0.0001)
  const t = Math.min(tx, ty)
  return { x: CX + dx * t, y: CY + dy * t }
}

function PlatformIcon({ kind, color }) {
  if (kind === 'lock') {
    return (
      <g>
        <rect x="-5" y="-2" width="10" height="9" rx="1.4" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M -3 -2 V -5 a 3 3 0 0 1 6 0 V -2" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </g>
    )
  }
  if (kind === 'clock') {
    return (
      <g>
        <circle r="6.5" fill="none" stroke={color} strokeWidth="1.4" />
        <line x1="0" y1="0" x2="0" y2="-4.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="0" y1="0" x2="3.5" y2="0" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      </g>
    )
  }
  if (kind === 'warning') {
    return (
      <g>
        <path d="M 0 -6.5 L 6.5 5 L -6.5 5 Z" fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
        <line x1="0" y1="-2.5" x2="0" y2="1.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="0" cy="3.5" r="0.9" fill={color} />
      </g>
    )
  }
  // envelope
  return (
    <g>
      <rect x="-7" y="-4.5" width="14" height="9" rx="1.2" fill="none" stroke={color} strokeWidth="1.4" />
      <path d="M -7 -4.5 L 0 1 L 7 -4.5" fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    </g>
  )
}

export default function Scene_3_1() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s31-env-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#0b1220" />
          </linearGradient>
          <radialGradient id="s31-at-grad">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#0e7490" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0e7490" stopOpacity="0" />
          </radialGradient>
          <filter id="s31-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="s31-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ============ Ambient ============ */}
        <circle
          cx={CX} cy={CY} r="305" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 9"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="56s" repeatCount="indefinite"
          />
        </circle>
        <circle
          cx={CX} cy={CY} r="270" fill="none"
          stroke="#0f172a" strokeWidth="0.6"
        />
        <circle
          cx={CX} cy={CY} r="200" fill="none"
          stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 6"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`360 ${CX} ${CY}`} to={`0 ${CX} ${CY}`}
            dur="38s" repeatCount="indefinite"
          />
        </circle>

        {/* Drifting `@` particles in the background */}
        {[
          { x: 130, y: 110, d: 0 },
          { x: 760, y: 90, d: 1.4 },
          { x: 800, y: 470, d: 2.6 },
          { x: 110, y: 440, d: 0.8 },
        ].map((p, i) => (
          <text
            key={`s31-bg-at-${i}`}
            x={p.x} y={p.y}
            fill="#1e293b" fontSize="20" fontWeight="700"
            style={{ fontFamily: 'monospace' }}
          >
            @
            <animate
              attributeName="opacity" values="0.25;0.7;0.25"
              dur="6s" begin={`${p.d}s`} repeatCount="indefinite"
            />
          </text>
        ))}

        {/* ============ Connection lines + traveling packets ============ */}
        {PLATFORMS.map((p, i) => {
          const a = envelopeAnchor(p.x, p.y)
          return (
            <g key={`s31-link-${p.id}`}>
              <line
                x1={a.x} y1={a.y} x2={p.x} y2={p.y}
                stroke={p.color} strokeWidth="1" strokeDasharray="4 6"
                opacity="0.35"
              >
                <animate
                  attributeName="stroke-dashoffset" from="10" to="0"
                  dur="2.2s" repeatCount="indefinite"
                />
              </line>
              <circle r="3.4" fill={p.color} filter="url(#s31-glow)" opacity="0.9">
                <animateMotion
                  dur={`${4.8 + i * 0.4}s`} begin={`${i * 0.5}s`} repeatCount="indefinite"
                  path={`M ${a.x} ${a.y} L ${p.x} ${p.y}`}
                />
              </circle>
            </g>
          )
        })}

        {/* ============ Central envelope card ============ */}
        {/* outer soft halo */}
        <rect
          x={ENV_X - 8} y={ENV_Y - 8} width={ENV_W + 16} height={ENV_H + 16} rx="14"
          fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.15"
          filter="url(#s31-soft)"
        />
        {/* card body */}
        <rect
          x={ENV_X} y={ENV_Y} width={ENV_W} height={ENV_H} rx="10"
          fill="url(#s31-env-grad)" stroke="#3b82f6" strokeWidth="1.4"
          filter="url(#s31-glow)"
        >
          <animate
            attributeName="stroke-opacity" values="0.65;1;0.65"
            dur="4.2s" repeatCount="indefinite"
          />
        </rect>
        {/* top flap suggestion */}
        <path
          d={`M ${ENV_X} ${ENV_Y + 14} L ${CX} ${ENV_Y + 50} L ${ENV_X + ENV_W} ${ENV_Y + 14}`}
          fill="none" stroke="#1e293b" strokeWidth="1"
        />
        {/* card header label */}
        <text
          x={CX} y={ENV_Y + 22} textAnchor="middle"
          fill="#64748b" fontSize="9.5" fontWeight="700"
          style={{ letterSpacing: '0.32em' }}
        >
          ИМЕЙЛ АДРЕС
        </text>

        {/* anatomy mini-labels above each part */}
        <text
          x={CX - 100} y={ENV_Y + 58} textAnchor="middle"
          fill="#94a3b8" fontSize="9.5"
        >
          потребител
        </text>
        <text
          x={CX} y={ENV_Y + 58} textAnchor="middle"
          fill="#22d3ee" fontSize="9.5" fontWeight="700"
          style={{ letterSpacing: '0.1em' }}
        >
          кльомба
        </text>
        <text
          x={CX + 100} y={ENV_Y + 58} textAnchor="middle"
          fill="#94a3b8" fontSize="9.5"
        >
          домейн
        </text>

        {/* tick marks under labels */}
        <line x1={CX - 100} y1={ENV_Y + 64} x2={CX - 100} y2={ENV_Y + 72} stroke="#475569" strokeWidth="1" />
        <line x1={CX} y1={ENV_Y + 64} x2={CX} y2={ENV_Y + 72} stroke="#22d3ee" strokeWidth="1" opacity="0.7" />
        <line x1={CX + 100} y1={ENV_Y + 64} x2={CX + 100} y2={ENV_Y + 72} stroke="#475569" strokeWidth="1" />

        {/* The address itself: ivan.petrov  @  gmail.com */}
        <g style={{ fontFamily: 'monospace', letterSpacing: '0.04em' }}>
          <text
            x={CX - 18} y={ENV_Y + 100} textAnchor="end"
            fill="#e2e8f0" fontSize="18" fontWeight="600"
          >
            ivan.petrov
          </text>
          <text
            x={CX + 18} y={ENV_Y + 100} textAnchor="start"
            fill="#e2e8f0" fontSize="18" fontWeight="600"
          >
            gmail.com
          </text>
        </g>

        {/* @ in a glowing cyan circle */}
        <g transform={`translate(${CX} ${ENV_Y + 94})`}>
          <circle r="26" fill="url(#s31-at-grad)" />
          {[0, 1.4, 2.8].map((d, i) => (
            <circle
              key={`s31-at-ring-${i}`} r="16" fill="none"
              stroke="#22d3ee" strokeWidth="1" opacity="0"
            >
              <animate attributeName="r" values="16;30" dur="4.2s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.55;0" dur="4.2s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <circle r="16" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.8" filter="url(#s31-glow)" />
          <text
            x="0" y="6" textAnchor="middle"
            fill="#22d3ee" fontSize="20" fontWeight="800"
            style={{ fontFamily: 'monospace' }}
          >
            @
          </text>
        </g>

        {/* envelope footer hint — faint subject/body lines */}
        <line x1={ENV_X + 24} y1={ENV_Y + ENV_H - 28} x2={ENV_X + ENV_W - 24} y2={ENV_Y + ENV_H - 28} stroke="#1e293b" strokeWidth="1" />
        <line x1={ENV_X + 24} y1={ENV_Y + ENV_H - 18} x2={ENV_X + ENV_W - 80} y2={ENV_Y + ENV_H - 18} stroke="#1e293b" strokeWidth="1" />

        {/* ============ Platform satellites ============ */}
        {PLATFORMS.map((p, i) => (
          <g key={`s31-plat-${p.id}`} transform={`translate(${p.x} ${p.y})`}>
            {/* pulsing rings */}
            {[0, 1.6].map((d, k) => (
              <circle
                key={`s31-ring-${p.id}-${k}`} r="42" fill="none"
                stroke={p.color} strokeWidth="1" opacity="0"
              >
                <animate
                  attributeName="r" values="42;62"
                  dur="4.4s" begin={`${i * 0.5 + d}s`} repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity" values="0.5;0"
                  dur="4.4s" begin={`${i * 0.5 + d}s`} repeatCount="indefinite"
                />
              </circle>
            ))}
            {/* chip card */}
            <rect
              x="-72" y="-28" width="144" height="56" rx="9"
              fill="#0b1220" stroke={p.color} strokeWidth="1.6"
              filter="url(#s31-glow)"
            />
            {/* icon */}
            <g transform="translate(-52 0)">
              <PlatformIcon kind={p.icon} color={p.color} />
            </g>
            {/* label */}
            <text
              x="-36" y="-4" fill="#e2e8f0" fontSize="13" fontWeight="700"
            >
              {p.label}
            </text>
            {/* sub */}
            <text
              x="-36" y="13" fill="#94a3b8" fontSize="10"
            >
              {p.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
