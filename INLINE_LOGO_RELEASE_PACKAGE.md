# Auto Management v1.9.17 — Inline Logo Release Package

Base: V78 (confirmed final working version)

## Change
- Sidebar branding logo is embedded directly in `app.html` as a data URI.
- Favicon is also embedded directly in `app.html`.
- No external logo/icon source file is required for the branding logo.
- Existing V78 functionality and Registration Date filter logic are preserved.

## Release preparation
This package is the source/package payload for the next Windows auto-update release build.
Build the Windows installer using the existing GitHub Actions release workflow before publishing a new release/tag.
