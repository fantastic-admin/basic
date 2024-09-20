import fs from 'node:fs'
import path from 'node:path'

function getFolder(path) {
  const components = []
  const files = fs.readdirSync(path)
  files.forEach((item) => {
    const stat = fs.lstatSync(`${path}/${item}`)
    if (stat.isDirectory() === true && item !== 'components') {
      components.push(`${path}/${item}`)
      components.push(...getFolder(`${path}/${item}`))
    }
  })
  return components
}

export default {
  description: '创建标准模块 Mock',
  prompts: [
    {
      type: 'list',
      name: 'path',
      message: '请选择模块目录',
      choices: getFolder('src/views'),
    },
  ],
  actions: (data) => {
    const pathArr = path.relative('src/views', data.path).split('\\')
    const moduleName = pathArr.pop()
    const relativePath = pathArr.join('/')
    const actions = []
    actions.push({
      type: 'add',
      path: pathArr.length === 0 ? 'src/mock/{{moduleName}}.ts' : `src/mock/${pathArr.join('.')}.{{moduleName}}.ts`,
      templateFile: 'plop-templates/mock/mock.hbs',
      data: {
        relativePath,
        moduleName,
      },
    })
    return actions
  },
}
