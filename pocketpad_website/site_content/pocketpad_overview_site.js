/**
 * PocketPad overview (marketing home) — edit this file for all public copy, links, and image URLs.
 * Pattern matches `game_controller/lib/content/app_content.dart`: one module, no scattered literals in HTML.
 *
 * Download filenames & checksums: generated `pocketpad_downloads.generated.js` (run sync_pocketpad_website_downloads.ps1).
 *
 * Gallery: set each slide `src` to a site-root path (e.g. assets/screenshots/foo.png) or any https URL. Leave `src: ''` for a blank tile.
 */
import { PocketPadDownloadRows } from "./pocketpad_downloads.generated.js";
import {
  datronHubPublicUrl,
  pocketpadDownloadsLatestBaseUrl,
  pocketpadDownloadsReadmeUrl,
  pocketpadEulaTextUrl,
  pocketpadPlayStoreUrl,
  pocketpadThirdPartyNoticesUrl,
  pocketpadAppIconAsset,
} from "./public_site_urls.js";
import { resolveAssetHref } from "./site_assets.js";
import { buildPocketPadTop, htmlToNodes } from "./pocketpad_chrome_shared.js";

export const PocketPadSiteContent = {
  meta: {
    title: "PocketPad — Use Phone as Gamepad, Keyboard, Mouse, TV Remote & Slide Controller",
    description:
      "PocketPad turns your Android phone into a wireless game controller, PC remote, keyboard & mouse, TV remote, media remote, and presentation slide controller. Bluetooth HID with no install or Wi‑Fi with the Windows companion. Free download.",
  },

  playStoreSection: {
    title: "Get PocketPad on Android",
    blurb: "Free on Google Play — gamepad, keyboard & mouse, TV remote, and slide controller in one app.",
    badgeAlt: "Get it on Google Play",
    badgeHref: pocketpadPlayStoreUrl,
  },

  /** Paths — `datronHome` is the published Datron hub (see `public_site_urls.js`). */
  paths: {
    stylesheet: "../../styles.css",
    appIconPng: pocketpadAppIconAsset,
    datronHome: datronHubPublicUrl,
    pocketpadDetailsPage: "./info.html",
    pocketpadOverviewPage: "./index.html",
    pocketpadHowToPage: "./how-to.html",
    pocketpadFaqPage: "./faq.html",
    pocketpadPrivacyPage: "./privacy.html",
    checksumReadmeHref: pocketpadDownloadsReadmeUrl,
    thirdPartyNoticesHref: pocketpadThirdPartyNoticesUrl,
    eulaHref: "./license.html",
    eulaTextHref: pocketpadEulaTextUrl,
  },

  chrome: {
    backToDatronLabel: "← Back to Datron",
    /** Appended after hero headline in mini-nav brand (optional) */
    navBrandSuffix: "",
    overviewNavLabel: "Overview",
    detailsNavLabel: "Details",
    howToNavLabel: "How-to",
    faqNavLabel: "FAQ",
    privacyNavLabel: "Privacy",
    /** `aria-label` for the mini-nav */
    pocketpadNavAriaLabel: "PocketPad",
  },

  hero: {
    headline: "PocketPad",
    blurb_html:
      "Turn your phone into a <strong>low-latency controller</strong> for PC, Mac, Android, or TV — " +
      "<strong>Bluetooth HID</strong> with zero host install, plus an optional <strong>PocketPad Companion</strong> on Windows when you want " +
      "auto-discovery and the tightest Wi‑Fi path for multiplayer.",
    highlights: [
      "Bluetooth HID",
      "Wi‑Fi companion",
      "Gamepad + keyboard/mouse",
      "Media & slideshow",
      "Layouts & profiles",
    ],
  },

  whySection: {
    title: "Why PocketPad",
    lead_html:
      "<strong>Low-latency, all-in-one control.</strong> Stay in one app whether you’re playing with a layout, steering a slideshow, navigating a smart TV UI, or " +
      "driving WASD plus a desktop pointer — with Bluetooth for instant pairing and Companion-grade networking when speed and multiple phones matter.",
  },

  featuresSection: {
    title: "What you get",
    cards: [
      {
        title: "Instant Bluetooth connectivity",
        body:
          "Pair the phone over Bluetooth HID—no Companion or drivers on hosts that support the profile. Tap “Prepare for pairing” in the app, then bind from PC, Mac, Android, or TV.",
      },
      {
        title: "Very low latency",
        body: "Input paths stay tight on Bluetooth HID and tuned over LAN when you bridge through PocketPad Companion for Wi‑Fi.",
      },
      {
        title: "Works across desktops & living rooms",
        body:
          "The same presets cover keyboard & mouse for PC workloads, multimedia keys and TV-focused remotes, and full Xbox-style layouts for couch gaming.",
      },
      {
        title: "All modes in one app",
        body:
          "Gamepad emulation, WASD clusters, oversized touchpads, media transport keys, and presentation-friendly macros — switch presets instead of grabbing another remote.",
      },
      {
        title: "Full configurability",
        body:
          "Custom layouts with drag-and-edit controls, profile copies, joystick behavior, steering curves, UDP pairings — tune everything to fit your rigs.",
      },
      {
        title: "Built for multiplayer",
        body:
          "Multiple phones can connect together for LAN party sessions — especially crisp over Wi‑Fi with Companion juggling devices on your network.",
      },
      {
        title: "Windows Companion + Wi‑Fi",
        body:
          "Install PocketPad Companion for discovery, KM pairing codes, dashboards, and extremely responsive multi-phone traffic. Bluetooth HID on Windows stays available if you prefer pairing only.",
      },
    ],
  },

  downloadSection: {
    title: "PocketPad Companion for Windows",
    intro_html:
      "Download the <strong>Windows installer (EXE)</strong> for a normal setup (Program Files, Start menu). Setup installs the <strong>ViGEmBus</strong> driver when it is not already on your PC—the standard driver PocketPad uses so games see your phone as an Xbox controller. If ViGEmBus is already installed (for example from DS4Windows), setup skips that step. Allow the app on <strong>private</strong> networks in Windows Firewall, then connect from PocketPad over Wi‑Fi.",
    rows: PocketPadDownloadRows,
    checksumLinePrefix: "Checksums & notes:",
    checksumLinkLabel: "README.txt",
    thirdPartyLinePrefix: "Third-party licenses (ViGEmClient / ViGEmBus):",
    thirdPartyLinkLabel: "THIRD_PARTY_NOTICES.txt",
    eulaLinePrefix: "End User License Agreement (EULA):",
    eulaLinkLabel: "Read license terms",
  },

  thirdPartySection: {
    title: "Third-party software (Windows Companion)",
    lead_html:
      "Virtual gamepads on Windows use <strong>ViGEm</strong>, the common open-source stack for Xbox-style controllers:",
    bullets_html: [
      "<strong><a href=\"https://github.com/nefarius/ViGEmClient\" rel=\"noopener noreferrer\">ViGEmClient</a></strong> (<code>vigemclient.dll</code>, MIT License) — included with Companion and removed when you uninstall PocketPad.",
      "<strong><a href=\"https://github.com/nefarius/ViGEmBus\" rel=\"noopener noreferrer\">ViGEmBus</a></strong> (BSD 3-Clause) — Windows driver for virtual controllers. The installer adds it when missing; if ViGEmBus is already on your PC, setup skips this step. Maintained by Nefarius Software Solutions e.U., not Datron.",
      `License texts: <a href="${pocketpadThirdPartyNoticesUrl}">THIRD_PARTY_NOTICES.txt</a>. PocketPad terms: <a href="./license.html">EULA</a>. When uninstalling, you can remove ViGEmBus too if PocketPad installed it.`,
    ],
  },

  quickStartSection: {
    title: "Quick start on Windows",
    steps: [
      "Run the <strong>installer EXE</strong>; approve UAC / SmartScreen and network prompts.",
      "Open PocketPad on your phone (same LAN), tap <strong>Connect</strong>.",
      "For Universal keyboard/mouse, enter the 6-digit code shown inside Companion Settings.",
      "Prefer Bluetooth? Switch transport in-app, prepare pairing once, bind from Windows Bluetooth settings.",
    ],
    detailsPromptPrefix: "Step-by-step connection?",
    detailsLinkLabel: "Read the How-to guide →",
    detailsLinkHref: "./how-to.html",
    faqPromptPrefix: "More questions?",
    faqLinkLabel: "Browse the FAQ →",
    faqLinkHref: "./faq.html",
  },

  gallerySection: {
    sectionId: "screenshots-gallery",
    title: "Screenshots",
    /** Shown under the title; leave "" to hide */
    intro: "",
    scrollDurationSec: 42,
    slides: [
      {
        src: "assets/screenshots/full_gamepad.png",
        alt: "PocketPad full Xbox-style gamepad layout on a phone",
        caption: "Full gamepad layout",
      },
      {
        src: "assets/screenshots/bumpers_gamepad.png",
        alt: "PocketPad gamepad with shoulder bumpers and triggers",
        caption: "Bumpers & triggers",
      },
      {
        src: "assets/screenshots/wasd_mouse.png",
        alt: "PocketPad WASD keys with a touch mouse area for PC control",
        caption: "WASD + mouse",
      },
      {
        src: "assets/screenshots/mousepad.png",
        alt: "PocketPad large touchpad for pointer and desktop navigation",
        caption: "Touchpad mode",
      },
      {
        src: "assets/screenshots/customize_layout.png",
        alt: "PocketPad layout editor with draggable on-screen controls",
        caption: "Customize layouts",
      },
      {
        src: "assets/screenshots/companion_app.png",
        alt: "PocketPad Companion on Windows showing connected devices",
        caption: "Windows Companion",
      },
    ],
  },

  footer: {
    datronLinkLabel: "← Back to Datron",
    overviewLinkLabel: "Overview",
    detailsLinkLabel: "Details",
    howToLinkLabel: "How-to",
    faqLinkLabel: "FAQ",
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

// ——— Render (keep below fold; edit `PocketPadSiteContent` above only for copy) ———

function buildHero(c) {
  const section = document.createElement("section");
  section.className = "hero-mega";
  section.setAttribute("aria-label", "Introduction");

  const icon = document.createElement("img");
  icon.className = "hero-mega__icon";
  icon.src = resolveAssetHref(c.paths.appIconPng);
  icon.width = 160;
  icon.height = 160;
  icon.alt = "";
  icon.decoding = "async";

  const h1 = document.createElement("h1");
  h1.className = "hero-mega__title";
  h1.textContent = c.hero.headline;

  const blurb = document.createElement("p");
  blurb.className = "hero-mega__blurb";
  blurb.appendChild(htmlToNodes(c.hero.blurb_html));

  const chips = document.createElement("ul");
  chips.className = "chip-row";
  chips.setAttribute("aria-label", "Highlights");
  for (const t of c.hero.highlights) {
    const li = document.createElement("li");
    li.className = "chip";
    li.textContent = t;
    chips.appendChild(li);
  }

  section.appendChild(icon);
  section.appendChild(h1);
  section.appendChild(blurb);
  section.appendChild(chips);
  return section;
}

function buildPlayStore(c) {
  const ps = c.playStoreSection;
  const href = String(ps?.badgeHref || "").trim();
  if (!ps || !href) {
    return document.createDocumentFragment();
  }

  const section = document.createElement("section");
  section.className = "section-tight play-store-cta";
  section.setAttribute("aria-labelledby", "play-store-heading");

  const h2 = document.createElement("h2");
  h2.id = "play-store-heading";
  h2.className = "h-section";
  h2.textContent = ps.title;

  const blurb = document.createElement("p");
  blurb.className = "muted";
  blurb.textContent = ps.blurb;

  const link = document.createElement("a");
  link.className = "play-store-badge";
  link.href = href;
  link.rel = "noopener noreferrer";
  link.target = "_blank";

  const img = document.createElement("img");
  img.src = "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png";
  img.alt = ps.badgeAlt || "Get it on Google Play";
  img.width = 270;
  img.height = 80;
  img.decoding = "async";
  img.loading = "lazy";
  link.appendChild(img);

  section.appendChild(h2);
  section.appendChild(blurb);
  section.appendChild(link);
  return section;
}

function buildWhy(c) {
  const section = document.createElement("section");
  section.className = "section-tight";
  const h2 = document.createElement("h2");
  h2.className = "h-section";
  h2.textContent = c.whySection.title;
  const p = document.createElement("p");
  p.className = "lead-strong";
  p.appendChild(htmlToNodes(c.whySection.lead_html));
  section.appendChild(h2);
  section.appendChild(p);
  return section;
}

function buildFeatures(c) {
  const section = document.createElement("section");
  section.className = "section-block";
  section.setAttribute("aria-labelledby", "features-heading");
  const h2 = document.createElement("h2");
  h2.id = "features-heading";
  h2.className = "h-section";
  h2.textContent = c.featuresSection.title;
  const ul = document.createElement("ul");
  ul.className = "feature-grid";
  for (const card of c.featuresSection.cards) {
    const li = document.createElement("li");
    li.className = "feature-card";
    const h3 = document.createElement("h3");
    h3.textContent = card.title;
    const p = document.createElement("p");
    p.textContent = card.body;
    li.appendChild(h3);
    li.appendChild(p);
    ul.appendChild(li);
  }
  section.appendChild(h2);
  section.appendChild(ul);
  return section;
}

/** Always use /downloads/latest stable names (never stale versioned or GitHub Release URLs). */
function downloadHrefForRow(row) {
  const fileName = String(row.downloadName || "").trim();
  if (!fileName) {
    return String(row.href || "").trim();
  }
  // Absolute http(s) href from generated rows wins (e.g. temporary GitHub Releases mode).
  const rawHref = String(row.href || "").trim();
  if (/^https?:\/\//i.test(rawHref) && !rawHref.includes("/downloads/latest/")) {
    return rawHref;
  }
  const base = pocketpadDownloadsLatestBaseUrl.replace(/\/$/, "");
  return `${base}/${encodeURIComponent(fileName).replace(/%2F/g, "/")}`;
}

function windowsLogoSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "os-logo--windows");
  svg.setAttribute("viewBox", "0 0 32 32");
  svg.setAttribute("width", "32");
  svg.setAttribute("height", "32");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("fill", "currentColor");
  path.setAttribute(
    "d",
    "M2 4.3 14.1 2.3v12.1H2V4.3zm0 15.1h12.1V31.2L2 29.1V19.4zm15.1-17.1L30 0v12.1H17.1V2.3zm0 16.1H30V32l-12.9-2.1V18.4z",
  );
  svg.appendChild(path);
  return svg;
}

