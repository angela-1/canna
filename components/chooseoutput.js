Vue.component('choose-output', {
  data: function() {
    return {
      outputPath: ''
    }
  },
  methods: {
    chooseOutput() {
      const ipcRenderer = this.$electron.ipcRenderer
      ipcRenderer.send('open-dir-dialog')
      ipcRenderer.on('selected-dir', (event, path) => {
        let msg = `You selected: ${path}`
        console.log(msg)
        this.outputPath = path
        localStorage.setItem('outputPath', this.outputPath)
        this.$emit('choose', 'done')
      })
      console.log(this.outputPath)
    },

  },
  template: `
<div class="slotarea">
<h3>3 请选择输出目录</h3>
<p>
已选择：<strong>{{outputPath}}</strong>
</p>
<button type="button" v-on:click="chooseOutput">选择</button>
</div>
`
})