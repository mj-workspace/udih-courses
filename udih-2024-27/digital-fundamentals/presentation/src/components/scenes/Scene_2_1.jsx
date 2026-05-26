// Scene 2.1 — Какво е интернет
// Pattern: flow on a globe — small packets travel between you and a remote
// server along multiple paths through a world-spanning mesh. The metaphor the
// guide narrates: a road network where information is the traffic, and the
// site you open lives on a different computer somewhere far away.

const CX = 450
const CY = 290

// Three routes from the ISP node (~290,290) to the server (~700,290).
// Each is a smooth curve drawn as a faint dashed path; packets ride it via mpath.
const routes = [
  { id: 'r1', color: '#22d3ee', d: 'M 290 290 Q 470 130, 700 270', dur: 4.6 },
  { id: 'r2', color: '#60a5fa', d: 'M 290 290 Q 470 320, 700 290', dur: 5.2 },
  { id: 'r3', color: '#a78bfa', d: 'M 290 290 Q 470 450, 700 300', dur: 4.9 },
]

// Decorative world nodes scattered along the routes for visual density.
const worldNodes = [
  { x: 360, y: 205, r: 3 },
  { x: 470, y: 165, r: 4 },
  { x: 580, y: 215, r: 3 },
  { x: 420, y: 305, r: 3.2 },
  { x: 560, y: 305, r: 3.2 },
  { x: 380, y: 395, r: 3 },
  { x: 470, y: 430, r: 4 },
  { x: 600, y: 385, r: 3.2 },
]

