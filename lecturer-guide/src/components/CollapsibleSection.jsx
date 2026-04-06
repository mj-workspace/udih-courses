import { useRef, useEffect, useState } from 'react'
import ContentBlock from './ContentBlock'

const depthColors = [
  'border-l-gray-800',
  'border-l-gray-500',
  'border-l-gray-400',
  'border-l-gray-300',
]

export default function CollapsibleSection({ section, depth = 0, isExpanded, onToggle, expandedSections }) {
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [isExpanded, expandedSections])

  // Re-measure when children expand/collapse
  useEffect(() => {
    if (!isExpanded || !contentRef.current) return
    const observer = new ResizeObserver(() => {
      setHeight(contentRef.current.scrollHeight)
    })
    observer.observe(contentRef.current)
    return () => observer.disconnect()
  }, [isExpanded])

  const borderColor = depthColors[Math.min(depth, depthColors.length - 1)]
  const indent = depth > 0 ? 'ml-4' : ''

  return (
    <div className={`${indent} ${depth > 0 ? `border-l-2 ${borderColor}` : ''}`} id={`section-${section.id}`}>
      <button
        onClick={() => onToggle(section.id)}
        className={`w-full flex items-center gap-2 text-left py-2.5 px-3 rounded-lg hover:bg-gray-100 transition-colors group ${
          depth === 0 ? 'text-lg font-semibold text-gray-900' : 'text-base font-medium text-gray-700'
        }`}
      >
        <span
          className={`text-gray-400 transition-transform duration-200 text-sm ${
            isExpanded ? 'rotate-90' : ''
          }`}
        >
          ▶
        </span>
        <span className="group-hover:text-gray-900">{section.title}</span>
      </button>

      <div
        className="overflow-hidden transition-all duration-250 ease-in-out"
        style={{
          maxHeight: isExpanded ? `${height}px` : '0px',
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="px-3 pb-3 space-y-3">
          {section.talkingPoints && section.talkingPoints.length > 0 && (
            <ContentBlock type="talking-points" content={section.talkingPoints} />
          )}

          {section.examples && section.examples.length > 0 && (
            <ContentBlock type="examples" content={section.examples} />
          )}

          {section.transition && (
            <ContentBlock type="transition" content={section.transition} />
          )}

          {section.children && section.children.map((child) => (
            <CollapsibleSection
              key={child.id}
              section={child}
              depth={depth + 1}
              isExpanded={expandedSections.has(child.id)}
              onToggle={onToggle}
              expandedSections={expandedSections}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
