// Scene 6.3 — Resilience timeline + 3-2-1 backup
// Upper half: horizontal timeline with an incident marker in the
// middle, backup points on the left inside the RPO window (max
// data loss), and recovery steps on the right inside the RTO
// window (recovery deadline). Lower half: three backup copies
// linked in a 3-2-1 chain.

import { useEffect, useState } from 'react'

const TL_Y = 170
const TL_X1 = 70
const TL_X2 = 830
const INCIDENT_X = 450

const backupPoints = [
  { x: 130, label: '−7ч' },
  { x: 210, label: '−5ч' },
  { x: 290, label: '−3ч' },
  { x: 370, label: '−1ч' },
]

const recoverySteps = [
  { x: 510, label: '+30м', note: 'isolate' },
  { x: 580, label: '+1ч',  note: 'restore' },
  { x: 650, label: '+2ч',  note: 'verify' },
  { x: 720, label: '+3ч',  note: 'failover' },
  { x: 790, label: '+4ч',  note: 'live', final: true },
]

function BackupIcon({ kind, color }) {
  switch (kind) {
    case 'server':
      return (
        <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round">
          <rect x="-13" y="-16" width="26" height="9" rx="1" />
          <rect x="-13" y="-5" width="26" height="9" rx="1" />
          <rect x="-13" y="6" width="26" height="9" rx="1" />
          <circle cx="-8" cy="-11" r="1" fill={color} />
          <circle cx="-8" cy="0" r="1" fill={color} />
          <circle cx="-8" cy="11" r="1" fill={color} />
        </g>
      )
    case 'tape':
      return (
        <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round">
          <rect x="-15" y="-12" width="30" height="24" rx="2" />
          <circle cx="-7" cy="-1" r="5.5" />
          <circle cx="7" cy="-1" r="5.5" />
          <circle cx="-7" cy="-1" r="1.6" fill={color} />
          <circle cx="7" cy="-1" r="1.6" fill={color} />
        </g>
      )
    case 'cloud':
      return (
        <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -12 6 Q -17 6 -17 1 Q -17 -5 -10 -5 Q -8 -12 -1 -12 Q 7 -12 9 -4 Q 15 -4 15 3 Q 15 9 9 9 L -10 9 Q -12 9 -12 6 Z" />
          <path d="M -3 1 L -3 5 M -3 5 L -5 3 M -3 5 L -1 3" strokeLinejoin="round" />
        </g>
      )
    default: return null
  }
}

const copies = [
  { x: 150, label: 'COPY 1', sub: 'production · диск',   color: '#3b82f6', icon: 'server' },
  { x: 450, label: 'COPY 2', sub: 'on-site · лента',     color: '#a855f7', icon: 'tape' },
  { x: 750, label: 'COPY 3', sub: 'off-site · cloud',    color: '#10b981', icon: 'cloud' },
]

