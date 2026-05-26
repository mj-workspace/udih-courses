// Scene 4.2 — Мобилни операционни системи
// Pattern: side-by-side compare — Android phone (green, many brand chips,
// Google Play) vs iOS phone (blue, only iPhone chip, App Store + apple logo).
// The metaphor the guide narrates: two systems run the phone world; you can
// always tell which is which by the logo and by the store icon.

const ANDROID = { fx: 175, fy: 130, fw: 150, fh: 300, cx: 250, cy: 280, color: '#10b981', soft: '#34d399' }
const IOS = { fx: 575, fy: 130, fw: 150, fh: 300, cx: 650, cy: 280, color: '#60a5fa', soft: '#93c5fd' }

const androidBrands = [
  { x: 175, y: 470, label: 'Samsung' },
  { x: 250, y: 470, label: 'Xiaomi' },
  { x: 325, y: 470, label: 'Huawei' },
  { x: 212, y: 500, label: 'Motorola' },
  { x: 288, y: 500, label: 'Nokia' },
]

export default function Scene_4_2() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s42-screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0b1220" />
            <stop offset="100%" stopColor="#06101f" />
          </linearGradient>
          <linearGradient id="s42-frame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <radialGradient id="s42-halo-green">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
            <stop offset="80%" stopColor="#064e3b" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s42-halo-blue">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.32" />
            <stop offset="80%" stopColor="#1e3a8a" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <filter id="s42-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Top bridging caption — phone = computer -> needs OS */}
        <g transform="translate(450 78)">
          <rect x="-148" y="-18" width="296" height="32" rx="16"
            fill="#0b1220" stroke="#334155" strokeWidth="0.8" opacity="0.85" />
          <text x="0" y="3" textAnchor="middle" fill="#e2e8f0"
            fontSize="13" fontWeight="600" dominantBaseline="middle">
            телефон = компютър → има операционна система
          </text>
        </g>

        {/* Ambient halos */}
        <circle cx={ANDROID.cx} cy={ANDROID.cy} r="190" fill="url(#s42-halo-green)" />
        <circle cx={IOS.cx} cy={IOS.cy} r="190" fill="url(#s42-halo-blue)" />

        {/* Faint connecting ellipse — two halves of the same world */}
        <ellipse cx="450" cy="290" rx="380" ry="210" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 11">
          <animateTransform
            attributeName="transform" type="rotate"
            from="0 450 290" to="360 450 290"
            dur="58s" repeatCount="indefinite"
          />
        </ellipse>

        {/* ============================================================ */}
        {/* ANDROID — left phone                                          */}
        {/* ============================================================ */}
        <g>
          {/* Section label above */}
          <text x={ANDROID.cx} y="108" textAnchor="middle" fill={ANDROID.soft}
            fontSize="14" fontWeight="700" style={{ letterSpacing: '0.24em' }}>
            ANDROID
          </text>

          {/* Body frame */}
          <rect
            x={ANDROID.fx} y={ANDROID.fy} width={ANDROID.fw} height={ANDROID.fh}
            rx="22" fill="url(#s42-frame)"
            stroke={ANDROID.color} strokeWidth="1.6" filter="url(#s42-glow)"
          >
            <animate
              attributeName="stroke-opacity" values="0.55;1;0.55"
              dur="3.8s" repeatCount="indefinite"
            />
          </rect>

          {/* Screen */}
          <rect
            x="185" y="160" width="130" height="250" rx="6"
            fill="url(#s42-screen)" stroke="#064e3b" strokeWidth="0.8"
          />
          <rect x="232" y="145" width="36" height="4" rx="2" fill="#0f172a" stroke="#1e293b" strokeWidth="0.6" />
          <rect x="222" y="418" width="56" height="3.5" rx="1.8" fill="#334155" />

          {/* Inside the screen — OS pulsing core */}
          <g transform={`translate(${ANDROID.cx} 230)`}>
            <circle r="34" fill="none" stroke={ANDROID.color} strokeWidth="1" opacity="0">
              <animate attributeName="r" values="34;58" dur="3.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.55;0" dur="3.6s" repeatCount="indefinite" />
            </circle>
            <circle r="34" fill="none" stroke={ANDROID.color} strokeWidth="1" opacity="0">
              <animate attributeName="r" values="34;58" dur="3.6s" begin="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.55;0" dur="3.6s" begin="1.8s" repeatCount="indefinite" />
            </circle>
            <circle r="34" fill="#0b1220" stroke={ANDROID.color} strokeWidth="2" filter="url(#s42-glow)" />
            <text x="0" y="-4" textAnchor="middle" fill={ANDROID.soft}
              fontSize="11" fontWeight="700" style={{ letterSpacing: '0.18em' }}>
              ОС
            </text>
            <text x="0" y="11" textAnchor="middle" fill="#e2e8f0"
              fontSize="11" fontWeight="600">
              Android
            </text>
          </g>

          {/* Google Play badge inside screen */}
          <g transform={`translate(${ANDROID.cx} 310)`}>
            <rect x="-46" y="-14" width="92" height="28" rx="14"
              fill="#0f172a" stroke={ANDROID.color} strokeWidth="1" opacity="0.95" />
            {/* Stylised play triangle, multi-color slice cue */}
            <polygon points="-32,-7 -32,7 -22,0" fill={ANDROID.color} />
            <polygon points="-32,-7 -27,-4 -22,0" fill="#34d399" opacity="0.85" />
            <text x="-12" y="4" fill="#e2e8f0" fontSize="11" fontWeight="600">
              Google Play
            </text>
          </g>

          {/* App row at bottom of screen */}
          <g>
            {[0, 1, 2, 3].map((i) => (
              <rect key={i}
                x={198 + i * 28} y="370" width="20" height="20" rx="4"
                fill={['#10b981', '#34d399', '#22d3ee', '#a78bfa'][i]}
                fillOpacity="0.85"
              >
                <animate attributeName="fill-opacity"
                  values="0.55;0.95;0.55" dur="4.5s"
                  begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </rect>
            ))}
          </g>

          {/* Brand chips below — "many makers" */}
          {androidBrands.map((b, i) => (
            <g key={b.label} transform={`translate(${b.x} ${b.y})`}>
              <rect x="-32" y="-9" width="64" height="18" rx="9"
                fill="#0f172a" stroke="#334155" strokeWidth="0.8" opacity="0.9">
                <animate attributeName="stroke-opacity"
                  values="0.4;0.9;0.4" dur="4s"
                  begin={`${i * 0.5}s`} repeatCount="indefinite" />
              </rect>
              <text x="0" y="3" textAnchor="middle" fill="#94a3b8"
                fontSize="9" fontWeight="600"
                style={{ letterSpacing: '0.04em' }}>
                {b.label}
              </text>
            </g>
          ))}

          {/* Sub label */}
          <text x={ANDROID.cx} y="535" textAnchor="middle" fill="#94a3b8" fontSize="12">
            много марки телефони
          </text>
        </g>

        {/* ============================================================ */}
        {/* iOS — right phone                                             */}
        {/* ============================================================ */}
        <g>
          {/* Section label above */}
          <text x={IOS.cx} y="108" textAnchor="middle" fill={IOS.soft}
            fontSize="14" fontWeight="700" style={{ letterSpacing: '0.24em' }}>
            iOS
          </text>

          {/* Body frame */}
          <rect
            x={IOS.fx} y={IOS.fy} width={IOS.fw} height={IOS.fh}
            rx="22" fill="url(#s42-frame)"
            stroke={IOS.color} strokeWidth="1.6" filter="url(#s42-glow)"
          >
            <animate
              attributeName="stroke-opacity" values="0.55;1;0.55"
              dur="4.2s" begin="0.6s" repeatCount="indefinite"
            />
          </rect>

          {/* Screen */}
          <rect
            x="585" y="160" width="130" height="250" rx="6"
            fill="url(#s42-screen)" stroke="#1e3a8a" strokeWidth="0.8"
          />
          <rect x="632" y="145" width="36" height="4" rx="2" fill="#0f172a" stroke="#1e293b" strokeWidth="0.6" />
          <rect x="622" y="418" width="56" height="3.5" rx="1.8" fill="#334155" />

          {/* Inside the screen — OS pulsing core */}
          <g transform={`translate(${IOS.cx} 230)`}>
            <circle r="34" fill="none" stroke={IOS.color} strokeWidth="1" opacity="0">
              <animate attributeName="r" values="34;58" dur="3.6s" begin="0.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.55;0" dur="3.6s" begin="0.4s" repeatCount="indefinite" />
            </circle>
            <circle r="34" fill="none" stroke={IOS.color} strokeWidth="1" opacity="0">
              <animate attributeName="r" values="34;58" dur="3.6s" begin="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.55;0" dur="3.6s" begin="2.2s" repeatCount="indefinite" />
            </circle>
            <circle r="34" fill="#0b1220" stroke={IOS.color} strokeWidth="2" filter="url(#s42-glow)" />
            {/* Apple silhouette in the centre — bitten apple + leaf */}
            <g transform="translate(0 1)">
              <path
                d="M -10 -6 C -16 -6 -16 4 -14 8 C -12 12 -8 14 -5 13 C -3 12 -1 12 1 13 C 4 14 8 12 10 8 C 12 4 12 -6 6 -6 C 3 -6 1 -4 0 -4 C -1 -4 -3 -6 -6 -6 C -7 -6 -9 -6 -10 -6 Z"
                fill={IOS.soft}
              />
              <path d="M 2 -8 C 3 -11 6 -12 7 -10 C 7 -8 5 -7 3 -7 Z" fill={IOS.soft} />
              {/* tiny bite on the right */}
              <circle cx="9" cy="0" r="3" fill="#0b1220" />
            </g>
            <text x="0" y="22" textAnchor="middle" fill="#e2e8f0"
              fontSize="10" fontWeight="600">
              iOS
            </text>
          </g>

          {/* App Store badge inside screen */}
          <g transform={`translate(${IOS.cx} 310)`}>
            <rect x="-46" y="-14" width="92" height="28" rx="14"
              fill="#0f172a" stroke={IOS.color} strokeWidth="1" opacity="0.95" />
            {/* Stylised "A" (App Store mark) */}
            <g transform="translate(-30 0)">
              <circle r="10" fill="none" stroke={IOS.soft} strokeWidth="1.2" />
              <path d="M -4 4 L 0 -5 L 4 4 M -2.4 1 L 2.4 1" stroke={IOS.soft}
                strokeWidth="1.4" fill="none" strokeLinecap="round" />
            </g>
            <text x="-10" y="4" fill="#e2e8f0" fontSize="11" fontWeight="600">
              App Store
            </text>
          </g>

          {/* App row at bottom of screen */}
          <g>
            {[0, 1, 2, 3].map((i) => (
              <rect key={i}
                x={598 + i * 28} y="370" width="20" height="20" rx="4"
                fill={['#60a5fa', '#93c5fd', '#a78bfa', '#22d3ee'][i]}
                fillOpacity="0.85"
              >
                <animate attributeName="fill-opacity"
                  values="0.55;0.95;0.55" dur="4.5s"
                  begin={`${i * 0.4 + 0.5}s`} repeatCount="indefinite" />
              </rect>
            ))}
          </g>

          {/* Single brand chip below — "only iPhone" */}
          <g transform={`translate(${IOS.cx} 475)`}>
            <rect x="-44" y="-12" width="88" height="24" rx="12"
              fill="#0f172a" stroke={IOS.color} strokeWidth="1.2" opacity="0.95"
              filter="url(#s42-glow)">
              <animate attributeName="stroke-opacity"
                values="0.5;1;0.5" dur="3.4s" repeatCount="indefinite" />
            </rect>
            <text x="0" y="4" textAnchor="middle" fill="#e2e8f0"
              fontSize="11" fontWeight="700"
              style={{ letterSpacing: '0.05em' }}>
              iPhone
            </text>
          </g>
          {/* Lonely dots — emphasising "only one" */}
          <circle cx="595" cy="475" r="1.5" fill="#475569" />
          <circle cx="705" cy="475" r="1.5" fill="#475569" />

          {/* Sub label */}
          <text x={IOS.cx} y="535" textAnchor="middle" fill="#94a3b8" fontSize="12">
            само на iPhone
          </text>
        </g>

        {/* ============================================================ */}
        {/* Centre divider — small "vs" cue                               */}
        {/* ============================================================ */}
        <g transform="translate(450 290)">
          <line x1="0" y1="-90" x2="0" y2="90"
            stroke="#334155" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.7" />
          <circle r="14" fill="#0b1220" stroke="#475569" strokeWidth="1">
            <animate attributeName="stroke-opacity"
              values="0.5;1;0.5" dur="4s" repeatCount="indefinite" />
          </circle>
          <text x="0" y="3" textAnchor="middle" fill="#94a3b8"
            fontSize="10" fontWeight="700" style={{ letterSpacing: '0.1em' }}>
            или
          </text>
        </g>
      </svg>
    </div>
  )
}
