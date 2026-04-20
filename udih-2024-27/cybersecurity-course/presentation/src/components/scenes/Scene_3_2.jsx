// Scene 3.2 — Multi-factor authentication
// Horizontal login flow through three authentication gates (know / have / are)
// with verification pulses at each checkpoint. Below the flow, a strength
// ladder compares four second-factor methods, from weakest (SMS) to strongest
// (Hardware key). Small orbiting particles + pulsing rings keep the eye busy.

const USER_X = 110
const VAULT_X = 820
const FLOW_Y = 200

const gates = [
  {
    id: 'know',
    label: 'Нещо което ЗНАЕШ',
    sub: 'парола',
    x: 290,
    color: '#3b82f6',
    glyph: 'key',
  },
  {
    id: 'have',
    label: 'Нещо което ИМАШ',
    sub: 'телефон · токен',
    x: 470,
    color: '#f59e0b',
    glyph: 'phone',
  },
  {
    id: 'are',
    label: 'Нещо което СИ',
    sub: 'пръст · лице',
    x: 650,
    color: '#10b981',
    glyph: 'fingerprint',
  },
]

// Ladder of second-factor strength (below the main flow)
const ladder = [
  { label: 'SMS код',       strength: 0.28, color: '#ef4444', note: 'слабо · SIM-swap' },
  { label: 'Email код',     strength: 0.42, color: '#f97316', note: 'средно' },
  { label: 'Authenticator', strength: 0.78, color: '#10b981', note: 'добро · TOTP' },
  { label: 'Hardware key',  strength: 0.97, color: '#34d399', note: 'най-добро · FIDO2' },
]

function GateGlyph({ kind, color }) {
  switch (kind) {
    case 'key':
      return (
        <g fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="-8" cy="0" r="6" />
          <line x1="-2" y1="0" x2="14" y2="0" />
          <line x1="8" y1="0" x2="8" y2="5" />
          <line x1="12" y1="0" x2="12" y2="4" />
        </g>
      )
    case 'phone':
      return (
        <g fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="-7" y="-12" width="14" height="24" rx="2" />
          <line x1="-7" y1="-8" x2="7" y2="-8" />
          <line x1="-7" y1="6" x2="7" y2="6" />
          <circle cx="0" cy="9" r="1.3" fill={color} stroke="none" />
          {/* OTP digits */}
          <text x="0" y="-1" textAnchor="middle" fill={color} fontSize="6" fontWeight="700" stroke="none">
            481 920
          </text>
        </g>
      )
    case 'fingerprint':
      return (
        <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round">
          <path d="M -10 6 Q -10 -6 0 -10 Q 10 -6 10 6" />
          <path d="M -7 6 Q -7 -4 0 -8 Q 7 -4 7 6" />
          <path d="M -4 6 Q -4 -2 0 -5 Q 4 -2 4 6" />
          <path d="M -1 6 Q -1 0 1 0" />
        </g>
      )
    default:
      return <circle r="8" fill={color} />
  }
}

