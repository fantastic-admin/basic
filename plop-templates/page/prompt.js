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
    description: '创建页面',
    prompts: [
        {
            type: 'list',
            name: 'path',
            message: '请选择页面创建目录',
            choices: getFolder('src/views')
        },
        {
            type: 'input',
            name: 'name',
            message: '请输入文件名',
            validate: v => {
                if (!v || v.trim === '') {
                    return '文件名不能为空'
                } else if (v == 'list' || v == 'detail') {
                    return 'list 和 detail 为保留关键字，无法直接创建，请通过创建标准模块进行生成'
                } else {
                    return true
                }
            }
        },
        {
            type: 'input',
            name: 'cname',
            message: '请输入页面中文名称',
            default: '默认页面'
        }
    ],
    actions: data => {
        let relativePath = path.relative('src/views', data.path)
        const actions = [
            {
                type: 'add',
                path: `${data.path}/{{dotCase name}}.vue`,
                templateFile: 'plop-templates/page/index.hbs',
                data: {
                    componentName: `${relativePath} ${data.name}`
                }
            }
        ]
        return actions
    }
}
