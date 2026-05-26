// Scene 7.5 — Създаване на акаунт и интерфейс
// Pattern: annotated mock — стилизиран AI чат прозорец с реални елементи.
// Sidebar отляво: "+ Нов разговор" + история на минали разговори.
// Main area отдясно: чат поток (user + assistant bubbles), input поле и
// бутон-стрелка за изпращане. Top bar има phone + laptop иконки (един акаунт
// работи навсякъде). Анимация в 12s loop: cursor пише в input → бутонът се
// натиска → user bubble се появява → assistant typing dots → отговор → пауза.

const WX = 80
const WY = 64
const WW = 740
const WH = 400
const WR = 14

// Top bar
const TBH = 32
const TBY = WY
// Inner content area (под top bar)
const CY0 = WY + TBH // 96
const CH = WH - TBH // 368

// Sidebar
const SBX = WX // 80
const SBW = 190
const SBR = WX + SBW // 270

// Main area
const MAX = SBR // 270
const MAW = WW - SBW // 550
const MAR = MAX + MAW // 820

// New chat button
const NCX = SBX + 12
const NCY = CY0 + 14
const NCW = SBW - 24
const NCH = 32

// History items
const HIST_X = NCX
const HIST_LABEL_Y = NCY + NCH + 28
const HIST_Y0 = HIST_LABEL_Y + 12
const HIST_H = 28
const HIST_GAP = 6
const HIST = [
  { label: 'Писмо до доставчик', active: true },
  { label: 'Списък с резервни ч…', active: false },
  { label: 'Обяснение за помпа', active: false },
  { label: 'Идеи за обучение', active: false },
  { label: 'Кратко обявление', active: false },
]

// Input area
const INX = MAX + 14
const INW = MAW - 28 - 38 // оставяме място за send бутон
const INY = CY0 + CH - 48
const INH = 30
const INR = INH / 2

// Send button
const SENDX = INX + INW + 14
const SENDY = INY + INH / 2
const SENDR = 16

// Chat area bounds (между топа на main и input)
const CHAT_Y0 = CY0 + 14
const CHAT_Y1 = INY - 14

// Bubbles
const USER_BUB = {
  x: MAR - 14 - 230, // дясно подравнено
  y: CHAT_Y0 + 24,
  w: 230,
  h: 34,
}
const ASSIST_TYPING = {
  x: MAX + 14,
  y: USER_BUB.y + USER_BUB.h + 18,
  w: 70,
  h: 30,
}
const ASSIST_BUB = {
  x: MAX + 14,
  y: ASSIST_TYPING.y,
  w: 380,
  h: 110,
}

// Анимационен timeline (12s loop)
// 0.00 - 0.21  type characters (0-2.5s)
// 0.21 - 0.25  send press (2.5-3.0s)
// 0.25 - 0.29  user bubble in (3.0-3.5s)
// 0.29 - 0.46  typing dots (3.5-5.5s)
// 0.46 - 0.58  assistant text in (5.5-7.0s)
// 0.58 - 0.88  hold (7.0-10.5s)
// 0.88 - 1.00  fade & reset (10.5-12s)

const DUR = '12s'

const typedChars = ['Н', 'а', 'п', 'и', 'ш', 'и', ' ', 'к', 'р', 'а', 't', 'к', 'о', ' ', 'п', 'и', 'с', 'м', 'о']
// замяна на латинско "t" — да е чисто кирилица
const typedCharsClean = ['Н', 'а', 'п', 'и', 'ш', 'и', ' ', 'к', 'р', 'а', 'т', 'к', 'о', ' ', 'п', 'и', 'с', 'м', 'о']

