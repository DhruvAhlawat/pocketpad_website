/**
 * PocketPad Details (`info.html`) — edit `PocketPadInfoContent` below for headings, bullets, links, images.
 */
import {
  datronHubPublicUrl,
  pocketpadAppIconAsset,
  pocketpadDownloadsReadmeUrl,
  pocketpadThirdPartyNoticesUrl,
} from "./public_site_urls.js";
import { resolveAssetHref } from "./site_assets.js";

export const PocketPadInfoContent = {
  meta: {
    title: "PocketPad — Features & setup",
    description: "Technical overview of PocketPad: Bluetooth HID, Wi‑Fi companion, multimedia presets, configurability.",
  },

  paths: {
    stylesheet: "../../styles.css",
    appIconPng: pocketpadAppIconAsset,
    datronHome: datronHubPublicUrl,
    pocketpadOverviewPage: "./index.html",
    pocketpadDetailsPage: "./info.html",
    pocketpadPrivacyPage: "./privacy.html",
    thirdPartyNoticesHref: pocketpadThirdPartyNoticesUrl,
  },

  chrome: {
    backToDatronLabel: "← Back to Datron",
    navBrandSuffix: "",
    overviewNavLabel: "Overview",
    detailsNavLabel: "Details",
    privacyNavLabel: "Privacy",
    pocketpadNavAriaLabel: "PocketPad",
  },

  hero: {
    headline: "PocketPad",
    pageTitle: "How PocketPad works",
    lead_html:
      "PocketPad splits naturally into two paths: <strong>Bluetooth HID</strong> sessions that emulate USB-class devices after pairing (no Companion software on the host) " +
      "and optional <strong>Wi‑Fi / UDP Companion</strong> on Windows for dashboards, KM pairing tokens, multicast discovery, " +
      "and extremely low jitter when lots of phones connect at once.",
  },

  /** Optional alt text when `paths.appIconPng` is set */
  media: {
    appIconAlt: "",
  },

  sections: [
    {
      title: "Bluetooth HID",
      bullets_html: [
        "<strong>No install on hosts</strong> that accept standard HID pairings.",
        "Separate registration paths for generic gamepad emulation vs composite keyboard/mouse — switch modes requires re-pairing on most OSes following the in-app “Prepare” flow.",
        "<strong>Media & TV remotes</strong> send multimedia scan codes usable with smart TVs, Fire sticks, Kodi, VLC, Netflix UIs.",
      ],
    },
    {
      title: "Wi‑Fi companion (Windows)",
      bullets_html: [
        "<strong>PocketPad Companion</strong> bundles discovery, pairing codes for Universal layouts, and a live dashboard.",
        "Companion auto-runs LAN listeners optimized for multiplayer — multiple phones negotiating independent sessions concurrently.",
        `On Windows, install Companion from <a href="./index.html">PocketPad Overview</a> (installer EXE recommended, portable ZIP optional — checksums in <a href="${pocketpadDownloadsReadmeUrl}">README.txt</a>).`,
        `The Windows installer adds <strong>ViGEmBus</strong> when it is not already on your PC—the driver Windows needs so virtual gamepads show up in games. If ViGEmBus is already installed, setup skips that step. License texts: <a href="${pocketpadThirdPartyNoticesUrl}">THIRD_PARTY_NOTICES.txt</a>. PocketPad terms: <a href="./license.html">EULA</a>.`,
      ],
    },
    {
      title: "Controller surfaces",
      bullets_html: [
        "<strong>Layouts & full configurability</strong> via drag edits, clones, joystick logic, tilt-to-steer, steering curves.",
        "<strong>Universal fullscreen</strong>: huge touchpads, clipboard-friendly typing overlays, WASD slabs, programmable macros.",
        "<strong>Presentation & media modes</strong> map to shortcuts for PowerPoint, Google Slides, YouTube-focused keys, VLC, etc.",
      ],
    },
    {
      title: "Operational tips",
      bullets_html: [
        "Wake sleeping hosts — Bluetooth radios pause HID until active.",
        "Some TVs mute local speakers while treating the phone like a headset; disable Bluetooth media audio when that happens.",
        "Keep Companion + phones on same AP band to avoid jitter; multicast discovery requires same subnet.",
      ],
    },
    {
      title: "Third-party software & uninstall",
      bullets_html: [
        "<strong>ViGEmClient</strong> (<code>vigemclient.dll</code>, MIT) ships with Companion and is removed when you uninstall PocketPad.",
        "<strong>ViGEmBus</strong> (BSD 3-Clause) is a separate Windows driver. The installer adds it only when missing; on uninstall you can keep or remove it. Choose <em>keep</em> if other apps (e.g. DS4Windows) still use ViGEmBus.",
        `License texts and attribution: <a href="${pocketpadThirdPartyNoticesUrl}">THIRD_PARTY_NOTICES.txt</a>. Companion use is governed by the <a href="./license.html">End User License Agreement (EULA)</a>.`,
      ],
    },
  ],

  tailCta: {
    label: "Back to PocketPad downloads →",
    href: "./index.html",
  },

  footer: {
    overviewLinkLabel: "Overview",
    detailsLinkLabel: "Details",
    privacyLinkLabel: "Privacy",
    mutedLine: "Hosted on GitHub Pages · Subject to the EULA",
    contactTitle: "Contact",
    contactEmail: "dasoft573@gmail.com",
    contactHint_html:
      "For bugs or problems, begin the subject with <strong>Bug detected:</strong> …. For new ideas, begin with <strong>Feature request:</strong> …. For other topics, use a clear subject line.",
    mailtoBugSubject: "Bug detected: ",
    mailtoFeatureSubject: "Feature request: ",
    quickMailBugLabel: "Bug detected",
    quickMailFeatureLabel: "Feature request",
  },
};

