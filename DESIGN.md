---
name: Dakdot
description: A monochrome ink studio page where colour arrives only as whole service fields and the Dakdot dot is alive.
colors:
  ink: "#0b0d10"
  ink-3: "#1a1e25"
  rule: "#262b33"
  rule-strong: "#3a404a"
  paper: "#e9ecef"
  mute: "#9aa1ab"
  field-dev: "#db1f2b"
  on-dev: "#ffffff"
  field-design: "#274595"
  on-design: "#ffffff"
  field-motion: "#f2c230"
  on-motion: "#0b0d10"
  signal: "#db1f2b"
  signal-hover: "#c41724"
  error-text: "#ff5a63"
  focus-ring: "#f2c230"
  whatsapp: "#25d366"
typography:
  display:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.4rem, 9.4vw, 9rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.045em"
  display-close:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 10vw, 9.5rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  title-field:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.6vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.035em"
  title-row:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.6vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  lede:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.25
  small:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  pill: "999px"
  field: "24px"
  preview: "18px"
  thumb: "14px"
  chip-sm: "8px"
spacing:
  container: "88rem"
  gutter: "1.5rem"
  header: "4.5rem"
  field-stack: "0.75rem"
  field-pad: "2.5rem 2.25rem"
  field-pad-mobile: "2rem 1.5rem"
  section: "6rem"
  section-lg: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.on-dev}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.45rem"
  button-primary-hover:
    backgroundColor: "{colors.signal-hover}"
  button-primary-lg:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.on-dev}"
    rounded: "{rounded.pill}"
    padding: "1.25rem 2rem"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.45rem"
  button-ghost:
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.45rem"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.45rem"
  field-dev:
    backgroundColor: "{colors.field-dev}"
    textColor: "{colors.on-dev}"
    rounded: "{rounded.field}"
    padding: "{spacing.field-pad}"
  field-design:
    backgroundColor: "{colors.field-design}"
    textColor: "{colors.on-design}"
    rounded: "{rounded.field}"
    padding: "{spacing.field-pad}"
  field-motion:
    backgroundColor: "{colors.field-motion}"
    textColor: "{colors.on-motion}"
    rounded: "{rounded.field}"
    padding: "{spacing.field-pad}"
  cursor-badge:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "4.25rem"
  input-underline:
    textColor: "{colors.paper}"
    padding: "0.6rem 0"
  preview-float:
    backgroundColor: "{colors.ink-3}"
    rounded: "{rounded.preview}"
    width: "22.5rem"
---

# Design System: Dakdot

## Overview

**Creative North Star: "The Living Dot"**

Dakdot is an ink-black studio page with one character on it. The dot in the wordmark is alive: a large paper disc with ink eyes that leans toward the pointer on a spring, squashes and stretches with its speed, blinks, boings when poked, and on scroll travels up to dock into the header logo, where it becomes the logo's dot again. Everything else on the page is quiet so that Dot and the type can be loud: a monochrome ink ground, paper text, one heavy grotesk set very large and very tight, and generous dark space between sections.

Colour is not an accent here. It arrives only as whole fields, one per service: Web Development is flooded brand red, Motion is flooded yellow, Brand Design is flooded brand blue (#274595) with white text. Outside those fields the page is ink, paper and grey, with the single exception of the red action fill on the primary button. Motion is rich but quick, and it never costs content: every heading and block is visible before JavaScript runs, reveals arm only for content still below the fold, and reduced motion or `?still` gives a still Dot and a still page.

The client rejected the previous direction for scattering colour and for its transit-line and route-map vocabulary. Thin hairline dividers remain part of this world (the work list and footer use them); route rails, line-coloured strokes and station metaphors do not.

**Key Characteristics:**
- Monochrome ink ground (ink) with paper text and mute grey secondary copy.
- Colour only as whole-section fields with their own paired text colour.
- One family, Schibsted Grotesk, headings at 800 with tight negative tracking.
- Pill buttons with a rolling label, a rotating arrow and a magnetic pull.
- A contextual cursor badge that names the action under the pointer.
- Split-word and scroll reveals that arm only below the fold.
- Dot, the living logo dot, as the brand character.

## Colors

A near-black ink ground and a cool paper white carry the page; three saturated fields and one red action fill carry all the colour.

### Primary
- **Dakdot Signal Red** (signal): the fill of the primary "Book a call" button, the only colour allowed outside a field. White label text clears 4.5:1 on it. Hover deepens to **Signal Red Deep** (signal-hover).
- **Web Development Field Red** (field-dev, with on-dev white text): the whole Web Development service field. The same red as the signal, by design: the action and the software service share the brand red. Also the caret colour of form inputs.

### Secondary
- **Motion Field Yellow** (field-motion, with on-motion ink text): the whole Motion service field. The same yellow is the global keyboard focus ring (focus-ring), which reads clearly on ink.

### Tertiary
- **Design Field Blue** (field-design `#274595`, with on-design white text, about 8.7:1): the Brand Design field and Brand's small accent in illustrations (a swatch, the mark's dot).

