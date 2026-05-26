// Scene 2.3 — Видове мрежи (LAN, WAN, Wi-Fi, мобилен)
// Pattern: side-by-side compare + bottom strip.
// The guide frames the topic by distance: LAN = one place (home/office),
// WAN = far-apart places (cities, countries; the internet itself is the
// biggest WAN). Wi-Fi and mobile are *ways* to connect, not separate kinds
// of networks. So the scene shows the same idea: a small clustered LAN on
// the left, a long-distance WAN on the right, and a bottom strip with the
// three connection methods labelled as "how", not "what".

const LAN_CX = 240
const LAN_CY = 220
const WAN_LX = 540
const WAN_LY = 200
const WAN_RX = 800
const WAN_RY = 270

export default function Scene_2_3() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s23-lan-grad">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.28" />
            <stop offset="80%" stopColor="#0b1220" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s23-wan-grad">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.22" />
            <stop offset="80%" stopColor="#0b1220" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s23-screen-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.1" />
          </linearGradient>
          <filter id="s23-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* WAN long undersea cable path */}
          <path
            id="s23-wan-cable"
            d={`M ${WAN_LX} ${WAN_LY + 28} Q ${(WAN_LX + WAN_RX) / 2} ${(WAN_LY + WAN_RY) / 2 + 90}, ${WAN_RX} ${WAN_RY + 28}`}
          />
        </defs>

        {/* Top frame caption */}
        <text
          x="450" y="82" textAnchor="middle"
          fill="#94a3b8" fontSize="12.5"
        >
          Мрежите се различават главно по разстояние
        </text>

        {/* ============ LEFT PANEL — LAN ============ */}
        <g>
          {/* Panel tag */}
          <text
            x={LAN_CX} y="116" textAnchor="middle"
            fill="#22d3ee" fontSize="13" fontWeight="700"
            style={{ letterSpacing: '0.28em', fontFamily: 'monospace' }}
          >
            LAN
          </text>
          <text x={LAN_CX} y="132" textAnchor="middle" fill="#94a3b8" fontSize="10.5">
            локална мрежа • един дом или офис
          </text>

          {/* Faint building frame — one place */}
          <rect
            x="95" y="148" width="290" height="200" rx="10"
            fill="url(#s23-lan-grad)" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="5 5"
            opacity="0.55"
          />
          {/* roof line — to suggest a building, not just a frame */}
          <path
            d="M 95 148 L 240 122 L 385 148"
            fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="5 5" opacity="0.55"
          />

          {/* Ambient pulse around LAN cluster */}
          {[0, 1.8].map((d, i) => (
            <circle
              key={`lan-pulse-${i}`} cx={LAN_CX} cy={LAN_CY + 30}
              r="70" fill="none" stroke="#22d3ee" strokeWidth="0.8" opacity="0"
            >
              <animate attributeName="r" values="70;105" dur="4s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.35;0" dur="4s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Connections router → devices (short, pulsing) */}
          {[
            { x: 155, y: 195 },
            { x: 325, y: 195 },
            { x: LAN_CX, y: 310 },
          ].map((dev, i) => (
            <g key={`lan-link-${i}`}>
              <line
                x1={LAN_CX} y1={LAN_CY + 30} x2={dev.x} y2={dev.y}
                stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 4" opacity="0.55"
              >
                <animate
                  attributeName="stroke-dashoffset" from="7" to="0"
                  dur="1.6s" repeatCount="indefinite"
                />
              </line>
              <circle r="2.6" fill="#22d3ee" filter="url(#s23-glow)">
                <animateMotion
                  dur={`${2.8 + i * 0.3}s`} begin={`${i * 0.5}s`} repeatCount="indefinite"
                  path={`M ${LAN_CX} ${LAN_CY + 30} L ${dev.x} ${dev.y}`}
                />
              </circle>
            </g>
          ))}

          {/* Router (centre of LAN) */}
          <g transform={`translate(${LAN_CX} ${LAN_CY + 30})`}>
            {/* antennas */}
            <line x1="-12" y1="-14" x2="-16" y2="-26" stroke="#67e8f9" strokeWidth="1.6" />
            <circle cx="-16" cy="-27" r="1.6" fill="#22d3ee" filter="url(#s23-glow)" />
            <line x1="12" y1="-14" x2="16" y2="-26" stroke="#67e8f9" strokeWidth="1.6" />
            <circle cx="16" cy="-27" r="1.6" fill="#22d3ee" filter="url(#s23-glow)" />
            {/* body */}
            <rect
              x="-22" y="-14" width="44" height="20" rx="3"
              fill="#0b1220" stroke="#22d3ee" strokeWidth="1.6" filter="url(#s23-glow)"
            />
            <circle cx="-12" cy="-4" r="1.4" fill="#34d399" />
            <circle cx="-4" cy="-4" r="1.4" fill="#34d399">
              <animate attributeName="opacity" values="0.35;1;0.35" dur="1.6s" repeatCount="indefinite" />
            </circle>
            <circle cx="4" cy="-4" r="1.4" fill="#34d399" />
            <circle cx="12" cy="-4" r="1.4" fill="#f59e0b">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="22" textAnchor="middle" fill="#94a3b8" fontSize="10">рутер</text>
          </g>

          {/* Laptop (top-left) */}
          <g transform="translate(155 195)">
            <rect
              x="-16" y="-14" width="32" height="22" rx="1.6"
              fill="url(#s23-screen-grad)" stroke="#60a5fa" strokeWidth="1.3"
              filter="url(#s23-glow)"
            />
            <rect x="-13" y="-11" width="26" height="16" rx="0.6" fill="#0b1220" />
            <rect x="-9" y="-7" width="18" height="1.4" fill="#3b82f6" opacity="0.7" />
            <rect x="-9" y="-3.5" width="14" height="1.4" fill="#475569" />
            <rect x="-9" y="0" width="16" height="1.4" fill="#475569" />
            <path d="M -20 9 L 20 9 L 16 12 L -16 12 Z" fill="#1e293b" stroke="#60a5fa" strokeWidth="0.8" />
            <text x="0" y="26" textAnchor="middle" fill="#cbd5e1" fontSize="10">лаптоп</text>
          </g>

          {/* Phone (top-right) */}
          <g transform="translate(325 195)">
            <rect
              x="-9" y="-16" width="18" height="28" rx="3"
              fill="#0b1220" stroke="#60a5fa" strokeWidth="1.3" filter="url(#s23-glow)"
            />
            <rect x="-6" y="-13" width="12" height="20" rx="1" fill="url(#s23-screen-grad)" />
            <rect x="-4" y="-9" width="8" height="1.2" fill="#22d3ee" opacity="0.8" />
            <rect x="-4" y="-6" width="6" height="1.2" fill="#475569" />
            <rect x="-4" y="-3" width="7" height="1.2" fill="#475569" />
            <circle cx="0" cy="10" r="1.2" fill="#475569" />
            <text x="0" y="26" textAnchor="middle" fill="#cbd5e1" fontSize="10">телефон</text>
          </g>

          {/* Printer (bottom) */}
          <g transform={`translate(${LAN_CX} 310)`}>
            {/* paper sticking up */}
            <rect x="-10" y="-14" width="20" height="10" fill="#e2e8f0" opacity="0.85" />
            <line x1="-7" y1="-11" x2="7" y2="-11" stroke="#64748b" strokeWidth="0.6" />
            <line x1="-7" y1="-8" x2="5" y2="-8" stroke="#64748b" strokeWidth="0.6" />
            {/* body */}
            <rect
              x="-15" y="-4" width="30" height="14" rx="2"
              fill="#0b1220" stroke="#60a5fa" strokeWidth="1.3" filter="url(#s23-glow)"
            />
            <rect x="-11" y="0" width="22" height="3" rx="0.6" fill="#1e293b" />
            <circle cx="9" cy="6.5" r="1" fill="#34d399">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="22" textAnchor="middle" fill="#cbd5e1" fontSize="10">принтер</text>
          </g>
        </g>

        {/* ============ RIGHT PANEL — WAN ============ */}
        <g>
          {/* Panel tag */}
          <text
            x="670" y="116" textAnchor="middle"
            fill="#a78bfa" fontSize="13" fontWeight="700"
            style={{ letterSpacing: '0.28em', fontFamily: 'monospace' }}
          >
            WAN
          </text>
          <text x="670" y="132" textAnchor="middle" fill="#94a3b8" fontSize="10.5">
            широка мрежа • различни места
          </text>

          {/* Faint world arc — suggests "far apart, possibly globe" */}
          <ellipse
            cx="670" cy="280" rx="180" ry="62"
            fill="url(#s23-wan-grad)" stroke="#334155" strokeWidth="0.7"
            strokeDasharray="2 8" opacity="0.7"
          />
          <ellipse
            cx="670" cy="280" rx="180" ry="62"
            fill="none" stroke="#334155" strokeWidth="0.5"
            strokeDasharray="2 9" opacity="0.5"
          >
            <animateTransform
              attributeName="transform" type="rotate"
              from="0 670 280" to="360 670 280"
              dur="90s" repeatCount="indefinite"
            />
          </ellipse>

          {/* Distant background cities — small dots suggesting many places */}
          {[
            { x: 575, y: 245, r: 1.8 },
            { x: 615, y: 320, r: 1.6 },
            { x: 700, y: 230, r: 1.6 },
            { x: 745, y: 320, r: 1.8 },
            { x: 770, y: 235, r: 1.6 },
          ].map((d, i) => (
            <g key={`wan-dot-${i}`}>
              <circle cx={d.x} cy={d.y} r={d.r} fill="#64748b" />
              <circle cx={d.x} cy={d.y} r={d.r} fill="none" stroke="#94a3b8" strokeWidth="0.6" opacity="0">
                <animate attributeName="r" values={`${d.r};${d.r * 3}`} dur="3.6s" begin={`${(i * 0.5) % 3}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0" dur="3.6s" begin={`${(i * 0.5) % 3}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}

          {/* Long curved cable between the two buildings */}
          <path
            d={`M ${WAN_LX} ${WAN_LY + 28} Q ${(WAN_LX + WAN_RX) / 2} ${(WAN_LY + WAN_RY) / 2 + 90}, ${WAN_RX} ${WAN_RY + 28}`}
            fill="none" stroke="#a78bfa" strokeWidth="1.4" strokeDasharray="5 6" opacity="0.7"
          >
            <animate attributeName="stroke-dashoffset" from="11" to="0" dur="2.4s" repeatCount="indefinite" />
          </path>

          {/* Packets traveling along the cable */}
          {[0, 1.6, 3.2].map((d, i) => (
            <rect key={`wan-pkt-${i}`} x="-4" y="-3" width="8" height="6" rx="1.5" fill="#a78bfa" filter="url(#s23-glow)">
              <animateMotion dur="5s" begin={`${d}s`} repeatCount="indefinite">
                <mpath href="#s23-wan-cable" />
              </animateMotion>
            </rect>
          ))}

          {/* Building A — left */}
          <g transform={`translate(${WAN_LX} ${WAN_LY})`}>
            <rect
              x="-22" y="-30" width="44" height="58" rx="2"
              fill="#0b1220" stroke="#a78bfa" strokeWidth="1.5" filter="url(#s23-glow)"
            />
            {/* roof */}
            <path d="M -26 -30 L 0 -42 L 26 -30 Z" fill="#0b1220" stroke="#a78bfa" strokeWidth="1.3" />
            {/* windows */}
            {[-22, -10, 2, 14].map((y, ri) => (
              <g key={`bA-row-${ri}`}>
                {[-12, 0, 12].map((x, ci) => (
                  <rect
                    key={`bA-${ri}-${ci}`}
                    x={x - 3} y={y} width="6" height="6" rx="0.5"
                    fill="#1e3a8a" stroke="#60a5fa" strokeWidth="0.4"
                    opacity={(ri + ci) % 2 === 0 ? 0.85 : 0.45}
                  >
                    {(ri + ci) % 2 === 0 && (
                      <animate
                        attributeName="opacity"
                        values="0.55;0.95;0.55"
                        dur={`${3 + ri * 0.4}s`} begin={`${ci * 0.3}s`}
                        repeatCount="indefinite"
                      />
                    )}
                  </rect>
                ))}
              </g>
            ))}
            <text x="0" y="46" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="600">офис • София</text>
          </g>

          {/* Building B — right */}
          <g transform={`translate(${WAN_RX} ${WAN_RY})`}>
            <rect
              x="-22" y="-30" width="44" height="58" rx="2"
              fill="#0b1220" stroke="#a78bfa" strokeWidth="1.5" filter="url(#s23-glow)"
            />
            <path d="M -26 -30 L 0 -42 L 26 -30 Z" fill="#0b1220" stroke="#a78bfa" strokeWidth="1.3" />
            {[-22, -10, 2, 14].map((y, ri) => (
              <g key={`bB-row-${ri}`}>
                {[-12, 0, 12].map((x, ci) => (
                  <rect
                    key={`bB-${ri}-${ci}`}
                    x={x - 3} y={y} width="6" height="6" rx="0.5"
                    fill="#1e3a8a" stroke="#60a5fa" strokeWidth="0.4"
                    opacity={(ri + ci) % 2 === 1 ? 0.85 : 0.45}
                  >
                    {(ri + ci) % 2 === 1 && (
                      <animate
                        attributeName="opacity"
                        values="0.55;0.95;0.55"
                        dur={`${3 + ri * 0.4}s`} begin={`${ci * 0.3 + 0.4}s`}
                        repeatCount="indefinite"
                      />
                    )}
                  </rect>
                ))}
              </g>
            ))}
            <text x="0" y="46" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="600">офис • Варна</text>
          </g>

          {/* WAN bottom caption */}
          <text x="670" y="378" textAnchor="middle" fill="#34d399" fontSize="11.5" fontWeight="600">
            интернет = най-голямата WAN в света
          </text>
        </g>

        {/* ============ BOTTOM STRIP — connection methods ============ */}
        <g>
          {/* Divider */}
          <line x1="90" y1="408" x2="810" y2="408" stroke="#334155" strokeWidth="0.6" strokeDasharray="2 6" opacity="0.7" />

          <text x="450" y="430" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700"
            style={{ letterSpacing: '0.14em' }}>
            КАК се свързваш — не са нови видове мрежи
          </text>

          {/* Three method badges */}
          {/* Cable */}
          <g transform="translate(210 482)">
            <rect
              x="-32" y="-22" width="64" height="44" rx="6"
              fill="#0b1220" stroke="#475569" strokeWidth="1.1"
            />
            {/* plug body */}
            <rect x="-20" y="-8" width="22" height="16" rx="2" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" />
            <rect x="-14" y="-4" width="3" height="2" fill="#cbd5e1" />
            <rect x="-9" y="-4" width="3" height="2" fill="#cbd5e1" />
            <rect x="-14" y="2" width="3" height="2" fill="#cbd5e1" />
            <rect x="-9" y="2" width="3" height="2" fill="#cbd5e1" />
            {/* cable curve */}
            <path d="M 2 0 Q 14 0, 18 -8 Q 22 -14, 26 -10"
              fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            <text x="0" y="34" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="600">кабел</text>
          </g>

          {/* Wi-Fi */}
          <g transform="translate(450 482)">
            <rect
              x="-32" y="-22" width="64" height="44" rx="6"
              fill="#0b1220" stroke="#22d3ee" strokeWidth="1.1"
            />
            {/* dot at base */}
            <circle cx="0" cy="10" r="2.4" fill="#22d3ee" filter="url(#s23-glow)" />
            {/* three arcs */}
            {[
              { r: 8, d: 0 },
              { r: 14, d: 0.4 },
              { r: 20, d: 0.8 },
            ].map((a, i) => (
              <path
                key={`wifi-${i}`}
                d={`M ${-a.r} 10 A ${a.r} ${a.r} 0 0 1 ${a.r} 10`}
                fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round"
              >
                <animate
                  attributeName="opacity" values="0.25;1;0.25"
                  dur="2.4s" begin={`${a.d}s`} repeatCount="indefinite"
                />
              </path>
            ))}
            <text x="0" y="34" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="600">Wi-Fi</text>
          </g>

          {/* Mobile / cell tower */}
          <g transform="translate(690 482)">
            <rect
              x="-32" y="-22" width="64" height="44" rx="6"
              fill="#0b1220" stroke="#f59e0b" strokeWidth="1.1"
            />
            {/* tower legs */}
            <line x1="-8" y1="12" x2="-2" y2="-12" stroke="#cbd5e1" strokeWidth="1.4" />
            <line x1="8" y1="12" x2="2" y2="-12" stroke="#cbd5e1" strokeWidth="1.4" />
            <line x1="-5" y1="0" x2="5" y2="0" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="-6.5" y1="6" x2="6.5" y2="6" stroke="#cbd5e1" strokeWidth="1" />
            {/* tip */}
            <line x1="0" y1="-12" x2="0" y2="-16" stroke="#cbd5e1" strokeWidth="1.4" />
            <circle cx="0" cy="-17" r="1.6" fill="#f59e0b" filter="url(#s23-glow)" />
            {/* signal lobes */}
            {[
              { r: 10, d: 0 },
              { r: 16, d: 0.4 },
            ].map((a, i) => (
              <g key={`tower-${i}`}>
                <path
                  d={`M ${-a.r} -16 A ${a.r} ${a.r} 0 0 1 ${a.r} -16`}
                  fill="none" stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round"
                  opacity="0.7"
                  transform="rotate(-90 0 -16) scale(0.55 1)"
                >
                  <animate
                    attributeName="opacity" values="0.25;0.9;0.25"
                    dur="2.4s" begin={`${a.d}s`} repeatCount="indefinite"
                  />
                </path>
              </g>
            ))}
            {/* 4G/5G label */}
            <text
              x="22" y="-10" textAnchor="middle"
              fill="#f59e0b" fontSize="8.5" fontWeight="700"
              style={{ fontFamily: 'monospace', letterSpacing: '0.08em' }}
            >
              4G/5G
            </text>
            <text x="0" y="34" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="600">мобилен</text>
          </g>
        </g>
      </svg>
    </div>
  )
}
