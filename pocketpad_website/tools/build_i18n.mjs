/**
 * Builds the translated copies of the website from the English pages.
 *
 *   node pocketpad_website/tools/build_i18n.mjs           build every language
 *   node pocketpad_website/tools/build_i18n.mjs --check   only report missing or unused translations
 *
 * How it works
 * - The English page (e.g. apps/pocketpad/index.html) stays the source. Edit it as usual.
 * - Every piece of visible text is a "string": a heading, paragraph, list item, caption or link
 *   text, plus alt / aria-label / title attributes, the page meta tags and the JSON-LD text.
 *   The English text itself is the key in i18n/<lang>/<page>.json, and the value is the
 *   translation. Inline tags inside a string (<b>, <a>, <span>) must appear in the translation too.
 * - An element with translate="no" is left as is. Inside a string it shows up as {0}, {1}, ...
 *   so the translation can move it around (used for the Companion version number).
 * - i18n/_source/<page>.json lists every English string, for whoever adds a new language.
 * - A string with no translation falls back to English and is reported, so after editing the
 *   English page, run this script and translate what it lists.
 *
 * It also writes the hreflang links, the language menu, the sitemap entries and
 * site_content/pocketpad_lang.js (language detection) for every page and language.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { allLanguages, languages, sourceLanguage } from "../i18n/languages.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, "..");
const origin = "https://pocketpad.datronapps.com";
const checkOnly = process.argv.includes("--check");

/** Pages that are translated. `out` is the file inside each language folder. */
const pages = [
  {
    id: "overview",
    source: "apps/pocketpad/index.html",
    out: "index.html",
    englishHref: "./index.html",
    englishUrl: `${origin}/apps/pocketpad/index.html`,
    localizedUrl: (code) => `${origin}/${code}/`,
    sitemap: { changefreq: "weekly", priority: "1.0" },
  },
];

/** English page file names (relative to apps/pocketpad/) that have translations. */
const translatedPageFiles = new Map(pages.map((p) => [path.basename(p.source), p.out]));

// ---------------------------------------------------------------------------
// A small HTML tokenizer and tree. Good enough for our own hand-written pages.
// ---------------------------------------------------------------------------
const VOID = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr",
]);
const RAW = new Set(["script", "style"]);

function parseAttrs(src) {
  const attrs = [];
  const re = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let m;
  while ((m = re.exec(src))) {
    const value = m[2] ?? m[3] ?? m[4];
    attrs.push({ name: m[1], value: value === undefined ? null : value });
  }
  return attrs;
}

function parse(html) {
  const root = { type: "root", children: [] };
  const stack = [root];
  let i = 0;
  const top = () => stack[stack.length - 1];
  while (i < html.length) {
    if (html.startsWith("<!--", i)) {
      const end = html.indexOf("-->", i) + 3;
      top().children.push({ type: "comment", raw: html.slice(i, end) });
      i = end;
    } else if (html.startsWith("<!", i)) {
      const end = html.indexOf(">", i) + 1;
      top().children.push({ type: "raw", raw: html.slice(i, end) });
      i = end;
    } else if (html.startsWith("</", i)) {
      const end = html.indexOf(">", i) + 1;
      const tag = html.slice(i + 2, end - 1).trim().toLowerCase();
      // Pop to the matching element (tolerates the odd unclosed tag).
      for (let s = stack.length - 1; s > 0; s--) {
        if (stack[s].tag === tag) {
          stack.length = s;
          break;
        }
      }
      i = end;
    } else if (html[i] === "<" && /[a-zA-Z]/.test(html[i + 1] || "")) {
      // Find the end of the start tag, skipping quoted values.
      let j = i + 1;
      let quote = null;
      while (j < html.length) {
        const ch = html[j];
        if (quote) {
          if (ch === quote) quote = null;
        } else if (ch === '"' || ch === "'") quote = ch;
        else if (ch === ">") break;
        j++;
      }
      const raw = html.slice(i, j + 1);
      const inner = raw.slice(1, -1);
      const tagMatch = inner.match(/^([a-zA-Z][\w:-]*)/);
      const tag = tagMatch[1].toLowerCase();
      const selfClosing = /\/\s*$/.test(inner);
      const attrSrc = inner.slice(tagMatch[1].length).replace(/\/\s*$/, "");
      const el = { type: "el", tag, raw, attrs: parseAttrs(attrSrc), children: [], selfClosing, dirty: false };
      top().children.push(el);
      i = j + 1;
      if (RAW.has(tag)) {
        const close = html.toLowerCase().indexOf(`</${tag}`, i);
        el.children.push({ type: "text", text: html.slice(i, close), raw: true });
        i = html.indexOf(">", close) + 1;
        el.closed = true;
      } else if (!VOID.has(tag) && !selfClosing) {
        stack.push(el);
      }
    } else {
      let end = html.indexOf("<", i + 1);
      if (end === -1) end = html.length;
      // A lone "<" that does not start a tag stays text.
      while (end < html.length && !/[a-zA-Z!/]/.test(html[end + 1] || "")) {
        const next = html.indexOf("<", end + 1);
        end = next === -1 ? html.length : next;
      }
      top().children.push({ type: "text", text: html.slice(i, end) });
      i = end;
    }
  }
  return root;
}

