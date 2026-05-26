// Scene 6.5 — Facebook отвътре: пет отделни кътчета около едно цяло
// Pattern: hub & orbit — централно „f" лого + 5 сателита
// (Емисия, Групи, Профил/Страница, Messenger, Реакции). Всеки със свой
// цвят и икона; връзките пулсират, малки пакети тръгват от центъра
// навън — показва, че всичко идва от едно място, но е разпределено.

const CX = 450
const CY = 290
const R = 200

const parts = [
  { id: 'feed',  label: 'Емисия',    sub: 'поток от публикации', color: '#3b82f6', angle: -90 },
  { id: 'grp',   label: 'Групи',     sub: 'общност по тема',     color: '#10b981', angle: -18 },
  { id: 'page',  label: 'Страница',  sub: 'организация',         color: '#a78bfa', angle: 54  },
  { id: 'msg',   label: 'Messenger', sub: 'лични съобщения',     color: '#22d3ee', angle: 126 },
  { id: 'react', label: 'Реакции',   sub: 'харесвам • коментар', color: '#f59e0b', angle: 198 },
].map((p) => {
  const rad = (p.angle * Math.PI) / 180
  return { ...p, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

export default function Scene_6_5() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s65-core-grad">
            <stop offset="0%"  stopColor="#60a5fa" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#1e3a8a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s65-halo">
            <stop offset="0%"  stopColor="#3b82f6" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#1e3a8a" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <filter id="s65-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ===== Ambient ===== */}
        <circle cx={CX} cy={CY} r="260" fill="url(#s65-halo)" />

        <circle
          cx={CX} cy={CY} r="245" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 11"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="56s" repeatCount="indefinite"
          />
        </circle>

        <circle
          cx={CX} cy={CY} r="280" fill="none"
          stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 14"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`360 ${CX} ${CY}`} to={`0 ${CX} ${CY}`}
            dur="78s" repeatCount="indefinite"
          />
        </circle>

        {/* ===== Connections hub → satellite, with a traveling packet ===== */}
        {parts.map((p, i) => (
          <g key={`link-${p.id}`}>
            <line
              x1={CX} y1={CY} x2={p.x} y2={p.y}
              stroke={p.color} strokeOpacity="0.4" strokeWidth="1"
              strokeDasharray="4 7"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="11" to="0" dur="2.2s" repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                values="0.22;0.65;0.22"
                dur="3.6s" begin={`${i * 0.6}s`} repeatCount="indefinite"
              />
            </line>
            <circle r="3.2" fill={p.color} filter="url(#s65-glow)">
              <animateMotion
                dur={`${4.6 + i * 0.4}s`} repeatCount="indefinite"
                path={`M ${CX} ${CY} L ${p.x} ${p.y}`}
              />
            </circle>
          </g>
        ))}

        {/* ===== Central hub: Facebook "f" ===== */}
        <g transform={`translate(${CX} ${CY})`}>
          <circle r="78" fill="url(#s65-core-grad)" />

          {/* Expanding pulse rings */}
          {[0, 1.6, 3.2].map((d, i) => (
            <circle key={i} r="50" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0">
              <animate
                attributeName="r" values="50;100"
                dur="4.8s" begin={`${d}s`} repeatCount="indefinite"
              />
              <animate
                attributeName="opacity" values="0.5;0"
                dur="4.8s" begin={`${d}s`} repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Core circle */}
          <circle
            r="50" fill="#1e3a8a"
            stroke="#3b82f6" strokeWidth="2.4"
            filter="url(#s65-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.6;1;0.6" dur="3.4s" repeatCount="indefinite"
            />
          </circle>

          {/* The "f" — drawn as a path, classic Facebook glyph */}
          <path
            d="M 8 -22
               L 8 -10
               L 20 -10
               L 18 2
               L 8 2
               L 8 28
               L -6 28
               L -6 2
               L -16 2
               L -16 -10
               L -6 -10
               L -6 -16
               Q -6 -28 8 -28
               L 20 -28
               L 20 -18
               L 14 -18
               Q 8 -18 8 -14
               Z"
            fill="#e2e8f0"
            opacity="0.95"
          />
        </g>

        {/* ===== Satellites ===== */}
        {parts.map((p, i) => (
          <g key={p.id} transform={`translate(${p.x} ${p.y})`}>
            {/* Pulse rings */}
            {[0, 1.5].map((d, k) => (
              <circle
                key={k} r="40" fill="none"
                stroke={p.color} strokeWidth="1" opacity="0"
              >
                <animate
                  attributeName="r" values="40;64"
                  dur="3.6s" begin={`${i * 0.5 + d}s`} repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity" values="0.45;0"
                  dur="3.6s" begin={`${i * 0.5 + d}s`} repeatCount="indefinite"
                />
              </circle>
            ))}

            {/* Body */}
            <circle
              r="40" fill="#0b1220"
              stroke={p.color} strokeWidth="2"
              filter="url(#s65-glow)"
            />

            {/* Icon */}
            <g transform="translate(0 -4)">
              <PartIcon id={p.id} color={p.color} />
            </g>

            {/* Labels */}
            <text
              x="0" y="22" textAnchor="middle"
              fill="#e2e8f0" fontSize="12.5" fontWeight="700"
            >
              {p.label}
            </text>
            <text
              x="0" y="36" textAnchor="middle"
              fill="#94a3b8" fontSize="10" fontWeight="500"
            >
              {p.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ---------- icons (drawn around 0,0) ----------

function PartIcon({ id, color }) {
  switch (id) {
    case 'feed':  return <FeedIcon  color={color} />
    case 'grp':   return <GroupIcon color={color} />
    case 'page':  return <PageIcon  color={color} />
    case 'msg':   return <ChatIcon  color={color} />
    case 'react': return <ReactIcon color={color} />
    default: return null
  }
}

// Feed — stacked card lines with an arrow indicating scroll
function FeedIcon({ color }) {
  return (
    <g>
      <rect x="-12" y="-12" width="24" height="6.5" rx="1.4"
        fill="none" stroke={color} strokeWidth="1.4" />
      <rect x="-12" y="-3" width="24" height="6.5" rx="1.4"
        fill="none" stroke={color} strokeWidth="1.4" />
      <rect x="-12" y="6" width="24" height="6.5" rx="1.4"
        fill="none" stroke={color} strokeWidth="1.4" />
      {/* Scrolling highlight bar */}
      <rect x="-12" y="-12" width="24" height="6.5" rx="1.4"
        fill={color} opacity="0.55">
        <animate attributeName="y"
          values="-12;-3;6;-12" dur="3.6s"
          repeatCount="indefinite" calcMode="discrete" />
      </rect>
    </g>
  )
}

// Group — three small people heads
function GroupIcon({ color }) {
  return (
    <g>
      {/* center head + shoulders */}
      <circle cx="0" cy="-5" r="4.2" fill="none" stroke={color} strokeWidth="1.6" />
      <path d="M -7 7 Q 0 1 7 7"
        fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      {/* left */}
      <circle cx="-10" cy="-3" r="3.4" fill="none" stroke={color} strokeWidth="1.4" opacity="0.85" />
      <path d="M -15 7 Q -10 3 -5 6"
        fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
      {/* right */}
      <circle cx="10" cy="-3" r="3.4" fill="none" stroke={color} strokeWidth="1.4" opacity="0.85" />
      <path d="M 5 6 Q 10 3 15 7"
        fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
    </g>
  )
}

// Page — a stylised banner/building front
function PageIcon({ color }) {
  return (
    <g>
      <rect x="-13" y="-10" width="26" height="20" rx="1.6"
        fill="none" stroke={color} strokeWidth="1.6" />
      {/* roof line */}
      <line x1="-13" y1="-4" x2="13" y2="-4"
        stroke={color} strokeWidth="1.2" opacity="0.7" />
      {/* door */}
      <rect x="-3" y="-1" width="6" height="11" rx="0.6"
        fill="none" stroke={color} strokeWidth="1.4" />
      {/* small "flag" on top — distinguishes from generic building */}
      <line x1="-9" y1="-10" x2="-9" y2="-14"
        stroke={color} strokeWidth="1.2" />
      <path d="M -9 -14 L -3 -12.5 L -9 -11 Z"
        fill={color} opacity="0.85" />
      {/* windows hint */}
      <circle cx="-7" cy="2" r="1.2" fill={color} opacity="0.7" />
      <circle cx="7" cy="2" r="1.2" fill={color} opacity="0.7" />
    </g>
  )
}

// Chat — a chat bubble with three pulsing dots
function ChatIcon({ color }) {
  return (
    <g>
      <path
        d="M -13 -8
           Q -13 -12 -9 -12
           L 11 -12
           Q 15 -12 15 -8
           L 15 4
           Q 15 8 11 8
           L -4 8
           L -10 12
           L -8 8
           L -9 8
           Q -13 8 -13 4
           Z"
        fill="none" stroke={color} strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {[-4, 0, 4].map((dx, i) => (
        <circle key={i} cx={dx} cy="-2" r="1.6" fill={color}>
          <animate
            attributeName="opacity" values="0.3;1;0.3"
            dur="1.6s" begin={`${i * 0.25}s`} repeatCount="indefinite"
          />
        </circle>
      ))}
    </g>
  )
}

// Reaction — thumb up with a small heart spark
function ReactIcon({ color }) {
  return (
    <g>
      {/* thumb base */}
      <rect x="-12" y="0" width="6" height="11" rx="1"
        fill="none" stroke={color} strokeWidth="1.5" />
      {/* hand/thumb shape */}
      <path
        d="M -6 0
           L -6 -2
           Q -6 -10 0 -10
           Q 2 -10 2 -7
           L 1 -2
           L 9 -2
           Q 12 -2 12 1
           L 11 8
           Q 10.5 11 7.5 11
           L -6 11
           Z"
        fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* small heart sparkle above */}
      <g transform="translate(10 -10)">
        <path
          d="M 0 2
             Q -3 -1 -1.5 -3
             Q 0 -4 0 -2
             Q 0 -4 1.5 -3
             Q 3 -1 0 2 Z"
          fill="#ef4444"
        >
          <animate
            attributeName="opacity" values="0.4;1;0.4"
            dur="2.2s" repeatCount="indefinite"
          />
        </path>
      </g>
    </g>
  )
}
