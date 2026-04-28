import { useState } from 'react'
import DetailPopup from './DetailPopup'
import LinkCard from './LinkCard'
import { useProgress } from './ProgressContext'

function renderBoldText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|!![^!]+!!)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('!!') && part.endsWith('!!')) {
      return (
        <span key={i} className="text-red-600 font-medium">
          {part.slice(2, -2)}
        </span>
      )
    }
    return part
  })
}

function CoveredBullet({ pointId, color = 'text-blue-400', size = 'text-[13px]', className = '' }) {
  const { isCovered, toggleCovered } = useProgress()
  const covered = isCovered(pointId)
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        toggleCovered(pointId)
      }}
      title={covered ? 'Отмаркирай (не е казано)' : 'Маркирай като казано'}
      aria-label={covered ? 'Отмаркирай' : 'Маркирай като казано'}
      className={`shrink-0 mt-0.5 leading-none cursor-pointer hover:scale-125 transition-transform ${className} ${
        covered ? `text-emerald-500 text-[20px] font-bold` : `${color} ${size}`
      }`}
    >
      {covered ? '✓' : '●'}
    </button>
  )
}

function TalkingPointItem({ point, pointId, depth = 0 }) {
  const [open, setOpen] = useState(true)
  const [showDetail, setShowDetail] = useState(false)
  const { isCovered, lastOpened } = useProgress()
  const covered = isCovered(pointId)
  const isLastOpened = lastOpened === pointId
  const hasChildren = point.children && point.children.length > 0
  const hasDetail = !!point.detail
  const hasExamples = point.examples && point.examples.length > 0
  const dimClass = covered ? 'opacity-50' : ''
  const lastOpenedClass = isLastOpened
    ? 'border-l-[3px] border-violet-500 bg-violet-50/40 pl-2 -ml-2 rounded-r-md'
    : ''

  if (!hasChildren) {
    return (
      <li className={`py-1 ${point.highlight ? 'my-1 -ml-3 w-fit rounded-lg border border-violet-200 bg-violet-50/50 pl-3 pr-4 py-2' : ''}`}>
        <div className={`flex items-start gap-2 ${lastOpenedClass}`}>
          <CoveredBullet pointId={pointId} />
          <span className={`text-gray-700 leading-relaxed ${dimClass}`}>
            {hasDetail ? (
              <button
                onClick={() => setShowDetail(true)}
                className="text-left cursor-pointer underline decoration-blue-300 decoration-dotted underline-offset-2 hover:decoration-blue-500 hover:text-gray-900 transition-colors"
              >
                {renderBoldText(point.text)}
              </button>
            ) : (
              renderBoldText(point.text)
            )}
          </span>
        </div>
        {hasDetail && showDetail && (
          <DetailPopup
            title={point.text}
            detail={point.detail}
            onClose={() => setShowDetail(false)}
            pointId={pointId}
          />
        )}
        {hasExamples && <InlineExamples examples={point.examples} parentPointId={pointId} />}
      </li>
    )
  }

  return (
    <li className={`py-0.5 ${point.highlight ? 'my-1 -ml-3 w-fit rounded-lg border border-violet-200 bg-violet-50/50 pl-3 pr-4 py-1' : ''}`}>
      <div className={`flex items-start gap-2 ${lastOpenedClass}`}>
        <CoveredBullet pointId={pointId} className="mt-2.5" />
        {hasDetail ? (
          <button
            onClick={() => setShowDetail(true)}
            className={`flex items-start gap-2 flex-1 text-left group py-1 cursor-pointer ${dimClass}`}
          >
            <span className="mt-1 text-[10px] shrink-0 rotate-90 text-blue-500">
              ▶
            </span>
            <span className="leading-relaxed text-gray-900 font-medium underline decoration-blue-300 decoration-dotted underline-offset-2 group-hover:decoration-blue-500">
              {renderBoldText(point.text)}
            </span>
          </button>
        ) : (
          <button
            onClick={() => setOpen(!open)}
            className={`flex items-start gap-2 flex-1 text-left group py-1 cursor-pointer ${dimClass}`}
          >
            <span className={`mt-1 text-[10px] shrink-0 transition-transform duration-150 ${
              open ? 'rotate-90 text-blue-500' : 'text-gray-400 group-hover:text-blue-400'
            }`}>
              ▶
            </span>
            <span className={`leading-relaxed ${
              open ? 'text-gray-900 font-medium' : 'text-gray-700 group-hover:text-gray-900'
            }`}>
              {renderBoldText(point.text)}
            </span>
          </button>
        )}
      </div>

      {showDetail && (
        <DetailPopup
          title={point.text}
          detail={point.detail}
          onClose={() => setShowDetail(false)}
          pointId={pointId}
        />
      )}

      {hasDetail ? (
        <ul className="ml-5 pl-3 border-l-2 border-blue-100 space-y-0.5 pb-1">
          {point.children.map((child, i) => (
            <TalkingPointItem
              key={i}
              point={child}
              pointId={`${pointId}.${i}`}
              depth={depth + 1}
            />
          ))}
        </ul>
      ) : (
        <div className={`overflow-hidden transition-all duration-200 ease-in-out ${
          open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <ul className="ml-5 pl-3 border-l-2 border-blue-100 space-y-0.5 pb-1">
            {point.children.map((child, i) => (
              <TalkingPointItem
                key={i}
                point={child}
                pointId={`${pointId}.${i}`}
                depth={depth + 1}
              />
            ))}
          </ul>
        </div>
      )}

      {hasExamples && <InlineExamples examples={point.examples} parentPointId={pointId} />}
    </li>
  )
}

function InlineExamples({ examples, parentPointId }) {
  return (
    <div className="mt-2 ml-5 bg-amber-50/60 rounded-lg px-3 py-2.5 border border-amber-100">
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="text-amber-500 text-xs">💡</span>
        <span className="text-[10px] font-semibold text-amber-700 uppercase tracking-wider">
          {examples.length > 1 ? 'Примери' : 'Пример'}
        </span>
      </div>
      <ul className="space-y-1">
        {examples.map((example, i) => (
          <ExampleItem
            key={i}
            example={example}
            pointId={`${parentPointId}:ex${i}`}
          />
        ))}
      </ul>
    </div>
  )
}

function TalkingPoints({ content, pathPrefix }) {
  return (
    <div>
      <ul className="space-y-0.5">
        {content.map((point, i) => {
          const pointId = `${pathPrefix}::${i}`
          return (
            <li key={i} className="list-none">
              <ul className="space-y-0.5">
                <TalkingPointItem point={point} pointId={pointId} />
              </ul>
              {point.linkCard && (
                <div className="mt-2 mb-2 ml-5">
                  <LinkCard linkCard={point.linkCard} />
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ExampleItem({ example, pointId }) {
  const [showDetail, setShowDetail] = useState(false)
  const { isCovered, lastOpened } = useProgress()
  const covered = isCovered(pointId)
  const isLastOpened = lastOpened === pointId
  const isObject = typeof example === 'object' && example !== null
  const text = isObject ? example.text : example
  const detail = isObject ? example.detail : null
  const dimClass = covered ? 'opacity-50' : ''
  const lastOpenedClass = isLastOpened
    ? 'border-l-[3px] border-violet-500 bg-violet-50/40 pl-2 -ml-2 rounded-r-md'
    : ''

  return (
    <li className={`flex items-start gap-2 ${lastOpenedClass}`}>
      <CoveredBullet pointId={pointId} color="text-amber-300" />
      <span className={`text-gray-600 leading-relaxed ${dimClass}`}>
        {detail ? (
          <button
            onClick={() => setShowDetail(true)}
            className="text-left cursor-pointer underline decoration-amber-300 decoration-dotted underline-offset-2 hover:decoration-amber-500 hover:text-gray-700 transition-colors"
          >
            {renderBoldText(text)}
          </button>
        ) : (
          renderBoldText(text)
        )}
      </span>
      {detail && showDetail && (
        <DetailPopup
          title={text}
          detail={detail}
          onClose={() => setShowDetail(false)}
          pointId={pointId}
        />
      )}
    </li>
  )
}

function Examples({ content, pathPrefix }) {
  return (
    <div className="bg-amber-50/60 rounded-lg p-4 border border-amber-100">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-amber-500">💡</span>
        <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Примери</span>
      </div>
      <ul className="space-y-2">
        {content.map((example, i) => (
          <ExampleItem
            key={i}
            example={example}
            pointId={`${pathPrefix}::ex${i}`}
          />
        ))}
      </ul>
    </div>
  )
}

function TimeMarker({ content }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-purple-50 text-purple-700 border border-purple-200">
      <span>⏱</span>
      <span>{content}</span>
    </div>
  )
}

export default function ContentBlock({ type, content, pathPrefix }) {
  if (type === 'time-marker') return <TimeMarker content={content} />
  if (type === 'talking-points') return <TalkingPoints content={content} pathPrefix={pathPrefix} />
  if (type === 'examples') return <Examples content={content} pathPrefix={pathPrefix} />
  return null
}
