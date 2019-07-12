Vue.component('choose-docx', {
  data: function() {
    return {
      docxFile: ''
    }
  },
  methods: {
  	chooseDocx() {
  		const ipcRenderer = this.$electron.ipcRenderer
      ipcRenderer.send('open-docx-file-dialog')
      ipcRenderer.on('selected-docx-file', (event, path) => {
        let msg = `You doc selected: ${path}`
        console.log(msg)
        this.docxFile = path
        localStorage.setItem('docxFile', this.docxFile)
        this.$emit('choose', 'done')
      })
      console.log(this.docxFile)
  	},
  	
  },
  template: `
<div class="slotarea">
<h3>2 请选择 Word 模板文件</h3>
<p>
已选择：<strong>{{docxFile}}</strong>
</p>
<button type="button" v-on:click="chooseDocx">选择</button>
</div>
`
})