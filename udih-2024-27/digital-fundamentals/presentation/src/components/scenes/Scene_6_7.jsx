// Scene 6.7 — TikTok: алгоритъм + безкраен поток + изчезващо време
// Pattern: annotated mock (a phone with a vertical short-video feed) flanked
// by two supporting actors — the watching algorithm eye (left) feeding the
// pick, and a fast-spinning clock (right) showing time vanishing.

const CX = 450
const CY = 290

// Phone outline — vertical, roughly centred
const PW = 168
const PH = 312
const PX = CX - PW / 2
const PY = CY - PH / 2

// Visible video tiles inside the phone (will scroll up). We render five and
// translate the whole stack upwards in a loop, so the feed feels endless.
const TILE_W = PW - 22
const TILE_H = 96
const TILE_GAP = 12
const STACK_STEP = TILE_H + TILE_GAP
const tiles = [
  { id: 't1', accent: '#22d3ee', icon: 'play' },
  { id: 't2', accent: '#f472b6', icon: 'heart' },
  { id: 't3', accent: '#a78bfa', icon: 'play' },
  { id: 't4', accent: '#10b981', icon: 'play' },
  { id: 't5', accent: '#f59e0b', icon: 'heart' },
]

// Eye position (left of phone) + clock position (right of phone)
const EYE_X = 200
const EYE_Y = 230
const CLOCK_X = 700
const CLOCK_Y = 230

// Tokens that drift from phone to eye (watched behaviour signals)
const signals = [
  { id: 'sg-heart', glyph: 'heart', color: '#f472b6', delay: 0 },
  { id: 'sg-skip',  glyph: 'skip',  color: '#94a3b8', delay: 1.4 },
  { id: 'sg-replay',glyph: 'replay',color: '#22d3ee', delay: 2.8 },
]

