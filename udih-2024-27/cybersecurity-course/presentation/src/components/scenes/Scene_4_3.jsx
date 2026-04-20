// Scene 4.3 — NIS2 Directive
// Central NIS2 hex emblem surrounded by six essential-entity satellites
// (water highlighted, the sector we're in). Right column: five requirement
// cards stacked, a 24-hour reporting clock, and a "personal management
// responsibility" flag.

import { useEffect, useState } from 'react'

const CX = 320
const CY = 300
const R_ENTITIES = 165

const entities = [
  { id: 'water',    label: 'Водоснабдяване', glyph: 'drop',     angle: -90,  highlight: true  },
  { id: 'energy',   label: 'Енергетика',     glyph: 'bolt',     angle: -30                      },
  { id: 'banking',  label: 'Банки',          glyph: 'bank',     angle:  30                      },
  { id: 'health',   label: 'Здравеопазване', glyph: 'cross',    angle:  90                      },
  { id: 'transport',label: 'Транспорт',      glyph: 'truck',    angle:  150                     },
  { id: 'digital',  label: 'Дигитална инфр.', glyph: 'server',  angle:  210                     },
].map(e => {
  const rad = (e.angle * Math.PI) / 180
  return { ...e, x: CX + R_ENTITIES * Math.cos(rad), y: CY + R_ENTITIES * Math.sin(rad) }
})

const requirements = [
  { num: '1', title: 'Управление на риска',       sub: 'оценка + политики' },
  { num: '2', title: 'Технически мерки',          sub: 'криптиране · MFA · backup' },
  { num: '3', title: 'Докладване на инциденти',   sub: '< 24 часа · ранно известие' },
  { num: '4', title: 'Верига на доставки',        sub: 'сигурност на всеки доставчик' },
  { num: '5', title: 'Отговорност на мениджмънта', sub: 'лично отговорни' },
]

function EntityGlyph({ kind, color }) {
  switch (kind) {
    case 'drop':
      return (
        <g fill={color} stroke={color} strokeWidth="1.2" strokeLinejoin="round">
          <path d="M 0 -11 Q -9 -2 -9 4 Q -9 11 0 11 Q 9 11 9 4 Q 9 -2 0 -11 Z" />
          <path d="M -4 4 Q -4 7 0 7" fill="none" stroke="#0b1220" strokeWidth="1.4" />
        </g>
      )
    case 'bolt':
      return (
        <g fill={color} stroke={color} strokeWidth="1" strokeLinejoin="round">
          <path d="M 2 -12 L -6 1 L 0 1 L -4 12 L 6 -2 L 0 -2 L 4 -12 Z" />
        </g>
      )
    case 'bank':
      return (
        <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 0 -11 L 13 -4 H -13 Z" />
          <line x1="-11" y1="10" x2="11" y2="10" />
          <line x1="-8" y1="-4" x2="-8" y2="9" />
          <line x1="0" y1="-4" x2="0" y2="9" />
          <line x1="8" y1="-4" x2="8" y2="9" />
        </g>
      )
    case 'cross':
      return (
        <g fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round">
          <line x1="-8" y1="0" x2="8" y2="0" />
          <line x1="0" y1="-8" x2="0" y2="8" />
          <rect x="-10" y="-10" width="20" height="20" rx="2" />
        </g>
      )
    case 'truck':
      return (
        <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="-12" y="-6" width="14" height="10" />
          <path d="M 2 -2 H 10 L 13 1 V 4 H 2 Z" />
          <circle cx="-7" cy="6" r="2" fill={color} />
          <circle cx="7" cy="6" r="2" fill={color} />
        </g>
      )
    case 'server':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round">
          <rect x="-10" y="-10" width="20" height="6" rx="1" />
          <rect x="-10" y="-2" width="20" height="6" rx="1" />
          <rect x="-10" y="6" width="20" height="6" rx="1" />
          <circle cx="-6" cy="-7" r="1" fill={color} />
          <circle cx="-6" cy="1" r="1" fill={color} />
          <circle cx="-6" cy="9" r="1" fill={color} />
        </g>
      )
    default:
      return <circle r="8" fill={color} />
  }
}

function formatTimer(totalSec) {
  const h = Math.floor(totalSec / 3600).toString().padStart(2, '0')
  const m = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0')
  const s = Math.floor(totalSec % 60).toString().padStart(2, '0')
  return `${h}:${m}:${s}`
}

