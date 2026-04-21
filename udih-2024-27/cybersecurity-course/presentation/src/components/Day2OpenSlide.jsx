export default function Day2OpenSlide() {
  const recap = [
    'CIA Triad — поверителност, цялостност, наличност',
    'Фишинг и social engineering — №1 входна точка',
    'Силни пароли + 2FA = първата линия на защита',
    'GDPR и NIS2 — ВиК е critical infrastructure',
    'Основи на мрежовата сигурност — firewall · VPN · криптиране',
  ]

  const today = [
    'Мрежова сигурност — продължение (рискове ВиК · мониторинг · атаки)',
    'Модул 6 — политики, процедури и реакция при инциденти',
    'Финален изпит (Google Forms, 2 часа)',
  ]

  return (
    <div className="relative h-full flex flex-col px-16 py-10 overflow-hidden">
      {/* Sunrise ambience */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(251,191,36,0.18), transparent 70%)' }}
      />
      <div
        className="absolute -bottom-32 -right-20 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.28), transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <p className="text-sm uppercase tracking-[0.28em] text-amber-300 mb-3">
          Ден 2 · Добро утро!
        </p>
        <h2 className="text-4xl font-bold text-white mb-2">
          Откриване и кратък преговор
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-blue-400 rounded-full mb-6" />

        <div className="flex-1 grid grid-cols-[1.1fr_1fr] gap-10 min-h-0">
          {/* Recap from Day 1 */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-amber-300 mb-4 uppercase tracking-wider">
              Преговор · ключови теми от вчера
            </h3>
            <ul className="space-y-3">
              {recap.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-200 text-base leading-relaxed">
                  <span
                    className="shrink-0 text-xs font-bold text-amber-200 bg-amber-500/15 border border-amber-400/30 rounded-full w-6 h-6 flex items-center justify-center mt-0.5"
                  >
                    {i + 1}
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-slate-700/50">
              <p className="text-base text-slate-300 italic">
                Въпроси от вчера? Нещо, което е останало неясно?
              </p>
            </div>
          </div>

          {/* Today */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-blue-300 mb-4 uppercase tracking-wider">
              Днес продължаваме с
            </h3>
            <ul className="space-y-3">
              {today.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-200 text-base leading-relaxed">
                  <span className="text-blue-400 mt-1 shrink-0">→</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
