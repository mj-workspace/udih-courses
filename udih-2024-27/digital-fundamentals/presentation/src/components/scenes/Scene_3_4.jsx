// Scene 3.4 — Организация на пощата
// Pattern: annotated mock — a stylised mailbox window with a folder sidebar,
// a search bar, an inbox list and a filter-rule card. An envelope drops in at
// the top, pauses at the filter card while the rule highlights, then lands in
// the "Институции" folder which pulses green. Search field types a query and
// the matching inbox rows light up. The graphic shows папки + филтри +
// търсене working together, plus the Спам folder marked in amber.

const PANEL_X = 60
const PANEL_Y = 50
const PANEL_W = 780
const PANEL_H = 480

const HEADER_H = 50

const SEARCH_X = PANEL_X + 200
const SEARCH_Y = PANEL_Y + 10
const SEARCH_W = PANEL_W - 220
const SEARCH_H = 30

const SIDEBAR_X = PANEL_X + 14
const SIDEBAR_Y = PANEL_Y + HEADER_H + 16
const SIDEBAR_W = 168

const INBOX_X = SIDEBAR_X + SIDEBAR_W + 14
const INBOX_Y = SIDEBAR_Y
const INBOX_W = 290

const FILTER_X = INBOX_X + INBOX_W + 14
const FILTER_Y = SIDEBAR_Y + 30
const FILTER_W = PANEL_X + PANEL_W - FILTER_X - 14
const FILTER_H = 180

// Folders in the sidebar
const FOLDERS = [
  { label: 'Входяща', count: 124, color: '#3b82f6', active: true },
  { label: 'Жалби', count: 18, color: '#22d3ee' },
  { label: 'Отчети', count: 32, color: '#a78bfa' },
  { label: 'Институции', count: 9, color: '#10b981', target: true },
  { label: 'Спам', count: 5, color: '#f59e0b', warn: true },
]
const FOLDER_H = 44
const FOLDER_GAP = 6

const folderY = (i) => SIDEBAR_Y + 40 + i * (FOLDER_H + FOLDER_GAP)

// Inbox rows (after the inbox header)
const ROWS = [
  { sender: 'МРРБ', subject: 'Отчет за качеството', filter: true, fresh: true },
  { sender: 'Иван Петров', subject: 'Жалба №42 — водомер', match: true },
  { sender: 'Колега', subject: 'Препратено: график' },
  { sender: 'Иван Иванов', subject: 'Запитване за такса', match: true },
  { sender: 'Доставчик', subject: 'Потвърждение' },
]
const ROW_H = 56
const ROW_GAP = 6
const rowY = (i) => INBOX_Y + 40 + i * (ROW_H + ROW_GAP)

// Target: "Институции" folder center (index 3)
const INST_CY = folderY(3) + FOLDER_H / 2
const INST_CX = SIDEBAR_X + SIDEBAR_W / 2

// Filter card center
const FILTER_CX = FILTER_X + FILTER_W / 2
const FILTER_CY = FILTER_Y + FILTER_H / 2