### Neutral
- **Ink** (ink): page, header-on-scroll and mobile-sheet background; eye colour on Dot.
- **Ink Raised** (ink-3): the placeholder ground behind media (hover preview, mobile thumbnails) before it loads.
- **Hairline** (rule): 1px dividers between work-list rows, above the footer, above the contact facts; the scrollbar thumb.
- **Hairline Strong** (rule-strong): 1px outlines on interactive things at rest: ghost buttons, outlined arrow circles, the menu toggle, mobile service chips, and input underlines.
- **Paper** (paper): all primary text on ink, the light button, the cursor badge, Dot's body.
- **Mute** (mute): sub-copy, ledes, meta lines, labels, form placeholders and the footer base line.
- **Error Red** (error-text): form error messages and the underline of an invalid field. A lighter red than the signal so small text clears 4.5:1 on ink.
- **WhatsApp Green** (whatsapp): only inside the WhatsApp mark. It appears nowhere else.

### Named Rules
**The Field Rule.** Colour lives on whole sections, never as scattered accents. A service gets its colour as a full rounded field with its paired text colour (`--color-field-*` / `--color-on-*`); text, borders, icons and decorations on ink stay ink, paper or grey. The only colours permitted outside a field are the signal fill on the primary action, the yellow focus ring, error red on form errors, and the WhatsApp mark's own green.

**The Paired Text Rule.** Inside a field, every element (title, copy, chips, arrow circle, focus outline) is drawn in that field's `--color-on-*` colour or its inverse. Never place paper text on the Motion field, or ink text on the Development field.

## Typography

**Display Font:** Schibsted Grotesk (self-hosted variable woff2, weights 400 to 900, with ui-sans-serif, system-ui fallback)
**Body Font:** Schibsted Grotesk
**Label/Mono Font:** none; numbers use `.tnum` tabular figures where they count.

**Character:** One heavy newspaper grotesk does everything. Headings sit at 800 with tracking pulled to -0.035em to -0.045em and line heights under 1, so they read as dense slabs; body copy stays at 400 with an easy 1.55 leading.

### Hierarchy
- **Display** (800, clamp(3.4rem, 9.4vw, 9rem), 0.9): the hero headline, one per page, set as stacked lines. Its last word may roll through alternatives.
- **Display Close** (800, clamp(3rem, 10vw, 9.5rem), 0.92): the closing call-to-action heading ("Got a project in mind?"), capped at 12ch.
- **Headline** (800, clamp(2.5rem, 6vw, 5rem), 0.98): section headings, balanced, usually split-word revealed.
- **Title Field** (800, clamp(2rem, 3.6vw, 3.25rem), 1): the service name inside a colour field.
- **Title Row** (800, clamp(1.75rem, 3.6vw, 3rem), 1.05): project names in the work list.
- **Lede** (400, 1.15rem, 1.55): hero sub-copy and section ledes, in mute, 40 to 44ch.
- **Body** (400, 1rem, 1.55): descriptions, max about 48ch.
- **Label** (600, 1rem): button labels, nav links at 500, row meta actions.
- **Small** (500, 0.85rem): chips, form errors, footer column heads and base line.

### Named Rules
**The One Voice Rule.** One family, Schibsted Grotesk, at every level. Hierarchy comes from size, weight 800 versus 400, and tracking, never from a second typeface.

**The Tight Slab Rule.** Any heading at headline size or above uses weight 800, negative tracking of at least -0.035em, and line height at or below 1.

## Layout

Every section sits in one centred container: 88rem max width with a 1.5rem side gutter (`max-width: 88rem; margin: 0 auto; padding-inline: 1.5rem`). Header bar, hero, sections and footer all share it, so their left edges align. The header is a 4.5rem fixed bar, transparent over the hero and ink once the page scrolls.

The hero fills the first viewport (100svh) with content anchored to the bottom: headline lower left, sub-copy and the two CTAs bottom-left above the fold, a short note about Dot at bottom right, and Dot itself large at upper right (min(36vw, 33rem)). Below 760px Dot drops into the flow at the right (58vw) and overlaps the headline.

Section rhythm is generous: 6rem to 8rem of vertical padding per section on ink. Intros use asymmetric two-column grids (7fr / 5fr for heading and lede, 5fr / 7fr for contact details and form) that collapse to one column at 860 to 900px. Service fields stack with a tight 0.75rem gap, so the three colours read as one band. Breakpoints in use: 560px, 760px, 860px, 900px.

