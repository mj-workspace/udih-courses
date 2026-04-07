export default function CoverSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-16 relative">
      <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-lg">
        UDIH
      </h1>

      <h2 className="text-4xl font-bold text-white leading-tight drop-shadow-lg max-w-5xl">
        НАЦИОНАЛНА ОБУЧИТЕЛНА ПРОГРАМА
        <br />
        ЗА ДИГИТАЛНА ТРАНСФОРМАЦИЯ НА
        <br />
        КОМУНАЛНИЯ СЕКТОР
      </h2>

      <div className="absolute bottom-6 left-16 right-16">
        <p className="text-sm text-white/80 leading-relaxed drop-shadow">
          Проект BG16RFPR002-1.002-0008 „UDIH 4 EU" по програма „Научни изследвания,
          иновации и дигитализация за интелигентна трансформация" 2021 – 2027 г.,
          съфинансирана от Европейския съюз чрез Европейския фонд за регионално развитие
        </p>
      </div>
    </div>
  )
}
