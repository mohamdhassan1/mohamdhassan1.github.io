// Normalize every project still to one canonical phone canvas.
//
// The device frame renders at 375:812, so each capture is letterboxed onto
// exactly that ratio here rather than being cropped or stretched in CSS. The
// padding colour is sampled from the capture's own top and bottom edge rows,
// so a white app pads white and a dark app pads dark — the fill reads as part
// of the screen instead of as a bar.
//
// Sources are real captures: the VCare and Notes frames are the running apps,
// the Travel frames are cut from the published UI design the app implements.
import sharp from 'sharp';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const W = 640, H = 1386;                 // 375:812 at 2x-ish, matching the existing set
const SHOTS = 'D:/Projects/.portfolio-capture/shots';
const NOTES = 'D:/Projects/.portfolio-capture/notes-tight';
const TRAVEL = 'D:/Projects/.portfolio-capture/travel';
const OUT = 'D:/Projects/portfolio/public/projects';

const jobs = [
  // VCare — the authenticated journey, captured from the running app.
  [`${SHOTS}/vc-home.png`, 'vcare-home'],
  [`${SHOTS}/vc-specialties.png`, 'vcare-specialties'],
  [`${SHOTS}/vc-search.png`, 'vcare-search'],
  [`${SHOTS}/vc-doctor-details.png`, 'vcare-doctor-details'],
  [`${SHOTS}/vc-booking.png`, 'vcare-booking'],
  [`${SHOTS}/vc-appointments.png`, 'vcare-appointments'],
  [`${SHOTS}/vc-ai-assistant.png`, 'vcare-ai-assistant'],
  [`${SHOTS}/vc-profile.png`, 'vcare-profile'],

  // Notes — cut from the supplied emulator captures.
  [`${NOTES}/onboarding.png`, 'notes-onboarding'],
  [`${NOTES}/list.png`, 'notes-list'],
  [`${NOTES}/new-note.png`, 'notes-new-note'],
  [`${NOTES}/delete-dialog.png`, 'notes-delete'],

  // Travel — frames from the published UI design the app implements.
  [`${TRAVEL}/hero.png`, 'travel-hero'],
  [`${TRAVEL}/explore.png`, 'travel-explore'],
  [`${TRAVEL}/detail.png`, 'travel-detail'],

  // FoodLens stills are 384:848; re-letterbox them so every frame matches.
  [`${OUT}/foodlens-poster.webp`, 'foodlens-poster'],
  [`${OUT}/foodlens-history.webp`, 'foodlens-history'],
];

/** Average colour of the one-pixel strip along one edge, used as the fill. */
const edgeColour = async (input, side) => {
  const meta = await sharp(input).metadata();
  const strip = { top:    { left: 0, top: 0, width: meta.width, height: 1 },
                  bottom: { left: 0, top: meta.height - 1, width: meta.width, height: 1 },
                  left:   { left: 0, top: 0, width: 1, height: meta.height },
                  right:  { left: meta.width - 1, top: 0, width: 1, height: meta.height } }[side];
  const { data } = await sharp(input).extract(strip).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  let r = 0, g = 0, b = 0;
  for (let i = 0; i < data.length; i += 3) { r += data[i]; g += data[i + 1]; b += data[i + 2]; }
  const n = data.length / 3;
  return { r: Math.round(r / n), g: Math.round(g / n), b: Math.round(b / n), alpha: 1 };
};

for (const [src, name] of jobs) {
  if (!existsSync(src)) { console.log(`MISSING ${src}`); continue; }

  // Read up front: two sources are also their own destination, and sharp holds
  // an open handle on a file path, which Windows will not let us overwrite.
  const input = readFileSync(src);
  const [topFill, bottomFill, leftFill, rightFill] = await Promise.all(
    ['top', 'bottom', 'left', 'right'].map((side) => edgeColour(input, side)));

  // Fit inside the canvas without distorting, then split the leftover space
  // between opposite edges, each filled with the colour sampled from it.
  const fitted = await sharp(input).resize(W, H, { fit: 'inside' }).png().toBuffer();
  const m = await sharp(fitted).metadata();
  const padY = H - m.height, padX = W - m.width;
  const topPad = Math.floor(padY / 2), leftPad = Math.floor(padX / 2);

  // One .extend() per side: a second call replaces the first rather than
  // adding to it, which would silently drop the earlier padding.
  let buf = fitted;
  for (const [pad, side, background] of [[topPad, 'top', topFill],
                                         [padY - topPad, 'bottom', bottomFill],
                                         [leftPad, 'left', leftFill],
                                         [padX - leftPad, 'right', rightFill]]) {
    if (pad > 0) buf = await sharp(buf).extend({ [side]: pad, background }).png().toBuffer();
  }
  const out = await sharp(buf).webp({ quality: 82 }).toBuffer();

  writeFileSync(`${OUT}/${name}.webp`, out);
  console.log(`${name}.webp  pad ${padX}x${padY}  ${(out.length / 1024).toFixed(0)}KB`);
}