function startTag(el) {
  if (!el.dirty) return el.raw;
  const attrs = el.attrs
    .map((a) => (a.value === null ? ` ${a.name}` : ` ${a.name}="${a.value.replace(/"/g, "&quot;")}"`))
    .join("");
  return `<${el.tag}${attrs}${el.selfClosing ? " /" : ""}>`;
}

function serialize(node) {
  if (node.type === "text") return node.text;
  if (node.type === "comment" || node.type === "raw") return node.raw;
  const inner = node.children.map(serialize).join("");
  if (node.type === "root") return inner;
  if (VOID.has(node.tag) || node.selfClosing) return startTag(node);
  return `${startTag(node)}${inner}</${node.tag}>`;
}

const getAttr = (el, name) => el.attrs.find((a) => a.name === name)?.value ?? null;
function setAttr(el, name, value) {
  const a = el.attrs.find((x) => x.name === name);
  if (a) a.value = value;
  else el.attrs.push({ name, value });
  el.dirty = true;
}

function* walk(node) {
  yield node;
  if (node.children) for (const c of node.children) yield* walk(c);
}

// ---------------------------------------------------------------------------
// Finding the strings
// ---------------------------------------------------------------------------
const INLINE = new Set([
  "a", "abbr", "b", "br", "code", "em", "i", "kbd", "mark", "s", "small", "span", "strong", "sub", "sup", "time", "u",
]);
const BLOCK_UNITS = new Set([
  "button", "caption", "dd", "dt", "figcaption", "h1", "h2", "h3", "h4", "h5", "h6", "label", "legend", "li",
  "option", "p", "summary", "td", "th", "title",
]);
const ATTRS = ["alt", "aria-label", "title", "placeholder"];
const META_NAMES = new Set(["description", "keywords", "twitter:title", "twitter:description"]);
const META_PROPS = new Set(["og:title", "og:description", "og:image:alt"]);

const noTranslate = (n) => n.type === "el" && getAttr(n, "translate") === "no";
const hasText = (n) =>
  n.type === "text" ? /\S/.test(n.text) : n.type === "el" && !noTranslate(n) && n.children.some(hasText);
const onlyInline = (n) =>
  n.type === "text" ||
  n.type === "comment" ||
  (n.type === "el" && (noTranslate(n) || (INLINE.has(n.tag) && n.children.every(onlyInline))));

const normalize = (s) => s.replace(/\s+/g, " ").trim();

