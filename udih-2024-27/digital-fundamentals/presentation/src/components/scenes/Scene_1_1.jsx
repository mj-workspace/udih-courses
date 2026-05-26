// Scene 1.1 — Хардуер срещу софтуер
// Pattern: compare — two panels (touchable parts vs programs inside) feed a
// central machine that comes alive and cycles through roles. The metaphor:
// neither half does anything alone; together they make a working computer.

const CX = 450
const CY = 280

// Left panel — hardware: physical devices you can touch.
const hardware = [
  { id: 'mon', label: 'Монитор', y: 212 },
  { id: 'kbd', label: 'Клавиатура', y: 278 },
  { id: 'box', label: 'Кутия', y: 344 },
]

// Right panel — software: programs running inside.
const software = [
  { id: 'os', label: 'Windows', y: 212 },
  { id: 'mail', label: 'Имейл', y: 278 },
  { id: 'web', label: 'Браузър', y: 344 },
]

// Small device glyphs for the hardware rows, drawn around (0,0).
function HardwareGlyph({ kind }) {
  if (kind === 'mon') {
    return (
      <g>
        <rect x="-11" y="-9" width="22" height="15" rx="1.5" />
        <line x1="0" y1="6" x2="0" y2="10" />
        <line x1="-5" y1="10" x2="5" y2="10" />
      </g>
    )
  }
  if (kind === 'kbd') {
    return (
      <g>
        <rect x="-12" y="-6" width="24" height="12" rx="2" />
        <line x1="-7" y1="-1" x2="7" y2="-1" />
        <line x1="-7" y1="3" x2="3" y2="3" />
      </g>
    )
  }
  return (
    <g>
      <rect x="-7" y="-11" width="14" height="22" rx="2" />
      <circle cx="0" cy="-6" r="1.6" />
      <line x1="-3" y1="0" x2="3" y2="0" />
      <line x1="-3" y1="4" x2="3" y2="4" />
    </g>
  )
}

// Small program-window glyphs for the software rows, drawn around (0,0).
function SoftwareGlyph() {
  return (
    <g>
      <rect x="-11" y="-8" width="22" height="16" rx="2" />
      <line x1="-11" y1="-3" x2="11" y2="-3" />
      <circle cx="-7.5" cy="-5.5" r="1" />
      <circle cx="-4" cy="-5.5" r="1" />
    </g>
  )
}

