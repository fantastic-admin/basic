# FaTabs 标签页组件

标签页切换组件，支持图标和自定义样式。

## 基础用法

```vue
<script setup lang="ts">
const activeTab = ref('1')
const list = [
  { label: '标签一', value: '1' },
  { label: '标签二', value: '2' },
  { label: '标签三', value: '3' },
]
</script>

<template>
  <FaTabs v-model="activeTab" :list>
    <template #1>内容一</template>
    <template #2>内容二</template>
    <template #3>内容三</template>
  </FaTabs>
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `modelValue` | `string \| number` | - | 当前激活的标签值 |
| `list` | `Array<{ icon?: string, label: string, value: string \| number, class?: HTMLAttributes['class'] }>` | **必需** | 标签列表 |
| `class` | `HTMLAttributes['class']` | - | 容器 CSS 类 |
| `listClass` | `HTMLAttributes['class']` | - | 标签列表 CSS 类 |
| `contentClass` | `HTMLAttributes['class']` | - | 内容区 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `[value]` | 对应标签值的内容（动态插槽名） |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `update:modelValue` | `value: string \| number` | 标签切换时触发 |

## 示例

### 基础标签页

```vue
<script setup lang="ts">
const activeTab = ref('1')
const list = [
  { label: '基本信息', value: '1' },
  { label: '详细信息', value: '2' },
  { label: '其他信息', value: '3' },
]
</script>

<template>
  <FaTabs v-model="activeTab" :list>
    <template #1>
      <p>基本信息内容...</p>
    </template>
    <template #2>
      <p>详细信息内容...</p>
    </template>
    <template #3>
      <p>其他信息内容...</p>
    </template>
  </FaTabs>
</template>
```

### 带图标的标签

```vue
<script setup lang="ts">
const activeTab = ref('1')
const list = [
  { icon: 'i-lucide:user', label: '用户', value: '1' },
  { icon: 'i-lucide:settings', label: '设置', value: '2' },
  { icon: 'i-lucide:bell', label: '通知', value: '3' },
]
</script>

<template>
  <FaTabs v-model="activeTab" :list>
    <template #1>用户内容...</template>
    <template #2>设置内容...</template>
    <template #3>通知内容...</template>
  </FaTabs>
</template>
```

### 数字标签值

```vue
<script setup lang="ts">
const activeTab = ref(1)
const list = [
  { label: '周一', value: 1 },
  { label: '周二', value: 2 },
  { label: '周三', value: 3 },
]
</script>

<template>
  <FaTabs v-model="activeTab" :list>
    <template #1>星期一的内容</template>
    <template #2>星期二的内容</template>
    <template #3>星期三的内容</template>
  </FaTabs>
</template>
```

### 自定义样式

```vue
<script setup lang="ts">
const activeTab = ref('1')
const list = [
  { label: '标签一', value: '1', class: 'w-32' },
  { label: '标签二', value: '2', class: 'w-32' },
]
</script>

<template>
  <FaTabs 
    v-model="activeTab" 
    :list
    class="w-full"
    list-class="bg-muted rounded-lg p-1"
    content-class="p-6"
  >
    <template #1>内容一</template>
    <template #2>内容二</template>
  </FaTabs>
</template>
```

### 监听标签变化

```vue
<script setup lang="ts">
const activeTab = ref('1')
const list = [
  { label: '列表', value: '1' },
  { label: '图表', value: '2' },
]

function handleTabChange(value: string) {
  console.log('切换到:', value)
  // 根据标签值加载不同数据
}
</script>

<template>
  <FaTabs v-model="activeTab" :list @update:model-value="handleTabChange">
    <template #1>列表内容...</template>
    <template #2>图表内容...</template>
  </FaTabs>
</template>
```

### 表单中的标签切换

```vue
<script setup lang="ts">
const activeTab = ref('basic')
const list = [
  { label: '基本信息', value: 'basic' },
  { label: '账号安全', value: 'security' },
  { label: '偏好设置', value: 'preference' },
]
</script>

<template>
  <FaTabs v-model="activeTab" :list>
    <template #basic>
      <form class="space-y-4">
        <FaInput label="用户名" />
        <FaInput label="邮箱" />
      </form>
    </template>
    <template #security>
      <form class="space-y-4">
        <FaInput label="当前密码" type="password" />
        <FaInput label="新密码" type="password" />
      </form>
    </template>
    <template #preference>
      <div class="space-y-4">
        <FaSwitch label="邮件通知" />
        <FaSwitch label="短信通知" />
      </div>
    </template>
  </FaTabs>
</template>
```

## 注意事项

1. **动态插槽**：内容插槽名对应标签的 `value` 值
2. **value 唯一性**：确保每个标签的 `value` 唯一
3. **类型支持**：`value` 支持字符串和数字两种类型
4. **图标可选**：标签可以设置图标也可以不设置

## 典型使用场景

- 设置页面分类
- 详情信息分栏
- 数据视图切换（列表/图表）
- 表单分步
- 内容分类展示
