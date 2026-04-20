// Scene 2.1 — Phishing email with red-flag indicators.
// Central fake email with highlighted suspicious elements (sender, subject
// urgency, body link, attachment). Pulsing red-flag callouts point to each.
// Five phishing channels (email / spear / whale / smishing / vishing) orbit
// the email, periodically launching a fishing-hook toward the victim.

const CX = 450
const CY = 300

// Fake email layout
const EMAIL = {
  x: 200, y: 110, w: 500, h: 340,
}

// Red flags: each anchored to a point on the email, pointing to a label.
const flags = [
  {
    id: 'sender',
    // Anchor inside email (sender line)
    ax: EMAIL.x + 150, ay: EMAIL.y + 46,
    // Callout label position
    lx: EMAIL.x - 140, ly: EMAIL.y + 40,
    label: 'подозрителен домейн',
    delay: 0,
  },
  {
    id: 'subject',
    ax: EMAIL.x + 200, ay: EMAIL.y + 98,
    lx: EMAIL.x + EMAIL.w + 40, ly: EMAIL.y + 90,
    label: 'спешност / натиск',
    delay: 0.8,
  },
  {
    id: 'link',
    ax: EMAIL.x + 170, ay: EMAIL.y + 212,
    lx: EMAIL.x - 110, ly: EMAIL.y + 210,
    label: 'скрит URL',
    delay: 1.6,
  },
  {
    id: 'attach',
    ax: EMAIL.x + 100, ay: EMAIL.y + 290,
    lx: EMAIL.x - 130, ly: EMAIL.y + 300,
    label: 'двойно разширение',
    delay: 2.4,
  },
  {
    id: 'creds',
    ax: EMAIL.x + 320, ay: EMAIL.y + 260,
    lx: EMAIL.x + EMAIL.w + 40, ly: EMAIL.y + 250,
    label: 'искане на парола',
    delay: 3.2,
  },
]

// Phishing channels orbiting the email
const channels = [
  { id: 'email',    label: 'Email',    color: '#f59e0b', angle: -135, glyph: 'envelope' },
  { id: 'spear',    label: 'Spear',    color: '#ef4444', angle: -90,  glyph: 'target'   },
  { id: 'whaling',  label: 'Whaling',  color: '#8b5cf6', angle: -45,  glyph: 'crown'    },
  { id: 'smishing', label: 'Smishing', color: '#06b6d4', angle: 135,  glyph: 'sms'      },
  { id: 'vishing',  label: 'Vishing',  color: '#10b981', angle: 90,   glyph: 'phone'    },
]

const ORBIT_RX = 340
const ORBIT_RY = 220

const channelPositions = channels.map(c => {
  const rad = (c.angle * Math.PI) / 180
  return { ...c, x: CX + ORBIT_RX * Math.cos(rad), y: CY + ORBIT_RY * Math.sin(rad) }
})

