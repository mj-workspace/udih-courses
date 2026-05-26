// Scene 7.12 — Етично използване на AI
// Pattern: flow / pipeline
// AI бот подава чернова → документ минава през проверка (лупа + галки) →
// статусът се сменя ЧЕРНОВА→ОДОБРЕНО, подписва се и печат "ВИЕ ОТГОВАРЯТЕ"
// каца отгоре. Метафората от ръководството: асистент = стажант, отговорността
// остава у вас.

const CYCLE = 9 // s

export default function Scene_7_12() {
  // Times within the loop (sec), kept in one place so keyTimes stay aligned.
  const k = (t) => (t / CYCLE).toFixed(4)
  const checkTimes = [2.5, 3.3, 4.1, 4.9, 5.7] // when each line gets a check
  const scanEnd = 6.3   // magnifier reaches bottom
  const flipAt  = 6.5   // badge ЧЕРНОВА -> ОДОБРЕНО, signature starts
  const stampDown = 7.0 // stamp lands
  const holdEnd = 8.6   // hold approved state
  const reset   = 8.9   // snap back

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s712-halo">
            <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.18" />
            <stop offset="70%"  stopColor="#1e3a8a" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s712-paper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0f172a" />
            <stop offset="100%" stopColor="#0b1220" />
          </linearGradient>
          <filter id="s712-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient halo behind the document */}
        <ellipse cx="460" cy="290" rx="300" ry="220" fill="url(#s712-halo)" />

        {/* Slow rotating dashed frame */}
        <ellipse
          cx="460" cy="290" rx="360" ry="230" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 10"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from="0 460 290" to="360 460 290"
            dur="62s" repeatCount="indefinite"
          />
        </ellipse>

        {/* ============================================================ */}
        {/* LEFT — AI assistant (the stagier)                              */}
        {/* ============================================================ */}
        <g transform="translate(160 290)">
          {/* breathing rings */}
          {[0, 1.6].map((d, i) => (
            <circle key={i} r="46" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="46;78" dur="3.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="3.8s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {/* head */}
          <rect x="-44" y="-46" width="88" height="78" rx="14"
                fill="#0b1220" stroke="#22d3ee" strokeWidth="2" filter="url(#s712-glow)" />
          {/* screen */}
          <rect x="-32" y="-34" width="64" height="44" rx="6"
                fill="#082f49" stroke="#22d3ee" strokeWidth="1" />
          <text x="0" y="-5" textAnchor="middle" fill="#22d3ee"
                fontSize="18" fontWeight="800" fontFamily="monospace"
                style={{ letterSpacing: '0.18em' }}>
            AI
          </text>
          {/* mouth bar */}
          <rect x="-14" y="18" width="28" height="6" rx="2" fill="#22d3ee" opacity="0.6">
            <animate attributeName="opacity" values="0.4;0.9;0.4" dur="1.8s" repeatCount="indefinite" />
          </rect>
          {/* antenna */}
          <line x1="0" y1="-46" x2="0" y2="-62" stroke="#22d3ee" strokeWidth="2" />
          <circle cx="0" cy="-66" r="4" fill="#22d3ee" filter="url(#s712-glow)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <text x="0" y="56" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="600">
            Асистент
          </text>
          <text x="0" y="72" textAnchor="middle" fill="#64748b" fontSize="11">
            пише чернова
          </text>
        </g>

        {/* Flow arrow: AI → document */}
        <g>
          <line x1="220" y1="290" x2="318" y2="290"
                stroke="#22d3ee" strokeWidth="1.4" strokeDasharray="4 6" opacity="0.55">
            <animate attributeName="stroke-dashoffset" values="10;0" dur="1.4s" repeatCount="indefinite" />
          </line>
          <polygon points="318,290 308,286 308,294" fill="#22d3ee" opacity="0.75" />
          {/* draft packet traveling */}
          <g>
            <animateMotion dur="2.8s" repeatCount="indefinite" path="M 222 290 L 312 290" />
            <rect x="-9" y="-7" width="18" height="14" rx="2"
                  fill="#0b1220" stroke="#22d3ee" strokeWidth="1.2" />
            <line x1="-6" y1="-3" x2="6" y2="-3" stroke="#22d3ee" strokeWidth="0.8" />
            <line x1="-6" y1="0"  x2="4" y2="0"  stroke="#22d3ee" strokeWidth="0.8" />
            <line x1="-6" y1="3"  x2="5" y2="3"  stroke="#22d3ee" strokeWidth="0.8" />
          </g>
        </g>

        {/* ============================================================ */}
        {/* CENTRE — the document                                          */}
        {/* ============================================================ */}
        <g transform="translate(320 100)">
          {/* paper sheet */}
          <rect x="0" y="0" width="280" height="360" rx="6"
                fill="url(#s712-paper)" stroke="#475569" strokeWidth="1.5" />
          {/* dog-ear */}
          <path d="M 260 0 L 280 20 L 260 20 Z" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <line x1="260" y1="0" x2="260" y2="20" stroke="#475569" strokeWidth="1" />
          <line x1="260" y1="20" x2="280" y2="20" stroke="#475569" strokeWidth="1" />

          {/* header bar */}
          <rect x="14" y="14" width="170" height="16" rx="2" fill="#1e3a8a" opacity="0.55" />

          {/* status badge — flips ЧЕРНОВА -> ОДОБРЕНО */}
          <g transform="translate(196 14)">
            <rect width="70" height="18" rx="9" fill="#0b1220"
                  stroke="#f59e0b" strokeWidth="1.4">
              <animate attributeName="stroke"
                values="#f59e0b;#f59e0b;#10b981;#10b981;#f59e0b"
                keyTimes={`0;${k(flipAt)};${k(flipAt + 0.15)};${k(reset)};1`}
                dur={`${CYCLE}s`} repeatCount="indefinite" />
            </rect>
            <text x="35" y="13" textAnchor="middle" fill="#f59e0b"
                  fontSize="10" fontWeight="800"
                  style={{ letterSpacing: '0.08em' }}>
              ЧЕРНОВА
              <animate attributeName="opacity"
                values="1;1;0;0;1"
                keyTimes={`0;${k(flipAt)};${k(flipAt + 0.15)};${k(reset)};1`}
                dur={`${CYCLE}s`} repeatCount="indefinite" />
            </text>
            <text x="35" y="13" textAnchor="middle" fill="#10b981"
                  fontSize="10" fontWeight="800" opacity="0"
                  style={{ letterSpacing: '0.08em' }}>
              ОДОБРЕНО
              <animate attributeName="opacity"
                values="0;0;1;1;0"
                keyTimes={`0;${k(flipAt)};${k(flipAt + 0.15)};${k(reset)};1`}
                dur={`${CYCLE}s`} repeatCount="indefinite" />
            </text>
          </g>

          {/* document lines — each gets a check when scanned */}
          {checkTimes.map((t, i) => {
            const y = 62 + i * 32
            const widths = [210, 230, 195, 220, 175]
            const w = widths[i]
            return (
              <g key={i}>
                <rect x="14" y={y} width={w} height="7" rx="3" fill="#334155" />
                <g transform={`translate(${14 + w + 18} ${y + 3.5})`} opacity="0">
                  <animate attributeName="opacity"
                    values="0;0;1;1;0"
                    keyTimes={`0;${k(t)};${k(t + 0.2)};${k(holdEnd)};1`}
                    dur={`${CYCLE}s`} repeatCount="indefinite" />
                  <circle r="8" fill="#10b981" filter="url(#s712-glow)" />
                  <path d="M -3.5 0 L -1 2.5 L 3.5 -2.5"
                        stroke="#0b1220" strokeWidth="1.8" fill="none"
                        strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </g>
            )
          })}

          {/* signature line */}
          <line x1="14" y1="306" x2="180" y2="306"
                stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
          <text x="14" y="324" fill="#64748b" fontSize="10"
                style={{ letterSpacing: '0.1em' }}>
            ПОДПИС
          </text>

          {/* signature — draws after approval */}
          <path d="M 22 302 C 38 286, 58 318, 78 298 S 118 286, 152 304"
                stroke="#22d3ee" strokeWidth="2.2" fill="none"
                strokeLinecap="round"
                strokeDasharray="170" strokeDashoffset="170"
                filter="url(#s712-glow)">
            <animate attributeName="stroke-dashoffset"
              values="170;170;0;0;170"
              keyTimes={`0;${k(flipAt)};${k(flipAt + 0.6)};${k(holdEnd)};1`}
              dur={`${CYCLE}s`} repeatCount="indefinite" />
          </path>

          {/* "your name" hint above signature */}
          <text x="97" y="346" textAnchor="middle" fill="#64748b" fontSize="9"
                style={{ letterSpacing: '0.12em' }}>
            ВАШЕТО ИМЕ
          </text>
        </g>

        {/* ============================================================ */}
        {/* Magnifying glass — scans the document top-to-bottom            */}
        {/* ============================================================ */}
        <g filter="url(#s712-glow)">
          <animateTransform attributeName="transform" type="translate"
            values="470,160; 470,430; 470,430"
            keyTimes={`0;${k(scanEnd)};1`}
            dur={`${CYCLE}s`} repeatCount="indefinite" />
          <animate attributeName="opacity"
            values="1;1;0;0;1"
            keyTimes={`0;${k(scanEnd)};${k(scanEnd + 0.1)};${k(reset)};1`}
            dur={`${CYCLE}s`} repeatCount="indefinite" />
          {/* lens */}
          <circle r="24" fill="#0b1220" fillOpacity="0.35"
                  stroke="#60a5fa" strokeWidth="2.6" />
          <circle r="24" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.4">
            <animate attributeName="r" values="24;30;24" dur="2.4s" repeatCount="indefinite" />
          </circle>
          {/* highlight */}
          <circle cx="-8" cy="-8" r="5" fill="#60a5fa" opacity="0.3" />
          {/* handle */}
          <line x1="17" y1="17" x2="34" y2="34"
                stroke="#60a5fa" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="17" y1="17" x2="34" y2="34"
                stroke="#0b1220" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
        </g>

        {/* ============================================================ */}
        {/* RIGHT — "ВИЕ ОТГОВАРЯТЕ" stamp drops onto the document         */}
        {/* ============================================================ */}
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="830,70; 830,70; 510,200; 510,200; 830,70"
            keyTimes={`0;${k(flipAt + 0.1)};${k(stampDown)};${k(holdEnd)};1`}
            dur={`${CYCLE}s`} repeatCount="indefinite" />
          <animate attributeName="opacity"
            values="0;0;1;1;0"
            keyTimes={`0;${k(flipAt + 0.05)};${k(stampDown)};${k(holdEnd)};1`}
            dur={`${CYCLE}s`} repeatCount="indefinite" />
          <g transform="rotate(-14)" filter="url(#s712-glow)">
            {/* impact ripple */}
            <circle r="0" fill="none" stroke="#10b981" strokeWidth="2" opacity="0">
              <animate attributeName="r"
                values="0;0;0;70;90"
                keyTimes={`0;${k(stampDown - 0.1)};${k(stampDown)};${k(stampDown + 0.7)};1`}
                dur={`${CYCLE}s`} repeatCount="indefinite" />
              <animate attributeName="opacity"
                values="0;0;0.8;0;0"
                keyTimes={`0;${k(stampDown - 0.1)};${k(stampDown)};${k(stampDown + 0.7)};1`}
                dur={`${CYCLE}s`} repeatCount="indefinite" />
            </circle>
            {/* outer ring */}
            <rect x="-70" y="-34" width="140" height="68" rx="9"
                  fill="none" stroke="#10b981" strokeWidth="4.5" />
            <rect x="-62" y="-26" width="124" height="52" rx="6"
                  fill="none" stroke="#10b981" strokeWidth="1.5" />
            <text x="0" y="0" textAnchor="middle" fill="#10b981"
                  fontSize="22" fontWeight="900"
                  style={{ letterSpacing: '0.16em' }}>
              ВИЕ
            </text>
            <text x="0" y="20" textAnchor="middle" fill="#10b981"
                  fontSize="10" fontWeight="700"
                  style={{ letterSpacing: '0.22em' }}>
              ОТГОВАРЯТЕ
            </text>
          </g>
        </g>

        {/* ============================================================ */}
        {/* Stage labels                                                  */}
        {/* ============================================================ */}
        <text x="460" y="494" textAnchor="middle"
              fill="#a78bfa" fontSize="13" fontWeight="700"
              style={{ letterSpacing: '0.12em' }}>
          АСИСТЕНТ ПИШЕ · ВИЕ ПРОВЕРЯВАТЕ · ВИЕ ПОДПИСВАТЕ
        </text>
      </svg>
    </div>
  )
}
