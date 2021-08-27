const path = require('path')
const fs = require('fs')

function getFolder(path) {
    let components = []
    const files = fs.readdirSync(path)
    files.forEach(function(item) {
        let stat = fs.lstatSync(path + '/' + item)
        if (stat.isDirectory() === true && item != 'components') {
            components.push(path + '/' + item)
            components.push.apply(components, getFolder(path + '/' + item))
        }
    })
    return components
}

module.exports = {
    description: '创建标准模块 Mock',
    prompts: [
        {
            type: 'list',
            name: 'path',
            message: '请选择模块目录',
            choices: getFolder('src/views')
        }
    ],
    actions: data => {
        let pathArr = path.relative('src/views', data.path).split('\\')
        let moduleName = pathArr.pop()
        let relativePath = pathArr.join('/')
        const actions = []
        actions.push({
            type: 'add',
            path: pathArr.length == 0 ? 'src/mock/{{moduleName}}.js' : `src/mock/${pathArr.join('.')}.{{moduleName}}.js`,
            templateFile: 'plop-templates/mock/mock.hbs',
            data: {
                relativePath,
                moduleName
            }
        })
        return actions
    }
}
