// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

// window.addEventListener('DOMContentLoaded', () => {
//   for (const versionType of ['chrome', 'electron', 'node']) {
//     document.getElementById(`${versionType}-version`).innerText = process.versions[versionType]
//   }
// })

const _Vue = require('./vue.js')
process.once('loaded', () => {
  global.Vue = _Vue
  Vue.prototype.$electron = require('electron')
  const CompA = require('./components/many.js')
})



// window.addEventListener('DOMContentLoaded', () => {
//   Vue.prototype.$electron = require('electron')
//   // require('./components/many.js')

// })

// const Vue = require('./vue.js')
// Vue.prototype.$electron = require('electron')