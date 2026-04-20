// Scene 4.1 — Personal data types
// Central digital ID card belonging to a physical person — fields type in
// one by one, from the obvious identifiers (name, EGN) through digital
// traces (IP, cookies, location) to sensitive categories marked with a
// red "SENSITIVE" tag and extra protection glow.

const CARD_X = 240
const CARD_Y = 120
const CARD_W = 420
const CARD_H = 320

// Each field's reveal time in a 12s cycle
const fields = [
  { label: 'Име',           value: 'Иван Иванов',         delay: 0.6, cat: 'basic',    color: '#60a5fa' },
  { label: 'ЕГН',           value: '••••••• ••••',        delay: 1.6, cat: 'basic',    color: '#60a5fa' },
  { label: 'Адрес',         value: 'София, ул. ...',      delay: 2.6, cat: 'basic',    color: '#60a5fa' },
  { label: 'IP адрес',      value: '178.23.144.•••',      delay: 3.6, cat: 'digital',  color: '#a855f7' },
  { label: 'Cookies',       value: '_ga=GA1.2.••••',      delay: 4.6, cat: 'digital',  color: '#a855f7' },
  { label: 'Локация',       value: '42.6977° N, 23.3•••', delay: 5.6, cat: 'digital',  color: '#a855f7' },
  { label: 'Биометрия',     value: '••• отпечатък •••',   delay: 6.8, cat: 'sensitive', color: '#ef4444' },
  { label: 'Здравни данни', value: '••••••••••••',         delay: 7.8, cat: 'sensitive', color: '#ef4444' },
]

const CYCLE = 12

// Floating reminder chips
const chips = [
  { text: 'идентифицират ЛИЦЕ',   kind: 'h', topPct: 10, delay: 0,  dur: 32 },
  { text: '„Чувствителни" по GDPR', kind: 'v', leftPct: 90, delay: 5, dur: 34, warn: true },
  { text: 'клиенти · служители',  kind: 'h', topPct: 88, delay: 10, dur: 30 },
  { text: 'ВиК обработва всичко', kind: 'v', leftPct: 4,  delay: 16, dur: 36 },
]

