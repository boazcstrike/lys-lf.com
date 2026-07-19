#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# FTPS deploy (lftp) — ACTIVE path while SSH shell access is disabled on the
# Bluehost account. Mirrors out/ to the target dir over FTPS (AUTH TLS).
# When shell/SSH is enabled, prefer scripts/deploy.sh (rsync — faster, backups).
#
# Usage:
#   scripts/ftps-deploy.sh --target staging [--dry-run] [--build]
#   scripts/ftps-deploy.sh --target prod    [--dry-run]
#
# Config via env (repo-root .env locally, or CI secrets):
#   FTP_HOST FTP_PRIMARY_USER FTP_PRIMARY_PASSWORD
#   FTPS_STAGING_DIR FTPS_PROD_DIR   (paths relative to the FTP login home)
# ---------------------------------------------------------------------------
set -euo pipefail

TARGET=""; DRY=0; DO_BUILD=0
while [ $# -gt 0 ]; do case "$1" in
  --target)  TARGET="${2:-}"; shift 2;;
  --dry-run) DRY=1; shift;;
  --build)   DO_BUILD=1; shift;;
  *) echo "unknown arg: $1" >&2; exit 2;;
esac; done

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"; cd "$APP_DIR"
ENV_FILE="$APP_DIR/../.env"; [ -f "$ENV_FILE" ] && { set -a; . "$ENV_FILE"; set +a; }

case "$TARGET" in
  staging) REMOTE="${FTPS_STAGING_DIR:?set FTPS_STAGING_DIR}";;
  prod)    REMOTE="${FTPS_PROD_DIR:?set FTPS_PROD_DIR}";;
  *) echo "ERROR: pass --target staging|prod" >&2; exit 2;;
esac

: "${FTP_HOST:?set FTP_HOST}"; : "${FTP_PRIMARY_USER:?set FTP_PRIMARY_USER}"; : "${FTP_PRIMARY_PASSWORD:?set FTP_PRIMARY_PASSWORD}"
command -v lftp >/dev/null || { echo "ERROR: lftp not installed (CI: apt-get install lftp; local: WSL or the deploy-ftps.yml workflow)."; exit 1; }

if [ "$DO_BUILD" -eq 1 ]; then echo "==> building"; npm ci && npm run build; fi
[ -d out ] || { echo "ERROR: out/ missing — build first (or --build)"; exit 1; }
[ -f out/.htaccess ] || { echo "ERROR: out/.htaccess missing — security headers would be lost. Aborting."; exit 1; }

DRYFLAG=""; [ "$DRY" -eq 1 ] && DRYFLAG="--dry-run"
echo "==> FTPS mirror out/ -> $FTP_HOST:$REMOTE  (target=$TARGET dry=$DRY)"

# ssl-force = require FTPS (encrypted). verify-certificate off because Bluehost
# shared-host certs rarely match the domain CN; data channel is still encrypted.
#
# PROTECTED from --delete (never in our out/, must survive on the server):
#   .well-known/  → ACME/AutoSSL cert validation (deleting breaks TLS renewal)
#   cgi-bin/      → cPanel-managed
# These are excluded so a clean mirror can't remove them.
lftp -u "$FTP_PRIMARY_USER,$FTP_PRIMARY_PASSWORD" "ftp://$FTP_HOST" <<LFTP
set ftp:ssl-force true
set ftp:ssl-protect-data true
set ssl:verify-certificate no
set net:max-retries 2
set net:timeout 20
mirror -R --delete --verbose $DRYFLAG --parallel=4 -x '^\.well-known/' -x '^cgi-bin/' -x '^\.ftpquota$' out/ $REMOTE/
bye
LFTP

echo "==> FTPS done ($TARGET). Verify: curl -I <url>  (expect CSP / HSTS / 301)."
