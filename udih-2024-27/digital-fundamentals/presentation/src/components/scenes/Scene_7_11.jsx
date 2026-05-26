// Scene 7.11 — Поверителност и сигурност
// Pattern: gated input + flow. Sensitive items (личните данни, банкови,
// пароли, вътрешни документи) hover above a red barrier and bounce off it —
// they must NOT enter the AI input box. Below the barrier, only an anonymised
// prompt enters the assistant. From the assistant a small "postcard" packet
// travels openly to an "external servers" cloud — visible eyes hint that the
// channel is not a locked drawer but more like an open mailbox.

const RED = '#ef4444'
const RED2 = '#f87171'
const GREEN = '#10b981'
const GREEN2 = '#34d399'
const CYAN = '#22d3ee'
const AMBER = '#f59e0b'
const MUTED = '#94a3b8'
const FAINT = '#475569'
const TEXT = '#e2e8f0'

// Forbidden items above the barrier
const items = [
  { id: 'pii',  label: 'Лични данни', sub: 'име, ЕГН, адрес', x: 240 },
  { id: 'bank', label: 'Банкови',     sub: 'карти, сметки',   x: 380 },
  { id: 'pass', label: 'Пароли',      sub: 'служебни, лични', x: 520 },
  { id: 'doc',  label: 'Вътрешни',    sub: 'служ. документи', x: 660 },
]

const ITEM_Y = 118       // centre y of forbidden items
const BARRIER_Y = 208    // red barrier line
const INPUT_CX = 380     // AI input box centre x
const INPUT_CY = 320     // AI input box centre y
const INPUT_W = 360
const INPUT_H = 116
const CLOUD_CX = 770
const CLOUD_CY = 460

export default function Scene_7_11() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s711-input-grad">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#0b1220" />
          </radialGradient>
          <radialGradient id="s711-danger-halo">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s711-card" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>
          <filter id="s711-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="s711-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Path the postcard travels along — input right edge → cloud */}
          <path
            id="s711-route"
            d={`M ${INPUT_CX + INPUT_W / 2} ${INPUT_CY + 8}
                Q ${INPUT_CX + INPUT_W / 2 + 70} ${INPUT_CY + 110}
                  ${CLOUD_CX - 36} ${CLOUD_CY - 6}`}
            fill="none"
          />
        </defs>

        {/* ============================================================ */}
        {/* Ambient                                                       */}
        {/* ============================================================ */}
        <ellipse
          cx="450" cy="290" rx="360" ry="240" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 11"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from="0 450 290" to="360 450 290"
            dur="62s" repeatCount="indefinite"
          />
        </ellipse>

        {/* ============================================================ */}
        {/* Top band — forbidden items hovering above the barrier         */}
        {/* ============================================================ */}
        {items.map((it, i) => (
          <ForbiddenItem
            key={it.id}
            item={it}
            y={ITEM_Y}
            phase={i * 0.4}
          />
        ))}

        {/* ============================================================ */}
        {/* Red barrier line                                              */}
        {/* ============================================================ */}
        <g>
          <line
            x1="140" y1={BARRIER_Y} x2="760" y2={BARRIER_Y}
            stroke={RED} strokeWidth="2"
            strokeDasharray="10 6" opacity="0.85"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="16" to="0" dur="1.8s" repeatCount="indefinite"
            />
          </line>
          {/* Soft red wash to mark danger zone above */}
          <rect
            x="120" y={BARRIER_Y - 6} width="660" height="4" rx="2"
            fill={RED} opacity="0.18"
          >
            <animate
              attributeName="opacity"
              values="0.12;0.28;0.12" dur="3.4s" repeatCount="indefinite"
            />
          </rect>
          {/* STOP badge in the middle of the barrier */}
          <g transform={`translate(450 ${BARRIER_Y})`}>
            <rect
              x="-44" y="-13" width="88" height="26" rx="13"
              fill="#0b1220" stroke={RED} strokeWidth="1.6"
              filter="url(#s711-glow)"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.7;1;0.7" dur="2.6s" repeatCount="indefinite"
              />
            </rect>
            {/* small octagon stop sign */}
            <g transform="translate(-26 0)">
              <polygon
                points="-7,-3 -3,-7 3,-7 7,-3 7,3 3,7 -3,7 -7,3"
                fill={RED} stroke={RED2} strokeWidth="0.6"
              />
              <text
                x="0" y="2.4" textAnchor="middle"
                fill="#0b1220" fontSize="6.5" fontWeight="800"
              >
                !
              </text>
            </g>
            <text
              x="6" y="4.4" textAnchor="middle"
              fill={RED2} fontSize="12" fontWeight="800"
              style={{ letterSpacing: '0.22em' }}
            >
              СТОП
            </text>
          </g>
        </g>

        {/* ============================================================ */}
        {/* AI Input box — only anonymised text enters                    */}
        {/* ============================================================ */}
        <AIInput />

        {/* ============================================================ */}
        {/* Path → external servers cloud, with a travelling postcard     */}
        {/* ============================================================ */}
        <g>
          {/* visible route */}
          <use
            href="#s711-route"
            stroke={AMBER} strokeWidth="1.4" fill="none"
            strokeDasharray="5 6" opacity="0.6"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="11" to="0" dur="1.7s" repeatCount="indefinite"
            />
          </use>

          {/* "watching eyes" along the path — open mailbox metaphor */}
          <g>
            <WatchingEye x={620} y={418} delay="0s" />
            <WatchingEye x={690} y={448} delay="1.2s" />
          </g>

          {/* travelling postcard */}
          <g>
            <g>
              <animateMotion
                dur="5.2s" repeatCount="indefinite"
                rotate="auto"
              >
                <mpath href="#s711-route" />
              </animateMotion>
              <Postcard />
            </g>
          </g>
        </g>

        {/* ============================================================ */}
        {/* External servers cloud                                        */}
        {/* ============================================================ */}
        <ExternalServers />
      </svg>
    </div>
  )
}