function buildDownload(c) {
  const d = c.downloadSection;
  const section = document.createElement("section");
  section.className = "section-tight";
  section.setAttribute("aria-labelledby", "downloads-heading");

  const h2 = document.createElement("h2");
  h2.id = "downloads-heading";
  h2.className = "h-section";
  h2.textContent = d.title;

  const intro = document.createElement("p");
  intro.className = "p-tight";
  intro.appendChild(htmlToNodes(d.intro_html));

  const list = document.createElement("ul");
  list.className = "download-list";
  const rows = Array.isArray(d.rows) ? d.rows : [];
  if (rows.length === 0) {
    console.warn("[PocketPad] downloadSection.rows is empty");
  }
  for (const row of rows) {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.className = "download-row";
    a.href = downloadHrefForRow(row);
    if (row.downloadName) {
      a.download = row.downloadName;
    }

    const spanIcon = document.createElement("span");
    spanIcon.className = "download-row__icon";
    spanIcon.setAttribute("aria-hidden", "true");
    spanIcon.appendChild(windowsLogoSvg());

    const body = document.createElement("span");
    body.className = "download-row__body";
    const t1 = document.createElement("span");
    t1.className = "download-row__title";
    t1.textContent = row.rowTitle;
    const t2 = document.createElement("span");
    t2.className = "download-row__desc";
    t2.textContent = row.rowDescription;
    body.appendChild(t1);
    body.appendChild(t2);

    const cta = document.createElement("span");
    cta.className = "download-row__cta";
    cta.textContent = row.rowCtaLabel;

    a.appendChild(spanIcon);
    a.appendChild(body);
    a.appendChild(cta);
    li.appendChild(a);
    list.appendChild(li);
  }

  const checksumP = document.createElement("p");
  checksumP.className = "muted tiny";
  checksumP.appendChild(document.createTextNode(d.checksumLinePrefix));
  const nbsp = document.createTextNode("\u00a0");
  checksumP.appendChild(nbsp);
  const readmeA = document.createElement("a");
  readmeA.href = c.paths.checksumReadmeHref;
  const code = document.createElement("code");
  code.textContent = d.checksumLinkLabel;
  readmeA.appendChild(code);
  readmeA.appendChild(document.createTextNode(" →"));

  checksumP.appendChild(readmeA);

  section.appendChild(h2);
  section.appendChild(intro);
  section.appendChild(list);
  section.appendChild(checksumP);

  if (d.thirdPartyLinePrefix && c.paths.thirdPartyNoticesHref) {
    const thirdP = document.createElement("p");
    thirdP.className = "muted small";
    thirdP.style.marginTop = "8px";
    thirdP.appendChild(document.createTextNode(d.thirdPartyLinePrefix));
    thirdP.appendChild(document.createTextNode("\u00a0"));
    const thirdA = document.createElement("a");
    thirdA.href = c.paths.thirdPartyNoticesHref;
    const thirdCode = document.createElement("code");
    thirdCode.textContent = d.thirdPartyLinkLabel || "THIRD_PARTY_NOTICES.txt";
    thirdA.appendChild(thirdCode);
    thirdA.appendChild(document.createTextNode(" \u2192"));
    thirdP.appendChild(thirdA);
    section.appendChild(thirdP);
  }

  if (d.eulaLinePrefix && c.paths.eulaHref) {
    const eulaP = document.createElement("p");
    eulaP.className = "muted small";
    eulaP.style.marginTop = "8px";
    eulaP.appendChild(document.createTextNode(d.eulaLinePrefix));
    eulaP.appendChild(document.createTextNode("\u00a0"));
    const eulaA = document.createElement("a");
    eulaA.href = c.paths.eulaHref;
    eulaA.textContent = d.eulaLinkLabel || "EULA";
    eulaA.appendChild(document.createTextNode(" \u2192"));
    eulaP.appendChild(eulaA);
    section.appendChild(eulaP);
  }

  return section;
}

