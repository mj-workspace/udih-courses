// Scene 5.1 — Какво представляват видеоконференциите
// Pattern: hub & orbit — a 2x2 video tile gallery in the centre (the "screen
// meeting"), connected to 4 location icons around it (home, office,
// apartment, field). Video frames travel from each location into its tile,
// and a Wi-Fi/internet halo wraps the whole gallery — the metaphor the guide
// narrates: people sitting around a table that isn't there, each from where
// they are.

const TW = 170 // tile width
const TH = 110 // tile height
const G = 12   // gap

// Gallery centred at CX=450, CY=290
const CX = 450
const CY = 290
const X0 = CX - TW - G / 2 // left col x
const X1 = CX + G / 2      // right col x
const Y0 = CY - TH - G / 2 // top row y
const Y1 = CY + G / 2      // bottom row y

const tiles = [
  { id: 't1', x: X0, y: Y0, color: '#3b82f6', name: 'Мария',  active: true,  loc: 'home'  },
  { id: 't2', x: X1, y: Y0, color: '#22d3ee', name: 'Иван',   active: false, loc: 'office'},
  { id: 't3', x: X0, y: Y1, color: '#10b981', name: 'Стефан', active: false, loc: 'flat'  },
  { id: 't4', x: X1, y: Y1, color: '#a78bfa', name: 'Елена',  active: false, loc: 'field' },
]

// Location icons: anchor point (where the line ends on the source side)
const locs = {
  home:   { x: 130, y: 145, label: 'У дома' },
  office: { x: 770, y: 145, label: 'В офиса' },
  flat:   { x: 130, y: 440, label: 'В кабинета' },
  field:  { x: 770, y: 440, label: 'На обект' },
}

// Tile centre helpers
const tc = (t) => ({ cx: t.x + TW / 2, cy: t.y + TH / 2 })

