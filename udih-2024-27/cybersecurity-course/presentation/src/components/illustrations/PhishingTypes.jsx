import { useState } from 'react'

const types = [
  { id: 'email', label: 'Email Phishing', color: '#ef4444', x: 80, y: 70,
    icon: 'M-10-6 H10 V8 H-10Z M-10-6 L0 2 L10-6' },
  { id: 'spear', label: 'Spear Phishing', color: '#f59e0b', x: 320, y: 70,
    icon: 'M0-10 L3-3 L10-3 L4 2 L6 10 L0 5 L-6 10 L-4 2 L-10-3 L-3-3Z' },
  { id: 'smishing', label: 'Smishing (SMS)', color: '#8b5cf6', x: 80, y: 210,
    icon: 'M-6-10 H6 A2 2 0 0 1 8-8 V8 A2 2 0 0 1 6 10 H-6 A2 2 0 0 1 -8 8 V-8 A2 2 0 0 1 -6-10 M-4 6 H4' },
  { id: 'vishing', label: 'Vishing (Voice)', color: '#06b6d4', x: 320, y: 210,
    icon: 'M-8 4 C-8-6 -2-12 4-8 M4-8 L10-2 L6 4 C4 6 2 8 -2 8 L-8 4' },
]

export default function PhishingTypes() {
  const [active, setActive] = useState(null)

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <filter id="phish-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background waves */}
      <path d="M0 280 Q100 260 200 280 Q300 300 400 280" fill="none" stroke="#1e293b" strokeWidth="0.5" opacity="0.3">
        <animate attributeName="d" values="M0 280 Q100 260 200 280 Q300 300 400 280;M0 280 Q100 300 200 280 Q300 260 400 280;M0 280 Q100 260 200 280 Q300 300 400 280" dur="6s" repeatCount="indefinite" />
      </path>
      <path d="M0 285 Q100 270 200 285 Q300 300 400 285" fill="none" stroke="#1e293b" strokeWidth="0.3" opacity="0.2">
        <animate attributeName="d" values="M0 285 Q100 300 200 285 Q300 270 400 285;M0 285 Q100 270 200 285 Q300 300 400 285;M0 285 Q100 300 200 285 Q300 270 400 285" dur="8s" repeatCount="indefinite" />
      </path>

      {/* Center hook */}
      <g transform="translate(200, 140)">
        {/* Fishing line */}
        <line x1="0" y1="-100" x2="0" y2="-30" stroke="#475569" strokeWidth="1" strokeDasharray="3 3">
          <animate attributeName="y2" values="-30;-25;-30" dur="3s" repeatCount="indefinite" />
        </line>
        {/* Hook */}
        <g>
          <animate attributeName="transform" values="translate(0,0);translate(0,5);translate(0,0)" dur="3s" repeatCount="indefinite" />
          <path d="M0-30 V-10 C0 5 -12 5 -12-5" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="-12" cy="-5" r="2" fill="#ef4444" />
        </g>
        {/* Bait - @ symbol */}
        <text x="6" y="-12" fill="#ef4444" fontSize="16" fontWeight="bold" opacity="0.8">
          @
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </text>

        {/* Ripples */}
        <ellipse cx="0" cy="10" rx="20" ry="4" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0">
          <animate attributeName="rx" from="10" to="50" dur="3s" repeatCount="indefinite" />
          <animate attributeName="ry" from="2" to="8" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.4" to="0" dur="3s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="0" cy="10" rx="20" ry="4" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0">
          <animate attributeName="rx" from="10" to="50" dur="3s" begin="1.5s" repeatCount="indefinite" />
          <animate attributeName="ry" from="2" to="8" dur="3s" begin="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.3" to="0" dur="3s" begin="1.5s" repeatCount="indefinite" />
        </ellipse>
      </g>

      {/* Connection lines from center to types */}
      {types.map((t, i) => (
        <g key={`line-${i}`}>
          <line x1="200" y1="140" x2={t.x} y2={t.y}
            stroke={active === t.id ? t.color : '#1e293b'} strokeWidth="0.8"
            strokeDasharray="4 4" opacity={active === t.id ? 0.7 : 0.2}
            style={{ transition: 'all 0.3s' }}>
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1.5s" repeatCount="indefinite" />
          </line>
          <circle r="2" fill={t.color} opacity="0.5">
            <animateMotion dur={`${3 + i * 0.5}s`} repeatCount="indefinite"
              path={`M${t.x},${t.y} L200,140`} />
            <animate attributeName="opacity" values="0;0.6;0" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Type nodes */}
      {types.map((t, i) => {
        const isActive = active === t.id
        return (
          <g key={t.id} transform={`translate(${t.x}, ${t.y})`}
            onMouseEnter={() => setActive(t.id)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">

            <circle r="22" fill="none" stroke={t.color} strokeWidth="0.5" opacity="0">
              <animate attributeName="r" from="22" to="34" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>

            <circle r="2" fill={t.color} opacity="0.4">
              <animateMotion dur={`${4 + i}s`} repeatCount="indefinite"
                path="M24,0 A24,24 0 1,1 23.99,0" />
            </circle>

            {isActive && (
              <circle r="28" fill="none" stroke={t.color} strokeWidth="1">
                <animate attributeName="r" from="26" to="36" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1s" repeatCount="indefinite" />
              </circle>
            )}

            <circle r={isActive ? 26 : 22}
              fill={isActive ? t.color + '20' : '#111827'}
              stroke={t.color} strokeWidth={isActive ? 2 : 1}
              style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
              )}
            </circle>

            <path d={t.icon} fill="none" stroke={t.color} strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" transform="scale(0.75)"
              filter={isActive ? 'url(#phish-glow)' : undefined} />

            <text y={isActive ? 42 : 38} textAnchor="middle"
              fill={isActive ? '#f1f5f9' : '#64748b'} fontSize={isActive ? 11 : 10}
              fontWeight={isActive ? 600 : 400} style={{ transition: 'all 0.2s' }}>
              {t.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
