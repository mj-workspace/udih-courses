// Scene 6.8 — LinkedIn задълбочаване
// Pattern: annotated mock — стилизирана LinkedIn профилна визитка вляво
// (профил = CV онлайн) + страничен мрежов панел вдясно с контактни кръгове и
// анимирани връзки към профила (мрежа от професионални контакти).

const PCX = 285        // profile card centre X
const PX = 110         // profile card left
const PY = 70          // profile card top
const PW = 350
const PH = 420

const HEADER_H = 110   // blue header band height of card
const PHOTO_CX = PX + 60
const PHOTO_CY = PY + 70
const PHOTO_R = 32

// Network panel (right)
const NX = 540
const NY = 70
const NW = 290
const NH = 420
const NCX = NX + NW / 2

// Contact node positions (relative to network panel)
const contacts = [
  { id: 'a', x: NCX - 80, y: NY + 110, color: '#22d3ee', label: 'колега' },
  { id: 'b', x: NCX + 80, y: NY + 110, color: '#a78bfa', label: 'бивш' },
  { id: 'c', x: NCX - 95, y: NY + 220, color: '#10b981', label: 'бранш' },
  { id: 'd', x: NCX + 95, y: NY + 220, color: '#f59e0b', label: 'обучение' },
  { id: 'e', x: NCX - 50, y: NY + 330, color: '#60a5fa', label: 'партньор' },
  { id: 'f', x: NCX + 50, y: NY + 330, color: '#34d399', label: 'колега' },
]

// Origin point on profile card for the connection lines (the photo)
const LINK_ORIGIN_X = PX + PW - 20  // right edge of card
const LINK_ORIGIN_Y = PY + 60

