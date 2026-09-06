/**
 * PocketPad FAQ (`faq.html`).
 */
import { datronHubPublicUrl, pocketpadAppIconAsset, pocketpadPlayStoreUrl } from "./public_site_urls.js";
import { PocketPadFaqEntries } from "./pocketpad_faq_entries.js";
import { buildPocketPadTop, htmlToNodes } from "./pocketpad_chrome_shared.js";

export const PocketPadFaqContent = {
  meta: {
    title: "PocketPad FAQ — Phone as Gamepad, Keyboard, Mouse, TV Remote & More",
    description:
      "Answers about using PocketPad: Bluetooth vs Wi‑Fi, no PC install, multiplayer, Steam, Mac/Linux/TV, latency, privacy, Pro, and troubleshooting.",
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
  },

  chrome: {
    backToDatronLabel: "← Back to Datron",
    navBrandSuffix: "",
    overviewNavLabel: "Overview",
    detailsNavLabel: "Details",
    howToNavLabel: "How-to",
    faqNavLabel: "FAQ",
    privacyNavLabel: "Privacy",
    pocketpadNavAriaLabel: "PocketPad",
  },

  media: {
    appIconAlt: "",
  },

  hero: {
    headline: "PocketPad",
    pageTitle: "Frequently asked questions",
    lead_html:
      "Quick answers about using your phone as a <strong>wireless gamepad</strong>, <strong>keyboard & mouse</strong>, <strong>TV remote</strong>, and <strong>presentation controller</strong>. " +
      `For step-by-step setup, see the <a href="./how-to.html">How-to guide</a>. ` +
      `Download PocketPad on <a href="${pocketpadPlayStoreUrl}" rel="noopener noreferrer" target="_blank">Google Play</a>.`,
  },

  sections: [
    {
      title: "Getting started",
      ids: [
        "phone-as-gamepad",
        "phone-keyboard-mouse",
        "phone-tv-remote",
        "phone-slides",
        "no-pc-install",
        "connect-bluetooth",
        "connect-wifi",
      ],
    },
    {
      title: "Connection & performance",
      ids: ["bluetooth-vs-wifi", "latency", "no-server-apps", "multiplayer", "steam", "mac-linux", "smart-tv"],
    },
    {
      title: "Troubleshooting",
      ids: ["bluetooth-not-found", "firewall", "game-not-recognizing", "re-pair-mode", "vigem"],
    },
    {
      title: "App, privacy & billing",
      ids: [
        "best-wireless-controller-app",
        "account",
        "offline",
        "free-pro",
        "privacy",
        "custom-layouts",
        "tilt-steer",
        "vs-github-pocketpad",
      ],
    },
  ],

  tailCta: {
    label: "Step-by-step connection guide →",
    href: "./how-to.html",
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

function entryById(id) {
  return PocketPadFaqEntries.find((e) => e.id === id);
}

function buildIntro(c) {
  const sec = document.createElement("section");
  sec.className = "info-intro guide-intro";
  const h1 = document.createElement("h1");
  h1.className = "h-page";
  h1.textContent = c.hero.pageTitle;
  const lead = document.createElement("p");
  lead.className = "lead";
  lead.appendChild(htmlToNodes(c.hero.lead_html));
  sec.appendChild(h1);
  sec.appendChild(lead);
  return sec;
}

function buildFaqSections(c) {
  const frag = document.createDocumentFragment();
  for (const section of c.sections) {
    const sec = document.createElement("section");
    sec.className = "section-block faq-section";
    const h2 = document.createElement("h2");
    h2.className = "h-section";
    h2.textContent = section.title;
    const dl = document.createElement("dl");
    dl.className = "faq-list";
    for (const id of section.ids) {
      const entry = entryById(id);
      if (!entry) continue;
      const dt = document.createElement("dt");
      dt.className = "faq-q";
      dt.id = entry.id;
      dt.textContent = entry.question;
      const dd = document.createElement("dd");
      dd.className = "faq-a";
      dd.appendChild(htmlToNodes(entry.answer_html));
      dl.appendChild(dt);
      dl.appendChild(dd);
    }
    sec.appendChild(h2);
    sec.appendChild(dl);
    frag.appendChild(sec);
  }
  return frag;
}

function buildTailCta(c) {
  const p = document.createElement("p");
  p.className = "tail-cta";
  const a = document.createElement("a");
  a.href = c.tailCta.href;
  a.textContent = c.tailCta.label;
  p.appendChild(a);
  return p;
}

function buildFooter(c) {
  const foot = document.createElement("div");
  foot.className = "footer-grid";
  const links = document.createElement("div");
  links.className = "footer-links";
  const mk = (href, label) => {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = label;
    return a;
  };
  links.appendChild(mk(c.paths.pocketpadOverviewPage, c.footer.overviewLinkLabel));
  links.appendChild(mk(c.paths.pocketpadDetailsPage, c.footer.detailsLinkLabel));
  links.appendChild(mk(c.paths.pocketpadHowToPage, c.footer.howToLinkLabel));
  links.appendChild(mk(c.paths.pocketpadFaqPage, c.footer.faqLinkLabel));
  links.appendChild(mk(c.paths.pocketpadPrivacyPage, c.footer.privacyLinkLabel));
  const muted = document.createElement("p");
  muted.className = "footer-muted";
  muted.textContent = c.footer.mutedLine;
  const contact = document.createElement("div");
  contact.className = "footer-contact";
  const ct = document.createElement("strong");
  ct.textContent = c.footer.contactTitle;
  const hint = document.createElement("p");
  hint.className = "footer-muted";
  hint.appendChild(htmlToNodes(c.footer.contactHint_html));
  const mailBug = document.createElement("a");
  mailBug.href = `mailto:${c.footer.contactEmail}?subject=${encodeURIComponent(c.footer.mailtoBugSubject)}`;
  mailBug.textContent = c.footer.quickMailBugLabel;
  const mailFeat = document.createElement("a");
  mailFeat.href = `mailto:${c.footer.contactEmail}?subject=${encodeURIComponent(c.footer.mailtoFeatureSubject)}`;
  mailFeat.textContent = c.footer.quickMailFeatureLabel;
  contact.appendChild(ct);
  contact.appendChild(hint);
  contact.appendChild(mailBug);
  contact.appendChild(document.createTextNode(" · "));
  contact.appendChild(mailFeat);
  foot.appendChild(links);
  foot.appendChild(muted);
  foot.appendChild(contact);
  return foot;
}

function renderPocketPadFaq(content = PocketPadFaqContent) {
  const top = document.getElementById("fq-top");
  const main = document.getElementById("fq-main");
  const footer = document.getElementById("fq-footer");
  if (!top || !main || !footer) {
    console.warn("[PocketPad FAQ] Missing mount nodes");
    return;
  }
  top.replaceChildren(buildPocketPadTop(content, "faq"));
  main.replaceChildren(buildIntro(content), buildFaqSections(content), buildTailCta(content));
  footer.replaceChildren(buildFooter(content));
}

renderPocketPadFaq();
