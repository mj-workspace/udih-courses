// Scene 6.1 — Какво представляват социалните мрежи
// Pattern: hub & orbit — a profile "visiting card" at the centre, four
// satellite nodes (family, friend, organization, community) connected to it
// with traveling message packets. Visualises the lecturer-guide metaphor:
// the profile is your card on the "town square", linking you to close ones
// far away and to organizations that speak to citizens.

const CX = 450
const CY = 290
const R = 195

const nodes = [
  { id: 'family', label: 'Близки', sub: 'в друг град',  color: '#10b981', angle: -110 },
  { id: 'friend', label: 'Приятели', sub: 'разговор',   color: '#22d3ee', angle: -35  },
  { id: 'org',    label: 'Организация', sub: 'ВиК',     color: '#3b82f6', angle: 35   },
  { id: 'group',  label: 'Общност', sub: 'квартал',     color: '#a78bfa', angle: 110  },
].map((n) => {
  const rad = (n.angle * Math.PI) / 180
  return { ...n, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

// Card geometry — centred at (CX, CY)
const CW = 168
const CH = 108
const CXL = CX - CW / 2
const CYT = CY - CH / 2

// Anchor for connection: card edge in the direction of the satellite.
function cardAnchor(angle) {
  const rad = (angle * Math.PI) / 180
  const dx = Math.cos(rad)
  const dy = Math.sin(rad)
  const tx = (CW / 2) / Math.abs(dx || 0.0001)
  const ty = (CH / 2) / Math.abs(dy || 0.0001)
  const t = Math.min(tx, ty)
  return { x: CX + dx * t, y: CY + dy * t }
}

export default function Scene_6_1() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s61-halo">
            <stop offset="0%"  stopColor="#60a5fa" stopOpacity="0.22" />
            <stop offset="70%" stopColor="#1e3a8a" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s61-card" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0f172a" />
            <stop offset="100%" stopColor="#06101f" />
          </linearGradient>
          <radialGradient id="s61-avatar">
            <stop offset="0%"   stopColor="#93c5fd" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.6" />
          </radialGradient>
          <filter id="s61-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ============================================================ */}
        {/* Ambient halo and rotating mesh rings                          */}
        {/* ============================================================ */}
        <circle cx={CX} cy={CY} r="280" fill="url(#s61-halo)" />

        <circle
          cx={CX} cy={CY} r="265" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="2 10"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="58s" repeatCount="indefinite"
          />
        </circle>

        <circle
          cx={CX} cy={CY} r="225" fill="none"
          stroke="#334155" strokeWidth="0.5" strokeDasharray="1 8"
          opacity="0.7"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`360 ${CX} ${CY}`} to={`0 ${CX} ${CY}`}
            dur="42s" repeatCount="indefinite"
          />
        </circle>

        {/* Faint mesh "knots" — distant other people on the square */}
        {[
          { x: 130, y: 110 }, { x: 770, y: 130 }, { x: 110, y: 470 },
          { x: 790, y: 470 }, { x: 80,  y: 290 }, { x: 820, y: 290 },
          { x: 250, y: 80  }, { x: 650, y: 80  }, { x: 250, y: 500 },
          { x: 650, y: 500 },
        ].map((p, i) => (
          <circle
            key={`knot-${i}`} cx={p.x} cy={p.y} r="2.2"
            fill="#475569" opacity="0.5"
          >
            <animate
              attributeName="opacity"
              values="0.2;0.7;0.2"
              dur={`${4 + (i % 4)}s`}
              begin={`${i * 0.4}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* ============================================================ */}
        {/* Connections (card edge → satellite), with traveling packets   */}
        {/* ============================================================ */}
        {nodes.map((n, i) => {
          const a = cardAnchor(n.angle)
          const pathId = `s61-path-${n.id}`
          return (
            <g key={`link-${n.id}`}>
              <defs>
                <path
                  id={pathId}
                  d={`M ${a.x} ${a.y} L ${n.x} ${n.y}`}
                />
              </defs>
              <line
                x1={a.x} y1={a.y} x2={n.x} y2={n.y}
                stroke={n.color} strokeOpacity="0.45" strokeWidth="1"
                strokeDasharray="4 6"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="10" to="0" dur="2.2s" repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  values="0.25;0.7;0.25"
                  dur="3.6s" begin={`${i * 0.6}s`} repeatCount="indefinite"
                />
              </line>
              {/* Traveling "message" packet */}
              <circle r="3.2" fill={n.color} filter="url(#s61-glow)">
                <animateMotion
                  dur={`${4.6 + i * 0.4}s`}
                  begin={`${i * 0.5}s`}
                  repeatCount="indefinite"
                >
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </circle>
            </g>
          )
        })}

        {/* ============================================================ */}
        {/* Central profile card                                          */}
        {/* ============================================================ */}
        <g>
          {/* Pulse rings around the card */}
          {[0, 1.8, 3.6].map((d, i) => (
            <rect
              key={`pulse-${i}`}
              x={CXL} y={CYT} width={CW} height={CH} rx="10"
              fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0"
            >
              <animate
                attributeName="width"
                values={`${CW};${CW + 60}`}
                dur="5.4s" begin={`${d}s`} repeatCount="indefinite"
              />
              <animate
                attributeName="height"
                values={`${CH};${CH + 60}`}
                dur="5.4s" begin={`${d}s`} repeatCount="indefinite"
              />
              <animate
                attributeName="x"
                values={`${CXL};${CXL - 30}`}
                dur="5.4s" begin={`${d}s`} repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values={`${CYT};${CYT - 30}`}
                dur="5.4s" begin={`${d}s`} repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.45;0"
                dur="5.4s" begin={`${d}s`} repeatCount="indefinite"
              />
            </rect>
          ))}

          {/* Card body */}
          <rect
            x={CXL} y={CYT} width={CW} height={CH} rx="10"
            fill="url(#s61-card)"
            stroke="#60a5fa" strokeWidth="2"
            filter="url(#s61-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.6;1;0.6" dur="3.4s" repeatCount="indefinite"
            />
          </rect>

          {/* Avatar — head + shoulders silhouette */}
          <g>
            <circle cx={CXL + 32} cy={CYT + 36} r="16" fill="url(#s61-avatar)" />
            <path
              d={`M ${CXL + 12} ${CYT + 72}
                  Q ${CXL + 32} ${CYT + 52} ${CXL + 52} ${CYT + 72}
                  L ${CXL + 52} ${CYT + 82}
                  L ${CXL + 12} ${CYT + 82}
                  Z`}
              fill="#3b82f6" opacity="0.55"
            />
          </g>

          {/* "Name" line and "info" lines */}
          <rect
            x={CXL + 60} y={CYT + 24} width="86" height="9" rx="2"
            fill="#e2e8f0" opacity="0.85"
          />
          <rect
            x={CXL + 60} y={CYT + 40} width="64" height="6" rx="2"
            fill="#94a3b8" opacity="0.7"
          />
          <rect
            x={CXL + 60} y={CYT + 52} width="48" height="6" rx="2"
            fill="#475569" opacity="0.7"
          />

          {/* Label under card */}
          <text
            x={CX} y={CYT + CH + 22}
            textAnchor="middle"
            fill="#e2e8f0" fontSize="13" fontWeight="700"
          >
            ПРОФИЛ
          </text>
          <text
            x={CX} y={CYT + CH + 38}
            textAnchor="middle"
            fill="#94a3b8" fontSize="11" fontWeight="500"
          >
            вашата визитка
          </text>
        </g>

        {/* ============================================================ */}
        {/* Satellite nodes                                               */}
        {/* ============================================================ */}
        {nodes.map((n, i) => (
          <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
            {/* Pulse rings */}
            {[0, 1.4].map((d, k) => (
              <circle
                key={k} r="40" fill="none"
                stroke={n.color} strokeWidth="1" opacity="0"
              >
                <animate
                  attributeName="r" values="40;62"
                  dur="3.8s" begin={`${i * 0.5 + d}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity" values="0.5;0"
                  dur="3.8s" begin={`${i * 0.5 + d}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}

            {/* Body */}
            <circle
              r="40" fill="#0b1220"
              stroke={n.color} strokeWidth="2"
              filter="url(#s61-glow)"
            />

            {/* Icon */}
            <g transform="translate(0 -4)">
              <NodeIcon id={n.id} color={n.color} />
            </g>

            {/* Labels */}
            <text
              x="0" y="22"
              textAnchor="middle"
              fill="#e2e8f0" fontSize="12.5" fontWeight="700"
            >
              {n.label}
            </text>
            <text
              x="0" y="36"
              textAnchor="middle"
              fill="#94a3b8" fontSize="10" fontWeight="500"
            >
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ---------- icons (drawn around 0,0) ----------

function NodeIcon({ id, color }) {
  switch (id) {
    case 'family': return <FamilyIcon color={color} />
    case 'friend': return <FriendIcon color={color} />
    case 'org':    return <OrgIcon    color={color} />
    case 'group':  return <GroupIcon  color={color} />
    default: return null
  }
}

// Two heads of different sizes — family / близки
function FamilyIcon({ color }) {
  return (
    <g>
      {/* parent */}
      <circle cx="-5" cy="-5" r="4.5"
        fill="none" stroke={color} strokeWidth="1.6" />
      <path d="M -11 6 Q -5 -1 1 6"
        fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      {/* child */}
      <circle cx="6" cy="-2" r="3.4"
        fill="none" stroke={color} strokeWidth="1.4" />
      <path d="M 2 7 Q 6 2 10 7"
        fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {/* small heart between them, pulsing */}
      <path
        d="M 0 -10 Q -2 -13 -3.6 -11.2 Q -4.6 -9.4 0 -7 Q 4.6 -9.4 3.6 -11.2 Q 2 -13 0 -10 Z"
        fill={color} opacity="0.85"
      >
        <animate attributeName="opacity"
          values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" />
      </path>
    </g>
  )
}

// Speech bubble — приятели, разговор
function FriendIcon({ color }) {
  return (
    <g>
      <path
        d="M -12 -8 H 8 Q 12 -8 12 -4 V 4 Q 12 8 8 8 H -2 L -7 12 L -7 8 H -12 Q -16 8 -16 4 V -4 Q -16 -8 -12 -8 Z"
        fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round"
      />
      <circle cx="-8" cy="0" r="1.4" fill={color}>
        <animate attributeName="opacity"
          values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="-2" cy="0" r="1.4" fill={color}>
        <animate attributeName="opacity"
          values="0.4;1;0.4" dur="1.8s" begin="0.3s" repeatCount="indefinite" />
      </circle>
      <circle cx="4" cy="0" r="1.4" fill={color}>
        <animate attributeName="opacity"
          values="0.4;1;0.4" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
      </circle>
    </g>
  )
}

// Small building — ВиК / organization
function OrgIcon({ color }) {
  return (
    <g>
      {/* roof */}
      <path d="M -13 -4 L 0 -12 L 13 -4 Z"
        fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      {/* building */}
      <rect x="-11" y="-4" width="22" height="14" rx="1"
        fill="none" stroke={color} strokeWidth="1.6" />
      {/* windows */}
      <rect x="-7" y="-1" width="3.5" height="3.5" fill={color} opacity="0.85" />
      <rect x="-1.7" y="-1" width="3.5" height="3.5" fill={color} opacity="0.65">
        <animate attributeName="opacity"
          values="0.4;0.95;0.4" dur="2.6s" repeatCount="indefinite" />
      </rect>
      <rect x="3.5" y="-1" width="3.5" height="3.5" fill={color} opacity="0.85" />
      {/* door */}
      <rect x="-1.6" y="5" width="3.2" height="5" fill={color} opacity="0.7" />
      {/* tiny water droplet on the roof — a nod to ВиК */}
      <path
        d="M 0 -16 Q -2.4 -13.6 -2.4 -11.8 Q -2.4 -9.4 0 -9.4 Q 2.4 -9.4 2.4 -11.8 Q 2.4 -13.6 0 -16 Z"
        fill={color}
      >
        <animate attributeName="opacity"
          values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
      </path>
    </g>
  )
}

// Three connected people — общност / квартал
function GroupIcon({ color }) {
  return (
    <g>
      {/* three heads in a triangle */}
      <circle cx="-8" cy="3" r="3.6"
        fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="8" cy="3" r="3.6"
        fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="0" cy="-7" r="3.6"
        fill="none" stroke={color} strokeWidth="1.5" />
      {/* connections between them */}
      <line x1="-5.5" y1="1" x2="-2.4" y2="-5"
        stroke={color} strokeWidth="1.2" opacity="0.75" />
      <line x1="5.5" y1="1" x2="2.4" y2="-5"
        stroke={color} strokeWidth="1.2" opacity="0.75" />
      <line x1="-4.4" y1="3" x2="4.4" y2="3"
        stroke={color} strokeWidth="1.2" opacity="0.75" />
      {/* bodies hint */}
      <path d="M -12 12 Q -8 7 -4 12"
        fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M 4 12 Q 8 7 12 12"
        fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M -4 -2 Q 0 -7 4 -2"
        fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </g>
  )
}
