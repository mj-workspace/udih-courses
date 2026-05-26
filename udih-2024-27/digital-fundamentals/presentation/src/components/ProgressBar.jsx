export default function ProgressBar({ current, total }) {
  const percent = ((current + 1) / total) * 100

  return (
    <div className="h-1 w-full bg-slate-200">
      <div
        className="h-full bg-blue-500 transition-all duration-300 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
