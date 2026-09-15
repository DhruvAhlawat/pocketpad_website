/**
 * PocketPad site click analytics.
 * Delegated listener + ga4 `gtag()` (loaded via the Google tag snippet in each page <head>).
 * Fires clearly-named events on top of GA4 Enhanced Measurement (page_view / file_download / outbound_click).
 */
(function () {
  function track(eventName, params) {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params || {});
    }
  }

  function linkLabel(a) {
    return (a && a.textContent ? a.textContent : "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 80);
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    var a = target && target.closest ? target.closest("a") : null;
    if (!a || !a.href) {
      return;
    }

    var href = a.getAttribute("href") || "";
    var hrefLower = href.toLowerCase();

    if (hrefLower.indexOf("play.google.com/store/apps/details?id=com.datron.pocketpad") !== -1) {
      track("play_store_click", { link_label: linkLabel(a) });
      return;
    }

    if (/\.(exe|zip|apk)([?#].*)?$/.test(hrefLower)) {
      var fileName = href.split("?")[0].split("#")[0].split("/").pop();
      track("companion_download", { file_name: decodeURIComponent(fileName) });
      return;
    }

    if (hrefLower.indexOf("mailto:") === 0) {
      track("email_click", { link_label: linkLabel(a) });
      return;
    }

    if (/gamepad-tester\.html/.test(hrefLower)) {
      track("gamepad_tester_open", { link_label: linkLabel(a) });
      return;
    }

    if (/how-to\.html/.test(hrefLower)) {
      track("howto_guide_open", { link_label: linkLabel(a) });
      return;
    }

    if (/faq\.html/.test(hrefLower)) {
      track("faq_open", { link_label: linkLabel(a) });
    }
  });
})();