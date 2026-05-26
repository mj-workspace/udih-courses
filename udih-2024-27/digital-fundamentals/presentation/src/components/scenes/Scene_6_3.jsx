// Scene 6.3 — Общи принципи при създаване на профил
// Pattern: annotated mock — a profile card in the centre with green-check
// "safe" fields (name, photo, city, occupation, 2FA), surrounded by four
// red-X "do not share" tags floating around it (address, phone, EGN,
// real-time vacation post).

const CX = 450
const CY = 290

// Card geometry
const CARD_W = 320
const CARD_H = 360
const CARD_X = CX - CARD_W / 2
const CARD_Y = CY - CARD_H / 2

// Safe fields (rows inside the card)
const safeRows = [
  { label: 'Иван П.',           sub: 'име',         y: 252 },
  { label: 'София',             sub: 'град',        y: 290 },
  { label: 'ВиК специалист',    sub: 'занимание',   y: 328 },
  { label: 'иван@email.bg',     sub: 'за вход',     y: 366 },
]

// Red "do not share" tags around the card (rotated, dashed border, red X)
const dangerTags = [
  { id: 'addr',  text: 'ул. Витоша 25',  sub: 'адрес',     x: 130, y: 150, rot: -6,  w: 150 },
  { id: 'phone', text: '+359 887 ...',   sub: 'телефон',   x: 720, y: 150, rot:  7,  w: 140 },
  { id: 'egn',   text: 'ЕГН 7411...',    sub: 'личен №',   x: 130, y: 430, rot:  5,  w: 140 },
  { id: 'vac',   text: 'На море сега!',  sub: 'в момента', x: 720, y: 430, rot: -5,  w: 150 },
]

