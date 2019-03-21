const { ipcMain, dialog } = require('electron')


ipcMain.on('open-dir-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }, (files) => {
    if (files) {
      event.sender.send('selected-dir', files)
    }
  })
})