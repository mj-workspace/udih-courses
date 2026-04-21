export default function Day1CloseSlide() {
  const recap = [
    { mod: 'Модул 1', text: 'CIA Triad — поверителност · цялостност · наличност' },
    { mod: 'Модул 2', text: '90%+ атаки започват с фишинг — спри, помисли, провери' },
    { mod: 'Модул 3', text: 'Дълга уникална парола + 2FA + password manager' },
    { mod: 'Модул 4', text: 'GDPR · NIS2 · 72ч. уведомяване — ръководството е отговорно' },
    { mod: 'Модул 5 (нач.)', text: 'Firewall · VPN · криптиране — трите основни инструмента' },
  ]

  const tomorrow = [
    'Мрежова сигурност — рискове за ВиК, мониторинг, мрежови атаки',
    'Модул 6 — политики, процедури и реакция при инциденти',
    'Обобщение на целия курс и ключови следващи стъпки',
    'Финален изпит (2 часа, Google Forms) · 24 въпроса',
  ]

  return (
    <div className="relative h-full flex flex-col px-16 py-10 overflow-hidden">
      {/* Ambient halos */}
      <div
        className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.25), transparent 70%)' }}
      />
      <div
        className="absolute -bottom-32 -right-20 w-[460px] h-[460px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.22), transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <p className="text-sm uppercase tracking-[0.28em] text-indigo-300 mb-3">
          Край на Ден 1
        </p>
        <h2 className="text-4xl font-bold text-white mb-2">
          Обобщение и закриване на Ден 1
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-pink-400 rounded-full mb-6" />

        <div className="flex-1 grid grid-cols-2 gap-10 min-h-0">
          {/* Recap */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-indigo-300 mb-4 uppercase tracking-wider">
              Какво научихме днес
            </h3>
            <ul className="space-y-3">
              {recap.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 text-xs font-bold text-indigo-400 bg-indigo-500/15 border border-indigo-500/30 rounded px-2 py-0.5 mt-0.5 min-w-[110px] text-center">
                    {r.mod}
                  </span>
                  <span className="text-slate-200 text-base leading-relaxed">{r.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tomorrow */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-pink-300 mb-4 uppercase tracking-wider">
              Какво ви очаква утре
            </h3>
            <ul className="space-y-3">
              {tomorrow.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-200 text-base leading-relaxed">
                  <span className="text-pink-400 mt-1 shrink-0">→</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
              <p className="text-2xl font-bold text-white">Благодаря ви!</p>
              <p className="text-slate-400 text-base mt-1">Приятна вечер и до утре.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
