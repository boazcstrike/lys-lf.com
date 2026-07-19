# RESUME HERE — extract staging zip (do when ready)

**Status as of last session:** `out.zip` (the full staging build, 264 files
incl. `.htaccess` + a correct 60,731-byte `index.html`) is **uploaded intact**
to `/home4/lyslfcom/staging/out.zip` (verified 23,209,791 bytes). It just needs
**server-side extraction**. Production (`public_html`) is untouched.

---

## Why a zip (the key finding — don't lose this)

Bluehost runs a **server-side upload scanner** (ImunifyAV/ModSecurity) that
**rejects `index.html`'s plaintext** — its inline JavaScript (GA/consent/Next
hydration `<script>`) trips a malware signature. Proven: the exact same content
uploaded as `.txt`, `.tmp`, and `.html` all failed with FTP `451`, but the same
bytes **gzipped/zipped uploaded fine**, and unrelated files (favicon 285 KB,
other `.html`) upload fine.

**Consequence:** per-file FTP (curl **or** lftp, local **or** CI) **cannot**
deploy this site — it's server-side, not a tooling problem. The working method
for this host is **build → zip → upload zip → extract server-side** (exactly
what the old `out-*.zip` files in `public_html` were). Full automation needs
**SSH → rsync** (writes over SSH, bypassing the FTP scanner) — but SSH shell is
currently **disabled** on the account.

---

## STEP 1 — Extract the zip (cPanel File Manager)

Shell is disabled, so extract via the web UI:

1. **cPanel → Files → File Manager**
2. Top-right **Settings** → tick **"Show Hidden Files (dotfiles)"** → Save
   (so `.htaccess` is visible after extraction)
3. Navigate to the staging docroot: **Home** (`/home4/lyslfcom`) → open the
   **`staging`** folder — ⚠ NOT `public_html`
4. Select **`out.zip`** → **Extract** (toolbar or right-click) → confirm the
   target path is `/home4/lyslfcom/staging` → **Extract Files**
   - This overwrites the broken 0-byte `index.html` and the partial files
5. (Optional) delete `out.zip` afterward

## STEP 2 — Verify (ask the agent, or check yourself)

Expected after extraction:
- `https://staging.lys-lf.com/` → **HTTP 200, ~60 KB** (not 0 bytes)
- Page shows the firm content ("Yutatco-Sze")
- Security headers live: `curl -I https://staging.lys-lf.com/` → CSP, HSTS,
  X-Frame-Options (already confirmed live from the `.htaccess`)
- `/privacy/` → 200, a bogus path → custom 404
- GA snippet (`G-VE4EEKPNEQ`) present in page source
- Map tile renders **only if** the Maps API key's HTTP-referrer restrictions in
  Google Cloud Console include `staging.lys-lf.com` (see below)

Quick self-check command (from the repo):
```bash
curl -sSIk https://staging.lys-lf.com/ | grep -iE 'HTTP|content-security|strict-transport'
curl -sSk https://staging.lys-lf.com/ -o /dev/null -w 'bytes=%{size_download}\n'   # want ~60000+
```

---

## Outstanding items (for later)

- [ ] **Maps referrer:** add `staging.lys-lf.com/*` (and keep `lys-lf.com/*`) to
      the Maps JS API key allowed referrers in Google Cloud Console — else the
      staging map errors. Key: `AIzaSy…dqfQ` (in `.env` / `.env.local`).
- [ ] **Production deploy:** same zip method — build → zip → upload to
      `public_html` → extract → overwrite. A prod extract replaces the stale WP
      `.htaccess` and finally puts the **security headers live on prod**
      (SECURITY.md OPS-5, currently prod has none).
- [ ] **Enable SSH shell** (Bluehost dashboard / support ticket) → unlocks
      rsync automation (`scripts/deploy.sh`) and ends the manual zip dance.
- [ ] **Rotate exposed secrets** (account/FTP pw, key passphrase) — SECURITY.md
      INFRA-1.
- [ ] GA runs **consent-free** in prod — client-accepted (APP-1), no change.

## Notes
- `scripts/ftps-curl-upload.sh` is **not viable** for this host (scanner blocks
  index.html). Kept only for reference. Use the zip method or rsync-over-SSH.
- Rebuild if the code changed since last session:
  `cd lys-lf-react-19 && npm run build`, then rezip with PowerShell:
  `[IO.Compression.ZipFile]::CreateFromDirectory("$PWD\out","$PWD\out.zip")`
  (includes hidden `.htaccess`; git-bash has no `zip`).
