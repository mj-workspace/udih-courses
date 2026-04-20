// Scene 4.4 — Data classification pyramid
// Four-tier pyramid from Public (broad base) to Top Secret (narrow apex).
// Incoming data packets from the right are routed by a classifier node to
// the appropriate tier. Each tier has a lock count and a subtle access
// glow; the apex is brightest and most guarded.

const tiers = [
  { id: 'public',     label: 'Публични',          sub: 'достъпни за всички',       color: '#10b981', locks: 0, y: 420, w: 480 },
  { id: 'internal',   label: 'Вътрешни',          sub: 'само служители',           color: '#3b82f6', locks: 1, y: 350, w: 380 },
  { id: 'confident',  label: 'Поверителни',       sub: 'ограничен достъп',         color: '#f59e0b', locks: 2, y: 280, w: 280 },
  { id: 'topsecret',  label: 'Строго секретни',   sub: 'критични · нужно знание',  color: '#ef4444', locks: 3, y: 210, w: 180 },
]

// Classifier position
const CLASS_X = 560
const CLASS_Y = 300

// Incoming data packets — each routed to a random tier (weighted toward
// lower tiers, as most data is public or internal)
const incoming = Array.from({ length: 18 }).map((_, i) => {
  const r = (i * 17 + 5) % 100
  // weight: 45% public, 30% internal, 20% confidential, 5% topsecret
  const tierIdx = r < 45 ? 0 : r < 75 ? 1 : r < 95 ? 2 : 3
  return {
    key: i,
    tierIdx,
    color: tiers[tierIdx].color,
    delay: (i * 0.35) % 8,
    dur: 4.2 + (i % 4) * 0.4,
  }
})

function renderPyramidTier(t, apexX) {
  // Tier is a trapezoid centered on apexX
  // width above = next tier's w, width current = t.w
  const halfW = t.w / 2
  const top = t.y
  const bot = top + 50
  return {
    x1: apexX - halfW, x2: apexX + halfW, top, bot,
  }
}

const APEX_X = 280

