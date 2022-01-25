import ViteRestart from 'vite-plugin-restart'

export default function createRestart() {
    const pluginsFile = []
    const fs = require('fs')
    fs.readdirSync('vite/plugins').map(dirname => {
        if (fs.statSync(`vite/plugins/${dirname}`).isFile()) {
            pluginsFile.push(`vite/plugins/${dirname}`)
        }
    })
    return ViteRestart({
        restart: [
            ...pluginsFile,
            '.env.development'
        ]
    })
}
