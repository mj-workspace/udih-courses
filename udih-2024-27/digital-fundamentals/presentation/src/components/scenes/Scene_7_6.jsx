// Scene 7.6 — Основи на промптването
// Pattern: side-by-side compare (vague vs clear), stacked as two rows, with an
// iteration loop arc at the bottom. Each row is a flow:
//   [prompt panel] → [assistant core] → [response panel]
// Top row stays sparse and dim — vague prompt yields a foggy answer.
// Bottom row is fuller and brighter — clear prompt yields clean text lines.
// A dashed arc beneath the bottom row carries a small "уточнявай" packet
// back to the prompt, illustrating that the conversation continues.

export default function Scene_7_6() {
  // Vague row centre line
  const TY = 165
  // Clear row centre line
  const BY = 370

  // Three short text lines (as rects) inside the vague response panel
  const vagueDots = [
    { cx: 640, cy: TY - 18 },
    { cx: 670, cy: TY - 18 },
    { cx: 700, cy: TY - 18 },
    { cx: 730, cy: TY - 18 },
    { cx: 760, cy: TY - 18 },
    { cx: 640, cy: TY + 8 },
    { cx: 670, cy: TY + 8 },
    { cx: 700, cy: TY + 8 },
  ]

  // Four neat lines inside the clear response panel — drawn in via dasharray
  const clearLines = [
    { y: BY - 38, w: 240, delay: 0.3 },
    { y: BY - 14, w: 220, delay: 0.7 },
    { y: BY + 10, w: 256, delay: 1.1 },
    { y: BY + 34, w: 180, delay: 1.5 },
  ]

  // Four short user lines inside the clear prompt panel (multi-line input)
  const promptLines = [
    { y: BY - 38, w: 150 },
    { y: BY - 14, w: 170 },
    { y: BY + 10, w: 130 },
    { y: BY + 34, w: 160 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="s76-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="s76-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4.5" />
          </filter>
          <radialGradient id="s76-core-grad">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.45" />
            <stop offset="80%" stopColor="#1e3a8a" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s76-vague-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#64748b" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="s76-clear-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="s76-input-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Ambient slow rotating dashed ellipse — life behind it all */}
        <ellipse
          cx="450" cy="290" rx="400" ry="240" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 10"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from="0 450 290" to="360 450 290"
            dur="60s" repeatCount="indefinite"
          />
        </ellipse>

        {/* ============================================================ */}
        {/* TOP ROW — VAGUE prompt → foggy answer                         */}
        {/* ============================================================ */}

        {/* Row label */}
        <text
          x="40" y="80" fill="#94a3b8" fontSize="12" fontWeight="700"
          style={{ letterSpacing: '0.22em' }}
        >
          МЪГЛЯВ ПРОМПТ
        </text>

        {/* Vague prompt panel */}
        <g>
          <rect
            x="40" y="105" width="220" height="120" rx="12"
            fill="url(#s76-input-grad)"
            stroke="#475569" strokeOpacity="0.55" strokeWidth="1"
          />
          {/* Cursor + a single short line of "text" */}
          <rect x="60" y={TY - 8} width="90" height="6" rx="3" fill="#64748b" />
          <rect x="60" y={TY + 4} width="40" height="6" rx="3" fill="#475569" />
          <rect x="105" y={TY + 1} width="2" height="12" fill="#94a3b8">
            <animate
              attributeName="opacity" values="0;1;0" dur="1.2s"
              repeatCount="indefinite"
            />
          </rect>
          <text
            x="60" y="135" fill="#64748b" fontSize="10" fontWeight="600"
            style={{ letterSpacing: '0.18em' }}
          >
            ВЪПРОС
          </text>
        </g>

        {/* Connector: vague prompt → core (faint dashed) */}
        <line
          x1="260" y1={TY} x2="385" y2={TY}
          stroke="#475569" strokeWidth="1" strokeDasharray="4 6" opacity="0.55"
        >
          <animate
            attributeName="stroke-dashoffset" from="10" to="0"
            dur="3s" repeatCount="indefinite"
          />
        </line>
        {/* Slow, faint packet */}
        <circle r="3" fill="#94a3b8" opacity="0.7">
          <animateMotion
            dur="5.5s" repeatCount="indefinite"
            path={`M 260 ${TY} L 385 ${TY}`}
          />
        </circle>

        {/* Small core for the vague row */}
        <g transform={`translate(410 ${TY})`}>
          <circle r="48" fill="url(#s76-core-grad)" opacity="0.6" />
          <circle
            r="22" fill="#0b1220" stroke="#64748b" strokeWidth="1.4"
          >
            <animate
              attributeName="stroke-opacity" values="0.45;0.8;0.45"
              dur="4.4s" repeatCount="indefinite"
            />
          </circle>
          <text
            x="0" y="4" textAnchor="middle"
            fill="#94a3b8" fontSize="11" fontWeight="700"
          >
            AI
          </text>
        </g>

        {/* Connector: core → vague response */}
        <line
          x1="435" y1={TY} x2="560" y2={TY}
          stroke="#475569" strokeWidth="1" strokeDasharray="4 6" opacity="0.55"
        >
          <animate
            attributeName="stroke-dashoffset" from="10" to="0"
            dur="3s" repeatCount="indefinite"
          />
        </line>

        {/* Vague response panel — fog/blob, no clean lines */}
        <g>
          <rect
            x="560" y="105" width="310" height="120" rx="12"
            fill="url(#s76-vague-grad)"
            stroke="#475569" strokeOpacity="0.45" strokeWidth="1"
          />
          {/* Foggy blob */}
          <ellipse
            cx="715" cy={TY} rx="120" ry="38" fill="#64748b" opacity="0.18"
            filter="url(#s76-soft)"
          >
            <animate
              attributeName="rx" values="115;125;115"
              dur="6s" repeatCount="indefinite"
            />
            <animate
              attributeName="opacity" values="0.14;0.22;0.14"
              dur="6s" repeatCount="indefinite"
            />
          </ellipse>
          {/* Scattered dots — uncertain, fuzzy "text" */}
          {vagueDots.map((d, i) => (
            <circle
              key={`vd-${i}`}
              cx={d.cx} cy={d.cy} r="3.2"
              fill="#94a3b8" opacity="0.55"
            >
              <animate
                attributeName="opacity" values="0.35;0.7;0.35"
                dur={`${3.2 + (i % 3) * 0.4}s`} begin={`${i * 0.25}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
          {/* Verdict marker — caution amber */}
          <g transform={`translate(840 ${TY - 38})`}>
            <circle r="11" fill="#0b1220" stroke="#f59e0b" strokeWidth="1.6" />
            <text
              x="0" y="4" textAnchor="middle"
              fill="#f59e0b" fontSize="14" fontWeight="700"
            >
              ?
            </text>
          </g>
          <text
            x="580" y="135" fill="#64748b" fontSize="10" fontWeight="600"
            style={{ letterSpacing: '0.18em' }}
          >
            ОТГОВОР
          </text>
        </g>

        {/* Divider hairline between the two rows */}
        <line
          x1="40" y1="262" x2="870" y2="262"
          stroke="#1e293b" strokeWidth="1" strokeDasharray="2 8" opacity="0.5"
        />

        {/* ============================================================ */}
        {/* BOTTOM ROW — CLEAR prompt → готова чернова                    */}
        {/* ============================================================ */}

        <text
          x="40" y="290" fill="#34d399" fontSize="12" fontWeight="700"
          style={{ letterSpacing: '0.22em' }}
        >
          ЯСЕН ПРОМПТ
        </text>

        {/* Clear prompt panel — multi-line user input */}
        <g>
          <rect
            x="40" y="305" width="220" height="160" rx="12"
            fill="url(#s76-input-grad)"
            stroke="#60a5fa" strokeOpacity="0.5" strokeWidth="1.2"
            filter="url(#s76-glow)"
          />
          {promptLines.map((l, i) => (
            <rect
              key={`pl-${i}`}
              x="60" y={l.y - 3} width={l.w} height="6" rx="3"
              fill="#94a3b8" opacity="0.8"
            >
              <animate
                attributeName="opacity" values="0.65;0.95;0.65"
                dur="4.6s" begin={`${i * 0.4}s`} repeatCount="indefinite"
              />
            </rect>
          ))}
          {/* Cursor */}
          <rect x={62 + 160} y={BY + 31} width="2" height="12" fill="#60a5fa">
            <animate
              attributeName="opacity" values="0;1;0" dur="1.1s"
              repeatCount="indefinite"
            />
          </rect>
          <text
            x="60" y="335" fill="#60a5fa" fontSize="10" fontWeight="700"
            style={{ letterSpacing: '0.18em' }}
          >
            КОНТЕКСТ · ТОН · ФОРМАТ
          </text>
        </g>

        {/* Connector: clear prompt → core */}
        <line
          x1="260" y1={BY} x2="385" y2={BY}
          stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.75"
        >
          <animate
            attributeName="stroke-dashoffset" from="10" to="0"
            dur="1.6s" repeatCount="indefinite"
          />
        </line>
        {/* Two traveling packets, staggered, prompt → core */}
        {[0, 0.9].map((d, i) => (
          <circle key={`pk-in-${i}`} r="4" fill="#60a5fa" filter="url(#s76-glow)">
            <animateMotion
              dur="3.2s" begin={`${d}s`} repeatCount="indefinite"
              path={`M 260 ${BY} L 385 ${BY}`}
            />
          </circle>
        ))}

        {/* Big core for the clear row */}
        <g transform={`translate(410 ${BY})`}>
          <circle r="78" fill="url(#s76-core-grad)" />
          <circle
            r="36" fill="#0b1220" stroke="#60a5fa" strokeWidth="2"
            filter="url(#s76-glow)"
          >
            <animate
              attributeName="stroke-opacity" values="0.6;1;0.6"
              dur="3.2s" repeatCount="indefinite"
            />
          </circle>
          {[0, 1.4, 2.8].map((d, i) => (
            <circle
              key={`ring-${i}`} r="36" fill="none"
              stroke="#60a5fa" strokeWidth="1" opacity="0"
            >
              <animate attributeName="r" values="36;78" dur="4.2s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="4.2s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <text
            x="0" y="5" textAnchor="middle"
            fill="#e2e8f0" fontSize="14" fontWeight="700"
          >
            AI
          </text>
        </g>

        {/* Connector: core → clear response */}
        <line
          x1="435" y1={BY} x2="560" y2={BY}
          stroke="#10b981" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.75"
        >
          <animate
            attributeName="stroke-dashoffset" from="10" to="0"
            dur="1.6s" repeatCount="indefinite"
          />
        </line>
        {/* Packets core → clear response */}
        {[0.4, 1.3].map((d, i) => (
          <circle key={`pk-out-${i}`} r="4" fill="#34d399" filter="url(#s76-glow)">
            <animateMotion
              dur="3.2s" begin={`${d}s`} repeatCount="indefinite"
              path={`M 435 ${BY} L 560 ${BY}`}
            />
          </circle>
        ))}

        {/* Clear response panel — clean drawn-in lines */}
        <g>
          <rect
            x="560" y="305" width="310" height="160" rx="12"
            fill="url(#s76-clear-grad)"
            stroke="#10b981" strokeOpacity="0.5" strokeWidth="1.2"
            filter="url(#s76-glow)"
          />
          {/* Lines drawn left-to-right via stroke-dashoffset */}
          {clearLines.map((l, i) => (
            <line
              key={`cl-${i}`}
              x1="580" y1={l.y} x2={580 + l.w} y2={l.y}
              stroke="#34d399" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={l.w} strokeDashoffset={l.w}
              opacity="0.85"
            >
              <animate
                attributeName="stroke-dashoffset"
                values={`${l.w};0;0;${l.w}`}
                keyTimes="0;0.35;0.85;1"
                dur="6s" begin={`${l.delay}s`}
                repeatCount="indefinite"
              />
            </line>
          ))}
          {/* Verdict marker — green check */}
          <g transform={`translate(840 ${BY - 58})`}>
            <circle r="12" fill="#0b1220" stroke="#10b981" strokeWidth="1.8" />
            <path
              d="M -5 0 L -1 5 L 6 -5"
              fill="none" stroke="#10b981"
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
            />
          </g>
          <text
            x="580" y="335" fill="#34d399" fontSize="10" fontWeight="700"
            style={{ letterSpacing: '0.18em' }}
          >
            ГОТОВА ЧЕРНОВА
          </text>
        </g>

        {/* ============================================================ */}
        {/* Iteration loop — "уточнявай" arc from response back to prompt */}
        {/* ============================================================ */}
        <g>
          {/* Path id usable as motion path */}
          <path
            id="s76-loop"
            d="M 715 465 C 715 525, 150 525, 150 470"
            fill="none"
            stroke="#a78bfa" strokeOpacity="0.55"
            strokeWidth="1.4" strokeDasharray="5 7"
          >
            <animate
              attributeName="stroke-dashoffset" from="12" to="0"
              dur="2.4s" repeatCount="indefinite"
            />
          </path>
          {/* Refinement packet travelling back */}
          <circle r="5" fill="#a78bfa" filter="url(#s76-glow)">
            <animateMotion
              dur="5.5s" repeatCount="indefinite"
              path="M 715 465 C 715 525, 150 525, 150 470"
            />
          </circle>
          {/* Arrow head at the prompt end */}
          <path
            d="M 150 470 L 158 462 M 150 470 L 158 476"
            stroke="#a78bfa" strokeWidth="1.6"
            strokeLinecap="round" fill="none"
          />
          {/* Label */}
          <g transform="translate(450 530)">
            <rect
              x="-118" y="-14" width="236" height="26" rx="13"
              fill="#0b1220" stroke="#a78bfa" strokeOpacity="0.55" strokeWidth="1"
            />
            <text
              x="0" y="4" textAnchor="middle"
              fill="#c4b5fd" fontSize="12" fontWeight="700"
              style={{ letterSpacing: '0.14em' }}
            >
              УТОЧНЯВАЙ · „ПО-КРАТКО" · „ПО-УЧТИВО"
            </text>
          </g>
        </g>
      </svg>
    </div>
  )
}
