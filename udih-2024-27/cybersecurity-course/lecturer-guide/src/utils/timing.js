export function parseDurationMinutes(durationStr) {
  if (!durationStr) return 0
  const match = String(durationStr).match(/(\d+)/)
  return match ? parseInt(match[1], 10) : 0
}

export function countPopupsInList(items) {
  if (!items || !Array.isArray(items)) return 0
  let count = 0
  for (const item of items) {
    if (item && typeof item === 'object') {
      if (item.detail) count += 1
      if (item.children) count += countPopupsInList(item.children)
      if (item.examples) count += countPopupsInList(item.examples)
    }
  }
  return count
}

export function countPopupsInSection(section) {
  if (!section) return 0
  return (
    countPopupsInList(section.talkingPoints) +
    countPopupsInList(section.examples)
  )
}

function getSectionPopupCounts(module) {
  const counts = {}
  let total = 0
  for (const section of module?.sections || []) {
    const c = countPopupsInSection(section)
    counts[section.id] = c
    total += c
  }
  return { counts, total }
}

export function getModuleTargetSeconds(module) {
  return parseDurationMinutes(module?.duration) * 60
}

export function getSectionTargetSeconds(module, sectionId) {
  const moduleSec = getModuleTargetSeconds(module)
  if (!moduleSec) return 0
  const { counts, total } = getSectionPopupCounts(module)
  const sectionCount = counts[sectionId] || 0
  if (total === 0) {
    const n = module?.sections?.length || 1
    return Math.round(moduleSec / n)
  }
  return Math.round((sectionCount / total) * moduleSec)
}

export function getPopupTargetSeconds(detail) {
  if (!detail) return 60
  return Math.max(45, Math.ceil(String(detail).length / 8))
}

export function formatTime(seconds) {
  const total = Math.max(0, Math.floor(seconds))
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function parseTime(input) {
  if (input == null) return null
  const trimmed = String(input).trim()
  if (!trimmed) return null
  if (trimmed.includes(':')) {
    const parts = trimmed.split(':').map((p) => Number(p))
    if (parts.length !== 2) return null
    const [m, s] = parts
    if (!Number.isFinite(m) || !Number.isFinite(s)) return null
    if (s < 0 || s >= 60) return null
    return Math.max(0, Math.floor(m * 60 + s))
  }
  const n = Number(trimmed)
  if (!Number.isFinite(n)) return null
  return Math.max(0, Math.floor(n))
}
