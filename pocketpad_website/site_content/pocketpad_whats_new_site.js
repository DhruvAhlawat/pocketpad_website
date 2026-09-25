/**
 * PocketPad Companion "What's new" (`whats-new.html`).
 * Release data lives in `pocketpad_whats_new_entries.js` — edit that file for new versions.
 */
import { datronHubPublicUrl, pocketpadAppIconAsset } from "./public_site_urls.js";
import {
  PocketPadWhatsNewEntries,
  PocketPadWhatsNewGroups,
  formatWhatsNewDate,
} from "./pocketpad_whats_new_entries.js";
import { buildPocketPadTop, htmlToNodes } from "./pocketpad_chrome_shared.js";

export const PocketPadWhatsNewContent = {
  meta: {
    title: "What's New in PocketPad Companion for Windows — Release Notes",
    description:
      "Release notes for PocketPad Companion on Windows: new features, improvements, and fixes in each version, including up to 16 phones as controllers at once.",
  },

  paths: {
    stylesheet: "../../styles.css",
    appIconPng: pocketpadAppIconAsset,
    datronHome: datronHubPublicUrl,
    pocketpadOverviewPage: "./index.html",
    pocketpadDetailsPage: "./info.html",
    pocketpadHowToPage: "./how-to.html",
    pocketpadFaqPage: "./faq.html",
    pocketpadPrivacyPage: "./privacy.html",
    pocketpadGameTesterPage: "./gamepad-tester.html",
    pocketpadWhatsNewPage: "./whats-new.html",
    downloadSectionHref: "./index.html#downloads-heading",
  },

  chrome: {
    backToDatronLabel: "← Back to Datron",
    navBrandSuffix: "",
    overviewNavLabel: "Overview",
    detailsNavLabel: "Details",
    howToNavLabel: "How-to",
    faqNavLabel: "FAQ",
    privacyNavLabel: "Privacy",
    gameTesterNavLabel: "Gamepad tester",
    whatsNewNavLabel: "What's new",
    pocketpadNavAriaLabel: "PocketPad",
  },

  media: {
    appIconAlt: "",
  },

  hero: {
    headline: "PocketPad",
    pageTitle: "What's new in Companion",
    lead_html:
      "Release notes for <strong>PocketPad Companion for Windows</strong> — the optional PC app for Wi‑Fi connections, the live dashboard, and multiplayer. Newest version first.",
  },

  updateNote: {
    title: "Using an older Companion?",
    body_html:
      'Your phone keeps working, but update to get these fixes. <a href="./index.html#downloads-heading">Download the latest Companion →</a>',
  },

  upcomingBadgeLabel: "Coming soon",
  releasedPrefix: "Released",

  tailCta: {
    label: "Download PocketPad Companion for Windows →",
    href: "./index.html#downloads-heading",
  },

  footer: {
    overviewLinkLabel: "Overview",
    detailsLinkLabel: "Details",
    howToLinkLabel: "How-to",
    faqLinkLabel: "FAQ",
    privacyLinkLabel: "Privacy",
    mutedLine: "Hosted on GitHub Pages · Subject to the EULA",
    contactTitle: "Contact",
    contactEmail: "dasoft573@gmail.com",
    contactHint_html:
      "For bugs, begin the subject with <strong>Bug detected:</strong> …. For ideas, <strong>Feature request:</strong> ….",
    mailtoBugSubject: "Bug detected: ",
    mailtoFeatureSubject: "Feature request: ",
    quickMailBugLabel: "Bug detected",
    quickMailFeatureLabel: "Feature request",
  },
};

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function buildIntro(c) {
  const sec = el("section", "info-intro guide-intro");
  const h1 = el("h1", "h-page", c.hero.pageTitle);
  const lead = el("p", "lead");
  lead.appendChild(htmlToNodes(c.hero.lead_html));
  sec.appendChild(h1);
  sec.appendChild(lead);

  const n = c.updateNote;
  if (n) {
    const box = el("div", "wn-update-note");
    box.setAttribute("role", "note");
    box.appendChild(el("p", "wn-update-note__title", n.title));
    const body = el("p", "p-tight");
    body.appendChild(htmlToNodes(n.body_html));
    box.appendChild(body);
    sec.appendChild(box);
  }
  return sec;
}

export function whatsNewAnchorId(entry) {
  return "v" + String(entry.version).replace(/[^0-9a-z]+/gi, "-");
}

