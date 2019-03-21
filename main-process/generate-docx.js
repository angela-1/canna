const { ipcMain, dialog } = require('electron')

const parseXlsx = require('./parse-file.js')

const MineTable = require('./mine-table');


ipcMain.on('generate-docx', (event, value) => {
  console.log('houdun', value)

  const startLine = value.startLine || 0
  const primary = value.primary || 0
  const jsonData = parseXlsx(value.xlsxFile, startLine, primary)

  console.log('jd', jsonData)

  const docxFile = value.docxFile
  const outputPath = value.outputPath

  for (let d of jsonData) {
    let table = new MineTable(docxFile, d, outputPath)
    table.generate()
  }

})