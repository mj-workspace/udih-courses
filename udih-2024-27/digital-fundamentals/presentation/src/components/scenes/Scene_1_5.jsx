// Scene 1.5 — Работа с файлове и папки
// Pattern: layered system / tree — a folder hierarchy. A root folder branches
// to three subfolders; the first ("Жалби 2026") is open and holds files.
// A new file token drops into it (filing), and a search scan sweeps the files
// so they light up one by one. The metaphor the guide narrates: подредба като
// дърво — всеки файл си има място, и търсенето го намира.

// A folder icon drawn around (0,0): a tab + body, label below.
function Folder({ x, y, label, accent }) {
  const stroke = accent ? '#22d3ee' : '#60a5fa'
  const fill = accent ? '#1e3a8a' : '#172554'
  return (
    <g transform={`translate(${x} ${y})`}>
      {accent && (
        <rect x="-40" y="-27" width="80" height="50" rx="7" fill="none"
          stroke="#22d3ee" strokeWidth="1.4" opacity="0">
          <animate attributeName="opacity" values="0.45;0.1;0.45"
            dur="4.2s" repeatCount="indefinite" />
        </rect>
      )}
      <path d="M -32 -12 L -32 -20 L -16 -20 L -10 -12 Z" fill={fill}
        stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
      <rect x="-32" y="-12" width="64" height="32" rx="3" fill={fill}
        stroke={stroke} strokeWidth="1.6" />
      <text x="0" y="35" textAnchor="middle" fill="#cbd5e1" fontSize="11.5"
        fontWeight={accent ? 700 : 500}>
        {label}
      </text>
    </g>
  )
}

// A document/file glyph drawn around (0,0): page with a folded corner.
function FileGlyph({ label }) {
  return (
    <g>
      <path d="M -14 -17 L 6 -17 L 14 -9 L 14 17 L -14 17 Z"
        fill="#0f172a" stroke="#64748b" strokeWidth="1.5"
        strokeLinejoin="round" />
      <path d="M 6 -17 L 6 -9 L 14 -9" fill="none" stroke="#64748b"
        strokeWidth="1.5" strokeLinejoin="round" />
      {[-6, 1, 8].map((ly) => (
        <line key={ly} x1="-8" y1={ly} x2="7" y2={ly}
          stroke="#475569" strokeWidth="1.7" strokeLinecap="round" />
      ))}
      {label && (
        <text x="0" y="31" textAnchor="middle" fill="#94a3b8" fontSize="10">
          {label}
        </text>
      )}
    </g>
  )
}

// The three files inside the open folder. `f` = scan-fraction when the search
// line passes over the file (drives its glow on the shared 6s loop).
const files = [
  { x: 240, label: 'Иванов', f: 0.11 },
  { x: 300, label: 'Петров', f: 0.50 },
  { x: 360, label: 'Колев', f: 0.89 },
]

