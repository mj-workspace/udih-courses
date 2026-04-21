import { useState, useCallback, useEffect, useMemo } from 'react'
import Sidebar from './components/Sidebar'
import ModuleView from './components/ModuleView'
import NavigationControls from './components/NavigationControls'
import { sidebarGroups, navigationOrder, sectionToModule } from './data/navigation'
import { modules } from './data/index'

const DEFAULT_SECTION_ID = 'intro-main'
const VALID_SECTION_IDS = new Set(navigationOrder)

function dayForSection(sectionId) {
  const moduleId = sectionToModule[sectionId]
  if (!moduleId) return 1
  for (let i = 0; i < sidebarGroups.length; i++) {
    if (sidebarGroups[i].items.some(it => it.id === moduleId)) {
      return i + 1
    }
  }
  return 1
}

function buildDayOrder(day) {
  const group = sidebarGroups[day - 1]
  if (!group) return []
  const dayModuleIds = new Set(group.items.map(it => it.id))
  return navigationOrder.filter(sid => dayModuleIds.has(sectionToModule[sid]))
}

function readUrlState() {
  if (typeof window === 'undefined') return { sectionId: DEFAULT_SECTION_ID }
  const params = new URLSearchParams(window.location.search)
  const sectionId = params.get('section')
  if (sectionId && VALID_SECTION_IDS.has(sectionId) && sectionToModule[sectionId]) {
    return { sectionId }
  }
  return { sectionId: DEFAULT_SECTION_ID }
}

function writeUrlState(sectionId) {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams()
  if (sectionId && sectionId !== DEFAULT_SECTION_ID) {
    params.set('section', sectionId)
  }
  const qs = params.toString()
  const url = window.location.pathname + (qs ? `?${qs}` : '')
  window.history.replaceState(null, '', url)
}

export default function App() {
  const initial = useMemo(readUrlState, [])
  const [activeModuleId, setActiveModuleId] = useState(
    sectionToModule[initial.sectionId] || 'intro'
  )
  const [activeSectionId, setActiveSectionId] = useState(initial.sectionId)
  const [selectedDay, setSelectedDay] = useState(() => dayForSection(initial.sectionId))
  const [expandedSections, setExpandedSections] = useState(new Set())

  useEffect(() => {
    writeUrlState(activeSectionId)
  }, [activeSectionId])

  // If active section belongs to a different day (e.g. navigated via controls
  // or loaded from URL), sync the day toggle.
  useEffect(() => {
    const d = dayForSection(activeSectionId)
    if (d !== selectedDay) setSelectedDay(d)
  }, [activeSectionId, selectedDay])

  const visibleGroups = useMemo(() => {
    const g = sidebarGroups[selectedDay - 1]
    return g ? [g] : []
  }, [selectedDay])

  const dayNavigationOrder = useMemo(
    () => buildDayOrder(selectedDay),
    [selectedDay],
  )

  const handleModuleSelect = useCallback((moduleId) => {
    setActiveModuleId(moduleId)
    const firstSection = navigationOrder.find((sid) => sectionToModule[sid] === moduleId)
    if (firstSection) {
      setActiveSectionId(firstSection)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleSectionSelect = useCallback((sectionId) => {
    const targetModule = sectionToModule[sectionId]
    if (targetModule) {
      setActiveModuleId(targetModule)
    }
    setActiveSectionId(sectionId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleToggleSection = useCallback((sectionId) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(sectionId)) {
        next.delete(sectionId)
      } else {
        next.add(sectionId)
      }
      return next
    })
  }, [])

  const handleNavigate = useCallback((sectionId) => {
    const targetModule = sectionToModule[sectionId]
    if (targetModule) {
      setActiveModuleId(targetModule)
    }
    setActiveSectionId(sectionId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleSelectDay = useCallback((day) => {
    if (day === selectedDay) return
    const order = buildDayOrder(day)
    if (order.length === 0) return
    const firstSection = order[0]
    setSelectedDay(day)
    setActiveSectionId(firstSection)
    setActiveModuleId(sectionToModule[firstSection] || 'intro')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selectedDay])

  const activeModule = modules[activeModuleId]

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar
        groups={visibleGroups}
        activeModuleId={activeModuleId}
        activeSectionId={activeSectionId}
        modulesData={modules}
        onModuleSelect={handleModuleSelect}
        onSectionSelect={handleSectionSelect}
        selectedDay={selectedDay}
        onSelectDay={handleSelectDay}
      />

      <main className="flex-1 p-8 pb-24 overflow-y-auto h-screen text-[17px] elegant-scroll">
        <ModuleView
          module={activeModule}
          activeSectionId={activeSectionId}
          expandedSections={expandedSections}
          onToggleSection={handleToggleSection}
        />
      </main>

      <NavigationControls
        currentSectionId={activeSectionId}
        navigationOrder={dayNavigationOrder}
        onNavigate={handleNavigate}
      />
    </div>
  )
}
