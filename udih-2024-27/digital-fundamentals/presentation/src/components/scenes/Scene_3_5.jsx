// Scene 3.5 — Календар, задачи, контакти
// Pattern: hub & orbit — one account hub (@), three orbiting tool mock-cards.
// The hub is a glowing account badge. Three mini-cards orbit it: a calendar
// with a week strip and a pulsing event next to a ringing bell, a task list
// with checkboxes that tick one by one, and a contacts panel with an
// autocomplete that fills in a colleague's email after the name is typed.
// Lines connect the hub to each card with traveling dots — the visual claim
// is "all three share the same account".

const CX = 450
const CY = 290

const CAL = { cx: 460, cy: 115, w: 240, h: 150, color: '#3b82f6' }
const TAS = { cx: 670, cy: 410, w: 210, h: 160, color: '#22d3ee' }
const CON = { cx: 230, cy: 410, w: 230, h: 160, color: '#a78bfa' }

const CAL_X = CAL.cx - CAL.w / 2
const CAL_Y = CAL.cy - CAL.h / 2
const TAS_X = TAS.cx - TAS.w / 2
const TAS_Y = TAS.cy - TAS.h / 2
const CON_X = CON.cx - CON.w / 2
const CON_Y = CON.cy - CON.h / 2

// Calendar week strip: 5 cells in one row (Пн–Пт), one is the highlighted event day
const CAL_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт']
const EVENT_DAY = 1 // Вт
const CELL_W = 36
const CELL_H = 30
const CELL_GAP = 4
const CAL_GRID_TOTAL = 5 * CELL_W + 4 * CELL_GAP
const CAL_GRID_X = CAL_X + (CAL.w - CAL_GRID_TOTAL) / 2
const CAL_GRID_Y = CAL_Y + 48

// Task items
const TASKS = [
  { label: 'Изпратя отчет', state: 'done' },
  { label: 'Звънна доставчик', state: 'done' },
  { label: 'Подпиша протокол', state: 'ticking' },
  { label: 'Прегледам жалбите', state: 'todo' },
]
const TASK_ROW_H = 22
const TASK_GAP = 4
const TASK_X = TAS_X + 14
const TASK_Y = TAS_Y + 44