function htmlToNodes(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content;
}

function pill(href, label, active) {
  const a = document.createElement("a");
  a.className = "nav-pill" + (active ? " nav-pill--active" : "");
  a.href = href;
  a.textContent = label;
  if (active) {
    a.setAttribute("aria-current", "page");
  }
  return a;
}

function buildTop(c) {
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
    icon.alt = c.media.appIconAlt || "";
    icon.decoding = "async";
    brand.appendChild(icon);
  } else {
    const ph = document.createElement("span");
    ph.className = "pocket-mini-brand__placeholder";
    ph.setAttribute("aria-hidden", "true");
    brand.appendChild(ph);
  }

  brand.appendChild(document.createTextNode(c.hero.headline + (c.chrome.navBrandSuffix || "")));

  nav.appendChild(brand);
  nav.appendChild(pill(c.paths.pocketpadOverviewPage, c.chrome.overviewNavLabel, false));
  nav.appendChild(pill(c.paths.pocketpadDetailsPage, c.chrome.detailsNavLabel, true));
  nav.appendChild(pill(c.paths.pocketpadPrivacyPage, c.chrome.privacyNavLabel, false));

  row.appendChild(back);
  row.appendChild(nav);
  return row;
}

function buildIntro(c) {
  const sec = document.createElement("section");
  sec.className = "info-intro";

  const iconSrc = String(c.paths.appIconPng || "").trim();
  if (iconSrc) {
    const img = document.createElement("img");
    img.className = "info-intro__icon";
    img.src = resolveAssetHref(iconSrc);
    img.width = 80;
    img.height = 80;
    img.alt = c.media.appIconAlt || "";
    sec.appendChild(img);
  } else {
    const ph = document.createElement("div");
    ph.className = "info-intro__icon-placeholder";
    ph.setAttribute("role", "presentation");
    sec.appendChild(ph);
  }

  const h1 = document.createElement("h1");
  h1.className = "page-title";
  h1.textContent = c.hero.pageTitle;

  const lead = document.createElement("p");
  lead.className = "lead";
  lead.appendChild(htmlToNodes(c.hero.lead_html));

  sec.appendChild(h1);
  sec.appendChild(lead);
  return sec;
}

function buildBulletSection(secDef) {
  const sec = document.createElement("section");
  sec.className = "section-block";
  const h2 = document.createElement("h2");
  h2.className = "h-section";
  h2.textContent = secDef.title;
  const ul = document.createElement("ul");
  ul.className = "feature-bullets";
  for (const bullet of secDef.bullets_html || []) {
    const li = document.createElement("li");
    li.appendChild(htmlToNodes(bullet));
    ul.appendChild(li);
  }
  sec.appendChild(h2);
  sec.appendChild(ul);
  return sec;
}

