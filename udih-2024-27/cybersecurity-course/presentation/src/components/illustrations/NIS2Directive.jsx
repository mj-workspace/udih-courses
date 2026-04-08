import { useState } from 'react'

const requirements = [
  { id: 'risk', label: 'Управление на риска', color: '#3b82f6', x: 80, y: 65 },
  { id: 'measures', label: 'Мерки за сигурност', color: '#8b5cf6', x: 320, y: 65 },
  { id: 'incident', label: '24ч докладване', color: '#ef4444', x: 65, y: 170 },
  { id: 'supply', label: 'Верига на доставки', color: '#06b6d4', x: 335, y: 170 },
  { id: 'mgmt', label: 'Отговорност на ръководството', color: '#f59e0b', x: 200, y: 240 },
]

export default function NIS2Directive() {
  const [active, setActive] = useState(null)

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <filter id="nis-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background shield watermark */}
      <path d="M200,15 L300,65 L300,155 C300,210 200,250 200,250 C200,250 100,210 100,155 L100,65Z"
        fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.3">
        <animate attributeName="stroke-dashoffset" from="10" to="0" dur="4s" repeatCount="indefinite" />
      </path>

      {/* Center NIS2 badge */}
      <g transform="translate(200, 140)">
        <circle r="32" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2">
          <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="38" fill="none" stroke="#8b5cf6" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" from="32" to="48" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.3" to="0" dur="3s" repeatCount="indefinite" />
        </circle>
        <text textAnchor="middle" y="-3" fill="#8b5cf6" fontSize="16" fontWeight="700">NIS2</text>
        <text textAnchor="middle" y="12" fill="#64748b" fontSize="8">Директива на ЕС</text>
      </g>

      {/* Connections */}
      {requirements.map((r, i) => (
        <g key={`conn-${i}`}>
          <line x1="200" y1="140" x2={r.x} y2={r.y}
            stroke={active === r.id ? r.color : '#1e293b'} strokeWidth="0.8"
            strokeDasharray="3 5" opacity={active === r.id ? 0.6 : 0.2}
            style={{ transition: 'all 0.3s' }}>
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="2s" repeatCount="indefinite" />
          </line>
          <circle r="2" fill={r.color} opacity="0">
            <animateMotion dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite"
              path={`M${r.x},${r.y} L200,140`} />
            <animate attributeName="opacity" values="0;0.6;0" dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Requirement nodes */}
      {requirements.map((req, i) => {
        const isActive = active === req.id
        return (
          <g key={req.id} transform={`translate(${req.x}, ${req.y})`}
            onMouseEnter={() => setActive(req.id)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">

            <circle r="20" fill="none" stroke={req.color} strokeWidth="0.5" opacity="0">
              <animate attributeName="r" from="18" to="30" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <circle r="2" fill={req.color} opacity="0.4">
              <animateMotion dur={`${3.5 + i * 0.5}s`} repeatCount="indefinite"
                path="M20,0 A20,20 0 1,1 19.99,0" />
            </circle>

            {isActive && (
              <circle r="24" fill="none" stroke={req.color} strokeWidth="1">
                <animate attributeName="r" from="22" to="30" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="0.8s" repeatCount="indefinite" />
              </circle>
            )}

            <circle r={isActive ? 22 : 18}
              fill={isActive ? req.color + '15' : '#111827'}
              stroke={req.color} strokeWidth={isActive ? 2 : 1}
              style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.4;0.9;0.4" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              )}
            </circle>

            {/* Number */}
            <text textAnchor="middle" dominantBaseline="central"
              fill={req.color} fontSize="12" fontWeight="bold"
              filter={isActive ? 'url(#nis-glow)' : undefined}>
              {i + 1}
            </text>

            <text y={isActive ? 34 : 30} textAnchor="middle"
              fill={isActive ? '#f1f5f9' : '#64748b'} fontSize={isActive ? 9 : 8}
              fontWeight={isActive ? 600 : 400} style={{ transition: 'all 0.2s' }}>
              {req.label}
            </text>
          </g>
        )
      })}

      {/* Sanction + ViK badge at bottom */}
      <g transform="translate(200, 285)">
        <text textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="500">
          ВиК = essential entity · Санкция: до €10M или 2% от оборота
          <animate attributeName="fill-opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
        </text>
      </g>
    </svg>
  )
}
