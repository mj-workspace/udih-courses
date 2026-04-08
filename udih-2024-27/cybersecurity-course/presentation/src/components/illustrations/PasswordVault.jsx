import { useState } from 'react'

const managers = [
  { id: 'bitwarden', label: 'Bitwarden', sub: 'Безплатен · Open-source', color: '#3b82f6', x: 85, y: 240 },
  { id: '1password', label: '1Password', sub: 'Платен · Екипи', color: '#8b5cf6', x: 200, y: 260 },
  { id: 'keepass', label: 'KeePass', sub: 'Офлайн · Техничен', color: '#10b981', x: 315, y: 240 },
]

const features = [
  { label: 'Генерира пароли', angle: -60 },
  { label: 'Auto-fill', angle: 0 },
  { label: 'Криптиране', angle: 60 },
  { label: 'Синхронизация', angle: 120 },
]

export default function PasswordVault() {
  const [active, setActive] = useState(null)

  return (
    <svg viewBox="0 0 400 310" className="w-full h-full">
      <defs>
        <filter id="vault-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="vault-grad">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Rotating ring */}
      <circle cx="200" cy="115" r="95" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3 8">
        <animateTransform attributeName="transform" type="rotate" from="0 200 115" to="360 200 115" dur="30s" repeatCount="indefinite" />
      </circle>

      {/* Vault body */}
      <g transform="translate(200, 115)">
        {/* Vault background */}
        <circle r="60" fill="url(#vault-grad)">
          <animate attributeName="r" values="58;62;58" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* Vault outline */}
        <rect x="-45" y="-50" width="90" height="85" rx="8"
          fill="#0f172a" stroke="#475569" strokeWidth="2">
          <animate attributeName="stroke-opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
        </rect>

        {/* Vault door detail */}
        <rect x="-35" y="-40" width="70" height="65" rx="4"
          fill="none" stroke="#334155" strokeWidth="1" />

        {/* Dial */}
        <circle cx="0" cy="-8" r="18" fill="#111827" stroke="#475569" strokeWidth="1.5" />
        <circle cx="0" cy="-8" r="12" fill="none" stroke="#334155" strokeWidth="0.5" />
        {/* Dial tick marks */}
        {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
          const angle = i * 30 * Math.PI / 180
          return (
            <line key={i}
              x1={Math.cos(angle) * 14} y1={-8 + Math.sin(angle) * 14}
              x2={Math.cos(angle) * 17} y2={-8 + Math.sin(angle) * 17}
              stroke="#475569" strokeWidth="1" />
          )
        })}
        {/* Rotating dial pointer */}
        <line x1="0" y1="-8" x2="0" y2="-20" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate"
            values="0 0 -8;120 0 -8;240 0 -8;360 0 -8"
            dur="6s" repeatCount="indefinite" />
        </line>
        <circle cx="0" cy="-8" r="3" fill="#3b82f6">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Handle */}
        <rect x="25" y="-15" width="8" height="14" rx="2" fill="#334155" stroke="#475569" strokeWidth="1" />

        {/* Lock indicator */}
        <circle cx="-25" cy="15" r="4" fill="#10b981" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <text x="-15" y="18" fill="#64748b" fontSize="7">LOCKED</text>
      </g>

      {/* Features orbiting the vault */}
      {features.map((f, i) => {
        const rad = (f.angle - 90) * Math.PI / 180
        const fx = 200 + 85 * Math.cos(rad)
        const fy = 115 + 85 * Math.sin(rad)
        return (
          <g key={i}>
            {/* Connection */}
            <line x1="200" y1="115" x2={fx} y2={fy}
              stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 4">
              <animate attributeName="stroke-dashoffset" from="6" to="0" dur="2s" repeatCount="indefinite" />
            </line>
            {/* Feature dot */}
            <circle cx={fx} cy={fy} r="4" fill="#3b82f6" opacity="0.3">
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
              <animate attributeName="r" values="3;5;3" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>
            <text x={fx} y={fy + 14} textAnchor="middle" fill="#64748b" fontSize="8">{f.label}</text>
          </g>
        )
      })}

      {/* Keys flying into vault */}
      {[0,1,2].map(i => (
        <g key={`key-${i}`}>
          <text fontSize="12" fill="#f59e0b" opacity="0">
            🔑
            <animateMotion dur={`${3 + i * 1.5}s`} repeatCount="indefinite"
              path={`M${50 + i * 140},290 C${100 + i * 100},200 200,150 200,115`} />
            <animate attributeName="opacity" values="0;0.7;0.7;0" dur={`${3 + i * 1.5}s`} repeatCount="indefinite" />
          </text>
        </g>
      ))}

      {/* Manager cards at bottom */}
      {managers.map((m) => {
        const isActive = active === m.id
        return (
          <g key={m.id} transform={`translate(${m.x}, ${m.y})`}
            onMouseEnter={() => setActive(m.id)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">

            <circle r="14" fill={isActive ? m.color + '20' : '#111827'}
              stroke={m.color} strokeWidth={isActive ? 1.5 : 0.8}
              style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.4;0.8;0.4" dur={`${2.5 + managers.indexOf(m) * 0.3}s`} repeatCount="indefinite" />
              )}
            </circle>
            <text textAnchor="middle" dominantBaseline="central"
              fill={m.color} fontSize="9" fontWeight="bold">
              {m.label.charAt(0)}
            </text>
            <text y="24" textAnchor="middle" fill={isActive ? '#f1f5f9' : '#94a3b8'}
              fontSize="9" fontWeight={isActive ? 600 : 400}>{m.label}</text>
            {isActive && (
              <text y="36" textAnchor="middle" fill={m.color} fontSize="8">{m.sub}</text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
