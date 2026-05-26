// Scene 7.1 — Какво е изкуствен интелект
// Pattern: learning stream → hub → application orbit
// Examples flow into a glowing AI core from the left; recognised tasks emerge
// as labels on the right, with the AI assistant highlighted in gold —
// visualising "учи се от примери, върши много неща, асистентът е нашият".

const CX = 470
const CY = 290

// Examples that "teach" the AI. They stream in from the left into the core.
const examples = [
  { id: 'e1', label: 'кучета',   y: 130, delay: 0   },
  { id: 'e2', label: 'писма',    y: 210, delay: 1.1 },
  { id: 'e3', label: 'лица',     y: 290, delay: 2.2 },
  { id: 'e4', label: 'текстове', y: 370, delay: 3.3 },
  { id: 'e5', label: 'снимки',   y: 450, delay: 4.4 },
]

// What AI does. The assistant is highlighted — it's what the course is about.
const apps = [
  { id: 'face', label: 'Лица',         x: 690, y: 135, color: '#3b82f6' },
  { id: 'spam', label: 'Спам',         x: 750, y: 215, color: '#10b981' },
  { id: 'asst', label: 'AI асистент',  x: 770, y: 295, color: '#f59e0b', highlight: true },
  { id: 'tran', label: 'Превод',       x: 750, y: 375, color: '#a78bfa' },
  { id: 'nav',  label: 'Навигация',    x: 690, y: 455, color: '#22d3ee' },
]