export default function Scene_6_3() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s63-card" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0f172a" />
            <stop offset="100%" stopColor="#06101f" />
          </linearGradient>
          <radialGradient id="s63-halo">
            <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.22" />
            <stop offset="70%"  stopColor="#1e3a8a" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s63-face">
            <stop offset="0%"   stopColor="#93c5fd" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.5" />
          </radialGradient>
          <filter id="s63-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="s63-redglow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ============================================================ */}
        {/* Ambient                                                       */}
        {/* ============================================================ */}
        <ellipse cx={CX} cy={CY} rx="320" ry="240" fill="url(#s63-halo)" />

        <ellipse
          cx={CX} cy={CY} rx="360" ry="250" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 11"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="58s" repeatCount="indefinite"
          />
        </ellipse>

        {/* ============================================================ */}
        {/* Profile card                                                  */}
        {/* ============================================================ */}
        <g>
          {/* Card body */}
          <rect
            x={CARD_X} y={CARD_Y} width={CARD_W} height={CARD_H} rx="14"
            fill="url(#s63-card)"
            stroke="#60a5fa" strokeWidth="2"
            filter="url(#s63-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.6;1;0.6" dur="3.6s" repeatCount="indefinite"
            />
          </rect>

          {/* Header strip */}
          <rect
            x={CARD_X} y={CARD_Y} width={CARD_W} height="36" rx="14"
            fill="#0b1220"
          />
          <rect
            x={CARD_X} y={CARD_Y + 22} width={CARD_W} height="14"
            fill="#0b1220"
          />
          <line
            x1={CARD_X + 14} y1={CARD_Y + 36} x2={CARD_X + CARD_W - 14} y2={CARD_Y + 36}
            stroke="#1e293b" strokeWidth="1"
          />
          <circle cx={CARD_X + 14} cy={CARD_Y + 18} r="3" fill="#ef4444" opacity="0.7" />
          <circle cx={CARD_X + 26} cy={CARD_Y + 18} r="3" fill="#f59e0b" opacity="0.7" />
          <circle cx={CARD_X + 38} cy={CARD_Y + 18} r="3" fill="#10b981" opacity="0.7" />
          <text
            x={CX} y={CARD_Y + 22}
            textAnchor="middle" fill="#94a3b8"
            fontSize="10" fontWeight="700"
            style={{ letterSpacing: '0.18em' }}
          >
            ПРОФИЛ
          </text>

          {/* Avatar */}
          <g transform={`translate(${CX} ${CARD_Y + 90})`}>
            <circle r="46" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.6" opacity="0.6" />
            {/* head */}
            <circle cx="0" cy="-10" r="20" fill="url(#s63-face)" />
            {/* shoulders */}
            <path
              d="M -36 30 Q 0 -2 36 30 L 36 36 L -36 36 Z"
              fill="#3b82f6" opacity="0.6"
            />
            {/* pulse ring */}
            <circle r="46" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="46;66" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="4s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Safe rows */}
          {safeRows.map((r, i) => (
            <g key={r.sub}>
              {/* row separator */}
              <line
                x1={CARD_X + 22} y1={r.y + 16} x2={CARD_X + CARD_W - 22} y2={r.y + 16}
                stroke="#1e293b" strokeWidth="0.8" opacity="0.6"
              />
              {/* sub label (gray, small) */}
              <text
                x={CARD_X + 22} y={r.y - 2}
                fill="#64748b" fontSize="9"
                style={{ letterSpacing: '0.12em' }}
                fontWeight="600"
              >
                {r.sub.toUpperCase()}
              </text>
              {/* value */}
              <text
                x={CARD_X + 22} y={r.y + 12}
                fill="#e2e8f0" fontSize="14" fontWeight="600"
              >
                {r.label}
              </text>
              {/* green check */}
              <g transform={`translate(${CARD_X + CARD_W - 30} ${r.y + 6})`}>
                <circle r="9" fill="#0b1220" stroke="#10b981" strokeWidth="1.4" />
                <path
                  d="M -4 0 L -1 3 L 4 -3"
                  fill="none" stroke="#10b981"
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                >
                  <animate
                    attributeName="stroke-opacity"
                    values="0.55;1;0.55"
                    dur="2.8s" begin={`${i * 0.4}s`} repeatCount="indefinite"
                  />
                </path>
              </g>
            </g>
          ))}

          {/* 2FA badge — bottom of card */}
          <g transform={`translate(${CX} ${CARD_Y + CARD_H - 28})`}>
            {/* shield */}
            <path
              d="M -14 -10 L 0 -15 L 14 -10 L 14 4 Q 14 14 0 18 Q -14 14 -14 4 Z"
              fill="#0b1220" stroke="#10b981" strokeWidth="1.6"
              filter="url(#s63-glow)"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.6;1;0.6" dur="2.6s" repeatCount="indefinite"
              />
            </path>
            <text
              x="0" y="3" textAnchor="middle"
              fill="#34d399" fontSize="9" fontWeight="800"
              style={{ letterSpacing: '0.1em' }}
            >
              2FA
            </text>
            <text
              x="30" y="3"
              fill="#94a3b8" fontSize="11" fontWeight="600"
            >
              включена защита
            </text>
          </g>
        </g>

        {/* ============================================================ */}
        {/* Connecting hairlines from card to each red tag                */}
        {/* ============================================================ */}
        {dangerTags.map((t, i) => (
          <line
            key={`link-${t.id}`}
            x1={t.x < CX ? CARD_X : CARD_X + CARD_W}
            y1={t.y}
            x2={t.x}
            y2={t.y}
            stroke="#7f1d1d" strokeWidth="0.8"
            strokeDasharray="3 6" opacity="0.45"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="9" to="0"
              dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite"
            />
          </line>
        ))}

        {/* ============================================================ */}
        {/* Red "do not share" tags                                       */}
        {/* ============================================================ */}
        {dangerTags.map((t, i) => (
          <g key={t.id} transform={`translate(${t.x} ${t.y}) rotate(${t.rot})`}>
            {/* tag body */}
            <rect
              x={-t.w / 2} y={-22}
              width={t.w} height="44" rx="6"
              fill="#1a0808" stroke="#ef4444" strokeWidth="1.4"
              strokeDasharray="5 4"
              filter="url(#s63-redglow)"
              opacity="0.9"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="9" to="0"
                dur="3s" repeatCount="indefinite"
              />
            </rect>

            {/* sub label */}
            <text
              x={-t.w / 2 + 10} y={-7}
              fill="#fca5a5" fontSize="9"
              style={{ letterSpacing: '0.14em' }}
              fontWeight="700"
            >
              {t.sub.toUpperCase()}
            </text>

            {/* value */}
            <text
              x={-t.w / 2 + 10} y={11}
              fill="#fecaca" fontSize="13" fontWeight="600"
            >
              {t.text}
            </text>

            {/* red X on the right */}
            <g transform={`translate(${t.w / 2 - 16} 0)`}>
              <circle r="10" fill="#1a0808" stroke="#ef4444" strokeWidth="1.4" />
              <line x1="-4" y1="-4" x2="4" y2="4"
                stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round">
                <animate
                  attributeName="stroke-opacity"
                  values="0.55;1;0.55"
                  dur="2.4s" begin={`${i * 0.35}s`} repeatCount="indefinite"
                />
              </line>
              <line x1="-4" y1="4" x2="4" y2="-4"
                stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round">
                <animate
                  attributeName="stroke-opacity"
                  values="0.55;1;0.55"
                  dur="2.4s" begin={`${i * 0.35}s`} repeatCount="indefinite"
                />
              </line>
            </g>

            {/* slash across the tag — extra "forbidden" mark */}
            <line
              x1={-t.w / 2 + 4} y1={18}
              x2={t.w / 2 - 4}  y2={-18}
              stroke="#ef4444" strokeWidth="1.2" opacity="0.35"
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
