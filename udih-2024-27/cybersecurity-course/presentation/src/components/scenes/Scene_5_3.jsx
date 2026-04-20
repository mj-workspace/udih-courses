// Scene 5.3 — Security Operations Center
// Four log sources on the left (firewall, EDR, network, vuln scanner)
// stream ingest pulses into a central SIEM core. A live log feed
// scrolls on the right. Top-right HUD shows events-per-second.

import { useEffect, useState } from 'react'

const SIEM_X = 280
const SIEM_Y = 290

const sources = [
  { id: 'fw',  y: 150, label: 'FIREWALL',   sub: 'allow/deny/log',     color: '#3b82f6' },
  { id: 'edr', y: 230, label: 'EDR',        sub: 'endpoint detection', color: '#a855f7' },
  { id: 'net', y: 310, label: 'NETWORK',    sub: 'flow · dns · arp',   color: '#06b6d4' },
  { id: 'va',  y: 390, label: 'VULN SCAN',  sub: 'CVE · patch gaps',   color: '#10b981' },
]

function SourceIcon({ kind, color }) {
  switch (kind) {
    case 'fw':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
          <path d="M 0 -8 L 7 -5 L 7 3 C 7 7 0 10 0 10 C 0 10 -7 7 -7 3 L -7 -5 Z" />
          <path d="M -3 0 L -1 3 L 4 -3" />
        </g>
      )
    case 'edr':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="-8" y="-6" width="16" height="10" rx="1" />
          <line x1="-9" y1="6" x2="9" y2="6" />
          <circle cx="0" cy="-1" r="2" />
        </g>
      )
    case 'net':
      return (
        <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
          <circle r="2" />
          <circle cx="-7" cy="-5" r="2" />
          <circle cx="7" cy="-5" r="2" />
          <circle cx="-7" cy="5" r="2" />
          <circle cx="7" cy="5" r="2" />
          <line x1="-5" y1="-4" x2="-1" y2="-1" />
          <line x1="5" y1="-4" x2="1" y2="-1" />
          <line x1="-5" y1="4" x2="-1" y2="1" />
          <line x1="5" y1="4" x2="1" y2="1" />
        </g>
      )
    case 'va':
      return (
        <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
          <ellipse cx="0" cy="1" rx="5" ry="6" />
          <line x1="-5" y1="-1" x2="-9" y2="-3" />
          <line x1="5" y1="-1" x2="9" y2="-3" />
          <line x1="-5" y1="4" x2="-9" y2="6" />
          <line x1="5" y1="4" x2="9" y2="6" />
          <line x1="0" y1="-5" x2="0" y2="-9" />
          <circle cx="-1.5" cy="-1" r="0.6" fill={color} />
          <circle cx="1.5" cy="-1" r="0.6" fill={color} />
        </g>
      )
    default:
      return null
  }
}

const LOGS = [
  { ts: '14:23:07', src: 'FW',    sev: 'ALERT', msg: 'deny :22 from 185.220.101.4' },
  { ts: '14:23:12', src: 'EDR',   sev: 'WARN',  msg: 'suspicious powershell invoke' },
  { ts: '14:23:18', src: 'NET',   sev: 'INFO',  msg: 'port scan · 103.47.x.x' },
  { ts: '14:23:24', src: 'AUTH',  sev: 'ALERT', msg: '5 failed logins · admin' },
  { ts: '14:23:30', src: 'FW',    sev: 'DROP',  msg: 'rate-limit 1200 req/s' },
  { ts: '14:23:36', src: 'IPS',   sev: 'DROP',  msg: 'SQL injection blocked' },
  { ts: '14:23:42', src: 'EDR',   sev: 'CRIT',  msg: 'malware sig · quarantined' },
  { ts: '14:23:48', src: 'AUDIT', sev: 'INFO',  msg: 'fw ruleset change accepted' },
  { ts: '14:23:54', src: 'NET',   sev: 'WARN',  msg: 'DNS tunneling suspected' },
  { ts: '14:24:01', src: 'VA',    sev: 'WARN',  msg: 'CVE-2024-3094 patch missing' },
  { ts: '14:24:07', src: 'FW',    sev: 'ALERT', msg: 'deny :445 SMB external' },
  { ts: '14:24:13', src: 'EDR',   sev: 'INFO',  msg: 'baseline · 142 hosts' },
  { ts: '14:24:19', src: 'NET',   sev: 'ALERT', msg: 'ARP anomaly · mac collision' },
  { ts: '14:24:25', src: 'IPS',   sev: 'CRIT',  msg: 'C2 beacon · DNS exfil' },
]

