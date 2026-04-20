// Scene 4.5 — Safe handling practices
// A workplace tableau: centre desk with a laptop that periodically auto-locks
// (Win+L), a paper shredder on the right reducing documents to confetti,
// a remote worker connected via a VPN tunnel to the office on the left,
// and a split-channel credential verification panel at the bottom.

const DESK_Y = 400

export default function Scene_4_5() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 900 560"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="wp-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="laptop-screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#0b1220" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="vpn-tunnel" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#06b6d4" stopOpacity="0.2" />
            <stop offset="50%"  stopColor="#06b6d4" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
          </linearGradient>
          {/* VPN tunnel path */}
          <path id="vpn-path" d="M 120 150 Q 200 140 280 150 Q 360 160 440 148" />
        </defs>

        {/* === Remote worker + VPN tunnel (top-left) === */}
        <g>
          {/* Worker at home */}
          <g transform="translate(80 150)">
            <circle r="30" fill="#0b1220" stroke="#06b6d4" strokeWidth="1.4" filter="url(#wp-glow)">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="2.6s" repeatCount="indefinite" />
            </circle>
            {/* Head */}
            <circle cy="-6" r="7" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            {/* Body + laptop */}
            <path d="M -12 16 Q -12 6 0 6 Q 12 6 12 16" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            <rect x="-10" y="10" width="20" height="2" fill="#22d3ee" />
            <text y="46" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="600">
              Remote
            </text>
          </g>

          {/* Office building at other end */}
          <g transform="translate(450 150)">
            <circle r="30" fill="#0b1220" stroke="#06b6d4" strokeWidth="1.4" filter="url(#wp-glow)">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="2.6s" repeatCount="indefinite" />
            </circle>
            {/* Building icon */}
            <g stroke="#22d3ee" fill="none" strokeWidth="1.4" strokeLinejoin="round">
              <rect x="-10" y="-12" width="20" height="22" />
              <line x1="-6" y1="-7" x2="-6" y2="-4" />
              <line x1="0" y1="-7" x2="0" y2="-4" />
              <line x1="6" y1="-7" x2="6" y2="-4" />
              <line x1="-6" y1="-1" x2="-6" y2="2" />
              <line x1="0" y1="-1" x2="0" y2="2" />
              <line x1="6" y1="-1" x2="6" y2="2" />
              <line x1="-6" y1="5" x2="-6" y2="8" />
              <line x1="0" y1="5" x2="0" y2="8" />
              <line x1="6" y1="5" x2="6" y2="8" />
            </g>
            <text y="46" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="600">
              Офис
            </text>
          </g>

          {/* Encrypted VPN tunnel */}
          <g>
            {/* Outer shell */}
            <path
              d="M 110 145 Q 200 135 280 145 Q 360 155 450 143 L 450 158 Q 360 170 280 158 Q 200 148 110 158 Z"
              fill="url(#vpn-tunnel)"
              stroke="#06b6d4"
              strokeWidth="0.8"
              opacity="0.6"
            >
              <animate attributeName="stroke-opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite" />
            </path>
            {/* Encryption dashes over tunnel */}
            <path
              d="M 120 150 Q 200 140 280 150 Q 360 160 440 148"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="0.8"
              strokeDasharray="6 8"
              opacity="0.75"
            >
              <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1.4s" repeatCount="indefinite" />
            </path>
            {/* Traveling packets inside tunnel */}
            {[0, 1.4, 2.8].map((d, i) => (
              <circle key={i} r="3" fill="#22d3ee" filter="url(#wp-glow)" opacity="0">
                <animateMotion dur="4.2s" begin={`${d}s`} repeatCount="indefinite">
                  <mpath href="#vpn-path" />
                </animateMotion>
                <animate attributeName="opacity"
                  values="0;0.9;0.9;0" keyTimes="0;0.15;0.85;1"
                  dur="4.2s" begin={`${d}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {/* Lock icon in middle */}
            <g transform="translate(280 152)">
              <circle r="13" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.2" filter="url(#wp-glow)">
                <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
              </circle>
              <rect x="-5" y="-1" width="10" height="8" rx="1.5" fill="#0b1220" stroke="#67e8f9" strokeWidth="1" />
              <path d="M -3 -1 V -4 A 3 3 0 0 1 3 -4 V -1" fill="none" stroke="#67e8f9" strokeWidth="1" strokeLinecap="round" />
            </g>
          </g>

          {/* Caption */}
          <text x="280" y="105" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="700"
            style={{ letterSpacing: '0.2em' }}>
            VPN · КРИПТИРАН ТУНЕЛ
          </text>
          <text x="280" y="122" textAnchor="middle" fill="#64748b" fontSize="10">
            задължителен · без публичен Wi-Fi
          </text>
        </g>

        {/* === Split-channel verification (top-right) === */}
        <g transform="translate(610 110)">
          <rect x="0" y="0" width="260" height="90" rx="8"
            fill="rgba(15,23,42,0.75)" stroke="#a855f7" strokeWidth="1">
            <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="2.6s" repeatCount="indefinite" />
          </rect>
          <text x="12" y="18" fill="#d8b4fe" fontSize="10" fontWeight="700" style={{ letterSpacing: '0.2em' }}>
            ВТОРИ КАНАЛ · ПРОВЕРКА
          </text>

          {/* Email + phone, connected with X to say they must be separate */}
          <g transform="translate(40 58)">
            <rect x="-16" y="-10" width="32" height="20" rx="2" fill="#0b1220" stroke="#d8b4fe" strokeWidth="1.2" />
            <path d="M -16 -10 L 0 2 L 16 -10" fill="none" stroke="#d8b4fe" strokeWidth="1.2" />
            <text y="24" textAnchor="middle" fill="#cbd5e1" fontSize="10">имейл</text>
          </g>

          {/* Separator */}
          <g transform="translate(130 58)">
            <circle r="14" fill="#0b1220" stroke="#f59e0b" strokeWidth="1.2">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="1.4s" repeatCount="indefinite" />
            </circle>
            <path d="M -6 -6 L 6 6 M 6 -6 L -6 6" stroke="#fcd34d" strokeWidth="2" strokeLinecap="round" />
          </g>

          <g transform="translate(220 58)">
            <rect x="-10" y="-14" width="20" height="28" rx="2" fill="#0b1220" stroke="#d8b4fe" strokeWidth="1.2" />
            <line x1="-10" y1="-10" x2="10" y2="-10" stroke="#d8b4fe" strokeWidth="1" />
            <line x1="-10" y1="8" x2="10" y2="8" stroke="#d8b4fe" strokeWidth="1" />
            <circle cy="11" r="1.2" fill="#d8b4fe" />
            <text y="28" textAnchor="middle" fill="#cbd5e1" fontSize="10">телефон</text>
          </g>
        </g>

        {/* === Central desk with laptop === */}
        <g>
          {/* Desk surface */}
          <path
            d={`M 190 ${DESK_Y} L 710 ${DESK_Y} L 760 ${DESK_Y + 30} L 140 ${DESK_Y + 30} Z`}
            fill="#1e293b"
            stroke="#475569"
            strokeWidth="1"
          />
          {/* Desk shadow */}
          <ellipse cx="450" cy={DESK_Y + 38} rx="280" ry="6" fill="#020617" opacity="0.5" />

          {/* Laptop */}
          <g transform={`translate(450 ${DESK_Y})`}>
            {/* Screen */}
            <g>
              <rect x="-90" y="-82" width="180" height="104" rx="4"
                fill="url(#laptop-screen)"
                stroke="#475569"
                strokeWidth="1.2" />
              {/* Screen content switches between work and lock screen */}
              <g>
                {/* Work screen content (visible most of the time) */}
                <g>
                  {[0, 1, 2].map(i => (
                    <rect key={`ln-${i}`} x="-78" y={-66 + i * 14} width="100" height="6" rx="1" fill="#334155">
                      <animate attributeName="opacity"
                        values="0.8;0.8;0;0"
                        keyTimes="0;0.58;0.62;1"
                        dur="8s" repeatCount="indefinite" />
                    </rect>
                  ))}
                  <rect x="-78" y="-22" width="156" height="34" rx="2" fill="#0b1220" stroke="#334155" strokeWidth="0.6">
                    <animate attributeName="opacity"
                      values="0.8;0.8;0;0"
                      keyTimes="0;0.58;0.62;1"
                      dur="8s" repeatCount="indefinite" />
                  </rect>
                  {/* Fake chart */}
                  <polyline points="-70,4 -50,-10 -30,-4 -10,-14 14,-8 44,-16 70,-4"
                    fill="none" stroke="#60a5fa" strokeWidth="1.2">
                    <animate attributeName="opacity"
                      values="0.9;0.9;0;0"
                      keyTimes="0;0.58;0.62;1"
                      dur="8s" repeatCount="indefinite" />
                  </polyline>
                </g>

                {/* Lock screen overlay */}
                <g opacity="0">
                  <rect x="-90" y="-82" width="180" height="104" rx="4" fill="#020617" opacity="0.85" />
                  <g transform="translate(0 -35)">
                    <circle r="18" fill="#0b1220" stroke="#3b82f6" strokeWidth="1.6" filter="url(#wp-glow)" />
                    {/* Lock */}
                    <rect x="-7" y="-2" width="14" height="12" rx="2" fill="#0b1220" stroke="#60a5fa" strokeWidth="1.2" />
                    <path d="M -4 -2 V -7 A 4 4 0 0 1 4 -7 V -2" fill="none" stroke="#60a5fa" strokeWidth="1.2" strokeLinecap="round" />
                  </g>
                  <text y="-2" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="700" style={{ letterSpacing: '0.22em' }}>
                    ЗАКЛЮЧЕНО
                  </text>
                  <rect x="-60" y="8" width="120" height="16" rx="2" fill="#0b1220" stroke="#334155" strokeWidth="0.6" />
                  <text y="18" textAnchor="middle" fill="#64748b" fontSize="9">парола за отключване</text>
                  <animate attributeName="opacity"
                    values="0;0;1;1;0"
                    keyTimes="0;0.55;0.62;0.95;1"
                    dur="8s" repeatCount="indefinite" />
                </g>
              </g>
            </g>
            {/* Keyboard base */}
            <path d="M -110 24 L 110 24 L 120 36 L -120 36 Z" fill="#0b1220" stroke="#475569" strokeWidth="1" />
            <rect x="-8" y="25" width="16" height="2" fill="#475569" />
          </g>

          {/* Coffee cup */}
          <g transform={`translate(290 ${DESK_Y - 16})`}>
            <path d="M -10 0 L -10 14 Q -10 18 -6 18 L 6 18 Q 10 18 10 14 L 10 0 Z"
              fill="#1e293b" stroke="#78350f" strokeWidth="1" />
            <ellipse cx="0" cy="0" rx="10" ry="2.5" fill="#0b1220" stroke="#a16207" strokeWidth="0.8" />
            <path d="M 10 5 Q 16 5 16 10 Q 16 14 10 14" fill="none" stroke="#78350f" strokeWidth="1" />
            {/* Steam */}
            <path d="M -3 -4 Q 0 -10 -2 -14 Q -3 -18 0 -22" fill="none" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6">
              <animate attributeName="d"
                values="
                  M -3 -4 Q 0 -10 -2 -14 Q -3 -18 0 -22;
                  M -3 -4 Q -1 -10 -4 -14 Q 0 -18 -2 -22;
                  M -3 -4 Q 0 -10 -2 -14 Q -3 -18 0 -22"
                dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M 3 -4 Q 6 -10 4 -14 Q 3 -18 6 -22" fill="none" stroke="#94a3b8" strokeWidth="0.8" opacity="0.4">
              <animate attributeName="d"
                values="
                  M 3 -4 Q 6 -10 4 -14 Q 3 -18 6 -22;
                  M 3 -4 Q 4 -10 6 -14 Q 2 -18 5 -22;
                  M 3 -4 Q 6 -10 4 -14 Q 3 -18 6 -22"
                dur="3.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3.4s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Shredder on the right */}
          <g transform={`translate(640 ${DESK_Y - 30})`}>
            {/* Body */}
            <rect x="-22" y="0" width="44" height="30" rx="2" fill="#0b1220" stroke="#64748b" strokeWidth="1" />
            {/* Slot */}
            <rect x="-16" y="4" width="32" height="2.5" fill="#020617" />
            {/* LED */}
            <circle cx="-14" cy="14" r="1.5" fill="#10b981">
              <animate attributeName="fill-opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
            </circle>
            <text x="-2" y="22" fill="#94a3b8" fontSize="7.5" style={{ letterSpacing: '0.2em' }}>SHRED</text>

            {/* Paper entering from top */}
            <g>
              <rect x="-10" y="-30" width="20" height="24" rx="1" fill="#f1f5f9" opacity="0">
                <animate attributeName="y" values="-46;4" dur="3.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.88;1" dur="3.5s" repeatCount="indefinite" />
              </rect>
              {/* Lines on paper */}
              {[0, 1, 2].map(i => (
                <line key={i} x1="-6" y1="-22 + i*5" x2="6" y2="-22 + i*5" stroke="#94a3b8" strokeWidth="0.6" opacity="0">
                  <animate attributeName="y1" values={`${-38 + i * 4};${10 + i * 4}`} dur="3.5s" repeatCount="indefinite" />
                  <animate attributeName="y2" values={`${-38 + i * 4};${10 + i * 4}`} dur="3.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.88;1" dur="3.5s" repeatCount="indefinite" />
                </line>
              ))}
            </g>
            {/* Confetti falling from bottom */}
            {Array.from({ length: 8 }).map((_, i) => {
              const x = -18 + i * 5
              return (
                <rect key={i} x={x} y="30" width="3" height="2" fill="#94a3b8" opacity="0">
                  <animate attributeName="y" values="30;60" dur={`${2 + (i % 3) * 0.3}s`}
                    begin={`${i * 0.25}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;0" dur={`${2 + (i % 3) * 0.3}s`}
                    begin={`${i * 0.25}s`} repeatCount="indefinite" />
                </rect>
              )
            })}
          </g>

          {/* Win+L keyboard floating chip */}
          <g transform={`translate(350 ${DESK_Y - 120})`}>
            <rect x="-38" y="-14" width="76" height="24" rx="4" fill="#0b1220" stroke="#60a5fa" strokeWidth="1">
              <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="1.8s" repeatCount="indefinite" />
            </rect>
            <text x="0" y="3" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="700"
              style={{ fontFamily: 'monospace', letterSpacing: '0.1em' }}>
              WIN + L
            </text>
            <text x="0" y="-22" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="600"
              style={{ letterSpacing: '0.2em' }}>
              SCREEN LOCK
            </text>
          </g>
        </g>

        {/* Bottom-left: Clean desk indicator */}
        <g transform="translate(90 490)">
          <rect x="0" y="0" width="180" height="50" rx="6"
            fill="rgba(16,185,129,0.08)" stroke="#10b981" strokeWidth="1">
            <animate attributeName="stroke-opacity" values="0.4;0.85;0.4" dur="2.8s" repeatCount="indefinite" />
          </rect>
          <g transform="translate(22 25)">
            <circle r="10" fill="none" stroke="#6ee7b7" strokeWidth="1.2" />
            <path d="M -4 0 L -1 3 L 4 -3" fill="none" stroke="#6ee7b7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <text x="42" y="20" fill="#6ee7b7" fontSize="11" fontWeight="700"
            style={{ letterSpacing: '0.12em' }}>
            CLEAN DESK
          </text>
          <text x="42" y="35" fill="#94a3b8" fontSize="10">
            без пароли на бюрото
          </text>
        </g>

        {/* Title */}
        <text x="50" y="86" fill="#94a3b8" fontSize="13" fontWeight="500" style={{ letterSpacing: '0.22em' }}>
          БЕЗОПАСНО БОРАВЕНЕ С ИНФОРМАЦИЯ · ДЕЛНИЧНА ХИГИЕНА
        </text>
      </svg>
    </div>
  )
}
