import CourseCard from './CourseCard'

export default function ProgramSection({ program }) {
  return (
    <section>
      <div className="mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-green-200 to-transparent" />
        <h2 className="shrink-0 text-sm font-semibold uppercase tracking-widest text-green-700">
          {program.label}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-l from-green-200 to-transparent" />
      </div>

      {program.courses.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-green-200 bg-green-50/50 px-6 py-10 text-center">
          <p className="text-sm italic text-green-400">Предстои</p>
        </div>
      ) : (
        <div className="space-y-4">
          {program.courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  )
}
