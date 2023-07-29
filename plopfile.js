const fs = require('node:fs')

module.exports = function (plop) {
  plop.setWelcomeMessage('请选择需要创建的模式：')
  fs.readdirSync('./plop-templates').forEach((item) => {
    fs.lstatSync(`./plop-templates/${item}`).isDirectory() && plop.setGenerator(item, require(`./plop-templates/${item}/prompt`))
  })
}
