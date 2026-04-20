// Scene 5.1 — Three pillars of network defense
// Firewall column gates packets (allow green / deny red),
// VPN column tunnels ciphered traffic between client and server
// past an eavesdropper that can't see inside, and Encryption
// column demonstrates symmetric / asymmetric / hashing flows.

import { useEffect, useState } from 'react'

const C_FW = 150
const C_VPN = 450
const C_CR = 745

const GATE_X = 170
const PACKET_Y = [170, 200, 230, 260, 290, 320, 350, 380, 410]

const packets = PACKET_Y.map((y, i) => ({
  key: i,
  y,
  allowed: [true, false, true, true, false, true, false, true, true][i],
  delay: (i * 0.42) % 4.2,
  dur: 2.6 + (i % 3) * 0.35,
}))

const CIPHER = ['A', '1', '#', 'x', '9', 'K', '@', '7', 'b', '!', 'q', '$']

export default function Scene_5_1() {
  const [blocked, setBlocked] = useState(4127)
  const [sessions, setSessions] = useState(47)

  useEffect(() => {
    const id = setInterval(() => {
      setBlocked(b => b + Math.floor(Math.random() * 3) + 1)
    }, 260)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setSessions(s => Math.min(62, Math.max(36, s + Math.floor(Math.random() * 7) - 3)))
    }, 1400)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-4 right-6 z-10 flex flex-col gap-2">
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-md border border-blue-500/30 bg-slate-950/70 backdrop-blur-sm">
          <span className="text-[10px] uppercase tracking-[0.18em] text-blue-300/80">блок. пакети</span>
          <span className="font-mono text-sm font-bold text-blue-200 tabular-nums">
            {blocked.toLocaleString('bg-BG')}
          </span>
        </div>
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-md border border-cyan-500/30 bg-slate-950/70 backdrop-blur-sm">
          <span className="text-[10px] uppercase tracking-[0.18em] text-cyan-300/80">VPN сесии</span>
          <span className="font-mono text-sm font-bold text-cyan-200 tabular-nums">
            {sessions}
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="p51-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="fw-halo">
            <stop offset="0%"  stopColor="#3b82f6" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="vpn-halo">
            <stop offset="0%"  stopColor="#22d3ee" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#083344" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cr-halo">
            <stop offset="0%"  stopColor="#a855f7" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="tunnel-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#083344" stopOpacity="0.85" />
            <stop offset="50%"  stopColor="#0e7490" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#083344" stopOpacity="0.85" />
          </linearGradient>

          {packets.map(p => (
            <path
              key={`pp-${p.key}`}
              id={`pp-${p.key}`}
              d={p.allowed
                ? `M 40,${p.y} L 300,${p.y}`
                : `M 40,${p.y} L ${GATE_X - 6},${p.y}`}
            />
          ))}

          <path id="cr-sym-path" d="M 620,185 L 855,185" />
          <path id="cr-asym-path" d="M 620,280 L 855,280" />
          <path id="cr-hash-path" d="M 620,375 L 790,375" />
        </defs>

        <line x1="305" y1="80" x2="305" y2="500" stroke="#1e293b" strokeWidth="0.6" strokeDasharray="2 6" opacity="0.55" />
        <line x1="600" y1="80" x2="600" y2="500" stroke="#1e293b" strokeWidth="0.6" strokeDasharray="2 6" opacity="0.55" />

        {/* === FIREWALL === */}
        <g>
          <ellipse cx={C_FW} cy={290} rx={150} ry={220} fill="url(#fw-halo)" />
          <text x={C_FW} y={115} textAnchor="middle" fill="#93c5fd" fontSize="14" fontWeight="700" style={{ letterSpacing: '0.25em' }}>
            FIREWALL
          </text>
          <text x={C_FW} y={133} textAnchor="middle" fill="#475569" fontSize="10" style={{ letterSpacing: '0.15em' }}>
            защитна стена · KPP
          </text>

          <text x="40" y="150" fill="#64748b" fontSize="9" style={{ letterSpacing: '0.18em' }}>ТРАФИК</text>

          <rect x={GATE_X - 5} y={155} width="10" height="260" rx="3"
            fill="#0b1220" stroke="#3b82f6" strokeWidth="1.3" filter="url(#p51-glow)">
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="2.6s" repeatCount="indefinite" />
          </rect>
          {[185, 215, 245, 275, 305, 335, 365, 395].map(y => (
            <line key={y} x1={GATE_X - 8} y1={y} x2={GATE_X + 8} y2={y}
              stroke="#1e40af" strokeWidth="0.6" opacity="0.55" />
          ))}

          {packets.map(p => (
            <g key={`pkt-${p.key}`}>
              <line x1="40" y1={p.y} x2={GATE_X} y2={p.y}
                stroke={p.allowed ? '#10b981' : '#ef4444'}
                strokeWidth="0.5" strokeDasharray="2 4" opacity="0.12" />

              <rect x="-5" y="-3" width="10" height="6" rx="1.5"
                fill={p.allowed ? '#10b981' : '#ef4444'}
                filter="url(#p51-glow)"
                opacity="0">
                <animateMotion
                  dur={`${p.dur}s`}
                  begin={`${p.delay}s`}
                  repeatCount="indefinite"
                >
                  <mpath href={`#pp-${p.key}`} />
                </animateMotion>
                <animate attributeName="opacity"
                  values="0;0.95;0.95;0"
                  keyTimes="0;0.1;0.85;1"
                  dur={`${p.dur}s`}
                  begin={`${p.delay}s`}
                  repeatCount="indefinite" />
              </rect>

              {!p.allowed && (
                <circle cx={GATE_X - 6} cy={p.y} r="3" fill="#ef4444" opacity="0">
                  <animate attributeName="r" values="3;3;10" keyTimes="0;0.82;1"
                    dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0;0.8;0" keyTimes="0;0.8;0.88;1"
                    dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
                </circle>
              )}
              {p.allowed && (
                <circle cx="300" cy={p.y} r="2" fill="#10b981" opacity="0">
                  <animate attributeName="r" values="2;2;6" keyTimes="0;0.9;1"
                    dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0;0.7;0" keyTimes="0;0.88;0.94;1"
                    dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
                </circle>
              )}
            </g>
          ))}

          <text x={GATE_X - 60} y="440" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="700" style={{ letterSpacing: '0.18em' }}>DENY</text>
          <text x={GATE_X + 80} y="440" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="700" style={{ letterSpacing: '0.18em' }}>ALLOW</text>

          <g transform="translate(40 465)">
            <rect width="260" height="22" rx="4" fill="rgba(15,23,42,0.6)" stroke="#1e40af" strokeWidth="0.7" />
            <text x="12" y="15" fill="#93c5fd" fontSize="10" fontFamily="monospace">
              allow :443 · deny :23 · log all
            </text>
          </g>
        </g>

        {/* === VPN === */}
        <g>
          <ellipse cx={C_VPN} cy={290} rx={140} ry={220} fill="url(#vpn-halo)" />
          <text x={C_VPN} y={115} textAnchor="middle" fill="#67e8f9" fontSize="14" fontWeight="700" style={{ letterSpacing: '0.25em' }}>
            VPN
          </text>
          <text x={C_VPN} y={133} textAnchor="middle" fill="#475569" fontSize="10" style={{ letterSpacing: '0.15em' }}>
            криптиран тунел
          </text>

          {[-58, -40, 40, 58].map((dy, i) => (
            <path key={i}
              d={`M ${C_VPN - 110} ${280 + dy} Q ${C_VPN} ${280 + dy + (dy > 0 ? 22 : -22)} ${C_VPN + 110} ${280 + dy}`}
              fill="none" stroke="#7f1d1d" strokeWidth="0.7" strokeDasharray="3 5" opacity="0.28">
              <animate attributeName="stroke-dashoffset" from="8" to="0" dur="2.4s" repeatCount="indefinite" />
            </path>
          ))}
          <text x={C_VPN} y={200} textAnchor="middle" fill="#9f1239" fontSize="9" opacity="0.8" style={{ letterSpacing: '0.22em' }}>
            PUBLIC INTERNET
          </text>

          <g transform={`translate(${C_VPN - 105} 280)`}>
            <circle r="26" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.4" filter="url(#p51-glow)">
              <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.8s" repeatCount="indefinite" />
            </circle>
            <g stroke="#67e8f9" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <rect x="-10" y="-7" width="20" height="12" rx="1" />
              <line x1="-12" y1="7" x2="12" y2="7" />
            </g>
            <text y="46" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="600">клиент</text>
          </g>

          <g transform={`translate(${C_VPN + 105} 280)`}>
            <circle r="26" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.4" filter="url(#p51-glow)">
              <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.8s" repeatCount="indefinite" />
            </circle>
            <g stroke="#67e8f9" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <rect x="-9" y="-10" width="18" height="6" rx="1" />
              <rect x="-9" y="-2" width="18" height="6" rx="1" />
              <rect x="-9" y="6" width="18" height="6" rx="1" />
              <circle cx="-5" cy="-7" r="0.8" fill="#22d3ee" />
              <circle cx="-5" cy="1" r="0.8" fill="#22d3ee" />
              <circle cx="-5" cy="9" r="0.8" fill="#22d3ee" />
            </g>
            <text y="46" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="600">сървър</text>
          </g>

          <g>
            <rect x={C_VPN - 80} y={265} width={160} height={30} rx={15}
              fill="url(#tunnel-grad)" stroke="#22d3ee" strokeWidth="1.4" filter="url(#p51-glow)">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="2.6s" repeatCount="indefinite" />
            </rect>
            <ellipse cx={C_VPN} cy={268} rx="60" ry="2" fill="#67e8f9" opacity="0.3" />

            {CIPHER.map((ch, i) => (
              <text key={i}
                fill="#a5f3fc" fontSize="11" fontWeight="700" fontFamily="monospace"
                opacity="0">
                <animate attributeName="opacity"
                  values="0;0.85;0.85;0" keyTimes="0;0.2;0.8;1"
                  dur="4s" begin={`${(i * 0.33) % 4}s`} repeatCount="indefinite" />
                <animateMotion dur="4s" begin={`${(i * 0.33) % 4}s`} repeatCount="indefinite"
                  path={`M ${C_VPN - 72} 285 L ${C_VPN + 72} 285`} />
                {ch}
              </text>
            ))}
          </g>

          <g transform={`translate(${C_VPN} 340)`}>
            <circle r="13" fill="#0b1220" stroke="#ef4444" strokeWidth="0.9" opacity="0.75">
              <animate attributeName="stroke-opacity" values="0.45;0.9;0.45" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <path d="M -7 0 Q 0 -4 7 0 Q 0 4 -7 0 Z" fill="none" stroke="#ef4444" strokeWidth="1" />
            <circle r="1.8" fill="#ef4444" />
            <line x1="-9" y1="-9" x2="9" y2="9" stroke="#ef4444" strokeWidth="1.3" />
            <text y="30" textAnchor="middle" fill="#9f1239" fontSize="9" style={{ letterSpacing: '0.18em' }}>
              НЕ ВИЖДА
            </text>
          </g>

          <g transform="translate(325 465)">
            <rect width="250" height="22" rx="4" fill="rgba(15,23,42,0.6)" stroke="#0e7490" strokeWidth="0.7" />
            <text x="125" y="15" textAnchor="middle" fill="#67e8f9" fontSize="10" fontFamily="monospace">
              WireGuard · OpenVPN · IPsec
            </text>
          </g>
        </g>

        {/* === ENCRYPTION === */}
        <g>
          <ellipse cx={C_CR} cy={290} rx={155} ry={220} fill="url(#cr-halo)" />
          <text x={C_CR} y={115} textAnchor="middle" fill="#c4b5fd" fontSize="14" fontWeight="700" style={{ letterSpacing: '0.25em' }}>
            ENCRYPTION
          </text>
          <text x={C_CR} y={133} textAnchor="middle" fill="#475569" fontSize="10" style={{ letterSpacing: '0.15em' }}>
            криптиране на данни
          </text>

          {/* Row 1 — Symmetric */}
          <g>
            <text x="620" y="173" fill="#94a3b8" fontSize="9" fontWeight="700" style={{ letterSpacing: '0.18em' }}>
              SYMMETRIC
            </text>
            <rect x="620" y="180" width="32" height="18" rx="3" fill="rgba(168,85,247,0.08)" stroke="#a855f7" strokeWidth="0.8" />
            <text x="636" y="193" textAnchor="middle" fill="#c4b5fd" fontSize="8" fontFamily="monospace">HELLO</text>
            <g transform="translate(660 189)">
              <circle r="5.5" fill="none" stroke="#fbbf24" strokeWidth="1" />
              <line x1="5.5" y1="0" x2="13" y2="0" stroke="#fbbf24" strokeWidth="1" />
              <line x1="10" y1="0" x2="10" y2="4" stroke="#fbbf24" strokeWidth="1" />
            </g>
            <rect x="682" y="180" width="60" height="18" rx="3" fill="rgba(168,85,247,0.18)" stroke="#a855f7" strokeWidth="0.8" />
            <text x="712" y="193" textAnchor="middle" fill="#ddd6fe" fontSize="8" fontFamily="monospace">A1#x9K@</text>
            <g transform="translate(752 189)">
              <circle r="5.5" fill="none" stroke="#fbbf24" strokeWidth="1" />
              <line x1="5.5" y1="0" x2="13" y2="0" stroke="#fbbf24" strokeWidth="1" />
              <line x1="10" y1="0" x2="10" y2="4" stroke="#fbbf24" strokeWidth="1" />
            </g>
            <rect x="774" y="180" width="32" height="18" rx="3" fill="rgba(168,85,247,0.08)" stroke="#a855f7" strokeWidth="0.8" />
            <text x="790" y="193" textAnchor="middle" fill="#c4b5fd" fontSize="8" fontFamily="monospace">HELLO</text>
            <text x="816" y="193" fill="#64748b" fontSize="9" style={{ letterSpacing: '0.12em' }}>AES</text>

            <circle r="2" fill="#fbbf24" filter="url(#p51-glow)" opacity="0">
              <animateMotion dur="3.2s" repeatCount="indefinite">
                <mpath href="#cr-sym-path" />
              </animateMotion>
              <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.15;0.85;1"
                dur="3.2s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Row 2 — Asymmetric */}
          <g>
            <text x="620" y="268" fill="#94a3b8" fontSize="9" fontWeight="700" style={{ letterSpacing: '0.18em' }}>
              ASYMMETRIC
            </text>
            <rect x="620" y="275" width="32" height="18" rx="3" fill="rgba(168,85,247,0.08)" stroke="#a855f7" strokeWidth="0.8" />
            <text x="636" y="288" textAnchor="middle" fill="#c4b5fd" fontSize="8" fontFamily="monospace">HELLO</text>
            <g transform="translate(660 284)">
              <circle r="5.5" fill="none" stroke="#34d399" strokeWidth="1" />
              <line x1="5.5" y1="0" x2="13" y2="0" stroke="#34d399" strokeWidth="1" />
              <line x1="10" y1="0" x2="10" y2="4" stroke="#34d399" strokeWidth="1" />
              <text x="10" y="-9" textAnchor="middle" fill="#34d399" fontSize="7" fontWeight="700">pub</text>
            </g>
            <rect x="682" y="275" width="60" height="18" rx="3" fill="rgba(168,85,247,0.18)" stroke="#a855f7" strokeWidth="0.8" />
            <text x="712" y="288" textAnchor="middle" fill="#ddd6fe" fontSize="8" fontFamily="monospace">B9$7zXp</text>
            <g transform="translate(752 284)">
              <circle r="5.5" fill="none" stroke="#ef4444" strokeWidth="1" />
              <line x1="5.5" y1="0" x2="13" y2="0" stroke="#ef4444" strokeWidth="1" />
              <line x1="10" y1="0" x2="10" y2="4" stroke="#ef4444" strokeWidth="1" />
              <text x="10" y="-9" textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="700">priv</text>
            </g>
            <rect x="774" y="275" width="32" height="18" rx="3" fill="rgba(168,85,247,0.08)" stroke="#a855f7" strokeWidth="0.8" />
            <text x="790" y="288" textAnchor="middle" fill="#c4b5fd" fontSize="8" fontFamily="monospace">HELLO</text>
            <text x="816" y="288" fill="#64748b" fontSize="9" style={{ letterSpacing: '0.12em' }}>RSA</text>

            <circle r="2" fill="#34d399" filter="url(#p51-glow)" opacity="0">
              <animateMotion dur="3.6s" begin="0.6s" repeatCount="indefinite">
                <mpath href="#cr-asym-path" />
              </animateMotion>
              <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.15;0.85;1"
                dur="3.6s" begin="0.6s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Row 3 — Hash */}
          <g>
            <text x="620" y="363" fill="#94a3b8" fontSize="9" fontWeight="700" style={{ letterSpacing: '0.18em' }}>
              HASH · еднопосочно
            </text>
            <rect x="620" y="370" width="38" height="18" rx="3" fill="rgba(168,85,247,0.08)" stroke="#a855f7" strokeWidth="0.8" />
            <text x="639" y="383" textAnchor="middle" fill="#c4b5fd" fontSize="7.5" fontFamily="monospace">password</text>
            <g transform="translate(665 379)">
              <line x1="0" y1="0" x2="18" y2="0" stroke="#f59e0b" strokeWidth="1.2" />
              <polygon points="18,0 14,-3 14,3" fill="#f59e0b" />
              <line x1="3" y1="-5" x2="14" y2="-5" stroke="#7f1d1d" strokeWidth="0.8" />
            </g>
            <rect x="688" y="370" width="118" height="18" rx="3" fill="rgba(168,85,247,0.18)" stroke="#a855f7" strokeWidth="0.8" />
            <text x="747" y="383" textAnchor="middle" fill="#ddd6fe" fontSize="7.5" fontFamily="monospace">
              2cf24dba5fb0a30e...
            </text>
            <text x="816" y="383" fill="#64748b" fontSize="8.5" style={{ letterSpacing: '0.1em' }}>SHA-256</text>

            <circle r="2" fill="#f59e0b" filter="url(#p51-glow)" opacity="0">
              <animateMotion dur="3s" begin="1.2s" repeatCount="indefinite">
                <mpath href="#cr-hash-path" />
              </animateMotion>
              <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.15;0.85;1"
                dur="3s" begin="1.2s" repeatCount="indefinite" />
            </circle>
          </g>

          <g transform="translate(620 465)">
            <rect width="260" height="22" rx="4" fill="rgba(15,23,42,0.6)" stroke="#6d28d9" strokeWidth="0.7" />
            <text x="14" y="15" fill="#c4b5fd" fontSize="10" fontFamily="monospace">
              at-rest · in-transit · HTTPS · TLS
            </text>
          </g>
        </g>

        {/* Bottom caption */}
        <text x={450} y={535} textAnchor="middle" fill="#475569" fontSize="11" style={{ letterSpacing: '0.22em' }}>
          три стълба · defense in depth
        </text>
      </svg>
    </div>
  )
}
