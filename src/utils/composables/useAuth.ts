import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'

export default function useAuth() {
  function hasPermission(permission: string) {
    const settingsStore = useSettingsStore()
    const userStore = useUserStore()
    if (settingsStore.settings.app.enablePermission) {
      return userStore.permissions.includes(permission)
    }
    else {
      return true
    }
  }

  function auth(value: string | string[]) {
    let auth
    if (typeof value === 'string') {
      auth = hasPermission(value)
    }
    else {
      auth = value.some((item) => {
        return hasPermission(item)
      })
    }
    return auth
  }

  function authAll(value: string[]) {
    const auth = value.every((item) => {
      return hasPermission(item)
    })
    return auth
  }

  return {
    auth,
    authAll,
  }
}
