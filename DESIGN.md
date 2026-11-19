---
name: Dakdot
description: One network of service lines, where software and design meet at interchanges.
colors:
  ink: "#0b0d10"
  ink-2: "#12151a"
  ink-3: "#1a1e25"
  rule: "#262b33"
  paper: "#e9ecef"
  mute: "#9aa1ab"
  line-web: "#ee2531"
  line-brand: "#f2c230"
  line-motion: "#3a6ff2"
  web-text: "#ff5a63"
  brand-text: "#f2c230"
  motion-text: "#7d9fff"
  signal-red: "#db1f2b"
  signal-red-deep: "#c41724"
  whatsapp: "#25d366"
typography:
  display:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 5.6vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 2.6vw, 2.1rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 500
    lineHeight: 1.4
  button:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.2
rounded:
  rail: "2px"
  field: "8px"
  card: "10px"
  panel: "12px"
  pill: "999px"
spacing:
  gutter: "1.5rem"
  container: "88rem"
  header: "4.5rem"
  section-y: "5rem"
  section-y-lg: "7rem"
components:
  button-primary:
    backgroundColor: "{colors.signal-red}"
    textColor: "#ffffff"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.95rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.signal-red-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.95rem 1.5rem"
  button-header:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.15rem"
  input-field:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.paper}"
    rounded: "{rounded.field}"
    padding: "0.8rem 0.9rem"
  input-field-focus:
    backgroundColor: "{colors.ink-3}"
  nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.55rem 0.9rem"
  nav-item-hover:
    backgroundColor: "{colors.ink-3}"
  preview-card:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "0.85rem 1rem 1rem"
  cursor-badge:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "4.25rem"
---

# Design System: Dakdot

## Overview

**Creative North Star: "The Network Map"**

Dakdot is drawn as one transit network. Three service lines (Web, Brand, Motion) carry projects as stations; where a project rides two lines it becomes an interchange, which is where software meets design. The schematic is abstracted, not literal: it appears only where it carries meaning (the hero map, the project index as a route, the line rows, the section terminus and the footer rails). Everything between those moments is quiet: a near-black ground, one grotesk, generous space, hairline rules.

The system is dark-only and flat. Colour belongs to the lines and almost nowhere else; type does the rest of the work at heavy weights with tight tracking. Interaction is the signature: hovering a station or a row lights its route and dims the rest, a cursor-following preview shows the work, and a contextual dot cursor names the action. Motion is damped and short, content is visible by default, and there is one drawing moment per page, not many.

The page refuses the stacked agency template (hero, logo marquee, card grid, bento, FAQ, CTA band). New pages extend the network vocabulary rather than reaching for cards.

**Key Characteristics:**
- Near-black ink ground with a three-step tonal ink scale and hairline rules; no light theme.
- Three line colours used as strokes, rails and station rings, never as large fills.
- One family, Schibsted Grotesk (400 to 900, self-hosted), with tabular numerals on counts.
- Strokes run horizontal, vertical or at 45°; stations are hollow rings, interchanges ring in paper.
- Pill-shaped actions; 8 to 12px radii for fields, previews and panels.
- One ease-out curve for everything; a single route-draw on load; reduced motion honoured throughout.

## Colors

A dark ink ground lit only by three transit-line colours, with paper-white type and a muted grey for secondary text.

### Primary
- **Web Line Red** (`line-web`): the Web Development line stroke, its station rings and rails; also the brand voice of the system (selection, caret, current-page underline, `accent-color`).
- **Signal Red** (`signal-red`): the primary action fill. It is the line red deepened one step so white button text clears 4.5:1; **Signal Red Deep** (`signal-red-deep`) is its hover. Line red itself never sits under white text.

### Secondary
- **Brand Line Yellow** (`line-brand`): the Brand Design line, and the system focus ring (2px outline, 3px offset). It is already text-safe on ink, so `brand-text` equals it.

