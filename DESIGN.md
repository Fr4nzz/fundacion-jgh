# Design

## Source of truth
- Status: Active
- Last refreshed: 2026-08-26
- Primary product surfaces: The bilingual Fundación José Gregorio Hernández website and its new top-level Gallery route (`#/galeria`).
- Evidence reviewed:
  - Observed repository implementation: `src/App.tsx`, `src/index.css`, `src/components/layout/*`, `src/components/shared/*`, `src/pages/FundacionPage.tsx`, `src/i18n/**`, `src/lib/animations.ts`, `vite.config.ts`, and `package.json`.
  - Observed production surfaces: `https://josegregoriohernandez3m.org` and `https://josegregoriohernandez3m.org/#/la-fundacion` at desktop and mobile sizes, in Spanish and English.
  - Observed media: all eleven files ultimately present in `/home/franz/Downloads/fundacionjgh/`, using metadata inspection, representative frames, and contact sheets stored under `.omx/artifacts/gallery/media-review/`. A long monthly-Mass video appeared after the initial ten-file inventory and was inspected separately.
  - Requested source discrepancy: six of the seven named files are present; `Cumpleaños del Presidente Jose Amable.mp4` is absent. Five additional videos are present but are outside the requested candidate list and are not assumed to be substitutes.
- Fact/inference convention: statements prefixed **Observed** come directly from code, live pages, or visible media. Statements prefixed **Design decision** are implementation choices. Statements prefixed **Assumption** remain subject to Franz's review.

## Brand
- Personality:
  - **Observed:** reverent, community-centered, compassionate, devotional, and connected to service in the legacy of José Gregorio Hernández.
  - **Design decision:** the gallery should feel like an editorial record or quiet visual testimony, not a portfolio, feed, or asset library.
- Trust signals:
  - Honest documentary media, restrained captions, observable descriptions, bilingual parity, accessible playback, and consistent foundation identity.
  - **Observed:** the current site uses real community imagery, a blue/gold identity, and calm explanatory copy.
- Avoid:
  - Generic uniform card grids, social-media-feed patterns, commercial portfolio language, AI/SaaS aesthetics, excessive glass or glow, kitschy halos, unsupported religious symbols, sensational claims, and invented names/dates/outcomes.

## Product goals
- Goals:
  - Add a discoverable bilingual Gallery destination without diluting `La Fundación`.
  - Present prayer, community, preparation, service, and celebration as a coherent editorial record.
  - Make mixed-orientation images and videos dignified, usable, and maintainable.
  - Preserve fast initial rendering through posters and conservative video preload behavior.
- Non-goals:
  - Rebuilding the wider site, duplicating the Foundation page, publishing every available file, or creating a lightbox/social interaction system.
  - Identifying people, dates, ceremonies, outcomes, or locations that are not supported by filenames and visible evidence.
- Success signals:
  - `#/galeria` works from desktop and mobile navigation in both languages.
  - The page has a clear editorial hierarchy, readable captions, appropriate media crops, native controls, visible focus, and no autoplay.
  - Desktop and mobile screenshots feel cohesive with the production identity without copying its layout mechanically.

## Personas and jobs
- Primary personas:
  - Community members and devotees seeking a respectful record of foundation life.
  - New visitors learning how prayer and service appear in practice.
  - Spanish- and English-speaking supporters reviewing the foundation's activities.
- User jobs:
  - Understand the character of the community quickly.
  - Browse a small number of meaningful moments without decoding filenames.
  - Play selected videos intentionally and switch languages without losing context.
- Key contexts of use:
  - Mobile-first browsing on potentially limited connections, plus desktop review and local visual approval.

## Information architecture
- Primary navigation:
  - Spanish: `Galería`; English: `Gallery`; route: `#/galeria`.
  - **Observed:** one `NAV_LINKS` array supplies both desktop and mobile navigation.
- Core routes/screens:
  - Preserve the existing hash-router route family and add `galeria` as a sibling destination.
- Content hierarchy:
  1. A concise gallery introduction and one wide documentary feature.
  2. Three editorial movements: Oración, Devoción y servicio, and Comunidad.
  3. A restrained closing reflection rather than a sales CTA.
- **Design decision:** no footer route list will be invented solely for Gallery because the current footer has no route-navigation pattern. Discovery is handled consistently through the shared desktop/mobile navigation.

## Design principles
- Quiet radiance: use light, blue, and gold as atmosphere and punctuation, never spectacle.
- Documentary honesty: captions describe what is visible and distinguish filename-supplied context from observation.
- Editorial rhythm over inventory: vary scale and alignment to establish meaning while keeping the collection concise.
- Native media, thoughtfully framed: preserve portrait video without aggressive cover cropping; use posters and intentional play.
- Mobile dignity: stacked media should remain composed and touch-friendly, not collapse into a long repetitive card feed.
- Tradeoffs:
  - A selective gallery is preferable to completeness when media quality, authorization, or context is uncertain.
  - Existing tokens/components take priority over a new design-system layer, even when that limits bespoke ornament.

## Visual language
- Color:
  - **Observed:** navy/deep blue, primary blue, muted blue, pale sky/mist, warm white, and restrained gold are existing tokens.
  - **Design decision:** alternate warm paper-like reading fields with pale sky sections; reserve deep blue for a short closing band or media surround.
- Typography:
  - **Observed:** Playfair Display for display/quotational text and Inter for UI/body text.
  - Use serif headings and short italic editorial lines; use sans-serif captions and controls.
- Spacing/layout rhythm:
  - Generous section spacing, narrow reading measures, and a controlled desktop editorial spread. Avoid repeating identical card gaps.
