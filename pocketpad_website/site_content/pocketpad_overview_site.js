/**
 * PocketPad home page (apps/pocketpad/index.html). All copy and images live in the HTML so
 * crawlers see them; this module only keeps the Companion download block in sync with
 * `pocketpad_downloads.generated.js` (run sync_pocketpad_website_downloads.ps1 after packaging).
 * The HTML already carries working /downloads/latest/ links as a fallback.
 */
import { PocketPadDownloadArtifacts, PocketPadDownloadRows } from "./pocketpad_downloads.generated.js";
import { pocketpadDownloadsLatestBaseUrl } from "./public_site_urls.js";

function hydrateDownloads() {
  const row = PocketPadDownloadRows[0];
  const exe = document.getElementById("dl-exe");
  if (exe && row?.downloadName) {
    const base = pocketpadDownloadsLatestBaseUrl.replace(/\/$/, "");
    exe.href = `${base}/${encodeURIComponent(row.downloadName)}`;
    exe.download = row.downloadName;
  }

  const ver = document.getElementById("dl-version");
  if (ver && PocketPadDownloadArtifacts.version) {
    ver.textContent = `Version ${PocketPadDownloadArtifacts.version}`;
  }
}

hydrateDownloads();
