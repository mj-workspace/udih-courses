// Scene 7.10 — Проверка на информацията
// Pattern: flow / pipeline
// AI-чернова → 3 проверки (Търсене, Източник, Опит) → Готов проверен документ.
// Малка картичка-факт пътува по тръбопровода; всеки филтър просветва, когато
// картичката е при него; накрая се появява зелен печат „Проверено".

const CY = 300

const stages = [
  { x: 130, label: 'Чернова',  color: '#94a3b8' },
  { x: 305, label: 'Търсене',  color: '#22d3ee' },
  { x: 475, label: 'Източник', color: '#a78bfa' },
  { x: 645, label: 'Опит',     color: '#f59e0b' },
  { x: 815, label: 'Готов',    color: '#10b981' },
]

const TRAVEL = 10 // секунди за цикъл (4 преходи × 2.5s)

export default function Scene_7_10() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="s710-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="s710-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="s710-final-grad">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
            <stop offset="80%" stopColor="#064e3b" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Заглавна лента отгоре */}
        <text x="450" y="105" textAnchor="middle" fill="#94a3b8" fontSize="14" letterSpacing="0.2em">
          ОТГОВОР ОТ АСИСТЕНТА → ПРОВЕРКА → ГОТОВ ДОКУМЕНТ
        </text>
        <line x1="200" y1="120" x2="700" y2="120" stroke="#1e293b" strokeWidth="1" />

        {/* Тръбопровод — основна линия */}
        <line
          x1={stages[0].x + 50} y1={CY} x2={stages[4].x - 50} y2={CY}
          stroke="#334155" strokeWidth="2" strokeDasharray="6 8"
        >
          <animate attributeName="stroke-dashoffset" from="14" to="0" dur="2s" repeatCount="indefinite" />
        </line>
        <line
          x1={stages[0].x + 50} y1={CY} x2={stages[4].x - 50} y2={CY}
          stroke="#0f172a" strokeWidth="0.5" opacity="0.6"
        />

        {/* Зона около крайния етап — мек зелен ореол */}
        <circle cx={stages[4].x} cy={CY} r="120" fill="url(#s710-final-grad)" />

        {/* Етапи: икони + етикети + просветващи пръстени */}
        {stages.map((s, i) => (
          <g key={s.label} transform={`translate(${s.x} ${CY})`}>
            {/* Външен дишащ пръстен — само за филтрите и крайния етап */}
            {i > 0 && (
              <circle r="48" fill="none" stroke={s.color} strokeWidth="1" opacity="0">
                <animate
                  attributeName="r" values="48;78"
                  dur={`${TRAVEL}s`}
                  begin={`${(i - 1) * 2.5}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity" values="0;0.6;0;0;0;0;0;0;0;0"
                  dur={`${TRAVEL}s`}
                  begin={`${(i - 1) * 2.5}s`}
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* Основен кръг */}
            <circle r="46" fill="#0b1220" stroke={s.color} strokeWidth="2" filter="url(#s710-glow)" />

            {/* Иконка спрямо етапа */}
            <StageIcon kind={s.label} color={s.color} />

            {/* Етикет под кръга */}
            <text x="0" y="78" textAnchor="middle" fill="#e2e8f0" fontSize="15" fontWeight="600">
              {s.label}
            </text>

            {/* Малка „галка" при филтрите — мига когато факта е там */}
            {i > 0 && i < 4 && (
              <g transform="translate(34 -34)" opacity="0">
                <circle r="11" fill="#0b1220" stroke="#10b981" strokeWidth="1.5" />
                <path d="M -4 0 L -1 3 L 5 -3" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <animate
                  attributeName="opacity"
                  values="0;0;1;1;0;0;0;0;0;0"
                  keyTimes="0;0.22;0.26;0.32;0.36;0.4;0.5;0.7;0.85;1"
                  dur={`${TRAVEL}s`}
                  begin={`${(i - 1) * 2.5}s`}
                  repeatCount="indefinite"
                />
              </g>
            )}
          </g>
        ))}

        {/* Пътуваща картичка-факт */}
        <g filter="url(#s710-soft)">
          <g>
            <rect x="-26" y="-13" width="52" height="26" rx="5" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fill="#f59e0b" fontSize="11" fontFamily="monospace" letterSpacing="0.1em">
              № 245
            </text>
            {/* Малка точка отгоре, обозначаваща „факт" */}
            <circle cx="-19" cy="-13" r="3" fill="#f59e0b">
              <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
            </circle>
            <animateMotion
              dur={`${TRAVEL}s`}
              repeatCount="indefinite"
              keyTimes="0;0.2;0.25;0.45;0.5;0.7;0.75;0.95;1"
              keyPoints="0;0.25;0.25;0.5;0.5;0.75;0.75;1;1"
              calcMode="linear"
              path={`M ${stages[0].x} ${CY} L ${stages[4].x} ${CY}`}
            />
          </g>
        </g>

        {/* Преходна светлинка по линията — следва картичката */}
        <circle r="3" fill="#60a5fa" opacity="0.9">
          <animateMotion
            dur={`${TRAVEL}s`}
            repeatCount="indefinite"
            path={`M ${stages[0].x + 50} ${CY} L ${stages[4].x - 50} ${CY}`}
          />
          <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.4s" repeatCount="indefinite" />
        </circle>

        {/* Печат „Проверено" над крайния етап */}
        <g transform={`translate(${stages[4].x} ${CY - 95})`}>
          <g opacity="0">
            <rect x="-58" y="-16" width="116" height="32" rx="5"
                  fill="#064e3b" stroke="#10b981" strokeWidth="1.5" filter="url(#s710-glow)" />
            <text x="0" y="5" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="700"
                  letterSpacing="0.18em">
              ПРОВЕРЕНО
            </text>
            <animate
              attributeName="opacity"
              values="0;0;1;1;0"
              keyTimes="0;0.74;0.78;0.96;1"
              dur={`${TRAVEL}s`}
              repeatCount="indefinite"
            />
          </g>
        </g>

        {/* Долна лента с правилото */}
        <g transform="translate(450 475)">
          <text textAnchor="middle" fill="#64748b" fontSize="13" letterSpacing="0.12em">
            ЕЗИК — ВЕДНЪЖ ПРОЧЕТИ   ·   ФАКТ — ПРОВЕРИ   ·   С ТВОЕ ИМЕ — ЦЕЛИЯ ТЕКСТ
          </text>
        </g>

        {/* Декоративни ъглови чертички — тон, близък до cyber декa */}
        <g stroke="#1e293b" strokeWidth="1" fill="none">
          <path d="M 70 140 L 70 170 M 70 140 L 100 140" />
          <path d="M 830 140 L 830 170 M 830 140 L 800 140" />
          <path d="M 70 510 L 70 480 M 70 510 L 100 510" />
          <path d="M 830 510 L 830 480 M 830 510 L 800 510" />
        </g>
      </svg>
    </div>
  )
}

function StageIcon({ kind, color }) {
  switch (kind) {
    case 'Чернова':
      // Стилизирана чат-балонна с буквите AI вътре
      return (
        <g>
          <path
            d="M -22 -14 H 22 a4 4 0 0 1 4 4 V 8 a4 4 0 0 1 -4 4 H -12 L -22 20 V 12 a4 4 0 0 1 -4 -4 V -10 a4 4 0 0 1 4 -4 Z"
            fill="#0f172a" stroke={color} strokeWidth="1.5"
          />
          <text x="0" y="2" textAnchor="middle" fill={color} fontSize="12" fontWeight="700" letterSpacing="0.15em">
            AI
          </text>
        </g>
      )
    case 'Търсене':
      // Лупа
      return (
        <g stroke={color} strokeWidth="2.4" fill="none" strokeLinecap="round">
          <circle cx="-5" cy="-4" r="12" />
          <line x1="4" y1="5" x2="14" y2="15" />
          <line x1="-12" y1="-4" x2="2" y2="-4" opacity="0.5" />
          <line x1="-12" y1="2" x2="-2" y2="2" opacity="0.4" />
        </g>
      )
    case 'Източник':
      // Чат балонна с „?" — поискай източник
      return (
        <g>
          <path
            d="M -20 -14 H 20 a4 4 0 0 1 4 4 V 6 a4 4 0 0 1 -4 4 H 4 L -6 18 V 10 a4 4 0 0 1 -4 -4 V -10 a4 4 0 0 1 4 -4 Z"
            fill="#0f172a" stroke={color} strokeWidth="1.5"
          />
          <text x="0" y="2" textAnchor="middle" fill={color} fontSize="18" fontWeight="700">
            ?
          </text>
        </g>
      )
    case 'Опит':
      // Силует на човек — твоят опит
      return (
        <g fill={color}>
          <circle cx="0" cy="-10" r="7" />
          <path d="M -14 16 C -14 4 -6 0 0 0 C 6 0 14 4 14 16 Z" />
        </g>
      )
    case 'Готов':
      // Документ с галка
      return (
        <g>
          <path
            d="M -16 -18 H 10 L 18 -10 V 18 a2 2 0 0 1 -2 2 H -16 a2 2 0 0 1 -2 -2 V -16 a2 2 0 0 1 2 -2 Z"
            fill="#0f172a" stroke={color} strokeWidth="1.5"
          />
          <path d="M 10 -18 V -10 H 18" fill="none" stroke={color} strokeWidth="1.2" opacity="0.7" />
          <line x1="-10" y1="-4" x2="6" y2="-4" stroke={color} strokeWidth="1" opacity="0.4" />
          <line x1="-10" y1="2" x2="6" y2="2" stroke={color} strokeWidth="1" opacity="0.4" />
          <path
            d="M -8 10 L -2 16 L 10 4"
            fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
          />
        </g>
      )
    default:
      return null
  }
}
