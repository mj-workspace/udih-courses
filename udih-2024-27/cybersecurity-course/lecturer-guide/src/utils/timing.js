/**
 * Time budget model
 * =================
 *
 * Source of truth: `module.duration` (e.g. '50 мин') in data/moduleN.js.
 * Това е законът — времето на модула е фиксирано, никога не надхвърляме.
 *
 * Цел: при отваряне на popup лекторът вижда колко секунди реално има за
 * прочитане на `detail` текста. Ако спази popup-таймера във всеки popup,
 * гарантирано не просрочва модула.
 *
 * Алгоритъм (runtime, един път на module instance — кеширан в WeakMap):
 *
 *   1. Събери всички popup-и в модула (item.detail в talkingPoints/examples,
 *      рекурсивно през children). Запази всеки с неговия sectionId.
 *   2. weight(popup) = max(MIN_CHARS, detail.length).
 *      MIN_CHARS = 360 ≈ 45s @ 8 знака/сек (floor — иначе много кратки
 *      popup-и биха получили под 5s).
 *   3. Раздели бюджета пропорционално:
 *        popupTarget(p) = round( weight(p) / totalWeight × moduleSec )
 *   4. Закръглянето компенсирай: остатъкът (moduleSec − Σ) отива в popup-а
 *      с най-голямо weight, за да Σ popups == moduleSec точно.
 *   5. sectionTarget(s) = Σ popupTarget за popup-и в секцията.
 *
 * Инварианти (по конструкция):
 *   - Σ popups в секция == sectionTarget
 *   - Σ секции в модул == moduleTarget == data.duration
 *
 * Следствие: редакция на ЕДИН popup променя target-ите на ВСИЧКИ popup-и
 * в същия модул (общ бюджет, преразпределя се). Между модули няма
 * преливане — всеки модул е затворен бюджет.
 *
 * Workflow за лектора:
 *   - popup target твърде малък за съдържанието -> компресирай detail
 *   - popup target много по-голям от нужното -> допиши съдържание
 *
 * Цена: пресмятане е O(N) на броя popup-и в модула, кеширано в WeakMap по
 * module reference. Първо отваряне на модул = пресмятане; всичко след
 * това = Map lookup. Page reload изчиства кеша.
 *
 * Edge cases:
 *   - Pause модули (`break-`, `qa-`): moduleSec = 0 -> празна budget Map,
 *     popup target пада на legacy формула (max(45, len/8)).
 *   - Секция без popup-и: sectionTarget = 0. Добави поне 1 popup.
 *   - Модул без popup-и: fallback = moduleSec / sections.length.
 */

const MIN_CHARS = 360

const _budgetCache = new WeakMap()

export function parseDurationMinutes(durationStr) {
  if (!durationStr) return 0
  const match = String(durationStr).match(/(\d+)/)
  return match ? parseInt(match[1], 10) : 0
}

export function getModuleTargetSeconds(module) {
  return parseDurationMinutes(module?.duration) * 60
}

function collectPopupsInList(items, sectionId, out) {
  if (!items || !Array.isArray(items)) return
  for (const item of items) {
    if (!item || typeof item !== 'object') continue
    if (item.detail) out.push({ sectionId, detail: item.detail })
    if (item.children) collectPopupsInList(item.children, sectionId, out)
    if (item.examples) collectPopupsInList(item.examples, sectionId, out)
  }
}

function collectPopupsFlat(module) {
  const out = []
  for (const section of module?.sections || []) {
    collectPopupsInList(section.talkingPoints, section.id, out)
    collectPopupsInList(section.examples, section.id, out)
  }
  return out
}

export function getModulePopupBudget(module) {
  if (!module || typeof module !== 'object') {
    return { popupTargets: new Map(), sectionTargets: new Map(), moduleSec: 0 }
  }
  const cached = _budgetCache.get(module)
  if (cached) return cached

  const moduleSec = getModuleTargetSeconds(module)
  const popups = collectPopupsFlat(module)
  const popupTargets = new Map()
  const sectionTargets = new Map()

  if (moduleSec === 0 || popups.length === 0) {
    const result = { popupTargets, sectionTargets, moduleSec }
    _budgetCache.set(module, result)
    return result
  }

  const weights = popups.map((p) => Math.max(MIN_CHARS, p.detail.length))
  const totalWeight = weights.reduce((a, b) => a + b, 0)
  const raw = weights.map((w) => Math.round((w / totalWeight) * moduleSec))

  // Закръгляне: разликата отива в най-тежкия popup, за да Σ == moduleSec точно.
  const diff = moduleSec - raw.reduce((a, b) => a + b, 0)
  if (diff !== 0) {
    let argmax = 0
    for (let i = 1; i < weights.length; i++) {
      if (weights[i] > weights[argmax]) argmax = i
    }
    raw[argmax] += diff
  }

  for (let i = 0; i < popups.length; i++) {
    const p = popups[i]
    const sec = raw[i]
    popupTargets.set(p.detail, sec)
    sectionTargets.set(p.sectionId, (sectionTargets.get(p.sectionId) || 0) + sec)
  }

  const result = { popupTargets, sectionTargets, moduleSec }
  _budgetCache.set(module, result)
  return result
}

export function getSectionTargetSeconds(module, sectionId) {
  const { sectionTargets, moduleSec } = getModulePopupBudget(module)
  if (sectionTargets.size === 0) {
    if (moduleSec === 0) return 0
    const n = module?.sections?.length || 1
    return Math.round(moduleSec / n)
  }
  return sectionTargets.get(sectionId) || 0
}

export function getPopupTargetSeconds(detail, module) {
  if (module) {
    const { popupTargets } = getModulePopupBudget(module)
    const sec = popupTargets.get(detail)
    if (sec != null) return sec
  }
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
