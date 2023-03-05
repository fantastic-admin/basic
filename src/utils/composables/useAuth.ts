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
      auth = value !== '' ? hasPermission(value) : true
    }
    else {
      auth = value.length > 0 ? value.some(item => hasPermission(item)) : true
    }
    return auth
  }

  function authAll(value: string[]) {
    return value.length > 0 ? value.every(item => hasPermission(item)) : true
  }

  return {
    auth,
    authAll,
  }
}
