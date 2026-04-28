import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'lecturer-guide:progress:v1'

function readStorage() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return {
      covered: parsed.covered && typeof parsed.covered === 'object' ? parsed.covered : {},
      lastOpened: typeof parsed.lastOpened === 'string' ? parsed.lastOpened : null,
    }
  } catch {
    return null
  }
}

function writeStorage(state) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* quota or privacy mode — ignore */
  }
}

function sectionPrefix(moduleId, sectionId) {
  return `${moduleId}::${sectionId}::`
}

function modulePrefix(moduleId) {
  return `${moduleId}::`
}

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const initial = readStorage()
  const [covered, setCoveredMap] = useState(() => initial?.covered || {})
  const [lastOpened, setLastOpenedState] = useState(() => initial?.lastOpened || null)

  useEffect(() => {
    writeStorage({ covered, lastOpened })
  }, [covered, lastOpened])

  const setCovered = useCallback((pointId, value) => {
    if (!pointId) return
    setCoveredMap((prev) => {
      const has = !!prev[pointId]
      if (value && has) return prev
      if (!value && !has) return prev
      const next = { ...prev }
      if (value) next[pointId] = true
      else delete next[pointId]
      return next
    })
  }, [])

  const toggleCovered = useCallback((pointId) => {
    if (!pointId) return
    setCoveredMap((prev) => {
      const next = { ...prev }
      if (next[pointId]) delete next[pointId]
      else next[pointId] = true
      return next
    })
  }, [])

  const setLastOpened = useCallback((pointId) => {
    setLastOpenedState(pointId || null)
  }, [])

  const resetSection = useCallback((moduleId, sectionId) => {
    if (!moduleId || !sectionId) return
    const prefix = sectionPrefix(moduleId, sectionId)
    setCoveredMap((prev) => {
      const next = {}
      let changed = false
      for (const key of Object.keys(prev)) {
        if (key.startsWith(prefix)) {
          changed = true
          continue
        }
        next[key] = prev[key]
      }
      return changed ? next : prev
    })
    setLastOpenedState((prev) => (prev && prev.startsWith(prefix) ? null : prev))
  }, [])

  const resetModule = useCallback((moduleId) => {
    if (!moduleId) return
    const prefix = modulePrefix(moduleId)
    setCoveredMap((prev) => {
      const next = {}
      let changed = false
      for (const key of Object.keys(prev)) {
        if (key.startsWith(prefix)) {
          changed = true
          continue
        }
        next[key] = prev[key]
      }
      return changed ? next : prev
    })
    setLastOpenedState((prev) => (prev && prev.startsWith(prefix) ? null : prev))
  }, [])

  const resetAll = useCallback(() => {
    setCoveredMap({})
    setLastOpenedState(null)
  }, [])

  const isCovered = useCallback((pointId) => !!(pointId && covered[pointId]), [covered])

  const value = {
    covered,
    lastOpened,
    isCovered,
    toggleCovered,
    setCovered,
    setLastOpened,
    resetSection,
    resetModule,
    resetAll,
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider')
  return ctx
}
