// Scene 1.2 — Threat landscape war-room
// Central system under constant attack from 6 orbiting threat types.
// Radar sweep + live attack counter + incoming attack pulses.

import { useEffect, useState } from 'react'

const CX = 450
const CY = 290
const ORBIT_R = 210

const threats = [
  { id: 'malware',  label: 'Malware',    color: '#ef4444', angle: -90, path: 'M -10 -6 L 0 -11 L 10 -6 L 10 6 L 0 11 L -10 6 Z M -3 -3 H 3 V 3 H -3 Z' },
  { id: 'phishing', label: 'Phishing',   color: '#f59e0b', angle: -30, path: 'M -10 -7 L 10 -7 L 0 5 Z M -10 -7 L 0 5 L -10 9 Z M 10 -7 L 0 5 L 10 9 Z' },
  { id: 'ddos',     label: 'DDoS',       color: '#8b5cf6', angle:  30, path: 'M 0 -10 A 10 10 0 1 1 -0.01 -10 M 0 -5 A 5 5 0 1 0 0.01 -5' },
  { id: 'mitm',     label: 'MitM',       color: '#06b6d4', angle:  90, path: 'M -11 0 L -4 0 M 4 0 L 11 0 M -4 -5 V 5 H 4 V -5 Z' },
  { id: 'sqli',     label: 'SQL Inj.',   color: '#10b981', angle: 150, path: 'M -9 -8 H 9 V -3 H -4 V 2 H 5 V 8 H -9 V 3 H 4 V -2 H -4 Z' },
  { id: 'social',   label: 'Social Eng.', color: '#ec4899', angle: 210, path: 'M 0 -9 A 5 5 0 1 1 0 0.1 M -8 9 A 10 8 0 0 1 8 9' },
].map(t => {
  const rad = (t.angle * Math.PI) / 180
  return {
    ...t,
    x: CX + ORBIT_R * Math.cos(rad),
    y: CY + ORBIT_R * Math.sin(rad),
  }
})

