// Scene 7.4 — four popular AI assistants as a 2x2 grid of branded cards
// Pattern: side-by-side compare (2x2) with a central "?" connector

const CARD_W = 240
const CARD_H = 170

const cards = [
  { id: 'gpt',     name: 'ChatGPT', tag: 'OpenAI',     color: '#10b981', x: 290, y: 180 },
  { id: 'claude',  name: 'Claude',  tag: 'Anthropic',  color: '#f59e0b', x: 610, y: 180 },
  { id: 'gemini',  name: 'Gemini',  tag: 'Google',     color: '#a78bfa', x: 290, y: 410 },
  { id: 'copilot', name: 'Copilot', tag: 'Microsoft',  color: '#3b82f6', x: 610, y: 410 },
]

const HX = 450
const HY = 295

// Where each line lands on its card border (facing the centre).
const endpoints = {
  gpt:     { x: 408, y: 265 },
  claude:  { x: 492, y: 265 },
  gemini:  { x: 408, y: 325 },
  copilot: { x: 492, y: 325 },
}

function Glyph({ id, color }) {
  if (id === 'gpt') {
    // OpenAI-style hexagonal knot — 6 small circles around a centre.
    return (
      <g>
        {[0, 60, 120, 180, 240, 300].map((a) => {
          const rad = (a * Math.PI) / 180
          return (
            <circle
              key={a}
              cx={20 * Math.cos(rad)}
              cy={20 * Math.sin(rad)}
              r="7"
              fill="none"
              stroke={color}
              strokeWidth="2.2"
            />
          )
        })}
        <circle r="5" fill={color} opacity="0.9" />
      </g>
    )
  }
  if (id === 'claude') {
    // 8-rayed asterisk — Claude/Anthropic burst.
    return (
      <g>
        {[0, 45, 90, 135].map((a) => {
          const rad = (a * Math.PI) / 180
          const cx = 22 * Math.cos(rad)
          const cy = 22 * Math.sin(rad)
          return (
            <line
              key={a}
              x1={-cx}
              y1={-cy}
              x2={cx}
              y2={cy}
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
            />
          )
        })}
        <circle r="4" fill={color} />
      </g>
    )
  }
  if (id === 'gemini') {
    // 4-point sparkle.
    return (
      <g>
        <path
          d="M 0 -26 L 7 -7 L 26 0 L 7 7 L 0 26 L -7 7 L -26 0 L -7 -7 Z"
          fill={color}
        />
        <circle cx="18" cy="-18" r="3.5" fill={color} opacity="0.7" />
      </g>
    )
  }
  if (id === 'copilot') {
    // Two interlocked rings — Copilot ribbon.
    return (
      <g>
        <circle cx="-11" cy="0" r="13" fill="none" stroke={color} strokeWidth="3" />
        <circle cx="11" cy="0" r="13" fill="none" stroke={color} strokeWidth="3" />
      </g>
    )
  }
  return null
}

