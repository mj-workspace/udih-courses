// Scene 6.12 — Авторски права и отговорно споделяне
// Pattern: compare — two contrasting horizontal rows show how the © credit
// travels (Сподели ✓) or gets stripped (Кради ✗). A third smaller row
// illustrates the "ask before posting photos of other people" rule.

const SRC_X = 92
const RES_X = 500
const CW = 180
const CH = 102

const Y_SHARE = 132
const Y_STEAL = 286
const Y_PEOPLE = 446

const GOOD = '#10b981'
const BAD = '#ef4444'
const AMBER = '#f59e0b'

export default function Scene_6_12() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s612-img" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#0b1220" />
          </linearGradient>
          <linearGradient id="s612-img-good" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#065f46" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#0b1220" />
          </linearGradient>
          <linearGradient id="s612-img-bad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#0b1220" />
          </linearGradient>
          <filter id="s612-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ============================================================ */}
        {/* Ambient — slow rotating ellipse for life                      */}
        {/* ============================================================ */}
        <ellipse
          cx="450" cy="290" rx="360" ry="240" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 11"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from="0 450 290" to="360 450 290"
            dur="64s" repeatCount="indefinite"
          />
        </ellipse>

        {/* ============================================================ */}
        {/* ROW 1 — Сподели ✓                                            */}
        {/* ============================================================ */}
        <ScenarioRow
          y={Y_SHARE}
          color={GOOD}
          label="Сподели"
          verdict="ok"
          resultImageGrad="url(#s612-img-good)"
          creditStruck={false}
          packetDelay="0s"
        />

        {/* ============================================================ */}
        {/* ROW 2 — Качи като свое ✗                                     */}
        {/* ============================================================ */}
        <ScenarioRow
          y={Y_STEAL}
          color={BAD}
          label="Качи като свое"
          verdict="bad"
          resultImageGrad="url(#s612-img-bad)"
          creditStruck={true}
          packetDelay="0.9s"
        />

        {/* ============================================================ */}
        {/* ROW 3 — Снимка с други хора → Питай                          */}
        {/* ============================================================ */}
        <PeopleRow y={Y_PEOPLE} />
      </svg>
    </div>
  )
}

function ScenarioRow({ y, color, label, verdict, resultImageGrad, creditStruck, packetDelay }) {
  const ay = y - CH / 2
  const arrowStart = SRC_X + CW + 12
  const arrowEnd = RES_X - 12
  const arrowMid = (arrowStart + arrowEnd) / 2
  return (
    <g>
      {/* Source card (neutral) */}
      <ContentCard
        x={SRC_X} y={ay} w={CW} h={CH}
        imageGrad="url(#s612-img)" creditStruck={false}
        accentColor="#475569" iconColor="#60a5fa"
      />

      {/* Arrow + label chip */}
      <g>
        <line
          x1={arrowStart} y1={y} x2={arrowEnd} y2={y}
          stroke={color} strokeWidth="1.6"
          strokeDasharray="6 5" opacity="0.7"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="11" to="0" dur="1.6s" repeatCount="indefinite"
          />
        </line>
        {/* Arrowhead */}
        <path
          d={`M ${arrowEnd - 8} ${y - 5} L ${arrowEnd} ${y} L ${arrowEnd - 8} ${y + 5}`}
          fill="none" stroke={color} strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round"
        />
        {/* Travelling packet */}
        <circle r="4" fill={color} filter="url(#s612-glow)">
          <animateMotion
            dur="3.2s" begin={packetDelay} repeatCount="indefinite"
            path={`M ${arrowStart} ${y} L ${arrowEnd} ${y}`}
          />
        </circle>
        {/* Label chip — sits above the arrow */}
        <g>
          <rect
            x={arrowMid - 64} y={y - 32} width="128" height="22" rx="11"
            fill="#0b1220" stroke={color} strokeWidth="1.4"
            filter="url(#s612-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.6;1;0.6" dur="3s" repeatCount="indefinite"
            />
          </rect>
          <text
            x={arrowMid} y={y - 17}
            textAnchor="middle"
            fill="#e2e8f0" fontSize="13" fontWeight="700"
          >
            {label}
          </text>
        </g>
      </g>

      {/* Result card (tinted) */}
      <ContentCard
        x={RES_X} y={ay} w={CW} h={CH}
        imageGrad={resultImageGrad}
        creditStruck={creditStruck}
        accentColor={color}
        iconColor={color}
      />

      {/* Verdict mark */}
      <g transform={`translate(${RES_X + CW + 38} ${y})`}>
        {[0, 1.5].map((d, i) => (
          <circle
            key={i} r="22" fill="none"
            stroke={color} strokeWidth="1" opacity="0"
          >
            <animate
              attributeName="r" values="22;36"
              dur="3.2s" begin={`${d}s`} repeatCount="indefinite"
            />
            <animate
              attributeName="opacity" values="0.5;0"
              dur="3.2s" begin={`${d}s`} repeatCount="indefinite"
            />
          </circle>
        ))}
        <circle r="22" fill="#0b1220" stroke={color} strokeWidth="2.2" filter="url(#s612-glow)">
          <animate
            attributeName="stroke-opacity"
            values="0.6;1;0.6" dur="2.8s" repeatCount="indefinite"
          />
        </circle>
        {verdict === 'ok' ? (
          <path
            d="M -9 0 L -3 7 L 10 -7"
            fill="none" stroke={color} strokeWidth="3"
            strokeLinecap="round" strokeLinejoin="round"
          />
        ) : (
          <g stroke={color} strokeWidth="3" strokeLinecap="round">
            <line x1="-8" y1="-8" x2="8" y2="8" />
            <line x1="8" y1="-8" x2="-8" y2="8" />
          </g>
        )}
      </g>
    </g>
  )
}

