const { ipcMain, dialog } = require('electron')


ipcMain.on('open-xlsx-file-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openFile']
  }, (files) => {
    if (files) {
      console.log('kan', files)

      // parseXlsx(files[0])
      event.sender.send('selected-xlsx-file', files)
    }
  })
})

ipcMain.on('open-docx-file-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openFile']
  }, (files) => {
    if (files) {
      console.log('kan', files)
      
      event.sender.send('selected-docx-file', files)
    }
  })
})

