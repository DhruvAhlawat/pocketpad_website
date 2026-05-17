# Datron developer hub (GitHub Pages)

Single static site bundle: Datron homepage plus nested apps under `apps/`.

## Layout

| Path | Purpose |
|------|---------|
| `index.html` | Datron landing (bio + **Apps** list with zig-zag rows when you ship more titles) |
| `apps/pocketpad/` | PocketPad overview, companion download ZIP, Details page |
| `downloads/` | `PocketPadCompanion-Windows-1.1.0-x64.zip` + checksum `README.txt` |
| `assets/icons/` | Shared artwork (reuse per app icons as you grow) |
| `styles.css` | Dark baseline + silver highlights sitewide |
| `.nojekyll` | Keep GitHub Pages from running Jekyll on this tree |

Navbar **Apps** is a `<details>` dropdown (`styles.css`: `.nav-apps`) — duplicate each new app twice: dropdown link + alternating row on `#apps`.

## Custom domain

Add your Datron apex domain under **Repo → Settings → Pages → Custom domain**. All links are relative, so `./apps/pocketpad/` keeps working once DNS points here.

## Deploy

Workflow **Deploy Datron site to GitHub Pages** publishes this folder on pushes to `main` / `master` (also `workflow_dispatch`).
