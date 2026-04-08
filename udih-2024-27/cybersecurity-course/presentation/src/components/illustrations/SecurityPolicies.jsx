import { useState } from 'react'

const policies = [
  { id: 'aup', label: 'AUP', full: 'Acceptable Use', color: '#3b82f6', angle: 0 },
  { id: 'password', label: 'Password', full: 'Политика за пароли', color: '#8b5cf6', angle: 51 },
  { id: 'access', label: 'Access', full: 'Контрол на достъпа', color: '#06b6d4', angle: 103 },
  { id: 'data', label: 'Data', full: 'Защита на данни', color: '#10b981', angle: 154 },
  { id: 'remote', label: 'Remote', full: 'Отдалечена работа', color: '#f59e0b', angle: 206 },
  { id: 'incident', label: 'Incident', full: 'Реакция при инцидент', color: '#ef4444', angle: 257 },
  { id: 'backup', label: 'Backup', full: 'Резервни копия', color: '#ec4899', angle: 309 },
]

export default function SecurityPolicies() {
  const [active, setActive] = useState(null)
  const cx = 200, cy = 145, r = 105

  return (
    <svg viewBox="0 0 400 310" className="w-full h-full">
      <defs>
        <filter id="pol-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Outer rings */}
      <circle cx={cx} cy={cy} r={r + 20} fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3 8">
        <animateTransform attributeName="transform" type="rotate" from="0 200 145" to="360 200 145" dur="40s" repeatCount="indefinite" />
      </circle>

      {/* Hex connections between adjacent policies */}
      {policies.map((p, i) => {
        const next = policies[(i + 1) % policies.length]
        const rad1 = (p.angle - 90) * Math.PI / 180
        const rad2 = (next.angle - 90) * Math.PI / 180
        const x1 = cx + r * Math.cos(rad1), y1 = cy + r * Math.sin(rad1)
        const x2 = cx + r * Math.cos(rad2), y2 = cy + r * Math.sin(rad2)
        return (
          <g key={`hex-${i}`}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 4">
              <animate attributeName="stroke-dashoffset" from="7" to="0" dur="2s" repeatCount="indefinite" />
            </line>
            <circle r="1.5" fill={p.color} opacity="0.3">
              <animateMotion dur={`${3 + i * 0.3}s`} repeatCount="indefinite"
                path={`M${x1},${y1} L${x2},${y2}`} />
            </circle>
          </g>
        )
      })}

      {/* Radial connections to center */}
      {policies.map((p, i) => {
        const rad = (p.angle - 90) * Math.PI / 180
        const px = cx + r * Math.cos(rad), py = cy + r * Math.sin(rad)
        return (
          <g key={`rad-${i}`}>
            <line x1={cx} y1={cy} x2={px} y2={py}
              stroke={active === p.id ? p.color : '#1e293b'} strokeWidth="0.5"
              strokeDasharray="2 4" opacity={active === p.id ? 0.5 : 0.12}
              style={{ transition: 'all 0.3s' }} />
            <circle r="2" fill={p.color} opacity="0">
              <animateMotion dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite"
                path={`M${px},${py} L${cx},${cy}`} />
              <animate attributeName="opacity" values="0;0.5;0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        )
      })}

      {/* Center document/foundation */}
      <g transform={`translate(${cx}, ${cy})`}>
        <circle r="26" fill="#0f172a" stroke="#475569" strokeWidth="1.5">
          <animate attributeName="stroke-opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="32" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" from="26" to="40" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.3" to="0" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Document icon */}
        <rect x="-8" y="-11" width="16" height="20" rx="2" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="-4" y1="-5" x2="4" y2="-5" stroke="#94a3b8" strokeWidth="0.8" />
        <line x1="-4" y1="-1" x2="4" y2="-1" stroke="#94a3b8" strokeWidth="0.8" />
        <line x1="-4" y1="3" x2="2" y2="3" stroke="#94a3b8" strokeWidth="0.8" />
        <text y="22" textAnchor="middle" fill="#64748b" fontSize="8">ПОЛИТИКИ</text>
      </g>

      {/* Policy nodes */}
      {policies.map((p, i) => {
        const rad = (p.angle - 90) * Math.PI / 180
        const px = cx + r * Math.cos(rad), py = cy + r * Math.sin(rad)
        const isActive = active === p.id
        return (
          <g key={p.id} transform={`translate(${px}, ${py})`}
            onMouseEnter={() => setActive(p.id)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">
            <circle r="14" fill="none" stroke={p.color} strokeWidth="0.5" opacity="0">
              <animate attributeName="r" from="12" to="22" dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>
            {isActive && (
              <circle r="18" fill="none" stroke={p.color} strokeWidth="1">
                <animate attributeName="r" from="16" to="24" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="0.8s" repeatCount="indefinite" />
              </circle>
            )}
            <circle r={isActive ? 16 : 13} fill={isActive ? p.color + '20' : '#111827'}
              stroke={p.color} strokeWidth={isActive ? 2 : 1} style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.4;0.9;0.4" dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" />
              )}
            </circle>
            <text textAnchor="middle" dominantBaseline="central" fill={p.color} fontSize="8" fontWeight="bold">
              {p.label.substring(0, 3)}
            </text>
            <text y={isActive ? 28 : 24} textAnchor="middle" fill={isActive ? '#f1f5f9' : '#64748b'}
              fontSize={isActive ? 9 : 8} fontWeight={isActive ? 600 : 400} style={{ transition: 'all 0.2s' }}>
              {isActive ? p.full : p.label}
            </text>
          </g>
        )
      })}

      {/* Bottom text */}
      <text x="200" y="295" textAnchor="middle" fill="#64748b" fontSize="9">
        Писмени · Достъпни · Актуализирани · Подкрепени от обучение
        <animate attributeName="fill-opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite" />
      </text>
    </svg>
  )
}
