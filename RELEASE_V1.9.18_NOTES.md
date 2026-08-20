# Auto Management v1.9.18 Release

This package uses a deterministic GitHub Actions release flow.

1. Push tag `v1.9.18`.
2. Windows build runs with `electron-builder --win nsis`.
3. Workflow checks whether the GitHub Release exists.
4. If missing, it creates the Release for the pushed tag.
5. It uploads `.exe`, `.blockmap`, and `latest.yml` with `gh release upload --clobber`.
6. It marks the release as the latest release.

This avoids the previous `release not found` failure caused by trying to edit/upload a Release that had not been created yet.
