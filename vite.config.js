import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite/plugins'

const fs = require('fs')
const path = require('path')

// https://vitejs.dev/config/
export default ({ mode, command }) => {
    const env = loadEnv(mode, process.cwd())
    // 全局 scss 资源
    const scssResources = []
    fs.readdirSync('src/assets/styles/resources').map(dirname => {
        if (fs.statSync(`src/assets/styles/resources/${dirname}`).isFile()) {
            scssResources.push(`@use "src/assets/styles/resources/${dirname}" as *;`)
        }
    })
    // css 精灵图相关
    fs.readdirSync('src/assets/sprites').map(dirname => {
        if (fs.statSync(`src/assets/sprites/${dirname}`).isDirectory()) {
            // css 精灵图生成的 scss 文件也需要放入全局 scss 资源
            scssResources.push(`@use "src/assets/sprites/_${dirname}.scss" as *;`)
        }
    })
    return defineConfig({
        base: './',
        // 开发服务器选项 https://cn.vitejs.dev/config/#server-options
        server: {
            open: true,
            port: 9000,
            proxy: {
                '/proxy': {
                    target: env.VITE_APP_API_BASEURL,
                    changeOrigin: command === 'serve' && env.VITE_OPEN_PROXY == 'true',
                    rewrite: path => path.replace(/\/proxy/, '')
                }
            }
        },
        // 构建选项 https://cn.vitejs.dev/config/#server-fsserve-root
        build: {
            outDir: mode == 'production' ? 'dist' : `dist-${mode}`,
            sourcemap: env.VITE_BUILD_SOURCEMAP == 'true',
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: env.VITE_BUILD_DROP_CONSOLE == 'true'
                }
            }
        },
        optimizeDeps: {
            include: [
                'element-plus/es',
                'element-plus/es/components/message/style/css',
                'element-plus/es/components/notification/style/css',
                'element-plus/es/components/message-box/style/css'
            ]
        },
        plugins: [
            ...createVitePlugins(env, command === 'build'),
            // BUG https://github.com/antfu/unplugin-vue-components/issues/361
            {
                name: 'dev-auto-import-element-plus',
                transform(code, id) {
                    if (command === 'serve' && /src\/main.js$/.test(id)) {
                        return {
                            code: code.replace('/* importElementPlusPlaceholder */', `
                                import ElementPlus from 'element-plus';
                                import 'element-plus/dist/index.css';
                                app.use(ElementPlus);
                            `),
                            map: null
                        }
                    }
                }
            }
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: scssResources.join('')
                }
            }
        }
    })
}
