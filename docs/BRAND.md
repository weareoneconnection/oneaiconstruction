# Brand System

## Master brand

ONEAI CONSTRUCTION

## Primary tagline

**Intelligence for the Built World.**

## Supporting lines

- From Project Data to Project Intelligence.
- See. Understand. Predict. Act.
- Evidence-backed AI for construction and infrastructure.
- Build with intelligence.

## Marks

Three marks, one construction. **White is the built thing; cyan is what the
platform adds.** Nothing in any of them is decorative — every line is either
structure or intelligence.

| Mark | Form | Reading |
|---|---|---|
| OneAI Construction | King-post truss | The triangle and its tie beam make the A; the member running through them makes the 1. The oldest structural form there is, and it draws the tagline rather than restating it. |
| Construction OS | The same structure in section | The layers the platform is built from, with the intelligence layer reaching past the rest. |
| Construction Twin | The same volume in axonometric, drawn twice | The outline is the approved baseline, the solid is what was measured, and the displacement between them is the variance. |

Each silhouette is distinct at 16px — a triangle, a stack, a pair of diamonds —
so the family reads as one system without the marks being mistaken for each
other.

**The marks stand without a container.** The rounded square is an app icon and a
favicon, never running layout: a mark that only works inside a box is a box
doing the work. In the site it is `components/BrandMark.tsx`; standalone files
live in `apps/web/public/brand/` in four cuts each — dark, `-light` (cyan drops
to `#0fa5cc` to hold contrast on white), `-mono` (inherits `currentColor` for
stamps, embroidery and single-plate print) and `-icon` (boxed).

Geometry is fixed on a 64-unit grid at a 3.2 stroke. Do not redraw a mark by
eye, rescale one axis, recolour the cyan member, or set the letters "1A" as type
in place of the truss.

## Visual direction

- Graphite / black base
- White typography
- Electric cyan intelligence accents
- Green for verified / healthy states
- Amber for attention
- Red for critical risk

Avoid generic robot imagery, neon cyberpunk visuals, excessive gradients, construction stock photography and generic AI brain graphics.

## Home-screen icons

The marks under `public/brand/` are for documents and slides. What a phone
installs comes from routes that rasterise the same geometry, so there is one
source of truth: `apps/web/lib/brand-icon.tsx`.

| Route | Size | Cut | Used by |
|---|---|---|---|
| `/icon` | 64 | boxed | browser tab |
| `/apple-icon` | 180 | full bleed, 76% fill | iOS add to home screen |
| `/icon-192`, `/icon-512` | 192, 512 | boxed | manifest, `purpose: any` |
| `/icon-maskable` | 512 | full bleed, 58% fill | manifest, `purpose: maskable` |

Two rules decide whether a tile keeps its container box:

- **A platform that applies its own mask gets full bleed.** iOS crops to a
  squircle at about 22% corner radius and the box is drawn at 25%, so a boxed
  Apple icon loses its border at the four corners and keeps it along the flats.
  Android's maskable crop is worse: a circle.
- **A masked tile is sized from the safe zone, not by eye.** Android guarantees
  only a centred circle of 80% diameter, and a wide triangle inside a circle is
  genuinely tight: at 58% fill the furthest point of the truss lands 197px from
  centre against a 205px safe radius, and 62% already clips. That is why the
  Android tile reads smaller than the iOS one. iOS is far more forgiving — its
  squircle takes 90% uncut — so 76% is a judgement about how a home screen
  looks, not a limit.

**`fill` is the painted width of the mark, not the width of its artboard.** The
mark sits on a 64-unit artboard it does not fill; the truss spans 45.2 of those
64 units, so the artboard carries about 29% of its own padding. Sizing a tile
against the artboard is how the iOS icon first shipped at 57% of its tile when
it was meant to be 80% — the PNG was the right size and the right shape, and
only looked wrong next to other apps on a phone. `brand-icon.tsx` uses a tight
viewBox around the painted mark so `fill` means what it says.

Changing the mark means changing `brand-icon.tsx`, re-deriving `MARK_SIDE`, and
re-checking the maskable corner distance. `the mark fills its tile` decodes the
published PNGs and measures the painted bounding box, so an undersized mark
fails with the percentage it actually painted.
