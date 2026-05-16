# FaCheckbox 复选框

单个复选框组件，支持普通选中、禁用和半选状态。

## 使用场景

- 表单中的同意协议选项
- 单个布尔开关配置
- 树形结构中的半选状态展示
- 单项功能启用/禁用

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `id` | `string` | 自动生成 | 复选框 id |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `class` | `HTMLAttributes['class']` | - | 外层容器类名 |
| `itemClass` | `HTMLAttributes['class']` | - | 复选框本体类名 |
| `labelClass` | `HTMLAttributes['class']` | - | 标签内容类名 |

## Slots

| 名称 | 说明 |
|------|------|
| `default` | 复选框标签内容 |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `change` | 选中值变化时触发 | `value: boolean \| 'indeterminate' \| undefined` |

通过 `v-model` 实现双向绑定。

## 示例

### 基础用法

```vue
<script setup lang="ts">
const checked = ref(false)
</script>

<template>
  <FaCheckbox v-model="checked">
    我已阅读并同意服务条款
  </FaCheckbox>
</template>
```

### 半选状态

```vue
<script setup lang="ts">
const checked = ref<boolean | 'indeterminate'>('indeterminate')
</script>

<template>
  <FaCheckbox v-model="checked">
    部分选中
  </FaCheckbox>
</template>
```

### 禁用状态

```vue
<script setup lang="ts">
const checked = ref(true)
</script>

<template>
  <div class="flex flex-col gap-2">
    <FaCheckbox disabled>
      禁用未选中
    </FaCheckbox>
    <FaCheckbox v-model="checked" disabled>
      禁用已选中
    </FaCheckbox>
  </div>
</template>
```

### 无标签复选框

```vue
<script setup lang="ts">
const checked = ref(false)
</script>

<template>
  <FaCheckbox v-model="checked" />
</template>
```

### 自定义样式

```vue
<script setup lang="ts">
const checked = ref(false)
</script>

<template>
  <FaCheckbox
    v-model="checked"
    class="gap-3"
    item-class="size-5 rounded-md"
    label-class="text-primary font-medium"
  >
    自定义样式
  </FaCheckbox>
</template>
```

## 注意事项

1. **单个使用**：`FaCheckbox` 只负责单个复选框，不承担组选项逻辑。
2. **v-model 类型**：支持 `boolean` 和 `'indeterminate'` 两种状态值。
3. **标签点击**：点击标签文字也能触发复选框状态切换。
4. **空标签隐藏**：当不提供默认插槽内容时，标签元素会自动隐藏。
5. **禁用状态**：禁用状态下复选框和标签都无法点击。
