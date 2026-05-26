export default function QASlide({ moduleLabel }) {
  return (
    <div className="relative h-full flex items-center justify-center px-16 overflow-hidden">
      {/* Ambient halos */}
      <div
        className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.35), transparent 70%)' }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-[460px] h-[460px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.3), transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        {moduleLabel && (
          <p className="text-sm uppercase tracking-[0.28em] text-blue-400 mb-6">
            {moduleLabel}
          </p>
        )}

        {/* Giant question mark */}
        <div className="relative mb-8">
          <span
            className="block text-[260px] font-black leading-none bg-gradient-to-br from-blue-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_6px_30px_rgba(56,189,248,0.55)]"
            style={{ animation: 'qa-bob 3.5s ease-in-out infinite' }}
          >
            ?
          </span>
          <span
            className="absolute inset-0 text-[260px] font-black leading-none text-cyan-400/20 blur-2xl"
            aria-hidden="true"
          >
            ?
          </span>
        </div>

        <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
          Въпроси и отговори
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-6" />

        <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
          Време за въпроси, дискусия и споделяне на практически ситуации.
        </p>
        <p className="mt-3 text-sm uppercase tracking-[0.3em] text-slate-500">
          ~ 10 минути
        </p>
      </div>
    </div>
  )
}
