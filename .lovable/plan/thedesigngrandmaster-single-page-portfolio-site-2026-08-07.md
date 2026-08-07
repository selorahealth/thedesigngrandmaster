# thedesigngrandmaster — single-page portfolio site

Build the site exactly to the uploaded spec: AGR-style structure and pacing, Loro-style hero, chess vocabulary as functional section labels, near-black canvas with one violet accent.

## Design system

- Background #0A0A0A, text #F4F2ED, single accent violet #6E3AFF, all as semantic tokens in `src/styles.css` (no hardcoded color utilities in components).
- Type: Bricolage Grotesque (display), Montserrat (body), JetBrains Mono (meta labels, eyebrows, dates, tags). Loaded via `<link>` in the root route head.
- Mix of sharp and soft edges, generous whitespace, no neubrutalist borders or offset shadows.
- Copy rule enforced throughout: sentence case, no filler words, no em dashes.

## Page sections (single page, `/`)

1. Nav — fixed, transparent over hero, solid on scroll. Wordmark with pawn glyph, links Work / Repertoire / Process / Contact, filled CTA "Start a project."
2. Hero "OPENING MOVE" — two columns; left headline, one supporting line, filled + ghost buttons; right the glass queen render on a dark gradient with violet glow, slow parallax, floating stat chips.
3. "OPENING BOOK" — muted wordmark strip, brightens on hover.
4. "THE BOARD" — 2-column project grid, cover mockups with bottom gradient overlay holding name, category, year; hover lift + 1.03x image scale + VIEW cursor. Ghost "View all work."
5. "REPERTOIRE" — left approach paragraph, right expandable service rows (Brand identity, Web design, Web engineering, Product design, Growth).
6. "THE GAME PLAN" — four stages (The opening, Development, The middlegame, The endgame) with thin rules that fill on scroll.
7. Stats band — three large display numbers with mono labels.
8. "POST-GAME ANALYSIS" — three testimonial cards, quote large, attribution in mono with avatar.
9. "MAKE YOUR MOVE" — two engagement cards: Monthly partnership, Fixed project (marked Popular), feature lists and CTAs.
10. "OPENING QUESTIONS" — accordion, 5 questions, thin dividers.
11. "CHECKMATE" — full-bleed closing CTA, faded queen echo behind, "Book a call."
12. Footer — mono type, contact line, nav columns, newsletter signup, bottom bar with copyright and socials.

## Interaction

- Custom cursor: 14-16px accent dot with 1px ring at 40%, spring lag; expands to ~65px with `mix-blend-mode: difference` and contextual label (VIEW / OPEN / arrow). `cursor: none` on desktop, fully disabled on touch.
- Footer link hover: stacked text layers, clip-path color swap sliding up plus 1px underline scaling 0→100%, 380ms cubic-bezier(0.65, 0, 0.35, 1).
- Section entrances fade/slide up 400-600ms, staggered 60-80ms. `prefers-reduced-motion` disables parallax and stagger, keeps fades.

## Imagery

- Generate the glass chess queen hero render from the spec prompt (violet to electric blue refraction, amber edge, caustics on dark reflective surface), reused faded in the closing CTA.
- Generate project cover mockups from the uploaded mockup prompt sheet, one per project, using each prompt as written (device-in-scene, moody lighting, shallow depth of field): Suise, A01Luxe, Pulse Talks, Women in Leadership, Interior, Selorah Health, SyncStep, Toju, FixBase, RektPay, Solarib, Webre, Haus, Newmanstores Collections.
- The board grid shows six covers up front (Suise, A01Luxe, Pulse Talks, Toju, Haus, RektPay), with the rest generated and available; "View all work" reveals the full set.
- Each card links to its live URL from the prompt sheet, with category and year in mono type. Stats reflect the real count: 14 projects shipped.


## Backend (Lovable Cloud)

- Enable Lovable Cloud.
- Two tables: `project_inquiries` (name, email, company, budget, message) and `newsletter_subscribers` (email, unique).
- Anonymous insert-only policies plus grants; no public read. Reads restricted to service role so submissions aren't exposed.
- Submissions go through TanStack server functions with Zod validation (trim, length caps, email format) on both client and server; duplicate newsletter emails resolve quietly as success.
- "Start a project" / "Book a call" open a contact dialog wired to the inquiry table; footer newsletter field wired to subscribers. Sonner toasts for success and error states, `<Toaster />` mounted in the root route.

## Technical notes

- Single route at `src/routes/index.tsx` replacing the placeholder, with its own `head()`: unique title, description, og/twitter tags, plus `og:image` once the hero render has an absolute URL.
- Sections split into focused components under `src/components/`; cursor and scroll-reveal logic as small hooks.
- Fonts via root-route `<link>`, never a CSS `@import` of a remote URL.
- Images created with the image generator and imported as ES6 assets.
