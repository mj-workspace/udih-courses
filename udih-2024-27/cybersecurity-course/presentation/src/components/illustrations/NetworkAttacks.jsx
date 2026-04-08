import { useState } from 'react'

const attacks = [
  { id: 'ddos', label: 'DDoS', defense: 'Rate limiting', color: '#ef4444', x: 80, y: 55 },
  { id: 'mitm', label: 'MitM', defense: 'HTTPS + VPN', color: '#f59e0b', x: 320, y: 55 },
  { id: 'dns', label: 'DNS Spoofing', defense: 'DNSSEC', color: '#8b5cf6', x: 60, y: 165 },
  { id: 'arp', label: 'ARP Spoofing', defense: 'Static ARP', color: '#ec4899', x: 340, y: 165 },
  { id: 'brute', label: 'Brute Force', defense: 'Lockout + 2FA', color: '#06b6d4', x: 200, y: 235 },
]

export default function NetworkAttacks() {
  const [active, setActive] = useState(null)

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <filter id="atk-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Attack wave background */}
      {[0,1,2].map(i => (
        <circle key={i} cx="200" cy="140" r="50" fill="none" stroke="#ef4444" strokeWidth="0.3" opacity="0">
          <animate attributeName="r" from="40" to={120 + i * 20} dur={`${4 + i}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.15" to="0" dur={`${4 + i}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* Center shield (defense) */}
      <g transform="translate(200, 140)">
        <path d="M0-24 L20-12 L20 8 C20 22 0 32 0 32 C0 32 -20 22 -20 8 L-20-12Z"
          fill="#0f172a" stroke={active ? (attacks.find(a => a.id === active)?.color || '#10b981') : '#10b981'}
          strokeWidth="2" filter="url(#atk-glow)" style={{ transition: 'stroke 0.3s' }}>
          <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
        </path>
        {/* Shield X - blocking attacks */}
        <line x1="-6" y1="-4" x2="6" y2="8" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
        <line x1="6" y1="-4" x2="-6" y2="8" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />

        {/* Pulse */}
        <circle r="30" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" from="26" to="40" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.3" to="0" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Attack lines - incoming */}
      {attacks.map((a, i) => (
        <g key={`conn-${i}`}>
          <line x1={a.x} y1={a.y} x2="200" y2="140"
            stroke={active === a.id ? a.color : '#1e293b'} strokeWidth="0.8"
            strokeDasharray="3 5" opacity={active === a.id ? 0.6 : 0.2}
            style={{ transition: 'all 0.3s' }}>
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1.5s" repeatCount="indefinite" />
          </line>
          {/* Attack particle */}
          <circle r="3" fill={a.color} opacity="0">
            <animateMotion dur={`${2 + i * 0.5}s`} repeatCount="indefinite"
              path={`M${a.x},${a.y} L200,140`} />
            <animate attributeName="opacity" values="0;0.6;0.6;0" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
          {/* Deflected particle */}
          <circle r="2" fill="#10b981" opacity="0">
            <animateMotion dur={`${2 + i * 0.5}s`} begin={`${1 + i * 0.25}s`} repeatCount="indefinite"
              path={`M200,140 L${200 + (Math.random() - 0.5) * 100},${140 + (Math.random() - 0.5) * 60}`} />
            <animate attributeName="opacity" values="0;0.4;0" dur={`${2 + i * 0.5}s`} begin={`${1 + i * 0.25}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Attack nodes */}
      {attacks.map((a, i) => {
        const isActive = active === a.id
        return (
          <g key={a.id} transform={`translate(${a.x}, ${a.y})`}
            onMouseEnter={() => setActive(a.id)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">
            <circle r="18" fill="none" stroke={a.color} strokeWidth="0.5" opacity="0">
              <animate attributeName="r" from="16" to="28" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <circle r="2" fill={a.color} opacity="0.4">
              <animateMotion dur={`${3.5 + i * 0.5}s`} repeatCount="indefinite"
                path="M18,0 A18,18 0 1,1 17.99,0" />
            </circle>
            {isActive && (
              <circle r="22" fill="none" stroke={a.color} strokeWidth="1">
                <animate attributeName="r" from="20" to="28" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="0.8s" repeatCount="indefinite" />
              </circle>
            )}
            <circle r={isActive ? 20 : 16} fill={isActive ? a.color + '15' : '#111827'}
              stroke={a.color} strokeWidth={isActive ? 2 : 1} style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.4;0.9;0.4" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              )}
            </circle>
            {/* Lightning bolt */}
            <path d="M-2-7 L2-1 H-1 L3 7 L-1 1 H2Z" fill={a.color} opacity="0.8" />
            <text y={isActive ? 32 : 28} textAnchor="middle" fill={isActive ? '#f1f5f9' : '#64748b'}
              fontSize={isActive ? 10 : 9} fontWeight={isActive ? 600 : 400} style={{ transition: 'all 0.2s' }}>
              {a.label}
            </text>
            {isActive && (
              <text y="44" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="500">
                ↳ {a.defense}
              </text>
            )}
          </g>
        )
      })}

      {/* Bottom strategy */}
      <text x="200" y="288" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="500">
        Пачвай · Сегментирай · Мониторирай · Планирай
        <animate attributeName="fill-opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
      </text>
    </svg>
  )
}
