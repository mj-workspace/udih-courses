// Scene 1.3 — Операционни системи: преглед
// Pattern: layered system — three stacked layers (програми/вие → ОС → хардуер).
// The middle OS layer is the focal point: a rotating "manager" gear and a name
// that cycles through Windows / macOS / Linux / Android / iOS. The metaphor:
// one role — управлява машината — many names, and Windows is the work standard.

const CX = 450

// The named operating systems the OS layer cycles through. Windows holds the
// screen longest (the work standard). keyTimes drive a shared 22s opacity loop.
const osNames = [
  { id: 'win', label: 'Windows', kt: '0;0.30;0.315;0.985;1', vals: '1;1;0;0;1' },
  { id: 'mac', label: 'macOS', kt: '0;0.32;0.335;0.46;0.475;1', vals: '0;0;1;1;0;0' },
  { id: 'lin', label: 'Linux', kt: '0;0.48;0.495;0.62;0.635;1', vals: '0;0;1;1;0;0' },
  { id: 'and', label: 'Android', kt: '0;0.64;0.655;0.80;0.815;1', vals: '0;0;1;1;0;0' },
  { id: 'ios', label: 'iOS', kt: '0;0.82;0.835;0.98;1', vals: '0;0;1;1;0' },
]

// Connectors between layers — each a dashed line with a traveling packet.
const topLinks = [
  { x: 330, dir: 'up' },
  { x: 450, dir: 'down' },
  { x: 570, dir: 'up' },
]
const botLinks = [
  { x: 330, dir: 'down' },
  { x: 450, dir: 'up' },
  { x: 570, dir: 'down' },
]

// A simple toothed gear, drawn around (0,0). The wrapping <g> sets stroke.
function Gear({ r = 13, teeth = 8 }) {
  return (
    <g>
      {Array.from({ length: teeth }).map((_, k) => (
        <rect
          key={k} x="-2.4" y={-r - 5} width="4.8" height="6.5" rx="1"
          transform={`rotate(${(k * 360) / teeth})`}
        />
      ))}
      <circle r={r} fill="#0b1220" />
      <circle r={r * 0.42} />
    </g>
  )
}

