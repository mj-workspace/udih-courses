import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'lecturer-guide:timers:v1'

function readStorage() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return {
      moduleTimers: parsed.moduleTimers && typeof parsed.moduleTimers === 'object' ? parsed.moduleTimers : {},
      sectionTimers: parsed.sectionTimers && typeof parsed.sectionTimers === 'object' ? parsed.sectionTimers : {},
      popupTimers: parsed.popupTimers && typeof parsed.popupTimers === 'object' ? parsed.popupTimers : {},
      pausedSections: parsed.pausedSections && typeof parsed.pausedSections === 'object' ? parsed.pausedSections : {},
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

const TimerContext = createContext(null)

export function TimerProvider({ activeModuleId, activeSectionId, children }) {
  const initial = readStorage()
  const [moduleTimers, setModuleTimers] = useState(() => initial?.moduleTimers || {})
  const [sectionTimers, setSectionTimers] = useState(() => initial?.sectionTimers || {})
  const [popupTimers, setPopupTimers] = useState(() => initial?.popupTimers || {})
  const [pausedSections, setPausedSections] = useState(() => initial?.pausedSections || {})
  const [isRunning, setIsRunning] = useState(false)

  const moduleIdRef = useRef(activeModuleId)
  const sectionIdRef = useRef(activeSectionId)
  const pausedRef = useRef(pausedSections)
  useEffect(() => { moduleIdRef.current = activeModuleId }, [activeModuleId])
  useEffect(() => { sectionIdRef.current = activeSectionId }, [activeSectionId])
  useEffect(() => { pausedRef.current = pausedSections }, [pausedSections])

  useEffect(() => {
    if (!isRunning) return
    const id = setInterval(() => {
      const mid = moduleIdRef.current
      const sid = sectionIdRef.current
      const sectionPaused = !!(sid && pausedRef.current[sid])
      setModuleTimers((prev) => {
        if (!mid) return prev
        return { ...prev, [mid]: (prev[mid] || 0) + 1 }
      })
      if (!sectionPaused) {
        setSectionTimers((prev) => {
          if (!sid) return prev
          return { ...prev, [sid]: (prev[sid] || 0) + 1 }
        })
      }
    }, 1000)
    return () => clearInterval(id)
  }, [isRunning])

  useEffect(() => {
    writeStorage({ moduleTimers, sectionTimers, popupTimers, pausedSections })
  }, [moduleTimers, sectionTimers, popupTimers, pausedSections])

  const start = useCallback(() => setIsRunning(true), [])
  const pause = useCallback(() => setIsRunning(false), [])
  const toggle = useCallback(() => setIsRunning((r) => !r), [])

  const resetModule = useCallback((moduleId, sectionIds = []) => {
    setModuleTimers((prev) => {
      if (!moduleId) return prev
      const next = { ...prev }
      delete next[moduleId]
      return next
    })
    if (sectionIds.length > 0) {
      setSectionTimers((prev) => {
        const next = { ...prev }
        for (const sid of sectionIds) delete next[sid]
        return next
      })
    }
  }, [])

  const resetSection = useCallback((sectionId) => {
    if (!sectionId) return
    setSectionTimers((prev) => {
      const next = { ...prev }
      delete next[sectionId]
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    setModuleTimers({})
    setSectionTimers({})
    setPopupTimers({})
    setPausedSections({})
    setIsRunning(false)
  }, [])

  const setModuleElapsed = useCallback((moduleId, seconds) => {
    if (!moduleId) return
    const value = Math.max(0, Math.floor(seconds))
    setModuleTimers((prev) => ({ ...prev, [moduleId]: value }))
  }, [])

  const setSectionElapsed = useCallback((sectionId, seconds) => {
    if (!sectionId) return
    const value = Math.max(0, Math.floor(seconds))
    setSectionTimers((prev) => ({ ...prev, [sectionId]: value }))
  }, [])

  const setPopupElapsed = useCallback((pointId, seconds) => {
    if (!pointId) return
    const value = Math.max(0, Math.floor(seconds))
    setPopupTimers((prev) => ({ ...prev, [pointId]: value }))
  }, [])

  const resetPopup = useCallback((pointId) => {
    if (!pointId) return
    setPopupTimers((prev) => {
      if (!(pointId in prev)) return prev
      const next = { ...prev }
      delete next[pointId]
      return next
    })
  }, [])

  const togglePauseSection = useCallback((sectionId) => {
    if (!sectionId) return
    setPausedSections((prev) => {
      const next = { ...prev }
      if (next[sectionId]) delete next[sectionId]
      else next[sectionId] = true
      return next
    })
  }, [])

  const isSectionPaused = useCallback(
    (sectionId) => !!(sectionId && pausedSections[sectionId]),
    [pausedSections],
  )

  const value = {
    moduleElapsed: moduleTimers[activeModuleId] || 0,
    sectionElapsed: sectionTimers[activeSectionId] || 0,
    popupTimers,
    pausedSections,
    activeModuleId,
    activeSectionId,
    isRunning,
    start,
    pause,
    toggle,
    resetModule,
    resetSection,
    resetAll,
    setModuleElapsed,
    setSectionElapsed,
    setPopupElapsed,
    resetPopup,
    togglePauseSection,
    isSectionPaused,
  }

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
}

export function useTimer() {
  const ctx = useContext(TimerContext)
  if (!ctx) throw new Error('useTimer must be used inside TimerProvider')
  return ctx
}
