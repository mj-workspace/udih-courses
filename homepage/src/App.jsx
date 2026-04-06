import Header from './components/Header'
import ProgramSection from './components/ProgramSection'
import { programs } from './data/courses'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <Header />

      <main className="mx-auto max-w-5xl space-y-10 px-6 py-10">
        {programs.map((program) => (
          <ProgramSection key={program.id} program={program} />
        ))}
      </main>

      <footer className="border-t border-green-100 py-6 text-center text-xs text-green-400">
        Академия по национална и информационна сигурност &copy; {new Date().getFullYear()}
      </footer>
    </div>
  )
}
