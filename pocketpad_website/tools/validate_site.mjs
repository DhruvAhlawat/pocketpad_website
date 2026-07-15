/**
 * Static checks for pocketpad_website before GitHub Pages deploy.
 * Run: node pocketpad_website/tools/validate_site.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, "..");
const contentDir = path.join(siteRoot, "site_content");

const errors = [];

function fail(msg) {
  errors.push(msg);
}

function readText(relPath) {
  return fs.readFileSync(path.join(siteRoot, relPath), "utf8");
}

function fileExists(relPath) {
  return fs.existsSync(path.join(siteRoot, relPath));
}

// ——— Import / export parity for public_site_urls.js ———
const urlsModulePath = path.join(contentDir, "public_site_urls.js");
const urlsModule = await import(pathToFileURL(urlsModulePath).href);
const exportedNames = new Set(Object.keys(urlsModule));

const siteJsFiles = fs
  .readdirSync(contentDir)
  .filter((name) => name.endsWith("_site.js") || name.endsWith("_site.js"))
  .map((name) => path.join(contentDir, name));

for (const filePath of siteJsFiles) {
  const text = fs.readFileSync(filePath, "utf8");
  const importMatch = text.match(
    /import\s*\{([^}]+)\}\s*from\s*["']\.\/public_site_urls\.js["']/,
  );
  if (!importMatch) continue;
  const names = importMatch[1]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  for (const name of names) {
    if (!exportedNames.has(name)) {
      fail(`${path.basename(filePath)} imports missing export "${name}" from public_site_urls.js`);
    }
  }
}

// ——— Forbidden relative downloads paths (pages live under /apps/pocketpad/) ———
for (const filePath of fs.readdirSync(contentDir)) {
  if (!filePath.endsWith(".js")) continue;
  const text = fs.readFileSync(path.join(contentDir, filePath), "utf8");
  if (text.includes("./downloads/") || text.includes('"downloads/')) {
    fail(`${filePath} uses a ./downloads/ path — use public_site_urls.js instead`);
  }
}

// ——— Referenced static assets exist ———
if (!fileExists(urlsModule.pocketpadAppIconAsset)) {
  fail(`Missing app icon asset: ${urlsModule.pocketpadAppIconAsset}`);
}

const overviewText = readText("site_content/pocketpad_overview_site.js");
const slideSrcRe = /src:\s*["'](assets\/[^"']+)["']/g;
let slideMatch;
while ((slideMatch = slideSrcRe.exec(overviewText)) !== null) {
  const asset = slideMatch[1];
  if (!fileExists(asset)) {
    fail(`Gallery slide asset missing: ${asset}`);
  }
}

// ——— Packaged download artifacts exist ———
const downloadsGen = await import(
  pathToFileURL(path.join(contentDir, "pocketpad_downloads.generated.js")).href
);
for (const row of downloadsGen.PocketPadDownloadRows || []) {
  const name = String(row.downloadName || "").trim();
  if (name && !fileExists(path.join("downloads", name))) {
    fail(`Download artifact missing in downloads/: ${name}`);
  }
}

for (const legal of ["EULA.txt", "THIRD_PARTY_NOTICES.txt", "README.txt"]) {
  if (!fileExists(path.join("downloads", legal))) {
    fail(`Missing downloads/${legal}`);
  }
}

// ——— HTML pages load existing modules ———
const htmlFiles = [
  "apps/pocketpad/index.html",
  "apps/pocketpad/info.html",
  "apps/pocketpad/privacy.html",
  "apps/pocketpad/license.html",
];
for (const htmlRel of htmlFiles) {
  const html = readText(htmlRel);
  const scriptMatch = html.match(/src=["']([^"']+site_content\/[^"']+)["']/);
  if (!scriptMatch) {
    fail(`${htmlRel} has no site_content module script`);
    continue;
  }
  const moduleRel = scriptMatch[1].replace(/^\.\.\/\.\.\//, "");
  if (!fileExists(moduleRel)) {
    fail(`${htmlRel} references missing module ${moduleRel}`);
  }
}

if (errors.length) {
  console.error("PocketPad site validation failed:\n");
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

console.log("PocketPad site validation passed.");
