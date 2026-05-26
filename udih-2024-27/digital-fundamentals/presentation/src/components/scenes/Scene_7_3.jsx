// Scene 7.3 — Какво представляват LLM
// Pattern: flow / pipeline
// Огромен корпус прочетен текст вляво -> LLM ядро в центъра -> отговорът
// се съставя дума по дума вдясно. Реализира двете водещи метафори от
// секцията: моделът чете много, после връща думи една по една.

const CX = 450
const CY = 290
const CYCLE = 9

const docs = [
  { cx: 170, cy: 165, w: 120, h: 76, color: '#3b82f6', label: 'Книги' },
  { cx: 145, cy: 290, w: 120, h: 76, color: '#22d3ee', label: 'Статии' },
  { cx: 180, cy: 415, w: 120, h: 76, color: '#a78bfa', label: 'Сайтове' },
]

const wordsLine1 = [
  { text: 'Водата', t: 0.6 },
  { text: 'ще',     t: 1.3 },
  { text: 'спре',   t: 2.0 },
  { text: 'утре',   t: 2.7 },
]
const wordsLine2 = [
  { text: 'от',     t: 3.4 },
  { text: '9',      t: 4.1 },
  { text: 'до',     t: 4.8 },
  { text: '13',     t: 5.5 },
  { text: 'ч.',     t: 6.2 },
]

const keyTimesFor = (t) =>
  `0;${(t / CYCLE).toFixed(4)};${((t + 0.22) / CYCLE).toFixed(4)};${(7.4 / CYCLE).toFixed(4)};1`

