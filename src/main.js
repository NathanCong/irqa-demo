/**
 * main.js 入口程序
 */
const { app, BrowserWindow, ipcMain } = require('electron');
const { resolve } = require('path');

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 340,
    height: 800,
    // fullscreen: true,
    webPreferences: {
      nodeIntegration: true, // 启用 Node.js 集成
      contextIsolation: false, // 关闭上下文隔离
    },
  });
  mainWindow.loadFile(resolve(__dirname, './pages/test/index.html'));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * 监听【退出程序】请求
 */
ipcMain.handle('exit', () => {
  app.quit();
});
