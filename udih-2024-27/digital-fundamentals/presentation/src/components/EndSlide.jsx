const base = import.meta.env.BASE_URL

export default function EndSlide() {
  return (
    <div className="h-full flex items-center justify-center px-16 py-12 gap-16">
      {/* Left: UDIH big logo */}
      <div className="shrink-0">
        <img
          src={`${base}assets/udih-big-logo.png`}
          alt="UDIH — Utilities Digital Innovation Hub"
          className="w-[500px] object-contain"
        />
      </div>

      {/* Right: Contact info */}
      <div>
        <h1 className="text-5xl font-bold text-slate-900 leading-tight mb-6">
          Останете във връзка
          <br />
          с нас
        </h1>

        <p className="text-base text-slate-600 mb-8 max-w-lg leading-relaxed">
          Следете ни за информация за нови обучения, практически събития
          и възможности за развитие на дигитални умения и иновации.
        </p>

        <table className="text-sm text-slate-700">
          <tbody>
            <tr>
              <td className="pr-6 py-1 align-top font-medium text-slate-500">Уебсайт:</td>
              <td className="py-1">
                <a href="https://udih.eu" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline">
                  udih.eu
                </a>
              </td>
            </tr>
            <tr>
              <td className="pr-6 py-1 align-top font-medium text-slate-500">LinkedIn:</td>
              <td className="py-1">
                <a href="https://www.linkedin.com/company/utilities-digital-innovation-hub" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline">
                  Utilities Digital Innovation Hub
                </a>
              </td>
            </tr>
            <tr>
              <td className="pr-6 py-1 align-top font-medium text-slate-500">Facebook:</td>
              <td className="py-1">
                <a href="https://www.facebook.com/profile.php?id=61566aborned" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline">
                  UDIH- Хъб за дигитална трансформация на комуналните услуги
                </a>
              </td>
            </tr>
            <tr>
              <td className="pr-6 py-1 align-top font-medium text-slate-500">Контакт:</td>
              <td className="py-1">
                <a href="mailto:office@udih.eu" className="text-teal-700 underline">office@udih.eu</a>
                <br />
                <span className="text-slate-600">0884333266; 0884333285</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
