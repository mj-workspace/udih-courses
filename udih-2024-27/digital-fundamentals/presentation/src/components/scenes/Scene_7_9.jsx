// Scene 7.9 — Ограничения на AI
// Pattern: hub & orbit
// AI core at the centre, surrounded by four amber "warning" satellites — one
// per limit named in the guide section: hallucinations, time cutoff, no
// real-world judgment, and weak arithmetic. Each satellite carries a tiny
// distinctive glyph so beginners read the limits at a glance.

const CX = 450
const CY = 290
const R = 178

const limits = [
  { id: 'hall', angle: -90, label: 'Халюцинации', glyph: '?!',    labelY:  62 },
  { id: 'time', angle:   0, label: 'Време',       glyph: 'clock', labelY:  62 },
  { id: 'pres', angle:  90, label: 'Преценка',    glyph: 'mind',  labelY: -56 },
  { id: 'math', angle: 180, label: 'Сметки',      glyph: '2+2=?', labelY:  62 },
].map((n) => {
  const rad = (n.angle * Math.PI) / 180
  return { ...n, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

const AMBER = '#f59e0b'
const AMBER_SOFT = '#fbbf24'

export default function Scene_7_9() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s79-core-grad">
            <stop offset="0%"  stopColor="#22d3ee" stopOpacity="0.32" />
            <stop offset="70%" stopColor="#1e3a8a" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s79-warn-grad">
            <stop offset="0%"   stopColor={AMBER} stopOpacity="0.28" />
            <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
          </radialGradient>
          <filter id="s79-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient slow rotating ring */}
        <circle
          cx={CX} cy={CY} r="248" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 11"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="58s" repeatCount="indefinite"
          />
        </circle>

        {/* Outer warning frame around the hub — counter-rotates, dashed amber */}
        <circle
          cx={CX} cy={CY} r="92" fill="none"
          stroke={AMBER} strokeOpacity="0.55"
          strokeWidth="1.2" strokeDasharray="5 8"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`360 ${CX} ${CY}`} to={`0 ${CX} ${CY}`}
            dur="22s" repeatCount="indefinite"
          />
        </circle>

        {/* Connections hub → satellite with travelling warning packet */}
        {limits.map((n, i) => (
          <g key={`link-${n.id}`}>
            <line
              x1={CX} y1={CY} x2={n.x} y2={n.y}
              stroke={AMBER} strokeOpacity="0.32"
              strokeWidth="1" strokeDasharray="4 7"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="11" to="0" dur="2s" repeatCount="indefinite"
              />
            </line>
            <circle r="3.4" fill={AMBER_SOFT} filter="url(#s79-glow)">
              <animateMotion
                dur={`${4.6 + i * 0.4}s`} repeatCount="indefinite"
                path={`M ${CX} ${CY} L ${n.x} ${n.y}`}
              />
            </circle>
          </g>
        ))}

        {/* Central AI core */}
        <g transform={`translate(${CX} ${CY})`}>
          <circle r="78" fill="url(#s79-core-grad)" />
          <circle
            r="50" fill="#0b1220"
            stroke="#22d3ee" strokeWidth="2"
            filter="url(#s79-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.55;1;0.55" dur="3.8s" repeatCount="indefinite"
            />
          </circle>
          {[0, 1.6, 3.2].map((d, i) => (
            <circle
              key={i} r="50" fill="none"
              stroke="#22d3ee" strokeWidth="1" opacity="0"
            >
              <animate
                attributeName="r" values="50;94"
                dur="4.8s" begin={`${d}s`} repeatCount="indefinite"
              />
              <animate
                attributeName="opacity" values="0.4;0"
                dur="4.8s" begin={`${d}s`} repeatCount="indefinite"
              />
            </circle>
          ))}
          <text
            x="0" y="-4" textAnchor="middle" dominantBaseline="middle"
            fill="#e2e8f0" fontSize="20" fontWeight="700"
            style={{ letterSpacing: '0.08em' }}
          >
            AI
          </text>
          <text
            x="0" y="18" textAnchor="middle" dominantBaseline="middle"
            fill="#94a3b8" fontSize="10"
            style={{ letterSpacing: '0.18em' }}
          >
            ОГРАНИЧЕН
          </text>
        </g>

        {/* Four warning satellites */}
        {limits.map((n, i) => (
          <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
            {/* Soft warn halo */}
            <circle r="60" fill="url(#s79-warn-grad)" />
            {/* Pulsing rings */}
            {[0, 1.6].map((d, k) => (
              <circle
                key={k} r="42" fill="none"
                stroke={AMBER} strokeWidth="1" opacity="0"
              >
                <animate
                  attributeName="r" values="42;72"
                  dur="4s" begin={`${i * 0.55 + d}s`} repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity" values="0.5;0"
                  dur="4s" begin={`${i * 0.55 + d}s`} repeatCount="indefinite"
                />
              </circle>
            ))}
            {/* Body */}
            <circle
              r="42" fill="#0b1220"
              stroke={AMBER} strokeWidth="2"
              filter="url(#s79-glow)"
            />
            {/* Per-limit glyph */}
            {n.glyph === '?!' && (
              <text
                x="0" y="-2" textAnchor="middle" dominantBaseline="middle"
                fill={AMBER_SOFT} fontSize="26" fontWeight="800"
                style={{ letterSpacing: '0.05em' }}
              >
                ?!
                <animate
                  attributeName="opacity" values="0.7;1;0.7"
                  dur="2.6s" repeatCount="indefinite"
                />
              </text>
            )}
            {n.glyph === 'clock' && (
              <g>
                {/* clock face */}
                <circle r="18" fill="none" stroke={AMBER_SOFT} strokeWidth="1.6" />
                <circle r="1.6" fill={AMBER_SOFT} />
                {/* hour hand (frozen at past position) */}
                <line
                  x1="0" y1="0" x2="0" y2="-11"
                  stroke={AMBER_SOFT} strokeWidth="1.8" strokeLinecap="round"
                />
                {/* minute hand — sweeps slowly but never reaches now */}
                <line
                  x1="0" y1="0" x2="9" y2="0"
                  stroke={AMBER_SOFT} strokeWidth="1.6" strokeLinecap="round"
                >
                  <animateTransform
                    attributeName="transform" type="rotate"
                    values="-40;40;-40" dur="6s" repeatCount="indefinite"
                  />
                </line>
                {/* cutoff slash — "knowledge stops here" */}
                <line
                  x1="-22" y1="22" x2="22" y2="-22"
                  stroke="#ef4444" strokeOpacity="0.7"
                  strokeWidth="2" strokeLinecap="round"
                />
              </g>
            )}
            {n.glyph === 'mind' && (
              <g>
                {/* abstract head silhouette */}
                <path
                  d="M -14 8 Q -14 -14 0 -14 Q 14 -14 14 4 L 14 12 L 6 12 L 6 18 L -10 18 L -10 10 Q -14 10 -14 8 Z"
                  fill="none" stroke={AMBER_SOFT} strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                {/* question mark inside */}
                <text
                  x="0" y="3" textAnchor="middle" dominantBaseline="middle"
                  fill={AMBER_SOFT} fontSize="14" fontWeight="800"
                >
                  ?
                </text>
              </g>
            )}
            {n.glyph === '2+2=?' && (
              <text
                x="0" y="-2" textAnchor="middle" dominantBaseline="middle"
                fill={AMBER_SOFT} fontSize="15" fontWeight="700"
                fontFamily="monospace"
                style={{ letterSpacing: '0.04em' }}
              >
                2+2=?
              </text>
            )}
            {/* Label */}
            <text
              x="0" y={n.labelY} textAnchor="middle"
              fill="#e2e8f0" fontSize="14" fontWeight="600"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
