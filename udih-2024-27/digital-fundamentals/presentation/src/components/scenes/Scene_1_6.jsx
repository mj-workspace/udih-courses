// Scene 1.6 — Кратко за офис софтуера
// Pattern: side-by-side compare — three program panels (Word, Excel,
// PowerPoint) hanging from one "Офис пакет" node. Each panel shows the
// program's signature: a page that types itself, a sheet that sums numbers,
// a slide deck that advances. A glowing file-extension tag anchors each one.

const programs = [
  { id: 'word', cx: 270, color: '#3b82f6', light: '#60a5fa', letter: 'W',
    name: 'Word', ext: '.docx', purpose: 'Текстови документи' },
  { id: 'excel', cx: 470, color: '#10b981', light: '#34d399', letter: 'X',
    name: 'Excel', ext: '.xlsx', purpose: 'Таблици и сметки' },
  { id: 'ppt', cx: 670, color: '#f59e0b', light: '#fbbf24', letter: 'P',
    name: 'PowerPoint', ext: '.pptx', purpose: 'Презентации' },
]

// Word — a page that types itself line by line on a 7s loop.
function WordPage({ cx }) {
  const lines = [
    { y: 264, w: 60, t: 0.05, head: true },
    { y: 282, w: 70, t: 0.20 },
    { y: 295, w: 64, t: 0.33 },
    { y: 308, w: 70, t: 0.46 },
    { y: 321, w: 44, t: 0.59 },
  ]
  return (
    <g>
      <rect x={cx - 42} y="246" width="84" height="108" rx="3"
        fill="#dbe4f0" stroke="#94a3b8" strokeWidth="1" />
      {lines.map((l, i) => (
        <rect key={i} x={cx - 32} y={l.y} width="0"
          height={l.head ? 6 : 4} rx="2"
          fill={l.head ? '#1e3a8a' : '#475569'}>
          <animate attributeName="width" values={`0;0;${l.w};${l.w};0`}
            keyTimes={`0;${l.t};${(l.t + 0.1).toFixed(2)};0.9;1`}
            dur="7s" repeatCount="indefinite" />
        </rect>
      ))}
      {/* blinking caret */}
      <rect x={cx - 30} y="330" width="1.8" height="9" fill="#3b82f6">
        <animate attributeName="opacity" values="1;1;0;0;1"
          keyTimes="0;0.45;0.5;0.95;1" dur="1.1s" repeatCount="indefinite" />
      </rect>
    </g>
  )
}

// Excel — a sheet whose numbers fill in, then the green total row computes.
function ExcelSheet({ cx }) {
  const gx = cx - 42
  const gy = 250
  const cw = 28
  const rh = 20
  const nums = ['12', '7', '19', '5', '24', '8', '31', '6', '15']
  return (
    <g>
      <rect x={gx} y={gy} width="84" height="100" rx="2"
        fill="#0b1220" stroke="#34d399" strokeWidth="1.2" />
      {/* grid lines */}
      <g stroke="#1e3f33" strokeWidth="1">
        {[1, 2].map((c) => (
          <line key={`c${c}`} x1={gx + c * cw} y1={gy}
            x2={gx + c * cw} y2={gy + 100} />
        ))}
        {[1, 2, 3, 4].map((r) => (
          <line key={`r${r}`} x1={gx} y1={gy + r * rh}
            x2={gx + 84} y2={gy + r * rh} />
        ))}
      </g>
      {/* numbers fade in staggered */}
      {nums.map((n, i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        const t = 0.05 + i * 0.05
        return (
          <text key={i} x={gx + col * cw + cw / 2}
            y={gy + row * rh + rh / 2 + 3.5} textAnchor="middle"
            fill="#cbd5e1" fontSize="9.5" fontFamily="monospace" opacity="0">
            {n}
            <animate attributeName="opacity" values="0;0;1;1;0"
              keyTimes={`0;${t.toFixed(2)};${(t + 0.08).toFixed(2)};0.9;1`}
              dur="6.5s" repeatCount="indefinite" />
          </text>
        )
      })}
      {/* total row — computes after the numbers are in */}
      <rect x={gx} y={gy + 60} width="84" height="20" fill="#10b981"
        fillOpacity="0">
        <animate attributeName="fillOpacity" values="0;0;0.3;0.3;0"
          keyTimes="0;0.6;0.7;0.9;1" dur="6.5s" repeatCount="indefinite" />
      </rect>
      {['44', '37', '52'].map((s, i) => (
        <text key={i} x={gx + i * cw + cw / 2} y={gy + 73.5}
          textAnchor="middle" fill="#34d399" fontSize="9.5"
          fontFamily="monospace" fontWeight="700" opacity="0">
          {s}
          <animate attributeName="opacity" values="0;0;1;1;0"
            keyTimes={`0;${(0.66 + i * 0.04).toFixed(2)};${(0.74 + i * 0.04).toFixed(2)};0.9;1`}
            dur="6.5s" repeatCount="indefinite" />
        </text>
      ))}
      {/* sum glyph */}
      <text x={gx + 88} y={gy + 73.5} fill="#34d399" fontSize="13"
        fontWeight="700">Σ</text>
    </g>
  )
}

