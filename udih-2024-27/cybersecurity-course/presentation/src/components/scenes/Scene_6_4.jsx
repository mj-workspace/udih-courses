// Scene 6.4 — TOP 10 constellation & shared responsibility
// Ten rule nodes orbit a central human silhouette representing
// the employee. Every few seconds, a synchronous flash lights
// up all ten nodes together — a summary-climax moment for the
// final slide of the course.

import { useEffect, useState } from 'react'

const CX = 450
const CY = 295
const R = 200

const rules = [
  { n: 1,  label: 'Силни пароли',    sub: 'password manager',  icon: 'key',       angle: -90 },
  { n: 2,  label: '2FA · MFA',       sub: 'втори фактор',      icon: 'layers',    angle: -54 },
  { n: 3,  label: 'Не кликай',       sub: 'подозрителен линк', icon: 'link-x',    angle: -18 },
  { n: 4,  label: 'Пач · ъпдейт',    sub: 'redovno',           icon: 'refresh',   angle:  18 },
  { n: 5,  label: 'VPN · remote',    sub: 'криптиран тунел',   icon: 'tunnel',    angle:  54 },
  { n: 6,  label: 'Класификация',    sub: 'data · чувств.',    icon: 'tag',       angle:  90 },
  { n: 7,  label: '3-2-1 backup',    sub: 'тествай',           icon: 'disks',     angle: 126 },
  { n: 8,  label: 'Докладвай',       sub: 'подозрително',      icon: 'bell',      angle: 162 },
  { n: 9,  label: 'Знай политиките', sub: 'спазвай',           icon: 'book',      angle: 198 },
  { n: 10, label: 'Скептицизъм',     sub: 'social engineering', icon: 'question', angle: 234 },
].map(r => {
  const rad = (r.angle * Math.PI) / 180
  return { ...r, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

function RuleIcon({ kind, color }) {
  switch (kind) {
    case 'key':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round">
          <circle cx="-4" cy="0" r="3.5" />
          <line x1="-0.5" y1="0" x2="7" y2="0" />
          <line x1="4" y1="0" x2="4" y2="3.5" />
        </g>
      )
    case 'layers':
      return (
        <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 0 -6 L 7 -2 L 0 2 L -7 -2 Z" />
          <path d="M -7 2 L 0 6 L 7 2" />
          <path d="M -7 5 L 0 9 L 7 5" opacity="0.5" />
        </g>
      )
    case 'link-x':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -6 0 L -2 0" />
          <path d="M 2 0 L 6 0" />
          <path d="M -4 -4 L -6 -4 Q -8 -4 -8 -2 L -8 2 Q -8 4 -6 4" />
          <path d="M 4 -4 L 6 -4 Q 8 -4 8 -2 L 8 2 Q 8 4 6 4" />
          <line x1="-4" y1="-7" x2="4" y2="7" stroke="#ef4444" strokeWidth="1.1" />
        </g>
      )
    case 'refresh':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -6 -2 A 6 6 0 0 1 4 -5" />
          <polygon points="4,-5 1,-7 1,-2" fill={color} />
          <path d="M 6 2 A 6 6 0 0 1 -4 5" />
          <polygon points="-4,5 -1,7 -1,2" fill={color} />
        </g>
      )
    case 'tunnel':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round">
          <path d="M -8 4 Q -8 -4 0 -4 Q 8 -4 8 4" />
          <line x1="-8" y1="4" x2="8" y2="4" />
          <line x1="-5" y1="4" x2="-5" y2="-2" />
          <line x1="0" y1="4" x2="0" y2="-4" />
          <line x1="5" y1="4" x2="5" y2="-2" />
        </g>
      )
    case 'tag':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -7 -4 L -7 4 L 0 8 L 7 1 L 0 -7 L -7 -4 Z" />
          <circle cx="-4" cy="-2" r="1.2" fill={color} />
        </g>
      )
    case 'disks':
      return (
        <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
          <ellipse cx="0" cy="-4" rx="6.5" ry="1.6" />
          <ellipse cx="0" cy="0" rx="6.5" ry="1.6" />
          <ellipse cx="0" cy="4" rx="6.5" ry="1.6" />
        </g>
      )
    case 'bell':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -6 4 L 6 4 Q 6 -2 4 -5 Q 2 -8 0 -8 Q -2 -8 -4 -5 Q -6 -2 -6 4 Z" />
          <line x1="-2" y1="6" x2="2" y2="6" />
          <line x1="0" y1="-10" x2="0" y2="-8" />
        </g>
      )
    case 'book':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -7 -5 L -7 6 L 0 4 L 7 6 L 7 -5 L 0 -3 Z" />
          <line x1="0" y1="-3" x2="0" y2="4" />
        </g>
      )
    case 'question':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <circle r="7" />
          <path d="M -2 -2 Q -2 -4 0 -4 Q 2 -4 2 -2 Q 2 0 0 1 L 0 3" />
          <circle cx="0" cy="5" r="0.8" fill={color} />
        </g>
      )
    default: return null
  }
}

