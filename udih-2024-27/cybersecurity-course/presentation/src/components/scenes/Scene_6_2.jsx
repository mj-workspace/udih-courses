// Scene 6.2 — Incident Response 6-phase cycle
// Six phase nodes on a circular orbit around a central INCIDENT
// core. A traveling marker rolls clockwise along the orbit; an
// "active" highlight cycles through the phases in sequence. HUD
// shows mean-time-to-contain.

import { useEffect, useState } from 'react'

const CX = 450
const CY = 290
const R = 170

const phases = [
  { id: 'prep',  num: '1', label: 'Подготовка',    sub: 'Preparation',    angle: -90, icon: 'clipboard' },
  { id: 'ident', num: '2', label: 'Идентификация', sub: 'Identification', angle: -30, icon: 'magnify' },
  { id: 'cont',  num: '3', label: 'Ограничаване',  sub: 'Containment',    angle:  30, icon: 'shield' },
  { id: 'erad',  num: '4', label: 'Елиминиране',   sub: 'Eradication',    angle:  90, icon: 'broom' },
  { id: 'rec',   num: '5', label: 'Възстановяване', sub: 'Recovery',      angle: 150, icon: 'sunrise' },
  { id: 'less',  num: '6', label: 'Поуки',         sub: 'Lessons learned', angle: 210, icon: 'book' },
].map(p => {
  const rad = (p.angle * Math.PI) / 180
  return { ...p, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

function PhaseIcon({ kind, color }) {
  switch (kind) {
    case 'clipboard':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="-6" y="-7" width="12" height="16" rx="1" />
          <rect x="-3" y="-9" width="6" height="4" rx="0.5" />
          <line x1="-3" y1="-2" x2="3" y2="-2" />
          <line x1="-3" y1="2" x2="3" y2="2" />
          <line x1="-3" y1="6" x2="1" y2="6" />
        </g>
      )
    case 'magnify':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round">
          <circle cx="-2" cy="-2" r="5" />
          <line x1="2" y1="2" x2="7" y2="7" />
        </g>
      )
    case 'shield':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
          <path d="M 0 -8 L 7 -5 L 7 3 C 7 7 0 10 0 10 C 0 10 -7 7 -7 3 L -7 -5 Z" />
          <path d="M -3 -1 L -1 2 L 3 -3" />
        </g>
      )
    case 'broom':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="-6" y1="-7" x2="2" y2="1" />
          <path d="M 2 1 L 7 -3 L 4 6 L -1 8 Z" />
          <line x1="0" y1="4" x2="-3" y2="8" />
          <line x1="-2" y1="3" x2="-5" y2="7" />
        </g>
      )
    case 'sunrise':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round">
          <path d="M -7 4 Q 0 -5 7 4" />
          <line x1="-8" y1="7" x2="8" y2="7" />
          <line x1="0" y1="-3" x2="0" y2="-8" />
          <line x1="-6" y1="-1" x2="-4" y2="-3" />
          <line x1="6" y1="-1" x2="4" y2="-3" />
        </g>
      )
    case 'book':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -7 -5 L -7 6 L 0 4 L 7 6 L 7 -5 L 0 -3 Z" />
          <line x1="0" y1="-3" x2="0" y2="4" />
        </g>
      )
    default: return null
  }
}

