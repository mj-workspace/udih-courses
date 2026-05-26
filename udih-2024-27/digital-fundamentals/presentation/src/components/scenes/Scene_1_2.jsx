// Scene 1.2 — Основни хардуерни компоненти
// Pattern: hub & orbit on an ellipse — a central computer (tower) surrounded
// by its four core parts: процесор, памет, диск, периферия. The orbit is
// wider than tall so the graphic stays inside a rectangular band and leaves
// the bottom strip ("една и съща техника, две форми") with clear breathing
// room.

const CX = 450
const CY = 235
const RX = 280
const RY = 110

// The four hardware components orbiting the computer.
const parts = [
  { id: 'cpu', label: 'Процесор', sub: 'CPU', mono: true, color: '#22d3ee', angle: -135 },
  { id: 'ram', label: 'Памет', sub: 'RAM', mono: true, color: '#3b82f6', angle: -45 },
  { id: 'disk', label: 'Диск', sub: 'SSD / HDD', mono: true, color: '#a78bfa', angle: 45 },
  { id: 'io', label: 'Периферия', sub: 'вход · изход', mono: false, color: '#10b981', angle: 135 },
].map((p) => {
  const rad = (p.angle * Math.PI) / 180
  return { ...p, x: CX + RX * Math.cos(rad), y: CY + RY * Math.sin(rad) }
})

// Component glyphs, drawn around (0,0). The wrapping <g> sets stroke = color.
function PartGlyph({ kind, color }) {
  if (kind === 'cpu') {
    return (
      <g>
        <rect x="-12" y="-12" width="24" height="24" rx="3" fill="#0b1220" />
        <rect x="-5.5" y="-5.5" width="11" height="11" rx="1.5" />
        {[-5.5, 0, 5.5].map((o) => (
          <g key={o}>
            <line x1={o} y1="-12" x2={o} y2="-16.5" />
            <line x1={o} y1="12" x2={o} y2="16.5" />
            <line x1="-12" y1={o} x2="-16.5" y2={o} />
            <line x1="12" y1={o} x2="16.5" y2={o} />
          </g>
        ))}
      </g>
    )
  }
  if (kind === 'ram') {
    return (
      <g>
        <rect x="-17" y="-7" width="34" height="14" rx="1.5" fill="#0b1220" />
        {[-9, 0, 9].map((o) => (
          <rect key={o} x={o - 3.5} y="-3.5" width="7" height="7" rx="1" />
        ))}
        {[-12, -7, -1.5, 3.5, 9].map((o) => (
          <line key={o} x1={o} y1="7" x2={o} y2="10.5" />
        ))}
      </g>
    )
  }
  if (kind === 'disk') {
    return (
      <g>
        <rect x="-13" y="-10.5" width="26" height="21" rx="2" fill="#0b1220" />
        <circle cx="0" cy="0" r="6.5" />
        <circle cx="0" cy="0" r="1.5" fill={color} stroke="none" />
        <line x1="0" y1="0" x2="4.6" y2="-4.6" />
      </g>
    )
  }
  // io — a small monitor over a keyboard
  return (
    <g>
      <rect x="-10.5" y="-12" width="21" height="13" rx="1.5" fill="#0b1220" />
      <line x1="0" y1="1" x2="0" y2="3.5" />
      <line x1="-4.5" y1="3.5" x2="4.5" y2="3.5" />
      <rect x="-11.5" y="7" width="23" height="8" rx="1.5" fill="#0b1220" />
      <line x1="-7" y1="11" x2="7" y2="11" />
    </g>
  )
}

