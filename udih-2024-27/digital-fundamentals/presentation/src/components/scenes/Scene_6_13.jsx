// Scene 6.13 — Дигитална етика
// Pattern: side-by-side compare + footprint timeline
// Two columns (good / bad behaviour) above a persistent digital-footprint
// trail. New marks drop from the column rows into the trail; old marks never
// fade — visualising "всичко оставя следа".

export default function Scene_6_13() {
  const good = [
    { label: 'Уважение', y: 145 },
    { label: 'Проверка', y: 185 },
    { label: 'Пауза',    y: 225 },
    { label: 'Доброта',  y: 265 },
  ]
  const bad = [
    { label: 'Обиди',    y: 145 },
    { label: 'Слухове',  y: 185 },
    { label: 'Кражба',   y: 225 },
    { label: 'Гняв',     y: 265 },
  ]

  // Persistent footprint marks already on the timeline (past behaviour that
  // never fades). Mixed colours so the trail looks like a real life record.
  const trail = [
    { x:  95, kind: 'good' },
    { x: 155, kind: 'good' },
    { x: 220, kind: 'bad'  },
    { x: 280, kind: 'good' },
    { x: 345, kind: 'good' },
    { x: 415, kind: 'bad'  },
    { x: 485, kind: 'good' },
    { x: 555, kind: 'good' },
    { x: 620, kind: 'good' },
    { x: 690, kind: 'good' },
    { x: 760, kind: 'good' },
  ]

  // Drops — new behaviour falling from a column row into the trail.
  const drops = [
    { fromX: 140, fromY: 145, toX: 180, color: '#10b981', delay: 0 },
    { fromX: 640, fromY: 185, toX: 415, color: '#ef4444', delay: 2 },
    { fromX: 140, fromY: 265, toX: 590, color: '#10b981', delay: 4 },
    { fromX: 640, fromY: 145, toX: 250, color: '#ef4444', delay: 6 },
    { fromX: 140, fromY: 225, toX: 730, color: '#10b981', delay: 8 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="s613-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="s613-good-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#10b981" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="s613-bad-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ef4444" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.02" />
          </linearGradient>
          <radialGradient id="s613-halo">
            <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.18" />
            <stop offset="70%"  stopColor="#1e3a8a" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient halo behind the central balance */}
        <circle cx="450" cy="215" r="160" fill="url(#s613-halo)" />

        {/* Slow rotating dashed frame for life */}
        <ellipse
          cx="450" cy="290" rx="380" ry="240" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 10"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from="0 450 290" to="360 450 290"
            dur="64s" repeatCount="indefinite"
          />
        </ellipse>

        {/* ============================================================ */}
        {/* Left panel — Доброто                                          */}
        {/* ============================================================ */}
        <g>
          <rect
            x="110" y="100" width="230" height="220" rx="14"
            fill="url(#s613-good-grad)"
            stroke="#10b981" strokeOpacity="0.45" strokeWidth="1"
          />
          <text
            x="225" y="125" textAnchor="middle"
            fill="#34d399" fontSize="13" fontWeight="700"
            style={{ letterSpacing: '0.1em' }}
          >
            ГРАДИШ ДОВЕРИЕ
          </text>
          {good.map((g, i) => (
            <g key={g.label} transform={`translate(140 ${g.y})`}>
              <circle r="13" fill="#10b981" filter="url(#s613-glow)">
                <animate
                  attributeName="opacity" values="0.75;1;0.75"
                  dur="3.2s" begin={`${i * 0.5}s`} repeatCount="indefinite"
                />
              </circle>
              <path
                d="M -6 0 L -1 5 L 7 -5"
                fill="none" stroke="#0b1220"
                strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
              />
              <text x="26" y="5" fill="#e2e8f0" fontSize="16" fontWeight="500">
                {g.label}
              </text>
            </g>
          ))}
        </g>

        {/* ============================================================ */}
        {/* Right panel — Лошото                                          */}
        {/* ============================================================ */}
        <g>
          <rect
            x="560" y="100" width="230" height="220" rx="14"
            fill="url(#s613-bad-grad)"
            stroke="#ef4444" strokeOpacity="0.45" strokeWidth="1"
          />
          <text
            x="675" y="125" textAnchor="middle"
            fill="#f87171" fontSize="13" fontWeight="700"
            style={{ letterSpacing: '0.1em' }}
          >
            РУШИШ ДОВЕРИЕ
          </text>
          {bad.map((b, i) => (
            <g key={b.label} transform={`translate(590 ${b.y})`}>
              <circle r="13" fill="#ef4444" filter="url(#s613-glow)">
                <animate
                  attributeName="opacity" values="0.75;1;0.75"
                  dur="3.2s" begin={`${i * 0.5 + 0.3}s`} repeatCount="indefinite"
                />
              </circle>
              <path
                d="M -5 -5 L 5 5 M -5 5 L 5 -5"
                fill="none" stroke="#0b1220"
                strokeWidth="2.2" strokeLinecap="round"
              />
              <text x="26" y="5" fill="#e2e8f0" fontSize="16" fontWeight="500">
                {b.label}
              </text>
            </g>
          ))}
        </g>

        {/* ============================================================ */}
        {/* Centre — gently tipping balance between the two columns       */}
        {/* ============================================================ */}
        <g transform="translate(450 215)">
          {/* Mast + stand */}
          <line x1="0" y1="-35" x2="0" y2="35"
            stroke="#475569" strokeWidth="1.4" />
          <circle cx="0" cy="-35" r="3" fill="#94a3b8" />
          <path
            d="M -22 35 L 22 35 M 0 35 L 0 48"
            stroke="#475569" strokeWidth="1.4" strokeLinecap="round"
          />

          {/* Crossbar + pans — slow oscillation */}
          <g>
            <animateTransform
              attributeName="transform" type="rotate"
              values="-4;4;-4" dur="9s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
            />
            <line
              x1="-55" y1="-35" x2="55" y2="-35"
              stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round"
            />
            {/* Left pan (good) */}
            <line x1="-55" y1="-35" x2="-55" y2="-18"
              stroke="#475569" strokeWidth="1" />
            <path
              d="M -68 -18 Q -55 -8 -42 -18 Z"
              fill="#10b981" fillOpacity="0.22"
              stroke="#10b981" strokeWidth="1.2"
            />
            {/* Right pan (bad) */}
            <line x1="55" y1="-35" x2="55" y2="-18"
              stroke="#475569" strokeWidth="1" />
            <path
              d="M 42 -18 Q 55 -8 68 -18 Z"
              fill="#ef4444" fillOpacity="0.22"
              stroke="#ef4444" strokeWidth="1.2"
            />
          </g>
        </g>

        {/* ============================================================ */}
        {/* Bottom — digital footprint timeline                           */}
        {/* ============================================================ */}
        <g>
          <text
            x="450" y="360" textAnchor="middle"
            fill="#a78bfa" fontSize="13" fontWeight="700"
            style={{ letterSpacing: '0.1em' }}
          >
            ДИГИТАЛЕН ОТПЕЧАТЪК — ВСИЧКО ОСТАВА
          </text>

          {/* Axis */}
          <line
            x1="70" y1="440" x2="820" y2="440"
            stroke="#334155" strokeWidth="1" strokeDasharray="3 6"
          />
          {/* Arrow tip */}
          <path
            d="M 820 440 L 834 440 M 828 435 L 834 440 L 828 445"
            fill="none" stroke="#475569"
            strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
          />

          {/* Time markers */}
          {[
            { x: 100, label: 'днес' },
            { x: 290, label: 'след година' },
            { x: 500, label: 'след 5 г.' },
            { x: 740, label: 'след 10 г.' },
          ].map((t) => (
            <g key={t.label}>
              <line x1={t.x} y1="434" x2={t.x} y2="446"
                stroke="#64748b" strokeWidth="1" />
              <text
                x={t.x} y="465" textAnchor="middle"
                fill="#64748b" fontSize="11"
              >
                {t.label}
              </text>
            </g>
          ))}

          {/* Persistent footprint marks — never fade, gently breathing */}
          {trail.map((m, i) => {
            const color = m.kind === 'good' ? '#10b981' : '#ef4444'
            return (
              <g key={`tr-${i}`}>
                <line
                  x1={m.x} y1="418" x2={m.x} y2="436"
                  stroke={color} strokeWidth="0.8" opacity="0.32"
                />
                <circle
                  cx={m.x} cy="412" r="5"
                  fill={color} opacity="0.85"
                  filter="url(#s613-glow)"
                >
                  <animate
                    attributeName="opacity" values="0.7;0.95;0.7"
                    dur="4.4s" begin={`${(i % 4) * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            )
          })}
        </g>

        {/* ============================================================ */}
        {/* Drops — new behaviour falling from a column into the trail    */}
        {/* ============================================================ */}
        {drops.map((d, i) => {
          const midX = (d.fromX + d.toX) / 2
          const midY = 280
          const dur = 4
          return (
            <circle
              key={`drop-${i}`}
              r="5" fill={d.color} filter="url(#s613-glow)" opacity="0"
            >
              <animateMotion
                dur={`${dur}s`} begin={`${d.delay}s`}
                repeatCount="indefinite"
                path={`M ${d.fromX} ${d.fromY} Q ${midX} ${midY} ${d.toX} 412`}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0.7;0"
                keyTimes="0;0.15;0.75;0.9;1"
                dur={`${dur}s`} begin={`${d.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          )
        })}
      </svg>
    </div>
  )
}
