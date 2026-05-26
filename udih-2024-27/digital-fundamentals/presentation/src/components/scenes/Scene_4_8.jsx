// Scene 4.8 — Облачно съхранение
// Pattern: hub + flow. A glowing cloud at the top centre holds three service
// badges (Google Drive, iCloud, OneDrive). Three devices live in a row below —
// phone, tablet, laptop. Dashed flowing sync lines connect each device to the
// cloud and small file tokens (photos / docs) travel up from the phone into
// the cloud and back down to the other devices. Breathing rings around the
// cloud and the devices say "always syncing".

const CLOUD_CX = 450
const CLOUD_CY = 175

// Anchor points on the bottom edge of the cloud where sync lines attach.
const CLOUD_ANCHORS = {
  phone: { x: 360, y: 235 },
  tablet: { x: 450, y: 240 },
  laptop: { x: 540, y: 235 },
}

const devices = [
  {
    id: 'phone',
    label: 'Телефон',
    cx: 190,
    cy: 440,
    color: '#60a5fa',
    glow: '#93c5fd',
    cloudAnchor: CLOUD_ANCHORS.phone,
    delay: 0,
  },
  {
    id: 'tablet',
    label: 'Таблет',
    cx: 450,
    cy: 460,
    color: '#22d3ee',
    glow: '#67e8f9',
    cloudAnchor: CLOUD_ANCHORS.tablet,
    delay: 1.6,
  },
  {
    id: 'laptop',
    label: 'Лаптоп',
    cx: 710,
    cy: 440,
    color: '#a78bfa',
    glow: '#c4b5fd',
    cloudAnchor: CLOUD_ANCHORS.laptop,
    delay: 3.2,
  },
]

// Three cloud services, placed inside the cloud body.
const services = [
  { id: 'gdrive', label: 'Drive', color: '#34d399', x: 380, y: 175 },
  { id: 'icloud', label: 'iCloud', color: '#60a5fa', x: 450, y: 160 },
  { id: 'onedrive', label: 'OneDrive', color: '#22d3ee', x: 525, y: 178 },
]

// Curved sync path device → cloud anchor (bezier control offset upward).
function syncPath(d) {
  const c1x = d.cx
  const c1y = d.cy - 80
  const c2x = (d.cx + d.cloudAnchor.x) / 2
  const c2y = d.cloudAnchor.y + 60
  return `M ${d.cx} ${d.cy - 30} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${d.cloudAnchor.x} ${d.cloudAnchor.y}`
}