export default function Scene_2_1() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s21-globe-grad">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.22" />
            <stop offset="80%" stopColor="#0b1220" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s21-screen-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="s21-server-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0b1220" stopOpacity="0.6" />
          </linearGradient>
          <filter id="s21-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {routes.map((r) => (
            <path key={r.id} id={`s21-${r.id}`} d={r.d} />
          ))}
        </defs>

        {/* Ambient globe disc */}
        <circle cx={CX} cy={CY} r="232" fill="url(#s21-globe-grad)" />
        <circle
          cx={CX} cy={CY} r="232" fill="none"
          stroke="#1e293b" strokeWidth="0.7" strokeDasharray="2 9" opacity="0.7"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="80s" repeatCount="indefinite"
          />
        </circle>

        {/* Latitude rings (flattened ellipses) */}
        {[90, 160, 230].map((r, i) => (
          <ellipse
            key={`lat-${i}`} cx={CX} cy={CY}
            rx={r} ry={r * 0.32}
            fill="none" stroke="#334155" strokeWidth="0.6" opacity="0.45"
          />
        ))}
        {/* Longitude arcs (tall ellipses) */}
        {[90, 160, 230].map((r, i) => (
          <ellipse
            key={`lon-${i}`} cx={CX} cy={CY}
            rx={r * 0.32} ry={r}
            fill="none" stroke="#334155" strokeWidth="0.6" opacity="0.4"
          />
        ))}

        {/* Routes as faint dashed lines */}
        {routes.map((r) => (
          <path
            key={`path-${r.id}`} d={r.d} fill="none"
            stroke={r.color} strokeWidth="1.2" strokeDasharray="4 6" opacity="0.55"
          >
            <animate
              attributeName="stroke-dashoffset" from="10" to="0"
              dur="1.7s" repeatCount="indefinite"
            />
          </path>
        ))}

        {/* World nodes */}
        {worldNodes.map((n, i) => (
          <g key={`wn-${i}`}>
            <circle
              cx={n.x} cy={n.y} r={n.r}
              fill="#0b1220" stroke="#64748b" strokeWidth="1.2"
            />
            <circle
              cx={n.x} cy={n.y} r={n.r} fill="none"
              stroke="#94a3b8" strokeWidth="0.7" opacity="0"
            >
              <animate
                attributeName="r" values={`${n.r};${n.r * 2.6}`}
                dur="3.6s" begin={`${(i * 0.45) % 3}s`} repeatCount="indefinite"
              />
              <animate
                attributeName="opacity" values="0.5;0"
                dur="3.6s" begin={`${(i * 0.45) % 3}s`} repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* Packets travelling each route — multiple staggered per route */}
        {routes.map((r) =>
          [0, 1.4, 2.8].map((delay, k) => (
            <rect
              key={`pkt-${r.id}-${k}`}
              x="-4" y="-3" width="8" height="6" rx="1.5"
              fill={r.color} filter="url(#s21-glow)"
            >
              <animateMotion
                dur={`${r.dur}s`} begin={`${delay}s`} repeatCount="indefinite"
              >
                <mpath href={`#s21-${r.id}`} />
              </animateMotion>
            </rect>
          )),
        )}

        {/* USER: monitor at left */}
        <g transform="translate(170 290)">
          {[0, 1.6].map((d, i) => (
            <circle
              key={i} r="38" fill="none"
              stroke="#60a5fa" strokeWidth="1" opacity="0"
            >
              <animate
                attributeName="r" values="38;64"
                dur="3.8s" begin={`${d}s`} repeatCount="indefinite"
              />
              <animate
                attributeName="opacity" values="0.5;0"
                dur="3.8s" begin={`${d}s`} repeatCount="indefinite"
              />
            </circle>
          ))}
          <rect
            x="-34" y="-26" width="68" height="48" rx="3"
            fill="url(#s21-screen-grad)" stroke="#60a5fa" strokeWidth="1.8"
            filter="url(#s21-glow)"
          />
          <rect
            x="-30" y="-22" width="60" height="40" rx="1.5"
            fill="#0b1220" stroke="#3b82f6" strokeWidth="0.6"
          />
          <rect x="-24" y="-17" width="48" height="5" rx="1" fill="#1e293b" />
          <circle cx="-21" cy="-14.5" r="1" fill="#22d3ee" />
          <circle cx="-18" cy="-14.5" r="1" fill="#a78bfa" />
          <rect x="-24" y="-7" width="36" height="2" rx="1" fill="#475569" />
          <rect x="-24" y="-3" width="44" height="2" rx="1" fill="#475569" />
          <rect x="-24" y="1" width="30" height="2" rx="1" fill="#475569" />
          <rect x="-24" y="5" width="40" height="2" rx="1" fill="#475569" />
          <line x1="0" y1="22" x2="0" y2="30" stroke="#60a5fa" strokeWidth="2" />
          <rect x="-14" y="30" width="28" height="3" rx="1.5" fill="#3b82f6" />
          <text
            x="0" y="56" textAnchor="middle"
            fill="#e2e8f0" fontSize="15" fontWeight="700"
          >
            вие
          </text>
        </g>

        {/* ISP node — gateway to the world */}
        <g transform="translate(280 290)">
          <text
            x="0" y="-24" textAnchor="middle"
            fill="#34d399" fontSize="10.5" fontWeight="700"
            style={{ letterSpacing: '0.14em' }}
          >
            ДОСТАВЧИК
          </text>
          <rect
            x="-16" y="-11" width="32" height="22" rx="2.5"
            fill="#0b1220" stroke="#34d399" strokeWidth="1.6"
            filter="url(#s21-glow)"
          />
          <circle cx="-7" cy="-3.5" r="1.4" fill="#34d399" />
          <circle cx="0" cy="-3.5" r="1.4" fill="#f59e0b">
            <animate
              attributeName="opacity" values="0.25;1;0.25"
              dur="1.3s" repeatCount="indefinite"
            />
          </circle>
          <circle cx="7" cy="-3.5" r="1.4" fill="#34d399" />
          <line x1="-10" y1="4" x2="10" y2="4" stroke="#34d399" strokeWidth="0.8" opacity="0.7" />
          <line x1="-10" y1="7" x2="10" y2="7" stroke="#34d399" strokeWidth="0.8" opacity="0.5" />
        </g>

        {/* Short link user → ISP */}
        <g>
          <line
            x1="210" y1="290" x2="264" y2="290"
            stroke="#475569" strokeWidth="1.1" strokeDasharray="4 5" opacity="0.65"
          >
            <animate
              attributeName="stroke-dashoffset" from="9" to="0"
              dur="1.4s" repeatCount="indefinite"
            />
          </line>
          <rect
            x="-4" y="-3" width="8" height="6" rx="1.5"
            fill="#60a5fa" filter="url(#s21-glow)"
          >
            <animateMotion
              dur="2.2s" repeatCount="indefinite"
              path="M 210 290 L 264 290"
            />
          </rect>
        </g>

        {/* SERVER at right */}
        <g transform="translate(730 290)">
          {[0, 1.6].map((d, i) => (
            <circle
              key={i} r="40" fill="none"
              stroke="#22d3ee" strokeWidth="1" opacity="0"
            >
              <animate
                attributeName="r" values="40;66"
                dur="3.8s" begin={`${d}s`} repeatCount="indefinite"
              />
              <animate
                attributeName="opacity" values="0.5;0"
                dur="3.8s" begin={`${d}s`} repeatCount="indefinite"
              />
            </circle>
          ))}
          <rect
            x="-26" y="-46" width="52" height="92" rx="4"
            fill="url(#s21-server-grad)" stroke="#22d3ee" strokeWidth="1.8"
            filter="url(#s21-glow)"
          />
          {[-36, -22, -8, 6, 20, 34].map((y, i) => (
            <g key={i}>
              <rect
                x="-20" y={y} width="40" height="10" rx="1.2"
                fill="#0b1220" stroke="#67e8f9" strokeWidth="0.6"
              />
              <circle cx="-15" cy={y + 5} r="1.2" fill="#34d399">
                <animate
                  attributeName="opacity" values="0.35;1;0.35"
                  dur={`${1.4 + (i % 3) * 0.4}s`}
                  begin={`${i * 0.25}s`} repeatCount="indefinite"
                />
              </circle>
              <rect x="-10" y={y + 4} width="24" height="2" rx="0.5" fill="#1e293b" />
            </g>
          ))}
          <text
            x="0" y="64" textAnchor="middle"
            fill="#e2e8f0" fontSize="15" fontWeight="700"
          >
            сървър
          </text>
          <text x="0" y="80" textAnchor="middle" fill="#94a3b8" fontSize="11">
            сайтът живее тук
          </text>
        </g>

        {/* Bottom caption */}
        <text
          x={CX} y="508" textAnchor="middle"
          fill="#94a3b8" fontSize="12.5"
        >
          Информацията пътува на пакети — по различни пътища до сървъра и обратно
        </text>
      </svg>
    </div>
  )
}
