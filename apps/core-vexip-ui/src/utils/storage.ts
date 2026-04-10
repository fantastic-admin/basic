declare global {
  interface Storage {
    has: (key: string) => boolean
    readonly length: number
  }
}

const STORAGE_PREFIX = import.meta.env.VITE_APP_STORAGE_PREFIX || ''

function createStorageProxy(storage: Storage) {
  return new Proxy(storage, {
    get(target, prop, receiver) {
      if (prop === 'getItem') {
        return (key: string) => target.getItem(STORAGE_PREFIX + key)
      }
      if (prop === 'setItem') {
        return (key: string, value: string) => target.setItem(STORAGE_PREFIX + key, value)
      }
      if (prop === 'removeItem') {
        return (key: string) => target.removeItem(STORAGE_PREFIX + key)
      }
      if (prop === 'has') {
        return (key: string) => Object.hasOwn(target, STORAGE_PREFIX + key)
      }
      if (prop === 'key') {
        return (index: number) => {
          // 只返回带前缀的 key，去掉前缀
          let realIndex = -1
          for (let i = 0, j = 0; i < target.length; i++) {
            const k = target.key(i)
            if (k && k.startsWith(STORAGE_PREFIX)) {
              if (j === index) {
                realIndex = i
                break
              }
              j++
            }
          }
          const key = target.key(realIndex)
          return key ? key.slice(STORAGE_PREFIX.length) : null
        }
      }
      if (prop === 'clear') {
        return () => {
          // 只清除带前缀的 key
          const keysToRemove = []
          for (let i = 0; i < target.length; i++) {
            const k = target.key(i)
            if (k && k.startsWith(STORAGE_PREFIX)) {
              keysToRemove.push(k)
            }
          }
          keysToRemove.forEach(k => target.removeItem(k))
        }
      }
      if (prop === 'length') {
        // 只统计带前缀的 key
        let count = 0
        for (let i = 0; i < target.length; i++) {
          const k = target.key(i)
          if (k && k.startsWith(STORAGE_PREFIX)) {
            count++
          }
        }
        return count
      }
      // 其余属性和方法透传
      return Reflect.get(target, prop, receiver)
    },
  })
}

const localStorageProxy = createStorageProxy(window.localStorage)
const sessionStorageProxy = createStorageProxy(window.sessionStorage)

// 替换全局 window 上的 localStorage 和 sessionStorage
Object.defineProperty(window, 'localStorage', {
  value: localStorageProxy,
  writable: false,
  configurable: false,
})
Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageProxy,
  writable: false,
  configurable: false,
})