function ContentCard({ x, y, w, h, imageGrad, creditStruck, accentColor, iconColor }) {
  const imgY = y + 8
  const imgH = h - 36
  return (
    <g>
      {/* Card outline */}
      <rect
        x={x} y={y} width={w} height={h} rx="6"
        fill="#0b1220" stroke={accentColor} strokeWidth="1.5"
      />
      {/* Image area */}
      <rect
        x={x + 8} y={imgY} width={w - 16} height={imgH} rx="3"
        fill={imageGrad}
      />
      {/* Tiny landscape silhouette inside the image */}
      <g>
        <circle cx={x + w - 30} cy={imgY + 16} r="6" fill={iconColor} opacity="0.85">
          <animate
            attributeName="opacity"
            values="0.55;0.95;0.55" dur="4s" repeatCount="indefinite"
          />
        </circle>
        <path
          d={`M ${x + 8} ${imgY + imgH}
              L ${x + w * 0.32} ${imgY + imgH - 32}
              L ${x + w * 0.5} ${imgY + imgH - 12}
              L ${x + w * 0.74} ${imgY + imgH - 38}
              L ${x + w - 8} ${imgY + imgH}
              Z`}
          fill="#0b1220" opacity="0.7"
        />
      </g>

      {/* Credit line area */}
      <g>
        <text
          x={x + 10} y={y + h - 12}
          fill={creditStruck ? '#64748b' : '#e2e8f0'}
          fontSize="12" fontWeight="700"
          style={{ letterSpacing: '0.04em' }}
        >
          © Автор
        </text>
        {creditStruck && (
          <g>
            <line
              x1={x + 8} y1={y + h - 16} x2={x + 72} y2={y + h - 16}
              stroke={BAD} strokeWidth="2.2" strokeLinecap="round"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.65;1;0.65" dur="2.4s" repeatCount="indefinite"
              />
            </line>
            <text
              x={x + w - 14} y={y + h - 12}
              textAnchor="end"
              fill={BAD} fontSize="12" fontWeight="700"
              style={{ letterSpacing: '0.08em' }}
            >
              изтрит
            </text>
          </g>
        )}
        {!creditStruck && (
          <g transform={`translate(${x + w - 22} ${y + h - 15})`}>
            <circle r="8" fill="#0b1220" stroke={GOOD} strokeWidth="1.3">
              <animate
                attributeName="stroke-opacity"
                values="0.6;1;0.6" dur="2.6s" repeatCount="indefinite"
              />
            </circle>
            <path
              d="M -3.5 0 L -1 2.5 L 3.5 -3"
              fill="none" stroke={GOOD} strokeWidth="1.7"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </g>
        )}
      </g>
    </g>
  )
}

