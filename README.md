# Kompani Alterego — prototype — iteration 6

A no-build website using HTML, CSS and vanilla JavaScript modules. Run from this directory:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. JavaScript modules require HTTP; opening the HTML with `file://` is not supported.

## MOTION SYSTEM

Galaxy Empire scroll motion is optional. Page transitions, the hero and company
profiles keep their existing behavior. All current website copy is unchanged.

- **CSS settings:** `css/motion.css` starts with duration, distance, scale, stagger
  and easing variables. For example, lower `--motion-medium` to speed up reveals,
  or lower `--motion-distance-medium` to reduce upward movement.
- **JavaScript settings:** `scripts/motion.js` starts with `MOTION_CONFIG`, including
  the 900 ms counter duration, intersection threshold and parallax strength/limit.
- **Where effects are applied:** classes in `scripts/pages/production.js` and
  `scripts/production-evidence.js`. Nothing automatically animates every section.

Add a fade with `reveal`, or combine it with a modifier:

```html
<h2 class="reveal reveal-up">Existing heading</h2>
<img class="reveal reveal-scale" src="existing-image.jpg" alt="Existing description">
```

Remove `reveal reveal-up` to make the heading static. Remove just `reveal-up` to
keep the fade. `reveal-scale` starts at 1.025 and settles at 1. No mask or blur is
used. Reveals play once per page visit, not again when scrolling back.

For sequential entrances, put `stagger-group` on a parent and `reveal` on the
children you want to animate. Removing `stagger-group` removes the delays but
keeps those individual reveals. `--motion-stagger` controls spacing between
starts; `maxStaggerSteps` caps long waits. The teaser play icon uses a local
`--motion-order: 3` to follow its poster.

Counters keep the final value in the HTML:

```html
<dd class="motion-counter" data-counter="16000" data-suffix="+">16 000+</dd>
```

JavaScript briefly adds an aria-hidden counting overlay. The original final
value stays available to screen readers and reserves the same space, then the
overlay is removed. Removing `motion-counter` **or** `data-counter` leaves the
final static value. Only the three prologue statistics count; practical data does
not. Returning via browser history renders correct final values before enhancement.

`parallax-image` is used on just the performance and phone images, inside clipping
wrappers named `motion-image-frame`. Remove `parallax-image` from either image to
disable its drift (its entrance reveal can remain). Drift is capped at 12 px and
only runs at 1100 px or wider, while the image is onscreen and the page is scrolling
or resizing. There is no idle animation loop. `timeline-reveal` on the tour list
draws its existing row dividers and briefly shows a node as each year appears;
remove it to restore the original static timeline.

Reduced motion shows complete content and final numbers immediately, with no drift
or timeline animation. Changing the preference while reading also stops motion.
Keyboard focus reveals its containing content immediately. Observers and animation
frames are cleaned up when leaving the page.

No CSS hides content until `mountMotion` succeeds and adds `motion-ready` to the
page. The motion module is loaded separately: a failed import leaves the page and
teaser usable. The two Galaxy Empire HTML entry pages also contain the exact
rendered production as a static fallback, so the production remains readable with
all JavaScript disabled. Other routes retain the prototype's existing JS renderer.
After editing production content or its template, refresh that fallback with:

```sh
node scripts/refresh-production-fallback.mjs
```

This optional helper uses the existing data and renderer; there are no dependencies
or build requirements for running the site.

Iteration 10 files: new `css/motion.css`, `scripts/motion.js` and
`scripts/refresh-production-fallback.mjs`; updated `scripts/pages/production.js`,
`scripts/production-evidence.js`, `scripts/components.js`, `index.js`, `styles.css`,
`index.html`, `galaxy-empire/index.html` and this README. The router addition only
calls page cleanup before replacing content; scene-transition behavior is unchanged.

Verification: 1920/1440 px desktop, 1280 px laptop, 834 px tablet and 430/375/320 px
mobile; no horizontal overflow; fixed-header geometry unchanged across routes and
menu states; one-shot counters and correct values after Back/Forward; timeline
readability; clipped image drift disabled below 1100 px; keyboard teaser activation,
real playback and close; mobile navigation; no normal-page console errors/warnings.
Isolated browser fixtures verified blocked JavaScript, a missing motion module and
a simulated matching reduced-motion preference. Lifecycle checks also exercised a
preference change during a counter, cleanup and missing IntersectionObserver. The
OS preference was not changed. Rendered copy, links/media/accessibility attributes
and both static fallbacks were compared against the current source; protected data,
design styles, navigation, scene transitions, teaser and profile files are unchanged.

