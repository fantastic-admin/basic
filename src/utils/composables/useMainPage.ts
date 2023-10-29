export default function useMainPage() {
  const router = useRouter()

  function reload() {
    router.push({
      name: 'reload',
    })
  }

  return {
    reload,
  }
}