function buildRelease(c, entry) {
  const art = el("article", "wn-release" + (entry.upcoming ? " wn-release--upcoming" : ""));
  art.id = whatsNewAnchorId(entry);

  const head = el("header", "wn-release__head");
  const h2 = el("h2", "wn-release__version", `Version ${entry.version}`);
  head.appendChild(h2);
  if (entry.upcoming) {
    head.appendChild(el("span", "wn-badge wn-badge--soon", c.upcomingBadgeLabel));
  } else if (entry.date) {
    const time = el("time", "wn-release__date", `${c.releasedPrefix} ${formatWhatsNewDate(entry.date)}`);
    time.dateTime = entry.date;
    head.appendChild(time);
  }
  art.appendChild(head);

  if (entry.summary) {
    art.appendChild(el("p", "wn-release__summary", entry.summary));
  }

  for (const g of PocketPadWhatsNewGroups) {
    const items = Array.isArray(entry[g.key]) ? entry[g.key] : [];
    if (items.length === 0) continue;
    const group = el("div", "wn-group");
    group.appendChild(el("h3", `wn-group__title wn-group__title--${g.key}`, g.label));
    const ul = el("ul", "wn-list");
    for (const text of items) {
      ul.appendChild(el("li", null, text));
    }
    group.appendChild(ul);
    art.appendChild(group);
  }
  return art;
}

function buildReleases(c) {
  const sec = el("section", "section-block wn-releases");
  sec.setAttribute("aria-label", "Companion releases");
  for (const entry of PocketPadWhatsNewEntries) {
    sec.appendChild(buildRelease(c, entry));
  }
  return sec;
}

function buildTailCta(c) {
  const p = el("p", "tail-cta");
  const a = el("a", null, c.tailCta.label);
  a.href = c.tailCta.href;
  p.appendChild(a);
  return p;
}

function buildFooter(c) {
  const f = c.footer;
  const line1 = el("p", "footer-line");
  const sep = () => {
    const s = el("span", "footer-sep", "·");
    s.setAttribute("aria-hidden", "true");
    line1.appendChild(s);
    line1.appendChild(document.createTextNode(" "));
  };
  const link = (href, label, current) => {
    const a = el("a", null, label);
    a.href = href;
    if (current) a.setAttribute("aria-current", "page");
    line1.appendChild(a);
  };

  link(c.paths.datronHome, c.chrome.backToDatronLabel);
  sep();
  link(c.paths.pocketpadOverviewPage, f.overviewLinkLabel);
  sep();
  link(c.paths.pocketpadDetailsPage, f.detailsLinkLabel);
  sep();
  link(c.paths.pocketpadHowToPage, f.howToLinkLabel);
  sep();
  link(c.paths.pocketpadFaqPage, f.faqLinkLabel);
  sep();
  link(c.paths.pocketpadWhatsNewPage, c.chrome.whatsNewNavLabel, true);
  sep();
  link(c.paths.pocketpadPrivacyPage, f.privacyLinkLabel);

  const muted = el("p", "footer-line site-footer-muted", f.mutedLine);

  const split = el("div", "footer-split");
  const spacer = el("div");
  spacer.setAttribute("aria-hidden", "true");
  const contact = el("div", "footer-contact");
  contact.appendChild(el("p", "footer-contact__title", f.contactTitle));
  const emailP = el("p", "footer-contact__email");
  const ma = el("a", null, f.contactEmail);
  ma.href = `mailto:${f.contactEmail}`;
  emailP.appendChild(ma);
  const hint = el("p", "footer-contact__hint");
  hint.appendChild(htmlToNodes(f.contactHint_html));
  const quick = el("div", "footer-quick-mail");
  const bug = el("a", null, f.quickMailBugLabel);
  bug.href = `mailto:${f.contactEmail}?subject=${encodeURIComponent(f.mailtoBugSubject)}`;
  const feat = el("a", null, f.quickMailFeatureLabel);
  feat.href = `mailto:${f.contactEmail}?subject=${encodeURIComponent(f.mailtoFeatureSubject)}`;
  quick.appendChild(bug);
  quick.appendChild(feat);
  contact.appendChild(emailP);
  contact.appendChild(hint);
  contact.appendChild(quick);
  split.appendChild(spacer);
  split.appendChild(contact);

  return [line1, muted, split];
}

function renderPocketPadWhatsNew(content = PocketPadWhatsNewContent) {
  document.title = content.meta.title;
  const dm = document.querySelector('meta[name="description"]');
  if (dm) dm.setAttribute("content", content.meta.description);

  const top = document.getElementById("wn-top");
  const main = document.getElementById("wn-main");
  const footer = document.getElementById("wn-footer");
  if (!top || !main || !footer) {
    console.warn("[PocketPad What's new] Missing mount nodes");
    return;
  }
  top.replaceChildren(buildPocketPadTop(content, "whatsnew"));
  main.replaceChildren(buildIntro(content), buildReleases(content), buildTailCta(content));
  footer.replaceChildren(...buildFooter(content));

  // Content is rendered after parse, so honour #v2-4-0 style deep links manually.
  if (location.hash) {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) target.scrollIntoView();
  }
}

renderPocketPadWhatsNew();