## Structure

- `index.html`: shared semantic shell, fixed navigation and mobile menu.
- `galaxy-empire/index.html`, `kompaniet/index.html`, `kontakt/index.html`: copies of the shell so direct links and refreshes work on a plain static server. Keep shell changes in sync.
- `index.js`: route registry, page lifecycle, history and scroll restoration.
- `scripts/navigation.js`: links, current-page indicators, mobile dialog; direct desktop links from 1100 px.
- `scripts/brand.js` and `css/brand.css`: reusable two-part AE symbol and brand lockup, using original PNGs.
- `css/company.css`: ensemble panel layout, individual profile states, mobile composition.
- `scripts/transitions.js`: reusable 800 ms scene curtain; contact fades through black. Reduced motion swaps immediately.
- `scripts/data.js`: production registry, tour dates, company members and contact details.
- `scripts/pages/`: separate page renderers and scoped interaction setup.
- `scripts/components.js`: small shared render functions.
- `styles.css`: global layout, type, navigation and mobile menu.
- `css/themes.css`, `css/pages.css`, `css/transitions.css`: theme tokens, page layouts and transition layer.
- `assets/`: existing assets, unchanged. Real performance images are used directly; no generated photography or logo.

`/` and `/galaxy-empire/` present the current production. `/kompaniet/` and `/kontakt/` are separate scenes. Native links remain real URLs; JavaScript enhances ordinary internal navigation with transitions. Modified clicks still work.

## Add a production later

Add a record to `productions` in `scripts/data.js`, including its path (for example `/productions/new-name/`), theme, imagery and ordered sections. Add theme tokens and a page renderer if its structure differs from Galaxy Empire. Supply a static entry shell at that path, or configure the host to serve `index.html` for application routes. A future `/productions/` listing can read this registry. No CMS is needed. The page functions and content records provide boundaries for a future React migration.

## Deliberately unfinished

- Presentation copy is provisional and based only on the supplied brief.
- Real portraits are integrated. Pål and Fredrik have biographies based strictly on the supplied CV summaries; Jon-Olav and Nikolas remain visibly pending (`biography: null`).
- Seven supplied school quotations are included in full. Research is attributed to the Kulturtanken / Sosiologisk Poliklinikk report, with two individual student quotations and a source link.
- The scenic poster loads the real YouTube teaser only on activation. Closing the player removes its iframe and stops playback.
- Jon-Olav and Nikolas’ biographies and final presentation copy remain pending. The seven supplied non-DKS venues are included. Practical information and real contact details are configured; a separate technical rider is not provided. Instagram and YouTube links are configured; Vimeo is omitted.
- The Ungestemmer excerpt links to the complete review at Scenekunstbruket; the full review was not supplied for inline reproduction. There is no booking form or backend.

## Verification checklist

Check all routes directly and after refresh; back/forward and scroll restoration; curtain direction and contact blackout; mobile menu keyboard focus, Escape and close behavior; profile buttons; teaser player; 320 px, tablet and desktop widths; reduced-motion preference. Keyboard focus is visible, dialogs use native focus handling, and unknown contact/social details are text rather than broken links.

## Brand and ensemble (iteration 2)

The actual brand path is `assets/images/brand/ELogo.png` (capital L). The A and E remain separate images. CSS inverts their black artwork for the dark header and positions a clipped, low-opacity version inside the full-screen menu. `--a-x`, `--a-y`, `--a-scale` and equivalent E variables allow independent placement later. Source images are unchanged.

At 1100 px and above, navigation exposes all three destinations and the ensemble uses four adjacent photographic panels. Hover/focus expands one panel over 550 ms. Click, Enter or Space opens its profile below the group. Below 1100 px, the existing full-screen menu is retained and large portraits stack with profiles immediately below their own panel. Close or Escape returns focus to the triggering portrait. No new routes or global listeners are needed for profiles.

Each person in `scripts/data.js` has a stable `id`, full and short name, role, original image path/dimensions, alt text, image position, biography and `theme`. Theme fields `background`, `ink`, `muted`, and `accent` affect only the ensemble section. Pål uses violet/magenta, Fredrik blue-violet, Jon-Olav deep navy, and Nikolas warm neutrals. Image colors are not filtered. The global reduced-motion rule disables panel transitions and profile reveal motion.

