// Scene 5.2 — Distributed water utility network & segmentation
// Central office hex communicates with 6 pump stations on an
// orbit. Each station has a pulsing risk-badge above indicating
// the type of exposure. A mini IT/DMZ/OT segmentation diagram
// on the right shows the right way to separate zones.

import { useEffect, useState } from 'react'

const CX = 250
const CY = 290
const R = 170

const stations = [
  { id: 'legacy',  angle: -90,  label: 'ПС · Север',  risk: 'legacy', riskLabel: 'стар софтуер', color: '#ef4444' },
  { id: 'iot',     angle: -30,  label: 'ПС · Изток',  risk: 'iot',    riskLabel: 'IoT default',  color: '#f97316' },
  { id: 'mixed',   angle: 30,   label: 'ПС · ЮИ',     risk: 'mixed',  riskLabel: 'IT + OT',      color: '#f59e0b' },
  { id: 'vendor',  angle: 90,   label: 'ПС · Юг',     risk: 'vendor', riskLabel: '3rd party',    color: '#ef4444' },
  { id: 'remote',  angle: 150,  label: 'ПС · ЮЗ',     risk: 'remote', riskLabel: 'remote maint.', color: '#f59e0b' },
  { id: 'sensor',  angle: 210,  label: 'ПС · Запад',  risk: 'sensor', riskLabel: 'незащ. сензор', color: '#ef4444' },
].map(s => {
  const rad = (s.angle * Math.PI) / 180
  return { ...s, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

function RiskIcon({ kind, color }) {
  switch (kind) {
    case 'legacy':
      return (
        <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
          <circle r="5" />
          <line x1="0" y1="0" x2="0" y2="-3.5" />
          <line x1="0" y1="0" x2="3" y2="1.5" />
        </g>
      )
    case 'iot':
      return (
        <g fill="none" stroke={color} strokeWidth="1.1" strokeLinecap="round">
          <path d="M -6 1 Q 0 -6 6 1" />
          <path d="M -4 2 Q 0 -3 4 2" />
          <circle cy="4" r="1.1" fill={color} />
        </g>
      )
    case 'mixed':
      return (
        <g fill="none" stroke={color} strokeWidth="1.2">
          <circle cx="-2.5" cy="0" r="4" />
          <circle cx="2.5" cy="0" r="4" />
        </g>
      )
    case 'vendor':
      return (
        <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="0" cy="-3" r="2.2" />
          <path d="M -5 5 Q -5 1 0 1 Q 5 1 5 5" />
        </g>
      )
    case 'remote':
      return (
        <g fill="none" stroke={color} strokeWidth="1.1" strokeLinecap="round">
          <circle r="4.5" />
          <line x1="-4.5" y1="0" x2="4.5" y2="0" />
          <ellipse cx="0" cy="0" rx="2.2" ry="4.5" />
        </g>
      )
    case 'sensor':
      return (
        <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
          <line x1="0" y1="-5" x2="0" y2="4" />
          <path d="M -4 -2 Q 0 -6 4 -2" />
          <path d="M -2 0 Q 0 -3 2 0" />
          <circle cy="5" r="0.9" fill={color} />
        </g>
      )
    default:
      return <circle r="4" fill={color} />
  }
}

export default function Scene_5_2() {
  const [exposed, setExposed] = useState(142)

  useEffect(() => {
    const id = setInterval(() => {
      setExposed(() => 130 + Math.floor(Math.random() * 35))
    }, 1600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-4 right-6 z-10 flex items-center gap-3 px-4 py-2 rounded-md border border-red-500/30 bg-slate-950/70 backdrop-blur-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.2em] text-red-300/80">рискови точки</span>
          <span className="font-mono text-lg font-bold text-red-200 tabular-nums">{exposed}</span>
        </div>
      </div>

      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="p52-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="office-core">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#083344" stopOpacity="0" />
          </radialGradient>
          {stations.map(s => (
            <path
              key={`lp-${s.id}`}
              id={`lp-${s.id}`}
              d={`M ${CX},${CY} L ${s.x},${s.y}`}
            />
          ))}
        </defs>

        {/* Orbit decoration */}
        <circle cx={CX} cy={CY} r={R + 40} fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur="70s" repeatCount="indefinite" />
        </circle>
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4" />

        {/* Links + data pulses */}
        {stations.map((s, i) => (
          <g key={`lnk-${s.id}`}>
            <line x1={CX} y1={CY} x2={s.x} y2={s.y}
              stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.38">
              <animate attributeName="stroke-dashoffset" from="9" to="0" dur="2s" repeatCount="indefinite" />
            </line>
            <circle r="2" fill="#22d3ee" filter="url(#p52-glow)" opacity="0">
              <animateMotion dur={`${3 + i * 0.3}s`} begin={`${i * 0.35}s`} repeatCount="indefinite">
                <mpath href={`#lp-${s.id}`} />
              </animateMotion>
              <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.15;0.85;1"
                dur={`${3 + i * 0.3}s`} begin={`${i * 0.35}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Central office */}
        <g transform={`translate(${CX} ${CY})`}>
          <circle r="62" fill="url(#office-core)" />
          {[0, 1.4].map((d, i) => (
            <circle key={i} r="34" fill="none" stroke="#22d3ee" strokeWidth="0.9" opacity="0">
              <animate attributeName="r" values="30;58" dur="3s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.55;0" dur="3s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <polygon points="0,-32 28,-16 28,16 0,32 -28,16 -28,-16"
            fill="#0b1220" stroke="#06b6d4" strokeWidth="1.7" filter="url(#p52-glow)">
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="2.6s" repeatCount="indefinite" />
          </polygon>
          <g fill="none" stroke="#67e8f9" strokeWidth="1.3">
            <rect x="-14" y="-14" width="28" height="22" rx="1" />
            <line x1="-7" y1="-8" x2="-7" y2="8" />
            <line x1="0" y1="-14" x2="0" y2="8" />
            <line x1="7" y1="-8" x2="7" y2="8" />
          </g>
          <text y="52" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="700" style={{ letterSpacing: '0.18em' }}>
            ЦЕНТРАЛЕН ОФИС
          </text>
        </g>

        {/* Stations */}
        {stations.map((s, i) => (
          <g key={s.id} transform={`translate(${s.x} ${s.y})`}>
            {[0, 1.2].map((d, k) => (
              <circle key={k} r="20" fill="none" stroke={s.color} strokeWidth="0.7" opacity="0">
                <animate attributeName="r" values="18;38" dur="3s" begin={`${i * 0.3 + d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.45;0" dur="3s" begin={`${i * 0.3 + d}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <circle r="20" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.3" filter="url(#p52-glow)">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur={`${2.6 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>
            <g fill="#06b6d4" stroke="#06b6d4" strokeWidth="1" strokeLinejoin="round">
              <path d="M 0 -9 Q -7 -2 -7 3 Q -7 9 0 9 Q 7 9 7 3 Q 7 -2 0 -9 Z" />
            </g>
            <text y="34" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="600">
              {s.label}
            </text>

            <g transform="translate(0 -32)">
              <circle r="11" fill="#0b1220" stroke={s.color} strokeWidth="1">
                <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="1.8s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
              </circle>
              <RiskIcon kind={s.risk} color={s.color} />
              <text y="22" textAnchor="middle" fill={s.color} fontSize="8.5" fontWeight="700" style={{ letterSpacing: '0.08em' }}>
                {s.riskLabel}
              </text>
            </g>
          </g>
        ))}

        {/* === Segmentation diagram (right) === */}
        <g transform="translate(560 90)">
          <text x="160" y="18" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="700" style={{ letterSpacing: '0.25em' }}>
            СЕГМЕНТАЦИЯ
          </text>
          <text x="160" y="34" textAnchor="middle" fill="#475569" fontSize="9" style={{ letterSpacing: '0.15em' }}>
            IT · DMZ · OT
          </text>

          {[
            { y: 60,  label: 'IT',  sub: 'офис · имейл',     color: '#3b82f6' },
            { y: 160, label: 'DMZ', sub: 'публичен портал',  color: '#f59e0b' },
            { y: 260, label: 'OT',  sub: 'помпи · сензори',  color: '#22d3ee' },
          ].map((z, i) => (
            <g key={z.label}>
              <rect x="0" y={z.y} width="310" height="70" rx="6"
                fill="rgba(15,23,42,0.6)" stroke={z.color} strokeWidth="1">
                <animate attributeName="stroke-opacity" values="0.45;1;0.45"
                  dur={`${3 + i * 0.4}s`} begin={`${i * 0.3}s`} repeatCount="indefinite" />
              </rect>
              <text x="20" y={z.y + 32} fill={z.color} fontSize="17" fontWeight="800" style={{ letterSpacing: '0.15em' }}>
                {z.label}
              </text>
              <text x="20" y={z.y + 52} fill="#94a3b8" fontSize="10">
                {z.sub}
              </text>
              <g transform={`translate(195 ${z.y + 35})`}>
                {[0, 32, 64, 96].map((dx, di) => (
                  <g key={di} transform={`translate(${dx} 0)`}>
                    <rect x="-10" y="-7" width="20" height="12" rx="1" fill="#0b1220" stroke={z.color} strokeWidth="0.8" />
                    <circle cx="6" cy="-2" r="1" fill={z.color}>
                      <animate attributeName="fill-opacity" values="0.3;1;0.3"
                        dur={`${2 + di * 0.3}s`} begin={`${di * 0.4 + i * 0.3}s`} repeatCount="indefinite" />
                    </circle>
                    <line x1="-6" y1="1" x2="6" y2="1" stroke={z.color} strokeWidth="0.5" opacity="0.5" />
                  </g>
                ))}
              </g>
              {i < 2 && (
                <g transform={`translate(0 ${z.y + 85})`}>
                  <line x1="0" y1="0" x2="310" y2="0"
                    stroke="#f97316" strokeWidth="1.3" strokeDasharray="5 5" opacity="0.75">
                    <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.5s" repeatCount="indefinite" />
                  </line>
                  <g transform="translate(155 0)">
                    <circle r="11" fill="#0b1220" stroke="#f97316" strokeWidth="1.1" filter="url(#p52-glow)">
                      <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <path d="M -5 -5 L 5 -5 L 5 5 L -5 5 Z M -5 0 L 5 0 M 0 -5 L 0 5"
                      fill="none" stroke="#fb923c" strokeWidth="0.9" />
                  </g>
                  <text x="170" y="4" fill="#fb923c" fontSize="9" fontWeight="700" style={{ letterSpacing: '0.15em' }}>
                    FIREWALL
                  </text>
                </g>
              )}
            </g>
          ))}
        </g>

        <text x={250} y={540} textAnchor="middle" fill="#475569" fontSize="10" style={{ letterSpacing: '0.22em' }}>
          разпръсната мрежа · много точки за достъп
        </text>
      </svg>
    </div>
  )
}
