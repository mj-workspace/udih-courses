import Header from './components/Header'
import ProgramSection from './components/ProgramSection'
import { programs } from './data/courses'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="mx-auto max-w-4xl space-y-8 px-6 py-8">
        {programs.map((program) => (
          <ProgramSection key={program.id} program={program} />
        ))}
      </main>

      <footer className="py-6 text-center text-xs text-slate-400">
        UDIH &copy; {new Date().getFullYear()}
      </footer>
    </div>
  )
}
