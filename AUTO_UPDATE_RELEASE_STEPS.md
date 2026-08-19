# v1.9.17 Release

Base: Auto Management v1.9.16 CLEAR LIQUID BACKGROUND V58.

Release checklist:
1. Copy package contents into `chiragper-alt/Auto-management`.
2. Confirm `package.json` version is `1.9.17`.
3. Commit and push the v1.9.17 changes.
4. Create and push Git tag `v1.9.17`.
5. GitHub Actions / electron-builder publishes the Windows NSIS installer.
6. Verify asset: `Auto-Management-Setup-1.9.17.exe`.
7. Test the installer/update on a clean Windows PC before treating it as stable.

Auto-update: electron-updater compares the installed app version with the latest GitHub release.
User data must remain outside the installation directory.
