/**
 * PocketPad Privacy Policy (`privacy.html`) — edit `PocketPadPrivacyContent` for legal copy.
 */
import { datronHubPublicUrl } from "./public_site_urls.js";

export const PocketPadPrivacyContent = {
  meta: {
    title: "PocketPad — Privacy Policy",
    description:
      "How PocketPad handles information: no accounts, no operator-run servers, and only on-device preferences are stored on your phone.",
  },

  paths: {
    stylesheet: "../../styles.css",
    appIconPng: "../../assets/icons/gamepad_1.png",
    datronHome: datronHubPublicUrl,
    pocketpadOverviewPage: "./index.html",
    pocketpadDetailsPage: "./info.html",
    pocketpadPrivacyPage: "./privacy.html",
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
    pageTitle: "Privacy Policy",
    effectiveDate: "May 19, 2026",
    lead_html:
      "PocketPad is built so you can control your devices without creating an account or sending your usage to our servers. " +
      "This policy explains what the app does—and does not—do with information.",
  },

  media: {
    appIconAlt: "",
  },

  sections: [
    {
      title: "Summary",
      paragraphs_html: [
        "We do not operate backend servers that collect, store, or profile your activity. " +
          "PocketPad does not require sign-in, and we do not sell or rent personal data.",
        "The only information the app routinely keeps is stored <strong>locally on your device</strong>—for example layout presets, themes, and other preferences you choose so the controller works the way you want.",
      ],
    },
    {
      title: "Information we do not collect",
      paragraphs_html: [
        "PocketPad is not designed to transmit your inputs, screen content, contacts, location history, or device identifiers to Datron or any other party operated by us.",
        "We do not run analytics pipelines, advertising networks, or cloud sync tied to your identity for PocketPad.",
        "If you contact us by email (see below), we receive only what you choose to put in that message.",
      ],
    },
    {
      title: "Information stored on your device",
      paragraphs_html: [
        "To work offline and remember your setup, PocketPad may save data on your phone, such as:",
      ],
      bullets_html: [
        "Custom controller layouts, profiles, and related editor settings",
        "Theme and appearance choices",
        "Connection preferences you configure (for example remembered hosts or pairing helpers)",
        "Other in-app settings needed to restore your session",
      ],
      tail_html:
        "This data stays on your device unless <strong>you</strong> export it, back up your phone through your OS, or uninstall the app (which removes app-local storage per Android rules). We do not pull these files to our infrastructure.",
    },
    {
      title: "Bluetooth, Wi‑Fi, and companion software",
      paragraphs_html: [
        "When you use Bluetooth HID or connect to PocketPad Companion on your local network, control signals travel directly between your phone and the device you are controlling. " +
          "Those sessions are peer-to-peer on your LAN or Bluetooth link; they are not routed through Datron-operated servers.",
        "Your Wi‑Fi router, operating system, and any security software on your PC may log network activity according to their own policies—that is outside PocketPad’s control.",
        "The optional Windows Companion is distributed from this site; it likewise does not phone home to Datron for usage analytics as part of PocketPad’s design.",
      ],
    },
    {
      title: "Third-party services",
      paragraphs_html: [
        "If you install PocketPad from Google Play or another store, that marketplace may collect installation or billing metadata under its own privacy terms. " +
          "Those services are independent of PocketPad’s on-device behavior described here.",
      ],
    },
    {
      title: "Children’s privacy",
      paragraphs_html: [
        "PocketPad is a utility app and is not directed at children under 13. We do not knowingly collect personal information from children. " +
          "If you believe a child has provided us personal information via email, contact us and we will delete it.",
      ],
    },
    {
      title: "Changes to this policy",
      paragraphs_html: [
        "We may update this page when the product changes. The effective date at the top will change when we do. " +
          "Continued use of PocketPad after an update means you accept the revised policy.",
      ],
    },
    {
      title: "Contact",
      paragraphs_html: [
        'Questions about privacy can be sent to <a href="mailto:dasoft573@gmail.com">dasoft573@gmail.com</a>. ' +
          "Please include <strong>Privacy:</strong> in the subject line so we can route your message.",
      ],
    },
  ],

  tailCta: {
    label: "← Back to Overview",
    href: "./index.html",
  },

  footer: {
    overviewLinkLabel: "Overview",
    detailsLinkLabel: "Details",
    privacyLinkLabel: "Privacy",
    mutedLine: "No accounts · No Datron-operated data collection servers · Preferences stored on your device.",
    contactTitle: "Contact",
    contactEmail: "dasoft573@gmail.com",
    contactHint_html:
      "For privacy questions, begin the subject with <strong>Privacy:</strong> …. For bugs or features, see the Overview page footer.",
    mailtoPrivacySubject: "Privacy: ",
    quickMailPrivacyLabel: "Privacy inquiry",
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
    icon.src = iconSrc;
    icon.width = 34;
    icon.height = 34;
    icon.alt = c.media.appIconAlt || "";
    icon.decoding = "async";
    brand.appendChild(icon);
  }

  brand.appendChild(document.createTextNode(c.hero.headline + (c.chrome.navBrandSuffix || "")));

  nav.appendChild(brand);
  nav.appendChild(pill(c.paths.pocketpadOverviewPage, c.chrome.overviewNavLabel, false));
  nav.appendChild(pill(c.paths.pocketpadDetailsPage, c.chrome.detailsNavLabel, false));
  nav.appendChild(pill(c.paths.pocketpadPrivacyPage, c.chrome.privacyNavLabel, true));

  row.appendChild(back);
  row.appendChild(nav);
  return row;
}

