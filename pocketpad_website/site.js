(function () {
  "use strict";

  var THEME_KEY = "pocketpad-theme";
  var THEMES = ["pocket", "night", "slate", "ink"];

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(name) {
    try {
      localStorage.setItem(THEME_KEY, name);
    } catch (e) {}
  }

  function applyTheme(name) {
    if (!name || THEMES.indexOf(name) < 0) {
      name = "pocket";
    }
    document.documentElement.setAttribute("data-theme", name);
    setStoredTheme(name);
    var btn = document.getElementById("themeBtn");
    if (btn) {
      var label = name.charAt(0).toUpperCase() + name.slice(1);
      btn.textContent = "Theme: " + label;
      btn.setAttribute(
        "aria-label",
        "Color theme, currently " + label + ". Press to switch theme."
      );
    }
  }

  function cycleTheme() {
    var current = document.documentElement.getAttribute("data-theme") || "pocket";
    var i = THEMES.indexOf(current);
    if (i < 0) {
      i = 0;
    }
    var next = THEMES[(i + 1) % THEMES.length];
    applyTheme(next);
  }

  function initTheme() {
    var stored = getStoredTheme();
    if (stored && THEMES.indexOf(stored) >= 0) {
      applyTheme(stored);
    } else {
      applyTheme("pocket");
    }
    var btn = document.getElementById("themeBtn");
    if (btn) {
      btn.addEventListener("click", cycleTheme);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTheme);
  } else {
    initTheme();
  }
})();