### Tertiary
- **Motion Line Blue** (`line-motion`): the Motion line stroke and rings.

### Text-safe tints
- **Web Text** (`web-text`), **Brand Text** (`brand-text`), **Motion Text** (`motion-text`): the line colours lifted to at least 4.5:1 on ink. Use these whenever a line colour must be read as text. Web Text is also the error colour for fields and messages.

### Neutral
- **Ink** (`ink`): the page ground, header when scrolled, hollow station centres, and the label halo stroke on the map.
- **Ink 2** (`ink-2`): raised surfaces: inputs, the station preview, dropdown menu, the sent-confirmation panel.
- **Ink 3** (`ink-3`): hover fill for nav items and menu rows, focused inputs, media placeholders.
- **Rule** (`rule`): every hairline (section rows, list rows, header border, ghost-button border, footer), the hub ring, and the scrollbar thumb.
- **Paper** (`paper`): primary text, the hub dot, interchange rings, the header CTA fill and the cursor badge.
- **Mute** (`mute`): secondary text, ledes, metadata, capability labels, footer column heads.
- **WhatsApp Green** (`whatsapp`): third-party mark only, on the WhatsApp glyph and the ghost button's hover border. It is not a system colour.

### Named Rules
**The Lines Own Colour Rule.** Hue appears only as a line: a stroke, a rail, a ring, a 4px legend swatch. Surfaces stay ink; no tinted panels, no gradients, no coloured section bands.

**The Text-Safe Tint Rule.** A line colour used as text, or behind text, switches to its text-safe tint (or, for the red action, to Signal Red). Raw line colours are for strokes.

## Typography

**Display Font:** Schibsted Grotesk (with ui-sans-serif, system-ui)
**Body Font:** Schibsted Grotesk
**Label/Mono Font:** none; numerals use tabular figures (`tnum`) where counts appear.

**Character:** One sturdy news grotesk carries everything. Headlines go very heavy and very tight, so the quiet sections still have a voice; body stays regular and muted.

### Hierarchy
- **Display** (800, clamp 2.75 to 5.5rem, 0.96, -0.04em): the hero headline only, balanced wrap.
- **Headline** (800, clamp 2.25 to 4rem, 1, -0.035em): section headings. The closing contact heading runs slightly smaller (to 3.75rem, 1.02).
- **Line name** (700, clamp 1.75 to 2.75rem, 1.05, -0.03em): service line names in the line rows.
- **Title** (700, clamp 1.4 to 2.1rem, 1.1, -0.025em): station names in the project index.
- **Body** (400, 1.1 to 1.15rem, 1.55): ledes and intros in Mute, capped at 40 to 52ch.
- **Label** (500, 0.8 to 0.95rem): metadata, legend, field labels, link-with-arrow actions; map labels are 14px/500 with an ink halo.
- **Button** (600, 1rem): all pill actions and the cursor badge (0.8rem there).

### Named Rules
**The One Family Rule.** Schibsted Grotesk is the only face. Hierarchy comes from weight (400 / 500 / 600 / 700 / 800) and tracking, never from a second family.

**The Heavy-Tight Rule.** Anything 1.4rem and up is 700 or 800 with negative tracking (-0.025em to -0.04em). Body never goes below 400 or tighter than 0.

## Layout

A single centred container (`container`, 88rem) with a 1.5rem side gutter (`gutter`) frames every section and the header bar; there is no 12-column grid. Sections use asymmetric two-column splits instead: the hero runs 5fr / 7fr (copy left, network right), the contact section 5fr / 6fr. Line rows use a 4 / 5 / 3 fraction grid (name, description, count); the project index uses a fixed 2.5rem route column, then title, metadata, arrow.

Vertical rhythm is generous: sections pad 5rem to 7rem top and bottom (`section-y`, `section-y-lg`); headline to lede is 1.25rem; lede to list is 2.5 to 3.5rem. The fixed header is 4.5rem tall, transparent at the top and ink with a rule once scrolled. The hero fills 100svh on desktop with the CTAs above the fold.

