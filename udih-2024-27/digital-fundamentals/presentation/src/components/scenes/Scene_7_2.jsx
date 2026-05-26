// Scene 7.2 — Къде вече срещаме AI
// Pattern: hub & orbit — a phone at the centre radiates "AI" into three
// everyday domains the participant already uses without naming the technology.

const CX = 450
const CY = 290

const panels = [
  {
    id: 'search',
    label: 'Търсене и видеа',
    color: '#60a5fa',
    accent: '#3b82f6',
    cx: 450, cy: 110, w: 300, h: 100,
    pathD: 'M 450 210 L 450 160',
  },
  {
    id: 'voice',
    label: 'Глас и превод',
    color: '#a78bfa',
    accent: '#8b5cf6',
    cx: 215, cy: 470, w: 270, h: 100,
    pathD: 'M 420 370 Q 360 415 320 445',
  },
  {
    id: 'maps',
    label: 'Карти и снимки',
    color: '#34d399',
    accent: '#10b981',
    cx: 685, cy: 470, w: 270, h: 100,
    pathD: 'M 480 370 Q 540 415 580 445',
  },
]

const ambientTags = [
  { x: 90, y: 215, d: 0.2 },
  { x: 815, y: 230, d: 2.4 },
  { x: 80, y: 360, d: 1.4 },
  { x: 825, y: 360, d: 3.4 },
]