export default function Scene_3_2() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="mfa-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="vault-ok">
            <stop offset="0%"   stopColor="#34d399" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
          </radialGradient>
          {/* Segment paths for flow particles */}
          <path id="seg-0" d={`M ${USER_X},${FLOW_Y} L ${gates[0].x},${FLOW_Y}`} />
          <path id="seg-1" d={`M ${gates[0].x},${FLOW_Y} L ${gates[1].x},${FLOW_Y}`} />
          <path id="seg-2" d={`M ${gates[1].x},${FLOW_Y} L ${gates[2].x},${FLOW_Y}`} />
          <path id="seg-3" d={`M ${gates[2].x},${FLOW_Y} L ${VAULT_X},${FLOW_Y}`} />
        </defs>

        {/* Section title */}
        <text x="50" y="84" fill="#94a3b8" fontSize="13" fontWeight="500" style={{ letterSpacing: '0.22em' }}>
          ТРИ ФАКТОРА НА АВТЕНТИКАЦИЯ
        </text>

        {/* --- Main flow axis --- */}
        {/* Axis line */}
        <line x1={USER_X} y1={FLOW_Y} x2={VAULT_X} y2={FLOW_Y} stroke="#1e293b" strokeWidth="1.2" strokeDasharray="4 8" opacity="0.55" />

        {/* User on the left */}
        <g transform={`translate(${USER_X} ${FLOW_Y})`}>
          {/* Pulse rings */}
          {[0, 1.3].map((d, i) => (
            <circle key={i} r="28" fill="none" stroke="#60a5fa" strokeWidth="0.6" opacity="0">
              <animate attributeName="r" values="26;42" dur="3s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="3s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <circle r="28" fill="#0b1220" stroke="#60a5fa" strokeWidth="1.5" filter="url(#mfa-glow)">
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.4s" repeatCount="indefinite" />
          </circle>
          {/* User icon (head + shoulders) */}
          <circle cy="-6" r="6" fill="none" stroke="#60a5fa" strokeWidth="1.4" />
          <path d="M -12 14 Q -12 4 0 4 Q 12 4 12 14" fill="none" stroke="#60a5fa" strokeWidth="1.4" />
          <text y="52" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="600">
            Потребител
          </text>
        </g>

        {/* Flow segments with travelling tokens */}
        {[0, 1, 2, 3].map(seg => {
          const color = seg === 0 ? '#60a5fa' : gates[seg - 1].color
          return (
            <g key={`token-${seg}`}>
              {/* Token */}
              <circle r="3" fill={color} filter="url(#mfa-glow)" opacity="0">
                <animateMotion
                  dur="1.1s"
                  begin={`${seg * 1.1}s;cycle.end+${seg * 1.1}s`}
                  id={`tok-${seg}`}
                >
                  <mpath href={`#seg-${seg}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.1;0.9;1"
                  dur="1.1s"
                  begin={`${seg * 1.1}s;cycle.end+${seg * 1.1}s`}
                />
              </circle>
              {/* Trailing glow */}
              <circle r="6" fill={color} opacity="0" filter="url(#mfa-glow)">
                <animateMotion
                  dur="1.1s"
                  begin={`${seg * 1.1}s;cycle.end+${seg * 1.1}s`}
                >
                  <mpath href={`#seg-${seg}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;0.4;0.4;0"
                  keyTimes="0;0.1;0.9;1"
                  dur="1.1s"
                  begin={`${seg * 1.1}s;cycle.end+${seg * 1.1}s`}
                />
              </circle>
            </g>
          )
        })}
        {/* End-of-cycle marker — triggers replay */}
        <circle r="0.01" opacity="0">
          <animate id="cycle" attributeName="r" values="0.01" dur="5.8s" begin="0s;cycle.end" />
        </circle>

        {/* Gates */}
        {gates.map((g, gi) => (
          <g key={g.id} transform={`translate(${g.x} ${FLOW_Y})`}>
            {/* Pulse ring */}
            {[0, 1.2].map((d, k) => (
              <circle key={k} r="34" fill="none" stroke={g.color} strokeWidth="0.7" opacity="0">
                <animate attributeName="r" values="32;52" dur="3s" begin={`${(gi * 0.35) + d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.45;0" dur="3s" begin={`${(gi * 0.35) + d}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {/* Orbit */}
            <circle r="38" fill="none" stroke={g.color} strokeWidth="0.5" strokeDasharray="3 6" opacity="0.3">
              <animateTransform attributeName="transform" type="rotate"
                from="0" to={gi % 2 === 0 ? 360 : -360}
                dur={`${12 + gi * 3}s`} repeatCount="indefinite" />
            </circle>
            {/* Orbiting dot */}
            <circle r="2" fill={g.color} opacity="0.7">
              <animateMotion dur={`${5 + gi * 0.8}s`} repeatCount="indefinite"
                path="M 32 0 A 32 32 0 1 1 31.99 0" />
            </circle>
            {/* Body — hexagon */}
            <polygon
              points="-30,0 -15,-26 15,-26 30,0 15,26 -15,26"
              fill="#0b1220" stroke={g.color} strokeWidth="1.6"
              filter="url(#mfa-glow)"
            >
              <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur={`${2.4 + gi * 0.3}s`} repeatCount="indefinite" />
            </polygon>
            {/* Glyph */}
            <GateGlyph kind={g.glyph} color={g.color} />
            {/* Verify checkmark — appears after token arrival */}
            <g transform="translate(28 -24)">
              <circle r="8" fill="#0b1220" stroke="#34d399" strokeWidth="1" opacity="0">
                <animate attributeName="opacity" values="0;0;1;1;0"
                  keyTimes="0;0.4;0.5;0.9;1"
                  dur="5.8s" begin={`${gi * 1.1 + 1.1}s;cycle.end+${gi * 1.1 + 1.1}s`} />
              </circle>
              <path d="M -3 0 L -1 3 L 4 -3" fill="none" stroke="#34d399" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0">
                <animate attributeName="opacity" values="0;0;1;1;0"
                  keyTimes="0;0.4;0.5;0.9;1"
                  dur="5.8s" begin={`${gi * 1.1 + 1.1}s;cycle.end+${gi * 1.1 + 1.1}s`} />
              </path>
            </g>
            {/* Labels */}
            <text y="52" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="600"
              style={{ letterSpacing: '0.05em' }}>
              {g.label}
            </text>
            <text y="68" textAnchor="middle" fill="#64748b" fontSize="10">
              {g.sub}
            </text>
          </g>
        ))}

        {/* Vault on the right */}
        <g transform={`translate(${VAULT_X} ${FLOW_Y})`}>
          <circle r="48" fill="url(#vault-ok)" />
          {/* Calm breathing */}
          {[0, 1.6].map((d, i) => (
            <circle key={i} r="30" fill="none" stroke="#34d399" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="28;52" dur="3.4s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="3.4s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <polygon
            points="-20,-26 20,-26 34,-10 34,10 20,26 -20,26 -34,10 -34,-10"
            fill="#0b1220" stroke="#34d399" strokeWidth="1.6" filter="url(#mfa-glow)"
          >
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.6s" repeatCount="indefinite" />
          </polygon>
          {/* Open-door door lock */}
          <rect x="-10" y="-4" width="20" height="14" rx="2" fill="#0b1220" stroke="#6ee7b7" strokeWidth="1.3" />
          <path d="M -6 -4 V -10 A 6 6 0 0 1 6 -10 V -4" fill="none" stroke="#6ee7b7" strokeWidth="1.3" strokeLinecap="round" />
          {/* Green dot */}
          <circle cx="0" cy="4" r="2" fill="#6ee7b7">
            <animate attributeName="fill-opacity" values="0.6;1;0.6" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <text y="52" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="700" style={{ letterSpacing: '0.22em' }}>
            ДОСТЪП
          </text>
        </g>

        {/* --- Ladder below --- */}
        <g transform="translate(50 340)">
          <text x="0" y="0" fill="#94a3b8" fontSize="12" fontWeight="500" style={{ letterSpacing: '0.22em' }}>
            СКАЛА ЗА ЗДРАВИНА НА ВТОРИЯ ФАКТОР
          </text>
          <text x="0" y="16" fill="#475569" fontSize="10.5">
            SMS &lt; Email &lt; Authenticator &lt; Hardware key
          </text>

          {/* Bars */}
          {ladder.map((l, i) => {
            const y = 44 + i * 36
            const w = 460 * l.strength
            return (
              <g key={l.label}>
                <text x="0" y={y + 4} fill="#e2e8f0" fontSize="12" fontWeight="600">
                  {l.label}
                </text>
                <rect x="170" y={y - 10} width="460" height="18" rx="3" fill="#020617" stroke="#1e293b" strokeWidth="0.6" />
                <rect x="170" y={y - 10} width="0" height="18" rx="3" fill={l.color} filter="url(#mfa-glow)">
                  <animate attributeName="width" from="0" to={w} dur="1.6s" begin={`${i * 0.4}s`} fill="freeze" />
                  <animate attributeName="opacity" values="0.85;1;0.85" dur={`${3 + i * 0.3}s`} begin={`${i * 0.4 + 1.6}s`} repeatCount="indefinite" />
                </rect>
                {/* Animated highlight bar */}
                <rect x="170" y={y - 10} width="14" height="18" fill="#ffffff" opacity="0.2">
                  <animate attributeName="x" from="170" to={170 + w - 14} dur={`${4 + i * 0.5}s`} repeatCount="indefinite" />
                </rect>
                {/* Percentage label */}
                <text x="640" y={y + 4} fill={l.color} fontSize="12" fontWeight="700"
                  style={{ fontFamily: 'ui-monospace, monospace' }}>
                  {Math.round(l.strength * 100)}%
                </text>
                <text x="686" y={y + 4} fill="#64748b" fontSize="10.5">
                  {l.note}
                </text>
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}
