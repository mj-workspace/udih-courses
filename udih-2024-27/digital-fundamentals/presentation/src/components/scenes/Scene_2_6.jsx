// Scene 2.6 — Разпознаване на надеждни уебсайтове
// Pattern: annotated mock — a fake-looking browser window with three numbered
// callouts pointing at the three signs the lecturer-guide names: padlock,
// address, appearance. The URL bar shows a domain with a slipped "-online"
// highlighted in red, the body screams urgency with a typo, and a "you won
// 1000 BGN" banner stands in for too-good-to-be-true offers. Each callout
// is a glowing chip connected to its target by a dashed line.

const WIN_X = 80
const WIN_Y = 90
const WIN_W = 580
const WIN_H = 412

const TITLE_H = 30
const TITLE_Y = WIN_Y

const URL_X = WIN_X + 16
const URL_Y = WIN_Y + TITLE_H + 10
const URL_W = WIN_W - 32
const URL_H = 30

const BODY_X = WIN_X + 22
const BODY_Y = URL_Y + URL_H + 14
const BODY_W = WIN_W - 44

// Right-side callouts
const CO_X = 695

const CALLOUTS = [
  {
    n: 1,
    color: '#f59e0b',
    label: 'катинарче',
    sub: 'не доказва доверие',
    cy: 140,
    tx: URL_X + 14,
    ty: URL_Y + URL_H / 2,
  },
  {
    n: 2,
    color: '#ef4444',
    label: 'адресът',
    sub: 'не е истинският',
    cy: 290,
    tx: URL_X + 162,
    ty: URL_Y + URL_H / 2,
  },
  {
    n: 3,
    color: '#ef4444',
    label: 'видът',
    sub: 'грешки + спешност',
    cy: 440,
    tx: BODY_X + 396,
    ty: BODY_Y + 90,
  },
]

