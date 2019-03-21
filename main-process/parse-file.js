
const XLSX = require('xlsx')


function parseXlsx(filePath, startLine, primary) {
  let workbook = XLSX.readFile(filePath)
  let first_sheet_name = workbook.SheetNames[0]
  let worksheet = workbook.Sheets[first_sheet_name];
  let range = worksheet['!ref']
  range = XLSX.utils.decode_range(range)

  let result = []

  let titleRow = { s: { c: 0, r: startLine }, e: { c: range.e.c, r: startLine } }
  const keys = parseKeys(worksheet, titleRow)

  let contentRows = range
  contentRows.s.r = startLine + 1
  console.log('cr', contentRows)
  for (var row = contentRows.s.r; row < contentRows.e.r; ++row) {
    let rowRange = { s: { c: 0, r: row }, e: { c: contentRows.e.c, r: row } }
    const oneLine = parseRow(worksheet, keys, rowRange)
    oneLine['primary'] = oneLine[keys[primary]]
    result.push(oneLine)
  }
  return result
}

function parseKeys(worksheet, range) {
  let keys = []
  for (var C = range.s.c; C <= range.e.c; ++C) {
    var cell_address = { c: C, r: range.s.r };
    /* if an A1-style address is needed, encode the address */
    var cell_ref = XLSX.utils.encode_cell(cell_address);
    let value = worksheet[cell_ref] ? worksheet[cell_ref].v : undefined
    keys.push(value)
  }
  return keys
}

function parseRow(worksheet, keys, range) {
  let oneRow = {}
  for (var C = range.s.c; C <= range.e.c; ++C) {
    var cell_address = { c: C, r: range.s.r };
    /* if an A1-style address is needed, encode the address */
    var cell_ref = XLSX.utils.encode_cell(cell_address);
    let value = worksheet[cell_ref] ? worksheet[cell_ref].v : undefined
    oneRow[keys[C]] = value
  }
  return oneRow
}

module.exports = parseXlsx;