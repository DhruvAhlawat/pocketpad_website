/**
 * Published site URLs — edit when domains change.
 *
 * Live Datron hub: https://datronapps.com/
 * Live PocketPad overview: https://pocketpad.datronapps.com/apps/pocketpad/index.html
 * Live PocketPad privacy: https://pocketpad.datronapps.com/apps/pocketpad/privacy.html
 *
 * Keep `pocketpadPagesSiteOrigin` identical to datron_website/site_content/site_urls.js (site root only, no path).
 */
export const datronHubPublicUrl = "https://datronapps.com/";
export const pocketpadPagesSiteOrigin = "https://pocketpad.datronapps.com";

export const pocketpadOverviewUrl = `${pocketpadPagesSiteOrigin.replace(/\/$/, "")}/apps/pocketpad/index.html`;

export const pocketpadInfoUrl = `${pocketpadPagesSiteOrigin.replace(/\/$/, "")}/apps/pocketpad/info.html`;

export const pocketpadPrivacyUrl = `${pocketpadPagesSiteOrigin.replace(/\/$/, "")}/apps/pocketpad/privacy.html`;

export const pocketpadLicenseUrl = `${pocketpadPagesSiteOrigin.replace(/\/$/, "")}/apps/pocketpad/license.html`;

export const pocketpadHowToUrl = `${pocketpadPagesSiteOrigin.replace(/\/$/, "")}/apps/pocketpad/how-to.html`;

export const pocketpadFaqUrl = `${pocketpadPagesSiteOrigin.replace(/\/$/, "")}/apps/pocketpad/faq.html`;

/** Windows installers served from the site (not GitHub Releases). */
export const pocketpadDownloadsBaseUrl = `${pocketpadPagesSiteOrigin.replace(/\/$/, "")}/downloads`;

/**
 * Always-latest Windows installers (stable filenames overwritten on each publish).
 * Prefer these for download buttons and bookmarks.
 */
export const pocketpadDownloadsLatestBaseUrl = `${pocketpadDownloadsBaseUrl}/latest`;
export const pocketpadDownloadsLatestExeUrl = `${pocketpadDownloadsLatestBaseUrl}/PocketPad-PC-Setup.exe`;
export const pocketpadDownloadsLatestZipUrl = `${pocketpadDownloadsLatestBaseUrl}/PocketPad-PC-Windows-x64.zip`;

/** Legal / attribution text files under /downloads (site root, not under /apps/pocketpad/). */
export const pocketpadDownloadsReadmeUrl = `${pocketpadDownloadsBaseUrl}/README.txt`;
export const pocketpadEulaTextUrl = `${pocketpadDownloadsBaseUrl}/EULA.txt`;
export const pocketpadThirdPartyNoticesUrl = `${pocketpadDownloadsBaseUrl}/THIRD_PARTY_NOTICES.txt`;

/** Site-root asset path for resolveAssetHref() in site_content modules. */
export const pocketpadAppIconAsset = "assets/icons/gamepad_1.png";

/** Google Play listing — set to "" to hide the badge until the app is live. */
export const pocketpadPlayStoreUrl =
  "https://play.google.com/store/apps/details?id=com.datron.pocketpad";
