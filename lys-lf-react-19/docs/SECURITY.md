# Security Posture & Risk Register

Consolidated security reference for **lys-lf.com** (Lim & Yutatco-Sze Law
Firm). Covers the current WordPress-on-Bluehost production site *and* the
Next.js static-export replacement being migrated in.

Related: [INFRASTRUCTURE.md](./INFRASTRUCTURE.md) · [../DEPLOYMENT.md](../DEPLOYMENT.md) · [../AGENTS.md](../AGENTS.md)

Severity: **CRITICAL** = fix before merge/deploy · **HIGH** = fix before
release · **MEDIUM** = plan a fix · **LOW** = note/accepted.

---

## 1. Context (corrected 2026-07-20 via live FTPS inspection)

The Next.js **static export is already LIVE** in `public_html` (serving HTTP
200). The WP→static migration already happened; deploys have been **manual
zip uploads** (`out-*.zip` still on the server). WordPress is not serving —
only crumbs remain (stale `.htaccess`, PHP handlers).

**But** the live `.htaccess` is still the **old WordPress one** — our
security-header `.htaccess` was never deployed, so production currently serves
with **no CSP/HSTS/X-Frame-Options** (OPS-5). SSH shell is disabled; the
active deploy transport is **FTPS**.

Most application-layer risk is **low** (no server code, no app DB, no auth, no
user input beyond `mailto:`). The real exposure is **operational** (missing
headers, secrets, deploy hygiene) and **compliance** (analytics consent).

---

## 2. Risk register

| ID | Sev | Risk | Status / action |
|----|-----|------|-----------------|
| OPS-5 | HIGH | **CONFIRMED LIVE:** production serves with **zero security headers** (live headers = only `Server: Apache`). The deployed `public_html/.htaccess` is the **old WordPress** one (PHP 7.0 handler, Endurance cache) — our CSP/HSTS/X-Frame `.htaccess` was never uploaded. | Deploy our `public/.htaccess` (FTPS) so `out/.htaccess` replaces the WP one. Verify with `curl -I`. First controlled deploy priority. |
| INFRA-1 | HIGH | Bluehost/cPanel, email, domain-PIN, key passphrase, and FTP password were pasted into chat transcripts during setup. | **Rotate all** in provider, update `../.env`. Then this row → resolved. |
| INFRA-2 | MEDIUM | WordPress no longer serves, but crumbs persist in `public_html` (stale `.htaccess`, `.htaccess.phpupgrader.*`, PHP 7.0/8.2 handlers, old `out-*.zip` build dumps). Clutter + minor surface. | Deploy our `.htaccess` (removes WP rewrite/handlers); archive then remove old zips + `.htaccess.*` leftovers. |
| APP-1 | HIGH | Production build gates the consent UI **OFF**: GA would run with no banner and no Consent Mode denial. Not GDPR / RA-10173 (PH Data Privacy Act) compliant if GA sets cookies for EU/PH visitors. | Client-accepted while UX finalises. Re-enable before "done": remove `NODE_ENV==='production'` guards in `consent-mode-init.tsx`, `cookie-settings-button.tsx`, `layout.tsx`, `privacy/page.tsx`. GA id is live (`G-VE4EEKPNEQ`). |
| APP-3 | MEDIUM | `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is inlined into the browser bundle (unavoidable for client Maps). Unrestricted key = quota theft / billing abuse. | Restrict key by **HTTP referrer** (`lys-lf.com`, `*.lys-lf.com`) and to **Maps JavaScript API** only in Google Cloud console. |
| OPS-1 | MEDIUM | Security headers live **only** in `public/.htaccess`. If the hidden dotfile isn't uploaded, or the WP `.htaccess` isn't fully replaced, all headers + HTTPS redirect are silently lost. | Deploy checklist must verify `.htaccess` present and is *ours*. Post-deploy header check (§4). |
| APP-2 | MEDIUM | CSP uses `script-src 'unsafe-inline'`. | **Accepted** — static export has no per-request nonces; Consent bootstrap + Next runtime emit inline scripts. Strict CSP needs SSR/nonces (not this stack). |
| OPS-2 | MEDIUM | 1 MySQL DB on the account, unused by the static site (WP leftover). Idle DB = needless surface. | After WP decommission, drop the DB + WP files from `public_html`. |
| OPS-3 | LOW | Shared hosting on shared IP `162.241.225.54` (noisy-neighbor, shared IP reputation for mail). | Inherent to plan. Accept, or move mail to a dedicated provider. |
| OPS-4 | LOW | HSTS `max-age=15552000` (180d), no `preload`, no `includeSubDomains`. | Intentional — reversible if TLS is ever interrupted. Raise once stable. |

---

## 3. Positive controls (already in place)

- **Static export**: no server runtime, no server-side code paths to exploit.
- **No app database, no auth, no forms** — contact is `mailto:` only; input
  attack surface (SQLi/XSS-via-input/CSRF) is effectively nil for the new site.
- **Security headers authored** in `public/.htaccess` (X-Frame-Options,
  nosniff, Referrer-Policy, Permissions-Policy, COOP, HSTS, CSP, `form-action
  'self'`, `object-src 'none'`, dotfile deny). ⚠ **NOT yet live** — see OPS-5;
  they take effect only once this `.htaccess` is deployed.
- **HTTPS-forced** (301) — currently via the *legacy WP* `.htaccess` (works,
  but replace with ours to also get the security headers).
- **`poweredByHeader: false`** — no `X-Powered-By` version leak.
- **Consent Mode v2**, default-denied — in dev; correct pattern once
  re-enabled for prod (APP-1).
- **Secrets are gitignored** (`.env*`) and none are tracked in git. Templates
  (`.env.example`) carry placeholders only.
- **Fonts self-hosted** (`next/font`) — no third-party font CDN in CSP.

---

## 4. Deploy-time security checklist

Run on every production upload:

- [ ] `out/.htaccess` uploaded (show hidden files) and **replaces** WP one.
- [ ] `curl -I https://lys-lf.com` shows CSP, HSTS, X-Frame-Options, nosniff.
- [ ] `http://` 301-redirects to `https://`.
- [ ] `https://lys-lf.com/.htaccess` returns 403 (dotfile deny works).
- [ ] If GA shipped: consent decision made per APP-1 (banner on, or client sign-off).
- [ ] Google Maps key referrer-restricted (APP-3).
- [ ] No `.env`, `.env.local`, or source maps present under `public_html`.

## 5. Migration cutover (WP → static) security tasks

- [ ] Snapshot/backup WP + DB before overwriting `public_html`.
- [ ] Replace WP `.htaccess` (removes PHP 7.0 handler, Endurance cache, WP rewrite).
- [ ] Remove WP PHP files from web root once static site verified.
- [ ] Drop unused MySQL DB (OPS-2).
- [ ] Rotate all secrets exposed during setup (INFRA-1).
- [ ] Confirm DNS/registrar lock + auto-renew billing valid before Dec 20 2028.
