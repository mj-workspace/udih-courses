function handleLogout() {
  localStorage.removeItem('staticrypt_passphrase')
  localStorage.removeItem('staticrypt_expiration')
  window.location.reload()
}

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-green-800 via-green-900 to-green-800 text-white shadow-lg">
      <div className="mx-auto max-w-5xl px-6 py-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill="rgba(255,255,255,0.9)"/>
              <path d="M10 12l2 2 4-4" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              UDIH <span className="font-normal opacity-80">Курсове</span>
            </h1>
            <p className="text-xs text-green-200/70 hidden sm:block">
              University Digital Innovation Hub
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="shrink-0 cursor-pointer rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white/25 hover:text-white hover:border-white/40 hover:shadow-lg hover:shadow-black/10 hover:scale-105 active:scale-95"
        >
          Изход
        </button>
      </div>
    </header>
  )
}
