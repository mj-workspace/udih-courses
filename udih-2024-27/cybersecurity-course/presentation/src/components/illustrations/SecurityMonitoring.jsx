import { useState } from 'react'

const tools = [
  { id: 'siem', label: 'SIEM', desc: 'Логове + аларми', color: '#3b82f6', x: 90, y: 70 },
  { id: 'ids', label: 'IDS / IPS', desc: 'Детекция + блокиране', color: '#ef4444', x: 310, y: 70 },
  { id: 'edr', label: 'EDR', desc: 'Крайни устройства', color: '#8b5cf6', x: 65, y: 190 },
  { id: 'netmon', label: 'Network Mon.', desc: 'Трафик аномалии', color: '#06b6d4', x: 335, y: 190 },
  { id: 'vuln', label: 'Vuln Scan', desc: 'Уязвимости', color: '#f59e0b', x: 200, y: 240 },
]

export default function SecurityMonitoring() {
  const [active, setActive] = useState(null)

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <filter id="mon-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Radar sweep */}
      <g transform="translate(200, 140)">
        <circle r="110" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 4" />
        <circle r="70" fill="none" stroke="#1e293b" strokeWidth="0.3" strokeDasharray="2 6" />
        <circle r="35" fill="none" stroke="#1e293b" strokeWidth="0.3" strokeDasharray="1 4" />
        {/* Sweep */}
        <path d="M0,0 L0,-110 A110,110 0 0,1 78,-78 Z" fill="#3b82f6" opacity="0.04">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="5s" repeatCount="indefinite" />
        </path>
        <line x1="0" y1="0" x2="0" y2="-110" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="5s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Center eye/monitor */}
      <g transform="translate(200, 140)">
        <circle r="24" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.5">
          <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle r="30" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" from="24" to="38" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.3" to="0" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Eye icon */}
        <path d="M-12 0 Q0-10 12 0 Q0 10 -12 0" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
        <circle r="4" fill="none" stroke="#3b82f6" strokeWidth="1.5">
          <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="1.5" fill="#3b82f6">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Log stream lines flowing to center */}
      {[0,1,2,3].map(i => {
        const startX = 30 + i * 110
        return (
          <g key={`stream-${i}`} opacity="0.3">
            <line x1={startX} y1="280" x2="200" y2="140" stroke="#334155" strokeWidth="0.3" strokeDasharray="2 6">
              <animate attributeName="stroke-dashoffset" from="8" to="0" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </line>
            <circle r="1" fill="#3b82f6" opacity="0">
              <animateMotion dur={`${2 + i * 0.5}s`} repeatCount="indefinite"
                path={`M${startX},280 L200,140`} />
              <animate attributeName="opacity" values="0;0.5;0" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
            </circle>
          </g>
        )
      })}

      {/* Connections */}
      {tools.map((t, i) => (
        <g key={`conn-${i}`}>
          <line x1="200" y1="140" x2={t.x} y2={t.y}
            stroke={active === t.id ? t.color : '#1e293b'} strokeWidth="0.8"
            strokeDasharray="3 5" opacity={active === t.id ? 0.6 : 0.2}
            style={{ transition: 'all 0.3s' }}>
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="2s" repeatCount="indefinite" />
          </line>
          <circle r="2" fill={t.color} opacity="0">
            <animateMotion dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite"
              path={`M${t.x},${t.y} L200,140`} />
            <animate attributeName="opacity" values="0;0.5;0" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Tool nodes */}
      {tools.map((t, i) => {
        const isActive = active === t.id
        return (
          <g key={t.id} transform={`translate(${t.x}, ${t.y})`}
            onMouseEnter={() => setActive(t.id)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">
            <circle r="18" fill="none" stroke={t.color} strokeWidth="0.5" opacity="0">
              <animate attributeName="r" from="16" to="28" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <circle r="2" fill={t.color} opacity="0.4">
              <animateMotion dur={`${3.5 + i * 0.5}s`} repeatCount="indefinite"
                path="M18,0 A18,18 0 1,1 17.99,0" />
            </circle>
            {isActive && (
              <circle r="22" fill="none" stroke={t.color} strokeWidth="1">
                <animate attributeName="r" from="20" to="28" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="0.8s" repeatCount="indefinite" />
              </circle>
            )}
            <circle r={isActive ? 20 : 16} fill={isActive ? t.color + '15' : '#111827'}
              stroke={t.color} strokeWidth={isActive ? 2 : 1} style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.4;0.9;0.4" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              )}
            </circle>
            <text textAnchor="middle" dominantBaseline="central" fill={t.color} fontSize="8" fontWeight="bold">
              {t.label.split(' ')[0]}
            </text>
            <text y={isActive ? 32 : 28} textAnchor="middle" fill={isActive ? '#f1f5f9' : '#64748b'}
              fontSize={isActive ? 9 : 8} fontWeight={isActive ? 600 : 400} style={{ transition: 'all 0.2s' }}>
              {isActive ? t.desc : t.label}
            </text>
          </g>
        )
      })}

      {/* Logs badge */}
      <text x="200" y="290" textAnchor="middle" fill="#475569" fontSize="8">
        Логове — златната мина на сигурността
        <animate attributeName="fill-opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite" />
      </text>
    </svg>
  )
}
