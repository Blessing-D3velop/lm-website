# LM Painting, Tiling & Waterproofing — Website

A fully responsive, front-end-only website (HTML, CSS, vanilla JS — no build step, no dependencies).

## How to view it
Just open `index.html` in a browser. Every page and link works locally — no server required.

## Pages
- `index.html` — Home
- `painting.html` — Painting
- `tiling.html` — Tiling
- `waterproofing.html` — Waterproofing
- `bathroom-renovation.html` — Bathroom Renovation
- `gallery.html` — Full 25-image project gallery
- `contact.html` — Contact / quote request

## ⚠️ About the gallery images
No flyer image or real project photos were attached when this site was built, so
`images/gallery/image-1.jpeg` through `image-25.jpeg` are **placeholder graphics**
(navy/gold labelled panels), not real photos.

**To add your real project photos:** just replace those 25 files with your own,
keeping the exact same names (`image-1.jpeg`, `image-2.jpeg`, ... `image-25.jpeg`)
and the same folder (`images/gallery/`). Nothing else needs to change — the grid,
the lightbox, the counter ("3 / 25"), and the before/after section on the bathroom
page all reference these filenames directly.

If you have more or fewer than 25 photos, open `scripts/gallery.js` and change
`GALLERY_COUNT` at the top of the file to match.

## Editing contact details
Phone/WhatsApp number and email appear in every page's header, footer, and contact
page. To change them, search-and-replace across all `.html` files:
- Phone/WhatsApp: `072 039 6483` (and the international format `27720396483` inside
  `scripts/main.js`)
- Email: `mphodolawrance@gmail.com`

## Structure
```
index.html
painting.html
tiling.html
waterproofing.html
bathroom-renovation.html
gallery.html
contact.html
styles/
  style.css        — design tokens, layout, components
  responsive.css    — tablet/mobile breakpoints
scripts/
  main.js           — nav, scroll reveal, WhatsApp links, quote form
  gallery.js        — dynamic gallery grid + lightbox
images/
  gallery/
    image-1.jpeg ... image-25.jpeg
```
