# Auto Management v1.9.18 — Windows Auto-Update Release

## Release package
Base: v1.9.17 V78 confirmed working UI
Release: **v1.9.18**

## Included
- Complete Electron source project
- `main.js` / `preload.js`
- `app.html` with V78 UI and inline embedded branding logo
- `package.json` version 1.9.18
- Electron Builder NSIS configuration
- GitHub Actions Windows release workflow
- Auto-update support via `electron-updater`
- Required `resources/` icons and installer icon
- UI validation script

## GitHub release procedure
1. Upload/replace the repository files with this complete source package.
2. Commit the changes to `main`.
3. Create and push tag **`v1.9.18`**.
4. GitHub Actions workflow `Auto Management Windows Release` starts automatically.
5. The workflow runs `npm install`, validates the UI, builds the Windows NSIS installer, and publishes the release using `GITHUB_TOKEN`.
6. Confirm the workflow is green.
7. Confirm GitHub Release **v1.9.18** contains `Auto-Management-Setup-1.9.18.exe` and the generated update metadata (`latest.yml` and blockmap).

## Auto-update behavior
Existing v1.9.17 installations will check the GitHub latest release. When v1.9.18 is available, the app can download the update and then install/restart using the existing updater flow.

## Important
Do not manually change the tag to a different version. Keep `package.json` version and Git tag aligned at `1.9.18` / `v1.9.18`.
