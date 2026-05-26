// Scene 3.6 — Сигурност на пощата
// Pattern: hub & orbit — a central locked mailbox protected by a pulsing
// shield, with three defense cards orbiting around it: a strong-password
// field with a green strength meter, a phone showing a refreshing 2FA code,
// and a phishing email being deflected by a red warning. Lines from the hub
// to each card carry traveling protection packets.

const CX = 450
const CY = 295

const PWD = { cx: 210, cy: 410, w: 230, h: 150, color: '#10b981' }
const TFA = { cx: 460, cy: 110, w: 200, h: 130, color: '#3b82f6' }
const PHI = { cx: 700, cy: 410, w: 240, h: 160, color: '#ef4444' }

const PWD_X = PWD.cx - PWD.w / 2
const PWD_Y = PWD.cy - PWD.h / 2
const TFA_X = TFA.cx - TFA.w / 2
const TFA_Y = TFA.cy - TFA.h / 2
const PHI_X = PHI.cx - PHI.w / 2
const PHI_Y = PHI.cy - PHI.h / 2

// Strength meter — five segments, all filled (strong password)
const PWD_SEG_COUNT = 5
const PWD_SEG_W = 32
const PWD_SEG_GAP = 4
const PWD_METER_TOTAL = PWD_SEG_COUNT * PWD_SEG_W + (PWD_SEG_COUNT - 1) * PWD_SEG_GAP
const PWD_METER_X = PWD_X + (PWD.w - PWD_METER_TOTAL) / 2
const PWD_METER_Y = PWD_Y + 96

// 2FA digits — six monospace digits cycling
const TFA_DIGITS = ['4', '2', '7', '1', '9', '3']
const TFA_NEXT = ['8', '5', '0', '6', '3', '7']
const TFA_DIGIT_W = 22
const TFA_DIGIT_GAP = 4
const TFA_GROUP_GAP = 12
const TFA_ROW_W = 6 * TFA_DIGIT_W + 4 * TFA_DIGIT_GAP + TFA_GROUP_GAP
const TFA_ROW_X = TFA_X + (TFA.w - TFA_ROW_W) / 2
const TFA_ROW_Y = TFA_Y + 62

