# Scene craft

How to build a `Scene_M_N.jsx` — the large animated graphic of a slide. The goal
is a graphic that feels alive, looks at home next to the cybersecurity
presentation, and explains the section's core idea to a beginner at a glance.

- [Canvas and placement](#canvas-and-placement)
- [Design tokens](#design-tokens)
- [Animation toolbox](#animation-toolbox)
- [Composition patterns](#composition-patterns)
- [Concept → visual](#concept--visual)
- [Pitfalls](#pitfalls)

## Canvas and placement

`ModuleSlide` already wraps every Scene: it draws the shared `AnimatedBackground`
(drifting blobs, grid, aurora, particles), the header (section badge, title,
underline) at the top, and a **320px column of bullets on the left**. Your Scene
renders into the remaining area on the right.

So the Scene must:

- Root element: `<div className="absolute inset-0 overflow-hidden">`.
- Hold one `<svg viewBox="0 0 900 560" preserveAspectRatio="xMidYMid meet"
  className="absolute inset-0 w-full h-full">`.
- Be **self-contained and transparent** — no background fill of its own; the
  shared `AnimatedBackground` shows through.
- Keep the meaningful content roughly centred. Useful centre: `CX = 450`,
  `CY = 290`. Keep important shapes/labels within ~`x: 70–830`, `y: 60–520` so
  nothing collides with the header or runs off-canvas.
- Never draw the bullet text or the title — those already exist. The graphic
  *illustrates*; it does not repeat the words.

DOM elements absolutely positioned over the SVG are fine for drifting labels
(see the term-bubble pattern), but the core graphic should be SVG.

## Design tokens

Match the cybersecurity deck exactly — this is the agreed style.

| Role | Value |
|------|-------|
| Canvas / deep panel | `#0b1220`, `#0f172a` |
| Primary blue | `#3b82f6`, light `#60a5fa`, deep `#1e3a8a` |
| Cyan accent | `#22d3ee` |
| Success green | `#10b981` / `#34d399` |
| Warning amber | `#f59e0b` |
| Critical red | `#ef4444` / `#f87171` |
| Purple | `#a78bfa` |
| Text strong / mid / faint | `#e2e8f0` / `#94a3b8` / `#64748b` |
| Hairlines, grid | `#1e293b`, `#334155`, `#475569` |

- Pick **one dominant hue** for the central object, use the others sparingly for
  contrast and for distinct categories. Don't rainbow everything.
- Use the **named status colors with meaning**: green = safe/correct, amber =
  caution, red = danger/wrong. Beginners read color before text.
- Labels: `fill="#e2e8f0"` for primary, `#94a3b8` for secondary. Technical/code
  labels use `fontFamily: 'monospace'` with letter-spacing ~`0.15em`. Concept
  labels use the default sans.
- Glows make the deck feel premium. Define a blur+merge filter once and reuse:
  ```jsx
  <filter id="s11-glow" x="-30%" y="-30%" width="160%" height="160%">
    <feGaussianBlur stdDeviation="3" result="b" />
    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
  </filter>
  ```
  **Prefix every `id`** (filters, gradients, motion paths) with the section, e.g.
  `s43-glow`, `s43-core-grad` — ids are global in the DOM.

## Animation toolbox

Everything is always-on and loops forever (`repeatCount="indefinite"`). Stagger
with `begin` so the scene breathes instead of pulsing in lockstep.

- **Pulse / breathe** — `<animate attributeName="r" .../>` plus a paired opacity
  animate for expanding rings; or animate `stroke-opacity` `0.5;1;0.5` for a
  glowing outline.
- **Rotate** — `<animateTransform type="rotate" from="0 cx cy" to="360 cx cy"
  dur="..." />` for orbiting rings and frames. Alternate direction between rings.
- **Travel along a path** — define `<path id="s43-route" d="..." />` in `<defs>`,
  then `<animateMotion><mpath href="#s43-route" /></animateMotion>` on a dot to
  send a "data packet" along a connection.
- **Fill / progress** — animate a `<rect>` `width` from `0` to full to show
  loading, scanning, comparison bars.
- **Dashed flow** — `strokeDasharray` + animate `stroke-dashoffset` to make a
  line look like it's flowing.
- **CSS keyframes** — only for DOM elements that drift across the whole canvas
  (long-distance translate). Add to `index.css`, section-prefixed name. Pure SVG
  doesn't need this.
- **React state** — only when the concept needs a real changing number (a
  brute-force counter, a countdown). Update on an interval in `useEffect`; keep
  it cheap. Prefer declarative SVG everywhere else.

Durations: ambient motion slow (`14–50s`), focal pulses `2.5–5s`, traveling
packets `4–6s`. Slow and smooth reads as polished; fast reads as nervous.

## Composition patterns

Reach for one of these; they all match the reference deck.

1. **Hub & orbit** — one central object (the concept), 2–5 satellites around it
   on `R ≈ 160–190`, connecting lines with traveling packets. Best for "X has
   these parts / pillars / channels" (components of a computer, social networks
   around a profile).
2. **Side-by-side compare** — two or three panels contrasting options, each
   with its own color and a verdict marker. Best for "A vs B" (hardware vs
   software, HDD vs SSD, weak vs strong password, Android vs iOS).
3. **Flow / pipeline** — left-to-right stages with an animated token moving
   through them. Best for processes (sending an email, a request reaching a
   website, a prompt → answer).
4. **Annotated mock** — a stylised fake window/phone/email with pulsing callouts
   pointing at parts. Best for UI-oriented sections (Windows navigation, mailbox
   organisation, phone settings, spotting a fake site).
5. **Layered system** — concentric or stacked layers. Best for "what sits on
   what" (OS managing hardware, cloud above devices).

Whatever the pattern: one clear focal point, a few supporting elements, ambient
detail (faint rings, a scan line, drifting particles) for life. If you can't
say in one sentence what the graphic shows, it's too busy.

## Concept → visual

Read the lecturer-guide section and find the **single core idea**. Then pick the
metaphor — and prefer the metaphor the guide itself narrates, because the
lecturer is speaking those exact words while this slide is on screen.

Examples of the mapping:

| Section idea | Guide metaphor | Scene |
|--------------|----------------|-------|
| Hardware vs software | instrument vs sheet music | Compare pattern: a "things you can touch" panel vs a glowing "programs inside" panel |
| RAM vs disk | desk vs cabinet | Compare/layered: an open desk with active items, a cabinet with stored files |
| OS runs the machine | building manager | Layered: OS ring managing hardware icons below it |
| Components of a computer | — | Hub & orbit: case at centre, CPU/RAM/disk/peripherals orbiting |
| Sending an email | — | Flow: compose → send → inbox, a letter token traveling |
| Social networks | — | Hub & orbit: a profile at centre, network glyphs around it |
| What is AI / LLM | — | Hub: a prompt entering a glowing core, an answer emerging |

Labels on the graphic are short — name the parts, in Bulgarian, English term
where standard. The graphic teaches by *shape, color and motion*; text is just
anchoring.

## Pitfalls

- **Don't restate the bullets.** The left column already lists the points; the
  graphic adds a *picture*, not a second copy of the words.
- **Don't overcrowd.** Five orbiting nodes is plenty. Whitespace is design.
- **Keep `id`s unique** — prefix with the section. Colliding filter/gradient ids
  across scenes cause silent rendering bugs.
- **Every SVG `<text>` needs an explicit `fill`** or it renders invisible.
- **Test the loop.** Animations must loop seamlessly — no jump at restart.
  `values` lists should start and end on the same value for breathing effects.
- **Stay inside the canvas.** Content drifting past `x: 70–830 / y: 60–520`
  collides with the header or the bullets, or clips at the edge.
- **No external assets / libraries.** SVG + CSS only. `qrcode.react` exists in
  the deck but a Scene shouldn't need it.
- **Heavy React state re-renders the whole Scene.** If you must use state, keep
  the interval slow and the state tiny.
