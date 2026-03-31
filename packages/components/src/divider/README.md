# FaDivider 分割线组件

带文字内容的分割线组件，支持文字位置调整。

## 基础用法

```vue
<template>
  <FaDivider />
  <FaDivider>分割文字</FaDivider>
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `position` | `'start' \| 'end'` | - | 文字位置（起始或末尾） |
| `class` | `HTMLAttributes['class']` | - | 自定义 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `default` | 分割线中间的文字内容 |

## Events

无

## 示例

### 基础分割线

```vue
<template>
  <div>内容上方</div>
  <FaDivider />
  <div>内容下方</div>
</template>
```

### 带文字的分割线

```vue
<template>
  <FaDivider>更多信息</FaDivider>
</template>
```

### 文字在起始位置

```vue
<template>
  <FaDivider position="start">起始位置</FaDivider>
</template>
```

### 文字在末尾位置

```vue
<template>
  <FaDivider position="end">末尾位置</FaDivider>
</template>
```

### 带图标的分割线

```vue
<template>
  <FaDivider>
    <span class="flex items-center gap-2">
      <FaIcon name="i-lucide:star" />
      推荐内容
    </span>
  </FaDivider>
</template>
```

### 多个分割线

```vue
<template>
  <div>第一部分</div>
  <FaDivider>第二章</FaDivider>
  <div>第二部分</div>
  <FaDivider>第三章</FaDivider>
  <div>第三部分</div>
</template>
```

### 自定义样式

```vue
<template>
  <FaDivider class="text-primary">
    彩色文字
  </FaDivider>
  <FaDivider class="my-8">
    大间距
  </FaDivider>
</template>
```

## 注意事项

1. **文字居中**：默认情况下文字居中显示
2. **自动布局**：文字两侧的线条会自动填充剩余空间
3. **无文字时**：不提供 slot 内容时，显示为一条完整的分割线
4. **间距**：默认上下边距为 `1rem`（`my-4`）

## 典型使用场景

- 章节分隔
- 内容区域分割
- 表单分组标题
- 列表分隔
- 页面内容分区
