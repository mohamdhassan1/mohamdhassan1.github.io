// One-off asset pipeline: turns the raw 1125x2436 device captures into the
// WebP files the site ships. Re-run it if the screenshots are ever recaptured.
import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'D:/Projects/.portfolio-capture/shots';
const DEST = 'D:/Projects/portfolio/public/projects';
mkdirSync(DEST, { recursive: true });

// Screens that render an empty state (no saved books / no bookmarks yet) are
// real but say nothing about the work, so they are not shipped.
const SKIP = new Set(['library-saved.png', 'movie-bookmarks.png']);

const files = readdirSync(SRC).filter(f => f.endsWith('.png') && !SKIP.has(f));
let total = 0;

for (const f of files) {
  const out = join(DEST, f.replace(/\.png$/, '.webp'));
  const info = await sharp(join(SRC, f))
    .resize({ width: 640 })          // displayed ~300px wide, so 2x is plenty
    .webp({ quality: 82, effort: 6 })
    .toFile(out);
  total += info.size;
  console.log(`${f} -> ${(info.size / 1024).toFixed(0)} KB`);
}
console.log(`\n${files.length} screenshots, ${(total / 1024).toFixed(0)} KB total`);