export default function Scene_1_2() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s12-core-grad">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.42" />
            <stop offset="80%" stopColor="#1e3a8a" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <filter id="s12-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient elliptical tracks — flowing dashes echo the orbit shape */}
        <ellipse
          cx={CX} cy={CY} rx={RX + 32} ry={RY + 28}
          fill="none" stroke="#1e293b" strokeWidth="0.7" strokeDasharray="3 11"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-140"
            dur="42s" repeatCount="indefinite" />
        </ellipse>
        <ellipse
          cx={CX} cy={CY} rx={RX - 70} ry={RY - 30}
          fill="none" stroke="#1e293b" strokeWidth="0.6" strokeDasharray="2 13"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="120"
            dur="32s" repeatCount="indefinite" />
        </ellipse>

        {/* Connections computer → component, with a traveling packet */}
        {parts.map((p, i) => (
          <g key={`link-${p.id}`}>
            <line
              x1={CX} y1={CY} x2={p.x} y2={p.y}
              stroke="#334155" strokeWidth="1.1" strokeDasharray="4 6" opacity="0.55"
            >
              <animate
                attributeName="stroke-dashoffset" from="10" to="0"
                dur="1.6s" repeatCount="indefinite"
              />
            </line>
            <circle r="3.4" fill={p.color} filter="url(#s12-glow)">
              <animateMotion
                dur={`${4.6 + i * 0.5}s`} repeatCount="indefinite"
                path={`M ${CX} ${CY} L ${p.x} ${p.y}`}
              />
              <animate
                attributeName="opacity" values="0.2;1;0.2"
                dur={`${4.6 + i * 0.5}s`} repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* ---- Central computer: a glowing tower ---- */}
        <g transform={`translate(${CX} ${CY})`}>
          <circle r="80" fill="url(#s12-core-grad)" />
          {[0, 1.6, 3.2].map((d, i) => (
            <circle key={i} r="48" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="48;88" dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0" dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Tower body */}
          <rect
            x="-38" y="-66" width="76" height="132" rx="10"
            fill="#0b1220" stroke="#60a5fa" strokeWidth="2.2" filter="url(#s12-glow)"
          >
            <animate attributeName="stroke-opacity" values="0.6;1;0.6"
              dur="3.6s" repeatCount="indefinite" />
          </rect>
          {/* Front panel inset */}
          <rect x="-28" y="-54" width="56" height="108" rx="5"
            fill="#06101f" stroke="#1e3a8a" strokeWidth="1" />

          {/* Power button */}
          <circle cx="0" cy="-41" r="5" fill="none" stroke="#60a5fa" strokeWidth="1.5">
            <animate attributeName="stroke-opacity" values="0.5;1;0.5"
              dur="2.6s" repeatCount="indefinite" />
          </circle>
          <line x1="0" y1="-43.5" x2="0" y2="-40.5" stroke="#60a5fa" strokeWidth="1.5"
            strokeLinecap="round" />
          {/* Drive slots */}
          <line x1="-18" y1="-26" x2="18" y2="-26" stroke="#1e3a8a" strokeWidth="2"
            strokeLinecap="round" />
          <line x1="-18" y1="-19" x2="18" y2="-19" stroke="#1e3a8a" strokeWidth="2"
            strokeLinecap="round" />

          {/* Activity bars — the computer working */}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="-18" y={-2 + i * 12} width="36" height="5.5" rx="2.75"
                fill="#0b1220" stroke="#1e3a8a" strokeWidth="0.8" />
              <rect x="-18" y={-2 + i * 12} width="36" height="5.5" rx="2.75" fill="#22d3ee">
                <animate attributeName="width" values="0;36;0"
                  dur={`${3 + i * 0.7}s`} begin={`${i * 0.6}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.85;0.85;0.3"
                  dur={`${3 + i * 0.7}s`} begin={`${i * 0.6}s`} repeatCount="indefinite" />
              </rect>
            </g>
          ))}
        </g>

        {/* Tower label */}
        <text x={CX} y={CY + 86} textAnchor="middle" fill="#93c5fd"
          fontSize="13" fontWeight="700" style={{ letterSpacing: '0.2em' }}>
          КОМПЮТЪР
        </text>

        {/* ---- Component satellites ---- */}
        {parts.map((p, i) => (
          <g key={p.id}>
            <g transform={`translate(${p.x} ${p.y})`}>
              {(p.id === 'cpu' ? [0, 1.3, 2.6] : [0, 1.6]).map((d, k) => (
                <circle key={k} r="38" fill="none" stroke={p.color} strokeWidth="1" opacity="0">
                  <animate attributeName="r" values="38;62"
                    dur={p.id === 'cpu' ? '3.6s' : '4.4s'}
                    begin={`${i * 0.4 + d}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.55;0"
                    dur={p.id === 'cpu' ? '3.6s' : '4.4s'}
                    begin={`${i * 0.4 + d}s`} repeatCount="indefinite" />
                </circle>
              ))}
              <circle r="38" fill="#0b1220" stroke={p.color} strokeWidth="2.2"
                filter="url(#s12-glow)" />
              <g fill="none" stroke={p.color} strokeWidth="1.7"
                strokeLinecap="round" strokeLinejoin="round">
                <PartGlyph kind={p.id} color={p.color} />
              </g>
            </g>
            <text x={p.x} y={p.y + 54} textAnchor="middle" fill="#e2e8f0"
              fontSize="13" fontWeight="600">
              {p.label}
            </text>
            <text x={p.x} y={p.y + 69} textAnchor="middle" fill="#64748b"
              fontSize="10"
              style={p.mono ? { fontFamily: 'monospace', letterSpacing: '0.12em' } : undefined}>
              {p.sub}
            </text>
          </g>
        ))}

        {/* ---- Bottom strip: same parts in desktop or laptop ---- */}
        <text x={CX} y="476" textAnchor="middle" fill="#64748b" fontSize="11">
          една и съща техника, две форми
        </text>
        <g transform={`translate(${CX} 502)`} fill="none" stroke="#475569"
          strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          {/* Desktop: monitor + tower */}
          <g transform="translate(-66 0)">
            <rect x="-13" y="-9" width="16" height="12" rx="1.5" />
            <line x1="-5" y1="3" x2="-5" y2="7" />
            <line x1="-10" y1="7" x2="0" y2="7" />
            <rect x="7" y="-9" width="8" height="16" rx="1.5" />
            <circle cx="11" cy="-5" r="1" fill="#475569" stroke="none" />
          </g>
          {/* Equals */}
          <line x1="-12" y1="-3" x2="12" y2="-3" />
          <line x1="-12" y1="3" x2="12" y2="3" />
          {/* Laptop */}
          <g transform="translate(66 0)">
            <rect x="-11" y="-9" width="22" height="13" rx="1.5" />
            <path d="M -15 7 L 15 7 L 11 4 L -11 4 Z" />
          </g>
        </g>
      </svg>
    </div>
  )
}
