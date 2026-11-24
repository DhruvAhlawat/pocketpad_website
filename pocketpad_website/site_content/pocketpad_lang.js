/**
 * Language menu and first-visit language detection. Written by tools/build_i18n.mjs; edit there.
 * - Remembers the language someone picks in the menu.
 * - On the English pages (data-autodetect), sends a first-time visitor to their browser's
 *   language if the site has it. A language picked in the menu always wins.
 */
(function () {
  var KEY = "pocketpad-lang";
  var SUPPORTED = ["ja","ko","zh-hans","zh-hant","ru","fr","es","pt-br","id","vi","th","de","tr","hi","ar"];
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
  if (/[?&]lang=en\b/.test(location.search)) return store("en");

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
  var target = new URL("../" + choice + "/" + (script.getAttribute("data-page") || ""), script.src).href;
  location.replace(target + location.hash);
})();
