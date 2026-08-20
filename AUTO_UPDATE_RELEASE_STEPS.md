# v1.9.16 Release

1. Copy this package's contents into `chiragper-alt/Auto-management`.
2. Commit/push.
3. Verify `package.json` version = `1.9.15`.
4. Create/push Git tag `v1.9.16`.
5. GitHub Actions builds and publishes the Windows NSIS installer.

Expected asset:
`Auto-Management-Setup-1.9.15.exe`

Future:
- Change version to 1.9.16.
- Commit/push.
- Tag `v1.9.16`.
- GitHub Actions publishes the new release.
- Installed users receive an update prompt through electron-updater.

Important:
- Test the generated installer on a clean Windows PC first.
- Keep user data outside the installation directory for full data safety.
