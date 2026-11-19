---
version: 1
slug: "src-routes-page-svelte"
primary_target: "src/routes/+page.svelte"
related_targets: []
---

# Homepage surface brief

**Scope:** the homepage (`src/routes/+page.svelte`). It sets the new visual world for a whole-site redesign; the other pages adopt its system afterwards.
**Mode:** Persuade.

**Audience and action.** Established companies and organisations, and startup founders, with international prospects as well. They should come away believing Dakdot builds systems in both software and design. They act by booking a call through a built-in short form (name, company email, optional phone, website, project goals; sent through `/api/contact`) or by starting a WhatsApp chat.

**Proof.** Case studies rendered as stations, from local modules plus an optional remote projects API. Web and Motion work will arrive later, and lines without stations must degrade gracefully. Nothing may be fabricated.

**Inspiration (craft bar, not composition).**
- Halo Lab: a contextual cursor and component micro-actions.
- MetaLab: restraint, list-hover previews that follow the cursor, understated links, quick page transitions.

## Direction contract

THESIS: Dakdot is one network: service lines carry projects as stations, and interchanges sit where software meets design. The page refuses the stacked agency template (hero, logo marquee, card grid, bento, FAQ, CTA band).

OWN-WORLD: A near-black ground, with three line colours: Web red #EE2531, Brand yellow and Motion blue. Thin 45° strokes, hollow station dots, ringed interchanges. Abstracted: the map appears only in the hero, the project index and the section connectors; everything else is quiet, in one grotesk with tabular numerals.

STORY: The visitor sees the network and grasps "connected systems, software and design". They hover stations to see the work, then book a call or open WhatsApp.

FIRST VIEWPORT: Asymmetric. The headline sits top-left, in the current voice. The network fills roughly the right 60%, its three lines converging on an interchange marked by the Dakdot dot. "Book a call" and "WhatsApp" sit bottom-left, above the fold. Signature: hovering a station lights its routes and dims the rest, with a cursor-following preview and a contextual dot cursor (desktop only; tap on touch). Motion is damped and short; no preloader, content is visible by default, and reduced motion is honoured.

FORM: Network Map (transit schematic, abstracted), my ranked list position 1 of 7, picked by the user over the assigned roll; seed:878c53643d12b6fb

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- WhatsApp number (TODO placeholder until supplied).
- Remote projects API URL and auth (contract to be generated; local data is the fallback).
- Web and Motion case studies, to be supplied by the client.
