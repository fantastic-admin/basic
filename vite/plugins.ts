import path from 'node:path'
import process from 'node:process'
import fs from 'node:fs'
import dayjs from 'dayjs'
import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueLegacy from '@vitejs/plugin-legacy'
import VueDevTools from 'vite-plugin-vue-devtools'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { vitePluginFakeServer } from 'vite-plugin-fake-server'
import Layouts from 'vite-plugin-vue-meta-layouts'
import Pages from 'vite-plugin-pages'
import { compression } from 'vite-plugin-compression2'
import archiver from 'archiver'
import TurboConsole from 'unplugin-turbo-console/vite'
import banner from 'vite-plugin-banner'
import boxen from 'boxen'
import picocolors from 'picocolors'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    vueLegacy({
      renderLegacyChunks: false,
      modernPolyfills: [
        'es.array.at',
        'es.array.find-last',
      ],
    }),

    // https://github.com/vuejs/devtools-next
    viteEnv.VITE_OPEN_DEVTOOLS === 'true' && VueDevTools(),

    // https://github.com/unplugin/unplugin-auto-import
    autoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
      ],
      dts: './src/types/auto-imports.d.ts',
      dirs: [
        './src/utils/composables/**',
      ],
    }),

    // https://github.com/unplugin/unplugin-vue-components
    components({
      dirs: [
        'src/components',
        'src/layouts/ui-kit',
      ],
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
      dts: './src/types/components.d.ts',
    }),

    Unocss(),

    // https://github.com/vbenjs/vite-plugin-svg-icons
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/')],
      symbolId: 'icon-[dir]-[name]',
      svgoOptions: isBuild,
    }),

    // https://github.com/condorheroblog/vite-plugin-fake-server
    vitePluginFakeServer({
      logger: !isBuild,
      include: 'src/mock',
      infixName: false,
      enableProd: isBuild && viteEnv.VITE_BUILD_MOCK === 'true',
    }),

    // https://github.com/dishait/vite-plugin-vue-meta-layouts
    Layouts({
      defaultLayout: 'index',
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      dirs: 'src/views',
      exclude: [
        '**/components/**/*.vue',
      ],
    }),

    // https://github.com/nonzzz/vite-plugin-compression
    isBuild && viteEnv.VITE_BUILD_COMPRESS.split(',').includes('gzip') && compression(),
    isBuild && viteEnv.VITE_BUILD_COMPRESS.split(',').includes('brotli') && compression({
      exclude: [/\.(br)$/, /\.(gz)$/],
      algorithm: 'brotliCompress',
    }),

    (function () {
      let outDir: string
      return {
        name: 'vite-plugin-archiver',
        apply: 'build',
        configResolved(resolvedConfig) {
          outDir = resolvedConfig.build.outDir
        },
        async closeBundle() {
          if (['zip', 'tar'].includes(viteEnv.VITE_BUILD_ARCHIVE)) {
            await sleep(1000)
            const archive = archiver(viteEnv.VITE_BUILD_ARCHIVE, {
              ...(viteEnv.VITE_BUILD_ARCHIVE === 'zip' && { zlib: { level: 9 } }),
              ...(viteEnv.VITE_BUILD_ARCHIVE === 'tar' && { gzip: true, gzipOptions: { level: 9 } }),
            })
            const output = fs.createWriteStream(`${outDir}.${dayjs().format('YYYY-MM-DD-HH-mm-ss')}.${viteEnv.VITE_BUILD_ARCHIVE === 'zip' ? 'zip' : 'tar.gz'}`)
            archive.pipe(output)
            archive.directory(outDir, false)
            archive.finalize()
          }
        },
      }
    })(),

    // https://github.com/unplugin/unplugin-turbo-console
    TurboConsole(),

    // https://github.com/chengpeiquan/vite-plugin-banner
    banner(`
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * https://fantastic-admin.hurui.me
 */
    `),

    {
      name: 'vite-plugin-debug-plugin',
      transform: (code, id) => {
        if (/src\/main.ts$/.test(id)) {
          if (viteEnv.VITE_APP_DEBUG_TOOL === 'eruda') {
            code = code.concat(`
              import eruda from 'eruda'
              eruda.init()
            `)
          }
          else if (viteEnv.VITE_APP_DEBUG_TOOL === 'vconsole') {
            code = code.concat(`
              import VConsole from 'vconsole'
              new VConsole()
            `)
          }
          return {
            code,
            map: null,
          }
        }
      },
    },

    {
      name: 'vite-plugin-disable-devtool',
      transform: (code, id) => {
        if (/src\/main.ts$/.test(id)) {
          if (viteEnv.VITE_APP_DISABLE_DEVTOOL === 'true') {
            code = code.concat(`
              import DisableDevtool from 'disable-devtool'
              DisableDevtool()
            `)
          }
          return {
            code,
            map: null,
          }
        }
      },
    },

    {
      name: 'vite-plugin-terminal-info',
      apply: 'serve',
      async buildStart() {
        const { bold, green, cyan, bgGreen, underline } = picocolors
        // eslint-disable-next-line no-console
        console.log(
          boxen(
            `${bold(green(`由 ${bgGreen('Fantastic-admin')} 驱动`))}\n\n${underline('https://fantastic-admin.hurui.me')}\n\n当前使用：${cyan('基础版')}`,
            {
              padding: 1,
              margin: 1,
              borderStyle: 'double',
              textAlignment: 'center',
            },
          ),
        )
      },
    },
  ]
  return vitePlugins
}