export default function Scene_6_8() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s68-header" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#0a66c2" />
          </linearGradient>
          <linearGradient id="s68-card" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0f172a" />
            <stop offset="100%" stopColor="#0b1220" />
          </linearGradient>
          <radialGradient id="s68-face">
            <stop offset="0%"   stopColor="#93c5fd" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.5" />
          </radialGradient>
          <radialGradient id="s68-halo">
            <stop offset="0%"   stopColor="#0a66c2" stopOpacity="0.18" />
            <stop offset="70%"  stopColor="#1e3a8a" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <filter id="s68-glow" x="-30%" y="-30%" width="160%" height="160%">
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
        <circle cx={PCX} cy={PY + PH / 2} r="280" fill="url(#s68-halo)" />
        <ellipse
          cx={450} cy={290} rx="360" ry="240" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 11"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from="0 450 290" to="360 450 290"
            dur="64s" repeatCount="indefinite"
          />
        </ellipse>

        {/* ============================================================ */}
        {/* Connection lines: card → contacts (animated dashed flow)      */}
        {/* ============================================================ */}
        {contacts.map((c, i) => (
          <g key={`link-${c.id}`}>
            <line
              x1={LINK_ORIGIN_X} y1={LINK_ORIGIN_Y} x2={c.x} y2={c.y}
              stroke={c.color} strokeOpacity="0.4" strokeWidth="1"
              strokeDasharray="4 6"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="10" to="0" dur="2.2s" repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                values="0.25;0.65;0.25"
                dur="3.6s" begin={`${i * 0.5}s`} repeatCount="indefinite"
              />
            </line>
            {/* Traveling packet card → contact */}
            <circle r="2.6" fill={c.color} filter="url(#s68-glow)">
              <animateMotion
                dur={`${5 + (i % 3) * 0.7}s`}
                repeatCount="indefinite"
                begin={`${i * 0.6}s`}
                path={`M ${LINK_ORIGIN_X} ${LINK_ORIGIN_Y} L ${c.x} ${c.y}`}
              />
            </circle>
          </g>
        ))}

        {/* ============================================================ */}
        {/* Profile card (left)                                           */}
        {/* ============================================================ */}
        <g>
          {/* Card body */}
          <rect
            x={PX} y={PY} width={PW} height={PH} rx="12"
            fill="url(#s68-card)"
            stroke="#60a5fa" strokeWidth="2"
            filter="url(#s68-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.55;1;0.55" dur="3.4s" repeatCount="indefinite"
            />
          </rect>

          {/* Blue header band */}
          <path
            d={`M ${PX + 12} ${PY}
                L ${PX + PW - 12} ${PY}
                Q ${PX + PW} ${PY} ${PX + PW} ${PY + 12}
                L ${PX + PW} ${PY + HEADER_H}
                L ${PX} ${PY + HEADER_H}
                L ${PX} ${PY + 12}
                Q ${PX} ${PY} ${PX + 12} ${PY}
                Z`}
            fill="url(#s68-header)"
          />

          {/* Subtle dotted texture in header */}
          {Array.from({ length: 14 }).map((_, i) => (
            <circle
              key={`dot-${i}`}
              cx={PX + 20 + i * 24} cy={PY + 22}
              r="0.8" fill="#60a5fa" opacity="0.35"
            />
          ))}

          {/* "in" badge (top-right of card) */}
          <g transform={`translate(${PX + PW - 36} ${PY + 22})`}>
            <rect
              x="-14" y="-12" width="28" height="24" rx="4"
              fill="#0a66c2" stroke="#60a5fa" strokeWidth="1"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.6;1;0.6" dur="2.8s" repeatCount="indefinite"
              />
            </rect>
            <text
              x="0" y="6" textAnchor="middle"
              fill="#ffffff" fontSize="14" fontWeight="800"
              fontStyle="italic"
              style={{ letterSpacing: '0.02em' }}
            >
              in
            </text>
          </g>

          {/* Photo */}
          <g>
            <circle
              cx={PHOTO_CX} cy={PHOTO_CY} r={PHOTO_R + 4}
              fill="#0b1220" stroke="#e2e8f0" strokeWidth="2.5"
            />
            <circle
              cx={PHOTO_CX} cy={PHOTO_CY} r={PHOTO_R}
              fill="url(#s68-face)"
            />
            {/* Person silhouette inside photo */}
            <circle cx={PHOTO_CX} cy={PHOTO_CY - 6} r="10" fill="#0f172a" opacity="0.4" />
            <path
              d={`M ${PHOTO_CX - 18} ${PHOTO_CY + 18}
                  Q ${PHOTO_CX} ${PHOTO_CY + 4} ${PHOTO_CX + 18} ${PHOTO_CY + 18}
                  L ${PHOTO_CX + 18} ${PHOTO_CY + PHOTO_R - 2}
                  L ${PHOTO_CX - 18} ${PHOTO_CY + PHOTO_R - 2}
                  Z`}
              fill="#0f172a" opacity="0.4"
            />
          </g>

          {/* Name + headline (right of photo) */}
          <text
            x={PHOTO_CX + PHOTO_R + 16} y={PHOTO_CY - 6}
            fill="#ffffff" fontSize="15" fontWeight="700"
          >
            Иван Иванов
          </text>
          <text
            x={PHOTO_CX + PHOTO_R + 16} y={PHOTO_CY + 10}
            fill="#dbeafe" fontSize="11" fontWeight="500"
          >
            Главен инженер
          </text>
          <text
            x={PHOTO_CX + PHOTO_R + 16} y={PHOTO_CY + 24}
            fill="#dbeafe" fontSize="10" fontWeight="500" opacity="0.85"
          >
            ВиК Пловдив
          </text>

          {/* Section: ОПИТ */}
          <ProfileSection
            x={PX + 18} y={PY + HEADER_H + 22}
            label="ОПИТ"
            color="#22d3ee"
            beginDelay="0s"
            lines={[
              'Главен инженер — ВиК Пловдив',
              'Инженер експлоатация — 2015–2022',
            ]}
          />

          {/* Section: ОБРАЗОВАНИЕ */}
          <ProfileSection
            x={PX + 18} y={PY + HEADER_H + 110}
            label="ОБРАЗОВАНИЕ"
            color="#10b981"
            beginDelay="0.6s"
            lines={['ТУ София — Водоснабдяване и канализация']}
          />

          {/* Section: УМЕНИЯ (chips) */}
          <g>
            <line
              x1={PX + 18} y1={PY + HEADER_H + 178}
              x2={PX + PW - 18} y2={PY + HEADER_H + 178}
              stroke="#1e293b" strokeWidth="0.6"
            />
            <text
              x={PX + 18} y={PY + HEADER_H + 196}
              fill="#94a3b8" fontSize="9" fontWeight="700"
              style={{ letterSpacing: '0.18em' }}
            >
              УМЕНИЯ
            </text>
            {['Хидравлика', 'SCADA', 'Управление', 'GIS'].map((s, i) => {
              const cx = PX + 22 + i * 76
              const cy = PY + HEADER_H + 218
              const w = 70
              return (
                <g key={s} transform={`translate(${cx} ${cy})`}>
                  <rect
                    x="0" y="0" width={w} height="20" rx="10"
                    fill="#0b1220" stroke="#3b82f6" strokeWidth="1"
                  >
                    <animate
                      attributeName="stroke-opacity"
                      values="0.4;0.9;0.4"
                      dur="3.6s" begin={`${1 + i * 0.4}s`}
                      repeatCount="indefinite"
                    />
                  </rect>
                  <text
                    x={w / 2} y="14" textAnchor="middle"
                    fill="#e2e8f0" fontSize="9.5" fontWeight="600"
                  >
                    {s}
                  </text>
                </g>
              )
            })}
          </g>
        </g>

        {/* ============================================================ */}
        {/* Network panel (right)                                         */}
        {/* ============================================================ */}
        <g>
          {/* Faint panel frame */}
          <rect
            x={NX} y={NY} width={NW} height={NH} rx="12"
            fill="none" stroke="#1e293b" strokeWidth="1"
            strokeDasharray="4 8"
          />
          {/* Panel title */}
          <text
            x={NCX} y={NY + 28}
            textAnchor="middle"
            fill="#94a3b8" fontSize="11" fontWeight="700"
            style={{ letterSpacing: '0.22em' }}
          >
            МОЯТА МРЕЖА
          </text>
          <text
            x={NCX} y={NY + 46}
            textAnchor="middle"
            fill="#64748b" fontSize="10" fontWeight="500"
            fontStyle="italic"
          >
            професионални контакти
          </text>

          {/* Contact nodes */}
          {contacts.map((c, i) => (
            <g key={c.id} transform={`translate(${c.x} ${c.y})`}>
              {/* Pulse ring */}
              <circle r="22" fill="none" stroke={c.color} strokeWidth="1" opacity="0">
                <animate
                  attributeName="r" values="22;34"
                  dur="3.4s" begin={`${i * 0.55}s`} repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity" values="0.5;0"
                  dur="3.4s" begin={`${i * 0.55}s`} repeatCount="indefinite"
                />
              </circle>
              {/* Avatar body */}
              <circle r="22" fill="#0b1220" stroke={c.color} strokeWidth="1.6" filter="url(#s68-glow)" />
              {/* Mini silhouette */}
              <circle cy="-5" r="6" fill={c.color} opacity="0.85" />
              <path
                d="M -11 11 Q 0 1 11 11 L 11 14 L -11 14 Z"
                fill={c.color} opacity="0.85"
              />
              {/* Label below */}
              <text
                x="0" y="38" textAnchor="middle"
                fill="#94a3b8" fontSize="9.5" fontWeight="600"
              >
                {c.label}
              </text>
            </g>
          ))}

          {/* Footer hint inside panel */}
          <text
            x={NCX} y={NY + NH - 14}
            textAnchor="middle"
            fill="#475569" fontSize="9.5" fontWeight="500"
            fontStyle="italic"
          >
            не приятели — а колеги
          </text>
        </g>
      </svg>
    </div>
  )
}

function ProfileSection({ x, y, label, color, lines, beginDelay }) {
  return (
    <g>
      {/* Divider above */}
      <line
        x1={x} y1={y - 8} x2={x + 314} y2={y - 8}
        stroke="#1e293b" strokeWidth="0.6"
      />
      {/* Small color dot + label */}
      <circle cx={x + 3} cy={y + 6} r="2.6" fill={color}>
        <animate
          attributeName="opacity" values="0.5;1;0.5"
          dur="2.8s" begin={beginDelay} repeatCount="indefinite"
        />
      </circle>
      <text
        x={x + 14} y={y + 10}
        fill="#94a3b8" fontSize="9" fontWeight="700"
        style={{ letterSpacing: '0.18em' }}
      >
        {label}
      </text>
      {/* Lines */}
      {lines.map((line, i) => (
        <text
          key={i}
          x={x} y={y + 30 + i * 16}
          fill="#e2e8f0" fontSize="11" fontWeight="500"
        >
          {line}
        </text>
      ))}
    </g>
  )
}
