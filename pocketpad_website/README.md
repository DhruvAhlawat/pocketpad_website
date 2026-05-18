# Datron developer hub (GitHub Pages)

Single static site bundle: Datron homepage plus nested apps under `apps/`.

## Layout

| Path | Purpose |
|------|---------|
| `index.html` | Datron landing (bio + **Apps** list with zig-zag rows when you ship more titles) |
| `apps/pocketpad/` | PocketPad overview, companion downloads (installer EXE + ZIP), Details page |
| `downloads/` | `PocketPad-PC-1.1.0-Setup.exe`, `PocketPad-PC-1.1.0-Windows-x64.zip`, checksum `README.txt` - sync via `game_controller/tools/sync_pocketpad_website_downloads.ps1` |
| `assets/icons/` | Shared artwork (reuse per app icons as you grow) |
| `styles.css` | Dark baseline + silver highlights sitewide |
| `.nojekyll` | Keep GitHub Pages from running Jekyll on this tree |

Navbar **Apps** is a `<details>` dropdown (`styles.css`: `.nav-apps`) â€” duplicate each new app twice: dropdown link + alternating row on `#apps`.

## Custom domain

Add your Datron apex domain under **Repo â†’ Settings â†’ Pages â†’ Custom domain**. All links are relative, so `./apps/pocketpad/` keeps working once DNS points here.

## Deploy

Workflow **Deploy Datron site to GitHub Pages** publishes this folder on pushes to `main` / `master` (also `workflow_dispatch`).
