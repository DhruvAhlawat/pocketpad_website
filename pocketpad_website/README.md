# PocketPad Website (GitHub Pages)

Static landing + documentation bundled with downloadable Windows companion binaries.

## Contents

| Path | Purpose |
|------|---------|
| `index.html` | Homepage: Bluetooth + Wi‑Fi positioning, Companion Store placeholder, ZIP download |
| `info.html` | Feature / setup narrative for power users |
| `styles.css` | Pocket-themed styling (aligned with Android app branding) |
| `assets/icons/` | Shared icon PNG |
| `downloads/` | `PocketPadCompanion-Windows-1.1.0-x64.zip` + README with checksum |
| `.nojekyll` | Tells GitHub Pages not to treat the tree as Jekyll |

No client-side JavaScript — previous theme switching was removed.

## Deploy

Workflow **Deploy PocketPad site to GitHub Pages** uploads this folder automatically on pushes to `main` or `manual dispatch`.

Repository setting: **Settings → Pages → Build and deployment → GitHub Actions**.