/** The key for a run of nodes: their HTML with translate="no" elements swapped for {0}, {1}... */
function keyFor(nodes) {
  const kept = [];
  const ser = (n) => {
    if (noTranslate(n)) {
      kept.push(serialize(n));
      return `{${kept.length - 1}}`;
    }
    if (n.type === "el" && !VOID.has(n.tag) && !n.selfClosing) {
      return `${startTag(n)}${n.children.map(ser).join("")}</${n.tag}>`;
    }
    return serialize(n);
  };
  return { key: normalize(nodes.map(ser).join("")), kept };
}

/**
 * Collect every translatable string in the tree. Each entry has a key (English) and an
 * apply(translation) function that writes the translation back into the tree.
 */
function collectStrings(root) {
  const out = [];

  function visitChildren(el) {
    for (const child of el.children) {
      if (child.type === "text") {
        if (!/\S/.test(child.text) || child.raw) continue;
        const lead = child.text.match(/^\s*/)[0];
        const trail = child.text.match(/\s*$/)[0];
        out.push({
          key: normalize(child.text),
          kind: "text",
          apply: (t) => (child.text = lead + t + trail),
        });
      } else if (child.type === "el") visit(child, el);
    }
  }

  function visit(el, parent) {
    if (el.type !== "el") return;
    if (noTranslate(el)) return;
    collectAttrs(el);
    if (RAW.has(el.tag)) {
      if (el.tag === "script" && getAttr(el, "type") === "application/ld+json") collectJsonLd(el);
      return;
    }
    const unit =
      (BLOCK_UNITS.has(el.tag) || (INLINE.has(el.tag) && !(parent && BLOCK_UNITS.has(parent.tag)))) &&
      el.children.every(onlyInline) &&
      el.children.some(hasText);
    if (unit) {
      for (const n of walk(el)) if (n !== el && n.type === "el") collectAttrs(n);
      // <li><a href="...">Text</a></li>: the string is just "Text", without the link markup.
      let target = el;
      for (;;) {
        const meaningful = target.children.filter((c) => c.type !== "comment" && (c.type !== "text" || /\S/.test(c.text)));
        if (meaningful.length === 1 && meaningful[0].type === "el" && !noTranslate(meaningful[0]) && meaningful[0].tag !== "br") {
          target = meaningful[0];
        } else break;
      }
      const { key, kept } = keyFor(target.children);
      out.push({
        key,
        kind: "html",
        apply: (t) => {
          const filled = t.replace(/\{(\d+)\}/g, (_, i) => kept[Number(i)] ?? "");
          const first = target.children[0];
          const last = target.children[target.children.length - 1];
          const lead = first?.type === "text" ? first.text.match(/^\s*/)[0] : "";
          const trail = last?.type === "text" ? last.text.match(/\s*$/)[0] : "";
          target.children = [{ type: "text", text: lead + filled + trail }];
        },
      });
      return;
    }
    visitChildren(el);
  }

  function collectAttrs(el) {
    if (el.tag === "meta") {
      const name = getAttr(el, "name");
      const prop = getAttr(el, "property");
      if ((name && META_NAMES.has(name)) || (prop && META_PROPS.has(prop))) {
        const v = getAttr(el, "content");
        if (v && /\S/.test(v)) out.push({ key: normalize(v), kind: "attr", apply: (t) => setAttr(el, "content", t) });
      }
      return;
    }
    for (const name of ATTRS) {
      const v = getAttr(el, name);
      if (v && /\S/.test(v)) out.push({ key: normalize(v), kind: "attr", apply: (t) => setAttr(el, name, t) });
    }
  }

  function collectJsonLd(el) {
    const textNode = el.children[0];
    const data = JSON.parse(textNode.text);
    const fields = [];
    const visitJson = (obj, parentKey) => {
      if (Array.isArray(obj)) {
        obj.forEach((v, i) => {
          if (typeof v === "string" && parentKey === "featureList") fields.push([obj, i]);
          else visitJson(v, parentKey);
        });
      } else if (obj && typeof obj === "object") {
        for (const [k, v] of Object.entries(obj)) {
          if (typeof v === "string") {
            if (k === "description" || k === "text" || (k === "name" && obj["@type"] === "Question")) fields.push([obj, k]);
          } else visitJson(v, k);
        }
      }
    };
    visitJson(data);
    el.jsonLd = data;
    for (const [obj, k] of fields) {
      out.push({ key: normalize(obj[k]), kind: "json", apply: (t) => (obj[k] = t) });
    }
  }

  visit(root.children.find((n) => n.tag === "html") || root, null);
  return out;
}

