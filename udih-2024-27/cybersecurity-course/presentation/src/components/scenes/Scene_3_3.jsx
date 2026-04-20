// Scene 3.3 — Password manager / vault
// Central encrypted vault in the middle. A master key from the top-left
// continuously unlocks it; passwords fly out to login forms on the right;
// a random-generator on the bottom-left drops new strong entries into
// the vault; and the vault syncs to the cloud on the bottom-right.

const CX = 430
const CY = 290

const MASTER = { x: 130, y: 130 }
const LOGINS = { x: 730, y: 130 }
const GEN    = { x: 130, y: 440 }
const CLOUD  = { x: 740, y: 450 }

// Password entries shown inside the open vault + flowing out
const entries = [
  { label: 'Gmail',          color: '#ef4444', delay: 0   },
  { label: 'Банка',          color: '#10b981', delay: 1.6 },
  { label: 'Работен акаунт', color: '#3b82f6', delay: 3.2 },
  { label: 'Social Media',   color: '#a855f7', delay: 4.8 },
]

export default function Scene_3_3() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="v-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="vault-core-grad">
            <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          {/* Paths between vault and the four satellites */}
          <path id="path-master" d={`M ${MASTER.x},${MASTER.y} Q ${(MASTER.x + CX) / 2 - 20},${(MASTER.y + CY) / 2 - 30} ${CX - 70},${CY - 10}`} />
          <path id="path-login"  d={`M ${CX + 70},${CY - 10} Q ${(LOGINS.x + CX) / 2 + 20},${(LOGINS.y + CY) / 2 - 30} ${LOGINS.x - 60},${LOGINS.y}`} />
          <path id="path-gen"    d={`M ${GEN.x + 60},${GEN.y} Q ${(GEN.x + CX) / 2 - 10},${(GEN.y + CY) / 2 + 30} ${CX - 70},${CY + 10}`} />
          <path id="path-cloud"  d={`M ${CX + 70},${CY + 10} Q ${(CLOUD.x + CX) / 2 + 20},${(CLOUD.y + CY) / 2 + 30} ${CLOUD.x - 60},${CLOUD.y}`} />
        </defs>

        {/* Corner labels / rays */}
        <text x="50" y="74" fill="#94a3b8" fontSize="13" fontWeight="500" style={{ letterSpacing: '0.22em' }}>
          МЕНИДЖЪР НА ПАРОЛИ · ЕДНА ГЛАВНА КЛЮЧ
        </text>

        {/* === Flow edges === */}
        {[
          { id: 'path-master', color: '#60a5fa' },
          { id: 'path-login',  color: '#34d399' },
          { id: 'path-gen',    color: '#a855f7' },
          { id: 'path-cloud',  color: '#06b6d4' },
        ].map(e => (
          <use key={e.id} href={`#${e.id}`} fill="none" stroke={e.color} strokeWidth="0.9"
            strokeDasharray="4 6" opacity="0.4">
            <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.8s" repeatCount="indefinite" />
          </use>
        ))}

        {/* === Flowing packets === */}
        {/* Master → Vault (master key unlock pulses) */}
        {[0, 1.8, 3.6].map((d, i) => (
          <circle key={`mk-${i}`} r="4" fill="#60a5fa" filter="url(#v-glow)" opacity="0">
            <animateMotion dur="5.4s" begin={`${d}s`} repeatCount="indefinite">
              <mpath href="#path-master" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1"
              dur="5.4s" begin={`${d}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Vault → Login: password cards fly out */}
        {entries.map((e, i) => (
          <g key={`outgoing-${i}`}>
            {/* Card body */}
            <g opacity="0">
              <rect x="-22" y="-9" width="44" height="18" rx="3" fill="#0b1220" stroke={e.color} strokeWidth="1.1" />
              <line x1="-18" y1="-2" x2="18" y2="-2" stroke={e.color} strokeWidth="0.8" opacity="0.7" />
              <circle cx="-16" cy="3" r="1.2" fill={e.color} />
              <circle cx="-12" cy="3" r="1.2" fill={e.color} />
              <circle cx="-8" cy="3" r="1.2" fill={e.color} />
              <circle cx="-4" cy="3" r="1.2" fill={e.color} />
              <circle cx="0" cy="3" r="1.2" fill={e.color} />
              <circle cx="4" cy="3" r="1.2" fill={e.color} />
              <circle cx="8" cy="3" r="1.2" fill={e.color} />
              <circle cx="12" cy="3" r="1.2" fill={e.color} />
              <circle cx="16" cy="3" r="1.2" fill={e.color} />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1"
                dur="6.4s" begin={`${e.delay}s`} repeatCount="indefinite" />
              <animateMotion dur="6.4s" begin={`${e.delay}s`} repeatCount="indefinite">
                <mpath href="#path-login" />
              </animateMotion>
            </g>
          </g>
        ))}

        {/* Generator → Vault: new password enters */}
        {[0, 3].map((d, i) => (
          <g key={`gen-${i}`} opacity="0">
            <circle r="3" fill="#a855f7" filter="url(#v-glow)" />
            <circle r="6" fill="none" stroke="#a855f7" strokeWidth="0.8" opacity="0.5" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1"
              dur="6s" begin={`${d}s`} repeatCount="indefinite" />
            <animateMotion dur="6s" begin={`${d}s`} repeatCount="indefinite">
              <mpath href="#path-gen" />
            </animateMotion>
          </g>
        ))}

        {/* Vault → Cloud: sync */}
        {[0, 2, 4].map((d, i) => (
          <circle key={`cl-${i}`} r="2.5" fill="#06b6d4" filter="url(#v-glow)" opacity="0">
            <animateMotion dur="5s" begin={`${d}s`} repeatCount="indefinite">
              <mpath href="#path-cloud" />
            </animateMotion>
            <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.2;0.8;1"
              dur="5s" begin={`${d}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* === Master key (top-left) === */}
        <g transform={`translate(${MASTER.x} ${MASTER.y})`}>
          {[0, 1.4].map((d, i) => (
            <circle key={i} r="32" fill="none" stroke="#60a5fa" strokeWidth="0.6" opacity="0">
              <animate attributeName="r" values="30;48" dur="2.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.45;0" dur="2.8s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <circle r="32" fill="#0b1220" stroke="#60a5fa" strokeWidth="1.5" filter="url(#v-glow)">
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.4s" repeatCount="indefinite" />
          </circle>
          {/* Key icon */}
          <g fill="none" stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="-8" cy="-2" r="7" />
            <circle cx="-8" cy="-2" r="2" fill="#60a5fa" />
            <line x1="-1" y1="-2" x2="16" y2="-2" />
            <line x1="10" y1="-2" x2="10" y2="4" />
            <line x1="14" y1="-2" x2="14" y2="3" />
          </g>
          <text y="54" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="600">
            Главна парола
          </text>
          <text y="70" textAnchor="middle" fill="#64748b" fontSize="10.5">
            единственото, което помниш
          </text>
        </g>

        {/* === Login form (top-right) === */}
        <g transform={`translate(${LOGINS.x} ${LOGINS.y})`}>
          {/* Browser window */}
          <rect x="-68" y="-46" width="136" height="92" rx="4" fill="#0b1220" stroke="#475569" strokeWidth="1" />
          <rect x="-68" y="-46" width="136" height="16" rx="4" fill="#1e293b" />
          <circle cx="-60" cy="-38" r="2" fill="#ef4444" opacity="0.7" />
          <circle cx="-52" cy="-38" r="2" fill="#f59e0b" opacity="0.7" />
          <circle cx="-44" cy="-38" r="2" fill="#10b981" opacity="0.7" />
          {/* Fields */}
          <text x="-58" y="-20" fill="#64748b" fontSize="8.5" style={{ letterSpacing: '0.1em' }}>USERNAME</text>
          <rect x="-58" y="-16" width="116" height="14" rx="2" fill="#020617" stroke="#334155" strokeWidth="0.6" />
          <text x="-54" y="-6" fill="#94a3b8" fontSize="9" style={{ fontFamily: 'monospace' }}>
            ivan@company.bg
          </text>
          <text x="-58" y="8" fill="#64748b" fontSize="8.5" style={{ letterSpacing: '0.1em' }}>PASSWORD</text>
          <rect x="-58" y="12" width="116" height="14" rx="2" fill="#020617" stroke="#334155" strokeWidth="0.6" />
          {/* Autofilling dots */}
          <g>
            {Array.from({ length: 14 }).map((_, i) => (
              <circle key={i} cx={-54 + i * 8} cy="19" r="1.2" fill="#34d399" opacity="0">
                <animate attributeName="opacity" values="0;0;1;1;0"
                  keyTimes={`0;${0.2 + i * 0.02};${0.25 + i * 0.02};0.9;1`}
                  dur="5s" repeatCount="indefinite" />
              </circle>
            ))}
          </g>
          {/* Sign-in button */}
          <rect x="-58" y="32" width="116" height="12" rx="2" fill="#1e40af">
            <animate attributeName="fill" values="#1e40af;#3b82f6;#1e40af" dur="2s" repeatCount="indefinite" />
          </rect>
          <text x="0" y="40" textAnchor="middle" fill="#e0f2fe" fontSize="8.5" fontWeight="700">
            ВЛЕЗ
          </text>
          {/* Label */}
          <text y="70" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="600">
            Auto-fill
          </text>
        </g>

        {/* === Password generator (bottom-left) === */}
        <g transform={`translate(${GEN.x} ${GEN.y})`}>
          {[0, 1.2].map((d, i) => (
            <circle key={i} r="32" fill="none" stroke="#a855f7" strokeWidth="0.6" opacity="0">
              <animate attributeName="r" values="30;48" dur="2.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.45;0" dur="2.8s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <circle r="32" fill="#0b1220" stroke="#a855f7" strokeWidth="1.5" filter="url(#v-glow)">
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.4s" repeatCount="indefinite" />
          </circle>
          {/* Dice */}
          <g transform="rotate(0)">
            <rect x="-14" y="-14" width="28" height="28" rx="4"
              fill="#0b1220" stroke="#a855f7" strokeWidth="1.4">
              <animateTransform attributeName="transform" type="rotate"
                values="0;20;-15;10;0" keyTimes="0;0.25;0.5;0.75;1"
                dur="3.2s" repeatCount="indefinite" />
            </rect>
            {/* Dice dots — changing */}
            {[
              { x: -7, y: -7 }, { x: 7, y: -7 }, { x: 0, y: 0 },
              { x: -7, y: 7 }, { x: 7, y: 7 },
            ].map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r="1.4" fill="#a855f7">
                <animate attributeName="fill-opacity"
                  values={i % 2 === 0 ? '1;0;1;0;1' : '0;1;0;1;0'}
                  keyTimes="0;0.25;0.5;0.75;1"
                  dur="3.2s" repeatCount="indefinite" />
              </circle>
            ))}
          </g>
          <text y="54" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="600">
            Генератор
          </text>
          <text y="70" textAnchor="middle" fill="#64748b" fontSize="10.5">
            случайни силни пароли
          </text>
        </g>

        {/* === Cloud sync (bottom-right) === */}
        <g transform={`translate(${CLOUD.x} ${CLOUD.y})`}>
          {[0, 1.4].map((d, i) => (
            <circle key={i} r="32" fill="none" stroke="#06b6d4" strokeWidth="0.6" opacity="0">
              <animate attributeName="r" values="30;48" dur="2.8s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.45;0" dur="2.8s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <circle r="32" fill="#0b1220" stroke="#06b6d4" strokeWidth="1.5" filter="url(#v-glow)">
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.4s" repeatCount="indefinite" />
          </circle>
          {/* Cloud icon */}
          <g fill="none" stroke="#06b6d4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M -13 2 A 7 7 0 0 1 -10 -10 A 10 10 0 0 1 10 -8 A 6 6 0 0 1 11 4 Z"
              fill="#0b1220" />
            {/* Sync arrows */}
            <path d="M -4 -1 L 0 -5 L 4 -1" />
            <path d="M 0 -5 V 6" />
          </g>
          {/* Sync dots going outward */}
          <circle r="2" fill="#06b6d4" opacity="0.7">
            <animate attributeName="cx" values="0;14;0" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="cy" values="0;-14;0" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.8;0" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <text y="54" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="600">
            Cloud sync
          </text>
          <text y="70" textAnchor="middle" fill="#64748b" fontSize="10.5">
            достъп от всяко устройство
          </text>
        </g>

        {/* === Central vault === */}
        <g transform={`translate(${CX} ${CY})`}>
          {/* Halo */}
          <circle r="90" fill="url(#vault-core-grad)" />
          {/* Breathing rings */}
          {[0, 1.6].map((d, i) => (
            <circle key={i} r="58" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="56;88" dur="3.4s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="3.4s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Decorative rotating hex frame */}
          <polygon
            points="0,-78 68,-40 68,40 0,78 -68,40 -68,-40"
            fill="none" stroke="#334155" strokeWidth="0.8" strokeDasharray="4 10"
          >
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="60s" repeatCount="indefinite" />
          </polygon>

          {/* Vault body */}
          <polygon
            points="-60,-56 60,-56 60,56 -60,56"
            fill="#0b1220" stroke="#60a5fa" strokeWidth="1.8" filter="url(#v-glow)"
          >
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.8s" repeatCount="indefinite" />
          </polygon>

          {/* Rivets */}
          {[-52, 52].flatMap(x => [-48, -16, 16, 48].map(y => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#1e3a8a" />
          )))}

          {/* Interior entries list */}
          <g>
            {entries.map((en, i) => {
              const y = -34 + i * 18
              return (
                <g key={en.label}>
                  <rect x="-48" y={y - 7} width="96" height="14" rx="2"
                    fill="#020617" stroke={en.color} strokeWidth="0.5" opacity="0.85" />
                  {/* Label */}
                  <text x="-44" y={y + 2.5} fill={en.color} fontSize="8" fontWeight="600"
                    style={{ letterSpacing: '0.05em' }}>
                    {en.label.toUpperCase()}
                  </text>
                  {/* Dots */}
                  {Array.from({ length: 8 }).map((_, k) => (
                    <circle key={k} cx={10 + k * 4} cy={y + 1} r="1" fill={en.color} opacity="0.8">
                      <animate attributeName="opacity" values="0.4;1;0.4"
                        dur="1.6s" begin={`${i * 0.15 + k * 0.05}s`} repeatCount="indefinite" />
                    </circle>
                  ))}
                </g>
              )
            })}
          </g>

          {/* Vault dial (big circular lock) on right side */}
          <g transform="translate(40 0)" opacity="0.55">
            <circle r="14" fill="none" stroke="#60a5fa" strokeWidth="1" />
            <circle r="10" fill="none" stroke="#60a5fa" strokeWidth="0.8" strokeDasharray="1 2">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="12s" repeatCount="indefinite" />
            </circle>
            <line x1="0" y1="-10" x2="0" y2="-4" stroke="#60a5fa" strokeWidth="1.2">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="12s" repeatCount="indefinite" />
            </line>
            <circle r="1.6" fill="#60a5fa" />
          </g>

          {/* Label */}
          <text y="80" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="700" style={{ letterSpacing: '0.3em' }}>
            ENCRYPTED VAULT
          </text>
        </g>
      </svg>
    </div>
  )
}
