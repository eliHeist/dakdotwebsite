# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Marketing/portfolio site for the Dakdot agency, built with SvelteKit 2 + **Svelte 5 (runes: `$props`, `$state`, `$effect`)**, Tailwind CSS v4 (via `@tailwindcss/vite`, no `tailwind.config`), GSAP (+ ScrollTrigger, SplitType) for animation, and Lenis for smooth scrolling. Deployed with `@sveltejs/adapter-auto`.

## Commands

Both `package-lock.json` and `pnpm-lock.yaml` exist; pnpm is the newer addition (`pnpm-workspace.yaml`).

- `pnpm dev` — dev server (`pnpm dev -- --open` to open the browser)
- `pnpm build` / `pnpm preview` — production build and preview
- `pnpm check` — `svelte-kit sync` + `svelte-check` type checking (the only static verification; there are no tests)
- `pnpm lint` — Prettier check only (no ESLint); `pnpm format` to fix
- Prettier style: tabs, single quotes, no trailing commas, 100 col width

## Architecture

- **Root layout** (`src/routes/+layout.svelte`) imports `app.css`, initialises Lenis in an `$effect`, and renders `Header`/`Footer` (Footer is re-keyed on `$page.url.pathname` so its animations re-run per route).
- **Styling**: design tokens live in the `@theme` block of `src/app.css` (e.g. `black`, `dark`, `red`, `blue`, `yellow`, `lead`, font `Inter Tight`) and are used as Tailwind utilities (`bg-black`, `text-lead`). `app.css` also defines the `.content-grid` layout (children default to the `content` column; use `.breakout` / `.full-width` to widen) and gradient heading classes `.title-1..3` / `.text-gradient`. Extra CSS partials are in `src/css/`.
- **Animations**: GSAP is imported directly in components; ScrollTrigger is imported from `gsap/dist/ScrollTrigger` and registered per component. Shared animation helpers are in `src/lib/scripts/` (`textanims.ts`, `homeAnimations.ts`, etc.). Components that create ScrollTriggers kill their old triggers on re-run to avoid duplicates across navigation.
- **Case studies are data-driven**: each project is a TS module in `src/lib/data/projects/<slug>.ts` default-exporting `{ title, slug, tags, industry, thumb, splash, mediaPath, overview, sections[] }`, using the `TAGS` / `INDUSTRIES` constants from `src/lib/data/projects.ts`. Media lives under `static/projects/<slug>/`, and section image filenames are relative to `mediaPath`.
  - `/case-studies` lists all projects via `import.meta.glob('$lib/data/projects/*.ts')` — adding a file is enough to list it.
  - `/case-studies/[slug]` dynamically imports `$lib/data/projects/${slug}.ts`, so the filename must match the slug.
  - The homepage project list (`src/routes/+page.ts`) is a separate hardcoded array, not derived from these modules.
- **Other content data**: `src/lib/data/homepage.ts` (services), `links.ts`, plus some per-client files at the top of `src/lib/data/`.
- **Contact form**: `src/routes/contact/+page.svelte` POSTs to `src/routes/api/contact/+server.ts`, which sends mail via nodemailer using `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_HOST`, `EMAIL_PORT` from `$env/static/private` (must be set in `.env` or the build fails). `contact/+page.server.ts` contains an older, placeholder-credential form action that the page does not use.
- **Leftover scaffold**: `src/routes/sverdle/`, `src/routes/Counter.svelte`, and the Svelte logo images are from the `sv` starter template and are not part of the site.
