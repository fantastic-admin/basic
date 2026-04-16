# FaSwitch 开关组件

开关切换组件，支持图标和状态变化前的回调处理。

## 使用场景

- 深色模式切换
- 通知设置开关
- 功能启用/禁用
- 布尔值配置项
- 快速状态切换

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `disabled` | `boolean` | `false` | 是否禁用 |
| `onIcon` | `string` | - | 开启状态图标 |
| `offIcon` | `string` | - | 关闭状态图标 |
| `beforeChange` | `() => boolean \| Promise<boolean>` | - | 状态变化前回调 |

## Events

通过 `v-model` 双向绑定，无需单独事件

## 示例

### 基础用法

```vue
<script setup lang="ts">
const enabled = ref(false)
</script>

<template>
  <FaSwitch v-model="enabled" />
</template>
```

### 基础开关

```vue
<script setup lang="ts">
const enabled = ref(false)
</script>

<template>
  <FaSwitch v-model="enabled" />
</template>
```

### 带图标的开关

```vue
<script setup lang="ts">
const enabled = ref(false)
</script>

<template>
  <FaSwitch
    v-model="enabled"
    on-icon="i-lucide:sun"
    off-icon="i-lucide:moon"
  />
</template>
```

### 禁用状态

```vue
<template>
  <FaSwitch v-model="enabled" disabled />
</template>
```

### 状态变化确认

```vue
<script setup lang="ts">
import { useFaModal } from '@/ui/components/modal'

const enabled = ref(false)

async function beforeChange() {
  return new Promise((resolve) => {
    useFaModal().confirm({
      title: '提示',
      content: '确定要更改状态吗？',
      onConfirm: () => resolve(true),
      onCancel: () => resolve(false),
    })
  })
}
</script>

<template>
  <FaSwitch v-model="enabled" :before-change="beforeChange" />
</template>
```

### 深色模式切换

```vue
<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (val) => {
    colorMode.value = val ? 'dark' : 'light'
  },
})
</script>

<template>
  <FaSwitch
    v-model="isDark"
    on-icon="i-lucide:moon"
    off-icon="i-lucide:sun"
  />
</template>
```

### 通知开关设置

```vue
<script setup lang="ts">
const settings = reactive({
  emailNotification: true,
  smsNotification: false,
  pushNotification: true,
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <span>邮件通知</span>
      <FaSwitch v-model="settings.emailNotification" />
    </div>
    <div class="flex items-center justify-between">
      <span>短信通知</span>
      <FaSwitch v-model="settings.smsNotification" />
    </div>
    <div class="flex items-center justify-between">
      <span>推送通知</span>
      <FaSwitch v-model="settings.pushNotification" />
    </div>
  </div>
</template>
```

## 注意事项

1. **v-model 绑定**：使用 `v-model` 实现双向数据绑定，值为 boolean 类型
2. **图标显示**：`onIcon` 在开启状态显示，`offIcon` 在关闭状态显示
3. **异步确认**：`beforeChange` 支持返回 Promise，可用于异步确认操作
4. **取消变化**：`beforeChange` 返回 false 或 Promise resolve false 时，状态不会改变
5. **禁用状态**：禁用状态下开关无法点击，也无法切换状态
