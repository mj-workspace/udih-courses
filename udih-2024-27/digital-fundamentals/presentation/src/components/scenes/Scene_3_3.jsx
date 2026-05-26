// Scene 3.3 — Изпращане и получаване на писма
// Pattern: annotated mock + flow — a compose card on the left (with To, Copy,
// Subject, Body, paperclip attachment and Send), an envelope token that flies
// in a curve from Send to the inbox panel on the right, a top inbox row that
// pulses on arrival, and a fainter reply token traveling back.

const COMPOSE_X = 60
const COMPOSE_Y = 70
const COMPOSE_W = 360
const COMPOSE_H = 440

const INBOX_X = 500
const INBOX_Y = 70
const INBOX_W = 340
const INBOX_H = 440

const FIELDS = [
  { y: 130, h: 28, label: 'ДО', value: 'ivan@vik.bg', mono: true },
  { y: 172, h: 28, label: 'КОПИЕ', value: 'avarii@vik.bg', mono: true, faint: true },
  { y: 214, h: 28, label: 'ТЕМА', value: 'Авария на ул. Дунав' },
]

const BODY_Y = 256
const BODY_H = 150

const INBOX_ROWS = [
  { y: 130, sender: 'Иван Петров', subject: 'Авария на ул. Дунав', unread: true, isNew: true },
  { y: 196, sender: 'Министерство', subject: 'Месечен отчет — март', unread: true },
  { y: 262, sender: 'Колега', subject: 'Препратено: Жалба №42' },
  { y: 328, sender: 'Доставчик', subject: 'Потвърждение на поръчка' },
  { y: 394, sender: 'Гражданин', subject: 'Запитване за график' },
]

// Send button center → top inbox row center, gentle arc above.
const SEND_X = COMPOSE_X + COMPOSE_W - 70
const SEND_Y = COMPOSE_Y + COMPOSE_H - 30
const ARRIVE_X = INBOX_X + 168
const ARRIVE_Y = 157

