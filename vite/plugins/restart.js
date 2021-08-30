import ViteRestart from 'vite-plugin-restart'

export default function createRestart() {
    return ViteRestart({
        restart: [
            '.env.development',
            'vite/plugins/index.js'
        ]
    })
}
