# v1.9.18 Release Notes

- Release target upgraded from v1.9.17 to v1.9.18.
- Preserves the confirmed V78 UI and working smart Registration Date filter.
- Preserves Merge Excel column-copy functionality.
- Branding logo is embedded directly in `app.html`; the sidebar logo no longer depends on an external branding image.
- Complete Electron/GitHub Actions release source included.
- Replaced the old UI validator that incorrectly rejected valid multiple `<style>` blocks.
- GitHub Actions can build and publish the Windows NSIS installer for tag `v1.9.18`.


## Release workflow correction
- Removed manual `gh release upload` dependency that could fail with `release not found`.
- The workflow now uses electron-builder `--publish always`, which creates/updates the GitHub release and uploads Windows installer + auto-update metadata.
- The release is then explicitly promoted from draft to published using `gh release edit`.
- This keeps `latest.yml` and the installer generated/uploaded from the same build.