## Elevation & Depth

The system is flat. Surfaces are ink, fields are flat colour, and depth comes from colour contrast and from motion (Dot floating above the page with `mix-blend-mode: difference`, the fixed header, the cursor badge). The single shadow belongs to the cursor-following project preview, which floats above the list.

### Shadow Vocabulary
- **Float** (`box-shadow: 0 30px 60px -20px rgb(0 0 0 / 0.75)`): only the hover preview that follows the pointer over the work list.

### Named Rules
**The Flat Field Rule.** Fields, buttons, chips and cards carry no shadow. Only something that physically follows the pointer above the page may cast one.

## Shapes

Two shapes do almost all the work: the full pill (999px) for every button, chip, cursor badge and menu toggle, and the 24px field radius for colour fields and paper panels. Circles (50%) carry arrows and Dot. Media is softer and smaller: 18px on the floating preview, 14px on mobile thumbnails. Inputs have no box at all, only a 1px underline. Arrows are inline stroked SVG (1.6 to 1.8 stroke) that rotate -45deg on hover.

## Components

### Buttons (RollButton)
Tactile and quick; every button is a pill that rolls and leans.
- **Shape:** full pill (999px); 1px border slot always reserved.
- **Sizes:** md (0.9rem 1.45rem padding, 1rem label) and lg (1.25rem 2rem, 1.2rem label, used for form submit).
- **Primary:** signal red fill, white label. **Light:** paper fill, ink label (header CTA). **Ghost:** transparent, Hairline Strong outline, paper label; hover turns the outline paper. **Ink:** ink fill, paper label, for use on paper or yellow fields.
- **Rolling label:** the label is rendered twice in a 1.25em clipped box; on hover and on focus-visible the first copy rolls up out and the second rolls in from below (0.5s ease-out). A visually hidden copy carries the accessible name.
- **Arrow:** a trailing stroked arrow rotates -45deg on hover. An optional leading icon slot (1.15em), used for the WhatsApp mark.
- **Magnetic pull:** with a fine pointer the whole button translates toward the pointer at 0.28 of its offset and springs back on leave.
- **Active / disabled:** scales to 0.97 on press; disabled drops to 0.6 opacity with a progress cursor.
- **Cursor:** every button may name its action for the cursor badge (`cursor="Let's talk"`).

### Service Field Row (ServiceRows)
The signature section: one full-bleed colour field per service.
- **Field:** 24px radius, background and text from the service's field / on pair, padding 2.5rem 2.25rem (2rem 1.5rem on mobile), stacked with 0.75rem gaps.
- **Grid:** name (Title Field) / description plus capability chips / project count plus arrow circle, in 4fr / 5fr / 3fr; single column below 860px.
- **Hover:** the name slides 0.6rem right, the chips fill with the on colour one after another (40ms stagger), the 3.25rem arrow circle (on-colour disc, field-colour arrow) grows to 1.12 and the arrow turns -45deg.
- **Focus:** a 3px outline in the on colour, drawn 8px inside the field because the field clips.
- **Reveal:** instead of fading, each field wipes in left to right with a clip-path (1s, 60ms stagger).

### Chips
- **On a field:** small (0.85rem, 500), pill, 0.35rem 0.75rem, 1px border at 30% of the on colour; filled with the on colour on row hover.
- **On ink:** pill, Hairline Strong outline, paper text (mobile menu service links).

### Work List (WorkList)
- **Rows:** hairline-divided, 2rem vertical padding; project name (Title Row) / mute meta line / 3rem outlined arrow circle.
- **Hover:** the name slides 1rem right; other rows dim to 0.3 opacity; the circle fills paper with an ink arrow.
- **Preview:** on fine pointers a 22.5rem 4:3 media frame (18px radius, Float shadow) follows the cursor with a lag and tilts up to 12deg with horizontal speed; media cross-fades and settles from 1.12 scale. On mobile each row shows an inline 16:10 thumbnail instead.

### Inputs / Fields (Contact form)
- **Style:** no box, transparent background, 1px Hairline Strong underline, paper text at 1.15rem, signal-red caret.
- **Label:** a floating label in mute that lifts 1.6rem and scales to 0.78 in paper when the field is focused or filled.
- **Focus:** the underline turns paper and a 2px paper bar draws in from the left (0.5s). The global outline is suppressed on the input itself because the bar carries focus.
- **Error:** underline and message in Error Red, message at 0.85rem below the field; the first invalid field receives focus.
- **Success:** the form is replaced by an ink-3 panel with a hairline border (24px radius, paper text).