function buildQuickStart(c) {
  const q = c.quickStartSection;
  const section = document.createElement("section");
  section.className = "section-block";
  section.setAttribute("aria-labelledby", "after-heading");

  const h2 = document.createElement("h2");
  h2.id = "after-heading";
  h2.className = "h-section";
  h2.textContent = q.title;

  const ol = document.createElement("ol");
  ol.className = "short-steps";
  for (const step of q.steps) {
    const li = document.createElement("li");
    li.appendChild(htmlToNodes(step));
    ol.appendChild(li);
  }

  const p = document.createElement("p");
  p.className = "muted small";
  p.style.marginTop = "12px";
  p.appendChild(document.createTextNode(q.detailsPromptPrefix));
  const a = document.createElement("a");
  a.href = q.detailsLinkHref || c.paths.pocketpadDetailsPage;
  a.appendChild(document.createTextNode("\u00a0" + q.detailsLinkLabel));
  p.appendChild(a);
  if (q.faqLinkLabel && q.faqLinkHref) {
    p.appendChild(document.createTextNode(" \u00b7 " + q.faqPromptPrefix));
    const faqA = document.createElement("a");
    faqA.href = q.faqLinkHref;
    faqA.appendChild(document.createTextNode("\u00a0" + q.faqLinkLabel));
    p.appendChild(faqA);
  }

  section.appendChild(h2);
  section.appendChild(ol);
  section.appendChild(p);
  return section;
}

