const electron = require("electron");
const { app, BrowserWindow } = electron
let win

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 650,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('src/view/index.html')
}


  app.on('ready', createWindow)