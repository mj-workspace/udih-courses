// Scene 2.3 — Social engineering: manipulating people, not technology.
// Central human head + brain with four exploited regions, each pulled by
// one manipulation tactic from the corners. Red-flag bubbles of the
// psychological levers (authority, urgency, fear, curiosity, ...) drift
// around the scene continuously.

const CX = 450
const CY = 290

const tactics = [
  {
    id: 'pretexting',
    label: 'Pretexting',
    desc: '„Обаждам се от IT..."',
    color: '#f59e0b',
    // Corner position
    x: 150, y: 130,
    // Brain anchor (roughly where tactic "pulls" the brain)
    bx: CX - 22, by: CY - 18,
    glyph: 'mask',
  },
  {
    id: 'baiting',
    label: 'Baiting',
    desc: 'Безплатен USB / оферта',
    color: '#ec4899',
    x: 750, y: 130,
    bx: CX + 22, by: CY - 18,
    glyph: 'usb',
  },
  {
    id: 'quid',
    label: 'Quid pro quo',
    desc: '„Ще ти помогна срещу..."',
    color: '#06b6d4',
    x: 750, y: 450,
    bx: CX + 22, by: CY + 18,
    glyph: 'wrench',
  },
  {
    id: 'tailgate',
    label: 'Tailgating / BEC',
    desc: 'Влизане след служител',
    color: '#8b5cf6',
    x: 150, y: 450,
    bx: CX - 22, by: CY + 18,
    glyph: 'door',
  },
]

// Psychological red-flag bubbles drifting in the periphery
const bubbles = [
  { text: 'Авторитет',     kind: 'h', topPct: 16, delay: 0,  dur: 30 },
  { text: 'Спешност',      kind: 'v', leftPct: 18, delay: 5,  dur: 28 },
  { text: 'Страх',         kind: 'h', topPct: 82, delay: 10, dur: 32 },
  { text: 'Любопитство',   kind: 'v', leftPct: 82, delay: 15, dur: 30 },
  { text: 'Доверие',       kind: 'h', topPct: 8,  delay: 20, dur: 34 },
  { text: 'Поверителност', kind: 'v', leftPct: 4,  delay: 8,  dur: 36 },
  { text: 'Gift cards · Крипто', kind: 'h', topPct: 70, delay: 24, dur: 30 },
]

function TacticGlyph({ kind, color }) {
  switch (kind) {
    case 'mask':
      // Theatrical drama mask (pretexting = pretending)
      return (
        <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -11 -6 Q -11 -10 -6 -10 L 6 -10 Q 11 -10 11 -6 L 11 4 Q 11 12 0 12 Q -11 12 -11 4 Z" />
          <path d="M -6 -3 Q -4 -5 -2 -3" />
          <path d="M 2 -3 Q 4 -5 6 -3" />
          <path d="M -3 5 Q 0 7 3 5" />
        </g>
      )
    case 'usb':
      return (
        <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round">
          {/* USB body */}
          <rect x="-6" y="-11" width="12" height="18" rx="1.5" />
          {/* USB head */}
          <rect x="-3" y="-14" width="6" height="3" />
          {/* Connectors */}
          <rect x="-3" y="-4" width="2" height="3" fill={color} stroke="none" />
          <rect x="1" y="-4" width="2" height="3" fill={color} stroke="none" />
          {/* Trident icon */}
          <line x1="0" y1="-11" x2="0" y2="-7" />
          <circle cx="0" cy="-7" r="0.8" fill={color} stroke="none" />
        </g>
      )
    case 'wrench':
      return (
        <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -10 10 L 2 -2" />
          <circle cx="-8" cy="8" r="3" />
          <path d="M 6 -6 A 6 6 0 1 1 -2 -2 L 2 2 L 10 -6 L 6 -10 Z" />
        </g>
      )
    case 'door':
      return (
        <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="-9" y="-11" width="12" height="22" />
          <circle cx="0" cy="0" r="1.2" fill={color} stroke="none" />
          <line x1="3" y1="-2" x2="8" y2="-2" />
          <path d="M 5 -5 L 8 -2 L 5 1" />
        </g>
      )
    default:
      return <circle r="8" fill={color} />
  }
}

