# Velune website — design plan (for approval)

Status: **proposal**. Nothing in here has been built yet. Items marked ⚑ need a decision from Velune.

## 1. Audience and primary conversion

- **Who:** people and businesses commissioning visual content. The real roster is makeup artists, fashion/clothing labels, stylists, a jewellery brand and a kids' community brand. The brand book keeps the audience open (brands, businesses, products, people; no geographic restriction).
- **Job of the site:** within one screen, say what Velune is and does; prove it with real work; make starting a conversation effortless.
- **Primary conversion:** start an enquiry ("Let's talk", the brand's established CTA) via WhatsApp, the brand's recorded primary route. The form gathers the brief and hands it to WhatsApp. ⚑ number to confirm.
- **Not a booking system.** Nothing in the brand book describes scheduling, so the site will never say "booked" or "confirmed".

## 2. Information architecture

```
/                     Home
/work/                Selected work (index + filter by work shown: photography / video)
/work/kinjal-mehtha/  ⚑ spelling   ┐
/work/lakshi-lingaraju/            │ project pages: real media only,
/work/yash-jain/                   │ no invented brief or results
/work/stilat/                      │
/work/pl-edits/                    │
/work/nomi-kids-culture/  ⚑ include? ┘
/services/            All nine services, grouped 3 × 3, each with an "Ask about this" link
/studio/              Story, approach (Create / Capture / Elevate), who Velune works with
/contact/             Enquiry form + WhatsApp + Instagram + factual FAQ
404
```

Nav: `Work · Services · Studio` + pill CTA `Let's talk` (→ /contact/). Every service, project and section CTA leads to /contact/, with the service pre-selected where relevant (`/contact/?service=photography`).

## 3. Reading of the reference (Dribbble "PIXOR" agency page)

| Reference trait | Keep / adapt / drop | Why |
|---|---|---|
| Outlined pill around the logo top-left; text links right; filled pill CTA | **Keep.** Real "velune." logo in the pill; charcoal CTA instead of orange | NN/g: logo top-left. The orange accent isn't in Velune's palette |
| Hero = one huge line mixing heavy upright sans with condensed italic serif (grey) | **Keep, the signature device.** Lato Black + EB Garamond Italic | Both families are in the brand book; the heavy sans echoes the real wordmark |
| 3-column meta row under the hero (description · location/established · scroll link) | **Adapt.** Description · Instagram/enquiry route · "See selected work" | No verified location or founding year exists |
| Faint square grid behind hero; "Available for 2025" dot label | **Drop** | Decoration and an invented availability claim |
| Left micro-label + right large statement paragraph | **Keep** with Velune's established brand-story copy | Real copy, editorial voice |
| Stats row (04 years, 40+ awards, 100%, 24/7) | **Drop** | Would be fabricated |
| Process rows with icons | **Adapt** → Create / Capture / Elevate from Velune's own reel ("How we think") | Genuine sequence → numbering justified |
| "Selected Work from / *Recent Projects*" two-voice heading + pill button | **Keep** | Same two-voice system |
| Asymmetric 2-up project grid, unequal widths, title + chips + year + arrow | **Keep, adapted to portrait media**: alternating 7/12 + 5/12 columns, portrait crops | All client media is 9:16. No year shown (unknown) |
| Giant ghost words ("Projects", "Pricing") | **Drop mid-page; keep one** giant wordmark in the footer, using the real logo | One bold move, not three |
| Services as horizontal cards, one expanded in accent | **Adapt**: three group panels (Production / Content & social / Brand & marketing) of three services each; selected panel expands (charcoal) | Nine services don't fit four cards; the 3 × 3 grouping mirrors the brand book's pages 10–15 |
| Pricing, team, testimonials carousel | **Drop** | No verified content. Fabricating any of it is forbidden |
| FAQ accordion | **Keep, factual only** (bundling, scope, guarantees, geography, how to start), all answerable from the brand book | Real answers exist |
| Dark rounded contact panel, two-voice headline, underline fields, white pill submit | **Keep** | Matches "Let's talk" moment |
| Footer: hairline, small links, giant wordmark | **Keep** | |

Two light tones alternate in the reference (hero/work vs intro/FAQ); mapped to ivory and soft white.

## 4. Colour tokens (brand book values, contrast-checked)

| Token | Hex | Use | Measured contrast |
|---|---|---|---|
| `--charcoal` | `#141414` | Text on light; dark panels; primary buttons | 16.2:1 on ivory |
| `--ivory` | `#F5F0E8` | Main canvas | — |
| `--soft` | `#FBFAF7` | Alternate sections, form surface on light | — |
| `--graphite` | `#5A554E` | Secondary text and italic second voice **on light** | 6.5:1 on ivory ✔ |
| `--stone` | `#A89F94` | Hairlines on light; secondary text and italic voice **on dark only** | 7.1:1 on charcoal ✔ / **2.3:1 on ivory ✘** |

No other colours. Focus ring: 2 px charcoal on light, ivory on dark, 3 px offset.

## 5. Typography

- **Lato** (400, 700, 900) for UI and body, plus the upright half of two-voice headings at 900.
- **EB Garamond** (400, 400 italic) for the italic half of headings, editorial statements and project titles on project pages.
- The logo stays an image (the master artwork), never re-typeset.
- Self-hosted WOFF2 Latin subsets (OFL), 2 preloads, `font-display: swap`.
- Scale (fluid `clamp`): hero 3.25 → 8.5 rem; H2 2.25 → 4.5 rem; statement 1.5 → 2.4 rem Garamond; body 1.0625 rem / 1.6 Lato; meta 0.8125 rem Lato 700, tracked uppercase (brand book: "small tracked uppercase labels for navigation and metadata"). Used only on metadata keys and chips, never as eyebrows above headings.
- Measure ≤ 68 ch for body.

⚑ **Typography reconciliation:** the real logo and showreel use a heavy grotesk, while the book proposes Garamond + Lato. This plan bridges the two with Lato Black + Garamond Italic. If Velune has the logo's typeface name, it may be better for the upright voice.

## 6. Grid, spacing, alignment

- 12-column grid, max content 1280 px; gutters 16 px (mobile) / 32 px (tablet) / 48 px (desktop).
- Section rhythm `clamp(80px, 10vw, 160px)`; spacing scale 4/8/12/16/24/32/48/64/96.
- Left-aligned everywhere; asymmetric label (cols 1–4) / content (cols 5–12) split from the reference.
- Radii: 999px for pills; 8 px for media frames (as in the reference); 20 px for the contact panel. No shadows.

## 7. Hero media

```
┌────────────────────────────────────────────────────────────┐
│ (velune.)                 Work  Services  Studio  [Let's talk]│
│                                                              │
│ Create. Capture.  ← Lato Black, charcoal                     │
│ Elevate.          ← EB Garamond italic, graphite             │
│ ──────────────────────────────────────────────────────────── │
│ Velune brings creative     Instagram            See selected │
│ production and digital     @veluneproductions   work ↓       │
│ services together for …    Enquiries: WhatsApp               │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │                                                          │ │
│ │           showreel 16:9 (framed, 8px radius)        [❚❚] │ │
│ │                                                          │ │
│ └──────────────────────────────────────────────────────────┘ │
```
Mobile: headline over two lines, meta stacked, then the **9:16** reel at full container width, reading like a phone reel.

- **Text is not laid over the footage.** The reel already carries its own logo and titles ("A CREATIVE STUDIO.", "FILM."), and overlaying a headline would collide with them. Framing the reel as a "screen" keeps both legible.
- Markup: a `<picture>` still (portrait/landscape art-directed, `fetchpriority="high"`; this is the LCP element) under a `<video muted playsinline loop preload="none">` with two `<source media>` entries. Only the matching file is requested.
- JS starts playback only if `prefers-reduced-motion: no-preference` and `Save-Data` is not on; the video fades in on `playing`. On `NotAllowedError` (iOS Low Power Mode) the still stays and the play button remains.
- A `matchMedia` change listener re-selects the source only when the orientation boundary is actually crossed.
- Pause/play button always visible (WCAG 2.2.2, since the loop runs 55 s).
- Re-encode: strip audio, H.264 CRF ~23 + `faststart`, plus an AV1/WebM variant if it comes out meaningfully smaller. Keep source resolution (1276×718 and 720×1280). No upscaling. ⚑ A higher-resolution 16:9 master would look sharper on large screens.

## 8. Work presentation

- Home: 4 featured cards in an alternating 7/5 then 5/7 grid with portrait crops, a title (client name), chips (category from the brand book, e.g. "Makeup artistry") and an arrow icon. "View all work" pill.
- /work/: all projects; filter chips for **work shown** (Photography / Video) are derived from the actual media in each folder. Service categories are **not** assigned without evidence.
- Project page: name (Lato Black) + category (Garamond italic); meta row (client, category, work shown); gallery of real photos (responsive WebP/JPEG) and videos (`preload="none"`, poster, native controls, start muted). Next project + "Let's talk" CTA. **No invented brief or results.** Optional "About this project" fields render only when filled in the data file.
- HEVC .MOV files are transcoded to H.264 MP4 so they play in Chrome/Firefox on Linux and Windows.

## 9. Services discovery

- Home: three expandable group panels (APG disclosure buttons), each listing its three services; the expanded panel shows one-line descriptions and a "See services" link.
- /services/: a sticky in-page index on desktop; nine sections in a consistent hierarchy: what it covers (from brand book pages 9–15), how it runs (e.g. Brief → Concept → Capture → Finish for video), scope note (e.g. "community replies and reporting are agreed per engagement"), then the "Ask about {service}" link.
- Brand-book mood images are **not** used (the book says they're generated and illustrative). Services use real client stills where they genuinely fit (photography, video), and typography elsewhere.

## 10. Enquiry journey

Form fields: Name* · How should Velune reach you? (WhatsApp number or email)* · Services you're interested in (checkboxes, optional, pre-filled from `?service=`) · Tell us about the project* · Timeline (optional select).
Budget is left out unless Velune wants it ⚑.

Submit = **"Continue in WhatsApp"**: validates inline, composes a readable message, opens `wa.me/<number>?text=…` in a new tab, and shows a status line ("WhatsApp opened with your message. Press send there to reach Velune."). A **"Copy message"** button covers desktops without WhatsApp. Nothing claims "sent". If Velune wants email delivery too, a small serverless endpoint can be added later with the secret kept server-side ⚑.

## 11. Motion

- One orchestrated moment: on load, the two headline lines rise and the reel frame fades in (≤ 600 ms total).
- Response motion only: menu open, service panel expand, filter change, form status.
- No scroll-triggered entrance animations, no hover autoplay on cards, no carousels.
- Under reduced motion, all of the above is instant and the hero isn't autoplayed.

## 12. Performance and accessibility decisions

- Zero JS frameworks client-side; around 3 KB of vanilla JS (hero, menu, panels, filter, form).
- Images: explicit width/height, `srcset` 480–1600 w, WebP + JPEG fallback, lazy below the fold.
- Skip link; landmarks; one H1 per page; visible labels; `aria-describedby` errors + error summary; `scroll-padding-top` for the sticky header; targets ≥ 44 px.
- SEO: unique titles/descriptions; Open Graph with a real still; Organization JSON-LD (`name`, `logo`, `sameAs` Instagram). **No canonical/`url`/sitemap host until a domain is confirmed ⚑.**

## Generic-pattern critique (what was removed and why)

- Stats row, testimonials, team grid, pricing, and the "available" badge are all removed because they would be fabricated.
- Faint hero grid and repeated ghost words are removed as decoration. One giant real wordmark in the footer is kept.
- The orange accent is replaced by charcoal and ivory; there's no bright accent anywhere.
- Arrow glyphs appended to every button are removed. Arrows appear only on project cards as a "go to project" icon, as in the reference.
- Monospace labels (in both the reference and the reel) are not adopted, because they'd be a third family outside the brand book.
- Fade-up on every section is replaced by a single load moment.
- **Kept on purpose:** the two-voice headline. It's the reference's defining idea, and here it's built from the two brand-book families. That makes it specific to Velune rather than a default.
