// Scene 2.2 — Основни протоколи (IP, DNS, HTTPS)
// Pattern: flow pipeline — what actually happens when you type a site name.
// The guide narrates the same chain: DNS finds the numeric IP, the page
// arrives over the locked HTTPS tunnel. Three protocol labels (DNS, IP,
// HTTPS) are anchored to the visible stages so the abstract acronyms gain
// a concrete picture for beginners.

const CX = 450
const CY = 290

// Stage X-positions for the four pipeline anchors.
const X_USER = 150
const X_DNS = 355
const X_TUNNEL_L = 560
const X_TUNNEL_R = 745
const X_SERVER = 800

// Browser bar geometry.
const BAR_W = 160
const BAR_H = 40

// Phonebook geometry.
const PB_W = 200
const PB_H = 108
const PB_COL_GAP = 22 // pixel gap around the central divider
const PB_PAD = 14 // left/right inner padding
const PB_ROW_H = 16

// IP badge geometry.
const IP_W = 100
const IP_H = 24

// Phonebook entries (active row index = 2).
const PB_ROWS = [
  { name: 'site.bg', ip: '83.221.4.5' },
  { name: 'banka.bg', ip: '194.12.0.7' },
  { name: 'udih.bg', ip: '185.34.122.5' },
  { name: 'mail.bg', ip: '212.91.5.10' },
]
const PB_ACTIVE = 2