function buildIntro(c) {
  const sec = document.createElement("section");
  sec.className = "info-intro legal-intro";

  const h1 = document.createElement("h1");
  h1.className = "page-title";
  h1.textContent = c.hero.pageTitle;

  const effective = document.createElement("p");
  effective.className = "legal-effective";
  effective.textContent = `Effective ${c.hero.effectiveDate}`;

  const lead = document.createElement("p");
  lead.className = "lead";
  lead.appendChild(htmlToNodes(c.hero.lead_html));

  sec.appendChild(h1);
  sec.appendChild(effective);
  sec.appendChild(lead);
  return sec;
}

function buildLegalSection(def) {
  const sec = document.createElement("section");
  sec.className = "section-block legal-section";

  const h2 = document.createElement("h2");
  h2.className = "h-section";
  h2.textContent = def.title;
  sec.appendChild(h2);

  for (const pHtml of def.paragraphs_html || []) {
    const p = document.createElement("p");
    p.className = "legal-p";
    p.appendChild(htmlToNodes(pHtml));
    sec.appendChild(p);
  }

  if (def.bullets_html?.length) {
    const ul = document.createElement("ul");
    ul.className = "legal-list";
    for (const bullet of def.bullets_html) {
      const li = document.createElement("li");
      li.appendChild(htmlToNodes(bullet));
      ul.appendChild(li);
    }
    sec.appendChild(ul);
  }

  if (def.tail_html) {
    const tail = document.createElement("p");
    tail.className = "legal-p";
    tail.appendChild(htmlToNodes(def.tail_html));
    sec.appendChild(tail);
  }

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
  ai.textContent = f.detailsLinkLabel;
  line1.appendChild(ai);
  sep();

  const ap = document.createElement("a");
  ap.href = c.paths.pocketpadPrivacyPage;
  ap.setAttribute("aria-current", "page");
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
  const privacy = document.createElement("a");
  privacy.href = `mailto:${f.contactEmail}?subject=${encodeURIComponent(f.mailtoPrivacySubject)}`;
  privacy.textContent = f.quickMailPrivacyLabel;
  quick.appendChild(privacy);

  contact.appendChild(t);
  contact.appendChild(emailP);
  contact.appendChild(hint);
  contact.appendChild(quick);
  split.appendChild(spacer);
  split.appendChild(contact);

  return [line1, muted, split];
}

function renderPocketPadPrivacy(content = PocketPadPrivacyContent) {
  document.title = content.meta.title;
  const dm = document.querySelector('meta[name="description"]');
  if (dm) dm.setAttribute("content", content.meta.description);

  const top = document.getElementById("pr-top");
  const main = document.getElementById("pr-main");
  const footer = document.getElementById("pr-footer");
  if (!top || !main || !footer) {
    console.warn("[PocketPad privacy] Missing #pr-top, #pr-main, or #pr-footer");
    return;
  }

  top.replaceChildren(buildTop(content));
  const mainNodes = [buildIntro(content)];
  for (const def of content.sections || []) {
    mainNodes.push(buildLegalSection(def));
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

renderPocketPadPrivacy();