// ============================================================
// Forbidden item — circle badge with icon, label, no-entry stripe
// ============================================================
function ForbiddenItem({ item, y, phase }) {
  const { x, id, label, sub } = item
  return (
    <g>
      <g transform={`translate(${x} ${y})`}>
        {/* bobbing wrapper — gentle vertical wobble */}
        <animateTransform
          attributeName="transform" type="translate"
          values={`${x} ${y - 2}; ${x} ${y + 4}; ${x} ${y - 2}`}
          keyTimes="0;0.5;1"
          dur="4.2s" begin={`${phase}s`} repeatCount="indefinite"
          additive="replace"
        />

        {/* hot halo */}
        <circle r="58" fill="url(#s711-danger-halo)" />

        {/* outer urgency pulse */}
        {[0, 1.6].map((d, k) => (
          <circle
            key={k} r="38" fill="none"
            stroke={RED} strokeWidth="1" opacity="0"
          >
            <animate
              attributeName="r" values="38;62"
              dur="3.4s" begin={`${phase + d}s`} repeatCount="indefinite"
            />
            <animate
              attributeName="opacity" values="0.55;0"
              dur="3.4s" begin={`${phase + d}s`} repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* badge */}
        <circle
          r="38" fill="#0b1220"
          stroke={RED2} strokeWidth="2"
          filter="url(#s711-glow)"
        />

        {/* icon */}
        <g transform="translate(0 -3)">
          <ItemIcon id={id} />
        </g>

        {/* diagonal no-entry stripe across the badge */}
        <g>
          <line
            x1="-30" y1="-30" x2="30" y2="30"
            stroke={RED} strokeWidth="3.2" strokeLinecap="round" opacity="0.85"
          >
            <animate
              attributeName="opacity"
              values="0.6;0.95;0.6" dur="2.4s"
              begin={`${phase}s`} repeatCount="indefinite"
            />
          </line>
        </g>

        {/* labels below */}
        <text
          x="0" y="56" textAnchor="middle"
          fill={TEXT} fontSize="13" fontWeight="700"
        >
          {label}
        </text>
        <text
          x="0" y="72" textAnchor="middle"
          fill={MUTED} fontSize="10.5"
        >
          {sub}
        </text>
      </g>
    </g>
  )
}

function ItemIcon({ id }) {
  switch (id) {
    case 'pii':  return <IdCardIcon />
    case 'bank': return <CardIcon />
    case 'pass': return <KeyIcon />
    case 'doc':  return <LockedFolderIcon />
    default: return null
  }
}

// ID card with photo silhouette and name lines
function IdCardIcon() {
  return (
    <g>
      <rect
        x="-15" y="-10" width="30" height="20" rx="2.4"
        fill="none" stroke={RED2} strokeWidth="1.7"
      />
      {/* photo */}
      <rect x="-12" y="-7" width="9" height="9" rx="1" fill={RED2} opacity="0.85" />
      <circle cx="-7.5" cy="-3.4" r="2" fill="#0b1220" />
      <path d="M -11 1.5 Q -7.5 -1 -4 1.5" fill="none" stroke="#0b1220" strokeWidth="0.9" />
      {/* lines */}
      <line x1="-1" y1="-6" x2="12" y2="-6" stroke={RED2} strokeWidth="1.4" />
      <line x1="-1" y1="-2" x2="12" y2="-2" stroke={RED2} strokeWidth="1" opacity="0.75" />
      <line x1="-1" y1="2"  x2="9"  y2="2"  stroke={RED2} strokeWidth="1" opacity="0.55" />
    </g>
  )
}

// Credit card with magnetic stripe and digits
function CardIcon() {
  return (
    <g>
      <rect
        x="-16" y="-10" width="32" height="20" rx="2.6"
        fill="none" stroke={RED2} strokeWidth="1.7"
      />
      <rect x="-16" y="-5" width="32" height="4" fill={RED2} opacity="0.65" />
      {/* chip */}
      <rect x="-12" y="3" width="6" height="4.5" rx="0.8" fill={RED2} opacity="0.85" />
      {/* digits */}
      <text
        x="6" y="8" textAnchor="end"
        fill={RED2} fontSize="5.5" fontWeight="700"
        fontFamily="monospace" style={{ letterSpacing: '0.1em' }}
      >
        •••• 4321
      </text>
    </g>
  )
}

// Key icon
function KeyIcon() {
  return (
    <g transform="rotate(-30)">
      <circle cx="-9" cy="0" r="6" fill="none" stroke={RED2} strokeWidth="2" />
      <circle cx="-9" cy="0" r="2.2" fill={RED2} />
      <rect x="-3" y="-1.4" width="18" height="2.8" rx="0.6" fill={RED2} />
      <rect x="9"  y="1.4"  width="3"  height="4" fill={RED2} />
      <rect x="13" y="1.4"  width="2"  height="4" fill={RED2} />
    </g>
  )
}

// Folder with a small lock
function LockedFolderIcon() {
  return (
    <g>
      {/* folder body */}
      <path
        d="M -14 -8 L -4 -8 L -1 -5 L 14 -5 L 14 9 L -14 9 Z"
        fill="none" stroke={RED2} strokeWidth="1.7" strokeLinejoin="round"
      />
      {/* tab line */}
      <path
        d="M -14 -2 L 14 -2"
        stroke={RED2} strokeWidth="1" opacity="0.6"
      />
      {/* lock body */}
      <rect x="-3" y="0" width="10" height="7" rx="1.4" fill={RED2} />
      <path
        d="M -1 0 L -1 -2.5 Q 2 -5 5 -2.5 L 5 0"
        fill="none" stroke={RED2} strokeWidth="1.4"
      />
    </g>
  )
}

// ============================================================
// AI Input box — only the anonymised prompt enters
// ============================================================
function AIInput() {
  const x = INPUT_CX - INPUT_W / 2
  const y = INPUT_CY - INPUT_H / 2
  return (
    <g>
      {/* breathing halo */}
      {[0, 1.7].map((d, k) => (
        <rect
          key={k}
          x={x - 6} y={y - 6}
          width={INPUT_W + 12} height={INPUT_H + 12}
          rx="14" fill="none"
          stroke={GREEN} strokeWidth="1" opacity="0"
        >
          <animate
            attributeName="opacity" values="0.4;0"
            dur="3.6s" begin={`${d}s`} repeatCount="indefinite"
          />
        </rect>
      ))}

      {/* assistant label above the box */}
      <g transform={`translate(${INPUT_CX} ${y - 14})`}>
        <rect
          x="-66" y="-14" width="132" height="22" rx="11"
          fill="#0b1220" stroke={CYAN} strokeWidth="1.4"
          filter="url(#s711-glow)"
        />
        <circle cx="-46" cy="-3" r="4.2" fill={CYAN} opacity="0.9">
          <animate
            attributeName="opacity" values="0.6;1;0.6"
            dur="2.4s" repeatCount="indefinite"
          />
        </circle>
        <text
          x="-36" y="1.4" textAnchor="start"
          fill={TEXT} fontSize="12" fontWeight="700"
        >
          AI асистент
        </text>
      </g>

      {/* the input box itself */}
      <rect
        x={x} y={y} width={INPUT_W} height={INPUT_H} rx="10"
        fill="url(#s711-input-grad)"
        stroke={GREEN} strokeWidth="2"
        filter="url(#s711-glow)"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.65;1;0.65" dur="3.2s" repeatCount="indefinite"
        />
      </rect>

      {/* prompt — anonymised text being typed */}
      <g>
        <text
          x={x + 18} y={y + 32}
          fill={TEXT} fontSize="13.5" fontWeight="600"
        >
          клиент се оплаква от теч пред дома;
        </text>
        <text
          x={x + 18} y={y + 54}
          fill={TEXT} fontSize="13.5" fontWeight="600"
        >
          напиши учтив отговор, че сигналът
        </text>
        <text
          x={x + 18} y={y + 76}
          fill={TEXT} fontSize="13.5" fontWeight="600"
        >
          е приет и екип ще дойде до 2 дни
        </text>
        {/* blinking cursor */}
        <rect
          x={x + 285} y={y + 65} width="2" height="14"
          fill={GREEN2}
        >
          <animate
            attributeName="opacity"
            values="1;0;1" dur="1s" repeatCount="indefinite"
          />
        </rect>
      </g>

      {/* safety badge — green check on the bottom-left of the input */}
      <g transform={`translate(${x + 16} ${y + INPUT_H - 14})`}>
        <rect
          x="0" y="-9" width="98" height="18" rx="9"
          fill="#052e2b" stroke={GREEN} strokeWidth="1"
        />
        <circle cx="11" cy="0" r="5.5" fill={GREEN} />
        <path
          d="M 8.4 0 L 10.2 1.8 L 13.8 -1.8"
          fill="none" stroke="#052e2b" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round"
        />
        <text
          x="22" y="3.4"
          fill={GREEN2} fontSize="11" fontWeight="700"
          style={{ letterSpacing: '0.04em' }}
        >
          обезличено
        </text>
      </g>

      {/* send icon — bottom-right inside the box */}
      <g transform={`translate(${x + INPUT_W - 22} ${y + INPUT_H - 22})`}>
        <circle r="11" fill={CYAN} opacity="0.9" filter="url(#s711-soft)">
          <animate
            attributeName="opacity" values="0.75;1;0.75"
            dur="2.4s" repeatCount="indefinite"
          />
        </circle>
        <path
          d="M -4 -5 L 5 0 L -4 5 L -2 0 Z"
          fill="#0b1220"
        />
      </g>
    </g>
  )
}

// ============================================================
// External servers cloud — destination of the postcard
// ============================================================
function ExternalServers() {
  return (
    <g transform={`translate(${CLOUD_CX} ${CLOUD_CY})`}>
      {/* halo */}
      {[0, 1.5].map((d, k) => (
        <ellipse
          key={k} cx="0" cy="0" rx="62" ry="34" fill="none"
          stroke={AMBER} strokeWidth="1" opacity="0"
        >
          <animate
            attributeName="rx" values="62;82" dur="3.8s"
            begin={`${d}s`} repeatCount="indefinite"
          />
          <animate
            attributeName="ry" values="34;46" dur="3.8s"
            begin={`${d}s`} repeatCount="indefinite"
          />
          <animate
            attributeName="opacity" values="0.45;0"
            dur="3.8s" begin={`${d}s`} repeatCount="indefinite"
          />
        </ellipse>
      ))}

      {/* cloud body */}
      <g filter="url(#s711-glow)">
        <path
          d="M -50 6
             Q -54 -10 -38 -14
             Q -34 -28 -14 -24
             Q -4 -34 14 -28
             Q 34 -32 38 -14
             Q 56 -10 50 8
             Q 56 22 36 22
             L -34 22
             Q -54 22 -50 6 Z"
          fill="#0b1220" stroke={AMBER} strokeWidth="2"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.65;1;0.65" dur="3.4s" repeatCount="indefinite"
          />
        </path>
        {/* inner server rack hint */}
        <g transform="translate(0 0)">
          <rect x="-22" y="-6" width="44" height="6" rx="1.4"
            fill="none" stroke={AMBER} strokeWidth="1" opacity="0.7" />
          <rect x="-22" y="3"  width="44" height="6" rx="1.4"
            fill="none" stroke={AMBER} strokeWidth="1" opacity="0.7" />
          <circle cx="-15" cy="-3" r="1.4" fill={GREEN2}>
            <animate
              attributeName="opacity" values="0.4;1;0.4"
              dur="1.6s" repeatCount="indefinite"
            />
          </circle>
          <circle cx="-15" cy="6" r="1.4" fill={GREEN2}>
            <animate
              attributeName="opacity" values="0.4;1;0.4"
              dur="1.6s" begin="0.8s" repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>

      {/* label */}
      <text
        x="0" y="46" textAnchor="middle"
        fill={TEXT} fontSize="13" fontWeight="700"
      >
        Външни сървъри
      </text>
      <text
        x="0" y="62" textAnchor="middle"
        fill={MUTED} fontSize="10.5"
      >
        чужда инфраструктура
      </text>
    </g>
  )
}

// ============================================================
// Postcard — small yellow rect with text lines, travels the route
// ============================================================
function Postcard() {
  return (
    <g transform="translate(-22 -14)">
      {/* shadow */}
      <rect
        x="2" y="3" width="44" height="28" rx="2.2"
        fill="#000" opacity="0.35"
      />
      {/* card body */}
      <rect
        x="0" y="0" width="44" height="28" rx="2.2"
        fill="url(#s711-card)"
        stroke="#92400e" strokeWidth="0.9"
      />
      {/* "TO" lines */}
      <line x1="4"  y1="6"  x2="24" y2="6"  stroke="#92400e" strokeWidth="1.2" />
      <line x1="4"  y1="10" x2="20" y2="10" stroke="#92400e" strokeWidth="0.9" opacity="0.7" />
      {/* divider */}
      <line x1="24" y1="4"  x2="24" y2="24" stroke="#92400e" strokeWidth="0.6" opacity="0.5" />
      {/* stamp */}
      <rect x="35" y="3" width="7" height="6" fill="#0b1220" opacity="0.85" />
      {/* "message" lines on right */}
      <line x1="27" y1="14" x2="40" y2="14" stroke="#92400e" strokeWidth="0.7" opacity="0.7" />
      <line x1="27" y1="17" x2="40" y2="17" stroke="#92400e" strokeWidth="0.7" opacity="0.7" />
      <line x1="27" y1="20" x2="37" y2="20" stroke="#92400e" strokeWidth="0.7" opacity="0.55" />
      {/* address lines on left bottom */}
      <line x1="4"  y1="16" x2="22" y2="16" stroke="#92400e" strokeWidth="0.7" opacity="0.6" />
      <line x1="4"  y1="20" x2="18" y2="20" stroke="#92400e" strokeWidth="0.7" opacity="0.6" />
    </g>
  )
}

// ============================================================
// Watching eye — small open eye along the route, hints "anyone reads it"
// ============================================================
function WatchingEye({ x, y, delay }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity="0.7">
      <path
        d="M -10 0 Q 0 -8 10 0 Q 0 8 -10 0 Z"
        fill="none" stroke={AMBER} strokeWidth="1.1"
      />
      <circle cx="0" cy="0" r="3" fill={AMBER} opacity="0.9">
        <animate
          attributeName="opacity"
          values="0.4;1;0.4" dur="2.4s"
          begin={delay} repeatCount="indefinite"
        />
      </circle>
      <circle cx="0" cy="0" r="1.2" fill="#0b1220" />
    </g>
  )
}
