// Scene 2.4 — Defense funnel
// Horizontal attack pipeline: threats emerge from the left and are filtered
// through 4 defense gates before they can reach the protected data on the
// right. Most threats are blocked at the outer gates; a few pass the first
// one or two; nothing reaches the data. Live "blocked" counter on top.

import { useEffect, useState } from 'react'

// Vertical extents of the funnel
const Y_TOP = 110
const Y_BOT = 470
const Y_MID = (Y_TOP + Y_BOT) / 2

const gates = [
  { id: 'email',    x: 220, label: 'Email филтър',   sub: 'SPF · DKIM · DMARC',   color: '#3b82f6' },
  { id: 'av',       x: 380, label: 'Антивирус · Ъпдейти', sub: 'real-time scan',       color: '#10b981' },
  { id: 'user',     x: 540, label: 'Бдителност',     sub: 'STOP · THINK · CONNECT',  color: '#f59e0b' },
  { id: 'backup',   x: 700, label: 'Backup 3-2-1',   sub: '3 копия · 2 медии · 1 офсайт', color: '#8b5cf6' },
]

const VAULT_X = 830
const SOURCE_X = 80

// 26 attacks, each stopping at a gate index 0-3 (mostly 0 and 1)
const attacks = Array.from({ length: 26 }).map((_, i) => {
  // Distribution: gate 0 (60%), gate 1 (25%), gate 2 (12%), gate 3 (3%)
  const r = (i * 13 + 5) % 100
  const stopGate = r < 60 ? 0 : r < 85 ? 1 : r < 97 ? 2 : 3
  const y = Y_TOP + ((i * 41) % (Y_BOT - Y_TOP))
  const hues = ['#ef4444', '#f97316', '#8b5cf6', '#06b6d4', '#ec4899', '#10b981']
  return {
    key: i,
    y,
    stopGate,
    color: hues[i % hues.length],
    dur: 3.2 + (i % 5) * 0.3,
    delay: (i * 0.38) % 10,
  }
})

