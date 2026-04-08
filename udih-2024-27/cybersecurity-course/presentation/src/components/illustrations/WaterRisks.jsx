import { useState } from 'react'

const risks = [
  { id: 'geo', label: 'Разпръсната мрежа', color: '#ef4444', x: 75, y: 55 },
  { id: 'legacy', label: 'Стар софтуер', color: '#f59e0b', x: 325, y: 55 },
  { id: 'iot', label: 'IoT с фабрични пароли', color: '#ec4899', x: 55, y: 155 },
  { id: 'itot', label: 'IT ↔ OT смесване', color: '#8b5cf6', x: 345, y: 155 },
  { id: 'remote', label: 'Отдалечен достъп', color: '#06b6d4', x: 105, y: 240 },
  { id: 'vendor', label: 'Трети страни', color: '#f59e0b', x: 295, y: 240 },
]

const defenses = [
  { label: 'Сегментация', color: '#10b981' },
  { label: 'Одит', color: '#3b82f6' },
  { label: 'Мониторинг', color: '#06b6d4' },
]

export default function WaterRisks() {
  const [active, setActive] = useState(null)

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <filter id="wr-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background danger zone */}
      <circle cx="200" cy="150" r="110" fill="none" stroke="#ef4444" strokeWidth="0.3" opacity="0">
        <animate attributeName="r" from="80" to="130" dur="5s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.15" to="0" dur="5s" repeatCount="indefinite" />
      </circle>

      {/* Center: ВиК infrastructure */}
      <g transform="translate(200, 150)">
        <circle r="30" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5">
          <animate attributeName="stroke-opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle r="36" fill="none" stroke="#ef4444" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" from="30" to="44" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.3" to="0" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Water drop icon */}
        <path d="M0-14 C-8-2 -10 4 -10 8 A10 10 0 0 0 10 8 C10 4 8-2 0-14Z"
          fill="none" stroke="#06b6d4" strokeWidth="1.5" />
        <text y="22" textAnchor="middle" fill="#64748b" fontSize="8">ВиК МРЕЖА</text>
      </g>

      {/* Attack lines */}
      {risks.map((r, i) => (
        <g key={`conn-${i}`}>
          <line x1="200" y1="150" x2={r.x} y2={r.y}
            stroke={active === r.id ? r.color : '#1e293b'} strokeWidth="0.8"
            strokeDasharray="3 5" opacity={active === r.id ? 0.6 : 0.2}
            style={{ transition: 'all 0.3s' }}>
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="2s" repeatCount="indefinite" />
          </line>
          <circle r="2" fill={r.color} opacity="0">
            <animateMotion dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite"
              path={`M${r.x},${r.y} L200,150`} />
            <animate attributeName="opacity" values="0;0.5;0" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Risk nodes */}
      {risks.map((r, i) => {
        const isActive = active === r.id
        return (
          <g key={r.id} transform={`translate(${r.x}, ${r.y})`}
            onMouseEnter={() => setActive(r.id)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">
            <circle r="18" fill="none" stroke={r.color} strokeWidth="0.5" opacity="0">
              <animate attributeName="r" from="16" to="28" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <circle r="2" fill={r.color} opacity="0.4">
              <animateMotion dur={`${3.5 + i * 0.5}s`} repeatCount="indefinite"
                path="M18,0 A18,18 0 1,1 17.99,0" />
            </circle>
            {isActive && (
              <circle r="22" fill="none" stroke={r.color} strokeWidth="1">
                <animate attributeName="r" from="20" to="28" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="0.8s" repeatCount="indefinite" />
              </circle>
            )}
            <circle r={isActive ? 20 : 16} fill={isActive ? r.color + '15' : '#111827'}
              stroke={r.color} strokeWidth={isActive ? 2 : 1} style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.4;0.9;0.4" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              )}
            </circle>
            {/* Warning triangle */}
            <path d="M0-6 L6 5 H-6Z" fill="none" stroke={r.color} strokeWidth="1.3" strokeLinejoin="round" />
            <text textAnchor="middle" y="3" fill={r.color} fontSize="7" fontWeight="bold">!</text>
            <text y={isActive ? 32 : 28} textAnchor="middle" fill={isActive ? '#f1f5f9' : '#64748b'}
              fontSize={isActive ? 9 : 8} fontWeight={isActive ? 600 : 400} style={{ transition: 'all 0.2s' }}>
              {r.label}
            </text>
          </g>
        )
      })}

      {/* Defense badges bottom */}
      <g transform="translate(200, 288)">
        <text textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="500">
          Защита: {defenses.map(d => d.label).join(' · ')}
          <animate attributeName="fill-opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
        </text>
      </g>
    </svg>
  )
}