export default function Scene_7_1() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="s71-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="s71-core-grad">
            <stop offset="0%"  stopColor="#60a5fa" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#1e3a8a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient halo behind the core */}
        <circle cx={CX} cy={CY} r="210" fill="url(#s71-core-grad)" />

        {/* Slow rotating dashed frame for life */}
        <circle
          cx={CX} cy={CY} r="248" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 9"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="48s" repeatCount="indefinite"
          />
        </circle>

        {/* ============================================================ */}
        {/* Left side — "учи се от примери"                                */}
        {/* ============================================================ */}
        <text
          x="180" y="78" textAnchor="middle"
          fill="#22d3ee" fontSize="12" fontWeight="700"
          style={{ letterSpacing: '0.18em' }}
        >
          УЧИ СЕ ОТ ПРИМЕРИ
        </text>

        {/* Lanes — faint guide lines that all examples follow into the core */}
        {examples.map((e) => (
          <line
            key={`lane-${e.id}`}
            x1="170" y1={e.y}
            x2={CX - 62} y2={CY}
            stroke="#22d3ee" strokeOpacity="0.10" strokeWidth="0.8"
          />
        ))}

        {/* Example tiles + travelling packets */}
        {examples.map((e) => (
          <g key={e.id}>
            {/* Static example tile sitting at the left */}
            <g transform={`translate(115 ${e.y})`}>
              <rect
                x="-50" y="-16" width="100" height="32" rx="6"
                fill="#0b1220" stroke="#22d3ee"
                strokeOpacity="0.55" strokeWidth="1"
              />
              <text
                x="0" y="5" textAnchor="middle"
                fill="#e2e8f0" fontSize="13"
              >
                {e.label}
              </text>
            </g>
            {/* Travelling packet — example flows into the core */}
            <circle r="3.5" fill="#22d3ee" filter="url(#s71-glow)" opacity="0">
              <animateMotion
                dur="5.5s" begin={`${e.delay}s`} repeatCount="indefinite"
                path={`M 170 ${e.y} Q ${(170 + CX - 62) / 2} ${(e.y + CY) / 2 - 22} ${CX - 62} ${CY}`}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.1;0.85;1"
                dur="5.5s" begin={`${e.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* ============================================================ */}
        {/* Centre — the AI core (hex + breathing rings + neural mesh)     */}
        {/* ============================================================ */}
        <g transform={`translate(${CX} ${CY})`}>
          {/* Hexagon body */}
          <polygon
            points="0,-62 54,-31 54,31 0,62 -54,31 -54,-31"
            fill="#0b1220"
            stroke="#60a5fa" strokeWidth="2.4"
            filter="url(#s71-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.65;1;0.65"
              dur="4s" repeatCount="indefinite"
            />
          </polygon>

          {/* Expanding hex rings (breathing) */}
          {[0, 1.6, 3.2].map((d, i) => (
            <polygon
              key={`ring-${i}`}
              points="0,-62 54,-31 54,31 0,62 -54,31 -54,-31"
              fill="none" stroke="#60a5fa" strokeWidth="1.4"
              opacity="0"
            >
              <animateTransform
                attributeName="transform" type="scale"
                values="1;1.7" dur="4.8s" begin={`${d}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity" values="0.55;0"
                dur="4.8s" begin={`${d}s`} repeatCount="indefinite"
              />
            </polygon>
          ))}

          {/* Inner neural mesh — small dots breathing at different rates */}
          {[-22, 0, 22].map((dx) =>
            [-22, 0, 22].map((dy) => (
              <circle
                key={`n-${dx}-${dy}`} cx={dx} cy={dy} r="2.2"
                fill="#22d3ee" opacity="0.55"
              >
                <animate
                  attributeName="opacity"
                  values="0.25;0.95;0.25"
                  dur={`${2 + (Math.abs(dx) + Math.abs(dy)) / 44 * 1.4}s`}
                  begin={`${(dx + 22) / 44 + (dy + 22) / 44}s`}
                  repeatCount="indefinite"
                />
              </circle>
            )),
          )}

          {/* Label */}
          <text
            x="0" y="7" textAnchor="middle" dominantBaseline="middle"
            fill="#e2e8f0" fontSize="24" fontWeight="800"
            style={{ letterSpacing: '0.14em' }}
          >
            AI
          </text>
        </g>

        {/* ============================================================ */}
        {/* Right side — "върши много неща"                                */}
        {/* ============================================================ */}
        <text
          x="735" y="78" textAnchor="middle"
          fill="#94a3b8" fontSize="12" fontWeight="700"
          style={{ letterSpacing: '0.18em' }}
        >
          ВЪРШИ МНОГО НЕЩА
        </text>

        {apps.map((a, i) => {
          const startX = CX + 58 // exit point from the core hex right edge
          const startY = CY
          return (
            <g key={a.id}>
              {/* Connector core → app chip */}
              <line
                x1={startX} y1={startY}
                x2={a.x - 60} y2={a.y}
                stroke={a.color}
                strokeOpacity={a.highlight ? 0.7 : 0.32}
                strokeWidth={a.highlight ? 1.5 : 1}
                strokeDasharray="4 6"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="10" to="0"
                  dur="2s" repeatCount="indefinite"
                />
              </line>
              {/* Travelling packet */}
              <circle r="3.2" fill={a.color} filter="url(#s71-glow)" opacity="0">
                <animateMotion
                  dur={`${4 + i * 0.35}s`} begin={`${i * 0.7}s`}
                  repeatCount="indefinite"
                  path={`M ${startX} ${startY} L ${a.x - 60} ${a.y}`}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.15;0.85;1"
                  dur={`${4 + i * 0.35}s`} begin={`${i * 0.7}s`}
                  repeatCount="indefinite"
                />
              </circle>
              {/* App chip */}
              <g transform={`translate(${a.x} ${a.y})`}>
                <rect
                  x="-60" y="-19" width="120" height="38" rx="19"
                  fill="#0b1220"
                  stroke={a.color}
                  strokeWidth={a.highlight ? 2.4 : 1.3}
                  filter={a.highlight ? 'url(#s71-glow)' : undefined}
                >
                  {a.highlight && (
                    <animate
                      attributeName="stroke-opacity"
                      values="0.75;1;0.75"
                      dur="3s" repeatCount="indefinite"
                    />
                  )}
                </rect>
                <text
                  x="0" y="5" textAnchor="middle" dominantBaseline="middle"
                  fill={a.highlight ? '#fbbf24' : '#e2e8f0'}
                  fontSize={a.highlight ? 14 : 13}
                  fontWeight={a.highlight ? 700 : 500}
                >
                  {a.label}
                </text>
              </g>
            </g>
          )
        })}

        {/* Small caption under the highlighted assistant chip */}
        <text
          x="770" y="335" textAnchor="middle"
          fill="#fbbf24" fontSize="10" fontWeight="600"
          opacity="0.85"
          style={{ letterSpacing: '0.18em' }}
        >
          ↑ ТУК СМЕ НИЕ
        </text>
      </svg>
    </div>
  )
}
