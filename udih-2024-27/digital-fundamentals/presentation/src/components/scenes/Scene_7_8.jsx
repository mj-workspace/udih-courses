// Scene 7.8 — Принципи на ефективното промптване
// Pattern: hub & orbit + outgoing flow
// Central "ПРОМПТ" core, four lever satellites (Контекст / Роля / Формат /
// Пример) feed boosts into it; an enriched beam streams to a polished
// "ОТГОВОР" card on the right. Visualises: bare prompt + 4 levers → better
// answer.

const CX = 380
const CY = 290
const R = 168

const levers = [
  { id: 'ctx', label: 'Контекст', color: '#3b82f6', angle: -135 },
  { id: 'rol', label: 'Роля',     color: '#a78bfa', angle:  -45 },
  { id: 'fmt', label: 'Формат',   color: '#22d3ee', angle:  135 },
  { id: 'ex',  label: 'Пример',   color: '#10b981', angle:   45 },
].map((n) => {
  const rad = (n.angle * Math.PI) / 180
  return { ...n, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

function LeverIcon({ kind, color }) {
  switch (kind) {
    case 'ctx':
      // little house — situation / setting
      return (
        <g stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" fill="none">
          <path d="M -14 4 L 0 -10 L 14 4 L 14 12 L -14 12 Z" />
          <rect x="-4" y="2" width="8" height="10" />
        </g>
      )
    case 'rol':
      // friendly face — role/persona
      return (
        <g fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="0" cy="2" rx="11" ry="13" />
          <circle cx="-4" cy="0" r="1.4" fill={color} stroke="none" />
          <circle cx="4"  cy="0" r="1.4" fill={color} stroke="none" />
          <path d="M -5 8 Q 0 11 5 8" />
          <path d="M -11 -8 Q 0 -16 11 -8" />
        </g>
      )
    case 'fmt':
      // bullet list lines
      return (
        <g fill={color} stroke="none">
          {[-9, -3, 3, 9].map((y, i) => (
            <g key={i}>
              <circle cx="-11" cy={y} r="1.6" />
              <rect x="-6" y={y - 1.3} width={14 - i * 1.2} height="2.4" rx="1" />
            </g>
          ))}
        </g>
      )
    case 'ex':
      // sparkle star — exemplar
      return (
        <g fill={color} stroke="none">
          <path d="M 0 -13 L 3 -3.5 L 13 0 L 3 3.5 L 0 13 L -3 3.5 L -13 0 L -3 -3.5 Z" />
        </g>
      )
    default:
      return null
  }
}

export default function Scene_7_8() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s78-core-grad">
            <stop offset="0%"  stopColor="#60a5fa" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#1e3a8a" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s78-out-grad">
            <stop offset="0%"  stopColor="#34d399" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
          <filter id="s78-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ambient rotating rings */}
        <circle cx={CX} cy={CY} r="240" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 9">
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="58s" repeatCount="indefinite"
          />
        </circle>
        <circle cx={CX} cy={CY} r="200" fill="none"
          stroke="#334155" strokeWidth="0.5" strokeDasharray="2 12" opacity="0.55">
          <animateTransform
            attributeName="transform" type="rotate"
            from={`360 ${CX} ${CY}`} to={`0 ${CX} ${CY}`}
            dur="44s" repeatCount="indefinite"
          />
        </circle>

        {/* lever → core links + traveling boost packets */}
        {levers.map((n, i) => (
          <g key={`link-${n.id}`}>
            <line
              x1={n.x} y1={n.y} x2={CX} y2={CY}
              stroke={n.color} strokeOpacity="0.4"
              strokeWidth="1" strokeDasharray="4 6"
            >
              <animate
                attributeName="stroke-dashoffset" from="10" to="0"
                dur="1.9s" repeatCount="indefinite"
              />
            </line>
            <circle r="4" fill={n.color} filter="url(#s78-glow)">
              <animateMotion
                dur={`${4.2 + i * 0.4}s`} begin={`${i * 0.55}s`}
                repeatCount="indefinite"
                path={`M ${n.x} ${n.y} L ${CX} ${CY}`}
              />
            </circle>
          </g>
        ))}

        {/* core → output beam */}
        <g>
          <line
            x1={CX + 50} y1={CY} x2="710" y2={CY}
            stroke="#34d399" strokeOpacity="0.6"
            strokeWidth="2.4" strokeDasharray="6 8"
          >
            <animate
              attributeName="stroke-dashoffset" from="14" to="0"
              dur="1.6s" repeatCount="indefinite"
            />
          </line>
          {[0, 1.2, 2.4].map((d, i) => (
            <circle key={i} r="4.6" fill="#34d399" filter="url(#s78-glow)">
              <animateMotion
                dur="3.6s" begin={`${d}s`} repeatCount="indefinite"
                path={`M ${CX + 50} ${CY} L 710 ${CY}`}
              />
            </circle>
          ))}
        </g>

        {/* central ПРОМПТ core */}
        <g transform={`translate(${CX} ${CY})`}>
          <circle r="76" fill="url(#s78-core-grad)" />
          {[0, 1.6, 3.2].map((d, i) => (
            <circle key={i} r="48" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0">
              <animate
                attributeName="r" values="48;96"
                dur="4.8s" begin={`${d}s`} repeatCount="indefinite"
              />
              <animate
                attributeName="opacity" values="0.45;0"
                dur="4.8s" begin={`${d}s`} repeatCount="indefinite"
              />
            </circle>
          ))}
          <circle
            r="48" fill="#0b1220" stroke="#60a5fa" strokeWidth="2"
            filter="url(#s78-glow)"
          >
            <animate
              attributeName="stroke-opacity" values="0.6;1;0.6"
              dur="3.4s" repeatCount="indefinite"
            />
          </circle>
          {/* chat-bubble pictogram */}
          <g fill="none" stroke="#60a5fa" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
            <path d="M -20 -10 q 0 -10 10 -10 h 20 q 10 0 10 10 v 8 q 0 10 -10 10 h -10 l -10 9 v -9 q -10 0 -10 -10 z" />
            <circle cx="-6" cy="-2" r="1.3" fill="#60a5fa" stroke="none" />
            <circle cx="0"  cy="-2" r="1.3" fill="#60a5fa" stroke="none" />
            <circle cx="6"  cy="-2" r="1.3" fill="#60a5fa" stroke="none" />
          </g>
          <text
            x="0" y="34" textAnchor="middle"
            fill="#e2e8f0" fontSize="12" fontWeight="700"
            style={{ letterSpacing: '0.16em' }}
          >
            ПРОМПТ
          </text>
        </g>

        {/* polished output card on the right */}
        <g transform="translate(770 290)">
          <circle r="84" fill="url(#s78-out-grad)" />
          <rect
            x="-54" y="-58" width="108" height="116" rx="10"
            fill="#0b1220" stroke="#34d399" strokeWidth="1.6"
            filter="url(#s78-glow)"
          >
            <animate
              attributeName="stroke-opacity" values="0.7;1;0.7"
              dur="3.6s" repeatCount="indefinite"
            />
          </rect>
          {/* polished-text lines */}
          {[
            { y: -38, w: 74 },
            { y: -22, w: 86 },
            { y:  -6, w: 70 },
            { y:  10, w: 82 },
            { y:  26, w: 60 },
            { y:  42, w: 78 },
          ].map((ln, i) => (
            <rect
              key={i} x={-ln.w / 2} y={ln.y - 1.4}
              width={ln.w} height="2.8" rx="1.2"
              fill="#34d399" opacity="0.6"
            >
              <animate
                attributeName="opacity" values="0.4;0.9;0.4"
                dur="3.8s" begin={`${i * 0.28}s`} repeatCount="indefinite"
              />
            </rect>
          ))}
          {/* sparkle star — top-right corner */}
          <g transform="translate(40 -64)">
            <path
              d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z"
              fill="#fbbf24" filter="url(#s78-glow)"
            >
              <animateTransform
                attributeName="transform" type="rotate"
                from="0" to="360" dur="12s" repeatCount="indefinite"
              />
              <animate
                attributeName="opacity" values="0.7;1;0.7"
                dur="2.4s" repeatCount="indefinite"
              />
            </path>
          </g>
          <text
            x="0" y="78" textAnchor="middle"
            fill="#34d399" fontSize="11" fontWeight="700"
            style={{ letterSpacing: '0.18em' }}
          >
            ПО-ДОБЪР ОТГОВОР
          </text>
        </g>

        {/* four lever satellites */}
        {levers.map((n, i) => (
          <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
            {[0, 1.4].map((d, k) => (
              <circle key={k} r="42" fill="none" stroke={n.color} strokeWidth="1" opacity="0">
                <animate
                  attributeName="r" values="42;74"
                  dur="4s" begin={`${i * 0.5 + d}s`} repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity" values="0.55;0"
                  dur="4s" begin={`${i * 0.5 + d}s`} repeatCount="indefinite"
                />
              </circle>
            ))}
            <circle
              r="42" fill="#0b1220" stroke={n.color} strokeWidth="2"
              filter="url(#s78-glow)"
            />
            <LeverIcon kind={n.id} color={n.color} />
            <text
              x="0" y="62" textAnchor="middle"
              fill="#e2e8f0" fontSize="14" fontWeight="700"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
