import type { Plugin } from 'vite'

export default function createDisableDevtool(env): Plugin {
  const { VITE_APP_DISABLE_DEVTOOL } = env
  return {
    name: 'disable-devtool',
    transform: (code, id) => {
      if (/src\/main.ts$/.test(id)) {
        if (VITE_APP_DISABLE_DEVTOOL === 'true') {
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
  }
}
