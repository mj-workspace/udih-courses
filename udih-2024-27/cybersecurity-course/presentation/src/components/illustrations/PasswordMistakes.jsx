import { useState } from 'react'

const mistakes = [
  { id: 'reuse', label: 'Една парола навсякъде', color: '#ef4444', x: 80, y: 55 },
  { id: 'sticky', label: 'Парола на бележка', color: '#f59e0b', x: 310, y: 55 },
  { id: 'share', label: 'Споделяне с колеги', color: '#ec4899', x: 65, y: 145 },
  { id: 'weak', label: 'Password123...', color: '#8b5cf6', x: 330, y: 145 },
  { id: 'no2fa', label: 'Без 2FA', color: '#ef4444', x: 105, y: 230 },
  { id: 'remember', label: '"Запомни ме"', color: '#f59e0b', x: 290, y: 230 },
]

export default function PasswordMistakes() {
  const [active, setActive] = useState(null)

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <filter id="mistake-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Warning background pulse */}
      <circle cx="200" cy="145" r="100" fill="none" stroke="#ef4444" strokeWidth="0.3" opacity="0">
        <animate attributeName="r" from="60" to="140" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.2" to="0" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* Center warning icon */}
      <g transform="translate(200, 145)">
        {/* Triangle */}
        <path d="M0-28 L30 22 H-30Z" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5"
          strokeLinejoin="round">
          <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </path>
        <text textAnchor="middle" y="8" fill="#ef4444" fontSize="28" fontWeight="bold">!</text>
        <text y="38" textAnchor="middle" fill="#64748b" fontSize="9">ЧЕСТИ ГРЕШКИ</text>

        {/* Pulsing ring */}
        <circle r="35" fill="none" stroke="#ef4444" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" from="35" to="50" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.4" to="0" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Connection lines */}
      {mistakes.map((m, i) => (
        <g key={`conn-${i}`}>
          <line x1="200" y1="145" x2={m.x} y2={m.y}
            stroke={active === m.id ? m.color : '#1e293b'} strokeWidth="0.8"
            strokeDasharray="3 5" opacity={active === m.id ? 0.6 : 0.2}
            style={{ transition: 'all 0.3s' }}>
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="2s" repeatCount="indefinite" />
          </line>
          <circle r="2" fill={m.color} opacity="0">
            <animateMotion dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite"
              path={`M${m.x},${m.y} L200,145`} />
            <animate attributeName="opacity" values="0;0.5;0" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Mistake nodes */}
      {mistakes.map((m, i) => {
        const isActive = active === m.id
        return (
          <g key={m.id} transform={`translate(${m.x}, ${m.y})`}
            onMouseEnter={() => setActive(m.id)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">

            {/* Pulse */}
            <circle r="18" fill="none" stroke={m.color} strokeWidth="0.5" opacity="0">
              <animate attributeName="r" from="16" to="28" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>

            {/* Orbit */}
            <circle r="1.5" fill={m.color} opacity="0.4">
              <animateMotion dur={`${3.5 + i * 0.5}s`} repeatCount="indefinite"
                path="M18,0 A18,18 0 1,1 17.99,0" />
            </circle>

            {isActive && (
              <circle r="22" fill="none" stroke={m.color} strokeWidth="1">
                <animate attributeName="r" from="20" to="28" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="0.8s" repeatCount="indefinite" />
              </circle>
            )}

            <circle r={isActive ? 20 : 16}
              fill={isActive ? m.color + '20' : '#111827'}
              stroke={m.color} strokeWidth={isActive ? 2 : 1}
              style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.4;0.9;0.4" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              )}
            </circle>

            {/* X mark */}
            <g stroke={m.color} strokeWidth="2" strokeLinecap="round"
              filter={isActive ? 'url(#mistake-glow)' : undefined}>
              <line x1="-5" y1="-5" x2="5" y2="5" />
              <line x1="5" y1="-5" x2="-5" y2="5" />
            </g>

            <text y={isActive ? 32 : 28} textAnchor="middle"
              fill={isActive ? '#f1f5f9' : '#64748b'} fontSize={isActive ? 10 : 9}
              fontWeight={isActive ? 600 : 400} style={{ transition: 'all 0.2s' }}>
              {m.label}
            </text>
          </g>
        )
      })}

      {/* haveibeenpwned hint */}
      <text x="200" y="292" textAnchor="middle" fill="#06b6d4" fontSize="9" opacity="0.7">
        Провери в haveibeenpwned.com
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
      </text>
    </svg>
  )
}