export default function Scene_1_5() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="s15-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient: slow rotating dashed ring for life */}
        <circle cx="450" cy="288" r="238" fill="none" stroke="#1e293b"
          strokeWidth="0.6" strokeDasharray="3 10">
          <animateTransform attributeName="transform" type="rotate"
            from="0 450 288" to="360 450 288" dur="55s"
            repeatCount="indefinite" />
        </circle>

        {/* ===== Tree connectors ===== */}
        <g fill="none" stroke="#334155" strokeWidth="1.4"
          strokeDasharray="4 5">
          {/* root → children bus */}
          <path d="M 450 150 L 450 197 M 300 197 L 620 197
                   M 300 197 L 300 232 M 460 197 L 460 232
                   M 620 197 L 620 232">
            <animate attributeName="stroke-dashoffset" from="9" to="0"
              dur="1.6s" repeatCount="indefinite" />
          </path>
          {/* open folder → files bus */}
          <path d="M 300 272 L 300 320 M 240 320 L 360 320
                   M 240 320 L 240 361 M 300 320 L 300 361
                   M 360 320 L 360 361">
            <animate attributeName="stroke-dashoffset" from="9" to="0"
              dur="1.6s" repeatCount="indefinite" />
          </path>
        </g>

        {/* ===== Root folder ===== */}
        <g filter="url(#s15-glow)">
          <Folder x={450} y={128} label="Документи" />
        </g>

        {/* ===== Child folders ===== */}
        <Folder x={300} y={250} label="Жалби 2026" accent />
        <Folder x={460} y={250} label="Договори" />
        <Folder x={620} y={250} label="Снимки" />

        {/* receive-pulse on the open folder when the new file drops in */}
        <rect x="262" y="222" width="76" height="50" rx="7" fill="none"
          stroke="#34d399" strokeWidth="2.2" opacity="0">
          <animate attributeName="opacity" values="0;0;0.95;0;0"
            keyTimes="0;0.74;0.84;0.95;1" dur="5s" repeatCount="indefinite" />
        </rect>

        {/* ===== New file being filed into the open folder ===== */}
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="300 70;300 70;300 244;300 244" keyTimes="0;0.1;0.82;1"
            dur="5s" repeatCount="indefinite" />
          <g opacity="0">
            <animate attributeName="opacity" values="0;1;1;0;0"
              keyTimes="0;0.12;0.7;0.82;1" dur="5s" repeatCount="indefinite" />
            <g transform="scale(0.82)" filter="url(#s15-glow)">
              <path d="M -14 -17 L 6 -17 L 14 -9 L 14 17 L -14 17 Z"
                fill="#0b1220" stroke="#67e8f9" strokeWidth="1.7"
                strokeLinejoin="round" />
              <path d="M 6 -17 L 6 -9 L 14 -9" fill="none" stroke="#67e8f9"
                strokeWidth="1.7" strokeLinejoin="round" />
              {[-6, 1, 8].map((ly) => (
                <line key={ly} x1="-8" y1={ly} x2="7" y2={ly}
                  stroke="#22d3ee" strokeWidth="1.7" strokeLinecap="round" />
              ))}
            </g>
          </g>
        </g>

        {/* ===== Files inside the open folder ===== */}
        {files.map((file) => (
          <g key={file.x} transform={`translate(${file.x} 378)`}>
            {/* search glow — lights up as the scan line passes */}
            <rect x="-19" y="-22" width="38" height="44" rx="5" fill="none"
              stroke="#22d3ee" strokeWidth="2" opacity="0">
              <animate attributeName="opacity" values="0;0;0.95;0;0"
                keyTimes={`0;${(file.f - 0.07).toFixed(3)};${file.f};${(file.f + 0.07).toFixed(3)};1`}
                dur="6s" repeatCount="indefinite" />
            </rect>
            <FileGlyph label={file.label} />
          </g>
        ))}

        {/* ===== Search scan — a magnifier sweeps the file row ===== */}
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;1;1;0;0"
            keyTimes="0;0.05;0.5;0.9;0.96;1" dur="6s"
            repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate"
            values="224 0;376 0" dur="6s" repeatCount="indefinite" />
          <line x1="0" y1="358" x2="0" y2="398" stroke="#22d3ee"
            strokeWidth="1.6" strokeDasharray="3 4" opacity="0.7" />
          <g transform="translate(0 347)" fill="none" stroke="#67e8f9"
            strokeWidth="2" filter="url(#s15-glow)">
            <circle r="6.5" fill="#0b1220" />
            <line x1="4.6" y1="4.6" x2="10" y2="10" strokeLinecap="round" />
          </g>
        </g>

        {/* Takeaway caption */}
        <text x="450" y="500" textAnchor="middle" fill="#94a3b8"
          fontSize="12.5">
          Подредени в дърво — всеки файл си има място
        </text>
      </svg>
    </div>
  )
}