export default function Scene_2_3() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Drifting lever-bubbles (DOM) */}
      {bubbles.map((b, i) => {
        const base = {
          position: 'absolute',
          fontFamily: 'monospace',
          fontSize: '11px',
          letterSpacing: '0.14em',
          color: 'rgba(252,165,165,0.65)',
          padding: '4px 10px',
          borderRadius: '999px',
          border: '1px solid rgba(239,68,68,0.35)',
          background: 'rgba(15,23,42,0.55)',
          backdropFilter: 'blur(2px)',
          whiteSpace: 'nowrap',
          animationDelay: `${b.delay}s`,
          animationDuration: `${b.dur}s`,
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear',
          willChange: 'transform, opacity',
        }
        return (
          <div
            key={i}
            style={{
              ...base,
              ...(b.kind === 'h'
                ? { top: `${b.topPct}%`, left: '-160px', animationName: 'term-drift-h-full' }
                : { left: `${b.leftPct}%`, top: '-30px', animationName: 'term-drift-v-full' }),
            }}
          >
            ⚑ {b.text}
          </div>
        )
      })}

      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="se-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="brain-grad">
            <stop offset="0%"   stopColor="#fb7185" stopOpacity="0.55" />
            <stop offset="65%"  stopColor="#be123c" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#be123c" stopOpacity="0" />
          </radialGradient>
          {tactics.map(t => (
            <path
              key={`str-${t.id}`}
              id={`str-${t.id}`}
              d={`M ${t.x},${t.y} Q ${(t.x + t.bx) / 2},${(t.y + t.by) / 2 - 30} ${t.bx},${t.by}`}
            />
          ))}
        </defs>

        {/* Decorative rings around head */}
        <circle cx={CX} cy={CY} r="130" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3 8" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur="50s" repeatCount="indefinite" />
        </circle>
        <circle cx={CX} cy={CY} r="148" fill="none" stroke="#334155" strokeWidth="0.3" strokeDasharray="1 14" opacity="0.35">
          <animateTransform attributeName="transform" type="rotate" from={`360 ${CX} ${CY}`} to={`0 ${CX} ${CY}`} dur="68s" repeatCount="indefinite" />
        </circle>

        {/* Manipulation strings from tactics to brain */}
        {tactics.map((t, i) => (
          <g key={`str-g-${t.id}`}>
            <path
              d={`M ${t.x},${t.y} Q ${(t.x + t.bx) / 2},${(t.y + t.by) / 2 - 30} ${t.bx},${t.by}`}
              fill="none"
              stroke={t.color}
              strokeWidth="0.9"
              strokeDasharray="4 6"
              opacity="0.5"
            >
              <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.25;0.7;0.25" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
            </path>
            {/* Traveling influence packet */}
            <circle r="3.5" fill={t.color} filter="url(#se-glow)" opacity="0">
              <animateMotion dur={`${4.2 + i * 0.5}s`} begin={`${i * 0.9}s`} repeatCount="indefinite">
                <mpath href={`#str-${t.id}`} />
              </animateMotion>
              <animate attributeName="opacity"
                values="0;0.9;0.9;0" keyTimes="0;0.2;0.8;1"
                dur={`${4.2 + i * 0.5}s`} begin={`${i * 0.9}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Brain + head */}
        <g transform={`translate(${CX} ${CY})`}>
          {/* Outer head silhouette — side profile */}
          <path
            d="M -72 20 Q -78 -30 -40 -60 Q -20 -82 20 -78 Q 60 -74 68 -40 Q 76 -10 60 30 Q 58 46 42 54 Q 30 62 14 60 Q 10 74 -10 72 Q -26 70 -34 58 Q -58 52 -68 38 Z"
            fill="#0b1220"
            stroke="#475569"
            strokeWidth="1.4"
            opacity="0.95"
          />

          {/* Brain shape — double hemisphere */}
          <g>
            <path
              d="M -44 -18 Q -54 -26 -46 -38 Q -48 -52 -32 -54 Q -28 -64 -12 -60 Q 0 -66 12 -60 Q 28 -64 32 -54 Q 48 -52 46 -38 Q 54 -26 44 -18 Q 52 -8 44 2 Q 48 14 32 18 Q 22 26 8 22 Q 0 30 -8 22 Q -22 26 -32 18 Q -48 14 -44 2 Q -52 -8 -44 -18 Z"
              fill="url(#brain-grad)"
              stroke="#fca5a5"
              strokeWidth="1.2"
              opacity="0.75"
            />
            {/* Central sulcus */}
            <path d="M 0 -60 Q 2 -30 -2 0 Q 0 14 2 22" fill="none" stroke="#fca5a5" strokeWidth="0.9" opacity="0.55" />
            {/* Gyri curves */}
            <path d="M -30 -48 Q -20 -40 -28 -32 Q -18 -28 -26 -18" fill="none" stroke="#fca5a5" strokeWidth="0.6" opacity="0.35" />
            <path d="M 30 -48 Q 20 -40 28 -32 Q 18 -28 26 -18" fill="none" stroke="#fca5a5" strokeWidth="0.6" opacity="0.35" />
            <path d="M -24 4 Q -16 -2 -24 -8" fill="none" stroke="#fca5a5" strokeWidth="0.6" opacity="0.3" />
            <path d="M 24 4 Q 16 -2 24 -8" fill="none" stroke="#fca5a5" strokeWidth="0.6" opacity="0.3" />
          </g>

          {/* Exploited-region flashes (one per tactic brain anchor, relative to centre) */}
          {tactics.map((t, i) => {
            const ex = t.bx - CX
            const ey = t.by - CY
            return (
              <g key={`region-${t.id}`}>
                <circle cx={ex} cy={ey} r="6" fill={t.color} opacity="0.8">
                  <animate attributeName="opacity"
                    values="0.3;1;0.3" dur={`${2.4 + i * 0.25}s`}
                    begin={`${i * 0.4}s`} repeatCount="indefinite" />
                  <animate attributeName="r" values="5;7.5;5"
                    dur={`${2.4 + i * 0.25}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={ex} cy={ey} r="10" fill="none" stroke={t.color} strokeWidth="0.8" opacity="0">
                  <animate attributeName="r" values="6;18" dur="2.8s"
                    begin={`${i * 0.4}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0" dur="2.8s"
                    begin={`${i * 0.4}s`} repeatCount="indefinite" />
                </circle>
              </g>
            )
          })}

          {/* Eye (on profile) */}
          <circle cx="24" cy="-10" r="2.5" fill="#0b1220" stroke="#94a3b8" strokeWidth="0.8" />
          <circle cx="24" cy="-10" r="1.2" fill="#94a3b8">
            <animate attributeName="cx" values="22;26;22" dur="5s" repeatCount="indefinite" />
          </circle>

          {/* Label under head */}
          <text y="110" textAnchor="middle" fill="#94a3b8" fontSize="11" style={{ letterSpacing: '0.25em' }}>
            ЧОВЕКЪТ — НАЙ-СЛАБОТО ЗВЕНО
          </text>
        </g>

        {/* Tactic nodes */}
        {tactics.map((t, i) => (
          <g key={t.id} transform={`translate(${t.x} ${t.y})`}>
            {/* Pulse */}
            {[0, 1.4].map((d, k) => (
              <circle key={k} r="30" fill="none" stroke={t.color} strokeWidth="0.7" opacity="0">
                <animate attributeName="r" values="28;48" dur="3.2s" begin={`${(i * 0.35) + d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0" dur="3.2s" begin={`${(i * 0.35) + d}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {/* Orbiting dot */}
            <circle r="1.6" fill={t.color} opacity="0.55">
              <animateMotion dur={`${4.5 + i * 0.6}s`} repeatCount="indefinite"
                path="M 28 0 A 28 28 0 1 1 27.99 0" />
            </circle>
            {/* Body */}
            <circle r="28" fill="#0b1220" stroke={t.color} strokeWidth="1.5" filter="url(#se-glow)">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            {/* Glyph */}
            <TacticGlyph kind={t.glyph} color={t.color} />
            {/* Label */}
            <text y="50" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="600">
              {t.label}
            </text>
            <text y="66" textAnchor="middle" fill="#64748b" fontSize="10">
              {t.desc}
            </text>
          </g>
        ))}

        {/* Small HUD: "98% от атаките = social engineering" */}
        <g transform="translate(30, 46)">
          <rect x="-4" y="-14" width="210" height="24" rx="3" fill="#0b1220" stroke="#fb7185" strokeWidth="0.8" opacity="0.9" />
          <text x="8" y="3" fill="#fecaca" fontSize="11" fontWeight="600" style={{ letterSpacing: '0.14em' }}>
            98% ОТ АТАКИТЕ · ЧОВЕШКИ ФАКТОР
          </text>
        </g>
      </svg>
    </div>
  )
}
