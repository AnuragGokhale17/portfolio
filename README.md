# Anurag Gokhale — AI Engineer portfolio

A one-page site that positions Anurag as an AI engineer: LLM, retrieval, agent and voice systems
in production, with the computer vision work shown as the foundation. (The vision-first
portfolio lives separately in `../portfolio`.)

## Before deploying

- `SITE.domain` in `src/lib/content.ts` is a placeholder. Set it to the real domain.

All copy lives in `src/lib/content.ts`. Nothing factual is hardcoded in components, and every
claim traces back to the AI Engineer résumé. Keep it that way: no invented numbers.

## Running

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # fully static
```

## Structure

```
src/app/layout.tsx           fonts (TASA Orbiter, Geist Mono), metadata, JSON-LD
src/app/page.tsx             section order
src/components/Hero.tsx      headline reveal, tool orbit, availability badge
src/components/Marquee.tsx   scroll-reactive red band + count-up stats
src/components/Work.tsx      8 tiles with looping art (TileArt.tsx), shared-layout detail view
src/components/RoostFlow.tsx Roost's real pipeline, step by step, with an approve gate
src/components/Approach.tsx  principles that light up word by word on scroll
src/components/Stack.tsx     tools shipped vs built with
src/components/Path.tsx      timeline with a scroll-drawn line
src/components/Contact.tsx   red contact block, magnetic links, wordmark
src/lib/content.ts           every claim on the site
```

## Colour rules

Red is `#ff2800`. It is 3.8:1 against white, so: text on red is black unless it is big and bold
(then white is fine); small red text on light backgrounds uses `--color-red-ink` (`#c41f00`).
Motion uses the `motion` package (v14); `MotionConfig reducedMotion="user"` and a CSS
reduced-motion rule turn the loops off for people who ask for that.
