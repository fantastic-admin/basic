# FaKbd 键盘按键组件

用于展示键盘按键组合的视觉样式，常用于快捷键提示。

## 基础用法

```vue
<template>
  <FaKbd>⌘</FaKbd>
  <FaKbd>K</FaKbd>
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `class` | `HTMLAttributes['class']` | - | 自定义 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `default` | 按键内容（字符、图标等） |

## Events

无

## 示例

### 单个按键

```vue
<template>
  <FaKbd>⌘</FaKbd>
  <FaKbd>K</FaKbd>
  <FaKbd>Enter</FaKbd>
</template>
```

### 组合按键（与 FaKbdGroup 配合使用）

```vue
<template>
  <FaKbdGroup>
    <FaKbd>⌘</FaKbd>
    <FaKbd>K</FaKbd>
  </FaKbdGroup>
  
  <FaKbdGroup>
    <FaKbd>Ctrl</FaKbd>
    <FaKbd>Shift</FaKbd>
    <FaKbd>P</FaKbd>
  </FaKbdGroup>
</template>
```

### 带图标的快捷键

```vue
<template>
  <FaKbdGroup>
    <FaKbd>⌘</FaKbd>
    <FaIcon name="i-lucide:command" />
  </FaKbdGroup>
</template>
```

### 在提示文字中使用

```vue
<template>
  <div class="text-muted-foreground">
    按 <FaKbdGroup><FaKbd>⌘</FaKbd><FaKbd>K</FaKbd></FaKbdGroup> 快速搜索
  </div>
</template>
```

## 样式特点

- 小号字体（`text-xs`）
- 中等字重（`font-medium`）
- 圆角背景
- 内边距适当
- 支持 SVG 图标（自动调整尺寸）

## 注意事项

1. **配合使用**：组合按键时请使用 `FaKbdGroup` 包裹多个 `FaKbd`
2. **内容长度**：按键内容不宜过长，适合单个字符或简短单词
3. **图标支持**：可以使用 `FaIcon` 组件显示图标，图标会自动调整为合适尺寸

## 典型使用场景

- 快捷键提示
- 操作指南中的按键说明
- 命令面板的快捷键展示
- 帮助文档中的键盘操作说明
