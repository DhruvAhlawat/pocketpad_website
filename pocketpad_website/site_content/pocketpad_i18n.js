/**
 * Translations for the pages that are built in the browser (how-to, FAQ, tester, ...).
 *
 * Translated pages live in /<lang>/ and carry <html data-site-lang="<lang>">. Each page module:
 *   1. awaits loadDict("<page>") before it renders (so nothing shows in English first),
 *   2. renders as usual with the English content,
 *   3. calls translateDom() to swap every English string for its translation.
 * Strings set later by code (status lines in the gamepad tester) go through t().
 *
 * Dictionaries are i18n/<lang>/common.json plus i18n/<lang>/<page>.json, keyed by the English
 * text, the same files tools/build_i18n.mjs uses for the static HTML. collect() lists the
 * English strings of a rendered page; tools/extract_i18n_strings.py calls it.
 */
const SITE_ROOT = new URL("../", import.meta.url);

export const siteLang = (document.documentElement.getAttribute("data-site-lang") || "en").toLowerCase();

let dict = null;

async function fetchJson(path) {
  try {
    const res = await fetch(new URL(path, SITE_ROOT));
    return res.ok ? await res.json() : {};
  } catch {
    return {};
  }
}

/** Load the translations for a page. Resolves to null on English pages. */
export async function loadDict(page) {
  if (siteLang === "en") return null;
  const [common, own] = await Promise.all([
    fetchJson(`i18n/${siteLang}/common.json`),
    fetchJson(`i18n/${siteLang}/${page}.json`),
  ]);
  dict = { ...common, ...own };
  return dict;
}

const normalize = (s) => String(s).replace(/\s+/g, " ").trim();

/** Translate one string (for text set by code after the page is built). */
export function t(english) {
  if (!dict) return english;
  const hit = dict[normalize(english)];
  return typeof hit === "string" && hit ? hit : english;
}

// Same rules as tools/build_i18n.mjs.
const INLINE = new Set([
  "A", "ABBR", "B", "BR", "CODE", "EM", "I", "KBD", "MARK", "S", "SMALL", "SPAN", "STRONG", "SUB", "SUP", "TIME", "U",
]);
const BLOCK_UNITS = new Set([
  "BUTTON", "CAPTION", "DD", "DT", "FIGCAPTION", "H1", "H2", "H3", "H4", "H5", "H6", "LABEL", "LEGEND", "LI",
  "OPTION", "P", "SUMMARY", "TD", "TH", "TITLE",
]);
const SKIP = new Set(["SCRIPT", "STYLE", "PRE", "SVG", "TEMPLATE", "NOSCRIPT", "TEXTAREA"]);
const ATTRS = ["alt", "aria-label", "title", "placeholder"];

const noTranslate = (n) =>
  n.nodeType === 1 && (n.getAttribute("translate") === "no" || n.hasAttribute("data-i18n-skip"));
const hasText = (n) =>
  n.nodeType === 3 ? /\S/.test(n.nodeValue) : n.nodeType === 1 && !noTranslate(n) && [...n.childNodes].some(hasText);
const onlyInline = (n) =>
  n.nodeType === 3 ||
  n.nodeType === 8 ||
  (n.nodeType === 1 && (noTranslate(n) || (INLINE.has(n.tagName) && [...n.childNodes].every(onlyInline))));

/** "<a>FAQ</a> · <a>Overview</a>": a row of links is translated link by link, not as one string. */
const isLinkList = (kids) =>
  kids.filter((c) => c.nodeType === 1 && c.tagName === "A").length >= 2 &&
  kids.every((c) => c.nodeType !== 3 || /^[\s·|•,/]*$/.test(c.nodeValue));

function keyFor(el) {
  const clone = el.cloneNode(true);
  const kept = [];
  const originals = [...el.querySelectorAll("*")].filter(noTranslate);
  [...clone.querySelectorAll("*")].filter(noTranslate).forEach((n, i) => {
    kept.push(originals[i]);
    n.replaceWith(document.createTextNode(`{${kept.length - 1}}`));
  });
  return { key: normalize(clone.innerHTML), kept };
}

/** Walk the DOM and call visit(entry) for every string: { key, apply(translation) }. */
function walkStrings(root, visit) {
  function attrs(el) {
    for (const name of ATTRS) {
      const v = el.getAttribute(name);
      if (v && /\S/.test(v)) visit({ key: normalize(v), apply: (tr) => el.setAttribute(name, tr) });
    }
  }
  function visitEl(el, parent) {
    if (noTranslate(el) || SKIP.has(el.tagName)) return;
    attrs(el);
    const kids = [...el.childNodes];
    const unit =
      (BLOCK_UNITS.has(el.tagName) || (INLINE.has(el.tagName) && !(parent && BLOCK_UNITS.has(parent.tagName)))) &&
      kids.every(onlyInline) &&
      kids.some(hasText) &&
      !isLinkList(kids);
    if (unit) {
      el.querySelectorAll("*").forEach(attrs);
      let target = el;
      for (;;) {
        const meaningful = [...target.childNodes].filter(
          (c) => c.nodeType === 1 || (c.nodeType === 3 && /\S/.test(c.nodeValue)),
        );
        if (meaningful.length === 1 && meaningful[0].nodeType === 1 && !noTranslate(meaningful[0]) && meaningful[0].tagName !== "BR") {
          target = meaningful[0];
        } else break;
      }
      const { key, kept } = keyFor(target);
      visit({
        key,
        apply: (tr) => {
          if (!kept.length && !/[<&]/.test(tr)) {
            target.textContent = tr;
            return;
          }
          const tpl = document.createElement("template");
          tpl.innerHTML = tr.replace(/\{(\d+)\}/g, (_, i) => `<i data-i18n-slot="${i}"></i>`);
          tpl.content.querySelectorAll("[data-i18n-slot]").forEach((slot) => {
            const keep = kept[Number(slot.getAttribute("data-i18n-slot"))];
            if (keep) slot.replaceWith(keep);
            else slot.remove();
          });
          target.replaceChildren(tpl.content);
        },
      });
      return;
    }
    for (const c of kids) {
      if (c.nodeType === 3) {
        if (!/\S/.test(c.nodeValue)) continue;
        const lead = c.nodeValue.match(/^\s*/)[0];
        const trail = c.nodeValue.match(/\s*$/)[0];
        visit({ key: normalize(c.nodeValue), apply: (tr) => (c.nodeValue = lead + tr + trail) });
      } else if (c.nodeType === 1) visitEl(c, el);
    }
  }
  visitEl(root, null);
}

/** Swap the English strings under root (default: the whole page) for their translations. */
export function translateDom(root = document.body, d = dict) {
  if (!d) return;
  walkStrings(root, ({ key, apply }) => {
    const tr = d[key];
    if (typeof tr === "string" && tr && tr !== key) apply(tr);
  });
  // Page modules set the title and description from their English content.
  const title = d[normalize(document.title)];
  if (title) document.title = title.replace(/&amp;/g, "&");
  const desc = document.querySelector('meta[name="description"]');
  const dv = desc && d[normalize(desc.getAttribute("content") || "")];
  if (dv) desc.setAttribute("content", dv.replace(/&amp;/g, "&"));
}

/** English strings of the rendered page, in page order (used by the extraction tool). */
export function collect(root = document.body) {
  const keys = [];
  walkStrings(root, ({ key }) => keys.push(key));
  keys.push(normalize(document.title));
  const desc = document.querySelector('meta[name="description"]');
  if (desc) keys.push(normalize(desc.getAttribute("content") || ""));
  return [...new Set(keys.filter(Boolean))];
}
