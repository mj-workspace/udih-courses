// Scene 6.10 — Разпознаване на измами
// Pattern: hub & orbit (inverted) — three threats orbit a central PAUSE shield.
// Each threat (фалшив профил / измамна схема / фалшива новина) fires a red
// "urgent" packet at the centre; the green shield absorbs them. The guide's
// universal cure — pausing — is the visual anchor.

const CX = 450
const CY = 295
const R = 200

const threats = [
  {
    id: 'profile',
    label: 'Фалшив профил',
    sub: 'измислен или клониран',
    color: '#f87171',
    angle: -90,
  },
  {
    id: 'scheme',
    label: 'Измамна схема',
    sub: '„печалба" / „в беда съм"',
    color: '#f59e0b',
    angle: 30,
  },
  {
    id: 'news',
    label: 'Фалшива новина',
    sub: 'крещящо заглавие',
    color: '#a78bfa',
    angle: 150,
  },
].map((t) => {
  const rad = (t.angle * Math.PI) / 180
  return { ...t, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

export default function Scene_6_10() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s610-shield-grad">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#065f46" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#065f46" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s610-threat-halo">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
          </radialGradient>
          <filter id="s610-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="s610-soft-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ============================================================ */}
        {/* Ambient                                                       */}
        {/* ============================================================ */}
        <circle cx={CX} cy={CY} r="280" fill="url(#s610-shield-grad)" />

        <ellipse
          cx={CX} cy={CY} rx="340" ry="240" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 11"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="58s" repeatCount="indefinite"
          />
        </ellipse>

        {/* ============================================================ */}
        {/* Threat → centre connections + travelling "urgent" packets     */}
        {/* ============================================================ */}
        {threats.map((t, i) => {
          // start a bit outside the threat badge, end at the shield edge
          const dx = CX - t.x
          const dy = CY - t.y
          const len = Math.hypot(dx, dy)
          const ux = dx / len
          const uy = dy / len
          const x1 = t.x + ux * 50   // leave the badge edge (badge r ≈ 44)
          const y1 = t.y + uy * 50
          const x2 = CX - ux * 70    // stop at the shield outer ring (≈ 70)
          const y2 = CY - uy * 70
          return (
            <g key={`link-${t.id}`}>
              <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={t.color} strokeOpacity="0.35" strokeWidth="1"
                strokeDasharray="4 6"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="10" to="0" dur="1.6s" repeatCount="indefinite"
                />
              </line>
              {/* travelling "urgent" packet — red dot that fades as it hits the shield */}
              <g>
                <circle r="4" fill="#ef4444" filter="url(#s610-glow)">
                  <animateMotion
                    dur={`${3.8 + i * 0.5}s`} repeatCount="indefinite"
                    path={`M ${x1} ${y1} L ${x2} ${y2}`}
                  />
                  <animate
                    attributeName="opacity"
                    values="1;1;0.2;0"
                    keyTimes="0;0.7;0.9;1"
                    dur={`${3.8 + i * 0.5}s`} repeatCount="indefinite"
                  />
                </circle>
              </g>
            </g>
          )
        })}

        {/* ============================================================ */}
        {/* Central PAUSE shield                                          */}
        {/* ============================================================ */}
        <g>
          {/* outer absorbing ripples — green, expanding outward */}
          {[0, 1.3, 2.6].map((d, k) => (
            <circle
              key={k} cx={CX} cy={CY} r="70" fill="none"
              stroke="#10b981" strokeWidth="1.4" opacity="0"
            >
              <animate
                attributeName="r" values="70;120"
                dur="3.9s" begin={`${d}s`} repeatCount="indefinite"
              />
              <animate
                attributeName="opacity" values="0.55;0"
                dur="3.9s" begin={`${d}s`} repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* shield body — rounded hex-ish */}
          <g filter="url(#s610-glow)">
            <path
              d={`M ${CX} ${CY - 78}
                  L ${CX + 64} ${CY - 40}
                  L ${CX + 64} ${CY + 40}
                  L ${CX} ${CY + 78}
                  L ${CX - 64} ${CY + 40}
                  L ${CX - 64} ${CY - 40}
                  Z`}
              fill="#0b1220"
              stroke="#10b981" strokeWidth="2.4"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.65;1;0.65" dur="3.2s" repeatCount="indefinite"
              />
            </path>
            <path
              d={`M ${CX} ${CY - 64}
                  L ${CX + 52} ${CY - 32}
                  L ${CX + 52} ${CY + 32}
                  L ${CX} ${CY + 64}
                  L ${CX - 52} ${CY + 32}
                  L ${CX - 52} ${CY - 32}
                  Z`}
              fill="none" stroke="#34d399" strokeWidth="1"
              strokeOpacity="0.55"
            />
          </g>

          {/* pause bars inside the shield */}
          <g>
            <rect
              x={CX - 18} y={CY - 22} width="12" height="34" rx="2.6"
              fill="#10b981" filter="url(#s610-soft-glow)"
            >
              <animate
                attributeName="fill"
                values="#10b981;#34d399;#10b981"
                dur="3.2s" repeatCount="indefinite"
              />
            </rect>
            <rect
              x={CX + 6} y={CY - 22} width="12" height="34" rx="2.6"
              fill="#10b981" filter="url(#s610-soft-glow)"
            >
              <animate
                attributeName="fill"
                values="#10b981;#34d399;#10b981"
                dur="3.2s" repeatCount="indefinite"
              />
            </rect>
          </g>

          {/* label below the shield */}
          <text
            x={CX} y={CY + 36}
            textAnchor="middle"
            fill="#34d399" fontSize="13" fontWeight="700"
            style={{ letterSpacing: '0.32em' }}
          >
            ПАУЗА
          </text>
        </g>

        {/* ============================================================ */}
        {/* Threat satellites                                             */}
        {/* ============================================================ */}
        {threats.map((t, i) => (
          <g key={t.id} transform={`translate(${t.x} ${t.y})`}>
            {/* hot halo */}
            <circle r="58" fill="url(#s610-threat-halo)" />

            {/* outer pulse rings (urgency) */}
            {[0, 1.5].map((d, k) => (
              <circle
                key={k} r="44" fill="none"
                stroke={t.color} strokeWidth="1" opacity="0"
              >
                <animate
                  attributeName="r" values="44;72"
                  dur="3s" begin={`${i * 0.4 + d}s`} repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity" values="0.55;0"
                  dur="3s" begin={`${i * 0.4 + d}s`} repeatCount="indefinite"
                />
              </circle>
            ))}

            {/* badge body */}
            <circle
              r="44" fill="#0b1220"
              stroke={t.color} strokeWidth="2"
              filter="url(#s610-glow)"
            />

            {/* icon — drawn around (0, -4) */}
            <g transform="translate(0 -4)">
              <ThreatIcon id={t.id} color={t.color} />
            </g>

            {/* "!" urgency mark — top-right of the badge */}
            <g transform="translate(28 -28)">
              <circle r="10" fill="#0b1220" stroke="#ef4444" strokeWidth="1.4">
                <animate
                  attributeName="stroke-opacity"
                  values="0.5;1;0.5" dur="1.4s"
                  begin={`${i * 0.3}s`} repeatCount="indefinite"
                />
              </circle>
              <text
                x="0" y="3.6" textAnchor="middle"
                fill="#ef4444" fontSize="13" fontWeight="800"
              >
                !
              </text>
            </g>

            {/* labels */}
            <text
              x="0" y="60"
              textAnchor="middle"
              fill="#e2e8f0" fontSize="13" fontWeight="700"
            >
              {t.label}
            </text>
            <text
              x="0" y="76"
              textAnchor="middle"
              fill="#94a3b8" fontSize="10.5" fontWeight="500"
            >
              {t.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ---------- icons (drawn around 0,0) ----------

function ThreatIcon({ id, color }) {
  switch (id) {
    case 'profile': return <MaskIcon color={color} />
    case 'scheme':  return <BaitIcon color={color} />
    case 'news':    return <NewsIcon color={color} />
    default: return null
  }
}

// Masked silhouette — head with a horizontal eye-mask band
function MaskIcon({ color }) {
  return (
    <g>
      {/* head */}
      <circle cx="0" cy="-2" r="9" fill="none" stroke={color} strokeWidth="1.7" />
      {/* shoulders */}
      <path
        d="M -13 14 Q 0 4 13 14"
        fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round"
      />
      {/* eye-mask band */}
      <path
        d="M -10 -3 Q -6 -5.5 -2 -3.4 Q 0 -2.4 2 -3.4 Q 6 -5.5 10 -3 L 10 0 Q 6 -1.5 2 -0.6 Q 0 0.2 -2 -0.6 Q -6 -1.5 -10 0 Z"
        fill={color} opacity="0.85"
      />
      {/* slim eye slits */}
      <line x1="-7" y1="-2" x2="-3.5" y2="-2" stroke="#0b1220" strokeWidth="0.9" />
      <line x1="3.5" y1="-2" x2="7" y2="-2" stroke="#0b1220" strokeWidth="0.9" />
    </g>
  )
}

// Bait envelope with a tag — "награда" hook
function BaitIcon({ color }) {
  return (
    <g>
      {/* envelope */}
      <rect
        x="-13" y="-9" width="26" height="18" rx="2.4"
        fill="none" stroke={color} strokeWidth="1.7"
      />
      <path
        d="M -13 -7 L 0 4 L 13 -7"
        fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* "лв" coin tag, slightly outside */}
      <g transform="translate(10 9)">
        <circle r="6" fill="#0b1220" stroke={color} strokeWidth="1.4">
          <animate
            attributeName="stroke-opacity"
            values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite"
          />
        </circle>
        <text
          x="0" y="2.4" textAnchor="middle"
          fill={color} fontSize="7" fontWeight="800"
        >
          лв
        </text>
      </g>
    </g>
  )
}

// Newspaper with a flame on top — sensational headline
function NewsIcon({ color }) {
  return (
    <g>
      {/* paper */}
      <rect
        x="-12" y="-8" width="22" height="18" rx="1.6"
        fill="none" stroke={color} strokeWidth="1.7"
      />
      {/* headline + lines */}
      <rect x="-9" y="-5" width="14" height="3" fill={color} opacity="0.85" />
      <line x1="-9" y1="0" x2="6" y2="0" stroke={color} strokeWidth="1" />
      <line x1="-9" y1="3" x2="6" y2="3" stroke={color} strokeWidth="1" opacity="0.7" />
      <line x1="-9" y1="6" x2="3" y2="6" stroke={color} strokeWidth="1" opacity="0.55" />
      {/* small flame above headline corner */}
      <g transform="translate(10 -10)">
        <path
          d="M 0 4 Q -3 1 -1.5 -2 Q 0 -4 1 -1 Q 2.4 -3.5 3 -1 Q 4 2 0 4 Z"
          fill="#ef4444"
        >
          <animateTransform
            attributeName="transform" type="scale"
            values="1;1.15;1" dur="1.4s" repeatCount="indefinite"
          />
        </path>
      </g>
    </g>
  )
}
