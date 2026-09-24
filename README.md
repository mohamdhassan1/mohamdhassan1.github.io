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

- **Every screenshot is a real capture.** Most were taken by building the app for web from its own
  source and driving the running app; the Notes frames come from an Android emulator, because
  `sqflite` has no web implementation. The Potter Library and CineVerse screens show live data from
  the real Potter API and TMDB. The FoodLens clip is a screen recording of the app on a device.
  Nothing is a mockup.
- **Travel Booking is the one exception, and says so.** It has no runnable web build, so its three
  frames are the published UI design the app implements. They are captioned "Design spec", credited
  to the designer in the project note, and linked to the original Figma file. They must never be
  recaptioned as screenshots of the running app.
- **Where the CV and the source disagreed, the source won.** Supabase, GoRouter and Firebase Cloud
  Messaging appear in no repository, so they are not claimed anywhere on the site. See the header
  comment in `src/data/projects.ts` for the specific cases.

If the missing source is pushed later, add the claims back in `src/data/projects.ts` and
`src/data/skills.ts`.

## Project media

Every project renders its media through one component, `src/components/ProjectMedia.astro`, which
wraps each item in `MobileMockup.astro`. Screenshots, design frames and video all go through the
same path, so they are presented identically — same phone bezel, radius, border, shadow, hover and
entrance animation. Adding media to a project means adding entries to its `media` array in
`src/data/projects.ts`; no per-project media styling exists, and none should be added.

Frames render at one canonical phone aspect ratio (375:812). Because every still is normalised to
that ratio at the asset level (below), `object-fit: cover` never actually crops anything — a row of
frames from any two projects lines up to the pixel.

The FoodLens clip autoplays muted and looping when scrolled into view, pauses when it leaves, and is
not fetched at all until then. Under `prefers-reduced-motion: reduce` it stays on its poster until
the viewer presses play. Without JavaScript the native video controls remain.

### Re-encoding the clip

The shipped clip was produced from the original recording with ffmpeg — trimmed, scaled, audio
stripped, and written as both MP4 (H.264) and WebM (VP9):

```bash
ffmpeg -ss 37 -to 67.2 -i original.mp4 -an -c:v libx264 -profile:v main -pix_fmt yuv420p -crf 30 -preset slow -movflags +faststart -vf "scale=384:-2,fps=24" public/projects/foodlens-demo.mp4
```

## Normalising media

Every frame ships at exactly 640x1386 (375:812). `scripts/normalize-media.mjs` fits each
capture inside that canvas without distorting it and pads any leftover space with a colour
sampled from the capture’s own edge, so nothing is ever stretched or cropped:

```bash
node scripts/normalize-media.mjs
```

Sources live outside the repo in the capture workspace. Most projects need no padding at all;
the Notes frames pad 38px horizontally and Travel 1-2px vertically.

## Regenerating screenshots

Screenshots in `public/projects/` are WebP, 640px wide, produced from 1125×2436 captures.
`scripts/optimize-screenshots.mjs` does the conversion:

```bash
node scripts/optimize-screenshots.mjs
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
