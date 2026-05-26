// Scene 2.5 — Свързване към Wi-Fi и безопасност
// Pattern: annotated phone mock + supporting router + VPN tunnel inset.
// Central element is a phone screen showing the Wi-Fi networks list — the
// thing every participant actually sees. Lock icons make the password-as-
// protection idea concrete; an unlocked "Cafe_Free" with an amber warning
// makes the public-Wi-Fi caution visible at a glance. A small router on
// the right beams Wi-Fi waves toward the phone (the connection itself),
// and a bottom-right VPN tunnel inset shows packets travelling protected
// through any network.

// Phone body
const PHONE_X = 300
const PHONE_Y = 122
const PHONE_W = 170
const PHONE_H = 360

// Screen
const SCR_X = PHONE_X + 10
const SCR_Y = PHONE_Y + 28
const SCR_W = PHONE_W - 20
const SCR_H = PHONE_H - 56

// Network rows
const ROW_X = SCR_X + 8
const ROW_W = SCR_W - 16
const ROW_H = 50
const ROW_Y0 = SCR_Y + 62

const NETWORKS = [
  // status: 'connected' | 'saved' | 'open' | 'connecting'
  { name: 'Home_5G',     bars: 4, status: 'connected' },
  { name: 'Office_WiFi', bars: 3, status: 'saved' },
  { name: 'Cafe_Free',   bars: 2, status: 'open' },
  { name: 'MyRouter_2G', bars: 1, status: 'connecting' },
]

// Router (top-right)
const RTR_X = 670
const RTR_Y = 190

// VPN tunnel inset (bottom-right)
const VPN_X1 = 540
const VPN_X2 = 850
const VPN_Y  = 460
const VPN_H  = 36