Visual review priorities: the AE spacing and scale; the 1100 px switch to the compact menu; portrait crop/expansion balance; the contrast between the four individual palettes. This iteration deliberately leaves the production pages, routing and scene transitions intact.

Iteration 2 verification: visually checked 1440 px desktop, 1280 px laptop, 834 px tablet, and 390/430/320 px mobile layouts. Checked keyboard panel emphasis, Enter activation, profile close/Escape focus return, menu close/Escape and desktop resize, direct navigation, browser Back/Forward, image loading and browser error logs. Reduced-motion scene/blackout branches were exercised with a matching preference stub, and the global CSS override was checked; the OS motion preference was not changed. Original asset and protected page/router/transition checksums match the pre-iteration baseline.

## Refinement and content (iteration 3)

- `scripts/pages/company.js`, `css/company.css` and `scripts/data.js`: compact mobile face panels with configurable `facePosition` / `faceScale`, vertical expansion and one open profile at a time. Desktop expansion is retained, with full names wrapping in narrow panels.
- `scripts/components.js`, `scripts/pages/contact.js` and `css/brand.css`: reuse the separate AE elements in the footer and as a Contact signature; real social links open securely in new tabs.
- `css/themes.css`, `styles.css` and `css/brand.css`: local Pacifica Condensed (`font-display: swap`) via `--brand`, limited to company identity. Main display and metadata typography remain unchanged. The navbar uses 20–24 px for legibility.
- `scripts/teaser.js`, `scripts/pages/production.js`, `scripts/data.js` and `css/pages.css`: activate the real teaser behind the scenic poster; no iframe on initial load. The responsive player reserves a minimum height of 200 px for usable controls on narrow screens. It supports fullscreen and offers a direct YouTube link.
- `scripts/content/galaxy-feedback.js`, the production renderer and page styles: all seven supplied quotations, complete and attributed; only the authorized “froestillingen” correction. No shortened excerpts. Research markup is unchanged.
- The hero attribution now reads “Presenterer”. Section anchors `#teaser` and `#respons` allow direct preview links.

The routing, navigation and main scene-transition JavaScript remain unchanged. Source images, logos and the supplied font are unchanged. Biographies, research, email/phone and practical information remain intentional placeholders.

Iteration 3 verification: checked 1440/1280/834/430/375/320 px layouts, mobile expansion/collapse and direct switching in both directions, desktop keyboard expansion, focus return, menu navigation, Back/Forward, footer contrast, font loading and secure external social tabs. Confirmed real teaser playback on desktop and at 320 px, including stopping playback on close and no initial iframe. All seven quotations fit narrow screens after a long-word wrap fix. Reduced-motion JS branches were exercised with a matching-preference stub and the CSS animation/transition override was checked; the OS preference was not changed. Browser logs contained no errors/warnings in the final checks.


## Content and DKS evidence (iteration 4)

- `scripts/content/galaxy-evidence.js` adds company-supplied track-record figures, report metadata/student quotations, and the supplied Ungestemmer review excerpt.
- `scripts/production-evidence.js` renders distinct research, review and school-feedback areas. Two school comments are featured; five more remain complete inside a native keyboard-accessible disclosure. The full review is linked through “Les hele anmeldelsen”.
- `scripts/pages/production.js` adds the statistical interlude after the prologue, updates the hero label and teaser heading, and ends after practical information with a concise contact CTA. Section 08 is removed.
- `scripts/data.js` contains the supplied practical values and contact details. Nikolas uses dark warm taupe with light text; his text colors exceed 4.5:1 contrast against the theme background.
- `scripts/components.js` updates the footer tagline while preserving the AE symbol. `scripts/pages/contact.js` uses the real email/telephone links and the shorter secondary descriptor.
- `css/pages.css` adds responsive styling for these content areas, removes unused booking/old research rules, and keeps the contact email readable at 320 px.

The source report was checked against the supplied claims. Research interpretation, individual student quotations, school comments and the review are visibly distinguished. The production can prompt reflection; no claim of proven learning outcomes is made.

