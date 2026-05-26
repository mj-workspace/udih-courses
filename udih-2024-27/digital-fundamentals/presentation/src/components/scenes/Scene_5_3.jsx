// Scene 5.3 — Основни функции (basic functions during a video meeting)
// Pattern: annotated mock — a stylised meeting window with the bottom
// control bar as the focal element. A cycling spotlight walks through the
// five core buttons (mic, camera, share, chat, raise hand). The mic icon
// periodically toggles muted/unmuted — reinforcing "if they can't hear you,
// your mic is off". A small "ВРЪЗКА" badge with a click traveling into the
// window header carries the "join via link" idea.

const CX = 450
const CY = 290

// Meeting window frame
const WIN_X = 130
const WIN_Y = 90
const WIN_W = 640
const WIN_H = 380
const HEAD_H = 28

// Three small participant tiles in the upper area
const TILE_W = 130
const TILE_H = 88
const TILE_GAP = 26
const TILES_Y = 138
const TILES_TOTAL = 3 * TILE_W + 2 * TILE_GAP
const TILES_X0 = WIN_X + (WIN_W - TILES_TOTAL) / 2

const tiles = [
  { id: 't1', name: 'Мария', color: '#3b82f6', active: false },
  { id: 't2', name: 'Иван',  color: '#22d3ee', active: true  },
  { id: 't3', name: 'Елена', color: '#a78bfa', active: false },
].map((t, i) => ({
  ...t,
  x: TILES_X0 + i * (TILE_W + TILE_GAP),
  y: TILES_Y,
}))

// Active speaker preview — fills the middle stage
const STAGE_X = 250
const STAGE_Y = 245
const STAGE_W = 400
const STAGE_H = 140

// Control bar — the focal element
const BAR_X = 220
const BAR_Y = 405
const BAR_W = 460
const BAR_H = 56
const BTN_R = 21
const BTN_CY = BAR_Y + BAR_H / 2

const buttons = [
  { id: 'mic',   x: 270 },
  { id: 'cam',   x: 360 },
  { id: 'share', x: 450 },
  { id: 'chat',  x: 540 },
  { id: 'hand',  x: 630 },
]

const CYCLE = 10 // seconds for the spotlight to walk all 5 buttons

