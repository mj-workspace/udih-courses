import { useState, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import ModuleView from './components/ModuleView'
import NavigationControls from './components/NavigationControls'
import { sidebarGroups, navigationOrder, sectionToModule } from './data/navigation'
import { modules } from './data/index'

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState('intro')
  const [activeSectionId, setActiveSectionId] = useState('intro-main')
  const [expandedSections, setExpandedSections] = useState(new Set())

  const handleModuleSelect = useCallback((moduleId) => {
    setActiveModuleId(moduleId)
    // Set active section to the first section of this module
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

  const activeModule = modules[activeModuleId]

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar
        groups={sidebarGroups}
        activeModuleId={activeModuleId}
        activeSectionId={activeSectionId}
        modulesData={modules}
        onModuleSelect={handleModuleSelect}
        onSectionSelect={handleSectionSelect}
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
        navigationOrder={navigationOrder}
        onNavigate={handleNavigate}
      />
    </div>
  )
}
