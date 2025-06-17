/**
 * main.js 入口程序
 */
const { app, BrowserWindow, ipcMain } = require('electron');
const { resolve } = require('path');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true, // 启用 Node.js 集成
      contextIsolation: false, // 关闭上下文隔离
    },
  });

  if (!mainWindow.isFullScreen()) {
    mainWindow.setFullScreen(true);
  }

  mainWindow.loadFile(resolve(__dirname, './pages/index/index.html'));
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * 监听【退出程序】请求
 */
ipcMain.handle('app-quit', () => {
  app.quit();
});
