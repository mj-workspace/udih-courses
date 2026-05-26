// Scene 2.4 — Мрежови устройства (модем, рутер, суич, обединена кутия)
// Pattern: flow pipeline + reality strip.
// Guide narrates the chain: ISP signal -> modem (translator) -> router
// (distributor) -> devices over Wi-Fi, with a switch as a wired branch for
// offices. Then it deflates the conceptual three-device picture: at home it
// is almost always ONE combined box with blinking lights. The scene mirrors
// that — a clean top pipeline showing the roles, then a bottom inset
// labelled "В реалния живот" with the single combined box.

// ── Top pipeline coordinates ──
const ISP_X = 130
const MODEM_X = 295
const ROUTER_X = 470
const ROW_Y = 195

// Wi-Fi device cluster (top-right)
const WIFI_DEVS = [
  { x: 660, y: 130, kind: 'laptop', label: 'лаптоп' },
  { x: 790, y: 170, kind: 'phone', label: 'телефон' },
  { x: 710, y: 245, kind: 'tv', label: 'телевизор' },
]

// Switch branch (below router) — office wired computers
const SWITCH_X = 470
const SWITCH_Y = 330
const WIRED_PCS = [
  { x: 600, y: 330 },
  { x: 670, y: 330 },
  { x: 740, y: 330 },
  { x: 810, y: 330 },
]

// Reality box position
const BOX_CX = 470
const BOX_Y = 470

