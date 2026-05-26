// Scene <M.N> — <one-line concept>
// Pattern: <hub & orbit | compare | flow | annotated mock | layered>
//
// Starting skeleton — a "hub & orbit" scene. Replace the concept, the central
// object, the satellites and the labels with the real section content.
// Rename the file to Scene_<M>_<N>.jsx and the function to Scene_<M>_<N>.
// Prefix every id with the section (s<M><N>-...) so ids stay globally unique.
// See references/scene-craft.md for tokens, the animation toolbox and patterns.

const CX = 450
const CY = 290
const R = 175

// The satellites around the hub. Give each a meaning, a color and an angle.
const nodes = [
  { id: 'a', label: 'Първи', color: '#3b82f6', angle: -90 },
  { id: 'b', label: 'Втори', color: '#10b981', angle: 30 },
  { id: 'c', label: 'Трети', color: '#f59e0b', angle: 150 },
].map((n) => {
  const rad = (n.angle * Math.PI) / 180
  return { ...n, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

export default function Scene_TEMPLATE() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="sTPL-core-grad">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#1e3a8a" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <filter id="sTPL-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient: slow rotating ring for life */}
        <circle
          cx={CX} cy={CY} r="250" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 9"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="50s" repeatCount="indefinite"
          />
        </circle>

        {/* Connections hub → node, with a traveling packet */}
        {nodes.map((n, i) => (
          <g key={`link-${n.id}`}>
            <line
              x1={CX} y1={CY} x2={n.x} y2={n.y}
              stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.5"
            >
              <animate
                attributeName="stroke-dashoffset" from="10" to="0"
                dur="1.8s" repeatCount="indefinite"
              />
            </line>
            <circle r="3.5" fill={n.color} filter="url(#sTPL-glow)">
              <animateMotion
                dur={`${4.5 + i * 0.5}s`} repeatCount="indefinite"
                path={`M ${CX} ${CY} L ${n.x} ${n.y}`}
              />
            </circle>
          </g>
        ))}

        {/* Central hub */}
        <g transform={`translate(${CX} ${CY})`}>
          <circle r="70" fill="url(#sTPL-core-grad)" />
          <circle
            r="44" fill="#0b1220" stroke="#60a5fa" strokeWidth="2"
            filter="url(#sTPL-glow)"
          >
            <animate
              attributeName="stroke-opacity" values="0.55;1;0.55"
              dur="3.6s" repeatCount="indefinite"
            />
          </circle>
          {[0, 1.5, 3].map((d, i) => (
            <circle key={i} r="44" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="44;90" dur="4.5s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.45;0" dur="4.5s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <text
            x="0" y="5" textAnchor="middle" dominantBaseline="middle"
            fill="#e2e8f0" fontSize="15" fontWeight="700"
          >
            Център
          </text>
        </g>

        {/* Satellite nodes */}
        {nodes.map((n, i) => (
          <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
            {[0, 1.4].map((d, k) => (
              <circle key={k} r="38" fill="none" stroke={n.color} strokeWidth="1" opacity="0">
                <animate attributeName="r" values="38;66" dur="4s" begin={`${i * 0.6 + d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0" dur="4s" begin={`${i * 0.6 + d}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <circle r="38" fill="#0b1220" stroke={n.color} strokeWidth="2" filter="url(#sTPL-glow)" />
            <text x="0" y="5" textAnchor="middle" dominantBaseline="middle" fill="#e2e8f0" fontSize="13" fontWeight="600">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
