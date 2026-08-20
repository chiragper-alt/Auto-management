# Auto Management v1.9.18 — Complete Release Source

This is the complete source package for the Windows auto-update release from v1.9.17 to v1.9.18.

## Build

```text
npm install
npm run validate:ui
npm run dist
```

For GitHub release publishing, push tag `v1.9.18`. The included GitHub Actions workflow builds and publishes the NSIS installer and updater metadata.

## Auto-update

The existing Electron `electron-updater` flow is retained. v1.9.17 installations should detect the latest GitHub release after v1.9.18 is published.

## Important release files

- `.github/workflows/release-windows.yml`
- `package.json`
- `main.js`
- `preload.js`
- `app.html`
- `resources/`
- `validate-ui.js`
- `AUTO_UPDATE_RELEASE_STEPS.md`

The branding logo is embedded in `app.html`, so the sidebar branding does not depend on an external logo source.
