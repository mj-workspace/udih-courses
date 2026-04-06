export default function NavigationControls({ currentSectionId, navigationOrder, onNavigate }) {
  const currentIndex = navigationOrder.indexOf(currentSectionId)
  const prevId = currentIndex > 0 ? navigationOrder[currentIndex - 1] : null
  const nextId = currentIndex < navigationOrder.length - 1 ? navigationOrder[currentIndex + 1] : null

  return (
    <div className="fixed bottom-6 right-8 flex items-center gap-2 z-10">
      {currentSectionId && (
        <span className="text-xs text-gray-400 mr-2 bg-white/80 backdrop-blur px-2 py-1 rounded">
          {currentIndex + 1} / {navigationOrder.length}
        </span>
      )}

      <button
        onClick={() => prevId && onNavigate(prevId)}
        disabled={!prevId}
        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg transition-all ${
          prevId
            ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 cursor-pointer'
            : 'bg-gray-100 text-gray-300 border border-gray-100 cursor-not-allowed'
        }`}
      >
        <span>←</span>
        <span>Предишна</span>
      </button>

      <button
        onClick={() => nextId && onNavigate(nextId)}
        disabled={!nextId}
        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg transition-all ${
          nextId
            ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
            : 'bg-gray-100 text-gray-300 cursor-not-allowed'
        }`}
      >
        <span>Следваща</span>
        <span>→</span>
      </button>
    </div>
  )
}
