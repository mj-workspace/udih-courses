import { useState } from 'react'

const factors = [
  {
    id: 'know', label: 'Нещо, което знаеш', sub: 'Парола · PIN',
    color: '#3b82f6', cx: 200, cy: 65,
    icon: 'M-6-2 V-7 A6 6 0 0 1 6-7 V-2 M-8-2 H8 V7 H-8Z M0 1 V4',
  },
  {
    id: 'have', label: 'Нещо, което имаш', sub: 'Телефон · Токен',
    color: '#10b981', cx: 105, cy: 210,
    icon: 'M-5-9 H5 A2 2 0 0 1 7-7 V7 A2 2 0 0 1 5 9 H-5 A2 2 0 0 1 -7 7 V-7 A2 2 0 0 1 -5-9 M-3 5 H3',
  },
  {
    id: 'are', label: 'Нещо, което си', sub: 'Пръст · Лице · Ирис',
    color: '#f59e0b', cx: 295, cy: 210,
    icon: 'M0-9 A6 5 0 1 1 -.01-9 M-10 9 C-10 1 -5-3 0-3 C5-3 10 1 10 9',
  },
]

const methods = [
  { label: 'SMS код', strength: 1, color: '#ef4444' },
  { label: 'Authenticator', strength: 3, color: '#f59e0b' },
  { label: 'Hardware key', strength: 4, color: '#10b981' },
]

export default function AuthFactors() {
  const [active, setActive] = useState(null)

  return (
    <svg viewBox="0 0 400 310" className="w-full h-full">
      <defs>
        <filter id="auth-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Outer rotating rings */}
      <circle cx="200" cy="145" r="140" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3 8">
        <animateTransform attributeName="transform" type="rotate" from="0 200 145" to="360 200 145" dur="35s" repeatCount="indefinite" />
      </circle>

      {/* Connecting triangle */}
      {[[0,1],[1,2],[2,0]].map(([a,b], i) => (
        <g key={`conn-${i}`}>
          <line x1={factors[a].cx} y1={factors[a].cy} x2={factors[b].cx} y2={factors[b].cy}
            stroke={active ? (active === factors[a].id || active === factors[b].id ? '#475569' : '#1e293b') : '#1e293b'}
            strokeWidth="0.8" strokeDasharray="4 4" style={{ transition: 'stroke 0.3s' }}>
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="2s" repeatCount="indefinite" />
          </line>
          <circle r="2" fill={factors[a].color} opacity="0.5">
            <animateMotion dur={`${3 + i * 0.5}s`} repeatCount="indefinite"
              path={`M${factors[a].cx},${factors[a].cy} L${factors[b].cx},${factors[b].cy}`} />
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Center 2FA badge */}
      <g transform="translate(200, 155)">
        <circle r="22" fill="#0f172a" stroke="#475569" strokeWidth="1">
          <animate attributeName="stroke-opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="28" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" from="22" to="38" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.3" to="0" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <text textAnchor="middle" dominantBaseline="central" fill="#94a3b8" fontSize="13" fontWeight="700">2FA</text>
      </g>

      {/* Factor nodes */}
      {factors.map((f, i) => {
        const isActive = active === f.id
        return (
          <g key={f.id} transform={`translate(${f.cx}, ${f.cy})`}
            onMouseEnter={() => setActive(f.id)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">

            {/* Pulse */}
            <circle r="32" fill="none" stroke={f.color} strokeWidth="0.5" opacity="0">
              <animate attributeName="r" from="30" to="45" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>

            {/* Orbiting dot */}
            <circle r="2" fill={f.color} opacity="0.4">
              <animateMotion dur={`${4 + i}s`} repeatCount="indefinite"
                path="M32,0 A32,32 0 1,1 31.99,0" />
            </circle>

            {/* Main circle */}
            <circle r={isActive ? 34 : 30}
              fill={isActive ? f.color + '15' : '#111827'}
              stroke={f.color} strokeWidth={isActive ? 2 : 1.5}
              style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
              )}
            </circle>

            {/* Icon */}
            <path d={f.icon} fill="none" stroke={f.color} strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
              filter={isActive ? 'url(#auth-glow)' : undefined} />

            {/* Labels */}
            <text y={isActive ? 50 : 46} textAnchor="middle"
              fill={isActive ? '#f1f5f9' : '#94a3b8'} fontSize="10" fontWeight={isActive ? 600 : 400}
              style={{ transition: 'all 0.2s' }}>
              {f.label}
            </text>
            {isActive && (
              <text y="62" textAnchor="middle" fill={f.color} fontSize="9">{f.sub}</text>
            )}
          </g>
        )
      })}

      {/* Strength scale at bottom */}
      <g transform="translate(80, 290)">
        <text fill="#64748b" fontSize="9" fontWeight="500">Сила на 2-рия фактор:</text>
        {methods.map((m, i) => (
          <g key={i} transform={`translate(${130 + i * 75}, 0)`}>
            <circle r="4" fill={m.color} opacity="0.7">
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <text x="8" dy="3" fill="#94a3b8" fontSize="9">{m.label}</text>
          </g>
        ))}
      </g>
    </svg>
  )
}
