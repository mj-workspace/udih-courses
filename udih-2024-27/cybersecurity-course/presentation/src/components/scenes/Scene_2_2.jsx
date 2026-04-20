// Scene 2.2 — Malware taxonomy
// Central compromised computer + 6 malware types orbiting around it.
// Each malware node has its own signature micro-animation that illustrates
// how it behaves (replication, spreading, disguise, locking, spying,
// burrowing). Periodic infection pulses travel toward the centre.

const CX = 450
const CY = 290
const R = 200

const malware = [
  { id: 'virus',      label: 'Virus',      color: '#ef4444', angle: -90  },
  { id: 'worm',       label: 'Worm',       color: '#f97316', angle: -30  },
  { id: 'trojan',     label: 'Trojan',     color: '#a855f7', angle:  30  },
  { id: 'ransomware', label: 'Ransomware', color: '#dc2626', angle:  90  },
  { id: 'spyware',    label: 'Spyware',    color: '#06b6d4', angle:  150 },
  { id: 'rootkit',    label: 'Rootkit',    color: '#64748b', angle:  210 },
].map(m => {
  const rad = (m.angle * Math.PI) / 180
  return { ...m, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

// Per-malware signature micro-animation rendered inside the node's body
function MalwareGlyph({ kind, color }) {
  switch (kind) {
    case 'virus':
      return (
        <g>
          {/* Core */}
          <circle r="8" fill={color} opacity="0.85">
            <animate attributeName="r" values="8;9.5;8" dur="1.6s" repeatCount="indefinite" />
          </circle>
          {/* Spikes */}
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i * 36 * Math.PI) / 180
            const x1 = Math.cos(a) * 8, y1 = Math.sin(a) * 8
            const x2 = Math.cos(a) * 16, y2 = Math.sin(a) * 16
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={color} strokeWidth="1.4" strokeLinecap="round">
                <animate attributeName="stroke-opacity" values="0.4;1;0.4"
                  dur="1.6s" begin={`${i * 0.1}s`} repeatCount="indefinite" />
              </line>
            )
          })}
          {/* Replicating droplet */}
          <circle r="3" fill={color} opacity="0.5">
            <animate attributeName="cx" values="0;22;0" dur="3.2s" repeatCount="indefinite" />
            <animate attributeName="cy" values="0;10;0" dur="3.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.7;0" dur="3.2s" repeatCount="indefinite" />
          </circle>
        </g>
      )
    case 'worm':
      return (
        <g>
          {/* 4 segments along a wavy path */}
          {[-12, -4, 4, 12].map((dx, i) => (
            <circle key={i} cx={dx} cy="0" r="4" fill={color} opacity="0.85">
              <animate attributeName="cy" values="-4;4;-4" dur="1.4s"
                begin={`${i * 0.16}s`} repeatCount="indefinite" />
              <animate attributeName="r" values="3;5;3" dur="1.4s"
                begin={`${i * 0.16}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {/* Connecting line */}
          <path d="M -14 0 Q -4 -6 4 6 T 14 0" fill="none" stroke={color} strokeWidth="1" opacity="0.5">
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur="1.4s" repeatCount="indefinite" />
          </path>
        </g>
      )
    case 'trojan':
      return (
        <g>
          {/* Gift box that opens */}
          {/* Box body */}
          <rect x="-12" y="-4" width="24" height="14" rx="1.5" fill={color + '33'} stroke={color} strokeWidth="1.4" />
          {/* Ribbon */}
          <line x1="0" y1="-4" x2="0" y2="10" stroke={color} strokeWidth="1.2" />
          {/* Lid */}
          <g style={{ transformBox: 'fill-box', transformOrigin: '-12px -6px' }}>
            <rect x="-13" y="-10" width="26" height="6" rx="1" fill={color + '55'} stroke={color} strokeWidth="1.4">
              <animateTransform attributeName="transform" type="rotate"
                values="0;-40;-40;0;0" keyTimes="0;0.25;0.55;0.75;1"
                dur="3.6s" repeatCount="indefinite" />
            </rect>
          </g>
          {/* Monster eyes that peek when lid is open */}
          <g>
            <circle cx="-4" cy="-1" r="1.4" fill={color}>
              <animate attributeName="opacity" values="0;0;1;1;0"
                keyTimes="0;0.28;0.32;0.55;0.6" dur="3.6s" repeatCount="indefinite" />
            </circle>
            <circle cx="4" cy="-1" r="1.4" fill={color}>
              <animate attributeName="opacity" values="0;0;1;1;0"
                keyTimes="0;0.28;0.32;0.55;0.6" dur="3.6s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>
      )
    case 'ransomware':
      return (
        <g>
          {/* Padlock body */}
          <rect x="-9" y="-2" width="18" height="14" rx="2" fill={color + '33'} stroke={color} strokeWidth="1.4" />
          {/* Hasp — opens and closes */}
          <path d="M -6 -2 V -8 A 6 6 0 0 1 6 -8 V -2" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round">
            <animate attributeName="d"
              values="
                M -6 -2 V -8 A 6 6 0 0 1 6 -8 V -2;
                M -6 -2 V -10 A 6 6 0 0 1 6 -10 V -6;
                M -6 -2 V -8 A 6 6 0 0 1 6 -8 V -2"
              keyTimes="0;0.5;1" dur="2.2s" repeatCount="indefinite" />
          </path>
          {/* Keyhole */}
          <circle cx="0" cy="5" r="1.6" fill={color} />
          <rect x="-0.8" y="5" width="1.6" height="4" fill={color} />
          {/* Lock flash */}
          <circle r="14" fill="none" stroke={color} strokeWidth="0.8" opacity="0">
            <animate attributeName="r" values="10;20" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0" dur="2.2s" repeatCount="indefinite" />
          </circle>
        </g>
      )
    case 'spyware':
      return (
        <g>
          {/* Eye almond */}
          <path d="M -14 0 Q 0 -9 14 0 Q 0 9 -14 0 Z"
            fill="#0b1220" stroke={color} strokeWidth="1.4" />
          {/* Iris that scans left-right */}
          <circle r="4" fill={color}>
            <animate attributeName="cx" values="-7;7;-7" dur="3.2s" repeatCount="indefinite" />
          </circle>
          {/* Pupil highlight */}
          <circle r="1.4" fill="#0b1220">
            <animate attributeName="cx" values="-7;7;-7" dur="3.2s" repeatCount="indefinite" />
          </circle>
          {/* Data leak particle */}
          <circle r="1.5" fill={color} opacity="0.7">
            <animate attributeName="cx" values="0;18" dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="cy" values="0;-10" dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.9;0" dur="2.8s" repeatCount="indefinite" />
          </circle>
        </g>
      )
    case 'rootkit':
      return (
        <g>
          {/* Ground layers */}
          {[-8, -2, 4, 10].map((y, i) => (
            <line key={i} x1="-14" y1={y} x2="14" y2={y}
              stroke={color} strokeWidth={i === 0 ? 1.4 : 0.8} opacity={0.9 - i * 0.2} />
          ))}
          {/* Burrowing probe */}
          <g>
            <circle r="2" fill={color}>
              <animate attributeName="cy" values="-10;14;-10"
                keyTimes="0;0.7;1" dur="3.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;1;0;0;1"
                keyTimes="0;0.65;0.75;0.95;1" dur="3.2s" repeatCount="indefinite" />
            </circle>
            {/* Trailing line */}
            <line x1="0" y1="-10" x2="0" y2="14" stroke={color} strokeWidth="0.5"
              strokeDasharray="2 3" opacity="0.4" />
          </g>
        </g>
      )
    default:
      return <circle r="8" fill={color} />
  }
}

export default function Scene_2_2() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="m-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {malware.map(m => (
            <path
              key={`inf-${m.id}`}
              id={`inf-${m.id}`}
              d={`M ${m.x},${m.y} L ${CX},${CY}`}
            />
          ))}
          <radialGradient id="pc-screen">
            <stop offset="0%"  stopColor="#7f1d1d" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0b1220" stopOpacity="0.95" />
          </radialGradient>
        </defs>

        {/* Decorative rotating rings */}
        <g>
          <circle cx={CX} cy={CY} r={R + 30} fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3 9">
            <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur="55s" repeatCount="indefinite" />
          </circle>
          <circle cx={CX} cy={CY} r={R + 50} fill="none" stroke="#334155" strokeWidth="0.3" strokeDasharray="1 14">
            <animateTransform attributeName="transform" type="rotate" from={`360 ${CX} ${CY}`} to={`0 ${CX} ${CY}`} dur="40s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Infection lines + particles from each malware to centre */}
        {malware.map((m, i) => (
          <g key={`link-${m.id}`}>
            <line
              x1={m.x} y1={m.y} x2={CX} y2={CY}
              stroke={m.color}
              strokeWidth="0.6"
              strokeDasharray="3 5"
              opacity="0.22"
            >
              <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1.4s" repeatCount="indefinite" />
            </line>
            {/* Infection packet */}
            <circle r="3" fill={m.color} filter="url(#m-glow)" opacity="0">
              <animateMotion dur="3.6s" begin={`${i * 0.6}s`} repeatCount="indefinite">
                <mpath href={`#inf-${m.id}`} />
              </animateMotion>
              <animate attributeName="opacity"
                values="0;0.9;0.9;0" keyTimes="0;0.15;0.85;1"
                dur="3.6s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Central compromised computer */}
        <g transform={`translate(${CX} ${CY})`}>
          {/* Halo */}
          <circle r="78" fill="#7f1d1d" opacity="0.08">
            <animate attributeName="r" values="72;84;72" dur="3.6s" repeatCount="indefinite" />
          </circle>

          {/* Monitor */}
          <rect x="-50" y="-36" width="100" height="64" rx="3" fill="#0b1220" stroke="#64748b" strokeWidth="1.2" />
          <rect x="-46" y="-32" width="92" height="56" rx="1" fill="url(#pc-screen)" />

          {/* BSOD / corrupted screen bits — animated glitches */}
          <g opacity="0.9">
            {Array.from({ length: 6 }).map((_, i) => {
              const y = -28 + i * 9
              const w = 30 + ((i * 17) % 40)
              const x = -42 + ((i * 11) % 10)
              return (
                <rect key={i} x={x} y={y} width={w} height="2.5" fill="#ef4444" opacity="0.5">
                  <animate attributeName="opacity"
                    values="0.2;0.8;0.2" dur={`${2 + (i % 4) * 0.3}s`}
                    begin={`${i * 0.25}s`} repeatCount="indefinite" />
                  <animate attributeName="width"
                    values={`${w};${w + 10};${w}`} dur={`${2 + (i % 4) * 0.3}s`}
                    begin={`${i * 0.25}s`} repeatCount="indefinite" />
                </rect>
              )
            })}
          </g>

          {/* Skull silhouette in the middle of screen */}
          <g transform="translate(0 -4)" opacity="0.75">
            <circle r="10" fill="none" stroke="#fca5a5" strokeWidth="1.2" />
            <circle cx="-3.5" cy="-1.5" r="1.6" fill="#fca5a5">
              <animate attributeName="fill-opacity" values="0.5;1;0.5" dur="1.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="3.5" cy="-1.5" r="1.6" fill="#fca5a5">
              <animate attributeName="fill-opacity" values="0.5;1;0.5" dur="1.4s" begin="0.3s" repeatCount="indefinite" />
            </circle>
            <path d="M -3 4 L -2 6 L -1 4 L 0 6 L 1 4 L 2 6 L 3 4"
              fill="none" stroke="#fca5a5" strokeWidth="1" strokeLinecap="round" />
          </g>

          {/* Stand */}
          <path d="M -14 28 L 14 28 L 10 38 L -10 38 Z" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
          <line x1="-22" y1="40" x2="22" y2="40" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />

          {/* "INFECTED" label */}
          <text y="56" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="700" style={{ letterSpacing: '0.3em' }}>
            INFECTED
          </text>
        </g>

        {/* Malware nodes */}
        {malware.map((m, i) => (
          <g key={m.id} transform={`translate(${m.x} ${m.y})`}>
            {/* Pulse rings */}
            {[0, 1.4].map((d, k) => (
              <circle key={k} r="30" fill="none" stroke={m.color} strokeWidth="0.7" opacity="0">
                <animate attributeName="r" values="28;46" dur="3s" begin={`${(i * 0.4) + d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.45;0" dur="3s" begin={`${(i * 0.4) + d}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {/* Orbiting particle */}
            <circle r="1.6" fill={m.color} opacity="0.6">
              <animateMotion dur={`${4 + i * 0.5}s`} repeatCount="indefinite"
                path="M 28 0 A 28 28 0 1 1 27.99 0" />
            </circle>
            {/* Body */}
            <circle r="28" fill="#0b1220" stroke={m.color} strokeWidth="1.5" filter="url(#m-glow)">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur={`${2.8 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>
            {/* Signature glyph */}
            <g>
              <MalwareGlyph kind={m.id} color={m.color} />
            </g>
            {/* Label */}
            <text y="48" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="600">
              {m.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
