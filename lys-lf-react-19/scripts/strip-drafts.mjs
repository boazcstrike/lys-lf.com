// Post-build gate: remove /drafts from the static export so internal design
// drafts (and logo-lab) never ship to the public web root. Drafts stay fully
// usable in `npm run dev`; only the deployable `out/` is stripped.
//
// Runs automatically via the `postbuild` script after `next build`.
// Set KEEP_DRAFTS=true to skip stripping (e.g. a local export you want to preview).

import { rmSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const draftsDir = join(root, "out", "drafts");

if (process.env.KEEP_DRAFTS === "true") {
  console.log("[strip-drafts] KEEP_DRAFTS=true — leaving out/drafts in place");
} else if (existsSync(draftsDir)) {
  rmSync(draftsDir, { recursive: true, force: true });
  console.log("[strip-drafts] removed out/drafts from static export");
} else {
  console.log("[strip-drafts] no out/drafts to remove");
}