export default function Scene_4_3() {
  // 24h countdown (early warning)
  const [remaining, setRemaining] = useState(24 * 3600 - 427)

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(r => (r <= 1 ? 24 * 3600 : r - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="nis-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="nis-core">
            <stop offset="0%"   stopColor="#06b6d4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#083344" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="water-halo">
            <stop offset="0%"   stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
          {entities.map(e => (
            <path
              key={`el-${e.id}`}
              id={`el-${e.id}`}
              d={`M ${CX},${CY} L ${e.x},${e.y}`}
            />
          ))}
        </defs>

        {/* Decorative rotating rings */}
        <circle cx={CX} cy={CY} r={R_ENTITIES + 40} fill="none" stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 9" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur="55s" repeatCount="indefinite" />
        </circle>

        {/* Links from core to entities */}
        {entities.map((e, i) => (
          <g key={`lnk-${e.id}`}>
            <line x1={CX} y1={CY} x2={e.x} y2={e.y}
              stroke={e.highlight ? '#06b6d4' : '#1e293b'}
              strokeWidth={e.highlight ? 1.4 : 0.8}
              strokeDasharray="3 6"
              opacity={e.highlight ? 0.7 : 0.3}>
              <animate attributeName="stroke-dashoffset" from="9" to="0" dur="1.8s" repeatCount="indefinite" />
            </line>
            <circle r="2.5" fill={e.highlight ? '#22d3ee' : '#60a5fa'} filter="url(#nis-glow)" opacity="0">
              <animateMotion dur={`${3.2 + i * 0.4}s`} begin={`${i * 0.6}s`} repeatCount="indefinite">
                <mpath href={`#el-${e.id}`} />
              </animateMotion>
              <animate attributeName="opacity"
                values="0;0.9;0.9;0" keyTimes="0;0.2;0.8;1"
                dur={`${3.2 + i * 0.4}s`} begin={`${i * 0.6}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Central NIS2 emblem — hexagon motif */}
        <g transform={`translate(${CX} ${CY})`}>
          <circle r="85" fill="url(#nis-core)" />

          {/* Rotating outer hex frame */}
          <polygon points="0,-72 62,-36 62,36 0,72 -62,36 -62,-36"
            fill="none" stroke="#0891b2" strokeWidth="0.9" strokeDasharray="3 9">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="48s" repeatCount="indefinite" />
          </polygon>

          {/* Main hex body */}
          <polygon points="0,-56 48,-28 48,28 0,56 -48,28 -48,-28"
            fill="#0b1220" stroke="#06b6d4" strokeWidth="1.8" filter="url(#nis-glow)">
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.6s" repeatCount="indefinite" />
          </polygon>
          {/* Inner small hex */}
          <polygon points="0,-36 30,-18 30,18 0,36 -30,18 -30,-18"
            fill="none" stroke="#22d3ee" strokeWidth="0.8" opacity="0.55" />

          <text y="-4" textAnchor="middle" fill="#cffafe" fontSize="26" fontWeight="800"
            style={{ letterSpacing: '0.08em' }}>
            NIS2
          </text>
          <text y="12" textAnchor="middle" fill="#67e8f9" fontSize="9" fontWeight="600"
            style={{ letterSpacing: '0.22em' }}>
            EU 2022/2555
          </text>
          <text y="26" textAnchor="middle" fill="#64748b" fontSize="8.5"
            style={{ letterSpacing: '0.15em' }}>
            от октомври 2024
          </text>
        </g>

        {/* Entity satellites */}
        {entities.map((e, i) => (
          <g key={e.id} transform={`translate(${e.x} ${e.y})`}>
            {e.highlight && <circle r="34" fill="url(#water-halo)" />}

            {[0, 1.2].map((d, k) => (
              <circle key={k} r="26" fill="none" stroke={e.highlight ? '#22d3ee' : '#475569'} strokeWidth="0.7" opacity="0">
                <animate attributeName="r" values={e.highlight ? '24;44' : '24;38'}
                  dur={e.highlight ? '2.4s' : '3s'}
                  begin={`${(i * 0.35) + d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0"
                  dur={e.highlight ? '2.4s' : '3s'}
                  begin={`${(i * 0.35) + d}s`} repeatCount="indefinite" />
              </circle>
            ))}

            <circle r="22" fill="#0b1220"
              stroke={e.highlight ? '#22d3ee' : '#64748b'}
              strokeWidth={e.highlight ? 1.8 : 1.2}
              filter="url(#nis-glow)">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur={`${2.6 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>

            <EntityGlyph kind={e.glyph} color={e.highlight ? '#22d3ee' : '#94a3b8'} />

            <text y="42" textAnchor="middle"
              fill={e.highlight ? '#cffafe' : '#cbd5e1'}
              fontSize={e.highlight ? 12 : 11}
              fontWeight={e.highlight ? 700 : 500}>
              {e.label}
            </text>

            {e.highlight && (
              <g transform="translate(0 58)">
                <rect x="-38" y="-9" width="76" height="16" rx="8"
                  fill="rgba(6,182,212,0.18)" stroke="#22d3ee" strokeWidth="0.8">
                  <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="1.6s" repeatCount="indefinite" />
                </rect>
                <text x="0" y="2" textAnchor="middle" fill="#67e8f9" fontSize="9" fontWeight="700"
                  style={{ letterSpacing: '0.18em' }}>
                  ESSENTIAL
                </text>
              </g>
            )}
          </g>
        ))}

        {/* === Right column: 5 requirements === */}
        <g transform="translate(600 100)">
          <text fill="#94a3b8" fontSize="12" fontWeight="600" style={{ letterSpacing: '0.22em' }}>
            5 ЗАДЪЛЖЕНИЯ
          </text>
          <text y="16" fill="#475569" fontSize="10">
            за всеки essential entity
          </text>

          {requirements.map((r, i) => (
            <g key={r.num} transform={`translate(0 ${40 + i * 48})`}>
              <rect x="0" y="0" width="260" height="40" rx="6"
                fill="rgba(15,23,42,0.7)" stroke="#06b6d4" strokeWidth="0.8">
                <animate attributeName="stroke-opacity"
                  values="0.35;0.95;0.35"
                  dur={`${3 + i * 0.3}s`}
                  begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </rect>
              {/* Number badge */}
              <circle cx="20" cy="20" r="14" fill="#0b1220" stroke="#06b6d4" strokeWidth="1.2" filter="url(#nis-glow)" />
              <text x="20" y="25" textAnchor="middle" fill="#67e8f9" fontSize="14" fontWeight="800">
                {r.num}
              </text>
              <text x="44" y="18" fill="#cffafe" fontSize="12" fontWeight="600">
                {r.title}
              </text>
              <text x="44" y="32" fill="#64748b" fontSize="10">
                {r.sub}
              </text>
            </g>
          ))}
        </g>

        {/* 24h early warning clock */}
        <g transform="translate(50 460)">
          <rect x="0" y="0" width="230" height="80" rx="8"
            fill="#0b1220" stroke="#f59e0b" strokeWidth="1" filter="url(#nis-glow)">
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="2.4s" repeatCount="indefinite" />
          </rect>
          <text x="12" y="18" fill="#fcd34d" fontSize="10" fontWeight="700" style={{ letterSpacing: '0.18em' }}>
            EARLY WARNING · &lt; 24ч
          </text>
          <text x="12" y="32" fill="#94a3b8" fontSize="10">
            инцидентът трябва да е съобщен в...
          </text>
          <text x="115" y="62" textAnchor="middle" fill="#fcd34d" fontSize="22" fontWeight="800" fontFamily="monospace">
            {formatTimer(remaining)}
          </text>
        </g>

        {/* Management personal responsibility flag */}
        <g transform="translate(300 470)">
          <rect x="0" y="0" width="240" height="60" rx="8"
            fill="rgba(127,29,29,0.35)" stroke="#ef4444" strokeWidth="1">
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="2.4s" repeatCount="indefinite" />
          </rect>
          {/* Person icon */}
          <g transform="translate(26 30)" stroke="#fecaca" fill="none" strokeWidth="1.4" strokeLinecap="round">
            <circle cx="0" cy="-8" r="5" />
            <path d="M -12 16 Q -12 4 0 4 Q 12 4 12 16" />
          </g>
          <text x="48" y="22" fill="#fecaca" fontSize="12" fontWeight="700"
            style={{ letterSpacing: '0.15em' }}>
            МЕНИДЖМЪНТ ·
          </text>
          <text x="48" y="38" fill="#fca5a5" fontSize="11" fontWeight="600">
            лична отговорност за сигурността
          </text>
          <text x="48" y="52" fill="#64748b" fontSize="10">
            до €10M или 2% от оборота · санкция
          </text>
        </g>
      </svg>
    </div>
  )
}