export default function Scene_6_3() {
  const [t, setT] = useState(4 * 3600 - 125)

  useEffect(() => {
    const id = setInterval(() => setT(r => (r <= 1 ? 4 * 3600 : r - 1)), 1000)
    return () => clearInterval(id)
  }, [])

  const h = Math.floor(t / 3600).toString().padStart(2, '0')
  const m = Math.floor((t % 3600) / 60).toString().padStart(2, '0')
  const s = Math.floor(t % 60).toString().padStart(2, '0')

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-4 right-6 z-10 flex items-center gap-3 px-4 py-2 rounded-md border border-emerald-500/30 bg-slate-950/70 backdrop-blur-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-300/80">time to recovery</span>
          <span className="font-mono text-base font-bold text-emerald-200 tabular-nums">
            {h}:{m}:{s}
          </span>
        </div>
      </div>

      <svg viewBox="0 0 900 560" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="p63-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="rpo-band" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#f59e0b" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.32" />
          </linearGradient>
          <linearGradient id="rto-band" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#10b981" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* === Timeline labels === */}
        <text x={TL_X1 + 20} y="95" fill="#64748b" fontSize="9" style={{ letterSpacing: '0.25em' }}>
          МИНАЛО · backups
        </text>
        <text x={TL_X2 - 20} y="95" textAnchor="end" fill="#64748b" fontSize="9" style={{ letterSpacing: '0.25em' }}>
          БЪДЕЩЕ · recovery
        </text>

        {/* RPO window */}
        <rect x="370" y={TL_Y - 22} width={INCIDENT_X - 370} height="44" fill="url(#rpo-band)" />
        <rect x="370" y={TL_Y - 22} width={INCIDENT_X - 370} height="44" fill="none" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.7">
          <animate attributeName="stroke-dashoffset" from="7" to="0" dur="2s" repeatCount="indefinite" />
        </rect>
        <text x={(370 + INCIDENT_X) / 2} y="130" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="800" style={{ letterSpacing: '0.22em' }}>
          RPO
        </text>
        <text x={(370 + INCIDENT_X) / 2} y="144" textAnchor="middle" fill="#fbbf24" fontSize="8" style={{ letterSpacing: '0.1em' }}>
          max data loss · ≤ 1ч
        </text>

        {/* RTO window */}
        <rect x={INCIDENT_X} y={TL_Y - 22} width={790 - INCIDENT_X} height="44" fill="url(#rto-band)" />
        <rect x={INCIDENT_X} y={TL_Y - 22} width={790 - INCIDENT_X} height="44" fill="none" stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.7">
          <animate attributeName="stroke-dashoffset" from="7" to="0" dur="2s" repeatCount="indefinite" />
        </rect>
        <text x={(INCIDENT_X + 790) / 2} y="130" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="800" style={{ letterSpacing: '0.22em' }}>
          RTO
        </text>
        <text x={(INCIDENT_X + 790) / 2} y="144" textAnchor="middle" fill="#34d399" fontSize="8" style={{ letterSpacing: '0.1em' }}>
          recovery target · ≤ 4ч
        </text>

        {/* Timeline axis */}
        <line x1={TL_X1} y1={TL_Y} x2={TL_X2} y2={TL_Y} stroke="#475569" strokeWidth="1.3" />
        <polygon points={`${TL_X2},${TL_Y} ${TL_X2 - 8},${TL_Y - 4} ${TL_X2 - 8},${TL_Y + 4}`} fill="#475569" />

        {/* Backup points */}
        {backupPoints.map((bp, i) => (
          <g key={bp.label} transform={`translate(${bp.x} ${TL_Y})`}>
            <line x1="0" y1="-8" x2="0" y2="8" stroke="#475569" strokeWidth="0.8" />
            <circle r="5" fill="#0b1220" stroke="#3b82f6" strokeWidth="1.5" filter="url(#p63-glow)">
              <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <circle r="1.5" fill="#60a5fa" />
            <text y="30" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">{bp.label}</text>
            <text y="42" textAnchor="middle" fill="#60a5fa" fontSize="8" style={{ letterSpacing: '0.12em' }}>backup</text>
          </g>
        ))}

        {/* Incident marker */}
        <g transform={`translate(${INCIDENT_X} ${TL_Y})`}>
          <circle r="22" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.5">
            <animate attributeName="r" values="18;34" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <polygon points="0,-14 13,8 -13,8" fill="#0b1220" stroke="#ef4444" strokeWidth="1.8" filter="url(#p63-glow)">
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="1.4s" repeatCount="indefinite" />
          </polygon>
          <line x1="0" y1="-6" x2="0" y2="2" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="0" cy="5" r="1.2" fill="#ef4444" />
          <text y="-22" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="800" style={{ letterSpacing: '0.22em' }}>
            INCIDENT
          </text>
          <text y="32" textAnchor="middle" fill="#fca5a5" fontSize="9" fontFamily="monospace">T = 0</text>
        </g>

        {/* Recovery steps */}
        {recoverySteps.map((rs, i) => (
          <g key={rs.label} transform={`translate(${rs.x} ${TL_Y})`}>
            <line x1="0" y1="-8" x2="0" y2="8" stroke="#475569" strokeWidth="0.8" />
            {rs.final ? (
              <g>
                <circle r="12" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.5">
                  <animate attributeName="r" values="10;18" dur="1.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0" dur="1.6s" repeatCount="indefinite" />
                </circle>
                <circle r="6" fill="#10b981" filter="url(#p63-glow)">
                  <animate attributeName="r" values="5;7;5" dur="1.4s" repeatCount="indefinite" />
                </circle>
                <path d="M -2.4 0 L -0.5 1.8 L 2.4 -2" fill="none" stroke="#0b1220" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            ) : (
              <>
                <circle r="5" fill="#0b1220" stroke="#10b981" strokeWidth="1.4" filter="url(#p63-glow)">
                  <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                </circle>
                <circle r="1.5" fill="#34d399" />
              </>
            )}
            <text y="30" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">{rs.label}</text>
            <text y="42" textAnchor="middle" fill="#34d399" fontSize="8" style={{ letterSpacing: '0.12em' }}>{rs.note}</text>
          </g>
        ))}

        {/* Moving recovery pulse */}
        <circle r="3" fill="#fcd34d" filter="url(#p63-glow)" opacity="0">
          <animateMotion dur="5s" repeatCount="indefinite" path={`M ${INCIDENT_X} ${TL_Y} L 790 ${TL_Y}`} />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="5s" repeatCount="indefinite" />
        </circle>

        {/* === Separator === */}
        <line x1="60" y1="280" x2="840" y2="280" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="2 6" opacity="0.6" />

        {/* === 3-2-1 section === */}
        <text x="450" y="312" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="700" style={{ letterSpacing: '0.35em' }}>
          BACKUP · 3-2-1
        </text>

        {copies.map((c, i) => (
          <g key={c.label} transform={`translate(${c.x} 410)`}>
            {[0, 1.3].map((d, k) => (
              <circle key={k} r="44" fill="none" stroke={c.color} strokeWidth="0.7" opacity="0">
                <animate attributeName="r" values="38;60" dur="3s" begin={`${(i * 0.3) + d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.45;0" dur="3s" begin={`${(i * 0.3) + d}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <circle r="42" fill="#0b1220" stroke={c.color} strokeWidth="1.5" filter="url(#p63-glow)">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <BackupIcon kind={c.icon} color={c.color} />
            <text y="60" textAnchor="middle" fill={c.color} fontSize="11" fontWeight="800" style={{ letterSpacing: '0.18em' }}>
              {c.label}
            </text>
            <text y="76" textAnchor="middle" fill="#cbd5e1" fontSize="9">
              {c.sub}
            </text>

            {i < copies.length - 1 && (
              <g>
                <line x1="52" y1="0" x2={copies[i + 1].x - c.x - 52} y2="0"
                  stroke="#64748b" strokeWidth="0.8" strokeDasharray="4 5" opacity="0.5">
                  <animate attributeName="stroke-dashoffset" from="9" to="0" dur="1.8s" repeatCount="indefinite" />
                </line>
                <polygon
                  points={`${copies[i + 1].x - c.x - 52},0 ${copies[i + 1].x - c.x - 58},-4 ${copies[i + 1].x - c.x - 58},4`}
                  fill="#64748b" opacity="0.7" />
                <circle r="2.5" fill={copies[i + 1].color} filter="url(#p63-glow)" opacity="0">
                  <animateMotion dur="2.5s" begin={`${i * 0.5}s`} repeatCount="indefinite"
                    path={`M 52,0 L ${copies[i + 1].x - c.x - 52},0`} />
                  <animate attributeName="opacity" values="0;0.95;0.95;0" keyTimes="0;0.1;0.9;1"
                    dur="2.5s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                </circle>
              </g>
            )}
          </g>
        ))}

        {/* Mantra chip */}
        <g transform="translate(450 510)">
          <rect x="-170" y="-13" width="340" height="26" rx="13" fill="rgba(15,23,42,0.72)" stroke="#334155" strokeWidth="0.8" />
          <text x="-108" y="4" textAnchor="middle" fill="#93c5fd" fontSize="10.5" fontWeight="800" style={{ letterSpacing: '0.18em' }}>3 КОПИЯ</text>
          <line x1="-50" y1="-8" x2="-50" y2="8" stroke="#334155" strokeWidth="0.6" />
          <text x="0" y="4" textAnchor="middle" fill="#c4b5fd" fontSize="10.5" fontWeight="800" style={{ letterSpacing: '0.18em' }}>2 МЕДИИ</text>
          <line x1="50" y1="-8" x2="50" y2="8" stroke="#334155" strokeWidth="0.6" />
          <text x="110" y="4" textAnchor="middle" fill="#6ee7b7" fontSize="10.5" fontWeight="800" style={{ letterSpacing: '0.18em' }}>1 OFF-SITE</text>
        </g>

        <text x={450} y={545} textAnchor="middle" fill="#475569" fontSize="9.5" style={{ letterSpacing: '0.22em' }}>
          тествай възстановяването · иначе не е backup
        </text>
      </svg>
    </div>
  )
}