### Navigation (Header)
- **Bar:** fixed, 4.5rem, container-aligned; logo left, three text links, Light RollButton CTA right; gains an ink background after 8px of scroll.
- **Links:** paper, 500 weight, with the same two-copy rolling hover as buttons; the current page is marked with a 5px paper dot under the link.
- **Mobile (below 760px):** links and CTA hide; an outlined pill "Menu" toggle with a two-bar burger that crosses into an X opens a full-height ink sheet with huge 800-weight links that rise in sequence, service chips, and a primary CTA.

### Cursor Badge (Cursor)
A paper disc offset 14px from the pointer that scales up from 0 into a labelled pill (min 4.25rem round, 0.8rem 600 ink text) over any element carrying `data-cursor="Label"`, and scales away elsewhere. It follows with a 0.22 lerp. Fine pointers only; the native cursor stays visible, so nothing depends on it. Labels are short verbs or invitations: "Explore", "View", "Open", "Chat", "Send", "Boop".

### Dot (LivingDot)
The brand character: the dot from the Dakdot wordmark, alive.
- **Body:** a paper circle with `mix-blend-mode: difference`, layered above the headline so letters it covers invert.
- **Eyes:** two ink ovals (1 : 1.35), 46% of the body's width with a 15% gap, set slightly above centre; each holds a small paper pupil that tracks the pointer within about 5.5% of the body's diameter.
- **Life:** springs toward its rest point, leaning toward the pointer (capped at 70px); squashes and stretches along its velocity (up to 28%); blinks every 2.4 to 6.2s, sometimes twice; a tap gives a squash and a hop. On touch devices the eyes look around on their own.
- **Docking:** as the hero scrolls away, Dot shrinks and travels into the header logo's dot, its eyes close, and it hands over to the real logo dot, which stays empty (`html.dot-away`) until Dot arrives.
- **Footer echo:** the footer's full-width wordmark carries Dot's eyes in its dot: ink ovals with a paper glint that track the pointer and blink.

### Named Rules
**The One Dot Rule.** Dot appears once per page as the hero character, and otherwise only inside the wordmark (header logo, footer mark). Never duplicate it, recolour it, or give it a mouth, limbs or a costume; it is a paper disc with two ink eyes.

**The Dot Lives on Ink Rule.** Dot's difference blend is tuned for ink and paper. Keep it over the ink ground, not over a colour field.

**The Visible-First Rule.** Motion never hides content that would otherwise be seen. Hero lines are visible from the first frame and only settle upward (from 0.35 opacity, 0.25em). `reveal` and `splitWords` arm only elements still below 90% of the viewport when JavaScript runs; above-the-fold content and no-JS content are never hidden.

**The Stand-Down Rule.** Under `prefers-reduced-motion: reduce`, or when the URL carries `?still`, every motion action stands down: no magnetic pull, no reveals or split words, no rolling headline word, and Dot stays a still dot with open eyes in the hero. Reduced motion additionally skips Lenis smooth scrolling, the hero line settle, the footer eyes, CSS label rolls and the cursor badge's lag. New motion gates on `stillMode()` so both signals are honoured. Static captures of the page are taken with `?still`.

## Do's and Don'ts

### Do:
- **Do** put colour on whole sections only: a 24px-radius field in `--color-field-dev`, `--color-field-design` or `--color-field-motion`, with all its contents in the matching `--color-on-*`.
- **Do** keep every section inside the 88rem container with the 1.5rem gutter so edges align with the header.
- **Do** use RollButton for every button and pill link; Primary for the main action, Light in the header, Ghost for secondary actions on ink, Ink on paper or yellow fields.
- **Do** give interactive elements a short `data-cursor` label that names the action.
- **Do** set headings in Schibsted Grotesk 800 with negative tracking (-0.035em to -0.045em) and line height at or below 1.
- **Do** reveal with `use:reveal` and `use:splitWords` from `$lib/actions/motion`, and gate any new motion on `stillMode()`.
- **Do** use 1px hairlines (rule) to divide lists, and Hairline Strong (rule-strong) to outline interactive things at rest.
- **Do** use an ink-3 panel with a hairline for confirmation and quiet emphasis on ink.

### Don't:
- **Don't** scatter colour as accents: no coloured headings, coloured borders, coloured icons or coloured tags on the ink ground.
- **Don't** bring back the rejected transit vocabulary: route rails, line-coloured strokes, station dots or network maps.
- **Don't** add a second typeface, or set large headings at lighter weights.
- **Don't** add shadows to fields, buttons or cards; the only shadow is the floating preview's.
- **Don't** hide content behind motion: never start above-the-fold content at opacity 0, and never let a reveal run when `stillMode()` is true.
- **Don't** add a second living character or alter Dot's form.
- **Don't** use WhatsApp green anywhere except inside the WhatsApp mark.
