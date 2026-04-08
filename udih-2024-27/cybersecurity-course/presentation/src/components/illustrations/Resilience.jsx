import { useState } from 'react'

const components = [
  { id: 'bcp', label: 'BCP', full: 'Business Continuity', color: '#3b82f6', x: 80, y: 65 },
  { id: 'drp', label: 'DRP', full: 'Disaster Recovery', color: '#8b5cf6', x: 320, y: 65 },
  { id: 'backup', label: 'Backup 3-2-1', full: '3 копия · 2 медии · 1 офсайт', color: '#10b981', x: 200, y: 50 },
  { id: 'rto', label: 'RTO', full: 'Време за възстановяване', color: '#f59e0b', x: 95, y: 200 },
  { id: 'rpo', label: 'RPO', full: 'Допустима загуба данни', color: '#ef4444', x: 305, y: 200 },
]

export default function Resilience() {
  const [active, setActive] = useState(null)

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <filter id="res-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Timeline arrow at bottom */}
      <line x1="50" y1="255" x2="350" y2="255" stroke="#334155" strokeWidth="1.5" />
      <polygon points="350,255 342,250 342,260" fill="#334155" />
      {/* Timeline labels */}
      <text x="65" y="272" fill="#ef4444" fontSize="8">Инцидент</text>
      <text x="190" y="272" fill="#f59e0b" fontSize="8">RTO</text>
      <text x="310" y="272" fill="#10b981" fontSize="8">Нормално</text>
      {/* Timeline dots */}
      <circle cx="80" cy="255" r="4" fill="#ef4444">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="255" r="3" fill="#f59e0b" opacity="0.6" />
      <circle cx="330" cy="255" r="4" fill="#10b981">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="1s" repeatCount="indefinite" />
      </circle>
      {/* Recovery curve */}
      <path d="M80,240 C100,235 130,210 200,180 C260,155 310,140 330,138"
        fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4">
        <animate attributeName="stroke-dashoffset" from="7" to="0" dur="2s" repeatCount="indefinite" />
      </path>
      {/* Traveling recovery particle */}
      <circle r="3" fill="#10b981" opacity="0" filter="url(#res-glow)">
        <animateMotion dur="4s" repeatCount="indefinite"
          path="M80,240 C100,235 130,210 200,180 C260,155 310,140 330,138" />
        <animate attributeName="opacity" values="0;0.7;0" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* Center shield - resilience */}
      <g transform="translate(200, 130)">
        <circle r="30" fill="#0f172a" stroke="#10b981" strokeWidth="1.5">
          <animate attributeName="stroke-opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="36" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" from="30" to="44" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.3" to="0" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Refresh/cycle icon */}
        <path d="M0-10 A10 10 0 1 1 -7 7" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
        <polygon points="-7,7 -3,3 -11,4" fill="#10b981" />
        <text y="20" textAnchor="middle" fill="#64748b" fontSize="8">УСТОЙЧИВОСТ</text>
      </g>

      {/* Connections */}
      {components.map((c, i) => (
        <g key={`conn-${i}`}>
          <line x1="200" y1="130" x2={c.x} y2={c.y}
            stroke={active === c.id ? c.color : '#1e293b'} strokeWidth="0.8"
            strokeDasharray="3 5" opacity={active === c.id ? 0.6 : 0.2}
            style={{ transition: 'all 0.3s' }}>
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="2s" repeatCount="indefinite" />
          </line>
          <circle r="2" fill={c.color} opacity="0">
            <animateMotion dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite"
              path={`M${c.x},${c.y} L200,130`} />
            <animate attributeName="opacity" values="0;0.5;0" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Component nodes */}
      {components.map((c, i) => {
        const isActive = active === c.id
        return (
          <g key={c.id} transform={`translate(${c.x}, ${c.y})`}
            onMouseEnter={() => setActive(c.id)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">
            <circle r="18" fill="none" stroke={c.color} strokeWidth="0.5" opacity="0">
              <animate attributeName="r" from="16" to="28" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <circle r="2" fill={c.color} opacity="0.4">
              <animateMotion dur={`${3.5 + i * 0.5}s`} repeatCount="indefinite"
                path="M18,0 A18,18 0 1,1 17.99,0" />
            </circle>
            {isActive && (
              <circle r="22" fill="none" stroke={c.color} strokeWidth="1">
                <animate attributeName="r" from="20" to="28" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="0.8s" repeatCount="indefinite" />
              </circle>
            )}
            <circle r={isActive ? 20 : 16} fill={isActive ? c.color + '15' : '#111827'}
              stroke={c.color} strokeWidth={isActive ? 2 : 1} style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.4;0.9;0.4" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              )}
            </circle>
            <text textAnchor="middle" dominantBaseline="central" fill={c.color}
              fontSize={isActive ? 10 : 9} fontWeight="700">{c.label}</text>
            <text y={isActive ? 32 : 28} textAnchor="middle" fill={isActive ? '#f1f5f9' : '#64748b'}
              fontSize={isActive ? 9 : 8} fontWeight={isActive ? 500 : 400} style={{ transition: 'all 0.2s' }}>
              {isActive ? c.full : ''}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