/** Re-serialize JSON-LD blocks that were parsed, keeping the original indentation style. */
function writeBackJsonLd(root, mutate) {
  for (const n of walk(root)) {
    if (n.type === "el" && n.jsonLd) {
      if (mutate) mutate(n.jsonLd);
      const indent = (n.children[0].text.match(/^\n(\s*)/) || [, "    "])[1];
      const body = JSON.stringify(n.jsonLd, null, 2).replace(/\n/g, `\n${indent}`);
      n.children[0].text = `\n${indent}${body}\n${indent}`;
    }
  }
}

// ---------------------------------------------------------------------------
// Generated blocks: hreflang links, language menu, language script
// ---------------------------------------------------------------------------
function relFrom(fromDir, toSitePath) {
  // fromDir and toSitePath are site-root relative, e.g. "apps/pocketpad" and "ja/".
  const rel = path.posix.relative(fromDir || ".", toSitePath.replace(/\/$/, "") || ".") || ".";
  return toSitePath.endsWith("/") ? (rel === "." ? "./" : `${rel}/`) : rel;
}

/** Site-root path of a page in a language: "apps/pocketpad/index.html" or "ja/" (folder index). */
const sitePathFor = (page, lang) =>
  lang.code === sourceLanguage.code ? page.source : `${lang.code}/${page.out === "index.html" ? "" : page.out}`;
/** Folder the page lives in, for relative links. */
const pageDir = (page, lang) => (lang.code === sourceLanguage.code ? path.posix.dirname(page.source) : lang.code);
const urlFor = (page, lang) => (lang.code === sourceLanguage.code ? page.englishUrl : page.localizedUrl(lang.code));

function alternatesBlock(page, indent) {
  const lines = allLanguages.map(
    (l) => `<link rel="alternate" hreflang="${l.hreflang}" href="${urlFor(page, l)}" />`,
  );
  lines.push(`<link rel="alternate" hreflang="x-default" href="${page.englishUrl}" />`);
  return lines.map((l) => indent + l).join("\n");
}

const globeSvg =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-3a15.7 15.7 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8zM12 4c.8 1.2 1.5 2.5 1.9 4h-3.8c.4-1.5 1.1-2.8 1.9-4zM4.3 14a8.2 8.2 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4H4.3zm.8 2h3a15.7 15.7 0 0 0 1.4 3.6A8 8 0 0 1 5.1 16zm3-8h-3a8 8 0 0 1 4.4-3.6C8.9 5.5 8.4 6.7 8.1 8zM12 20c-.8-1.2-1.5-2.5-1.9-4h3.8c-.4 1.5-1.1 2.8-1.9 4zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4zm.2 5.6c.6-1.1 1.1-2.3 1.4-3.6h3a8 8 0 0 1-4.4 3.6zm1.8-5.6a16.5 16.5 0 0 0 0-4h3.4a8.2 8.2 0 0 1 0 4h-3.4z"/></svg>';