export default function Scene_5_1() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s51-tile" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0f172a" />
            <stop offset="100%" stopColor="#06101f" />
          </linearGradient>
          <radialGradient id="s51-halo">
            <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.28" />
            <stop offset="70%"  stopColor="#1e3a8a" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <filter id="s51-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ============================================================ */}
        {/* Ambient: internet halo around the gallery                     */}
        {/* ============================================================ */}
        <circle cx={CX} cy={CY} r="260" fill="url(#s51-halo)" />

        {/* Slow rotating dashed ring — "the connection" */}
        <ellipse
          cx={CX} cy={CY} rx="330" ry="220" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 11"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="58s" repeatCount="indefinite"
          />
        </ellipse>

        {/* Expanding Wi-Fi rings from the gallery centre */}
        {[0, 1.6, 3.2].map((d, i) => (
          <circle
            key={`wifi-${i}`}
            cx={CX} cy={CY} r="180"
            fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0"
          >
            <animate attributeName="r" values="180;260"
              dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.35;0"
              dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* ============================================================ */}
        {/* Location → tile connections, with traveling "video packets"  */}
        {/* ============================================================ */}
        {tiles.map((t, i) => {
          const a = locs[t.loc]
          const { cx, cy } = tc(t)
          return (
            <g key={`link-${t.id}`}>
              <line
                x1={a.x} y1={a.y} x2={cx} y2={cy}
                stroke="#334155" strokeWidth="1"
                strokeDasharray="4 6" opacity="0.55"
              >
                <animate attributeName="stroke-dashoffset"
                  from="10" to="0" dur="1.8s" repeatCount="indefinite" />
              </line>
              {/* small "video frame" gliding along the connection */}
              <rect width="10" height="7" rx="1.4"
                fill={t.color} opacity="0.95"
                filter="url(#s51-glow)">
                <animateMotion
                  dur={`${4.6 + i * 0.4}s`} repeatCount="indefinite"
                  path={`M ${a.x} ${a.y} L ${cx} ${cy}`}
                />
                <animate attributeName="opacity"
                  values="0;1;1;0" keyTimes="0;0.12;0.88;1"
                  dur={`${4.6 + i * 0.4}s`} repeatCount="indefinite" />
              </rect>
            </g>
          )
        })}

        {/* ============================================================ */}
        {/* Location icons (4 corners)                                    */}
        {/* ============================================================ */}
        {Object.entries(locs).map(([key, l]) => (
          <g key={`loc-${key}`} transform={`translate(${l.x} ${l.y})`}>
            <circle r="26" fill="#0b1220"
              stroke="#475569" strokeWidth="1.2" />
            <circle r="26" fill="none"
              stroke="#60a5fa" strokeWidth="1" opacity="0.6">
              <animate attributeName="stroke-opacity"
                values="0.3;0.85;0.3" dur="4.2s" repeatCount="indefinite" />
            </circle>
            {key === 'home'   && <HomeIcon />}
            {key === 'office' && <OfficeIcon />}
            {key === 'flat'   && <FlatIcon />}
            {key === 'field'  && <FieldIcon />}
            <text x="0" y="46" textAnchor="middle"
              fill="#94a3b8" fontSize="11.5" fontWeight="500">
              {l.label}
            </text>
          </g>
        ))}

        {/* ============================================================ */}
        {/* Gallery — the 4 video tiles                                   */}
        {/* ============================================================ */}
        {tiles.map((t, i) => {
          const { cx, cy } = tc(t)
          return (
            <g key={t.id}>
              {/* Tile background */}
              <rect
                x={t.x} y={t.y} width={TW} height={TH} rx="8"
                fill="url(#s51-tile)"
                stroke={t.active ? t.color : '#1e3a8a'}
                strokeWidth={t.active ? 2.2 : 1.2}
                filter={t.active ? 'url(#s51-glow)' : undefined}
              >
                {t.active && (
                  <animate attributeName="stroke-opacity"
                    values="0.65;1;0.65" dur="2.8s" repeatCount="indefinite" />
                )}
              </rect>

              {/* Person silhouette — head + shoulders */}
              <g opacity="0.92">
                {/* head */}
                <circle cx={cx} cy={cy - 14} r="11.5"
                  fill={t.color} opacity="0.85" />
                {/* shoulders */}
                <path
                  d={`M ${cx - 22} ${t.y + TH - 8}
                      Q ${cx} ${cy + 4} ${cx + 22} ${t.y + TH - 8}
                      L ${cx + 22} ${t.y + TH}
                      L ${cx - 22} ${t.y + TH}
                      Z`}
                  fill={t.color} opacity="0.55"
                />
              </g>

              {/* Live "LIVE" dot — bottom-left of tile */}
              <g>
                <circle cx={t.x + 10} cy={t.y + TH - 9} r="3"
                  fill="#ef4444" filter="url(#s51-glow)">
                  <animate attributeName="opacity"
                    values="0.4;1;0.4" dur="1.8s"
                    begin={`${i * 0.3}s`} repeatCount="indefinite" />
                </circle>
                <text
                  x={t.x + 18} y={t.y + TH - 6}
                  fill="#94a3b8" fontSize="8.5" fontWeight="700"
                  style={{ letterSpacing: '0.12em' }}>
                  LIVE
                </text>
              </g>

              {/* Mic icon — bottom-right; one tile is "muted" */}
              <MicIcon
                x={t.x + TW - 14} y={t.y + TH - 12}
                on={t.id !== 't3'}
              />

              {/* Name strip */}
              <text
                x={t.x + 8} y={t.y + 14}
                fill="#e2e8f0" fontSize="10" fontWeight="600">
                {t.name}
              </text>

              {/* "Speaking" rings on the active tile */}
              {t.active && [0, 1.2].map((d, k) => (
                <rect
                  key={`spk-${k}`}
                  x={t.x - 4} y={t.y - 4}
                  width={TW + 8} height={TH + 8} rx="10"
                  fill="none" stroke={t.color} strokeWidth="1.4" opacity="0"
                >
                  <animate attributeName="opacity"
                    values="0.55;0" dur="2.4s" begin={`${d}s`} repeatCount="indefinite" />
                  <animate attributeName="x"
                    values={`${t.x - 4};${t.x - 12}`}
                    dur="2.4s" begin={`${d}s`} repeatCount="indefinite" />
                  <animate attributeName="y"
                    values={`${t.y - 4};${t.y - 12}`}
                    dur="2.4s" begin={`${d}s`} repeatCount="indefinite" />
                  <animate attributeName="width"
                    values={`${TW + 8};${TW + 24}`}
                    dur="2.4s" begin={`${d}s`} repeatCount="indefinite" />
                  <animate attributeName="height"
                    values={`${TH + 8};${TH + 24}`}
                    dur="2.4s" begin={`${d}s`} repeatCount="indefinite" />
                </rect>
              ))}
            </g>
          )
        })}

        {/* ============================================================ */}
        {/* Bottom verdict caption                                        */}
        {/* ============================================================ */}
        <text x={CX} y="500" textAnchor="middle"
          fill="#e2e8f0" fontSize="13.5" fontWeight="600">
          всеки от мястото си — една обща маса през екрана
        </text>
      </svg>
    </div>
  )
}

