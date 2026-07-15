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

export const pocketpadPrivacyUrl = `${pocketpadPagesSiteOrigin.replace(/\/$/, "")}/apps/pocketpad/privacy.html`;

/** Windows installers served from the site (not GitHub Releases). */
export const pocketpadDownloadsBaseUrl = `${pocketpadPagesSiteOrigin.replace(/\/$/, "")}/downloads`;

/** Legal / attribution text files under /downloads (site root, not under /apps/pocketpad/). */
export const pocketpadEulaTextUrl = `${pocketpadDownloadsBaseUrl}/EULA.txt`;
export const pocketpadThirdPartyNoticesUrl = `${pocketpadDownloadsBaseUrl}/THIRD_PARTY_NOTICES.txt`;

/** Google Play listing — set to "" to hide the badge until the app is live. */
export const pocketpadPlayStoreUrl =
  "https://play.google.com/store/apps/details?id=com.datron.pocketpad";
