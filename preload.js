const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("autoManagementElectron", {
  isElectron: true,
  chooseExportFolder: () => ipcRenderer.invoke("choose-export-folder"),
  saveExportFile: (payload) => ipcRenderer.invoke("save-export-file", payload),
  openExportFile: (filePath) => ipcRenderer.invoke("open-export-file", filePath),
  showExportFile: (filePath) => ipcRenderer.invoke("show-export-file", filePath),
  checkForUpdateUI: () => ipcRenderer.invoke("check-for-update-ui"),
  downloadUpdateUI: () => ipcRenderer.invoke("download-update-ui"),
  installUpdateUI: () => ipcRenderer.invoke("install-update-ui")
});