export default function Scene_6_4() {
  const [syncFlash, setSyncFlash] = useState(false)

  useEffect(() => {
    const iv = setInterval(() => {
      setSyncFlash(true)
      setTimeout(() => setSyncFlash(false), 900)
    }, 7600)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-4 right-6 z-10 flex items-center gap-3 px-4 py-2 rounded-md border border-violet-500/30 bg-slate-950/70 backdrop-blur-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-70" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500" />
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.2em] text-violet-300/80">курс · обобщение</span>
          <span className="font-mono text-base font-bold text-violet-200 tabular-nums">TOP · 10</span>
        </div>
      </div>

      <svg viewBox="0 0 900 560" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="p64-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="human-halo">
            <stop offset="0%"  stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Decorative outer ring rotating */}
        <circle cx={CX} cy={CY} r={R + 32} fill="none" stroke="#1e293b" strokeWidth="0.6" strokeDasharray="2 10" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur="70s" repeatCount="indefinite" />
        </circle>

        {/* Inner orbit ring */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#334155" strokeWidth="0.7" strokeDasharray="3 7" opacity="0.45" />

        {/* Links from center to each rule */}
        {rules.map(r => (
          <line key={`ln-${r.n}`}
            x1={CX} y1={CY} x2={r.x} y2={r.y}
            stroke="#a855f7" strokeWidth="0.6" strokeDasharray="2 5"
            opacity={syncFlash ? 0.8 : 0.2}
            style={{ transition: 'opacity 0.3s' }}>
            <animate attributeName="stroke-dashoffset" from="7" to="0" dur="2.4s" repeatCount="indefinite" />
          </line>
        ))}

        {/* Central human silhouette */}
        <g transform={`translate(${CX} ${CY})`}>
          <circle r="70" fill="url(#human-halo)" />
          {[0, 1.3, 2.6].map((d, i) => (
            <circle key={i} r="40" fill="none" stroke="#a855f7" strokeWidth="0.9" opacity="0">
              <animate attributeName="r" values="36;66" dur="3.6s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.55;0" dur="3.6s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {syncFlash && (
            <circle r="50" fill="none" stroke="#c4b5fd" strokeWidth="1.2" opacity="0.9">
              <animate attributeName="r" values="40;100" dur="0.9s" repeatCount="1" />
              <animate attributeName="opacity" values="1;0" dur="0.9s" repeatCount="1" />
            </circle>
          )}

          {/* Rotating outer hex */}
          <polygon points="0,-50 43,-25 43,25 0,50 -43,25 -43,-25"
            fill="none" stroke="#7c3aed" strokeWidth="0.8" strokeDasharray="3 8">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="48s" repeatCount="indefinite" />
          </polygon>

          {/* Main hex */}
          <polygon points="0,-40 34,-20 34,20 0,40 -34,20 -34,-20"
            fill="#0b1220" stroke="#a855f7" strokeWidth="1.7" filter="url(#p64-glow)">
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.6s" repeatCount="indefinite" />
          </polygon>

          {/* Silhouette glyph */}
          <g>
            <circle cx="0" cy="-9" r="7" fill="none" stroke="#c4b5fd" strokeWidth="1.5" />
            <path d="M -15 18 Q -15 2 0 2 Q 15 2 15 18 Z"
              fill="none" stroke="#c4b5fd" strokeWidth="1.5" strokeLinejoin="round" />
          </g>
          <text y="-52" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="700" style={{ letterSpacing: '0.3em' }}>
            ТИ
          </text>
          <text y="58" textAnchor="middle" fill="#ddd6fe" fontSize="9.5" fontWeight="700" style={{ letterSpacing: '0.22em' }}>
            СПОДЕЛЕНА
          </text>
          <text y="71" textAnchor="middle" fill="#ddd6fe" fontSize="9.5" fontWeight="700" style={{ letterSpacing: '0.22em' }}>
            ОТГОВОРНОСТ
          </text>
        </g>

        {/* Rule nodes */}
        {rules.map((r, i) => {
          const isSync = syncFlash
          const stroke = isSync ? '#c4b5fd' : '#a855f7'
          return (
            <g key={r.n} transform={`translate(${r.x} ${r.y})`}>
              {[0, 1.4].map((d, k) => (
                <circle key={k} r="22" fill="none" stroke={stroke} strokeWidth="0.7" opacity="0">
                  <animate attributeName="r" values="20;36" dur="3.2s" begin={`${(i * 0.28) + d}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.45;0" dur="3.2s" begin={`${(i * 0.28) + d}s`} repeatCount="indefinite" />
                </circle>
              ))}
              {isSync && (
                <circle r="24" fill="none" stroke="#fef3c7" strokeWidth="1.2" opacity="0.9">
                  <animate attributeName="r" values="22;40" dur="0.8s" repeatCount="1" />
                  <animate attributeName="opacity" values="1;0" dur="0.8s" repeatCount="1" />
                </circle>
              )}
              <circle r="22" fill="#0b1220" stroke={stroke}
                strokeWidth={isSync ? 1.8 : 1.3} filter="url(#p64-glow)">
                <animate attributeName="stroke-opacity" values="0.55;1;0.55"
                  dur={`${2.6 + i * 0.2}s`} repeatCount="indefinite" />
              </circle>
              <RuleIcon kind={r.icon} color={isSync ? '#fef3c7' : '#ddd6fe'} />

              {/* Number badge */}
              <g transform="translate(18 -17)">
                <circle r="8" fill="#0b1220" stroke={stroke} strokeWidth="1" />
                <text y="3" textAnchor="middle" fill={isSync ? '#fef3c7' : '#c4b5fd'} fontSize="9" fontWeight="800">
                  {r.n}
                </text>
              </g>

              <text y="40" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="700">
                {r.label}
              </text>
              <text y="53" textAnchor="middle" fill="#64748b" fontSize="8" style={{ letterSpacing: '0.1em' }}>
                {r.sub}
              </text>
            </g>
          )
        })}

        {/* Bottom caption — human factor */}
        <g transform="translate(450 537)">
          <rect x="-160" y="-13" width="320" height="24" rx="12"
            fill="rgba(15,23,42,0.7)" stroke="#7c3aed" strokeWidth="0.8" filter="url(#p64-glow)">
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="2.6s" repeatCount="indefinite" />
          </rect>
          <text y="3" textAnchor="middle" fill="#c4b5fd" fontSize="10.5" fontWeight="800" style={{ letterSpacing: '0.18em' }}>
            90%+ ЧОВЕШКИ ФАКТОР · БЪДИ БДИТЕЛЕН
          </text>
        </g>
      </svg>
    </div>
  )
}
