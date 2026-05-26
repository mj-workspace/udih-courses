// Scene 6.9 — Настройки за поверителност
// Pattern: hub & orbit — a central shield+lock ("Поверителност") with four
// satellite badges, each visualising one of the four protections discussed
// in the guide: who sees posts, tag review, who can message, where to find
// the menu.

const CX = 450
const CY = 290
const R = 195

const badges = [
  { id: 'audience', label: 'Аудитория',  sub: 'кой вижда',     color: '#3b82f6', angle: -90 },
  { id: 'tags',     label: 'Тагове',     sub: 'преглед преди', color: '#10b981', angle: 0   },
  { id: 'msg',      label: 'Съобщения',  sub: 'само приятели', color: '#f59e0b', angle: 90  },
  { id: 'menu',     label: 'Достъп',     sub: 'снимка → меню', color: '#a78bfa', angle: 180 },
].map((b) => {
  const rad = (b.angle * Math.PI) / 180
  return { ...b, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

export default function Scene_6_9() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s69-halo">
            <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.28" />
            <stop offset="70%"  stopColor="#1e3a8a" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s69-shield" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1e3a8a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0b1220" stopOpacity="0.9" />
          </linearGradient>
          <filter id="s69-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient halo + slow rotating dashed ring */}
        <circle cx={CX} cy={CY} r="250" fill="url(#s69-halo)" />
        <ellipse
          cx={CX} cy={CY} rx="310" ry="220" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 11"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="60s" repeatCount="indefinite"
          />
        </ellipse>

        {/* Connector lines shield → badge with traveling packet */}
        {badges.map((b, i) => (
          <g key={`link-${b.id}`}>
            <line
              x1={CX} y1={CY} x2={b.x} y2={b.y}
              stroke={b.color} strokeOpacity="0.4" strokeWidth="1"
              strokeDasharray="4 6"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="10" to="0" dur="2s" repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                values="0.2;0.65;0.2"
                dur="3.4s" begin={`${i * 0.7}s`} repeatCount="indefinite"
              />
            </line>
            <circle r="3.4" fill={b.color} filter="url(#s69-glow)">
              <animateMotion
                dur={`${4.6 + i * 0.4}s`} repeatCount="indefinite"
                path={`M ${CX} ${CY} L ${b.x} ${b.y}`}
              />
            </circle>
          </g>
        ))}

        {/* Central shield + lock */}
        <g transform={`translate(${CX} ${CY})`}>
          {/* Expanding rings */}
          {[0, 1.6, 3.2].map((d, k) => (
            <circle key={k} r="60" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="60;115" dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.35;0" dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Shield body */}
          <path
            d="M 0 -56 L 46 -38 L 46 6 Q 46 42 0 66 Q -46 42 -46 6 L -46 -38 Z"
            fill="url(#s69-shield)"
            stroke="#60a5fa" strokeWidth="2.5"
            filter="url(#s69-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.55;1;0.55" dur="3.4s" repeatCount="indefinite"
            />
          </path>

          {/* Scan line across shield */}
          <line
            x1="-44" y1="0" x2="44" y2="0"
            stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.5"
          >
            <animate attributeName="y1" values="-50;58;-50" dur="6s" repeatCount="indefinite" />
            <animate attributeName="y2" values="-50;58;-50" dur="6s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0;0.6;0" dur="6s" repeatCount="indefinite" />
          </line>

          {/* Lock — shackle */}
          <path
            d="M -12 -10 L -12 -22 Q -12 -34 0 -34 Q 12 -34 12 -22 L 12 -10"
            fill="none" stroke="#93c5fd" strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Lock — body */}
          <rect
            x="-18" y="-10" width="36" height="30" rx="4"
            fill="#60a5fa" stroke="#bfdbfe" strokeWidth="1.2"
          />
          {/* Lock — keyhole */}
          <circle r="3.2" cx="0" cy="2" fill="#0b1220" />
          <rect x="-1.2" y="2" width="2.4" height="9" fill="#0b1220" />

          {/* Label below shield */}
          <text
            x="0" y="84" textAnchor="middle"
            fill="#94a3b8" fontSize="11" fontWeight="600"
            style={{ letterSpacing: '0.18em' }}
          >
            ПОВЕРИТЕЛНОСТ
          </text>
        </g>

        {/* Satellite badges */}
        {badges.map((b, i) => (
          <g key={b.id} transform={`translate(${b.x} ${b.y})`}>
            {/* Pulse rings */}
            {[0, 1.5].map((d, k) => (
              <circle key={k} r="46" fill="none" stroke={b.color} strokeWidth="1" opacity="0">
                <animate attributeName="r" values="46;72" dur="3.8s" begin={`${i * 0.5 + d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.45;0" dur="3.8s" begin={`${i * 0.5 + d}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* Badge disc */}
            <circle r="46" fill="#0b1220" stroke={b.color} strokeWidth="2" filter="url(#s69-glow)" />

            {/* Icon */}
            <g transform="translate(0 -8)">
              <BadgeIcon id={b.id} color={b.color} />
            </g>

            {/* Status check */}
            <g transform="translate(26 -26)">
              <circle r="9" fill="#0b1220" stroke="#10b981" strokeWidth="1.2" />
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

            {/* Labels */}
            <text x="0" y="22" textAnchor="middle"
              fill="#e2e8f0" fontSize="12.5" fontWeight="700">
              {b.label}
            </text>
            <text x="0" y="36" textAnchor="middle"
              fill="#94a3b8" fontSize="10" fontWeight="500">
              {b.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ---------- badge icons (drawn around 0,0) ----------

function BadgeIcon({ id, color }) {
  switch (id) {
    case 'audience': return <AudienceIcon color={color} />
    case 'tags':     return <TagIcon color={color} />
    case 'msg':      return <MsgIcon color={color} />
    case 'menu':     return <MenuIcon color={color} />
    default: return null
  }
}

// Three concentric rings: outer dashed = public, middle = friends (highlighted),
// inner dot = only-me. A small lock floats on the middle ring to mark "selected".
function AudienceIcon({ color }) {
  return (
    <g>
      {/* Public — outer dashed */}
      <circle r="14" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="2 3" />
      {/* Friends — middle solid (highlighted) */}
      <circle r="9" fill="none" stroke={color} strokeWidth="2">
        <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="2.6s" repeatCount="indefinite" />
      </circle>
      {/* Only me — inner dot */}
      <circle r="3" fill={color} opacity="0.85" />
      {/* Selector tick travelling around the friends ring */}
      <circle r="2.4" fill={color} filter="url(#s69-glow)">
        <animateMotion
          dur="6s" repeatCount="indefinite"
          path="M 0 -9 A 9 9 0 1 1 -0.01 -9 Z"
        />
      </circle>
    </g>
  )
}

// Name tag with a "?" turning into "✓" — approve-before-post.
function TagIcon({ color }) {
  return (
    <g>
      {/* Tag shape */}
      <path
        d="M -16 -7 L 4 -7 L 14 3 L 4 13 L -16 13 Z"
        fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round"
      />
      {/* Hole */}
      <circle cx="-12" cy="3" r="1.6" fill={color} />
      {/* Glyph inside — "?" fading, "✓" appearing */}
      <text
        x="-3" y="7" textAnchor="middle"
        fill={color} fontSize="11" fontWeight="700"
      >
        ?
        <animate attributeName="opacity" values="1;1;0;0" dur="3.2s" repeatCount="indefinite" />
      </text>
      <path
        d="M -7 3 L -4 6 L 1 0"
        fill="none" stroke="#10b981"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      >
        <animate attributeName="opacity" values="0;0;1;1" dur="3.2s" repeatCount="indefinite" />
      </path>
    </g>
  )
}

// Chat bubble being filtered: a friend bubble passes through, a stranger
// bubble bounces off the shield.
function MsgIcon({ color }) {
  return (
    <g>
      {/* Big chat bubble outline */}
      <path
        d="M -15 -8 Q -15 -13 -10 -13 L 10 -13 Q 15 -13 15 -8 L 15 4 Q 15 9 10 9 L -2 9 L -7 14 L -7 9 L -10 9 Q -15 9 -15 4 Z"
        fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round"
      />
      {/* Friend dot — passes through */}
      <circle r="2.4" fill="#10b981">
        <animateMotion
          dur="3.4s" repeatCount="indefinite"
          path="M -22 -4 L 0 -4"
        />
        <animate attributeName="opacity" values="1;1;0" dur="3.4s" keyTimes="0;0.85;1" repeatCount="indefinite" />
      </circle>
      {/* Stranger dot — bounces off */}
      <circle r="2.4" fill="#ef4444">
        <animateMotion
          dur="3.4s" begin="1.7s" repeatCount="indefinite"
          path="M 22 4 L 10 4 L 22 4"
        />
      </circle>
      {/* Small block sign on right edge */}
      <line
        x1="14" y1="-2" x2="20" y2="-2"
        stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round"
      >
        <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
      </line>
    </g>
  )
}

// Three-step path: avatar → gear → lock, with a traveling dot showing the route.
function MenuIcon({ color }) {
  return (
    <g>
      {/* Avatar */}
      <g transform="translate(-15 0)">
        <circle r="6" fill="none" stroke={color} strokeWidth="1.6" />
        <circle cx="0" cy="-1.5" r="2" fill={color} />
        <path d="M -3.5 4.5 Q 0 7 3.5 4.5" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      </g>

      {/* Gear (centre) */}
      <g transform="translate(1 0)">
        <g>
          <animateTransform
            attributeName="transform" type="rotate"
            from="0" to="360" dur="9s" repeatCount="indefinite"
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a, k) => {
            const rad = (a * Math.PI) / 180
            return (
              <rect
                key={k}
                x="-1.4" y="-9" width="2.8" height="3.6"
                rx="0.5" fill={color}
                transform={`rotate(${a})`}
              />
            )
          })}
          <circle r="6" fill="#0b1220" stroke={color} strokeWidth="1.4" />
          <circle r="2.2" fill={color} />
        </g>
      </g>

      {/* Lock (right) */}
      <g transform="translate(17 0)">
        <path
          d="M -3 -2 L -3 -6 Q -3 -9 0 -9 Q 3 -9 3 -6 L 3 -2"
          fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round"
        />
        <rect x="-4.5" y="-2" width="9" height="8" rx="1.2" fill={color} />
        <circle cx="0" cy="1.5" r="0.9" fill="#0b1220" />
      </g>

      {/* Arrow ticks between steps */}
      <path d="M -7 0 L -4 0" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
      <path d="M 9 0 L 12 0" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />

      {/* Travelling dot along path */}
      <circle r="1.8" fill={color} filter="url(#s69-glow)">
        <animateMotion
          dur="3.6s" repeatCount="indefinite"
          path="M -15 0 L 1 0 L 17 0"
        />
      </circle>
    </g>
  )
}
