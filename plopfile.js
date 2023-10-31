import { promises as fs } from 'node:fs'

export default async function (plop) {
  plop.setWelcomeMessage('请选择需要创建的模式：')
  const items = await fs.readdir('./plop-templates')
  for (const item of items) {
    const stat = await fs.lstat(`./plop-templates/${item}`)
    if (stat.isDirectory()) {
      const prompt = await import(`./plop-templates/${item}/prompt.js`)
      plop.setGenerator(item, prompt.default)
    }
  }
}
