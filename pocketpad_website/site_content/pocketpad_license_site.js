/**
 * PocketPad License Agreement (`license.html`) — full text loaded from downloads/EULA.txt.
 */
import {
  datronHubPublicUrl,
  pocketpadEulaTextUrl,
  pocketpadThirdPartyNoticesUrl,
} from "./public_site_urls.js";

export const PocketPadLicenseContent = {
  meta: {
    title: "PocketPad — License Agreement",
    description:
      "End User License Agreement (EULA) for PocketPad PC Companion on Windows.",
  },

  paths: {
    stylesheet: "../../styles.css",
    appIconPng: "../../assets/icons/gamepad_1.png",
    datronHome: datronHubPublicUrl,
    pocketpadOverviewPage: "./index.html",
    pocketpadDetailsPage: "./info.html",
    pocketpadPrivacyPage: "./privacy.html",
    pocketpadLicensePage: "./license.html",
    eulaTextHref: pocketpadEulaTextUrl,
    thirdPartyNoticesHref: pocketpadThirdPartyNoticesUrl,
  },

  chrome: {
    backToDatronLabel: "← Back to Datron",
    navBrandSuffix: "",
    overviewNavLabel: "Overview",
    detailsNavLabel: "Details",
    privacyNavLabel: "Privacy",
    licenseNavLabel: "License",
    pocketpadNavAriaLabel: "PocketPad",
  },

  hero: {
    headline: "PocketPad",
    pageTitle: "End User License Agreement",
    effectiveDate: "June 27, 2026",
    lead_html:
      "This page shows the <strong>End User License Agreement (EULA)</strong> for <strong>PocketPad PC Companion</strong> on Windows. " +
      `Separate from this agreement, <a href="${pocketpadThirdPartyNoticesUrl}">THIRD_PARTY_NOTICES.txt</a> lists third-party open-source license texts for ViGEm components only.`,
  },

  media: {
    appIconAlt: "",
  },

  footer: {
    overviewLinkLabel: "Overview",
    detailsLinkLabel: "Details",
    privacyLinkLabel: "Privacy",
    licenseLinkLabel: "License",
    mutedLine: "Hosted on GitHub Pages · ViGEm components remain under their own licenses.",
    contactTitle: "Contact",
    contactEmail: "dasoft573@gmail.com",
    contactHint_html:
      "For licensing permissions (e.g. redistribution), email with subject <strong>License request: PocketPad PC Companion</strong>.",
    mailtoBugSubject: "Bug detected: ",
    mailtoFeatureSubject: "Feature request: ",
    quickMailBugLabel: "Bug detected",
    quickMailFeatureLabel: "Feature request",
  },
};

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
  back.className = "pocket-top__back";
  back.href = c.paths.datronHome;
  back.textContent = c.chrome.backToDatronLabel;
  back.title = "Datron — developer home";

  const nav = document.createElement("nav");
  nav.className = "pocket-top__nav";
  nav.setAttribute("aria-label", c.chrome.pocketpadNavAriaLabel);
  nav.appendChild(pill(c.paths.pocketpadOverviewPage, c.chrome.overviewNavLabel, false));
  nav.appendChild(pill(c.paths.pocketpadDetailsPage, c.chrome.detailsNavLabel, false));
  nav.appendChild(pill(c.paths.pocketpadPrivacyPage, c.chrome.privacyNavLabel, false));
  nav.appendChild(pill(c.paths.pocketpadLicensePage, c.chrome.licenseNavLabel, true));

  row.appendChild(back);
  row.appendChild(nav);
  return row;
}

function buildIntro(c) {
  const sec = document.createElement("section");
  sec.className = "info-intro legal-intro";

  const h1 = document.createElement("h1");
  h1.className = "h-page";
  h1.textContent = c.hero.pageTitle;

  const effective = document.createElement("p");
  effective.className = "legal-effective";
  effective.textContent = `Effective ${c.hero.effectiveDate}`;

  const lead = document.createElement("p");
  lead.className = "muted";
  lead.appendChild(
    (() => {
      const t = document.createElement("template");
      t.innerHTML = c.hero.lead_html.trim();
      return t.content;
    })(),
  );

  sec.appendChild(h1);
  sec.appendChild(effective);
  sec.appendChild(lead);
  return sec;
}

function buildEulaBody(text) {
  const sec = document.createElement("section");
  sec.className = "section-block legal-section";

  const pre = document.createElement("pre");
  pre.className = "legal-eula-text";
  pre.textContent = text;

  const dl = document.createElement("p");
  dl.className = "legal-p";
  const a = document.createElement("a");
  a.href = PocketPadLicenseContent.paths.eulaTextHref;
  a.download = "PocketPad-PC-Companion-EULA.txt";
  a.textContent = "Download EULA as plain text";
  dl.appendChild(a);

  sec.appendChild(pre);
  sec.appendChild(dl);
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
  ap.textContent = f.privacyLinkLabel;
  line1.appendChild(ap);
  sep();

  const al = document.createElement("a");
  al.href = c.paths.pocketpadLicensePage;
  al.setAttribute("aria-current", "page");
  al.textContent = f.licenseLinkLabel;
  line1.appendChild(al);

  const muted = document.createElement("p");
  muted.className = "footer-line site-footer-muted";
  muted.textContent = f.mutedLine;

  return [line1, muted];
}

async function renderPocketPadLicense(content = PocketPadLicenseContent) {
  document.title = content.meta.title;
  const dm = document.querySelector('meta[name="description"]');
  if (dm) {
    dm.setAttribute("content", content.meta.description);
  }

  const top = document.getElementById("lic-top");
  const main = document.getElementById("lic-main");
  const footer = document.getElementById("lic-footer");
  if (!top || !main || !footer) {
    console.warn("[PocketPad license] Missing mount nodes");
    return;
  }

  top.replaceChildren(buildTop(content));
  main.replaceChildren(buildIntro(content));

  try {
    const res = await fetch(content.paths.eulaTextHref);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const text = await res.text();
    main.appendChild(buildEulaBody(text));
  } catch (err) {
    const errP = document.createElement("p");
    errP.className = "legal-p";
    errP.textContent = `Could not load the EULA text. Open ${content.paths.eulaTextHref} directly.`;
    main.appendChild(errP);
    console.warn("[PocketPad license]", err);
  }

  footer.replaceChildren(...buildFooter(content));
}

renderPocketPadLicense();
