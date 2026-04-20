// Scene 6.1 — Policy Library
// Central RULEBOOK hex feeds seven policy "books" standing on a
// shelf. Each book has a color band, icon, label, and an
// approved tick. Compliance HUD shows 7/7 approved.

const RULEBOOK_X = 450
const RULEBOOK_Y = 200
const BOOK_Y = 400
const BOOK_W = 76
const BOOK_H = 100

const policies = [
  { id: 'aup',    x: 125, label: 'AUP',      sub: 'acceptable use',  color: '#3b82f6', icon: 'list' },
  { id: 'pwd',    x: 233, label: 'PASSWORD', sub: '12+ · 2FA',       color: '#f59e0b', icon: 'key' },
  { id: 'access', x: 341, label: 'ACCESS',   sub: 'least priv.',     color: '#a855f7', icon: 'lock' },
  { id: 'data',   x: 450, label: 'DATA',     sub: 'classify · keep', color: '#10b981', icon: 'db' },
  { id: 'remote', x: 559, label: 'REMOTE',   sub: 'VPN · device',    color: '#06b6d4', icon: 'laptop' },
  { id: 'ir',     x: 667, label: 'IR',       sub: 'incident plan',   color: '#ef4444', icon: 'alert' },
  { id: 'backup', x: 775, label: 'BACKUP',   sub: '3-2-1 · tested',  color: '#ec4899', icon: 'disks' },
]

function PolicyIcon({ kind, color }) {
  switch (kind) {
    case 'list':
      return (
        <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
          <circle cx="-7" cy="-5" r="1" fill={color} />
          <line x1="-4" y1="-5" x2="7" y2="-5" />
          <circle cx="-7" cy="0" r="1" fill={color} />
          <line x1="-4" y1="0" x2="7" y2="0" />
          <circle cx="-7" cy="5" r="1" fill={color} />
          <line x1="-4" y1="5" x2="7" y2="5" />
        </g>
      )
    case 'key':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round">
          <circle cx="-4" cy="0" r="3.5" />
          <line x1="-0.5" y1="0" x2="7" y2="0" />
          <line x1="4" y1="0" x2="4" y2="3.5" />
        </g>
      )
    case 'lock':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="-5" y="-1" width="10" height="8" rx="1" />
          <path d="M -3 -1 L -3 -5 Q -3 -8 0 -8 Q 3 -8 3 -5 L 3 -1" />
          <circle cx="0" cy="3" r="0.9" fill={color} />
        </g>
      )
    case 'db':
      return (
        <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
          <ellipse cx="0" cy="-5" rx="6" ry="1.8" />
          <path d="M -6 -5 L -6 5 Q -6 7 0 7 Q 6 7 6 5 L 6 -5" />
          <path d="M -6 0 Q -6 2 0 2 Q 6 2 6 0" />
        </g>
      )
    case 'laptop':
      return (
        <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="-6" y="-4" width="12" height="8" rx="1" />
          <line x1="-8" y1="5" x2="8" y2="5" />
          <path d="M -9 -2 Q 0 -9 9 -2" fill="none" opacity="0.5" strokeDasharray="1 2" />
        </g>
      )
    case 'alert':
      return (
        <g fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 0 -7 L 7 6 L -7 6 Z" />
          <line x1="0" y1="-2" x2="0" y2="2" />
          <circle cx="0" cy="4.2" r="0.8" fill={color} />
        </g>
      )
    case 'disks':
      return (
        <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
          <ellipse cx="0" cy="-4" rx="6.5" ry="1.7" />
          <ellipse cx="0" cy="0" rx="6.5" ry="1.7" />
          <ellipse cx="0" cy="4" rx="6.5" ry="1.7" />
        </g>
      )
    default: return null
  }
}

