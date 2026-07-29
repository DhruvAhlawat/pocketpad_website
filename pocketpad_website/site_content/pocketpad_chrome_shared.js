/**
 * Shared PocketPad site chrome (mini-nav). Import from page-specific *_site.js modules.
 */
import { resolveAssetHref } from "./site_assets.js";

export function htmlToNodes(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content;
}

export function pill(href, label, active) {
  const a = document.createElement("a");
  a.className = "nav-pill" + (active ? " nav-pill--active" : "");
  a.href = href;
  a.textContent = label;
  if (active) {
    a.setAttribute("aria-current", "page");
  }
  return a;
}

/**
 * @param {object} c Content object with paths, chrome, hero, optional media
 * @param {string} active One of: overview | details | howto | faq | privacy | license
 */
export function buildPocketPadTop(c, active) {
  const row = document.createElement("div");
  row.className = "pocket-top__row";

  const back = document.createElement("a");
  back.className = "pocket-back";
  back.href = c.paths.datronHome;
  back.textContent = c.chrome.backToDatronLabel;
  back.title = "Datron — developer home";

  const nav = document.createElement("nav");
  nav.className = "pocket-mini-nav";
  nav.setAttribute("aria-label", c.chrome.pocketpadNavAriaLabel);

  const brand = document.createElement("span");
  brand.className = "pocket-mini-brand";

  const iconSrc = String(c.paths.appIconPng || "").trim();
  if (iconSrc) {
    const icon = document.createElement("img");
    icon.src = resolveAssetHref(iconSrc);
    icon.width = 34;
    icon.height = 34;
    icon.alt = (c.media && c.media.appIconAlt) || "";
    icon.decoding = "async";
    brand.appendChild(icon);
  } else {
    const ph = document.createElement("span");
    ph.className = "pocket-mini-brand__placeholder";
    ph.setAttribute("aria-hidden", "true");
    brand.appendChild(ph);
  }

  brand.appendChild(
    document.createTextNode(c.hero.headline + (c.chrome.navBrandSuffix || "")),
  );

  nav.appendChild(brand);

  const items = [
    { key: "overview", href: c.paths.pocketpadOverviewPage, label: c.chrome.overviewNavLabel },
    { key: "details", href: c.paths.pocketpadDetailsPage, label: c.chrome.detailsNavLabel },
    { key: "howto", href: c.paths.pocketpadHowToPage, label: c.chrome.howToNavLabel },
    { key: "faq", href: c.paths.pocketpadFaqPage, label: c.chrome.faqNavLabel },
    { key: "privacy", href: c.paths.pocketpadPrivacyPage, label: c.chrome.privacyNavLabel },
  ];

  if (c.paths.pocketpadLicensePage && c.chrome.licenseNavLabel) {
    items.push({
      key: "license",
      href: c.paths.pocketpadLicensePage,
      label: c.chrome.licenseNavLabel,
    });
  }

  for (const item of items) {
    if (!item.href || !item.label) continue;
    nav.appendChild(pill(item.href, item.label, active === item.key));
  }

  row.appendChild(back);
  row.appendChild(nav);
  return row;
}
