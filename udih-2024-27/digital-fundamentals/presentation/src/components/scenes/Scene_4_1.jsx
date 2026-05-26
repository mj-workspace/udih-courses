// Scene 4.1 — Смартфон и таблет
// Pattern: compare — two glowing devices side by side, sharing the same app
// grid (same world, different size), controlled by finger gestures (tap on
// phone, swipe on tablet). The metaphor the guide narrates: a small computer
// in the pocket and a bigger one at home — both touch-driven.

// Shared palette for app icons. Repeating the same colors on both devices
// reinforces "same apps, different size".
const appColors = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#a78bfa', // purple
  '#22d3ee', // cyan
  '#f87171', // red
]

// Phone — 3 cols × 4 rows of icons inside the screen.
const PHONE = { fx: 170, fy: 130, fw: 160, fh: 320 }
const phoneIcons = []
for (let r = 0; r < 4; r++) {
  for (let c = 0; c < 3; c++) {
    phoneIcons.push({
      x: 196 + c * 40,
      y: 180 + r * 40,
      color: appColors[(r * 3 + c) % appColors.length],
      delay: ((r * 3 + c) * 0.35) % 5,
    })
  }
}

// Tablet — 4 cols × 4 rows of bigger icons.
const TABLET = { fx: 440, fy: 110, fw: 320, fh: 360 }
const tabletIcons = []
for (let r = 0; r < 4; r++) {
  for (let c = 0; c < 4; c++) {
    tabletIcons.push({
      x: 492 + c * 58,
      y: 182 + r * 58,
      color: appColors[(c + r) % appColors.length],
      delay: ((r * 4 + c) * 0.3) % 4.8,
    })
  }
}

