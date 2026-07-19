# Project Context — lys-lf.com (LOAD FIRST for this project)

> Canonical, always-current briefing lives at
> `lys-lf-react-19/docs/ops/AGENT-CONTEXT.md`. This file mirrors the
> essentials for opencode agents — if they disagree, the canonical doc wins.

## What this is
**lys-lf.com** — website for **Lim & Yutatco-Sze Law Firm** (Philippines).
Real client site. Informational only: no forms, no accounts, `mailto:` contact.

## Status — MIGRATION
- LIVE: WordPress on Bluehost *WordPress Basic Hosting* (PHP 7.0, EOL).
- Incoming: Next.js 16 + React 19 **static export** in `lys-lf-react-19/`.
- Endgame: static `out/` replaces WordPress in `public_html`.

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
- **R7** `--target prod` clean-mirrors `public_html` (deletes WP) — only at deliberate cutover.
- **R8** Staging docroot lives OUTSIDE `public_html` (`~/staging`) or prod deploy wipes it.

## Deploy pipeline
One script `scripts/deploy.sh` (rsync-over-SSH). CI:
`.github/workflows/deploy.yml` (dispatch or tag `v*`→prod). Local/agent:
`scripts/deploy.sh --target staging|prod [--dry-run]`. Always dry-run before prod.

## Where to read more (authoritative)
- Agent briefing: `lys-lf-react-19/docs/ops/AGENT-CONTEXT.md`
- Code rules: `lys-lf-react-19/AGENTS.md`, `lys-lf-react-19/README.md`
- Infra/creds map: `lys-lf-react-19/docs/INFRASTRUCTURE.md`
- Security/risks: `lys-lf-react-19/docs/SECURITY.md`
- Deploy: `lys-lf-react-19/docs/ops/DEPLOY.agent.md`
- Staging setup (detailed + diagrams): `lys-lf-react-19/docs/ops/STAGING-DEPLOYMENT.md`

## Open risks
- APP-1 (HIGH): prod consent UI gated OFF → GA no banner/denial (GDPR/RA-10173 gap).
- INFRA-1 (HIGH): setup secrets exposed in chat → rotate.
- INFRA-2 (HIGH): live WP on PHP 7.0 (EOL) until cutover.
