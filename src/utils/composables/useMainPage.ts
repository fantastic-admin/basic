import router from '@/router'

export default function useMainPage() {
  function reload() {
    void router.push({
      name: 'reload',
    })
  }

  return {
    reload,
  }
}
