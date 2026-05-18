/**
 * Resolve static asset URLs for pocketpad_website (GitHub Pages / custom domain).
 * Uses import.meta.url so paths work no matter which HTML page loads the module.
 */
const SITE_ROOT = new URL("../", import.meta.url);

/** @param {string} pathFromSiteRoot e.g. "assets/screenshots/foo.png" */
export function siteAssetUrl(pathFromSiteRoot) {
  const rel = String(pathFromSiteRoot || "")
    .trim()
    .replace(/^(\.\.\/)+/, "")
    .replace(/^\//, "");
  if (!rel) return "";
  return new URL(rel, SITE_ROOT).href;
}

/** Site-root path, or https URL, or legacy ../../assets/... from content modules. */
export function resolveAssetHref(pathOrUrl) {
  const s = String(pathOrUrl || "").trim();
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  return siteAssetUrl(s);
}
