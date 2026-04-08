import { useState } from 'react'

const rules = [
  { num: 1, short: 'Пароли', color: '#3b82f6' },
  { num: 2, short: '2FA', color: '#8b5cf6' },
  { num: 3, short: 'Линкове', color: '#ef4444' },
  { num: 4, short: 'Ъпдейти', color: '#06b6d4' },
  { num: 5, short: 'VPN', color: '#10b981' },
  { num: 6, short: 'Данни', color: '#f59e0b' },
  { num: 7, short: 'Backup', color: '#ec4899' },
  { num: 8, short: 'Докладвай', color: '#ef4444' },
  { num: 9, short: 'Политики', color: '#3b82f6' },
  { num: 10, short: 'Скептицизъм', color: '#f59e0b' },
]

export default function TopTenRules() {
  const [active, setActive] = useState(null)
  const cx = 200, cy = 150

  return (
    <svg viewBox="0 0 400 310" className="w-full h-full">
      <defs>
        <filter id="top-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Outer decorative ring */}
      <circle cx={cx} cy={cy} r="135" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 6">
        <animateTransform attributeName="transform" type="rotate" from="0 200 150" to="360 200 150" dur="50s" repeatCount="indefinite" />
      </circle>

      {/* Inner ring connecting all rules */}
      <circle cx={cx} cy={cy} r="105" fill="none" stroke="#1e293b" strokeWidth="6" strokeDasharray="10 5">
        <animate attributeName="stroke-dashoffset" from="15" to="0" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* Traveling particles around the ring */}
      {[0,1,2].map(i => (
        <circle key={`p-${i}`} r="3" fill={rules[i * 3].color} opacity="0.5" filter="url(#top-glow)">
          <animateMotion dur={`${8 + i * 2}s`} begin={`${i * 2}s`} repeatCount="indefinite"
            path={`M${cx + 105},${cy} A105,105 0 1,1 ${cx + 104.99},${cy}`} />
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${8 + i * 2}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* Center */}
      <g transform={`translate(${cx}, ${cy})`}>
        <circle r="32" fill="#0f172a" stroke="#f59e0b" strokeWidth="2">
          <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="38" fill="none" stroke="#f59e0b" strokeWidth="0.5" opacity="0">
          <animate attributeName="r" from="32" to="46" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.3" to="0" dur="3s" repeatCount="indefinite" />
        </circle>
        <text textAnchor="middle" y="-5" fill="#f59e0b" fontSize="18" fontWeight="800">TOP</text>
        <text textAnchor="middle" y="12" fill="#f59e0b" fontSize="18" fontWeight="800">10</text>
      </g>

      {/* Rule nodes */}
      {rules.map((r, i) => {
        const angle = (i * 36 - 90) * Math.PI / 180
        const px = cx + 105 * Math.cos(angle)
        const py = cy + 105 * Math.sin(angle)
        const isActive = active === i
        return (
          <g key={i} transform={`translate(${px}, ${py})`}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer">

            <circle r="14" fill="none" stroke={r.color} strokeWidth="0.5" opacity="0">
              <animate attributeName="r" from="12" to="22" dur={`${2.5 + i * 0.15}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.3" to="0" dur={`${2.5 + i * 0.15}s`} repeatCount="indefinite" />
            </circle>

            {isActive && (
              <circle r="20" fill="none" stroke={r.color} strokeWidth="1.5">
                <animate attributeName="r" from="18" to="26" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="0.8s" repeatCount="indefinite" />
              </circle>
            )}

            <circle r={isActive ? 18 : 14} fill={isActive ? r.color + '25' : '#0f172a'}
              stroke={r.color} strokeWidth={isActive ? 2.5 : 1.5}
              style={{ transition: 'all 0.2s' }}>
              {!isActive && (
                <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur={`${2 + i * 0.2}s`} repeatCount="indefinite" />
              )}
            </circle>

            <text textAnchor="middle" y={-1} dominantBaseline="central"
              fill={r.color} fontSize={isActive ? 14 : 12} fontWeight="700"
              filter={isActive ? 'url(#top-glow)' : undefined}
              style={{ transition: 'font-size 0.2s' }}>
              {r.num}
            </text>

            <text y={isActive ? 30 : 26} textAnchor="middle"
              fill={isActive ? '#f1f5f9' : '#64748b'} fontSize={isActive ? 10 : 8}
              fontWeight={isActive ? 600 : 400} style={{ transition: 'all 0.2s' }}>
              {r.short}
            </text>
          </g>
        )
      })}

      {/* Bottom message */}
      <text x="200" y="295" textAnchor="middle" fill="#94a3b8" fontSize="9">
        90%+ от атаките започват с човешка грешка
        <animate attributeName="fill-opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
      </text>
    </svg>
  )
}