export default function Scene_7_5() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s75-win-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#0b1220" />
          </linearGradient>
          <linearGradient id="s75-sb-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0c1426" />
            <stop offset="100%" stopColor="#0a111f" />
          </linearGradient>
          <radialGradient id="s75-send-grad">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.5" />
          </radialGradient>
          <radialGradient id="s75-acc-grad">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <filter id="s75-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="s75-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ===== Ambient: drifting @ glyphs ===== */}
        {[
          { x: 50, y: 50, d: 0 },
          { x: 840, y: 50, d: 1.4 },
          { x: 50, y: 540, d: 2.8 },
          { x: 840, y: 540, d: 4.2 },
        ].map((p, i) => (
          <text
            key={`s75-bg-${i}`}
            x={p.x}
            y={p.y}
            fill="#1e293b"
            fontSize="16"
            fontWeight="700"
            style={{ fontFamily: 'monospace' }}
          >
            @
            <animate
              attributeName="opacity"
              values="0.2;0.55;0.2"
              dur="7s"
              begin={`${p.d}s`}
              repeatCount="indefinite"
            />
          </text>
        ))}

        {/* ===== Window halo ===== */}
        <rect
          x={WX - 6}
          y={WY - 6}
          width={WW + 12}
          height={WH + 12}
          rx={WR + 6}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1"
          opacity="0.16"
          filter="url(#s75-soft)"
        />

        {/* ===== Window frame ===== */}
        <rect
          x={WX}
          y={WY}
          width={WW}
          height={WH}
          rx={WR}
          fill="url(#s75-win-grad)"
          stroke="#3b82f6"
          strokeWidth="1.4"
          filter="url(#s75-glow)"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.55;1;0.55"
            dur="6s"
            repeatCount="indefinite"
          />
        </rect>

        {/* ===== Top bar ===== */}
        <line
          x1={WX}
          y1={CY0}
          x2={WX + WW}
          y2={CY0}
          stroke="#1e293b"
          strokeWidth="1"
        />
        {/* window dots */}
        {[0, 1, 2].map((i) => (
          <circle
            key={`s75-dot-${i}`}
            cx={WX + 16 + i * 12}
            cy={TBY + TBH / 2}
            r="4"
            fill={['#ef4444', '#f59e0b', '#10b981'][i]}
            opacity="0.7"
          />
        ))}
        {/* title */}
        <text
          x={WX + 60}
          y={TBY + TBH / 2 + 4}
          fill="#94a3b8"
          fontSize="11"
          fontWeight="700"
          style={{ letterSpacing: '0.16em' }}
        >
          AI АСИСТЕНТ
        </text>

        {/* device badges top-right: phone + laptop = same account */}
        <g transform={`translate(${WX + WW - 96} ${TBY + TBH / 2})`}>
          {/* sync arrows */}
          <path
            d="M -2 -4 l 6 0 M 4 -4 l -2 -2 M 4 -4 l -2 2 M 6 4 l -6 0 M 0 4 l 2 -2 M 0 4 l 2 2"
            stroke="#22d3ee"
            strokeWidth="1"
            fill="none"
            opacity="0.7"
          >
            <animate
              attributeName="opacity"
              values="0.35;0.9;0.35"
              dur="3.4s"
              repeatCount="indefinite"
            />
          </path>
          {/* phone glyph (left) */}
          <g transform="translate(-22 0)">
            <rect
              x="-7"
              y="-10"
              width="14"
              height="20"
              rx="2.4"
              fill="#0b1220"
              stroke="#22d3ee"
              strokeWidth="1.1"
            />
            <rect x="-3" y="7" width="6" height="1" rx="0.5" fill="#22d3ee" />
            <rect x="-4" y="-7" width="8" height="11" rx="0.6" fill="#0f172a" />
          </g>
          {/* laptop glyph (right) */}
          <g transform="translate(22 0)">
            <rect
              x="-10"
              y="-8"
              width="20"
              height="13"
              rx="1.8"
              fill="#0b1220"
              stroke="#22d3ee"
              strokeWidth="1.1"
            />
            <rect x="-8" y="-6" width="16" height="8" rx="0.6" fill="#0f172a" />
            <path
              d="M -13 7 l 26 0 l -2 2 l -22 0 z"
              fill="#0b1220"
              stroke="#22d3ee"
              strokeWidth="1.1"
            />
          </g>
          {/* same-account check dot */}
          <circle cx="0" cy="-16" r="6" fill="#0b1220" stroke="#10b981" strokeWidth="1.2" />
          <path
            d="M -2.5 -16 l 1.6 1.8 l 3.4 -3.6"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* ===== Sidebar background ===== */}
        <rect
          x={SBX}
          y={CY0}
          width={SBW}
          height={CH}
          fill="url(#s75-sb-grad)"
        />
        <line
          x1={SBR}
          y1={CY0}
          x2={SBR}
          y2={CY0 + CH}
          stroke="#1e293b"
          strokeWidth="1"
        />

        {/* + Нов разговор бутон с pulse */}
        <g>
          {/* pulse rings */}
          {[0, 1.8].map((d, i) => (
            <rect
              key={`s75-ncp-${i}`}
              x={NCX - 4}
              y={NCY - 4}
              width={NCW + 8}
              height={NCH + 8}
              rx={NCH / 2 + 4}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0.55;0"
                dur="3.6s"
                begin={`${d}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-width"
                values="1;0.4"
                dur="3.6s"
                begin={`${d}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}
          <rect
            x={NCX}
            y={NCY}
            width={NCW}
            height={NCH}
            rx={NCH / 2}
            fill="#0a1730"
            stroke="#22d3ee"
            strokeWidth="1.4"
            filter="url(#s75-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.6;1;0.6"
              dur="3.2s"
              repeatCount="indefinite"
            />
          </rect>
          {/* plus icon */}
          <g transform={`translate(${NCX + 16} ${NCY + NCH / 2})`}>
            <line x1="-5" y1="0" x2="5" y2="0" stroke="#22d3ee" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="0" y1="-5" x2="0" y2="5" stroke="#22d3ee" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          <text
            x={NCX + 30}
            y={NCY + NCH / 2 + 4}
            fill="#e2e8f0"
            fontSize="11"
            fontWeight="700"
          >
            Нов разговор
          </text>
        </g>

        {/* "ИСТОРИЯ" label */}
        <text
          x={HIST_X}
          y={HIST_LABEL_Y}
          fill="#64748b"
          fontSize="9"
          fontWeight="700"
          style={{ letterSpacing: '0.22em' }}
        >
          ИСТОРИЯ
        </text>

        {/* История списък */}
        {HIST.map((h, i) => {
          const y = HIST_Y0 + i * (HIST_H + HIST_GAP)
          return (
            <g key={`s75-hist-${i}`}>
              <rect
                x={HIST_X}
                y={y}
                width={NCW}
                height={HIST_H}
                rx="6"
                fill={h.active ? '#0f1c36' : '#0a1426'}
                stroke={h.active ? '#3b82f6' : '#1e293b'}
                strokeWidth={h.active ? '1.2' : '1'}
              >
                {h.active && (
                  <animate
                    attributeName="stroke-opacity"
                    values="0.55;1;0.55"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                )}
              </rect>
              {/* tiny chat icon */}
              <g transform={`translate(${HIST_X + 10} ${y + HIST_H / 2})`}>
                <path
                  d="M -5 -4 l 10 0 l 0 6 l -7 0 l -3 3 z"
                  fill="none"
                  stroke={h.active ? '#3b82f6' : '#475569'}
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              </g>
              <text
                x={HIST_X + 22}
                y={y + HIST_H / 2 + 4}
                fill={h.active ? '#e2e8f0' : '#94a3b8'}
                fontSize="10"
                fontWeight={h.active ? '600' : '500'}
              >
                {h.label}
              </text>
            </g>
          )
        })}

        {/* акаунт avatar долу в sidebar-а */}
        <g transform={`translate(${SBX + SBW / 2} ${CY0 + CH - 28})`}>
          <ellipse cx="0" cy="0" rx="46" ry="14" fill="url(#s75-acc-grad)" />
          <circle cx="-26" cy="0" r="11" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.3" filter="url(#s75-glow)">
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="3.6s" repeatCount="indefinite" />
          </circle>
          <text
            x="-26"
            y="3"
            textAnchor="middle"
            fill="#22d3ee"
            fontSize="11"
            fontWeight="700"
            style={{ fontFamily: 'monospace' }}
          >
            @
          </text>
          <text x="-10" y="-1" fill="#e2e8f0" fontSize="10" fontWeight="700">
            акаунт
          </text>
          <text x="-10" y="11" fill="#64748b" fontSize="8.5" style={{ fontFamily: 'monospace' }}>
            ivan@…
          </text>
        </g>

        {/* ============== MAIN AREA ============== */}

        {/* USER BUBBLE (right) — появява се след send press */}
        <g>
          <rect
            x={USER_BUB.x}
            y={USER_BUB.y}
            width={USER_BUB.w}
            height={USER_BUB.h}
            rx="14"
            fill="#1e3a8a"
            stroke="#3b82f6"
            strokeWidth="1.2"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0;0;1;1;1;1;0"
              keyTimes="0;0.21;0.27;0.30;0.58;0.88;0.92;1"
              dur={DUR}
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              values="0.55;1;0.55"
              dur="3s"
              repeatCount="indefinite"
            />
          </rect>
          {/* tail */}
          <path
            d={`M ${USER_BUB.x + USER_BUB.w - 4} ${USER_BUB.y + USER_BUB.h - 8} l 10 6 l -14 4 z`}
            fill="#1e3a8a"
            stroke="#3b82f6"
            strokeWidth="1.2"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0;0;1;1;1;1;0"
              keyTimes="0;0.21;0.27;0.30;0.58;0.88;0.92;1"
              dur={DUR}
              repeatCount="indefinite"
            />
          </path>
          <text
            x={USER_BUB.x + USER_BUB.w - 14}
            y={USER_BUB.y + USER_BUB.h / 2 + 4}
            textAnchor="end"
            fill="#e2e8f0"
            fontSize="11"
            fontWeight="600"
            opacity="0"
          >
            Напиши кратко писмо
            <animate
              attributeName="opacity"
              values="0;0;0;1;1;1;1;0"
              keyTimes="0;0.21;0.27;0.30;0.58;0.88;0.92;1"
              dur={DUR}
              repeatCount="indefinite"
            />
          </text>
        </g>

        {/* ASSISTANT TYPING DOTS */}
        <g>
          <rect
            x={ASSIST_TYPING.x}
            y={ASSIST_TYPING.y}
            width={ASSIST_TYPING.w}
            height={ASSIST_TYPING.h}
            rx="14"
            fill="#0f1b35"
            stroke="#22d3ee"
            strokeWidth="1.2"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0;0;0;1;1;0;0"
              keyTimes="0;0.27;0.29;0.30;0.31;0.45;0.48;1"
              dur={DUR}
              repeatCount="indefinite"
            />
          </rect>
          {/* 3 typing dots */}
          {[0, 1, 2].map((i) => (
            <circle
              key={`s75-typ-${i}`}
              cx={ASSIST_TYPING.x + 18 + i * 12}
              cy={ASSIST_TYPING.y + ASSIST_TYPING.h / 2}
              r="3"
              fill="#22d3ee"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;0;0;0;0.4;1;0.4;1;0.4;1;0.4;0;0"
                keyTimes={`0;0.27;0.29;0.30;0.31;${0.32 + i * 0.01};${0.34 + i * 0.01};${0.36 + i * 0.01};${0.38 + i * 0.01};${0.40 + i * 0.01};0.45;0.48;1`}
                dur={DUR}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>

        {/* ASSISTANT FULL BUBBLE (replaces typing dots) */}
        <g>
          <rect
            x={ASSIST_BUB.x}
            y={ASSIST_BUB.y}
            width={ASSIST_BUB.w}
            height={ASSIST_BUB.h}
            rx="14"
            fill="#0f1b35"
            stroke="#22d3ee"
            strokeWidth="1.2"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0;0;1;1;0"
              keyTimes="0;0.45;0.48;0.52;0.88;1"
              dur={DUR}
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              values="0.55;1;0.55"
              dur="3s"
              repeatCount="indefinite"
            />
          </rect>
          {/* tail */}
          <path
            d={`M ${ASSIST_BUB.x + 4} ${ASSIST_BUB.y + ASSIST_BUB.h - 8} l -10 6 l 14 4 z`}
            fill="#0f1b35"
            stroke="#22d3ee"
            strokeWidth="1.2"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0;0;1;1;0"
              keyTimes="0;0.45;0.48;0.52;0.88;1"
              dur={DUR}
              repeatCount="indefinite"
            />
          </path>
          {[
            'Уважаеми колеги,',
            '',
            'С това писмо ви уведомявам, че',
            'на 14.05 ще има планирано',
            'прекъсване на водоподаването',
            'между 09:00 и 12:00 часа.',
          ].map((line, i) => (
            <text
              key={`s75-resp-${i}`}
              x={ASSIST_BUB.x + 16}
              y={ASSIST_BUB.y + 22 + i * 15}
              fill={i === 0 ? '#e2e8f0' : '#94a3b8'}
              fontSize="10.5"
              fontWeight={i === 0 ? '700' : '500'}
              opacity="0"
            >
              {line}
              <animate
                attributeName="opacity"
                values="0;0;0;1;1;0"
                keyTimes={`0;${0.45 + i * 0.015};${0.49 + i * 0.015};${0.52 + i * 0.015};0.88;1`}
                dur={DUR}
                repeatCount="indefinite"
              />
            </text>
          ))}
        </g>

        {/* ============== INPUT FIELD ============== */}
        <g>
          {/* halo */}
          <rect
            x={INX - 4}
            y={INY - 4}
            width={INW + 8}
            height={INH + 8}
            rx={INR + 4}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1"
            opacity="0.18"
            filter="url(#s75-soft)"
          />
          <rect
            x={INX}
            y={INY}
            width={INW}
            height={INH}
            rx={INR}
            fill="#0a1426"
            stroke="#3b82f6"
            strokeWidth="1.4"
            filter="url(#s75-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.55;1;0.55"
              dur="3.2s"
              repeatCount="indefinite"
            />
          </rect>

          {/* placeholder, видим докато няма текст */}
          <text
            x={INX + 16}
            y={INY + INH / 2 + 4}
            fill="#475569"
            fontSize="11"
            fontStyle="italic"
            opacity="0"
          >
            Напишете съобщение…
            <animate
              attributeName="opacity"
              values="0.8;0.8;0;0;0;0;0.8;0.8"
              keyTimes="0;0.005;0.02;0.25;0.88;0.92;0.95;1"
              dur={DUR}
              repeatCount="indefinite"
            />
          </text>

          {/* типиращи знаци: появяват се един по един между 0 и 0.21 от loop-а */}
          {typedCharsClean.map((ch, i) => {
            const fadeIn = 0.005 + (i / typedCharsClean.length) * 0.20
            return (
              <text
                key={`s75-typed-${i}`}
                x={INX + 16 + i * 7}
                y={INY + INH / 2 + 4}
                fill="#e2e8f0"
                fontSize="11"
                fontWeight="600"
                opacity="0"
              >
                {ch}
                <animate
                  attributeName="opacity"
                  values="0;0;1;1;0"
                  keyTimes={`0;${fadeIn.toFixed(3)};${(fadeIn + 0.005).toFixed(3)};0.27;0.28`}
                  dur={DUR}
                  repeatCount="indefinite"
                />
              </text>
            )
          })}

          {/* blinking cursor — позиция нараства с типването */}
          <rect
            x={INX + 16}
            y={INY + 8}
            width="1.4"
            height={INH - 16}
            fill="#60a5fa"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0;1;0;1;0;1;0;1;0;1;0;0"
              keyTimes="0;0.005;0.01;0.03;0.05;0.07;0.09;0.11;0.13;0.15;0.17;0.27;1"
              dur={DUR}
              repeatCount="indefinite"
            />
            <animate
              attributeName="x"
              values={`${INX + 16};${INX + 16 + typedCharsClean.length * 7}`}
              keyTimes="0;0.21"
              dur={DUR}
              repeatCount="indefinite"
              fill="freeze"
            />
          </rect>
        </g>

        {/* ============== SEND BUTTON ============== */}
        <g>
          {/* expanding ring on press */}
          <circle
            cx={SENDX}
            cy={SENDY}
            r={SENDR}
            fill="none"
            stroke="#60a5fa"
            strokeWidth="1.4"
            opacity="0"
          >
            <animate
              attributeName="r"
              values={`${SENDR};${SENDR};${SENDR + 18}`}
              keyTimes="0;0.22;0.27"
              dur={DUR}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0;0.9;0"
              keyTimes="0;0.21;0.22;0.27"
              dur={DUR}
              repeatCount="indefinite"
            />
          </circle>
          {/* button body */}
          <circle
            cx={SENDX}
            cy={SENDY}
            r={SENDR}
            fill="url(#s75-send-grad)"
            stroke="#60a5fa"
            strokeWidth="1.6"
            filter="url(#s75-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.55;1;0.55"
              dur="2.6s"
              repeatCount="indefinite"
            />
            {/* press squish */}
            <animate
              attributeName="r"
              values={`${SENDR};${SENDR};${SENDR - 2};${SENDR};${SENDR}`}
              keyTimes="0;0.21;0.23;0.26;1"
              dur={DUR}
              repeatCount="indefinite"
            />
          </circle>
          {/* arrow ▶ pointing up-right (Send) */}
          <path
            d={`M ${SENDX - 4} ${SENDY + 5} L ${SENDX} ${SENDY - 5} L ${SENDX + 4} ${SENDY + 5} M ${SENDX} ${SENDY - 5} L ${SENDX} ${SENDY + 5}`}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* small "Изпрати" hint below send button */}
        <text
          x={SENDX}
          y={SENDY + SENDR + 14}
          textAnchor="middle"
          fill="#64748b"
          fontSize="8.5"
          fontWeight="700"
          style={{ letterSpacing: '0.18em' }}
        >
          ↑ ИЗПРАТИ
        </text>

        {/* model badge горе вдясно в main area */}
        <g>
          <rect
            x={MAR - 14 - 90}
            y={CY0 + 12}
            width="90"
            height="20"
            rx="10"
            fill="#0a1426"
            stroke="#a78bfa"
            strokeWidth="1"
            opacity="0.85"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.55;1;0.55"
              dur="3.6s"
              repeatCount="indefinite"
            />
          </rect>
          <circle
            cx={MAR - 14 - 90 + 12}
            cy={CY0 + 22}
            r="3.5"
            fill="#a78bfa"
            filter="url(#s75-glow)"
          >
            <animate
              attributeName="opacity"
              values="0.5;1;0.5"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </circle>
          <text
            x={MAR - 14 - 90 + 22}
            y={CY0 + 26}
            fill="#e2e8f0"
            fontSize="10"
            fontWeight="700"
          >
            GPT · готов
          </text>
        </g>
      </svg>
    </div>
  )
}
