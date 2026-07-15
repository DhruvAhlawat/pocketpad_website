/**
 * PocketPad Privacy Policy (`privacy.html`) — edit `PocketPadPrivacyContent` for legal copy.
 */
import { datronHubPublicUrl, pocketpadAppIconAsset } from "./public_site_urls.js";
import { resolveAssetHref } from "./site_assets.js";

export const PocketPadPrivacyContent = {
  meta: {
    title: "PocketPad — Privacy Policy",
    description:
      "PocketPad privacy: no account sign-up, no Datron servers for your controller data, and only optional anonymous usage analytics when you opt in.",
  },

  paths: {
    stylesheet: "../../styles.css",
    appIconPng: pocketpadAppIconAsset,
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
    effectiveDate: "June 29, 2026",
    lead_html:
      "PocketPad lets you control your devices without creating an account or sending your layouts and live inputs to Datron-operated servers. " +
      "The only information we may receive remotely is <strong>anonymous usage data</strong>—and only if you choose to allow it. " +
      "This page explains that distinction, optional analytics, ads, and purchases.",
  },

  media: {
    appIconAlt: "",
  },

  sections: [
    {
      title: "Summary",
      paragraphs_html: [
        "PocketPad does not require sign-in, and we do not sell personal data.",
        "Your layouts, pairing helpers, connection preferences, and live controller traffic stay <strong>on your device or local link</strong>—Datron does not operate backend servers that store or profile that activity.",
        "The <strong>only automatic remote data</strong> PocketPad may send is <strong>anonymous usage data</strong> (plus crash diagnostics tied to the same opt-in), processed by <strong>Google Firebase Analytics</strong> when you allow analytics in the app.",
        "The free version may show ads (Google AdMob). Purchasing PocketPad Pro removes ads. Purchases are handled by Google Play—we never see or store payment card details.",
      ],
    },
    {
      title: "No Datron backend servers for your controller data",
      paragraphs_html: [
        "When we say PocketPad does not send your usage to <em>our</em> servers, we mean Datron does not run infrastructure that receives, stores, or profiles your controller inputs, custom layouts, screen content, contacts, or location history.",
        "Bluetooth HID and Wi‑Fi sessions travel directly between your phone and the device you are controlling on your local link. That traffic is not routed through Datron-operated servers.",
        "Optional services from Google (analytics, crash reporting, ads, Play Billing, and voluntary feedback storage) are described below. They are separate from PocketPad’s core on-device and peer-to-peer design.",
      ],
    },
    {
      title: "Anonymous usage analytics (opt in)",
      paragraphs_html: [
        "In regions where privacy law requires upfront consent (the European Economic Area, United Kingdom, and Switzerland), PocketPad asks on first launch whether you want to share <strong>anonymous usage analytics</strong>. If you decline, no analytics or crash reports are sent. " +
          "Elsewhere, anonymous usage analytics is <strong>enabled by default</strong> to help improve the app; you can turn it off anytime in <strong>Settings → Analytics</strong>.",
        "When enabled, the app uses <strong>Google Firebase Analytics</strong> (part of Google Analytics) to help us understand how PocketPad is used and where to improve it. Data is aggregated and not linked to your name, email, phone number, or a PocketPad account—because PocketPad does not create accounts.",
      ],
      bullets_html: [
        "<strong>Screen and session activity</strong> — which screens you open, when a controller session starts or ends, and session length",
        "<strong>Connection context</strong> — whether you used Wi‑Fi or Bluetooth, and which built-in or custom layout profile was active (layout identifiers only, not your button presses)",
        "<strong>Feature toggles</strong> — for example whether tilt-to-steer was enabled",
        "<strong>Product events</strong> — anonymous tallies such as rating-prompt actions, ad impressions (free tier), purchase restore outcomes, and feedback category when you submit feedback",
        "<strong>Device context</strong> — app version, device manufacturer/model, and OS version (via Firebase user properties)",
        "<strong>Crash diagnostics</strong> — when analytics is on, <strong>Firebase Crashlytics</strong> may also receive crash stack traces and the same basic device/OS context to help fix stability issues",
      ],
      tail_html:
        "Firebase may assign a pseudonymous app-instance identifier to group events; it is not your Google account and is not used by Datron to identify you personally. " +
        "Analytics does <strong>not</strong> receive your live controller inputs, keystrokes, contacts, photos, files, or precise GPS location. " +
        "Google processes this data under its own terms: " +
        '<a href="https://policies.google.com/privacy" rel="noopener noreferrer">Google Privacy Policy</a>, ' +
        '<a href="https://firebase.google.com/support/privacy" rel="noopener noreferrer">Firebase Privacy</a>, and ' +
        '<a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer">How Google uses data from sites or apps that use its services</a>.',
    },
    {
      title: "Advertising",
      paragraphs_html: [
        "Non‑Pro users may see banner ads on home screens and full-screen ads during long play sessions. " +
          "AdMob may use an advertising identifier and collect data for ad delivery and measurement as described in <a href=\"https://policies.google.com/privacy\" rel=\"noopener noreferrer\">Google’s privacy policy</a>. " +
          "This is separate from optional usage analytics above.",
        "EU users are shown a consent form (Google UMP) before personalized ads when required by law.",
        "Purchasing PocketPad Pro removes all in-app advertisements.",
      ],
    },
    {
      title: "In-app purchases",
      paragraphs_html: [
        "Pro upgrades and cosmetic skin packs are fulfilled by Google Play Billing. Restore purchases uses your Google account on Google’s systems—PocketPad does not create its own accounts or store payment card details.",
      ],
    },
    {
      title: "Voluntary feedback (not automatic analytics)",
      paragraphs_html: [
        "If you choose to send in-app feedback (bugs, feature requests, complaints), you write the message yourself. We store that message, the category you pick, app version, a random install identifier, and basic device info in <strong>Google Firebase Firestore</strong> so we can investigate.",
        "Only submit information you are comfortable sharing. Feedback is initiated by you; it is not part of the automatic anonymous usage analytics above.",
      ],
    },
    {
      title: "Information we do not collect",
      paragraphs_html: [
        "PocketPad is not designed to transmit your live controller inputs, screen content, contacts, address book, precise location, or identity-linked profiles to Datron-operated servers.",
        "We do not run our own analytics warehouse, advertising network, or cloud sync tied to your identity for core controller use.",
        "If you email us (see Contact), we receive only what you put in that message.",
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
        "PocketPad relies on Google services for optional analytics (Firebase Analytics / Google Analytics), crash reporting (Firebase Crashlytics), voluntary feedback storage (Firebase Firestore), ads (AdMob), and purchases (Google Play). Each operates under Google’s policies.",
        "If you install PocketPad from Google Play or another store, that marketplace may collect installation or billing metadata under its own privacy terms. Those services are independent of PocketPad’s on-device and peer-to-peer controller behavior.",
      ],
    },
    {
      title: "Children’s privacy",
      paragraphs_html: [
        "PocketPad is a general-purpose controller utility and is not directed at children under 13. We do not knowingly collect personal information from children.",
        "Automatic collection is limited to the <strong>optional, anonymous usage analytics</strong> described above. In the EEA, UK, and Switzerland it requires upfront consent; elsewhere it is on by default until you turn it off in Settings. It does not include your controller inputs or account sign-up because PocketPad has neither accounts nor input telemetry.",
        "If you believe a child has provided personal information through voluntary feedback or email, contact us at <a href=\"mailto:support@datronapps.com\">support@datronapps.com</a> with <strong>Privacy:</strong> in the subject line and we will delete it where reasonably possible.",
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
        'Questions about privacy can be sent to <a href="mailto:support@datronapps.com">support@datronapps.com</a>. ' +
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
    mutedLine: "No Datron controller servers · Optional anonymous usage analytics · Ads in free tier · Preferences on device.",
    contactTitle: "Contact",
    contactEmail: "support@datronapps.com",
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
    icon.src = resolveAssetHref(iconSrc);
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
