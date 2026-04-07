import { useState } from 'react'
import MeetInfo from './MeetInfo'

function CopyPill({ text }) {
  const [copied, setCopied] = useState(false)

  function handleCopy(e) {
    e.stopPropagation()
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-100"
      title="Копирай линк"
    >
      {copied ? (
        'Копирано!'
      ) : (
        <>
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
            <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
            <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.44A1.5 1.5 0 008.378 6H4.5z" />
          </svg>
          Копирай
        </>
      )}
    </button>
  )
}

function TreeNode({ node, prefix, isLast }) {
  const connector = isLast ? '└── ' : '├── '
  const nextPrefix = prefix + (isLast ? '    ' : '│   ')

  return (
    <>
      <div className="col-span-2 grid grid-cols-subgrid">
        <span className="whitespace-pre">
          <span className="text-green-400">{prefix}{connector}</span>
          <span className="font-medium text-green-900">{node.name}</span>
        </span>
        {node.comment && <span className="text-green-600/50"># {node.comment}</span>}
      </div>
      {node.children?.map((child, i) => (
        <TreeNode
          key={child.name}
          node={child}
          prefix={nextPrefix}
          isLast={i === node.children.length - 1}
        />
      ))}
    </>
  )
}

function TreeView({ nodes }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-6 rounded-md bg-white/60 px-3 py-2 font-mono text-xs leading-relaxed">
      {nodes.map((node) => (
        <>
          <span key={node.name} className="col-span-2 font-medium text-green-900">{node.name}</span>
          {node.children?.map((child, i) => (
            <TreeNode key={child.name} node={child} prefix="" isLast={i === node.children.length - 1} />
          ))}
        </>
      ))}
    </div>
  )
}