export default function Scene_6_7() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s67-screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0f172a" />
            <stop offset="100%" stopColor="#06101f" />
          </linearGradient>
          <radialGradient id="s67-halo">
            <stop offset="0%"  stopColor="#22d3ee" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#1e3a8a" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s67-eye-glow">
            <stop offset="0%"  stopColor="#a78bfa" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s67-tile" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0b1220" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <filter id="s67-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Clip the inner feed so tiles vanish behind the phone bezel */}
          <clipPath id="s67-feed-clip">
            <rect
              x={PX + 11}
              y={PY + 32}
              width={PW - 22}
              height={PH - 60}
              rx="6"
            />
          </clipPath>
          {/* Curve from phone-left edge to the eye, used for signal motion */}
          <path
            id="s67-sig-path"
            d={`M ${PX - 4} ${CY - 30} Q ${(PX + EYE_X) / 2 - 30} ${CY - 70}, ${EYE_X + 36} ${EYE_Y}`}
            fill="none"
          />
        </defs>

        {/* ============================================================ */}
        {/* Ambient halo behind the phone                                 */}
        {/* ============================================================ */}
        <circle cx={CX} cy={CY} r="260" fill="url(#s67-halo)" />

        <ellipse
          cx={CX} cy={CY} rx="340" ry="220" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 11"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="64s" repeatCount="indefinite"
          />
        </ellipse>

        {/* ============================================================ */}
        {/* Phone body                                                    */}
        {/* ============================================================ */}
        <g>
          {/* Outer chassis */}
          <rect
            x={PX - 6} y={PY - 6} width={PW + 12} height={PH + 12} rx="22"
            fill="#0b1220" stroke="#475569" strokeWidth="1.4"
          />
          {/* Screen */}
          <rect
            x={PX} y={PY} width={PW} height={PH} rx="16"
            fill="url(#s67-screen)" stroke="#22d3ee" strokeWidth="1.6"
            filter="url(#s67-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.5;1;0.5" dur="3.2s" repeatCount="indefinite"
            />
          </rect>
          {/* Speaker pill */}
          <rect
            x={CX - 22} y={PY + 10} width="44" height="6" rx="3"
            fill="#1e293b"
          />

          {/* Endless vertical feed — five tiles doubled, scrolled by a full
              cycle so the duplicate seamlessly slides into the original spot */}
          <g clipPath="url(#s67-feed-clip)">
            <g>
              <animateTransform
                attributeName="transform" type="translate"
                from="0 0" to={`0 -${STACK_STEP * tiles.length}`}
                dur={`${tiles.length * 4.2}s`} repeatCount="indefinite"
              />
              {[...tiles, ...tiles].map((t, i) => {
                const y = PY + 40 + i * STACK_STEP
                return (
                  <FeedTile
                    key={`${t.id}-${i}`}
                    x={PX + 11}
                    y={y}
                    w={TILE_W}
                    h={TILE_H}
                    accent={t.accent}
                    icon={t.icon}
                    highlight={i % tiles.length === 1}
                  />
                )
              })}
            </g>
          </g>

          {/* Top status bar overlay (over the feed) */}
          <rect
            x={PX} y={PY} width={PW} height="26" rx="16"
            fill="#0b1220" opacity="0.85"
          />
          <text
            x={CX} y={PY + 18} textAnchor="middle"
            fill="#e2e8f0" fontSize="11" fontWeight="700"
            style={{ letterSpacing: '0.18em' }}
          >
            ЗА ВАС
          </text>

          {/* Bottom nav overlay */}
          <rect
            x={PX} y={PY + PH - 28} width={PW} height="28" rx="16"
            fill="#0b1220" opacity="0.9"
          />
          {[-46, -15, 16, 47].map((dx, i) => (
            <circle
              key={i} cx={CX + dx} cy={PY + PH - 14} r="3"
              fill={i === 1 ? '#22d3ee' : '#475569'}
            />
          ))}

          {/* Side hint — finger swiping up (a chevron pulsing on right edge) */}
          <g transform={`translate(${PX + PW - 16} ${CY})`}>
            <path
              d="M -5 6 L 0 -4 L 5 6"
              fill="none" stroke="#22d3ee" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <animate
                attributeName="opacity"
                values="0.2;1;0.2" dur="1.8s" repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform" type="translate"
                values="0 6; 0 -4; 0 6" dur="1.8s" repeatCount="indefinite"
              />
            </path>
          </g>
        </g>

        {/* ============================================================ */}
        {/* The watching eye — algorithm                                  */}
        {/* ============================================================ */}
        <g transform={`translate(${EYE_X} ${EYE_Y})`}>
          {/* Soft glow under the eye */}
          <circle r="80" fill="url(#s67-eye-glow)" />

          {/* Outer almond shape */}
          <path
            d="M -52 0 Q 0 -36 52 0 Q 0 36 -52 0 Z"
            fill="#0b1220" stroke="#a78bfa" strokeWidth="2"
            filter="url(#s67-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.5;1;0.5" dur="3.6s" repeatCount="indefinite"
            />
          </path>

          {/* Iris — tracks left-right slightly to feel alive */}
          <g>
            <animateTransform
              attributeName="transform" type="translate"
              values="-6 0; 8 0; -6 0" dur="6s" repeatCount="indefinite"
            />
            <circle r="16" fill="#1e3a8a" stroke="#a78bfa" strokeWidth="1.6" />
            <circle r="7" fill="#0b1220" />
            <circle r="2.4" cx="3" cy="-3" fill="#e2e8f0" opacity="0.85" />
          </g>

          {/* Blink — a thin lid that closes briefly */}
          <path
            d="M -52 0 Q 0 -36 52 0 Q 0 36 -52 0 Z"
            fill="#0b1220" opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0;1;0;0" keyTimes="0;0.92;0.96;1;1"
              dur="5.4s" repeatCount="indefinite"
            />
          </path>

          {/* Label */}
          <text
            x="0" y="58" textAnchor="middle"
            fill="#e2e8f0" fontSize="13" fontWeight="700"
            style={{ letterSpacing: '0.12em' }}
          >
            АЛГОРИТЪМ
          </text>
          <text
            x="0" y="74" textAnchor="middle"
            fill="#94a3b8" fontSize="10.5" fontWeight="500"
          >
            гледа какво гледате
          </text>
        </g>

        {/* Connection — eye line of sight curving toward the phone */}
        <path
          d={`M ${EYE_X + 50} ${EYE_Y - 4} Q ${(EYE_X + PX) / 2 + 20} ${EYE_Y - 60}, ${PX - 4} ${CY - 30}`}
          fill="none" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 6"
          opacity="0.55"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="9" to="0" dur="1.6s" repeatCount="indefinite"
          />
        </path>

        {/* Signal tokens drifting from phone back to the eye */}
        {signals.map((s) => (
          <g key={s.id}>
            <circle r="9" fill="#0b1220" stroke={s.color} strokeWidth="1.4">
              <animateMotion
                dur="4.2s" repeatCount="indefinite" begin={`${s.delay}s`}
              >
                <mpath href="#s67-sig-path" />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1;0" keyTimes="0;0.12;0.88;1"
                dur="4.2s" begin={`${s.delay}s`} repeatCount="indefinite"
              />
            </circle>
            <g>
              <animateMotion
                dur="4.2s" repeatCount="indefinite" begin={`${s.delay}s`}
              >
                <mpath href="#s67-sig-path" />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1;0" keyTimes="0;0.12;0.88;1"
                dur="4.2s" begin={`${s.delay}s`} repeatCount="indefinite"
              />
              <SignalGlyph kind={s.glyph} color={s.color} />
            </g>
          </g>
        ))}

        {/* ============================================================ */}
        {/* The fast clock — time disappears                              */}
        {/* ============================================================ */}
        <g transform={`translate(${CLOCK_X} ${CLOCK_Y})`}>
          {/* Outer ring */}
          <circle r="52" fill="#0b1220" stroke="#f59e0b" strokeWidth="2"
            filter="url(#s67-glow)">
            <animate
              attributeName="stroke-opacity"
              values="0.55;1;0.55" dur="3s" repeatCount="indefinite"
            />
          </circle>
          {/* Hour ticks */}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 * Math.PI) / 180
            const r1 = 44
            const r2 = i % 3 === 0 ? 36 : 40
            return (
              <line
                key={i}
                x1={Math.sin(a) * r2} y1={-Math.cos(a) * r2}
                x2={Math.sin(a) * r1} y2={-Math.cos(a) * r1}
                stroke="#475569" strokeWidth={i % 3 === 0 ? 1.6 : 1}
              />
            )
          })}

          {/* Hour hand — spinning fast (time disappears) */}
          <g>
            <animateTransform
              attributeName="transform" type="rotate"
              from="0 0 0" to="360 0 0"
              dur="6s" repeatCount="indefinite"
            />
            <line
              x1="0" y1="0" x2="0" y2="-24"
              stroke="#e2e8f0" strokeWidth="2.4" strokeLinecap="round"
            />
          </g>

          {/* Minute hand — spinning even faster */}
          <g>
            <animateTransform
              attributeName="transform" type="rotate"
              from="0 0 0" to="360 0 0"
              dur="1.2s" repeatCount="indefinite"
            />
            <line
              x1="0" y1="0" x2="0" y2="-36"
              stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round"
            />
          </g>

          {/* Centre cap */}
          <circle r="3" fill="#0b1220" stroke="#f59e0b" strokeWidth="1.2" />

          {/* Sparkles — tiny particles "evaporating" upward */}
          {[0, 1.2, 2.4].map((d, i) => (
            <circle
              key={i}
              r="1.6" fill="#f59e0b"
            >
              <animate
                attributeName="cy"
                values="-44;-78" dur="2.2s"
                begin={`${d}s`} repeatCount="indefinite"
              />
              <animate
                attributeName="cx"
                values={`${-10 + i * 8};${-6 + i * 8}`}
                dur="2.2s" begin={`${d}s`} repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;1;0" dur="2.2s"
                begin={`${d}s`} repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Label */}
          <text
            x="0" y="74" textAnchor="middle"
            fill="#e2e8f0" fontSize="13" fontWeight="700"
            style={{ letterSpacing: '0.12em' }}
          >
            ВРЕМЕТО
          </text>
          <text
            x="0" y="90" textAnchor="middle"
            fill="#94a3b8" fontSize="10.5" fontWeight="500"
          >
            тече незабелязано
          </text>
        </g>
      </svg>
    </div>
  )
}

