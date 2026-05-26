// Scene 6.11 — Кибертормоз, тролинг
// Pattern: hub & orbit — central troll-flame as the source of hostility,
// guarded by a slow rotating shield ring; four defensive action badges orbit
// it (снимка, блокирай, докладвай, не хранете). Small red "!" sparks fly in
// from the edges and fade at the shield, visualising the attacks landing on
// the user's defences.

const CX = 450
const CY = 300
const R = 210

const badges = [
  { id: 'shot',   label: 'Снимка',     sub: 'на екрана',        color: '#22d3ee', angle: -135 },
  { id: 'block',  label: 'Блокирай',   sub: 'не вижда, не пише', color: '#ef4444', angle: -45  },
  { id: 'report', label: 'Докладвай',  sub: 'към мрежата',      color: '#f59e0b', angle: 45   },
  { id: 'noFeed', label: 'Не хранете', sub: 'без реакция',      color: '#10b981', angle: 135  },
].map((b) => {
  const rad = (b.angle * Math.PI) / 180
  return { ...b, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

// Angry sparks drifting toward the troll, fading near the shield ring.
const SHIELD_R = 118
const sparks = [
  { fromX: 90,  fromY: 70,  text: '!!!', dur: 6.5, begin: 0.0 },
  { fromX: 820, fromY: 90,  text: '?!',  dur: 7.5, begin: 1.6 },
  { fromX: 130, fromY: 510, text: 'X',   dur: 8.0, begin: 3.2 },
  { fromX: 810, fromY: 470, text: '!',   dur: 6.8, begin: 4.4 },
]

function endOnShield(fromX, fromY) {
  const dx = CX - fromX
  const dy = CY - fromY
  const len = Math.sqrt(dx * dx + dy * dy)
  return {
    x: CX - (dx / len) * SHIELD_R,
    y: CY - (dy / len) * SHIELD_R,
  }
}

export default function Scene_6_11() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s611-flame">
            <stop offset="0%"   stopColor="#fde68a" stopOpacity="0.85" />
            <stop offset="40%"  stopColor="#f59e0b" stopOpacity="0.55" />
            <stop offset="80%"  stopColor="#ef4444" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s611-halo">
            <stop offset="0%"   stopColor="#ef4444" stopOpacity="0.16" />
            <stop offset="70%"  stopColor="#7f1d1d" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
          </radialGradient>
          <filter id="s611-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient halo */}
        <circle cx={CX} cy={CY} r="290" fill="url(#s611-halo)" />

        {/* Slow rotating outer ring */}
        <ellipse
          cx={CX} cy={CY} rx="340" ry="230" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 11"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="62s" repeatCount="indefinite"
          />
        </ellipse>

        {/* Shield ring around the troll — the defensive boundary */}
        <circle
          cx={CX} cy={CY} r={SHIELD_R} fill="none"
          stroke="#3b82f6" strokeWidth="1.4" strokeDasharray="2 7"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.4;0.95;0.4" dur="4.2s" repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`-360 ${CX} ${CY}`}
            dur="44s" repeatCount="indefinite"
          />
        </circle>
        <circle
          cx={CX} cy={CY} r={SHIELD_R + 8} fill="none"
          stroke="#1e3a8a" strokeWidth="0.8" opacity="0.6"
        />

        {/* Incoming angry sparks — fly to the shield then fade */}
        {sparks.map((s, i) => {
          const end = endOnShield(s.fromX, s.fromY)
          return (
            <g key={`sp-${i}`} opacity="0">
              <circle r="14" fill="#0b1220"
                stroke="#ef4444" strokeWidth="1.4" />
              <text x="0" y="4" textAnchor="middle"
                fill="#f87171" fontSize="13" fontWeight="800"
                style={{ fontFamily: 'monospace' }}>
                {s.text}
              </text>
              <animate
                attributeName="opacity"
                values="0;0.95;0.95;0"
                keyTimes="0;0.18;0.78;1"
                dur={`${s.dur}s`} begin={`${s.begin}s`}
                repeatCount="indefinite"
              />
              <animateMotion
                dur={`${s.dur}s`} begin={`${s.begin}s`}
                repeatCount="indefinite"
                path={`M ${s.fromX} ${s.fromY} L ${end.x} ${end.y}`}
              />
            </g>
          )
        })}

        {/* Central troll-flame */}
        <g transform={`translate(${CX} ${CY})`}>
          {/* Soft outer flame glow */}
          <circle r="92" fill="url(#s611-flame)" filter="url(#s611-glow)">
            <animate
              attributeName="r" values="88;94;88"
              dur="3.4s" repeatCount="indefinite"
            />
          </circle>

          {/* Flame body — morphs subtly */}
          <path
            d="M 0 -60 Q 28 -28 30 4 Q 28 38 0 56 Q -28 38 -30 4 Q -28 -28 0 -60 Z"
            fill="#ef4444" opacity="0.38" filter="url(#s611-glow)"
          >
            <animate
              attributeName="d"
              values="
                M 0 -60 Q 28 -28 30 4 Q 28 38 0 56 Q -28 38 -30 4 Q -28 -28 0 -60 Z;
                M 0 -64 Q 32 -30 27 6 Q 30 36 0 58 Q -30 36 -27 6 Q -32 -30 0 -64 Z;
                M 0 -60 Q 28 -28 30 4 Q 28 38 0 56 Q -28 38 -30 4 Q -28 -28 0 -60 Z
              "
              dur="3.8s" repeatCount="indefinite"
            />
          </path>

          {/* Troll face — angry */}
          <g>
            {/* eye whites */}
            <ellipse cx="-11" cy="-4" rx="6" ry="7" fill="#0b1220" />
            <ellipse cx="11" cy="-4" rx="6" ry="7" fill="#0b1220" />
            {/* glowing pupils */}
            <circle cx="-11" cy="-3" r="2" fill="#fbbf24">
              <animate attributeName="opacity"
                values="0.5;1;0.5" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="11" cy="-3" r="2" fill="#fbbf24">
              <animate attributeName="opacity"
                values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" />
            </circle>
            {/* angry brows */}
            <line x1="-20" y1="-15" x2="-4" y2="-9"
              stroke="#0b1220" strokeWidth="2.6" strokeLinecap="round" />
            <line x1="20" y1="-15" x2="4" y2="-9"
              stroke="#0b1220" strokeWidth="2.6" strokeLinecap="round" />
            {/* scowl mouth */}
            <path d="M -14 20 Q 0 10 14 20"
              fill="none" stroke="#0b1220"
              strokeWidth="2.8" strokeLinecap="round" />
            {/* fangs */}
            <path d="M -7 16 L -5 22 L -3 16 Z" fill="#0b1220" />
            <path d="M 7 16 L 5 22 L 3 16 Z" fill="#0b1220" />
          </g>
        </g>

        {/* Defensive aim lines — badge → shield, dashed flow inward */}
        {badges.map((b, i) => {
          const dx = CX - b.x
          const dy = CY - b.y
          const len = Math.sqrt(dx * dx + dy * dy)
          const tx = b.x + (dx / len) * (len - SHIELD_R - 6)
          const ty = b.y + (dy / len) * (len - SHIELD_R - 6)
          return (
            <g key={`aim-${b.id}`}>
              <line
                x1={b.x} y1={b.y} x2={tx} y2={ty}
                stroke={b.color} strokeOpacity="0.5" strokeWidth="1"
                strokeDasharray="4 6"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="10" to="0"
                  dur="2s" repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  values="0.25;0.7;0.25"
                  dur="3.4s" begin={`${i * 0.6}s`} repeatCount="indefinite"
                />
              </line>
            </g>
          )
        })}

        {/* Defensive badges */}
        {badges.map((b, i) => (
          <g key={b.id} transform={`translate(${b.x} ${b.y})`}>
            {[0, 1.6].map((d, k) => (
              <circle
                key={k} r="42" fill="none"
                stroke={b.color} strokeWidth="1" opacity="0"
              >
                <animate attributeName="r" values="42;66" dur="3.8s"
                  begin={`${i * 0.55 + d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0" dur="3.8s"
                  begin={`${i * 0.55 + d}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <circle r="42" fill="#0b1220" stroke={b.color} strokeWidth="2"
              filter="url(#s611-glow)" />
            <g transform="translate(0 -6)">
              <BadgeIcon id={b.id} color={b.color} />
            </g>
            <text x="0" y="22" textAnchor="middle"
              fill="#e2e8f0" fontSize="12.5" fontWeight="700">
              {b.label}
            </text>
            <text x="0" y="36" textAnchor="middle"
              fill="#94a3b8" fontSize="10" fontWeight="500">
              {b.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ---------- icons (drawn around 0,0) ----------

function BadgeIcon({ id, color }) {
  switch (id) {
    case 'shot':   return <CamIcon color={color} />
    case 'block':  return <BlockIcon color={color} />
    case 'report': return <FlagIcon color={color} />
    case 'noFeed': return <NoReplyIcon color={color} />
    default: return null
  }
}

function CamIcon({ color }) {
  return (
    <g>
      <rect x="-11" y="-7" width="18" height="14" rx="2.4"
        fill="none" stroke={color} strokeWidth="1.6" />
      <path d="M 7 -3 L 13 -7 L 13 7 L 7 3 Z"
        fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <circle r="2.4" cx="-3" cy="0" fill="none"
        stroke={color} strokeWidth="1.2" />
      <circle r="1" cx="-3" cy="0" fill={color}>
        <animate attributeName="opacity"
          values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </g>
  )
}

function BlockIcon({ color }) {
  return (
    <g>
      <circle r="11" fill="none" stroke={color} strokeWidth="2" />
      <line x1="-7.8" y1="-7.8" x2="7.8" y2="7.8"
        stroke={color} strokeWidth="2.4" strokeLinecap="round">
        <animate attributeName="stroke-opacity"
          values="0.55;1;0.55" dur="2.6s" repeatCount="indefinite" />
      </line>
    </g>
  )
}

function FlagIcon({ color }) {
  return (
    <g>
      <line x1="-7" y1="-12" x2="-7" y2="12"
        stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M -7 -10 L 9 -7 L 5 -2 L 10 4 L -7 1 Z"
        fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round">
        <animate attributeName="stroke-opacity"
          values="0.6;1;0.6" dur="2.8s" repeatCount="indefinite" />
      </path>
    </g>
  )
}

function NoReplyIcon({ color }) {
  // speech bubble with diagonal slash — "don't reply / don't feed"
  return (
    <g>
      <path
        d="M -11 -8 L 9 -8 Q 12 -8 12 -5 L 12 3 Q 12 6 9 6 L -3 6 L -8 11 L -7 6 L -11 6 Q -11 6 -11 3 L -11 -5 Q -11 -8 -11 -8 Z"
        fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"
      />
      <line x1="-13" y1="-12" x2="13" y2="12"
        stroke={color} strokeWidth="2.2" strokeLinecap="round">
        <animate attributeName="stroke-opacity"
          values="0.55;1;0.55" dur="2.6s" repeatCount="indefinite" />
      </line>
    </g>
  )
}
