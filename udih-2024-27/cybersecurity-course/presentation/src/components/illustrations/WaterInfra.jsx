import { useState } from 'react'

const nodes = [
  { id: 'hq', label: 'Централен офис', x: 200, y: 50, icon: 'building', color: '#3b82f6' },
  { id: 'pump1', label: 'Помпена станция', x: 60, y: 140, icon: 'pump', color: '#06b6d4' },
  { id: 'iot', label: 'IoT сензори', x: 340, y: 140, icon: 'sensor', color: '#10b981' },
  { id: 'remote', label: 'Дистанционен достъп', x: 100, y: 250, icon: 'laptop', color: '#f59e0b' },
  { id: 'cloud', label: 'Cloud мониторинг', x: 300, y: 250, icon: 'cloud', color: '#8b5cf6' },
]

const connections = [
  ['hq', 'pump1'], ['hq', 'iot'], ['hq', 'remote'], ['hq', 'cloud'],
  ['pump1', 'remote'], ['iot', 'cloud'],
]

const icons = {
  building: <><rect x="-8" y="-10" width="16" height="18" rx="1" strokeWidth="1.5" /><line x1="-4" y1="-5" x2="-4" y2="-2" strokeWidth="1" /><line x1="0" y1="-5" x2="0" y2="-2" strokeWidth="1" /><line x1="4" y1="-5" x2="4" y2="-2" strokeWidth="1" /><line x1="-4" y1="1" x2="-4" y2="4" strokeWidth="1" /><line x1="0" y1="1" x2="0" y2="4" strokeWidth="1" /><line x1="4" y1="1" x2="4" y2="4" strokeWidth="1" /></>,
  pump: <><circle r="8" strokeWidth="1.5" fill="none" /><path d="M-4-2 L0-6 L4-2 M0-6 V6" strokeWidth="1.5" /></>,
  sensor: <><circle r="3" /><circle r="6" fill="none" strokeWidth="1" strokeDasharray="2 2" /><circle r="9" fill="none" strokeWidth="0.5" strokeDasharray="2 3" /></>,
  laptop: <><rect x="-9" y="-7" width="18" height="12" rx="1" strokeWidth="1.5" fill="none" /><line x1="-12" y1="7" x2="12" y2="7" strokeWidth="1.5" strokeLinecap="round" /></>,
  cloud: <><path d="M-8 4 A6 6 0 0 1 -6-4 A8 8 0 0 1 8-2 A5 5 0 0 1 8 4Z" strokeWidth="1.5" fill="none" /></>,
}

const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))

export default function WaterInfra() {
  const [active, setActive] = useState(null)

  return (
    <svg viewBox="0 0 400 320" className="w-full h-full">
      <defs>
        <filter id="infra-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background hex grid */}
      <g stroke="#1e293b" strokeWidth="0.3" opacity="0.3">
        {[0,1,2,3,4,5,6,7].map(i =>
          [0,1,2,3,4,5].map(j => (
            <circle key={`bg-${i}-${j}`} cx={i * 55 + (j % 2 ? 27 : 0)} cy={j * 55 + 20} r="20" fill="none" />
          ))
        )}
      </g>

      {/* Connections with animated particles */}
      {connections.map(([from, to], i) => {
        const a = nodeMap[from], b = nodeMap[to]
        const isHighlight = active === from || active === to
        return (
          <g key={i}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={isHighlight ? '#60a5fa' : '#1e293b'}
              strokeWidth={isHighlight ? 1.5 : 0.8}
              strokeDasharray={isHighlight ? 'none' : '4 4'}
              style={{ transition: 'all 0.3s' }}>
              <animate attributeName="stroke-dashoffset" from="8" to="0" dur="2s" repeatCount="indefinite" />
            </line>

            {/* Data packet A→B */}
            <circle r="2.5" fill={nodeMap[from].color} opacity="0.6" filter="url(#infra-glow)">
              <animateMotion dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite"
                path={`M${a.x},${a.y} L${b.x},${b.y}`} />
              <animate attributeName="opacity" values="0;0.7;0" dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" />
            </circle>
            {/* Data packet B→A (slower) */}
            <circle r="2" fill={nodeMap[to].color} opacity="0.4">
              <animateMotion dur={`${3.5 + i * 0.4}s`} repeatCount="indefinite"
                path={`M${b.x},${b.y} L${a.x},${a.y}`} />
              <animate attributeName="opacity" values="0;0.5;0" dur={`${3.5 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          </g>
        )
      })}

      {/* Nodes */}
      {nodes.map((n, i) => {
        const isActive = active === n.id
        return (
          <g key={n.id} transform={`translate(${n.x}, ${n.y})`}
            onMouseEnter={() => setActive(n.id)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">

            {/* Always-on pulse ring */}
            <circle r="18" fill="none" stroke={n.color} strokeWidth="0.5" opacity="0">
              <animate attributeName="r" from="18" to="30" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.4" to="0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>

            {/* Orbiting dot */}
            <circle r="2" fill={n.color} opacity="0.4">
              <animateMotion dur={`${4 + i}s`} repeatCount="indefinite"
                path="M18,0 A18,18 0 1,1 17.99,0" />
            </circle>

            {/* Hover pulse */}
            {isActive && (
              <circle r="22" fill="none" stroke={n.color} strokeWidth="1">
                <animate attributeName="r" from="22" to="32" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="1.2s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Background circle */}
            <circle r={isActive ? 22 : 18}
              fill={isActive ? n.color + '20' : '#111827'}
              stroke={n.color}
              strokeWidth={isActive ? 2 : 1}
              style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
              )}
            </circle>

            {/* Icon */}
            <g fill="none" stroke={n.color}
              filter={isActive ? 'url(#infra-glow)' : undefined}
              style={{ transition: 'stroke 0.2s' }}>
              {icons[n.icon]}
            </g>

            {/* Label */}
            <text y={isActive ? 36 : 32} textAnchor="middle"
              fill={isActive ? '#f1f5f9' : '#64748b'}
              fontSize={isActive ? 11 : 10}
              fontWeight={isActive ? 600 : 400}
              style={{ transition: 'all 0.2s' }}>
              {n.label}
            </text>
          </g>
        )
      })}

      {/* Status text */}
      <g transform="translate(200, 308)">
        <text textAnchor="middle" fill="#475569" fontSize="10">
          24/7 свързаност · критична инфраструктура
          <animate attributeName="fill-opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
        </text>
      </g>
    </svg>
  )
}
