// Scene 3.2 — Създаване на имейл акаунт
// Pattern: annotated mock — a stylised Gmail signup card with a focus ring
// jumping through the fields (name, username, password, phone, submit), two
// side callouts on the username and phone fields, and a finished email chip
// that emerges below the form once focus reaches the submit button.

const CX = 450

const FORM_W = 360
const FORM_X = CX - FORM_W / 2 // 270
const FORM_Y = 80
const FORM_H = 380
const FIELD_X = FORM_X + 20 // 290
const FIELD_W = FORM_W - 40 // 320

// Each row: top of the input rectangle, plus its height.
const FIELDS = [
  { y: 170, h: 32, kind: 'name' },
  { y: 215, h: 32, kind: 'username' },
  { y: 260, h: 32, kind: 'password' },
  { y: 305, h: 32, kind: 'phone' },
  { y: 350, h: 40, kind: 'submit' },
]

// Cycle: 8s total, 1.6s per slot. Focus highlights one field per slot.
const CYCLE = 8

function fieldLabel(kind) {
  if (kind === 'name') return 'ИМЕ И ФАМИЛИЯ'
  if (kind === 'username') return 'ПОТРЕБИТЕЛСКО ИМЕ'
  if (kind === 'password') return 'ПАРОЛА'
  if (kind === 'phone') return 'ТЕЛЕФОН (по избор)'
  return ''
}

function FieldContent({ kind }) {
  if (kind === 'name') {
    return (
      <g>
        <text x={FIELD_X + 14} y="20" fill="#e2e8f0" fontSize="12" style={{ fontFamily: 'monospace' }}>
          Иван
        </text>
        <line
          x1={CX} y1="6" x2={CX} y2="26"
          stroke="#1e293b" strokeWidth="1"
        />
        <text x={CX + 12} y="20" fill="#e2e8f0" fontSize="12" style={{ fontFamily: 'monospace' }}>
          Петров
        </text>
      </g>
    )
  }
  if (kind === 'username') {
    return (
      <g>
        <text x={FIELD_X + 14} y="20" fill="#e2e8f0" fontSize="12" fontWeight="600" style={{ fontFamily: 'monospace' }}>
          ivan.petrov
        </text>
        <text
          x={FIELD_X + FIELD_W - 14} y="20" textAnchor="end"
          fill="#64748b" fontSize="11"
          style={{ fontFamily: 'monospace' }}
        >
          @gmail.com
        </text>
      </g>
    )
  }
  if (kind === 'password') {
    return (
      <g>
        <text x={FIELD_X + 14} y="22" fill="#e2e8f0" fontSize="14" style={{ fontFamily: 'monospace', letterSpacing: '0.15em' }}>
          ••••••••••
        </text>
        {/* eye icon on the right */}
        <g transform={`translate(${FIELD_X + FIELD_W - 18}, 16)`}>
          <path
            d="M -7 0 Q 0 -6 7 0 Q 0 6 -7 0 Z"
            fill="none" stroke="#475569" strokeWidth="1.2"
          />
          <circle r="1.8" fill="#475569" />
        </g>
      </g>
    )
  }
  if (kind === 'phone') {
    return (
      <g>
        <text x={FIELD_X + 14} y="20" fill="#64748b" fontSize="12" style={{ fontFamily: 'monospace' }}>
          +359 8• ••• ••••
        </text>
        {/* tiny key icon hinting recovery */}
        <g transform={`translate(${FIELD_X + FIELD_W - 22}, 16)`}>
          <circle r="3.2" cx="-4" cy="0" fill="none" stroke="#22d3ee" strokeWidth="1.2" />
          <line x1="-1" y1="0" x2="7" y2="0" stroke="#22d3ee" strokeWidth="1.2" />
          <line x1="4" y1="0" x2="4" y2="3" stroke="#22d3ee" strokeWidth="1.2" />
          <line x1="6" y1="0" x2="6" y2="2" stroke="#22d3ee" strokeWidth="1.2" />
        </g>
      </g>
    )
  }
  return null
}

