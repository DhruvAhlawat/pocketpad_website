"""
Lists the English strings of the pages that are built in the browser, for translation.

    python pocketpad_website/tools/extract_i18n_strings.py
    node pocketpad_website/tools/build_i18n.mjs --check --verbose

Opens each English page in headless Chromium (Playwright), lets site_content/*_site.js render it,
and asks site_content/pocketpad_i18n.js which strings it would translate. Strings that code sets
later through tr("...") / t("...") (gamepad tester status lines) are read from the module source.
Writes i18n/_source/<page>.runtime.json; build_i18n.mjs merges them into the lists of strings to
translate. Run it after changing the English content of those pages.
"""
import functools
import http.server
import json
import pathlib
import re
import threading

from playwright.sync_api import sync_playwright

SITE = pathlib.Path(__file__).resolve().parent.parent
PAGES = {
    "howto": ("how-to.html", "pocketpad_howto_site.js"),
    "faq": ("faq.html", "pocketpad_faq_site.js"),
    "info": ("info.html", "pocketpad_info_site.js"),
    "tester": ("gamepad-tester.html", "pocketpad_gametester_site.js"),
    "whatsnew": ("whats-new.html", "pocketpad_whats_new_site.js"),
    "privacy": ("privacy.html", "pocketpad_privacy_site.js"),
    "license": ("license.html", "pocketpad_license_site.js"),
}


def code_strings(module: str) -> list[str]:
    src = (SITE / "site_content" / module).read_text(encoding="utf-8")
    found = re.findall(r'\btr?\(\s*"((?:[^"\\]|\\.)+)"\s*\)', src)
    labels = re.search(r"BUTTON_LABELS\s*=\s*\{([^}]*)\}", src)
    if labels:
        found += [v for v in re.findall(r'"([^"]+)"', labels.group(1)) if re.search(r"[a-z]", v)]
    return [json.loads(f'"{s}"') for s in found]


def main() -> None:
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *args):
            pass

    handler = functools.partial(Quiet, directory=str(SITE))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{server.server_address[1]}"
    out_dir = SITE / "i18n" / "_source"
    out_dir.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        for pid, (html, module) in PAGES.items():
            page.goto(f"{base}/apps/pocketpad/{html}?lang=en", wait_until="networkidle")
            page.wait_for_timeout(300)
            keys = page.evaluate(
                "import('/site_content/pocketpad_i18n.js').then((m) => m.collect(document.body))"
            )
            for s in code_strings(module):
                s = re.sub(r"\s+", " ", s).strip()
                if s and s not in keys:
                    keys.append(s)
            # Keep the language menu out: names stay in their own language.
            keys = [k for k in keys if k]
            (out_dir / f"{pid}.runtime.json").write_text(
                json.dumps(keys, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
            )
            print(f"{pid}: {len(keys)} strings")
        browser.close()
    server.shutdown()


if __name__ == "__main__":
    main()
