# Infrastructure & Operations

Single source of truth for hosting, domain, access, and the operational
facts needed to run **lys-lf.com** (Lim & Yutatco-Sze Law Firm).

> **No secrets in this file.** Usernames and non-sensitive facts only.
> Real credentials live in the gitignored **`../../.env`** (repo root) —
> see [Credentials](#7-credentials). This file IS committed to git — never
> paste a password here.

Related: [SECURITY.md](./SECURITY.md) · [../DEPLOYMENT.md](../DEPLOYMENT.md) · [../AGENTS.md](../AGENTS.md)

---

## 0. Live state (verified 2026-07-20 via FTPS)

- **The Next.js static export is ALREADY LIVE** in `public_html` (serving
  HTTP 200). The WP→static migration already happened — this is **not** a
  pending migration.
- **Deploys have been manual zip uploads** (`out-5-16-25.zip`,
  `out-6292025.zip` still on the server). We are replacing that with a proper
  pipeline.
- **WordPress no longer serves;** only crumbs remain.
- ⚠ **Live `.htaccess` = old WordPress one** → production has **no security
  headers** yet ([SECURITY.md](./SECURITY.md) OPS-5). Deploying our
  `public/.htaccess` fixes it.
- **SSH shell is DISABLED** → deploy transport is **FTPS** for now
  (`scripts/ftps-deploy.sh` / `.github/workflows/deploy-ftps.yml`). Enable SSH
  to upgrade to rsync.

---

## 1. At a glance

| Item | Value |
|------|-------|
| Primary domain | `lys-lf.com` |
| Registrar | Bluehost |
| Hosting | Bluehost — **WordPress Basic Hosting** (shared cPanel, Apache/Linux) |
| Shared IP | `162.241.225.54` |
| cPanel user | `lyslfcom` |
| Home directory | `/home4/lyslfcom` |
| Web root | `/home4/lyslfcom/public_html` |
| SSH access | Yes (cPanel shared-hosting SSH) |
| Source repo | GitHub — `boazcstrike/lys-lf.com` |
| Live stack | WordPress (PHP 7.0) → migrating to Next.js static export |
| Owner | Family-owned law firm; software by B. Sze |

---

## 2. Hosting (Bluehost cPanel)

Shared cPanel, WordPress Basic plan on Apache. Target production for the new
site is a **static export** — plain HTML/CSS/JS in `public_html`. No Node.js
runtime, no app database, no server-side code once migrated.

### Access paths
- **cPanel** — Bluehost account → cPanel. User `lyslfcom`.
- **SSH** — shared-hosting SSH. Host = `lys-lf.com` or `162.241.225.54`,
  user `lyslfcom`, home `/home4/lyslfcom`. Use for deploy, log inspection,
  `.htaccess` verification. Port: see `../../.env` (`SSH_PORT`).
- **FTP/SFTP** — 5 FTP accounts. Deploy target = `public_html`. **Show
  hidden files** so `.htaccess` uploads (see DEPLOYMENT.md).

### Resource snapshot (as observed)
| Metric | Usage |
|--------|-------|
| Disk | 163.62 MB / 10 GB (1.6%) |
| Files | 1,821 / ∞ |
| Bandwidth | 227.31 MB / ∞ (monthly) |
| Email accounts | 2 / 2 (at plan cap) |
| MySQL databases | 1 / 20 (WordPress — unused by static site) |
| PostgreSQL databases | 0 / 20 |
| FTP accounts | 5 |
| Addon / subdomains / aliases | 0 |

> Email is at the plan cap (2/2) — a new mailbox needs a plan change. The
> MySQL DB belongs to WordPress; drop it after cutover (SECURITY.md OPS-2).

---

## 3. Domain & renewal calendar

| Event | Date | Notes |
|-------|------|-------|
| Auto-renewal charge | **Dec 20, 2028** | Billing on file must be valid before this |
| **Hosting** expiration | **Jan 4, 2027** | WordPress Basic Hosting — renews sooner than the domain |
| **Domain** expiration | **Jan 4, 2029** | |

> ⚠ **Hosting lapses first (Jan 4, 2027).** Set a reminder ~30 days prior.
> Domain runs to Jan 4 2029; auto-renew charge Dec 20 2028. A superseded note
> once showed a Jan-15 set — disregarded as stale.

**Action:** calendar reminders 30 days before **Jan 4 2027** (hosting) and
**Dec 20 2028** (renewal billing).

### DNS / nameservers
<!-- FILL: Bluehost default nameservers, or Cloudflare/other in front? Any CDN/proxy? List NS or provider. -->
_TODO — provide DNS provider + whether a CDN/proxy (e.g. Cloudflare) fronts the site._

---

## 4. Email

Two mailboxes (plan cap 2/2). Passwords → `../../.env`.

| Mailbox | Purpose |
|---------|---------|
| `admin@lys-lf.com` | Administrative / owner |
| `noreply@lys-lf.com` | Outbound / no-reply |

### Mail service
<!-- FILL: Bluehost cPanel mail (MX @ Bluehost) or Google Workspace / 365 / other? -->
_TODO — confirm: Bluehost cPanel mail vs external provider._

> The site is **mailto-only** (no forms, no server mail). Mailboxes are for
> correspondence, not app delivery.

---

## 5. Source control & deployment

| Item | Value |
|------|-------|
| Repo | GitHub — `boazcstrike/lys-lf.com` |
| Working branch (current) | `feat/cookie-consent-compliance` |
| Default branch | `main` |
| Build | `npm run build` → emits `out/` (static export) |
| Deploy | Upload **all of `out/`** (incl. hidden `.htaccess`) → `public_html` |

### CI / automation — pipeline (build off-server, ship static)

Two paths, **one shared script** `scripts/deploy.sh` (rsync-over-SSH):

- **Option A — GitHub Actions** (`.github/workflows/deploy.yml`). Triggers:
  `workflow_dispatch` (pick staging/prod, optional dry-run) and **git tag
  `v*`** → prod. Builds in a clean runner, guards `out/.htaccess`, rsyncs.
  Secrets/keys in GitHub Actions secrets (see DEPLOY.agent.md §0d).
- **Option B — local / agent** — same `scripts/deploy.sh`, reads repo-root
  `.env`. Runbook: [ops/DEPLOY.agent.md](./ops/DEPLOY.agent.md).

Design notes: build needs Node (unreliable on Bluehost shared) → **never
build on the server**. rsync `--delete-after` = clean mirror + dotfiles;
pre-deploy tarball backup to `~/backups/` = one-line rollback. Staging is a
**subdomain** (`staging.lys-lf.com`, docroot `~/staging`) not a subfolder —
a static export's absolute `/_next/…` paths break under a subdir.

> Deploy hazard: `public_html/.htaccess` is still the **legacy WordPress**
> one (PHP 7.0 handler, Endurance cache). The `--target prod` deploy
> replaces it (and the WP files) — that IS the cutover. See DEPLOYMENT.md
> §"Critical Bluehost notes" + SECURITY.md OPS-1 / cutover checklist.

---

## 6. Analytics

Google Analytics 4, Consent Mode v2. GA compiles into the build only when
`NEXT_PUBLIC_GA_MEASUREMENT_ID` is set.

| Item | Value |
|------|-------|
| GA4 measurement ID | **`G-VE4EEKPNEQ`** (set in `lys-lf-react-19/.env.local`) |
| Google Maps API key | in `.env.local` — **restrict by HTTP referrer** (SECURITY.md APP-3) |

> **Compliance caveat (SECURITY.md APP-1):** production currently gates the
> consent UI OFF, so a prod build with GA would run with no banner / no
> Consent Mode denial. Resolve before treating consent as done.

---

## 7. Credentials

**All real secrets live in the gitignored `../../.env`** (repo root). A
committed `../../.env.example` holds the placeholder template. Ops secrets are
NOT read by Next.js; app build vars live in `lys-lf-react-19/.env.local`
(also gitignored, template `lys-lf-react-19/.env.example`).

Accounts (usernames only here — values in `.env`):

| Account | Username / login | `.env` key |
|---------|------------------|------------|
| Bluehost / domain account | `lys-lf.com` account | `BLUEHOST_ACCOUNT_PASSWORD`, `BLUEHOST_DOMAIN_SECURITY_PIN` |
| cPanel | `lyslfcom` | `CPANEL_PASSWORD` |
| SSH | `lyslfcom` @ `/home4/lyslfcom` | `SSH_*` |
| Email — admin | `admin@lys-lf.com` | `EMAIL_ADMIN_PASSWORD` |
| Email — noreply | `noreply@lys-lf.com` | `EMAIL_NOREPLY_PASSWORD` |
| FTP (×5) | cPanel → FTP Accounts | `FTP_*` |
| Domain security PIN | — | `BLUEHOST_DOMAIN_SECURITY_PIN` |

> **Rotate now (SECURITY.md INFRA-1):** the email, Bluehost account, and
> domain-PIN values were exposed in a chat transcript during setup. Rotate
> each, then update `../../.env`.

---

## 8. Open TODOs

- [ ] DNS provider + CDN/proxy status (§3)
- [ ] Mail service: Bluehost vs external (§4)
- [ ] Deploy method: manual vs CI (§5)
- [ ] Fill remaining blanks in `../../.env` (cPanel pw, SSH port, FTP creds, Maps key)
- [ ] Rotate exposed secrets, then update `../../.env` (§7 / SECURITY.md INFRA-1)
- [ ] Confirm + drop the unused WordPress MySQL DB after cutover (§2)
