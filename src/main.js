/**
 * main.js 入口程序
 */
const { app, BrowserWindow } = require('electron');
const { resolve } = require('path');

const createWindow = () => {
  const browserWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  browserWindow.loadFile(resolve(__dirname, './index.html'));
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