function switcherBlock(page, current, indent) {
  const fromDir = pageDir(page, current);
  const items = allLanguages
    .map((l) => {
      const href =
        l.code === current.code
          ? page.out === "index.html" && current.code !== sourceLanguage.code
            ? "./"
            : "./" + path.posix.basename(sitePathFor(page, l))
          : relFrom(fromDir, sitePathFor(page, l));
      const cur = l.code === current.code ? ' aria-current="true"' : "";
      const dir = l.dir === "rtl" ? ' dir="rtl"' : "";
      return `${indent}    <li><a href="${href}" hreflang="${l.hreflang}" lang="${l.htmlLang}"${dir} data-lang="${l.code}"${cur}>${l.name}</a></li>`;
    })
    .join("\n");
  return [
    `${indent}<details class="lang" translate="no">`,
    `${indent}  <summary aria-label="Language: ${current.name}">${globeSvg}<span>${current.name}</span></summary>`,
    `${indent}  <ul class="lang__menu">`,
    items,
    `${indent}  </ul>`,
    `${indent}</details>`,
  ].join("\n");
}

function scriptBlock(page, lang, indent) {
  const src = relFrom(pageDir(page, lang), "site_content/pocketpad_lang.js");
  const auto = lang.code === sourceLanguage.code ? ' data-autodetect="1"' : "";
  return `${indent}<script src="${src}"${auto}></script>`;
}

/** Replace the text between <!-- i18n:name --> and <!-- /i18n:name --> markers. */
function fillMarker(html, name, makeBlock) {
  const re = new RegExp(`([ \\t]*)<!-- i18n:${name} -->[\\s\\S]*?<!-- /i18n:${name} -->`);
  const m = html.match(re);
  if (!m) throw new Error(`Missing <!-- i18n:${name} --> marker`);
  const indent = m[1];
  return html.replace(re, `${indent}<!-- i18n:${name} -->\n${makeBlock(indent)}\n${indent}<!-- /i18n:${name} -->`);
}

function langScript() {
  const codes = languages.map((l) => l.code);
  return `/**
 * Language menu and first-visit language detection. Written by tools/build_i18n.mjs; edit there.
 * - Remembers the language someone picks in the menu.
 * - On the English pages (data-autodetect), sends a first-time visitor to their browser's
 *   language if the site has it. A language picked in the menu always wins.
 */
(function () {
  var KEY = "pocketpad-lang";
  var SUPPORTED = ${JSON.stringify(codes)};
  var script = document.currentScript;

  function store(code) {
    try {
      localStorage.setItem(KEY, code);
    } catch (e) {}
  }

  document.addEventListener("click", function (e) {
    var link = e.target.closest && e.target.closest("a[data-lang]");
    if (link) store(link.getAttribute("data-lang"));
    // Close the language menu when clicking anywhere else.
    var menus = document.querySelectorAll("details.lang[open]");
    for (var i = 0; i < menus.length; i++) {
      if (!menus[i].contains(e.target)) menus[i].removeAttribute("open");
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var open = document.querySelector("details.lang[open]");
    if (open) {
      open.removeAttribute("open");
      open.querySelector("summary").focus();
    }
  });

  if (!script || script.getAttribute("data-autodetect") !== "1") return;
  if (/bot|crawl|spider|slurp|lighthouse/i.test(navigator.userAgent || "")) return;
  if (/[?&]lang=en\\b/.test(location.search)) return store("en");

  function match(tag) {
    tag = String(tag || "").toLowerCase();
    var base = tag.split("-")[0];
    if (base === "en") return "en";
    if (base === "zh") return /hant|-tw|-hk|-mo/.test(tag) ? "zh-hant" : "zh-hans";
    if (base === "pt") return "pt-br";
    if (base === "in") return "id";
    return SUPPORTED.indexOf(base) >= 0 ? base : null;
  }

  var choice = null;
  try {
    choice = localStorage.getItem(KEY);
  } catch (e) {}
  if (!choice) {
    var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    for (var i = 0; i < prefs.length && !choice; i++) choice = match(prefs[i]);
  }
  if (!choice || choice === "en" || SUPPORTED.indexOf(choice) < 0) return;
  var target = script.getAttribute("data-target-" + choice) || new URL("../" + choice + "/", script.src).href;
  location.replace(target + location.hash);
})();
`;
}

