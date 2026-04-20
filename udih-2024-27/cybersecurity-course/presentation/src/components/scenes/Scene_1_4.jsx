// Scene 1.4 — Water utility network map
// HQ in the centre, connected to pumps, IoT sensors, reservoir, cloud and
// remote workers. Data packets flow continuously; subtle water wave along
// the bottom reinforces the sector. Periodic threat pings remind viewers
// that every endpoint is a potential entry point.

import { useEffect, useState } from 'react'

const nodes = {
  hq:        { x: 450, y: 260, label: 'Централен офис',       color: '#3b82f6', kind: 'building', big: true },
  pump1:     { x: 150, y: 140, label: 'Помпена станция А',   color: '#06b6d4', kind: 'pump' },
  pump2:     { x: 150, y: 390, label: 'Помпена станция Б',   color: '#06b6d4', kind: 'pump' },
  iot:       { x: 750, y: 160, label: 'IoT сензори',          color: '#10b981', kind: 'sensor' },
  reservoir: { x: 750, y: 390, label: 'Водоем',               color: '#60a5fa', kind: 'reservoir' },
  remote:    { x: 300, y: 490, label: 'Дистанционен достъп', color: '#f59e0b', kind: 'laptop' },
  cloud:     { x: 600, y: 70,  label: 'Cloud мониторинг',    color: '#8b5cf6', kind: 'cloud' },
}

const links = [
  ['hq', 'pump1'], ['hq', 'pump2'], ['hq', 'iot'],
  ['hq', 'reservoir'], ['hq', 'remote'], ['hq', 'cloud'],
  ['pump1', 'reservoir'], ['iot', 'cloud'],
]

// Small repository of node glyphs
function NodeGlyph({ kind }) {
  switch (kind) {
    case 'building':
      return (
        <g>
          <rect x="-16" y="-20" width="32" height="36" rx="1.5" fill="none" strokeWidth="1.5" />
          <line x1="-16" y1="-8" x2="16" y2="-8" strokeWidth="0.8" />
          <line x1="-16" y1="4"  x2="16" y2="4"  strokeWidth="0.8" />
          {[-10, -2, 6].map(y => (
            <g key={y}>
              <rect x="-12" y={y - 4} width="4" height="3" fill="currentColor" opacity="0.4" />
              <rect x="-4"  y={y - 4} width="4" height="3" fill="currentColor" opacity="0.6" />
              <rect x="4"   y={y - 4} width="4" height="3" fill="currentColor" opacity="0.3" />
            </g>
          ))}
          <path d="M -5 16 L 0 10 L 5 16 L 5 20 H -5 Z" fill="currentColor" opacity="0.25" />
        </g>
      )
    case 'pump':
      return (
        <g>
          <circle r="11" fill="none" strokeWidth="1.5" />
          <circle r="5" fill="currentColor" opacity="0.25" />
          <path d="M -3 0 L 0 -6 L 3 0 M 0 -6 V 8" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <g opacity="0.6">
            <circle r="11" fill="none" strokeWidth="0.6" strokeDasharray="2 3">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>
      )
    case 'sensor':
      return (
        <g>
          <circle r="3" fill="currentColor" />
          <circle r="7" fill="none" strokeWidth="1" strokeDasharray="2 2">
            <animate attributeName="r" values="5;9;5" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle r="11" fill="none" strokeWidth="0.8" strokeDasharray="2 3">
            <animate attributeName="r" values="9;13;9" dur="2.4s" begin="0.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.25;0.7;0.25" dur="2.4s" begin="0.6s" repeatCount="indefinite" />
          </circle>
        </g>
      )
    case 'reservoir':
      return (
        <g>
          <path d="M -13 -10 H 13 V 8 Q 0 14 -13 8 Z" fill="none" strokeWidth="1.4" />
          <path d="M -12 -2 Q -6 -5 0 -2 Q 6 1 12 -2 V 8 Q 0 14 -12 8 Z"
            fill="currentColor" opacity="0.25">
            <animate attributeName="d"
              values="
                M -12 -2 Q -6 -5 0 -2 Q 6 1 12 -2 V 8 Q 0 14 -12 8 Z;
                M -12 -2 Q -6 1 0 -2 Q 6 -5 12 -2 V 8 Q 0 14 -12 8 Z;
                M -12 -2 Q -6 -5 0 -2 Q 6 1 12 -2 V 8 Q 0 14 -12 8 Z"
              dur="3s" repeatCount="indefinite" />
          </path>
        </g>
      )
    case 'laptop':
      return (
        <g>
          <rect x="-11" y="-8" width="22" height="14" rx="1" fill="none" strokeWidth="1.4" />
          <rect x="-8" y="-5" width="16" height="8" fill="currentColor" opacity="0.2" />
          <line x1="-14" y1="8" x2="14" y2="8" strokeWidth="1.4" strokeLinecap="round" />
        </g>
      )
    case 'cloud':
      return (
        <g>
          <path d="M -11 4 A 7 7 0 0 1 -8 -6 A 9 9 0 0 1 8 -4 A 5 5 0 0 1 10 4 Z"
            fill="none" strokeWidth="1.4" />
          <path d="M -11 4 A 7 7 0 0 1 -8 -6 A 9 9 0 0 1 8 -4 A 5 5 0 0 1 10 4 Z"
            fill="currentColor" opacity="0.15" />
          <line x1="-3" y1="10" x2="-3" y2="16" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
          <line x1="3" y1="10" x2="3" y2="16" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
        </g>
      )
    default:
      return <circle r="8" fill="currentColor" />
  }
}