export default function Scene_3_4() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s34-panel-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#0b1220" />
          </linearGradient>
          <linearGradient id="s34-env-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <radialGradient id="s34-land-grad">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s34-match-grad">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <filter id="s34-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="s34-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Route: drops in at top of inbox area → dwells at filter card →
              curves left and down to "Институции" folder badge */}
          <path
            id="s34-route"
            d={`M ${INBOX_X + INBOX_W + 40} ${PANEL_Y - 10}
                C ${FILTER_CX + 40} ${FILTER_Y - 20},
                  ${FILTER_CX + 40} ${FILTER_CY - 40},
                  ${FILTER_CX} ${FILTER_CY}
                C ${FILTER_CX - 80} ${FILTER_CY + 60},
                  ${INST_CX + 200} ${INST_CY + 50},
                  ${INST_CX} ${INST_CY}`}
            fill="none"
          />
        </defs>

        {/* ===== Ambient ===== */}
        <circle
          cx="450" cy="290" r="280" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 9"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from="0 450 290" to="360 450 290"
            dur="65s" repeatCount="indefinite"
          />
        </circle>
        {[
          { x: 36, y: 540, d: 0 },
          { x: 866, y: 30, d: 1.6 },
          { x: 470, y: 540, d: 3.1 },
        ].map((p, i) => (
          <text
            key={`s34-bg-${i}`}
            x={p.x} y={p.y}
            fill="#1e293b" fontSize="16" fontWeight="700"
            style={{ fontFamily: 'monospace' }}
          >
            @
            <animate
              attributeName="opacity" values="0.3;0.7;0.3"
              dur="6s" begin={`${p.d}s`} repeatCount="indefinite"
            />
          </text>
        ))}

        {/* ===== Panel ===== */}
        <rect
          x={PANEL_X - 6} y={PANEL_Y - 6}
          width={PANEL_W + 12} height={PANEL_H + 12} rx="18"
          fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.16"
          filter="url(#s34-soft)"
        />
        <rect
          x={PANEL_X} y={PANEL_Y}
          width={PANEL_W} height={PANEL_H} rx="14"
          fill="url(#s34-panel-grad)" stroke="#3b82f6" strokeWidth="1.4"
          filter="url(#s34-glow)"
        >
          <animate
            attributeName="stroke-opacity" values="0.55;1;0.55"
            dur="5s" repeatCount="indefinite"
          />
        </rect>

        {/* Title row of the mock — small "ПОЩА" badge top-left */}
        <text
          x={PANEL_X + 18} y={PANEL_Y + 28}
          fill="#94a3b8" fontSize="10" fontWeight="700"
          style={{ letterSpacing: '0.22em' }}
        >
          ПОЩА
        </text>
        <line
          x1={PANEL_X + 14} y1={PANEL_Y + HEADER_H + 4}
          x2={PANEL_X + PANEL_W - 14} y2={PANEL_Y + HEADER_H + 4}
          stroke="#1e293b" strokeWidth="1"
        />

        {/* ===== Search bar ===== */}
        <g>
          <rect
            x={SEARCH_X} y={SEARCH_Y}
            width={SEARCH_W} height={SEARCH_H} rx="15"
            fill="#0b1220" stroke="#22d3ee" strokeWidth="1.4"
            filter="url(#s34-glow)"
          >
            <animate
              attributeName="stroke-opacity" values="0.5;1;0.5"
              dur="3.6s" repeatCount="indefinite"
            />
          </rect>
          {/* magnifier */}
          <g transform={`translate(${SEARCH_X + 14} ${SEARCH_Y + SEARCH_H / 2 - 6})`}>
            <circle cx="5" cy="5" r="5" fill="none" stroke="#22d3ee" strokeWidth="1.6" />
            <line x1="9" y1="9" x2="14" y2="14" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
          </g>
          {/* typed query, character-by-character via opacity stagger */}
          {[
            { ch: 'И', d: 0 },
            { ch: 'в', d: 0.25 },
            { ch: 'а', d: 0.5 },
            { ch: 'н', d: 0.75 },
          ].map((c, i) => (
            <text
              key={`s34-q-${i}`}
              x={SEARCH_X + 38 + i * 9} y={SEARCH_Y + 20}
              fill="#e2e8f0" fontSize="13" fontWeight="600"
              style={{ fontFamily: 'monospace' }}
              opacity="0"
            >
              {c.ch}
              <animate
                attributeName="opacity"
                values="0;0;1;1;0"
                keyTimes="0;0.05;0.1;0.85;1"
                dur="8s" begin={`${c.d}s`} repeatCount="indefinite"
              />
            </text>
          ))}
          {/* blinking cursor */}
          <rect
            x={SEARCH_X + 78} y={SEARCH_Y + 9} width="1.6" height="14"
            fill="#22d3ee"
          >
            <animate attributeName="opacity" values="1;0;1" dur="0.9s" repeatCount="indefinite" />
          </rect>
          {/* result count chip */}
          <g>
            <rect
              x={SEARCH_X + SEARCH_W - 88} y={SEARCH_Y + 7}
              width="74" height="16" rx="8"
              fill="#0b1220" stroke="#22d3ee" strokeWidth="1" opacity="0.85"
            />
            <text
              x={SEARCH_X + SEARCH_W - 51} y={SEARCH_Y + 19}
              textAnchor="middle"
              fill="#22d3ee" fontSize="9" fontWeight="700"
            >
              2 съвпадения
            </text>
          </g>
        </g>

        {/* ===== Sidebar header ===== */}
        <text
          x={SIDEBAR_X + 6} y={SIDEBAR_Y + 22}
          fill="#64748b" fontSize="9" fontWeight="700"
          style={{ letterSpacing: '0.2em' }}
        >
          ПАПКИ
        </text>

        {/* ===== Folder items ===== */}
        {FOLDERS.map((f, i) => {
          const y = folderY(i)
          return (
            <g key={`s34-folder-${i}`}>
              <rect
                x={SIDEBAR_X} y={y}
                width={SIDEBAR_W} height={FOLDER_H} rx="8"
                fill={f.active ? '#0f1b35' : '#0b1220'}
                stroke={f.active ? '#3b82f6' : '#1e293b'}
                strokeWidth={f.active ? '1.4' : '1'}
              />
              {/* color band */}
              <rect
                x={SIDEBAR_X + 4} y={y + 8}
                width="3" height={FOLDER_H - 16} rx="1.5"
                fill={f.color}
              >
                {f.target && (
                  <animate
                    attributeName="opacity" values="0.6;1;0.6"
                    dur="2.6s" repeatCount="indefinite"
                  />
                )}
              </rect>
              {/* folder icon */}
              <path
                d={`M ${SIDEBAR_X + 14} ${y + 16} l 0 16 a 2 2 0 0 0 2 2 l 14 0 a 2 2 0 0 0 2 -2 l 0 -10 a 2 2 0 0 0 -2 -2 l -6 0 l -2 -3 l -6 0 a 2 2 0 0 0 -2 2 z`}
                fill="none" stroke={f.color} strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <text
                x={SIDEBAR_X + 42} y={y + FOLDER_H / 2 + 4}
                fill={f.active || f.target ? '#e2e8f0' : '#94a3b8'}
                fontSize="12" fontWeight={f.active ? '700' : '600'}
              >
                {f.label}
              </text>
              <text
                x={SIDEBAR_X + SIDEBAR_W - 10} y={y + FOLDER_H / 2 + 4}
                textAnchor="end"
                fill="#64748b" fontSize="10" fontWeight="700"
                style={{ fontFamily: 'monospace' }}
              >
                {f.count}
              </text>
              {/* warn badge for Спам */}
              {f.warn && (
                <g transform={`translate(${SIDEBAR_X + SIDEBAR_W - 26} ${y + 10})`}>
                  <path
                    d="M 0 12 L 6 0 L 12 12 Z"
                    fill="none" stroke="#f59e0b" strokeWidth="1.4"
                    strokeLinejoin="round"
                  >
                    <animate
                      attributeName="stroke-opacity" values="0.5;1;0.5"
                      dur="2.2s" repeatCount="indefinite"
                    />
                  </path>
                  <line x1="6" y1="4" x2="6" y2="8" stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round" />
                  <circle cx="6" cy="10" r="0.7" fill="#f59e0b" />
                </g>
              )}
            </g>
          )
        })}

        {/* Landing halo on "Институции" folder when envelope arrives (~ end of 8s loop) */}
        <circle
          cx={INST_CX + 30} cy={INST_CY} r="0"
          fill="url(#s34-land-grad)"
        >
          <animate
            attributeName="r"
            values="0;48;48;0"
            keyTimes="0;0.88;0.96;1"
            dur="8s" repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.9;0.5;0"
            keyTimes="0;0.88;0.96;1"
            dur="8s" repeatCount="indefinite"
          />
        </circle>

        {/* ===== Inbox header ===== */}
        <text
          x={INBOX_X + 4} y={INBOX_Y + 22}
          fill="#64748b" fontSize="9" fontWeight="700"
          style={{ letterSpacing: '0.2em' }}
        >
          ВХОДЯЩА КУТИЯ
        </text>

        {/* ===== Inbox rows ===== */}
        {ROWS.map((r, i) => {
          const y = rowY(i)
          return (
            <g key={`s34-row-${i}`}>
              {/* match halo behind matching rows */}
              {r.match && (
                <ellipse
                  cx={INBOX_X + INBOX_W / 2} cy={y + ROW_H / 2}
                  rx={INBOX_W / 2 + 12} ry="22"
                  fill="url(#s34-match-grad)"
                >
                  <animate
                    attributeName="opacity"
                    values="0;0.6;0.6;0"
                    keyTimes="0;0.18;0.85;1"
                    dur="8s" begin={`${i * 0.4}s`} repeatCount="indefinite"
                  />
                </ellipse>
              )}
              <rect
                x={INBOX_X} y={y} width={INBOX_W} height={ROW_H} rx="8"
                fill={r.fresh ? '#101b32' : '#0b1220'}
                stroke={r.match ? '#22d3ee' : r.fresh ? '#3b82f6' : '#1e293b'}
                strokeWidth={r.match || r.fresh ? '1.4' : '1'}
              >
                {r.match && (
                  <animate
                    attributeName="stroke-opacity" values="0.4;1;0.4"
                    dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite"
                  />
                )}
                {r.fresh && (
                  <animate
                    attributeName="stroke-opacity" values="0.5;1;0.5"
                    dur="2.6s" repeatCount="indefinite"
                  />
                )}
              </rect>
              {/* unread dot */}
              <circle
                cx={INBOX_X + 12} cy={y + 18} r="3"
                fill={r.fresh ? '#3b82f6' : r.match ? '#22d3ee' : '#475569'}
              />
              <text
                x={INBOX_X + 24} y={y + 22}
                fill={r.match || r.fresh ? '#e2e8f0' : '#94a3b8'}
                fontSize="11.5" fontWeight={r.match || r.fresh ? '700' : '500'}
              >
                {r.sender}
              </text>
              <text
                x={INBOX_X + INBOX_W - 12} y={y + 22}
                textAnchor="end"
                fill="#64748b" fontSize="9"
              >
                {r.fresh ? 'сега' : `пр. ${i + 1}д`}
              </text>
              <text
                x={INBOX_X + 24} y={y + 40}
                fill={r.match ? '#94a3b8' : '#64748b'}
                fontSize="10.5"
              >
                {r.subject}
              </text>
            </g>
          )
        })}

        {/* ===== Filter rule card ===== */}
        <g>
          <rect
            x={FILTER_X - 4} y={FILTER_Y - 4}
            width={FILTER_W + 8} height={FILTER_H + 8} rx="14"
            fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.18"
            filter="url(#s34-soft)"
          />
          <rect
            x={FILTER_X} y={FILTER_Y}
            width={FILTER_W} height={FILTER_H} rx="12"
            fill="#0b1220" stroke="#a78bfa" strokeWidth="1.4"
            filter="url(#s34-glow)"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.45;1;0.45;1;0.45"
              keyTimes="0;0.3;0.5;0.6;1"
              dur="8s" repeatCount="indefinite"
            />
          </rect>
          {/* Header */}
          <text
            x={FILTER_X + 12} y={FILTER_Y + 18}
            fill="#a78bfa" fontSize="9" fontWeight="700"
            style={{ letterSpacing: '0.22em' }}
          >
            ФИЛТЪР
          </text>
          {/* gear icon */}
          <g transform={`translate(${FILTER_X + FILTER_W - 22} ${FILTER_Y + 14})`}>
            <circle cx="0" cy="0" r="6" fill="none" stroke="#a78bfa" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="2" fill="#a78bfa" />
            {[0, 60, 120, 180, 240, 300].map((deg, k) => (
              <line
                key={`s34-gear-${k}`}
                x1="0" y1="-6" x2="0" y2="-8.5"
                stroke="#a78bfa" strokeWidth="1.4" strokeLinecap="round"
                transform={`rotate(${deg})`}
              />
            ))}
            <animateTransform
              attributeName="transform" type="rotate"
              from="0 0 0" to="360 0 0"
              dur="14s" repeatCount="indefinite"
              additive="sum"
            />
          </g>

          {/* Rule body — condition */}
          <text
            x={FILTER_X + 12} y={FILTER_Y + 44}
            fill="#94a3b8" fontSize="9.5" fontWeight="700"
            style={{ letterSpacing: '0.12em' }}
          >
            АКО подател =
          </text>
          <rect
            x={FILTER_X + 12} y={FILTER_Y + 52}
            width={FILTER_W - 24} height="26" rx="6"
            fill="#0f172a" stroke="#1e293b" strokeWidth="1"
          />
          <text
            x={FILTER_X + 22} y={FILTER_Y + 70}
            fill="#e2e8f0" fontSize="11" fontWeight="600"
            style={{ fontFamily: 'monospace' }}
          >
            mrrb.government.bg
          </text>

          {/* arrow down */}
          <g transform={`translate(${FILTER_CX} ${FILTER_Y + 90})`}>
            <line x1="0" y1="0" x2="0" y2="16" stroke="#a78bfa" strokeWidth="1.6" />
            <path d="M -4 12 L 0 18 L 4 12" fill="none" stroke="#a78bfa" strokeWidth="1.6" strokeLinejoin="round" />
          </g>

          {/* Action */}
          <text
            x={FILTER_X + 12} y={FILTER_Y + 124}
            fill="#94a3b8" fontSize="9.5" fontWeight="700"
            style={{ letterSpacing: '0.12em' }}
          >
            ТОГАВА премести в
          </text>
          <rect
            x={FILTER_X + 12} y={FILTER_Y + 132}
            width={FILTER_W - 24} height="26" rx="6"
            fill="#0f1b35" stroke="#10b981" strokeWidth="1.2"
          >
            <animate
              attributeName="stroke-opacity" values="0.4;1;0.4"
              dur="2.8s" repeatCount="indefinite"
            />
          </rect>
          <text
            x={FILTER_X + 22} y={FILTER_Y + 150}
            fill="#10b981" fontSize="11" fontWeight="700"
          >
            папка „Институции"
          </text>

          {/* Match pulse halo — fires when envelope passes through */}
          <circle
            cx={FILTER_CX} cy={FILTER_CY} r="0"
            fill="url(#s34-match-grad)"
          >
            <animate
              attributeName="r"
              values="0;70;70;0"
              keyTimes="0;0.45;0.55;0.62"
              dur="8s" repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.9;0.6;0"
              keyTimes="0;0.45;0.55;0.62"
              dur="8s" repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* ===== Route guideline (faint) ===== */}
        <use
          href="#s34-route"
          stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 6" opacity="0.22"
        >
          <animate
            attributeName="stroke-dashoffset" from="9" to="0"
            dur="1.6s" repeatCount="indefinite"
          />
        </use>

        {/* ===== Envelope token — drops in, pauses at filter, lands in folder ===== */}
        <g filter="url(#s34-glow)">
          <g transform="translate(-14 -10)">
            <rect width="28" height="20" rx="2" fill="url(#s34-env-grad)" stroke="#60a5fa" strokeWidth="1" />
            <path d="M 0 0 L 14 12 L 28 0" fill="none" stroke="#e2e8f0" strokeWidth="1.2" />
          </g>
          <animateMotion
            dur="8s" repeatCount="indefinite" rotate="0"
            keyPoints="0;0.45;0.55;1"
            keyTimes="0;0.4;0.6;1"
            calcMode="linear"
          >
            <mpath href="#s34-route" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;1;1;0"
            keyTimes="0;0.05;0.4;0.6;0.92;1"
            dur="8s" repeatCount="indefinite"
          />
        </g>

        {/* ===== Callouts ===== */}
        {/* search callout */}
        <g opacity="0.85">
          <line
            x1={SEARCH_X + 40} y1={SEARCH_Y + SEARCH_H + 2}
            x2={SEARCH_X + 40} y2={SEARCH_Y + SEARCH_H + 14}
            stroke="#22d3ee" strokeWidth="1" strokeDasharray="2 4" opacity="0.5"
          />
          <text
            x={SEARCH_X + 40} y={SEARCH_Y + SEARCH_H + 24}
            textAnchor="start"
            fill="#22d3ee" fontSize="9" fontWeight="700"
            style={{ letterSpacing: '0.14em' }}
          >
            ТЪРСЕНЕ
          </text>
        </g>
        {/* filter callout */}
        <g opacity="0.85">
          <text
            x={FILTER_X + FILTER_W / 2} y={FILTER_Y + FILTER_H + 22}
            textAnchor="middle"
            fill="#a78bfa" fontSize="9" fontWeight="700"
            style={{ letterSpacing: '0.14em' }}
          >
            ПРАВИЛО ЗА СОРТИРАНЕ
          </text>
        </g>
      </svg>
    </div>
  )
}