function PeopleRow({ y }) {
  const px1 = SRC_X + 22
  const px2 = SRC_X + 70
  const bx = SRC_X + 130
  const by = y - 20
  const bw = 280
  const bh = 40
  const arrowStart = bx + bw + 10
  const arrowEnd = bx + bw + 60
  return (
    <g>
      {/* Two people standing together */}
      <Person x={px1} y={y} color="#60a5fa" />
      <Person x={px2} y={y} color="#a78bfa" />

      {/* Speech bubble (the question being asked) */}
      <g>
        <rect
          x={bx} y={by} width={bw} height={bh} rx="9"
          fill="#0b1220" stroke={AMBER} strokeWidth="1.5"
          filter="url(#s612-glow)"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.6;1;0.6" dur="3.2s" repeatCount="indefinite"
          />
        </rect>
        {/* Tail pointing at the people */}
        <path
          d={`M ${bx} ${by + bh / 2 - 4}
              L ${bx - 12} ${by + bh / 2 + 4}
              L ${bx} ${by + bh / 2 + 10} Z`}
          fill="#0b1220" stroke={AMBER} strokeWidth="1.5" strokeLinejoin="round"
        />
        <text
          x={bx + 16} y={by + 25}
          fill="#e2e8f0" fontSize="14" fontWeight="600"
        >
          „Качвам ли тази снимка?"
        </text>
      </g>

      {/* Arrow → verdict */}
      <line
        x1={arrowStart} y1={y} x2={arrowEnd} y2={y}
        stroke={AMBER} strokeWidth="1.6" strokeDasharray="6 5" opacity="0.75"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="11" to="0" dur="1.6s" repeatCount="indefinite"
        />
      </line>
      <path
        d={`M ${arrowEnd - 8} ${y - 5} L ${arrowEnd} ${y} L ${arrowEnd - 8} ${y + 5}`}
        fill="none" stroke={AMBER} strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round"
      />

      <g transform={`translate(${arrowEnd + 30} ${y})`}>
        {[0, 1.5].map((d, i) => (
          <circle
            key={i} r="20" fill="none"
            stroke={AMBER} strokeWidth="1" opacity="0"
          >
            <animate
              attributeName="r" values="20;34"
              dur="3.2s" begin={`${d}s`} repeatCount="indefinite"
            />
            <animate
              attributeName="opacity" values="0.5;0"
              dur="3.2s" begin={`${d}s`} repeatCount="indefinite"
            />
          </circle>
        ))}
        <circle r="20" fill="#0b1220" stroke={AMBER} strokeWidth="2.2" filter="url(#s612-glow)">
          <animate
            attributeName="stroke-opacity"
            values="0.6;1;0.6" dur="2.8s" repeatCount="indefinite"
          />
        </circle>
        <path
          d="M -8 0 L -2 6 L 9 -6"
          fill="none" stroke={AMBER} strokeWidth="2.6"
          strokeLinecap="round" strokeLinejoin="round"
        />
      </g>

      {/* Caption below */}
      <text
        x={SRC_X + 4} y={y + 52}
        fill="#94a3b8" fontSize="11.5" fontWeight="500"
      >
        Снимка с друг човек — питай, преди да я качиш
      </text>
    </g>
  )
}

function Person({ x, y, color }) {
  return (
    <g>
      {/* Pulsing halo */}
      <circle cx={x} cy={y - 6} r="22" fill="none" stroke={color} strokeWidth="1" opacity="0">
        <animate attributeName="r" values="22;32" dur="3.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0" dur="3.6s" repeatCount="indefinite" />
      </circle>
      {/* Head */}
      <circle cx={x} cy={y - 12} r="10" fill="#0b1220" stroke={color} strokeWidth="1.6" />
      {/* Shoulders */}
      <path
        d={`M ${x - 18} ${y + 18}
            Q ${x} ${y + 2} ${x + 18} ${y + 18}
            L ${x + 18} ${y + 24}
            L ${x - 18} ${y + 24} Z`}
        fill="#0b1220" stroke={color} strokeWidth="1.6" strokeLinejoin="round"
      />
    </g>
  )
}