function ChannelGlyph({ kind }) {
  switch (kind) {
    case 'envelope':
      return (
        <g>
          <rect x="-10" y="-7" width="20" height="14" rx="1" fill="none" strokeWidth="1.4" />
          <path d="M -10 -7 L 0 1 L 10 -7" fill="none" strokeWidth="1.4" />
        </g>
      )
    case 'target':
      return (
        <g>
          <circle r="9" fill="none" strokeWidth="1.2" />
          <circle r="5" fill="none" strokeWidth="1.2" />
          <circle r="1.6" fill="currentColor" />
          <line x1="-12" y1="0" x2="-9" y2="0" strokeWidth="1.2" />
          <line x1="12" y1="0" x2="9" y2="0" strokeWidth="1.2" />
          <line x1="0" y1="-12" x2="0" y2="-9" strokeWidth="1.2" />
          <line x1="0" y1="12" x2="0" y2="9" strokeWidth="1.2" />
        </g>
      )
    case 'crown':
      return (
        <g>
          <path d="M -10 4 L -10 -6 L -5 -1 L 0 -8 L 5 -1 L 10 -6 L 10 4 Z" fill="none" strokeWidth="1.4" />
          <line x1="-10" y1="7" x2="10" y2="7" strokeWidth="1.4" />
          <circle cx="-5" cy="-5" r="1.3" fill="currentColor" />
          <circle cx="0" cy="-8" r="1.6" fill="currentColor" />
          <circle cx="5" cy="-5" r="1.3" fill="currentColor" />
        </g>
      )
    case 'sms':
      return (
        <g>
          <path d="M -10 -6 h 20 a 2 2 0 0 1 2 2 v 8 a 2 2 0 0 1 -2 2 h -14 l -5 4 v -4 h -1 a 2 2 0 0 1 -2 -2 v -8 a 2 2 0 0 1 2 -2 z" fill="none" strokeWidth="1.3" />
          <circle cx="-4" cy="0" r="1" fill="currentColor" />
          <circle cx="0" cy="0" r="1" fill="currentColor" />
          <circle cx="4" cy="0" r="1" fill="currentColor" />
        </g>
      )
    case 'phone':
      return (
        <g>
          <path d="M -8 -10 Q -11 -7 -8 -2 Q -3 6 4 10 Q 9 12 12 9 L 9 5 Q 6 7 2 4 Q -2 0 -5 -4 Q -7 -7 -4 -9 Z"
            fill="none" strokeWidth="1.4" />
        </g>
      )
    default:
      return <circle r="8" fill="currentColor" />
  }
}

