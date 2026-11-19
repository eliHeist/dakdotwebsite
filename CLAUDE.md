# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Marketing/portfolio site for the Dakdot agency, built with SvelteKit 2 + **Svelte 5 (runes: `$props`, `$state`, `$derived`, `$effect`)**, Tailwind CSS v4 (via `@tailwindcss/vite`, no `tailwind.config`) and Lenis for smooth scrolling. Motion is hand-written CSS/JS (no GSAP in the current design). Deployed with `@sveltejs/adapter-auto`.

Product truth lives in `PRODUCT.md`; the visual system (tokens, components, rules) in `DESIGN.md` (+ `.impeccable/design.json`). Read both before UI work.

## Commands

Both `package-lock.json` and `pnpm-lock.yaml` exist; pnpm is the newer addition (`pnpm-workspace.yaml`).

- `pnpm dev` — dev server (`pnpm dev -- --open` to open the browser)
- `pnpm build` / `pnpm preview` — production build and preview
- `pnpm check` — `svelte-kit sync` + `svelte-check` type checking (the only static verification; there are no tests)
- `pnpm lint` — Prettier check only (no ESLint); `pnpm format` to fix
- Prettier style: tabs, single quotes, no trailing commas, 100 col width

## Environment

Copy `.envtemp` to `.env` (or set the same variables on the host). All are read at runtime via `$env/dynamic/private`, so the build never needs them.
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` (+ optional `EMAIL_FROM`, `CONTACT_TO`) — SMTP for the contact form; without them `/api/contact` returns 503.
- `PROJECTS_API_URL`, `PROJECTS_API_TOKEN` — optional remote projects API (`docs/projects-api.md`).

## Architecture

- **Root layout** (`src/routes/+layout.svelte`) renders `Header`/`Footer` and the contextual `Cursor`, and starts Lenis. `src/app.html` adds `html.still` before first paint under reduced motion or `?still`; CSS then stops all animation (use `?still` for static screenshots).
- **Header** (`src/routes/Header.svelte`) is one morphing shell driven by `--p` (scroll progress 0→1 over 220px): full bar → centred "island"; the Services button grows it into a panel of `ServiceArt` illustrations. Review pins: `?nav=island|services`.
- **Styling**: tokens in the `@theme` block of `src/app.css` — ink scale, `paper`/`mute`, section fields `--color-field-{dev,design,motion}` with `--color-on-*`, `--color-signal` (action red). Colour appears only as whole section fields, never scattered accents (see DESIGN.md). Font: self-hosted Schibsted Grotesk (`static/fonts/`).
- **Motion actions** (`src/lib/actions/motion.ts`): `magnetic`, `reveal`, `splitWords`, `parallax`, and `stillMode()`. Reveals only arm below the fold so content is visible by default.
- **Services** are defined in `src/lib/data/network.ts` (`LINES`, `LINE_IDS`; names kept for the API's `lines` field). Each service page (`src/routes/services/*/+page.svelte`) renders `ServicePage.svelte` with its `+page.ts` data and a hero visual from `src/lib/components/services/visuals/`.
- **Projects / case studies**: local modules in `src/lib/data/projects/<slug>.ts` (using `TAGS`/`INDUSTRIES` from `src/lib/data/projects.ts`, media under `static/projects/<slug>/`) merged with the optional remote API by slug. `loadLocalStations`/`loadRemoteStations`/`mergeStations` (network.ts) feed the homepage and `/case-studies`; `src/lib/data/caseStudies.ts` normalises full case-study content for `/case-studies/[slug]` (remote text is plain text, never HTML).
- **Contact form**: `src/lib/components/home/Contact.svelte` (used on `/` and `/contact`) POSTs `{ type: 'call', name, email, phone?, website?, goals }` to `src/routes/api/contact/+server.ts` (nodemailer, HTML-escaped).
- **Leftover scaffold**: `src/routes/sverdle/`, `src/routes/Counter.svelte`, and the Svelte logo images are from the `sv` starter template and are not part of the site.