export default function Scene_7_4() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="s74-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {cards.map((c) => (
            <radialGradient
              key={c.id}
              id={`s74-grad-${c.id}`}
              cx="50%"
              cy="35%"
              r="70%"
            >
              <stop offset="0%" stopColor={c.color} stopOpacity="0.22" />
              <stop offset="100%" stopColor={c.color} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        {/* Ambient: two slow counter-rotating rings */}
        <circle
          cx={HX}
          cy={HY}
          r="250"
          fill="none"
          stroke="#1e293b"
          strokeWidth="0.6"
          strokeDasharray="3 9"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${HX} ${HY}`}
            to={`360 ${HX} ${HY}`}
            dur="60s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx={HX}
          cy={HY}
          r="180"
          fill="none"
          stroke="#1e293b"
          strokeWidth="0.5"
          strokeDasharray="2 8"
          opacity="0.6"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`360 ${HX} ${HY}`}
            to={`0 ${HX} ${HY}`}
            dur="45s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Connectors hub → each card edge, with a traveling "prompt" dot */}
        {cards.map((c, i) => {
          const ep = endpoints[c.id]
          return (
            <g key={`link-${c.id}`}>
              <line
                x1={HX}
                y1={HY}
                x2={ep.x}
                y2={ep.y}
                stroke="#334155"
                strokeWidth="1"
                strokeDasharray="3 6"
                opacity="0.5"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="9"
                  to="0"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
              </line>
              <circle r="3.2" fill={c.color} filter="url(#s74-glow)">
                <animateMotion
                  dur="5s"
                  begin={`${i * 1.25}s`}
                  repeatCount="indefinite"
                  path={`M ${HX} ${HY} L ${ep.x} ${ep.y}`}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.1;0.85;1"
                  dur="5s"
                  begin={`${i * 1.25}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          )
        })}

        {/* Centre hub — the prompt that all four can answer */}
        <g>
          {[0, 1.5, 3].map((d, i) => (
            <circle
              key={i}
              cx={HX}
              cy={HY}
              r="20"
              fill="none"
              stroke="#94a3b8"
              opacity="0"
            >
              <animate
                attributeName="r"
                values="20;46"
                dur="4.5s"
                begin={`${d}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.45;0"
                dur="4.5s"
                begin={`${d}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
          <circle
            cx={HX}
            cy={HY}
            r="20"
            fill="#0b1220"
            stroke="#64748b"
            strokeWidth="1.4"
            filter="url(#s74-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.6;1;0.6"
              dur="3.6s"
              repeatCount="indefinite"
            />
          </circle>
          <text
            x={HX}
            y={HY + 6}
            textAnchor="middle"
            fill="#cbd5e1"
            fontSize="18"
            fontWeight="700"
          >
            ?
          </text>
        </g>

        {/* The four assistant cards */}
        {cards.map((c, i) => {
          const left = c.x - CARD_W / 2
          const top = c.y - CARD_H / 2
          const begin = `${i * 0.8}s`
          return (
            <g key={c.id} transform={`translate(${left} ${top})`}>
              {/* Card background and border */}
              <rect
                x="0"
                y="0"
                width={CARD_W}
                height={CARD_H}
                rx="14"
                fill="#0b1220"
                opacity="0.92"
              />
              <rect
                x="0"
                y="0"
                width={CARD_W}
                height={CARD_H}
                rx="14"
                fill={`url(#s74-grad-${c.id})`}
              />
              <rect
                x="0.5"
                y="0.5"
                width={CARD_W - 1}
                height={CARD_H - 1}
                rx="13.5"
                fill="none"
                stroke={c.color}
                strokeWidth="1.6"
                filter="url(#s74-glow)"
              >
                <animate
                  attributeName="stroke-opacity"
                  values="0.55;1;0.55"
                  dur="4s"
                  begin={begin}
                  repeatCount="indefinite"
                />
              </rect>

              {/* Glyph at the top of the card */}
              <g transform={`translate(${CARD_W / 2} 52)`}>
                <Glyph id={c.id} color={c.color} />
                <g opacity="0.5">
                  <Glyph id={c.id} color={c.color} />
                  <animateTransform
                    attributeName="transform"
                    type="scale"
                    values="1;1.18;1"
                    dur="4s"
                    begin={begin}
                    repeatCount="indefinite"
                    additive="sum"
                  />
                </g>
              </g>

              {/* Name */}
              <text
                x={CARD_W / 2}
                y="104"
                textAnchor="middle"
                fill="#e2e8f0"
                fontSize="20"
                fontWeight="700"
              >
                {c.name}
              </text>

              {/* Maker tag */}
              <text
                x={CARD_W / 2}
                y="124"
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="11"
                fontFamily="monospace"
                letterSpacing="0.15em"
              >
                {c.tag.toUpperCase()}
              </text>

              {/* Response bar — the "answer" filling in */}
              <rect
                x="28"
                y="142"
                width={CARD_W - 56}
                height="6"
                rx="3"
                fill="#1e293b"
              />
              <rect
                x="28"
                y="142"
                width="0"
                height="6"
                rx="3"
                fill={c.color}
                opacity="0.85"
              >
                <animate
                  attributeName="width"
                  values={`0;${CARD_W - 56};${CARD_W - 56};0`}
                  keyTimes="0;0.45;0.85;1"
                  dur="5s"
                  begin={begin}
                  repeatCount="indefinite"
                />
              </rect>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
