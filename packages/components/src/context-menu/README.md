# FaContextMenu 右键菜单

右键点击时弹出的上下文菜单，支持分组、子菜单和图标。

## 使用场景

- 表格行操作菜单
- 文件/文件夹右键菜单
- 画布/编辑器上下文菜单
- 列表项操作菜单
- 图片/媒体文件操作菜单

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `(MenuItem \| MenuSubItem)[][]` | **必需** | 菜单项数组（二维数组） |

### MenuItem 接口

```ts
interface MenuItem {
  label: string
  icon?: string
  variant?: 'default' | 'destructive'
  disabled?: boolean
  handle?: () => void
}
```

### MenuSubItem 接口（子菜单）

```ts
interface MenuSubItem {
  label: string
  items: (MenuItem | MenuSubItem)[][]
}
```

## Slots

| 名称 | 说明 |
|------|------|
| `default` | 触发元素（必填） |
| `label` | 菜单头部标签 |

## 示例

### 基础用法

```vue
<script setup lang="ts">
const items = [
  [
    { label: '复制', icon: 'i-lucide:copy', handle: () => console.log('复制') },
    { label: '粘贴', icon: 'i-lucide:clipboard', handle: () => console.log('粘贴') },
  ],
]
</script>

<template>
  <FaContextMenu :items="items">
    <div class="h-64 border rounded-lg flex-center">
      右键点击我
    </div>
  </FaContextMenu>
</template>
```

### 基础右键菜单

```vue
<script setup lang="ts">
const items = [
  [
    { label: '复制', icon: 'i-lucide:copy', handle: () => console.log('复制') },
    { label: '剪切', icon: 'i-lucide:scissors', handle: () => console.log('剪切') },
    { label: '粘贴', icon: 'i-lucide:clipboard', handle: () => console.log('粘贴') },
  ],
]
</script>

<template>
  <FaContextMenu :items="items">
    <div class="h-64 border-2 border-dashed rounded-lg flex-center text-muted-foreground">
      右键点击显示菜单
    </div>
  </FaContextMenu>
</template>
```

### 带分组的菜单

```vue
<script setup lang="ts">
const items = [
  [
    { label: '新建', icon: 'i-lucide:file-plus' },
    { label: '打开', icon: 'i-lucide:folder-open' },
  ],
  [
    { label: '保存', icon: 'i-lucide:save' },
    { label: '另存为', icon: 'i-lucide:file-down' },
  ],
]
</script>

<template>
  <FaContextMenu :items="items">
    <div class="h-64 border rounded-lg flex-center">右键点击</div>
  </FaContextMenu>
</template>
```

### 带子菜单

```vue
<script setup lang="ts">
const items = [
  [
    { label: '查看', icon: 'i-lucide:eye' },
    { 
      label: '排序方式',
      items: [
        [{ label: '名称', icon: 'i-lucide:sort-alpha-asc' }],
        [{ label: '日期', icon: 'i-lucide:calendar' }],
        [{ label: '大小', icon: 'i-lucide:hard-drive' }],
      ]
    },
  ],
  [
    { label: '删除', icon: 'i-lucide:trash', variant: 'destructive' },
  ],
]
</script>

<template>
  <FaContextMenu :items="items">
    <div class="h-64 border rounded-lg flex-center">右键点击</div>
  </FaContextMenu>
</template>
```

### 带标签的菜单

```vue
<script setup lang="ts">
const items = [
  [
    { label: '查看大图', handle: () => {} },
    { label: '下载图片', handle: () => {} },
  ],
]
</script>

<template>
  <FaContextMenu :items="items">
    <img src="https://example.com/image.jpg" class="w-64 rounded" />
    <template #label>
      图片操作
    </template>
  </FaContextMenu>
</template>
```

### 禁用菜单项

```vue
<script setup lang="ts">
const items = [
  [
    { label: '复制', icon: 'i-lucide:copy', handle: () => {} },
    { label: '剪切', icon: 'i-lucide:scissors', disabled: true },
    { label: '粘贴', icon: 'i-lucide:clipboard', handle: () => {} },
  ],
]
</script>

<template>
  <FaContextMenu :items="items">
    <div class="h-64 border rounded-lg flex-center">右键点击</div>
  </FaContextMenu>
</template>
```

### 表格行右键菜单

```vue
<script setup lang="ts">
const data = ref([
  { id: 1, name: '项目 1', status: 'active' },
  { id: 2, name: '项目 2', status: 'inactive' },
])

function getMenuItems(row: any) {
  return [
    [
      { label: '查看', icon: 'i-lucide:eye', handle: () => console.log('查看', row) },
      { label: '编辑', icon: 'i-lucide:edit', handle: () => console.log('编辑', row) },
    ],
    [
      { label: '删除', icon: 'i-lucide:trash', variant: 'destructive', handle: () => console.log('删除', row) },
    ],
  ]
}
</script>

<template>
  <table class="w-full">
    <thead>
      <tr>
        <th>名称</th>
        <th>状态</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data" :key="row.id" class="hover:bg-muted/50">
        <FaContextMenu :items="getMenuItems(row)">
          <td class="p-3 cursor-context-menu">{{ row.name }}</td>
        </FaContextMenu>
        <td class="p-3">{{ row.status }}</td>
      </tr>
    </tbody>
  </table>
</template>
```

### 文件列表右键菜单

```vue
<script setup lang="ts">
const files = ref([
  { name: 'document.pdf', type: 'pdf' },
  { name: 'image.jpg', type: 'image' },
])

function getFileMenu(file: any) {
  return [
    [
      { label: '打开', icon: 'i-lucide:folder-open', handle: () => {} },
      { label: '重命名', icon: 'i-lucide:edit', handle: () => {} },
    ],
    [
      { label: '下载', icon: 'i-lucide:download', handle: () => {} },
      { label: '分享', icon: 'i-lucide:share', handle: () => {} },
    ],
    [
      { label: '删除', icon: 'i-lucide:trash', variant: 'destructive', handle: () => {} },
    ],
  ]
}
</script>

<template>
  <div class="space-y-2">
    <div 
      v-for="file in files" 
      :key="file.name"
      class="flex items-center gap-3 p-3 border rounded hover:bg-muted/50 cursor-pointer"
    >
      <FaContextMenu :items="getFileMenu(file)">
        <div class="flex items-center gap-3 flex-1">
          <FaIcon name="i-lucide:file-text" />
          <span>{{ file.name }}</span>
        </div>
      </FaContextMenu>
    </div>
  </div>
</template>
```

## 注意事项

1. **items 结构**：二维数组，每个子数组为一组，组间自动添加分割线
2. **图标一致性**：组内任一菜单项有图标时，整组预留图标位置
3. **触发区域**：default slot 的元素为右键触发区域
4. **子菜单**：通过 `items` 属性嵌套实现多级菜单
5. **危险操作**：设置 `variant: 'destructive'` 标记为危险操作（红色）