- Shape/radius/elevation:
  - Existing rounded surfaces and subtle shadows; media frames may use moderate radius and fine gold/blue rules. Avoid heavy card chrome.
- Motion:
  - Reuse existing directional/staggered Motion variants sparingly. Never animate playback surfaces continuously.
  - Reduced-motion preferences disable nonessential entrance and ambient effects.
- Imagery/iconography:
  - Real community and devotional material is primary. Decorative treatment is limited to light gradients, fine rules, and small existing Lucide icons.

## Components
- Existing components to reuse:
  - `PageLayout`, `Navbar`, `Footer`, `LanguageToggle`, `SectionContainer`, `SectionHeading`, shared Motion variants, and repository theme utilities.
- New/changed components:
  - `GalleryPage` and a small structured gallery data model.
  - A reusable editorial media figure capable of image/video rendering, poster support, bilingual labels, native controls, and portrait/landscape framing.
  - `Navbar` and i18n registration receive minimal additions.
- Variants and states:
  - Featured image, portrait video, and standard editorial video arrangements; native playing/paused/error behavior.
- Token/component ownership:
  - Existing global tokens remain authoritative. Gallery-specific classes belong in the page/component unless a utility is demonstrably shared.

## Accessibility
- Target standard:
  - WCAG 2.2 AA-oriented implementation within the current stack.
- Keyboard/focus behavior:
  - All navigation and native video controls remain keyboard-operable; visible `:focus-visible` rings must not be removed.
- Contrast/readability:
  - Captions use dark text on warm/light fields or white on deep blue with sufficient contrast. Gold is decorative/accent, not body text on white.
- Screen-reader semantics:
  - One page `h1`; logical heading order; gallery media as `figure`/`figcaption`; honest image alt text; descriptive video `aria-label`; decorative marks hidden.
- Reduced motion and sensory considerations:
  - Respect `prefers-reduced-motion`; no autoplay, flashing, parallax, or essential information conveyed only through motion.

## Responsive behavior
- Supported breakpoints/devices:
  - Current Tailwind breakpoints, with explicit checks near 390px mobile and 1440px desktop.
- Layout adaptations:
  - Desktop uses one wide feature followed by alternating/asymmetric editorial pairs.
  - Mobile becomes a deliberate single-column sequence with media-first ordering, consistent caption spacing, and portrait videos constrained to a comfortable viewport height.
- Touch/hover differences:
  - Native video controls and navigation remain touch-friendly; hover embellishments must not carry unique meaning.

## Interaction states
- Loading:
  - Posters/images provide immediate visual context; videos use `preload="metadata"` or `none` and never autoplay.
- Empty:
  - Not applicable to the curated static first edition; structured data should make an empty state straightforward if future content becomes dynamic.
- Error:
  - Native video fallback text should remain meaningful; alt/caption copy still communicates context if an image fails.
- Success:
  - Intentional video playback uses native browser feedback.
- Disabled:
  - No custom disabled controls are planned.
- Offline/slow network:
  - Optimized images/posters load eagerly only where necessary; non-feature images are lazy; video payloads are not fetched wholesale on first render.

## Content voice
- Tone:
  - Warm, dignified, factual, concise, and devotional without melodrama.
- Terminology:
  - Use `José Gregorio Hernández`, `comunidad`, `oración`, `servicio`, and `preparación` only where supported.
- Microcopy rules:
  - Public labels are editorial, not raw filenames.
  - Do not call visible participants by name or attribute roles unless verified.
  - Filename-supplied locations may be used conservatively when the filename is the only evidence; descriptions should not add unsupported detail.
  - English translations preserve scope and certainty rather than embellishing.

## Implementation constraints
- Framework/styling system:
  - React 19, TypeScript, Vite, Tailwind CSS 4, Radix/shadcn conventions, Motion, i18next, and React Router hash routing.
- Design-token constraints:
  - Reuse `src/index.css` tokens and existing utilities; add no dependency or competing design system.
- Performance constraints:
  - Gallery images, posters, and MP4 files are delivered from the Cloudflare R2 custom origin `https://media.josegregoriohernandez3m.org/gallery/` using immutable cache headers and byte-range support for video playback.
  - Keep media URLs centralized in the structured gallery data. Do not commit generated gallery media copies under `public/` while R2 is authoritative.
- Compatibility constraints:
  - Preserve `HashRouter`; direct asset URLs must work with Vite's configured base path and GitHub Pages-style hosting.
- Test/screenshot expectations:
  - Run `npm run lint` and `npm run build`; there is no repository test script.
  - Verify desktop/mobile navigation, language switching, images, posters, native playback, focus behavior, reduced motion, and production-style paths in a real browser.
  - Store review evidence under `.omx/artifacts/gallery/` and leave a local preview running, preferably at port 4173.

## Open questions
- [ ] Franz: Is the missing `Cumpleaños del Presidente Jose Amable.mp4` expected under another filename? Impact: it is omitted rather than substituted.
- [ ] Franz: Are the five extra videos in the source directory approved for public use, particularly footage showing children, donor branding, and the newly added long Mass recording? Impact: excluded from this initial safe gallery.
- [ ] Franz: Should the social-media screenshot for Cotundo be replaced by the original photograph? Impact: current screenshot is omitted because its interface chrome weakens presentation and provenance.
- [ ] Franz: After reviewing the desktop/mobile screenshots, is the preferred balance more devotional (sacred space) or more documentary (community/service)? Impact: useful input for a later Visual Ralph refinement.