export default function Scene_1_3() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s13-prog-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#0b1220" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="s13-os-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0b1220" stopOpacity="0.62" />
          </linearGradient>
          <linearGradient id="s13-hw-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#0b1220" stopOpacity="0.5" />
          </linearGradient>
          <filter id="s13-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ===== Top layer: програмите и вие ===== */}
        <g>
          <rect
            x="150" y="104" width="600" height="70" rx="13"
            fill="url(#s13-prog-grad)" stroke="#a78bfa" strokeWidth="1.2"
            strokeOpacity="0.55"
          />
          <text x="172" y="126" fill="#c4b5fd" fontSize="11.5" fontWeight="700"
            style={{ letterSpacing: '0.16em' }}>
            ПРОГРАМИТЕ И ВИЕ
          </text>
          {/* Person */}
          <g transform="translate(300 150)" fill="none" stroke="#c4b5fd"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="0" cy="-7" r="5.5" />
            <path d="M -9 10 C -9 0 9 0 9 10" />
          </g>
          {/* Program windows */}
          {[410, 500, 590].map((x, i) => (
            <g key={x} transform={`translate(${x} 150)`} fill="none"
              stroke="#c4b5fd" strokeWidth="1.6" strokeLinecap="round"
              strokeLinejoin="round">
              <animateTransform
                attributeName="transform" type="translate"
                values={`${x} 150; ${x} 147; ${x} 150`}
                dur={`${4.2 + i * 0.6}s`} begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
              <rect x="-13" y="-10" width="26" height="20" rx="2.5" fill="#0b1220" />
              <line x1="-13" y1="-3.5" x2="13" y2="-3.5" />
              <circle cx="-9" cy="-6.7" r="1.1" fill="#c4b5fd" stroke="none" />
              <circle cx="-5" cy="-6.7" r="1.1" fill="#c4b5fd" stroke="none" />
            </g>
          ))}
        </g>

        {/* Top connectors: OS serves the programs / receives input */}
        {topLinks.map((l, i) => {
          const a = l.dir === 'up' ? 210 : 176
          const b = l.dir === 'up' ? 176 : 210
          return (
            <g key={`t${l.x}`}>
              <line x1={l.x} y1="176" x2={l.x} y2="210" stroke="#334155"
                strokeWidth="1.1" strokeDasharray="4 5" opacity="0.55">
                <animate attributeName="stroke-dashoffset" from="9" to="0"
                  dur="1.5s" repeatCount="indefinite" />
              </line>
              <circle cx={l.x} r="3.4" fill="#a78bfa" filter="url(#s13-glow)">
                <animate attributeName="cy" values={`${a};${b}`}
                  dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0"
                  dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              </circle>
            </g>
          )
        })}

        {/* ===== Middle layer: ОПЕРАЦИОННА СИСТЕМА (focal) ===== */}
        <g>
          <rect
            x="150" y="212" width="600" height="146" rx="16"
            fill="url(#s13-os-grad)" stroke="#22d3ee" strokeWidth="2"
            filter="url(#s13-glow)"
          >
            <animate attributeName="stroke-opacity" values="0.6;1;0.6"
              dur="3.8s" repeatCount="indefinite" />
          </rect>
          {/* Expanding glow rings from the OS band edge */}
          {[0, 2].map((d, i) => (
            <rect key={i} x="150" y="212" width="600" height="146" rx="16"
              fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0">
              <animate attributeName="opacity" values="0.35;0"
                dur="4s" begin={`${d}s`} repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="scale"
                values="1;1.04" dur="4s" begin={`${d}s`}
                additive="sum" repeatCount="indefinite" />
            </rect>
          ))}

          <text x="172" y="236" fill="#67e8f9" fontSize="12" fontWeight="700"
            style={{ letterSpacing: '0.16em' }}>
            ОПЕРАЦИОННА СИСТЕМА
          </text>

          {/* The "manager" — a rotating gear */}
          <g transform="translate(262 302)">
            <circle r="34" fill="none" stroke="#22d3ee" strokeWidth="0.8"
              strokeDasharray="2 6" opacity="0.5">
              <animateTransform attributeName="transform" type="rotate"
                from="0 0 0" to="360 0 0" dur="24s" repeatCount="indefinite" />
            </circle>
            <g fill="none" stroke="#67e8f9" strokeWidth="2"
              strokeLinejoin="round" filter="url(#s13-glow)">
              <animateTransform attributeName="transform" type="rotate"
                from="0 0 0" to="360 0 0" dur="13s" repeatCount="indefinite" />
              <Gear />
            </g>
            <text x="0" y="48" textAnchor="middle" fill="#94a3b8" fontSize="10.5">
              управителят
            </text>
          </g>

          {/* Cycling OS name — one role, many names */}
          {osNames.map((os) => (
            <g key={os.id}>
              <text x="500" y="298" textAnchor="middle" fill="#e2e8f0"
                fontSize="33" fontWeight="700">
                {os.label}
                <animate attributeName="opacity" values={os.vals}
                  keyTimes={os.kt} dur="22s" repeatCount="indefinite" />
              </text>
            </g>
          ))}
          {/* Cycling group tag below the name */}
          <text x="500" y="326" textAnchor="middle" fill="#22d3ee" fontSize="13"
            fontWeight="600" style={{ letterSpacing: '0.12em' }}>
            за компютри
            <animate attributeName="opacity" values="1;1;0;0;1"
              keyTimes="0;0.635;0.655;0.985;1" dur="22s" repeatCount="indefinite" />
          </text>
          <text x="500" y="326" textAnchor="middle" fill="#34d399" fontSize="13"
            fontWeight="600" style={{ letterSpacing: '0.12em' }}>
            за телефони
            <animate attributeName="opacity" values="0;0;1;1;0"
              keyTimes="0;0.635;0.655;0.985;1" dur="22s" repeatCount="indefinite" />
          </text>
        </g>

        {/* Bottom connectors: OS commands the hardware */}
        {botLinks.map((l, i) => {
          const a = l.dir === 'down' ? 360 : 392
          const b = l.dir === 'down' ? 392 : 360
          return (
            <g key={`b${l.x}`}>
              <line x1={l.x} y1="360" x2={l.x} y2="392" stroke="#334155"
                strokeWidth="1.1" strokeDasharray="4 5" opacity="0.55">
                <animate attributeName="stroke-dashoffset" from="9" to="0"
                  dur="1.5s" repeatCount="indefinite" />
              </line>
              <circle cx={l.x} r="3.4" fill="#60a5fa" filter="url(#s13-glow)">
                <animate attributeName="cy" values={`${a};${b}`}
                  dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0"
                  dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              </circle>
            </g>
          )
        })}

        {/* ===== Bottom layer: хардуерът ===== */}
        <g>
          <rect
            x="150" y="394" width="600" height="74" rx="13"
            fill="url(#s13-hw-grad)" stroke="#3b82f6" strokeWidth="1.2"
            strokeOpacity="0.55"
          />
          <text x="172" y="416" fill="#93c5fd" fontSize="11.5" fontWeight="700"
            style={{ letterSpacing: '0.16em' }}>
            ХАРДУЕРЪТ
          </text>
          <g fill="none" stroke="#60a5fa" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round">
            {/* Chip */}
            <g transform="translate(330 442)">
              <rect x="-10" y="-10" width="20" height="20" rx="2.5" fill="#0b1220" />
              <rect x="-4.5" y="-4.5" width="9" height="9" rx="1" />
              {[-5, 0, 5].map((o) => (
                <g key={o}>
                  <line x1={o} y1="-10" x2={o} y2="-14" />
                  <line x1={o} y1="10" x2={o} y2="14" />
                  <line x1="-10" y1={o} x2="-14" y2={o} />
                  <line x1="10" y1={o} x2="14" y2={o} />
                </g>
              ))}
            </g>
            {/* RAM */}
            <g transform="translate(420 442)">
              <rect x="-16" y="-7" width="32" height="14" rx="1.5" fill="#0b1220" />
              {[-9, 0, 9].map((o) => (
                <rect key={o} x={o - 3.5} y="-3.5" width="7" height="7" rx="1" />
              ))}
            </g>
            {/* Disk */}
            <g transform="translate(500 442)">
              <rect x="-12" y="-11" width="24" height="22" rx="2" fill="#0b1220" />
              <circle cx="0" cy="0" r="6.5" />
              <circle cx="0" cy="0" r="1.5" fill="#60a5fa" stroke="none" />
            </g>
            {/* Monitor */}
            <g transform="translate(580 442)">
              <rect x="-12" y="-11" width="24" height="16" rx="1.5" fill="#0b1220" />
              <line x1="0" y1="5" x2="0" y2="9" />
              <line x1="-6" y1="9" x2="6" y2="9" />
            </g>
          </g>
        </g>

        {/* Takeaway caption */}
        <text x={CX} y="495" textAnchor="middle" fill="#94a3b8" fontSize="12.5">
          Различни имена — една и съща задача
        </text>
      </svg>
    </div>
  )
}