Responsive behaviour collapses splits to one column: hero at 960px, contact at 860px, line rows at 820px, index rows at 760px (route column narrows to 1.5rem and a 16:9 thumbnail appears inline), header nav to a full-height sheet at 760px, form fields to one column at 520px. On small screens map labels scale up inside the SVG (26px) and capability labels hide.

## Elevation & Depth

Flat by default. Depth comes from the three-step ink scale and hairline rules, not shadows. Shadows exist only on things that float over content because of a pointer: the station preview, the cursor-following project image, and the services dropdown. They are soft, dark and offset downward, never coloured.

### Shadow Vocabulary
- **Float** (`box-shadow: 0 18px 40px -12px rgb(0 0 0 / 0.7)`): the map's station preview card.
- **Float Menu** (`box-shadow: 0 20px 40px -16px rgb(0 0 0 / 0.7)`): the services dropdown.
- **Float Large** (`box-shadow: 0 30px 60px -20px rgb(0 0 0 / 0.75)`): the cursor-following project image in the index.

### Named Rules
**The Only Floats Cast Rule.** A shadow means "this is hovering because you pointed at something". Resting surfaces, rows and buttons never carry one.

## Shapes

Two shape languages meet. The network geometry is strict: routes run horizontal, vertical and at 45° with round caps and joins, at 5px (7px when lit) on the map, 4px for rails and the index route, 3px in the footer. Stations are hollow circles with a 3 to 3.5px coloured ring and an ink centre; interchanges are larger rings in paper holding one small dot per line; capability stops on empty lines are short ticks across the line. The hub is a paper dot inside a rule-coloured ring: the Dakdot dot.

Everything the user presses is a pill (`pill`). Fields are 8px (`field`), floating previews 10px (`card`), menus and panels 12px (`panel`). Rails and legend swatches use a 2px radius (`rail`). There are no sharp-cornered buttons and no decorative borders beyond the 1px rule.

## Components

### Buttons
Confident pills with a small arrow that leans forward on hover.
- **Shape:** full pill (`pill`).
- **Primary:** Signal Red fill, white text, 600, padding 0.95rem 1.5rem, trailing 16px arrow (1.8 stroke). Hover deepens to Signal Red Deep and nudges the arrow 4px right; active scales to 0.98; disabled drops to 0.6 opacity with a progress cursor.
- **Ghost:** transparent with a 1px Rule border and Paper text. Used for WhatsApp, where hover turns the border WhatsApp Green (with an 8% green wash in the contact section).
- **Header CTA:** a smaller paper pill (0.6rem 1.15rem) with ink text; hover goes to pure white. It is the one light-filled control.
- **Text action:** label-weight link with a trailing arrow; its underline grows left to right on hover (1px, 0.4s).

### Inputs / Fields
- **Style:** Ink 2 fill, 1px Rule border, 8px radius, padding 0.8rem 0.9rem, red caret. Labels sit above at 0.9rem/500, with "(optional)" in Mute.
- **Hover / Focus:** hover lifts the border slightly; focus sets the border to Paper and the fill to Ink 3 (no glow).
- **Error:** border and message in Web Text, message at 0.85rem below the field; the first invalid field receives focus.

### Navigation
- **Header:** logo left, items as transparent pills (500) that fill Ink 3 on hover; the current page is marked by a 2px Web Line Red underline. Services opens a 12px Ink 2 menu where each line shows its 4px colour swatch, name and summary.
- **Mobile:** a "Menu" ghost pill opens a full-height sheet with 2rem/700 links, the service lines nested in Mute with their swatches, and a full-width paper CTA at the bottom.