export default function Scene_4_4() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="dc-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {tiers.map((t, i) => (
            <linearGradient key={i} id={`tier-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor={t.color} stopOpacity="0.22" />
              <stop offset="100%" stopColor={t.color} stopOpacity="0.04" />
            </linearGradient>
          ))}
          {/* Paths from source to classifier to each tier */}
          <path id="feed-path" d={`M 850,${CLASS_Y} L ${CLASS_X + 30},${CLASS_Y}`} />
          {tiers.map((t, i) => {
            const geom = renderPyramidTier(t, APEX_X)
            const targetX = geom.x2 - 30
            const targetY = t.y + 25
            return (
              <path key={`route-${i}`} id={`route-${i}`}
                d={`M ${CLASS_X - 30},${CLASS_Y} Q ${(CLASS_X + targetX) / 2},${(CLASS_Y + targetY) / 2 - 30} ${targetX},${targetY}`} />
            )
          })}
        </defs>

        {/* Title */}
        <text x="50" y="90" fill="#94a3b8" fontSize="13" fontWeight="500" style={{ letterSpacing: '0.22em' }}>
          КЛАСИФИКАЦИЯ НА ДАННИ · ПО ЧУВСТВИТЕЛНОСТ
        </text>
        <text x="50" y="110" fill="#475569" fontSize="11">
          различно ниво → различна защита
        </text>

        {/* Pyramid tiers */}
        {tiers.map((t, i) => {
          const geom = renderPyramidTier(t, APEX_X)
          // Trapezoid: bottom = geom.x1..geom.x2; top = next tier width or apex point
          const topWHalf = i === tiers.length - 1 ? 0 : tiers[i + 1].w / 2
          const topLeftX = APEX_X - topWHalf
          const topRightX = APEX_X + topWHalf
          return (
            <g key={t.id}>
              {/* Trapezoid */}
              <polygon
                points={`${geom.x1},${geom.bot} ${geom.x2},${geom.bot} ${topRightX},${geom.top} ${topLeftX},${geom.top}`}
                fill={`url(#tier-grad-${i})`}
                stroke={t.color}
                strokeWidth="1.4"
                filter="url(#dc-glow)"
              >
                <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
              </polygon>

              {/* Tier label on the left */}
              <g transform={`translate(${geom.x1 - 14} ${geom.top + 28})`}>
                <text textAnchor="end" fill={t.color} fontSize="13" fontWeight="700"
                  style={{ letterSpacing: '0.08em' }}>
                  {t.label}
                </text>
                <text y="16" textAnchor="end" fill="#64748b" fontSize="10">
                  {t.sub}
                </text>
              </g>

              {/* Lock count on the right of each tier */}
              <g transform={`translate(${geom.x2 + 18} ${geom.top + 20})`}>
                {Array.from({ length: 3 }).map((_, k) => {
                  const filled = k < t.locks
                  return (
                    <g key={k} transform={`translate(${k * 16} 0)`}>
                      <rect x="-5" y="-1" width="10" height="8" rx="1"
                        fill={filled ? t.color : '#0b1220'}
                        stroke={filled ? t.color : '#475569'} strokeWidth="0.8" />
                      <path d="M -3 -1 V -5 A 3 3 0 0 1 3 -5 V -1"
                        fill="none"
                        stroke={filled ? t.color : '#475569'} strokeWidth="1.1"
                        strokeLinecap="round" />
                      {filled && (
                        <animate attributeName="opacity" values="0.75;1;0.75"
                          dur={`${2 + k * 0.2}s`} begin={`${k * 0.2}s`} repeatCount="indefinite" />
                      )}
                    </g>
                  )
                })}
              </g>
            </g>
          )
        })}

        {/* Source (right side) */}
        <g transform="translate(830 300)">
          {[0, 1.3].map((d, i) => (
            <circle key={i} r="26" fill="none" stroke="#64748b" strokeWidth="0.6" opacity="0">
              <animate attributeName="r" values="24;42" dur="3s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.45;0" dur="3s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <circle r="22" fill="#0b1220" stroke="#94a3b8" strokeWidth="1.4" filter="url(#dc-glow)" />
          {/* Stack of files icon */}
          <g fill="none" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M -8 -6 V 6 H 8 V -6 L 3 -11 H -8 Z" />
            <path d="M 3 -11 V -6 H 8" />
            <line x1="-4" y1="-2" x2="4" y2="-2" />
            <line x1="-4" y1="2" x2="4" y2="2" />
          </g>
          <text y="42" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="600">
            данни
          </text>
        </g>

        {/* Classifier node (center-ish) */}
        <g transform={`translate(${CLASS_X} ${CLASS_Y})`}>
          {/* Pulse */}
          {[0, 1.2].map((d, i) => (
            <circle key={i} r="30" fill="none" stroke="#a855f7" strokeWidth="0.7" opacity="0">
              <animate attributeName="r" values="28;48" dur="2.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="2.8s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {/* Orbit */}
          <circle r="34" fill="none" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.35">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="14s" repeatCount="indefinite" />
          </circle>
          {/* Body — diamond */}
          <polygon points="0,-26 26,0 0,26 -26,0" fill="#0b1220" stroke="#a855f7" strokeWidth="1.6" filter="url(#dc-glow)">
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.4s" repeatCount="indefinite" />
          </polygon>
          {/* Inner classification dots */}
          {tiers.map((t, i) => (
            <circle key={t.id} cx={0} cy={-12 + i * 8} r="2" fill={t.color}>
              <animate attributeName="fill-opacity" values="0.3;1;0.3"
                dur={`${1.8 + i * 0.2}s`} begin={`${i * 0.15}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <text y="46" textAnchor="middle" fill="#d8b4fe" fontSize="11" fontWeight="700"
            style={{ letterSpacing: '0.15em' }}>
            CLASSIFIER
          </text>
        </g>

        {/* Feed line from source to classifier */}
        <line x1="808" y1={CLASS_Y} x2={CLASS_X + 30} y2={CLASS_Y}
          stroke="#475569" strokeWidth="0.9" strokeDasharray="3 6" opacity="0.55">
          <animate attributeName="stroke-dashoffset" from="9" to="0" dur="1.4s" repeatCount="indefinite" />
        </line>

        {/* Incoming data packets — feed → classify → route */}
        {incoming.map(p => {
          const cycle = 8 + (p.key % 3)
          return (
            <g key={`inc-${p.key}`}>
              {/* Feed segment (right → classifier) */}
              <circle r="3" fill={p.color} filter="url(#dc-glow)" opacity="0">
                <animateMotion dur="1.4s"
                  begin={`${p.delay}s`} repeatCount="indefinite"
                  keyTimes="0;1" keyPoints="0;1">
                  <mpath href="#feed-path" />
                </animateMotion>
                <animate attributeName="opacity"
                  values="0;0.9;0.9;0" keyTimes="0;0.1;0.9;1"
                  dur="1.4s" begin={`${p.delay}s`} repeatCount="indefinite" />
              </circle>
              {/* Route segment (classifier → tier) - starts 1.4s after feed */}
              <circle r="3" fill={p.color} filter="url(#dc-glow)" opacity="0">
                <animateMotion dur="1.4s"
                  begin={`${p.delay + 1.4}s`} repeatCount="indefinite">
                  <mpath href={`#route-${p.tierIdx}`} />
                </animateMotion>
                <animate attributeName="opacity"
                  values="0;0.95;0.95;0" keyTimes="0;0.15;0.85;1"
                  dur="1.4s" begin={`${p.delay + 1.4}s`} repeatCount="indefinite" />
              </circle>
              {/* Eyes dummy to keep cycle var used */}
              <text opacity="0">{cycle}</text>
            </g>
          )
        })}

        {/* Legend / protection mechanisms on the right */}
        <g transform="translate(610 100)">
          <text fill="#94a3b8" fontSize="11" fontWeight="600" style={{ letterSpacing: '0.22em' }}>
            ЗАЩИТНИ МЕРКИ
          </text>
          {[
            'Криптиране',
            'Контрол на достъпа',
            'Backup · изолация',
            'Сигурно унищожаване',
          ].map((label, i) => (
            <g key={label} transform={`translate(0 ${24 + i * 22})`}>
              <circle cx="8" cy="-3" r="3" fill="#a855f7">
                <animate attributeName="opacity" values="0.35;1;0.35" dur={`${2.6 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
              <text x="22" y="1" fill="#cbd5e1" fontSize="11.5">
                {label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}
