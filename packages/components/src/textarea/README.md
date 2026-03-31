# FaTextarea 文本域组件

多行文本输入组件，支持前后缀插槽和自定义样式。

## 基础用法

```vue
<script setup lang="ts">
const value = ref('')
</script>

<template>
  <FaTextarea v-model="value" placeholder="请输入内容..." />
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `align` | `'inline' \| 'block'` | `'inline'` | 前后缀对齐方式 |
| `class` | `HTMLAttributes['class']` | - | 组件外层 CSS 类 |
| `inputClass` | `HTMLAttributes['class']` | - | 文本域 CSS 类 |
| `startClass` | `HTMLAttributes['class']` | - | 前缀区域 CSS 类 |
| `endClass` | `HTMLAttributes['class']` | - | 后缀区域 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `start` | 文本域前缀内容 |
| `end` | 文本域后缀内容 |

## Events

无

## Exposed Methods

无

## 示例

### 基础文本域

```vue
<script setup lang="ts">
const value = ref('')
</script>

<template>
  <FaTextarea v-model="value" placeholder="请输入描述..." rows="4" />
</template>
```

### 带前缀

```vue
<template>
  <FaTextarea v-model="value" placeholder="请输入内容">
    <template #start>
      <FaIcon name="i-lucide:message-square" />
    </template>
  </FaTextarea>
</template>
```

### 带后缀

```vue
<script setup lang="ts">
const value = ref('')

const charCount = computed(() => value.value?.length || 0)
</script>

<template>
  <FaTextarea v-model="value" placeholder="请输入内容（最多 200 字）" rows="4">
    <template #end>
      <span class="text-sm text-muted-foreground">{{ charCount }}/200</span>
    </template>
  </FaTextarea>
</template>
```

### 自定义高度

```vue
<template>
  <FaTextarea v-model="value" rows="6" class="h-200" />
</template>
```

### 表单中的使用

```vue
<script setup lang="ts">
const form = reactive({
  title: '',
  content: '',
})

function handleSubmit() {
  console.log('提交:', form)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
    <FaInput v-model="form.title" placeholder="标题" />
    <FaTextarea v-model="form.content" placeholder="内容描述..." rows="5" />
    <FaButton type="submit">提交</FaButton>
  </form>
</template>
```

### 字数限制

```vue
<script setup lang="ts">
const value = ref('')
const maxLength = 500

const charCount = computed(() => value.value?.length || 0)
const isOverLimit = computed(() => charCount.value > maxLength)
</script>

<template>
  <div>
    <FaTextarea
      v-model="value"
      :input-class="{ 'border-red-500': isOverLimit }"
      placeholder="请输入内容..."
      rows="5"
    >
      <template #end>
        <span :class="['text-sm', isOverLimit ? 'text-red-500' : 'text-muted-foreground']">
          {{ charCount }}/{{ maxLength }}
        </span>
      </template>
    </FaTextarea>
    <div v-if="isOverLimit" class="text-red-500 text-sm mt-1">
      已超出字数限制
    </div>
  </div>
</template>
```

### 禁用状态

```vue
<template>
  <FaTextarea v-model="value" disabled placeholder="禁用状态" />
</template>
```

## 注意事项

1. **v-model 绑定**：使用 `v-model` 实现双向数据绑定
2. **原生属性**：支持所有原生 textarea 属性（rows、cols、maxlength、readonly 等）
3. **自动调整**：可通过 CSS 实现自动高度调整
4. **对齐方式**：`align="block"` 时前后缀会上下排列
5. **滚动行为**：超出高度时自动显示滚动条

## 典型使用场景

- 文章/内容编辑器
- 评论输入框
- 意见反馈
- 多行表单字段
- 代码/文本展示