### Station, Stop and Interchange (signature)
The core vocabulary for any page that lists work.
- **Station:** hollow ring in its line colour on ink; on hover or focus the ring grows (6 to 9 in map units) and fills Paper; the label is 14px/500 Paper with an ink halo.
- **Interchange:** a project on two or more lines; ring in Paper, larger, with one dot per line inside. In lists, an interchange stop is ringed in Paper instead of the line colour.
- **Capability stop:** a tick across a line that has no projects yet, labelled in Mute. Empty lines show capabilities, never invented projects.
- **Hover lighting:** the hovered station's routes thicken and stay lit; every other route, station and capability dims (to 0.08 to 0.25 opacity). Escape clears it; on touch the first tap previews and pins, the second follows the link.

### Route Rail (signature)
A line becomes the structure of a list.
- **Index route:** a continuous 4px line in the first line's colour runs down a fixed left column of the project list, starting and ending at the first and last stops; each row's stop is a 16px hollow ring that scales to 1.35 and fills Paper on hover. Sibling rows dim to 0.35 while one is hovered, and the title slides 0.5rem right.
- **Line row:** each service row opens with a rail in its colour drawn at 18% length; on hover it extends to full width and its capability stops pop in, staggered 80ms apart. On narrow screens it is shown full and static.
- **Terminus and rails:** the three lines run in parallel (4px, 10px apart) into a paper-ringed terminus stop above the contact section; the footer opens with three 3px parallel rails.

### Previews
- **Map preview:** a 17.5rem Ink 2 card (10px, Rule border, Float shadow) with a 16:10 thumbnail, title, line swatches and a three-line summary; it opens with a short rise-and-unclip.
- **Index float:** a 22rem 4:3 image that follows the pointer with easing (factor 0.18), fading and scaling in from 0.85. Fine pointers only.

### Contextual Cursor
A Paper disc badge (4.25rem tall, ink 0.8rem/600 text) that trails the pointer (easing 0.22, instant under reduced motion) and scales in only over elements carrying a cursor label, naming the action ("View", "Open", "Let's talk", "Chat", "Ride line", "Send"). Fine pointers only; the native cursor always stays visible, so nothing depends on it.

### Line Legend
A 1.5rem by 4px swatch in the line colour, the line name at 600 and a Mute count or summary beneath, with tabular numerals. Used in the hero, the services menu and anywhere a line is named.

## Do's and Don'ts

### Do:
- **Do** express every service as its line colour, and every project as a station on that line; mark projects on two or more lines as interchanges.
- **Do** switch to the text-safe tint (`web-text`, `brand-text`, `motion-text`) when a line colour must be read, and use Signal Red (`signal-red`) under white text.
- **Do** use the single ease-out curve (`cubic-bezier(0.16, 1, 0.3, 1)`) for every transition, in the 0.2 to 0.4s range for states and up to 0.7s for rails.
- **Do** keep one drawing moment per page: the map routes draw once on load (1.1s, staggered 140ms), over an always-visible base track, so content is never hidden waiting for animation.
- **Do** honour reduced motion: skip the route draw, smooth scrolling and hover transitions, and snap the cursor to the pointer.
- **Do** keep content inside the 88rem container with the 1.5rem gutter, and split sections asymmetrically rather than centring them.
- **Do** give empty lines capability stops and an honest "See the service" instead of placeholder projects.

### Don't:
- **Don't** fill surfaces or panels with line colour, or use gradients; colour lives in strokes, rails and rings.
- **Don't** draw routes at angles other than 0°, 90° and 45°.
- **Don't** add a second typeface or set headings below 700.
- **Don't** put shadows on resting surfaces; only pointer-driven floats cast them.
- **Don't** rebuild the stacked agency template (hero, logo marquee, card grid, bento, FAQ, CTA band) on new pages; list work as stations on a route.
- **Don't** make the contextual cursor or the cursor-following preview carry information that touch or keyboard users cannot reach.
- **Don't** add a preloader or hide content until an animation runs.
