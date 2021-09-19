import ViteRestart from 'vite-plugin-restart'

export default function createRestart() {
    return ViteRestart({
        restart: [
            '.env.development',
            'vite/plugins/index.js',
            'vite/plugins/auto-import.js',
            'vite/plugins/banner.js',
            'vite/plugins/components.js',
            'vite/plugins/compression.js',
            'vite/plugins/html.js',
            'vite/plugins/mock.js',
            'vite/plugins/restart.js',
            'vite/plugins/spritesmith.js',
            'vite/plugins/svg-icon.js'
        ]
    })
}
