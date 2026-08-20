const { app, BrowserWindow, dialog, ipcMain, Menu, shell } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 650,
    icon: path.join(__dirname, "resources", "auto-management.ico"),
    webPreferences: { contextIsolation: true, nodeIntegration: false, preload: path.join(__dirname, "preload.js") }
  });
  win.setMenuBarVisibility(false);
  win.setAutoHideMenuBar(true);
  win.loadFile(path.join(__dirname, "app.html"));
}



ipcMain.handle("choose-export-folder", async () => {
  const result = await dialog.showOpenDialog({
    title: "Select Export Folder",
    properties: ["openDirectory", "createDirectory"]
  });
  if (result.canceled || !result.filePaths[0]) return { canceled: true };
  return { canceled: false, path: result.filePaths[0], name: path.basename(result.filePaths[0]) };
});
ipcMain.handle("save-export-file", async (_event, payload) => {
  try {
    let folder = String(payload?.folderPath || "");
    const filename = path.basename(String(payload?.filename || ""));
    const data = payload?.data;
    if (!folder) folder = app.getPath("downloads");
    if (!filename || !data) throw new Error("Invalid export request.");
    const filePath = path.join(folder, filename);
    require("fs").writeFileSync(filePath, Buffer.from(data, "base64"));
    return { ok: true, path: filePath, filename, folder: path.basename(folder) };
  } catch (error) {
    return { ok: false, message: error?.message || "Unable to save export." };
  }
});
ipcMain.handle("open-export-file", async (_event, filePath) => {
  try { const result=await shell.openPath(String(filePath||"")); return {ok:!result,message:result||""}; }
  catch(error){return {ok:false,message:error?.message||"Unable to open file."};}
});
ipcMain.handle("show-export-file", async (_event, filePath) => {
  try { shell.showItemInFolder(String(filePath||"")); return {ok:true}; }
  catch(error){return {ok:false,message:error?.message||"Unable to show file."};}
});
ipcMain.handle("check-for-update-manual", async () => {
  try {
    const currentVersion = app.getVersion();
    const response = await fetch("https://api.github.com/repos/chiragper-alt/Auto-management/releases/latest", {
      headers: { "User-Agent": "Auto-Management-Updater" }
    });
    if (!response.ok) {
      return { ok: false, currentVersion, message: "Unable to check for updates right now." };
    }
    const release = await response.json();
    const latestVersion = String(release.tag_name || "").replace(/^v/, "");
    const hasUpdate = latestVersion && latestVersion !== currentVersion;
    return {
      ok: true,
      currentVersion,
      latestVersion,
      hasUpdate,
      url: release.html_url || ""
    };
  } catch (error) {
    return { ok: false, currentVersion: app.getVersion(), message: "Unable to check for updates right now." };
  }
});
ipcMain.handle("check-for-update-ui", async () => {
  return await new Promise(async (resolve) => {
    let settled = false;
    const finish = (result) => { if (!settled) { settled = true; resolve(result); } };
    const onAvailable = (info) => finish({ ok:true, hasUpdate:true, currentVersion:app.getVersion(), latestVersion:String(info.version||"") });
    const onNotAvailable = (info) => finish({ ok:true, hasUpdate:false, currentVersion:app.getVersion(), latestVersion:String(info?.version||app.getVersion()) });
    const onError = () => finish({ ok:false, message:"Unable to check for updates right now." });
    autoUpdater.once("update-available", onAvailable);
    autoUpdater.once("update-not-available", onNotAvailable);
    autoUpdater.once("error", onError);
    try { await autoUpdater.checkForUpdates(); } catch (e) { onError(); }
    setTimeout(() => finish({ ok:true, hasUpdate:false, currentVersion:app.getVersion(), latestVersion:app.getVersion() }), 15000);
  });
});
ipcMain.handle("download-update-ui", async () => {
  try { autoUpdater.autoDownload = false; await autoUpdater.downloadUpdate(); return {ok:true}; }
  catch(e){ return {ok:false,message:e?.message||"Unable to download update."}; }
});
ipcMain.handle("install-update-ui", async () => {
  try { autoUpdater.quitAndInstall(); return {ok:true}; }
  catch(e){ return {ok:false,message:e?.message||"Unable to install update."}; }
});


app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();

  // Safe updater: checking/downloading is separate from the app UI.
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.checkForUpdates().catch(() => {});

  autoUpdater.on("update-available", async (info) => {
    const result = await dialog.showMessageBox({
      type: "info",
      buttons: ["Download Update", "Later"],
      defaultId: 0,
      cancelId: 1,
      title: "Auto Management Update",
      message: `Version ${info.version} is available.`,
      detail: "Download the update now?"
    });
    if (result.response === 0) autoUpdater.downloadUpdate().catch(() => {});
  });

  autoUpdater.on("update-downloaded", async () => {
    const result = await dialog.showMessageBox({
      type: "info",
      buttons: ["Install & Restart", "Later"],
      defaultId: 0,
      cancelId: 1,
      title: "Update Ready",
      message: "The update is ready to install."
    });
    if (result.response === 0) autoUpdater.quitAndInstall();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
