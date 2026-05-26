// Scene 6.2 — overview of the four main social networks
// Pattern: hub & orbit. Profile glyph at the centre, FB/IG/TT/LI around it,
// each with a distinct brand-evocative colour, a short glyph and a tagline.

const CX = 450
const CY = 270
const R = 175

const nodes = [
  {
    id: 'fb',
    label: 'Facebook',
    tag: 'за всичко',
    color: '#3b82f6',
    angle: -90,
    glyph: 'f',
  },
  {
    id: 'ig',
    label: 'Instagram',
    tag: 'снимки',
    color: '#f87171',
    angle: 0,
    glyph: 'camera',
  },
  {
    id: 'tt',
    label: 'TikTok',
    tag: 'кратки видеа',
    color: '#22d3ee',
    angle: 90,
    glyph: 'note',
  },
  {
    id: 'li',
    label: 'LinkedIn',
    tag: 'работа',
    color: '#60a5fa',
    angle: 180,
    glyph: 'in',
  },
].map((n) => {
  const rad = (n.angle * Math.PI) / 180
  return { ...n, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

function NodeGlyph({ kind, color }) {
  if (kind === 'f') {
    return (
      <text
        x="0"
        y="6"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontSize="32"
        fontWeight="800"
        fontFamily="Georgia, serif"
        fontStyle="italic"
      >
        f
      </text>
    )
  }
  if (kind === 'in') {
    return (
      <text
        x="0"
        y="6"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontSize="20"
        fontWeight="800"
        letterSpacing="0.05em"
      >
        in
      </text>
    )
  }
  if (kind === 'camera') {
    return (
      <g>
        <rect x="-15" y="-11" width="30" height="22" rx="6" fill="none" stroke={color} strokeWidth="2.2" />
        <circle cx="0" cy="0" r="6" fill="none" stroke={color} strokeWidth="2.2" />
        <circle cx="9.5" cy="-7" r="1.6" fill={color} />
      </g>
    )
  }
  if (kind === 'note') {
    return (
      <g>
        <path
          d="M -6 8 Q -6 14 -12 14 Q -16 14 -16 10 Q -16 6 -12 6 Q -8 6 -6 8 L -6 -10 L 10 -14 L 10 4 Q 10 10 4 10 Q 0 10 0 6 Q 0 2 4 2 Q 8 2 10 4"
          fill={color}
          opacity="0.9"
        />
      </g>
    )
  }
  return null
}

export default function Scene_6_2() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s62-core-grad">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.45" />
            <stop offset="80%" stopColor="#1e3a8a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <filter id="s62-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="s62-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient outer ring — slow rotation */}
        <circle
          cx={CX}
          cy={CY}
          r="248"
          fill="none"
          stroke="#1e293b"
          strokeWidth="0.6"
          strokeDasharray="3 9"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${CX} ${CY}`}
            to={`360 ${CX} ${CY}`}
            dur="50s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Inner orbit ring on which the nodes sit — counter rotation */}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke="#334155"
          strokeWidth="0.8"
          strokeDasharray="2 7"
          opacity="0.55"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`360 ${CX} ${CY}`}
            to={`0 ${CX} ${CY}`}
            dur="38s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Connections hub → node, with traveling packet in node colour */}
        {nodes.map((n, i) => (
          <g key={`link-${n.id}`}>
            <line
              x1={CX}
              y1={CY}
              x2={n.x}
              y2={n.y}
              stroke={n.color}
              strokeWidth="1"
              strokeDasharray="3 7"
              opacity="0.35"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="10"
                to="0"
                dur="2s"
                repeatCount="indefinite"
              />
            </line>
            <circle r="3.5" fill={n.color} filter="url(#s62-glow)">
              <animateMotion
                dur={`${4.4 + i * 0.4}s`}
                repeatCount="indefinite"
                path={`M ${CX} ${CY} L ${n.x} ${n.y}`}
              />
            </circle>
            <circle r="2.5" fill={n.color} opacity="0.6">
              <animateMotion
                dur={`${5.2 + i * 0.4}s`}
                begin={`${i * 0.7}s`}
                repeatCount="indefinite"
                path={`M ${n.x} ${n.y} L ${CX} ${CY}`}
              />
            </circle>
          </g>
        ))}

        {/* Central hub — profile glyph */}
        <g transform={`translate(${CX} ${CY})`}>
          <circle r="78" fill="url(#s62-core-grad)" />
          {[0, 1.6, 3.2].map((d, i) => (
            <circle
              key={i}
              r="50"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="1"
              opacity="0"
            >
              <animate
                attributeName="r"
                values="50;100"
                dur="4.8s"
                begin={`${d}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.45;0"
                dur="4.8s"
                begin={`${d}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
          <circle
            r="50"
            fill="#0b1220"
            stroke="#60a5fa"
            strokeWidth="2"
            filter="url(#s62-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.55;1;0.55"
              dur="3.6s"
              repeatCount="indefinite"
            />
          </circle>
          {/* Person silhouette: head + shoulders */}
          <g fill="#60a5fa">
            <circle cx="0" cy="-14" r="11" />
            <path d="M -22 22 Q -22 4 0 4 Q 22 4 22 22 L 22 28 L -22 28 Z" />
          </g>
          <text
            x="0"
            y="58"
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="11"
            letterSpacing="0.18em"
            fontFamily="monospace"
          >
            ВИЕ
          </text>
        </g>

        {/* Satellite nodes — one per network */}
        {nodes.map((n, i) => (
          <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
            {[0, 1.6].map((d, k) => (
              <circle
                key={k}
                r="44"
                fill="none"
                stroke={n.color}
                strokeWidth="1"
                opacity="0"
              >
                <animate
                  attributeName="r"
                  values="44;74"
                  dur="4.4s"
                  begin={`${i * 0.55 + d}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.5;0"
                  dur="4.4s"
                  begin={`${i * 0.55 + d}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
            <circle
              r="44"
              fill="#0b1220"
              stroke={n.color}
              strokeWidth="2"
              filter="url(#s62-soft)"
            />
            <NodeGlyph kind={n.glyph} color={n.color} />
            <text
              x="0"
              y="58"
              textAnchor="middle"
              fill="#e2e8f0"
              fontSize="14"
              fontWeight="700"
            >
              {n.label}
            </text>
            <text
              x="0"
              y="74"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="11"
            >
              {n.tag}
            </text>
          </g>
        ))}

        {/* Faint ambient dots drifting on the outer ring */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle
            key={`amb-${i}`}
            r="1.6"
            fill="#475569"
            opacity="0.6"
          >
            <animateMotion
              dur={`${18 + i * 2}s`}
              begin={`${i * 1.3}s`}
              repeatCount="indefinite"
              path={`M ${CX + 248} ${CY} A 248 248 0 1 1 ${CX + 247.99} ${CY - 0.1} Z`}
            />
          </circle>
        ))}
      </svg>
    </div>
  )
}
