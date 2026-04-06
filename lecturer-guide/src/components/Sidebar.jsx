export default function Sidebar({ groups, activeModuleId, activeSectionId, modulesData, onModuleSelect, onSectionSelect }) {
  return (
    <aside className="w-[40%] min-w-80 max-w-xl h-screen sticky top-0 bg-gray-50 border-r border-gray-200 overflow-y-auto">
      <div className="px-5 py-4 border-b border-gray-200">
        <h1 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
          Курс по киберсигурност
        </h1>
        <p className="text-xs text-gray-500 mt-1">Ръководство за лектора</p>
      </div>

      <nav className="p-3 [&_button]:cursor-pointer">
        {groups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? 'mt-4' : ''}>
            {group.label && (
              <div className="px-3 py-1.5 mb-1">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  {group.label}
                </span>
              </div>
            )}

            <div className="space-y-0.5">
              {group.items.map((item) => {
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
                          // Strip the "1.1 " prefix for a cleaner title
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
  )
}
