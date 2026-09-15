/**
 * PocketPad Gamepad Tester (`gamepad-tester.html`).
 * Browser Gamepad API: lists every connected gamepad at once, highlights button/stick/trigger input live,
 * and flags pads that stop reporting — a workaround for Windows' built-in test dialog, which only shows the first pad.
 */
import {
  datronHubPublicUrl,
  pocketpadAppIconAsset,
  pocketpadPlayStoreUrl,
} from "./public_site_urls.js";
import { buildPocketPadTop, htmlToNodes } from "./pocketpad_chrome_shared.js";

export const PocketPadGameTesterContent = {
  meta: {
    title: "Test Your Gamepad Online — Free Gamepad & Controller Tester",
    description:
      "Free online gamepad tester. Connect any USB or Bluetooth gamepad and test every button, stick, trigger, and D‑pad live in your browser. Shows multiple controllers at once — unlike Windows' built-in test dialog.",
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
    pocketpadNavAriaLabel: "PocketPad",
  },

  media: {
    appIconAlt: "",
  },

  hero: {
    headline: "PocketPad",
    pageTitle: "Test your gamepad in your browser",
    lead_html:
      "Plug in (or pair) a controller and check every <strong>button</strong>, <strong>stick</strong>, <strong>trigger</strong>, and <strong>D‑pad</strong> live. Nothing is uploaded — input stays on this page. " +
      "Unlike Windows' built-in <em>Test USB game controllers</em> dialog, this tester lists <strong>every connected gamepad at once</strong>, which is exactly what you need when Companion or Bluetooth exposes several controllers.",
  },

  toolSection: {
    title: "Live tester",
    statusIdle:
      "No gamepad detected. Press any button on your controller — try USB first, then Bluetooth.",
    supportedMsg: "This browser supports the Gamepad API.",
    unsupportedMsg:
      "This browser does not support the Gamepad API. Try the latest Chrome, Edge, Firefox, or Safari.",
    resetLabel: "Reset checks",
  },

  whyNotes: {
    title: "Why test here instead of Windows' test page?",
    lead_html:
      "Windows' built-in <code>joy.cpl</code>/<em>Test USB game controllers</em> page only displays the <strong>first</strong> controller in a multi-pad setup, " +
      "even when the other pads work fine in games. This page shows each pad <strong>side by side</strong>, with its own live visual and a " +
      "per-controller activity check — so a pad that stops reporting input is easy to spot.",
  },

  howSection: {
    title: "How to use it",
    steps: [
      "Connect a controller via USB or Bluetooth (Windows, Mac, Linux, or ChromeOS).",
      "Press any button or move a stick — the matching control lights up and its value updates live.",
      "If nothing detects at first, press a button once; some browsers only wake a pad after its first input.",
      "With multiple pads connected, each one gets its own card — look for the one marked <strong>No input yet</strong>.",
    ],
  },

  pocketpadSection: {
    title: "Testing your PocketPad setup",
    lead_html:
      "This page is a handy companion for <strong>PocketPad</strong>: verify the controller before you blame the game.",
    bullets_html: [
      `Bluetooth HID: run <a href="${pocketpadPlayStoreUrl}" rel="noopener noreferrer" target="_blank">PocketPad</a> on your phone, tap <strong>Prepare for pairing</strong>, pair from your PC, then play a few buttons here.`,
      "Wi‑Fi + Companion: with PocketPad connected over Wi‑Fi on Windows, each phone appears here as its own virtual controller — even if the system test dialog would only show the first one.",
      'If a card stays on <strong>No input yet</strong> while the pad works elsewhere, it is usually a stale virtual controller — reconnect the pad in Companion or re-pair Bluetooth, then press <strong>Reset checks</strong>.',
    ],
  },

  compatSection: {
    title: "Compatible controllers",
    lead_html:
      "Any controller the browser can see — Xbox, PlayStation, Switch Pro, generic USB HID pads, keyboard-navigable remotes exposing a gamepad, and virtual pads from tools such as Companion or JoyToKey.",
    bullets_html: [
      "Works with <strong>any number of connected gamepads</strong> at the same time.",
      "Shows the browser-standard <strong>standard layout</strong> for Xbox-style pads; on PlayStation pads the stick positions map by position, so glyphs (✕/△/◯/▢) may look rearranged — the raw button numbers below each pad are the ground truth.",
      "Also test <strong>vibration</strong> when the pad exposes a rumble actuator.",
    ],
  },

  tailCta: {
    label: "Back to the PocketPad overview →",
    href: "./index.html",
  },

  footer: {
    overviewLinkLabel: "Overview",
    detailsLinkLabel: "Details",
    howToLinkLabel: "How-to",
    faqLinkLabel: "FAQ",
    privacyLinkLabel: "Privacy",
    mutedLine: "Hosted on GitHub Pages · Input never leaves your browser",
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

function buildTool(c) {
  const t = c.toolSection;
  const section = document.createElement("section");
  section.className = "gpt-tool";
  section.setAttribute("aria-labelledby", "gpt-heading");

  const panel = document.createElement("div");
  panel.className = "gpt-panel";

  const txt = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.id = "gpt-heading";
  h2.className = "h-section";
  h2.textContent = t.title;
  const status = document.createElement("p");
  status.id = "gpt-status";
  status.className = "gpt-status-text";
  status.textContent = t.statusIdle;
  const support = document.createElement("p");
  support.id = "gpt-support";
  support.className = "gpt-support";
  txt.appendChild(h2);
  txt.appendChild(status);
  txt.appendChild(support);

  const reset = document.createElement("button");
  reset.type = "button";
  reset.id = "gpt-reset";
  reset.className = "btn";
  reset.textContent = t.resetLabel;

  panel.appendChild(txt);
  panel.appendChild(reset);

  const empty = document.createElement("div");
  empty.id = "gpt-empty";
  empty.className = "gpt-empty";
  const emptyP = document.createElement("p");
  emptyP.appendChild(htmlToNodes(t.statusIdle));
  empty.appendChild(emptyP);

  const grid = document.createElement("div");
  grid.id = "gpt-grid";
  grid.className = "tester-grid";

  section.appendChild(panel);
  section.appendChild(empty);
  section.appendChild(grid);
  return { section, status, support, reset, empty, grid };
}

function buildWhy(c) {
  const n = c.whyNotes;
  const sec = document.createElement("section");
  sec.className = "section-block";
  const h2 = document.createElement("h2");
  h2.className = "h-section";
  h2.textContent = n.title;
  const lead = document.createElement("p");
  lead.className = "lead-strong";
  lead.appendChild(htmlToNodes(n.lead_html));
  sec.appendChild(h2);
  sec.appendChild(lead);
  return sec;
}

function buildHow(c) {
  const sec = document.createElement("section");
  sec.className = "section-block";
  const h2 = document.createElement("h2");
  h2.className = "h-section";
  h2.textContent = c.howSection.title;
  const ol = document.createElement("ol");
  ol.className = "guide-steps";
  for (const step of c.howSection.steps) {
    const li = document.createElement("li");
    li.className = "guide-step";
    const p = document.createElement("p");
    p.appendChild(htmlToNodes(step));
    li.appendChild(p);
    ol.appendChild(li);
  }
  sec.appendChild(h2);
  sec.appendChild(ol);
  return sec;
}

function buildPocketPadSection(c) {
  const p = c.pocketpadSection;
  const sec = document.createElement("section");
  sec.className = "section-block";
  const h2 = document.createElement("h2");
  h2.className = "h-section";
  h2.textContent = p.title;
  const lead = document.createElement("p");
  lead.className = "lead-strong";
  lead.appendChild(htmlToNodes(p.lead_html));
  const ul = document.createElement("ul");
  ul.className = "feature-bullets";
  for (const b of p.bullets_html) {
    const li = document.createElement("li");
    li.appendChild(htmlToNodes(b));
    ul.appendChild(li);
  }
  sec.appendChild(h2);
  sec.appendChild(lead);
  sec.appendChild(ul);
  return sec;
}

function buildCompat(c) {
  const p = c.compatSection;
  const sec = document.createElement("section");
  sec.className = "section-block";
  const h2 = document.createElement("h2");
  h2.className = "h-section";
  h2.textContent = p.title;
  const lead = document.createElement("p");
  lead.className = "lead-strong";
  lead.appendChild(htmlToNodes(p.lead_html));
  const ul = document.createElement("ul");
  ul.className = "feature-bullets";
  for (const b of p.bullets_html) {
    const li = document.createElement("li");
    li.appendChild(htmlToNodes(b));
    ul.appendChild(li);
  }
  sec.appendChild(h2);
  sec.appendChild(lead);
  sec.appendChild(ul);
  return sec;
}

function buildTailCta(c) {
  const p = document.createElement("p");
  p.className = "tail-cta";
  const a = document.createElement("a");
  a.href = c.tailCta.href;
  a.className = "btn btn-primary";
  a.textContent = c.tailCta.label;
  p.appendChild(a);
  return p;
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

  const ah = document.createElement("a");
  ah.href = c.paths.pocketpadHowToPage;
  ah.textContent = f.howToLinkLabel;
  line1.appendChild(ah);
  sep();

  const af = document.createElement("a");
  af.href = c.paths.pocketpadFaqPage;
  af.textContent = f.faqLinkLabel;
  line1.appendChild(af);
  sep();

  const at = document.createElement("a");
  at.href = c.paths.pocketpadGameTesterPage;
  at.setAttribute("aria-current", "page");
  at.textContent = c.chrome.gameTesterNavLabel || "Gamepad tester";
  line1.appendChild(at);
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

const DPAD_BTNS = { 12: "up", 13: "down", 14: "left", 15: "right" };
const FACE_BTNS = { 0: "a", 1: "b", 2: "x", 3: "y" };

const cap = (v, min, max) => Math.max(min, Math.min(max, v));

function buildCardFor(pad, now) {
  const rec = { lastKey: null, lastActivity: now, seen: false, pad: null };

  const card = document.createElement("article");
  card.className = "gpt-card";

  const head = document.createElement("header");
  head.className = "gpt-card__head";

  const name = document.createElement("span");
  name.className = "gpt-card__name";
  const pid = String(pad.id || "");
  name.textContent = (pid.split("(")[0] || "Gamepad").trim() || "Gamepad";
  name.title = pid;

  const idx = document.createElement("span");
  idx.className = "gpt-card__index";
  idx.textContent = `Gamepad ${pad.index + 1}`;

  const badge = document.createElement("span");
  badge.className = "gpt-badge gpt-badge--idle";
  badge.textContent = "No input yet";

  head.appendChild(name);
  head.appendChild(idx);
  head.appendChild(badge);

  const meta = document.createElement("p");
  meta.className = "gpt-card__meta";
  meta.textContent = pid;
  const mapping = document.createElement("span");
  mapping.className = "gpt-card__mapping";
  mapping.textContent =
    pad.mapping === "standard"
      ? " · standard layout"
      : " · DirectInput layout (auto-remapped)";
  meta.appendChild(mapping);

  const visual = document.createElement("div");
  visual.className = "gpt-visual";
  visual.setAttribute("aria-hidden", "true");

  const padEl = document.createElement("div");
  padEl.className = "gpt-pad";

  const makeBtn = (cls, dataBtn, text, label) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = cls;
    if (dataBtn !== null && dataBtn !== undefined) b.dataset.btn = String(dataBtn);
    b.textContent = text;
    if (label) b.setAttribute("aria-label", label);
    b.disabled = true;
    return b;
  };

  const lb = makeBtn("gpt-bumper gpt-bumper--l", 4, "LB", "Left bumper");
  const rb = makeBtn("gpt-bumper gpt-bumper--r", 5, "RB", "Right bumper");
  const lt = makeBtn("gpt-trigger gpt-trigger--l", 6, "LT", "Left trigger");
  const rt = makeBtn("gpt-trigger gpt-trigger--r", 7, "RT", "Right trigger");

  const center = document.createElement("div");
  center.className = "gpt-center";
  const back = makeBtn("gpt-centerbtn gpt-centerbtn--back", 8, "◀", "Back selector button");
  const home = makeBtn("gpt-centerbtn gpt-centerbtn--home", 16, "◉", "Home button");
  home.style.display = "none";
  const start = makeBtn("gpt-centerbtn gpt-centerbtn--start", 9, "▶", "Start menu button");
  center.appendChild(back);
  center.appendChild(home);
  center.appendChild(start);

  const dpad = document.createElement("div");
  dpad.className = "gpt-dpad";
  for (const [i, dir] of Object.entries(DPAD_BTNS)) {
    dpad.appendChild(
      makeBtn("gpt-dbtn gpt-dbtn--" + dir, Number(i), dir === "up" ? "▲" : dir === "down" ? "▼" : dir === "left" ? "◀" : "▶", "D-pad " + dir),
    );
  }

  const face = document.createElement("div");
  face.className = "gpt-face";
  for (const [i, letter] of Object.entries(FACE_BTNS)) {
    face.appendChild(makeBtn("gpt-fbtn gpt-fbtn--" + letter, Number(i), letter.toUpperCase(), "Button " + letter.toUpperCase()));
  }

  const stickL = document.createElement("div");
  stickL.className = "gpt-stick gpt-stick--l";
  const wellL = document.createElement("div");
  wellL.className = "gpt-stick__well";
  const knobL = document.createElement("div");
  knobL.className = "gpt-stick__knob";
  wellL.appendChild(knobL);
  stickL.appendChild(wellL);

  const stickR = document.createElement("div");
  stickR.className = "gpt-stick gpt-stick--r";
  const wellR = document.createElement("div");
  wellR.className = "gpt-stick__well";
  const knobR = document.createElement("div");
  knobR.className = "gpt-stick__knob";
  wellR.appendChild(knobR);
  stickR.appendChild(wellR);

  padEl.appendChild(lt);
  padEl.appendChild(rt);
  padEl.appendChild(lb);
  padEl.appendChild(rb);
  padEl.appendChild(dpad);
  padEl.appendChild(face);
  padEl.appendChild(stickL);
  padEl.appendChild(stickR);
  padEl.appendChild(center);
  visual.appendChild(padEl);

  const values = document.createElement("div");
  values.className = "gpt-values";

  const axisL = document.createElement("b");
  axisL.className = "gpt-axis";
  axisL.textContent = "0.00, 0.00";
  const valL = document.createElement("span");
  valL.className = "gpt-value";
  valL.appendChild(document.createTextNode("L "));
  valL.appendChild(axisL);

  const axisR = document.createElement("b");
  axisR.className = "gpt-axis";
  axisR.textContent = "0.00, 0.00";
  const valR = document.createElement("span");
  valR.className = "gpt-value";
  valR.appendChild(document.createTextNode("R "));
  valR.appendChild(axisR);

  const trLnum = document.createElement("em");
  trLnum.className = "gpt-trigger__num";
  trLnum.textContent = "0.00";
  const trLbar = document.createElement("i");
  trLbar.className = "gpt-trigger__bar";
  const trLfill = document.createElement("span");
  trLfill.className = "gpt-trigger__fill";
  trLbar.appendChild(trLfill);
  const valLT = document.createElement("span");
  valLT.className = "gpt-value gpt-value--trigger";
  valLT.appendChild(document.createTextNode("LT "));
  valLT.appendChild(trLbar);
  valLT.appendChild(trLnum);

  const trRnum = document.createElement("em");
  trRnum.className = "gpt-trigger__num";
  trRnum.textContent = "0.00";
  const trRbar = document.createElement("i");
  trRbar.className = "gpt-trigger__bar";
  const trRfill = document.createElement("span");
  trRfill.className = "gpt-trigger__fill";
  trRbar.appendChild(trRfill);
  const valRT = document.createElement("span");
  valRT.className = "gpt-value gpt-value--trigger";
  valRT.appendChild(document.createTextNode("RT "));
  valRT.appendChild(trRbar);
  valRT.appendChild(trRnum);

  values.appendChild(valL);
  values.appendChild(valR);
  values.appendChild(valLT);
  values.appendChild(valRT);

  const chips = document.createElement("ul");
  chips.className = "gpt-chips";
  const chipMap = new Map();
  const nButtons = pad.buttons ? pad.buttons.length : 0;
  const layout = pad.mapping === "standard" ? null : buildRawLayout();
  home.style.display = layout || nButtons > 16 ? "" : "none";
  for (let i = 0; i < nButtons; i++) {
    const li = document.createElement("li");
    li.className = "gpt-chip";
    li.dataset.btn = String(i);
    const label = document.createElement("span");
    label.className = "gpt-chip__label";
    const stdIdx = layout ? layout.btnRaw[i] : i;
    const lbName =
      (stdIdx !== undefined && BUTTON_LABELS[stdIdx]) ||
      BUTTON_LABELS[i] ||
      String(i);
    label.textContent = `${i} · ${lbName}`;
    const val = document.createElement("span");
    val.className = "gpt-chip__val";
    val.textContent = "–";
    li.appendChild(label);
    li.appendChild(val);
    chips.appendChild(li);
    chipMap.set(i, li);
  }

  const foot = document.createElement("footer");
  foot.className = "gpt-card__foot";
  const idle = document.createElement("span");
  idle.className = "gpt-idle";
  idle.textContent = "Waiting for input…";
  const rumble = document.createElement("button");
  rumble.type = "button";
  rumble.className = "gpt-rumble btn";
  rumble.textContent = "Test vibration";
  foot.appendChild(idle);
  foot.appendChild(rumble);

  rec.card = card;
  rec.padBtns = new Map();
  visual.querySelectorAll("[data-btn]").forEach((el) => {
    rec.padBtns.set(Number(el.dataset.btn), el);
  });
  rec.knobL = knobL;
  rec.knobR = knobR;
  rec.axisL = axisL;
  rec.axisR = axisR;
  rec.trLfill = trLfill;
  rec.trRfill = trRfill;
  rec.trLnum = trLnum;
  rec.trRnum = trRnum;
  rec.trFillL = lt;
  rec.trFillR = rt;
  rec.chips = chipMap;
  rec.layout = layout;
  rec.badge = badge;
  rec.idle = idle;
  rec.rumble = rumble;
  rec.pad = pad;
  rec.lastKey = stateKey(pad);

  rumble.addEventListener("click", () => onRumble(rec));

  card.appendChild(head);
  card.appendChild(meta);
  card.appendChild(visual);
  card.appendChild(values);
  card.appendChild(chips);
  card.appendChild(foot);

  return rec;
}

const BUTTON_LABELS = {
  0: "A", 1: "B", 2: "X", 3: "Y",
  4: "LB", 5: "RB", 6: "LT", 7: "RT",
  8: "Back", 9: "Start", 10: "L3", 11: "R3",
  12: "D‑up", 13: "D‑down", 14: "D‑left", 15: "D‑right",
  16: "Home",
};

function stateKey(pad) {
  const ax = [];
  if (pad.axes) {
    for (let i = 0; i < pad.axes.length; i++) ax.push(pad.axes[i].toFixed(3));
  }
  const bt = [];
  if (pad.buttons) {
    for (let i = 0; i < pad.buttons.length; i++) {
      const b = pad.buttons[i];
      bt.push((b.pressed ? 1 : 0) + ":" + b.value.toFixed(3));
    }
  }
  return ax.join(",") + "|" + bt.join(",");
}

function axisAt(pad, i, layout) {
  const raw = layout && layout.axis[i] !== undefined ? layout.axis[i] : i;
  if (!pad.axes || raw >= pad.axes.length) return 0;
  const v = pad.axes[raw];
  return typeof v === "number" && isFinite(v) ? v : 0;
}

function buttonAt(pad, i, layout) {
  let raw = i;
  if (layout && layout.btn[i] !== undefined) raw = layout.btn[i];
  if (raw < 0) return null;
  if (!pad.buttons || raw >= pad.buttons.length) return null;
  return pad.buttons[raw];
}

/* Remap for DirectInput-mode pads (mapping !== "standard").
   Raw browser order for DInput pads follows the classic 360/DInput
   convention: A B X Y LB RB Back Start L3 R3 Guide D-up D-down D-left D-right
   (raw 0..14) and axes X Y Z Rx Ry Rz (raw 0..5) where Z/Rz are the analog
   triggers. Maps standard indexes backward to those raw indexes. */
function buildRawLayout() {
  return {
    btn: {
      0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5,
      6: -1, 7: -1,
      8: 6, 9: 7, 10: 8, 11: 9,
      12: 11, 13: 12, 14: 13, 15: 14,
      16: 10,
    },
    btnRaw: {
      0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 8, 7: 9,
      8: 10, 9: 11, 10: 16, 11: 12, 12: 13, 13: 14, 14: 15,
    },
    axis: { 0: 0, 1: 1, 2: 3, 3: 4 },
    trigL: 2,
    trigR: 5,
  };
}

function setKnob(knob, x, y) {
  const px = cap(x, -1, 1) * 22;
  const py = cap(y, -1, 1) * 22;
  knob.style.transform = `translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`;
}

function updateCard(rec, now) {
  const pad = rec.pad;
  const key = stateKey(pad);
  if (key !== rec.lastKey) {
    rec.lastKey = key;
    rec.lastActivity = now;
    if (!rec.seen) {
      rec.seen = true;
      rec.badge.textContent = "Works — receiving input";
      rec.badge.className = "gpt-badge gpt-badge--ok";
    }
  }

  const idle = now - rec.lastActivity;
  const active = idle < 2000;
  rec.card.classList.toggle("gpt-card--active", active);

  rec.idle.textContent = !rec.seen
    ? "Waiting for input…"
    : idle > 4000
      ? "No recent input"
      : "Receiving input";
  rec.idle.classList.toggle("gpt-idle--warn", rec.seen && idle > 4000);

  const L = rec.layout;
  setKnob(rec.knobL, axisAt(pad, 0, L), axisAt(pad, 1, L));
  setKnob(rec.knobR, axisAt(pad, 2, L), axisAt(pad, 3, L));
  rec.axisL.textContent = `${axisAt(pad, 0, L).toFixed(2)}, ${axisAt(pad, 1, L).toFixed(2)}`;
  rec.axisR.textContent = `${axisAt(pad, 2, L).toFixed(2)}, ${axisAt(pad, 3, L).toFixed(2)}`;

  let lt = 0;
  let rt = 0;
  if (L) {
    lt = cap((axisAt(pad, L.trigL) + 1) / 2, 0, 1);
    rt = cap((axisAt(pad, L.trigR) + 1) / 2, 0, 1);
  } else {
    lt = ((buttonAt(pad, 6) || {}).value) || 0;
    rt = ((buttonAt(pad, 7) || {}).value) || 0;
  }
  rec.trLfill.style.width = `${cap(lt, 0, 1) * 100}%`;
  rec.trRfill.style.width = `${cap(rt, 0, 1) * 100}%`;
  rec.trLnum.textContent = lt.toFixed(2);
  rec.trRnum.textContent = rt.toFixed(2);
  rec.trFillL.classList.toggle("is-pressed", lt > 0.25);
  rec.trFillR.classList.toggle("is-pressed", rt > 0.25);

  for (const [i, el] of rec.padBtns) {
    if (el.classList.contains("gpt-trigger")) continue;
    const b = buttonAt(pad, i, L);
    const pressed = Boolean(b && b.pressed);
    el.classList.toggle("is-pressed", pressed);
  }

  if (pad.buttons) {
    for (let i = 0; i < pad.buttons.length; i++) {
      const li = rec.chips.get(i);
      if (!li) continue;
      const b = pad.buttons[i];
      li.classList.toggle("is-pressed", Boolean(b.pressed));
      const valEl = li.querySelector(".gpt-chip__val");
      if (valEl) valEl.textContent = b.pressed ? b.value.toFixed(2) : "–";
    }
  }
}

function onRumble(rec) {
  const pad = rec.pad;
  if (!pad) return;
  const actuator = pad.vibrationActuator || (pad.hapticActuators && pad.hapticActuators[0]);
  if (!actuator || typeof actuator.playEffect !== "function") {
    rec.rumble.disabled = true;
    rec.rumble.textContent = "Vibration not supported";
    return;
  }
  try {
    const result = actuator.playEffect("dual-rumble", {
      startDelay: 0,
      duration: 250,
      strongMagnitude: 1.0,
      weakMagnitude: 1.0,
    });
    if (result && typeof result.catch === "function") result.catch(() => {});
  } catch {
    rec.rumble.disabled = true;
    rec.rumble.textContent = "Vibration not supported";
  }
}

const cards = new Map();
let statusEl = null;
let supportEl = null;
let emptyEl = null;
let gridEl = null;
let resetEl = null;
let rafId = 0;
let idleStatusText = "No gamepad detected. Press any button on your controller.";

function updatePresence() {
  const count = cards.size;
  if (emptyEl) emptyEl.hidden = count > 0;
  if (statusEl) {
    statusEl.textContent = count
      ? `${count} gamepad${count === 1 ? "" : "s"} connected — press any button or move a stick.`
      : idleStatusText;
  }
}

function updatePads(now) {
  let pads = [];
  try {
    pads = Array.from(navigator.getGamepads ? navigator.getGamepads() : []);
  } catch {
    pads = [];
  }
  const connected = pads.filter((p) => p && p.connected);
  const active = new Set();
  for (const pad of connected) {
    active.add(pad.index);
    let rec = cards.get(pad.index);
    if (!rec) {
      rec = buildCardFor(pad, now);
      cards.set(pad.index, rec);
      if (gridEl) gridEl.appendChild(rec.card);
    }
    rec.pad = pad;
    updateCard(rec, now);
  }
  for (const [index, rec] of Array.from(cards)) {
    if (!active.has(index)) {
      rec.card.remove();
      cards.delete(index);
    }
  }
  updatePresence();
}

function poll(now) {
  rafId = requestAnimationFrame(poll);
  updatePads(now);
}

function resetChecks() {
  for (const rec of cards.values()) {
    rec.seen = false;
    rec.lastKey = stateKey(rec.pad);
    rec.lastActivity = performance.now();
    rec.badge.textContent = "No input yet";
    rec.badge.className = "gpt-badge gpt-badge--idle";
    rec.idle.textContent = "Waiting for input…";
    rec.idle.classList.remove("gpt-idle--warn");
    rec.card.classList.remove("gpt-card--active");
  }
}

function startEngine() {
  const supported = typeof navigator !== "undefined" && typeof navigator.getGamepads === "function";
  if (!supported) return;

  const ping = () => updatePresence();

  window.addEventListener("gamepadconnected", ping);
  window.addEventListener("gamepaddisconnected", ping);
  if (resetEl) resetEl.addEventListener("click", resetChecks);
  rafId = requestAnimationFrame(poll);
}

function renderPocketPadGameTester(content = PocketPadGameTesterContent) {
  document.title = content.meta.title;
  const dm = document.querySelector('meta[name="description"]');
  if (dm) dm.setAttribute("content", content.meta.description);

  const top = document.getElementById("gt-top");
  const main = document.getElementById("gt-main");
  const footer = document.getElementById("gt-footer");
  if (!top || !main || !footer) {
    console.warn("[PocketPad gamepad tester] Missing mount nodes");
    return;
  }

  top.replaceChildren(buildPocketPadTop(content, "tester"));

  const tool = buildTool(content);
  statusEl = tool.status;
  supportEl = tool.support;
  emptyEl = tool.empty;
  gridEl = tool.grid;
  resetEl = tool.reset;
  idleStatusText = content.toolSection.statusIdle;
  supportEl.textContent = typeof navigator !== "undefined" && typeof navigator.getGamepads === "function"
    ? content.toolSection.supportedMsg
    : content.toolSection.unsupportedMsg;

  main.replaceChildren(
    buildIntro(content),
    tool.section,
    buildWhy(content),
    buildHow(content),
    buildPocketPadSection(content),
    buildCompat(content),
    buildTailCta(content),
  );
  footer.replaceChildren(...buildFooter(content));

  startEngine();
}

renderPocketPadGameTester();