function buildFooter(c) {
  const f = c.footer;

  const line1 = document.createElement("p");
  line1.className = "footer-line";

  function sep() {
    const s = document.createElement("span");
    s.className = "footer-sep";
    s.setAttribute("aria-hidden", "true");
    s.textContent = "·";
    line1.appendChild(s);
    line1.appendChild(document.createTextNode(" "));
  }

  const ad = document.createElement("a");
  ad.href = c.paths.datronHome;
  ad.textContent = c.chrome.backToDatronLabel;
  line1.appendChild(ad);
  sep();

  const ao = document.createElement("a");
  ao.href = c.paths.pocketpadOverviewPage;
  ao.textContent = f.overviewLinkLabel;
  line1.appendChild(ao);
  sep();

  const ai = document.createElement("a");
  ai.href = c.paths.pocketpadDetailsPage;
  ai.setAttribute("aria-current", "page");
  ai.textContent = f.detailsLinkLabel;
  line1.appendChild(ai);
  sep();

  const ap = document.createElement("a");
  ap.href = c.paths.pocketpadPrivacyPage;
  ap.textContent = f.privacyLinkLabel;
  line1.appendChild(ap);

  const muted = document.createElement("p");
  muted.className = "footer-line site-footer-muted";
  muted.textContent = f.mutedLine;

  const split = document.createElement("div");
  split.className = "footer-split";
  const spacer = document.createElement("div");
  spacer.setAttribute("aria-hidden", "true");
  const contact = document.createElement("div");
  contact.className = "footer-contact";

  const t = document.createElement("p");
  t.className = "footer-contact__title";
  t.textContent = f.contactTitle;

  const emailP = document.createElement("p");
  emailP.className = "footer-contact__email";
  const ma = document.createElement("a");
  ma.href = `mailto:${f.contactEmail}`;
  ma.textContent = f.contactEmail;
  emailP.appendChild(ma);

  const hint = document.createElement("p");
  hint.className = "footer-contact__hint";
  hint.appendChild(htmlToNodes(f.contactHint_html));

  const quick = document.createElement("div");
  quick.className = "footer-quick-mail";
  const bug = document.createElement("a");
  bug.href = `mailto:${f.contactEmail}?subject=${encodeURIComponent(f.mailtoBugSubject)}`;
  bug.textContent = f.quickMailBugLabel;
  const feat = document.createElement("a");
  feat.href = `mailto:${f.contactEmail}?subject=${encodeURIComponent(f.mailtoFeatureSubject)}`;
  feat.textContent = f.quickMailFeatureLabel;
  quick.appendChild(bug);
  quick.appendChild(feat);

  contact.appendChild(t);
  contact.appendChild(emailP);
  contact.appendChild(hint);
  contact.appendChild(quick);
  split.appendChild(spacer);
  split.appendChild(contact);

  return [line1, muted, split];
}

function renderPocketPadInfo(content = PocketPadInfoContent) {
  document.title = content.meta.title;
  const dm = document.querySelector('meta[name="description"]');
  if (dm) dm.setAttribute("content", content.meta.description);

  const top = document.getElementById("pi-top");
  const main = document.getElementById("pi-main");
  const footer = document.getElementById("pi-footer");
  if (!top || !main || !footer) {
    console.warn("[PocketPad info] Missing #pi-top, #pi-main, or #pi-footer");
    return;
  }

  top.replaceChildren(buildTop(content));
  const mainNodes = [buildIntro(content)];
  for (const def of content.sections || []) {
    mainNodes.push(buildBulletSection(def));
  }
  const p = document.createElement("p");
  const ba = document.createElement("a");
  ba.href = content.tailCta.href;
  ba.className = "btn btn-primary";
  ba.textContent = content.tailCta.label;
  p.appendChild(ba);
  mainNodes.push(p);
  main.replaceChildren(...mainNodes);
  footer.replaceChildren(...buildFooter(content));
}

renderPocketPadInfo();
