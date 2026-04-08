import { useState } from 'react'

const levels = [
  { label: '6 символа, малки', time: 'секунди', width: 15, color: '#ef4444' },
  { label: '8 символа, смесени', time: 'часове', width: 35, color: '#f59e0b' },
  { label: '10 символа, смесени', time: 'месеци', width: 55, color: '#eab308' },
  { label: '12+ символа, смесени', time: 'столетия', width: 85, color: '#10b981' },
  { label: 'Passphrase 4+ думи', time: '∞', width: 98, color: '#3b82f6' },
]

export default function PasswordStrength() {
  const [active, setActive] = useState(null)

  return (
    <svg viewBox="0 0 400 310" className="w-full h-full">
      <defs>
        <filter id="pw-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="bar-bg">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>

      {/* Title */}
      <text x="200" y="24" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="500"
        letterSpacing="0.08em">ВРЕМЕ ЗА РАЗБИВАНЕ</text>

      {/* Lock icon top */}
      <g transform="translate(200, 55)">
        <rect x="-12" y="-3" width="24" height="18" rx="3" fill="none"
          stroke={active !== null ? levels[active].color : '#475569'} strokeWidth="2"
          style={{ transition: 'stroke 0.3s' }}>
          <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
        </rect>
        <path d="M-7,-3 V-12 A7,7 0 0,1 7,-12 V-3" fill="none"
          stroke={active !== null ? levels[active].color : '#475569'} strokeWidth="2"
          strokeLinecap="round" style={{ transition: 'stroke 0.3s' }} />
        <circle cy="7" r="3"
          fill={active !== null ? levels[active].color : '#475569'}
          style={{ transition: 'fill 0.3s' }}>
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Strength bars */}
      {levels.map((l, i) => {
        const y = 95 + i * 42
        const isActive = active === i
        return (
          <g key={i}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">

            {/* Label */}
            <text x="20" y={y - 6} fill={isActive ? '#f1f5f9' : '#94a3b8'}
              fontSize={isActive ? 11 : 10} fontWeight={isActive ? 600 : 400}
              style={{ transition: 'all 0.2s' }}>
              {l.label}
            </text>

            {/* Bar background */}
            <rect x="20" y={y} width="280" height="16" rx="8" fill="url(#bar-bg)"
              stroke="#1e293b" strokeWidth="0.5" />

            {/* Bar fill */}
            <rect x="20" y={y} width={280 * l.width / 100} height="16" rx="8"
              fill={l.color} opacity={isActive ? 0.35 : 0.2}
              style={{ transition: 'opacity 0.3s' }}>
              <animate attributeName="width" from="0" to={280 * l.width / 100}
                dur="1.5s" begin={`${i * 0.2}s`} fill="freeze" />
            </rect>

            {/* Animated fill shimmer */}
            <rect x="20" y={y} width={280 * l.width / 100} height="16" rx="8"
              fill={l.color} opacity="0">
              <animate attributeName="opacity" values="0;0.15;0" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
            </rect>

            {/* Scanning dot on active */}
            {isActive && (
              <circle cy={y + 8} r="3" fill={l.color} filter="url(#pw-glow)">
                <animate attributeName="cx" from="20" to={20 + 280 * l.width / 100}
                  dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Time label */}
            <text x={20 + 280 * l.width / 100 + 10} y={y + 12}
              fill={isActive ? l.color : '#64748b'}
              fontSize={isActive ? 12 : 10} fontWeight={isActive ? 700 : 500}
              filter={isActive ? 'url(#pw-glow)' : undefined}
              style={{ transition: 'all 0.2s' }}>
              {l.time}
            </text>
          </g>
        )
      })}

      {/* Bottom message */}
      <text x="200" y="300" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="500">
        Дължината бие сложността!
        <animate attributeName="fill-opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
      </text>
    </svg>
  )
}