// ---------- small icon helpers (drawn around 0,0) ----------

function HomeIcon() {
  return (
    <g>
      <path
        d="M -10 2 L 0 -10 L 10 2 L 10 10 L -10 10 Z"
        fill="none" stroke="#60a5fa" strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <rect x="-3" y="2" width="6" height="8"
        fill="none" stroke="#60a5fa" strokeWidth="1.2" />
    </g>
  )
}

function OfficeIcon() {
  return (
    <g>
      <rect x="-10" y="-10" width="20" height="20"
        fill="none" stroke="#22d3ee" strokeWidth="1.6" />
      {[[-6, -6], [0, -6], [6, -6], [-6, 0], [0, 0], [6, 0]].map(([x, y], i) => (
        <rect key={i} x={x - 1.6} y={y - 1.6} width="3.2" height="3.2"
          fill="#22d3ee" opacity="0.7" />
      ))}
      <rect x="-2" y="4" width="4" height="6"
        fill="none" stroke="#22d3ee" strokeWidth="1.2" />
    </g>
  )
}

function FlatIcon() {
  return (
    <g>
      <rect x="-11" y="-9" width="22" height="18"
        fill="none" stroke="#10b981" strokeWidth="1.6" rx="1.5" />
      <line x1="-11" y1="-2" x2="11" y2="-2"
        stroke="#10b981" strokeWidth="1" opacity="0.7" />
      <line x1="0" y1="-9" x2="0" y2="9"
        stroke="#10b981" strokeWidth="1" opacity="0.7" />
      {/* tiny lit windows */}
      <rect x="-7.5" y="-7" width="3" height="3" fill="#10b981" opacity="0.6" />
      <rect x="4.5" y="0.5" width="3" height="3" fill="#10b981" opacity="0.6" />
    </g>
  )
}

function FieldIcon() {
  // Small phone/tablet for "on site"
  return (
    <g>
      <rect x="-7" y="-11" width="14" height="22" rx="2.4"
        fill="none" stroke="#a78bfa" strokeWidth="1.6" />
      <rect x="-5" y="-8.5" width="10" height="15" rx="0.8"
        fill="#a78bfa" opacity="0.18" />
      <circle cx="0" cy="8.2" r="1.2"
        fill="none" stroke="#a78bfa" strokeWidth="1" />
    </g>
  )
}

function MicIcon({ x, y, on }) {
  const color = on ? '#10b981' : '#ef4444'
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-3" y="-6" width="6" height="9" rx="2.6"
        fill="none" stroke={color} strokeWidth="1.2" />
      <path d="M -5 1 Q -5 5 0 5 Q 5 5 5 1"
        fill="none" stroke={color} strokeWidth="1.2" />
      <line x1="0" y1="5" x2="0" y2="8"
        stroke={color} strokeWidth="1.2" />
      {!on && (
        <line x1="-6" y1="-7" x2="6" y2="8"
          stroke={color} strokeWidth="1.4" />
      )}
    </g>
  )
}
