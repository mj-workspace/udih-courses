import { useState } from 'react'

const layers = [
  { label: 'Политики и обучение', color: '#3b82f6', r: 140, desc: 'Най-външен слой — хората' },
  { label: 'Мрежова сигурност', color: '#8b5cf6', r: 110, desc: 'Firewalls, IDS/IPS' },
  { label: 'Контрол на достъп', color: '#06b6d4', r: 80, desc: 'Автентикация, привилегии' },
  { label: 'Защита на данни', color: '#10b981', r: 50, desc: 'Криптиране, бекъпи' },
]

export default function DefenseInDepth() {
  const [active, setActive] = useState(null)

  return (
    <svg viewBox="0 0 400 340" className="w-full h-full">
      <defs>
        {layers.map((l, i) => (
          <radialGradient key={i} id={`defense-${i}`}>
            <stop offset="0%" stopColor={l.color} stopOpacity="0" />
            <stop offset="80%" stopColor={l.color} stopOpacity={active === i ? 0.15 : 0.06} />
            <stop offset="100%" stopColor={l.color} stopOpacity={active === i ? 0.25 : 0.1} />
          </radialGradient>
        ))}
        <filter id="shield-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Rotating outer decorative rings */}
      <circle cx="200" cy="160" r="158" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 8">
        <animateTransform attributeName="transform" type="rotate" from="0 200 160" to="360 200 160" dur="40s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="160" r="152" fill="none" stroke="#1e293b" strokeWidth="0.3" strokeDasharray="1 12">
        <animateTransform attributeName="transform" type="rotate" from="360 200 160" to="0 200 160" dur="30s" repeatCount="indefinite" />
      </circle>

      {/* Layers */}
      {layers.map((l, i) => {
        const isActive = active === i
        return (
          <g key={i}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">

            {/* Main ring */}
            <circle cx="200" cy="160" r={l.r}
              fill={`url(#defense-${i})`}
              stroke={l.color}
              strokeWidth={isActive ? 2 : 1}
              opacity={isActive ? 1 : 0.7}
              style={{ transition: 'all 0.3s' }}>
              {/* Breathing animation */}
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.4;0.9;0.4" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
              )}
            </circle>

            {/* Rotating dash ring (always on, faster when active) */}
            <circle cx="200" cy="160" r={l.r + 4}
              fill="none" stroke={l.color} strokeWidth="0.8"
              strokeDasharray="4 8" opacity={isActive ? 0.6 : 0.2}>
              <animateTransform attributeName="transform" type="rotate"
                from={`0 200 160`} to={`${i % 2 === 0 ? 360 : -360} 200 160`}
                dur={isActive ? '4s' : `${12 + i * 2}s`} repeatCount="indefinite" />
            </circle>

            {/* Orbiting dot on ring */}
            <circle r="3" fill={l.color} opacity="0.5" filter={isActive ? 'url(#shield-glow)' : undefined}>
              <animateMotion dur={`${5 + i * 1.5}s`} repeatCount="indefinite"
                path={`M${200 + l.r},160 A${l.r},${l.r} 0 1,1 ${200 + l.r - 0.01},160`} />
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${5 + i * 1.5}s`} repeatCount="indefinite" />
            </circle>

            {/* Label on the ring */}
            <text x="200" y={160 - l.r + 16} textAnchor="middle"
              fill={isActive ? '#f1f5f9' : '#94a3b8'}
              fontSize={isActive ? 12 : 10}
              fontWeight={isActive ? 600 : 400}
              style={{ transition: 'all 0.3s' }}>
              {l.label}
            </text>
          </g>
        )
      })}

      {/* Center shield with glow */}
      <g transform="translate(200, 160)">
        {/* Shield pulse */}
        <path d="M0-28 L22-14 L22 10 C22 24 0 36 0 36 C0 36 -22 24 -22 10 L-22-14Z"
          fill="none" stroke={active !== null ? layers[active].color : '#3b82f6'}
          strokeWidth="0.5" opacity="0">
          <animate attributeName="opacity" values="0;0.4;0" dur="2.5s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="scale" values="1;1.15;1" dur="2.5s" repeatCount="indefinite" />
        </path>

        <path d="M0-24 L18-12 L18 8 C18 20 0 30 0 30 C0 30 -18 20 -18 8 L-18-12Z"
          fill="#0f172a"
          stroke={active !== null ? layers[active].color : '#64748b'}
          strokeWidth="2"
          filter="url(#shield-glow)"
          style={{ transition: 'stroke 0.3s' }} />
        <path d="M-6 2 L-2 8 L8-6" fill="none"
          stroke={active !== null ? layers[active].color : '#64748b'}
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: 'stroke 0.3s' }}>
          <animate attributeName="stroke-opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
        </path>
      </g>

      {/* Description tooltip */}
      {active !== null && (
        <text x="200" y="320" textAnchor="middle" fill={layers[active].color} fontSize="12" fontWeight="500">
          {layers[active].desc}
        </text>
      )}

      {/* Scanning line */}
      <line x1="60" y1="160" x2="340" y2="160"
        stroke="#3b82f6" strokeWidth="0.5" opacity="0">
        <animate attributeName="y1" from="20" to="300" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" from="20" to="300" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.2;0.2;0" dur="4s" repeatCount="indefinite" />
      </line>
    </svg>
  )
}