export default function Scene_7_2() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="s72-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="s72-phone-halo">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#1e3a8a" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s72-search-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="s72-voice-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="s72-maps-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
          </linearGradient>

          {/* Travel paths from phone edge into each panel */}
          {panels.map((p) => (
            <path key={`p-${p.id}`} id={`s72-path-${p.id}`} d={p.pathD} />
          ))}
        </defs>

        {/* Ambient: slow rotating dashed ring */}
        <circle
          cx={CX} cy={CY} r="240" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 10"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="58s" repeatCount="indefinite"
          />
        </circle>
        <circle cx={CX} cy={CY} r="130" fill="url(#s72-phone-halo)" />

        {/* ============================================================ */}
        {/* Phone hub — AI chip glowing inside                            */}
        {/* ============================================================ */}
        <g transform={`translate(${CX} ${CY})`}>
          {[0, 1.6, 3.2].map((d, i) => (
            <circle
              key={`r-${i}`} r="62" fill="none"
              stroke="#60a5fa" strokeWidth="1" opacity="0"
            >
              <animate attributeName="r" values="62;150"
                dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.55;0"
                dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Phone body */}
          <rect
            x="-48" y="-82" width="96" height="164" rx="14"
            fill="#0b1220" stroke="#60a5fa" strokeWidth="2"
            filter="url(#s72-glow)"
          />
          <rect x="-13" y="-80" width="26" height="4" rx="2" fill="#1e293b" />
          <rect
            x="-40" y="-68" width="80" height="136" rx="6"
            fill="#0f172a" stroke="#1e293b" strokeWidth="0.8"
          />

          {/* AI chip inside the screen */}
          <g>
            <rect
              x="-28" y="-22" width="56" height="44" rx="7"
              fill="#0b1220" stroke="#22d3ee" strokeWidth="1.6"
              filter="url(#s72-glow)"
            >
              <animate
                attributeName="stroke-opacity" values="0.55;1;0.55"
                dur="3.4s" repeatCount="indefinite"
              />
            </rect>
            {[-18, -8, 2, 12].map((x, i) => (
              <g key={`pins-${i}`}>
                <line x1={x} y1="-26" x2={x} y2="-22"
                  stroke="#22d3ee" strokeWidth="1" opacity="0.6" />
                <line x1={x} y1="22" x2={x} y2="26"
                  stroke="#22d3ee" strokeWidth="1" opacity="0.6" />
              </g>
            ))}
            <text
              x="0" y="5" textAnchor="middle" dominantBaseline="middle"
              fill="#22d3ee" fontSize="17" fontWeight="800"
              style={{ letterSpacing: '0.1em', fontFamily: 'monospace' }}
            >
              AI
            </text>
          </g>

          {/* Tiny circuit-like dots above and below the chip */}
          {[-58, -50].map((y, i) =>
            [-22, -10, 2, 14].map((x, j) => (
              <circle key={`du-${i}-${j}`} cx={x} cy={y} r="0.9"
                fill="#22d3ee" opacity="0.4" />
            ))
          )}
          {[42, 50, 58].map((y, i) =>
            [-22, -10, 2, 14].map((x, j) => (
              <circle key={`dd-${i}-${j}`} cx={x} cy={y} r="0.9"
                fill="#22d3ee" opacity="0.35" />
            ))
          )}

          <text
            x="0" y="104" textAnchor="middle"
            fill="#94a3b8" fontSize="11" fontWeight="700"
            style={{ letterSpacing: '0.22em', fontFamily: 'monospace' }}
          >
            ВЪВ ВСЕКИ ДЕН
          </text>
        </g>

        {/* ============================================================ */}
        {/* Connection lines + traveling AI packets                       */}
        {/* ============================================================ */}
        {panels.map((p, i) => (
          <g key={`link-${p.id}`}>
            <use
              href={`#s72-path-${p.id}`}
              stroke="#334155" strokeWidth="1.2"
              strokeDasharray="5 7" fill="none" opacity="0.6"
            >
              <animate
                attributeName="stroke-dashoffset" from="12" to="0"
                dur="2s" repeatCount="indefinite"
              />
            </use>
            <circle r="4.5" fill={p.color} filter="url(#s72-glow)">
              <animateMotion
                dur={`${4.6 + i * 0.4}s`} begin={`${i * 1.2}s`}
                repeatCount="indefinite"
              >
                <mpath href={`#s72-path-${p.id}`} />
              </animateMotion>
            </circle>
            <circle r="3" fill={p.color} opacity="0.55">
              <animateMotion
                dur={`${4.6 + i * 0.4}s`}
                begin={`${i * 1.2 + 2}s`} repeatCount="indefinite"
              >
                <mpath href={`#s72-path-${p.id}`} />
              </animateMotion>
            </circle>
          </g>
        ))}

        {/* ============================================================ */}
        {/* Panel 1 — Търсене и видеа (top)                              */}
        {/* ============================================================ */}
        <g transform={`translate(${panels[0].cx} ${panels[0].cy})`}>
          <rect
            x={-panels[0].w / 2} y={-panels[0].h / 2}
            width={panels[0].w} height={panels[0].h} rx="14"
            fill="url(#s72-search-grad)"
            stroke={panels[0].accent} strokeOpacity="0.55" strokeWidth="1.2"
          />
          {/* Magnifying glass with a "typed" bar */}
          <g transform="translate(-95 -6)">
            <circle r="15" fill="#0b1220"
              stroke="#60a5fa" strokeWidth="2" filter="url(#s72-glow)" />
            <line x1="10" y1="10" x2="22" y2="22"
              stroke="#60a5fa" strokeWidth="2.6" strokeLinecap="round" />
            <line x1="-7" y1="0" x2="-7" y2="0"
              stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round">
              <animate attributeName="x2"
                values="-7;7;7;-7" keyTimes="0;0.45;0.85;1"
                dur="3.2s" repeatCount="indefinite" />
            </line>
          </g>
          {/* Play card (recommended video) */}
          <g transform="translate(95 -6)">
            <rect
              x="-22" y="-15" width="44" height="30" rx="5"
              fill="#0b1220" stroke="#60a5fa" strokeWidth="2"
              filter="url(#s72-glow)"
            />
            <path d="M -4 -7 L 9 0 L -4 7 Z" fill="#60a5fa" />
            <circle cx="0" cy="24" r="2" fill="#60a5fa">
              <animate attributeName="opacity"
                values="0.35;1;0.35" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </g>
          <text
            x="0" y="36" textAnchor="middle"
            fill="#e2e8f0" fontSize="15" fontWeight="600"
          >
            {panels[0].label}
          </text>
        </g>

        {/* ============================================================ */}
        {/* Panel 2 — Глас и превод (bottom-left)                         */}
        {/* ============================================================ */}
        <g transform={`translate(${panels[1].cx} ${panels[1].cy})`}>
          <rect
            x={-panels[1].w / 2} y={-panels[1].h / 2}
            width={panels[1].w} height={panels[1].h} rx="14"
            fill="url(#s72-voice-grad)"
            stroke={panels[1].accent} strokeOpacity="0.55" strokeWidth="1.2"
          />
          {/* Microphone with sound waves */}
          <g transform="translate(-85 -6)">
            {[0, 0.7, 1.4].map((d, i) => (
              <circle key={`wave-${i}`} r="18" fill="none"
                stroke="#a78bfa" strokeWidth="1" opacity="0">
                <animate attributeName="r" values="14;30"
                  dur="2.4s" begin={`${d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0"
                  dur="2.4s" begin={`${d}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <rect x="-6" y="-15" width="12" height="20" rx="6"
              fill="#a78bfa" filter="url(#s72-glow)" />
            <path d="M -11 2 Q -11 14 0 14 Q 11 14 11 2"
              fill="none" stroke="#a78bfa" strokeWidth="2"
              strokeLinecap="round" />
            <line x1="0" y1="14" x2="0" y2="20"
              stroke="#a78bfa" strokeWidth="2" />
          </g>
          {/* Translate EN -> БГ */}
          <g transform="translate(60 -6)">
            <text x="-32" y="5" textAnchor="middle"
              fill="#e2e8f0" fontSize="15" fontWeight="700"
              style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              EN
            </text>
            <path d="M -14 0 L 14 0 M 7 -6 L 14 0 L 7 6"
              fill="none" stroke="#a78bfa" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <animate attributeName="stroke-opacity"
                values="0.5;1;0.5" dur="2.8s" repeatCount="indefinite" />
            </path>
            <text x="32" y="5" textAnchor="middle"
              fill="#e2e8f0" fontSize="15" fontWeight="700"
              style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              БГ
            </text>
          </g>
          <text
            x="0" y="36" textAnchor="middle"
            fill="#e2e8f0" fontSize="15" fontWeight="600"
          >
            {panels[1].label}
          </text>
        </g>

        {/* ============================================================ */}
        {/* Panel 3 — Карти и снимки (bottom-right)                       */}
        {/* ============================================================ */}
        <g transform={`translate(${panels[2].cx} ${panels[2].cy})`}>
          <rect
            x={-panels[2].w / 2} y={-panels[2].h / 2}
            width={panels[2].w} height={panels[2].h} rx="14"
            fill="url(#s72-maps-grad)"
            stroke={panels[2].accent} strokeOpacity="0.55" strokeWidth="1.2"
          />
          {/* Map pin with a tiny route under it */}
          <g transform="translate(-85 -6)">
            <path
              d="M -22 14 Q -8 10 0 14 Q 10 18 22 12"
              fill="none" stroke="#34d399" strokeWidth="1.2"
              strokeDasharray="3 4" opacity="0.7"
            >
              <animate attributeName="stroke-dashoffset"
                from="14" to="0" dur="2.4s" repeatCount="indefinite" />
            </path>
            <path
              d="M 0 -16 C 10 -16 14 -8 14 -2 C 14 6 0 18 0 18 C 0 18 -14 6 -14 -2 C -14 -8 -10 -16 0 -16 Z"
              fill="#0b1220" stroke="#34d399" strokeWidth="2"
              filter="url(#s72-glow)"
            />
            <circle cx="0" cy="-3" r="4" fill="#34d399">
              <animate attributeName="opacity"
                values="0.6;1;0.6" dur="2.4s" repeatCount="indefinite" />
            </circle>
          </g>
          {/* Photo frame with mountains + sun */}
          <g transform="translate(80 -6)">
            <rect x="-22" y="-15" width="44" height="30" rx="4"
              fill="#0b1220" stroke="#34d399" strokeWidth="2"
              filter="url(#s72-glow)" />
            <circle cx="-10" cy="-5" r="3" fill="#34d399" opacity="0.9" />
            <path d="M -20 11 L -7 -2 L 3 6 L 11 -1 L 20 11"
              fill="none" stroke="#34d399" strokeWidth="1.8"
              strokeLinejoin="round" />
          </g>
          <text
            x="0" y="36" textAnchor="middle"
            fill="#e2e8f0" fontSize="15" fontWeight="600"
          >
            {panels[2].label}
          </text>
        </g>

        {/* ============================================================ */}
        {/* Ambient "AI" tags — invisible-but-everywhere feel             */}
        {/* ============================================================ */}
        {ambientTags.map((t, i) => (
          <g key={`tag-${i}`} transform={`translate(${t.x} ${t.y})`}>
            <rect x="-16" y="-11" width="32" height="22" rx="5"
              fill="#0b1220" stroke="#22d3ee" strokeWidth="1" opacity="0.55" />
            <text x="0" y="5" textAnchor="middle"
              fill="#22d3ee" fontSize="11" fontWeight="800"
              style={{ fontFamily: 'monospace', letterSpacing: '0.12em' }}>
              AI
            </text>
            <animate attributeName="opacity"
              values="0.3;0.85;0.3" dur="4.4s"
              begin={`${t.d}s`} repeatCount="indefinite" />
          </g>
        ))}
      </svg>
    </div>
  )
}
