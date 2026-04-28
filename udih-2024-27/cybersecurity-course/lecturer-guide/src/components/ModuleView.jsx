import ContentBlock from './ContentBlock'
import CollapsibleSection from './CollapsibleSection'
import LinkCard from './LinkCard'
import TimerBar from './TimerBar'
import PauseSlide from './PauseSlide'
import { getModuleTargetSeconds, getSectionTargetSeconds } from '../utils/timing'

function isPauseModule(module) {
  return !!module?.id && (module.id.startsWith('break-') || module.id.startsWith('qa-'))
}

function shortModuleLabel(module) {
  const t = module?.title || ''
  const colonIdx = t.indexOf(':')
  if (colonIdx > 0) return t.slice(0, colonIdx).trim()
  return t.length > 24 ? t.slice(0, 22) + '…' : t
}

function shortSectionLabel(section) {
  if (!section) return ''
  return `Подт. ${section.id}`
}

function SectionContent({ section }) {
  return (
    <div id={`section-${section.id}`} className="space-y-5">
      {section.alert && (
        <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          <span className="text-lg">⚠️</span>
          {section.alert}
        </div>
      )}
      {section.talkingPoints?.length > 0 && (
        <ContentBlock type="talking-points" content={section.talkingPoints} />
      )}
      {section.linkCard && (
        <LinkCard linkCard={section.linkCard} />
      )}
      {section.examples?.length > 0 && (
        <ContentBlock type="examples" content={section.examples} />
      )}
      {section.children?.map((child) => (
        <CollapsibleSection
          key={child.id}
          section={child}
          depth={0}
          isExpanded={false}
          onToggle={() => {}}
          expandedSections={new Set()}
        />
      ))}
    </div>
  )
}

export default function ModuleView({ module, activeSectionId, expandedSections, onToggleSection }) {
  if (!module) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Избери модул от менюто
      </div>
    )
  }

  if (isPauseModule(module)) {
    return <PauseSlide module={module} />
  }

  const activeSection = module.sections.length > 1
    ? module.sections.find((s) => s.id === activeSectionId)
    : null

  const moduleTarget = getModuleTargetSeconds(module)
  const sectionTarget = activeSection ? getSectionTargetSeconds(module, activeSection.id) : 0
  const sectionIds = (module.sections || []).map((s) => s.id)

  return (
    <div className="max-w-none">
      {/* Module header */}
      <div className="pb-3 border-b border-gray-100">
        <ContentBlock type="time-marker" content={`${module.timeMarker} · ${module.duration}`} />
        <h2 className="text-2xl font-bold text-gray-900 mt-3">{module.title}</h2>
        {module.note && (
          <p className="text-sm text-gray-500 mt-1 italic">{module.note}</p>
        )}
      </div>

      {moduleTarget > 0 && (
        <TimerBar
          moduleLabel={shortModuleLabel(module)}
          moduleTarget={moduleTarget}
          sectionLabel={activeSection ? shortSectionLabel(activeSection) : ''}
          sectionTarget={sectionTarget}
          sectionIds={sectionIds}
        />
      )}

      <div>
        {module.sections.length === 1 ? (
          <SectionContent section={module.sections[0]} />
        ) : activeSection ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-5">{activeSection.title}</h3>
            <SectionContent section={activeSection} />
          </div>
        ) : (
          <div className="space-y-1">
            {module.sections.map((section) => (
              <CollapsibleSection
                key={section.id}
                section={section}
                depth={0}
                isExpanded={expandedSections.has(section.id)}
                onToggle={onToggleSection}
                expandedSections={expandedSections}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
