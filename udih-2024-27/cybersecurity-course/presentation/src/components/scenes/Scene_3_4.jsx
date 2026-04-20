// Scene 3.4 — Password management mistakes
// Hero visual: password-reuse cascade. Five linked accounts share the same
// password; when the leftmost service is breached, the compromise flows
// sequentially to every other account. Floating "don't do this" chips
// around the scene remind viewers of classic mistakes.

const CYCLE = 10 // total animation cycle in seconds

const accounts = [
  { id: 'shop',   label: 'Shop-XYZ',   sub: 'малък сайт',   icon: 'shop'   },
  { id: 'social', label: 'Social',     sub: 'Facebook',     icon: 'social' },
  { id: 'mail',   label: 'Gmail',      sub: 'личен имейл',  icon: 'mail'   },
  { id: 'work',   label: 'Работен',    sub: 'Office 365',   icon: 'work'   },
  { id: 'bank',   label: 'Банка',      sub: 'онлайн банкиране', icon: 'bank'   },
]

const CARD_Y = 280
const CARD_W = 128
const CARD_H = 150
const GAP = 30
const TOTAL_W = accounts.length * CARD_W + (accounts.length - 1) * GAP
const START_X = (900 - TOTAL_W) / 2

const accountPositions = accounts.map((a, i) => ({
  ...a,
  x: START_X + i * (CARD_W + GAP),
  // The i-th account gets breached at t = (1 + i*1.3) / CYCLE
  breachT: (1 + i * 1.3) / CYCLE,
}))

// Floating "mistake" chips drifting around
const mistakes = [
  { text: '✗ Лепяща бележка',    kind: 'h', topPct: 14, delay: 0,  dur: 30 },
  { text: '✗ Password123',       kind: 'v', leftPct: 86, delay: 6,  dur: 32 },
  { text: '✗ „Запомни ме"',      kind: 'h', topPct: 82, delay: 12, dur: 30 },
  { text: '✗ Споделяне на пароли', kind: 'v', leftPct: 6,  delay: 18, dur: 34 },
  { text: '✓ haveibeenpwned.com', kind: 'h', topPct: 6,  delay: 22, dur: 36, positive: true },
  { text: '✓ NIST: без принудителна смяна', kind: 'v', leftPct: 94, delay: 14, dur: 34, positive: true },
]

function AccountIcon({ kind, color }) {
  switch (kind) {
    case 'shop':
      return (
        <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -11 -4 L -9 -10 L 9 -10 L 11 -4" />
          <path d="M -13 -4 H 13 V 10 H -13 Z" />
          <circle cx="-5" cy="4" r="1.2" fill={color} stroke="none" />
          <circle cx="5" cy="4" r="1.2" fill={color} stroke="none" />
        </g>
      )
    case 'social':
      return (
        <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="0" cy="-4" r="5" />
          <path d="M -9 10 Q -9 2 0 2 Q 9 2 9 10" />
        </g>
      )
    case 'mail':
      return (
        <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="-12" y="-7" width="24" height="16" rx="1.5" />
          <path d="M -12 -7 L 0 3 L 12 -7" />
        </g>
      )
    case 'work':
      return (
        <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="-11" y="-8" width="22" height="18" />
          <line x1="-7" y1="-3" x2="7" y2="-3" />
          <line x1="-7" y1="2" x2="7" y2="2" />
          <line x1="-7" y1="7" x2="3" y2="7" />
        </g>
      )
    case 'bank':
      return (
        <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 0 -11 L 13 -4 H -13 Z" />
          <line x1="-11" y1="10" x2="11" y2="10" />
          <line x1="-8" y1="-4" x2="-8" y2="9" />
          <line x1="-2" y1="-4" x2="-2" y2="9" />
          <line x1="4" y1="-4" x2="4" y2="9" />
          <line x1="10" y1="-4" x2="10" y2="9" />
        </g>
      )
    default:
      return <circle r="8" fill={color} />
  }
}

