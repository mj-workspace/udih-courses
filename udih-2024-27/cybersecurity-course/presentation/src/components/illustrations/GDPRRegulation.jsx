import { useState } from 'react'

const principles = [
  { id: 'lawful', label: 'Законосъобразност', color: '#3b82f6', angle: 0 },
  { id: 'purpose', label: 'Целево ограничение', color: '#8b5cf6', angle: 60 },
  { id: 'minimal', label: 'Минимум данни', color: '#06b6d4', angle: 120 },
  { id: 'accurate', label: 'Точност', color: '#10b981', angle: 180 },
  { id: 'storage', label: 'Ограничено съхранение', color: '#f59e0b', angle: 240 },
  { id: 'security', label: 'Сигурност', color: '#ef4444', angle: 300 },
]

export default function GDPRRegulation() {
  const [active, setActive] = useState(null)
  const cx = 200, cy = 140, r = 100

  return (
    <svg viewBox="0 0 400 310" className="w-full h-full">
      <defs>
        <filter id="gdpr-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Rotating rings */}
      <circle cx={cx} cy={cy} r={r + 25} fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3 8">
        <animateTransform attributeName="transform" type="rotate" from="0 200 140" to="360 200 140" dur="40s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r={r + 18} fill="none" stroke="#1e293b" strokeWidth="0.3" strokeDasharray="2 10">
        <animateTransform attributeName="transform" type="rotate" from="360 200 140" to="0 200 140" dur="28s" repeatCount="indefinite" />
      </circle>

      {/* Hex connections */}
      {principles.map((p, i) => {
        const next = principles[(i + 1) % 6]
        const rad1 = (p.angle - 90) * Math.PI / 180
        const rad2 = (next.angle - 90) * Math.PI / 180
        const x1 = cx + r * Math.cos(rad1), y1 = cy + r * Math.sin(rad1)
        const x2 = cx + r * Math.cos(rad2), y2 = cy + r * Math.sin(rad2)
        return (
          <g key={`hex-${i}`}>
            <line x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#1e293b" strokeWidth="0.8" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" from="8" to="0" dur="2s" repeatCount="indefinite" />
            </line>
            <circle r="1.5" fill={p.color} opacity="0.4">
              <animateMotion dur={`${3 + i * 0.3}s`} repeatCount="indefinite"
                path={`M${x1},${y1} L${x2},${y2}`} />
            </circle>
          </g>
        )
      })}

      {/* Radial connections to center */}
      {principles.map((p, i) => {
        const rad = (p.angle - 90) * Math.PI / 180
        const px = cx + r * Math.cos(rad), py = cy + r * Math.sin(rad)
        return (
          <g key={`rad-${i}`}>
            <line x1={cx} y1={cy} x2={px} y2={py}
              stroke={active === p.id ? p.color : '#1e293b'} strokeWidth="0.5"
              strokeDasharray="2 4" opacity={active === p.id ? 0.6 : 0.15}
              style={{ transition: 'all 0.3s' }} />
            <circle r="2" fill={p.color} opacity="0">
              <animateMotion dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite"
                path={`M${px},${py} L${cx},${cy}`} />
              <animate attributeName="opacity" values="0;0.5;0" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          </g>
        )
      })}

      {/* Center EU/GDPR shield */}
      <g transform={`translate(${cx}, ${cy})`}>
        <circle r="28" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.5">
          <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="34" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" from="28" to="42" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.3" to="0" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* EU stars hint */}
        {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
          const a = i * 30 * Math.PI / 180
          return <circle key={i} cx={Math.cos(a) * 18} cy={Math.sin(a) * 18} r="1.2" fill="#f59e0b" opacity="0.6" />
        })}
        <text textAnchor="middle" dominantBaseline="central" fill="#3b82f6" fontSize="14" fontWeight="700">GDPR</text>
      </g>

      {/* Principle nodes */}
      {principles.map((p, i) => {
        const rad = (p.angle - 90) * Math.PI / 180
        const px = cx + r * Math.cos(rad), py = cy + r * Math.sin(rad)
        const isActive = active === p.id
        return (
          <g key={p.id} transform={`translate(${px}, ${py})`}
            onMouseEnter={() => setActive(p.id)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">

            <circle r="16" fill="none" stroke={p.color} strokeWidth="0.5" opacity="0">
              <animate attributeName="r" from="14" to="24" dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>

            {isActive && (
              <circle r="20" fill="none" stroke={p.color} strokeWidth="1">
                <animate attributeName="r" from="18" to="26" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="0.8s" repeatCount="indefinite" />
              </circle>
            )}

            <circle r={isActive ? 18 : 14}
              fill={isActive ? p.color + '20' : '#111827'}
              stroke={p.color} strokeWidth={isActive ? 2 : 1}
              style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.4;0.9;0.4" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              )}
            </circle>

            <text textAnchor="middle" dominantBaseline="central"
              fill={p.color} fontSize="11" fontWeight="bold">
              {(i + 1)}
            </text>

            <text y={isActive ? 30 : 26} textAnchor="middle"
              fill={isActive ? '#f1f5f9' : '#64748b'} fontSize={isActive ? 9 : 8}
              fontWeight={isActive ? 600 : 400} style={{ transition: 'all 0.2s' }}>
              {p.label}
            </text>
          </g>
        )
      })}

      {/* Sanction warning */}
      <text x="200" y="290" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="500">
        Санкция: до €20M или 4% от оборота
        <animate attributeName="fill-opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
      </text>
    </svg>
  )
}
