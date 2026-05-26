// Scene 6.6 — Instagram задълбочаване
// Pattern: annotated mock — a stylised vertical Instagram phone in the centre,
// four badges around it (Stories, DM, Posts, Reels) each pointing at the
// corresponding zone of the UI. Echoes the four parts the guide walks through.

const CX = 450
const CY = 290

// Phone frame
const PW = 180
const PH = 340
const PX = CX - PW / 2
const PY = CY - PH / 2

// Inner screen rect
const SX = PX + 8
const SY = PY + 12
const SW = PW - 16
const SH = PH - 24

// Phone-internal y bands
const HEADER_Y = SY + 14         // wordmark band
const STORY_Y  = SY + 44         // story row
const POST_Y   = SY + 76         // post image top
const POST_H   = 118
const ACTION_Y = POST_Y + POST_H + 10
const REELS_Y  = ACTION_Y + 22

// Story circles
const STORY_R = 11
const STORY_COUNT = 4
const STORY_START_X = SX + 18
const STORY_STEP = 26

// DM plane icon anchor (top-right of phone header)
const DM_ICON_X = SX + SW - 14
const DM_ICON_Y = HEADER_Y

// Four badges around the phone
const badges = [
  {
    id: 'stories',
    label: 'Истории',
    sub: '24 часа',
    color: '#a78bfa',
    bx: 195, by: 175,
    ax: SX,                                 // story row left edge
    ay: STORY_Y,
  },
  {
    id: 'dm',
    label: 'DM',
    sub: 'лични съобщения',
    color: '#22d3ee',
    bx: 705, by: 175,
    ax: DM_ICON_X + 6,                      // plane icon
    ay: DM_ICON_Y,
  },
  {
    id: 'posts',
    label: 'Публикации',
    sub: 'остават трайно',
    color: '#3b82f6',
    bx: 195, by: 410,
    ax: SX,                                 // left edge of post image
    ay: POST_Y + POST_H / 2,
  },
  {
    id: 'reels',
    label: 'Reels',
    sub: 'къси видеа',
    color: '#f472b6',
    bx: 705, by: 410,
    ax: SX + SW,                            // right edge of reels area
    ay: REELS_Y + 22,
  },
]

