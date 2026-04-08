import { useState } from 'react'

const practices = [
  { id: 'antivirus', label: 'Антивирус', color: '#10b981', x: 110, y: 55 },
  { id: 'updates', label: 'Ъпдейти', color: '#3b82f6', x: 290, y: 55 },
  { id: 'firewall', label: 'Firewall', color: '#8b5cf6', x: 60, y: 155 },
  { id: 'backup', label: 'Backup 3-2-1', color: '#06b6d4', x: 340, y: 155 },
  { id: 'awareness', label: 'Обучение', color: '#f59e0b', x: 110, y: 250 },
  { id: 'report', label: 'Докладвай', color: '#ef4444', x: 290, y: 250 },
]

export default function BestPractices() {
  const [active, setActive] = useState(null)

  return (
    <svg viewBox="0 0 400 310" className="w-full h-full">
      <defs>
        <filter id="bp-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="shield-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Background shield watermark */}
      <path d="M200,20 L310,75 L310,170 C310,230 200,280 200,280 C200,280 90,230 90,170 L90,75Z"
        fill="url(#shield-grad)" stroke="none" opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.4;0.2" dur="5s" repeatCount="indefinite" />
      </path>
      <path d="M200,20 L310,75 L310,170 C310,230 200,280 200,280 C200,280 90,230 90,170 L90,75Z"
        fill="none" stroke="#10b981" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.3">
        <animate attributeName="stroke-dashoffset" from="10" to="0" dur="3s" repeatCount="indefinite" />
      </path>

      {/* Rotating protection ring */}
      <circle cx="200" cy="155" r="120" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 8">
        <animateTransform attributeName="transform" type="rotate" from="0 200 155" to="360 200 155" dur="30s" repeatCount="indefinite" />
      </circle>

      {/* Center shield */}
      <g transform="translate(200, 155)">
        <circle r="30" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" from="28" to="45" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.3" to="0" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="30" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" from="28" to="45" dur="3s" begin="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.2" to="0" dur="3s" begin="1.5s" repeatCount="indefinite" />
        </circle>

        <path d="M0-26 L20-14 L20 8 C20 22 0 32 0 32 C0 32 -20 22 -20 8 L-20-14Z"
          fill="#0f172a" stroke="#10b981" strokeWidth="2" filter="url(#bp-glow)">
          <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
        </path>
        <path d="M-7 2 L-2 8 L9-7" fill="none" stroke="#10b981" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="stroke-opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
        </path>
        <text y="20" textAnchor="middle" fill="#64748b" fontSize="8">ЗАЩИТА</text>
      </g>

      {/* Connections */}
      {practices.map((p, i) => (
        <g key={`conn-${i}`}>
          <line x1="200" y1="155" x2={p.x} y2={p.y}
            stroke={active === p.id ? p.color : '#1e293b'} strokeWidth="0.8"
            strokeDasharray="3 5" opacity={active === p.id ? 0.6 : 0.2}
            style={{ transition: 'all 0.3s' }}>
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="2s" repeatCount="indefinite" />
          </line>
          {/* Energy flowing to center (protection building up) */}
          <circle r="2" fill={p.color} opacity="0">
            <animateMotion dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite"
              path={`M${p.x},${p.y} L200,155`} />
            <animate attributeName="opacity" values="0;0.6;0" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Practice nodes */}
      {practices.map((p, i) => {
        const isActive = active === p.id
        return (
          <g key={p.id} transform={`translate(${p.x}, ${p.y})`}
            onMouseEnter={() => setActive(p.id)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">

            <circle r="18" fill="none" stroke={p.color} strokeWidth="0.5" opacity="0">
              <animate attributeName="r" from="16" to="28" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>

            <circle r="2" fill={p.color} opacity="0.4">
              <animateMotion dur={`${3.5 + i * 0.5}s`} repeatCount="indefinite"
                path="M18,0 A18,18 0 1,1 17.99,0" />
            </circle>

            {isActive && (
              <circle r="22" fill="none" stroke={p.color} strokeWidth="1">
                <animate attributeName="r" from="20" to="30" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1s" repeatCount="indefinite" />
              </circle>
            )}

            <circle r={isActive ? 20 : 16}
              fill={isActive ? p.color + '20' : '#111827'}
              stroke={p.color} strokeWidth={isActive ? 2 : 1}
              style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              )}
            </circle>

            {/* Checkmark inside */}
            <path d="M-5 1 L-2 5 L6-4" fill="none" stroke={p.color} strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"
              filter={isActive ? 'url(#bp-glow)' : undefined} />

            <text y={isActive ? 34 : 30} textAnchor="middle"
              fill={isActive ? '#f1f5f9' : '#64748b'} fontSize={isActive ? 11 : 10}
              fontWeight={isActive ? 600 : 400} style={{ transition: 'all 0.2s' }}>
              {p.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
