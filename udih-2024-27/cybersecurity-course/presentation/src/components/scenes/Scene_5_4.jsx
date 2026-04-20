// Scene 5.4 — Attack vs counter-measure matrix
// Four quadrants, each pairing a common network attack with the
// primary defense. Q1 DDoS · Q2 MitM · Q3 DNS/ARP spoof · Q4
// Brute force. Between them a compact defense-core badge with
// the four recurring mantras.

import { useEffect, useState } from 'react'

// DDoS projectiles
const DDOS = Array.from({ length: 14 }).map((_, i) => ({
  key: i,
  y: 110 + ((i * 17) % 130),
  delay: (i * 0.2) % 3,
  dur: 1.6 + (i % 4) * 0.15,
}))

const BF_ATTEMPTS = ['password1', 'admin', 'qwerty', 'welcome', 'letmein']

export default function Scene_5_4() {
  const [bfPhase, setBfPhase] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setBfPhase(p => (p + 1) % 9)
    }, 620)
    return () => clearInterval(id)
  }, [])

  const bfTries = Math.min(bfPhase + 1, 5)
  const bfLocked = bfPhase >= 5
  const currentPw = bfLocked ? '' : BF_ATTEMPTS[bfPhase % BF_ATTEMPTS.length]

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="p54-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="cell-bg">
            <stop offset="0%" stopColor="#0b1220" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0b1220" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {/* ============ Q1 · DDoS ============ */}
        <g>
          <rect x="30" y="70" width="340" height="190" rx="10"
            fill="url(#cell-bg)" stroke="#334155" strokeWidth="0.8" />
          <text x="48" y="92" fill="#ef4444" fontSize="12" fontWeight="800" style={{ letterSpacing: '0.18em' }}>
            DDoS
          </text>
          <text x="48" y="106" fill="#94a3b8" fontSize="9">
            distributed denial of service
          </text>

          {/* Source fog */}
          <rect x="30" y="110" width="30" height="130" fill="#7f1d1d" opacity="0.12" />
          <text x="45" y="250" textAnchor="middle" fill="#9f1239" fontSize="8" style={{ letterSpacing: '0.15em' }}>
            BOTNET
          </text>

          {/* Attack swarm */}
          {DDOS.map(d => (
            <circle key={d.key} r="2.2" fill="#ef4444" filter="url(#p54-glow)" opacity="0">
              <animateMotion dur={`${d.dur}s`} begin={`${d.delay}s`} repeatCount="indefinite"
                path={`M 65,${d.y} L 305,${d.y}`} />
              <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.1;0.85;1"
                dur={`${d.dur}s`} begin={`${d.delay}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Shield */}
          <g transform="translate(315 170)">
            {[0, 1.1].map((dd, k) => (
              <circle key={k} r="18" fill="none" stroke="#10b981" strokeWidth="0.8" opacity="0">
                <animate attributeName="r" values="18;34" dur="2.2s" begin={`${dd}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.55;0" dur="2.2s" begin={`${dd}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <path d="M 0 -28 L 20 -18 L 20 8 C 20 22 0 30 0 30 C 0 30 -20 22 -20 8 L -20 -18 Z"
              fill="rgba(16,185,129,0.18)" stroke="#10b981" strokeWidth="1.5" filter="url(#p54-glow)">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="2.2s" repeatCount="indefinite" />
            </path>
            <path d="M -6 0 L -2 5 L 8 -5" fill="none" stroke="#6ee7b7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

            {/* Rate-limit meter */}
            <rect x="-22" y="40" width="44" height="5" rx="2.5" fill="#0b1220" stroke="#10b981" strokeWidth="0.6" />
            <rect x="-22" y="40" width="44" height="5" rx="2.5" fill="none" stroke="#10b981" strokeWidth="0.4" />
            <rect x="-22" y="40" height="5" rx="2.5" fill="#10b981">
              <animate attributeName="width" values="0;44;16;40;44"
                keyTimes="0;0.35;0.55;0.8;1" dur="3.6s" repeatCount="indefinite" />
            </rect>
            <text y="57" textAnchor="middle" fill="#64748b" fontSize="7.5" style={{ letterSpacing: '0.15em' }}>
              rate-limit
            </text>
          </g>

          <text x="200" y="246" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="700" style={{ letterSpacing: '0.12em' }}>
            → CDN · Cloudflare · AWS Shield
          </text>
        </g>

        {/* ============ Q2 · MitM ============ */}
        <g>
          <rect x="530" y="70" width="340" height="190" rx="10"
            fill="url(#cell-bg)" stroke="#334155" strokeWidth="0.8" />
          <text x="548" y="92" fill="#ef4444" fontSize="12" fontWeight="800" style={{ letterSpacing: '0.18em' }}>
            MAN-IN-THE-MIDDLE
          </text>
          <text x="548" y="106" fill="#94a3b8" fontSize="9">
            подслушвач между двама
          </text>

          {/* Node A */}
          <g transform="translate(580 180)">
            <circle r="22" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.3" filter="url(#p54-glow)">
              <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.6s" repeatCount="indefinite" />
            </circle>
            <g fill="none" stroke="#67e8f9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="-8" y="-5" width="16" height="10" rx="1" />
              <line x1="-10" y1="7" x2="10" y2="7" />
            </g>
            <text y="36" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="600">Алис</text>
          </g>

          {/* Node B */}
          <g transform="translate(820 180)">
            <circle r="22" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.3" filter="url(#p54-glow)">
              <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.6s" repeatCount="indefinite" />
            </circle>
            <g fill="none" stroke="#67e8f9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="-9" y="-8" width="18" height="6" rx="1" />
              <rect x="-9" y="0" width="18" height="6" rx="1" />
              <circle cx="-5" cy="-5" r="0.8" fill="#22d3ee" />
              <circle cx="-5" cy="3" r="0.8" fill="#22d3ee" />
            </g>
            <text y="36" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="600">Боб</text>
          </g>

          {/* Secure channel (HTTPS) */}
          <line x1="604" y1="180" x2="796" y2="180"
            stroke="#10b981" strokeWidth="1.1" strokeDasharray="4 4" opacity="0.65">
            <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1.5s" repeatCount="indefinite" />
          </line>
          {[0, 1.5].map((d, i) => (
            <circle key={i} r="2.2" fill="#10b981" filter="url(#p54-glow)" opacity="0">
              <animateMotion dur="3s" begin={`${d}s`} repeatCount="indefinite"
                path="M 604,180 L 796,180" />
              <animate attributeName="opacity" values="0;0.9;0.9;0"
                keyTimes="0;0.15;0.85;1" dur="3s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Eavesdropper — crossed out */}
          <g transform="translate(700 180)">
            <circle r="18" fill="#0b1220" stroke="#ef4444" strokeWidth="0.9" opacity="0.55">
              <animate attributeName="stroke-opacity" values="0.35;0.8;0.35" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <g fill="none" stroke="#ef4444" strokeWidth="1.1" strokeLinecap="round">
              <path d="M -8 0 Q 0 -5 8 0 Q 0 5 -8 0 Z" />
              <circle r="1.8" fill="#ef4444" />
            </g>
            <line x1="-19" y1="-19" x2="19" y2="19" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" />
            <text y="38" textAnchor="middle" fill="#9f1239" fontSize="8" style={{ letterSpacing: '0.15em' }}>
              НЕ ЧЕТЕ
            </text>
          </g>

          {/* HTTPS lock */}
          <g transform="translate(700 130)">
            <rect x="-13" y="-2" width="26" height="18" rx="3"
              fill="rgba(6,78,59,0.7)" stroke="#10b981" strokeWidth="1" filter="url(#p54-glow)">
              <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite" />
            </rect>
            <path d="M -7 -2 L -7 -9 Q -7 -14 0 -14 Q 7 -14 7 -9 L 7 -2"
              fill="none" stroke="#10b981" strokeWidth="1.2" />
            <circle cx="0" cy="7" r="2" fill="#6ee7b7" />
            <text y="-20" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="700" style={{ letterSpacing: '0.18em' }}>
              HTTPS
            </text>
          </g>

          <text x="700" y="246" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="700" style={{ letterSpacing: '0.12em' }}>
            → HTTPS · VPN · HSTS · cert pinning
          </text>
        </g>

        {/* ============ Q3 · DNS / ARP Spoof ============ */}
        <g>
          <rect x="30" y="320" width="340" height="190" rx="10"
            fill="url(#cell-bg)" stroke="#334155" strokeWidth="0.8" />
          <text x="48" y="342" fill="#ef4444" fontSize="12" fontWeight="800" style={{ letterSpacing: '0.18em' }}>
            DNS / ARP SPOOF
          </text>
          <text x="48" y="356" fill="#94a3b8" fontSize="9">
            подмяна на записи
          </text>

          {/* Query */}
          <g transform="translate(55 410)">
            <rect x="0" y="-12" width="98" height="24" rx="3" fill="#0b1220" stroke="#475569" strokeWidth="0.8" />
            <text x="8" y="4" fill="#e2e8f0" fontSize="9" fontFamily="monospace">dig bank.com</text>
            <text x="8" y="-18" fill="#64748b" fontSize="7.5" style={{ letterSpacing: '0.15em' }}>QUERY</text>
          </g>

          {/* Arrows to responses */}
          <path d="M 160 410 L 195 385" stroke="#475569" strokeWidth="0.8" strokeDasharray="3 4" fill="none">
            <animate attributeName="stroke-dashoffset" from="7" to="0" dur="1.8s" repeatCount="indefinite" />
          </path>
          <path d="M 160 410 L 195 440" stroke="#475569" strokeWidth="0.8" strokeDasharray="3 4" fill="none">
            <animate attributeName="stroke-dashoffset" from="7" to="0" dur="1.8s" repeatCount="indefinite" />
          </path>

          {/* Fake response */}
          <g transform="translate(200 378)">
            <rect x="0" y="-11" width="160" height="22" rx="3"
              fill="rgba(239,68,68,0.14)" stroke="#ef4444" strokeWidth="0.9">
              <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
            </rect>
            <text x="10" y="5" fill="#fca5a5" fontSize="9" fontFamily="monospace">203.0.113.1</text>
            <text x="95" y="5" fill="#f87171" fontSize="7.5" fontWeight="700" style={{ letterSpacing: '0.15em' }}>FORGED</text>
            <line x1="5" y1="-8" x2="155" y2="10" stroke="#ef4444" strokeWidth="1.4" opacity="0.8" strokeLinecap="round" />
          </g>

          {/* Real response */}
          <g transform="translate(200 442)">
            <rect x="0" y="-11" width="160" height="22" rx="3"
              fill="rgba(16,185,129,0.14)" stroke="#10b981" strokeWidth="0.9">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="2.2s" repeatCount="indefinite" />
            </rect>
            <text x="10" y="5" fill="#6ee7b7" fontSize="9" fontFamily="monospace">93.184.216.34</text>
            <text x="100" y="5" fill="#34d399" fontSize="7.5" fontWeight="700" style={{ letterSpacing: '0.15em' }}>DNSSEC</text>
            <g transform="translate(144 0)">
              <circle r="6" fill="none" stroke="#34d399" strokeWidth="1" />
              <path d="M -3 0 L -1 2 L 3 -2" fill="none" stroke="#34d399" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>

          <text x="200" y="498" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="700" style={{ letterSpacing: '0.12em' }}>
            → DNSSEC · 1.1.1.1 · static ARP
          </text>
        </g>

        {/* ============ Q4 · Brute force ============ */}
        <g>
          <rect x="530" y="320" width="340" height="190" rx="10"
            fill="url(#cell-bg)" stroke="#334155" strokeWidth="0.8" />
          <text x="548" y="342" fill="#ef4444" fontSize="12" fontWeight="800" style={{ letterSpacing: '0.18em' }}>
            BRUTE FORCE
          </text>
          <text x="548" y="356" fill="#94a3b8" fontSize="9">
            автоматично пробване на пароли
          </text>

          {/* Login form */}
          <g transform="translate(620 420)">
            <rect x="-62" y="-38" width="124" height="76" rx="5"
              fill="#0b1220" stroke={bfLocked ? '#ef4444' : '#475569'} strokeWidth="1.2">
              {bfLocked && <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="0.9s" repeatCount="indefinite" />}
            </rect>
            <text x="-52" y="-22" fill="#64748b" fontSize="7.5" fontFamily="monospace" style={{ letterSpacing: '0.15em' }}>USER</text>
            <rect x="-52" y="-16" width="104" height="11" rx="2" fill="rgba(148,163,184,0.1)" stroke="#475569" strokeWidth="0.5" />
            <text x="-48" y="-7" fill="#94a3b8" fontSize="8" fontFamily="monospace">admin</text>

            <text x="-52" y="8" fill="#64748b" fontSize="7.5" fontFamily="monospace" style={{ letterSpacing: '0.15em' }}>PASSWORD</text>
            <rect x="-52" y="12" width="104" height="11" rx="2"
              fill={bfLocked ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.1)'}
              stroke={bfLocked ? '#ef4444' : '#7f1d1d'} strokeWidth="0.6" />
            <text x="-48" y="21" fill={bfLocked ? '#fca5a5' : '#f87171'} fontSize="8" fontFamily="monospace">
              {bfLocked ? '• • • • • • • •' : currentPw}
            </text>
          </g>

          {/* Attempts counter */}
          <g transform="translate(770 380)">
            <text textAnchor="middle" fill="#94a3b8" fontSize="8" style={{ letterSpacing: '0.2em' }}>FAIL</text>
            <text y="22" textAnchor="middle" fill={bfLocked ? '#ef4444' : '#fbbf24'}
              fontSize="24" fontWeight="800" fontFamily="monospace">
              {bfLocked ? '5+' : String(bfTries).padStart(2, '0')}
            </text>
          </g>

          {/* Lock overlay */}
          {bfLocked && (
            <g transform="translate(770 440)">
              <circle r="18" fill="rgba(127,29,29,0.25)" stroke="#ef4444" strokeWidth="1.2">
                <animate attributeName="r" values="16;22;16" dur="1s" repeatCount="indefinite" />
              </circle>
              <g stroke="#fecaca" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="-7" y="-3" width="14" height="11" rx="1.5" />
                <path d="M -4 -3 L -4 -8 Q -4 -12 0 -12 Q 4 -12 4 -8 L 4 -3" />
              </g>
              <text y="32" textAnchor="middle" fill="#fecaca" fontSize="8.5" fontWeight="800" style={{ letterSpacing: '0.25em' }}>
                LOCKED
              </text>
            </g>
          )}

          <text x="700" y="498" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="700" style={{ letterSpacing: '0.12em' }}>
            → lockout · 2FA · CAPTCHA
          </text>
        </g>

        {/* ============ Center Defense Core ============ */}
        <g transform="translate(450 290)">
          {[0, 1.8].map((d, i) => (
            <circle key={i} r="36" fill="none" stroke="#a855f7" strokeWidth="0.8" opacity="0">
              <animate attributeName="r" values="34;56" dur="3.4s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="3.4s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <rect x="-66" y="-28" width="132" height="56" rx="8"
            fill="#0b1220" stroke="#a855f7" strokeWidth="1.4" filter="url(#p54-glow)">
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="2.6s" repeatCount="indefinite" />
          </rect>
          <rect x="-62" y="-24" width="124" height="48" rx="6"
            fill="none" stroke="#c4b5fd" strokeWidth="0.6" opacity="0.5" />
          <text y="-32" textAnchor="middle" fill="#a855f7" fontSize="7.5" fontWeight="700" style={{ letterSpacing: '0.28em' }}>
            DEFENSE · CORE
          </text>
          <text x="-32" y="-8" textAnchor="middle" fill="#ddd6fe" fontSize="10" fontWeight="700" style={{ letterSpacing: '0.1em' }}>PATCH</text>
          <text x="32" y="-8" textAnchor="middle" fill="#ddd6fe" fontSize="10" fontWeight="700" style={{ letterSpacing: '0.1em' }}>SEGMENT</text>
          <text x="-32" y="14" textAnchor="middle" fill="#ddd6fe" fontSize="10" fontWeight="700" style={{ letterSpacing: '0.1em' }}>MONITOR</text>
          <text x="32" y="14" textAnchor="middle" fill="#ddd6fe" fontSize="10" fontWeight="700" style={{ letterSpacing: '0.1em' }}>PLAN</text>
        </g>

        {/* Bottom caption */}
        <text x={450} y={545} textAnchor="middle" fill="#475569" fontSize="10" style={{ letterSpacing: '0.22em' }}>
          атака · защита · знай и двете
        </text>
      </svg>
    </div>
  )
}
