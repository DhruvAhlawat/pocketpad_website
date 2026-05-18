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
