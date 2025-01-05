import type { RecursiveRequired, Settings } from '#/global'
import settingsDefault from '@/settings.default'
import { merge } from '@/utils/object'

const globalSettings: Settings.all = {
  // 请在此处编写或粘贴配置代码
}

export default merge(globalSettings, settingsDefault) as RecursiveRequired<Settings.all>
