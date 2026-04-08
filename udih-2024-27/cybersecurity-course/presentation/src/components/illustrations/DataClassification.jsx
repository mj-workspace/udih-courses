import { useState } from 'react'

const levels = [
  { id: 'public', label: 'Публични', desc: 'Уебсайт, публични отчети', color: '#10b981', y: 225, w: 300 },
  { id: 'internal', label: 'Вътрешни', desc: 'Правила, процедури', color: '#3b82f6', y: 175, w: 230 },
  { id: 'confidential', label: 'Поверителни', desc: 'Клиентски данни, финанси', color: '#f59e0b', y: 125, w: 160 },
  { id: 'secret', label: 'Строго секретни', desc: 'Пароли, ключове', color: '#ef4444', y: 75, w: 90 },
]

export default function DataClassification() {
  const [active, setActive] = useState(null)

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <filter id="dc-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Pyramid outline */}
      <path d="M200 45 L350 255 H50 Z" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="4 6">
        <animate attributeName="stroke-dashoffset" from="10" to="0" dur="4s" repeatCount="indefinite" />
      </path>

      {/* Scanning line */}
      <line x1="100" y1="150" x2="300" y2="150" stroke="#3b82f6" strokeWidth="0.5" opacity="0">
        <animate attributeName="y1" from="50" to="260" dur="5s" repeatCount="indefinite" />
        <animate attributeName="y2" from="50" to="260" dur="5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.2;0.2;0" dur="5s" repeatCount="indefinite" />
      </line>

      {/* Pyramid levels */}
      {levels.map((l, i) => {
        const isActive = active === l.id
        const x = 200 - l.w / 2
        return (
          <g key={l.id}
            onMouseEnter={() => setActive(l.id)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">

            {/* Level bar */}
            <rect x={x} y={l.y} width={l.w} height="38" rx="6"
              fill={isActive ? l.color + '18' : '#111827'}
              stroke={l.color} strokeWidth={isActive ? 2 : 1}
              style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.4;0.8;0.4" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
              )}
            </rect>

            {/* Shimmer */}
            <rect x={x} y={l.y} width={l.w} height="38" rx="6"
              fill={l.color} opacity="0">
              <animate attributeName="opacity" values="0;0.06;0" dur={`${4 + i * 0.5}s`} repeatCount="indefinite" />
            </rect>

            {/* Active glow bar */}
            {isActive && (
              <rect x={x - 2} y={l.y - 2} width={l.w + 4} height="42" rx="8"
                fill="none" stroke={l.color} strokeWidth="0.5" opacity="0">
                <animate attributeName="opacity" from="0.5" to="0" dur="1.2s" repeatCount="indefinite" />
              </rect>
            )}

            {/* Label */}
            <text x="200" y={l.y + 17} textAnchor="middle"
              fill={isActive ? '#f1f5f9' : l.color} fontSize={isActive ? 13 : 12}
              fontWeight="600" style={{ transition: 'all 0.2s' }}>
              {l.label}
            </text>

            {/* Description on hover */}
            <text x="200" y={l.y + 31} textAnchor="middle"
              fill={isActive ? '#94a3b8' : '#475569'} fontSize="9"
              style={{ transition: 'fill 0.2s' }}>
              {l.desc}
            </text>

            {/* Lock icons for higher levels */}
            {i < 2 && (
              <g transform={`translate(${x + 12}, ${l.y + 19})`}>
                <rect x="-4" y="-2" width="8" height="6" rx="1" fill="none" stroke={l.color} strokeWidth="0.8" opacity="0.5" />
                <path d="M-2,-2 V-5 A2,2 0 0,1 2,-5 V-2" fill="none" stroke={l.color} strokeWidth="0.8" opacity="0.5" />
              </g>
            )}
          </g>
        )
      })}

      {/* Arrow on the right */}
      <g transform="translate(365, 150)">
        <line x1="0" y1="90" x2="0" y2="-90" stroke="#475569" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <polygon points="0,-95 -4,-85 4,-85" fill="#475569" />
        <text transform="rotate(-90)" x="0" y="15" textAnchor="middle" fill="#475569" fontSize="8">
          Ниво на защита
        </text>
      </g>

      {/* Bottom text */}
      <text x="200" y="285" textAnchor="middle" fill="#64748b" fontSize="9">
        Криптиране · Контрол на достъп · Backup · Сигурно унищожаване
        <animate attributeName="fill-opacity" values="0.4;0.7;0.4" dur="4s" repeatCount="indefinite" />
      </text>
    </svg>
  )
}