export default function Scene_7_3() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s73-core-grad">
            <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.55" />
            <stop offset="60%"  stopColor="#1e3a8a" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s73-doc-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1e293b" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0b1220" stopOpacity="0.85" />
          </linearGradient>
          <filter id="s73-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient slow rotating ring */}
        <circle
          cx={CX} cy={CY} r="225" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 9"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="55s" repeatCount="indefinite"
          />
        </circle>

        {/* ============================================================ */}
        {/* Left — corpus of read text                                    */}
        {/* ============================================================ */}
        <text
          x="165" y="105" textAnchor="middle"
          fill="#94a3b8" fontSize="12" fontWeight="700"
          style={{ letterSpacing: '0.18em' }}
        >
          ПРОЧЕТЕН ТЕКСТ
        </text>
        {docs.map((d, i) => {
          const x = d.cx - d.w / 2
          const y = d.cy - d.h / 2
          return (
            <g key={`doc-${i}`}>
              <rect
                x={x} y={y} width={d.w} height={d.h} rx="6"
                fill="url(#s73-doc-grad)"
                stroke={d.color} strokeOpacity="0.55" strokeWidth="1"
              />
              {[0, 1, 2, 3].map((ln) => (
                <rect
                  key={`ln-${i}-${ln}`}
                  x={x + 10} y={y + 14 + ln * 12}
                  width={d.w - 20 - (ln === 3 ? 32 : 0)} height="3"
                  fill={d.color} opacity="0.32"
                >
                  <animate
                    attributeName="opacity"
                    values="0.32;0.55;0.32"
                    dur="3.4s" begin={`${i * 0.4 + ln * 0.15}s`}
                    repeatCount="indefinite"
                  />
                </rect>
              ))}
              <text
                x={d.cx} y={y + d.h + 18} textAnchor="middle"
                fill="#e2e8f0" fontSize="13" fontWeight="600"
              >
                {d.label}
              </text>
            </g>
          )
        })}

        {/* Flow lines: doc -> LLM core, with traveling packets */}
        {docs.map((d, i) => {
          const x1 = d.cx + d.w / 2
          const y1 = d.cy
          const x2 = CX - 62
          const y2 = CY
          return (
            <g key={`flow-${i}`}>
              <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.55"
              >
                <animate
                  attributeName="stroke-dashoffset" from="10" to="0"
                  dur="2s" repeatCount="indefinite"
                />
              </line>
              <circle r="3.5" fill={d.color} filter="url(#s73-glow)">
                <animateMotion
                  dur={`${3.6 + i * 0.5}s`} repeatCount="indefinite"
                  path={`M ${x1} ${y1} L ${x2} ${y2}`}
                />
              </circle>
            </g>
          )
        })}

        {/* ============================================================ */}
        {/* Centre — LLM core                                             */}
        {/* ============================================================ */}
        <g transform={`translate(${CX} ${CY})`}>
          <circle r="90" fill="url(#s73-core-grad)" />
          {[0, 1.5, 3].map((d, i) => (
            <circle
              key={`ring-${i}`} r="52" fill="none"
              stroke="#60a5fa" strokeWidth="1" opacity="0"
            >
              <animate
                attributeName="r" values="52;105"
                dur="4.5s" begin={`${d}s`} repeatCount="indefinite"
              />
              <animate
                attributeName="opacity" values="0.45;0"
                dur="4.5s" begin={`${d}s`} repeatCount="indefinite"
              />
            </circle>
          ))}
          <circle
            r="52" fill="#0b1220" stroke="#60a5fa" strokeWidth="2"
            filter="url(#s73-glow)"
          >
            <animate
              attributeName="stroke-opacity" values="0.55;1;0.55"
              dur="3.6s" repeatCount="indefinite"
            />
          </circle>
          <text
            x="0" y="-3" textAnchor="middle" dominantBaseline="middle"
            fill="#e2e8f0" fontSize="24" fontWeight="700"
            style={{ letterSpacing: '0.12em' }}
          >
            LLM
          </text>
          <text
            x="0" y="20" textAnchor="middle" dominantBaseline="middle"
            fill="#94a3b8" fontSize="9" fontWeight="600"
            style={{ letterSpacing: '0.18em' }}
          >
            ЕЗИКОВ МОДЕЛ
          </text>
        </g>

        {/* ============================================================ */}
        {/* Right — output frame, words appearing one at a time           */}
        {/* ============================================================ */}
        <text
          x="670" y="200" textAnchor="middle"
          fill="#94a3b8" fontSize="12" fontWeight="700"
          style={{ letterSpacing: '0.18em' }}
        >
          ДУМА ПО ДУМА
        </text>

        <rect
          x="535" y="225" width="270" height="130" rx="10"
          fill="#0b1220" fillOpacity="0.55"
          stroke="#1e293b" strokeWidth="1" strokeDasharray="3 6"
        >
          <animate
            attributeName="stroke-opacity" values="0.55;0.9;0.55"
            dur="4s" repeatCount="indefinite"
          />
        </rect>

        {/* Word stream from core to output frame */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle
            key={`stream-${i}`} r="2.4" fill="#60a5fa"
            filter="url(#s73-glow)" opacity="0.85"
          >
            <animateMotion
              dur="2.6s" begin={`${i * 0.45}s`} repeatCount="indefinite"
              path={`M ${CX + 52} ${CY} Q ${CX + 110} ${CY - 24} ${545} ${260}`}
            />
            <animate
              attributeName="opacity"
              values="0;0.95;0.95;0"
              keyTimes="0;0.18;0.78;1"
              dur="2.6s" begin={`${i * 0.45}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Line 1 of the generated sentence */}
        <text
          x="555" y="270"
          fill="#e2e8f0" fontSize="18" fontWeight="500"
        >
          {wordsLine1.map((w, i) => (
            <tspan key={`w1-${i}`} dx={i === 0 ? 0 : 7} opacity="0">
              {w.text}
              <animate
                attributeName="opacity"
                values="0;0;1;1;0"
                keyTimes={keyTimesFor(w.t)}
                dur={`${CYCLE}s`} repeatCount="indefinite"
              />
            </tspan>
          ))}
        </text>

        {/* Line 2 of the generated sentence */}
        <text
          x="555" y="310"
          fill="#e2e8f0" fontSize="18" fontWeight="500"
        >
          {wordsLine2.map((w, i) => (
            <tspan key={`w2-${i}`} dx={i === 0 ? 0 : 7} opacity="0">
              {w.text}
              <animate
                attributeName="opacity"
                values="0;0;1;1;0"
                keyTimes={keyTimesFor(w.t)}
                dur={`${CYCLE}s`} repeatCount="indefinite"
              />
            </tspan>
          ))}
        </text>

        {/* Caret-like cursor pulsing in the output frame */}
        <rect
          x="540" y="328" width="9" height="2" fill="#60a5fa"
          opacity="0.7"
        >
          <animate
            attributeName="opacity" values="0.2;0.9;0.2"
            dur="1.1s" repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  )
}
