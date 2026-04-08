import { useState } from 'react'

const practices = [
  { id: 'desk', label: 'Clean Desk', color: '#3b82f6', x: 85, y: 60 },
  { id: 'lock', label: 'Screen Lock', color: '#8b5cf6', x: 315, y: 60 },
  { id: 'encrypt', label: 'Криптиране', color: '#06b6d4', x: 60, y: 155 },
  { id: 'destroy', label: 'Сигурно унищожаване', color: '#ef4444', x: 340, y: 155 },
  { id: 'vpn', label: 'VPN', color: '#10b981', x: 115, y: 240 },
  { id: 'separate', label: 'Лични ≠ Работни', color: '#f59e0b', x: 285, y: 240 },
]

const iconPaths = {
  desk: 'M-8 6 H8 M-10 6 V8 M10 6 V8 M-6-6 H6 V6 H-6Z M-3-3 H3',
  lock: 'M-7 0 H7 V7 H-7Z M0 3 V5 M-4 0 V-4 A4 4 0 0 1 4-4 V0',
  encrypt: 'M-6-6 H6 V6 H-6Z M-3-3 L3 3 M3-3 L-3 3',
  destroy: 'M-6-8 H6 L8-6 V8 H-8 V-6Z M-4-2 V6 M0-2 V6 M4-2 V6',
  vpn: 'M-8 0 A8 8 0 1 1 8 0 M-4 0 A4 4 0 1 1 4 0 M0-8 V8 M-8 0 H8',
  separate: 'M-8-4 H-1 V4 H-8Z M1-4 H8 V4 H1Z M-4 0 L4 0',
}

export default function SafeHandling() {
  const [active, setActive] = useState(null)

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <filter id="sh-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Rotating outer ring */}
      <circle cx="200" cy="150" r="130" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 8">
        <animateTransform attributeName="transform" type="rotate" from="0 200 150" to="360 200 150" dur="40s" repeatCount="indefinite" />
      </circle>

      {/* Center shield */}
      <g transform="translate(200, 150)">
        <path d="M0-22 L17-11 L17 7 C17 18 0 26 0 26 C0 26 -17 18 -17 7 L-17-11Z"
          fill="#0f172a" stroke="#10b981" strokeWidth="1.5" filter="url(#sh-glow)">
          <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M-5 1 L-2 6 L7-5" fill="none" stroke="#10b981" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="stroke-opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
        </path>

        <circle r="30" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" from="26" to="40" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.3" to="0" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Connections */}
      {practices.map((p, i) => (
        <g key={`conn-${i}`}>
          <line x1="200" y1="150" x2={p.x} y2={p.y}
            stroke={active === p.id ? p.color : '#1e293b'} strokeWidth="0.8"
            strokeDasharray="3 5" opacity={active === p.id ? 0.6 : 0.2}
            style={{ transition: 'all 0.3s' }}>
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="2s" repeatCount="indefinite" />
          </line>
          <circle r="2" fill={p.color} opacity="0">
            <animateMotion dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite"
              path={`M${p.x},${p.y} L200,150`} />
            <animate attributeName="opacity" values="0;0.5;0" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
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
                <animate attributeName="r" from="20" to="28" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="0.8s" repeatCount="indefinite" />
              </circle>
            )}

            <circle r={isActive ? 20 : 16}
              fill={isActive ? p.color + '15' : '#111827'}
              stroke={p.color} strokeWidth={isActive ? 2 : 1}
              style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.4;0.9;0.4" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              )}
            </circle>

            <path d={iconPaths[p.id]} fill="none" stroke={p.color} strokeWidth="1.3"
              strokeLinecap="round" strokeLinejoin="round" transform="scale(0.85)"
              filter={isActive ? 'url(#sh-glow)' : undefined} />

            <text y={isActive ? 32 : 28} textAnchor="middle"
              fill={isActive ? '#f1f5f9' : '#64748b'} fontSize={isActive ? 10 : 9}
              fontWeight={isActive ? 600 : 400} style={{ transition: 'all 0.2s' }}>
              {p.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