export default function Scene_3_4() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Drifting mistake chips */}
      {mistakes.map((m, i) => {
        const color = m.positive ? 'rgba(110,231,183,0.8)' : 'rgba(252,165,165,0.7)'
        const border = m.positive ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'
        const base = {
          position: 'absolute',
          fontFamily: 'monospace',
          fontSize: '11px',
          letterSpacing: '0.12em',
          color,
          padding: '4px 10px',
          borderRadius: '999px',
          border: `1px solid ${border}`,
          background: 'rgba(15,23,42,0.55)',
          backdropFilter: 'blur(2px)',
          whiteSpace: 'nowrap',
          animationDelay: `${m.delay}s`,
          animationDuration: `${m.dur}s`,
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear',
          willChange: 'transform, opacity',
        }
        return (
          <div
            key={i}
            style={{
              ...base,
              ...(m.kind === 'h'
                ? { top: `${m.topPct}%`, left: '-160px', animationName: 'term-drift-h-full' }
                : { left: `${m.leftPct}%`, top: '-30px', animationName: 'term-drift-v-full' }),
            }}
          >
            {m.text}
          </div>
        )
      })}

      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="pm-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Section title */}
        <text x="50" y="100" fill="#fca5a5" fontSize="13" fontWeight="600" style={{ letterSpacing: '0.22em' }}>
          ЕДНА ПАРОЛА НАВСЯКЪДЕ · ВЕРИГНА РЕАКЦИЯ
        </text>
        <text x="50" y="120" fill="#64748b" fontSize="11">
          компрометиран един сайт = компрометирани всички
        </text>

        {/* Connection line running behind all cards */}
        <line
          x1={accountPositions[0].x + CARD_W / 2}
          x2={accountPositions[accountPositions.length - 1].x + CARD_W / 2}
          y1={CARD_Y}
          y2={CARD_Y}
          stroke="#334155"
          strokeWidth="1"
          strokeDasharray="3 6"
          opacity="0.4"
        />

        {/* Travelling "compromise" particles between cards */}
        {accountPositions.slice(0, -1).map((a, i) => {
          const next = accountPositions[i + 1]
          const ax = a.x + CARD_W / 2
          const nx = next.x + CARD_W / 2
          const beginT = a.breachT * CYCLE
          return (
            <g key={`cable-${i}`}>
              {/* Traveling red glow packet */}
              <circle r="4" fill="#ef4444" filter="url(#pm-glow)" opacity="0">
                <animate attributeName="cx"
                  values={`${ax};${nx}`}
                  keyTimes="0;1"
                  dur="1.3s"
                  begin={`${beginT}s;cycle.end+${beginT}s`} />
                <animate attributeName="cy" values={`${CARD_Y};${CARD_Y}`} dur="1.3s"
                  begin={`${beginT}s;cycle.end+${beginT}s`} />
                <animate attributeName="opacity"
                  values="0;0.95;0.95;0"
                  keyTimes="0;0.15;0.85;1"
                  dur="1.3s"
                  begin={`${beginT}s;cycle.end+${beginT}s`} />
              </circle>
              <circle r="8" fill="#ef4444" filter="url(#pm-glow)" opacity="0">
                <animate attributeName="cx" values={`${ax};${nx}`}
                  dur="1.3s" begin={`${beginT}s;cycle.end+${beginT}s`} />
                <animate attributeName="cy" values={`${CARD_Y};${CARD_Y}`} dur="1.3s"
                  begin={`${beginT}s;cycle.end+${beginT}s`} />
                <animate attributeName="opacity"
                  values="0;0.3;0.3;0"
                  keyTimes="0;0.15;0.85;1"
                  dur="1.3s"
                  begin={`${beginT}s;cycle.end+${beginT}s`} />
              </circle>
            </g>
          )
        })}

        {/* End-of-cycle marker — one timer drives everything */}
        <circle r="0.01" opacity="0">
          <animate id="cycle" attributeName="r" values="0.01" dur={`${CYCLE}s`} begin="0s;cycle.end" />
        </circle>

        {/* Account cards */}
        {accountPositions.map((a, i) => {
          const cx = a.x + CARD_W / 2
          const cy = CARD_Y
          const T = a.breachT
          return (
            <g key={a.id}>
              {/* OK state card (green) — visible from 0 until T */}
              <g>
                <rect
                  x={a.x} y={cy - CARD_H / 2}
                  width={CARD_W} height={CARD_H}
                  rx="8"
                  fill="#0b1220"
                  stroke="#10b981"
                  strokeWidth="1.2"
                >
                  <animate attributeName="stroke"
                    values="#10b981;#10b981;#ef4444;#ef4444;#10b981"
                    keyTimes={`0;${T};${T};0.96;1`}
                    dur={`${CYCLE}s`}
                    repeatCount="indefinite" />
                </rect>
                {/* Icon */}
                <g transform={`translate(${cx} ${cy - 38})`}>
                  <g>
                    <AccountIcon kind={a.icon} color="#10b981" />
                    <animate attributeName="stroke"
                      values="#10b981;#10b981;#ef4444;#ef4444;#10b981"
                      keyTimes={`0;${T};${T};0.96;1`}
                      dur={`${CYCLE}s`}
                      repeatCount="indefinite" />
                  </g>
                </g>

                {/* Site name */}
                <text x={cx} y={cy - 12} textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="600">
                  {a.label}
                </text>
                <text x={cx} y={cy + 2} textAnchor="middle" fill="#64748b" fontSize="10">
                  {a.sub}
                </text>

                {/* Password dots */}
                <g transform={`translate(${cx} ${cy + 22})`}>
                  {Array.from({ length: 8 }).map((_, k) => (
                    <circle
                      key={k}
                      cx={-28 + k * 8}
                      cy="0"
                      r="1.6"
                      fill="#94a3b8"
                    >
                      <animate attributeName="fill"
                        values="#94a3b8;#94a3b8;#ef4444;#ef4444;#94a3b8"
                        keyTimes={`0;${T};${T};0.96;1`}
                        dur={`${CYCLE}s`}
                        repeatCount="indefinite" />
                    </circle>
                  ))}
                </g>

                {/* Status pill */}
                <g transform={`translate(${cx} ${cy + 48})`}>
                  {/* OK state */}
                  <rect x="-26" y="-10" width="52" height="18" rx="9"
                    fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="0.8">
                    <animate attributeName="opacity"
                      values="1;1;0;0;1"
                      keyTimes={`0;${T};${T};0.96;1`}
                      dur={`${CYCLE}s`}
                      repeatCount="indefinite" />
                  </rect>
                  <text x="0" y="3" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="700"
                    style={{ letterSpacing: '0.15em' }}>
                    <animate attributeName="opacity"
                      values="1;1;0;0;1"
                      keyTimes={`0;${T};${T};0.96;1`}
                      dur={`${CYCLE}s`}
                      repeatCount="indefinite" />
                    OK
                  </text>
                  {/* Hacked state */}
                  <rect x="-40" y="-10" width="80" height="18" rx="9"
                    fill="rgba(239,68,68,0.18)" stroke="#ef4444" strokeWidth="0.8" opacity="0">
                    <animate attributeName="opacity"
                      values="0;0;1;1;0"
                      keyTimes={`0;${T};${T};0.96;1`}
                      dur={`${CYCLE}s`}
                      repeatCount="indefinite" />
                  </rect>
                  <text x="0" y="3" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="700"
                    style={{ letterSpacing: '0.15em' }} opacity="0">
                    <animate attributeName="opacity"
                      values="0;0;1;1;0"
                      keyTimes={`0;${T};${T};0.96;1`}
                      dur={`${CYCLE}s`}
                      repeatCount="indefinite" />
                    HACKED
                  </text>
                </g>
              </g>

              {/* Breach flash ring — fires at T */}
              <circle cx={cx} cy={cy} r="10" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0">
                <animate attributeName="r" values="10;70" dur="1.2s"
                  begin={`${T * CYCLE}s;cycle.end+${T * CYCLE}s`} />
                <animate attributeName="opacity" values="0.85;0" dur="1.2s"
                  begin={`${T * CYCLE}s;cycle.end+${T * CYCLE}s`} />
              </circle>
              {i === 0 && (
                <g>
                  {/* Initial breach marker above first card */}
                  <g transform={`translate(${cx} ${cy - CARD_H / 2 - 18})`}>
                    <rect x="-48" y="-10" width="96" height="18" rx="9" fill="#7f1d1d" stroke="#ef4444" strokeWidth="0.8" opacity="0">
                      <animate attributeName="opacity" values="0;0;1;1;0"
                        keyTimes={`0;${T};${T};0.96;1`}
                        dur={`${CYCLE}s`}
                        repeatCount="indefinite" />
                    </rect>
                    <text x="0" y="3" textAnchor="middle" fill="#fecaca" fontSize="10" fontWeight="700"
                      style={{ letterSpacing: '0.2em' }} opacity="0">
                      <animate attributeName="opacity" values="0;0;1;1;0"
                        keyTimes={`0;${T};${T};0.96;1`}
                        dur={`${CYCLE}s`}
                        repeatCount="indefinite" />
                      BREACH
                    </text>
                  </g>
                </g>
              )}
            </g>
          )
        })}

        {/* Bottom caption */}
        <text x="50" y="500" fill="#94a3b8" fontSize="12" fontWeight="500" style={{ letterSpacing: '0.2em' }}>
          УНИКАЛНА ПАРОЛА ЗА ВСЕКИ АКАУНТ · MFA ·
          <tspan fill="#6ee7b7"> haveibeenpwned.com</tspan>
        </text>
      </svg>
    </div>
  )
}
