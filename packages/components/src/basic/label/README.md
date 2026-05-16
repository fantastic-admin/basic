# FaLabel 标签

表单标签组件，支持固定宽度标签和自定义内容，用于表单字段的标签显示。

## 使用场景

- 表单字段标签
- 多列表单布局
- 需要固定标签宽度的表单
- 表单项的组合布局

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | `string` | - | 标签文本 |
| `labelWidth` | `string \| number` | - | 标签宽度（支持数字 px 或字符串） |
| `class` | `HTMLAttributes['class']` | - | 自定义 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `default` | 表单项内容（输入框、选择器等） |

## 示例

### 基础用法

```vue
<template>
  <FaLabel label="用户名">
    <FaInput v-model="username" />
  </FaLabel>
</template>
```

### 基础标签

```vue
<template>
  <FaLabel label="用户名">
    <FaInput v-model="form.username" />
  </FaLabel>
  <FaLabel label="邮箱">
    <FaInput v-model="form.email" />
  </FaLabel>
</template>
```

### 固定标签宽度（对齐多表单字段）

```vue
<template>
  <div class="space-y-4">
    <FaLabel label="用户名" :label-width="100">
      <FaInput v-model="form.username" />
    </FaLabel>
    <FaLabel label="邮箱地址" :label-width="100">
      <FaInput v-model="form.email" />
    </FaLabel>
    <FaLabel label="手机号" :label-width="100">
      <FaInput v-model="form.phone" />
    </FaLabel>
  </div>
</template>
```

### 使用字符串宽度

```vue
<template>
  <FaLabel label="用户名" label-width="120px">
    <FaInput v-model="form.username" />
  </FaLabel>
</template>
```

### 标签后内容

```vue
<template>
  <FaLabel label="密码">
    <div class="flex gap-2">
      <FaInput v-model="form.password" type="password" class="flex-1" />
      <FaButton variant="outline">生成</FaButton>
    </div>
  </FaLabel>
</template>
```

### 无标签文本（仅布局）

```vue
<template>
  <FaLabel>
    <FaCheckbox v-model="form.remember" />
    记住我
  </FaLabel>
</template>
```

## 注意事项

1. **labelWidth 类型**：
   - 数字：自动转换为 `px` 单位
   - 字符串：直接使用（如 `"120px"`, `"10em"`, `"8rem"` 等）

2. **标签对齐**：多个表单项使用相同的 `labelWidth` 可实现标签对齐

3. **无 label 属性**：不设置 `label` 属性时，仅作为布局容器使用
