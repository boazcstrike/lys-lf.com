# Project Context — lys-lf.com (LOAD FIRST for this project)

> High-level project briefing for agents. Detailed hosting / deploy / security
> runbooks are kept private (local only, not in this public repo).

## What this is
**lys-lf.com** — website for **Lim & Yutatco-Sze Law Firm** (Philippines).
Real client site. Informational only: no forms, no accounts, `mailto:` contact.

## Status — MIGRATION
- Replacing a legacy CMS site with a Next.js 16 + React 19 **static export**
  in `lys-lf-react-19/`.
- Endgame: the built `out/` becomes the live site on the existing shared host.

## Technology Stack (this project — NOT generic)
Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4 · SCSS (legacy) ·
Google Maps (`@react-google-maps/api`) · react-icons.
Build: `npm run build` → static `out/`. Package manager: **npm** (repo also
has a stale `pnpm-lock.yaml` — prefer npm until removed).

## Hard rules (do not violate)
- **R1** Keep `output: 'export'` in `next.config.ts`.
- **R2** No API routes, no `'use server'`, no SSR / getServerSideProps — no server runtime in prod.
- **R3** Components using hooks need `'use client'`.
- **R4** Real secrets ONLY in gitignored `.env` / `.env.local`. Never commit secrets.
- **R5** Never put ops secrets behind `NEXT_PUBLIC_` (that prefix ships them to the browser).
- **R6** Deploy only a fresh `out/` WITH `out/.htaccess` (missing dotfile = security headers lost).
- **R7** Treat a prod deploy as a full replacement of the live web root — cut over deliberately.
- **R8** Keep any staging area outside the prod web root so a deploy can't wipe it.

## Deploy pipeline
Build a static `out/` and publish it to the shared host as one atomic upload.
Exact steps and credentials live in local ops notes, not this public repo.
Always dry-run before a prod deploy.

## Where to read more
- Code rules: `lys-lf-react-19/AGENTS.md`, `lys-lf-react-19/README.md`
- Hosting / deploy / security / staging runbooks: kept private (local only,
  not in this public repo).

## Open risks
- APP-1 (HIGH): prod consent UI gated OFF → GA no banner/denial (GDPR/RA-10173 gap).
- INFRA-1 (HIGH): setup secrets exposed in chat → rotate.
- INFRA-2 (HIGH): live WP on PHP 7.0 (EOL) until cutover.
