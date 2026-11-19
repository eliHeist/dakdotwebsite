# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: established companies and organisations.** Larger firms, NGOs and institutions buying custom web apps, internal systems or full rebrands. They are usually comparing several agencies and judge on proof of capability and quality.
- **Primary: startups and product founders.** They need branding, a product or marketing site, and motion or 3D for launches and investor material, ideally from one team.
- **Secondary: international clients.** Clients outside Uganda evaluating Dakdot as a capable remote studio. The site must read as credible to them without local-only cues.
- Price-led, first-time SME buyers are not the target audience.

## Product Purpose

Dakdot is a Kampala-based digital studio. Its site exists to convince qualified prospects (above) that Dakdot can deliver custom software and high-craft design, and to move them into a direct conversation. Success means a qualified prospect starts a WhatsApp chat or a call.

## Positioning

- **Dakdot builds systems, in software and in design.** The core belief a buyer should leave with: Dakdot works systematically with technology. This covers both:
  - software systems: real web applications such as CRMs, job portals, booking platforms and business systems, not template sites
  - design systems: identities and visual products built as coherent systems of parts that work together, not one-off visuals
- **Craft and design quality.** Dakdot's design and animation quality is visibly above the local market.

## Operating Context

- Prospects arrive to evaluate work. Case studies are the main evidence.
- Conversion is a direct conversation through **WhatsApp** and a **call**.
- **Open:** the WhatsApp number, how calls are booked (a calendar link or a phone number), and whether the existing `/contact` enquiry form stays as a fallback.

## Capabilities and Constraints

- **Active services:** Web Development (custom web apps and websites), Brand Design (identity, logos, guidelines) and Motion (animation, 3D). Product visualization, digital marketing and video production exist in the data but are currently disabled in the nav.
- Hosting and maintenance are provided only as part of web development engagements, not as standalone services.
- **No pricing on the website.** Remove the UGX price figures currently in the homepage FAQ.
- Case studies are data-driven: `src/lib/data/projects/<slug>.ts` with media in `static/projects/<slug>/`.
- **Stack:** SvelteKit 2, Svelte 5 runes, Tailwind v4, GSAP and Lenis.
- **Speed is a requirement.** Pages must load and become usable fast. No heavy WebGL/three.js scenes that slow loading, and no preloader gating content.
- **Scope:** a whole-site redesign with a new visual look. The voice stays the same (see Brand Commitments).

## Brand Commitments

- **Name:** always written "Dakdot", never "DakDot" or "DAKDOT" as the name.
- **Logo and dot mark:** keep the current wordmark and dot-and-satellite mark (`static/logo.svg`, `static/dakdot.svg`, `static/favicon.svg`).
- **Brand red:** `#EE2531` is an official brand colour.
- **Voice:** keep the current copy tone: friendly, confident, plain-spoken and direct to the client (e.g. "Your Digital Growth Partner!"). The redesign changes the look, not the voice.
- **Corporate but relatable.** The site should feel professional enough for company buyers, yet warm and human, never a cold consultancy.
- **Dark ground:** the site stays predominantly dark (a binding constraint from the client).
- **Ambition:** Awwwards-level craft built from many small, standout micro-details. Asymmetry is welcome where it works. The current hero arch need not survive and can be rethought entirely.
- **Not wanted:** a template-looking site, a cold corporate tone, slow pages or motion that makes people wait (e.g. preloaders).

## Evidence on Hand

- **Case studies with real visuals:** JK Consults, Seromujs, Thupu, Too Good and Wekume (`src/lib/data/projects/`, `static/projects/`). Media also exists for Kamy's Delights and Twewayo (`src/lib/data/kamysdelights.ts`, `twewayo.ts`).
- **Further case studies** not yet on the site exist. The client will supply them.
- **Live products and custom software** that can be shown, at least as screenshots.
- **Absent, do not fabricate:** client testimonials or quotes, team headcounts, years in business, project counts, client counts, awards and press.

## Product Principles

1. **Proof before promise.** Real work and real software carry the argument; claims come second.
2. **Show the system, not just the surface.** Systems thinking is the differentiator, in software and in design. Make the parts and how they connect visible and legible to non-technical buyers.
3. **The site is itself a craft sample.** Its own design and motion quality is evidence of Dakdot's.
4. **One clear way to talk.** Every page leads to a WhatsApp chat or a call.
5. **Credible beyond Kampala.** Nothing should read as local-only or price-led.
