const { ipcRenderer } = require('electron');

function exitForWindows() {
  ipcRenderer.invoke('app-quit');
}

module.exports = { exitForWindows };
