# Mohamed Hassan — Portfolio

Personal portfolio for **Mohamed Hassan**, Flutter Developer & Mobile Application Developer.
Built with [Astro](https://astro.build) as a single static page, no client framework.

## Commands

```bash
npm install
npm run dev      # dev server on http://localhost:4321
npm run build    # static output into dist/
npm run preview  # serve the built site locally
npm run check    # astro type/diagnostics check
```

## Deploying

`dist/` is a plain static folder — it works on Netlify, Vercel, Cloudflare Pages or GitHub Pages
with no adapter.

Before the first deploy, set the real origin in `astro.config.mjs`:

```js
site: 'https://your-domain.com',
```

That value is what canonical URLs and the Open Graph tags are built from.

## Where the content lives

All copy and data sit in `src/data/`, so the site can be updated without touching components:

| File | Holds |
| --- | --- |
| `src/data/site.ts` | Name, contact links, hero copy, about, experience, education, services, process |
| `src/data/projects.ts` | Featured and secondary projects, including screenshot lists |
| `src/data/skills.ts` | Skill groups |

`src/styles/global.css` is the design system — colours, type scale, spacing, radii, shadows,
motion and the shared button/card/badge classes. Components reference tokens only.

## Content rules

The site deliberately claims only what can be checked:

- **Every screenshot is real.** Each one was captured by building the app for web from its own
  source and driving the running app. The Potter Library and CineVerse screens show live data from
  the real Potter API and TMDB. Nothing is a mockup.
- **Two projects have no screenshots** — Travel Booking needs a Firebase web configuration that is
  not in the repository, and the Notes app uses `sqflite`, which has no web implementation. Both
  say so on the page rather than showing invented screens.
- **Where the CV and the source disagreed, the source won.** Supabase, GoRouter and Firebase Cloud
  Messaging appear in no repository, so they are not claimed anywhere on the site. See the header
  comment in `src/data/projects.ts` for the specific cases.

If the missing source is pushed later, add the claims back in `src/data/projects.ts` and
`src/data/skills.ts`.

## Regenerating screenshots

Screenshots in `public/projects/` are WebP, 640px wide, produced from 1125×2436 captures.
`scripts-optimize.mjs` does the conversion:

```bash
node scripts-optimize.mjs
```

It reads raw PNGs from the capture directory and writes optimised WebP into `public/projects/`.
Update the `SRC` path in that file if the captures move.

## Accessibility & performance

- Semantic landmarks, one `h1`, no heading-level skips, skip-to-content link
- Keyboard focus visible throughout; mobile menu closes on `Escape`
- All images carry alt text and explicit dimensions, so nothing shifts while loading
- Scroll reveals are progressive enhancement: with `prefers-reduced-motion: reduce`, or with
  JavaScript disabled, all content renders immediately
- No client-side framework and no external JavaScript bundle — the few scripts are inlined
- Fonts are self-hosted and subset to the weights actually used