export default function CourseCard({ course }) {
  const [expanded, setExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState(null)
  const isUpcoming = course.status === 'upcoming'

  const meetDisplayUrl = course.meetLink?.url?.replace('https://', '')

  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        isUpcoming
          ? 'border-dashed border-green-200 bg-green-50/30'
          : expanded
            ? 'border-green-300 bg-white shadow-md shadow-green-100/50 ring-1 ring-green-100'
            : 'border-green-100 bg-white shadow-sm hover:border-green-300'
      }`}
    >
      <div
        onClick={() => !isUpcoming && setExpanded(!expanded)}
        className={`px-6 py-5 ${isUpcoming ? '' : 'cursor-pointer'}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-green-900">
              {course.title}
            </h3>
            {course.description && (
              <p className="mt-1.5 text-sm leading-relaxed text-green-800/60">
                {course.description}
              </p>
            )}
            {isUpcoming && !course.meetLink && (
              <p className="mt-1.5 text-sm italic text-green-400">Предстои</p>
            )}
          </div>
          {!isUpcoming && (
            <span
              className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all ${
                expanded
                  ? 'bg-green-100 text-green-700 rotate-180'
                  : 'bg-green-50 text-green-400'
              }`}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </span>
          )}
        </div>

        {!isUpcoming && (
          <div className="mt-3 space-y-2">
            {course.meetLink && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-green-900">Формат:</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Онлайн
                  <span className="mx-0.5 text-green-300">·</span>
                  <a
                    href={course.meetLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="underline decoration-green-300 underline-offset-2 hover:text-green-900"
                  >
                    {meetDisplayUrl}
                  </a>
                </span>
                <CopyPill text={course.meetLink.url} />
                <a
                  href={course.meetLink.directUrl || course.meetLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 rounded-full bg-green-700 px-2.5 py-0.5 text-xs font-medium text-white transition-colors hover:bg-green-800"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                    <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clipRule="evenodd" />
                  </svg>
                  Влез
                </a>
              </div>
            )}

            {course.resources?.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-green-900">Ресурси:</span>
                {course.resources.map((r) =>
                  r.type === 'disabled' ? (
                    <span
                      key={r.label}
                      className="inline-flex cursor-not-allowed items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-400"
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                        <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                      </svg>
                      {r.label}
                    </span>
                  ) : (
                    <a
                      key={r.url}
                      href={r.url}
                      target={r.type === 'external' ? '_blank' : '_self'}
                      rel={r.type === 'external' ? 'noopener noreferrer' : undefined}
                      onClick={(e) => e.stopPropagation()}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                        r.type === 'app'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-green-50 text-green-700 hover:bg-green-100'
                      }`}
                    >
                      {r.type === 'app' ? (
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                          <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                          <path d="M3 3.5A1.5 1.5 0 014.5 2h6.879a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0117 7.622V16.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13z" />
                        </svg>
                      )}
                      {r.label}
                    </a>
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {isUpcoming && course.meetLink && (
        <div className="px-6 pb-5">
          <MeetInfo meetLink={course.meetLink} />
        </div>
      )}

      {expanded && (
        <div className="border-t border-green-100 px-6 py-5">
          <div className="space-y-1.5 text-sm text-green-800/70">
            {course.meetLink && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-green-900">Формат:</span>
                <button
                  onClick={() => setActiveTab(activeTab === 'meet' ? null : 'meet')}
                  className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    activeTab === 'meet'
                      ? 'bg-green-700 text-white'
                      : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
                >
                  Google Meet
                </button>
              </div>
            )}
            {activeTab === 'meet' && course.meetLink && (
              <MeetInfo meetLink={course.meetLink} />
            )}
            {course.audience && (
              <p>
                <span className="font-semibold text-green-900">Аудитория:</span>{' '}
                {course.audience}
              </p>
            )}
            {course.qualification && (
              <p>
                <span className="font-semibold text-green-900">Квалификация:</span>{' '}
                {course.qualification}
              </p>
            )}
            {course.totalTeachingMinutes && (
              <p>
                <span className="font-semibold text-green-900">Преподаване:</span>{' '}
                {course.totalTeachingMinutes} мин ({course.totalTeachingMinutes / 60} часа)
              </p>
            )}
            {course.examDuration && (
              <p>
                <span className="font-semibold text-green-900">Финален изпит:</span>{' '}
                {course.examDuration}
              </p>
            )}
            {course.breaks && (
              <p>
                <span className="font-semibold text-green-900">Почивки:</span>{' '}
                {course.breaks.short.count} × {course.breaks.short.minutes} мин + {course.breaks.lunch.count} × {course.breaks.lunch.minutes} мин = {course.breaks.totalMinutes} мин ({course.breaks.totalMinutes / 60} часа)
              </p>
            )}
            {(course.schedule?.length > 0 || course.preparation) && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-green-900">Подготовка и програма:</span>
                {course.preparation && (
                  <button
                    onClick={() => setActiveTab(activeTab === 'prep' ? null : 'prep')}
                    className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      activeTab === 'prep'
                        ? 'bg-green-700 text-white'
                        : 'bg-green-50 text-green-700 hover:bg-green-100'
                    }`}
                  >
                    Подготовка за ново издание
                  </button>
                )}
                {course.schedule?.map((day, idx) => (
                  <button
                    key={day.day}
                    onClick={() => setActiveTab(activeTab === `day-${idx}` ? null : `day-${idx}`)}
                    className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      activeTab === `day-${idx}`
                        ? 'bg-green-700 text-white'
                        : 'bg-green-50 text-green-700 hover:bg-green-100'
                    }`}
                  >
                    {day.day}
                  </button>
                ))}
              </div>
            )}
          </div>

          {activeTab === 'prep' && (
            <div className="mt-3 divide-y-2 divide-gray-200 rounded-lg bg-gray-50 px-4 text-sm text-green-800/70">
              {course.preparation.map((section, idx) => (
                <div key={section.title} className="py-3">
                  <h5 className="mb-1.5 font-semibold text-green-900">{section.title}</h5>
                  {section.items && (
                    <ul className="list-disc space-y-1 pl-5">
                      {section.items.map((item, i) => (
                        <li key={i}>
                          {item.split(/\*\*(.+?)\*\*/).map((part, j) =>
                            j % 2 === 1 ? <strong key={j} className="text-green-900">{part}</strong> : part
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.tree && (
                    <TreeView nodes={section.tree} />
                  )}
                </div>
              ))}
            </div>
          )}

          {course.schedule?.map((day, idx) =>
            activeTab === `day-${idx}` ? (
              <div key={day.day} className="mt-3 space-y-1 text-xs text-green-600/70 mb-2">
                <p><span className="font-semibold text-green-800">Часове:</span> {day.timeRange}</p>
                {day.summary && (
                  <p><span className="font-semibold text-green-800">Преподаване:</span> {day.summary}</p>
                )}
                <ol className="space-y-1">
                  {day.items.map((item, i) => (
                    <li
                      key={i}
                      className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-sm ${
                        item.type === 'break'
                          ? 'bg-amber-50/60 text-amber-700/70 italic'
                          : item.type === 'exam'
                            ? 'bg-red-50/60 text-red-800 font-medium'
                            : item.type === 'module'
                              ? 'bg-green-50/60 text-green-900'
                              : item.type === 'intro'
                                ? 'bg-blue-50/60 text-blue-800/80'
                                : 'bg-green-50/30 text-green-700/70'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="shrink-0 text-xs opacity-60">{item.time}</span>
                        <span>{item.title}</span>
                      </span>
                      <span className="shrink-0 text-xs opacity-60">
                        {item.duration} мин
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="mt-2 flex items-center justify-between rounded-lg bg-green-100/80 px-3 py-2 text-sm font-semibold text-green-900">
                  <span>Общо за {day.day.toLowerCase()}</span>
                  <span>
                    {day.items.reduce((s, item) => s + item.duration, 0)} мин (
                    {(day.items.reduce((s, item) => s + item.duration, 0) / 60).toFixed(1)} часа)
                  </span>
                </div>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  )
}
