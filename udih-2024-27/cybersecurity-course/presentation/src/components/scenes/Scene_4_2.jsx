// Scene 4.2 — GDPR regulation
// Left: EU/GDPR seal with 12-star ring and 6 principle satellites orbiting.
// Right column: animated penalty meter (up to €20M or 4%) with a running
// fines ticker, plus a live 72-hour breach-notification countdown clock.

import { useEffect, useState } from 'react'

const CX = 320
const CY = 300
const R_PRINCIPLES = 190

const principles = [
  { id: 'lawful',     label: 'Законосъобразност', glyph: 'scales',   angle: -90  },
  { id: 'purpose',    label: 'Целево ограничение', glyph: 'target',   angle: -30  },
  { id: 'minim',      label: 'Минимум данни',      glyph: 'filter',   angle:  30  },
  { id: 'accuracy',   label: 'Точност',            glyph: 'check',    angle:  90  },
  { id: 'retention',  label: 'Ограничено съхранение', glyph: 'clock', angle:  150 },
  { id: 'security',   label: 'Сигурност',          glyph: 'shield',   angle:  210 },
].map(p => {
  const rad = (p.angle * Math.PI) / 180
  return { ...p, x: CX + R_PRINCIPLES * Math.cos(rad), y: CY + R_PRINCIPLES * Math.sin(rad) }
})