export default function Scene_6_1() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Compliance HUD */}
      <div className="absolute top-4 right-6 z-10 flex items-center gap-3 px-4 py-2 rounded-md border border-emerald-500/30 bg-slate-950/70 backdrop-blur-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-300/80">compliance</span>
          <span className="font-mono text-base font-bold text-emerald-200 tabular-nums">7 / 7 · approved</span>
        </div>
      </div>

      <svg viewBox="0 0 900 560" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="p61-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="rulebook-halo">
            <stop offset="0%"  stopColor="#22d3ee" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#083344" stopOpacity="0" />
          </radialGradient>
          {policies.map(p => (
            <path key={`lp-${p.id}`} id={`lp-${p.id}`}
              d={`M ${RULEBOOK_X},${RULEBOOK_Y + 48} L ${p.x},${BOOK_Y + 4}`} />
          ))}
        </defs>

        {/* Links rulebook → books */}
        {policies.map((p, i) => (
          <g key={`lnk-${p.id}`}>
            <line x1={RULEBOOK_X} y1={RULEBOOK_Y + 48} x2={p.x} y2={BOOK_Y + 4}
              stroke={p.color} strokeWidth="0.7" strokeDasharray="3 6" opacity="0.3">
              <animate attributeName="stroke-dashoffset" from="9" to="0" dur="2s" repeatCount="indefinite" />
            </line>
            <circle r="2" fill={p.color} filter="url(#p61-glow)" opacity="0">
              <animateMotion dur={`${3 + i * 0.25}s`} begin={`${i * 0.4}s`} repeatCount="indefinite">
                <mpath href={`#lp-${p.id}`} />
              </animateMotion>
              <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.15;0.85;1"
                dur={`${3 + i * 0.25}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Shelf */}
        <line x1="80" y1={BOOK_Y + BOOK_H + 14} x2="820" y2={BOOK_Y + BOOK_H + 14}
          stroke="#334155" strokeWidth="2" opacity="0.7" />
        <line x1="80" y1={BOOK_Y + BOOK_H + 18} x2="820" y2={BOOK_Y + BOOK_H + 18}
          stroke="#475569" strokeWidth="0.7" opacity="0.4" />

        {/* Central rulebook */}
        <g transform={`translate(${RULEBOOK_X} ${RULEBOOK_Y})`}>
          <circle r="90" fill="url(#rulebook-halo)" />
          {[0, 1.5].map((d, i) => (
            <circle key={i} r="55" fill="none" stroke="#22d3ee" strokeWidth="0.9" opacity="0">
              <animate attributeName="r" values="50;82" dur="3.2s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="3.2s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {/* Rotating outer hex */}
          <polygon points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30"
            fill="none" stroke="#0891b2" strokeWidth="0.9" strokeDasharray="3 8">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="55s" repeatCount="indefinite" />
          </polygon>
          {/* Main hex */}
          <polygon points="0,-44 38,-22 38,22 0,44 -38,22 -38,-22"
            fill="#0b1220" stroke="#22d3ee" strokeWidth="1.7" filter="url(#p61-glow)">
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.6s" repeatCount="indefinite" />
          </polygon>
          {/* Open book icon */}
          <g fill="none" stroke="#67e8f9" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M -22 -10 Q -4 -16 0 -10 L 0 16 Q -4 10 -22 14 Z" />
            <path d="M 22 -10 Q 4 -16 0 -10 L 0 16 Q 4 10 22 14 Z" />
            <line x1="-17" y1="-6" x2="-6" y2="-8" />
            <line x1="-17" y1="-1" x2="-6" y2="-3" />
            <line x1="-17" y1="4" x2="-6" y2="2" />
            <line x1="17" y1="-6" x2="6" y2="-8" />
            <line x1="17" y1="-1" x2="6" y2="-3" />
            <line x1="17" y1="4" x2="6" y2="2" />
          </g>
          <text y="-56" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="700" style={{ letterSpacing: '0.25em' }}>
            RULEBOOK
          </text>
          <text y="62" textAnchor="middle" fill="#94a3b8" fontSize="9" style={{ letterSpacing: '0.2em' }}>
            политики · процедури
          </text>
        </g>

        {/* Policy books */}
        {policies.map((p, i) => (
          <g key={p.id} transform={`translate(${p.x} ${BOOK_Y})`}>
            <rect x={-BOOK_W/2} y="0" width={BOOK_W} height={BOOK_H} rx="3"
              fill="#0b1220" stroke={p.color} strokeWidth="1.3" filter="url(#p61-glow)">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55"
                dur={`${2.6 + i * 0.25}s`} begin={`${i * 0.2}s`} repeatCount="indefinite" />
            </rect>
            <rect x={-BOOK_W/2} y="0" width={BOOK_W} height="14" rx="3" fill={p.color} opacity="0.28" />
            <line x1={-BOOK_W/2 + 3} y1="15" x2={BOOK_W/2 - 3} y2="15" stroke={p.color} strokeWidth="0.6" opacity="0.6" />
            <g transform="translate(0 34)">
              <PolicyIcon kind={p.icon} color={p.color} />
            </g>
            <text x="0" y={64} textAnchor="middle" fill={p.color} fontSize="10" fontWeight="800" style={{ letterSpacing: '0.12em' }}>
              {p.label}
            </text>
            <text x="0" y={80} textAnchor="middle" fill="#94a3b8" fontSize="7.5">
              {p.sub}
            </text>
            <g transform={`translate(${BOOK_W/2 - 8} 8)`}>
              <circle r="4.5" fill="#10b981" opacity="0.9">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              </circle>
              <path d="M -2.2 0 L -0.7 1.5 L 2.2 -1.6" fill="none" stroke="#0b1220" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        ))}

        <text x={450} y={540} textAnchor="middle" fill="#475569" fontSize="10" style={{ letterSpacing: '0.22em' }}>
          писмени · актуални · с обучение · с последствия
        </text>
      </svg>
    </div>
  )
}
