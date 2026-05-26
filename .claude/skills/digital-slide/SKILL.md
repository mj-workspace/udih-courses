---
name: digital-slide
description: >-
  Build or improve ONE slide in the Digital Fundamentals course presentation
  (udih-2024-27/digital-fundamentals/presentation) so it matches the
  corresponding lecturer-guide section. Each content slide shows students a few
  short talking points plus one large animated SVG graphic. Use this skill
  whenever the user points at a digital-fundamentals presentation slide or names
  a section number (e.g. "1.1", "слайд 4.3", "направи слайд 6.10", "подобри
  слайда за 7.2") and wants it created, filled in, or improved — even if they
  don't say the word "slide". Also use when the user asks to build the
  digital-fundamentals presentation slide by slide. Do NOT use for the
  cybersecurity course, for the lecturer-guide content itself (that is
  /improve-digital), or for non-content slides (cover, qa, break).
---

# digital-slide

Build (or improve) a single slide of the **Digital Fundamentals** presentation
so it faithfully presents the matching lecturer-guide section.

**Why this split exists:** during teaching the presentation is shown to the
course participants on a screen, while the lecturer-guide is private to the
lecturer. So a slide is the *student-facing* face of a guide section — it must
carry the section's core idea, not its full text. The lecturer narrates from
the guide; the slide just anchors what the room is looking at.

**A finished content slide has two parts:**
1. **Talking points** — 4–5 short bullet lines (the `points` array in
   `slides.js`). Just enough for a participant to follow.
2. **One large animated SVG graphic** — a `Scene_M_N.jsx` component that fills
   the slide canvas and visualises the section's core concept.

The course is **digital literacy for non-technical ВиК employees**. The visual
style is a 1:1 match of the cybersecurity presentation (dark, neon, animated) —
but the *content and metaphors* must stay friendly and concrete for beginners.

## Invocation

The user names a section number, e.g. `/digital-slide 1.1` or "подобри слайд
4.3". They may add instructions or feedback after it ("повече фокус върху
USB", "графиката е претрупана"). Section numbers run `1.1`–`7.13` (no `7.7`).

If no section is given, ask which one — never guess.

## Paths (relative to repo root)

| What | Path |
|------|------|
| Slide data | `udih-2024-27/digital-fundamentals/presentation/src/data/slides.js` |
| Scene components | `udih-2024-27/digital-fundamentals/presentation/src/components/scenes/` |
| Scene registry | `.../scenes/index.js` |
| Scene-specific CSS | `.../presentation/src/index.css` |
| Lecturer-guide content | `udih-2024-27/digital-fundamentals/lecturer-guide/src/data/module<M>.js` |

`<M>` is the section's first digit (`4.3` → `module4.js`, `7.2` → `module7.js`).

## Workflow

### Step 1 — Locate and read the source

Run the context helper — it computes everything positional so you don't have to:

```bash
node <skill-dir>/scripts/slide-context.mjs <section>
```

It prints: the `slides.js` entry, whether a Scene already exists (→ improve
mode), the day, the slide index within that day, and the **preview URL**.

Then read the **truth source** — the matching section in the lecturer-guide
`module<M>.js` (find the object whose `id` equals the section number). Read its
`talkingPoints` (each has `text`, `detail`, sometimes `examples` / `children`).
This is what the slide must convey. The slide `title` and `moduleTitle` in
`slides.js` are already correct — do not change them.

### Step 2 — Write the talking points

Replace the slide's `points: []` with 4–5 objects: `{ text: '...' }`.

- **Condense, don't copy.** Guide `talkingPoints[].text` are full spoken
  sentences. Each slide point is the *core claim* of one guide point, cut to
  ~5–11 words — it must fit a narrow 320px column at 15px text.
- **One idea per line.** If the guide has more than 5 talking points, merge
  related ones; if fewer, 3 is an acceptable floor.
- **Bold the key term** with `**...**` — the thing being named or defined
  (`**Хардуер** — частите, които пипаш`). The renderer turns `**x**` into a
  highlighted word. Bold at most one term per line.
- **Plain Bulgarian**, beginner-friendly. Keep English terms only where the
  guide itself does (RAM, CPU, Wi-Fi, Windows, USB, email…).
- Follow the guide's order. These are what *participants read*, so they must be
  concrete and self-explanatory — no lecturer cues, no jargon the slide doesn't
  also explain.

**Example — section 1.1 (хардуер срещу софтуер):**
```js
points: [
  { text: 'Компютърът изпълнява инструкции чрез **програми**' },
  { text: '**Хардуер** — частите, които можеш да пипнеш' },
  { text: '**Софтуер** — програмите и инструкциите вътре' },
  { text: 'Едното без другото не върши работа' },
],
```

### Step 3 — Design the Scene concept

Before writing any code, decide *what the graphic shows*. A good Scene has **one
central metaphor object** plus orbiting/supporting elements and ambient detail —
not a busy diagram.

The strongest move: **visualise the metaphor the lecturer-guide already uses.**
The guide explains RAM as a desk, the disk as a cabinet, the OS as a building
manager, a computer as an eager assistant. Reuse those — the lecturer is
narrating that exact image, so the slide reinforces it. The graphic should make
sense at a glance to someone who has never seen the topic before.

Then read `references/scene-craft.md` fully — it has the canvas spec, design
tokens, the animation toolbox, reusable patterns, and the pitfalls list.

### Step 4 — Build the Scene component

Copy `assets/Scene_TEMPLATE.jsx` to the scenes folder as `Scene_<M>_<N>.jsx`
(dots become underscores: `6.10` → `Scene_6_10.jsx`, default export
`Scene_6_10`). Implement the concept following `references/scene-craft.md`.

Most scenes should be **pure declarative SVG** (`<animate>`, `<animateTransform>`,
`<animateMotion>`) — reliable and dependency-free. Use React state only when the
concept genuinely needs it (a live counter, a timer). If you need DOM elements
that drift across the canvas, add a CSS keyframe to `index.css` with a
**section-prefixed name** (e.g. `s11-term-drift`) so it can't collide.

### Step 5 — Register the Scene

Add the import and the map entry to `scenes/index.js`, keeping numeric order.
`Slide.jsx` automatically routes the section to `ModuleSlide` + your Scene once
it appears in the registry.

### Step 6 — Verify

1. **Build must pass.** From the presentation directory:
   `pnpm run build` — fix every error before continuing. This catches all
   JSX/syntax mistakes. (This environment blocks `npm` — always use `pnpm`.)
2. **Self-review the code before handing off.** Re-read your Scene against the
   pitfalls list in `references/scene-craft.md`: unique section-prefixed `id`s,
   every `<text>` has a `fill`, content stays inside `x: 70–830 / y: 60–520`,
   animations loop seamlessly, nothing duplicates the bullet text.
3. **Hand off for visual review.** The dev server runs on port 5177
   (`pnpm run dev` if it isn't up). Give the user the preview URL from Step 1
   so they can open the slide in a browser and judge the graphic. Visual
   approval is the user's call — wait for their feedback.

### Step 7 — Report

State the section, the concept you chose for the graphic, the talking points,
the build result, and the preview URL for the user to review.

## Improve mode

If `slide-context.mjs` reports a Scene already exists, or the user gave
feedback, this is a refinement, not a rebuild. Re-read the guide section and the
current slide, apply targeted changes addressing the feedback, keep what works,
and re-run Step 6. Don't regenerate from scratch unless the user asks.