export default function Scene_6_6() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s66-frame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0b1220" />
          </linearGradient>
          <linearGradient id="s66-screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#06101f" />
          </linearGradient>
          <linearGradient id="s66-ig" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#f59e0b" />
            <stop offset="50%"  stopColor="#ef4444" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <linearGradient id="s66-photo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#1e3a8a" />
            <stop offset="60%"  stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <radialGradient id="s66-halo">
            <stop offset="0%"   stopColor="#a78bfa" stopOpacity="0.18" />
            <stop offset="70%"  stopColor="#1e3a8a" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <filter id="s66-glow" x="-30%" y="-30%" width="160%" height="160%">
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
        <circle cx={CX} cy={CY} r="270" fill="url(#s66-halo)" />

        <ellipse
          cx={CX} cy={CY} rx="340" ry="240" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 11"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="60s" repeatCount="indefinite"
          />
        </ellipse>

        {/* ============================================================ */}
        {/* Badge connectors                                              */}
        {/* ============================================================ */}
        {badges.map((b, i) => (
          <g key={`link-${b.id}`}>
            <line
              x1={b.ax} y1={b.ay} x2={b.bx} y2={b.by}
              stroke={b.color} strokeOpacity="0.45" strokeWidth="1"
              strokeDasharray="4 6"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="10" to="0" dur="2s" repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                values="0.25;0.75;0.25"
                dur="3.4s" begin={`${i * 0.6}s`} repeatCount="indefinite"
              />
            </line>
            {/* small dot riding the line, from anchor outward */}
            <circle r="2.6" fill={b.color} filter="url(#s66-glow)">
              <animateMotion
                dur={`${4.2 + i * 0.4}s`} repeatCount="indefinite"
                path={`M ${b.ax} ${b.ay} L ${b.bx} ${b.by}`}
              />
            </circle>
          </g>
        ))}

        {/* ============================================================ */}
        {/* Phone                                                         */}
        {/* ============================================================ */}
        <g>
          {/* Outer frame */}
          <rect
            x={PX} y={PY} width={PW} height={PH} rx="22"
            fill="url(#s66-frame)"
            stroke="#475569" strokeWidth="1.4"
            filter="url(#s66-glow)"
          />
          {/* Inner screen */}
          <rect
            x={SX} y={SY} width={SW} height={SH} rx="14"
            fill="url(#s66-screen)"
            stroke="#334155" strokeWidth="0.8"
          />
          {/* Notch */}
          <rect
            x={CX - 22} y={PY + 4} width="44" height="6" rx="3"
            fill="#0b1220" stroke="#475569" strokeWidth="0.6"
          />

          {/* Header — "Instagram" wordmark + DM plane */}
          <text
            x={SX + 10} y={HEADER_Y + 4}
            fill="#e2e8f0" fontSize="11" fontWeight="700"
            style={{ letterSpacing: '0.02em' }}
          >
            Instagram
          </text>
          {/* DM plane icon — top-right of header */}
          <g transform={`translate(${DM_ICON_X} ${DM_ICON_Y})`}>
            <g transform="rotate(-25)">
              <path
                d="M -8 -2 L 8 -6 L 2 6 L 0 1 L -8 -2 Z"
                fill="none" stroke="#22d3ee" strokeWidth="1.3"
                strokeLinejoin="round"
              >
                <animate
                  attributeName="stroke-opacity"
                  values="0.55;1;0.55" dur="2.6s" repeatCount="indefinite"
                />
              </path>
            </g>
          </g>

          {/* Story row — gradient-ring circles */}
          {Array.from({ length: STORY_COUNT }).map((_, k) => {
            const cx = STORY_START_X + k * STORY_STEP
            return (
              <g key={`story-${k}`} transform={`translate(${cx} ${STORY_Y})`}>
                <circle r={STORY_R} fill="none" stroke="url(#s66-ig)" strokeWidth="1.6">
                  <animate
                    attributeName="stroke-opacity"
                    values="0.5;1;0.5"
                    dur="2.8s" begin={`${k * 0.35}s`} repeatCount="indefinite"
                  />
                </circle>
                <circle r={STORY_R - 3} fill="#0b1220" stroke="#475569" strokeWidth="0.5" />
                {/* tiny silhouette */}
                <circle cy="-1.4" r="2.2" fill="#94a3b8" />
                <path d="M -3.6 4.8 Q 0 1.2 3.6 4.8" fill="none" stroke="#94a3b8" strokeWidth="1.1" />
              </g>
            )
          })}

          {/* Post image */}
          <rect
            x={SX + 6} y={POST_Y} width={SW - 12} height={POST_H} rx="4"
            fill="url(#s66-photo)" opacity="0.85"
          />
          {/* faint sun + horizon to look like a photo */}
          <circle cx={SX + SW - 30} cy={POST_Y + 24} r="8" fill="#fbbf24" opacity="0.85" />
          <path
            d={`M ${SX + 6} ${POST_Y + POST_H - 28}
                Q ${CX} ${POST_Y + POST_H - 48}
                  ${SX + SW - 6} ${POST_Y + POST_H - 28}
                L ${SX + SW - 6} ${POST_Y + POST_H}
                L ${SX + 6} ${POST_Y + POST_H} Z`}
            fill="#0f172a" opacity="0.55"
          />

          {/* Action row — heart, chat, plane */}
          <g transform={`translate(${SX + 14} ${ACTION_Y})`}>
            {/* heart */}
            <path
              d="M 0 4 C -6 -2 -10 -6 -6 -10 C -3 -12 -1 -10 0 -7 C 1 -10 3 -12 6 -10 C 10 -6 6 -2 0 4 Z"
              fill="#ef4444" stroke="#ef4444" strokeWidth="0.8"
              filter="url(#s66-glow)"
            >
              <animate
                attributeName="opacity"
                values="0.55;1;0.55" dur="2.4s" repeatCount="indefinite"
              />
            </path>
          </g>
          {/* chat bubble */}
          <g transform={`translate(${SX + 36} ${ACTION_Y})`}>
            <path
              d="M -7 -5 H 7 A 3 3 0 0 1 10 -2 V 3 A 3 3 0 0 1 7 6 H -2 L -6 9 V 6 H -7 A 3 3 0 0 1 -10 3 V -2 A 3 3 0 0 1 -7 -5 Z"
              fill="none" stroke="#e2e8f0" strokeWidth="1.3"
            />
          </g>
          {/* small plane (share) */}
          <g transform={`translate(${SX + 58} ${ACTION_Y}) rotate(-20)`}>
            <path
              d="M -7 -2 L 7 -5 L 1 5 L 0 1 L -7 -2 Z"
              fill="none" stroke="#e2e8f0" strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </g>
          {/* bookmark — far right */}
          <g transform={`translate(${SX + SW - 14} ${ACTION_Y})`}>
            <path
              d="M -4 -6 L 4 -6 L 4 6 L 0 3 L -4 6 Z"
              fill="none" stroke="#94a3b8" strokeWidth="1.2"
            />
          </g>

          {/* Reels strip — play triangle inside small frame */}
          <g transform={`translate(${CX} ${REELS_Y + 22})`}>
            <rect x="-46" y="-16" width="92" height="32" rx="4"
              fill="#0b1220" stroke="#f472b6" strokeWidth="1.2" opacity="0.85"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.55;1;0.55" dur="3s" repeatCount="indefinite"
              />
            </rect>
            {/* play triangle */}
            <path d="M -8 -7 L 8 0 L -8 7 Z" fill="#f472b6" filter="url(#s66-glow)" />
            {/* "Reels" label */}
            <text x="22" y="3" fill="#e2e8f0" fontSize="9" fontWeight="700"
              style={{ letterSpacing: '0.08em' }}>
              REELS
            </text>
          </g>

          {/* Bottom nav (very faint) */}
          <line
            x1={SX + 6} y1={SY + SH - 20} x2={SX + SW - 6} y2={SY + SH - 20}
            stroke="#334155" strokeWidth="0.6"
          />
          {[0, 1, 2, 3, 4].map((k) => (
            <circle
              key={`nav-${k}`}
              cx={SX + 22 + k * 30} cy={SY + SH - 10}
              r="2" fill="#475569"
            />
          ))}
        </g>

        {/* ============================================================ */}
        {/* Badges                                                        */}
        {/* ============================================================ */}
        {badges.map((b, i) => (
          <g key={b.id} transform={`translate(${b.bx} ${b.by})`}>
            {/* Pulse rings */}
            {[0, 1.6].map((d, k) => (
              <circle
                key={k} r="40" fill="none"
                stroke={b.color} strokeWidth="1" opacity="0"
              >
                <animate
                  attributeName="r"
                  values="40;62" dur="3.6s"
                  begin={`${i * 0.5 + d}s`} repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.5;0" dur="3.6s"
                  begin={`${i * 0.5 + d}s`} repeatCount="indefinite"
                />
              </circle>
            ))}

            <circle r="40" fill="#0b1220"
              stroke={b.color} strokeWidth="2"
              filter="url(#s66-glow)" />

            <g transform="translate(0 -7)">
              <BadgeIcon id={b.id} color={b.color} />
            </g>

            <text x="0" y="21"
              textAnchor="middle"
              fill="#e2e8f0" fontSize="12.5" fontWeight="700">
              {b.label}
            </text>
            <text x="0" y="35"
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

// ---------- badge icons ----------

function BadgeIcon({ id, color }) {
  switch (id) {
    case 'stories': return <StoryIcon color={color} />
    case 'dm':      return <PlaneIcon color={color} />
    case 'posts':   return <PostIcon  color={color} />
    case 'reels':   return <ReelsIcon color={color} />
    default: return null
  }
}

function StoryIcon({ color }) {
  // gradient-ringed circle with silhouette + a "24h" arc hint
  return (
    <g>
      <circle r="11" fill="none" stroke={color} strokeWidth="1.8">
        <animate attributeName="stroke-opacity"
          values="0.55;1;0.55" dur="2.6s" repeatCount="indefinite" />
      </circle>
      <circle r="7.5" fill="#0b1220" stroke="#475569" strokeWidth="0.6" />
      <circle cy="-1.6" r="2.4" fill="#94a3b8" />
      <path d="M -4 5 Q 0 1.6 4 5" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      {/* tiny arc — "expires" */}
      <path d="M 8 -8 A 11 11 0 0 1 11 -3" fill="none"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  )
}

function PlaneIcon({ color }) {
  return (
    <g transform="rotate(-25)">
      <path
        d="M -11 -3 L 11 -8 L 3 8 L 0 1 L -11 -3 Z"
        fill="none" stroke={color} strokeWidth="1.6"
        strokeLinejoin="round"
      >
        <animate attributeName="stroke-opacity"
          values="0.55;1;0.55" dur="2.4s" repeatCount="indefinite" />
      </path>
      <line x1="0" y1="1" x2="11" y2="-8"
        stroke={color} strokeWidth="1.2" opacity="0.7" />
    </g>
  )
}

function PostIcon({ color }) {
  // stylised image card — mountain + sun + a heart sitting beneath
  return (
    <g>
      <rect x="-12" y="-10" width="24" height="18" rx="2.4"
        fill="none" stroke={color} strokeWidth="1.6" />
      <circle cx="6" cy="-5" r="2.2" fill={color} opacity="0.85" />
      <path
        d="M -10 6 L -3 -2 L 2 3 L 7 -1 L 10 6 Z"
        fill={color} opacity="0.45"
      />
      {/* heart below — "remains" */}
      <path
        d="M 0 14 C -4 10 -7 7 -4 5 C -2 4 -1 5 0 7 C 1 5 2 4 4 5 C 7 7 4 10 0 14 Z"
        fill="#ef4444"
      >
        <animate attributeName="opacity"
          values="0.6;1;0.6" dur="2.6s" repeatCount="indefinite" />
      </path>
    </g>
  )
}

function ReelsIcon({ color }) {
  // film frame with play triangle
  return (
    <g>
      <rect x="-12" y="-9" width="24" height="18" rx="2.4"
        fill="none" stroke={color} strokeWidth="1.6" />
      {/* sprocket holes — top/bottom */}
      <line x1="-12" y1="-5" x2="12" y2="-5" stroke={color} strokeWidth="0.6" opacity="0.55" />
      <line x1="-12" y1="5"  x2="12" y2="5"  stroke={color} strokeWidth="0.6" opacity="0.55" />
      {/* play */}
      <path d="M -3 -4 L 5 0 L -3 4 Z" fill={color}>
        <animate attributeName="opacity"
          values="0.55;1;0.55" dur="2.4s" repeatCount="indefinite" />
      </path>
    </g>
  )
}
