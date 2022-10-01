import fs from 'node:fs'
import ViteRestart from 'vite-plugin-restart'

export default function createRestart() {
  const pluginsFile: string[] = []
  fs.readdirSync('vite/plugins').forEach((dirname) => {
    if (fs.statSync(`vite/plugins/${dirname}`).isFile()) {
      pluginsFile.push(`vite/plugins/${dirname}`)
    }
  })
  return ViteRestart({
    restart: pluginsFile,
  })
}
