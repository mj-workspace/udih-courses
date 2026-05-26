// Scene 5.2 — Преглед и сравнение на основните платформи
// Pattern: compare grid — one "invite link" at the top connects to 4 platform
// cards in a row (Zoom, Google Meet, Microsoft Teams, Webex). A traveling
// packet cycles from the invite to each card in turn; the targeted card
// lights up. Metaphor the guide narrates: всичките правят едно и също,
// организаторът избира платформата, ти просто следваш връзката.

const CX = 450

// Invite link anchor (top)
const INVITE = { x: CX, y: 110 }

// Card layout — 4 cards in a row, content stays inside x: 70..830
const CARD_W = 170
const CARD_H = 220
const CARD_Y = 215
const GAP = 20
const ROW_W = 4 * CARD_W + 3 * GAP // 740
const ROW_X = (900 - ROW_W) / 2     // 80

const platforms = [
  {
    id: 'zoom',
    name: 'Zoom',
    tag: 'нарицателно',
    color: '#3b82f6',
    light: '#60a5fa',
  },
  {
    id: 'meet',
    name: 'Google Meet',
    tag: 'с Gmail акаунта',
    color: '#10b981',
    light: '#34d399',
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    tag: 'екипна работа',
    color: '#a78bfa',
    light: '#c4b5fd',
  },
  {
    id: 'webex',
    name: 'Webex',
    tag: 'големи институции',
    color: '#f59e0b',
    light: '#fbbf24',
  },
].map((p, i) => {
  const x = ROW_X + i * (CARD_W + GAP)
  const cx = x + CARD_W / 2
  const cy = CARD_Y + CARD_H / 2
  return { ...p, x, y: CARD_Y, cx, cy }
})

// Cycle: each platform highlights for HIGHLIGHT seconds, total cycle CYCLE.
const HIGHLIGHT = 2.4
const CYCLE = platforms.length * HIGHLIGHT // 9.6s

