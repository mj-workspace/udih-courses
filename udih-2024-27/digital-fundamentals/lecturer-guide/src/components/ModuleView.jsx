import { useEffect, useRef } from 'react'
import ContentBlock from './ContentBlock'
import CollapsibleSection from './CollapsibleSection'
import LinkCard from './LinkCard'
import TimerBar from './TimerBar'
import PauseSlide from './PauseSlide'
import { PopupBudgetProvider } from './PopupBudgetContext'
import { useProgress } from './ProgressContext'
import { useTimer } from './TimerContext'
import { getModuleTargetSeconds, getSectionTargetSeconds } from '../utils/timing'

function walkPoint(point, pid, ids) {
  ;(point.children || []).forEach((child, i) => {
    const cid = `${pid}.${i}`
    ids.push(cid)
    walkPoint(child, cid, ids)
  })
  ;(point.examples || []).forEach((_, i) => {
    ids.push(`${pid}:ex${i}`)
  })
}

function enumerateSectionPointIds(section, moduleId) {
  if (!section || !moduleId) return []
  const prefix = `${moduleId}::${section.id}`
  const ids = []
  ;(section.talkingPoints || []).forEach((point, i) => {
    const pid = `${prefix}::${i}`
    ids.push(pid)
    walkPoint(point, pid, ids)
  })
  ;(section.examples || []).forEach((_, i) => {
    ids.push(`${prefix}::ex${i}`)
  })
  return ids
}

function AutoPauseSection({ moduleId, section }) {
  const { covered } = useProgress()
  const { pausedSections, togglePauseSection } = useTimer()
  const prevRef = useRef(null)

  useEffect(() => {
    if (!moduleId || !section) return
    const ids = enumerateSectionPointIds(section, moduleId)
    if (ids.length === 0) return
    const key = `${moduleId}::${section.id}`
    const allCovered = ids.every((id) => covered[id])
    const prev = prevRef.current
    if (prev && prev.key === key && !prev.allCovered && allCovered) {
      if (!pausedSections[section.id]) togglePauseSection(section.id)
    }
    prevRef.current = { key, allCovered }
  }, [covered, moduleId, section, pausedSections, togglePauseSection])

  return null
}

function confirmAndRun(message, fn) {
  if (typeof window !== 'undefined' && !window.confirm(message)) return
  fn()
}

function ProgressResetGroup({ moduleId, sectionId, hasSection }) {
  const { resetSection, resetModule, resetAll } = useProgress()
  const btn =
    'inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md cursor-pointer ' +
    'text-gray-600 bg-gray-50 border border-gray-200 hover:text-emerald-700 hover:bg-emerald-50 hover:border-emerald-200 ' +
    'transition-colors'

  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <span className="text-[10px] uppercase tracking-wider text-gray-400 mr-1">Изчисти ✓</span>
      {hasSection && sectionId && (
        <button
          type="button"
          onClick={() =>
            confirmAndRun(
              'Сигурни ли сте, че искате да изчистите маркираните точки в текущата подточка?',
              () => resetSection(moduleId, sectionId),
            )
          }
          className={btn}
          title="Изчисти маркираните точки в текущата подточка"
        >
          подт.
        </button>
      )}
      <button
        type="button"
        onClick={() =>
          confirmAndRun(
            'Сигурни ли сте, че искате да изчистите маркираните точки в целия модул?',
            () => resetModule(moduleId),
          )
        }
        className={btn}
        title="Изчисти маркираните точки в целия модул"
      >
        модул
      </button>
      <button
        type="button"
        onClick={() =>
          confirmAndRun(
            'Сигурни ли сте, че искате да изчистите ВСИЧКИ маркирани точки (всички модули)?',
            () => resetAll(),
          )
        }
        className={btn}
        title="Изчисти всички маркирани точки (всички модули)"
      >
        всичко
      </button>
    </div>
  )
}

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

function SectionContent({ section, moduleId }) {
  const pathPrefix = `${moduleId}::${section.id}`
  return (
    <div id={`section-${section.id}`} className="space-y-5">
      {section.alert && (
        <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          <span className="text-lg">⚠️</span>
          {section.alert}
        </div>
      )}
      {section.talkingPoints?.length > 0 && (
        <ContentBlock type="talking-points" content={section.talkingPoints} pathPrefix={pathPrefix} />
      )}
      {section.linkCard && (
        <LinkCard linkCard={section.linkCard} />
      )}
      {section.examples?.length > 0 && (
        <ContentBlock type="examples" content={section.examples} pathPrefix={pathPrefix} />
      )}
      {section.children?.map((child) => (
        <CollapsibleSection
          key={child.id}
          section={child}
          moduleId={moduleId}
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
    <PopupBudgetProvider module={module}>
    {activeSection && <AutoPauseSection moduleId={module.id} section={activeSection} />}
    {module.sections.length === 1 && <AutoPauseSection moduleId={module.id} section={module.sections[0]} />}
    <div className="max-w-none">
      {/* Module header */}
      <div className="pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <ContentBlock type="time-marker" content={`${module.timeMarker} · ${module.duration}`} />
          <ProgressResetGroup
            moduleId={module.id}
            sectionId={activeSection?.id}
            hasSection={!!activeSection}
          />
        </div>
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
          <SectionContent section={module.sections[0]} moduleId={module.id} />
        ) : activeSection ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-5">{activeSection.title}</h3>
            <SectionContent section={activeSection} moduleId={module.id} />
          </div>
        ) : (
          <div className="space-y-1">
            {module.sections.map((section) => (
              <CollapsibleSection
                key={section.id}
                section={section}
                moduleId={module.id}
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
    </PopupBudgetProvider>
  )
}