export default function Scene_2_2() {
  // Phonebook vertical structure (relative to its <g translate>):
  // top → header text → separator → data rows → bottom padding.
  const pbHeaderY = -PB_H / 2 + 18
  const pbSeparatorY = -PB_H / 2 + 26
  const pbDataTop = -PB_H / 2 + 32 // top of the first data row
  const pbDataBot = PB_H / 2 - 6
  const pbRowY = (i) => pbDataTop + i * PB_ROW_H + 11 // text baseline

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s22-tunnel-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
            <stop offset="50%" stopColor="#0b1220" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.32" />
          </linearGradient>
          <linearGradient id="s22-screen-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.1" />
          </linearGradient>
          <filter id="s22-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Motion paths for traveling packets. */}
          <path id="s22-path-to-dns" d={`M ${X_USER + BAR_W / 2 + 6} ${CY} L ${X_DNS - PB_W / 2 - 6} ${CY}`} />
          <path id="s22-path-to-tunnel" d={`M ${X_DNS + PB_W / 2 + 6} ${CY} L ${X_TUNNEL_L - 4} ${CY}`} />
          <path id="s22-path-tunnel" d={`M ${X_TUNNEL_L + 14} ${CY} L ${X_TUNNEL_R - 14} ${CY}`} />
          <path id="s22-path-to-server" d={`M ${X_TUNNEL_R + 4} ${CY} L ${X_SERVER - 30} ${CY}`} />
        </defs>

        {/* Ambient slow ring for life */}
        <circle
          cx={CX} cy={CY} r="248" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 9"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="60s" repeatCount="indefinite"
          />
        </circle>

        {/* Top caption — the metaphor frame */}
        <text
          x={CX} y="84" textAnchor="middle"
          fill="#94a3b8" fontSize="12.5"
        >
          Какво се случва, когато напишете адреса на сайт
        </text>

        {/* ===== STAGE 1: USER + browser bar ===== */}
        <g transform={`translate(${X_USER} ${CY})`}>
          {[0, 1.6].map((d, i) => (
            <circle
              key={i} r="50" fill="none"
              stroke="#60a5fa" strokeWidth="1" opacity="0"
            >
              <animate attributeName="r" values="50;78" dur="3.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.45;0" dur="3.8s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {/* Browser bar */}
          <rect
            x={-BAR_W / 2} y={-BAR_H / 2} width={BAR_W} height={BAR_H} rx="8"
            fill="#0b1220" stroke="#60a5fa" strokeWidth="1.6"
            filter="url(#s22-glow)"
          />
          {/* Traffic lights */}
          <circle cx={-BAR_W / 2 + 14} cy="0" r="2.6" fill="#ef4444" />
          <circle cx={-BAR_W / 2 + 24} cy="0" r="2.6" fill="#f59e0b" />
          <circle cx={-BAR_W / 2 + 34} cy="0" r="2.6" fill="#10b981" />
          {/* URL text box (inner) — leaves room for traffic lights on the left */}
          {(() => {
            const innerLeft = -BAR_W / 2 + 46
            const innerRight = BAR_W / 2 - 10
            const innerW = innerRight - innerLeft
            const innerCx = (innerLeft + innerRight) / 2
            return (
              <g>
                <rect
                  x={innerLeft} y={-12} width={innerW} height="24" rx="3"
                  fill="#1e293b"
                />
                <text
                  x={innerCx} y="4" textAnchor="middle"
                  fill="#e2e8f0" fontSize="12"
                  style={{ fontFamily: 'monospace', letterSpacing: '0.06em' }}
                >
                  udih.anis.bg
                </text>
              </g>
            )
          })()}
          <text x="0" y={BAR_H / 2 + 22} textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="700">
            вие
          </text>
          <text x="0" y={BAR_H / 2 + 38} textAnchor="middle" fill="#94a3b8" fontSize="10.5">
            пишете адрес
          </text>
        </g>

        {/* Arrow user → DNS */}
        <line
          x1={X_USER + BAR_W / 2 + 4} y1={CY} x2={X_DNS - PB_W / 2 - 4} y2={CY}
          stroke="#475569" strokeWidth="1.1" strokeDasharray="4 5" opacity="0.65"
        >
          <animate attributeName="stroke-dashoffset" from="9" to="0" dur="1.4s" repeatCount="indefinite" />
        </line>
        {[0, 1.6].map((d, i) => (
          <circle key={`pkt1-${i}`} r="3.2" fill="#60a5fa" filter="url(#s22-glow)">
            <animateMotion dur="3.2s" begin={`${d}s`} repeatCount="indefinite">
              <mpath href="#s22-path-to-dns" />
            </animateMotion>
          </circle>
        ))}

        {/* ===== STAGE 2: DNS — phonebook translating name → IP ===== */}
        <g transform={`translate(${X_DNS} ${CY})`}>
          {/* Protocol tag */}
          <text
            x="0" y={-PB_H / 2 - 36} textAnchor="middle"
            fill="#a78bfa" fontSize="11" fontWeight="700"
            style={{ letterSpacing: '0.22em', fontFamily: 'monospace' }}
          >
            DNS
          </text>
          <text x="0" y={-PB_H / 2 - 20} textAnchor="middle" fill="#94a3b8" fontSize="10.5">
            указател на имена
          </text>
          {/* Phonebook body */}
          <rect
            x={-PB_W / 2} y={-PB_H / 2} width={PB_W} height={PB_H} rx="6"
            fill="#0b1220" stroke="#a78bfa" strokeWidth="1.8"
            filter="url(#s22-glow)"
          />
          {/* Header separator line below the column headers */}
          <line
            x1={-PB_W / 2 + PB_PAD} y1={pbSeparatorY} x2={PB_W / 2 - PB_PAD} y2={pbSeparatorY}
            stroke="#334155" strokeWidth="0.7"
          />
          {/* Vertical divider between columns — only across the data rows */}
          <line
            x1="0" y1={pbDataTop - 4} x2="0" y2={pbDataBot}
            stroke="#334155" strokeWidth="0.6"
          />
          {/* Column headers */}
          <text
            x={-PB_COL_GAP / 2} y={pbHeaderY} textAnchor="end"
            fill="#94a3b8" fontSize="10"
            style={{ fontFamily: 'monospace', letterSpacing: '0.06em' }}
          >
            име
          </text>
          <text
            x={PB_COL_GAP / 2} y={pbHeaderY}
            fill="#94a3b8" fontSize="10"
            style={{ fontFamily: 'monospace', letterSpacing: '0.06em' }}
          >
            адрес
          </text>

          {/* Active row highlight — spans both columns */}
          <rect
            x={-PB_W / 2 + 5} y={pbRowY(PB_ACTIVE) - 12}
            width={PB_W - 10} height={PB_ROW_H} rx="2"
            fill="#a78bfa" opacity="0"
          >
            <animate
              attributeName="opacity" values="0;0.22;0.22;0"
              keyTimes="0;0.25;0.75;1"
              dur="4s" repeatCount="indefinite"
            />
          </rect>

          {/* Data rows */}
          {PB_ROWS.map((row, i) => {
            const active = i === PB_ACTIVE
            return (
              <g key={`row-${i}`}>
                <text
                  x={-PB_COL_GAP / 2} y={pbRowY(i)} textAnchor="end"
                  fill={active ? '#e2e8f0' : '#64748b'}
                  fontSize="10.5"
                  fontWeight={active ? 600 : 400}
                  style={{ fontFamily: 'monospace' }}
                >
                  {row.name}
                </text>
                <text
                  x={PB_COL_GAP / 2} y={pbRowY(i)}
                  fill={active ? '#34d399' : '#64748b'}
                  fontSize="10.5"
                  fontWeight={active ? 600 : 400}
                  style={{ fontFamily: 'monospace' }}
                >
                  {row.ip}
                </text>
              </g>
            )
          })}

          <text x="0" y={PB_H / 2 + 22} textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="700">
            DNS превежда
          </text>
          <text x="0" y={PB_H / 2 + 38} textAnchor="middle" fill="#94a3b8" fontSize="10.5">
            име → число
          </text>
        </g>

        {/* Arrow DNS → tunnel, IP badge floating above */}
        <g>
          <line
            x1={X_DNS + PB_W / 2 + 4} y1={CY} x2={X_TUNNEL_L - 4} y2={CY}
            stroke="#475569" strokeWidth="1.1" strokeDasharray="4 5" opacity="0.65"
          >
            <animate attributeName="stroke-dashoffset" from="9" to="0" dur="1.4s" repeatCount="indefinite" />
          </line>
          {/* IP badge — the resolved address being carried forward */}
          <g transform={`translate(${(X_DNS + PB_W / 2 + X_TUNNEL_L) / 2} ${CY - 44})`}>
            <text
              x="0" y="-18" textAnchor="middle"
              fill="#34d399" fontSize="11" fontWeight="700"
              style={{ letterSpacing: '0.22em', fontFamily: 'monospace' }}
            >
              IP
            </text>
            <rect
              x={-IP_W / 2} y={-IP_H / 2} width={IP_W} height={IP_H} rx="3"
              fill="#0b1220" stroke="#34d399" strokeWidth="1.2"
            >
              <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </rect>
            <text
              x="0" y="4.5" textAnchor="middle"
              fill="#34d399" fontSize="11.5"
              style={{ fontFamily: 'monospace', letterSpacing: '0.06em' }}
            >
              185.34.122.5
            </text>
          </g>
          {[0.4, 2].map((d, i) => (
            <circle key={`pkt2-${i}`} r="3.2" fill="#34d399" filter="url(#s22-glow)">
              <animateMotion dur="3.2s" begin={`${d}s`} repeatCount="indefinite">
                <mpath href="#s22-path-to-tunnel" />
              </animateMotion>
            </circle>
          ))}
        </g>

        {/* ===== STAGE 3: HTTPS — locked tunnel ===== */}
        <g>
          {/* Protocol tag above tunnel */}
          <text
            x={(X_TUNNEL_L + X_TUNNEL_R) / 2} y={CY - 86} textAnchor="middle"
            fill="#10b981" fontSize="11" fontWeight="700"
            style={{ letterSpacing: '0.22em', fontFamily: 'monospace' }}
          >
            HTTPS
          </text>
          <text
            x={(X_TUNNEL_L + X_TUNNEL_R) / 2} y={CY - 70} textAnchor="middle"
            fill="#94a3b8" fontSize="10.5"
          >
            заключен тунел
          </text>

          {/* Tunnel body */}
          <rect
            x={X_TUNNEL_L} y={CY - 44} width={X_TUNNEL_R - X_TUNNEL_L} height="88" rx="44"
            fill="url(#s22-tunnel-grad)" stroke="#10b981" strokeWidth="1.8"
            filter="url(#s22-glow)"
          />
          {/* Inner ribbed segments — the tunnel walls */}
          {[0, 1, 2, 3].map((i) => {
            const x = X_TUNNEL_L + 40 + i * 38
            return (
              <g key={`rib-${i}`}>
                <line
                  x1={x} y1={CY - 36} x2={x} y2={CY - 14}
                  stroke="#10b981" strokeWidth="0.7" opacity="0.55"
                />
                <line
                  x1={x} y1={CY + 14} x2={x} y2={CY + 36}
                  stroke="#10b981" strokeWidth="0.7" opacity="0.55"
                />
              </g>
            )
          })}

          {/* Padlocks on the tunnel mouth (both ends) */}
          {[X_TUNNEL_L + 10, X_TUNNEL_R - 10].map((cx, i) => (
            <g key={`lock-${i}`} transform={`translate(${cx} ${CY})`}>
              <circle r="13" fill="#0b1220" stroke="#34d399" strokeWidth="1.4" />
              <path
                d="M -5 -2 Q -5 -9, 0 -9 Q 5 -9, 5 -2"
                fill="none" stroke="#34d399" strokeWidth="1.4"
              />
              <rect x="-5" y="-3" width="10" height="9" rx="1.2" fill="#34d399" />
              <circle cx="0" cy="1" r="1.2" fill="#0b1220" />
            </g>
          ))}

          {/* Packets traveling through the tunnel */}
          {[0, 1.3, 2.6].map((d, i) => (
            <rect
              key={`tpkt-${i}`}
              x="-5" y="-4" width="10" height="8" rx="1.5"
              fill="#34d399" filter="url(#s22-glow)"
            >
              <animateMotion dur="4s" begin={`${d}s`} repeatCount="indefinite">
                <mpath href="#s22-path-tunnel" />
              </animateMotion>
            </rect>
          ))}

          {/* Eavesdropper outside the tunnel — sees the tube, not inside */}
          <g transform={`translate(${(X_TUNNEL_L + X_TUNNEL_R) / 2} ${CY + 92})`}>
            <circle cx="-8" cy="0" r="6" fill="#0b1220" stroke="#64748b" strokeWidth="1.1" />
            <circle cx="-8" cy="0" r="2.5" fill="#94a3b8" />
            <line x1="-2" y1="0" x2="14" y2="-6" stroke="#64748b" strokeWidth="1" strokeDasharray="2 3" />
            <line x1="-2" y1="0" x2="14" y2="6" stroke="#64748b" strokeWidth="1" strokeDasharray="2 3" />
            <text x="2" y="22" textAnchor="middle" fill="#64748b" fontSize="9.5">
              чужд поглед не вижда вътре
            </text>
          </g>
        </g>

        {/* Short link tunnel → server */}
        <line
          x1={X_TUNNEL_R + 4} y1={CY} x2={X_SERVER - 30} y2={CY}
          stroke="#475569" strokeWidth="1.1" strokeDasharray="4 5" opacity="0.65"
        >
          <animate attributeName="stroke-dashoffset" from="9" to="0" dur="1.4s" repeatCount="indefinite" />
        </line>
        {[0.6, 2.2].map((d, i) => (
          <circle key={`pkt3-${i}`} r="3.2" fill="#34d399" filter="url(#s22-glow)">
            <animateMotion dur="2.4s" begin={`${d}s`} repeatCount="indefinite">
              <mpath href="#s22-path-to-server" />
            </animateMotion>
          </circle>
        ))}

        {/* ===== STAGE 4: SERVER ===== */}
        <g transform={`translate(${X_SERVER} ${CY})`}>
          {[0, 1.6].map((d, i) => (
            <circle
              key={i} r="38" fill="none"
              stroke="#22d3ee" strokeWidth="1" opacity="0"
            >
              <animate attributeName="r" values="38;62" dur="3.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="3.8s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <rect
            x="-26" y="-40" width="52" height="80" rx="4"
            fill="url(#s22-screen-grad)" stroke="#22d3ee" strokeWidth="1.8"
            filter="url(#s22-glow)"
          />
          {[-30, -16, -2, 12, 26].map((y, i) => (
            <g key={`bay-${i}`}>
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
          <text x="0" y="58" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="700">
            сайтът
          </text>
          <text x="0" y="74" textAnchor="middle" fill="#94a3b8" fontSize="10.5">
            страницата пристига
          </text>
        </g>

        {/* Bottom caption — frame the whole image */}
        <text
          x={CX} y="520" textAnchor="middle"
          fill="#94a3b8" fontSize="12.5"
        >
          Протоколите са общите правила — устройствата ги говорят сами
        </text>
      </svg>
    </div>
  )
}
