import { spawn } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'
import * as p from '@clack/prompts'
import { lookupCollection, lookupCollections } from '@iconify/json'
import fs from 'fs-extra'

// 拿到全部图标集的原始数据
const raw = await lookupCollections()

let lastChoose = fs.readFileSync(path.resolve(process.cwd(), 'src/iconify/index.json'), 'utf-8')
lastChoose = JSON.parse(lastChoose)

// 取出可使用的图标集数据用于选择，并按名称排序
const collections = Object.entries(raw).map(([id, item]) => ({
  ...item,
  id,
})).sort((a, b) => a.name.localeCompare(b.name))

p.intro('图标集生成工具')

/**
 * 分别会在对应目录下生成以下文件，其中(1)(3)用于离线下载并安装图标，(2)用于图标选择器使用
 * (1) src/iconify/index.json    记录用户交互信息
 * (2) src/iconify/data.json     包含多个图标集数据，仅记录图标名
 * (3) public/icons/*-raw.json   多个图标集的原始数据，独立存放，用于离线使用
 */
const answers = await p.group(
  {
    collections: () =>
      p.multiselect({
        message: '请选择需要生成的图标集',
        options: collections.map(item => ({
          label: item.name,
          value: item.id,
          hint: `${item.total} 个图标`,
        })),
        initialValues: lastChoose.collections,
      }),
    isOfflineUse: () =>
      p.confirm({
        message: '是否需要离线使用',
        initialValue: false,
      }),
  },
  {
    onCancel: () => {
      p.cancel('操作已取消')
      process.exit(0)
    },
  },
)

await fs.writeJSON(
  path.resolve(process.cwd(), 'src/iconify/index.json'),
  {
    collections: answers.collections,
    isOfflineUse: answers.isOfflineUse,
  },
)

const outputDir = path.resolve(process.cwd(), 'public/icons')
await fs.ensureDir(outputDir)
await fs.emptyDir(outputDir)

const collectionsMeta: object[] = []
for (const info of answers.collections) {
  const setData = await lookupCollection(info)

  collectionsMeta.push({
    prefix: setData.prefix,
    info: setData.info,
    icons: Object.keys(setData.icons),
  })

  const offlineFilePath = path.join(outputDir, `${info}-raw.json`)

  if (answers.isOfflineUse) {
    await fs.writeJSON(offlineFilePath, setData)
  }
}

await fs.writeJSON(
  path.resolve(process.cwd(), 'src/iconify/data.json'),
  collectionsMeta,
)

// 使用 spawn 运行 eslint
const eslint = spawn('eslint', ['src/iconify/data.json', 'src/iconify/index.json', '--cache', '--fix'], {
  stdio: 'inherit',
  shell: true,
})

eslint.on('error', (err) => {
  p.log.error(`ESLint 执行失败: ${err.message}`)
  process.exit(1)
})

eslint.on('close', (code) => {
  if (code !== 0) {
    p.log.error(`ESLint 执行失败，退出码: ${code}`)
    process.exit(code)
  }
  p.outro('图标集生成完成！')
})
