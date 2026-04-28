# FaTooltip 文字提示

简洁的文字提示组件，鼠标悬停时显示说明文字。

## 使用场景

- 按钮功能说明
- 图标含义解释
- 表单字段提示
- 帮助信息
- 快捷操作提示
- 截断文字的完整内容展示

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `text` | `string` | `''` | 提示文字内容 |
| `delay` | `number` | `300` | 延迟显示时间（毫秒） |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | - | 弹出方向 |
| `align` | `'start' \| 'center' \| 'end'` | - | 对齐方式 |
| `disabled` | `boolean` | `false` | 是否禁用提示 |

## Slots

| 名称 | 说明 |
|------|------|
| `default` | 触发元素（必填） |
| `content` | 自定义提示内容 |

## 示例

### 基础用法

```vue
<template>
  <FaTooltip text="这是提示文字">
    <FaButton>悬停显示提示</FaButton>
  </FaTooltip>
</template>
```

### 基础提示

```vue
<template>
  <FaTooltip text="这是一个简单的提示">
    <FaButton>悬停我</FaButton>
  </FaTooltip>
</template>
```

### 不同弹出方向

```vue
<template>
  <div class="flex gap-4">
    <FaTooltip text="上方提示" side="top">
      <FaButton>上方</FaButton>
    </FaTooltip>
    <FaTooltip text="下方提示" side="bottom">
      <FaButton>下方</FaButton>
    </FaTooltip>
    <FaTooltip text="左侧提示" side="left">
      <FaButton>左侧</FaButton>
    </FaTooltip>
    <FaTooltip text="右侧提示" side="right">
      <FaButton>右侧</FaButton>
    </FaTooltip>
  </div>
</template>
```

### 自定义延迟

```vue
<template>
  <FaTooltip text="快速显示" :delay="100">
    <FaButton>快速提示</FaButton>
  </FaTooltip>
  <FaTooltip text="慢速显示" :delay="1000">
    <FaButton>慢速提示</FaButton>
  </FaTooltip>
</template>
```

### 自定义内容

```vue
<template>
  <FaTooltip>
    <FaIcon name="i-lucide:info" />
    <template #content>
      <div class="space-y-1">
        <p class="font-medium">提示标题</p>
        <p class="text-xs text-muted-foreground">这是自定义的提示内容，可以包含多行文字。</p>
      </div>
    </template>
  </FaTooltip>
</template>
```

### 禁用提示

```vue
<script setup lang="ts">
const showTooltip = ref(false)
</script>

<template>
  <FaTooltip text="提示内容" :disabled="!showTooltip">
    <FaButton>条件提示</FaButton>
  </FaTooltip>
</template>
```

### 图标提示

```vue
<template>
  <FaTooltip text="点击查看更多信息">
    <FaIcon name="i-lucide:help-circle" class="cursor-help" />
  </FaTooltip>
</template>
```

### 表单字段提示

```vue
<template>
  <FaLabel label="密码">
    <div class="flex items-center gap-2">
      <FaInput v-model="password" type="password" />
      <FaTooltip text="至少 8 位，包含字母和数字">
        <FaIcon name="i-lucide:help-circle" class="text-muted-foreground cursor-help" />
      </FaTooltip>
    </div>
  </FaLabel>
</template>
```

## 注意事项

1. **必需插槽**：必须提供 `default` slot 作为触发元素
2. **延迟显示**：默认 300ms 延迟，避免鼠标快速划过时误触发
3. **自动定位**：组件会自动调整位置避免超出视口
4. **内容简洁**：提示内容应简短明了，复杂内容建议使用 `FaPopover`
