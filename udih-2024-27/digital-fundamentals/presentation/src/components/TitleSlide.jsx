import AnimatedBackground from './AnimatedBackground'

const base = import.meta.env.BASE_URL

function LecturerCard({ avatar, name, role, expertise, gradient, haloColor }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center max-w-[240px]">
      <div className="relative">
        <div
          className="absolute -inset-4 rounded-full blur-2xl pointer-events-none"
          style={{
            background: haloColor,
            animation: 'avatar-halo 4s ease-in-out infinite',
          }}
        />
        <svg
          className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50" cy="50" r="48"
            fill="none" stroke="#60a5fa" strokeWidth="0.3"
            strokeDasharray="2 5" opacity="0.45"
          >
            <animateTransform
              attributeName="transform" type="rotate"
              from="0 50 50" to="360 50 50"
              dur="32s" repeatCount="indefinite"
            />
          </circle>
        </svg>
        <div className={`relative w-[160px] h-[160px] rounded-full p-[3px] shadow-2xl shadow-blue-500/30 ${gradient}`}>
          <img
            src={avatar}
            alt={name}
            className="w-full h-full rounded-full object-cover border-2 border-slate-900"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          {name}
        </h3>
        <p className="text-blue-300 font-semibold text-sm tracking-wide">{role}</p>
        <p className="text-xs text-slate-400 leading-relaxed">{expertise}</p>
      </div>
    </div>
  )
}

export default function TitleSlide() {
  return (
    <div className="relative h-full flex flex-col overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2 leading-tight drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)]">
            Въведение в дигиталната грамотност
          </h1>
          <p className="text-slate-400 text-sm tracking-[0.22em] uppercase">
            Академия по национална и информационна сигурност — АНИС
          </p>
        </div>

        {/* Body: two lecturers, centered */}
        <div className="flex items-center justify-center gap-28">
          <LecturerCard
            avatar={`${base}assets/tuntova-avatar2.png`}
            name="доц. д-р Атанаска Тунтова"
            role="Декан и преподавател"
            expertise="Дългогодишен опит в обучението по дигитални умения и технологии."
            gradient="bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600"
            haloColor="radial-gradient(circle, rgba(14,165,233,0.55), transparent 70%)"
          />
          <LecturerCard
            avatar={`${base}assets/varbanov-avatar.png`}
            name="инж. Иван Върбанов"
            role="Предприемач и лектор"
            expertise="Софтуерно инженерство · Системно администриране · Дигитални технологии"
            gradient="bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-600"
            haloColor="radial-gradient(circle, rgba(168,85,247,0.5), transparent 70%)"
          />
        </div>
      </div>
    </div>
  )
}
