// Scene 1.4 — Основна навигация в Windows
// Pattern: annotated mock — a stylised Windows desktop. The mouse pointer makes
// a guided tour of five real targets (Start, the window, minimize, the taskbar,
// close). At each stop it pauses and performs a visible CLICK: a press dip of
// the pointer, a cyan ripple from the tip, the target glows, and a caption at
// the bottom names what just happened. The graphic IS the lesson.

export default function Scene_1_4() {
  // Window content — fake document lines.
  const docLines = [
    { y: 232, w: 286 },
    { y: 250, w: 246 },
    { y: 268, w: 300 },
    { y: 286, w: 200 },
    { y: 322, w: 262 },
    { y: 340, w: 168 },
  ]

  // The guided tour. `k` = keyTime of the click within the 24s loop.
  const targets = [
    {
      id: 's14-start', k: 0.07, cx: 147, cy: 474,
      hl: { x: 120, y: 461, w: 54, h: 27, rx: 6 }, color: '#60a5fa',
      cap: 'Клик върху „Старт" — отваря всички програми',
      capKeyTimes: '0;0.15;0.18;0.99;1', capValues: '1;1;0;0;1',
    },
    {
      id: 's14-win', k: 0.27, cx: 470, cy: 175,
      hl: { x: 352, y: 158, w: 346, h: 212, rx: 8 }, color: '#60a5fa',
      cap: 'Клик в прозореца — програмата излиза отпред',
      capKeyTimes: '0;0.19;0.21;0.36;0.38;1', capValues: '0;0;1;1;0;0',
    },
    {
      id: 's14-min', k: 0.47, cx: 630, cy: 173,
      hl: { x: 614, y: 157, w: 32, h: 32, rx: 5 }, color: '#60a5fa',
      cap: 'Чертичка — скрива прозореца в лентата',
      capKeyTimes: '0;0.39;0.41;0.56;0.58;1', capValues: '0;0;1;1;0;0',
    },
    {
      id: 's14-task', k: 0.67, cx: 202, cy: 474,
      hl: { x: 190, y: 462, w: 25, h: 25, rx: 4 }, color: '#60a5fa',
      cap: 'Клик в лентата на задачите — връща прозореца',
      capKeyTimes: '0;0.59;0.61;0.76;0.78;1', capValues: '0;0;1;1;0;0',
    },
    {
      id: 's14-close', k: 0.87, cx: 682, cy: 173,
      hl: { x: 666, y: 157, w: 32, h: 32, rx: 5 }, color: '#f87171',
      cap: 'Хиксче — затваря програмата',
      capKeyTimes: '0;0.79;0.81;0.96;0.98;1', capValues: '0;0;1;1;0;0',
    },
  ]
  const f = (n) => Number(n.toFixed(3))

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s14-wall" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#13233f" />
            <stop offset="55%" stopColor="#0d1830" />
            <stop offset="100%" stopColor="#0a1326" />
          </linearGradient>
          <linearGradient id="s14-title" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0.9" />
          </linearGradient>
          <filter id="s14-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ===== Screen ===== */}
        <rect x="115" y="96" width="670" height="394" rx="12"
          fill="url(#s14-wall)" stroke="#334155" strokeWidth="1.5" />

        {/* ---- Desktop icons (top-left) ---- */}
        {/* Folder icon */}
        <g transform="translate(165 146)">
          <g fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5"
            strokeLinejoin="round">
            <path d="M -13 -8 L -3 -8 L 0 -4 L 13 -4 L 13 9 L -13 9 Z" />
          </g>
          <text x="0" y="26" textAnchor="middle" fill="#cbd5e1" fontSize="10.5">
            Документи
          </text>
        </g>
        {/* Recycle bin icon */}
        <g transform="translate(165 214)">
          <g fill="none" stroke="#64748b" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M -9 -7 L 9 -7 M -11 -7 L 11 -7 M -7 -7 L -6 11 L 6 11 L 7 -7" />
            <path d="M -3 -7 L -3 -10 L 3 -10 L 3 -7" />
            <line x1="-2" y1="-2" x2="-2" y2="7" />
            <line x1="2" y1="-2" x2="2" y2="7" />
          </g>
          <text x="0" y="26" textAnchor="middle" fill="#cbd5e1" fontSize="10.5">
            Кошче
          </text>
        </g>

        {/* ---- Second window peeking behind ---- */}
        <g opacity="0.55">
          <rect x="296" y="126" width="300" height="172" rx="7"
            fill="#0b1220" stroke="#334155" strokeWidth="1.2" />
          <rect x="296" y="126" width="300" height="26" rx="7"
            fill="#1e293b" />
          <rect x="296" y="140" width="300" height="12" fill="#1e293b" />
        </g>

        {/* ---- Focused window ---- */}
        <g filter="url(#s14-glow)">
          <rect x="352" y="158" width="346" height="212" rx="8"
            fill="#0b1220" stroke="#3b82f6" strokeWidth="1.6">
            <animate attributeName="stroke-opacity" values="0.7;1;0.7"
              dur="4s" repeatCount="indefinite" />
          </rect>
        </g>
        {/* Title bar */}
        <path d="M 352 166 Q 352 158 360 158 L 690 158 Q 698 158 698 166 L 698 188 L 352 188 Z"
          fill="url(#s14-title)" />
        <circle cx="367" cy="173" r="4.5" fill="none" stroke="#93c5fd" strokeWidth="1.4" />
        <text x="380" y="177" fill="#cbd5e1" fontSize="11.5" fontWeight="600">
          Документ — Бележник
        </text>
        {/* Control buttons */}
        {/* minimize */}
        <g>
          <rect x="618" y="161" width="24" height="24" rx="3" fill="#1e293b" />
          <line x1="624" y1="175" x2="636" y2="175" stroke="#cbd5e1"
            strokeWidth="1.6" strokeLinecap="round" />
        </g>
        {/* maximize */}
        <g>
          <rect x="644" y="161" width="24" height="24" rx="3" fill="#1e293b" />
          <rect x="650" y="167" width="12" height="12" rx="1.5" fill="none"
            stroke="#cbd5e1" strokeWidth="1.6" />
        </g>
        {/* close */}
        <g>
          <rect x="670" y="161" width="24" height="24" rx="3" fill="#7f1d1d" />
          <line x1="676" y1="167" x2="688" y2="179" stroke="#fecaca"
            strokeWidth="1.8" strokeLinecap="round" />
          <line x1="688" y1="167" x2="676" y2="179" stroke="#fecaca"
            strokeWidth="1.8" strokeLinecap="round" />
        </g>
        {/* Window body — fake document */}
        {docLines.map((l, i) => (
          <rect key={i} x="372" y={l.y} width={l.w} height="6" rx="3"
            fill="#1e293b">
            <animate attributeName="opacity" values="0.55;0.9;0.55"
              dur={`${5 + i * 0.5}s`} repeatCount="indefinite" />
          </rect>
        ))}
        {/* Blinking text cursor at the end of the last line */}
        <line x1="548" y1="335" x2="548" y2="347" stroke="#60a5fa"
          strokeWidth="2" strokeLinecap="round">
          <animate attributeName="opacity" values="1;1;0;0;1"
            keyTimes="0;0.45;0.5;0.95;1" dur="1.6s" repeatCount="indefinite" />
        </line>

        {/* ===== Taskbar ===== */}
        <rect x="115" y="459" width="670" height="31" rx="0"
          fill="#0f172a" fillOpacity="0.96" />
        <rect x="115" y="459" width="670" height="1.5" fill="#334155" />
        {/* Start button */}
        <g>
          <rect x="123" y="464" width="48" height="21" rx="4"
            fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1" />
          {/* Windows logo — four panes */}
          <g transform="translate(141 474.5)">
            <rect x="-7" y="-6.5" width="6" height="6" fill="#60a5fa" />
            <rect x="1" y="-6.5" width="6" height="6" fill="#60a5fa" />
            <rect x="-7" y="1" width="6" height="6" fill="#60a5fa" />
            <rect x="1" y="1" width="6" height="6" fill="#60a5fa" />
          </g>
        </g>
        {/* Taskbar program icons */}
        {[195, 224, 253].map((x, i) => (
          <g key={x}>
            <rect x={x} y={467} width="15" height="15" rx="2.5"
              fill="#0b1220" stroke="#475569" strokeWidth="1" />
            {i === 0 && (
              <rect x={x + 1} y="486" width="13" height="2" rx="1" fill="#60a5fa" />
            )}
          </g>
        ))}
        {/* Clock */}
        <text x="766" y="471" textAnchor="end" fill="#cbd5e1" fontSize="9.5"
          fontFamily="monospace">
          14:25
        </text>
        <text x="766" y="483" textAnchor="end" fill="#64748b" fontSize="8"
          fontFamily="monospace">
          22.05.2026
        </text>

        {/* ===== Click highlights — each target glows when the pointer clicks it ===== */}
        {targets.map((t) => (
          <rect key={`hl-${t.id}`} x={t.hl.x} y={t.hl.y}
            width={t.hl.w} height={t.hl.h} rx={t.hl.rx} fill="none"
            stroke={t.color} strokeWidth="2.2" opacity="0">
            <animate attributeName="opacity" dur="24s" repeatCount="indefinite"
              values="0;0;0.95;0.95;0;0"
              keyTimes={`0;${f(t.k - 0.03)};${t.k};${f(t.k + 0.08)};${f(t.k + 0.12)};1`} />
          </rect>
        ))}

        {/* ===== Click ripples — a cyan ring expands from each target on click ===== */}
        {targets.map((t) => (
          <circle key={`rp-${t.id}`} cx={t.cx} cy={t.cy} r="3"
            fill="none" stroke="#67e8f9" strokeWidth="2">
            <animate attributeName="r" dur="24s" repeatCount="indefinite"
              values="3;3;24;3;3"
              keyTimes={`0;${t.k};${f(t.k + 0.05)};${f(t.k + 0.052)};1`} />
            <animate attributeName="opacity" dur="24s" repeatCount="indefinite"
              values="0;0;0.9;0;0"
              keyTimes={`0;${t.k};${f(t.k + 0.006)};${f(t.k + 0.05)};1`} />
          </circle>
        ))}

        {/* ===== Mouse pointer — guided tour with a press dip at every stop ===== */}
        <g>
          {/* travel + dwell: identical coords repeated => the pointer pauses */}
          <animateTransform attributeName="transform" type="translate"
            dur="24s" repeatCount="indefinite" calcMode="linear"
            values="147 474; 147 474; 470 175; 470 175; 630 173; 630 173; 202 474; 202 474; 682 173; 682 173; 147 474"
            keyTimes="0;0.14;0.20;0.34;0.40;0.54;0.60;0.74;0.80;0.94;1" />
          {/* pointer arrow — dips to 0.8 scale at each click, like a press */}
          <path
            d="M0 0 L0 17 L4.6 12.8 L7.8 19.6 L10.6 18.3 L7.4 11.7 L13 11.7 Z"
            fill="#f1f5f9" stroke="#0b1220" strokeWidth="1.2"
            strokeLinejoin="round"
          >
            <animateTransform attributeName="transform" type="scale"
              dur="24s" repeatCount="indefinite" additive="sum"
              values="1;1;0.8;1;1;0.8;1;1;0.8;1;1;0.8;1;1;0.8;1;1"
              keyTimes="0;0.058;0.07;0.084;0.258;0.27;0.284;0.458;0.47;0.484;0.658;0.67;0.684;0.858;0.87;0.884;1" />
          </path>
        </g>

        {/* ===== Caption — names the current step ===== */}
        {targets.map((t) => (
          <text key={`cap-${t.id}`} x="450" y="513" textAnchor="middle"
            fill="#cbd5e1" fontSize="12.5" opacity="0">
            {t.cap}
            <animate attributeName="opacity" dur="24s" repeatCount="indefinite"
              values={t.capValues} keyTimes={t.capKeyTimes} />
          </text>
        ))}
      </svg>
    </div>
  )
}
