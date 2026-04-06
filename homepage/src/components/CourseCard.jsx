import { useState } from 'react'
import ResourceLink from './ResourceLink'

export default function CourseCard({ course }) {
  const [expanded, setExpanded] = useState(false)
  const isUpcoming = course.status === 'upcoming'

  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        isUpcoming
          ? 'border-dashed border-green-200 bg-green-50/30'
          : expanded
            ? 'border-green-300 bg-white shadow-md shadow-green-100/50 ring-1 ring-green-100'
            : 'border-green-100 bg-white shadow-sm hover:shadow-md hover:shadow-green-100/50 hover:border-green-200'
      }`}
    >
      <button
        onClick={() => !isUpcoming && setExpanded(!expanded)}
        disabled={isUpcoming}
        className="w-full px-6 py-5 text-left"
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
            {isUpcoming && (
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

        {!isUpcoming && course.duration && (
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
              {course.duration}
            </span>
            {course.format && (
              <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                {course.format}
              </span>
            )}
            {course.level && (
              <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                {course.level}
              </span>
            )}
          </div>
        )}
      </button>

      {expanded && (
        <div className="border-t border-green-100 px-6 py-5">
          {course.audience && (
            <p className="mb-4 text-sm text-green-800/70">
              <span className="font-semibold text-green-900">Аудитория:</span>{' '}
              {course.audience}
            </p>
          )}

          {course.modules?.length > 0 && (
            <div className="mb-5">
              <h4 className="mb-3 text-sm font-semibold text-green-900">
                Модули
              </h4>
              <ol className="space-y-1.5">
                {course.modules.map((m) => (
                  <li
                    key={m.id}
                    className="flex items-center justify-between rounded-lg bg-green-50/60 px-3 py-2 text-sm"
                  >
                    <span className="text-green-900">
                      <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-200/70 text-xs font-semibold text-green-800">
                        {m.id}
                      </span>
                      {m.title}
                    </span>
                    <span className="shrink-0 text-xs text-green-500">
                      {m.duration}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {course.resources?.length > 0 && (
            <div>
              <h4 className="mb-3 text-sm font-semibold text-green-900">
                Ресурси
              </h4>
              <div className="flex flex-wrap gap-2">
                {course.resources.map((r) => (
                  <ResourceLink key={r.url} {...r} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