function formatTime(d) {
  const pad = n => n.toString().padStart(2, '0')
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

export default function Scene_1_4() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Status HUD top-right */}
      <div className="absolute top-4 right-6 z-10 flex items-center gap-3 px-4 py-2 rounded-md border border-emerald-500/30 bg-slate-950/70 backdrop-blur-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.18em] text-emerald-300/80">
            Критична инфраструктура · 24/7
          </span>
          <span className="font-mono text-sm text-emerald-100 tabular-nums">
            {formatTime(now)} · uptime 99.98%
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          {Object.values(nodes).map((n, i) => (
            <radialGradient key={i} id={`n-grad-${n.label}`}>
              <stop offset="0%"   stopColor={n.color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={n.color} stopOpacity="0" />
            </radialGradient>
          ))}
          <filter id="w-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {links.map(([a, b], i) => (
            <path
              key={`lnk-${i}`}
              id={`lnk-${i}`}
              d={`M ${nodes[a].x},${nodes[a].y} L ${nodes[b].x},${nodes[b].y}`}
            />
          ))}
          <linearGradient id="wave-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stopColor="#0ea5e9" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Animated water wave along the bottom */}
        <g opacity="0.45">
          <path
            d="
              M -200 510
              Q -150 495 -100 510 T 0 510 T 100 510 T 200 510 T 300 510 T 400 510 T 500 510 T 600 510 T 700 510 T 800 510 T 900 510 T 1000 510 T 1100 510
              L 1100 560 L -200 560 Z
            "
            fill="url(#wave-grad)"
          >
            <animate
              attributeName="d"
              dur="9s"
              repeatCount="indefinite"
              values="
                M -200 510 Q -150 495 -100 510 T 0 510 T 100 510 T 200 510 T 300 510 T 400 510 T 500 510 T 600 510 T 700 510 T 800 510 T 900 510 T 1000 510 T 1100 510 L 1100 560 L -200 560 Z;
                M -200 510 Q -150 525 -100 510 T 0 510 T 100 510 T 200 510 T 300 510 T 400 510 T 500 510 T 600 510 T 700 510 T 800 510 T 900 510 T 1000 510 T 1100 510 L 1100 560 L -200 560 Z;
                M -200 510 Q -150 495 -100 510 T 0 510 T 100 510 T 200 510 T 300 510 T 400 510 T 500 510 T 600 510 T 700 510 T 800 510 T 900 510 T 1000 510 T 1100 510 L 1100 560 L -200 560 Z
              "
            />
          </path>
          <path
            d="M -200 520 Q -150 505 -100 520 T 0 520 T 100 520 T 200 520 T 300 520 T 400 520 T 500 520 T 600 520 T 700 520 T 800 520 T 900 520 T 1000 520 T 1100 520 L 1100 560 L -200 560 Z"
            fill="#0ea5e9"
            opacity="0.12"
          >
            <animate
              attributeName="d"
              dur="11s"
              repeatCount="indefinite"
              values="
                M -200 520 Q -150 505 -100 520 T 0 520 T 100 520 T 200 520 T 300 520 T 400 520 T 500 520 T 600 520 T 700 520 T 800 520 T 900 520 T 1000 520 T 1100 520 L 1100 560 L -200 560 Z;
                M -200 520 Q -150 535 -100 520 T 0 520 T 100 520 T 200 520 T 300 520 T 400 520 T 500 520 T 600 520 T 700 520 T 800 520 T 900 520 T 1000 520 T 1100 520 L 1100 560 L -200 560 Z;
                M -200 520 Q -150 505 -100 520 T 0 520 T 100 520 T 200 520 T 300 520 T 400 520 T 500 520 T 600 520 T 700 520 T 800 520 T 900 520 T 1000 520 T 1100 520 L 1100 560 L -200 560 Z
              "
            />
          </path>
        </g>

        {/* Connection lines with flowing data packets */}
        {links.map(([a, b], i) => (
          <g key={`link-${i}`}>
            <line
              x1={nodes[a].x} y1={nodes[a].y}
              x2={nodes[b].x} y2={nodes[b].y}
              stroke="#1e293b"
              strokeWidth="1"
              strokeDasharray="4 6"
              opacity="0.55"
            >
              <animate attributeName="stroke-dashoffset" from="10" to="0" dur="2.2s" repeatCount="indefinite" />
            </line>

            {/* Forward packet */}
            <circle r="2.6" fill={nodes[a].color} filter="url(#w-glow)" opacity="0.7">
              <animateMotion dur={`${3.5 + (i % 4) * 0.6}s`} begin={`${i * 0.35}s`} repeatCount="indefinite">
                <mpath href={`#lnk-${i}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;0.9;0.9;0"
                dur={`${3.5 + (i % 4) * 0.6}s`}
                begin={`${i * 0.35}s`}
                repeatCount="indefinite"
              />
            </circle>

            {/* Reverse packet */}
            <circle r="2" fill={nodes[b].color} opacity="0.5">
              <animateMotion
                dur={`${4.2 + (i % 3) * 0.5}s`}
                begin={`${(i + 2) * 0.4}s`}
                keyPoints="1;0"
                keyTimes="0;1"
                repeatCount="indefinite"
              >
                <mpath href={`#lnk-${i}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;0.7;0.7;0"
                dur={`${4.2 + (i % 3) * 0.5}s`}
                begin={`${(i + 2) * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>

            {/* Rare threat ping — red blip traveling toward HQ */}
            {i < 3 && (
              <circle r="3" fill="#ef4444" filter="url(#w-glow)" opacity="0">
                <animateMotion
                  dur="12s"
                  begin={`${5 + i * 3}s`}
                  repeatCount="indefinite"
                  keyPoints="0;1"
                  keyTimes="0;1"
                >
                  <mpath href={`#lnk-${i}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;0;0.95;0"
                  keyTimes="0;0.6;0.85;1"
                  dur="12s"
                  begin={`${5 + i * 3}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="r"
                  values="2;4;2"
                  dur="1.2s"
                  begin={`${5 + i * 3}s`}
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>
        ))}

        {/* Nodes */}
        {Object.entries(nodes).map(([id, n], i) => {
          const r = n.big ? 34 : 22
          return (
            <g key={id} transform={`translate(${n.x} ${n.y})`} style={{ color: n.color }}>
              {/* Halo */}
              <circle r={r + 28} fill={`url(#n-grad-${n.label})`} />

              {/* Pulse rings */}
              {[0, 1.4].map((d, k) => (
                <circle key={k} r={r} fill="none" stroke={n.color} strokeWidth="0.8" opacity="0">
                  <animate attributeName="r" values={`${r};${r + 18}`} dur="3s" begin={`${(i * 0.4) + d}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0" dur="3s" begin={`${(i * 0.4) + d}s`} repeatCount="indefinite" />
                </circle>
              ))}

              {/* Orbiting dot */}
              <circle r="1.8" fill={n.color} opacity="0.55">
                <animateMotion dur={`${5 + i * 0.6}s`} repeatCount="indefinite"
                  path={`M ${r} 0 A ${r} ${r} 0 1 1 ${r - 0.01} 0`} />
              </circle>

              {/* Body */}
              <circle r={r} fill="#0b1220" stroke={n.color} strokeWidth="1.5" filter="url(#w-glow)">
                <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur={`${2.8 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>

              {/* Glyph */}
              <g fill="none" stroke={n.color} strokeLinecap="round" strokeLinejoin="round">
                <NodeGlyph kind={n.kind} />
              </g>

              {/* Label */}
              <text y={r + 16} textAnchor="middle" fill="#e2e8f0" fontSize={n.big ? 13 : 11} fontWeight={n.big ? 600 : 500}>
                {n.label}
              </text>
            </g>
          )
        })}

        {/* HQ: "target" crosshair for emphasis */}
        <g transform={`translate(${nodes.hq.x} ${nodes.hq.y})`} opacity="0.35">
          <circle r="56" fill="none" stroke="#60a5fa" strokeWidth="0.6" strokeDasharray="3 6">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="28s" repeatCount="indefinite" />
          </circle>
          <circle r="66" fill="none" stroke="#60a5fa" strokeWidth="0.4" strokeDasharray="1 10">
            <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="22s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Bottom-left caption */}
        <g transform="translate(30, 500)">
          <text fill="#64748b" fontSize="11" style={{ letterSpacing: '0.18em' }}>
            IT ↔ OT · IoT · отдалечен достъп = повече входни точки
          </text>
        </g>
      </svg>
    </div>
  )
}
