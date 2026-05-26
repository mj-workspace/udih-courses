// Scene 4.5 — Управление на разрешения и сигурност
// Pattern: hub & orbit. The guide's central image is the user as gatekeeper of
// the phone — apps must ASK before they see camera, mic, location, contacts.
// The scene puts a stylised phone at the centre showing a permission dialog
// (Allow / Deny). Around it orbit the four sensitive permissions; each shows
// a green check (granted) or a red X (denied). The "Контакти" tile is flagged
// with a "Фенерче?" tag — the classic mismatch from the guide's example.

const CX = 450
const CY = 296
const R = 178

const perms = [
  { id: 'camera',   label: 'Камера',     color: '#10b981', angle: -90, status: 'allow' },
  { id: 'mic',      label: 'Микрофон',   color: '#22d3ee', angle: 0,   status: 'allow' },
  { id: 'contacts', label: 'Контакти',   color: '#ef4444', angle: 90,  status: 'deny', flag: 'Фенерче?' },
  { id: 'location', label: 'Локация',    color: '#f59e0b', angle: 180, status: 'allow' },
].map((p) => {
  const rad = (p.angle * Math.PI) / 180
  return { ...p, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

function renderPermIcon(id, color) {
  switch (id) {
    case 'camera':
      return (
        <g stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="-14" y="-8" width="28" height="18" rx="3" />
          <path d="M -5 -8 L -3 -12 L 3 -12 L 5 -8" />
          <circle cx="0" cy="1" r="5" fill={color} fillOpacity="0.2" />
          <circle cx="0" cy="1" r="2.2" fill={color} stroke="none" />
        </g>
      )
    case 'mic':
      return (
        <g stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="-5" y="-12" width="10" height="16" rx="5" fill={color} fillOpacity="0.2" />
          <path d="M -10 0 Q -10 10 0 10 Q 10 10 10 0" />
          <line x1="0" y1="10" x2="0" y2="14" />
          <line x1="-5" y1="14" x2="5" y2="14" />
        </g>
      )
    case 'contacts':
      return (
        <g stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="-14" y="-12" width="28" height="22" rx="3" fill={color} fillOpacity="0.12" />
          <circle cx="-3" cy="-3" r="3.5" fill={color} fillOpacity="0.3" />
          <path d="M -10 7 Q -10 1 -3 1 Q 4 1 4 7" />
          <line x1="7" y1="-4" x2="11" y2="-4" />
          <line x1="7" y1="0" x2="11" y2="0" />
          <line x1="7" y1="4" x2="11" y2="4" />
        </g>
      )
    case 'location':
      return (
        <g stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 0 -12 C -7 -12 -10 -7 -10 -3 C -10 5 0 14 0 14 C 0 14 10 5 10 -3 C 10 -7 7 -12 0 -12 Z" fill={color} fillOpacity="0.18" />
          <circle cx="0" cy="-3" r="3" fill={color} stroke="none" />
        </g>
      )
    default:
      return null
  }
}

export default function Scene_4_5() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s45-core-grad">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.42" />
            <stop offset="75%" stopColor="#1e3a8a" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <filter id="s45-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="s45-warn-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient rotating rings */}
        <circle cx={CX} cy={CY} r="252" fill="none" stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 10">
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="58s" repeatCount="indefinite"
          />
        </circle>
        <circle cx={CX} cy={CY} r="226" fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 14" opacity="0.55">
          <animateTransform
            attributeName="transform" type="rotate"
            from={`360 ${CX} ${CY}`} to={`0 ${CX} ${CY}`}
            dur="48s" repeatCount="indefinite"
          />
        </circle>

        {/* Connections phone → permission: request packet outward, then verdict packet back */}
        {perms.map((p, i) => {
          const isDeny = p.status === 'deny'
          return (
            <g key={`link-${p.id}`}>
              <line
                x1={CX} y1={CY} x2={p.x} y2={p.y}
                stroke={isDeny ? '#7f1d1d' : '#334155'}
                strokeWidth="1" strokeDasharray="4 6" opacity="0.55"
              >
                <animate
                  attributeName="stroke-dashoffset" from="10" to="0"
                  dur="2s" repeatCount="indefinite"
                />
              </line>
              {/* request packet phone → permission */}
              <circle r="3.4" fill={isDeny ? '#f87171' : '#60a5fa'} filter="url(#s45-glow)">
                <animateMotion
                  dur={`${4.6 + i * 0.4}s`} repeatCount="indefinite"
                  path={`M ${CX} ${CY} L ${p.x} ${p.y}`}
                />
              </circle>
              {/* verdict packet permission → phone (green for allow, red for deny) */}
              <circle r="3.4" fill={isDeny ? '#ef4444' : '#34d399'} filter="url(#s45-glow)">
                <animateMotion
                  dur={`${4.6 + i * 0.4}s`} begin={`${2.3 + i * 0.2}s`} repeatCount="indefinite"
                  path={`M ${p.x} ${p.y} L ${CX} ${CY}`}
                />
              </circle>
            </g>
          )
        })}

        {/* Halo around phone */}
        <circle cx={CX} cy={CY} r="118" fill="url(#s45-core-grad)" />

        {/* Central phone with permission dialog */}
        <g transform={`translate(${CX} ${CY})`}>
          {/* breathing rings */}
          {[0, 1.6, 3.2].map((d, i) => (
            <circle key={i} r="64" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="64;112" dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.42;0" dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* phone outline */}
          <g filter="url(#s45-glow)">
            <rect x="-48" y="-86" width="96" height="172" rx="14" fill="#0b1220" stroke="#60a5fa" strokeWidth="2.2">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="3.6s" repeatCount="indefinite" />
            </rect>
            {/* speaker slit */}
            <line x1="-10" y1="-78" x2="10" y2="-78" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            {/* home dot */}
            <circle cx="0" cy="78" r="2.2" fill="none" stroke="#334155" strokeWidth="1.4" />
          </g>

          {/* permission dialog inside phone */}
          <g>
            {/* dialog card */}
            <rect x="-40" y="-46" width="80" height="86" rx="7" fill="#0f172a" stroke="#475569" strokeWidth="0.9" />
            {/* small lock icon at top */}
            <g transform="translate(0 -34)">
              <rect x="-5" y="-1" width="10" height="8" rx="1.5" fill="#60a5fa" fillOpacity="0.25" stroke="#60a5fa" strokeWidth="0.9" />
              <path d="M -3 -1 L -3 -4 Q -3 -7 0 -7 Q 3 -7 3 -4 L 3 -1" fill="none" stroke="#60a5fa" strokeWidth="0.9" />
            </g>
            {/* dialog title */}
            <text x="0" y="-15" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="700">
              Разреши?
            </text>
            {/* faux body lines */}
            <line x1="-30" y1="-6" x2="30" y2="-6" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="-30" y1="-1" x2="22" y2="-1" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="-30" y1="4" x2="28" y2="4" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" />

            {/* deny button */}
            <g transform="translate(-18 24)">
              <rect x="-15" y="-9" width="30" height="18" rx="9" fill="#0b1220" stroke="#ef4444" strokeWidth="1.2">
                <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="3s" repeatCount="indefinite" />
              </rect>
              <path d="M -4 -4 L 4 4 M 4 -4 L -4 4" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round" />
            </g>
            {/* allow button */}
            <g transform="translate(18 24)">
              <rect x="-15" y="-9" width="30" height="18" rx="9" fill="#0b1220" stroke="#10b981" strokeWidth="1.2">
                <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="3s" begin="1.5s" repeatCount="indefinite" />
              </rect>
              <path d="M -5 0 L -1 4 L 5 -4" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>

          {/* hub label */}
          <text
            x="0" y="108" textAnchor="middle"
            fill="#e2e8f0" fontSize="13" fontWeight="700"
            style={{ letterSpacing: '0.22em' }}
          >
            ТИ РЕШАВАШ
          </text>
        </g>

        {/* Satellite permission tiles */}
        {perms.map((p, i) => {
          const isDeny = p.status === 'deny'
          const labelY = p.angle === -90 ? -54 : 58
          return (
            <g key={p.id} transform={`translate(${p.x} ${p.y})`}>
              {/* pulsing rings */}
              <circle r="40" fill="none" stroke={p.color} strokeWidth="1" opacity="0">
                <animate attributeName="r" values="40;70" dur="4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0" dur="4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
              </circle>
              <circle r="40" fill="none" stroke={p.color} strokeWidth="1" opacity="0">
                <animate attributeName="r" values="40;70" dur="4s" begin={`${i * 0.6 + 2}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0" dur="4s" begin={`${i * 0.6 + 2}s`} repeatCount="indefinite" />
              </circle>

              {/* permission tile */}
              <rect
                x="-32" y="-32" width="64" height="64" rx="14"
                fill="#0b1220" stroke={p.color} strokeWidth="2"
                filter={isDeny ? 'url(#s45-warn-glow)' : 'url(#s45-glow)'}
              >
                <animate
                  attributeName="stroke-opacity"
                  values={isDeny ? '0.7;1;0.7' : '0.55;1;0.55'}
                  dur={isDeny ? '1.8s' : `${3.4 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </rect>

              {/* icon */}
              {renderPermIcon(p.id, p.color)}

              {/* verdict badge — bottom-right of tile */}
              <g transform="translate(22 22)">
                <circle r="9" fill="#0b1220" stroke={isDeny ? '#ef4444' : '#10b981'} strokeWidth="1.4" />
                {isDeny ? (
                  <path d="M -4 -4 L 4 4 M 4 -4 L -4 4" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round" />
                ) : (
                  <path d="M -4 0 L -1 3 L 4 -3" fill="none" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </g>

              {/* mismatch flag (only on the контакти tile) */}
              {p.flag && (
                <g transform="translate(0 -46)">
                  <rect x="-32" y="-11" width="64" height="20" rx="10" fill="#0b1220" stroke="#f59e0b" strokeWidth="1.2" filter="url(#s45-warn-glow)">
                    <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" />
                  </rect>
                  <text x="0" y="4" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="700">
                    {p.flag}
                  </text>
                </g>
              )}

              {/* label chip */}
              <g transform={`translate(0 ${labelY})`}>
                <rect
                  x="-44" y="-12" width="88" height="24" rx="12"
                  fill="#0b1220" stroke={p.color} strokeWidth="0.9" opacity="0.94"
                />
                <text
                  x="0" y="4" textAnchor="middle"
                  fill="#e2e8f0" fontSize="13" fontWeight="700"
                >
                  {p.label}
                </text>
              </g>
            </g>
          )
        })}

        {/* Bottom-right settings hint — "отнеми по всяко време" */}
        <g transform="translate(770 488)">
          <rect x="-72" y="-16" width="144" height="32" rx="16" fill="#0b1220" stroke="#60a5fa" strokeWidth="1.2" filter="url(#s45-glow)">
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="3s" repeatCount="indefinite" />
          </rect>
          {/* gear icon */}
          <g transform="translate(-50 0)" stroke="#60a5fa" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle r="5" />
            <circle r="1.8" fill="#60a5fa" stroke="none" />
            <line x1="0" y1="-9" x2="0" y2="-6" />
            <line x1="0" y1="6" x2="0" y2="9" />
            <line x1="-9" y1="0" x2="-6" y2="0" />
            <line x1="6" y1="0" x2="9" y2="0" />
            <line x1="-6.4" y1="-6.4" x2="-4.3" y2="-4.3" />
            <line x1="4.3" y1="4.3" x2="6.4" y2="6.4" />
            <line x1="-6.4" y1="6.4" x2="-4.3" y2="4.3" />
            <line x1="4.3" y1="-4.3" x2="6.4" y2="-6.4" />
          </g>
          <text x="10" y="5" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="700" style={{ letterSpacing: '0.12em' }}>
            НАСТРОЙКИ
          </text>
        </g>
      </svg>
    </div>
  )
}
