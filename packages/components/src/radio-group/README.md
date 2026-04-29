# FaRadioGroup 单选组

基于选项数组的单选组件，支持描述文案、自定义布局样式和选项插槽扩展。

## 使用场景

- 表单中的单选配置项
- 布局模式切换
- 套餐、规格、主题方案选择
- 带说明文案的单选列表
- 需要自定义选项卡片样式的单选交互

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `options` | `RadioGroupOption[]` | **必需** | 单选组选项数据 |
| `disabled` | `boolean` | `false` | 是否整体禁用 |
| `dir` | `'ltr' \| 'rtl'` | - | 文本方向 |
| `class` | `HTMLAttributes['class']` | - | 单选组容器类名 |
| `optionClass` | `HTMLAttributes['class']` | - | 每个选项外层容器类名 |
| `itemClass` | `HTMLAttributes['class']` | - | `RadioGroupItem` 类名 |

### RadioGroupOption 接口

```ts
interface RadioGroupOption {
  label: string
  value: AcceptableValue
  description?: string
  disabled?: boolean
  id?: string
}
```

## Slots

| 名称 | 说明 |
|------|------|
| `option` | 自定义选项内容，slot props: `{ option, checked, disabled, id }` |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `change` | 选中值变化时触发 | `value: AcceptableValue \| undefined` |

通过 `v-model` 实现双向绑定。

## 示例

### 基础用法

```vue
<script setup lang="ts">
const value = ref('comfortable')

const options = [
  { label: '默认', value: 'default' },
  { label: '舒适', value: 'comfortable' },
  { label: '紧凑', value: 'compact' },
]
</script>

<template>
  <FaRadioGroup v-model="value" :options="options" />
</template>
```

### 带描述文案

```vue
<script setup lang="ts">
const value = ref('growth')

const options = [
  {
    label: '创业版',
    value: 'starter',
    description: '适合 1-10 人小团队，保留核心能力。',
  },
  {
    label: '成长版',
    value: 'growth',
    description: '适合多角色协作，支持审批与审计流程。',
  },
  {
    label: '企业版',
    value: 'enterprise',
    description: '高级安全策略与 SSO 即将开放。',
  },
]
</script>

<template>
  <FaRadioGroup v-model="value" :options="options" />
</template>
```

### 禁用状态

```vue
<script setup lang="ts">
const value = ref('growth')

const options = [
  { label: '标准版', value: 'standard' },
  { label: '专业版', value: 'pro' },
  { label: '企业版', value: 'enterprise', disabled: true },
]
</script>

<template>
  <FaRadioGroup v-model="value" :options="options" />
</template>
```

### 多列排列

```vue
<script setup lang="ts">
const value = ref('balanced')

const options = [
  { label: '专注模式', value: 'focus' },
  { label: '平衡模式', value: 'balanced' },
  { label: '高密度模式', value: 'dense' },
]
</script>

<template>
  <FaRadioGroup
    v-model="value"
    :options="options"
    class="gap-4 md:grid-cols-3"
  />
</template>
```

### 自定义选项内容

```vue
<script setup lang="ts">
const value = ref('balanced')

const options = [
  {
    label: '专注模式',
    value: 'focus',
    description: '突出主任务，弱化辅助信息。',
  },
  {
    label: '平衡模式',
    value: 'balanced',
    description: '信息密度与可读性保持平衡。',
  },
  {
    label: '高密度模式',
    value: 'dense',
    description: '适合大屏运营与监控看板。',
  },
]
</script>

<template>
  <FaRadioGroup
    v-model="value"
    :options="options"
    class="gap-4 md:grid-cols-3"
  >
    <template #option="{ option, checked }">
      <div
        :class="[
          'flex w-full items-start justify-between gap-3 rounded-xl border px-4 py-3',
          checked ? 'border-primary bg-primary/5' : 'border-border',
        ]"
      >
        <div class="min-w-0">
          <div class="truncate font-medium">{{ option.label }}</div>
          <div v-if="option.description" class="text-xs text-muted-foreground leading-5">
            {{ option.description }}
          </div>
        </div>
        <span class="text-xs" :class="checked ? 'text-primary' : 'text-muted-foreground'">
          {{ checked ? '已选中' : '可选择' }}
        </span>
      </div>
    </template>
  </FaRadioGroup>
</template>
```

### 监听变化事件

```vue
<script setup lang="ts">
const value = ref('default')

const options = [
  { label: '默认', value: 'default' },
  { label: '舒适', value: 'comfortable' },
  { label: '紧凑', value: 'compact' },
]

function handleChange(value) {
  console.log('选中值变化:', value)
}
</script>

<template>
  <FaRadioGroup v-model="value" :options="options" @change="handleChange" />
</template>
```

## 注意事项

1. **初始化值**：组件当前通过 `v-model` 管理选中值，不再提供 `defaultValue`。
2. **选项结构**：`options` 至少需要 `label` 和 `value` 两个字段。
3. **禁用优先级**：组件整体 `disabled` 为 `true` 时，会覆盖单项可用状态。
4. **布局控制**：通过 `class` 和 `optionClass` 自定义多列或卡片式排列，不再提供 `orientation`。
5. **描述文案布局**：存在 `description` 时，选项会自动切换为顶部对齐布局。
6. **自定义插槽**：使用 `option` 插槽后，默认 `RadioGroupItem` 会隐藏，需要由插槽内容自行承担完整视觉表现。
7. **点击区域**：默认选项内容包裹在 `Label` 中，点击文字区域也能切换选中状态。