// ---------- inner pieces ----------

function FeedTile({ x, y, w, h, accent, icon, highlight }) {
  const cx = x + w / 2
  const cy = y + h / 2
  return (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx="6"
        fill="url(#s67-tile)"
        stroke={highlight ? accent : '#1e293b'}
        strokeWidth={highlight ? 1.4 : 0.8}
        opacity={highlight ? 1 : 0.92}
      />
      {/* Faint vertical "video" lines suggesting movement */}
      <line
        x1={x + 8} y1={y + h - 8} x2={x + w - 8} y2={y + h - 8}
        stroke={accent} strokeWidth="1" opacity="0.45"
      />
      {/* Play / heart glyph centred */}
      {icon === 'play' ? (
        <path
          d={`M ${cx - 7} ${cy - 9} L ${cx + 9} ${cy} L ${cx - 7} ${cy + 9} Z`}
          fill={accent} opacity={highlight ? 0.95 : 0.65}
        />
      ) : (
        <path
          d={`M ${cx} ${cy + 9}
              C ${cx - 12} ${cy + 1}, ${cx - 12} ${cy - 10}, ${cx - 4} ${cy - 8}
              C ${cx - 1} ${cy - 7}, ${cx} ${cy - 4}, ${cx} ${cy - 2}
              C ${cx} ${cy - 4}, ${cx + 1} ${cy - 7}, ${cx + 4} ${cy - 8}
              C ${cx + 12} ${cy - 10}, ${cx + 12} ${cy + 1}, ${cx} ${cy + 9} Z`}
          fill={accent} opacity={highlight ? 0.95 : 0.7}
        />
      )}
      {/* Tiny "username" hairline at top-left */}
      <rect
        x={x + 8} y={y + 8} width="34" height="5" rx="2"
        fill="#334155" opacity="0.85"
      />
    </g>
  )
}

function SignalGlyph({ kind, color }) {
  switch (kind) {
    case 'heart':
      return (
        <path
          d="M 0 4 C -7 -1, -7 -8, -2 -7 C 0 -6.5, 0 -4, 0 -3 C 0 -4, 0 -6.5, 2 -7 C 7 -8, 7 -1, 0 4 Z"
          fill={color}
        />
      )
    case 'skip':
      return (
        <path
          d="M -4 -5 L 3 0 L -4 5 Z M 3 -5 L 5 -5 L 5 5 L 3 5 Z"
          fill={color}
        />
      )
    case 'replay':
    default:
      return (
        <g fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round">
          <path d="M 5 -2 A 6 6 0 1 0 5 2" />
          <path d="M 5 -5 L 5 -1 L 1 -1" strokeLinejoin="round" />
        </g>
      )
  }
}
