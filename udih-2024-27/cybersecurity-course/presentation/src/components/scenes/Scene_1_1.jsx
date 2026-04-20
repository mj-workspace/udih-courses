// Scene 1.1 — CIA Triad holographic vault
// Three orbital pillars (Confidentiality / Integrity / Availability) around
// a central secured core, with drifting terminology bubbles on the perimeter.

const CX = 450
const CY = 300
const R = 175

const pillars = [
  { id: 'C', label: 'Confidentiality', desc: 'Поверителност', color: '#3b82f6', angle: -90 },
  { id: 'I', label: 'Integrity',       desc: 'Цялостност',   color: '#10b981', angle: 150 },
  { id: 'A', label: 'Availability',    desc: 'Наличност',    color: '#f59e0b', angle: 30  },
].map(p => {
  const rad = (p.angle * Math.PI) / 180
  return { ...p, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

const terms = [
  { text: 'Threat',         kind: 'h', topPct: 12, delay: 0,  dur: 22 },
  { text: 'Vulnerability',  kind: 'v', leftPct: 86, delay: 4,  dur: 26 },
  { text: 'Risk',           kind: 'h', topPct: 88, delay: 8,  dur: 24 },
  { text: 'Attack vector',  kind: 'v', leftPct: 8,  delay: 12, dur: 28 },
  { text: 'Exploit',        kind: 'h', topPct: 70, delay: 16, dur: 26 },
  { text: 'Hash · MFA',     kind: 'v', leftPct: 92, delay: 20, dur: 30 },
]

export default function Scene_1_1() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* --- Drifting terminology bubbles (DOM, absolutely positioned) --- */}
      {terms.map((t, i) => {
        const base = {
          position: 'absolute',
          fontFamily: 'monospace',
          fontSize: '12px',
          letterSpacing: '0.15em',
          color: 'rgba(203,213,225,0.55)',
          padding: '4px 10px',
          borderRadius: '999px',
          border: '1px solid rgba(148,163,184,0.25)',
          background: 'rgba(15,23,42,0.55)',
          backdropFilter: 'blur(2px)',
          whiteSpace: 'nowrap',
          animationDelay: `${t.delay}s`,
          animationDuration: `${t.dur}s`,
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear',
          willChange: 'transform, opacity',
        }
        if (t.kind === 'h') {
          return (
            <div
              key={i}
              style={{
                ...base,
                top: `${t.topPct}%`,
                left: '-140px',
                animationName: 'term-drift-h-full',
              }}
            >
              {t.text}
            </div>
          )
        }
        return (
          <div
            key={i}
            style={{
              ...base,
              left: `${t.leftPct}%`,
              top: '-30px',
              animationName: 'term-drift-v-full',
            }}
          >
            {t.text}
          </div>
        )
      })}

      {/* Main SVG canvas */}
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          {pillars.map(p => (
            <radialGradient key={p.id} id={`p-grad-${p.id}`}>
              <stop offset="0%"   stopColor={p.color} stopOpacity="0.55" />
              <stop offset="55%"  stopColor={p.color} stopOpacity="0.12" />
              <stop offset="100%" stopColor={p.color} stopOpacity="0" />
            </radialGradient>
          ))}
          <radialGradient id="core-grad">
            <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="80%"  stopColor="#1e3a8a" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <filter id="cia-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="cia-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <path
            id="ring-motion"
            d={`M ${CX + 300},${CY} A 300,300 0 1,1 ${CX + 299.99},${CY}`}
          />
          {/* Straight connections (triangle edges) */}
          <path id="arc-C-I" d={`M ${pillars[0].x},${pillars[0].y} L ${pillars[1].x},${pillars[1].y}`} />
          <path id="arc-I-A" d={`M ${pillars[1].x},${pillars[1].y} L ${pillars[2].x},${pillars[2].y}`} />
          <path id="arc-A-C" d={`M ${pillars[2].x},${pillars[2].y} L ${pillars[0].x},${pillars[0].y}`} />
        </defs>

        {/* Decorative rotating concentric rings */}
        <g opacity="0.55">
          <circle cx={CX} cy={CY} r="260" fill="none" stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 9">
            <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur="50s" repeatCount="indefinite" />
          </circle>
          <circle cx={CX} cy={CY} r="245" fill="none" stroke="#334155" strokeWidth="0.4" strokeDasharray="1 14">
            <animateTransform attributeName="transform" type="rotate" from={`360 ${CX} ${CY}`} to={`0 ${CX} ${CY}`} dur="38s" repeatCount="indefinite" />
          </circle>
          <circle cx={CX} cy={CY} r="225" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="6 12" opacity="0.55" />
          <circle cx={CX} cy={CY} r="210" fill="none" stroke="#475569" strokeWidth="0.3" strokeDasharray="2 6">
            <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur="65s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Outer orbiting scan particle */}
        <circle r="3" fill="#22d3ee" opacity="0.6" filter="url(#cia-glow)">
          <animateMotion dur="14s" repeatCount="indefinite">
            <mpath href="#ring-motion" />
          </animateMotion>
        </circle>
        <circle r="2" fill="#60a5fa" opacity="0.5">
          <animateMotion dur="18s" repeatCount="indefinite" rotate="auto">
            <mpath href="#ring-motion" />
          </animateMotion>
        </circle>

        {/* Connection edges between pillars with traveling data packets */}
        {[
          { a: 0, b: 1, dur: 4.6, pathId: 'arc-C-I' },
          { a: 1, b: 2, dur: 5.2, pathId: 'arc-I-A' },
          { a: 2, b: 0, dur: 4.9, pathId: 'arc-A-C' },
        ].map((edge, i) => {
          const A = pillars[edge.a]
          const B = pillars[edge.b]
          return (
            <g key={edge.pathId}>
              <line
                x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                stroke="#334155"
                strokeWidth="1"
                strokeDasharray="4 6"
                opacity="0.5"
              >
                <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.8s" repeatCount="indefinite" />
              </line>
              {/* Forward packet */}
              <circle r="3.5" fill={A.color} filter="url(#cia-glow)" opacity="0.9">
                <animateMotion dur={`${edge.dur}s`} repeatCount="indefinite">
                  <mpath href={`#${edge.pathId}`} />
                </animateMotion>
                <animate attributeName="opacity" values="0.3;1;0.3" dur={`${edge.dur}s`} repeatCount="indefinite" />
              </circle>
              {/* Reverse packet */}
              <circle r="2" fill={B.color} opacity="0.55">
                <animateMotion
                  dur={`${edge.dur + 1.4}s`}
                  begin={`${i * 0.7}s`}
                  repeatCount="indefinite"
                  keyPoints="1;0"
                  keyTimes="0;1"
                >
                  <mpath href={`#${edge.pathId}`} />
                </animateMotion>
              </circle>
            </g>
          )
        })}

        {/* Central core */}
        <g transform={`translate(${CX} ${CY})`}>
          <circle r="70" fill="url(#core-grad)" />
          {/* Rotating outer hex frame */}
          <g opacity="0.85">
            <polygon
              points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="1.2"
              opacity="0.7"
            >
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="24s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite" />
            </polygon>
            <polygon
              points="0,-52 45,-26 45,26 0,52 -45,26 -45,-26"
              fill="none"
              stroke="#1e3a8a"
              strokeWidth="0.8"
              strokeDasharray="2 4"
              opacity="0.55"
            >
              <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="32s" repeatCount="indefinite" />
            </polygon>
          </g>
          {/* Lock */}
          <g>
            <rect x="-14" y="-2" width="28" height="22" rx="3" fill="#0f172a" stroke="#93c5fd" strokeWidth="1.4" />
            <path d="M -8 -2 V -10 A 8 8 0 0 1 8 -10 V -2"
              fill="none" stroke="#93c5fd" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="0" cy="9" r="2.5" fill="#60a5fa">
              <animate
                attributeName="fill"
                values="#60a5fa;#10b981;#f59e0b;#60a5fa"
                dur="9s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
          {/* Core pulse rings */}
          {[0, 1.5, 3].map((d, i) => (
            <circle key={i} r="30" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="30;85" dur="4.5s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.45;0" dur="4.5s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>

        {/* Pillars */}
        {pillars.map((p, i) => (
          <g key={p.id} transform={`translate(${p.x} ${p.y})`}>
            {/* Soft halo */}
            <circle r="70" fill={`url(#p-grad-${p.id})`} />

            {/* Multi-ring pulse (staggered, always on) */}
            {[0, 1.4, 2.8].map((d, k) => (
              <circle key={k} r="42" fill="none" stroke={p.color} strokeWidth="1" opacity="0">
                <animate attributeName="r" values="42;78" dur="4.2s" begin={`${(i * 0.7) + d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0" dur="4.2s" begin={`${(i * 0.7) + d}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* Orbiting ring */}
            <circle r="52" fill="none" stroke={p.color} strokeWidth="0.8" strokeDasharray="3 6" opacity="0.45">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 0 0`} to={`${i % 2 === 0 ? 360 : -360} 0 0`}
                dur={`${10 + i * 2}s`}
                repeatCount="indefinite"
              />
            </circle>

            {/* Orbiting dot */}
            <circle r="3" fill={p.color} opacity="0.75" filter="url(#cia-glow)">
              <animateMotion dur={`${6 + i * 1.2}s`} repeatCount="indefinite"
                path="M 52 0 A 52 52 0 1 1 51.99 0" />
            </circle>
            <circle r="1.8" fill={p.color} opacity="0.5">
              <animateMotion dur={`${8 + i}s`} repeatCount="indefinite"
                path="M -52 0 A 52 52 0 1 1 -51.99 0" />
            </circle>

            {/* Main disc */}
            <circle r="42" fill="#0b1220" stroke={p.color} strokeWidth="2" filter="url(#cia-glow)">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur={`${3.2 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>

            {/* Letter */}
            <text
              x="0" y="4"
              textAnchor="middle" dominantBaseline="middle"
              fill={p.color}
              fontSize="34"
              fontWeight="700"
              style={{ fontFamily: 'ui-sans-serif, system-ui' }}
              filter="url(#cia-glow)"
            >
              {p.id}
            </text>

            {/* Labels */}
            <text x="0" y="68" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="600" style={{ letterSpacing: '0.05em' }}>
              {p.label}
            </text>
            <text x="0" y="85" textAnchor="middle" fill="#94a3b8" fontSize="11">
              {p.desc}
            </text>
          </g>
        ))}

        {/* Faint outer scanning bar */}
        <g opacity="0.25">
          <line x1="90" x2="810" y1="20" y2="20" stroke="#22d3ee" strokeWidth="0.6">
            <animate attributeName="y1" from="20" to="540" dur="9s" repeatCount="indefinite" />
            <animate attributeName="y2" from="20" to="540" dur="9s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.35;0" dur="9s" repeatCount="indefinite" />
          </line>
        </g>
      </svg>
    </div>
  )
}
