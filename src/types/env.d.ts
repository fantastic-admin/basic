interface ImportMetaEnv {
  // Auto generate by env-parse
  /**
   * 应用配置面板
   */
  readonly VITE_APP_SETTING: boolean
  /**
   * 页面标题
   */
  readonly VITE_APP_TITLE: string
  /**
   * 接口请求地址，会设置到 axios 的 baseURL 参数上
   */
  readonly VITE_APP_API_BASEURL: string
  /**
   * 调试工具，可设置 eruda 或 vconsole，如果不需要开启则留空
   */
  readonly VITE_APP_DEBUG_TOOL: string
  /**
   * 是否禁用开发者工具，可防止被调试
   */
  readonly VITE_APP_DISABLE_DEVTOOL: boolean
  /**
   * 是否开启代理
   */
  readonly VITE_OPEN_PROXY: boolean
  /**
   * 是否开启开发者工具
   */
  readonly VITE_OPEN_DEVTOOLS: boolean
}
