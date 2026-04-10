/// <reference types="vite/client" />
interface ImportMetaEnv {
  // Auto generate by env-parse
  /**
   * 网络请求地址，应用于 axios 的 baseURL
   * Network request address, applied to axios's baseURL
   */
  readonly VITE_APP_API_BASEURL: string
  /**
   * 调试工具，可设置 eruda 或 vconsole
   * Debugging tool, can set eruda or vconsole
   */
  readonly VITE_APP_DEBUG_TOOL: string
  /**
   * 应用配置面板
   * Application configuration panel
   */
  readonly VITE_APP_SETTING: boolean
  /**
   * localStorage/sessionStorage 前缀
   * localStorage/sessionStorage prefix
   */
  readonly VITE_APP_STORAGE_PREFIX: string
  /**
   * 网站标题
   * Website title
   */
  readonly VITE_APP_TITLE: string
  /**
   * 启用代理
   * Enable proxy
   */
  readonly VITE_ENABLE_PROXY: boolean
  /**
   * 启用 turbo console
   * Enable turbo console
   */
  readonly VITE_ENABLE_TURBO_CONSOLE: boolean
  /**
   * 启用 Vue 开发工具
   * Enable Vue DevTools
   */
  readonly VITE_ENABLE_VUE_DEVTOOLS: boolean
  /**
   * 启动编辑器，用于 vite-plugin-vue-devtools 和 unplugin-turbo-console
   * 支持的编辑器 https://github.com/yyx990803/launch-editor#supported-editors
   * Launch the editor for vite-plugin-vue-devtools and unplugin-turbo-console
   * Supported editors https://github.com/yyx990803/launch-editor#supported-editors
   */
  readonly VITE_LAUNCH_EDITOR: string
}
