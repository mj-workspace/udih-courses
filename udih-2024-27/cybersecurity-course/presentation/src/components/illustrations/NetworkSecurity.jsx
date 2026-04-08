import { useState } from 'react'

const tools = [
  { id: 'firewall', label: 'Firewall', color: '#ef4444', x: 200, y: 55 },
  { id: 'vpn', label: 'VPN', color: '#10b981', x: 70, y: 140 },
  { id: 'symmetric', label: 'AES (Symmetric)', color: '#3b82f6', x: 330, y: 140 },
  { id: 'asymmetric', label: 'RSA (Asymmetric)', color: '#8b5cf6', x: 100, y: 235 },
  { id: 'https', label: 'HTTPS / TLS', color: '#f59e0b', x: 300, y: 235 },
]

export default function NetworkSecurity() {
  const [active, setActive] = useState(null)

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <filter id="net-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background network grid */}
      <g stroke="#1e293b" strokeWidth="0.3" opacity="0.25">
        {[0,1,2,3,4,5,6,7].map(i => <line key={`v${i}`} x1={i*57} y1="0" x2={i*57} y2="300" />)}
        {[0,1,2,3,4,5].map(i => <line key={`h${i}`} x1="0" y1={i*57} x2="400" y2={i*57} />)}
      </g>

      {/* Encrypted tunnel visualization */}
      <path d="M50,150 Q200,100 350,150" fill="none" stroke="#10b981" strokeWidth="0.8"
        strokeDasharray="6 4" opacity="0.2">
        <animate attributeName="stroke-dashoffset" from="10" to="0" dur="2s" repeatCount="indefinite" />
      </path>
      <path d="M50,155 Q200,105 350,155" fill="none" stroke="#10b981" strokeWidth="0.4"
        strokeDasharray="4 6" opacity="0.15">
        <animate attributeName="stroke-dashoffset" from="0" to="10" dur="2.5s" repeatCount="indefinite" />
      </path>

      {/* Center lock/shield */}
      <g transform="translate(200, 150)">
        <circle r="28" fill="#0f172a" stroke="#475569" strokeWidth="1.5">
          <animate attributeName="stroke-opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="34" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" from="28" to="42" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.3" to="0" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Key icon */}
        <circle cx="-4" cy="-3" r="6" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
        <line x1="2" y1="3" x2="10" y2="11" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="7" y1="8" x2="10" y2="5" stroke="#f59e0b" strokeWidth="1.2" strokeLinecap="round" />
        <text y="22" textAnchor="middle" fill="#64748b" fontSize="8">МРЕЖОВА СИГУРНОСТ</text>
      </g>

      {/* Connections */}
      {tools.map((t, i) => (
        <g key={`conn-${i}`}>
          <line x1="200" y1="150" x2={t.x} y2={t.y}
            stroke={active === t.id ? t.color : '#1e293b'} strokeWidth="0.8"
            strokeDasharray="3 5" opacity={active === t.id ? 0.6 : 0.2}
            style={{ transition: 'all 0.3s' }}>
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="2s" repeatCount="indefinite" />
          </line>
          {/* Encrypted data packet */}
          <circle r="2.5" fill={t.color} opacity="0" filter="url(#net-glow)">
            <animateMotion dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite"
              path={`M${t.x},${t.y} L200,150`} />
            <animate attributeName="opacity" values="0;0.6;0" dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
          <circle r="1.5" fill={t.color} opacity="0">
            <animateMotion dur={`${3.5 + i * 0.4}s`} repeatCount="indefinite"
              path={`M200,150 L${t.x},${t.y}`} />
            <animate attributeName="opacity" values="0;0.4;0" dur={`${3.5 + i * 0.4}s`} repeatCount="indefinite" />
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
            <circle r="20" fill="none" stroke={t.color} strokeWidth="0.5" opacity="0">
              <animate attributeName="r" from="18" to="30" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <circle r="2" fill={t.color} opacity="0.4">
              <animateMotion dur={`${3.5 + i * 0.5}s`} repeatCount="indefinite"
                path="M20,0 A20,20 0 1,1 19.99,0" />
            </circle>
            {isActive && (
              <circle r="24" fill="none" stroke={t.color} strokeWidth="1">
                <animate attributeName="r" from="22" to="30" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="0.8s" repeatCount="indefinite" />
              </circle>
            )}
            <circle r={isActive ? 22 : 18} fill={isActive ? t.color + '15' : '#111827'}
              stroke={t.color} strokeWidth={isActive ? 2 : 1} style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.4;0.9;0.4" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              )}
            </circle>
            <text textAnchor="middle" dominantBaseline="central" fill={t.color} fontSize="11" fontWeight="bold">
              {t.label.charAt(0)}
            </text>
            <text y={isActive ? 34 : 30} textAnchor="middle" fill={isActive ? '#f1f5f9' : '#64748b'}
              fontSize={isActive ? 10 : 9} fontWeight={isActive ? 600 : 400} style={{ transition: 'all 0.2s' }}>
              {t.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
