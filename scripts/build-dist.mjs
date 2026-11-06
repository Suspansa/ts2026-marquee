// Builds dist/: a plain-HTML drop-in of the marquee that needs no Next.js and no React.
//   dist/index.html   markup rendered from app/page.tsx
//   dist/marquee.css  app/globals.css only (the site provides the global salesforce.com styles)
//   dist/vendor/      the two global salesforce.com stylesheets, for the standalone index.html preview only
//   dist/marquee.ts   app/ts2026-marquee.tsx without the React entry: a plain, self-starting TypeScript file
// Run: npm run build:dist
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
mkdirSync(dist, { recursive: true });

const REACT_ENTRY_MARKER = "// ---- React entry";

// ---------- TS ----------
// dist/marquee.ts is the source minus the Next.js/React entry: a plain TypeScript module with no imports.
// It self-starts when loaded as a classic <script>; bundled as a module, call initTs2026Marquee() yourself.
const source = readFileSync(join(root, "app/ts2026-marquee.tsx"), "utf8");
const cut = source.indexOf(REACT_ENTRY_MARKER);
if (cut < 0) throw new Error(`Marker "${REACT_ENTRY_MARKER}" not found in app/ts2026-marquee.tsx`);
const tsSource = source
  .slice(0, cut)
  .replace(/^"use client";\s*/m, "")
  .replace(/^import \{ useEffect \} from "react";\s*/m, "")
  .trimEnd();
if (/^import /m.test(tsSource)) throw new Error("dist/marquee.ts must not import anything");
// Script-style TS (no import/export): plain `tsc` then emits a classic browser script instead of CommonJS.
// The IIFE keeps every helper off the global scope; window.Ts2026Marquee is the only thing exposed.
const scriptBody = tsSource.replace(/^export (const|let|function|class|type|interface) /gm, "$1 ");
const marqueeTs = `// ts2026 marquee — built from app/ts2026-marquee.tsx by scripts/build-dist.mjs (React entry removed).
// Plain TypeScript, no imports: compile with \`tsc marquee.ts --target es2017\` and load the result as a classic <script>.
// It starts itself on DOMContentLoaded; window.Ts2026Marquee.init() re-runs it and returns a teardown function.
(() => {
${scriptBody}

Object.assign(window, {
  Ts2026Marquee: {
    init: initTs2026Marquee,
    ROOT_ID: TS2026_MARQUEE_ROOT_ID,
    HERO_ID: TS2026_MARQUEE_HERO_ID,
    CTA_ID: TS2026_MARQUEE_CTA_ID,
  },
});
})();
`;
writeFileSync(join(dist, "marquee.ts"), marqueeTs);
// Type-check the standalone file so a broken hand-off never ships.
const diagnostics = ts.getPreEmitDiagnostics(
  ts.createProgram([join(dist, "marquee.ts")], { target: ts.ScriptTarget.ES2017, module: ts.ModuleKind.ESNext, strict: true, lib: ["lib.es2017.d.ts", "lib.dom.d.ts", "lib.dom.iterable.d.ts"], noEmit: true, skipLibCheck: true })
);
if (diagnostics.length) {
  for (const d of diagnostics) console.error(ts.flattenDiagnosticMessageText(d.messageText, "\n"));
  throw new Error("dist/marquee.ts has type errors");
}

// ---------- CSS ----------
// marquee.css is ONLY our stylesheet: the blade build runs it through lightningcss, and the site already
// ships the global salesforce.com CSS. Those vendor files are copied to dist/vendor/ just so index.html
// renders standalone; they are not part of the hand-off.
const css = `/* ts2026 marquee — built from app/globals.css by scripts/build-dist.mjs. Needs the site's global (pbc) styles loaded first. */
${readFileSync(join(root, "app/globals.css"), "utf8").trim()}
`;
writeFileSync(join(dist, "marquee.css"), css);
const vendorCss = ["style-BXsTthxJ.css", "style.65e807cb31f1523f3dcd.css"];
mkdirSync(join(dist, "vendor"), { recursive: true });
for (const f of vendorCss) copyFileSync(join(root, "public", f), join(dist, "vendor", f));

// ---------- HTML ----------
const pageTsx = readFileSync(join(root, "app/page.tsx"), "utf8");
const pageJs = ts.transpileModule(pageTsx, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX },
  fileName: "page.tsx",
}).outputText;
const cacheDir = join(root, "node_modules/.cache/ts2026-dist");
mkdirSync(cacheDir, { recursive: true });
const pageFile = join(cacheDir, `page-${Date.now()}.mjs`);
writeFileSync(pageFile, pageJs);
const { default: Home } = await import(pathToFileURL(pageFile).href);
let markup = renderToStaticMarkup(createElement(Home));
// React never serialises `muted` (it treats it as a property), so restore it where page.tsx has it.
markup = markup.replace(/<video(?![^>]*\bmuted\b)([^>]*)>/g, "<video muted$1>");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tableau Studio marquee</title>
<!-- Site globals (already present on salesforce.com; here only so the page renders standalone). -->
${vendorCss.map((f) => `<link rel="stylesheet" href="vendor/${f}">`).join("\n")}
<link rel="stylesheet" href="marquee.css">
</head>
<body>
${markup}
<!-- marquee.js is marquee.ts compiled: tsc marquee.ts --target es2017 -->
<script src="marquee.js"></script>
</body>
</html>
`;
writeFileSync(join(dist, "index.html"), html);

const kb = (s) => `${(Buffer.byteLength(s) / 1024).toFixed(1)} KB`;
console.log(`dist/index.html  ${kb(html)}\ndist/marquee.css ${kb(css)}\ndist/marquee.ts  ${kb(marqueeTs)}`);