export default function Scene_2_4() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s24-isp-grad">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s24-screen-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="s24-box-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0b1220" stopOpacity="1" />
          </linearGradient>
          <filter id="s24-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Wi-Fi paths from router to each wireless device */}
          {WIFI_DEVS.map((d, i) => (
            <path
              key={`s24-wifi-path-${i}`}
              id={`s24-wifi-path-${i}`}
              d={`M ${ROUTER_X} ${ROW_Y - 12} Q ${(ROUTER_X + d.x) / 2} ${(ROW_Y + d.y) / 2 - 40}, ${d.x} ${d.y}`}
            />
          ))}
        </defs>

        {/* ============ Top caption ============ */}
        <text x="500" y="78" textAnchor="middle" fill="#94a3b8" fontSize="12.5">
          От доставчика до устройствата ви
        </text>

        {/* ============ ISP cloud (source) ============ */}
        <g transform={`translate(${ISP_X} ${ROW_Y})`}>
          {/* glow halo */}
          <circle r="48" fill="url(#s24-isp-grad)" />
          {/* cloud shape */}
          <path
            d="M -28 4 Q -36 4 -36 -6 Q -36 -16 -24 -16 Q -22 -28 -8 -28 Q 6 -28 10 -18 Q 24 -20 28 -8 Q 36 -8 36 2 Q 36 12 24 12 L -22 12 Q -32 12 -28 4 Z"
            fill="#0f172a"
            stroke="#60a5fa"
            strokeWidth="1.6"
            filter="url(#s24-glow)"
          />
          <text x="0" y="2" textAnchor="middle" fill="#cbd5e1" fontSize="10.5" fontWeight="600">
            Интернет
          </text>
          <text x="0" y="36" textAnchor="middle" fill="#94a3b8" fontSize="10">
            доставчик
          </text>
        </g>

        {/* ISP → modem cable (the "outside cable" entering the building) */}
        <line
          x1={ISP_X + 38} y1={ROW_Y} x2={MODEM_X - 32} y2={ROW_Y}
          stroke="#60a5fa" strokeWidth="1.6" strokeDasharray="5 5" opacity="0.7"
        >
          <animate attributeName="stroke-dashoffset" from="10" to="0" dur="2.2s" repeatCount="indefinite" />
        </line>
        {[0, 1.4, 2.8].map((d, i) => (
          <circle key={`s24-isp-pkt-${i}`} r="2.6" fill="#60a5fa" filter="url(#s24-glow)">
            <animateMotion
              dur="4.2s" begin={`${d}s`} repeatCount="indefinite"
              path={`M ${ISP_X + 38} ${ROW_Y} L ${MODEM_X - 32} ${ROW_Y}`}
            />
          </circle>
        ))}

        {/* ============ Modem ============ */}
        <g transform={`translate(${MODEM_X} ${ROW_Y})`}>
          {/* halo pulses */}
          {[0, 1.6].map((d, i) => (
            <rect
              key={`s24-modem-pulse-${i}`}
              x="-32" y="-22" width="64" height="44" rx="6"
              fill="none" stroke="#22d3ee" strokeWidth="0.8" opacity="0"
            >
              <animate attributeName="opacity" values="0.4;0" dur="3.6s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="x" values="-32;-44" dur="3.6s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="y" values="-22;-30" dur="3.6s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="width" values="64;88" dur="3.6s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="height" values="44;60" dur="3.6s" begin={`${d}s`} repeatCount="indefinite" />
            </rect>
          ))}
          {/* body */}
          <rect
            x="-32" y="-22" width="64" height="44" rx="5"
            fill="#0b1220" stroke="#22d3ee" strokeWidth="1.6" filter="url(#s24-glow)"
          />
          {/* lights */}
          <circle cx="-20" cy="-12" r="1.8" fill="#34d399">
            <animate attributeName="opacity" values="0.45;1;0.45" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="-12" cy="-12" r="1.8" fill="#34d399" />
          <circle cx="-4" cy="-12" r="1.8" fill="#f59e0b">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2.1s" begin="0.3s" repeatCount="indefinite" />
          </circle>
          {/* "translate" symbol — wave in, packet out */}
          <text x="0" y="8" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="700"
                style={{ fontFamily: 'monospace' }}>
            ~↔□
          </text>
          {/* label below */}
          <text x="0" y="38" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="700">
            модем
          </text>
          <text x="0" y="52" textAnchor="middle" fill="#94a3b8" fontSize="9.5">
            преводач
          </text>
        </g>

        {/* Modem → router cable */}
        <line
          x1={MODEM_X + 32} y1={ROW_Y} x2={ROUTER_X - 30} y2={ROW_Y}
          stroke="#60a5fa" strokeWidth="1.6" strokeDasharray="5 5" opacity="0.7"
        >
          <animate attributeName="stroke-dashoffset" from="10" to="0" dur="2s" repeatCount="indefinite" />
        </line>
        {[0, 1.4, 2.8].map((d, i) => (
          <circle key={`s24-mr-pkt-${i}`} r="2.6" fill="#60a5fa" filter="url(#s24-glow)">
            <animateMotion
              dur="4s" begin={`${d}s`} repeatCount="indefinite"
              path={`M ${MODEM_X + 32} ${ROW_Y} L ${ROUTER_X - 30} ${ROW_Y}`}
            />
          </circle>
        ))}

        {/* ============ Router ============ */}
        <g transform={`translate(${ROUTER_X} ${ROW_Y})`}>
          {/* antennas */}
          <line x1="-14" y1="-18" x2="-18" y2="-32" stroke="#67e8f9" strokeWidth="1.6" />
          <circle cx="-18" cy="-33" r="1.8" fill="#22d3ee" filter="url(#s24-glow)" />
          <line x1="14" y1="-18" x2="18" y2="-32" stroke="#67e8f9" strokeWidth="1.6" />
          <circle cx="18" cy="-33" r="1.8" fill="#22d3ee" filter="url(#s24-glow)" />
          {/* Wi-Fi arcs above the router */}
          {[
            { r: 26, d: 0 },
            { r: 36, d: 0.4 },
            { r: 46, d: 0.8 },
          ].map((a, i) => (
            <path
              key={`s24-router-wifi-${i}`}
              d={`M ${-a.r} -12 A ${a.r} ${a.r} 0 0 1 ${a.r} -12`}
              fill="none" stroke="#22d3ee" strokeWidth="1.6" strokeLinecap="round"
              opacity="0.7"
            >
              <animate
                attributeName="opacity" values="0.2;0.95;0.2"
                dur="2.6s" begin={`${a.d}s`} repeatCount="indefinite"
              />
            </path>
          ))}
          {/* body */}
          <rect
            x="-30" y="-12" width="60" height="22" rx="4"
            fill="#0b1220" stroke="#22d3ee" strokeWidth="1.8" filter="url(#s24-glow)"
          />
          <circle cx="-18" cy="-2" r="1.6" fill="#34d399" />
          <circle cx="-10" cy="-2" r="1.6" fill="#34d399">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="-2" cy="-2" r="1.6" fill="#34d399" />
          <circle cx="6" cy="-2" r="1.6" fill="#f59e0b">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="14" cy="-2" r="1.6" fill="#34d399" />
          {/* label */}
          <text x="0" y="32" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="700">
            рутер
          </text>
          <text x="0" y="46" textAnchor="middle" fill="#94a3b8" fontSize="9.5">
            раздавач
          </text>
        </g>

        {/* ============ Wi-Fi devices (top-right cluster) ============ */}
        {WIFI_DEVS.map((d, i) => (
          <g key={`s24-wifi-link-${i}`}>
            {/* curved Wi-Fi link path */}
            <path
              d={`M ${ROUTER_X} ${ROW_Y - 12} Q ${(ROUTER_X + d.x) / 2} ${(ROW_Y + d.y) / 2 - 40}, ${d.x} ${d.y}`}
              fill="none" stroke="#22d3ee" strokeWidth="0.9" strokeDasharray="3 5" opacity="0.45"
            >
              <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1.8s" repeatCount="indefinite" />
            </path>
            {/* traveling packet along the Wi-Fi arc */}
            <circle r="2.4" fill="#22d3ee" filter="url(#s24-glow)">
              <animateMotion dur={`${3.6 + i * 0.4}s`} begin={`${i * 0.4}s`} repeatCount="indefinite">
                <mpath href={`#s24-wifi-path-${i}`} />
              </animateMotion>
            </circle>
          </g>
        ))}

        {/* Laptop */}
        <g transform={`translate(${WIFI_DEVS[0].x} ${WIFI_DEVS[0].y})`}>
          <rect x="-18" y="-14" width="36" height="24" rx="1.8"
                fill="url(#s24-screen-grad)" stroke="#60a5fa" strokeWidth="1.3" filter="url(#s24-glow)" />
          <rect x="-15" y="-11" width="30" height="18" rx="0.6" fill="#0b1220" />
          <rect x="-10" y="-7" width="20" height="1.4" fill="#3b82f6" opacity="0.8" />
          <rect x="-10" y="-3" width="14" height="1.4" fill="#475569" />
          <rect x="-10" y="1" width="17" height="1.4" fill="#475569" />
          <path d="M -22 11 L 22 11 L 18 14 L -18 14 Z" fill="#1e293b" stroke="#60a5fa" strokeWidth="0.8" />
          <text x="0" y="28" textAnchor="middle" fill="#cbd5e1" fontSize="10">{WIFI_DEVS[0].label}</text>
        </g>

        {/* Phone */}
        <g transform={`translate(${WIFI_DEVS[1].x} ${WIFI_DEVS[1].y})`}>
          <rect x="-10" y="-17" width="20" height="30" rx="3"
                fill="#0b1220" stroke="#60a5fa" strokeWidth="1.3" filter="url(#s24-glow)" />
          <rect x="-7" y="-14" width="14" height="22" rx="1" fill="url(#s24-screen-grad)" />
          <rect x="-5" y="-10" width="10" height="1.4" fill="#22d3ee" opacity="0.85" />
          <rect x="-5" y="-7" width="7" height="1.4" fill="#475569" />
          <rect x="-5" y="-4" width="8" height="1.4" fill="#475569" />
          <circle cx="0" cy="11" r="1.4" fill="#475569" />
          <text x="0" y="27" textAnchor="middle" fill="#cbd5e1" fontSize="10">{WIFI_DEVS[1].label}</text>
        </g>

        {/* TV */}
        <g transform={`translate(${WIFI_DEVS[2].x} ${WIFI_DEVS[2].y})`}>
          <rect x="-26" y="-16" width="52" height="32" rx="2"
                fill="url(#s24-screen-grad)" stroke="#60a5fa" strokeWidth="1.3" filter="url(#s24-glow)" />
          <rect x="-23" y="-13" width="46" height="26" rx="0.6" fill="#0b1220" />
          <rect x="-18" y="-8" width="34" height="1.6" fill="#3b82f6" opacity="0.75" />
          <rect x="-18" y="-3" width="22" height="1.4" fill="#475569" />
          <rect x="-18" y="2" width="28" height="1.4" fill="#475569" />
          <rect x="-4" y="16" width="8" height="3" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
          <text x="0" y="30" textAnchor="middle" fill="#cbd5e1" fontSize="10">{WIFI_DEVS[2].label}</text>
        </g>

        {/* ============ Switch branch (office) ============ */}
        {/* Router → switch cable (downward) */}
        <path
          d={`M ${ROUTER_X} ${ROW_Y + 10} L ${ROUTER_X} ${SWITCH_Y - 14}`}
          fill="none" stroke="#475569" strokeWidth="1.4" strokeDasharray="4 5" opacity="0.55"
        >
          <animate attributeName="stroke-dashoffset" from="9" to="0" dur="2.4s" repeatCount="indefinite" />
        </path>

        {/* Switch */}
        <g transform={`translate(${SWITCH_X} ${SWITCH_Y})`}>
          <rect x="-46" y="-12" width="92" height="20" rx="3"
                fill="#0b1220" stroke="#a78bfa" strokeWidth="1.4" filter="url(#s24-glow)" />
          {/* 8 ports */}
          {[-38, -28, -18, -8, 2, 12, 22, 32].map((px, i) => (
            <rect key={`s24-sw-port-${i}`} x={px} y="0" width="6" height="6" rx="0.6"
                  fill="#1e293b" stroke="#a78bfa" strokeWidth="0.5" />
          ))}
          {/* status LED */}
          <circle cx="40" cy="-6" r="1.4" fill="#34d399">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <text x="-58" y="4" textAnchor="end" fill="#a78bfa" fontSize="11" fontWeight="700">
            суич
          </text>
          <text x="-58" y="17" textAnchor="end" fill="#94a3b8" fontSize="9.5">
            за офис
          </text>
        </g>

        {/* Switch → wired PCs */}
        {WIRED_PCS.map((pc, i) => {
          const portX = SWITCH_X - 35 + i * 18
          return (
            <g key={`s24-pc-${i}`}>
              <path
                d={`M ${portX} ${SWITCH_Y + 6} L ${portX} ${SWITCH_Y + 18} L ${pc.x} ${SWITCH_Y + 18} L ${pc.x} ${pc.y + 18}`}
                fill="none" stroke="#a78bfa" strokeWidth="0.9" strokeDasharray="3 4" opacity="0.55"
              >
                <animate attributeName="stroke-dashoffset" from="7" to="0" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
              </path>
              {/* tiny desktop tower */}
              <g transform={`translate(${pc.x} ${pc.y + 38})`}>
                <rect x="-6" y="-12" width="12" height="20" rx="1.4"
                      fill="#0b1220" stroke="#a78bfa" strokeWidth="1" />
                <circle cx="0" cy="-7" r="1" fill="#34d399" />
                <rect x="-3" y="-3" width="6" height="0.8" fill="#475569" />
                <rect x="-3" y="-0.5" width="6" height="0.8" fill="#475569" />
              </g>
            </g>
          )
        })}

        {/* ============ Divider before reality strip ============ */}
        <line x1="60" y1="408" x2="850" y2="408"
              stroke="#334155" strokeWidth="0.6" strokeDasharray="2 6" opacity="0.7" />
        <text x="500" y="430" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700"
              style={{ letterSpacing: '0.14em' }}>
          В РЕАЛНИЯ ЖИВОТ — една кутия върши и двете
        </text>

        {/* ============ Combined home box ============ */}
        <g transform={`translate(${BOX_CX} ${BOX_Y})`}>
          {/* halo */}
          {[0, 1.5].map((d, i) => (
            <rect key={`s24-box-pulse-${i}`}
              x="-72" y="-32" width="144" height="64" rx="8"
              fill="none" stroke="#f59e0b" strokeWidth="0.8" opacity="0"
            >
              <animate attributeName="opacity" values="0.35;0" dur="3.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="x" values="-72;-86" dur="3.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="y" values="-32;-42" dur="3.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="width" values="144;172" dur="3.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="height" values="64;84" dur="3.8s" begin={`${d}s`} repeatCount="indefinite" />
            </rect>
          ))}
          {/* antennas on top */}
          <line x1="-50" y1="-32" x2="-56" y2="-50" stroke="#67e8f9" strokeWidth="1.6" />
          <circle cx="-56" cy="-51" r="1.8" fill="#22d3ee" filter="url(#s24-glow)" />
          <line x1="50" y1="-32" x2="56" y2="-50" stroke="#67e8f9" strokeWidth="1.6" />
          <circle cx="56" cy="-51" r="1.8" fill="#22d3ee" filter="url(#s24-glow)" />
          {/* Wi-Fi arcs */}
          {[
            { r: 22, d: 0 },
            { r: 32, d: 0.4 },
          ].map((a, i) => (
            <path key={`s24-box-wifi-${i}`}
              d={`M ${-a.r} -32 A ${a.r} ${a.r} 0 0 1 ${a.r} -32`}
              fill="none" stroke="#22d3ee" strokeWidth="1.4" strokeLinecap="round" opacity="0.7"
            >
              <animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.4s" begin={`${a.d}s`} repeatCount="indefinite" />
            </path>
          ))}
          {/* body */}
          <rect x="-72" y="-32" width="144" height="64" rx="6"
                fill="url(#s24-box-grad)" stroke="#f59e0b" strokeWidth="1.8" filter="url(#s24-glow)" />
          {/* blinking lights row */}
          <text x="-58" y="-18" textAnchor="middle" fill="#64748b" fontSize="7" style={{ fontFamily: 'monospace' }}>POWER</text>
          <circle cx="-58" cy="-8" r="2.4" fill="#34d399">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite" />
          </circle>

          <text x="-30" y="-18" textAnchor="middle" fill="#64748b" fontSize="7" style={{ fontFamily: 'monospace' }}>NET</text>
          <circle cx="-30" cy="-8" r="2.4" fill="#34d399">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" begin="0.2s" repeatCount="indefinite" />
          </circle>

          <text x="0" y="-18" textAnchor="middle" fill="#64748b" fontSize="7" style={{ fontFamily: 'monospace' }}>WiFi</text>
          <circle cx="0" cy="-8" r="2.4" fill="#34d399">
            <animate attributeName="opacity" values="0.45;1;0.45" dur="1.8s" begin="0.4s" repeatCount="indefinite" />
          </circle>

          <text x="30" y="-18" textAnchor="middle" fill="#64748b" fontSize="7" style={{ fontFamily: 'monospace' }}>LAN</text>
          <circle cx="30" cy="-8" r="2.4" fill="#f59e0b">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.1s" repeatCount="indefinite" />
          </circle>

          <text x="58" y="-18" textAnchor="middle" fill="#64748b" fontSize="7" style={{ fontFamily: 'monospace' }}>USB</text>
          <circle cx="58" cy="-8" r="2.4" fill="#475569" />

          {/* combined label inside body */}
          <text x="0" y="14" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="700"
                style={{ letterSpacing: '0.08em' }}>
            модем + рутер
          </text>
          <text x="0" y="26" textAnchor="middle" fill="#94a3b8" fontSize="9">
            една кутия от доставчика
          </text>
        </g>

        {/* Side note arrow + caption pointing to lights */}
        <path
          d={`M ${BOX_CX + 100} ${BOX_Y - 14} Q ${BOX_CX + 150} ${BOX_Y - 28}, ${BOX_CX + 200} ${BOX_Y - 14}`}
          fill="none" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6"
        />
        <text x={BOX_CX + 210} y={BOX_Y - 10} fill="#cbd5e1" fontSize="10">
          лампичките = жив
        </text>
        <text x={BOX_CX + 210} y={BOX_Y + 4} fill="#94a3b8" fontSize="9.5">
          индикатор за връзка
        </text>
      </svg>
    </div>
  )
}
