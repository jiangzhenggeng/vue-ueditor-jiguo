var path = require('path')
var basePath = path.resolve(__dirname, '../../../jiguo/protected/modules/mb/views')

function getTplPath (module) {
  return path.resolve(__dirname, `../src/pages/${module}/block_tpl/index.ejs.js`)
}

module.exports = [
  {
    name: 'article',
    main: './src/pages/article/main.js',
    options: {
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: getTplPath('article'),
    },
    subModel: {
      UEditor: './src/components/UEditor/index.js'
    }
  }
]













