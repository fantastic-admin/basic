const useKeepAliveStore = defineStore(
  // 唯一ID
  'keepAlive',
  () => {
    const list = ref<string[]>([])

    function add(name: string | string[]) {
      if (typeof name === 'string') {
        !list.value.includes(name) && list.value.push(name)
      }
      else {
        name.forEach((v) => {
          v && !list.value.includes(v) && list.value.push(v)
        })
      }
    }
    function remove(name: string | string[]) {
      if (typeof name === 'string') {
        list.value = list.value.filter((v) => {
          return v !== name
        })
      }
      else {
        list.value = list.value.filter((v) => {
          return !name.includes(v)
        })
      }
    }
    function clean() {
      list.value = []
    }

    return {
      list,
      add,
      remove,
      clean,
    }
  },
)

export default useKeepAliveStore
