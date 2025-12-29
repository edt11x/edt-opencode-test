const { app, BrowserWindow } = require('electron')

app.commandLine.appendSwitch('--disable-gpu')
app.commandLine.appendSwitch('--disable-software-rasterizer')
app.commandLine.appendSwitch('--disable-gpu-compositing')
app.disableHardwareAcceleration()

let win

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    fullscreen: true,
    backgroundColor: '#000000',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription)
  })

  win.webContents.on('crashed', (event, killed) => {
    console.error('Renderer process crashed, killed:', killed)
  })

  win.loadFile('index.html').then(() => {
    console.log('Window loaded successfully')
  }).catch(err => {
    console.error('Error loading window:', err)
  })

  win.on('unresponsive', () => {
    console.error('Window became unresponsive')
  })

  win.on('closed', () => {
    console.log('Window closed')
  })
  
  console.log('Press Ctrl+C to exit')
}

app.whenReady().then(() => {
  console.log('App is ready')
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
}).catch(err => {
  console.error('Error during app ready:', err)
})

app.on('window-all-closed', () => {
  console.log('All windows closed')
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err)
})
