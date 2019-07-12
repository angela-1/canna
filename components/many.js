require('./choosexlsx.js')
require('./choosedocx.js')
require('./chooseoutput.js')

Vue.component('many', {
  name: 'many',
  data: function() {
    return {
      message: '请按步骤操作',
      count: 0,
      currentComponent: 'choose-xlsx',
      chooseDone: false
    }
  },
  watch: {
    count: 'showComponent',
  },
  methods: {
    previous() {
      this.count = this.count - 1 > 0 ? this.count - 1 : 0
      console.log(this.count)
    },
    next() {
      this.count = this.count + 1 < 2 ? this.count + 1 : 2
      this.chooseDone = false

      console.log(this.count)

    },
    showComponent() {
      console.log('re')
      switch (this.count) {
        case 0:
          this.currentComponent = 'choose-xlsx'
          break
        case 1:
          this.currentComponent = 'choose-docx'
          break
        case 2:
          this.currentComponent = 'choose-output'
          break
      }
    },
    chooseComplete(val) {
      console.log('cd')
      this.chooseDone = true
    },
    generate() {
      let obj = {
        xlsxFile: localStorage.getItem('xlsxFile'),
        docxFile: localStorage.getItem('docxFile'),
        outputPath: localStorage.getItem('outputPath'),
        startLine: localStorage.getItem('startLine'),
        primary: localStorage.getItem('primary')
      }
      console.log(obj)
      const ipcRenderer = this.$electron.ipcRenderer
      ipcRenderer.send('generate-docx', obj)
      ipcRenderer.on('generate-done', (event, path) => {
        localStorage.clear()
        this.message = '完成'
      })

    }
  },
  template: `
<div>
  <div class="toolbar">
    <button v-if="count > 0" v-on:click="previous">上一步</button>
    <button v-if="count < 2 && chooseDone" v-on:click="next">下一步</button>
    <button class="btn-primary" v-if="count === 2 && chooseDone" v-on:click="generate">生成</button>
    <span>{{message}}</span>
  </div> 

  <component v-bind:is="currentComponent" v-on:choose="chooseComplete"></component>
  
</div>

`
})