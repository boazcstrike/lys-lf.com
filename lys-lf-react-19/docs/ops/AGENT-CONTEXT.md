# AGENT-CONTEXT.md — canonical briefing for ALL agents

Single briefing any agent (Claude Code, opencode subagents, CI agents) reads
before touching this repo. Terse on purpose. Links point to the authoritative
long-form docs — read those before deep work in that area.

---

## 1. What this is

**lys-lf.com** — website for **Lim & Yutatco-Sze Law Firm** (Philippines).
Real client site (family-owned; software by the maintainer). Informational,
no forms, no accounts, `mailto:` only.

## 2. Status: static site ALREADY LIVE (verified 2026-07-20 via FTPS)

- **LIVE now:** the Next.js static export is **already deployed** in
  `public_html` (index.html, `_next/`, etc.) and serving (HTTP 200). The
  WP→static migration already happened.
- **Deploy history:** manual **zip uploads** (`out-*.zip` still in `public_html`).
- **WordPress:** not serving. Only crumbs remain (stale `.htaccess`,
  `.htaccess.phpupgrader.*`, PHP handlers).
- **⚠ Live `.htaccess` is the OLD WordPress one** — our security-header
  `.htaccess` was **never deployed**. Live site currently has **no CSP / HSTS /
  X-Frame-Options** (see SECURITY.md OPS-5). First controlled deploy should fix this.
- **Deploy transport:** **SSH shell is DISABLED** on the account →
  rsync/`deploy.sh` blocked. **FTPS works** (`ftps-deploy.sh` /
  `deploy-ftps.yml`) and is the active path. Enable SSH later to upgrade.

## 3. Hard rules (do not violate)

| # | Rule | Why |
|---|------|-----|
| R1 | Keep `output: 'export'` in `next.config.ts` | Whole deploy = static hosting |
| R2 | No API routes, no `'use server'`, no SSR/getServerSideProps | No server runtime in prod |
| R3 | Components with hooks need `'use client'` | Static build breaks otherwise |
| R4 | **Real secrets ONLY in gitignored `.env` / `.env.local`** | Never commit secrets |
| R5 | **Never put ops secrets behind `NEXT_PUBLIC_`** | That prefix inlines into the browser bundle |
| R6 | Deploy only a fresh `out/` **with `out/.htaccess`** | Missing dotfile = all security headers lost |
| R7 | `--target prod` clean-mirrors `public_html` (deletes WP) | Only at deliberate cutover |
| R8 | Staging docroot lives **outside** `public_html` (`~/staging`) | Else prod deploy wipes it |

## 4. Stack & tooling

Next.js 16 · React 19 · TypeScript 5 · Tailwind 4 · SCSS (legacy) · Google
Maps (`@react-google-maps/api`) · react-icons. Build: `npm run build` → `out/`.
Repo: GitHub `boazcstrike/lys-lf.com`. **Dual lockfile** (`package-lock.json` +
`pnpm-lock.yaml`) — CI uses npm; prefer npm until pnpm-lock is removed.

## 5. Infrastructure (secrets excluded)

Bluehost shared cPanel. User `lyslfcom`, home `/home4/lyslfcom`, webroot
`public_html`, shared IP `162.241.225.54`. SSH enabled. Hosting exp **Jan 4
2027**, domain exp Jan 4 2029, auto-renew Dec 20 2028. Full detail:
[INFRASTRUCTURE.md](../INFRASTRUCTURE.md).

## 6. Deploy pipeline

One script `scripts/deploy.sh` (rsync-over-SSH), two entry points:
- **CI:** `.github/workflows/deploy.yml` — dispatch (staging/prod) or tag `v*`→prod.
- **Local/agent:** `scripts/deploy.sh --target staging|prod [--dry-run]`.
Always dry-run before prod. Auto-backup to `~/backups/` each run.
Runbooks: [DEPLOY.agent.md](./DEPLOY.agent.md) · [STAGING-DEPLOYMENT.md](./STAGING-DEPLOYMENT.md).

Staging (`staging.lys-lf.com`) is a **subdomain** at its own docroot — not a
subfolder (static export's absolute `/_next/…` paths break under a subdir).
As of this writing the subdomain is **not yet created** (DNS NXDOMAIN).

## 7. Open risks (act-aware)

- **APP-1 (HIGH):** prod gates consent UI OFF → GA would run with no
  banner/Consent-Mode denial (GDPR/RA-10173 gap). Resolve before prod GA.
- **INFRA-1 (HIGH):** setup secrets were exposed in chat → rotate.
- **INFRA-2 (HIGH):** live WP on PHP 7.0 (EOL) until cutover.
- Maps API key is `NEXT_PUBLIC_` → must be HTTP-referrer restricted.
Full register: [SECURITY.md](../SECURITY.md).

## 8. Canonical doc map

| Need | Read |
|------|------|
| Code rules / patterns | `../../AGENTS.md`, `../../README.md` |
| Hosting / domain / creds map | `../INFRASTRUCTURE.md` |
| Security / risks / checklists | `../SECURITY.md` |
| Deploy (all paths) | `./DEPLOY.agent.md` |
| Staging setup (detailed) | `./STAGING-DEPLOYMENT.md` |
| Bluehost `.htaccess` / consent | `../../DEPLOYMENT.md` |

> Precedence: if this file and a linked doc disagree, the **linked long-form
> doc wins** (it's authoritative; this is a summary). Fix the drift when found.