export default function Scene_1_2() {
  const [counter, setCounter] = useState(1248)

  // Live attack counter — increments constantly
  useEffect(() => {
    const id = setInterval(() => {
      setCounter(c => c + Math.floor(Math.random() * 4) + 1)
    }, 220)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Live counter HUD — top right */}
      <div className="absolute top-4 right-6 z-10 flex items-center gap-3 px-4 py-2 rounded-md border border-red-500/30 bg-slate-950/70 backdrop-blur-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.2em] text-red-300/80">
            Live · атаки / седмица
          </span>
          <span
            className="text-lg font-mono font-bold text-red-200 tabular-nums"
            style={{ textShadow: '0 0 10px rgba(239,68,68,0.4)' }}
          >
            {counter.toLocaleString('bg-BG')}
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="radar-sweep">
            <stop offset="0%"   stopColor="#ef4444" stopOpacity="0.18" />
            <stop offset="70%"  stopColor="#ef4444" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="core-danger">
            <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <filter id="t-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {threats.map(t => (
            <path
              key={`atk-${t.id}`}
              id={`atk-path-${t.id}`}
              d={`M ${t.x},${t.y} L ${CX},${CY}`}
            />
          ))}
          <path id="orbit-path" d={`M ${CX + ORBIT_R},${CY} A ${ORBIT_R},${ORBIT_R} 0 1,1 ${CX + ORBIT_R - 0.01},${CY}`} />
        </defs>

        {/* Background — concentric target rings */}
        <g transform={`translate(${CX} ${CY})`} opacity="0.4">
          {[50, 100, 150, 210, 260].map((r, i) => (
            <circle key={r} r={r} fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray={i % 2 === 0 ? '2 5' : '5 10'} />
          ))}
          <line x1="-270" y1="0" x2="270" y2="0" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 8" />
          <line x1="0" y1="-260" x2="0" y2="260" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 8" />
        </g>

        {/* Radar sweep wedge */}
        <g transform={`translate(${CX} ${CY})`}>
          <path d={`M 0,0 L 0,-260 A 260,260 0 0,1 184,-184 Z`} fill="url(#radar-sweep)">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="7s" repeatCount="indefinite" />
          </path>
          <line x1="0" y1="0" x2="0" y2="-260" stroke="#ef4444" strokeWidth="0.8" opacity="0.4">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="7s" repeatCount="indefinite" />
          </line>
        </g>

        {/* Orbit ring */}
        <circle cx={CX} cy={CY} r={ORBIT_R} fill="none" stroke="#334155" strokeWidth="0.6" strokeDasharray="3 7" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur="80s" repeatCount="indefinite" />
        </circle>

        {/* Orbiting scan dot on orbit ring */}
        <circle r="2.5" fill="#22d3ee" opacity="0.6" filter="url(#t-glow)">
          <animateMotion dur="12s" repeatCount="indefinite">
            <mpath href="#orbit-path" />
          </animateMotion>
        </circle>

        {/* Attack trails — each threat fires periodic pulses toward center */}
        {threats.map((t, i) => (
          <g key={`atk-${t.id}`}>
            {/* Dashed attack line, faint */}
            <line x1={t.x} y1={t.y} x2={CX} y2={CY}
              stroke={t.color} strokeWidth="0.6" strokeDasharray="3 5" opacity="0.25">
              <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />
            </line>
            {/* Projectile pulses — staggered */}
            {[0, 2.2, 4.4].map((delay, k) => (
              <circle key={k} r="3.5" fill={t.color} filter="url(#t-glow)" opacity="0">
                <animateMotion
                  dur="3.4s"
                  begin={`${(i * 0.55) + delay}s`}
                  repeatCount="indefinite"
                >
                  <mpath href={`#atk-path-${t.id}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;0.9;0.9;0"
                  dur="3.4s"
                  begin={`${(i * 0.55) + delay}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="r"
                  values="5;3.5;2.5"
                  dur="3.4s"
                  begin={`${(i * 0.55) + delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        ))}

        {/* Center system — fortress core */}
        <g transform={`translate(${CX} ${CY})`}>
          <circle r="42" fill="url(#core-danger)" />
          {/* Impact shield pulses (when hit) */}
          {[0, 1.1, 2.2].map((d, i) => (
            <circle key={i} r="22" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="18;48" dur="2.2s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="2.2s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {/* Hex shield */}
          <polygon
            points="0,-22 19,-11 19,11 0,22 -19,11 -19,-11"
            fill="#0b1220"
            stroke="#60a5fa"
            strokeWidth="1.6"
            filter="url(#t-glow)"
          >
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.4s" repeatCount="indefinite" />
          </polygon>
          {/* Small inner shield */}
          <path d="M 0 -12 L 9 -6 L 9 5 C 9 10 0 14 0 14 C 0 14 -9 10 -9 5 L -9 -6 Z"
            fill="none" stroke="#93c5fd" strokeWidth="1.4" />
          <text y="34" textAnchor="middle" fill="#64748b" fontSize="10"
            style={{ letterSpacing: '0.15em' }}>
            ВАШАТА СИСТЕМА
          </text>
        </g>

        {/* Threat nodes */}
        {threats.map((t, i) => (
          <g key={t.id} transform={`translate(${t.x} ${t.y})`}>
            {/* Pulse rings */}
            {[0, 1.3].map((d, k) => (
              <circle key={k} r="26" fill="none" stroke={t.color} strokeWidth="0.8" opacity="0">
                <animate attributeName="r" values="24;42" dur="3s" begin={`${(i * 0.4) + d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0" dur="3s" begin={`${(i * 0.4) + d}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* Orbiting dot around node */}
            <circle r="1.6" fill={t.color} opacity="0.6">
              <animateMotion dur={`${4 + i * 0.6}s`} repeatCount="indefinite"
                path="M 24 0 A 24 24 0 1 1 23.99 0" />
            </circle>

            {/* Node body */}
            <circle r="24" fill="#0b1220" stroke={t.color} strokeWidth="1.5" filter="url(#t-glow)">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur={`${2.8 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>

            {/* Icon path */}
            <path d={t.path} fill="none" stroke={t.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

            {/* Label */}
            <text y="44" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="600">
              {t.label}
            </text>
          </g>
        ))}

        {/* Top-left "ALERT" indicator */}
        <g transform="translate(60, 44)" opacity="0.75">
          <rect x="-40" y="-14" width="80" height="22" rx="3" fill="#0b1220" stroke="#ef4444" strokeWidth="0.8" />
          <circle cx="-28" cy="-3" r="3" fill="#ef4444">
            <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
          </circle>
          <text x="-20" y="1" fill="#fca5a5" fontSize="11" fontWeight="600" style={{ letterSpacing: '0.15em' }}>
            ALERT
          </text>
        </g>
      </svg>
    </div>
  )
}
