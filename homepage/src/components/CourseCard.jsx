import { useState } from 'react'
import ResourceLink from './ResourceLink'

export default function CourseCard({ course }) {
  const [expanded, setExpanded] = useState(false)
  const isUpcoming = course.status === 'upcoming'

  return (
    <div
      className={`rounded-lg border transition-shadow ${
        isUpcoming
          ? 'border-dashed border-slate-300 bg-slate-50'
          : 'border-slate-200 bg-white shadow-sm hover:shadow-md'
      }`}
    >
      <button
        onClick={() => !isUpcoming && setExpanded(!expanded)}
        disabled={isUpcoming}
        className="w-full px-5 py-4 text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {course.title}
            </h3>
            {course.description && (
              <p className="mt-1 text-sm text-slate-600">
                {course.description}
              </p>
            )}
            {isUpcoming && (
              <p className="mt-1 text-sm italic text-slate-400">Предстои</p>
            )}
          </div>
          {!isUpcoming && (
            <span className="mt-1 shrink-0 text-slate-400">
              {expanded ? '\u25B2' : '\u25BC'}
            </span>
          )}
        </div>

        {!isUpcoming && course.duration && (
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
            <span>{course.duration}</span>
            {course.format && (
              <>
                <span className="text-slate-300">|</span>
                <span>{course.format}</span>
              </>
            )}
            {course.level && (
              <>
                <span className="text-slate-300">|</span>
                <span>{course.level}</span>
              </>
            )}
          </div>
        )}
      </button>

      {expanded && (
        <div className="border-t border-slate-100 px-5 py-4">
          {course.audience && (
            <p className="mb-3 text-sm text-slate-600">
              <span className="font-medium">Аудитория:</span>{' '}
              {course.audience}
            </p>
          )}

          {course.modules?.length > 0 && (
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-medium text-slate-700">
                Модули
              </h4>
              <ol className="space-y-1 text-sm text-slate-600">
                {course.modules.map((m) => (
                  <li key={m.id} className="flex justify-between">
                    <span>
                      {m.id}. {m.title}
                    </span>
                    <span className="shrink-0 text-slate-400">
                      {m.duration}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {course.resources?.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-medium text-slate-700">
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
