# DEPLOY.agent.md — deployment runbook (agent-executable)

Deterministic deploy steps for **lys-lf.com**. Any agent: follow top→bottom,
exact commands. Human: same steps. Two paths share ONE script
(`scripts/deploy.sh`): CI (Option A) and local/agent (Option B).

Read first: [../INFRASTRUCTURE.md](../INFRASTRUCTURE.md) · [../SECURITY.md](../SECURITY.md) · [../../DEPLOYMENT.md](../../DEPLOYMENT.md)

Model: static export `out/` → Bluehost `public_html` (or staging dir) via
rsync-over-SSH. Build OFF-server (no reliable Node on shared host).

---

## 0. One-time setup (human — cannot be automated)

Do once, then never again.

### 0a. SSH key (passwordless deploy)
```bash
ssh-keygen -t ed25519 -C "deploy@lys-lf" -f ~/.ssh/lyslf_deploy -N ""
cat ~/.ssh/lyslf_deploy.pub        # copy this PUBLIC key
```
Add the **public** key on the server (cPanel → SSH Access → Manage SSH Keys →
Import, OR append to `~/.ssh/authorized_keys`). Keep the **private** key
(`lyslf_deploy`) secret.

### 0b. Staging subdomain (avoids basePath breakage)
A static export uses absolute `/_next/…` paths — a `/subdir/` breaks assets.
So stage on a **subdomain at its own docroot**, not a subfolder.
cPanel → Domains → Create subdomain: `staging.lys-lf.com`, document root
`/home4/lyslfcom/staging`. (Plan allows unlimited subdomains.)

### 0c. Local `.env` (repo root — gitignored)
Fill deploy vars in `../../.env` (see keys in `.env.example`):
`SSH_HOST SSH_USER SSH_PORT SSH_KEY STAGING_PATH PROD_PATH VERIFY_URL_*`.

### 0d. GitHub Actions secrets (for Option A)
```bash
gh secret set SSH_HOST     -b "lys-lf.com"
gh secret set SSH_USER     -b "lyslfcom"
gh secret set SSH_PORT     -b "22"                       # confirm real port
gh secret set SSH_PRIVATE_KEY < ~/.ssh/lyslf_deploy      # the PRIVATE key
gh secret set STAGING_PATH -b "/home4/lyslfcom/staging"
gh secret set PROD_PATH    -b "/home4/lyslfcom/public_html"
gh secret set NEXT_PUBLIC_GA_MEASUREMENT_ID   -b "G-VE4EEKPNEQ"
gh secret set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY -b "<maps-key>"
gh variable set VERIFY_URL_STAGING -b "https://staging.lys-lf.com"
gh variable set VERIFY_URL_PROD    -b "https://lys-lf.com"
```

---

## 1. Local / agent deploy (Option B)

Runtime: Git Bash / WSL / any POSIX shell (Windows: use the Bash tool).

### 1a. Preflight (agent: verify, don't assume)
```bash
cd lys-lf-react-19
git rev-parse --abbrev-ref HEAD      # confirm intended branch
git status --short                   # working tree clean before a release deploy
```

### 1b. Build
```bash
npm ci
npm run build                        # emits out/  (copies public/.htaccess)
test -f out/.htaccess && echo "htaccess OK" || echo "ABORT: no htaccess"
```

### 1c. Dry-run FIRST (always — shows what would change)
```bash
scripts/deploy.sh --target staging --dry-run
```
Read the rsync file list. Unexpected mass-delete = STOP.

### 1d. Real deploy to staging
```bash
scripts/deploy.sh --target staging
```
Script auto-backs-up the remote dir to `~/backups/` before touching it, then
mirrors `out/`, then curls the verify URL for CSP/HSTS/X-Frame-Options.

### 1e. Verify staging by eye
Open `https://staging.lys-lf.com` — pages, images, map, 404, `/privacy`.

---

## 2. CI deploy (Option A)

- **Staging:** GitHub → Actions → "Deploy" → Run workflow → target `staging`
  (optionally `dry_run`).
- **Prod release:** tag a commit →
  ```bash
  git tag v1.0.0 && git push origin v1.0.0
  ```
  Tag push auto-runs the workflow against **prod**.

Same `scripts/deploy.sh` runs inside CI; secrets come from step 0d.

---

## 3. Production cutover (WP → static) — deliberate, one time

Prereq: staging signed off; SECURITY.md cutover checklist done; WP + DB backed up.

```bash
# from lys-lf-react-19, with a fresh build present:
scripts/deploy.sh --target prod --dry-run     # review — this WILL delete WP files
scripts/deploy.sh --target prod               # clean-mirror replaces public_html
```
`--delete-after` removes the old WordPress files from `public_html` — that IS
the cutover. The pre-deploy backup tarball is your undo.

Post-cutover: confirm `https://lys-lf.com` headers (script does this), then
drop the unused WP MySQL DB (SECURITY.md OPS-2).

---

## 4. Rollback

Restore the most recent backup tarball:
```bash
ssh -p "$SSH_PORT" "$SSH_USER@$SSH_HOST" \
  'ls -t ~/backups/deploy-prod-*.tgz | head -1'          # find latest
ssh -p "$SSH_PORT" "$SSH_USER@$SSH_HOST" \
  'cd ~/public_html && rm -rf ./* ./.htaccess && tar xzf ~/backups/deploy-prod-<TS>.tgz'
```
Or (CI): re-run the workflow from the previous good tag/commit.

---

## 5. Guardrails (never skip)

- Deploy only a **fresh** `out/` with `out/.htaccess` present (script enforces).
- **Dry-run before prod**, every time.
- `--target prod` on shared `public_html` **deletes WP** — only at cutover.
- Secrets stay in `.env` / GitHub secrets. Never echo a secret into logs.
- After any deploy, confirm CSP + HSTS + HTTPS-301 (script curls; else manual
  `curl -I`).
