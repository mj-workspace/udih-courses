import { useState } from 'react'

const categories = [
  { id: 'basic', label: 'Основни', items: 'Име · ЕГН · Адрес · Телефон', color: '#3b82f6', x: 105, y: 60 },
  { id: 'digital', label: 'Дигитални', items: 'IP · Cookies · Локация', color: '#8b5cf6', x: 295, y: 60 },
  { id: 'sensitive', label: 'Чувствителни', items: 'Здравни · Биометрични', color: '#ef4444', x: 80, y: 185 },
  { id: 'financial', label: 'Финансови', items: 'Сметки · Заплати', color: '#f59e0b', x: 320, y: 185 },
]

export default function PersonalData() {
  const [active, setActive] = useState(null)

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <filter id="pd-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Rotating rings */}
      <circle cx="200" cy="130" r="120" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3 8">
        <animateTransform attributeName="transform" type="rotate" from="0 200 130" to="360 200 130" dur="35s" repeatCount="indefinite" />
      </circle>

      {/* Center person */}
      <g transform="translate(200, 130)">
        <circle r="30" fill="#0f172a" stroke="#475569" strokeWidth="1.5">
          <animate attributeName="stroke-opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="36" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" from="30" to="45" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.3" to="0" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Person icon */}
        <circle cx="0" cy="-8" r="8" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        <path d="M-13 18 C-13 6 -7-1 0-1 C7-1 13 6 13 18" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        <text y="30" textAnchor="middle" fill="#64748b" fontSize="8">Физическо лице</text>
      </g>

      {/* Connections + particles */}
      {categories.map((c, i) => (
        <g key={`conn-${i}`}>
          <line x1="200" y1="130" x2={c.x} y2={c.y}
            stroke={active === c.id ? c.color : '#1e293b'} strokeWidth="0.8"
            strokeDasharray="3 5" opacity={active === c.id ? 0.6 : 0.2}
            style={{ transition: 'all 0.3s' }}>
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="2s" repeatCount="indefinite" />
          </line>
          <circle r="2" fill={c.color} opacity="0">
            <animateMotion dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite"
              path={`M${c.x},${c.y} L200,130`} />
            <animate attributeName="opacity" values="0;0.6;0" dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Category nodes */}
      {categories.map((c, i) => {
        const isActive = active === c.id
        return (
          <g key={c.id} transform={`translate(${c.x}, ${c.y})`}
            onMouseEnter={() => setActive(c.id)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">

            <circle r="24" fill="none" stroke={c.color} strokeWidth="0.5" opacity="0">
              <animate attributeName="r" from="22" to="35" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <circle r="2" fill={c.color} opacity="0.4">
              <animateMotion dur={`${3.5 + i * 0.5}s`} repeatCount="indefinite"
                path="M24,0 A24,24 0 1,1 23.99,0" />
            </circle>

            {isActive && (
              <circle r="28" fill="none" stroke={c.color} strokeWidth="1">
                <animate attributeName="r" from="26" to="36" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1s" repeatCount="indefinite" />
              </circle>
            )}

            <circle r={isActive ? 26 : 22}
              fill={isActive ? c.color + '15' : '#111827'}
              stroke={c.color} strokeWidth={isActive ? 2 : 1}
              style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              )}
            </circle>

            {/* Data icon */}
            <rect x="-7" y="-8" width="14" height="16" rx="2" fill="none" stroke={c.color} strokeWidth="1.3" />
            <line x1="-4" y1="-3" x2="4" y2="-3" stroke={c.color} strokeWidth="0.8" />
            <line x1="-4" y1="0" x2="4" y2="0" stroke={c.color} strokeWidth="0.8" />
            <line x1="-4" y1="3" x2="2" y2="3" stroke={c.color} strokeWidth="0.8" />

            <text y={isActive ? 40 : 36} textAnchor="middle"
              fill={isActive ? '#f1f5f9' : '#94a3b8'} fontSize="10" fontWeight={isActive ? 600 : 400}
              style={{ transition: 'all 0.2s' }}>
              {c.label}
            </text>
            {isActive && (
              <text y="52" textAnchor="middle" fill={c.color} fontSize="8">{c.items}</text>
            )}
          </g>
        )
      })}

      {/* GDPR badge */}
      <g transform="translate(200, 270)">
        <rect x="-30" y="-10" width="60" height="20" rx="10" fill="#111827" stroke="#3b82f6" strokeWidth="0.8">
          <animate attributeName="stroke-opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
        </rect>
        <text textAnchor="middle" dominantBaseline="central" fill="#3b82f6" fontSize="10" fontWeight="600">GDPR</text>
      </g>
    </svg>
  )
}
