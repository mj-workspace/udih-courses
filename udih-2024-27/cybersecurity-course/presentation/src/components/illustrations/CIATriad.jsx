import { useState } from 'react'

const segments = [
  { id: 'confidentiality', label: 'C', fullLabel: 'Confidentiality', desc: 'Поверителност', color: '#3b82f6', cx: 200, cy: 120 },
  { id: 'integrity', label: 'I', fullLabel: 'Integrity', desc: 'Цялостност', color: '#10b981', cx: 140, cy: 230 },
  { id: 'availability', label: 'A', fullLabel: 'Availability', desc: 'Наличност', color: '#f59e0b', cx: 260, cy: 230 },
]

export default function CIATriad() {
  const [active, setActive] = useState(null)

  return (
    <svg viewBox="0 0 400 340" className="w-full h-full">
      <defs>
        {segments.map(s => (
          <radialGradient key={s.id} id={`grad-${s.id}`}>
            <stop offset="0%" stopColor={s.color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0.05" />
          </radialGradient>
        ))}
        <filter id="cia-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Rotating outer ring */}
      <circle cx="200" cy="180" r="155" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3 6">
        <animateTransform attributeName="transform" type="rotate" from="0 200 180" to="360 200 180" dur="30s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="180" r="165" fill="none" stroke="#1e293b" strokeWidth="0.3" strokeDasharray="2 10">
        <animateTransform attributeName="transform" type="rotate" from="360 200 180" to="0 200 180" dur="45s" repeatCount="indefinite" />
      </circle>

      {/* Animated connecting lines with traveling particles */}
      {[[0,1],[1,2],[2,0]].map(([a,b], i) => {
        const sa = segments[a], sb = segments[b]
        return (
          <g key={`conn-${i}`}>
            <line x1={sa.cx} y1={sa.cy} x2={sb.cx} y2={sb.cy}
              stroke="#334155" strokeWidth="1" strokeDasharray="4 4" opacity="0.4">
              <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />
            </line>
            {/* Traveling particle */}
            <circle r="3" fill={segments[a].color} opacity="0.7" filter="url(#cia-glow)">
              <animateMotion dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite"
                path={`M${sa.cx},${sa.cy} L${sb.cx},${sb.cy}`} />
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>
            <circle r="2" fill={segments[b].color} opacity="0.5">
              <animateMotion dur={`${3 + i * 0.3}s`} repeatCount="indefinite"
                path={`M${sb.cx},${sb.cy} L${sa.cx},${sa.cy}`} />
            </circle>
          </g>
        )
      })}

      {/* Circles */}
      {segments.map((s, i) => {
        const isActive = active === s.id
        const r = isActive ? 78 : 72
        return (
          <g key={s.id}
            onMouseEnter={() => setActive(s.id)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer"
          >
            {/* Multi-ring pulse (always animating) */}
            <circle cx={s.cx} cy={s.cy} r={r} fill="none" stroke={s.color} strokeWidth="1" opacity="0">
              <animate attributeName="r" from={r} to={r + 25} dur="2.5s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.5" to="0" dur="2.5s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={s.cx} cy={s.cy} r={r} fill="none" stroke={s.color} strokeWidth="0.5" opacity="0">
              <animate attributeName="r" from={r} to={r + 25} dur="2.5s" begin={`${i * 0.8 + 1.2}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur="2.5s" begin={`${i * 0.8 + 1.2}s`} repeatCount="indefinite" />
            </circle>

            {/* Orbiting dot around each circle */}
            <circle r="2.5" fill={s.color} opacity="0.6">
              <animateMotion dur={`${4 + i}s`} repeatCount="indefinite"
                path={`M${s.cx + r},${s.cy} A${r},${r} 0 1,1 ${s.cx + r - 0.01},${s.cy}`} />
            </circle>

            {/* Main circle with breathing */}
            <circle cx={s.cx} cy={s.cy} r={r}
              fill={`url(#grad-${s.id})`}
              stroke={s.color}
              strokeWidth={isActive ? 2.5 : 1.5}
              opacity={isActive ? 1 : 0.85}
              style={{ transition: 'all 0.3s' }}
            >
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              )}
            </circle>

            {/* Letter */}
            <text x={s.cx} y={s.cy - 8} textAnchor="middle" dominantBaseline="central"
              fill={s.color} fontSize={isActive ? 36 : 32} fontWeight="bold"
              style={{ transition: 'font-size 0.3s' }}>
              {s.label}
            </text>

            {/* Label */}
            <text x={s.cx} y={s.cy + 18} textAnchor="middle" dominantBaseline="central"
              fill={isActive ? '#f1f5f9' : '#94a3b8'}
              fontSize={isActive ? 13 : 11}
              style={{ transition: 'all 0.3s' }}>
              {isActive ? s.fullLabel : s.desc}
            </text>
          </g>
        )
      })}

      {/* Center lock icon with pulse */}
      <g transform="translate(200, 190)">
        <circle r="16" fill="#0f172a" stroke="#475569" strokeWidth="0.5">
          <animate attributeName="r" values="16;18;16" dur="3s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
        <rect x="-10" y="-4" width="20" height="15" rx="2" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        <path d="M-6,-4 V-10 A6,6 0 0,1 6,-10 V-4" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="0" cy="4" r="2" fill="#94a3b8">
          <animate attributeName="fill" values="#94a3b8;#3b82f6;#10b981;#f59e0b;#94a3b8" dur="6s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  )
}
