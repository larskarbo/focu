const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');
const { menubar } = require('menubar');

const mb = menubar();
mb.on('after-create-window', () => {
  mb.window.loadUrl(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
})


mb.on('ready', () => {
  console.log('app is ready');
  // your app code here
  let mainWindow;

  // if (isDev) {
  //   // Open the DevTools.
  //   //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
  //   mainWindow.webContents.openDevTools();
  // }
  // mainWindow.on('closed', () => mainWindow = null);
});



// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (mainWindow === null) {
//     createWindow();
//   }
// });