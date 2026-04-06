function handleLogout() {
  localStorage.removeItem('staticrypt_passphrase')
  localStorage.removeItem('staticrypt_expiration')
  window.location.reload()
}

export default function Header() {
  return (
    <header className="bg-slate-800 text-white">
      <div className="mx-auto max-w-4xl px-6 py-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            UDIH Курсове
          </h1>
          <p className="mt-2 text-slate-300">
            University Digital Innovation Hub — Академия по национална и
            информационна сигурност
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="shrink-0 rounded-md border border-slate-600 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        >
          Изход
        </button>
      </div>
    </header>
  )
}
