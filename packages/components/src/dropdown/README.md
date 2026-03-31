# FaDropdown 下拉菜单组件

功能强大的下拉菜单组件，支持分组、子菜单、图标和自定义内容。

## 基础用法

```vue
<script setup lang="ts">
const items = [
  [
    { label: '编辑', icon: 'i-lucide:edit', handle: () => console.log('编辑') },
    { label: '删除', icon: 'i-lucide:trash', variant: 'destructive', handle: () => console.log('删除') },
  ],
]
</script>

<template>
  <FaDropdown :items="items">
    <FaButton>操作</FaButton>
  </FaDropdown>
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `(MenuItem \| MenuSubItem)[][]` | **必需** | 菜单项数组（二维数组，每组为一行） |
| `align` | `'start' \| 'end' \| 'center'` | - | 水平对齐方式 |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | 弹出方向 |
| `sideOffset` | `number` | `4` | 与触发元素的偏移距离 |
| `alignOffset` | `number` | `0` | 对齐偏移量 |
| `collisionPadding` | `number` | `0` | 与视口边缘的碰撞内边距 |

## Slots

| 名称 | 说明 |
|------|------|
| `default` | 触发元素（必填） |
| `header` | 菜单头部内容 |
| `footer` | 菜单底部内容 |

## MenuItem 接口

```ts
interface MenuItem {
  label: string
  icon?: string
  variant?: 'default' | 'destructive'
  disabled?: boolean
  handle?: () => void
}
```

## MenuSubItem 接口（子菜单）

```ts
interface MenuSubItem {
  label: string
  items: (MenuItem | MenuSubItem)[][]
}
```

## 示例

### 基础下拉菜单

```vue
<script setup lang="ts">
const items = [
  [
    { label: '编辑', icon: 'i-lucide:edit', handle: () => console.log('编辑') },
    { label: '复制', icon: 'i-lucide:copy', handle: () => console.log('复制') },
    { label: '删除', icon: 'i-lucide:trash', variant: 'destructive', handle: () => console.log('删除') },
  ],
]
</script>

<template>
  <FaDropdown :items="items">
    <FaButton variant="outline">
      <FaIcon name="i-lucide:more-horizontal" />
    </FaButton>
  </FaDropdown>
</template>
```

### 带分组的菜单

```vue
<script setup lang="ts">
const items = [
  [
    { label: '新建文件', icon: 'i-lucide:file' },
    { label: '新建文件夹', icon: 'i-lucide:folder' },
  ],
  [
    { label: '重命名', icon: 'i-lucide:edit' },
    { label: '删除', icon: 'i-lucide:trash', variant: 'destructive' },
  ],
]
</script>

<template>
  <FaDropdown :items="items">
    <FaButton>操作</FaButton>
  </FaDropdown>
</template>
```

### 带子菜单

```vue
<script setup lang="ts">
const items = [
  [
    { label: '编辑', icon: 'i-lucide:edit' },
    { 
      label: '分享',
      items: [
        [{ label: '微信', icon: 'i-ri:wechat-line' }],
        [{ label: '微博', icon: 'i-ri:weibo-line' }],
        [{ label: 'QQ', icon: 'i-ri:qq-line' }],
      ]
    },
  ],
  [
    { label: '删除', icon: 'i-lucide:trash', variant: 'destructive' },
  ],
]
</script>

<template>
  <FaDropdown :items="items">
    <FaButton>分享</FaButton>
  </FaDropdown>
</template>
```

### 带头部和底部

```vue
<script setup lang="ts">
const items = [
  [
    { label: '个人设置', icon: 'i-lucide:user' },
    { label: '账号安全', icon: 'i-lucide:shield' },
  ],
  [
    { label: '退出登录', icon: 'i-lucide:log-out', variant: 'destructive' },
  ],
]
</script>

<template>
  <FaDropdown :items="items">
    <FaAvatar src="https://example.com/avatar.jpg" class="size-8 rounded-full" />
    <template #header>
      <div class="px-2 py-1.5">
        <p class="text-sm font-medium">张三</p>
        <p class="text-xs text-muted-foreground">zhangsan@example.com</p>
      </div>
    </template>
    <template #footer>
      <div class="px-2 py-1.5 text-xs text-muted-foreground">
        v1.0.0
      </div>
    </template>
  </FaDropdown>
</template>
```

### 禁用菜单项

```vue
<script setup lang="ts">
const items = [
  [
    { label: '编辑', icon: 'i-lucide:edit', handle: () => console.log('编辑') },
    { label: '复制', icon: 'i-lucide:copy', disabled: true },
    { label: '删除', icon: 'i-lucide:trash', variant: 'destructive' },
  ],
]
</script>

<template>
  <FaDropdown :items="items">
    <FaButton>操作</FaButton>
  </FaDropdown>
</template>
```

### 控制弹出方向

```vue
<template>
  <FaDropdown :items="items" side="top">
    <FaButton>向上弹出</FaButton>
  </FaDropdown>
  
  <FaDropdown :items="items" side="left">
    <FaButton>向左弹出</FaButton>
  </FaDropdown>
</template>
```

### 用户菜单

```vue
<script setup lang="ts">
const router = useRouter()
const userStore = useUserStore()

const items = [
  [
    { label: '个人中心', icon: 'i-lucide:user', handle: () => router.push('/profile') },
    { label: '账号设置', icon: 'i-lucide:settings', handle: () => router.push('/settings') },
  ],
  [
    { label: '退出登录', icon: 'i-lucide:log-out', variant: 'destructive', handle: () => userStore.logout() },
  ],
]
</script>

<template>
  <FaDropdown :items="items">
    <div class="flex items-center gap-2 cursor-pointer">
      <FaAvatar :src="userStore.avatar" class="size-8 rounded-full" />
      <span>{{ userStore.username }}</span>
    </div>
  </FaDropdown>
</template>
```

## 注意事项

1. **items 结构**：`items` 是二维数组，每个子数组为一组，组与组之间会自动添加分割线
2. **图标一致性**：如果组内任一菜单项有图标，整组都会预留图标位置
3. **子菜单**：通过 `items` 属性嵌套可实现多级子菜单
4. **事件处理**：通过 `handle` 函数处理点击事件
5. **危险操作**：设置 `variant: 'destructive'` 可将菜单项标记为危险操作（红色）

## 典型使用场景

- 用户头像下拉菜单
- 表格行操作菜单
- 工具栏更多操作
- 导航菜单
- 快捷操作菜单
