// Scene 1.3 — Defense-in-depth castle
// Four concentric defensive walls protecting a central data vault.
// Incoming attack particles bombard the outer layer; most bounce off,
// rare ones penetrate deeper. Floating breach-cost counter on the side.

import { useEffect, useState } from 'react'

const CX = 450
const CY = 290

const walls = [
  { r: 235, label: 'Обучение · Политики', color: '#3b82f6', sub: 'People' },
  { r: 185, label: 'Firewall · Сегментация', color: '#8b5cf6', sub: 'Network' },
  { r: 135, label: 'MFA · Least Privilege',  color: '#06b6d4', sub: 'Access' },
  { r: 85,  label: 'Криптиране · Backup',    color: '#10b981', sub: 'Data'   },
]

// Incoming attack vectors: start outside radius ~340, stop at various walls
const attacks = Array.from({ length: 22 }).map((_, i) => {
  const angle = (i * 360) / 22 + (i % 3) * 7
  const rad = (angle * Math.PI) / 180
  const startR = 330
  // Most hit outer wall; a few (every 7th) penetrate to wall 2
  const hitIndex = i % 7 === 0 ? 1 : 0
  const stopR = walls[hitIndex].r
  return {
    key: i,
    x1: CX + startR * Math.cos(rad),
    y1: CY + startR * Math.sin(rad),
    x2: CX + stopR * Math.cos(rad),
    y2: CY + stopR * Math.sin(rad),
    delay: (i * 0.45) % 9,
    dur: 2.6 + (i % 4) * 0.3,
    deep: hitIndex === 1,
  }
})

