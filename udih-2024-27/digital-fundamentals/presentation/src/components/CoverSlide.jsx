// Elegant ambient animation layer — fewer but smoother elements.
// Inspired by the QR-hero pulse style: rings, soft glows, gentle motion.
// Layout, text, and colors unchanged.

const particles = Array.from({ length: 42 }).map((_, i) => ({
  x: (i * 41 + 7) % 100,
  y: (i * 23 + 13) % 100,
  size: 1.6 + ((i * 7) % 4) * 0.8,
  dur: 7 + (i % 6) * 1.2,
  delay: (i * 0.42) % 8,
  opacity: 0.35 + (i % 4) * 0.14,
}))

const streams = Array.from({ length: 12 }).map((_, i) => ({
  left: (i * 9 + 5) % 96,
  height: 90 + (i % 4) * 50,
  dur: 5.5 + (i % 5) * 1.1,
  delay: (i * 0.7) % 6,
  opacity: 0.45 + (i % 3) * 0.15,
}))

const orbits = [
  { rx: 320, ry: 185, dur: 22, dir: 1 },
  { rx: 450, ry: 260, dur: 30, dir: 0 },
  { rx: 580, ry: 335, dur: 40, dir: 1 },
]

export default function CoverSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">

        {/* Floating particles */}
        {particles.map((p, i) => (
          <span
            key={`p-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              boxShadow: '0 0 8px rgba(255,255,255,0.7)',
              animation: `cover-float ${p.dur}s ease-in-out ${p.delay}s infinite`,
              willChange: 'transform, opacity',
            }}
          />
        ))}

        {/* Vertical digital rain — softer */}
        {streams.map((s, i) => (
          <span
            key={`s-${i}`}
            className="absolute w-[1px]"
            style={{
              left: `${s.left}%`,
              top: `-${s.height}px`,
              height: `${s.height}px`,
              background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.75), transparent)',
              opacity: s.opacity,
              animation: `cover-stream ${s.dur}s linear ${s.delay}s infinite`,
              willChange: 'transform',
            }}
          />
        ))}

        {/* Horizontal light sweeps */}
        {[
          { y: '22%', dur: 11, delay: 0,   h: 1, op: 0.75, dir: 'right' },
          { y: '52%', dur: 14, delay: 3,   h: 2, op: 0.35, dir: 'right', blur: 2 },
          { y: '78%', dur: 13, delay: 5,   h: 1, op: 0.65, dir: 'left' },
        ].map((sw, i) => (
          <div
            key={`sw-${i}`}
            className="absolute left-0 right-0"
            style={{
              top: sw.y,
              height: `${sw.h}px`,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)',
              opacity: sw.op,
              filter: sw.blur ? `blur(${sw.blur}px)` : 'none',
              animation: `${sw.dir === 'right' ? 'cover-sweep-right' : 'cover-sweep-left'} ${sw.dur}s linear ${sw.delay}s infinite`,
              willChange: 'transform',
            }}
          />
        ))}

        {/* Corner L-brackets — breathing */}
        <div
          className="absolute top-6 left-6 w-24 h-24 border-t-2 border-l-2 border-white/70"
          style={{ animation: 'cover-corner-breathe 3.6s ease-in-out infinite' }}
        />
        <div
          className="absolute top-6 right-6 w-24 h-24 border-t-2 border-r-2 border-white/70"
          style={{ animation: 'cover-corner-breathe 3.6s ease-in-out infinite 0.9s' }}
        />
        <div
          className="absolute bottom-24 left-6 w-24 h-24 border-b-2 border-l-2 border-white/70"
          style={{ animation: 'cover-corner-breathe 3.6s ease-in-out infinite 1.8s' }}
        />
        <div
          className="absolute bottom-24 right-6 w-24 h-24 border-b-2 border-r-2 border-white/70"
          style={{ animation: 'cover-corner-breathe 3.6s ease-in-out infinite 2.7s' }}
        />

        {/* Rotating hex frames — 2 only, top-left + bottom-right */}
        <div
          className="absolute top-12 left-12 w-14 h-14"
          style={{ animation: 'cover-spin 22s linear infinite' }}
        >
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <polygon points="25,4 44,16 44,34 25,46 6,34 6,16" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1" />
          </svg>
        </div>
        <div
          className="absolute bottom-28 right-12 w-14 h-14"
          style={{ animation: 'cover-spin-rev 26s linear infinite' }}
        >
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <polygon points="25,4 44,16 44,34 25,46 6,34 6,16" fill="none" stroke="rgba(180,220,255,0.55)" strokeWidth="1" />
          </svg>
        </div>

        {/* Orbiting dots — 3 orbits, 2 dots each */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 700"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {orbits.map((o, i) => (
              <path
                key={`op-${i}`}
                id={`cv-orbit-${i}`}
                d={
                  o.dir === 1
                    ? `M ${500 + o.rx},350 A ${o.rx},${o.ry} 0 1,1 ${500 + o.rx - 0.01},350 A ${o.rx},${o.ry} 0 1,1 ${500 + o.rx},350`
                    : `M ${500 - o.rx},350 A ${o.rx},${o.ry} 0 1,0 ${500 - o.rx + 0.01},350 A ${o.rx},${o.ry} 0 1,0 ${500 - o.rx},350`
                }
              />
            ))}
          </defs>

          {orbits.map((o, i) => (
            <g key={`od-${i}`}>
              <circle r="4" fill="#ffffff" opacity="0.9">
                <animateMotion dur={`${o.dur}s`} repeatCount="indefinite">
                  <mpath href={`#cv-orbit-${i}`} />
                </animateMotion>
              </circle>
              <circle r="2.5" fill="#bfdbfe" opacity="0.8">
                <animateMotion dur={`${o.dur}s`} begin={`${o.dur / 2}s`} repeatCount="indefinite">
                  <mpath href={`#cv-orbit-${i}`} />
                </animateMotion>
              </circle>
            </g>
          ))}
        </svg>

        {/* Central pulsing rings — 3 concentric (QR-style) */}
        {[0, 1.8, 3.6].map((d, i) => (
          <div key={`pr-${i}`} className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full"
              style={{
                width: '520px', height: '520px',
                border: '1px solid rgba(255,255,255,0.4)',
                animation: `cover-pulse-ring 5.4s ease-out infinite ${d}s`,
                willChange: 'transform, opacity',
              }}
            />
          </div>
        ))}

        {/* Breathing dashed ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="rounded-full"
            style={{
              width: '780px', height: '780px',
              border: '1px dashed rgba(255,255,255,0.22)',
              animation: 'cover-ring-breathe 7s ease-in-out infinite, cover-spin 80s linear infinite',
              willChange: 'transform, opacity',
            }}
          />
        </div>

        {/* Top/bottom shimmer bars */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 20%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.45) 80%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'cover-shimmer 5s linear infinite',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 20%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.45) 80%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'cover-shimmer 5s linear infinite 2.5s',
          }}
        />
      </div>

      {/* ================ Original content (unchanged) ================ */}
      <h1
        className="text-6xl font-bold text-white mb-6 drop-shadow-lg relative z-10"
        style={{ animation: 'cover-text-glow 4.5s ease-in-out infinite' }}
      >
        UDIH
      </h1>

      <h2
        className="text-4xl font-bold text-white leading-tight drop-shadow-lg max-w-5xl relative z-10"
        style={{ animation: 'cover-text-glow 4.5s ease-in-out infinite 1.4s' }}
      >
        НАЦИОНАЛНА ОБУЧИТЕЛНА ПРОГРАМА
        <br />
        ЗА ДИГИТАЛНА ТРАНСФОРМАЦИЯ НА
        <br />
        КОМУНАЛНИЯ СЕКТОР
      </h2>

      <div className="absolute bottom-6 left-16 right-16 z-10">
        <p className="text-sm text-white/80 leading-relaxed drop-shadow">
          Проект BG16RFPR002-1.002-0008 „UDIH 4 EU" по програма „Научни изследвания,
          иновации и дигитализация за интелигентна трансформация" 2021 – 2027 г.,
          съфинансирана от Европейския съюз чрез Европейския фонд за регионално развитие
        </p>
      </div>
    </div>
  )
}