export default function Scene_1_1() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s11-core-grad">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.45" />
            <stop offset="80%" stopColor="#1e3a8a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s11-hw-panel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#0b1220" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="s11-sw-panel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#0b1220" stopOpacity="0.5" />
          </linearGradient>
          <filter id="s11-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <path id="s11-link-l" d={`M 286 ${CY} L ${CX - 78} ${CY}`} />
          <path id="s11-link-r" d={`M 614 ${CY} L ${CX + 78} ${CY}`} />
        </defs>

        {/* Ambient rotating ring behind the central machine */}
        <circle
          cx={CX} cy={CY} r="168" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 10"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="54s" repeatCount="indefinite"
          />
        </circle>

        {/* ---- Left panel: ХАРДУЕР ---- */}
        <g>
          <rect
            x="70" y="150" width="216" height="262" rx="14"
            fill="url(#s11-hw-panel)" stroke="#3b82f6" strokeWidth="1.2"
            strokeOpacity="0.55"
          />
          <text x="178" y="180" textAnchor="middle" fill="#93c5fd"
            fontSize="15" fontWeight="700" style={{ letterSpacing: '0.18em' }}>
            ХАРДУЕР
          </text>
          <text x="178" y="197" textAnchor="middle" fill="#64748b" fontSize="10.5">
            можеш да го пипнеш
          </text>
          {hardware.map((h, i) => (
            <g key={h.id}>
              <rect
                x="92" y={h.y - 22} width="172" height="44" rx="8"
                fill="#0b1220" stroke="#3b82f6" strokeWidth="0.8" strokeOpacity="0.4"
              />
              <g
                transform={`translate(120 ${h.y})`}
                fill="none" stroke="#60a5fa" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <HardwareGlyph kind={h.id} />
              </g>
              <text x="150" y={h.y + 4} fill="#e2e8f0" fontSize="13" fontWeight="600">
                {h.label}
              </text>
              {/* solid "tap" pulse — tangible */}
              <circle cx="120" cy={h.y} r="16" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0">
                <animate attributeName="r" values="16;26" dur="3.6s" begin={`${i * 0.9}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0" dur="3.6s" begin={`${i * 0.9}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
        </g>

        {/* ---- Right panel: СОФТУЕР ---- */}
        <g>
          <rect
            x="614" y="150" width="216" height="262" rx="14"
            fill="url(#s11-sw-panel)" stroke="#a78bfa" strokeWidth="1.2"
            strokeOpacity="0.55"
          />
          <text x="722" y="180" textAnchor="middle" fill="#c4b5fd"
            fontSize="15" fontWeight="700" style={{ letterSpacing: '0.18em' }}>
            СОФТУЕР
          </text>
          <text x="722" y="197" textAnchor="middle" fill="#64748b" fontSize="10.5">
            програмите вътре
          </text>
          {software.map((s, i) => (
            <g key={s.id}>
              {/* floating bob — intangible */}
              <animateTransform
                attributeName="transform" type="translate"
                values="0 0; 0 -3.5; 0 0" dur={`${4.4 + i * 0.6}s`}
                begin={`${i * 0.5}s`} repeatCount="indefinite"
              />
              <rect
                x="636" y={s.y - 22} width="172" height="44" rx="8"
                fill="#0b1220" stroke="#a78bfa" strokeWidth="0.8" strokeOpacity="0.4"
              />
              <g
                transform={`translate(664 ${s.y})`}
                fill="none" stroke="#c4b5fd" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
                filter="url(#s11-glow)"
              >
                <SoftwareGlyph />
              </g>
              <text x="690" y={s.y + 4} fill="#e2e8f0" fontSize="13" fontWeight="600">
                {s.label}
              </text>
            </g>
          ))}
        </g>

        {/* ---- Connections feeding the central machine ---- */}
        {[
          { id: 's11-link-l', color: '#3b82f6' },
          { id: 's11-link-r', color: '#a78bfa' },
        ].map((lnk) => (
          <g key={lnk.id}>
            <use href={`#${lnk.id}`} stroke="#334155" strokeWidth="1.2"
              strokeDasharray="4 6" opacity="0.6" fill="none">
              <animate attributeName="stroke-dashoffset" from="10" to="0"
                dur="1.4s" repeatCount="indefinite" />
            </use>
            <circle r="3.6" fill={lnk.color} filter="url(#s11-glow)">
              <animateMotion dur="2.6s" repeatCount="indefinite">
                <mpath href={`#${lnk.id}`} />
              </animateMotion>
              <animate attributeName="opacity" values="0.2;1;0.2"
                dur="2.6s" repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* ---- Central machine: comes alive, cycles roles ---- */}
        <g transform={`translate(${CX} ${CY})`}>
          <circle r="118" fill="url(#s11-core-grad)" />
          {[0, 1.6, 3.2].map((d, i) => (
            <circle key={i} r="76" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="76;128" dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0" dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Monitor frame */}
          <rect x="-78" y="-58" width="156" height="104" rx="9"
            fill="#0b1220" stroke="#60a5fa" strokeWidth="2.2" filter="url(#s11-glow)">
            <animate attributeName="stroke-opacity" values="0.6;1;0.6"
              dur="3.4s" repeatCount="indefinite" />
          </rect>
          {/* Screen */}
          <rect x="-66" y="-46" width="132" height="80" rx="4"
            fill="#06101f" stroke="#1e3a8a" strokeWidth="1" />
          {/* Stand */}
          <line x1="0" y1="46" x2="0" y2="58" stroke="#60a5fa" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="-16" y1="58" x2="16" y2="58" stroke="#60a5fa" strokeWidth="3.5" strokeLinecap="round" />

          {/* Cycling role glyphs on the screen — една машина, много роли */}
          {/* Role 1: документ */}
          <g fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <g transform="translate(0 -8)">
              <rect x="-15" y="-19" width="30" height="38" rx="2.5" />
              <line x1="-8" y1="-9" x2="8" y2="-9" />
              <line x1="-8" y1="-1" x2="8" y2="-1" />
              <line x1="-8" y1="7" x2="3" y2="7" />
            </g>
            <animate attributeName="opacity" values="1;1;0;0;1"
              keyTimes="0;0.30;0.37;0.96;1" dur="9s" repeatCount="indefinite" />
          </g>
          {/* Role 2: музика */}
          <g fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0">
            <g transform="translate(0 -8)">
              <path d="M -2 -16 V 11" />
              <path d="M -2 -16 L 15 -20 V 6" />
              <circle cx="-9" cy="11" r="7" fill="#34d399" stroke="none" />
              <circle cx="8" cy="6" r="7" fill="#34d399" stroke="none" />
            </g>
            <animate attributeName="opacity" values="0;0;1;1;0;0"
              keyTimes="0;0.30;0.37;0.63;0.70;1" dur="9s" repeatCount="indefinite" />
          </g>
          {/* Role 3: видеоразговор */}
          <g fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0">
            <g transform="translate(0 -8)">
              <rect x="-17" y="-12" width="26" height="24" rx="3" />
              <path d="M 9 -4 L 19 -10 V 10 L 9 4 Z" />
            </g>
            <animate attributeName="opacity" values="0;0;1;1;0"
              keyTimes="0;0.63;0.70;0.96;1" dur="9s" repeatCount="indefinite" />
          </g>
        </g>

        {/* ---- Verdict caption ---- */}
        <g>
          <text x={CX} y="468" textAnchor="middle" fill="#e2e8f0"
            fontSize="14" fontWeight="600">
            Заедно
          </text>
          <text x={CX} y="488" textAnchor="middle" fill="#94a3b8" fontSize="12">
            хардуер + софтуер = работещ компютър
          </text>
        </g>
      </svg>
    </div>
  )
}