// ---------------------------------------------------------------------------
// Localizing a page
// ---------------------------------------------------------------------------
function rewriteUrls(root, page, lang) {
  const englishDir = path.posix.dirname(page.source); // apps/pocketpad
  const outDir = pageDir(page, lang);
  for (const n of walk(root)) {
    if (n.type !== "el") continue;
    if (n.tag === "details" && getAttr(n, "class") === "lang") continue;
    for (const attrName of ["href", "src", "content"]) {
      const v = getAttr(n, attrName);
      if (!v) continue;
      if (attrName === "content" && !(n.tag === "meta" && /^og:url$/.test(getAttr(n, "property") || ""))) continue;
      let next = v;
      if (/^https:\/\/play\.google\.com\/store\/apps\/details\?/.test(v) && !/[?&]hl=/.test(v)) {
        next = `${v}&hl=${lang.playHl}`;
      } else if (v === page.englishUrl) {
        next = urlFor(page, lang);
      } else if (!/^([a-z]+:|#|\/\/)/i.test(v)) {
        // Relative link: resolve against the English page, then point it at the
        // translated page if there is one, else at the English page.
        const [p, hash = ""] = v.split("#");
        const target = path.posix.normalize(path.posix.join(englishDir, p));
        const file = path.posix.basename(target);
        let dest = target;
        if (path.posix.dirname(target) === englishDir && translatedPageFiles.has(file)) {
          const out = translatedPageFiles.get(file);
          dest = `${lang.code}/${out === "index.html" ? "" : out}`;
        }
        next = relFrom(outDir, dest) + (hash ? `#${hash}` : "");
      }
      if (next !== v) setAttr(n, attrName, next);
    }
  }
}

function localize(englishHtml, page, lang, dict, report) {
  let root = parse(englishHtml);
  const strings = collectStrings(root);
  const used = new Set();
  for (const s of strings) {
    const t = dict[s.key];
    if (typeof t === "string" && t.trim()) {
      s.apply(t);
      used.add(s.key);
    } else report.missing.add(s.key);
  }
  for (const k of Object.keys(dict)) if (!used.has(k) && !k.startsWith("//")) report.unused.add(k);
  writeBackJsonLd(root, (data) => {
    if (data.url === page.englishUrl) data.url = urlFor(page, lang);
    if (data["@type"] === "SoftwareApplication" || data["@type"] === "FAQPage") data.inLanguage = lang.htmlLang;
  });

  // Parse the translated page again so links inside translated strings get rewritten too.
  root = parse(serialize(root));
  const html = root.children.find((n) => n.tag === "html");
  setAttr(html, "lang", lang.htmlLang);
  if (lang.dir === "rtl") setAttr(html, "dir", "rtl");

  for (const n of walk(root)) {
    if (n.type === "el" && n.tag === "link" && getAttr(n, "rel") === "canonical") setAttr(n, "href", urlFor(page, lang));
    if (n.type === "el" && n.tag === "meta" && getAttr(n, "property") === "og:locale") setAttr(n, "content", lang.ogLocale);
  }
  rewriteUrls(root, page, lang);
  let out = serialize(root);
  out = fillMarker(out, "alternates", (indent) => alternatesBlock(page, indent));
  out = fillMarker(out, "switcher", (indent) => switcherBlock(page, lang, indent));
  out = fillMarker(out, "script", (indent) => scriptBlock(page, lang, indent));
  return out;
}

// ---------------------------------------------------------------------------
// Sitemap
// ---------------------------------------------------------------------------
function updateSitemap() {
  const file = path.join(siteRoot, "sitemap.xml");
  let xml = fs.readFileSync(file, "utf8");
  if (!xml.includes("xmlns:xhtml")) {
    xml = xml.replace(
      'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
      'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"',
    );
  }
  for (const page of pages) {
    const re = new RegExp(`([ \\t]*)<!-- i18n:${page.id} -->[\\s\\S]*?<!-- /i18n:${page.id} -->`);
    const oldEntry = new RegExp(`([ \\t]*)<url>\\s*<loc>${page.englishUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</loc>[\\s\\S]*?</url>`);
    const lastmod = (xml.match(re)?.[0] || xml.match(oldEntry)?.[0] || "").match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
    const alts = allLanguages
      .map((l) => `      <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${urlFor(page, l)}" />`)
      .concat(`      <xhtml:link rel="alternate" hreflang="x-default" href="${page.englishUrl}" />`)
      .join("\n");
    const entries = allLanguages
      .map((l) =>
        [
          "  <url>",
          `    <loc>${urlFor(page, l)}</loc>`,
          lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
          `    <changefreq>${page.sitemap.changefreq}</changefreq>`,
          `    <priority>${l.code === sourceLanguage.code ? page.sitemap.priority : (Number(page.sitemap.priority) - 0.1).toFixed(1)}</priority>`,
          alts,
          "  </url>",
        ]
          .filter(Boolean)
          .join("\n"),
      )
      .join("\n");
    const block = `  <!-- i18n:${page.id} (written by tools/build_i18n.mjs) -->\n${entries}\n  <!-- /i18n:${page.id} -->`;
    if (re.test(xml)) xml = xml.replace(re, block);
    else if (oldEntry.test(xml)) xml = xml.replace(oldEntry, block);
    else xml = xml.replace("</urlset>", `${block}\n</urlset>`);
  }
  // Keep the marker comment exact so the next run finds it.
  xml = xml.replace(/<!-- i18n:(\w+) \(written by tools\/build_i18n\.mjs\) -->/g, "<!-- i18n:$1 -->");
  return xml;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
let problems = 0;
const writes = [];

for (const page of pages) {
  const sourceFile = path.join(siteRoot, page.source);
  let english = fs.readFileSync(sourceFile, "utf8");
  english = fillMarker(english, "alternates", (indent) => alternatesBlock(page, indent));
  english = fillMarker(english, "switcher", (indent) => switcherBlock(page, sourceLanguage, indent));
  english = fillMarker(english, "script", (indent) => scriptBlock(page, sourceLanguage, indent));
  writes.push([sourceFile, english]);

  const sourceStrings = [...new Set(collectStrings(parse(english)).map((s) => s.key))];
  writes.push([
    path.join(siteRoot, "i18n", "_source", `${page.id}.json`),
    JSON.stringify(Object.fromEntries(sourceStrings.map((k) => [k, k])), null, 2) + "\n",
  ]);

  for (const lang of languages) {
    const dictFile = path.join(siteRoot, "i18n", lang.code, `${page.id}.json`);
    const dict = fs.existsSync(dictFile) ? JSON.parse(fs.readFileSync(dictFile, "utf8")) : {};
    const report = { missing: new Set(), unused: new Set() };
    const html = localize(english, page, lang, dict, report);
    writes.push([path.join(siteRoot, lang.code, page.out), html]);
    if (report.missing.size || report.unused.size) {
      problems++;
      console.log(`\n${lang.code}/${page.out}: ${report.missing.size} missing, ${report.unused.size} unused`);
      for (const k of report.missing) console.log(`  missing: ${k.slice(0, 110)}`);
      for (const k of report.unused) console.log(`  unused:  ${k.slice(0, 110)}`);
    }
  }
}

writes.push([path.join(siteRoot, "site_content", "pocketpad_lang.js"), langScript()]);
writes.push([path.join(siteRoot, "sitemap.xml"), updateSitemap()]);

if (!checkOnly) {
  for (const [file, text] of writes) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const before = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
    if (before !== text) {
      fs.writeFileSync(file, text);
      console.log(`wrote ${path.relative(siteRoot, file)}`);
    }
  }
}
console.log(problems ? `\n${problems} page(s) have translation gaps (English is used for those strings).` : "\nAll translations complete.");
