# FaSlider 滑块

滑块组件，基于 Reka UI 的 Slider 组件封装，支持单选和多选。

## 使用场景

- 滑块组件，基于 Reka UI 的 Slider 组件封装，支持单选和多选。
- 常见用法：垂直滑块、范围选择、自定义步长。

## Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `number[]` | - |
| defaultValue | 默认值 | `number[]` | `[0]` |
| disabled | 是否禁用 | `boolean` | `false` |
| inverted | 是否反转 | `boolean` | `false` |
| max | 最大值 | `number` | `100` |
| min | 最小值 | `number` | `0` |
| step | 步长 | `number` | `1` |
| orientation | 朝向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| thumbAlignment | 滑块对齐方式 | `'contain' \| 'cover'` | `'contain'` |
| tooltip | 是否显示提示 | `boolean` | `true` |

## Slots

| 名称 | 说明 |
|------|------|
| - | 无插槽 |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值更新时触发 | `(value: number[])` |

## 示例

### 基础用法

```vue
<script setup lang="ts">
const value = ref<number[]>([0])
</script>

<template>
  <FaSlider v-model="value" />
</template>
```

### 垂直滑块

```vue
<script setup lang="ts">
const value = ref<number[]>([0])
</script>

<template>
  <FaSlider v-model="value" orientation="vertical" />
</template>
```

### 范围选择

```vue
<script setup lang="ts">
const value = ref<number[]>([20, 60])
</script>

<template>
  <FaSlider v-model="value" :min="0" :max="100" />
</template>
```

### 自定义步长

```vue
<script setup lang="ts">
const value = ref<number[]>([50])
</script>

<template>
  <FaSlider v-model="value" :step="10" :min="0" :max="100" />
</template>
```

## 注意事项

- 无特殊限制，建议按示例中的受控方式接入，并结合业务容器尺寸验证最终展示效果。
