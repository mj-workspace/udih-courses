// Scene 6.4 — Дигитална етика: спирачката на двата въпроса
// Pattern: flow — an angry red impulse on the left travels right, hits a
// glowing shield (the pause), and emerges as a calm green message on the
// right. Above the shield: two glowing speech bubbles with the two guiding
// questions the guide names — „Вярно ли е?" and „Как би се почувствал?".
// In the corners, two faded icons (a face and a clock) show the two missing
// „brakes" that the screen removes — the same „спирачки" named in the bullets.

const CX = 450
const CY = 320

const SHIELD_PATH = 'M -90 -60 L 90 -60 L 90 30 Q 90 80 0 105 Q -90 80 -90 30 Z'

export default function Scene_6_4() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s64-halo">
            <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0.22" />
            <stop offset="70%"  stopColor="#1e3a8a" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s64-shield" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0f172a" />
            <stop offset="100%" stopColor="#06101f" />
          </linearGradient>
          <linearGradient id="s64-angry" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#7f1d1d" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <linearGradient id="s64-calm" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <filter id="s64-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="s64-glow-red" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ============================================================ */}
        {/* Ambient                                                       */}
        {/* ============================================================ */}
        <ellipse cx={CX} cy={CY} rx="320" ry="220" fill="url(#s64-halo)" />

        <circle
          cx={CX} cy={CY} r="240" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 11"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="55s" repeatCount="indefinite"
          />
        </circle>

        {/* ============================================================ */}
        {/* Question bubble 1 — „Вярно ли е?"                              */}
        {/* ============================================================ */}
        <g transform="translate(255 120)">
          <rect
            x="-100" y="-34" width="200" height="68" rx="14"
            fill="#0b1220" stroke="#22d3ee" strokeWidth="1.6"
            filter="url(#s64-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.55;1;0.55" dur="3s" repeatCount="indefinite"
            />
          </rect>
          <path
            d="M 40 32 L 70 56 L 50 36 Z"
            fill="#0b1220" stroke="#22d3ee" strokeWidth="1.4"
          />
          <text
            x="0" y="-10" textAnchor="middle"
            fill="#94a3b8" fontSize="10" fontWeight="700"
            style={{ letterSpacing: '0.18em' }}
          >
            ВЪПРОС 1
          </text>
          <text
            x="0" y="16" textAnchor="middle"
            fill="#e2e8f0" fontSize="16" fontWeight="700"
          >
            „Вярно ли е?"
          </text>
        </g>

        {/* ============================================================ */}
        {/* Question bubble 2 — „Как би се почувствал?"                    */}
        {/* ============================================================ */}
        <g transform="translate(645 120)">
          <rect
            x="-120" y="-34" width="240" height="68" rx="14"
            fill="#0b1220" stroke="#22d3ee" strokeWidth="1.6"
            filter="url(#s64-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.55;1;0.55" dur="3.2s" begin="0.4s" repeatCount="indefinite"
            />
          </rect>
          <path
            d="M -40 32 L -70 56 L -50 36 Z"
            fill="#0b1220" stroke="#22d3ee" strokeWidth="1.4"
          />
          <text
            x="0" y="-10" textAnchor="middle"
            fill="#94a3b8" fontSize="10" fontWeight="700"
            style={{ letterSpacing: '0.18em' }}
          >
            ВЪПРОС 2
          </text>
          <text
            x="0" y="16" textAnchor="middle"
            fill="#e2e8f0" fontSize="15" fontWeight="700"
          >
            „Как би се почувствал?"
          </text>
        </g>

        {/* ============================================================ */}
        {/* Central shield — the pause gate                                */}
        {/* ============================================================ */}
        <g transform={`translate(${CX} ${CY})`}>
          {/* outward pulse ghosts of the shield */}
          {[0, 1.6].map((d, i) => (
            <path
              key={i}
              d={SHIELD_PATH}
              fill="none" stroke="#22d3ee" strokeWidth="1.4"
              opacity="0"
            >
              <animate
                attributeName="opacity" values="0.55;0"
                dur="4.2s" begin={`${d}s`} repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform" type="scale"
                values="1;1.22" dur="4.2s" begin={`${d}s`} repeatCount="indefinite"
              />
            </path>
          ))}

          {/* shield body */}
          <path
            d={SHIELD_PATH}
            fill="url(#s64-shield)"
            stroke="#60a5fa" strokeWidth="2.2"
            filter="url(#s64-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.65;1;0.65" dur="3.4s" repeatCount="indefinite"
            />
          </path>

          {/* pause bars (the „stop and think" symbol) */}
          <rect x="-22" y="-22" width="14" height="50" rx="3"
                fill="#60a5fa" filter="url(#s64-glow)" opacity="0.95" />
          <rect x="8"   y="-22" width="14" height="50" rx="3"
                fill="#60a5fa" filter="url(#s64-glow)" opacity="0.95" />

          {/* label inside the shield's narrowing point */}
          <text
            x="0" y="62" textAnchor="middle"
            fill="#94a3b8" fontSize="11" fontWeight="800"
            style={{ letterSpacing: '0.22em' }}
          >
            СПРИ
          </text>
        </g>

        {/* ============================================================ */}
        {/* Angry red phone (left) — the impulse                           */}
        {/* ============================================================ */}
        <g transform="translate(155 360)">
          <rect
            x="-46" y="-60" width="92" height="124" rx="11"
            fill="#0b1220" stroke="#334155" strokeWidth="1.2"
          />
          <rect
            x="-38" y="-52" width="76" height="96" rx="3"
            fill="#1a0808" opacity="0.7"
          />
          {/* angry message bubble */}
          <rect
            x="-32" y="-42" width="60" height="22" rx="6"
            fill="url(#s64-angry)" stroke="#ef4444" strokeWidth="1"
            filter="url(#s64-glow-red)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.6;1;0.6" dur="1.6s" repeatCount="indefinite"
            />
          </rect>
          <text
            x="-2" y="-26" textAnchor="middle"
            fill="#fecaca" fontSize="14" fontWeight="800"
          >
            !!!
          </text>
          {/* faux text lines */}
          <rect x="-32" y="-12" width="48" height="5" rx="2" fill="#7f1d1d" opacity="0.75" />
          <rect x="-32" y="-2"  width="40" height="5" rx="2" fill="#7f1d1d" opacity="0.6" />
          <rect x="-32" y="8"   width="36" height="5" rx="2" fill="#7f1d1d" opacity="0.5" />

          {/* „send" button about to be tapped */}
          <circle cx="22" cy="48" r="9"
                  fill="#ef4444" filter="url(#s64-glow-red)" opacity="0.85">
            <animate
              attributeName="opacity" values="0.45;1;0.45"
              dur="1.4s" repeatCount="indefinite"
            />
          </circle>
          <path d="M 18 44 L 27 48 L 18 52 Z" fill="#0b1220" />

          <text
            x="0" y="82" textAnchor="middle"
            fill="#fca5a5" fontSize="10" fontWeight="700"
            style={{ letterSpacing: '0.18em' }}
          >
            ПРИБЪРЗАНО
          </text>
        </g>

        {/* dashed flow from angry phone → shield */}
        <line
          x1="201" y1="350" x2="360" y2="320"
          stroke="#ef4444" strokeWidth="1.4"
          strokeDasharray="6 6" opacity="0.55"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="12" to="0" dur="1.4s" repeatCount="indefinite"
          />
        </line>

        {/* travelling red impulse — absorbed at the shield */}
        <circle r="6" fill="#ef4444" filter="url(#s64-glow-red)" opacity="0">
          <animateMotion
            dur="3.6s" repeatCount="indefinite"
            path="M 201 350 L 360 320"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0" keyTimes="0;0.2;0.85;1"
            dur="3.6s" repeatCount="indefinite"
          />
        </circle>

        {/* ============================================================ */}
        {/* Calm green phone (right) — after the pause                     */}
        {/* ============================================================ */}
        <g transform="translate(745 360)">
          <rect
            x="-46" y="-60" width="92" height="124" rx="11"
            fill="#0b1220" stroke="#334155" strokeWidth="1.2"
          />
          <rect
            x="-38" y="-52" width="76" height="96" rx="3"
            fill="#06180f" opacity="0.7"
          />
          {/* calm message bubble */}
          <rect
            x="-32" y="-42" width="60" height="22" rx="6"
            fill="url(#s64-calm)" stroke="#10b981" strokeWidth="1"
            filter="url(#s64-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.6;1;0.6" dur="3s" repeatCount="indefinite"
            />
          </rect>
          {/* check mark inside calm bubble */}
          <path
            d="M -10 -32 L -3 -25 L 8 -38"
            fill="none" stroke="#0b1220" strokeWidth="2.4"
            strokeLinecap="round" strokeLinejoin="round"
          />
          <rect x="-32" y="-12" width="48" height="5" rx="2" fill="#065f46" opacity="0.7" />
          <rect x="-32" y="-2"  width="40" height="5" rx="2" fill="#065f46" opacity="0.6" />
          <rect x="-32" y="8"   width="36" height="5" rx="2" fill="#065f46" opacity="0.5" />

          {/* check badge */}
          <g transform="translate(22 48)">
            <circle r="9" fill="#10b981" filter="url(#s64-glow)" opacity="0.92">
              <animate
                attributeName="opacity" values="0.55;1;0.55"
                dur="2.4s" repeatCount="indefinite"
              />
            </circle>
            <path
              d="M -3.5 0 L -1 2.5 L 3.5 -2.5"
              fill="none" stroke="#0b1220"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
          </g>

          <text
            x="0" y="82" textAnchor="middle"
            fill="#86efac" fontSize="10" fontWeight="700"
            style={{ letterSpacing: '0.18em' }}
          >
            СЛЕД РАЗМИСЪЛ
          </text>
        </g>

        {/* dashed flow from shield → calm phone */}
        <line
          x1="540" y1="320" x2="699" y2="350"
          stroke="#10b981" strokeWidth="1.4"
          strokeDasharray="6 6" opacity="0.55"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="12" to="0" dur="2.2s" repeatCount="indefinite"
          />
        </line>

        {/* travelling green impulse — emerging from the shield */}
        <circle r="6" fill="#10b981" filter="url(#s64-glow)" opacity="0">
          <animateMotion
            dur="3.6s" begin="0.5s" repeatCount="indefinite"
            path="M 540 320 L 699 350"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0" keyTimes="0;0.15;0.85;1"
            dur="3.6s" begin="0.5s" repeatCount="indefinite"
          />
        </circle>

        {/* ============================================================ */}
        {/* Two faded "missing brakes" — face + clock                      */}
        {/* ============================================================ */}
        {/* Face — the brake of seeing the other person */}
        <g transform="translate(120 110)" opacity="0.32">
          <circle r="22" fill="none" stroke="#475569" strokeWidth="1.2" />
          <circle cx="-7" cy="-4" r="2" fill="#64748b" />
          <circle cx="7"  cy="-4" r="2" fill="#64748b" />
          <path d="M -8 6 Q 0 12 8 6" fill="none"
                stroke="#64748b" strokeWidth="1.4" strokeLinecap="round" />
          {/* faint diagonal slash — this brake is missing */}
          <line x1="-22" y1="-22" x2="22" y2="22"
                stroke="#94a3b8" strokeWidth="0.8" opacity="0.7" />
          <text x="0" y="42" textAnchor="middle"
                fill="#64748b" fontSize="9" fontWeight="700"
                style={{ letterSpacing: '0.14em' }}>
            ЛИЦЕТО ОТСРЕЩА
          </text>
        </g>

        {/* Clock — the brake of time to think */}
        <g transform="translate(780 470)" opacity="0.32">
          <circle r="22" fill="none" stroke="#475569" strokeWidth="1.2" />
          <line x1="0" y1="0" x2="0" y2="-13"
                stroke="#64748b" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="0" y1="0" x2="9" y2="4"
                stroke="#64748b" strokeWidth="1.6" strokeLinecap="round" />
          <circle r="1.6" fill="#64748b" />
          <line x1="-22" y1="-22" x2="22" y2="22"
                stroke="#94a3b8" strokeWidth="0.8" opacity="0.7" />
          <text x="0" y="42" textAnchor="middle"
                fill="#64748b" fontSize="9" fontWeight="700"
                style={{ letterSpacing: '0.14em' }}>
            ВРЕМЕ ЗА РАЗМИСЪЛ
          </text>
        </g>
      </svg>
    </div>
  )
}