export default function Scene_2_1() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="p-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="p-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <linearGradient id="email-head" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0b1220" />
          </linearGradient>
          <linearGradient id="email-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          {channelPositions.map(c => (
            <path
              key={`hook-${c.id}`}
              id={`hook-${c.id}`}
              d={`M ${c.x},${c.y} Q ${(c.x + CX) / 2 + (c.x > CX ? -30 : 30)},${(c.y + CY) / 2 - 40} ${CX},${CY}`}
            />
          ))}
        </defs>

        {/* Orbit ellipse (decorative) */}
        <ellipse
          cx={CX} cy={CY} rx={ORBIT_RX} ry={ORBIT_RY}
          fill="none" stroke="#1e293b" strokeWidth="0.6"
          strokeDasharray="3 8" opacity="0.5"
        />

        {/* Email window */}
        <g filter="url(#p-glow)">
          {/* Shadow / halo */}
          <rect
            x={EMAIL.x - 14} y={EMAIL.y - 14}
            width={EMAIL.w + 28} height={EMAIL.h + 28}
            rx="12"
            fill="none" stroke="#ef4444" strokeWidth="0.8"
            opacity="0.25"
            strokeDasharray="2 6"
          >
            <animate attributeName="stroke-opacity" values="0.15;0.45;0.15" dur="3.4s" repeatCount="indefinite" />
          </rect>
        </g>

        {/* Email frame */}
        <g>
          {/* Background */}
          <rect
            x={EMAIL.x} y={EMAIL.y}
            width={EMAIL.w} height={EMAIL.h}
            rx="8"
            fill="url(#email-body)"
            stroke="#334155"
            strokeWidth="1"
          />
          {/* Header strip */}
          <rect
            x={EMAIL.x} y={EMAIL.y}
            width={EMAIL.w} height={72}
            fill="url(#email-head)"
          />
          {/* Header divider */}
          <line
            x1={EMAIL.x} y1={EMAIL.y + 72}
            x2={EMAIL.x + EMAIL.w} y2={EMAIL.y + 72}
            stroke="#334155" strokeWidth="0.8"
          />
          {/* Window buttons */}
          <circle cx={EMAIL.x + 14} cy={EMAIL.y + 18} r="3.5" fill="#ef4444" opacity="0.8" />
          <circle cx={EMAIL.x + 26} cy={EMAIL.y + 18} r="3.5" fill="#f59e0b" opacity="0.8" />
          <circle cx={EMAIL.x + 38} cy={EMAIL.y + 18} r="3.5" fill="#10b981" opacity="0.8" />

          {/* From line */}
          <text x={EMAIL.x + 18} y={EMAIL.y + 46} fill="#64748b" fontSize="11" style={{ fontFamily: 'monospace', letterSpacing: '0.08em' }}>
            От:
          </text>
          <text x={EMAIL.x + 48} y={EMAIL.y + 46} fill="#fca5a5" fontSize="12" style={{ fontFamily: 'monospace' }}>
            „DSK Bank Support" &lt;support@bamk-d5k.com&gt;
          </text>
          {/* To line */}
          <text x={EMAIL.x + 18} y={EMAIL.y + 64} fill="#64748b" fontSize="11" style={{ fontFamily: 'monospace', letterSpacing: '0.08em' }}>
            До:
          </text>
          <text x={EMAIL.x + 48} y={EMAIL.y + 64} fill="#94a3b8" fontSize="11" style={{ fontFamily: 'monospace' }}>
            you@company.bg
          </text>

          {/* Subject */}
          <text x={EMAIL.x + 18} y={EMAIL.y + 100} fill="#fecaca" fontSize="14" fontWeight="600">
            ⚠ СПЕШНО: Акаунтът ще бъде блокиран след 24 часа!
            <animate attributeName="fill-opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
          </text>

          {/* Body */}
          <text x={EMAIL.x + 18} y={EMAIL.y + 138} fill="#cbd5e1" fontSize="11.5">
            Уважаеми клиент,
          </text>
          <text x={EMAIL.x + 18} y={EMAIL.y + 158} fill="#94a3b8" fontSize="11.5">
            Засякохме необичайна активност във вашия акаунт.
          </text>
          <text x={EMAIL.x + 18} y={EMAIL.y + 178} fill="#94a3b8" fontSize="11.5">
            Моля, потвърдете самоличността си незабавно:
          </text>

          {/* Fake link */}
          <text x={EMAIL.x + 18} y={EMAIL.y + 212} fill="#60a5fa" fontSize="12"
            style={{ textDecoration: 'underline', fontFamily: 'monospace' }}>
            → http://bit.ly/bank-verify-xyz123
          </text>

          {/* Credentials request */}
          <text x={EMAIL.x + 18} y={EMAIL.y + 240} fill="#94a3b8" fontSize="11">
            За да продължите, въведете паролата и ПИН кода
          </text>
          <text x={EMAIL.x + 18} y={EMAIL.y + 256} fill="#94a3b8" fontSize="11">
            на този адрес до края на деня.
          </text>

          {/* Attachment pill */}
          <g transform={`translate(${EMAIL.x + 18} ${EMAIL.y + 280})`}>
            <rect x="0" y="0" width="180" height="24" rx="3" fill="#1e293b" stroke="#ef4444" strokeWidth="0.8" />
            <path d="M 8 6 L 8 18 L 16 18 L 16 10 L 12 6 Z M 12 6 L 12 10 L 16 10"
              fill="none" stroke="#94a3b8" strokeWidth="1" />
            <text x="24" y="16" fill="#fecaca" fontSize="11" style={{ fontFamily: 'monospace' }}>
              invoice.pdf.exe
            </text>
          </g>

          {/* Signature */}
          <text x={EMAIL.x + 18} y={EMAIL.y + 326} fill="#475569" fontSize="10" fontStyle="italic">
            DSK Bank Security Team
          </text>
        </g>

        {/* Red-flag indicators */}
        {flags.map(f => (
          <g key={f.id} style={{ animationDelay: `${f.delay}s` }}>
            {/* Callout line */}
            <line
              x1={f.ax} y1={f.ay} x2={f.lx} y2={f.ly}
              stroke="#ef4444" strokeWidth="0.7" strokeDasharray="3 3" opacity="0.55"
            >
              <animate attributeName="stroke-dashoffset" from="6" to="0" dur="1s" repeatCount="indefinite" />
            </line>

            {/* Anchor pulse */}
            <circle cx={f.ax} cy={f.ay} r="6" fill="none" stroke="#ef4444" strokeWidth="1.2">
              <animate attributeName="r" values="5;11;5" dur="2.4s" begin={`${f.delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.2;1" dur="2.4s" begin={`${f.delay}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={f.ax} cy={f.ay} r="2.5" fill="#ef4444">
              <animate attributeName="fill-opacity" values="0.7;1;0.7" dur="1.4s" begin={`${f.delay}s`} repeatCount="indefinite" />
            </circle>

            {/* Label pill */}
            <g>
              <rect
                x={f.lx - (f.lx > CX ? 0 : (f.label.length * 6.5 + 28))}
                y={f.ly - 12}
                width={f.label.length * 6.5 + 28}
                height="22"
                rx="11"
                fill="#0b1220"
                stroke="#ef4444"
                strokeWidth="0.8"
                opacity="0.9"
              />
              {/* Flag emoji-like icon */}
              <g transform={`translate(${f.lx - (f.lx > CX ? 0 : (f.label.length * 6.5 + 28)) + 14} ${f.ly - 1})`}>
                <path d="M 0 -6 L 0 8 M 0 -6 L 8 -4 L 4 -1 L 8 2 L 0 1"
                  fill="#ef4444" stroke="#ef4444" strokeWidth="0.8" strokeLinejoin="round" />
              </g>
              <text
                x={f.lx - (f.lx > CX ? 0 : (f.label.length * 6.5 + 28)) + 26}
                y={f.ly + 3}
                fill="#fecaca"
                fontSize="10.5"
                fontWeight="500"
              >
                {f.label}
              </text>
            </g>
          </g>
        ))}

        {/* Hook paths from channels to email (animated particles) */}
        {channelPositions.map((c, i) => (
          <g key={`hook-g-${c.id}`}>
            {/* faint thread */}
            <path
              d={`M ${c.x},${c.y} Q ${(c.x + CX) / 2 + (c.x > CX ? -30 : 30)},${(c.y + CY) / 2 - 40} ${CX},${CY}`}
              fill="none"
              stroke={c.color}
              strokeWidth="0.6"
              strokeDasharray="3 6"
              opacity="0.2"
            />
            {/* Hook particle with tail */}
            <circle r="3" fill={c.color} filter="url(#p-glow)" opacity="0">
              <animateMotion dur="5.5s" begin={`${i * 1.1}s`} repeatCount="indefinite">
                <mpath href={`#hook-${c.id}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;0.9;0.9;0"
                keyTimes="0;0.15;0.85;1"
                dur="5.5s"
                begin={`${i * 1.1}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* Channel nodes */}
        {channelPositions.map((c, i) => (
          <g key={c.id} transform={`translate(${c.x} ${c.y})`} style={{ color: c.color }}>
            {/* Pulse rings */}
            {[0, 1.3].map((d, k) => (
              <circle key={k} r="22" fill="none" stroke={c.color} strokeWidth="0.7" opacity="0">
                <animate attributeName="r" values="22;38" dur="2.8s" begin={`${(i * 0.35) + d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.45;0" dur="2.8s" begin={`${(i * 0.35) + d}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {/* Orbiting dot */}
            <circle r="1.6" fill={c.color} opacity="0.55">
              <animateMotion dur={`${4 + i * 0.4}s`} repeatCount="indefinite"
                path="M 22 0 A 22 22 0 1 1 21.99 0" />
            </circle>
            {/* Body */}
            <circle r="22" fill="#0b1220" stroke={c.color} strokeWidth="1.4" filter="url(#p-glow)">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur={`${2.8 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>
            {/* Glyph */}
            <g fill="none" stroke={c.color} strokeLinecap="round" strokeLinejoin="round">
              <ChannelGlyph kind={c.glyph} />
            </g>
            {/* Label */}
            <text y="42" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="600">
              {c.label}
            </text>
          </g>
        ))}

        {/* Small HUD: "Червени флагове: 5" */}
        <g transform="translate(30, 46)">
          <rect x="-4" y="-14" width="170" height="24" rx="3" fill="#0b1220" stroke="#ef4444" strokeWidth="0.8" opacity="0.9" />
          <circle cx="8" cy="-2" r="3" fill="#ef4444">
            <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
          </circle>
          <text x="20" y="2" fill="#fecaca" fontSize="11" fontWeight="600" style={{ letterSpacing: '0.15em' }}>
            5 ЧЕРВЕНИ ФЛАГА
          </text>
        </g>
      </svg>
    </div>
  )
}
