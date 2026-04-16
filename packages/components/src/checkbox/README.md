# FaCheckbox 复选框组件

简洁的复选框组件，支持双向绑定和标签内容插槽。

## 使用场景

- 表单中的同意协议选项
- 多选过滤条件
- 设置选项开关
- 列表项批量选择

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `disabled` | `boolean` | `false` | 是否禁用 |
| `class` | `HTMLAttributes['class']` | - | 自定义 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `default` | 复选框标签内容 |

## Events

通过 `v-model` 双向绑定，无需单独事件

## 示例

### 基础用法

```vue
<script setup lang="ts">
const checked = ref(false)
</script>

<template>
  <FaCheckbox v-model="checked">同意协议</FaCheckbox>
</template>
```

### 基础复选框

```vue
<script setup lang="ts">
const checked = ref(false)
</script>

<template>
  <FaCheckbox v-model="checked">选项</FaCheckbox>
</template>
```

### 禁用状态

```vue
<template>
  <FaCheckbox disabled>禁用选项</FaCheckbox>
  <FaCheckbox v-model="checked" disabled>禁用选中</FaCheckbox>
</template>
```

### 复选框组

```vue
<script setup lang="ts">
const hobbies = ref(['reading', 'music'])
</script>

<template>
  <div class="flex flex-col gap-2">
    <FaCheckbox v-model="hobbies" value="reading">阅读</FaCheckbox>
    <FaCheckbox v-model="hobbies" value="music">音乐</FaCheckbox>
    <FaCheckbox v-model="hobbies" value="sports">运动</FaCheckbox>
  </div>
</template>
```

### 无标签复选框

```vue
<template>
  <FaCheckbox v-model="checked" />
</template>
```

### 自定义样式

```vue
<template>
  <FaCheckbox v-model="checked" class="gap-4">
    <span class="text-primary font-medium">自定义样式</span>
  </FaCheckbox>
</template>
```

### 表单中的使用

```vue
<script setup lang="ts">
const form = reactive({
  agreeTerms: false,
  subscribe: true,
})

function handleSubmit() {
  if (!form.agreeTerms) {
    return
  }
  console.log('提交表单')
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <FaCheckbox v-model="form.agreeTerms">
      我已阅读并同意服务条款
    </FaCheckbox>
    <FaCheckbox v-model="form.subscribe">
      订阅我们的新闻通讯
    </FaCheckbox>
    <FaButton type="submit" :disabled="!form.agreeTerms">提交</FaButton>
  </form>
</template>
```

## 注意事项

1. **v-model 绑定**：支持单个 boolean 值和数组（多选）两种模式
2. **标签点击**：点击标签文字也能触发复选框状态切换
3. **空标签隐藏**：当不提供默认插槽内容时，标签元素会自动隐藏
4. **禁用状态**：禁用状态下复选框和标签都无法点击
5. **无障碍支持**：原生支持键盘操作（空格键切换状态）
