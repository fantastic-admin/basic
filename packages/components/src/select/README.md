# FaSelect 选择器组件

下拉选择器组件，支持单选、多选、分组和自定义选项。

## 使用场景

- 表单下拉选择
- 筛选条件选择
- 城市/地区选择
- 分类/标签选择
- 单选/多选配置项

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `multiple` | `boolean` | `false` | 是否多选 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `options` | `(Option \| GroupOption)[]` | **必需** | 选项数据 |
| `placeholder` | `string` | - | 占位提示文本 |
| `class` | `HTMLAttributes['class']` | - | 自定义 CSS 类 |

### Option 接口

```ts
interface Option {
  label: string
  value: AcceptableValue
  disabled?: boolean
}
```

### GroupOption 接口（分组选项）

```ts
interface GroupOption {
  label: string
  options: Option[]
}
```

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `change` | 选项变化时触发 | `value: AcceptableValue \| undefined` |

## 示例

### 基础用法

```vue
<script setup lang="ts">
const value = ref('')

const options = [
  { label: '选项 1', value: '1' },
  { label: '选项 2', value: '2' },
  { label: '选项 3', value: '3' },
]
</script>

<template>
  <FaSelect v-model="value" :options placeholder="请选择..." />
</template>
```

### 基础单选

```vue
<script setup lang="ts">
const value = ref('')

const options = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
]
</script>

<template>
  <FaSelect v-model="value" :options placeholder="选择城市" />
</template>
```

### 禁用选项

```vue
<script setup lang="ts">
const value = ref('')

const options = [
  { label: '选项 1', value: '1' },
  { label: '选项 2', value: '2', disabled: true },
  { label: '选项 3', value: '3' },
]
</script>

<template>
  <FaSelect v-model="value" :options placeholder="请选择" />
</template>
```

### 分组选项

```vue
<script setup lang="ts">
const value = ref('')

const options = [
  {
    label: '热门城市',
    options: [
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '广州', value: 'guangzhou' },
    ],
  },
  {
    label: '其他城市',
    options: [
      { label: '成都', value: 'chengdu' },
      { label: '杭州', value: 'hangzhou' },
      { label: '武汉', value: 'wuhan' },
    ],
  },
]
</script>

<template>
  <FaSelect v-model="value" :options placeholder="选择城市" />
</template>
```

### 变化事件

```vue
<script setup lang="ts">
const value = ref('')

const options = [
  { label: '选项 1', value: '1' },
  { label: '选项 2', value: '2' },
  { label: '选项 3', value: '3' },
]

function handleChange(value) {
  console.log('选中值变化:', value)
}
</script>

<template>
  <FaSelect v-model="value" :options placeholder="请选择" @change="handleChange" />
</template>
```

### 禁用选择器

```vue
<template>
  <FaSelect v-model="value" :options disabled />
</template>
```

### 表单中使用

```vue
<script setup lang="ts">
const form = reactive({
  city: '',
  district: '',
})

const cities = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
]
</script>

<template>
  <form>
    <div class="flex flex-col gap-4">
      <FaSelect v-model="form.city" :options="cities" placeholder="选择城市" />
      <FaSelect v-model="form.district" :options="districts" placeholder="选择区域" :disabled="!form.city" />
    </div>
  </form>
</template>
```

## 注意事项

1. **v-model 绑定**：使用 `v-model` 实现双向数据绑定
2. **选项数据结构**：`options` 支持普通选项和分组选项两种格式
3. **值类型**：`value` 可以是字符串、数字等类型
4. **分组显示**：当 `options` 中包含 `options` 属性时，会自动识别为分组选项
5. **z-index**：下拉菜单的 z-index 默认为 2000，确保在其他内容上方显示
