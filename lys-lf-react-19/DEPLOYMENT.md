# Deployment & Cookie Consent Notes

Static export (`output: 'export'`, `trailingSlash: true`) deployed by
uploading `out/` into Bluehost `public_html` (Apache shared hosting).

## Build & deploy

```bash
npm run build      # emits out/  (static export, copies public/ incl. .htaccess)
```

Upload **everything in `out/`** to `public_html`, including the hidden
`out/.htaccess`.

### Critical Bluehost notes

1. **Replace, do not merge, the existing `.htaccess`.** `public_html`
   currently holds the old WordPress `.htaccess` (Endurance cache, PHP 7.0
   handler, `RewriteRule . /index.php`). That WP rewrite hijacks every
   request and breaks the static site (no `index.php` exists). Our
   `out/.htaccess` must overwrite it completely.
2. **Hidden file.** `.htaccess` is a dotfile — FileZilla/cPanel/Windows
   often hide it. Enable "show hidden files" or it silently won't upload,
   and all security headers + routing are lost.
3. Requires Apache `mod_headers`, `mod_rewrite`, `mod_deflate`,
   `mod_expires` (standard on Bluehost; wrapped in `<IfModule>` so it
   degrades safely if any are absent).

### What `public/.htaccess` provides

Static export cannot emit HTTP headers via `next.config`, so Apache does it:
security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy,
Permissions-Policy, COOP, HSTS), a CSP, HTTPS 301 redirect, gzip, immutable
caching for fingerprinted assets, `no-cache` for HTML, custom 404, dotfile
deny.

CSP note: `script-src` includes `'unsafe-inline'`. Unavoidable with a static
export — no per-request nonces, and both the Consent Mode bootstrap and
Next's runtime emit inline scripts. Strict CSP would require SSR/nonces
(not this stack).

## Environment behaviour (IMPORTANT — client decision)

The consent flow is a **draft**. By client request the consent UI is
**dev-only**:

| | `next dev` (development) | `npm run build` (production export) |
|---|---|---|
| Consent banner / modal | shown | **not shown** |
| `ConsentModeInit` (default-denied) | active | **not emitted** |
| `/privacy` "Your consent" copy | full consent wording | "control being finalised" wording |
| GA behaviour | cookieless until opt-in | **runs with default behaviour (no consent gating)** |

This means production currently runs Google Analytics with **no consent
banner and no Consent Mode denial**. The client accepted this risk while
the consent UX is finalised. Compliance note: this is *not* GDPR/RA-10173
compliant for EU/PH visitors if GA sets cookies — revisit before the
consent flow is considered done. To re-enable consent in production,
remove the `process.env.NODE_ENV === "production"` guards in
`consent-mode-init.tsx`, `cookie-settings-button.tsx`, and the
`layout.tsx` / `privacy/page.tsx` conditionals.

### GA only runs if the measurement ID is set at build

`NEXT_PUBLIC_GA_MEASUREMENT_ID` is **unset** today, so GA is absent from
`out/` entirely. To actually track in production, build with it:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX npm run build
```

(or a `.env.production` / hosting build-env var). Without it there is no
analytics at all, banner or not.

## Cookie consent / privacy

Compliance: PH Data Privacy Act 2012 (RA 10173) + NPC, GDPR/ePrivacy for
EU/UK visitors. The only non-essential processing is Google Analytics.

- **Consent Mode v2**, default-denied. Inline `<head>` bootstrap
  (`app/components/consent-mode-init.tsx`) runs before GA → analytics
  cookieless until explicit opt-in. Returning accepters re-granted with no
  denied→granted flicker.
- **Banner + preferences modal** (`app/components/cookie-consent.tsx`):
  equal-prominence Accept/Reject (no dark patterns), Necessary locked-on,
  Analytics toggle. Focus trap, Escape (prefs→banner), focus-on-open,
  valid `aria-modal`.
- **Persistence**: `localStorage["lys-cookie-consent"]`
  `{version,categories,timestamp}`. Bump `CONSENT_VERSION` in
  `app/lib/cookie-consent.ts` to force re-consent after policy changes.
- **Withdrawal**: dispatch `OPEN_SETTINGS_EVENT` (exported from
  `app/lib/cookie-consent.ts`) — used by `cookie-settings-button.tsx` in
  the privacy notice.
- **Notice**: `/privacy` — slim Cookies & Analytics Notice. Site stores no
  personal data (informational, mailto-only, no forms). `EFFECTIVE_DATE`
  is a hardcoded string in `app/privacy/page.tsx` — bump on policy change.
  **Draft — review by counsel before final.**

GA only activates when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set at build
(currently unset; `siteConfig.googleAnalyticsId: undefined`).

## Draft 6 fix

`app/drafts/6/_sections/BusinessProfile.tsx`: `position: sticky` moved off
the `Reveal` wrapper to an outer div — the observed-node-is-sticky combo
broke the clip reveal and left a huge blank panel. `Reveal.tsx` now reveals
in-viewport-at-mount content one frame deferred (fixes blank-on-load while
keeping the entrance animation).

## Outstanding / optional

- Footer `/privacy` link not added (banner + notice reachable; a footer
  link would aid discoverability).
- `/privacy` legal copy is a working draft — counsel review pending.
- Strict CSP not possible on this stack (see CSP note).

## Git

Committed on branch `feat/cookie-consent-compliance` (`dbd32b3`), not
pushed. Many unrelated draft files remain modified from prior sessions and
were intentionally excluded from this commit.
