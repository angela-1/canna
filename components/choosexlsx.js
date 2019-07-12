Vue.component('choose-xlsx', {
  data: function() {
    return {
      xlsxFile: '',
      titleLine: 0,
      primary: 0
    }
  },
  watch: {
    titleLine: function(newValue, oldValue) {
      localStorage.setItem('titleLine', newValue)
    },
    primary: function(newValue, oldValue) {
      localStorage.setItem('primary', newValue)
    }
  },
  methods: {
    chooseXlsx() {
      const ipcRenderer = this.$electron.ipcRenderer
      ipcRenderer.send('open-xlsx-file-dialog')
      ipcRenderer.on('selected-xlsx-file', (event, path) => {
        let msg = `You selected: ${path}`
        console.log(msg)
        this.xlsxFile = path
        localStorage.setItem('xlsxFile', this.xlsxFile)
        this.$emit('choose', 'done')
      })
      console.log(this.xlsxFile)
    },

  },
  template: `
<div class="slotarea">
<h3>请选择 Excel 数据文件</h3>
<div class="line">
<button type="button" v-on:click="chooseXlsx">选择</button>
<p>
已选择：<strong>{{xlsxFile}}</strong>
</p>
</div>
<div class="line">
标题行：
<input type="number" v-model="titleLine" />
</div>
<div class="line">
主键列：
<input type="number" v-model="primary" />
</div>
</div>
`
})