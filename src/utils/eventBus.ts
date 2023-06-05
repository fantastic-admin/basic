import mitt from 'mitt'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Events = {
  // 应用设置弹窗
  'global-app-setting-toggle': undefined
  // 系统信息弹窗
  'global-system-info-toggle': undefined
  // 快捷键弹窗
  'global-hotkeys-intro-toggle': undefined
  // 搜索框弹窗
  'global-search-toggle': undefined
}

export default mitt<Events>()
