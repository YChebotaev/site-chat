require('./styles/default.css')
require('./styles/animate.css')
require('./tags')

var riot = require('riot')
var formHandler = require('./lib/form-handler')
var getOptions = require('./lib/get-options')

require('./lib/contentloaded')(window, function () {
  var windowContainer = document.createElement('div')
  var fabContainer = document.createElement('div')
  var options = getOptions()
  
  document.body.appendChild(windowContainer)
  document.body.appendChild(fabContainer)

  var windowRef = null
  var fabRef = null
  
  riot.mount(windowContainer, 'sc-window', {
    zIndex: options.zIndex,
    formHandler: formHandler,
    getRef: function (ref) {
      windowRef = ref
      riot.mount(fabContainer, 'sc-fab', {
        getRef: function (ref) {
          fabRef = ref
        },
        bottom: options.bottom,
        right: options.right,
        size: 64,
        windowRef: ref
      })
    }
  })
})