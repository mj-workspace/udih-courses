import { useState, useCallback, useEffect } from 'react'

export default function Sidebar({ groups, activeModuleId, activeSectionId, modulesData, onModuleSelect, onSectionSelect, selectedDay, onSelectDay }) {
  const [width, setWidth] = useState(() => {
    const saved = localStorage.getItem('sidebar-width')
    return saved ? Number(saved) : 380
  })
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e) => {
      const newWidth = Math.min(Math.max(e.clientX, 260), 600)
      setWidth(newWidth)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      localStorage.setItem('sidebar-width', String(width))
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isDragging, width])

  return (
    <div
      className="h-screen sticky top-0 flex-shrink-0 relative flex"
      style={{ width: `${width}px` }}
    >
    <aside className="flex-1 h-full bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="px-5 py-4 border-b border-gray-200 shrink-0 bg-gray-50 z-10 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              Курс по киберсигурност
            </h1>
            <p className="text-xs text-gray-500 mt-1">Ръководство за лектора</p>
          </div>
          <a
            href="/"
            className="shrink-0 rounded-md bg-gray-200 px-2.5 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-300 hover:text-gray-800"
            title="Към началната страница"
          >
            ← Начало
          </a>
        </div>

        {onSelectDay && (
          <div
            role="tablist"
            aria-label="Избор на ден"
            className="flex items-center gap-1 p-1 rounded-lg bg-gray-200/70 border border-gray-200"
          >
            {[1, 2].map((day) => {
              const active = selectedDay === day
              return (
                <button
                  key={day}
                  role="tab"
                  aria-selected={active}
                  onClick={() => onSelectDay(day)}
                  className={`flex-1 px-3 h-8 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    active
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-white/60'
                  }`}
                  title={day === 1 ? 'Само секции от Ден 1' : 'Само секции от Ден 2'}
                >
                  Ден {day}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <nav className="p-3 flex-1 overflow-y-auto elegant-scroll [&_button]:cursor-pointer">
        {groups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? 'mt-4' : ''}>
            {group.label && !onSelectDay && (
              <div className="px-3 py-1.5 mb-1">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  {group.label}
                </span>
              </div>
            )}

            <div className="space-y-0.5">
              {group.items.map((item, itemIndex) => {
                if (item.type === 'break' || item.type === 'qa') {
                  const isPause = true
                  const isPauseActive = activeModuleId === item.id
                  const isQa = item.type === 'qa'
                  return (
                    <button
                      key={item.id}
                      onClick={() => onModuleSelect(item.id)}
                      className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs italic rounded-lg transition-colors cursor-pointer ${
                        isPauseActive
                          ? isQa
                            ? 'bg-violet-100 text-violet-800 font-semibold border border-violet-200'
                            : 'bg-amber-100 text-amber-800 font-semibold border border-amber-200'
                          : isQa
                            ? 'text-violet-500/70 hover:bg-violet-50 hover:text-violet-700 border border-transparent'
                            : 'text-amber-600/70 hover:bg-amber-50 hover:text-amber-700 border border-transparent'
                      }`}
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3 shrink-0">
                        {isQa ? (
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        ) : (
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                        )}
                      </svg>
                      <span>{item.shortTitle}</span>
                      <span className="ml-auto shrink-0">{item.duration}</span>
                    </button>
                  )
                }

                const isActive = activeModuleId === item.id
                const isModule = item.type === 'module'
                const moduleData = modulesData[item.id]
                const sections = moduleData?.sections || []

                return (
                  <div key={item.id}>
                    {isModule ? (
                      <button
                        onClick={() => onModuleSelect(item.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between gap-2 ${
                          isActive
                            ? 'bg-blue-100 text-blue-900 font-semibold border border-blue-200'
                            : 'text-gray-800 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200'
                        }`}
                      >
                        <span>{item.shortTitle}</span>
                        <span className={`text-[11px] font-medium shrink-0 ${
                          isActive ? 'text-blue-500' : 'text-gray-400'
                        }`}>
                          {item.duration}
                        </span>
                      </button>
                    ) : item.url ? (
                      <a
                        href={import.meta.env.BASE_URL + item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between gap-2 text-gray-500 hover:bg-white hover:shadow-sm hover:text-gray-900 border border-transparent hover:border-gray-200"
                      >
                        <span>{item.shortTitle}</span>
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-gray-400">
                          <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                        </svg>
                      </a>
                    ) : (
                      <button
                        onClick={() => onModuleSelect(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between gap-2 ${
                          isActive
                            ? 'bg-blue-100 text-blue-900 font-semibold border border-blue-200'
                            : 'text-gray-500 hover:bg-white hover:shadow-sm hover:text-gray-900 border border-transparent hover:border-gray-200'
                        }`}
                      >
                        <span>{item.shortTitle}</span>
                        {item.duration && (
                          <span className={`text-[11px] font-medium shrink-0 ${
                            isActive ? 'text-blue-500' : 'text-gray-400'
                          }`}>
                            {item.duration}
                          </span>
                        )}
                      </button>
                    )}

                    {isActive && sections.length > 1 && (
                      <div className="ml-3 mt-0.5 mb-1 border-l-2 border-blue-200 space-y-px">
                        {sections.map((section) => {
                          const isSectionActive = activeSectionId === section.id
                          const label = section.title.replace(/^\d+\.\d+\s+/, '')

                          return (
                            <button
                              key={section.id}
                              onClick={() => onSectionSelect(section.id)}
                              className={`w-full text-left pl-3 pr-2 py-1.5 text-[13px] transition-colors rounded-r-md ${
                                isSectionActive
                                  ? 'bg-blue-100 text-blue-900 font-semibold border-l-2 border-blue-500 -ml-[2px]'
                                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                              }`}
                            >
                              <span className={`font-mono text-[11px] mr-1.5 ${
                                isSectionActive ? 'text-blue-500' : 'text-gray-400'
                              }`}>
                                {section.id}
                              </span>
                              {label}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {gi < groups.length - 1 && (
              <div className="mt-4 border-b border-gray-200" />
            )}
          </div>
        ))}
      </nav>

    </aside>

      {/* Drag handle — outside aside, after scrollbar */}
      <div
        onMouseDown={handleMouseDown}
        className={`w-1.5 h-full cursor-col-resize transition-colors hover:bg-blue-400 flex-shrink-0 ${isDragging ? 'bg-blue-400' : 'bg-transparent'}`}
      />
    </div>
  )
}
