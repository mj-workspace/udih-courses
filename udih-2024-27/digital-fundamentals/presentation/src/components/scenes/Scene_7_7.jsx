// Scene 7.7 — Практически приложения за ежедневната работа
// Pattern: hub & orbit — AI асистентът е глух център (чат балон с "AI"),
// около него обикалят шестте ежедневни приложения, описани в гайда:
// имейли, съобщения до граждани, обобщения, превод, прости думи, идеи.
// Връзките между центъра и сателитите носят пътуващи "задачи" — заявка
// тръгва към асистента, отговор се връща.

const CX = 450
const CY = 290
const R = 195

const nodes = [
  { id: 'email',     label: 'Имейли',       sub: 'служебни',   color: '#3b82f6', angle: -90  },
  { id: 'citizen',   label: 'Граждани',     sub: 'учтив тон',  color: '#22d3ee', angle: -30  },
  { id: 'summary',   label: 'Обобщение',    sub: 'дълъг текст',color: '#f59e0b', angle: 30   },
  { id: 'translate', label: 'Превод',       sub: 'EN ⇄ BG',    color: '#10b981', angle: 90   },
  { id: 'simple',    label: 'Прости думи',  sub: 'термини',    color: '#a78bfa', angle: 150  },
  { id: 'ideas',     label: 'Идеи',         sub: 'на глас',    color: '#f472b6', angle: 210  },
].map((n) => {
  const rad = (n.angle * Math.PI) / 180
  return { ...n, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
})

// Хъб (chat-bubble) геометрия — центрирана в (CX, CY)
const HW = 150
const HH = 100
const HXL = CX - HW / 2
const HYT = CY - HH / 2

// Точка на ръба на хъба към даден ъгъл (за връзките)
function hubAnchor(angle) {
  const rad = (angle * Math.PI) / 180
  const dx = Math.cos(rad)
  const dy = Math.sin(rad)
  const tx = (HW / 2) / Math.abs(dx || 0.0001)
  const ty = (HH / 2) / Math.abs(dy || 0.0001)
  const t = Math.min(tx, ty)
  return { x: CX + dx * t, y: CY + dy * t }
}

export default function Scene_7_7() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s77-halo">
            <stop offset="0%"  stopColor="#60a5fa" stopOpacity="0.24" />
            <stop offset="70%" stopColor="#1e3a8a" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s77-hub" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0f172a" />
            <stop offset="100%" stopColor="#06101f" />
          </linearGradient>
          <radialGradient id="s77-core-grad">
            <stop offset="0%"  stopColor="#93c5fd" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <filter id="s77-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ============================================================ */}
        {/* Ambient: халос + бавно въртящи се пунктирани пръстени         */}
        {/* ============================================================ */}
        <circle cx={CX} cy={CY} r="285" fill="url(#s77-halo)" />

        <circle
          cx={CX} cy={CY} r="265" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="2 10"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="60s" repeatCount="indefinite"
          />
        </circle>

        <circle
          cx={CX} cy={CY} r="230" fill="none"
          stroke="#334155" strokeWidth="0.5" strokeDasharray="1 8"
          opacity="0.7"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`360 ${CX} ${CY}`} to={`0 ${CX} ${CY}`}
            dur="44s" repeatCount="indefinite"
          />
        </circle>

        {/* Заглеждащи се частици по ъглите — намек за "още задачи" */}
        {[
          { x: 110, y: 100 }, { x: 790, y: 110 }, { x: 90,  y: 470 },
          { x: 800, y: 470 }, { x: 70,  y: 290 }, { x: 820, y: 290 },
          { x: 230, y: 80  }, { x: 670, y: 80  }, { x: 230, y: 500 },
          { x: 670, y: 500 },
        ].map((p, i) => (
          <circle
            key={`dust-${i}`} cx={p.x} cy={p.y} r="2"
            fill="#475569" opacity="0.5"
          >
            <animate
              attributeName="opacity"
              values="0.2;0.7;0.2"
              dur={`${4 + (i % 4)}s`}
              begin={`${i * 0.4}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* ============================================================ */}
        {/* Връзки хъб → сателит, с двупосочни пакети                     */}
        {/* (заявка от потребителя навън → отговор от асистента навътре) */}
        {/* ============================================================ */}
        {nodes.map((n, i) => {
          const a = hubAnchor(n.angle)
          const pathOut = `s77-out-${n.id}`
          const pathIn  = `s77-in-${n.id}`
          return (
            <g key={`link-${n.id}`}>
              <defs>
                <path id={pathOut} d={`M ${a.x} ${a.y} L ${n.x} ${n.y}`} />
                <path id={pathIn}  d={`M ${n.x} ${n.y} L ${a.x} ${a.y}`} />
              </defs>
              <line
                x1={a.x} y1={a.y} x2={n.x} y2={n.y}
                stroke={n.color} strokeOpacity="0.45" strokeWidth="1"
                strokeDasharray="4 6"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="10" to="0" dur="2.2s" repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  values="0.25;0.7;0.25"
                  dur="3.6s" begin={`${i * 0.5}s`} repeatCount="indefinite"
                />
              </line>
              {/* заявка навън (синя — от потребителя) */}
              <circle r="3" fill="#60a5fa" filter="url(#s77-glow)">
                <animateMotion
                  dur={`${4.8 + i * 0.3}s`}
                  begin={`${i * 0.4}s`}
                  repeatCount="indefinite"
                >
                  <mpath href={`#${pathOut}`} />
                </animateMotion>
              </circle>
              {/* отговор навътре (в цвета на сателита) */}
              <circle r="3" fill={n.color} filter="url(#s77-glow)">
                <animateMotion
                  dur={`${4.8 + i * 0.3}s`}
                  begin={`${i * 0.4 + 2.2}s`}
                  repeatCount="indefinite"
                >
                  <mpath href={`#${pathIn}`} />
                </animateMotion>
              </circle>
            </g>
          )
        })}

        {/* ============================================================ */}
        {/* Централен хъб — чат балон с "AI"                              */}
        {/* ============================================================ */}
        <g>
          {/* Светещ core зад балона */}
          <circle cx={CX} cy={CY} r="80" fill="url(#s77-core-grad)" />

          {/* Pulse rings около балона */}
          {[0, 1.6, 3.2].map((d, i) => (
            <rect
              key={`pulse-${i}`}
              x={HXL} y={HYT} width={HW} height={HH} rx="14"
              fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0"
            >
              <animate
                attributeName="width"
                values={`${HW};${HW + 70}`}
                dur="5.4s" begin={`${d}s`} repeatCount="indefinite"
              />
              <animate
                attributeName="height"
                values={`${HH};${HH + 70}`}
                dur="5.4s" begin={`${d}s`} repeatCount="indefinite"
              />
              <animate
                attributeName="x"
                values={`${HXL};${HXL - 35}`}
                dur="5.4s" begin={`${d}s`} repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values={`${HYT};${HYT - 35}`}
                dur="5.4s" begin={`${d}s`} repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.5;0"
                dur="5.4s" begin={`${d}s`} repeatCount="indefinite"
              />
            </rect>
          ))}

          {/* Тяло на балона */}
          <rect
            x={HXL} y={HYT} width={HW} height={HH} rx="14"
            fill="url(#s77-hub)"
            stroke="#60a5fa" strokeWidth="2"
            filter="url(#s77-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.6;1;0.6" dur="3.4s" repeatCount="indefinite"
            />
          </rect>

          {/* Текст "AI" — голям, светещ */}
          <text
            x={CX} y={CY - 4}
            textAnchor="middle" dominantBaseline="middle"
            fill="#e2e8f0" fontSize="42" fontWeight="800"
            letterSpacing="2"
            filter="url(#s77-glow)"
          >
            AI
          </text>
          <text
            x={CX} y={CY + 24}
            textAnchor="middle"
            fill="#94a3b8" fontSize="11" fontWeight="600"
            letterSpacing="1"
          >
            АСИСТЕНТ
          </text>

          {/* Три "пишещи" точки под текста */}
          <g transform={`translate(${CX} ${CY + 40})`}>
            <circle cx="-10" cy="0" r="2.2" fill="#60a5fa">
              <animate attributeName="opacity"
                values="0.3;1;0.3" dur="1.6s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="0" r="2.2" fill="#60a5fa">
              <animate attributeName="opacity"
                values="0.3;1;0.3" dur="1.6s" begin="0.25s" repeatCount="indefinite" />
            </circle>
            <circle cx="10" cy="0" r="2.2" fill="#60a5fa">
              <animate attributeName="opacity"
                values="0.3;1;0.3" dur="1.6s" begin="0.5s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Малко "опашле" на балона — намек, че говори */}
          <path
            d={`M ${HXL + 24} ${HYT + HH} L ${HXL + 18} ${HYT + HH + 12} L ${HXL + 36} ${HYT + HH}`}
            fill="url(#s77-hub)" stroke="#60a5fa" strokeWidth="2" strokeLinejoin="round"
          />
        </g>

        {/* ============================================================ */}
        {/* Сателитни приложения                                          */}
        {/* ============================================================ */}
        {nodes.map((n, i) => (
          <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
            {/* Pulse rings */}
            {[0, 1.4].map((d, k) => (
              <circle
                key={k} r="40" fill="none"
                stroke={n.color} strokeWidth="1" opacity="0"
              >
                <animate
                  attributeName="r" values="40;64"
                  dur="3.8s" begin={`${i * 0.5 + d}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity" values="0.5;0"
                  dur="3.8s" begin={`${i * 0.5 + d}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}

            {/* Тяло */}
            <circle
              r="40" fill="#0b1220"
              stroke={n.color} strokeWidth="2"
              filter="url(#s77-glow)"
            />

            {/* Икона */}
            <g transform="translate(0 -5)">
              <NodeIcon id={n.id} color={n.color} />
            </g>

            {/* Етикети */}
            <text
              x="0" y="22"
              textAnchor="middle"
              fill="#e2e8f0" fontSize="12.5" fontWeight="700"
            >
              {n.label}
            </text>
            <text
              x="0" y="36"
              textAnchor="middle"
              fill="#94a3b8" fontSize="10" fontWeight="500"
            >
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ---------- икони (около 0,0) ----------

function NodeIcon({ id, color }) {
  switch (id) {
    case 'email':     return <EmailIcon     color={color} />
    case 'citizen':   return <CitizenIcon   color={color} />
    case 'summary':   return <SummaryIcon   color={color} />
    case 'translate': return <TranslateIcon color={color} />
    case 'simple':    return <SimpleIcon    color={color} />
    case 'ideas':     return <IdeasIcon     color={color} />
    default: return null
  }
}

// Плик — Имейли
function EmailIcon({ color }) {
  return (
    <g>
      <rect x="-13" y="-8" width="26" height="17" rx="2"
        fill="none" stroke={color} strokeWidth="1.6" />
      <path d="M -13 -7 L 0 3 L 13 -7"
        fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* малка светкавица — "за минути" */}
      <path
        d="M 8 -12 L 6 -8 L 9 -8 L 7 -4"
        fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round"
      >
        <animate attributeName="opacity"
          values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
      </path>
    </g>
  )
}

// Два чат балона лице в лице — Граждани / съобщения
function CitizenIcon({ color }) {
  return (
    <g>
      {/* ляв балон — от службата */}
      <path
        d="M -14 -8 H -2 Q 1 -8 1 -5 V 0 Q 1 3 -2 3 H -8 L -12 6 L -12 3 H -14 Q -16 3 -16 0 V -5 Q -16 -8 -14 -8 Z"
        fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* десен балон — от гражданина, по-малък */}
      <path
        d="M 4 -2 H 13 Q 15 -2 15 0 V 5 Q 15 7 13 7 H 7 L 4 10 L 4 7 H 4 Q 2 7 2 5 V 0 Q 2 -2 4 -2 Z"
        fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round"
        opacity="0.85"
      />
      {/* пулсиращи точки в левия балон */}
      <circle cx="-10" cy="-3" r="1" fill={color}>
        <animate attributeName="opacity"
          values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="-7" cy="-3" r="1" fill={color}>
        <animate attributeName="opacity"
          values="0.4;1;0.4" dur="1.6s" begin="0.3s" repeatCount="indefinite" />
      </circle>
      <circle cx="-4" cy="-3" r="1" fill={color}>
        <animate attributeName="opacity"
          values="0.4;1;0.4" dur="1.6s" begin="0.6s" repeatCount="indefinite" />
      </circle>
    </g>
  )
}

// Дълъг документ → къс списък — Обобщение
function SummaryIcon({ color }) {
  return (
    <g>
      {/* документ ляво — много редове */}
      <rect x="-15" y="-11" width="11" height="20" rx="1"
        fill="none" stroke={color} strokeWidth="1.4" />
      {[-7, -4, -1, 2, 5].map((y, k) => (
        <line key={`d-${k}`} x1="-13" y1={y} x2="-6" y2={y}
          stroke={color} strokeWidth="1" opacity="0.7" />
      ))}
      {/* стрелка */}
      <path d="M -2 -1 L 3 -1 M 1 -3 L 3 -1 L 1 1"
        fill="none" stroke={color} strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" />
      {/* списък дясно — три булета */}
      <g transform="translate(7 0)">
        {[-6, -1, 4].map((y, k) => (
          <g key={`b-${k}`}>
            <circle cx="0" cy={y} r="1.2" fill={color}>
              <animate attributeName="opacity"
                values="0.5;1;0.5"
                dur="2.2s" begin={`${k * 0.3}s`}
                repeatCount="indefinite" />
            </circle>
            <line x1="3" y1={y} x2="9" y2={y}
              stroke={color} strokeWidth="1.2" opacity="0.85" />
          </g>
        ))}
      </g>
    </g>
  )
}

// EN ⇄ BG — Превод
function TranslateIcon({ color }) {
  return (
    <g>
      <text x="-9" y="-1" textAnchor="middle"
        fill={color} fontSize="9" fontWeight="800"
        fontFamily="monospace" letterSpacing="0.5">
        EN
      </text>
      <text x="9" y="-1" textAnchor="middle"
        fill={color} fontSize="9" fontWeight="800"
        fontFamily="monospace" letterSpacing="0.5">
        BG
      </text>
      {/* двупосочна стрелка */}
      <g transform="translate(0 7)">
        <line x1="-6" y1="0" x2="6" y2="0"
          stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M -6 0 L -3 -2 M -6 0 L -3 2"
          fill="none" stroke={color} strokeWidth="1.4"
          strokeLinecap="round" />
        <path d="M 6 0 L 3 -2 M 6 0 L 3 2"
          fill="none" stroke={color} strokeWidth="1.4"
          strokeLinecap="round" />
        <animate attributeName="opacity"
          values="0.55;1;0.55" dur="2.4s" repeatCount="indefinite" />
      </g>
    </g>
  )
}

// Крушка — Прости думи / обяснение
function SimpleIcon({ color }) {
  return (
    <g>
      {/* стъкло на крушката */}
      <path
        d="M 0 -12
           C -7 -12 -10 -7 -10 -3
           C -10 1 -7 3 -5 5
           L -5 8
           L 5 8
           L 5 5
           C 7 3 10 1 10 -3
           C 10 -7 7 -12 0 -12 Z"
        fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round"
      />
      {/* нишка — топла светлина */}
      <path d="M -3 -2 Q 0 2 3 -2"
        fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round">
        <animate attributeName="opacity"
          values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
      </path>
      {/* основа */}
      <line x1="-4" y1="10" x2="4" y2="10"
        stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="-3" y1="12" x2="3" y2="12"
        stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {/* лъчи */}
      {[-90, -45, 0, 45, 90].map((deg, k) => {
        const rad = (deg * Math.PI) / 180
        const x1 = Math.cos(rad) * 13
        const y1 = Math.sin(rad) * 13 - 4
        const x2 = Math.cos(rad) * 17
        const y2 = Math.sin(rad) * 17 - 4
        return (
          <line key={`ray-${k}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={color} strokeWidth="1.2" strokeLinecap="round"
            opacity="0.7">
            <animate attributeName="opacity"
              values="0.3;0.9;0.3" dur="2.4s"
              begin={`${k * 0.18}s`}
              repeatCount="indefinite" />
          </line>
        )
      })}
    </g>
  )
}

// Облак на мисълта — Идеи / на глас
function IdeasIcon({ color }) {
  return (
    <g>
      {/* облаче на мисъл */}
      <path
        d="M -10 -2
           Q -13 -2 -13 -5
           Q -13 -9 -9 -9
           Q -7 -12 -3 -11
           Q 0 -13 4 -11
           Q 9 -12 11 -8
           Q 14 -8 14 -4
           Q 14 0 10 1
           Q 9 4 4 4
           Q 0 6 -4 4
           Q -9 4 -10 -2 Z"
        fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* мехурчета под облака — мисли се изграждат */}
      <circle cx="-6" cy="7" r="2" fill="none" stroke={color} strokeWidth="1.2">
        <animate attributeName="opacity"
          values="0.4;1;0.4" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="-9" cy="11" r="1.2" fill="none" stroke={color} strokeWidth="1.1">
        <animate attributeName="opacity"
          values="0.3;0.9;0.3" dur="2.4s" begin="0.3s" repeatCount="indefinite" />
      </circle>
      {/* малка искра вътре в облака — идеята пали */}
      <path d="M 0 -5 L 0 -2 M -1.5 -3.5 L 1.5 -3.5"
        stroke={color} strokeWidth="1.4" strokeLinecap="round">
        <animate attributeName="opacity"
          values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
      </path>
    </g>
  )
}
