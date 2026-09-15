// With `output: "standalone"` in next.config.ts, `next build` produces a
// self-contained server at `.next/standalone/server.js`, but it deliberately
// does not include `public/` or `.next/static` (Next's docs say these are
// meant to be served by a CDN instead). Since `next start` refuses to run at
// all once `output: "standalone"` is set, `npm start` runs that server
// directly — so this script copies both folders in as a `postbuild` step,
// the same way the Dockerfile's runner stage does for the container image.
import { cpSync } from "node:fs";

cpSync("public", ".next/standalone/public", { recursive: true });
cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });
