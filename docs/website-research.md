# Velune website — research notes

Research checked 11 October 2026. Each entry: source → finding → effect on this project → caveats.
Sources were read directly (fetched and indexed), not summarised from search snippets, unless marked *(search summary)*.

---

## 1. Design process and homepage strategy

| Source | Finding | Effect on Velune | Caveat |
|---|---|---|---|
| [Anthropic — frontend-design skill](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md) | Ground design in the subject's own world; spend boldness in one place; avoid template tells (eyebrow labels everywhere, numbered markers on non-sequences, card kits, fade-up on every section). | The memorable idea should come from Velune's own footage and editorial type, not decoration. Numbering is reserved for real sequences (the process). | The reference itself uses some "tells" (chips, ghost watermark words); keep only those that carry information. |
| [Design Council — Double Diamond](https://www.designcouncil.org.uk/resources/the-double-diamond/) | Discover → Define → Develop → Deliver; diverge before converging. | Matches the brief's phase order: audit/research (discover), design plan (define), build (develop), QA (deliver). Also used by the brand book as its process reference. | — |
| [NN/g — Homepage Design: 5 Fundamental Principles](https://www.nngroup.com/articles/homepage-design-principles/) | Communicate who you are and what you do at a glance; logo top-left; tagline must explicitly say what the company does; show sample content; prioritise top tasks. | "Create. Capture. Elevate." alone does not say what Velune does, so the hero needs a plain descriptor line beside it (a creative and digital studio for video, photography, content, social and marketing). Logo goes top-left (the reference uses this position too). | A tagline is brand voice; the descriptor does the explaining. |
| [Webflow — Writing case studies that attract clients](https://webflow.com/blog/write-the-perfect-case-study) | Case studies follow challenge → solution → results; they double as a pitch. | Velune has **no documented briefs or results** for any client. Project pages must show the work honestly (client, category, services shown, media) without fabricating a challenge or outcome. Brief/outcome fields stay empty until Velune supplies them. | A case-study format without real copy would be fiction. Use a "project" format instead. |
| Agency roundups *(search summary)*: [KrishaWeb — 12 best creative agency websites 2026](https://www.krishaweb.com/blog/best-creative-agency-websites/), [Branded Agency — 2026](https://brandedagency.com/blog/best-agencies-scaling-creative-production-2026) | Strong studio sites are selective (fewer, better projects); the production value of the work carries the site; motion should demonstrate capability, not decorate. | Five featured projects + one supporting (Nomi Kids Culture) is the right scale. Let real footage do the impressing. | These are secondary roundups. They inform direction and do not count as evidence. |

## 2. Hero video and responsive media

| Source | Finding | Effect on Velune | Caveat |
|---|---|---|---|
| [MDN — `<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video) | `autoplay` overrides `preload`; `preload` is only a hint; content inside `<video>` is a fallback. | Don't put `autoplay` in the HTML (it would force a download even with reduced-motion). Start playback from JS after checking preferences. | — |
| [MDN — `<source>` (media attribute with video)](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/source) | `<source media="…">` picks the first matching source; only the chosen one is requested. | Native way to load **only** the landscape or the portrait file. | Selection happens at load time. Use JS to re-run `video.load()` when the media query flips. |
| [Scott Jehl — Using responsive HTML video](https://scottjehl.com/posts/using-responsive-video/) | `media` on video `<source>` is cross-browser again (Firefox 120, Chrome 120; Safari never removed it). | Confirms the native approach above. No library needed. | Older browsers ignore `media` and take the first source, so put the landscape source last as the default. |
| [web.dev — Video performance](https://web.dev/learn/performance/video-performance) | Autoplay videos download immediately, even off-screen; `muted` + `playsinline` are needed for inline autoplay; poster + IntersectionObserver for deferral; strip audio from muted video. | Hero: muted, playsinline, loop, no audio track (re-encode without audio). Project videos below the fold: `preload="none"` + poster, play only on request. | — |
| [web.dev — Lazy-loading video](https://web.dev/articles/lazy-loading-video) | `preload="none"` is the most reliable way to avoid fetching video; `loading="lazy"` on media is emerging. | Project-page videos use `preload="none"` + poster + an explicit play control. | `loading="lazy"` on `<video>` isn't universally supported. Don't rely on it. |
| [MDN — Responsive images](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images) | `srcset`/`sizes` for resolution switching; `<picture>` for art direction. | The hero poster is a `<picture>` (portrait frame for portrait viewports, landscape for others), not the `poster` attribute, which isn't responsive. Client photos ship at 3–4 widths in WebP + JPEG. | — |
| [MDN — CSS media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries) (+ "Testing media queries" guide) | `matchMedia().addEventListener('change')` reacts to resize and rotation. | One listener on `(orientation: portrait) and (max-width: 900px)`-style query swaps the hero source only when the boundary is actually crossed. | Swapping downloads the other file. That's acceptable because it happens only on a real change. |
| Community: [WebKit bug 216887](https://bugs.webkit.org/show_bug.cgi?id=216887), [Webflow forum — iOS background video](https://discourse.webflow.com/t/background-video-not-autoplaying-on-ios-replace-with-still-image/296271) | iOS Low Power Mode rejects `play()` with `NotAllowedError`, even when muted. | Show the still image by default and fade the video in only on the `playing` event; on rejection, keep the still and expose a play button. | Behaviour is community-reported; no Apple doc found. Test on a device if possible. |

## 3. Accessibility

| Source | Finding | Effect on Velune | Caveat |
|---|---|---|---|
| [W3C — WCAG 2.2](https://www.w3.org/TR/WCAG22/) | AA target: 4.5:1 normal text, 3:1 large text and UI components. | Measured: charcoal/ivory 16.2:1; graphite/ivory 6.5:1; **stone/ivory 2.3:1 (fails even large text)**; stone/charcoal 7.1:1; graphite/charcoal 2.5:1 (fails). So stone is used for text on dark only. On light, secondary text uses graphite. | Brand book itself warns about stone on ivory. |
| [Understanding SC 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) | Auto-starting motion longer than 5 s shown alongside other content needs a pause/stop mechanism. | The 55 s looping hero needs a visible, keyboard-operable **pause/play** button. | Level A, so this is mandatory. |
| [MDN — prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) | Baseline since 2020. | Reduced motion: hero never autoplays (still frame shown, play button offered); transitions shortened to none. | — |
| [Understanding SC 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | 24×24 CSS px minimum or sufficient spacing. | All controls ≥ 44 px tall in practice; filter chips ≥ 32 px with spacing. | — |
| [Understanding SC 2.4.11 Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) | Sticky headers must not hide focused items; use `scroll-padding`. | `scroll-padding-top` = header height on `html`. | — |
| [WAI — Forms tutorial](https://www.w3.org/WAI/tutorials/forms/), [Labelling controls](https://www.w3.org/WAI/tutorials/forms/labels/), [User notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) | Visible explicit `<label for>`; inline errors next to fields; an overall summary on submit; confirm success. | Visible labels (the reference's underline fields keep their labels); `aria-describedby` errors; error summary with links; a live region for status. | — |
| [WAI-ARIA APG — Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) | Button with `aria-expanded` (+ `aria-controls`). | Mobile menu and the service detail expanders use this pattern (or native `<details>`). | — |
| [NN/g — Website forms usability](https://www.nngroup.com/articles/web-form-design/) | Keep forms short; mark required fields; don't use placeholder text as labels; explain errors. | Enquiry form: name, contact method, services (multi-select), message, timeline (optional). Budget left out unless Velune approves it. | — |

## 4. Performance and fonts

| Source | Finding | Effect on Velune | Caveat |
|---|---|---|---|
| [web.dev — Web Vitals](https://web.dev/articles/vitals) | Good = LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at p75. | Targets for QA. They'll be measured locally with Lighthouse, with conditions reported, and never promised. | Lab ≠ field data. |
| [web.dev — Optimize LCP](https://web.dev/articles/optimize-lcp) | The LCP resource should be discoverable in HTML and prioritised (`fetchpriority="high"`), not lazy-loaded. | The hero still `<picture>` is the LCP candidate: eager, `fetchpriority="high"`, small (~60–120 KB). Video loads after. | — |
| [web.dev — Font best practices](https://web.dev/articles/font-best-practices) | Self-host, WOFF2, subset, preload the critical face; choose `font-display` deliberately. | Self-host EB Garamond and Lato (both SIL OFL) as WOFF2 Latin subsets; preload the two critical faces; `font-display: swap` with metric-matched fallbacks. | The PDF embeds subset fonts, which are not usable. Fetch the full families from the OFL distribution (Google Fonts). |
| [Chrome — Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) | Audits perf, a11y, best practices, SEO. Runs via CLI. | Run `npx lighthouse` against the local server with the installed Google Chrome. | Automated a11y checks catch only part of the issues. Do manual keyboard review too. |

## 5. SEO and structured data

| Source | Finding | Effect on Velune | Caveat |
|---|---|---|---|
| [Google — SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) | Unique, descriptive titles; descriptive URLs; descriptive link text and alt text. | `/services/`, `/work/stilat/` style URLs; one title per page. | No guarantee of ranking. |
| [Google — Meta descriptions/snippets](https://developers.google.com/search/docs/appearance/snippet) | Unique, page-specific descriptions. | Written per page from verified copy only. | — |
| [Google — Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization) | No required properties; add relevant ones (`name`, `logo`, `url`, `sameAs`, contact). | JSON-LD with `name: Velune`, `logo`, `sameAs: instagram.com/veluneproductions`. **`url` omitted until a production domain is confirmed;** no address or phone unless Velune approves. | — |

## 6. Architecture and enquiry

| Source | Finding | Effect on Velune | Caveat |
|---|---|---|---|
| [Astro — Why Astro](https://docs.astro.build/en/concepts/why-astro/) | Content-site framework; static output; zero client JS by default; components and content collections. | Fits a multi-page studio site with shared header/footer and data-driven project pages. | **New dependency. Needs your approval** (the project is currently empty). |
| [Astro — Images](https://docs.astro.build/en/guides/images/) | `<Image>`/`<Picture>` generate `srcset`, WebP/AVIF, width/height (prevents CLS). | Would remove the need for a hand-written image pipeline. | Videos are not processed. They're handled with ffmpeg separately either way. |
| [WhatsApp — Click to chat](https://faq.whatsapp.com/5913398998672934) | `https://wa.me/<number>?text=<urlencoded>` opens a chat with a prefilled message. | The form can compose a WhatsApp message honestly: the person sees and sends it themselves. No fake "sent" state. | The page body didn't render in a plain fetch (JS-rendered). The URL format is widely documented but should be re-tested on a phone. The number must be confirmed by Velune. |

---

## Decisions

Resolved by Velune (11 Oct 2026):
1. WhatsApp number +91 62353 48787 confirmed for website enquiries.
2. Delivery: WhatsApp only (form composes a wa.me message; no backend).
3. Framework: Astro.
4. Spelling "Kinjal Mehtha"; Nomi Kids Culture included as a sixth project.

Found during build and QA:
- `preload="none"` alone did not stop Chrome fetching ~1 MB of the hero video under reduced motion, so the `<source>` elements are now attached only when playback starts (web.dev lazy-video pattern). Re-tested: 0 video requests under reduced motion.
- `window.open(url, '_blank', 'noopener')` always returns `null` by spec, so it can't detect a blocked pop-up. The form opens without that feature and sets `opener = null` afterwards.

Still open:
- Production domain (canonical, sitemap, absolute OG URLs).
- Public-use permissions for client names and media.
- Typography: Lato Black + EB Garamond italic bridge the logo and the brand book. Revisit if the logo's own typeface is known.