export default function Scene_2_5() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s25-screen-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="1" />
            <stop offset="100%" stopColor="#0b1220" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="s25-row-connected" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="s25-row-open" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="s25-router-glow">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
            <stop offset="80%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s25-vpn-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.4" />
          </linearGradient>
          <filter id="s25-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Curved Wi-Fi link path from router to phone */}
          <path
            id="s25-wifi-link"
            d={`M ${RTR_X - 6} ${RTR_Y + 12} Q ${(RTR_X + PHONE_X + PHONE_W) / 2 - 10} ${RTR_Y + 110}, ${PHONE_X + PHONE_W + 6} ${PHONE_Y + 150}`}
          />
        </defs>

        {/* ============ Top caption ============ */}
        <text x="500" y="80" textAnchor="middle" fill="#94a3b8" fontSize="12.5">
          Името и паролата → връзка със защита
        </text>

        {/* ============ Router (top-right) ============ */}
        <g transform={`translate(${RTR_X} ${RTR_Y})`}>
          {/* halo */}
          <circle r="58" fill="url(#s25-router-glow)" />
          {/* antennas */}
          <line x1="-16" y1="-14" x2="-22" y2="-32" stroke="#67e8f9" strokeWidth="1.6" />
          <circle cx="-22" cy="-33" r="1.8" fill="#22d3ee" filter="url(#s25-glow)" />
          <line x1="16" y1="-14" x2="22" y2="-32" stroke="#67e8f9" strokeWidth="1.6" />
          <circle cx="22" cy="-33" r="1.8" fill="#22d3ee" filter="url(#s25-glow)" />
          {/* Wi-Fi arcs above */}
          {[
            { r: 26, d: 0 },
            { r: 36, d: 0.4 },
            { r: 46, d: 0.8 },
          ].map((a, i) => (
            <path
              key={`s25-rtr-wave-${i}`}
              d={`M ${-a.r} -10 A ${a.r} ${a.r} 0 0 1 ${a.r} -10`}
              fill="none" stroke="#22d3ee" strokeWidth="1.6" strokeLinecap="round" opacity="0.7"
            >
              <animate
                attributeName="opacity" values="0.2;0.95;0.2"
                dur="2.6s" begin={`${a.d}s`} repeatCount="indefinite"
              />
            </path>
          ))}
          {/* body */}
          <rect
            x="-30" y="-10" width="60" height="22" rx="4"
            fill="#0b1220" stroke="#22d3ee" strokeWidth="1.6" filter="url(#s25-glow)"
          />
          {/* lights */}
          <circle cx="-18" cy="0" r="1.5" fill="#34d399">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="-10" cy="0" r="1.5" fill="#34d399" />
          <circle cx="-2" cy="0" r="1.5" fill="#34d399">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2.0s" begin="0.3s" repeatCount="indefinite" />
          </circle>
          <circle cx="6" cy="0" r="1.5" fill="#f59e0b" />
          <circle cx="14" cy="0" r="1.5" fill="#34d399" />
          {/* SSID sticker hint */}
          <g transform="translate(0 36)">
            <rect x="-46" y="-10" width="92" height="32" rx="3"
                  fill="#1e293b" stroke="#475569" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.85" />
            <text x="-40" y="0" fill="#94a3b8" fontSize="7" style={{ fontFamily: 'monospace', letterSpacing: '0.1em' }}>
              SSID: Home_5G
            </text>
            <text x="-40" y="9" fill="#94a3b8" fontSize="7" style={{ fontFamily: 'monospace', letterSpacing: '0.1em' }}>
              PASS: ••••••••
            </text>
            <text x="0" y="20" textAnchor="middle" fill="#cbd5e1" fontSize="8.5">
              стикер на рутера
            </text>
          </g>
        </g>

        {/* ============ Wi-Fi link from router to phone ============ */}
        <path
          d={`M ${RTR_X - 6} ${RTR_Y + 12} Q ${(RTR_X + PHONE_X + PHONE_W) / 2 - 10} ${RTR_Y + 110}, ${PHONE_X + PHONE_W + 6} ${PHONE_Y + 150}`}
          fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 5" opacity="0.45"
        >
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1.8s" repeatCount="indefinite" />
        </path>
        {[0, 1.3, 2.6].map((d, i) => (
          <circle key={`s25-link-pkt-${i}`} r="2.4" fill="#22d3ee" filter="url(#s25-glow)">
            <animateMotion dur="3.9s" begin={`${d}s`} repeatCount="indefinite">
              <mpath href="#s25-wifi-link" />
            </animateMotion>
          </circle>
        ))}

        {/* ============ Phone body ============ */}
        <g>
          {/* outer body */}
          <rect
            x={PHONE_X} y={PHONE_Y} width={PHONE_W} height={PHONE_H} rx="18"
            fill="#0b1220" stroke="#60a5fa" strokeWidth="1.8" filter="url(#s25-glow)"
          />
          {/* screen */}
          <rect
            x={SCR_X} y={SCR_Y} width={SCR_W} height={SCR_H} rx="6"
            fill="url(#s25-screen-grad)" stroke="#1e293b" strokeWidth="0.6"
          />
          {/* speaker notch */}
          <rect x={PHONE_X + PHONE_W / 2 - 18} y={PHONE_Y + 12} width="36" height="4" rx="2" fill="#1e293b" />
          {/* home indicator */}
          <rect x={PHONE_X + PHONE_W / 2 - 18} y={PHONE_Y + PHONE_H - 14} width="36" height="3" rx="1.5" fill="#334155" />

          {/* status bar */}
          <text x={SCR_X + 8} y={SCR_Y + 14} fill="#cbd5e1" fontSize="9" fontWeight="600">
            14:32
          </text>
          {/* signal triangle */}
          <path d={`M ${SCR_X + SCR_W - 36} ${SCR_Y + 13} l 6 -7 l 0 7 z`} fill="#cbd5e1" />
          {/* battery */}
          <rect x={SCR_X + SCR_W - 24} y={SCR_Y + 7} width="16" height="7" rx="1" fill="none" stroke="#cbd5e1" strokeWidth="0.7" />
          <rect x={SCR_X + SCR_W - 22} y={SCR_Y + 8.5} width="11" height="4" fill="#34d399" />
          <rect x={SCR_X + SCR_W - 8} y={SCR_Y + 9} width="1.5" height="3" fill="#cbd5e1" />

          {/* Wi-Fi header */}
          <text x={SCR_X + 8} y={SCR_Y + 38} fill="#e2e8f0" fontSize="13" fontWeight="700">
            Wi-Fi
          </text>
          {/* toggle (on) */}
          <g transform={`translate(${SCR_X + SCR_W - 32} ${SCR_Y + 28})`}>
            <rect x="0" y="0" width="24" height="13" rx="6.5" fill="#10b981" />
            <circle cx="17.5" cy="6.5" r="5" fill="#e2e8f0" />
          </g>
          {/* divider */}
          <line x1={SCR_X + 6} y1={SCR_Y + 48} x2={SCR_X + SCR_W - 6} y2={SCR_Y + 48}
                stroke="#1e293b" strokeWidth="0.8" />
        </g>

        {/* ============ Network rows ============ */}
        {NETWORKS.map((n, i) => {
          const ry = ROW_Y0 + i * ROW_H
          const isConnected = n.status === 'connected'
          const isOpen      = n.status === 'open'
          const isConnecting = n.status === 'connecting'

          // bars colors
          const accent =
            isConnected   ? '#34d399' :
            isOpen        ? '#f59e0b' :
            isConnecting  ? '#22d3ee' :
                            '#94a3b8'

          return (
            <g key={`s25-net-${i}`}>
              {/* row background tint */}
              {isConnected && (
                <rect x={ROW_X} y={ry - 2} width={ROW_W} height={ROW_H - 4} rx="4" fill="url(#s25-row-connected)" />
              )}
              {isOpen && (
                <rect x={ROW_X} y={ry - 2} width={ROW_W} height={ROW_H - 4} rx="4" fill="url(#s25-row-open)" />
              )}
              {/* signal bars (4) */}
              {[0, 1, 2, 3].map((bi) => {
                const lit = bi < n.bars
                const bh = 4 + bi * 3
                const bx = ROW_X + 4 + bi * 5
                const by = ry + 20 - bh
                return (
                  <rect
                    key={`s25-bar-${i}-${bi}`}
                    x={bx} y={by} width="3" height={bh} rx="0.6"
                    fill={lit ? accent : '#334155'}
                  >
                    {isConnecting && lit && (
                      <animate attributeName="opacity"
                               values="0.3;1;0.3"
                               dur="1.2s" begin={`${bi * 0.15}s`}
                               repeatCount="indefinite" />
                    )}
                  </rect>
                )
              })}

              {/* network name */}
              <text
                x={ROW_X + 32} y={ry + 14}
                fill={isOpen ? '#fcd34d' : isConnecting ? '#67e8f9' : '#e2e8f0'}
                fontSize="11" fontWeight={isConnected ? '700' : '600'}
                style={{ fontFamily: 'monospace', letterSpacing: '0.04em' }}
              >
                {n.name}
              </text>

              {/* secondary label */}
              <text x={ROW_X + 32} y={ry + 26} fill="#64748b" fontSize="8.5">
                {isConnected   && 'свързан'}
                {n.status === 'saved' && 'запомнен'}
                {isOpen        && 'отворена — без парола'}
                {isConnecting  && 'свързване…'}
              </text>

              {/* right-side icon */}
              <g transform={`translate(${ROW_X + ROW_W - 16} ${ry + 14})`}>
                {(isConnected || n.status === 'saved' || isConnecting) && (
                  <g>
                    {/* padlock body */}
                    <rect x="-5" y="-2" width="10" height="8" rx="1.2"
                          fill="none" stroke={isConnecting ? '#67e8f9' : '#34d399'} strokeWidth="1.2" />
                    {/* shackle */}
                    <path d="M -3 -2 V -5 a 3 3 0 0 1 6 0 V -2"
                          fill="none" stroke={isConnecting ? '#67e8f9' : '#34d399'} strokeWidth="1.2" strokeLinecap="round" />
                  </g>
                )}
                {isOpen && (
                  <g>
                    {/* warning triangle */}
                    <path d="M 0 -6 L 7 6 L -7 6 Z"
                          fill="none" stroke="#f59e0b" strokeWidth="1.3" strokeLinejoin="round" />
                    <line x1="0" y1="-2" x2="0" y2="2" stroke="#f59e0b" strokeWidth="1.3" strokeLinecap="round" />
                    <circle cx="0" cy="4.4" r="0.9" fill="#f59e0b" />
                  </g>
                )}
              </g>

              {/* connected checkmark on the left of bars */}
              {isConnected && (
                <g transform={`translate(${ROW_X + ROW_W - 36} ${ry + 14})`}>
                  <circle r="6" fill="#10b981" opacity="0.18" />
                  <path d="M -3 0 L -1 2 L 3 -2" fill="none" stroke="#34d399"
                        strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              )}

              {/* connecting spinner */}
              {isConnecting && (
                <g transform={`translate(${ROW_X + ROW_W - 36} ${ry + 14})`}>
                  <circle r="6" fill="none" stroke="#1e293b" strokeWidth="1.2" />
                  <path d="M 6 0 A 6 6 0 0 1 0 6" fill="none" stroke="#22d3ee" strokeWidth="1.6" strokeLinecap="round">
                    <animateTransform attributeName="transform" type="rotate"
                                      from="0 0 0" to="360 0 0"
                                      dur="1.2s" repeatCount="indefinite" />
                  </path>
                </g>
              )}

              {/* row divider */}
              {i < NETWORKS.length - 1 && (
                <line x1={ROW_X + 4} y1={ry + ROW_H - 6} x2={ROW_X + ROW_W - 4} y2={ry + ROW_H - 6}
                      stroke="#1e293b" strokeWidth="0.6" />
              )}
            </g>
          )
        })}

        {/* ============ VPN tunnel inset ============ */}
        <g>
          {/* section label */}
          <text x={(VPN_X1 + VPN_X2) / 2} y={VPN_Y - 26} textAnchor="middle"
                fill="#a78bfa" fontSize="11.5" fontWeight="700"
                style={{ letterSpacing: '0.16em' }}>
            VPN — ЗАЩИТЕН ТУНЕЛ
          </text>
          <text x={(VPN_X1 + VPN_X2) / 2} y={VPN_Y - 12} textAnchor="middle"
                fill="#94a3b8" fontSize="10">
            заключва данните и през чужда мрежа
          </text>

          {/* tunnel pipe — outer */}
          <rect
            x={VPN_X1} y={VPN_Y} width={VPN_X2 - VPN_X1} height={VPN_H} rx={VPN_H / 2}
            fill="url(#s25-vpn-grad)" stroke="#a78bfa" strokeWidth="1.4" filter="url(#s25-glow)"
          />
          {/* tunnel highlight */}
          <rect
            x={VPN_X1 + 4} y={VPN_Y + 3} width={VPN_X2 - VPN_X1 - 8} height="3" rx="1.5"
            fill="#a78bfa" opacity="0.25"
          />
          {/* endpoints */}
          <circle cx={VPN_X1} cy={VPN_Y + VPN_H / 2} r="6" fill="#0b1220" stroke="#a78bfa" strokeWidth="1.4" />
          <circle cx={VPN_X2} cy={VPN_Y + VPN_H / 2} r="6" fill="#0b1220" stroke="#a78bfa" strokeWidth="1.4" />

          {/* packets travelling inside */}
          {[0, 1.2, 2.4, 3.6].map((d, i) => (
            <g key={`s25-vpn-pkt-${i}`}>
              <rect width="14" height="10" rx="1.5" fill="#22d3ee" opacity="0.85" filter="url(#s25-glow)">
                <animateMotion
                  dur="4.8s" begin={`${d}s`} repeatCount="indefinite"
                  path={`M ${VPN_X1 + 10} ${VPN_Y + VPN_H / 2 - 5} L ${VPN_X2 - 24} ${VPN_Y + VPN_H / 2 - 5}`}
                />
              </rect>
            </g>
          ))}

          {/* end labels */}
          <text x={VPN_X1 - 6} y={VPN_Y + VPN_H + 16} textAnchor="end" fill="#94a3b8" fontSize="9.5">
            вашето устройство
          </text>
          <text x={VPN_X2 + 6} y={VPN_Y + VPN_H + 16} fill="#94a3b8" fontSize="9.5">
            интернет
          </text>

          {/* lock badge on top of tunnel */}
          <g transform={`translate(${(VPN_X1 + VPN_X2) / 2} ${VPN_Y - 1})`}>
            <circle r="9" fill="#0b1220" stroke="#a78bfa" strokeWidth="1.2" />
            <rect x="-3.5" y="-1" width="7" height="6" rx="1" fill="none" stroke="#a78bfa" strokeWidth="1.1" />
            <path d="M -2 -1 V -3 a 2 2 0 0 1 4 0 V -1" fill="none" stroke="#a78bfa" strokeWidth="1.1" strokeLinecap="round" />
          </g>
        </g>

        {/* ============ Phone bottom label ============ */}
        <text x={PHONE_X + PHONE_W / 2} y={PHONE_Y + PHONE_H + 18} textAnchor="middle"
              fill="#cbd5e1" fontSize="10.5">
          Настройки → Wi-Fi → изберете и въведете парола
        </text>
      </svg>
    </div>
  )
}
