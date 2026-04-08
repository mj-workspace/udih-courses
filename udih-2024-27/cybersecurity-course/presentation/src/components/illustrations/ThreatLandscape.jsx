import { useState } from 'react'

const threats = [
  { icon: 'malware', label: 'Malware', color: '#ef4444', x: 60, y: 60,
    path: 'M0-12 L4-4 12-4 6 2 8 10 0 6 -8 10 -6 2 -12-4 -4-4Z' },
  { icon: 'phishing', label: 'Phishing', color: '#f59e0b', x: 200, y: 50,
    path: 'M-10 4 L-6-8 H6 L10 4 H6 L4 10 H-4 L-6 10Z' },
  { icon: 'ddos', label: 'DDoS', color: '#8b5cf6', x: 340, y: 60,
    path: 'M0-12 A12 12 0 1 1 -0.01-12 M0-6 A6 6 0 1 0 0.01-6' },
  { icon: 'mitm', label: 'MitM', color: '#06b6d4', x: 100, y: 180,
    path: 'M-12 0 H-4 M4 0 H12 M-4-6 V6 H4 V-6Z' },
  { icon: 'sqli', label: 'SQL Injection', color: '#10b981', x: 200, y: 200,
    path: 'M-8-10 H8 V-4 H-4 V2 H4 V10 H-8 V4 H4 V-2 H-4Z' },
  { icon: 'social', label: 'Social Eng.', color: '#ec4899', x: 300, y: 180,
    path: 'M0-10 A5 5 0 1 1 0-0.1 M-8 10 A10 8 0 0 1 8 10' },
]

export default function ThreatLandscape() {
  const [active, setActive] = useState(null)

  return (
    <svg viewBox="0 0 400 280" className="w-full h-full">
      <defs>
        <filter id="threat-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="radar-grad">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background grid with pulse */}
      <g stroke="#1e293b" strokeWidth="0.5" opacity="0.4">
        {[0,1,2,3,4,5,6,7,8].map(i => (
          <line key={`v${i}`} x1={i*50} y1="0" x2={i*50} y2="280" />
        ))}
        {[0,1,2,3,4,5].map(i => (
          <line key={`h${i}`} x1="0" y1={i*50} x2="400" y2={i*50} />
        ))}
      </g>

      {/* Radar sweep from center */}
      <g transform="translate(200, 130)">
        <circle r="140" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 4" />
        <circle r="90" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 4" />
        <circle r="45" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 4" />
        {/* Radar sweep */}
        <path d="M0,0 L0,-140 A140,140 0 0,1 99,-99 Z" fill="url(#radar-grad)">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
        </path>
        {/* Sweep line */}
        <line x1="0" y1="0" x2="0" y2="-140" stroke="#ef4444" strokeWidth="0.5" opacity="0.4">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Animated connection lines */}
      {threats.map((t, i) => (
        <g key={`line-${i}`}>
          <line x1="200" y1="130" x2={t.x} y2={t.y}
            stroke={active === t.icon ? t.color : '#1e293b'}
            strokeWidth={active === t.icon ? 1.5 : 0.5}
            strokeDasharray="3 3"
            opacity={active === t.icon ? 0.8 : 0.3}
            style={{ transition: 'all 0.3s' }}>
            <animate attributeName="stroke-dashoffset" from="6" to="0" dur="1.5s" repeatCount="indefinite" />
          </line>
          {/* Particle traveling to center */}
          <circle r="2" fill={t.color} opacity="0.6">
            <animateMotion dur={`${3 + i * 0.7}s`} repeatCount="indefinite"
              path={`M${t.x},${t.y} L200,130`} />
            <animate attributeName="opacity" values="0;0.7;0" dur={`${3 + i * 0.7}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Center target with animated rings */}
      <g transform="translate(200, 130)">
        <circle r="18" fill="none" stroke="#ef4444" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" from="10" to="30" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle r="18" fill="none" stroke="#ef4444" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" from="10" to="30" dur="2s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.4" to="0" dur="2s" begin="1s" repeatCount="indefinite" />
        </circle>
        <circle r="16" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
        <circle r="8" fill="none" stroke="#475569" strokeWidth="0.5" />
        <circle r="2.5" fill="#ef4444">
          <animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="fill-opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <text y="32" textAnchor="middle" fill="#64748b" fontSize="10">Вашата система</text>
      </g>

      {/* Threat nodes */}
      {threats.map((t, i) => {
        const isActive = active === t.icon
        return (
          <g key={t.icon} transform={`translate(${t.x}, ${t.y})`}
            onMouseEnter={() => setActive(t.icon)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">

            {/* Always-on subtle pulse */}
            <circle r="20" fill="none" stroke={t.color} strokeWidth="0.5" opacity="0">
              <animate attributeName="r" from="18" to="30" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.4" to="0" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>

            {/* Hover pulse */}
            {isActive && (
              <circle r="24" fill="none" stroke={t.color} strokeWidth="1">
                <animate attributeName="r" from="22" to="34" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="1s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Orbiting dot */}
            <circle r="1.5" fill={t.color} opacity="0.5">
              <animateMotion dur={`${3 + i * 0.5}s`} repeatCount="indefinite"
                path={`M20,0 A20,20 0 1,1 19.99,0`} />
            </circle>

            <circle r={isActive ? 24 : 20}
              fill={isActive ? t.color + '20' : '#111827'}
              stroke={t.color}
              strokeWidth={isActive ? 2 : 1}
              style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" />
              )}
            </circle>

            <path d={t.path} fill="none" stroke={t.color} strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" transform="scale(0.8)"
              filter={isActive ? 'url(#threat-glow)' : undefined} />

            <text y={isActive ? 38 : 34} textAnchor="middle"
              fill={isActive ? '#f1f5f9' : '#64748b'}
              fontSize={isActive ? 11 : 10}
              fontWeight={isActive ? 600 : 400}
              style={{ transition: 'all 0.2s' }}>
              {t.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