const SEV_CLS = {
  INFO:  'text-slate-400',
  WARN:  'text-amber-300',
  ALERT: 'text-orange-400',
  DROP:  'text-rose-300',
  CRIT:  'text-red-400',
}

export default function Scene_5_3() {
  const [eps, setEps] = useState(1247)

  useEffect(() => {
    const id = setInterval(() => {
      setEps(() => 1100 + Math.floor(Math.random() * 380))
    }, 900)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* EPS counter */}
      <div className="absolute top-4 right-6 z-10 flex items-center gap-3 px-4 py-2 rounded-md border border-cyan-500/30 bg-slate-950/70 backdrop-blur-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-300/80">EPS · events/sec</span>
          <span className="font-mono text-lg font-bold text-cyan-200 tabular-nums">
            {eps.toLocaleString('bg-BG')}
          </span>
        </div>
      </div>

      {/* Live log feed — right panel */}
      <div className="absolute right-4 top-24 bottom-10 w-[42%] max-w-[380px] z-[5] rounded-lg border border-cyan-500/25 bg-slate-950/75 backdrop-blur-sm overflow-hidden flex flex-col">
        <div className="px-3 py-1.5 border-b border-cyan-500/20 flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-300/80">LIVE LOG FEED</span>
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[9px] font-mono text-emerald-300/80">streaming</span>
          </span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div
            style={{ animation: 'log-scroll 32s linear infinite' }}
            className="absolute inset-x-0 top-0 font-mono text-[10px] leading-5 px-2.5 py-2"
          >
            {[...LOGS, ...LOGS].map((l, i) => (
              <div key={i} className="flex gap-1.5 py-[1.5px]">
                <span className="text-slate-600 shrink-0">{l.ts}</span>
                <span className="text-slate-400 shrink-0 w-[40px]">{l.src}</span>
                <span className={`shrink-0 w-[36px] font-bold ${SEV_CLS[l.sev]}`}>{l.sev}</span>
                <span className="text-slate-300 truncate">{l.msg}</span>
              </div>
            ))}
          </div>
          {/* Top/bottom fade masks */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-slate-950/90 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-950/90 to-transparent" />
        </div>
      </div>

      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="p53-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="siem-halo">
            <stop offset="0%"  stopColor="#06b6d4" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#083344" stopOpacity="0" />
          </radialGradient>
          {sources.map(s => (
            <path
              key={`feed-${s.id}`}
              id={`feed-${s.id}`}
              d={`M 125,${s.y} L ${SIEM_X - 55},${SIEM_Y}`}
            />
          ))}
        </defs>

        {/* Links from sources to SIEM — dashed */}
        {sources.map(s => (
          <line key={`ln-${s.id}`}
            x1={125} y1={s.y}
            x2={SIEM_X - 55} y2={SIEM_Y}
            stroke={s.color} strokeWidth="0.9" strokeDasharray="3 6" opacity="0.4">
            <animate attributeName="stroke-dashoffset" from="9" to="0" dur="1.6s" repeatCount="indefinite" />
          </line>
        ))}

        {/* Traveling ingest pulses — 3 per source, staggered */}
        {sources.map((s, i) => (
          [0, 1.1, 2.2].map((delay, k) => (
            <circle key={`p-${s.id}-${k}`} r="2.4" fill={s.color} filter="url(#p53-glow)" opacity="0">
              <animateMotion dur="3.3s" begin={`${(i * 0.4) + delay}s`} repeatCount="indefinite">
                <mpath href={`#feed-${s.id}`} />
              </animateMotion>
              <animate attributeName="opacity"
                values="0;0.95;0.95;0" keyTimes="0;0.15;0.85;1"
                dur="3.3s" begin={`${(i * 0.4) + delay}s`} repeatCount="indefinite" />
            </circle>
          ))
        ))}

        {/* Source cards */}
        {sources.map((s, i) => (
          <g key={s.id} transform={`translate(75 ${s.y})`}>
            <rect x="-45" y="-22" width="90" height="44" rx="6"
              fill="rgba(15,23,42,0.72)" stroke={s.color} strokeWidth="1" filter="url(#p53-glow)">
              <animate attributeName="stroke-opacity"
                values="0.5;1;0.5" dur={`${2.8 + i * 0.2}s`} repeatCount="indefinite" />
            </rect>
            <g transform="translate(-30 0)">
              <SourceIcon kind={s.id} color={s.color} />
            </g>
            <text x="-14" y="-5" fill={s.color} fontSize="10.5" fontWeight="700" style={{ letterSpacing: '0.12em' }}>
              {s.label}
            </text>
            <text x="-14" y="8" fill="#64748b" fontSize="8.5">
              {s.sub}
            </text>
            <circle cx="36" cy="-14" r="2.5" fill="#10b981">
              <animate attributeName="opacity" values="0.4;1;0.4"
                dur="1.4s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* SIEM core */}
        <g transform={`translate(${SIEM_X} ${SIEM_Y})`}>
          <circle r="110" fill="url(#siem-halo)" />
          {[0, 1.5, 3].map((d, i) => (
            <circle key={i} r="60" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="55;95" dur="4.5s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.45;0" dur="4.5s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Outer rotating hex frame */}
          <polygon points="0,-72 62,-36 62,36 0,72 -62,36 -62,-36"
            fill="none" stroke="#0891b2" strokeWidth="1" strokeDasharray="3 8">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="50s" repeatCount="indefinite" />
          </polygon>

          {/* Main hex */}
          <polygon points="0,-55 47,-27 47,27 0,55 -47,27 -47,-27"
            fill="#0b1220" stroke="#22d3ee" strokeWidth="1.8" filter="url(#p53-glow)">
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.6s" repeatCount="indefinite" />
          </polygon>

          {/* Inner neural grid */}
          <g opacity="0.6">
            {[
              { x: -22, y: -14 }, { x: 0, y: -18 }, { x: 22, y: -14 },
              { x: -28, y: 8 }, { x: 0, y: 14 }, { x: 28, y: 8 },
            ].map((n, i) => (
              <circle key={i} cx={n.x} cy={n.y} r="1.6" fill="#67e8f9">
                <animate attributeName="opacity" values="0.4;1;0.4"
                  dur={`${1.6 + (i * 0.2)}s`} begin={`${i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <line x1="-22" y1="-14" x2="0" y2="-18" stroke="#67e8f9" strokeWidth="0.5" opacity="0.4" />
            <line x1="0" y1="-18" x2="22" y2="-14" stroke="#67e8f9" strokeWidth="0.5" opacity="0.4" />
            <line x1="-22" y1="-14" x2="-28" y2="8" stroke="#67e8f9" strokeWidth="0.5" opacity="0.4" />
            <line x1="22" y1="-14" x2="28" y2="8" stroke="#67e8f9" strokeWidth="0.5" opacity="0.4" />
            <line x1="-28" y1="8" x2="0" y2="14" stroke="#67e8f9" strokeWidth="0.5" opacity="0.4" />
            <line x1="0" y1="14" x2="28" y2="8" stroke="#67e8f9" strokeWidth="0.5" opacity="0.4" />
            <line x1="0" y1="-18" x2="0" y2="14" stroke="#67e8f9" strokeWidth="0.5" opacity="0.4" />
          </g>

          <text y="-30" textAnchor="middle" fill="#cffafe" fontSize="22" fontWeight="800" style={{ letterSpacing: '0.12em' }}>
            SIEM
          </text>
          <text y="36" textAnchor="middle" fill="#64748b" fontSize="9" style={{ letterSpacing: '0.2em' }}>
            security ops center
          </text>
        </g>

        {/* Bottom: 24/7 + log-goldmine */}
        <g transform={`translate(${SIEM_X - 70} 470)`}>
          <rect x="0" y="0" width="140" height="36" rx="6"
            fill="rgba(15,23,42,0.75)" stroke="#f59e0b" strokeWidth="0.9">
            <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2.2s" repeatCount="indefinite" />
          </rect>
          <g transform="translate(18 18)">
            <circle r="10" fill="none" stroke="#f59e0b" strokeWidth="1.2" />
            <line x1="0" y1="0" x2="0" y2="-6" stroke="#f59e0b" strokeWidth="1.3" strokeLinecap="round" />
            <line x1="0" y1="0" x2="5" y2="2" stroke="#f59e0b" strokeWidth="1.3" strokeLinecap="round" />
          </g>
          <text x="36" y="16" fill="#fcd34d" fontSize="12" fontWeight="800" style={{ letterSpacing: '0.15em' }}>
            24 / 7
          </text>
          <text x="36" y="28" fill="#94a3b8" fontSize="9">
            monitoring
          </text>
        </g>

        {/* Bottom caption */}
        <text x={SIEM_X} y={540} textAnchor="middle" fill="#475569" fontSize="10" style={{ letterSpacing: '0.22em' }}>
          логовете · златна мина · ако ги четеш
        </text>
      </svg>
    </div>
  )
}
