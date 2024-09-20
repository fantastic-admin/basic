import { exec } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'
import { lookupCollection, lookupCollections } from '@iconify/json'
import fs from 'fs-extra'
import inquirer from 'inquirer'

async function generateIcons() {
  // 拿到全部图标集的原始数据
  const raw = await lookupCollections()

  let lastChoose = fs.readFileSync(path.resolve(process.cwd(), 'src/iconify/index.json'), 'utf-8')
  lastChoose = JSON.parse(lastChoose)

  // 取出可使用的图标集数据用于 inquirer 选择，并按名称排序
  const collections = Object.entries(raw).map(([id, item]) => ({
    ...item,
    id,
  })).sort((a, b) => a.name.localeCompare(b.name))

  /**
   * 分别会在对应目录下生成以下文件，其中(1)(3)用于离线下载并安装图标，(2)用于图标选择器使用
   * (1) src/iconify/index.json    记录用户 inquirer 的交互信息
   * (2) src/iconify/data.json     包含多个图标集数据，仅记录图标名
   * (3) public/icons/*-raw.json   多个图标集的原始数据，独立存放，用于离线使用
   */
  inquirer.prompt([
    {
      type: 'checkbox',
      message: '请选择需要生成的图标集',
      name: 'collections',
      choices: collections.map(item => ({
        name: `${item.name} (${item.total} icons)`,
        value: item.id,
      })),
      default: lastChoose.collections,
    },
    {
      type: 'confirm',
      name: 'isOfflineUse',
      message: '是否需要离线使用',
      default: false,
    },
  ]).then(async (answers) => {
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

    exec('eslint src/iconify/data.json src/iconify/index.json --cache --fix')
  })
}

generateIcons()
