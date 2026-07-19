#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# LOCAL FTPS uploader using curl (fallback when lftp isn't installed, e.g.
# Windows Git Bash). Walks out/ and uploads each file over FTPS with
# --ftp-create-dirs.
#
# NOTE: ADDITIVE — it does NOT delete remote files missing from out/. For a
# clean mirror (with --delete) use scripts/ftps-deploy.sh (lftp) or the
# deploy-ftps.yml CI workflow. Additive is the safe default for a first push.
#
# Usage: scripts/ftps-curl-upload.sh --target staging [--dry-run]
# Config from repo-root .env: FTP_HOST FTP_PRIMARY_USER FTP_PRIMARY_PASSWORD
#                             FTPS_STAGING_DIR FTPS_PROD_DIR
# ---------------------------------------------------------------------------
set -uo pipefail   # NOT -e: one file failure must not abort the whole upload

TARGET=""; DRY=0
while [ $# -gt 0 ]; do case "$1" in
  --target)  TARGET="${2:-}"; shift 2;;
  --dry-run) DRY=1; shift;;
  *) echo "unknown arg: $1" >&2; exit 2;;
esac; done

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"; cd "$APP_DIR"
ENV_FILE="$APP_DIR/../.env"; [ -f "$ENV_FILE" ] && { set -a; . "$ENV_FILE"; set +a; }

case "$TARGET" in
  staging) REMOTE="${FTPS_STAGING_DIR:?set FTPS_STAGING_DIR}";;
  prod)    REMOTE="${FTPS_PROD_DIR:?set FTPS_PROD_DIR}";;
  *) echo "ERROR: pass --target staging|prod" >&2; exit 2;;
esac
REMOTE="${REMOTE#/}"   # strip leading slash for the FTP URL (relative to login home)

: "${FTP_HOST:?}"; : "${FTP_PRIMARY_USER:?}"; : "${FTP_PRIMARY_PASSWORD:?}"
[ -d out ] || { echo "ERROR: out/ missing — build first"; exit 1; }
[ -f out/.htaccess ] || { echo "ERROR: out/.htaccess missing — headers would be lost. Aborting."; exit 1; }

COUNT="$(cd out && find . -type f | wc -l | tr -d ' ')"
echo "==> target=$TARGET  remote=ftp://$FTP_HOST/$REMOTE/  files=$COUNT  dry=$DRY"
if [ "$DRY" -eq 1 ]; then
  echo "--- would upload (first 25) ---"
  (cd out && find . -type f | sed 's|^\./||' | head -25)
  echo "... ($COUNT total). No changes made."
  exit 0
fi

# --ftp-skip-pasv-ip: Bluehost FTPS returns an internal PASV IP; reuse the
# control-connection IP instead (fixes curl 18 / FTP 451). Retry transient drops.
CURL_OPTS=(-sS --ssl-reqd -k --ftp-create-dirs --ftp-skip-pasv-ip \
           --retry 4 --retry-delay 2 --connect-timeout 25 --max-time 120 \
           -u "$FTP_PRIMARY_USER:$FTP_PRIMARY_PASSWORD")

remote_size() {  # $1 = rel path; echo remote byte size (empty if absent)
  curl -s --ssl-reqd -k --ftp-skip-pasv-ip --connect-timeout 20 \
    -u "$FTP_PRIMARY_USER:$FTP_PRIMARY_PASSWORD" --head "ftp://$FTP_HOST/$REMOTE/$1" 2>/dev/null \
    | awk -F': ' 'tolower($1) ~ /content-length/ {print $2}' | tr -d '\r '
}

upload_all() {  # $1 = pass label; reads file list on stdin; failures -> FAILED_OUT
  local n=0 rel f lsz rsz try ok
  while IFS= read -r f; do
    rel="${f#./}"; n=$((n+1)); lsz="$(wc -c < "$f" | tr -d ' ')"; ok=0
    # PUT then verify remote size == local; retry the whole PUT until it matches
    for try in 1 2 3 4; do
      curl "${CURL_OPTS[@]}" -T "$f" "ftp://$FTP_HOST/$REMOTE/$rel" >/dev/null 2>/tmp/curlerr || true
      rsz="$(remote_size "$rel")"
      if [ -n "$rsz" ] && [ "$rsz" = "$lsz" ]; then ok=1; break; fi
    done
    if [ "$ok" -eq 1 ]; then
      printf '\r  [%s] %d/%d  %-46s' "$1" "$n" "$COUNT" "$rel"
    else
      printf '\r  [%s] FAIL %s (local=%s remote=%s)\n' "$1" "$rel" "$lsz" "${rsz:-none}"
      printf '%s\n' "$rel" >> "$FAILED_OUT"
    fi
  done
}

cd out
FAILED_OUT="$(mktemp)"; : > "$FAILED_OUT"
find . -type f | upload_all "pass1"
# Retry any failures once
if [ -s "$FAILED_OUT" ]; then
  echo ""; echo "==> retrying $(grep -c . "$FAILED_OUT") failed file(s)..."
  RETRY_IN="$(mktemp)"; sed 's|^|./|' "$FAILED_OUT" > "$RETRY_IN"; : > "$FAILED_OUT"
  upload_all "retry" < "$RETRY_IN"; rm -f "$RETRY_IN"
fi
FAILN="$(grep -c . "$FAILED_OUT" 2>/dev/null || echo 0)"
printf '\n==> done: %d files, %s failures.\n' "$COUNT" "$FAILN"
[ "$FAILN" -gt 0 ] && { echo "still-failed:"; cat "$FAILED_OUT"; }
rm -f "$FAILED_OUT"
echo "Verify: curl -Ik https://$([ "$TARGET" = staging ] && echo staging.lys-lf.com || echo lys-lf.com)/"