export default function Scene_1_3() {
  const [cost, setCost] = useState(4.45)
  const [incidents, setIncidents] = useState(38)

  useEffect(() => {
    const a = setInterval(() => {
      setCost(c => +(c + (Math.random() * 0.01 - 0.002)).toFixed(2))
    }, 950)
    const b = setInterval(() => {
      setIncidents(n => n + 1)
    }, 2400)
    return () => {
      clearInterval(a); clearInterval(b)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Breach cost HUD — top-right */}
      <div className="absolute top-4 right-6 z-10 flex flex-col items-end gap-1 px-4 py-3 rounded-md border border-red-500/30 bg-slate-950/70 backdrop-blur-sm">
        <span className="text-[10px] uppercase tracking-[0.18em] text-red-300/80">
          Средна цена на data breach
        </span>
        <span
          className="text-2xl font-mono font-bold text-red-200 tabular-nums"
          style={{ animation: 'value-pulse 3.2s ease-in-out infinite' }}
        >
          ${cost.toFixed(2)}M
        </span>
        <span className="text-[10px] text-slate-500 tracking-wide">
          IBM Cost of Data Breach · 2023
        </span>
      </div>

      {/* Incident feed — bottom-right */}
      <div className="absolute bottom-4 right-6 z-10 flex flex-col items-end gap-1 px-3 py-2 rounded-md border border-slate-600/30 bg-slate-950/50 backdrop-blur-sm">
        <span className="text-[9px] uppercase tracking-[0.15em] text-slate-400">
          отразени атаки
        </span>
        <span className="text-lg font-mono font-semibold text-emerald-300 tabular-nums">
          {incidents.toLocaleString('bg-BG')}
        </span>
      </div>

      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          {walls.map((w, i) => (
            <radialGradient key={i} id={`wall-grad-${i}`}>
              <stop offset="0%"   stopColor={w.color} stopOpacity="0" />
              <stop offset="85%"  stopColor={w.color} stopOpacity="0.06" />
              <stop offset="100%" stopColor={w.color} stopOpacity="0.18" />
            </radialGradient>
          ))}
          <radialGradient id="vault-grad">
            <stop offset="0%"   stopColor="#34d399" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
          </radialGradient>
          <filter id="d-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {attacks.map(a => (
            <path
              key={`attack-path-${a.key}`}
              id={`attack-path-${a.key}`}
              d={`M ${a.x1},${a.y1} L ${a.x2},${a.y2}`}
            />
          ))}
        </defs>

        {/* Concentric walls */}
        {walls.map((w, i) => (
          <g key={i}>
            {/* Wall filled halo */}
            <circle cx={CX} cy={CY} r={w.r} fill={`url(#wall-grad-${i})`} />

            {/* Wall line */}
            <circle
              cx={CX} cy={CY} r={w.r}
              fill="none"
              stroke={w.color}
              strokeWidth={i === 0 ? 1.6 : 1.2}
              strokeDasharray={i === 0 ? '6 6' : '4 10'}
              opacity="0.75"
              filter="url(#d-glow)"
            >
              <animate attributeName="stroke-opacity" values="0.45;0.95;0.45" dur={`${3.4 + i * 0.6}s`} repeatCount="indefinite" />
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${CX} ${CY}`}
                to={`${i % 2 === 0 ? 360 : -360} ${CX} ${CY}`}
                dur={`${24 + i * 6}s`}
                repeatCount="indefinite"
              />
            </circle>

            {/* Orbiting guardian dot on the wall */}
            <circle r="3" fill={w.color} opacity="0.85" filter="url(#d-glow)">
              <animateMotion
                dur={`${8 + i * 2.5}s`}
                repeatCount="indefinite"
                path={`M ${CX + w.r},${CY} A ${w.r},${w.r} 0 1,1 ${CX + w.r - 0.01},${CY}`}
              />
            </circle>
            <circle r="1.8" fill={w.color} opacity="0.55">
              <animateMotion
                dur={`${10 + i * 2}s`}
                begin={`${i * 0.5}s`}
                repeatCount="indefinite"
                path={`M ${CX - w.r},${CY} A ${w.r},${w.r} 0 1,1 ${CX - w.r - 0.01},${CY}`}
              />
            </circle>

            {/* Layer label — positioned at top of each ring */}
            <text
              x={CX} y={CY - w.r + 14}
              textAnchor="middle"
              fill={w.color}
              fontSize="11"
              fontWeight="600"
              style={{ letterSpacing: '0.08em' }}
              opacity="0.85"
            >
              {w.label}
            </text>
          </g>
        ))}

        {/* Incoming attack projectiles */}
        {attacks.map(a => (
          <g key={`proj-${a.key}`}>
            {/* Tracer trail */}
            <line
              x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
              stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.12"
            />
            {/* Projectile */}
            <circle r={a.deep ? 3.5 : 2.8} fill="#ef4444" filter="url(#d-glow)" opacity="0">
              <animateMotion
                dur={`${a.dur}s`}
                begin={`${a.delay}s`}
                repeatCount="indefinite"
              >
                <mpath href={`#attack-path-${a.key}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;0.9;0.9;0"
                dur={`${a.dur}s`}
                begin={`${a.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
            {/* Impact flash at the wall — synced with projectile cycle */}
            <circle cx={a.x2} cy={a.y2} r="3" fill={a.deep ? '#f59e0b' : '#fca5a5'} opacity="0">
              <animate
                attributeName="r"
                values="3;3;14"
                keyTimes="0;0.88;1"
                dur={`${a.dur}s`}
                begin={`${a.delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0;0.9;0"
                keyTimes="0;0.85;0.93;1"
                dur={`${a.dur}s`}
                begin={`${a.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* Central vault */}
        <g transform={`translate(${CX} ${CY})`}>
          <circle r="60" fill="url(#vault-grad)" />

          {/* Vault breathing rings */}
          {[0, 1.5].map((d, i) => (
            <circle key={i} r="30" fill="none" stroke="#34d399" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="28;60" dur="3.4s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="3.4s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Vault — octagonal with lock */}
          <polygon
            points="-22,-30 22,-30 38,-14 38,14 22,30 -22,30 -38,14 -38,-14"
            fill="#0b1220"
            stroke="#34d399"
            strokeWidth="1.8"
            filter="url(#d-glow)"
          >
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.6s" repeatCount="indefinite" />
          </polygon>

          {/* Lock body */}
          <rect x="-12" y="-4" width="24" height="18" rx="2" fill="#0b1220" stroke="#6ee7b7" strokeWidth="1.4" />
          <path d="M -7 -4 V -10 A 7 7 0 0 1 7 -10 V -4" fill="none" stroke="#6ee7b7" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="0" cy="6" r="2" fill="#6ee7b7">
            <animate attributeName="fill-opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" />
          </circle>

          <text y="52" textAnchor="middle" fill="#94a3b8" fontSize="10" style={{ letterSpacing: '0.2em' }}>
            ДАННИ · АКТИВИ
          </text>
        </g>

        {/* Side: principles banner */}
        <g transform="translate(30, 490)" opacity="0.9">
          <text x="0" y="0" fill="#60a5fa" fontSize="11" fontWeight="600" style={{ letterSpacing: '0.2em' }}>
            DEFENSE IN DEPTH
          </text>
          <text x="0" y="16" fill="#64748b" fontSize="10">
            няколко слоя · Least Privilege
          </text>
        </g>
      </svg>
    </div>
  )
}