function buildThirdParty(c) {
  const t = c.thirdPartySection;
  if (!t) {
    return document.createDocumentFragment();
  }

  const section = document.createElement("section");
  section.className = "section-block";
  section.setAttribute("aria-labelledby", "third-party-heading");

  const h2 = document.createElement("h2");
  h2.id = "third-party-heading";
  h2.className = "h-section";
  h2.textContent = t.title;

  const lead = document.createElement("p");
  lead.className = "muted";
  lead.appendChild(htmlToNodes(t.lead_html));

  const ul = document.createElement("ul");
  ul.className = "feature-bullets";
  for (const bullet of t.bullets_html || []) {
    const li = document.createElement("li");
    li.appendChild(htmlToNodes(bullet));
    ul.appendChild(li);
  }

  section.appendChild(h2);
  section.appendChild(lead);
  section.appendChild(ul);
  return section;
}

function buildGallerySlide(slide) {
  const wrap = document.createElement("figure");
  wrap.className = "pp-scrolling-gallery__slide";

  const hasSrc = Boolean(slide.src && String(slide.src).trim());
  if (hasSrc) {
    const img = document.createElement("img");
    img.src = resolveAssetHref(slide.src);
    img.alt = slide.alt || "";
    img.decoding = "async";
    img.loading = "eager";
    wrap.appendChild(img);
  } else {
    const ph = document.createElement("div");
    ph.className = "pp-scrolling-gallery__placeholder";
    ph.setAttribute("role", "presentation");
    wrap.appendChild(ph);
  }

  if (slide.caption && String(slide.caption).trim()) {
    const fc = document.createElement("figcaption");
    fc.className = "pp-scrolling-gallery__caption";
    fc.textContent = String(slide.caption).trim();
    wrap.appendChild(fc);
  }

  return wrap;
}

