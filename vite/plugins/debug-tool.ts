import type { Plugin } from 'vite'

export default function createDebugTool(env): Plugin {
  const { VITE_APP_DEBUG_TOOL } = env
  return {
    name: 'debug-plugin',
    transform: (code, id) => {
      if (/src\/main.ts$/.test(id)) {
        if (VITE_APP_DEBUG_TOOL === 'eruda') {
          code = code.concat(`
            import eruda from 'eruda'
            eruda.init()
          `)
        }
        else if (VITE_APP_DEBUG_TOOL === 'vconsole') {
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
  }
}
