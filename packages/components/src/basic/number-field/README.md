# FaNumberField 数字输入框

数字输入框组件，支持增减按钮和数值范围控制。

## 使用场景

- 数字输入框组件，支持增减按钮和数值范围控制。
- 常见用法：最小值 / 最大值 / 步长、禁用状态、带自定义宽度。

## Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `number` | `required` |
| min | 最小值 | `number` | `undefined` |
| max | 最大值 | `number` | `undefined` |
| step | 步长 | `number` | `undefined` |
| disabled | 是否禁用 | `boolean` | `false` |
| class | 自定义类名 | `HTMLAttributes['class']` | `undefined` |

## Slots

| 名称 | 说明 |
|------|------|
| - | 无插槽 |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值更新时触发 | `(value: number)` |

## 示例

### 基础用法

```vue
<script setup lang="ts">
const value = ref(0)
</script>

<template>
  <FaNumberField v-model="value" />
</template>
```

### 最小值 / 最大值 / 步长

```vue
<script setup lang="ts">
const value = ref(10)
</script>

<template>
  <FaNumberField v-model="value" :min="0" :max="100" :step="5" />
</template>
```

### 禁用状态

```vue
<script setup lang="ts">
const value = ref(50)
</script>

<template>
  <FaNumberField v-model="value" disabled />
</template>
```

### 带自定义宽度

```vue
<script setup lang="ts">
const value = ref(0)
</script>

<template>
  <FaNumberField v-model="value" class="w-[300px]" />
</template>
```

## 注意事项

- 无特殊限制，建议按示例中的受控方式接入，并结合业务容器尺寸验证最终展示效果。
