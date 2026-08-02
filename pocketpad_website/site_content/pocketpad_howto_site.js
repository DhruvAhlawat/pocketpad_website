/**
 * PocketPad How-to (`how-to.html`) — Bluetooth & Wi‑Fi connection guides.
 */
import {
  datronHubPublicUrl,
  pocketpadAppIconAsset,
  pocketpadDownloadsReadmeUrl,
  pocketpadThirdPartyNoticesUrl,
} from "./public_site_urls.js";
import { buildPocketPadTop, htmlToNodes } from "./pocketpad_chrome_shared.js";

export const PocketPadHowToContent = {
  meta: {
    title: "How to Connect PocketPad — Instant Bluetooth & Wi‑Fi Setup Guide",
    description:
      "Step-by-step: connect PocketPad via Bluetooth HID in seconds (no PC install) or over Wi‑Fi with PocketPad Companion on Windows for lowest latency and multiplayer.",
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
    pageTitle: "How to connect PocketPad",
    lead_html:
      "Connect in under a minute: <strong>Bluetooth HID</strong> for instant pairing with no software on your PC, Mac, TV, or Linux — or <strong>Wi‑Fi + Companion</strong> on Windows when you want auto-discovery, pairing codes, and the fastest path for multiple phones.",
  },

  compareSection: {
    title: "Bluetooth vs Wi‑Fi — pick your path",
    rows: [
      {
        label: "Setup time",
        bluetooth: "~1 minute — pair from Bluetooth settings",
        wifi: "~3 minutes — install Companion once",
      },
      {
        label: "Software on host",
        bluetooth: "None",
        wifi: "PocketPad Companion (Windows)",
      },
      {
        label: "Best for",
        bluetooth: "Mac, Linux, TV, quick PC gaming",
        wifi: "Windows gaming, multiplayer, Universal KM code",
      },
      {
        label: "Multiple phones",
        bluetooth: "One phone per paired HID session",
        wifi: "Several phones → separate Xbox pads",
      },
      {
        label: "Internet required",
        bluetooth: "No",
        wifi: "No (LAN only)",
      },
    ],
  },

  bluetoothSection: {
    title: "Connect instantly via Bluetooth HID",
    summary_html:
      "Your phone becomes a real Bluetooth gamepad, keyboard, or mouse. The host sees a standard HID device — no drivers, no server, no account.",
    steps: [
      {
        title: "Install PocketPad on Android",
        body_html:
          "Get <strong>PocketPad</strong> from Google Play (or your pre-release build). Grant Bluetooth permissions when asked.",
      },
      {
        title: "Choose Bluetooth in the app",
        body_html:
          "Open PocketPad → <strong>Connect</strong> → select <strong>Bluetooth</strong> as the transport (not Wi‑Fi).",
      },
      {
        title: "Prepare for pairing",
        body_html:
          "Tap <strong>Prepare for pairing</strong>. The app registers the correct HID profile for your current layout (gamepad vs keyboard/mouse).",
      },
      {
        title: "Pair from the host device",
        body_html:
          "On your PC: <strong>Settings → Bluetooth & devices → Add device → Bluetooth</strong>. On Mac: <strong>System Settings → Bluetooth</strong>. Select your phone and confirm pairing on both sides.",
      },
      {
        title: "Pick a layout and play",
        body_html:
          "Back in PocketPad, open a <strong>Gamepad</strong>, <strong>Universal</strong>, <strong>Media Remote</strong>, or <strong>Slide Controller</strong> layout. Input is live immediately after pairing.",
      },
    ],
    tips_html: [
      "Wake sleeping PCs before pairing — Bluetooth may stay idle until the host is active.",
      "Switching between gamepad and keyboard/mouse modes usually requires <strong>Prepare for pairing</strong> again.",
      "Remove stale Bluetooth entries for your phone on both devices if pairing fails.",
      "Some TVs mute speakers when treating the phone as a Bluetooth audio device — disable media audio for the phone in Bluetooth settings if needed.",
    ],
  },

  wifiSection: {
    title: "Connect over Wi‑Fi with PocketPad Companion (Windows)",
    summary_html:
      "Install the free <strong>PocketPad Companion</strong> on Windows for LAN discovery, virtual Xbox controllers (ViGEm), pairing codes for Universal layouts, and multiple phones at once.",
    steps: [
      {
        title: "Download Companion for Windows",
        body_html:
          `Install the <strong>EXE installer</strong> from the <a href="./index.html">PocketPad overview</a> page. Checksums: <a href="${pocketpadDownloadsReadmeUrl}">README.txt</a>.`,
      },
      {
        title: "Run setup and approve prompts",
        body_html:
          "Approve UAC / SmartScreen. The installer adds <strong>ViGEmBus</strong> when missing (needed for virtual gamepads). Allow PocketPad Companion on <strong>private networks</strong> in Windows Firewall.",
      },
      {
        title: "Same Wi‑Fi network",
        body_html:
          "Connect your phone and PC to the same LAN. Avoid guest networks that block device-to-device traffic.",
      },
      {
        title: "Launch Companion and connect from the phone",
        body_html:
          "Open Companion on Windows. On your phone, open PocketPad → <strong>Connect</strong> → choose <strong>Wi‑Fi</strong> → tap your PC when it appears in the list.",
      },
      {
        title: "Enter pairing code (Universal layouts)",
        body_html:
          "For <strong>Universal keyboard & mouse</strong> layouts, open Companion <strong>Settings</strong> and enter the 6-digit code shown on the phone when prompted.",
      },
      {
        title: "Multiplayer",
        body_html:
          "Repeat on additional phones — each device shows as Gamepad 1, 2, 3… in Companion for couch co-op.",
      },
    ],
    tips_html: [
      `Third-party licenses: <a href="${pocketpadThirdPartyNoticesUrl}">THIRD_PARTY_NOTICES.txt</a>. Companion terms: <a href="./license.html">EULA</a>.`,
      "Prefer Bluetooth on Windows if you only need one phone and want zero install — Companion is optional.",
      "Keep Companion and phones on the same Wi‑Fi band (5 GHz vs 2.4 GHz) for stable discovery.",
    ],
  },

  troubleshootSection: {
    title: "Quick troubleshooting",
    items: [
      {
        q: "Phone not listed in Bluetooth on PC",
        a_html: "Tap <strong>Prepare for pairing</strong> first, then scan. Clear old pairings for your phone on both devices.",
      },
      {
        q: "Wi‑Fi connect fails",
        a_html: "Check Windows Firewall (private networks), same subnet, and that Companion is running.",
      },
      {
        q: "Game ignores controller",
        a_html: "Use a gamepad layout; on Windows Wi‑Fi ensure ViGEmBus is installed via Companion setup.",
      },
    ],
  },

  tailCta: {
    moreQuestionsLabel: "More questions? Read the FAQ →",
    href: "./faq.html",
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

function buildCompare(c) {
  const sec = document.createElement("section");
  sec.className = "section-block";
  const h2 = document.createElement("h2");
  h2.className = "h-section";
  h2.textContent = c.compareSection.title;
  const table = document.createElement("table");
  table.className = "guide-compare";
  const thead = document.createElement("thead");
  thead.innerHTML =
    "<tr><th>Factor</th><th>Bluetooth HID</th><th>Wi‑Fi + Companion</th></tr>";
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  for (const row of c.compareSection.rows) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<th>${row.label}</th><td>${row.bluetooth}</td><td>${row.wifi}</td>`;
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  sec.appendChild(h2);
  sec.appendChild(table);
  return sec;
}

function buildGuideSection(section, id) {
  const sec = document.createElement("section");
  sec.className = "section-block guide-block";
  sec.id = id;
  const h2 = document.createElement("h2");
  h2.className = "h-section";
  h2.textContent = section.title;
  const summary = document.createElement("p");
  summary.className = "lead-strong";
  summary.appendChild(htmlToNodes(section.summary_html));
  const ol = document.createElement("ol");
  ol.className = "guide-steps";
  for (const step of section.steps) {
    const li = document.createElement("li");
    li.className = "guide-step";
    const h3 = document.createElement("h3");
    h3.textContent = step.title;
    const p = document.createElement("p");
    p.appendChild(htmlToNodes(step.body_html));
    li.appendChild(h3);
    li.appendChild(p);
    ol.appendChild(li);
  }
  const tipsTitle = document.createElement("h3");
  tipsTitle.className = "guide-tips-title";
  tipsTitle.textContent = "Tips";
  const tipsUl = document.createElement("ul");
  tipsUl.className = "guide-tips";
  for (const tip of section.tips_html) {
    const li = document.createElement("li");
    li.appendChild(htmlToNodes(tip));
    tipsUl.appendChild(li);
  }
  sec.appendChild(h2);
  sec.appendChild(summary);
  sec.appendChild(ol);
  sec.appendChild(tipsTitle);
  sec.appendChild(tipsUl);
  return sec;
}

function buildTroubleshoot(c) {
  const sec = document.createElement("section");
  sec.className = "section-block";
  const h2 = document.createElement("h2");
  h2.className = "h-section";
  h2.textContent = c.troubleshootSection.title;
  const dl = document.createElement("dl");
  dl.className = "faq-list";
  for (const item of c.troubleshootSection.items) {
    const dt = document.createElement("dt");
    dt.className = "faq-q";
    dt.textContent = item.q;
    const dd = document.createElement("dd");
    dd.className = "faq-a";
    dd.appendChild(htmlToNodes(item.a_html));
    dl.appendChild(dt);
    dl.appendChild(dd);
  }
  sec.appendChild(h2);
  sec.appendChild(dl);
  return sec;
}

function buildTailCta(c) {
  const p = document.createElement("p");
  p.className = "tail-cta";
  const a = document.createElement("a");
  a.href = c.tailCta.href;
  a.textContent = c.tailCta.moreQuestionsLabel;
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

function renderPocketPadHowTo(content = PocketPadHowToContent) {
  const top = document.getElementById("ht-top");
  const main = document.getElementById("ht-main");
  const footer = document.getElementById("ht-footer");
  if (!top || !main || !footer) {
    console.warn("[PocketPad how-to] Missing mount nodes");
    return;
  }
  top.replaceChildren(buildPocketPadTop(content, "howto"));
  main.replaceChildren(
    buildIntro(content),
    buildCompare(content),
    buildGuideSection(content.bluetoothSection, "bluetooth"),
    buildGuideSection(content.wifiSection, "wifi"),
    buildTroubleshoot(content),
    buildTailCta(content),
  );
  footer.replaceChildren(buildFooter(content));
}

renderPocketPadHowTo();