function PrincipleGlyph({ kind, color }) {
  switch (kind) {
    case 'scales':
      return (
        <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <line x1="0" y1="-10" x2="0" y2="10" />
          <line x1="-10" y1="-8" x2="10" y2="-8" />
          <path d="M -10 -8 L -14 4 H -6 Z" />
          <path d="M 10 -8 L 14 4 H 6 Z" />
          <line x1="-4" y1="10" x2="4" y2="10" />
        </g>
      )
    case 'target':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3">
          <circle r="10" />
          <circle r="6" />
          <circle r="2" fill={color} />
        </g>
      )
    case 'filter':
      return (
        <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round">
          <path d="M -11 -8 H 11 L 2 2 V 10 L -2 10 V 2 Z" />
        </g>
      )
    case 'check':
      return (
        <g fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -10 0 L -3 8 L 10 -7" />
        </g>
      )
    case 'clock':
      return (
        <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round">
          <circle r="10" />
          <line x1="0" y1="0" x2="0" y2="-6" />
          <line x1="0" y1="0" x2="5" y2="3" />
        </g>
      )
    case 'shield':
      return (
        <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 0 -10 L 9 -6 L 9 3 C 9 8 0 12 0 12 C 0 12 -9 8 -9 3 L -9 -6 Z" />
          <path d="M -4 1 L -1 4 L 5 -3" />
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

export default function Scene_4_2() {
  // 72-hour countdown that just loops — for dramatic effect
  const [remaining, setRemaining] = useState(72 * 3600 - 1234)

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(r => (r <= 1 ? 72 * 3600 : r - 1))
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
          <filter id="gdpr-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="gdpr-core">
            <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          {principles.map(p => (
            <path
              key={`pl-${p.id}`}
              id={`pl-${p.id}`}
              d={`M ${CX},${CY} L ${p.x},${p.y}`}
            />
          ))}
        </defs>

        {/* Decorative rings */}
        <circle cx={CX} cy={CY} r={R_PRINCIPLES + 40} fill="none" stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 9" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur="55s" repeatCount="indefinite" />
        </circle>
        <circle cx={CX} cy={CY} r={R_PRINCIPLES + 58} fill="none" stroke="#334155" strokeWidth="0.3" strokeDasharray="1 14" opacity="0.4">
          <animateTransform attributeName="transform" type="rotate" from={`360 ${CX} ${CY}`} to={`0 ${CX} ${CY}`} dur="40s" repeatCount="indefinite" />
        </circle>

        {/* Energy lines to principles */}
        {principles.map((p, i) => (
          <g key={`ln-${p.id}`}>
            <line x1={CX} y1={CY} x2={p.x} y2={p.y}
              stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.3">
              <animate attributeName="stroke-dashoffset" from="9" to="0" dur="1.6s" repeatCount="indefinite" />
            </line>
            {/* Traveling packet outward */}
            <circle r="2.5" fill="#60a5fa" filter="url(#gdpr-glow)" opacity="0">
              <animateMotion dur="3.6s" begin={`${i * 0.5}s`} repeatCount="indefinite">
                <mpath href={`#pl-${p.id}`} />
              </animateMotion>
              <animate attributeName="opacity"
                values="0;0.9;0.9;0" keyTimes="0;0.2;0.8;1"
                dur="3.6s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Central GDPR seal */}
        <g transform={`translate(${CX} ${CY})`}>
          <circle r="100" fill="url(#gdpr-core)" />

          {/* 12 EU stars ring */}
          <g>
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i * 30 - 90) * Math.PI / 180
              const x = Math.cos(a) * 78
              const y = Math.sin(a) * 78
              return (
                <g key={i} transform={`translate(${x} ${y})`}>
                  <path d="M 0 -6 L 1.5 -2 L 6 -2 L 2.5 1 L 4 5 L 0 2.5 L -4 5 L -2.5 1 L -6 -2 L -1.5 -2 Z"
                    fill="#fcd34d" stroke="#facc15" strokeWidth="0.4">
                    <animate attributeName="fill-opacity"
                      values="0.4;1;0.4" dur="3s"
                      begin={`${i * 0.25}s`} repeatCount="indefinite" />
                  </path>
                </g>
              )
            })}
            {/* Rotating ring of stars */}
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="55s" repeatCount="indefinite" />
          </g>

          {/* Inner circle with GDPR text */}
          <circle r="56" fill="#0b1220" stroke="#3b82f6" strokeWidth="1.6" filter="url(#gdpr-glow)">
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <text y="-4" textAnchor="middle" fill="#bfdbfe" fontSize="24" fontWeight="800"
            style={{ letterSpacing: '0.08em' }}>
            GDPR
          </text>
          <text y="14" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="600"
            style={{ letterSpacing: '0.25em' }}>
            EU 2016/679
          </text>
          <text y="28" textAnchor="middle" fill="#64748b" fontSize="8.5"
            style={{ letterSpacing: '0.15em' }}>
            от 2018 · за целия ЕС
          </text>
        </g>

        {/* Principle satellites */}
        {principles.map((p, i) => (
          <g key={p.id} transform={`translate(${p.x} ${p.y})`}>
            {[0, 1.2].map((d, k) => (
              <circle key={k} r="26" fill="none" stroke="#60a5fa" strokeWidth="0.7" opacity="0">
                <animate attributeName="r" values="24;40" dur="3s" begin={`${(i * 0.35) + d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0" dur="3s" begin={`${(i * 0.35) + d}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <circle r="2" fill="#60a5fa" opacity="0.6">
              <animateMotion dur={`${4 + i * 0.4}s`} repeatCount="indefinite"
                path="M 22 0 A 22 22 0 1 1 21.99 0" />
            </circle>
            <circle r="22" fill="#0b1220" stroke="#60a5fa" strokeWidth="1.3" filter="url(#gdpr-glow)">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur={`${2.8 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>
            <PrincipleGlyph kind={p.glyph} color="#60a5fa" />
            <text y="42" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="600">
              {p.label}
            </text>
          </g>
        ))}

        {/* === Right column: penalties + breach timer === */}
        <g transform="translate(640 120)">
          <text fill="#fca5a5" fontSize="11" fontWeight="700" style={{ letterSpacing: '0.22em' }}>
            МАКСИМАЛНА ГЛОБА
          </text>
          {/* Big number */}
          <text y="42" fill="#fecaca" fontSize="40" fontWeight="800" fontFamily="monospace">
            €20M
          </text>
          <text y="64" fill="#94a3b8" fontSize="11" fontWeight="500">
            или <tspan fill="#fecaca" fontWeight="700">4%</tspan> от годишния оборот
          </text>

          {/* Penalty meter */}
          <g transform="translate(0 90)">
            <rect x="0" y="0" width="220" height="14" rx="3"
              fill="#020617" stroke="#7f1d1d" strokeWidth="0.8" />
            <rect x="0" y="0" width="0" height="14" rx="3" fill="#ef4444" filter="url(#gdpr-glow)">
              <animate attributeName="width" values="0;210;210;0"
                keyTimes="0;0.55;0.95;1"
                dur="12s" repeatCount="indefinite" />
            </rect>
            {/* Scale ticks */}
            {[0, 0.25, 0.5, 0.75, 1].map((t, k) => (
              <line key={k} x1={t * 220} y1="14" x2={t * 220} y2="20" stroke="#475569" strokeWidth="0.8" />
            ))}
            <text x="0" y="32" fill="#64748b" fontSize="9">€0</text>
            <text x="110" y="32" textAnchor="middle" fill="#64748b" fontSize="9">€10M</text>
            <text x="220" y="32" textAnchor="end" fill="#64748b" fontSize="9">€20M</text>
          </g>

          {/* Recent fines ticker */}
          <g transform="translate(0 148)">
            <text fill="#94a3b8" fontSize="10" style={{ letterSpacing: '0.2em' }}>
              ПРИМЕРНИ ГЛОБИ
            </text>
            {[
              { company: 'Meta',   amount: '€1.2B', year: 2023 },
              { company: 'Amazon', amount: '€746M', year: 2021 },
              { company: 'Google', amount: '€90M',  year: 2022 },
            ].map((f, i) => (
              <g key={f.company} transform={`translate(0 ${20 + i * 22})`}>
                <circle cx="4" cy="-3" r="3" fill="#ef4444">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
                <text x="14" y="0" fill="#cbd5e1" fontSize="11.5" fontWeight="600">
                  {f.company}
                </text>
                <text x="80" y="0" fill="#fca5a5" fontSize="11.5" fontWeight="700" fontFamily="monospace">
                  {f.amount}
                </text>
                <text x="160" y="0" fill="#64748b" fontSize="10">
                  {f.year}
                </text>
              </g>
            ))}
          </g>
        </g>

        {/* 72h breach-notification clock */}
        <g transform="translate(640 400)">
          <rect x="0" y="0" width="220" height="100" rx="8"
            fill="#0b1220" stroke="#f59e0b" strokeWidth="1"
            filter="url(#gdpr-glow)">
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="2.4s" repeatCount="indefinite" />
          </rect>
          <text x="12" y="18" fill="#fcd34d" fontSize="10" fontWeight="700" style={{ letterSpacing: '0.2em' }}>
            BREACH NOTIFICATION
          </text>
          <text x="12" y="34" fill="#94a3b8" fontSize="10">
            регулатор трябва да бъде уведомен в...
          </text>
          <text x="110" y="72" textAnchor="middle" fill="#fcd34d" fontSize="28" fontWeight="800" fontFamily="monospace">
            {formatTimer(remaining)}
          </text>
          <text x="110" y="88" textAnchor="middle" fill="#94a3b8" fontSize="10"
            style={{ letterSpacing: '0.25em' }}>
            72 ЧАСА · ЗАДЪЛЖИТЕЛНО
          </text>
          {/* Pulsing dot */}
          <circle cx="200" cy="18" r="4" fill="#fcd34d">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  )
}
