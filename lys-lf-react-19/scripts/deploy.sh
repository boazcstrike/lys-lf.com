#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Deploy lys-lf.com static export (out/) to Bluehost via rsync-over-SSH.
# ONE script, shared by GitHub Actions (Option A) and local/agent (Option B).
#
# Usage:
#   scripts/deploy.sh --target staging [--dry-run] [--build] [--no-backup]
#   scripts/deploy.sh --target prod    [--dry-run]
#
# Config via env vars. Local/agent runs auto-load the gitignored repo-root
# .env; CI sets these directly as secrets:
#   SSH_HOST SSH_USER SSH_PORT SSH_KEY
#   STAGING_PATH  remote dir (e.g. /home4/lyslfcom/staging)
#   PROD_PATH     remote dir (e.g. /home4/lyslfcom/public_html)
#   VERIFY_URL_STAGING VERIFY_URL_PROD   (optional post-deploy header check)
# ---------------------------------------------------------------------------
set -euo pipefail

TARGET=""; DRY_RUN=0; DO_BUILD=0; DO_BACKUP=1
while [ $# -gt 0 ]; do
  case "$1" in
    --target)    TARGET="${2:-}"; shift 2;;
    --dry-run)   DRY_RUN=1; shift;;
    --build)     DO_BUILD=1; shift;;
    --no-backup) DO_BACKUP=0; shift;;
    *) echo "unknown arg: $1" >&2; exit 2;;
  esac
done

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$APP_DIR"

# Load repo-root .env for local/agent runs (absent in CI — env set directly).
ENV_FILE="$APP_DIR/../.env"
if [ -f "$ENV_FILE" ]; then set -a; . "$ENV_FILE"; set +a; fi

case "$TARGET" in
  staging) REMOTE_PATH="${STAGING_PATH:?set STAGING_PATH}"; VERIFY_URL="${VERIFY_URL_STAGING:-}";;
  prod)    REMOTE_PATH="${PROD_PATH:?set PROD_PATH}";        VERIFY_URL="${VERIFY_URL_PROD:-}";;
  *) echo "ERROR: pass --target staging|prod" >&2; exit 2;;
esac

: "${SSH_HOST:?set SSH_HOST}"; : "${SSH_USER:?set SSH_USER}"; : "${SSH_PORT:=22}"
SSH_OPTS="-p $SSH_PORT -o StrictHostKeyChecking=accept-new"
[ -n "${SSH_KEY:-}" ] && SSH_OPTS="$SSH_OPTS -i $SSH_KEY"
REMOTE="$SSH_USER@$SSH_HOST"

echo "==> target=$TARGET  remote=$REMOTE:$REMOTE_PATH  dry_run=$DRY_RUN"

if [ "$DO_BUILD" -eq 1 ]; then
  echo "==> building (npm ci && npm run build)"
  npm ci && npm run build
fi

# --- Guards: never ship a broken/headerless deploy -------------------------
[ -d out ] || { echo "ERROR: out/ missing — build first (or pass --build)"; exit 1; }
[ -f out/.htaccess ] || { echo "ERROR: out/.htaccess missing — all security headers + HTTPS redirect would be lost. Aborting."; exit 1; }

# --- Ensure remote dir + timestamped backup (cheap rollback) ---------------
ssh $SSH_OPTS "$REMOTE" "mkdir -p '$REMOTE_PATH' ~/backups"
if [ "$DO_BACKUP" -eq 1 ]; then
  TS="$(date +%Y%m%d-%H%M%S)"
  echo "==> backup current $REMOTE_PATH -> ~/backups/deploy-$TARGET-$TS.tgz"
  ssh $SSH_OPTS "$REMOTE" "cd '$REMOTE_PATH' && tar czf ~/backups/deploy-$TARGET-$TS.tgz . 2>/dev/null || true"
fi

# --- rsync: clean mirror, dotfiles included, host artifacts preserved ------
RSYNC_OPTS="-az --delete-after --exclude=cgi-bin --exclude=.well-known --exclude=.ftpquota"
[ "$DRY_RUN" -eq 1 ] && RSYNC_OPTS="$RSYNC_OPTS --dry-run"
echo "==> rsync out/ -> $REMOTE_PATH/"
rsync $RSYNC_OPTS -e "ssh $SSH_OPTS" out/ "$REMOTE:$REMOTE_PATH/"

if [ "$DRY_RUN" -eq 1 ]; then echo "==> dry-run complete (no changes made)"; exit 0; fi

# --- Post-deploy header verification (SECURITY.md checklist) ----------------
if [ -n "$VERIFY_URL" ]; then
  echo "==> verify headers @ $VERIFY_URL"
  H="$(curl -sSI "$VERIFY_URL" || true)"
  echo "$H" | grep -iq 'content-security-policy'    && echo "  OK CSP"             || echo "  !! CSP MISSING"
  echo "$H" | grep -iq 'strict-transport-security'  && echo "  OK HSTS"            || echo "  !! HSTS MISSING"
  echo "$H" | grep -iq 'x-frame-options'            && echo "  OK X-Frame-Options" || echo "  !! X-Frame-Options MISSING"
fi
echo "==> done ($TARGET)."
