import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'

function useAuth() {
    function hasPermission(permission) {
        const settingsStore = useSettingsStore()
        const userStore = useUserStore()
        if (settingsStore.app.enablePermission) {
            return userStore.permissions.some(v => {
                return v === permission
            })
        } else {
            return true
        }
    }

    function auth(value) {
        let auth
        if (typeof value === 'string') {
            auth = hasPermission(value)
        } else {
            auth = value.some(item => {
                return hasPermission(item)
            })
        }
        return auth
    }

    function authAll(value) {
        const auth = value.every(item => {
            return hasPermission(item)
        })
        return auth
    }

    return {
        hasPermission,
        auth,
        authAll
    }
}

export default useAuth
