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
    <div className="rounded-lg bg-gray-50 px-4 py-3 space-y-2 text-sm">
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
  )
}