export default function Scene_5_2() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s52-card" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0f172a" />
            <stop offset="100%" stopColor="#06101f" />
          </linearGradient>
          <radialGradient id="s52-halo">
            <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.22" />
            <stop offset="70%"  stopColor="#1e3a8a" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <filter id="s52-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ============================================================ */}
        {/* Ambient: faint halo behind the invite, slow dashed ring        */}
        {/* ============================================================ */}
        <circle cx={INVITE.x} cy={INVITE.y} r="120" fill="url(#s52-halo)" />
        <ellipse
          cx={CX} cy={300} rx="370" ry="230" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 11"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} 300`} to={`360 ${CX} 300`}
            dur="60s" repeatCount="indefinite"
          />
        </ellipse>

        {/* ============================================================ */}
        {/* Connection lines: invite -> each card (always faintly drawn) */}
        {/* ============================================================ */}
        {platforms.map((p) => (
          <line
            key={`ln-${p.id}`}
            x1={INVITE.x} y1={INVITE.y + 20}
            x2={p.cx}     y2={p.y}
            stroke="#334155" strokeWidth="1"
            strokeDasharray="4 6" opacity="0.45"
          >
            <animate attributeName="stroke-dashoffset"
              from="10" to="0" dur="2s" repeatCount="indefinite" />
          </line>
        ))}

        {/* ============================================================ */}
        {/* Traveling link packet — cycles through the 4 cards            */}
        {/* One packet, 4 motion segments inside a single cycle.          */}
        {/* ============================================================ */}
        {platforms.map((p, i) => {
          const begin = i * HIGHLIGHT
          return (
            <g key={`pkt-${p.id}`}>
              <rect width="14" height="9" rx="2"
                fill={p.color} opacity="0"
                filter="url(#s52-glow)">
                <animateMotion
                  dur={`${CYCLE}s`} begin={`${begin}s`}
                  repeatCount="indefinite"
                  path={`M ${INVITE.x - 7} ${INVITE.y + 16}
                         L ${p.cx - 7} ${p.y - 4}`}
                />
                <animate attributeName="opacity"
                  values="0;1;1;0;0"
                  keyTimes={`0;0.05;${HIGHLIGHT / CYCLE * 0.7};${HIGHLIGHT / CYCLE};1`}
                  dur={`${CYCLE}s`} begin={`${begin}s`}
                  repeatCount="indefinite" />
              </rect>
            </g>
          )
        })}

        {/* ============================================================ */}
        {/* Invite / link node at the top                                  */}
        {/* ============================================================ */}
        <g transform={`translate(${INVITE.x} ${INVITE.y})`}>
          {/* breathing ring */}
          {[0, 1.6, 3.2].map((d, i) => (
            <circle key={`p-${i}`} r="34" fill="none"
              stroke="#60a5fa" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="34;58"
                dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.45;0"
                dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {/* envelope */}
          <rect x="-32" y="-18" width="64" height="36" rx="4"
            fill="#0b1220" stroke="#60a5fa" strokeWidth="1.8"
            filter="url(#s52-glow)" />
          <path d="M -32 -18 L 0 6 L 32 -18"
            fill="none" stroke="#60a5fa" strokeWidth="1.6" />
          {/* link icon overlay */}
          <g transform="translate(0 22)">
            <rect x="-22" y="-7" width="44" height="14" rx="7"
              fill="#0b1220" stroke="#22d3ee" strokeWidth="1.2"
              opacity="0.9" />
            <line x1="-10" y1="0" x2="10" y2="0"
              stroke="#22d3ee" strokeWidth="1.4" />
            <circle cx="-10" cy="0" r="2" fill="#22d3ee" />
            <circle cx="10"  cy="0" r="2" fill="#22d3ee" />
          </g>
          <text x="0" y="-28" textAnchor="middle"
            fill="#94a3b8" fontSize="11.5" fontWeight="600"
            style={{ letterSpacing: '0.08em' }}>
            покана за среща
          </text>
        </g>

        {/* ============================================================ */}
        {/* Platform cards                                                 */}
        {/* ============================================================ */}
        {platforms.map((p, i) => {
          const begin = i * HIGHLIGHT
          const litFrac = HIGHLIGHT / CYCLE
          const offFrac = 0.04 // small fade window
          // keyTimes: 0 dim, 0.05 on, litFrac on, litFrac+offFrac dim, 1 dim
          const keyTimes =
            `0;${offFrac};${litFrac};${litFrac + offFrac};1`
          return (
            <g key={p.id}>
              {/* card body */}
              <rect
                x={p.x} y={p.y} width={CARD_W} height={CARD_H} rx="10"
                fill="url(#s52-card)"
                stroke={p.color} strokeWidth="1.4"
                opacity="0.95">
                <animate attributeName="stroke-opacity"
                  values="0.4;1;1;0.4;0.4"
                  keyTimes={keyTimes}
                  dur={`${CYCLE}s`} begin={`${begin}s`}
                  repeatCount="indefinite" />
              </rect>

              {/* active-state glowing outline */}
              <rect
                x={p.x} y={p.y} width={CARD_W} height={CARD_H} rx="10"
                fill="none"
                stroke={p.light} strokeWidth="2.4"
                opacity="0"
                filter="url(#s52-glow)">
                <animate attributeName="opacity"
                  values="0;0.85;0.85;0;0"
                  keyTimes={keyTimes}
                  dur={`${CYCLE}s`} begin={`${begin}s`}
                  repeatCount="indefinite" />
              </rect>

              {/* brand mark (top of card) */}
              <g transform={`translate(${p.cx} ${p.y + 50})`}>
                <PlatformMark id={p.id} color={p.color} />
              </g>

              {/* name */}
              <text
                x={p.cx} y={p.y + 122}
                textAnchor="middle"
                fill="#e2e8f0" fontSize="15" fontWeight="700">
                {p.name}
              </text>

              {/* tagline */}
              <text
                x={p.cx} y={p.y + 144}
                textAnchor="middle"
                fill="#94a3b8" fontSize="11.5">
                {p.tag}
              </text>

              {/* tiny pills: Браузър + Приложение (everyone supports both) */}
              <g transform={`translate(${p.cx} ${p.y + 174})`}>
                <Pill x="-46" label="Браузър" color={p.color} />
                <Pill x="6"   label="Приложение" color={p.color} />
              </g>
            </g>
          )
        })}

        {/* ============================================================ */}
        {/* Bottom caption                                                 */}
        {/* ============================================================ */}
        <text x={CX} y="488" textAnchor="middle"
          fill="#e2e8f0" fontSize="13.5" fontWeight="600">
          организаторът избира платформата — ти следваш връзката
        </text>
      </svg>
    </div>
  )
}

// ---------- platform brand marks (stylised, around 0,0) ----------

function PlatformMark({ id, color }) {
  if (id === 'zoom') {
    // Video camera: body + lens nub
    return (
      <g>
        <rect x="-22" y="-12" width="32" height="24" rx="3"
          fill="none" stroke={color} strokeWidth="2" />
        <path d="M 10 -6 L 22 -12 L 22 12 L 10 6 Z"
          fill="none" stroke={color} strokeWidth="2"
          strokeLinejoin="round" />
        <circle cx="-6" cy="0" r="2" fill={color} opacity="0.7" />
      </g>
    )
  }
  if (id === 'meet') {
    // Camera in rounded square (Meet-style)
    return (
      <g>
        <rect x="-22" y="-14" width="40" height="28" rx="6"
          fill="none" stroke={color} strokeWidth="2" />
        <path d="M 18 -8 L 24 -12 L 24 12 L 18 8 Z"
          fill={color} opacity="0.85"
          stroke={color} strokeWidth="1" strokeLinejoin="round" />
        <circle cx="-4" cy="0" r="3.5"
          fill="none" stroke={color} strokeWidth="2" />
      </g>
    )
  }
  if (id === 'teams') {
    // Rounded square with a 'T' inside
    return (
      <g>
        <rect x="-18" y="-16" width="36" height="32" rx="5"
          fill="none" stroke={color} strokeWidth="2" />
        <line x1="-10" y1="-7" x2="10" y2="-7"
          stroke={color} strokeWidth="2.6" />
        <line x1="0" y1="-7" x2="0" y2="10"
          stroke={color} strokeWidth="2.6" />
      </g>
    )
  }
  if (id === 'webex') {
    // Circle with a 'W' wave inside
    return (
      <g>
        <circle r="18" fill="none" stroke={color} strokeWidth="2" />
        <path d="M -10 -4 L -5 8 L 0 -2 L 5 8 L 10 -4"
          fill="none" stroke={color} strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )
  }
  return null
}

function Pill({ x, label, color }) {
  // ~40px wide pill, height 14, centred at given x (top-left corner offset)
  const w = label.length > 7 ? 50 : 42
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x="0" y="-7" width={w} height="14" rx="7"
        fill="#0b1220" stroke={color} strokeWidth="0.9" opacity="0.85" />
      <text x={w / 2} y="3" textAnchor="middle"
        fill="#94a3b8" fontSize="9" fontWeight="600">
        {label}
      </text>
    </g>
  )
}