export default function Scene_3_3() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s33-card-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#0b1220" />
          </linearGradient>
          <linearGradient id="s33-send-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id="s33-env-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <radialGradient id="s33-arrive-grad">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
          <filter id="s33-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="s33-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Curved flight path from Send button up over to inbox top row */}
          <path
            id="s33-flight"
            d={`M ${SEND_X} ${SEND_Y} C ${SEND_X + 20} ${SEND_Y - 180}, ${ARRIVE_X - 80} 60, ${ARRIVE_X} ${ARRIVE_Y}`}
            fill="none"
          />
          {/* Reply path — back from inbox row, arcs low under the cards */}
          <path
            id="s33-reply"
            d={`M ${ARRIVE_X - 40} ${ARRIVE_Y + 12} C ${ARRIVE_X - 80} ${ARRIVE_Y + 260}, ${SEND_X - 60} ${SEND_Y + 30}, ${SEND_X - 110} ${SEND_Y - 10}`}
            fill="none"
          />
        </defs>

        {/* ============ Ambient ============ */}
        <circle
          cx="450" cy="290" r="290" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 9"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from="0 450 290" to="360 450 290"
            dur="60s" repeatCount="indefinite"
          />
        </circle>
        {[
          { x: 30, y: 540, d: 0 },
          { x: 870, y: 40, d: 1.4 },
          { x: 460, y: 540, d: 2.6 },
          { x: 460, y: 36, d: 3.4 },
        ].map((p, i) => (
          <text
            key={`s33-bg-${i}`}
            x={p.x} y={p.y}
            fill="#1e293b" fontSize="16" fontWeight="700"
            style={{ fontFamily: 'monospace' }}
          >
            @
            <animate
              attributeName="opacity" values="0.3;0.7;0.3"
              dur="6s" begin={`${p.d}s`} repeatCount="indefinite"
            />
          </text>
        ))}

        {/* ============ Compose card ============ */}
        <rect
          x={COMPOSE_X - 6} y={COMPOSE_Y - 6}
          width={COMPOSE_W + 12} height={COMPOSE_H + 12} rx="16"
          fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.18"
          filter="url(#s33-soft)"
        />
        <rect
          x={COMPOSE_X} y={COMPOSE_Y}
          width={COMPOSE_W} height={COMPOSE_H} rx="12"
          fill="url(#s33-card-grad)" stroke="#3b82f6" strokeWidth="1.4"
          filter="url(#s33-glow)"
        >
          <animate
            attributeName="stroke-opacity" values="0.6;1;0.6"
            dur="4.4s" repeatCount="indefinite"
          />
        </rect>

        {/* Header */}
        <text
          x={COMPOSE_X + 20} y={COMPOSE_Y + 28}
          fill="#e2e8f0" fontSize="13" fontWeight="700"
        >
          Ново писмо
        </text>
        <circle cx={COMPOSE_X + COMPOSE_W - 22} cy={COMPOSE_Y + 24} r="4" fill="#1e293b" />
        <line
          x1={COMPOSE_X + 18} y1={COMPOSE_Y + 44}
          x2={COMPOSE_X + COMPOSE_W - 18} y2={COMPOSE_Y + 44}
          stroke="#1e293b" strokeWidth="1"
        />

        {/* Fields */}
        {FIELDS.map((f) => (
          <g key={`s33-f-${f.label}`}>
            <text
              x={COMPOSE_X + 22} y={f.y - 6}
              fill="#64748b" fontSize="8.5" fontWeight="700"
              style={{ letterSpacing: '0.18em' }}
            >
              {f.label}
            </text>
            <rect
              x={COMPOSE_X + 20} y={f.y}
              width={COMPOSE_W - 40} height={f.h} rx="6"
              fill="#0b1220" stroke="#1e293b" strokeWidth="1"
            />
            <text
              x={COMPOSE_X + 34} y={f.y + 19}
              fill={f.faint ? '#64748b' : '#e2e8f0'} fontSize="12"
              fontWeight={f.mono ? '600' : '500'}
              style={f.mono ? { fontFamily: 'monospace' } : undefined}
            >
              {f.value}
            </text>
          </g>
        ))}

        {/* Body area */}
        <text
          x={COMPOSE_X + 22} y={BODY_Y - 6}
          fill="#64748b" fontSize="8.5" fontWeight="700"
          style={{ letterSpacing: '0.18em' }}
        >
          ТЯЛО
        </text>
        <rect
          x={COMPOSE_X + 20} y={BODY_Y}
          width={COMPOSE_W - 40} height={BODY_H} rx="6"
          fill="#0b1220" stroke="#1e293b" strokeWidth="1"
        />
        {/* Text lines being typed (subtle width animation on the cursor line) */}
        <text x={COMPOSE_X + 34} y={BODY_Y + 22} fill="#e2e8f0" fontSize="11">
          Здравейте,
        </text>
        <text x={COMPOSE_X + 34} y={BODY_Y + 42} fill="#94a3b8" fontSize="11">
          Получихме сигнала за аварията.
        </text>
        <text x={COMPOSE_X + 34} y={BODY_Y + 62} fill="#94a3b8" fontSize="11">
          Екип ще бъде изпратен веднага.
        </text>
        <text x={COMPOSE_X + 34} y={BODY_Y + 96} fill="#94a3b8" fontSize="11">
          С уважение,
        </text>
        <text x={COMPOSE_X + 34} y={BODY_Y + 116} fill="#94a3b8" fontSize="11">
          Петър
          <tspan x={COMPOSE_X + 70} fill="#22d3ee" fontWeight="700">|</tspan>
          <animate
            attributeName="opacity" values="1;0.2;1"
            dur="1s" repeatCount="indefinite"
          />
        </text>

        {/* Bottom toolbar: paperclip attachment chip + Send button */}
        {/* Paperclip icon */}
        <g transform={`translate(${COMPOSE_X + 32} ${COMPOSE_Y + COMPOSE_H - 36})`}>
          <path
            d="M 0 14 Q 0 0 8 0 Q 16 0 16 14 L 16 18 Q 16 24 10 24 Q 4 24 4 18 L 4 8"
            fill="none" stroke="#22d3ee" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round"
            transform="rotate(-30)"
          />
        </g>
        {/* Attachment chip */}
        <g>
          <rect
            x={COMPOSE_X + 56} y={COMPOSE_Y + COMPOSE_H - 44}
            width="120" height="22" rx="11"
            fill="#0b1220" stroke="#22d3ee" strokeWidth="1.2"
          >
            <animate
              attributeName="stroke-opacity" values="0.5;1;0.5"
              dur="3.4s" repeatCount="indefinite"
            />
          </rect>
          <text
            x={COMPOSE_X + 70} y={COMPOSE_Y + COMPOSE_H - 28}
            fill="#22d3ee" fontSize="10" fontWeight="600"
            style={{ fontFamily: 'monospace' }}
          >
            отчет.pdf
          </text>
          <text
            x={COMPOSE_X + 167} y={COMPOSE_Y + COMPOSE_H - 28}
            fill="#64748b" fontSize="9" textAnchor="end"
          >
            ✕
          </text>
        </g>

        {/* Send button */}
        <g>
          <rect
            x={COMPOSE_X + COMPOSE_W - 116} y={COMPOSE_Y + COMPOSE_H - 46}
            width="96" height="32" rx="8"
            fill="url(#s33-send-grad)" stroke="#60a5fa" strokeWidth="1.6"
            filter="url(#s33-glow)"
          >
            <animate
              attributeName="stroke-opacity" values="0.6;1;0.6"
              dur="3s" repeatCount="indefinite"
            />
          </rect>
          <text
            x={COMPOSE_X + COMPOSE_W - 68} y={COMPOSE_Y + COMPOSE_H - 26}
            textAnchor="middle"
            fill="#e2e8f0" fontSize="12" fontWeight="700"
          >
            ИЗПРАТИ
          </text>
          {/* tiny send arrow */}
          <path
            d={`M ${COMPOSE_X + COMPOSE_W - 36} ${COMPOSE_Y + COMPOSE_H - 30} l 8 0 l -3 -3 m 3 3 l -3 3`}
            fill="none" stroke="#e2e8f0" strokeWidth="1.4"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </g>

        {/* ============ Flight path (faint guideline) ============ */}
        <use
          href="#s33-flight"
          stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 6" opacity="0.35"
        >
          <animate
            attributeName="stroke-dashoffset" from="9" to="0"
            dur="1.4s" repeatCount="indefinite"
          />
        </use>
        <use
          href="#s33-reply"
          stroke="#10b981" strokeWidth="1" strokeDasharray="3 6" opacity="0.22"
        >
          <animate
            attributeName="stroke-dashoffset" from="0" to="9"
            dur="1.6s" repeatCount="indefinite"
          />
        </use>

        {/* ============ Envelope token flying along path ============ */}
        <g filter="url(#s33-glow)">
          <g transform="translate(-14 -10)">
            <rect width="28" height="20" rx="2" fill="url(#s33-env-grad)" stroke="#60a5fa" strokeWidth="1" />
            <path
              d="M 0 0 L 14 12 L 28 0"
              fill="none" stroke="#e2e8f0" strokeWidth="1.2"
            />
          </g>
          <animateMotion dur="5s" repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1">
            <mpath href="#s33-flight" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;1;0"
            keyTimes="0;0.08;0.5;0.92;1"
            dur="5s" repeatCount="indefinite"
          />
        </g>

        {/* Smaller reply token going back */}
        <g opacity="0.85">
          <g transform="translate(-7 -5)">
            <rect width="14" height="10" rx="1.5" fill="#0b1220" stroke="#10b981" strokeWidth="1.2" />
            <path d="M 0 0 L 7 6 L 14 0" fill="none" stroke="#10b981" strokeWidth="1" />
          </g>
          <animateMotion dur="5s" begin="2.6s" repeatCount="indefinite" rotate="auto">
            <mpath href="#s33-reply" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;0.9;0.9;0"
            keyTimes="0;0.1;0.85;1"
            dur="5s" begin="2.6s" repeatCount="indefinite"
          />
        </g>

        {/* ============ Inbox card ============ */}
        <rect
          x={INBOX_X - 6} y={INBOX_Y - 6}
          width={INBOX_W + 12} height={INBOX_H + 12} rx="16"
          fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.18"
          filter="url(#s33-soft)"
        />
        <rect
          x={INBOX_X} y={INBOX_Y}
          width={INBOX_W} height={INBOX_H} rx="12"
          fill="url(#s33-card-grad)" stroke="#22d3ee" strokeWidth="1.4"
          filter="url(#s33-glow)"
        >
          <animate
            attributeName="stroke-opacity" values="0.55;1;0.55"
            dur="4.6s" repeatCount="indefinite"
          />
        </rect>

        {/* Header */}
        <text
          x={INBOX_X + 20} y={INBOX_Y + 28}
          fill="#e2e8f0" fontSize="13" fontWeight="700"
        >
          Входяща кутия
        </text>
        <text
          x={INBOX_X + INBOX_W - 20} y={INBOX_Y + 28}
          textAnchor="end"
          fill="#64748b" fontSize="10" fontWeight="600"
        >
          5 писма
        </text>
        <line
          x1={INBOX_X + 18} y1={INBOX_Y + 44}
          x2={INBOX_X + INBOX_W - 18} y2={INBOX_Y + 44}
          stroke="#1e293b" strokeWidth="1"
        />

        {/* Arrival halo on the top row, pulses when envelope lands (~ end of flight) */}
        <circle
          cx={ARRIVE_X + 4} cy={ARRIVE_Y + 4} r="40"
          fill="url(#s33-arrive-grad)"
        >
          <animate
            attributeName="r"
            values="0;48;48;0"
            keyTimes="0;0.18;0.4;0.6"
            dur="5s" repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.9;0.6;0"
            keyTimes="0;0.18;0.4;0.6"
            dur="5s" repeatCount="indefinite"
          />
        </circle>

        {/* Inbox rows */}
        {INBOX_ROWS.map((row, i) => {
          const rowH = 54
          const x = INBOX_X + 18
          const w = INBOX_W - 36
          return (
            <g key={`s33-row-${i}`}>
              <rect
                x={x} y={row.y} width={w} height={rowH} rx="6"
                fill={row.isNew ? '#101b32' : '#0b1220'}
                stroke={row.isNew ? '#22d3ee' : '#1e293b'}
                strokeWidth={row.isNew ? '1.4' : '1'}
              >
                {row.isNew && (
                  <animate
                    attributeName="stroke-opacity" values="0.5;1;0.5"
                    dur="3s" repeatCount="indefinite"
                  />
                )}
              </rect>
              {/* unread dot */}
              {row.unread && (
                <circle
                  cx={x + 12} cy={row.y + 18} r="3"
                  fill={row.isNew ? '#22d3ee' : '#3b82f6'}
                />
              )}
              <text
                x={x + 24} y={row.y + 22}
                fill={row.unread ? '#e2e8f0' : '#94a3b8'}
                fontSize="11.5" fontWeight={row.unread ? '700' : '500'}
              >
                {row.sender}
              </text>
              <text
                x={x + w - 14} y={row.y + 22}
                textAnchor="end"
                fill="#64748b" fontSize="9"
              >
                {row.isNew ? 'сега' : `пр. ${i}д`}
              </text>
              <text
                x={x + 24} y={row.y + 40}
                fill={row.unread ? '#94a3b8' : '#64748b'}
                fontSize="10.5"
              >
                {row.subject}
              </text>
              {/* tiny reply/forward icons on the top row */}
              {row.isNew && (
                <g>
                  {/* reply arrow */}
                  <g transform={`translate(${x + w - 38} ${row.y + 38})`}>
                    <path
                      d="M 0 0 L -6 4 L 0 8 M -5 4 L 4 4 Q 10 4 10 -2"
                      fill="none" stroke="#10b981" strokeWidth="1.4"
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      <animate
                        attributeName="stroke-opacity" values="0.4;1;0.4"
                        dur="2.4s" repeatCount="indefinite"
                      />
                    </path>
                  </g>
                  {/* forward arrow */}
                  <g transform={`translate(${x + w - 18} ${row.y + 38})`}>
                    <path
                      d="M 0 0 L 6 4 L 0 8 M 5 4 L -4 4 Q -10 4 -10 -2"
                      fill="none" stroke="#a78bfa" strokeWidth="1.4"
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      <animate
                        attributeName="stroke-opacity" values="0.4;1;0.4"
                        dur="2.4s" begin="1.2s" repeatCount="indefinite"
                      />
                    </path>
                  </g>
                </g>
              )}
            </g>
          )
        })}

        {/* ============ Small field callouts ============ */}
        {/* Cc explainer */}
        <g opacity="0.85">
          <line
            x1={COMPOSE_X + COMPOSE_W} y1="186" x2={COMPOSE_X + COMPOSE_W + 36} y2="186"
            stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 4" opacity="0.5"
          />
          <text
            x={COMPOSE_X + COMPOSE_W + 40} y="184"
            fill="#94a3b8" fontSize="9" fontWeight="700"
            style={{ letterSpacing: '0.1em' }}
          >
            CC / BCC
          </text>
          <text
            x={COMPOSE_X + COMPOSE_W + 40} y="196"
            fill="#64748b" fontSize="8.5"
          >
            в течение
          </text>
        </g>

        {/* Attachment explainer */}
        <g opacity="0.85">
          <line
            x1={COMPOSE_X + 116} y1={COMPOSE_Y + COMPOSE_H - 4}
            x2={COMPOSE_X + 116} y2={COMPOSE_Y + COMPOSE_H + 14}
            stroke="#22d3ee" strokeWidth="1" strokeDasharray="2 4" opacity="0.5"
          />
          <text
            x={COMPOSE_X + 116} y={COMPOSE_Y + COMPOSE_H + 26}
            textAnchor="middle"
            fill="#22d3ee" fontSize="9.5" fontWeight="700"
          >
            прикачен файл
          </text>
        </g>
      </svg>
    </div>
  )
}