Verification: inspected desktop (1440 px), tablet (834 px), and mobile (430/375/320 px); confirmed no horizontal overflow, school disclosure by keyboard and pointer, all seven complete quotations, every practical value, footer adjacency, real mailto/tel links, menu navigation, browser Back/Forward, desktop navigation and Nikolas' mobile/desktop profile. Confirmed no initial video iframe and successful player creation/removal. Browser logs were free of errors/warnings. Reduced-motion scene branches were exercised with a matching-preference stub and the existing CSS override was checked; the OS preference was not changed. Checksums confirm the router, navigation, scene transitions, teaser logic, school feedback source, company layout CSS and brand/font styles remain unchanged.


## Content, visual pacing and polish (iteration 5)

- `styles.css`: `scrollbar-gutter: stable` reserves space at the root. No JavaScript measurement or fallback was needed in the tested browser. Fixed-header coordinates were identical with and without a vertical scrollbar; header and content widths also stayed identical when the tablet menu opened and closed.
- `css/pages.css`: section 05 uses a flat icy periwinkle field (#cbd5e8) and scoped dark text/accent variables. Text contrast ranges from 5.44:1 to 10.52:1. The existing review, school-comment and research grids remain intact. Additional venue rows remain visually secondary to the DKS timeline.
- `scripts/production-evidence.js`: the study scope now precedes the observations. Student quotations explicitly identify individual pupils from the report. The report link, review excerpt and school comments are preserved; no educational effects are claimed.
- `scripts/data.js`: concise Norwegian biographies for Pål and Fredrik use only the user-supplied CV summaries; no CV files were found in the project. Seven supplied venues are data-driven. The practical fields retain the supplied values, with final punctuation restored for “Har eget utstyr.”
- `scripts/pages/production.js`: replaces the venue placeholder with the compact list. `scripts/content/galaxy-evidence.js` corrects the label to “DKS-turnéer”; the existing statistics remain unchanged.
- `scripts/pages/company.js`: keeps full profile names and uses the neutral “Se profil” affordance. The interaction logic and portrait/theme system remain unchanged.

Verification: visually checked desktop (1440 px), tablet (834 px) and mobile (430/320 px), including the teaser-to-research color break, statistics, venue rows, practical information and biographies. Checked keyboard profile activation, direct profile switching, disclosure expansion, menu open/Escape/close and unchanged navbar geometry. No horizontal overflow or browser errors/warnings were found. Confirmed all seven school comments, both student quotes and the review excerpt remain complete, along with the current teaser URL. Protected-section comparisons and checksums confirm the hero, prologue, story, teaser, practical-section layout, router, navigation, transitions, Contact renderer, footer, Pacifica and brand styles were preserved.


## Biographies, research cleanup and rhythm (iteration 6)

- `scripts/data.js`: Pål and Fredrik now have paragraph-based biographies and data-driven selected works (six and four respectively). Content uses only the supplied Iteration 6 facts. Pål is explicitly a former performer and current producer; Fredrik’s profile leads with stage technology. Boombox and The Text are omitted. Jon-Olav and Nikolas retain their biography placeholders and have no invented selected works.
- `scripts/pages/company.js` and `css/company.css`: render biography paragraphs and an editorial selected-work list below the existing profile. Two columns on desktop/tablet, one on narrow mobile. Existing portrait controls, themes and interaction logic are unchanged.
- `scripts/pages/production.js` and `scripts/data.js`: current credits identify Jon-Olav S. Gulbrandsen as Commander Pholdahl and Pål André Holdahl as producer. The existing tour history, venues and archival photography are preserved.
- `scripts/production-evidence.js` and `css/pages.css`: replace repeated research text with a brief introduction, the existing reflection heading and individual student quotations, then one attribution/context/report CTA. The icy background, review excerpt and all seven school comments are preserved.
- `styles.css` and all four HTML shells version the changed company stylesheet and its entry stylesheet to avoid stale browser imports. The stable scrollbar gutter is unchanged.

Verification: desktop 1440 px, tablet 834 px and mobile 320 px; multi-paragraph biographies and selected works; keyboard activation/close, direct profile switching and one open profile at a time; shorter research presentation; current production credits; no horizontal overflow. Header coordinates matched on long and short routes and with the menu open/closed. External destinations were checked: report PDF, Ungestemmer review, company Instagram, YouTube channel and current teaser all resolve; new-tab links retain `noopener noreferrer`. Contact email/telephone links remain correct. Browser error/warning checks were clean. Protected-file checks and a comparison of `mountCompany` confirm routing, transitions, portrait interaction logic, teaser, Contact, footer, font styles and source quotations remain unchanged.