// PowerPoint — a slide deck; the active-slide dot cycles on a 6s loop.
function PptDeck({ cx }) {
  return (
    <g>
      {/* back slides */}
      <rect x={cx - 36} y="250" width="78" height="52" rx="3"
        fill="#0b1220" stroke="#7c5212" strokeWidth="1" />
      <rect x={cx - 42} y="257" width="84" height="56" rx="3"
        fill="#0b1220" stroke="#a3700f" strokeWidth="1.1" />
      {/* front slide */}
      <rect x={cx - 48} y="264" width="96" height="64" rx="3.5"
        fill="#111a2e" stroke="#fbbf24" strokeWidth="1.5" />
      <rect x={cx - 40} y="272" width="44" height="6" rx="2"
        fill="#f59e0b" />
      <rect x={cx - 40} y="285" width="60" height="3.5" rx="1.5"
        fill="#475569" />
      <rect x={cx - 40} y="293" width="52" height="3.5" rx="1.5"
        fill="#475569" />
      {/* mini bar chart on the slide */}
      <g>
        {[10, 16, 8].map((h, i) => (
          <rect key={i} x={cx + 16 + i * 9} y={320 - h} width="6"
            height={h} rx="1" fill="#fbbf24">
            <animate attributeName="height" values={`0;${h};${h};0`}
              keyTimes={`0;${(0.15 + i * 0.08).toFixed(2)};0.85;1`}
              dur="6s" repeatCount="indefinite" />
            <animate attributeName="y"
              values={`320;${320 - h};${320 - h};320`}
              keyTimes={`0;${(0.15 + i * 0.08).toFixed(2)};0.85;1`}
              dur="6s" repeatCount="indefinite" />
          </rect>
        ))}
      </g>
      {/* active-slide dots */}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={cx - 12 + i * 12} cy="342" r="3.2"
          fill="#fbbf24">
          <animate attributeName="opacity" values="0.25;0.25;1;0.25;0.25"
            keyTimes={`0;${(i * 0.33).toFixed(2)};${(i * 0.33 + 0.11).toFixed(2)};${(i * 0.33 + 0.22).toFixed(2)};1`}
            dur="6s" repeatCount="indefinite" />
        </circle>
      ))}
    </g>
  )
}

export default function Scene_1_6() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="s16-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ===== Connectors: Офис пакет → three panels ===== */}
        {programs.map((p, i) => (
          <g key={`link-${p.id}`}>
            <line x1="450" y1="122" x2={p.cx} y2="150" stroke="#334155"
              strokeWidth="1.2" strokeDasharray="4 5">
              <animate attributeName="stroke-dashoffset" from="9" to="0"
                dur="1.6s" repeatCount="indefinite" />
            </line>
            <circle r="3.4" fill={p.light} filter="url(#s16-glow)">
              <animateMotion dur={`${2.6 + i * 0.4}s`} repeatCount="indefinite"
                path={`M 450 122 L ${p.cx} 150`} />
              <animate attributeName="opacity" values="0;1;1;0"
                dur={`${2.6 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* ===== Top node ===== */}
        <g filter="url(#s16-glow)">
          <rect x="386" y="92" width="128" height="30" rx="15"
            fill="#0b1220" stroke="#60a5fa" strokeWidth="1.6">
            <animate attributeName="stroke-opacity" values="0.6;1;0.6"
              dur="3.6s" repeatCount="indefinite" />
          </rect>
        </g>
        <text x="450" y="112" textAnchor="middle" fill="#e2e8f0"
          fontSize="14" fontWeight="700">
          Офис пакет
        </text>

        {/* ===== Program panels ===== */}
        {programs.map((p) => (
          <g key={p.id}>
            {/* panel frame */}
            <rect x={p.cx - 95} y="150" width="190" height="308" rx="12"
              fill="#0b1220" stroke={p.color} strokeWidth="1.8">
              <animate attributeName="stroke-opacity" values="0.65;1;0.65"
                dur="4s" repeatCount="indefinite" />
            </rect>

            {/* app icon */}
            <g filter="url(#s16-glow)">
              <rect x={p.cx - 17} y="169" width="34" height="34" rx="6"
                fill={p.color} />
            </g>
            <text x={p.cx} y="192" textAnchor="middle" fill="#0b1220"
              fontSize="20" fontWeight="800">
              {p.letter}
            </text>
            {/* name */}
            <text x={p.cx} y="226" textAnchor="middle" fill="#e2e8f0"
              fontSize="15.5" fontWeight="700">
              {p.name}
            </text>

            {/* signature graphic */}
            {p.id === 'word' && <WordPage cx={p.cx} />}
            {p.id === 'excel' && <ExcelSheet cx={p.cx} />}
            {p.id === 'ppt' && <PptDeck cx={p.cx} />}

            {/* purpose */}
            <text x={p.cx} y="390" textAnchor="middle" fill="#94a3b8"
              fontSize="11.5">
              {p.purpose}
            </text>

            {/* file-extension tag */}
            <g filter="url(#s16-glow)">
              <rect x={p.cx - 33} y="408" width="66" height="24" rx="12"
                fill="#111a2e" stroke={p.light} strokeWidth="1.5">
                <animate attributeName="stroke-opacity" values="0.5;1;0.5"
                  dur="2.8s" repeatCount="indefinite" />
              </rect>
            </g>
            <text x={p.cx} y="424" textAnchor="middle" fill={p.light}
              fontSize="12.5" fontWeight="700" fontFamily="monospace">
              {p.ext}
            </text>
          </g>
        ))}

        {/* Takeaway caption */}
        <text x="450" y="492" textAnchor="middle" fill="#94a3b8"
          fontSize="12.5">
          Microsoft Office или Google Workspace — върши същата работа
        </text>
      </svg>
    </div>
  )
}