function renderDevice(d) {
  switch (d.id) {
    case 'phone':
      return (
        <g>
          <rect
            x="-22" y="-38" width="44" height="76" rx="7"
            fill="#0b1220" stroke={d.color} strokeWidth="2"
            filter="url(#s48-glow)"
          >
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="3.6s" repeatCount="indefinite" />
          </rect>
          <rect x="-17" y="-32" width="34" height="58" rx="2" fill="#0f172a" stroke="#1e293b" strokeWidth="0.6" />
          {/* tiny photo thumbnails on screen */}
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={-15 + (i % 2) * 16} y={-28 + Math.floor(i / 2) * 16}
              width="13" height="13" rx="1.5"
              fill={d.color} fillOpacity="0.22" stroke={d.color} strokeWidth="0.6"
            />
          ))}
          <rect x="-15" y="4" width="29" height="13" rx="1.5" fill={d.color} fillOpacity="0.22" stroke={d.color} strokeWidth="0.6" />
          <circle cx="0" cy="32" r="1.6" fill="none" stroke="#334155" strokeWidth="1" />
        </g>
      )
    case 'tablet':
      return (
        <g>
          <rect
            x="-44" y="-30" width="88" height="60" rx="6"
            fill="#0b1220" stroke={d.color} strokeWidth="2"
            filter="url(#s48-glow)"
          >
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="3.8s" repeatCount="indefinite" />
          </rect>
          <rect x="-38" y="-24" width="76" height="48" rx="2" fill="#0f172a" stroke="#1e293b" strokeWidth="0.6" />
          {/* thumbnail grid */}
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={-34 + (i % 4) * 18} y={-19}
              width="14" height="14" rx="1.5"
              fill={d.color} fillOpacity="0.22" stroke={d.color} strokeWidth="0.6"
            />
          ))}
          <rect x="-34" y="2" width="68" height="6" rx="1.5" fill={d.color} fillOpacity="0.18" stroke={d.color} strokeWidth="0.5" />
          <rect x="-34" y="12" width="56" height="6" rx="1.5" fill={d.color} fillOpacity="0.18" stroke={d.color} strokeWidth="0.5" />
        </g>
      )
    case 'laptop':
      return (
        <g>
          {/* screen */}
          <rect
            x="-44" y="-38" width="88" height="58" rx="5"
            fill="#0b1220" stroke={d.color} strokeWidth="2"
            filter="url(#s48-glow)"
          >
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="4s" repeatCount="indefinite" />
          </rect>
          <rect x="-39" y="-33" width="78" height="48" rx="2" fill="#0f172a" stroke="#1e293b" strokeWidth="0.6" />
          {/* doc icons */}
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${-26 + i * 24} -22)`}>
              <path
                d="M -7 -8 L 4 -8 L 8 -4 L 8 8 L -7 8 Z"
                fill={d.color} fillOpacity="0.22" stroke={d.color} strokeWidth="0.7"
              />
              <line x1="-4" y1="-1" x2="5" y2="-1" stroke={d.color} strokeWidth="0.6" opacity="0.7" />
              <line x1="-4" y1="2" x2="5" y2="2" stroke={d.color} strokeWidth="0.6" opacity="0.7" />
              <line x1="-4" y1="5" x2="3" y2="5" stroke={d.color} strokeWidth="0.6" opacity="0.7" />
            </g>
          ))}
          {/* keyboard base */}
          <path
            d="M -56 22 L 56 22 L 50 32 L -50 32 Z"
            fill="#0b1220" stroke={d.color} strokeWidth="1.6"
          />
          <rect x="-10" y="22" width="20" height="2" rx="1" fill={d.color} fillOpacity="0.5" />
        </g>
      )
    default:
      return null
  }
}

export default function Scene_4_8() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s48-cloud-grad" cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.42" />
            <stop offset="60%" stopColor="#22d3ee" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s48-cloud-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0b1220" stopOpacity="0.92" />
          </linearGradient>
          <filter id="s48-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="s48-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Per-device motion paths for traveling file tokens */}
          {devices.map((d) => (
            <path key={`p-${d.id}`} id={`s48-path-${d.id}`} d={syncPath(d)} />
          ))}
        </defs>

        {/* Ambient rotating ring around the cloud */}
        <circle
          cx={CLOUD_CX} cy={CLOUD_CY} r="180"
          fill="none" stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 11"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CLOUD_CX} ${CLOUD_CY}`} to={`360 ${CLOUD_CX} ${CLOUD_CY}`}
            dur="56s" repeatCount="indefinite"
          />
        </circle>
        <circle
          cx={CLOUD_CX} cy={CLOUD_CY} r="158"
          fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 16" opacity="0.5"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`360 ${CLOUD_CX} ${CLOUD_CY}`} to={`0 ${CLOUD_CX} ${CLOUD_CY}`}
            dur="44s" repeatCount="indefinite"
          />
        </circle>

        {/* Cloud halo */}
        <circle cx={CLOUD_CX} cy={CLOUD_CY} r="140" fill="url(#s48-cloud-grad)" />

        {/* Sync connection lines: device → cloud, dashed flowing both ways */}
        {devices.map((d) => (
          <g key={`link-${d.id}`}>
            <path
              d={syncPath(d)}
              fill="none" stroke="#334155" strokeWidth="1"
              strokeDasharray="4 7" opacity="0.55"
            >
              <animate
                attributeName="stroke-dashoffset" from="11" to="0"
                dur="2.4s" repeatCount="indefinite"
              />
            </path>
          </g>
        ))}

        {/* Cloud shape with breathing stroke */}
        <g filter="url(#s48-glow)">
          <path
            d="M 320 195
               Q 312 152 355 145
               Q 372 112 415 118
               Q 448 92 488 112
               Q 528 105 545 138
               Q 588 138 590 178
               Q 595 220 552 228
               L 358 232
               Q 308 234 320 195 Z"
            fill="url(#s48-cloud-fill)"
            stroke="#60a5fa" strokeWidth="2.2"
          >
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Breathing rings emanating from the cloud — "always on" */}
        {[0, 1.8, 3.6].map((d, i) => (
          <ellipse
            key={i}
            cx={CLOUD_CX} cy={CLOUD_CY} rx="135" ry="60"
            fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0"
          >
            <animate attributeName="rx" values="135;180" dur="5.4s" begin={`${d}s`} repeatCount="indefinite" />
            <animate attributeName="ry" values="60;82" dur="5.4s" begin={`${d}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0" dur="5.4s" begin={`${d}s`} repeatCount="indefinite" />
          </ellipse>
        ))}

        {/* Cloud label */}
        <text
          x={CLOUD_CX} y={CLOUD_CY - 78} textAnchor="middle"
          fill="#e2e8f0" fontSize="12.5" fontWeight="700"
          style={{ letterSpacing: '0.32em' }}
        >
          ОБЛАК
        </text>

        {/* Three service badges inside the cloud */}
        {services.map((s, i) => (
          <g key={s.id} transform={`translate(${s.x} ${s.y})`}>
            <rect
              x="-32" y="-13" width="64" height="26" rx="13"
              fill="#0b1220" stroke={s.color} strokeWidth="1.6"
              filter="url(#s48-glow)"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.6;1;0.6"
                dur={`${3 + i * 0.4}s`}
                repeatCount="indefinite"
              />
            </rect>
            <circle cx="-22" cy="0" r="5" fill={s.color} fillOpacity="0.45" stroke={s.color} strokeWidth="1" />
            <text
              x="-13" y="4" textAnchor="start"
              fill="#e2e8f0" fontSize="11" fontWeight="700"
            >
              {s.label}
            </text>
          </g>
        ))}

        {/* File tokens traveling along each sync path.
            Phone uploads (forward), tablet & laptop download (reverse) so the
            flow shows: phone → cloud → other devices. */}
        {devices.map((d, i) => {
          const reverse = d.id !== 'phone'
          return (
            <g key={`tok-${d.id}`}>
              {/* token 1 */}
              <g filter="url(#s48-glow)">
                <rect x="-7" y="-7" width="14" height="14" rx="2.4" fill={d.color} fillOpacity="0.85" stroke={d.glow} strokeWidth="1" />
                <circle cx="-2" cy="-2" r="1.6" fill="#0b1220" />
                <path d="M -5 4 L -1 0 L 2 2 L 5 -2 L 5 4 Z" fill="#0b1220" opacity="0.85" />
                <animateMotion
                  dur={`${5.2 + i * 0.4}s`} repeatCount="indefinite"
                  keyPoints={reverse ? '1;0' : '0;1'}
                  keyTimes="0;1"
                  calcMode="linear"
                >
                  <mpath href={`#s48-path-${d.id}`} />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur={`${5.2 + i * 0.4}s`} repeatCount="indefinite" />
              </g>
              {/* token 2 — offset */}
              <g filter="url(#s48-glow)">
                <rect x="-7" y="-7" width="14" height="14" rx="2.4" fill={d.color} fillOpacity="0.85" stroke={d.glow} strokeWidth="1" />
                <circle cx="-2" cy="-2" r="1.6" fill="#0b1220" />
                <path d="M -5 4 L -1 0 L 2 2 L 5 -2 L 5 4 Z" fill="#0b1220" opacity="0.85" />
                <animateMotion
                  dur={`${5.2 + i * 0.4}s`} begin={`${2.6 + i * 0.2}s`} repeatCount="indefinite"
                  keyPoints={reverse ? '1;0' : '0;1'}
                  keyTimes="0;1"
                  calcMode="linear"
                >
                  <mpath href={`#s48-path-${d.id}`} />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur={`${5.2 + i * 0.4}s`} begin={`${2.6 + i * 0.2}s`} repeatCount="indefinite" />
              </g>
            </g>
          )
        })}

        {/* Devices row */}
        {devices.map((d) => (
          <g key={d.id} transform={`translate(${d.cx} ${d.cy})`}>
            {/* sync check badge floating above each device */}
            <g transform="translate(38 -36)" filter="url(#s48-soft-glow)">
              <circle r="9" fill="#0b1220" stroke="#10b981" strokeWidth="1.6">
                <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.6s" begin={`${d.delay}s`} repeatCount="indefinite" />
              </circle>
              <path d="M -4 0 L -1 3 L 4 -3" fill="none" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* device body */}
            {renderDevice(d)}

            {/* device label */}
            <text
              x="0" y="78" textAnchor="middle"
              fill="#e2e8f0" fontSize="13" fontWeight="700"
              style={{ letterSpacing: '0.22em' }}
            >
              {d.label.toUpperCase()}
            </text>
          </g>
        ))}

        {/* SYNC label on the rightmost connection */}
        <g transform="translate(680 320)">
          <rect x="-30" y="-11" width="60" height="22" rx="11" fill="#0b1220" stroke="#22d3ee" strokeWidth="1" opacity="0.92" />
          <text
            x="0" y="4" textAnchor="middle"
            fill="#e2e8f0" fontSize="10" fontWeight="700"
            style={{ letterSpacing: '0.24em', fontFamily: 'monospace' }}
          >
            SYNC
          </text>
        </g>

        {/* Drifting ambient particles for life */}
        <g opacity="0.55">
          <circle r="2" fill="#22d3ee" filter="url(#s48-glow)">
            <animateMotion
              dur="26s" repeatCount="indefinite"
              path="M 100 100 Q 280 70 460 90 T 820 130"
            />
          </circle>
          <circle r="1.8" fill="#a78bfa" filter="url(#s48-glow)">
            <animateMotion
              dur="32s" repeatCount="indefinite"
              path="M 820 510 Q 600 510 380 500 T 80 500"
            />
          </circle>
          <circle r="1.6" fill="#60a5fa" filter="url(#s48-glow)">
            <animateMotion
              dur="38s" repeatCount="indefinite"
              path="M 130 360 Q 250 320 400 360 T 800 360"
            />
          </circle>
        </g>
      </svg>
    </div>
  )
}