export default function Scene_3_2() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="s32-form-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#0b1220" />
          </linearGradient>
          <linearGradient id="s32-btn-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <radialGradient id="s32-chip-grad">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
          <filter id="s32-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="s32-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ============ Ambient ============ */}
        <circle
          cx={CX} cy="290" r="290" fill="none"
          stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3 9"
        >
          <animateTransform
            attributeName="transform" type="rotate"
            from={`0 ${CX} 290`} to={`360 ${CX} 290`}
            dur="60s" repeatCount="indefinite"
          />
        </circle>

        {/* Drifting @ glyphs in the corners */}
        {[
          { x: 130, y: 110, d: 0 },
          { x: 800, y: 100, d: 1.6 },
          { x: 110, y: 470, d: 2.8 },
          { x: 810, y: 460, d: 0.9 },
        ].map((p, i) => (
          <text
            key={`s32-bg-${i}`}
            x={p.x} y={p.y}
            fill="#1e293b" fontSize="18" fontWeight="700"
            style={{ fontFamily: 'monospace' }}
          >
            @
            <animate
              attributeName="opacity" values="0.3;0.75;0.3"
              dur="6s" begin={`${p.d}s`} repeatCount="indefinite"
            />
          </text>
        ))}

        {/* ============ Form card ============ */}
        {/* soft halo */}
        <rect
          x={FORM_X - 8} y={FORM_Y - 8} width={FORM_W + 16} height={FORM_H + 16} rx="16"
          fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.18"
          filter="url(#s32-soft)"
        />
        {/* body */}
        <rect
          x={FORM_X} y={FORM_Y} width={FORM_W} height={FORM_H} rx="12"
          fill="url(#s32-form-grad)" stroke="#3b82f6" strokeWidth="1.4"
          filter="url(#s32-glow)"
        >
          <animate
            attributeName="stroke-opacity" values="0.6;1;0.6"
            dur="4.4s" repeatCount="indefinite"
          />
        </rect>

        {/* Title row */}
        <text
          x={CX} y={FORM_Y + 32} textAnchor="middle"
          fill="#e2e8f0" fontSize="15" fontWeight="700"
        >
          Създаване на акаунт
        </text>
        <text
          x={CX} y={FORM_Y + 50} textAnchor="middle"
          fill="#ef4444" fontSize="9" fontWeight="800"
          style={{ letterSpacing: '0.4em' }}
        >
          GMAIL
        </text>
        {/* divider under header */}
        <line
          x1={FIELD_X} y1={FORM_Y + 62} x2={FIELD_X + FIELD_W} y2={FORM_Y + 62}
          stroke="#1e293b" strokeWidth="1"
        />

        {/* ============ Field rows ============ */}
        {FIELDS.filter((f) => f.kind !== 'submit').map((f) => (
          <g key={`s32-field-${f.kind}`}>
            {/* small label above */}
            <text
              x={FIELD_X} y={f.y - 4}
              fill="#64748b" fontSize="8.5" fontWeight="700"
              style={{ letterSpacing: '0.18em' }}
            >
              {fieldLabel(f.kind)}
            </text>
            {/* input box */}
            <rect
              x={FIELD_X} y={f.y} width={FIELD_W} height={f.h} rx="6"
              fill="#0b1220" stroke="#1e293b" strokeWidth="1"
            />
            <g transform={`translate(0 ${f.y})`}>
              <FieldContent kind={f.kind} />
            </g>
          </g>
        ))}

        {/* Submit button */}
        <g>
          <rect
            x={FIELD_X} y="350" width={FIELD_W} height="40" rx="8"
            fill="url(#s32-btn-grad)" stroke="#60a5fa" strokeWidth="1.4"
            filter="url(#s32-glow)"
          >
            <animate
              attributeName="stroke-opacity" values="0.6;1;0.6"
              dur="3.6s" repeatCount="indefinite"
            />
          </rect>
          <text
            x={CX} y="375" textAnchor="middle"
            fill="#e2e8f0" fontSize="13" fontWeight="700"
          >
            Напред
          </text>
        </g>

        {/* ============ Animated focus ring jumping through fields ============ */}
        <rect
          x={FIELD_X - 4} width={FIELD_W + 8} rx="8"
          fill="none" stroke="#22d3ee" strokeWidth="2"
          filter="url(#s32-glow)" opacity="0.95"
        >
          <animate
            attributeName="y"
            values="166;211;256;301;346;166"
            keyTimes="0;0.2;0.4;0.6;0.8;1"
            dur={`${CYCLE}s`}
            calcMode="discrete"
            repeatCount="indefinite"
          />
          <animate
            attributeName="height"
            values="40;40;40;40;48;40"
            keyTimes="0;0.2;0.4;0.6;0.8;1"
            dur={`${CYCLE}s`}
            calcMode="discrete"
            repeatCount="indefinite"
          />
        </rect>

        {/* ============ Side callouts ============ */}
        {/* Username callout (right side) */}
        <g>
          <line
            x1={FIELD_X + FIELD_W + 4} y1="231" x2="690" y2="231"
            stroke="#22d3ee" strokeWidth="1" opacity="0.55"
            strokeDasharray="3 4"
          />
          <circle cx="690" cy="231" r="2.4" fill="#22d3ee" />
          <text
            x="700" y="228"
            fill="#22d3ee" fontSize="11" fontWeight="700"
          >
            става адресът ти
          </text>
          <text
            x="700" y="244"
            fill="#94a3b8" fontSize="10"
          >
            не се сменя лесно
          </text>
        </g>

        {/* Phone callout (right side) */}
        <g>
          <line
            x1={FIELD_X + FIELD_W + 4} y1="321" x2="690" y2="321"
            stroke="#22d3ee" strokeWidth="1" opacity="0.55"
            strokeDasharray="3 4"
          />
          <circle cx="690" cy="321" r="2.4" fill="#22d3ee" />
          <text
            x="700" y="318"
            fill="#22d3ee" fontSize="11" fontWeight="700"
          >
            връща достъпа
          </text>
          <text
            x="700" y="334"
            fill="#94a3b8" fontSize="10"
          >
            при забравена парола
          </text>
        </g>

        {/* ============ Result chip emerging from the button ============ */}
        {/* arrow from button down to chip */}
        <line
          x1={CX} y1="395" x2={CX} y2="465"
          stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 5" opacity="0.55"
        >
          <animate
            attributeName="stroke-dashoffset" from="8" to="0"
            dur="1.8s" repeatCount="indefinite"
          />
        </line>
        <path
          d={`M ${CX - 5} 462 L ${CX} 472 L ${CX + 5} 462 Z`}
          fill="#10b981" opacity="0.7"
        />

        {/* chip */}
        <g>
          {/* halo */}
          <rect
            x={CX - 152} y="475" width="304" height="36" rx="18"
            fill="url(#s32-chip-grad)"
          />
          {/* pill body */}
          <rect
            x={CX - 145} y="478" width="290" height="30" rx="15"
            fill="#0b1220" stroke="#10b981" strokeWidth="1.6"
            filter="url(#s32-glow)"
          >
            <animate
              attributeName="stroke-opacity" values="0.7;1;0.7"
              dur="3.2s" repeatCount="indefinite"
            />
          </rect>
          {/* check icon */}
          <g transform={`translate(${CX - 122} 493)`}>
            <circle r="8" fill="none" stroke="#10b981" strokeWidth="1.6" />
            <path
              d="M -3.5 0 L -0.5 3 L 4 -2.5"
              fill="none" stroke="#10b981" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </g>
          {/* address text */}
          <text
            x={CX + 10} y="498" textAnchor="middle"
            fill="#e2e8f0" fontSize="13" fontWeight="600"
            style={{ fontFamily: 'monospace', letterSpacing: '0.04em' }}
          >
            ivan.petrov@gmail.com
          </text>
        </g>
      </svg>
    </div>
  )
}