export default function Scene_2_4() {
  const [blocked, setBlocked] = useState(14823)

  useEffect(() => {
    const id = setInterval(() => {
      setBlocked(b => b + Math.floor(Math.random() * 3) + 1)
    }, 380)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Top HUD — blocked counter + data OK */}
      <div className="absolute top-4 right-6 z-10 flex items-center gap-3 px-4 py-2 rounded-md border border-emerald-500/30 bg-slate-950/70 backdrop-blur-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.18em] text-emerald-300/80">
            Блокирани заплахи
          </span>
          <span className="font-mono text-lg font-bold text-emerald-200 tabular-nums">
            {blocked.toLocaleString('bg-BG')}
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="f-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="vault-safe">
            <stop offset="0%"   stopColor="#34d399" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="threat-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="#7f1d1d" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
          </linearGradient>
          {attacks.map(a => {
            const stopX = gates[a.stopGate].x
            return (
              <path
                key={`atk-${a.key}`}
                id={`atk-${a.key}`}
                d={`M ${SOURCE_X},${a.y} L ${stopX},${a.y}`}
              />
            )
          })}
        </defs>

        {/* Left-side threat fog */}
        <rect x="0" y={Y_TOP - 30} width="120" height={Y_BOT - Y_TOP + 60} fill="url(#threat-grad)" />

        {/* Source label */}
        <g transform={`translate(${SOURCE_X - 30} ${Y_MID})`}>
          <text textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="600" style={{ letterSpacing: '0.2em' }}>
            <tspan x="0" dy="-20">ИНТЕРНЕТ</tspan>
            <tspan x="0" dy="16">·</tspan>
            <tspan x="0" dy="16">ЗАПЛАХИ</tspan>
          </text>
        </g>

        {/* Threat swirl at source */}
        <g transform={`translate(${SOURCE_X + 10} ${Y_MID})`}>
          {[0, 1.3, 2.6].map((d, i) => (
            <circle key={i} r="22" fill="none" stroke="#ef4444" strokeWidth="0.8" opacity="0">
              <animate attributeName="r" values="18;60" dur="3s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="3s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <circle r="12" fill="#0b1220" stroke="#ef4444" strokeWidth="1.4" filter="url(#f-glow)">
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          </circle>
          <text textAnchor="middle" y="4" fill="#ef4444" fontSize="12" fontWeight="700">
            ⚠
          </text>
        </g>

        {/* Defense gates */}
        {gates.map((g, gi) => (
          <g key={g.id}>
            {/* Gate glow backdrop */}
            <rect
              x={g.x - 10} y={Y_TOP - 20}
              width="20" height={Y_BOT - Y_TOP + 40}
              rx="6"
              fill={g.color}
              opacity="0.06"
            />
            {/* Gate bar */}
            <line
              x1={g.x} y1={Y_TOP - 16}
              x2={g.x} y2={Y_BOT + 16}
              stroke={g.color}
              strokeWidth="1.2"
              strokeDasharray="4 6"
              opacity="0.55"
            >
              <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.3;0.9;0.3" dur={`${3 + gi * 0.4}s`} repeatCount="indefinite" />
            </line>
            {/* Top emblem */}
            <g transform={`translate(${g.x} ${Y_TOP - 36})`}>
              <circle r="14" fill="#0b1220" stroke={g.color} strokeWidth="1.4" filter="url(#f-glow)">
                <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur={`${2.6 + gi * 0.3}s`} repeatCount="indefinite" />
              </circle>
              <text textAnchor="middle" y="4" fill={g.color} fontSize="13" fontWeight="700">
                {gi + 1}
              </text>
              {/* Pulse ring */}
              <circle r="14" fill="none" stroke={g.color} strokeWidth="0.8" opacity="0">
                <animate attributeName="r" values="14;28" dur={`${2.4 + gi * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0" dur={`${2.4 + gi * 0.3}s`} repeatCount="indefinite" />
              </circle>
            </g>
            {/* Bottom label */}
            <g transform={`translate(${g.x} ${Y_BOT + 36})`}>
              <text textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="600">
                {g.label}
              </text>
              <text textAnchor="middle" y="16" fill="#64748b" fontSize="10">
                {g.sub}
              </text>
            </g>
            {/* Small orbiting dot travelling along the gate bar */}
            <circle r="2.5" fill={g.color} opacity="0.8" filter="url(#f-glow)" cx={g.x} cy={Y_TOP - 16}>
              <animate attributeName="cy" values={`${Y_TOP - 16};${Y_BOT + 16};${Y_TOP - 16}`}
                dur={`${6 + gi * 1.2}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Attack projectiles */}
        {attacks.map(a => {
          const stopX = gates[a.stopGate].x
          return (
            <g key={`p-${a.key}`}>
              {/* Faint tracer */}
              <line x1={SOURCE_X} y1={a.y} x2={stopX} y2={a.y}
                stroke={a.color} strokeWidth="0.4" strokeDasharray="2 4" opacity="0.1" />

              {/* Projectile */}
              <circle r="3" fill={a.color} filter="url(#f-glow)" opacity="0">
                <animateMotion
                  dur={`${a.dur}s`}
                  begin={`${a.delay}s`}
                  repeatCount="indefinite"
                >
                  <mpath href={`#atk-${a.key}`} />
                </animateMotion>
                <animate attributeName="opacity"
                  values="0;0.95;0.95;0"
                  keyTimes="0;0.1;0.88;1"
                  dur={`${a.dur}s`}
                  begin={`${a.delay}s`}
                  repeatCount="indefinite" />
              </circle>

              {/* Impact flash at the gate */}
              <circle cx={stopX} cy={a.y} r="3" fill={gates[a.stopGate].color} opacity="0">
                <animate attributeName="r"
                  values="3;3;12"
                  keyTimes="0;0.88;1"
                  dur={`${a.dur}s`}
                  begin={`${a.delay}s`}
                  repeatCount="indefinite" />
                <animate attributeName="opacity"
                  values="0;0;0.9;0"
                  keyTimes="0;0.85;0.93;1"
                  dur={`${a.dur}s`}
                  begin={`${a.delay}s`}
                  repeatCount="indefinite" />
              </circle>

              {/* Secondary neutralize puff — green checkmark pulse */}
              <circle cx={stopX} cy={a.y} r="1" fill="#34d399" opacity="0">
                <animate attributeName="r" values="1;1;6"
                  keyTimes="0;0.92;1" dur={`${a.dur}s`} begin={`${a.delay}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0;0.8;0"
                  keyTimes="0;0.9;0.97;1" dur={`${a.dur}s`} begin={`${a.delay}s`} repeatCount="indefinite" />
              </circle>
            </g>
          )
        })}

        {/* Protected data vault on the right */}
        <g transform={`translate(${VAULT_X} ${Y_MID})`}>
          <circle r="64" fill="url(#vault-safe)" />
          {/* Calm breathing rings */}
          {[0, 1.6].map((d, i) => (
            <circle key={i} r="34" fill="none" stroke="#34d399" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="32;62" dur="3.4s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="3.4s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {/* Vault body — octagon */}
          <polygon
            points="-24,-32 24,-32 40,-14 40,14 24,32 -24,32 -40,14 -40,-14"
            fill="#0b1220" stroke="#34d399" strokeWidth="1.8" filter="url(#f-glow)"
          >
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.6s" repeatCount="indefinite" />
          </polygon>
          {/* Checkmark */}
          <path d="M -10 0 L -2 10 L 14 -10" fill="none" stroke="#6ee7b7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <animate attributeName="stroke-opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
          </path>
          {/* Label */}
          <text y="54" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="700" style={{ letterSpacing: '0.2em' }}>
            ЗАЩИТЕНИ
          </text>
          <text y="70" textAnchor="middle" fill="#94a3b8" fontSize="11">
            данни · активи
          </text>
        </g>

        {/* Axis caption at top */}
        <g>
          <text x={450} y="74" textAnchor="middle" fill="#64748b" fontSize="11" style={{ letterSpacing: '0.2em' }}>
            DEFENSE IN DEPTH · няколко слоя = няколко шанса
          </text>
        </g>
      </svg>
    </div>
  )
}
