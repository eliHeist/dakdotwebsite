---
version: 1
slug: "src-routes-page-svelte"
primary_target: "src/routes/+page.svelte"
related_targets: []
---

# Homepage surface brief

**Scope:** the homepage (`src/routes/+page.svelte`). It sets the visual world for the whole-site redesign. **Mode:** Persuade.

**Audience and action.** Established companies, organisations and founders, with international prospects too. They should come away believing Dakdot builds systems in software and design. They act by booking a call through the built-in short form (sent through `/api/contact`) or by opening WhatsApp.

**Proof.** The project list comes from local modules plus the optional projects API (docs/projects-api.md). Nothing is fabricated.

**History.** The first build (the Network Map world) was rejected by the client on 2026-11-19 for "too much colour", lines that should be discarded, and a hero built on projects. It is replaced by the pinned direction below.

## Direction contract

THESIS: An immersive, playful studio page in the spirit of Halo Lab. The Dakdot dot is alive: a cursor-reactive character that leads the first viewport, then docks into the logo as you scroll. The page refuses a projects-map hero, transit lines, and colour scattered everywhere.

OWN-WORLD: Monochrome ink ground (#0b0d10) with paper text. Colour appears only as whole-section fields: Web Development owns brand red, Motion owns yellow, Design stays neutral (a paper field with ink text). One heavy grotesk (Schibsted Grotesk). Pill buttons with rolling labels and a magnetic pull; a contextual cursor; split-word reveals.

STORY: The visitor meets Dot, which follows them, squashes, blinks and looks at the buttons. They read who Dakdot is, scroll through three colour-flooded service rows and the work list with its hover previews, then book a call or open WhatsApp.

FIRST VIEWPORT: The living dot sits large at upper right, blended with `difference` so the headline inverts where they cross. The huge headline spans the lower left; the sub-copy plus "Book a call" and "WhatsApp us" sit bottom-left above the fold. Signature: Dot follows the pointer with spring squash-and-stretch, its pupils track the cursor, it blinks, and it docks into the header logo's dot on scroll. Motion is rich but quick, content is visible by default, and reduced motion gives a still Dot.

FORM: Pinned by the client — seed: none (pinned) — "make one that is immersive like that of halo-lab, change the whole look to have more motion and look more like halo-lab … use colors on sections like dev sections use more red, motion yellow … discard the lines"; hero: "Living Dakdot dot"; Design colour: "neutral".

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Kept from the first build

- The three-row services layout (new headline).
- The project list with its cursor-following preview (route rail removed).

## Unresolved

- WhatsApp number (currently reuses the studio phone).
- Web and Motion case studies, to be supplied.