export default function Scene_3_5() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="s35-hub-grad">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.45" />
            <stop offset="80%" stopColor="#1e3a8a" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s35-cal-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#0b1220" />
          </linearGradient>
          <radialGradient id="s35-event-grad">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s35-match-grad">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </radialGradient>
          <filter id="s35-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="s35-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ===== Ambient ===== */}
        <circle
          cx={CX} cy={CY} r="248" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 9"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`}
            dur="60s" repeatCount="indefinite"
          />
        </circle>
        {[
          { x: 70, y: 80, d: 0 },
          { x: 820, y: 80, d: 1.4 },
          { x: 70, y: 530, d: 2.6 },
          { x: 820, y: 530, d: 3.8 },
        ].map((p, i) => (
          <text
            key={`s35-bg-${i}`}
            x={p.x} y={p.y}
            fill="#1e293b" fontSize="18" fontWeight="700"
            style={{ fontFamily: 'monospace' }}
          >
            @
            <animate
              attributeName="opacity" values="0.25;0.65;0.25"
              dur="6s" begin={`${p.d}s`} repeatCount="indefinite"
            />
          </text>
        ))}

        {/* ===== Connections hub → card with traveling packet ===== */}
        {[CAL, TAS, CON].map((c, i) => (
          <g key={`s35-link-${i}`}>
            <line
              x1={CX} y1={CY} x2={c.cx} y2={c.cy}
              stroke="#334155" strokeWidth="1"
              strokeDasharray="4 6" opacity="0.55"
            >
              <animate
                attributeName="stroke-dashoffset" from="10" to="0"
                dur="1.8s" repeatCount="indefinite"
              />
            </line>
            <circle r="3.6" fill={c.color} filter="url(#s35-glow)">
              <animateMotion
                dur={`${4.4 + i * 0.5}s`} repeatCount="indefinite"
                path={`M ${CX} ${CY} L ${c.cx} ${c.cy}`}
              />
            </circle>
          </g>
        ))}

        {/* ===== Central hub: акаунт ===== */}
        <g transform={`translate(${CX} ${CY})`}>
          <circle r="64" fill="url(#s35-hub-grad)" />
          {[0, 1.6, 3.2].map((d, i) => (
            <circle key={`s35-pulse-${i}`} r="42" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="42;84" dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <circle r="42" fill="#0b1220" stroke="#60a5fa" strokeWidth="2" filter="url(#s35-glow)">
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="3.6s" repeatCount="indefinite" />
          </circle>
          <text
            x="0" y="6" textAnchor="middle" dominantBaseline="middle"
            fill="#e2e8f0" fontSize="38" fontWeight="700"
            style={{ fontFamily: 'monospace' }}
          >
            @
          </text>
          <text
            x="0" y="62" textAnchor="middle"
            fill="#94a3b8" fontSize="10" fontWeight="700"
            style={{ letterSpacing: '0.24em' }}
          >
            АКАУНТ
          </text>
        </g>

        {/* ============== CALENDAR CARD ============== */}
        <g>
          {/* soft halo */}
          <rect
            x={CAL_X - 6} y={CAL_Y - 6}
            width={CAL.w + 12} height={CAL.h + 12} rx="16"
            fill="none" stroke={CAL.color} strokeWidth="1" opacity="0.16"
            filter="url(#s35-soft)"
          />
          <rect
            x={CAL_X} y={CAL_Y}
            width={CAL.w} height={CAL.h} rx="12"
            fill="url(#s35-cal-grad)" stroke={CAL.color} strokeWidth="1.4"
            filter="url(#s35-glow)"
          >
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="5s" repeatCount="indefinite" />
          </rect>
          <text
            x={CAL_X + 14} y={CAL_Y + 22}
            fill={CAL.color} fontSize="10" fontWeight="700"
            style={{ letterSpacing: '0.22em' }}
          >
            КАЛЕНДАР
          </text>

          {/* Bell icon top-right with animated wobble */}
          <g transform={`translate(${CAL_X + CAL.w - 26} ${CAL_Y + 22})`}>
            <g>
              <path
                d="M -7 -2 a 7 7 0 0 1 14 0 l 0 5 l 2 4 l -18 0 l 2 -4 z"
                fill="none" stroke="#f59e0b" strokeWidth="1.4" strokeLinejoin="round"
              />
              <circle cx="0" cy="11" r="2" fill="none" stroke="#f59e0b" strokeWidth="1.4" />
              <animateTransform
                attributeName="transform" type="rotate"
                values="-12;14;-10;10;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0"
                keyTimes="0;0.02;0.04;0.06;0.08;0.1;0.15;0.2;0.25;0.3;0.35;0.4;0.45;0.5;0.55;0.6;0.65;0.7;0.85;1"
                dur="6s" repeatCount="indefinite"
              />
            </g>
            {[0, 0.4].map((d, k) => (
              <circle key={`s35-bell-${k}`} r="6" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0">
                <animate attributeName="r" values="6;22" dur="1.6s" begin={`${d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0" dur="1.6s" begin={`${d}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>

          {/* Day-name row */}
          {CAL_DAYS.map((d, i) => (
            <text
              key={`s35-cal-h-${i}`}
              x={CAL_GRID_X + i * (CELL_W + CELL_GAP) + CELL_W / 2}
              y={CAL_GRID_Y - 4}
              textAnchor="middle"
              fill="#64748b" fontSize="8.5" fontWeight="700"
              style={{ letterSpacing: '0.14em' }}
            >
              {d}
            </text>
          ))}

          {/* Day cells */}
          {CAL_DAYS.map((_, i) => {
            const x = CAL_GRID_X + i * (CELL_W + CELL_GAP)
            const y = CAL_GRID_Y
            const isEvent = i === EVENT_DAY
            return (
              <g key={`s35-cal-c-${i}`}>
                {isEvent && (
                  <ellipse
                    cx={x + CELL_W / 2} cy={y + CELL_H / 2}
                    rx={CELL_W / 2 + 8} ry={CELL_H / 2 + 6}
                    fill="url(#s35-event-grad)"
                  >
                    <animate
                      attributeName="opacity" values="0.4;1;0.4"
                      dur="2.6s" repeatCount="indefinite"
                    />
                  </ellipse>
                )}
                <rect
                  x={x} y={y} width={CELL_W} height={CELL_H} rx="4"
                  fill={isEvent ? '#101b32' : '#0b1220'}
                  stroke={isEvent ? CAL.color : '#1e293b'}
                  strokeWidth={isEvent ? '1.4' : '1'}
                >
                  {isEvent && (
                    <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.6s" repeatCount="indefinite" />
                  )}
                </rect>
                <text
                  x={x + CELL_W / 2} y={y + CELL_H / 2 + 4}
                  textAnchor="middle"
                  fill={isEvent ? '#e2e8f0' : '#475569'}
                  fontSize="11" fontWeight={isEvent ? '700' : '500'}
                  style={{ fontFamily: 'monospace' }}
                >
                  {12 + i}
                </text>
                {isEvent && (
                  <circle cx={x + CELL_W - 6} cy={y + 6} r="2" fill={CAL.color}>
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2.2s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            )
          })}

          {/* Event row below: "10:00 — Среща на отдела" */}
          <g>
            <rect
              x={CAL_X + 14} y={CAL_Y + CAL.h - 32}
              width={CAL.w - 28} height="22" rx="6"
              fill="#0f1b35" stroke={CAL.color} strokeWidth="1"
            >
              <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
            </rect>
            <rect
              x={CAL_X + 20} y={CAL_Y + CAL.h - 26}
              width="3" height="10" rx="1.5" fill={CAL.color}
            />
            <text
              x={CAL_X + 30} y={CAL_Y + CAL.h - 17}
              fill="#e2e8f0" fontSize="10.5" fontWeight="600"
            >
              10:00
            </text>
            <text
              x={CAL_X + 66} y={CAL_Y + CAL.h - 17}
              fill="#94a3b8" fontSize="10"
            >
              Среща на отдела
            </text>
          </g>
        </g>

        {/* ============== TASKS CARD ============== */}
        <g>
          <rect
            x={TAS_X - 6} y={TAS_Y - 6}
            width={TAS.w + 12} height={TAS.h + 12} rx="16"
            fill="none" stroke={TAS.color} strokeWidth="1" opacity="0.16"
            filter="url(#s35-soft)"
          />
          <rect
            x={TAS_X} y={TAS_Y}
            width={TAS.w} height={TAS.h} rx="12"
            fill="url(#s35-cal-grad)" stroke={TAS.color} strokeWidth="1.4"
            filter="url(#s35-glow)"
          >
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="5s" repeatCount="indefinite" />
          </rect>
          <text
            x={TAS_X + 14} y={TAS_Y + 22}
            fill={TAS.color} fontSize="10" fontWeight="700"
            style={{ letterSpacing: '0.22em' }}
          >
            ЗАДАЧИ
          </text>
          {/* small "3/4" progress chip */}
          <g>
            <rect
              x={TAS_X + TAS.w - 50} y={TAS_Y + 10}
              width="38" height="16" rx="8"
              fill="#0b1220" stroke={TAS.color} strokeWidth="1" opacity="0.85"
            />
            <text
              x={TAS_X + TAS.w - 31} y={TAS_Y + 22}
              textAnchor="middle"
              fill={TAS.color} fontSize="9" fontWeight="700"
              style={{ fontFamily: 'monospace' }}
            >
              3 / 4
            </text>
          </g>

          {/* Task rows */}
          {TASKS.map((t, i) => {
            const y = TASK_Y + i * (TASK_ROW_H + TASK_GAP)
            const isDone = t.state === 'done'
            const isTicking = t.state === 'ticking'
            return (
              <g key={`s35-task-${i}`}>
                {/* checkbox */}
                <rect
                  x={TASK_X} y={y}
                  width="14" height="14" rx="3"
                  fill={isDone ? '#0f1b35' : '#0b1220'}
                  stroke={isDone || isTicking ? TAS.color : '#475569'}
                  strokeWidth="1.4"
                >
                  {isTicking && (
                    <animate
                      attributeName="stroke" values="#475569;#22d3ee;#475569"
                      dur="3.6s" repeatCount="indefinite"
                    />
                  )}
                </rect>
                {/* check mark — always shown for done; animated draw for ticking */}
                {(isDone || isTicking) && (
                  <path
                    d={`M ${TASK_X + 3} ${y + 7} l 3.5 4 l 5 -7`}
                    fill="none"
                    stroke={isDone ? TAS.color : TAS.color}
                    strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"
                    strokeDasharray={isTicking ? '14' : 'none'}
                    strokeDashoffset={isTicking ? '14' : '0'}
                  >
                    {isTicking && (
                      <>
                        <animate
                          attributeName="stroke-dashoffset"
                          values="14;14;0;0;14"
                          keyTimes="0;0.35;0.45;0.9;1"
                          dur="3.6s" repeatCount="indefinite"
                        />
                      </>
                    )}
                  </path>
                )}
                {/* label */}
                <text
                  x={TASK_X + 24} y={y + 11}
                  fill={isDone ? '#64748b' : isTicking ? '#e2e8f0' : '#94a3b8'}
                  fontSize="11"
                  fontWeight={isTicking ? '700' : '500'}
                >
                  {t.label}
                </text>
                {/* strikethrough for done */}
                {isDone && (
                  <line
                    x1={TASK_X + 24} y1={y + 7}
                    x2={TASK_X + 24 + t.label.length * 5.6} y2={y + 7}
                    stroke="#475569" strokeWidth="1"
                  />
                )}
              </g>
            )
          })}
        </g>

        {/* ============== CONTACTS CARD ============== */}
        <g>
          <rect
            x={CON_X - 6} y={CON_Y - 6}
            width={CON.w + 12} height={CON.h + 12} rx="16"
            fill="none" stroke={CON.color} strokeWidth="1" opacity="0.16"
            filter="url(#s35-soft)"
          />
          <rect
            x={CON_X} y={CON_Y}
            width={CON.w} height={CON.h} rx="12"
            fill="url(#s35-cal-grad)" stroke={CON.color} strokeWidth="1.4"
            filter="url(#s35-glow)"
          >
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="5s" repeatCount="indefinite" />
          </rect>
          <text
            x={CON_X + 14} y={CON_Y + 22}
            fill={CON.color} fontSize="10" fontWeight="700"
            style={{ letterSpacing: '0.22em' }}
          >
            КОНТАКТИ
          </text>

          {/* "До:" input field with typed letters */}
          <g>
            <text
              x={CON_X + 14} y={CON_Y + 44}
              fill="#64748b" fontSize="9" fontWeight="700"
              style={{ letterSpacing: '0.18em' }}
            >
              ДО
            </text>
            <rect
              x={CON_X + 14} y={CON_Y + 50}
              width={CON.w - 28} height="22" rx="6"
              fill="#0f172a" stroke={CON.color} strokeWidth="1"
            >
              <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
            </rect>
            {/* typed query: "Пет" → reveal letters; then suggestion expands */}
            {[
              { ch: 'П', d: 0 },
              { ch: 'е', d: 0.3 },
              { ch: 'т', d: 0.6 },
            ].map((c, i) => (
              <text
                key={`s35-q-${i}`}
                x={CON_X + 22 + i * 8} y={CON_Y + 65}
                fill="#e2e8f0" fontSize="11" fontWeight="700"
                style={{ fontFamily: 'monospace' }}
                opacity="0"
              >
                {c.ch}
                <animate
                  attributeName="opacity"
                  values="0;0;1;1;0"
                  keyTimes="0;0.05;0.1;0.85;1"
                  dur="6s" begin={`${c.d}s`} repeatCount="indefinite"
                />
              </text>
            ))}
            {/* blinking cursor */}
            <rect
              x={CON_X + 48} y={CON_Y + 55} width="1.6" height="13"
              fill={CON.color}
            >
              <animate attributeName="opacity" values="1;0;1" dur="0.9s" repeatCount="indefinite" />
            </rect>
          </g>

          {/* Suggestion dropdown — appears after typing */}
          <g>
            <rect
              x={CON_X + 14} y={CON_Y + 78}
              width={CON.w - 28} height="56" rx="8"
              fill="#101b32" stroke={CON.color} strokeWidth="1.2" opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;0;0.95;0.95;0"
                keyTimes="0;0.2;0.3;0.92;1"
                dur="6s" repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                values="0.5;1;0.5"
                dur="2.6s" repeatCount="indefinite"
              />
            </rect>
            {/* match halo */}
            <ellipse
              cx={CON_X + CON.w / 2} cy={CON_Y + 106}
              rx={CON.w / 2 - 8} ry="22"
              fill="url(#s35-match-grad)" opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;0;0.7;0.6;0"
                keyTimes="0;0.2;0.32;0.85;1"
                dur="6s" repeatCount="indefinite"
              />
            </ellipse>
            {/* avatar */}
            <g transform={`translate(${CON_X + 26} ${CON_Y + 106})`}>
              <circle r="11" fill="#1e3a8a" stroke={CON.color} strokeWidth="1.4" opacity="0">
                <animate
                  attributeName="opacity"
                  values="0;0;1;1;0"
                  keyTimes="0;0.22;0.3;0.92;1"
                  dur="6s" repeatCount="indefinite"
                />
              </circle>
              <text
                x="0" y="4" textAnchor="middle"
                fill="#e2e8f0" fontSize="9" fontWeight="700"
                opacity="0"
              >
                ПА
                <animate
                  attributeName="opacity"
                  values="0;0;1;1;0"
                  keyTimes="0;0.22;0.3;0.92;1"
                  dur="6s" repeatCount="indefinite"
                />
              </text>
            </g>
            <text
              x={CON_X + 46} y={CON_Y + 102}
              fill="#e2e8f0" fontSize="11" fontWeight="700"
              opacity="0"
            >
              Петър — аварии
              <animate
                attributeName="opacity"
                values="0;0;1;1;0"
                keyTimes="0;0.22;0.3;0.92;1"
                dur="6s" repeatCount="indefinite"
              />
            </text>
            <text
              x={CON_X + 46} y={CON_Y + 118}
              fill="#94a3b8" fontSize="9.5"
              style={{ fontFamily: 'monospace' }}
              opacity="0"
            >
              petar@vik.example
              <animate
                attributeName="opacity"
                values="0;0;1;1;0"
                keyTimes="0;0.22;0.3;0.92;1"
                dur="6s" repeatCount="indefinite"
              />
            </text>
          </g>
        </g>
      </svg>
    </div>
  )
}
