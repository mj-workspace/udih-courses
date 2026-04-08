import { useState } from 'react'

const phases = [
  { id: 'prep', num: '1', label: 'Подготовка', color: '#3b82f6' },
  { id: 'identify', num: '2', label: 'Идентификация', color: '#8b5cf6' },
  { id: 'contain', num: '3', label: 'Ограничаване', color: '#ef4444' },
  { id: 'eradicate', num: '4', label: 'Елиминиране', color: '#f59e0b' },
  { id: 'recover', num: '5', label: 'Възстановяване', color: '#10b981' },
  { id: 'lessons', num: '6', label: 'Поуки', color: '#06b6d4' },
]

export default function IncidentResponse() {
  const [active, setActive] = useState(null)
  const cx = 200, cy = 145, r = 95

  return (
    <svg viewBox="0 0 400 310" className="w-full h-full">
      <defs>
        <filter id="ir-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Cycle arrows - flowing ring */}
      <circle cx={cx} cy={cy} r={r + 5} fill="none" stroke="#1e293b" strokeWidth="8" strokeDasharray="12 6">
        <animate attributeName="stroke-dashoffset" from="18" to="0" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Inner glow ring */}
      <circle cx={cx} cy={cy} r={r + 5} fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="8 10" opacity="0.15">
        <animate attributeName="stroke-dashoffset" from="18" to="0" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Traveling particle around the cycle */}
      <circle r="4" fill="#3b82f6" opacity="0.6" filter="url(#ir-glow)">
        <animateMotion dur="6s" repeatCount="indefinite"
          path={`M${cx + r + 5},${cy} A${r + 5},${r + 5} 0 1,1 ${cx + r + 4.99},${cy}`} />
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle r="2.5" fill="#10b981" opacity="0.4">
        <animateMotion dur="6s" begin="3s" repeatCount="indefinite"
          path={`M${cx + r + 5},${cy} A${r + 5},${r + 5} 0 1,1 ${cx + r + 4.99},${cy}`} />
      </circle>

      {/* Center */}
      <g transform={`translate(${cx}, ${cy})`}>
        <circle r="22" fill="#0f172a" stroke="#475569" strokeWidth="1">
          <animate attributeName="stroke-opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <text textAnchor="middle" y="-2" fill="#94a3b8" fontSize="8" fontWeight="600">INCIDENT</text>
        <text textAnchor="middle" y="9" fill="#94a3b8" fontSize="8" fontWeight="600">RESPONSE</text>
      </g>

      {/* Phase nodes around the circle */}
      {phases.map((p, i) => {
        const angle = (i * 60 - 90) * Math.PI / 180
        const px = cx + r * Math.cos(angle)
        const py = cy + r * Math.sin(angle)
        const isActive = active === p.id
        return (
          <g key={p.id} transform={`translate(${px}, ${py})`}
            onMouseEnter={() => setActive(p.id)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">

            {/* Pulse */}
            <circle r="22" fill="none" stroke={p.color} strokeWidth="0.5" opacity="0">
              <animate attributeName="r" from="20" to="32" dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>

            {isActive && (
              <circle r="26" fill="none" stroke={p.color} strokeWidth="1.5">
                <animate attributeName="r" from="24" to="32" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="0.8s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Main circle */}
            <circle r={isActive ? 24 : 20} fill={isActive ? p.color + '20' : '#0f172a'}
              stroke={p.color} strokeWidth={isActive ? 2.5 : 1.5}
              style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              )}
            </circle>

            {/* Number */}
            <text textAnchor="middle" y="-2" dominantBaseline="central"
              fill={p.color} fontSize={isActive ? 18 : 16} fontWeight="700"
              filter={isActive ? 'url(#ir-glow)' : undefined}
              style={{ transition: 'font-size 0.2s' }}>
              {p.num}
            </text>

            {/* Label */}
            <text y={isActive ? 38 : 34} textAnchor="middle"
              fill={isActive ? '#f1f5f9' : '#94a3b8'} fontSize={isActive ? 11 : 10}
              fontWeight={isActive ? 600 : 400} style={{ transition: 'all 0.2s' }}>
              {p.label}
            </text>
          </g>
        )
      })}

      {/* Bottom reminder */}
      <text x="200" y="290" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="500">
        НЕ паникьосвай · Запиши · Откачи от мрежата · Уведоми IT
        <animate attributeName="fill-opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
      </text>
    </svg>
  )
}
