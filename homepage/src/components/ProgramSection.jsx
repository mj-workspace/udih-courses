import CourseCard from './CourseCard'

export default function ProgramSection({ program }) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-slate-800">
        {program.label}
      </h2>

      {program.courses.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center text-sm italic text-slate-400">
          Предстои
        </p>
      ) : (
        <div className="space-y-3">
          {program.courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  )
}
