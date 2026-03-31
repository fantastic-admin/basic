export function useAppPage() {
  const router = useRouter()

  const appSettingsStore = useAppSettingsStore()

  function reload() {
    appSettingsStore.setIsReloading(true)
    router.push({
      name: 'reload',
    }).then(() => {
      setTimeout(() => {
        appSettingsStore.setIsReloading(false)
      }, 100)
    })
  }

  return {
    reload,
  }
}
