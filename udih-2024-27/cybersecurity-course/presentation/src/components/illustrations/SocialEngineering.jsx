import { useState } from 'react'

const tactics = [
  { id: 'pretexting', label: 'Pretexting', color: '#ef4444', angle: 0 },
  { id: 'baiting', label: 'Baiting', color: '#f59e0b', angle: 72 },
  { id: 'quidpro', label: 'Quid pro quo', color: '#8b5cf6', angle: 144 },
  { id: 'tailgating', label: 'Tailgating', color: '#06b6d4', angle: 216 },
  { id: 'bec', label: 'BEC', color: '#ec4899', angle: 288 },
]

const redFlags = [
  { text: 'Спешност', y: 20 },
  { text: 'Прекалено добра оферта', y: 45 },
  { text: 'Искане на пари', y: 70 },
  { text: 'Непознат контакт', y: 95 },
]

export default function SocialEngineering() {
  const [active, setActive] = useState(null)
  const cx = 200, cy = 145, r = 100

  return (
    <svg viewBox="0 0 400 310" className="w-full h-full">
      <defs>
        <filter id="se-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Rotating rings */}
      <circle cx={cx} cy={cy} r={r + 30} fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3 8">
        <animateTransform attributeName="transform" type="rotate" from="0 200 145" to="360 200 145" dur="35s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r={r + 20} fill="none" stroke="#1e293b" strokeWidth="0.3" strokeDasharray="2 10">
        <animateTransform attributeName="transform" type="rotate" from="360 200 145" to="0 200 145" dur="25s" repeatCount="indefinite" />
      </circle>

      {/* Connections and particles */}
      {tactics.map((t, i) => {
        const rad = (t.angle - 90) * Math.PI / 180
        const tx = cx + r * Math.cos(rad)
        const ty = cy + r * Math.sin(rad)
        return (
          <g key={`conn-${i}`}>
            <line x1={cx} y1={cy} x2={tx} y2={ty}
              stroke={active === t.id ? t.color : '#1e293b'} strokeWidth="0.8"
              strokeDasharray="3 4" opacity={active === t.id ? 0.7 : 0.2}
              style={{ transition: 'all 0.3s' }}>
              <animate attributeName="stroke-dashoffset" from="7" to="0" dur="1.5s" repeatCount="indefinite" />
            </line>
            <circle r="2" fill={t.color} opacity="0">
              <animateMotion dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite"
                path={`M${tx},${ty} L${cx},${cy}`} />
              <animate attributeName="opacity" values="0;0.6;0" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          </g>
        )
      })}

      {/* Center: person/target */}
      <g transform={`translate(${cx}, ${cy})`}>
        <circle r="24" fill="#0f172a" stroke="#475569" strokeWidth="1.5">
          <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="30" fill="none" stroke="#ef4444" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" from="24" to="40" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.4" to="0" dur="2.5s" repeatCount="indefinite" />
        </circle>
        {/* Person icon */}
        <circle cx="0" cy="-6" r="6" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        <path d="M-10 14 C-10 4 -6 0 0 0 C6 0 10 4 10 14" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        <text y="28" textAnchor="middle" fill="#64748b" fontSize="9">Жертва</text>
      </g>

      {/* Tactic nodes */}
      {tactics.map((t, i) => {
        const rad = (t.angle - 90) * Math.PI / 180
        const tx = cx + r * Math.cos(rad)
        const ty = cy + r * Math.sin(rad)
        const isActive = active === t.id
        return (
          <g key={t.id} transform={`translate(${tx}, ${ty})`}
            onMouseEnter={() => setActive(t.id)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">

            <circle r="18" fill="none" stroke={t.color} strokeWidth="0.5" opacity="0">
              <animate attributeName="r" from="16" to="28" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>

            <circle r="2" fill={t.color} opacity="0.4">
              <animateMotion dur={`${3 + i * 0.5}s`} repeatCount="indefinite"
                path="M20,0 A20,20 0 1,1 19.99,0" />
            </circle>

            {isActive && (
              <circle r="22" fill="none" stroke={t.color} strokeWidth="1">
                <animate attributeName="r" from="20" to="30" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1s" repeatCount="indefinite" />
              </circle>
            )}

            <circle r={isActive ? 20 : 16}
              fill={isActive ? t.color + '20' : '#111827'}
              stroke={t.color} strokeWidth={isActive ? 2 : 1}
              style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              )}
            </circle>

            <text y="1" textAnchor="middle" dominantBaseline="central"
              fill={t.color} fontSize="12" fontWeight="bold">
              {t.label.charAt(0)}
            </text>

            <text y={isActive ? 32 : 28} textAnchor="middle"
              fill={isActive ? '#f1f5f9' : '#64748b'} fontSize={isActive ? 10 : 9}
              fontWeight={isActive ? 600 : 400} style={{ transition: 'all 0.2s' }}>
              {t.label}
            </text>
          </g>
        )
      })}

      {/* Red flags - bottom */}
      <g transform="translate(200, 265)">
        <text textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="600" letterSpacing="0.1em">
          ЧЕРВЕНИ ФЛАГОВЕ
          <animate attributeName="fill-opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </text>
      </g>
      {redFlags.map((f, i) => (
        <g key={i} transform={`translate(${85 + i * 80}, 285)`}>
          <text textAnchor="middle" fill="#94a3b8" fontSize="8">
            {f.text}
          </text>
          <circle cx="0" cy="-8" r="3" fill="none" stroke="#ef4444" strokeWidth="0.8" opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          <text x="0" y="-5.5" textAnchor="middle" fill="#ef4444" fontSize="5" fontWeight="bold">!</text>
        </g>
      ))}
    </svg>
  )
}
