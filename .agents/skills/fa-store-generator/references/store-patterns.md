# Store 模板与示例

## 基础模板

```typescript
import { defineStore } from 'pinia'

export const use<Name>Store = defineStore('<id>', () => {
  // State
  const <field> = ref<<Type>>(<initialValue>)

  // Computed
  const <computed> = computed(() => ...)

  // Actions
  function <action>() {
    ...
  }

  return {
    <field>,
    <computed>,
    <action>,
  }
})
```

---

## 模板变体

### 1. 纯状态 Store（无持久化、无异步）

```typescript
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const visible = ref(false)

  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  function addItem(item: CartItem) {
    const existing = items.value.find(i => i.id === item.id)
    if (existing) {
      existing.quantity++
    }
    else {
      items.value.push({ ...item, quantity: 1 })
    }
  }

  function removeItem(id: string) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function clear() {
    items.value = []
  }

  return { items, visible, total, addItem, removeItem, clear }
})
```

### 2. 带持久化的 Store

```typescript
import { defineStore } from 'pinia'

export const useUserPreferenceStore = defineStore(
  'userPreference',
  () => {
    const theme = ref<'light' | 'dark'>('light')
    const language = ref('zh-cn')
    const pageSize = ref(20)

    function setTheme(val: 'light' | 'dark') {
      theme.value = val
    }

    return { theme, language, pageSize, setTheme }
  },
  {
    persist: {
      pick: ['theme', 'language', 'pageSize'],  // 只持久化指定字段
    },
  },
)
```

> 持久化默认使用 localStorage，key 为 store ID。
> 使用 `pick` 只持久化部分字段，避免持久化临时状态。

### 3. 带异步 Action 的 Store

```typescript
import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', () => {
  const list = ref<Notification[]>([])
  const loading = ref(false)
  const unreadCount = computed(() => list.value.filter(n => !n.read).length)

  async function fetchList() {
    loading.value = true
    try {
      const res = await api.notification.list()
      list.value = res.data
    }
    finally {
      loading.value = false
    }
  }

  async function markRead(id: string) {
    await api.notification.markRead(id)
    const item = list.value.find(n => n.id === id)
    if (item) {
      item.read = true
    }
  }

  return { list, loading, unreadCount, fetchList, markRead }
})
```

### 4. 带 TypeScript 接口定义的 Store

```typescript
import { defineStore } from 'pinia'

interface DictionaryItem {
  label: string
  value: string | number
}

interface DictionaryState {
  [key: string]: DictionaryItem[]
}

export const useDictionaryStore = defineStore('dictionary', () => {
  const data = ref<DictionaryState>({})

  function getItems(type: string): DictionaryItem[] {
    return data.value[type] ?? []
  }

  async function fetchByType(type: string) {
    if (data.value[type]) return  // 已缓存，跳过
    const res = await api.dictionary.getByType(type)
    data.value[type] = res.data
  }

  return { data, getItems, fetchByType }
})
```

---

## 项目现有 Store 参考

| Store | 文件 | 用途 |
|-------|------|------|
| `useAppAccountStore` | `modules/app/account.ts` | 登录/登出、token、多账号 |
| `useAppSettingsStore` | `modules/app/settings.ts` | 主题、语言、布局配置 |
| `useAppMenuStore` | `modules/app/menu.ts` | 菜单生成与导航状态 |
| `useAppTabbarStore` | `modules/app/tabbar.ts` | 标签栏管理 |

---

## 注意事项

- Store 文件放在 `src/store/modules/` 后，`unplugin-auto-import` 会自动扫描并全局注入，**无需手动 import**
- Store ID 必须全局唯一（camelCase）
- 避免在 store 中直接引用 DOM 或组件实例
- 跨 store 调用：直接在 setup 函数内调用其他 store，如 `const authStore = useAppAccountStore()`