export default function Scene_5_3() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s53-win" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0f172a" />
            <stop offset="100%" stopColor="#06101f" />
          </linearGradient>
          <linearGradient id="s53-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#142244" />
            <stop offset="100%" stopColor="#091327" />
          </linearGradient>
          <radialGradient id="s53-halo">
            <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.22" />
            <stop offset="80%"  stopColor="#1e3a8a" stopOpacity="0" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <filter id="s53-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient halo behind the window */}
        <ellipse cx={CX} cy={CY} rx="380" ry="240" fill="url(#s53-halo)" />

        {/* Slow rotating dashed ring */}
        <ellipse
          cx={CX} cy={CY} rx="360" ry="225" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 11"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="55s" repeatCount="indefinite"
          />
        </ellipse>

        {/* ============== Join via link indicator (top-left) ============== */}
        <g>
          <g transform="translate(95 62)">
            <rect
              x="-40" y="-13" width="84" height="26" rx="13"
              fill="#0f1a30" stroke="#22d3ee" strokeWidth="1.2"
            />
            <g transform="translate(-26 0)">
              <circle r="4.4" fill="none" stroke="#22d3ee" strokeWidth="1.4" />
              <circle cx="6.4" r="4.4" fill="none" stroke="#22d3ee" strokeWidth="1.4" />
            </g>
            <text
              x="10" y="4" textAnchor="middle"
              fill="#22d3ee" fontSize="10.5" fontWeight="700"
              style={{ letterSpacing: '0.12em', fontFamily: 'monospace' }}
            >
              ВРЪЗКА
            </text>
          </g>
          {/* dashed arrow from link badge → window header */}
          <path
            d="M 145 76 Q 150 86 158 94"
            fill="none" stroke="#22d3ee" strokeWidth="1.6"
            strokeDasharray="4 4" opacity="0.7"
          >
            <animate
              attributeName="stroke-dashoffset" from="8" to="0"
              dur="1.4s" repeatCount="indefinite"
            />
          </path>
          {/* Click traveling along the link path */}
          <circle r="3.4" fill="#22d3ee" filter="url(#s53-glow)">
            <animateMotion
              dur="4s" repeatCount="indefinite"
              path="M 60 62 Q 110 78 158 96"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0" keyTimes="0;0.1;0.85;1"
              dur="4s" repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* ============== Meeting window ============== */}
        <g>
          {/* Outer frame */}
          <rect
            x={WIN_X} y={WIN_Y} width={WIN_W} height={WIN_H} rx="10"
            fill="url(#s53-win)" stroke="#334155" strokeWidth="1.4"
          />

          {/* Header bar */}
          <rect
            x={WIN_X} y={WIN_Y} width={WIN_W} height={HEAD_H} rx="10"
            fill="#0b1428"
          />
          <rect
            x={WIN_X} y={WIN_Y + HEAD_H - 8} width={WIN_W} height={8}
            fill="#0b1428"
          />
          <line
            x1={WIN_X} y1={WIN_Y + HEAD_H} x2={WIN_X + WIN_W} y2={WIN_Y + HEAD_H}
            stroke="#1e293b" strokeWidth="1"
          />
          {/* Traffic lights */}
          {['#ef4444', '#f59e0b', '#10b981'].map((c, i) => (
            <circle
              key={`tl-${i}`}
              cx={WIN_X + 16 + i * 14} cy={WIN_Y + HEAD_H / 2}
              r="4" fill={c} opacity="0.85"
            />
          ))}
          {/* Window title */}
          <text
            x={CX} y={WIN_Y + HEAD_H / 2 + 4} textAnchor="middle"
            fill="#94a3b8" fontSize="11.5" fontWeight="600"
            style={{ letterSpacing: '0.04em' }}
          >
            Среща — 3 участници
          </text>
          {/* REC indicator */}
          <g transform={`translate(${WIN_X + WIN_W - 52} ${WIN_Y + HEAD_H / 2})`}>
            <circle r="3.2" fill="#ef4444" filter="url(#s53-glow)">
              <animate
                attributeName="opacity" values="0.5;1;0.5"
                dur="1.6s" repeatCount="indefinite"
              />
            </circle>
            <text
              x="8" y="3.5" fill="#94a3b8" fontSize="9" fontWeight="700"
              style={{ letterSpacing: '0.14em' }}
            >
              REC
            </text>
          </g>
        </g>

        {/* ============== Participant tiles (top strip) ============== */}
        {tiles.map((t, i) => {
          const cx = t.x + TILE_W / 2
          const cy = t.y + TILE_H / 2
          return (
            <g key={t.id}>
              <rect
                x={t.x} y={t.y} width={TILE_W} height={TILE_H} rx="6"
                fill="#0a1426"
                stroke={t.active ? t.color : '#1e293b'}
                strokeWidth={t.active ? 1.8 : 1}
                filter={t.active ? 'url(#s53-glow)' : undefined}
              >
                {t.active && (
                  <animate
                    attributeName="stroke-opacity" values="0.6;1;0.6"
                    dur="2.6s" repeatCount="indefinite"
                  />
                )}
              </rect>
              {/* person silhouette */}
              <circle cx={cx} cy={cy - 8} r="10" fill={t.color} opacity="0.85" />
              <path
                d={`M ${cx - 20} ${t.y + TILE_H - 8}
                    Q ${cx} ${cy + 6} ${cx + 20} ${t.y + TILE_H - 8}
                    L ${cx + 20} ${t.y + TILE_H}
                    L ${cx - 20} ${t.y + TILE_H} Z`}
                fill={t.color} opacity="0.5"
              />
              {/* name strip */}
              <text
                x={t.x + 8} y={t.y + 12}
                fill="#cbd5e1" fontSize="9.5" fontWeight="600"
              >
                {t.name}
              </text>
              {/* speaking ring on the active tile */}
              {t.active && [0, 1.3].map((d, k) => (
                <rect
                  key={`spk-${k}`}
                  x={t.x - 3} y={t.y - 3}
                  width={TILE_W + 6} height={TILE_H + 6} rx="8"
                  fill="none" stroke={t.color} strokeWidth="1.2" opacity="0"
                >
                  <animate
                    attributeName="opacity" values="0.55;0"
                    dur="2.6s" begin={`${d}s`} repeatCount="indefinite"
                  />
                  <animate
                    attributeName="x" values={`${t.x - 3};${t.x - 10}`}
                    dur="2.6s" begin={`${d}s`} repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y" values={`${t.y - 3};${t.y - 10}`}
                    dur="2.6s" begin={`${d}s`} repeatCount="indefinite"
                  />
                  <animate
                    attributeName="width"
                    values={`${TILE_W + 6};${TILE_W + 20}`}
                    dur="2.6s" begin={`${d}s`} repeatCount="indefinite"
                  />
                  <animate
                    attributeName="height"
                    values={`${TILE_H + 6};${TILE_H + 20}`}
                    dur="2.6s" begin={`${d}s`} repeatCount="indefinite"
                  />
                </rect>
              ))}
            </g>
          )
        })}

        {/* ============== Active-speaker stage (middle) ============== */}
        <g opacity="0.95">
          <rect
            x={STAGE_X} y={STAGE_Y} width={STAGE_W} height={STAGE_H} rx="8"
            fill="#0a1426" stroke="#22d3ee" strokeWidth="1.4" opacity="0.85"
            filter="url(#s53-glow)"
          >
            <animate
              attributeName="stroke-opacity" values="0.5;0.95;0.5"
              dur="3.4s" repeatCount="indefinite"
            />
          </rect>
          {/* large person silhouette */}
          <g transform={`translate(${STAGE_X + STAGE_W / 2} ${STAGE_Y + STAGE_H / 2})`}>
            <circle cx="0" cy="-18" r="22" fill="#22d3ee" opacity="0.85" />
            <path
              d="M -42 50 Q 0 -2 42 50 L 42 70 L -42 70 Z"
              fill="#22d3ee" opacity="0.45"
              transform="translate(0 -4)"
            />
          </g>
          {/* name strip */}
          <text
            x={STAGE_X + 12} y={STAGE_Y + 16}
            fill="#cbd5e1" fontSize="11" fontWeight="600"
          >
            Иван
          </text>
          {/* live dot */}
          <g>
            <circle
              cx={STAGE_X + 12} cy={STAGE_Y + STAGE_H - 12}
              r="3.2" fill="#ef4444" filter="url(#s53-glow)"
            >
              <animate
                attributeName="opacity" values="0.4;1;0.4"
                dur="1.8s" repeatCount="indefinite"
              />
            </circle>
            <text
              x={STAGE_X + 20} y={STAGE_Y + STAGE_H - 9}
              fill="#94a3b8" fontSize="8.5" fontWeight="700"
              style={{ letterSpacing: '0.12em' }}
            >
              LIVE
            </text>
          </g>
        </g>

        {/* ============== Control bar — focal element ============== */}
        <g>
          <rect
            x={BAR_X} y={BAR_Y} width={BAR_W} height={BAR_H} rx={BAR_H / 2}
            fill="url(#s53-bar)" stroke="#475569" strokeWidth="1.4"
            filter="url(#s53-glow)"
          />

          {/* Cycling spotlight behind each button */}
          {buttons.map((b, i) => {
            const t1 = i * 0.2 + 0.02
            const t2 = i * 0.2 + 0.06
            const t3 = i * 0.2 + 0.14
            const t4 = i * 0.2 + 0.18
            const kt = `0;${t1};${t2};${t3};${t4};1`
            return (
              <circle
                key={`spot-${b.id}`}
                cx={b.x} cy={BTN_CY} r={BTN_R + 4}
                fill="none" stroke="#60a5fa" strokeWidth="2.2"
                opacity="0" filter="url(#s53-glow)"
              >
                <animate
                  attributeName="opacity"
                  values="0;0;0.95;0.95;0;0"
                  keyTimes={kt}
                  dur={`${CYCLE}s`} repeatCount="indefinite"
                />
                <animate
                  attributeName="r"
                  values={`${BTN_R + 4};${BTN_R + 4};${BTN_R + 12};${BTN_R + 12};${BTN_R + 4};${BTN_R + 4}`}
                  keyTimes={kt}
                  dur={`${CYCLE}s`} repeatCount="indefinite"
                />
              </circle>
            )
          })}

          {/* Buttons */}
          {buttons.map((b) => (
            <g key={b.id}>
              {b.id === 'share' ? (
                <circle
                  cx={b.x} cy={BTN_CY} r={BTN_R + 2}
                  fill="#0f1a30" stroke="#22d3ee" strokeWidth="1.8"
                />
              ) : (
                <circle
                  cx={b.x} cy={BTN_CY} r={BTN_R}
                  fill="#0b1428" stroke="#475569" strokeWidth="1.3"
                />
              )}
              {b.id === 'mic'   && <MicIcon x={b.x} y={BTN_CY} />}
              {b.id === 'cam'   && <CamIcon x={b.x} y={BTN_CY} />}
              {b.id === 'share' && <ShareIcon x={b.x} y={BTN_CY} />}
              {b.id === 'chat'  && <ChatIcon x={b.x} y={BTN_CY} />}
              {b.id === 'hand'  && <HandIcon x={b.x} y={BTN_CY} />}
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}

// ---------- icons (centered around x,y) ----------

function MicIcon({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* On — green, visible most of the time */}
      <g>
        <rect
          x="-5" y="-10" width="10" height="14" rx="4"
          fill="none" stroke="#10b981" strokeWidth="1.7"
        />
        <path
          d="M -9 -2 Q -9 6 0 6 Q 9 6 9 -2"
          fill="none" stroke="#10b981" strokeWidth="1.7"
        />
        <line x1="0" y1="6" x2="0" y2="10" stroke="#10b981" strokeWidth="1.7" />
        <animate
          attributeName="opacity"
          values="1;1;0;0;1;1"
          keyTimes="0;0.5;0.55;0.85;0.9;1"
          dur="9s" repeatCount="indefinite"
        />
      </g>
      {/* Muted — red with slash */}
      <g>
        <rect
          x="-5" y="-10" width="10" height="14" rx="4"
          fill="none" stroke="#ef4444" strokeWidth="1.7"
        />
        <path
          d="M -9 -2 Q -9 6 0 6 Q 9 6 9 -2"
          fill="none" stroke="#ef4444" strokeWidth="1.7"
        />
        <line x1="0" y1="6" x2="0" y2="10" stroke="#ef4444" strokeWidth="1.7" />
        <line x1="-11" y1="-12" x2="11" y2="12" stroke="#ef4444" strokeWidth="2.2" />
        <animate
          attributeName="opacity"
          values="0;0;1;1;0;0"
          keyTimes="0;0.5;0.55;0.85;0.9;1"
          dur="9s" repeatCount="indefinite"
        />
      </g>
    </g>
  )
}

function CamIcon({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x="-9" y="-7" width="14" height="14" rx="2"
        fill="none" stroke="#cbd5e1" strokeWidth="1.7"
      />
      <path
        d="M 5 -3 L 11 -7 L 11 7 L 5 3 Z"
        fill="#cbd5e1" opacity="0.85"
      />
    </g>
  )
}

function ShareIcon({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x="-11" y="-8" width="22" height="14" rx="1.6"
        fill="none" stroke="#22d3ee" strokeWidth="1.7"
      />
      <line x1="-5" y1="9" x2="5" y2="9" stroke="#22d3ee" strokeWidth="1.7" />
      <path
        d="M -3 2 L 0 -3 L 3 2 M 0 -3 L 0 4"
        fill="none" stroke="#22d3ee" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </g>
  )
}

function ChatIcon({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M -11 -7 L 9 -7 Q 11 -7 11 -5 L 11 3 Q 11 5 9 5 L -3 5 L -7 9 L -7 5 L -9 5 Q -11 5 -11 3 L -11 -5 Q -11 -7 -9 -7 Z"
        fill="none" stroke="#cbd5e1" strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="-5" cy="-1" r="1.3" fill="#cbd5e1" />
      <circle cx="-1" cy="-1" r="1.3" fill="#cbd5e1" />
      <circle cx="3"  cy="-1" r="1.3" fill="#cbd5e1" />
    </g>
  )
}

function HandIcon({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g>
        <path
          d="M -7 8 Q -10 4 -8 -1 L -6 -5
             M -6 -5 Q -6 -8 -3 -8 Q 0 -8 0 -5 L 0 -2
             M 0 -2 L 0 -9 Q 0 -11 2 -11 Q 4 -11 4 -9 L 4 -2
             M 4 -2 L 4 -8 Q 4 -10 6 -10 Q 8 -10 8 -8 L 8 0
             Q 8 8 2 9 L -4 9 Q -7 9 -7 5 Z"
          fill="#0b1428" stroke="#f59e0b" strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <animateTransform
          attributeName="transform" type="rotate"
          values="-10;10;-10" dur="2.4s" repeatCount="indefinite"
        />
      </g>
    </g>
  )
}