export default function Scene_6_2() {
  const [activePhase, setActivePhase] = useState(0)
  const [mttc, setMttc] = useState(222)

  useEffect(() => {
    const id = setInterval(() => setActivePhase(p => (p + 1) % 6), 2600)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setMttc(() => 190 + Math.floor(Math.random() * 90)), 3400)
    return () => clearInterval(id)
  }, [])

  const mttcH = Math.floor(mttc / 60)
  const mttcM = mttc % 60

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-4 right-6 z-10 flex items-center gap-3 px-4 py-2 rounded-md border border-amber-500/30 bg-slate-950/70 backdrop-blur-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.2em] text-amber-300/80">MTTC · до containment</span>
          <span className="font-mono text-base font-bold text-amber-200 tabular-nums">
            {mttcH}ч {String(mttcM).padStart(2, '0')}м
          </span>
        </div>
      </div>

      <svg viewBox="0 0 900 560" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="p62-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="incident-halo">
            <stop offset="0%"  stopColor="#ef4444" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
          </radialGradient>
          <path id="orbit-full"
            d={`M ${CX + R},${CY} A ${R},${R} 0 1,1 ${CX + R - 0.01},${CY}`} />
        </defs>

        {/* Outer decorative ring rotating */}
        <circle cx={CX} cy={CY} r={R + 34} fill="none" stroke="#1e293b" strokeWidth="0.6" strokeDasharray="2 8" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur="60s" repeatCount="indefinite" />
        </circle>

        {/* Main orbit */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#475569" strokeWidth="0.9" strokeDasharray="4 8" opacity="0.55">
          <animate attributeName="stroke-dashoffset" from="12" to="0" dur="3.5s" repeatCount="indefinite" />
        </circle>

        {/* Clockwise arrow along orbit — suggest cycle direction */}
        {[0, 60, 120, 180, 240, 300].map(a => {
          const rad = ((a - 60) * Math.PI) / 180
          const x = CX + (R + 20) * Math.cos(rad)
          const y = CY + (R + 20) * Math.sin(rad)
          return (
            <g key={a} transform={`translate(${x} ${y}) rotate(${a})`}>
              <polygon points="0,-4 7,0 0,4" fill="#64748b" opacity="0.6">
                <animate attributeName="opacity" values="0.25;0.75;0.25" dur="2.4s" begin={`${a / 360}s`} repeatCount="indefinite" />
              </polygon>
            </g>
          )
        })}

        {/* Traveling marker along orbit */}
        <g>
          <circle r="7" fill="#fbbf24" opacity="0.3" filter="url(#p62-glow)">
            <animateMotion dur="15.6s" repeatCount="indefinite">
              <mpath href="#orbit-full" />
            </animateMotion>
          </circle>
          <circle r="3.5" fill="#fcd34d" filter="url(#p62-glow)">
            <animateMotion dur="15.6s" repeatCount="indefinite">
              <mpath href="#orbit-full" />
            </animateMotion>
          </circle>
        </g>

        {/* Central incident core */}
        <g transform={`translate(${CX} ${CY})`}>
          <circle r="72" fill="url(#incident-halo)" />
          {[0, 1.1].map((d, i) => (
            <circle key={i} r="40" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="36;66" dur="2.2s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.55;0" dur="2.2s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <polygon points="0,-38 33,-19 33,19 0,38 -33,19 -33,-19"
            fill="#0b1220" stroke="#ef4444" strokeWidth="1.7" filter="url(#p62-glow)">
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="1.6s" repeatCount="indefinite" />
          </polygon>
          {/* Alert triangle glyph */}
          <g fill="none" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 0 -18 L 16 10 L -16 10 Z" />
            <line x1="0" y1="-8" x2="0" y2="2" strokeWidth="2.2" />
          </g>
          <circle cx="0" cy="7" r="1.4" fill="#ef4444" />
          <text y="-50" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="700" style={{ letterSpacing: '0.3em' }}>
            INCIDENT
          </text>
          <text y="54" textAnchor="middle" fill="#94a3b8" fontSize="9" style={{ letterSpacing: '0.2em' }}>
            6 фази · цикъл
          </text>
        </g>

        {/* Phase nodes */}
        {phases.map((p, i) => {
          const isActive = i === activePhase
          const strokeColor = isActive ? '#fbbf24' : '#64748b'
          const textColor = isActive ? '#fef3c7' : '#e2e8f0'
          const iconColor = isActive ? '#fcd34d' : '#cbd5e1'
          return (
            <g key={p.id} transform={`translate(${p.x} ${p.y})`}>
              {isActive && (
                <circle r="32" fill="none" stroke="#fbbf24" strokeWidth="1.1" opacity="0.6">
                  <animate attributeName="r" values="28;46" dur="1.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0" dur="1.4s" repeatCount="indefinite" />
                </circle>
              )}
              {[0, 1.1].map((d, k) => (
                <circle key={k} r="26" fill="none"
                  stroke={isActive ? '#fbbf24' : '#475569'} strokeWidth="0.7" opacity="0">
                  <animate attributeName="r" values="24;40" dur="3s" begin={`${(i * 0.3) + d}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.45;0" dur="3s" begin={`${(i * 0.3) + d}s`} repeatCount="indefinite" />
                </circle>
              ))}
              <circle r="26" fill="#0b1220"
                stroke={strokeColor}
                strokeWidth={isActive ? 1.9 : 1.2}
                filter="url(#p62-glow)">
                <animate attributeName="stroke-opacity" values="0.55;1;0.55"
                  dur={`${2.6 + i * 0.2}s`} repeatCount="indefinite" />
              </circle>
              <PhaseIcon kind={p.icon} color={iconColor} />

              <g transform="translate(22 -20)">
                <circle r="9" fill="#0b1220" stroke={strokeColor} strokeWidth="1" />
                <text y="3" textAnchor="middle" fill={iconColor} fontSize="10" fontWeight="800">
                  {p.num}
                </text>
              </g>

              <text y="46" textAnchor="middle" fill={textColor} fontSize="11" fontWeight="700">
                {p.label}
              </text>
              <text y="59" textAnchor="middle" fill="#64748b" fontSize="8.5" style={{ letterSpacing: '0.15em' }}>
                {p.sub}
              </text>
            </g>
          )
        })}

        <text x={450} y={540} textAnchor="middle" fill="#475569" fontSize="10" style={{ letterSpacing: '0.22em' }}>
          цикъл · поуките захранват подготовката
        </text>
      </svg>
    </div>
  )
}