export default function Scene_3_6() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s36-hub-grad">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#065f46" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#065f46" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s36-card-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#0b1220" />
          </linearGradient>
          <radialGradient id="s36-warn-grad">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
          <filter id="s36-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="s36-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ===== Ambient ===== */}
        <circle
          cx={CX} cy={CY} r="252" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 9"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="60s" repeatCount="indefinite"
          />
        </circle>
        <circle
          cx={CX} cy={CY} r="210" fill="none"
          stroke="#334155" strokeWidth="0.4" strokeDasharray="1 6" opacity="0.5"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`360 ${CX} ${CY}`} to={`0 ${CX} ${CY}`}
            dur="42s" repeatCount="indefinite"
          />
        </circle>
        {[
          { x: 80, y: 80, ch: '🔒', d: 0 },
          { x: 820, y: 80, ch: '🔒', d: 1.4 },
          { x: 80, y: 520, ch: '🔒', d: 2.6 },
          { x: 820, y: 520, ch: '🔒', d: 3.8 },
        ].map((p, i) => (
          <text
            key={`s36-bg-${i}`}
            x={p.x} y={p.y}
            textAnchor="middle"
            fill="#1e293b" fontSize="16" fontWeight="700"
            style={{ fontFamily: 'monospace' }}
          >
            ◆
            <animate
              attributeName="opacity" values="0.25;0.55;0.25"
              dur="6s" begin={`${p.d}s`} repeatCount="indefinite"
            />
          </text>
        ))}

        {/* ===== Connections hub → card with traveling protection packet ===== */}
        {[PWD, TFA, PHI].map((c, i) => (
          <g key={`s36-link-${i}`}>
            <line
              x1={CX} y1={CY} x2={c.cx} y2={c.cy}
              stroke="#334155" strokeWidth="1"
              strokeDasharray="4 6" opacity="0.55"
            >
              <animate
                attributeName="stroke-dashoffset" from="10" to="0"
                dur="1.8s" repeatCount="indefinite"
              />
            </line>
            <circle r="3.6" fill={c.color} filter="url(#s36-glow)">
              <animateMotion
                dur={`${4.4 + i * 0.5}s`} repeatCount="indefinite"
                path={`M ${CX} ${CY} L ${c.cx} ${c.cy}`}
              />
            </circle>
          </g>
        ))}

        {/* ===== Central hub: пощенска кутия със щит ===== */}
        <g transform={`translate(${CX} ${CY})`}>
          <circle r="72" fill="url(#s36-hub-grad)" />
          {/* Pulsing protective rings */}
          {[0, 1.6, 3.2].map((d, i) => (
            <circle key={`s36-pulse-${i}`} r="48" fill="none" stroke="#34d399" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="48;96" dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {/* Shield outline (slightly rounded crest) */}
          <path
            d="M 0 -54 C 32 -52 44 -42 44 -22 C 44 18 26 44 0 56 C -26 44 -44 18 -44 -22 C -44 -42 -32 -52 0 -54 Z"
            fill="#0b1220" stroke="#34d399" strokeWidth="2"
            filter="url(#s36-glow)"
          >
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="3.6s" repeatCount="indefinite" />
          </path>
          {/* Envelope inside the shield */}
          <g transform="translate(0 -4)">
            <rect
              x="-22" y="-12" width="44" height="28" rx="3"
              fill="#0f1b2e" stroke="#60a5fa" strokeWidth="1.4"
            />
            <path
              d="M -22 -12 L 0 6 L 22 -12"
              fill="none" stroke="#60a5fa" strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </g>
          {/* Padlock sitting on the envelope */}
          <g transform="translate(0 28)">
            <path
              d="M -6 -6 a 6 6 0 0 1 12 0 v 4"
              fill="none" stroke="#34d399" strokeWidth="1.6"
              strokeLinecap="round"
            />
            <rect
              x="-8" y="-2" width="16" height="12" rx="2"
              fill="#0b1220" stroke="#34d399" strokeWidth="1.6"
            >
              <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.6s" repeatCount="indefinite" />
            </rect>
            <circle cx="0" cy="4" r="1.6" fill="#34d399" />
          </g>
          <text
            x="0" y="78" textAnchor="middle"
            fill="#94a3b8" fontSize="10" fontWeight="700"
            style={{ letterSpacing: '0.24em' }}
          >
            ПОЩА
          </text>
        </g>

        {/* ============== PASSWORD CARD (bottom-left) ============== */}
        <g>
          <rect
            x={PWD_X - 6} y={PWD_Y - 6}
            width={PWD.w + 12} height={PWD.h + 12} rx="16"
            fill="none" stroke={PWD.color} strokeWidth="1" opacity="0.16"
            filter="url(#s36-soft)"
          />
          <rect
            x={PWD_X} y={PWD_Y}
            width={PWD.w} height={PWD.h} rx="12"
            fill="url(#s36-card-grad)" stroke={PWD.color} strokeWidth="1.4"
            filter="url(#s36-glow)"
          >
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="5s" repeatCount="indefinite" />
          </rect>
          <text
            x={PWD_X + 14} y={PWD_Y + 22}
            fill={PWD.color} fontSize="10" fontWeight="700"
            style={{ letterSpacing: '0.22em' }}
          >
            ПАРОЛА
          </text>

          {/* Password input field with dots */}
          <rect
            x={PWD_X + 14} y={PWD_Y + 40}
            width={PWD.w - 28} height="34" rx="6"
            fill="#0f172a" stroke={PWD.color} strokeWidth="1" opacity="0.85"
          >
            <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
          </rect>
          {/* 12 dots representing a 12-char password */}
          {Array.from({ length: 12 }).map((_, i) => (
            <circle
              key={`s36-pwd-dot-${i}`}
              cx={PWD_X + 26 + i * 14}
              cy={PWD_Y + 57}
              r="3.2" fill="#e2e8f0"
            >
              <animate
                attributeName="opacity" values="0.6;1;0.6"
                dur="3.6s" begin={`${i * 0.12}s`} repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Strength meter — five green segments */}
          {Array.from({ length: PWD_SEG_COUNT }).map((_, i) => (
            <rect
              key={`s36-seg-${i}`}
              x={PWD_METER_X + i * (PWD_SEG_W + PWD_SEG_GAP)}
              y={PWD_METER_Y}
              width={PWD_SEG_W} height="8" rx="3"
              fill={PWD.color} opacity="0.35"
            >
              <animate
                attributeName="opacity" values="0.35;1;0.35"
                dur="2.4s" begin={`${i * 0.18}s`} repeatCount="indefinite"
              />
            </rect>
          ))}
          <text
            x={PWD_X + PWD.w / 2} y={PWD_Y + 124}
            textAnchor="middle"
            fill={PWD.color} fontSize="11" fontWeight="700"
            style={{ letterSpacing: '0.2em' }}
          >
            СИЛНА
          </text>
        </g>

        {/* ============== 2FA CARD (top) ============== */}
        <g>
          <rect
            x={TFA_X - 6} y={TFA_Y - 6}
            width={TFA.w + 12} height={TFA.h + 12} rx="16"
            fill="none" stroke={TFA.color} strokeWidth="1" opacity="0.16"
            filter="url(#s36-soft)"
          />
          <rect
            x={TFA_X} y={TFA_Y}
            width={TFA.w} height={TFA.h} rx="12"
            fill="url(#s36-card-grad)" stroke={TFA.color} strokeWidth="1.4"
            filter="url(#s36-glow)"
          >
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="5s" repeatCount="indefinite" />
          </rect>
          <text
            x={TFA_X + 14} y={TFA_Y + 22}
            fill={TFA.color} fontSize="10" fontWeight="700"
            style={{ letterSpacing: '0.22em' }}
          >
            2FA · КОД
          </text>
          {/* Small phone icon top-right */}
          <g transform={`translate(${TFA_X + TFA.w - 26} ${TFA_Y + 22})`}>
            <rect x="-7" y="-12" width="14" height="22" rx="3" fill="none" stroke={TFA.color} strokeWidth="1.4" />
            <circle cx="0" cy="6" r="1.2" fill={TFA.color} />
            <rect x="-3" y="-10" width="6" height="1.2" fill={TFA.color} opacity="0.6" />
          </g>

          {/* 6-digit code row — split as 3 + 3, cycling between two values */}
          {TFA_DIGITS.map((d, i) => {
            const groupOffset = i >= 3 ? TFA_GROUP_GAP : 0
            const x = TFA_ROW_X + i * (TFA_DIGIT_W + TFA_DIGIT_GAP) + groupOffset
            return (
              <g key={`s36-tfa-${i}`}>
                <rect
                  x={x} y={TFA_ROW_Y}
                  width={TFA_DIGIT_W} height="34" rx="5"
                  fill="#0f172a" stroke={TFA.color} strokeWidth="1" opacity="0.85"
                >
                  <animate
                    attributeName="stroke-opacity"
                    values="0.5;1;0.5;1;0.5"
                    keyTimes="0;0.35;0.5;0.65;1"
                    dur="4.8s" repeatCount="indefinite"
                  />
                </rect>
                <text
                  x={x + TFA_DIGIT_W / 2} y={TFA_ROW_Y + 23}
                  textAnchor="middle"
                  fill="#e2e8f0" fontSize="16" fontWeight="700"
                  style={{ fontFamily: 'monospace' }}
                >
                  {d}
                  <animate
                    attributeName="opacity"
                    values="1;1;0;0;1;1"
                    keyTimes="0;0.42;0.48;0.52;0.58;1"
                    dur="4.8s" repeatCount="indefinite"
                  />
                </text>
                <text
                  x={x + TFA_DIGIT_W / 2} y={TFA_ROW_Y + 23}
                  textAnchor="middle"
                  fill="#e2e8f0" fontSize="16" fontWeight="700"
                  style={{ fontFamily: 'monospace' }}
                  opacity="0"
                >
                  {TFA_NEXT[i]}
                  <animate
                    attributeName="opacity"
                    values="0;0;1;1;0;0"
                    keyTimes="0;0.48;0.52;0.92;0.96;1"
                    dur="4.8s" repeatCount="indefinite"
                  />
                </text>
              </g>
            )
          })}
          {/* Group separator dash */}
          <text
            x={TFA_ROW_X + 3 * (TFA_DIGIT_W + TFA_DIGIT_GAP) - TFA_DIGIT_GAP / 2 + TFA_GROUP_GAP / 2}
            y={TFA_ROW_Y + 22}
            textAnchor="middle"
            fill="#475569" fontSize="14" fontWeight="700"
          >
            ·
          </text>
        </g>

        {/* ============== PHISHING CARD (bottom-right) ============== */}
        <g>
          <rect
            x={PHI_X - 6} y={PHI_Y - 6}
            width={PHI.w + 12} height={PHI.h + 12} rx="16"
            fill="none" stroke={PHI.color} strokeWidth="1" opacity="0.16"
            filter="url(#s36-soft)"
          />
          <rect
            x={PHI_X} y={PHI_Y}
            width={PHI.w} height={PHI.h} rx="12"
            fill="url(#s36-card-grad)" stroke={PHI.color} strokeWidth="1.4"
            filter="url(#s36-glow)"
          >
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="4.4s" repeatCount="indefinite" />
          </rect>
          <text
            x={PHI_X + 14} y={PHI_Y + 22}
            fill={PHI.color} fontSize="10" fontWeight="700"
            style={{ letterSpacing: '0.22em' }}
          >
            ФИШИНГ
          </text>
          {/* Warning triangle top-right */}
          <g transform={`translate(${PHI_X + PHI.w - 26} ${PHI_Y + 22})`}>
            <path
              d="M 0 -10 L 10 8 L -10 8 Z"
              fill="none" stroke={PHI.color} strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <line x1="0" y1="-4" x2="0" y2="3" stroke={PHI.color} strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="0" cy="6" r="1.2" fill={PHI.color} />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1.6s" repeatCount="indefinite" />
          </g>

          {/* Fake mail mock */}
          {/* Urgent red banner */}
          <rect
            x={PHI_X + 14} y={PHI_Y + 40}
            width={PHI.w - 28} height="18" rx="4"
            fill="#3b0f0f" stroke={PHI.color} strokeWidth="1"
          >
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="2.4s" repeatCount="indefinite" />
          </rect>
          <text
            x={PHI_X + 22} y={PHI_Y + 53}
            fill="#fecaca" fontSize="9.5" fontWeight="700"
            style={{ letterSpacing: '0.1em' }}
          >
            СПЕШНО: акаунтът ще бъде блокиран
          </text>

          {/* Fake "from" line with suspicious domain */}
          <text
            x={PHI_X + 14} y={PHI_Y + 76}
            fill="#94a3b8" fontSize="9" fontWeight="700"
            style={{ letterSpacing: '0.16em' }}
          >
            ОТ
          </text>
          <text
            x={PHI_X + 34} y={PHI_Y + 76}
            fill="#e2e8f0" fontSize="10"
            style={{ fontFamily: 'monospace' }}
          >
            support@bank-secure.tk
          </text>
          {/* underline on the suspicious domain "bank-secure.tk" */}
          <line
            x1={PHI_X + 82} y1={PHI_Y + 79}
            x2={PHI_X + 166} y2={PHI_Y + 79}
            stroke={PHI.color} strokeWidth="1" strokeDasharray="2 2"
          >
            <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </line>

          {/* Fake "confirm" button */}
          <rect
            x={PHI_X + 14} y={PHI_Y + 92}
            width="110" height="28" rx="6"
            fill="#3b0f0f" stroke={PHI.color} strokeWidth="1.4"
          >
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          </rect>
          <text
            x={PHI_X + 69} y={PHI_Y + 110}
            textAnchor="middle"
            fill="#fecaca" fontSize="10" fontWeight="700"
            style={{ letterSpacing: '0.16em' }}
          >
            ПОТВЪРДИ СЕГА
          </text>

          {/* Big red X blocking the button — the "reject" gesture */}
          <g transform={`translate(${PHI_X + 175} ${PHI_Y + 106})`}>
            <ellipse rx="30" ry="20" fill="url(#s36-warn-grad)">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite" />
            </ellipse>
            <circle r="18" fill="#0b1220" stroke={PHI.color} strokeWidth="2" filter="url(#s36-glow)">
              <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <line x1="-8" y1="-8" x2="8" y2="8" stroke={PHI.color} strokeWidth="2.6" strokeLinecap="round" />
            <line x1="8" y1="-8" x2="-8" y2="8" stroke={PHI.color} strokeWidth="2.6" strokeLinecap="round" />
          </g>

          {/* "Не отваряй" hint below */}
          <text
            x={PHI_X + PHI.w / 2} y={PHI_Y + 142}
            textAnchor="middle"
            fill="#94a3b8" fontSize="10" fontWeight="600"
          >
            не давайте парола по имейл
          </text>
        </g>
      </svg>
    </div>
  )
}
