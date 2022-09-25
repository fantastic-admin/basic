import type { ComponentInternalInstance } from 'vue'

export default function useCurrentInstance() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance
  return appContext.config.globalProperties
}
