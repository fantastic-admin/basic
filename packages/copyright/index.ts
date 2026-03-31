import type { PluginOption } from 'vite'
import boxen from 'boxen'
import picocolors from 'picocolors'
import banner from 'vite-plugin-banner'

export interface FantasticAdminCopyrightOptions {
  edition?: string
  website?: string
}

function resolveOptions(options: FantasticAdminCopyrightOptions = {}) {
  return {
    edition: options.edition ?? '基础版',
    website: options.website ?? 'https://fantastic-admin.hurui.me',
  }
}

export function createFantasticAdminBannerPlugin(options: FantasticAdminCopyrightOptions = {}): PluginOption {
  const { website } = resolveOptions(options)

  return banner(`
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * ${website}
 */
  `)
}

export function createFantasticAdminTerminalInfoPlugin(options: FantasticAdminCopyrightOptions = {}): PluginOption {
  const { edition, website } = resolveOptions(options)

  return {
    name: 'vite-plugin-terminal-info',
    apply: 'serve',
    async buildStart() {
      const { bold, green, magenta, bgGreen, underline } = picocolors

      // eslint-disable-next-line no-console
      console.log(
        boxen(
          `${bold(green(`由 ${bgGreen('Fantastic-admin')} 驱动`))}\n\n${underline(website)}\n\n当前使用：${magenta(edition)}`,
          {
            padding: 1,
            margin: 1,
            borderStyle: 'double',
            textAlignment: 'center',
          },
        ),
      )
    },
  }
}

export function createFantasticAdminSystemCopyrightPlugin(options: FantasticAdminCopyrightOptions = {}): PluginOption {
  const { website } = resolveOptions(options)
  const fontFamily = 'font-family: "JetBrains Mono", "SF Mono", "Cascadia Code", Menlo, Consolas, "Liberation Mono", monospace;'
  const mainStyle = `${fontFamily} font-size: 14px; font-weight: 700; padding: 6px 8px; color: #35495e; background: #42b883;`
  const subStyle = `${fontFamily} font-size: 14px; font-weight: 400; padding: 6px 8px; color: #fff; background: #35495e;`
  const iconStyle = `${fontFamily} font-size: 14px; font-weight: 500; padding: 6px 4px 6px 8px; color: #d7f0ff; background: #1d5b85;`
  const linkStyle = `${fontFamily} font-size: 14px; font-weight: 500; letter-spacing: 0.2px; padding: 6px 8px 6px 4px; color: #d7f0ff; background: #1d5b85; text-decoration: underline; text-underline-offset: 2px;`

  return {
    name: 'vite-plugin-system-copyright',
    apply: 'build',
    transform(code, id) {
      if (!/src\/main\.ts$/.test(id)) {
        return
      }

      return {
        code: `
/* eslint-disable no-console */
if ((navigator.language).toLowerCase() === 'zh-cn') {
  console.info('%c由%cFantastic-admin%c驱动%c👉%c${website}', ${JSON.stringify(subStyle)}, ${JSON.stringify(mainStyle)}, ${JSON.stringify(subStyle)}, ${JSON.stringify(iconStyle)}, ${JSON.stringify(linkStyle)})
}
else {
  console.info('%cPowered by %cFantastic-admin%c%c👉%c${website}', ${JSON.stringify(subStyle)}, ${JSON.stringify(mainStyle)}, ${JSON.stringify(subStyle)}, ${JSON.stringify(iconStyle)}, ${JSON.stringify(linkStyle)})
}

${code}
        `,
        map: null,
      }
    },
  }
}

export function createFantasticAdminCopyrightPlugins(options: FantasticAdminCopyrightOptions = {}): PluginOption[] {
  return [
    createFantasticAdminBannerPlugin(options),
    createFantasticAdminTerminalInfoPlugin(options),
    createFantasticAdminSystemCopyrightPlugin(options),
  ]
}
