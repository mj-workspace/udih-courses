#!/usr/bin/env node
// slide-context.mjs <section>
//
// Prints everything positional the digital-slide skill needs for one slide:
// the slides.js entry, whether a Scene component already exists, the day,
// the slide index within that day, and the dev-server screenshot URL.
//
// Usage:  node slide-context.mjs 4.3

import { existsSync, readdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const section = process.argv[2]
if (!section || !/^\d+\.\d+$/.test(section)) {
  console.error('Usage: node slide-context.mjs <section>   e.g. 4.3')
  process.exit(1)
}

// Walk up from this script until we find the repo (contains udih-2024-27).
let dir = dirname(fileURLToPath(import.meta.url))
let repo = null
for (let i = 0; i < 8; i++) {
  if (existsSync(join(dir, 'udih-2024-27'))) { repo = dir; break }
  dir = dirname(dir)
}
if (!repo) {
  console.error('Could not locate repo root (no udih-2024-27 dir found above script).')
  process.exit(1)
}

const presentation = join(repo, 'udih-2024-27/digital-fundamentals/presentation')
const slidesPath = join(presentation, 'src/data/slides.js')
const scenesDir = join(presentation, 'src/components/scenes')

const { slides } = await import(pathToFileURL(slidesPath).href)

const masterIndex = slides.findIndex(
  (s) => s.type === 'content' && s.sectionNumber === section,
)
if (masterIndex === -1) {
  console.error(`No content slide with sectionNumber "${section}" in slides.js.`)
  process.exit(1)
}
const entry = slides[masterIndex]

// Mirror App.jsx buildDaySlides(): cover is shared; Day 1 is everything up to
// day1-close; Day 2 is everything from day2-open onward.
const day1Close = slides.findIndex((s) => s.type === 'day1-close')
const day2Open = slides.findIndex((s) => s.type === 'day2-open')
const day = masterIndex <= day1Close ? 1 : 2

function buildDay(d) {
  return slides.filter((s, i) => {
    if (s.type === 'cover') return true
    return d === 1 ? i <= day1Close : i >= day2Open
  })
}
const deck = buildDay(day)
const slideIndex = deck.indexOf(entry)

// Scene file: dots → underscores (6.10 → Scene_6_10.jsx).
const sceneFile = `Scene_${section.replace('.', '_')}.jsx`
const scenePath = join(scenesDir, sceneFile)
const sceneExists = existsSync(scenePath)

const qs = []
if (day !== 1) qs.push(`day=${day}`)
if (slideIndex !== 0) qs.push(`slide=${slideIndex}`)
const url =
  `http://localhost:5177/digital-fundamentals/presentation/` +
  (qs.length ? `?${qs.join('&')}` : '')

console.log('section        :', section)
console.log('mode           :', sceneExists ? 'IMPROVE (scene exists)' : 'CREATE (new scene)')
console.log('moduleTitle    :', entry.moduleTitle)
console.log('title          :', entry.title)
console.log('points         :', entry.points.length ? `${entry.points.length} existing` : 'empty')
console.log('day            :', day)
console.log('slideIndex     :', slideIndex, `(within Day ${day})`)
console.log('scene file     :', `src/components/scenes/${sceneFile}`, sceneExists ? '(exists)' : '(to create)')
console.log('preview URL    :', url)
console.log('guide file     :', `lecturer-guide/src/data/module${section[0]}.js  (section id "${section}")`)
console.log('existing scenes:', readdirSync(scenesDir).filter((f) => f.startsWith('Scene_')).join(', ') || '(none)')