export default function Scene_2_6() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s26-screen-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#0b1220" />
          </linearGradient>
          <linearGradient id="s26-title-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="s26-prize-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c2d12" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#451a03" stopOpacity="0.4" />
          </linearGradient>
          <filter id="s26-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="s26-soft-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ============ Browser window ============ */}
        <rect
          x={WIN_X} y={WIN_Y} width={WIN_W} height={WIN_H} rx="10"
          fill="url(#s26-screen-grad)" stroke="#1e293b" strokeWidth="1.4"
        />
        {/* title bar */}
        <rect
          x={WIN_X} y={TITLE_Y} width={WIN_W} height={TITLE_H} rx="10"
          fill="url(#s26-title-grad)"
        />
        <rect
          x={WIN_X} y={TITLE_Y + TITLE_H - 12} width={WIN_W} height="12"
          fill="url(#s26-title-grad)"
        />
        {/* divider under title */}
        <line
          x1={WIN_X} y1={TITLE_Y + TITLE_H} x2={WIN_X + WIN_W} y2={TITLE_Y + TITLE_H}
          stroke="#1e293b" strokeWidth="1"
        />
        {/* control dots */}
        <circle cx={WIN_X + 16} cy={TITLE_Y + 15} r="5" fill="#ef4444" opacity="0.85" />
        <circle cx={WIN_X + 32} cy={TITLE_Y + 15} r="5" fill="#f59e0b" opacity="0.85" />
        <circle cx={WIN_X + 48} cy={TITLE_Y + 15} r="5" fill="#10b981" opacity="0.85" />
        {/* tab label */}
        <rect
          x={WIN_X + 70} y={TITLE_Y + 6} width="170" height="20" rx="5"
          fill="#0f172a" stroke="#1e293b" strokeWidth="0.8"
        />
        <text
          x={WIN_X + 80} y={TITLE_Y + 19} fill="#94a3b8" fontSize="10"
          style={{ fontFamily: 'monospace', letterSpacing: '0.04em' }}
        >
          Вход в банка
        </text>

        {/* ============ URL bar ============ */}
        <rect
          x={URL_X} y={URL_Y} width={URL_W} height={URL_H} rx="6"
          fill="#0b1220" stroke="#334155" strokeWidth="1"
        />
        {/* padlock icon (green - HTTPS is on) */}
        <g transform={`translate(${URL_X + 14} ${URL_Y + URL_H / 2})`}>
          <rect
            x="-5" y="-2" width="10" height="9" rx="1.2"
            fill="none" stroke="#34d399" strokeWidth="1.5"
          />
          <path
            d="M -3 -2 V -5 a 3 3 0 0 1 6 0 V -2"
            fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round"
          />
        </g>
        {/* URL fragments */}
        <g style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}>
          <text x={URL_X + 30} y={URL_Y + URL_H / 2 + 4} fill="#94a3b8" fontSize="13">
            https://
          </text>
          <text x={URL_X + 84} y={URL_Y + URL_H / 2 + 4} fill="#e2e8f0" fontSize="13" fontWeight="600">
            banka
          </text>
          <text x={URL_X + 132} y={URL_Y + URL_H / 2 + 4} fill="#f87171" fontSize="13" fontWeight="700">
            -online
          </text>
          <text x={URL_X + 197} y={URL_Y + URL_H / 2 + 4} fill="#e2e8f0" fontSize="13" fontWeight="600">
            .bg
          </text>
          <text x={URL_X + 225} y={URL_Y + URL_H / 2 + 4} fill="#94a3b8" fontSize="13">
            /login
          </text>
        </g>
        {/* pulsing red dashed frame around the slipped part */}
        <rect
          x={URL_X + 128} y={URL_Y + 4} width="68" height={URL_H - 8} rx="3"
          fill="none" stroke="#ef4444" strokeWidth="1.3" strokeDasharray="3 3"
        >
          <animate
            attributeName="stroke-opacity" values="0.4;1;0.4"
            dur="2.4s" repeatCount="indefinite"
          />
        </rect>
        {/* "истинският адрес" ghost label */}
        <text
          x={URL_X + URL_W - 10} y={URL_Y + URL_H / 2 + 4} textAnchor="end"
          fill="#64748b" fontSize="10"
          style={{ fontFamily: 'monospace' }}
        >
          истински: banka.bg
        </text>

        {/* ============ Body content ============ */}
        {/* Fake bank logo */}
        <g transform={`translate(${BODY_X} ${BODY_Y + 6})`}>
          <rect x="0" y="0" width="84" height="26" rx="4" fill="#1e3a8a" />
          <text
            x="42" y="17" textAnchor="middle"
            fill="#e2e8f0" fontSize="11" fontWeight="700"
            style={{ letterSpacing: '0.18em' }}
          >
            БАНКА
          </text>
        </g>

        {/* Urgent heading */}
        <text
          x={BODY_X} y={BODY_Y + 64}
          fill="#fcd34d" fontSize="15" fontWeight="700"
        >
          Спешно! Влезте в профила си веднага!
        </text>
        {/* Urgent subtext with grammar issues */}
        <text
          x={BODY_X} y={BODY_Y + 84}
          fill="#cbd5e1" fontSize="11"
        >
          Ваша сметка ще бъдат блокиранa до 24 часа.
        </text>
        {/* red squiggle under typos */}
        <path
          d={`M ${BODY_X} ${BODY_Y + 88} q 3 3 6 0 q 3 -3 6 0 q 3 3 6 0 q 3 -3 6 0 q 3 3 6 0 q 3 -3 6 0 q 3 3 6 0 q 3 -3 6 0`}
          fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.85"
        />
        <path
          d={`M ${BODY_X + 152} ${BODY_Y + 88} q 3 3 6 0 q 3 -3 6 0 q 3 3 6 0 q 3 -3 6 0 q 3 3 6 0 q 3 -3 6 0 q 3 3 6 0 q 3 -3 6 0 q 3 3 6 0 q 3 -3 6 0 q 3 3 6 0 q 3 -3 6 0`}
          fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.85"
        />

        {/* Login inputs */}
        <text x={BODY_X} y={BODY_Y + 116} fill="#94a3b8" fontSize="11">
          Потребител
        </text>
        <rect
          x={BODY_X} y={BODY_Y + 122} width="280" height="26" rx="4"
          fill="#0b1220" stroke="#334155" strokeWidth="1"
        />
        {/* fake typing cursor */}
        <line
          x1={BODY_X + 10} y1={BODY_Y + 130} x2={BODY_X + 10} y2={BODY_Y + 142}
          stroke="#94a3b8" strokeWidth="1.2"
        >
          <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" />
        </line>

        <text x={BODY_X} y={BODY_Y + 168} fill="#94a3b8" fontSize="11">
          Парола
        </text>
        <rect
          x={BODY_X} y={BODY_Y + 174} width="280" height="26" rx="4"
          fill="#0b1220" stroke="#334155" strokeWidth="1"
        />

        {/* Submit button - red, urgent */}
        <rect
          x={BODY_X} y={BODY_Y + 216} width="140" height="32" rx="5"
          fill="#ef4444" filter="url(#s26-glow)"
        >
          <animate attributeName="fill" values="#ef4444;#dc2626;#ef4444" dur="2.6s" repeatCount="indefinite" />
        </rect>
        <text
          x={BODY_X + 70} y={BODY_Y + 236} textAnchor="middle"
          fill="#fff" fontSize="12" fontWeight="700"
          style={{ letterSpacing: '0.16em' }}
        >
          ВЛЕЗ СЕГА
        </text>

        {/* "You won" prize banner — right side of body */}
        <g transform={`translate(${BODY_X + 318} ${BODY_Y + 40})`}>
          <rect
            x="0" y="0" width="216" height="222" rx="6"
            fill="url(#s26-prize-grad)" stroke="#f59e0b" strokeWidth="1.2"
            strokeDasharray="5 3"
          >
            <animate
              attributeName="stroke-opacity" values="0.5;1;0.5"
              dur="2.8s" repeatCount="indefinite"
            />
          </rect>
          {/* gift box icon */}
          <g transform="translate(108 42)">
            <rect x="-18" y="-2" width="36" height="22" rx="2" fill="#f59e0b" />
            <rect x="-18" y="-10" width="36" height="10" rx="2" fill="#fbbf24" />
            <rect x="-3" y="-10" width="6" height="30" fill="#dc2626" />
            <path
              d="M -3 -10 c -10 -12 -16 -4 -3 -4 c -13 -8 -8 -16 3 -4 z"
              fill="#dc2626"
            />
            <path
              d="M 3 -10 c 10 -12 16 -4 3 -4 c 13 -8 8 -16 -3 -4 z"
              fill="#dc2626"
            />
          </g>
          {/* prize text */}
          <text
            x="108" y="100" textAnchor="middle"
            fill="#fcd34d" fontSize="11" fontWeight="700"
            style={{ letterSpacing: '0.18em' }}
          >
            ВИЕ СПЕЧЕЛИХТЕ
          </text>
          <text
            x="108" y="128" textAnchor="middle"
            fill="#fde68a" fontSize="22" fontWeight="800"
            filter="url(#s26-glow)"
          >
            1000 лв.
          </text>
          <text
            x="108" y="148" textAnchor="middle"
            fill="#fdba74" fontSize="9.5"
          >
            само за днес! натиснете тук!
          </text>
          {/* fake claim button */}
          <rect
            x="50" y="166" width="116" height="28" rx="14"
            fill="#f59e0b" filter="url(#s26-glow)"
          />
          <text
            x="108" y="184" textAnchor="middle"
            fill="#0b1220" fontSize="11" fontWeight="800"
            style={{ letterSpacing: '0.1em' }}
          >
            ВЗЕМИ СЕГА
          </text>
          {/* sparkles around */}
          {[
            { x: 24, y: 20, d: 0 },
            { x: 192, y: 30, d: 0.6 },
            { x: 22, y: 200, d: 1.2 },
            { x: 196, y: 200, d: 0.3 },
          ].map((s, i) => (
            <g key={`s26-spark-${i}`} transform={`translate(${s.x} ${s.y})`}>
              <path
                d="M 0 -5 L 1.4 -1.4 L 5 0 L 1.4 1.4 L 0 5 L -1.4 1.4 L -5 0 L -1.4 -1.4 Z"
                fill="#fde68a"
              >
                <animate
                  attributeName="opacity" values="0.2;1;0.2"
                  dur="2.4s" begin={`${s.d}s`} repeatCount="indefinite"
                />
              </path>
            </g>
          ))}
        </g>

        {/* ============ Connector lines (callout → target) ============ */}
        {CALLOUTS.map((c) => {
          const cx = CO_X
          const cy = c.cy
          return (
            <g key={`s26-conn-${c.n}`}>
              <line
                x1={cx} y1={cy} x2={c.tx} y2={c.ty}
                stroke={c.color} strokeWidth="1.2" strokeDasharray="4 4"
                opacity="0.55"
              >
                <animate
                  attributeName="stroke-dashoffset" from="8" to="0"
                  dur="1.8s" repeatCount="indefinite"
                />
              </line>
              {/* target dot */}
              <circle cx={c.tx} cy={c.ty} r="3.5" fill={c.color} filter="url(#s26-glow)">
                <animate
                  attributeName="r" values="3;5.5;3"
                  dur="2.4s" repeatCount="indefinite"
                />
              </circle>
            </g>
          )
        })}

        {/* ============ Right-side numbered callouts ============ */}
        {CALLOUTS.map((c, i) => {
          const cx = CO_X
          const cy = c.cy
          return (
            <g key={`s26-callout-${c.n}`}>
              {/* pulsing rings */}
              {[0, 1.3].map((d, k) => (
                <circle
                  key={k} cx={cx} cy={cy} r="22" fill="none"
                  stroke={c.color} strokeWidth="1" opacity="0"
                >
                  <animate
                    attributeName="r" values="22;44"
                    dur="3.6s" begin={`${i * 0.5 + d}s`} repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity" values="0.6;0"
                    dur="3.6s" begin={`${i * 0.5 + d}s`} repeatCount="indefinite"
                  />
                </circle>
              ))}
              {/* number badge */}
              <circle
                cx={cx} cy={cy} r="22"
                fill="#0b1220" stroke={c.color} strokeWidth="2"
                filter="url(#s26-glow)"
              />
              <text
                x={cx} y={cy + 6} textAnchor="middle"
                fill={c.color} fontSize="20" fontWeight="800"
              >
                {c.n}
              </text>
              {/* label */}
              <text
                x={cx + 32} y={cy - 4}
                fill="#e2e8f0" fontSize="13" fontWeight="700"
              >
                {c.label}
              </text>
              <text
                x={cx + 32} y={cy + 12}
                fill="#94a3b8" fontSize="10"
              >
                {c.sub}
              </text>
            </g>
          )
        })}

        {/* ============ Top caption ============ */}
        <text
          x="370" y="78" textAnchor="middle"
          fill="#f87171" fontSize="11" fontWeight="700"
          style={{ letterSpacing: '0.22em' }}
        >
          ⚠ ИЗМАМЕН САЙТ — ТРИ ЗНАКА
        </text>
      </svg>
    </div>
  )
}
