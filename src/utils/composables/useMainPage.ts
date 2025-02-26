import useSettingsStore from '@/store/modules/settings'

export default function useMainPage() {
  const router = useRouter()

  const settingsStore = useSettingsStore()

  function reload() {
    settingsStore.setIsReloading(true)
    router.push({
      name: 'reload',
    }).then(() => {
      setTimeout(() => {
        settingsStore.setIsReloading(false)
      }, 100)
    })
  }

  return {
    reload,
  }
}
