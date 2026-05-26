import { useState, useCallback, useEffect, useMemo } from 'react'
import { slides } from './data/slides'
import CoverSlide from './components/CoverSlide'
import TitleSlide from './components/TitleSlide'
import EndSlide from './components/EndSlide'
import Slide from './components/Slide'
import QASlide from './components/QASlide'
import BreakSlide from './components/BreakSlide'
import Day1CloseSlide from './components/Day1CloseSlide'
import Day2OpenSlide from './components/Day2OpenSlide'
import ProgressBar from './components/ProgressBar'
import Navigation from './components/Navigation'

const base = import.meta.env.BASE_URL

// Split master slide deck into two day views.
// Cover slide is shared — both days start on it. Everything up to day1-close
// belongs to Day 1; everything from day2-open onward belongs to Day 2.
const day1CloseIndex = slides.findIndex(s => s.type === 'day1-close')
const day2OpenIndex = slides.findIndex(s => s.type === 'day2-open')

function buildDaySlides(day) {
  return slides.filter((s, i) => {
    if (s.type === 'cover') return true
    if (day === 1) return i <= day1CloseIndex
    return i >= day2OpenIndex
  })
}

function readUrlState() {
  if (typeof window === 'undefined') return { day: 1, slide: 0 }
  const params = new URLSearchParams(window.location.search)
  const day = params.get('day') === '2' ? 2 : 1
  const slide = Math.max(0, parseInt(params.get('slide'), 10) || 0)
  const deckLen = buildDaySlides(day).length
  return { day, slide: Math.min(slide, deckLen - 1) }
}

function writeUrlState(day, slide) {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams()
  if (day !== 1) params.set('day', String(day))
  if (slide !== 0) params.set('slide', String(slide))
  const qs = params.toString()
  const url = window.location.pathname + (qs ? `?${qs}` : '')
  window.history.replaceState(null, '', url)
}

export default function App() {
  const initial = useMemo(readUrlState, [])
  const [selectedDay, setSelectedDay] = useState(initial.day)
  const [current, setCurrent] = useState(initial.slide)

  const visibleSlides = useMemo(() => buildDaySlides(selectedDay), [selectedDay])
  const total = visibleSlides.length

  const switchDay = useCallback((day) => {
    setSelectedDay(day)
    setCurrent(0)
  }, [])

  const goNext = useCallback(() => {
    setCurrent(prev => Math.min(prev + 1, total - 1))
  }, [total])

  const goPrev = useCallback(() => {
    setCurrent(prev => Math.max(prev - 1, 0))
  }, [])

  useEffect(() => {
    writeUrlState(selectedDay, current)
  }, [selectedDay, current])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'Home') {
        e.preventDefault()
        setCurrent(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        setCurrent(total - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev, total])

  const slide = visibleSlides[current]
  const isCover = slide.type === 'cover'
  const isEnd = slide.type === 'end'

  return (
    <div className="h-screen w-screen flex flex-col select-none relative overflow-hidden">
      {/* Background */}
      {isCover ? (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${base}assets/background.jpeg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ) : (
        <div className={`absolute inset-0 z-0 ${isEnd ? 'bg-white' : 'bg-slate-900'}`} />
      )}

      {/* UDIH logo — top-right (hidden on end slide, big logo is in the content) */}
      {!isEnd && (
        <div className="absolute top-4 right-6 z-20">
          <img
            src={`${base}assets/${isCover ? 'udih-small-homepage-logo.png' : 'udih-small-page-logo.png'}`}
            alt="UDIH"
            className={`transition-all duration-300 ${isCover ? 'h-20' : 'h-16'}`}
          />
        </div>
      )}

      {/* Slide content */}
      <div className="flex-1 min-h-0 relative z-10">
        {slide.type === 'cover' && <CoverSlide />}
        {slide.type === 'title' && <TitleSlide />}
        {slide.type === 'end' && <EndSlide />}
        {slide.type === 'qa' && <QASlide moduleLabel={slide.moduleLabel} />}
        {slide.type === 'break' && (
          <BreakSlide
            key={`${selectedDay}-${current}`}
            minutes={slide.minutes}
            label={slide.label}
          />
        )}
        {slide.type === 'day1-close' && <Day1CloseSlide />}
        {slide.type === 'day2-open' && <Day2OpenSlide />}
        {slide.type === 'content' && (
          <Slide
            moduleTitle={slide.moduleTitle}
            sectionNumber={slide.sectionNumber}
            title={slide.title}
            points={slide.points}
          />
        )}
      </div>

      {/* Footer: partner logos + centered navigation */}
      <div className="relative z-20 bg-white px-6 py-3 flex items-center">
        {/* Left: ANIS, TU, BAV */}
        <div className="flex items-center gap-4">
          <img
            src={`${base}assets/anis-logo.jpeg`}
            alt="АНИС"
            className="h-11 w-11 object-contain rounded-sm"
          />
          <img
            src={`${base}assets/tu-logo.png`}
            alt="ТУ-София филиал Пловдив"
            className="h-11 object-contain"
          />
          <img
            src={`${base}assets/bav-logo.png`}
            alt="БАВ"
            className="h-9 object-contain"
          />
        </div>

        {/* Center: Navigation (absolute for true centering) */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Navigation
            current={current}
            total={total}
            onPrev={goPrev}
            onNext={goNext}
            selectedDay={selectedDay}
            onSelectDay={switchDay}
          />
        </div>

        {/* Right: Programa, EU */}
        <div className="flex items-center gap-4 ml-auto">
          <img
            src={`${base}assets/programa-logo.png`}
            alt="Програма НИДИТ"
            className="h-9 object-contain"
          />
          <img
            src={`${base}assets/eu-logo.png`}
            alt="Съфинансирано от ЕС"
            className="h-9 object-contain"
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative z-20">
        <ProgressBar current={current} total={total} />
      </div>
    </div>
  )
}