export default function Scene_4_1() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s41-screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0b1220" />
            <stop offset="100%" stopColor="#06101f" />
          </linearGradient>
          <linearGradient id="s41-frame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <radialGradient id="s41-halo">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.35" />
            <stop offset="80%" stopColor="#1e3a8a" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <filter id="s41-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <path id="s41-swipe" d="M 480 430 Q 620 460 740 430" />
        </defs>

        {/* Ambient halos behind both devices */}
        <circle cx="250" cy="290" r="180" fill="url(#s41-halo)" />
        <circle cx="600" cy="290" r="220" fill="url(#s41-halo)" />

        {/* Faint slow-rotating ring tying them together */}
        <ellipse
          cx="450" cy="290" rx="370" ry="220" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 11"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from="0 450 290" to="360 450 290"
            dur="56s" repeatCount="indefinite"
          />
        </ellipse>

        {/* ============================================================ */}
        {/* PHONE — small, mobile, in-the-pocket                         */}
        {/* ============================================================ */}
        <g>
          {/* Label above */}
          <text x="250" y="108" textAnchor="middle" fill="#93c5fd"
            fontSize="14" fontWeight="700" style={{ letterSpacing: '0.22em' }}>
            СМАРТФОН
          </text>

          {/* Body frame */}
          <rect
            x={PHONE.fx} y={PHONE.fy} width={PHONE.fw} height={PHONE.fh}
            rx="22" fill="url(#s41-frame)"
            stroke="#3b82f6" strokeWidth="1.6" filter="url(#s41-glow)"
          >
            <animate
              attributeName="stroke-opacity" values="0.55;1;0.55"
              dur="3.8s" repeatCount="indefinite"
            />
          </rect>

          {/* Screen */}
          <rect
            x="180" y="160" width="140" height="270" rx="6"
            fill="url(#s41-screen)" stroke="#1e3a8a" strokeWidth="0.8"
          />
          {/* Top speaker slot */}
          <rect x="232" y="145" width="36" height="4" rx="2" fill="#0f172a" stroke="#1e293b" strokeWidth="0.6" />
          {/* Home indicator */}
          <rect x="222" y="438" width="56" height="3.5" rx="1.8" fill="#334155" />

          {/* App grid */}
          {phoneIcons.map((ic, i) => (
            <g key={`p-${i}`}>
              <rect
                x={ic.x} y={ic.y} width="28" height="28" rx="6"
                fill={ic.color} fillOpacity="0.85"
              >
                <animate
                  attributeName="fill-opacity"
                  values="0.55;0.95;0.55" dur="4.5s"
                  begin={`${ic.delay}s`} repeatCount="indefinite"
                />
              </rect>
            </g>
          ))}

          {/* TAP gesture — pulsing ring on a centre icon */}
          <g>
            <circle cx="250" cy="234" r="14" fill="none"
              stroke="#22d3ee" strokeWidth="1.8" opacity="0">
              <animate attributeName="r" values="14;30" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="250" cy="234" r="14" fill="none"
              stroke="#22d3ee" strokeWidth="1.4" opacity="0">
              <animate attributeName="r" values="14;30" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
            </circle>
            {/* Finger dot */}
            <circle cx="250" cy="234" r="5" fill="#22d3ee" filter="url(#s41-glow)">
              <animate attributeName="r" values="5;6.5;5" dur="2.4s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Sub label */}
          <text x="250" y="478" textAnchor="middle" fill="#94a3b8" fontSize="12">
            в джоба, винаги с теб
          </text>
        </g>

        {/* ============================================================ */}
        {/* TABLET — bigger, calmer, at home                              */}
        {/* ============================================================ */}
        <g>
          {/* Label above */}
          <text x="600" y="92" textAnchor="middle" fill="#c4b5fd"
            fontSize="14" fontWeight="700" style={{ letterSpacing: '0.22em' }}>
            ТАБЛЕТ
          </text>

          {/* Body frame */}
          <rect
            x={TABLET.fx} y={TABLET.fy} width={TABLET.fw} height={TABLET.fh}
            rx="18" fill="url(#s41-frame)"
            stroke="#a78bfa" strokeWidth="1.6" filter="url(#s41-glow)"
          >
            <animate
              attributeName="stroke-opacity" values="0.55;1;0.55"
              dur="4.2s" begin="0.6s" repeatCount="indefinite"
            />
          </rect>

          {/* Camera dot */}
          <circle cx="600" cy="122" r="2.4" fill="#0f172a" stroke="#1e293b" strokeWidth="0.6" />

          {/* Screen */}
          <rect
            x="455" y="132" width="290" height="316" rx="5"
            fill="url(#s41-screen)" stroke="#1e3a8a" strokeWidth="0.8"
          />

          {/* App grid */}
          {tabletIcons.map((ic, i) => (
            <g key={`t-${i}`}>
              <rect
                x={ic.x} y={ic.y} width="40" height="40" rx="8"
                fill={ic.color} fillOpacity="0.85"
              >
                <animate
                  attributeName="fill-opacity"
                  values="0.55;0.95;0.55" dur="5s"
                  begin={`${ic.delay}s`} repeatCount="indefinite"
                />
              </rect>
            </g>
          ))}

          {/* SWIPE gesture — finger sliding across the screen */}
          <g>
            {/* Trail */}
            <use href="#s41-swipe" stroke="#22d3ee" strokeWidth="2"
              fill="none" strokeLinecap="round"
              strokeDasharray="6 8" opacity="0.55">
              <animate attributeName="stroke-dashoffset" from="14" to="0"
                dur="1.8s" repeatCount="indefinite" />
            </use>
            {/* Finger dot traveling along the path */}
            <g>
              <circle r="14" fill="none" stroke="#22d3ee" strokeWidth="1.4" opacity="0.5">
                <animateMotion dur="3.4s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#s41-swipe" />
                </animateMotion>
              </circle>
              <circle r="6" fill="#22d3ee" filter="url(#s41-glow)">
                <animateMotion dur="3.4s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#s41-swipe" />
                </animateMotion>
              </circle>
            </g>
          </g>

          {/* Sub label */}
          <text x="600" y="494" textAnchor="middle" fill="#94a3b8" fontSize="12">
            у дома, на спокойствие
          </text>
        </g>

        {/* ============================================================ */}
        {/* Bridge between them — "same world" cue                        */}
        {/* ============================================================ */}
        <g opacity="0.55">
          <line x1="340" y1="290" x2="430" y2="290"
            stroke="#475569" strokeWidth="1" strokeDasharray="3 5" />
          {/* tiny app icon traveling from phone to tablet */}
          <rect width="14" height="14" rx="3" fill="#10b981" opacity="0.9">
            <animateMotion dur="4.6s" repeatCount="indefinite"
              path="M 333 283 L 423 283" />
            <animate attributeName="opacity" values="0;1;1;0"
              keyTimes="0;0.15;0.85;1" dur="4.6s" repeatCount="indefinite" />
          </rect>
          {/* and one going back, to imply two-way familiarity */}
          <rect width="14" height="14" rx="3" fill="#3b82f6" opacity="0.9">
            <animateMotion dur="4.6s" begin="2.3s" repeatCount="indefinite"
              path="M 423 297 L 333 297" />
            <animate attributeName="opacity" values="0;1;1;0"
              keyTimes="0;0.15;0.85;1" dur="4.6s" begin="2.3s" repeatCount="indefinite" />
          </rect>
        </g>

        {/* ============================================================ */}
        {/* Bottom verdict caption                                        */}
        {/* ============================================================ */}
        <text x="450" y="516" textAnchor="middle" fill="#e2e8f0"
          fontSize="13.5" fontWeight="600">
          един джобен компютър — две лица, един пръст ги движи
        </text>
      </svg>
    </div>
  )
}
