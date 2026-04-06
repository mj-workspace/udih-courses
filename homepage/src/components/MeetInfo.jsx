import { useState } from 'react'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="ml-2 shrink-0 rounded px-1.5 py-0.5 text-xs font-medium text-green-600 transition-all hover:bg-green-100"
      title="Копирай"
    >
      {copied ? (
        <span className="text-green-700">Копирано!</span>
      ) : (
        <svg viewBox="0 0 20 20" fill="currentColor" className="inline h-3.5 w-3.5">
          <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
          <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.44A1.5 1.5 0 008.378 6H4.5z" />
        </svg>
      )}
    </button>
  )
}

export default function MeetInfo({ meetLink }) {
  if (!meetLink) return null

  const displayUrl = meetLink.url.replace('https://', '')

  return (
    <div className="rounded-lg border border-green-200 bg-green-50/50 p-4">
      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-green-900">
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-green-600">
          <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
        </svg>
        Google Meet
      </h4>

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-green-700">
            Линк:{' '}
            <a
              href={meetLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-green-800 underline decoration-green-300 underline-offset-2 hover:text-green-900"
            >
              {displayUrl}
            </a>
          </span>
          <CopyButton text={meetLink.url} />
        </div>

        {meetLink.directUrl && (
          <div className="flex items-center justify-between">
            <span className="text-green-700">
              Google Meet:{' '}
              <a
                href={meetLink.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-green-800 underline decoration-green-300 underline-offset-2 hover:text-green-900"
              >
                {meetLink.directUrl.replace('https://', '')}
              </a>
            </span>
            <CopyButton text={meetLink.directUrl} />
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-green-700">
            Dial-in (BG):{' '}
            <span className="font-medium text-green-800">{meetLink.dialIn}</span>
          </span>
          <CopyButton text={meetLink.dialIn} />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-green-700">
            PIN:{' '}
            <span className="font-medium text-green-800">{meetLink.pin}</span>
          </span>
          <CopyButton text={meetLink.pin} />
        </div>
      </div>

      <a
        href={meetLink.directUrl || meetLink.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-green-800"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clipRule="evenodd" />
        </svg>
        Влез в срещата
      </a>
    </div>
  )
}