export default function Scene_4_1() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Drifting chips */}
      {chips.map((c, i) => {
        const color = c.warn ? 'rgba(252,165,165,0.7)' : 'rgba(148,163,184,0.65)'
        const border = c.warn ? 'rgba(239,68,68,0.4)' : 'rgba(96,165,250,0.3)'
        const base = {
          position: 'absolute',
          fontFamily: 'monospace',
          fontSize: '11px',
          letterSpacing: '0.14em',
          color, padding: '4px 10px', borderRadius: '999px',
          border: `1px solid ${border}`,
          background: 'rgba(15,23,42,0.55)',
          backdropFilter: 'blur(2px)',
          whiteSpace: 'nowrap',
          animationDelay: `${c.delay}s`,
          animationDuration: `${c.dur}s`,
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear',
          willChange: 'transform, opacity',
        }
        return (
          <div
            key={i}
            style={{
              ...base,
              ...(c.kind === 'h'
                ? { top: `${c.topPct}%`, left: '-160px', animationName: 'term-drift-h-full' }
                : { left: `${c.leftPct}%`, top: '-30px', animationName: 'term-drift-v-full' }),
            }}
          >
            {c.text}
          </div>
        )
      })}

      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="pd-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="card-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"  stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>

        {/* Title */}
        <text x="50" y="84" fill="#94a3b8" fontSize="13" fontWeight="500" style={{ letterSpacing: '0.22em' }}>
          ЛИЧНИ ДАННИ · КАКВО Е ЛИЧНО?
        </text>
        <text x="50" y="104" fill="#475569" fontSize="11">
          всичко, което идентифицира конкретно физическо лице
        </text>

        {/* Card */}
        <rect
          x={CARD_X} y={CARD_Y}
          width={CARD_W} height={CARD_H}
          rx="10"
          fill="url(#card-bg)"
          stroke="#3b82f6"
          strokeWidth="1.4"
          filter="url(#pd-glow)"
        >
          <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.6s" repeatCount="indefinite" />
        </rect>

        {/* Card header stripe */}
        <rect x={CARD_X} y={CARD_Y} width={CARD_W} height="40" rx="10" fill="#1e3a8a" opacity="0.55" />
        <rect x={CARD_X} y={CARD_Y + 30} width={CARD_W} height="10" fill="#1e3a8a" opacity="0.55" />
        <text x={CARD_X + 20} y={CARD_Y + 27} fill="#bfdbfe" fontSize="11" fontWeight="700" style={{ letterSpacing: '0.28em' }}>
          ДИГИТАЛНА САМОЛИЧНОСТ
        </text>
        <text x={CARD_X + CARD_W - 20} y={CARD_Y + 27} textAnchor="end" fill="#93c5fd" fontSize="10" fontFamily="monospace">
          ID: •••••••••
        </text>

        {/* Person avatar on the left */}
        <g transform={`translate(${CARD_X + 70} ${CARD_Y + 150})`}>
          {/* Photo frame */}
          <rect x="-40" y="-50" width="80" height="100" rx="4"
            fill="#0b1220" stroke="#3b82f6" strokeWidth="1" />
          {/* Silhouette */}
          <circle cx="0" cy="-14" r="16" fill="#1e3a8a" opacity="0.75" />
          <path d="M -30 48 Q -30 18 0 18 Q 30 18 30 48" fill="#1e3a8a" opacity="0.75" />
          {/* Scanning line */}
          <line x1="-40" y1="-50" x2="40" y2="-50" stroke="#60a5fa" strokeWidth="1" opacity="0.7">
            <animate attributeName="y1" values="-50;50;-50" dur="3.6s" repeatCount="indefinite" />
            <animate attributeName="y2" values="-50;50;-50" dur="3.6s" repeatCount="indefinite" />
          </line>
          {/* Label */}
          <text y="68" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="600" style={{ letterSpacing: '0.15em' }}>
            СУБЕКТ НА ДАННИ
          </text>
        </g>

        {/* Right column: fields, revealed sequentially */}
        {fields.map((f, i) => {
          const fy = CARD_Y + 62 + i * 30
          const rx = CARD_X + 140
          const appearT = f.delay / CYCLE
          return (
            <g key={f.label}>
              {/* Row underline */}
              <line x1={rx} y1={fy + 4} x2={CARD_X + CARD_W - 20} y2={fy + 4}
                stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.45" />

              {/* Label (always visible) */}
              <text x={rx} y={fy} fill="#64748b" fontSize="9.5"
                style={{ letterSpacing: '0.2em' }}>
                {f.label.toUpperCase()}
              </text>

              {/* Value — fades in at its time */}
              <g>
                <text x={rx} y={fy + 18} fill={f.color} fontSize="13" fontWeight="600"
                  style={{ fontFamily: 'monospace' }} opacity="0">
                  <animate attributeName="opacity"
                    values="0;0;1;1;0"
                    keyTimes={`0;${Math.max(appearT - 0.02, 0)};${appearT};0.95;1`}
                    dur={`${CYCLE}s`} repeatCount="indefinite" />
                  {f.value}
                </text>

                {/* Cursor caret that types */}
                <rect x={rx - 2} y={fy + 8} width="2" height="14" fill={f.color} opacity="0">
                  <animate attributeName="opacity"
                    values="0;0;1;0"
                    keyTimes={`0;${Math.max(appearT - 0.03, 0)};${appearT};${appearT + 0.003}`}
                    dur={`${CYCLE}s`} repeatCount="indefinite" />
                </rect>
              </g>

              {/* Sensitive tag */}
              {f.cat === 'sensitive' && (
                <g>
                  <rect x={CARD_X + CARD_W - 74} y={fy + 4} width="60" height="14" rx="7"
                    fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth="0.6" opacity="0">
                    <animate attributeName="opacity"
                      values="0;0;1;1;0"
                      keyTimes={`0;${Math.max(appearT - 0.02, 0)};${appearT};0.95;1`}
                      dur={`${CYCLE}s`} repeatCount="indefinite" />
                  </rect>
                  <text x={CARD_X + CARD_W - 44} y={fy + 14} textAnchor="middle"
                    fill="#fca5a5" fontSize="8.5" fontWeight="700" style={{ letterSpacing: '0.15em' }} opacity="0">
                    <animate attributeName="opacity"
                      values="0;0;1;1;0"
                      keyTimes={`0;${Math.max(appearT - 0.02, 0)};${appearT};0.95;1`}
                      dur={`${CYCLE}s`} repeatCount="indefinite" />
                    SENSITIVE
                  </text>
                </g>
              )}

              {/* Category dot */}
              <circle cx={rx - 18} cy={fy + 2} r="2.2" fill={f.color}>
                <animate attributeName="fill-opacity"
                  values="0.2;0.2;1;1;0.2"
                  keyTimes={`0;${Math.max(appearT - 0.02, 0)};${appearT};0.95;1`}
                  dur={`${CYCLE}s`} repeatCount="indefinite" />
              </circle>
            </g>
          )
        })}

        {/* Bottom categories legend */}
        <g transform="translate(240 470)">
          <rect x="0" y="0" width="10" height="10" rx="2" fill="#60a5fa" />
          <text x="16" y="9" fill="#cbd5e1" fontSize="11">основни</text>
          <rect x="92" y="0" width="10" height="10" rx="2" fill="#a855f7" />
          <text x="108" y="9" fill="#cbd5e1" fontSize="11">дигитални</text>
          <rect x="204" y="0" width="10" height="10" rx="2" fill="#ef4444" />
          <text x="220" y="9" fill="#cbd5e1" fontSize="11">чувствителни · засилена GDPR защита</text>
        </g>

        {/* Orbital data-category badges around the card */}
        {[
          { label: 'име',       color: '#60a5fa', angle: -100, r: 260 },
          { label: 'ЕГН',       color: '#60a5fa', angle:  -75, r: 260 },
          { label: 'адрес',     color: '#60a5fa', angle:  -50, r: 260 },
          { label: 'IP',        color: '#a855f7', angle:  -25, r: 260 },
          { label: 'cookies',   color: '#a855f7', angle:    0, r: 260 },
          { label: 'локация',   color: '#a855f7', angle:   25, r: 260 },
          { label: 'биометрия', color: '#ef4444', angle:   50, r: 260 },
          { label: 'здраве',    color: '#ef4444', angle:   75, r: 260 },
          { label: 'политика',  color: '#ef4444', angle:  100, r: 260 },
        ].map((b, i) => {
          const rad = (b.angle * Math.PI) / 180
          const x = 450 + b.r * Math.cos(rad) * 1.5
          const y = CARD_Y + CARD_H / 2 + b.r * Math.sin(rad) * 0.7
          return (
            <g key={i} opacity="0.42">
              <rect x={x - 28} y={y - 8} width="56" height="16" rx="8"
                fill="rgba(15,23,42,0.7)" stroke={b.color} strokeWidth="0.6">
                <animate attributeName="opacity" values="0.35;0.75;0.35"
                  dur={`${3 + (i % 4) * 0.5}s`}
                  begin={`${i * 0.3}s`} repeatCount="indefinite" />
              </rect>
              <text x={x} y={y + 3} textAnchor="middle" fill={b.color}
                fontSize="9.5" fontWeight="600" style={{ letterSpacing: '0.08em' }}>
                {b.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
