let JSZip = require('jszip');
let Docxtemplater = require('docxtemplater');

let fs = require('fs');
let path = require('path');

class MineTable {
  constructor(template, data, outputPath) {
    this.template = template;
    this.data = data;
    this.outputPath = outputPath;
  }

  generate() {

    //Load the docx file as a binary
    let content = fs
      .readFileSync(path.resolve(__dirname, this.template), 'binary');

    let zip = new JSZip(content);

    let doc = new Docxtemplater();
    doc.loadZip(zip);

    //set the templateVariables
    doc.setData(this.data);

    try {
      // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
      doc.render()
    } catch (error) {
      let e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties,
      }
      console.log(JSON.stringify({ error: e }));
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
      throw error;
    }

    let buf = doc.getZip()
      .generate({ type: 'nodebuffer' });

    // const resultFolder = path.join(__dirname, 'result/')
    const resultFolder = this.outputPath
    // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
    fs.writeFileSync(path.join(resultFolder,
      `${this.data.primary}.docx`), buf);
  }
}

module.exports = MineTable