function buildGallery(c) {
  const g = c.gallerySection;
  const section = document.createElement("section");
  section.className = "section-block pp-scrolling-gallery-section";
  section.id = g.sectionId;
  section.setAttribute("aria-label", g.title);

  const h2 = document.createElement("h2");
  h2.className = "h-section";
  h2.textContent = g.title;
  section.appendChild(h2);

  if (g.intro && String(g.intro).trim()) {
    const intro = document.createElement("p");
    intro.className = "pp-scrolling-gallery__intro";
    intro.textContent = String(g.intro).trim();
    section.appendChild(intro);
  }

  const viewport = document.createElement("div");
  viewport.className = "pp-scrolling-gallery__viewport";

  const track = document.createElement("div");
  track.className = "pp-scrolling-gallery__track";
  const sec = Math.max(12, Number(g.scrollDurationSec) || 40);
  track.style.setProperty("--pp-gallery-seconds", `${sec}s`);

  const slides = Array.isArray(g.slides) && g.slides.length ? g.slides : [{ src: "", alt: "", caption: "" }];
  for (const s of slides) {
    track.appendChild(buildGallerySlide(s));
  }
  for (const s of slides) {
    track.appendChild(buildGallerySlide(s));
  }

  viewport.appendChild(track);
  section.appendChild(viewport);
  return section;
}

