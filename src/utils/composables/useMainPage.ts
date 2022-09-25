import router from '@/router'

export default function useMainPage() {
  function reload() {
    router.push({
      name: 'reload',
    })
  }

  return {
    reload,
  }
}
