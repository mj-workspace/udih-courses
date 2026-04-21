import { useState } from 'react'
import DetailPopup from './DetailPopup'
import LinkCard from './LinkCard'

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

function TalkingPointItem({ point, depth = 0 }) {
  const [open, setOpen] = useState(true)
  const [showDetail, setShowDetail] = useState(false)
  const hasChildren = point.children && point.children.length > 0
  const hasDetail = !!point.detail
  const hasExamples = point.examples && point.examples.length > 0

  if (!hasChildren) {
    return (
      <li className={`py-1 ${point.highlight ? 'my-1 -ml-3 w-fit rounded-lg border border-violet-200 bg-violet-50/50 pl-3 pr-4 py-2' : ''}`}>
        <div className="flex items-start gap-2">
          <span className="text-blue-400 mt-1.5 text-[8px] shrink-0">●</span>
          <span className="text-gray-700 leading-relaxed">
            {hasDetail ? (
              <>
                <button
                  onClick={() => setShowDetail(true)}
                  className="text-left cursor-pointer underline decoration-blue-300 decoration-dotted underline-offset-2 hover:decoration-blue-500 hover:text-gray-900 transition-colors"
                >
                  {renderBoldText(point.text)}
                </button>
                {showDetail && (
                  <DetailPopup
                    title={point.text}
                    detail={point.detail}
                    onClose={() => setShowDetail(false)}
                  />
                )}
              </>
            ) : (
              renderBoldText(point.text)
            )}
          </span>
        </div>
        {hasExamples && <InlineExamples examples={point.examples} />}
      </li>
    )
  }

  return (
    <li className={`py-0.5 ${point.highlight ? 'my-1 -ml-3 w-fit rounded-lg border border-violet-200 bg-violet-50/50 pl-3 pr-4 py-1' : ''}`}>
      <div className="flex items-start gap-2">
        {hasDetail ? (
          <button
            onClick={() => setShowDetail(true)}
            className="flex items-start gap-2 flex-1 text-left group py-1 cursor-pointer"
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
            className="flex items-start gap-2 flex-1 text-left group py-1 cursor-pointer"
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
        />
      )}

      {hasDetail ? (
        <ul className="ml-5 pl-3 border-l-2 border-blue-100 space-y-0.5 pb-1">
          {point.children.map((child, i) => (
            <TalkingPointItem key={i} point={child} depth={depth + 1} />
          ))}
        </ul>
      ) : (
        <div className={`overflow-hidden transition-all duration-200 ease-in-out ${
          open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <ul className="ml-5 pl-3 border-l-2 border-blue-100 space-y-0.5 pb-1">
            {point.children.map((child, i) => (
              <TalkingPointItem key={i} point={child} depth={depth + 1} />
            ))}
          </ul>
        </div>
      )}

      {hasExamples && <InlineExamples examples={point.examples} />}
    </li>
  )
}

function InlineExamples({ examples }) {
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
          <ExampleItem key={i} example={example} />
        ))}
      </ul>
    </div>
  )
}

function TalkingPoints({ content }) {
  return (
    <div>
      <ul className="space-y-0.5">
        {content.map((point, i) => (
          <li key={i} className="list-none">
            <ul className="space-y-0.5">
              <TalkingPointItem point={point} />
            </ul>
            {point.linkCard && (
              <div className="mt-2 mb-2 ml-5">
                <LinkCard linkCard={point.linkCard} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ExampleItem({ example }) {
  const [showDetail, setShowDetail] = useState(false)
  const isObject = typeof example === 'object' && example !== null
  const text = isObject ? example.text : example
  const detail = isObject ? example.detail : null

  return (
    <li className="flex items-start gap-2">
      <span className="text-amber-300 mt-1.5 text-[8px] shrink-0">●</span>
      <span className="text-gray-600 leading-relaxed">
        {detail ? (
          <>
            <button
              onClick={() => setShowDetail(true)}
              className="text-left cursor-pointer underline decoration-amber-300 decoration-dotted underline-offset-2 hover:decoration-amber-500 hover:text-gray-700 transition-colors"
            >
              {renderBoldText(text)}
            </button>
            {showDetail && (
              <DetailPopup
                title={text}
                detail={detail}
                onClose={() => setShowDetail(false)}
              />
            )}
          </>
        ) : (
          renderBoldText(text)
        )}
      </span>
    </li>
  )
}

function Examples({ content }) {
  return (
    <div className="bg-amber-50/60 rounded-lg p-4 border border-amber-100">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-amber-500">💡</span>
        <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Примери</span>
      </div>
      <ul className="space-y-2">
        {content.map((example, i) => (
          <ExampleItem key={i} example={example} />
        ))}
      </ul>
    </div>
  )
}

function Transition({ content }) {
  return (
    <div className="flex items-start gap-3 py-3 px-4 bg-green-50/60 rounded-lg border border-green-100">
      <span className="text-green-500 text-lg mt-0.5">→</span>
      <div>
        <span className="text-[11px] font-semibold text-green-600 uppercase tracking-wider">ПРЕХОД</span>
        <p className="text-gray-600 mt-1 italic leading-relaxed">{content}</p>
      </div>
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

export default function ContentBlock({ type, content }) {
  if (type === 'time-marker') return <TimeMarker content={content} />
  if (type === 'talking-points') return <TalkingPoints content={content} />
  if (type === 'examples') return <Examples content={content} />
  if (type === 'transition') return <Transition content={content} />
  return null
}