function buildFooter(c) {
  const f = c.footer;
  const line1 = document.createElement("p");
  line1.className = "footer-line";

  function addSep() {
    const sep = document.createElement("span");
    sep.className = "footer-sep";
    sep.setAttribute("aria-hidden", "true");
    sep.textContent = "·";
    line1.appendChild(sep);
    line1.appendChild(document.createTextNode(" "));
  }

  const aD = document.createElement("a");
  aD.href = c.paths.datronHome;
  aD.textContent = f.datronLinkLabel;
  line1.appendChild(aD);
  addSep();

  const aO = document.createElement("a");
  aO.href = c.paths.pocketpadOverviewPage;
  aO.setAttribute("aria-current", "page");
  aO.textContent = f.overviewLinkLabel;
  line1.appendChild(aO);
  addSep();

  const aInfo = document.createElement("a");
  aInfo.href = c.paths.pocketpadDetailsPage;
  aInfo.textContent = f.detailsLinkLabel;
  line1.appendChild(aInfo);
  addSep();

  const aHow = document.createElement("a");
  aHow.href = c.paths.pocketpadHowToPage;
  aHow.textContent = f.howToLinkLabel;
  line1.appendChild(aHow);
  addSep();

  const aFaq = document.createElement("a");
  aFaq.href = c.paths.pocketpadFaqPage;
  aFaq.textContent = f.faqLinkLabel;
  line1.appendChild(aFaq);
  addSep();

  const aPrivacy = document.createElement("a");
  aPrivacy.href = c.paths.pocketpadPrivacyPage;
  aPrivacy.textContent = f.privacyLinkLabel;
  line1.appendChild(aPrivacy);

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
  const mailA = document.createElement("a");
  mailA.href = `mailto:${f.contactEmail}`;
  mailA.textContent = f.contactEmail;
  emailP.appendChild(mailA);

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

function renderPocketPadOverview(c = PocketPadSiteContent) {
  document.title = c.meta.title;
  const dm = document.querySelector('meta[name="description"]');
  if (dm) {
    dm.setAttribute("content", c.meta.description);
  }

  const top = document.getElementById("pp-top");
  const main = document.getElementById("pp-main");
  const footer = document.getElementById("pp-footer");
  if (!top || !main || !footer) {
    console.warn("[PocketPad site] Missing mount nodes #pp-top, #pp-main, or #pp-footer");
    return;
  }

  top.replaceChildren(buildPocketPadTop(c, "overview"));
  main.replaceChildren(
    buildHero(c),
    buildPlayStore(c),
    buildWhy(c),
    buildFeatures(c),
    buildDownload(c),
    buildThirdParty(c),
    buildQuickStart(c),
    buildGallery(c),
  );
  footer.replaceChildren(...buildFooter(c));
}

renderPocketPadOverview();
