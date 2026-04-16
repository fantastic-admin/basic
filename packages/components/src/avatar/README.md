# FaAvatar 头像组件

用户头像组件，支持图片加载失败时显示降级内容。

## 使用场景

- 用户头像显示
- 评论区头像
- 聊天消息头像
- 团队成员展示
- 个人中心头像
- 头像上传预览

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `src` | `string` | **必需** | 头像图片 URL |
| `fallback` | `string` | - | 图片加载失败时显示的文本（默认取前 2 个字符） |
| `class` | `HTMLAttributes['class']` | - | 自定义 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `default` | 自定义降级内容（覆盖 fallback） |

## 示例

### 基础用法

```vue
<template>
  <FaAvatar src="https://example.com/avatar.jpg" fallback="张三" />
</template>
```

### 基础头像

```vue
<template>
  <FaAvatar src="https://example.com/avatar.jpg" />
</template>
```

### 带降级文本

```vue
<template>
  <FaAvatar src="https://example.com/avatar.jpg" fallback="张三" />
  <FaAvatar src="invalid-url.jpg" fallback="李四" />
</template>
```

### 自定义降级内容

```vue
<template>
  <FaAvatar src="invalid-url.jpg">
    <FaIcon name="i-lucide:user" />
  </FaAvatar>
</template>
```

### 不同尺寸

```vue
<template>
  <FaAvatar src="https://example.com/avatar.jpg" class="size-8" />
  <FaAvatar src="https://example.com/avatar.jpg" class="size-10" />
  <FaAvatar src="https://example.com/avatar.jpg" class="size-12" />
  <FaAvatar src="https://example.com/avatar.jpg" class="size-16" />
</template>
```

### 圆形头像

```vue
<template>
  <FaAvatar src="https://example.com/avatar.jpg" class="rounded-full" />
</template>
```

### 头像列表

```vue
<template>
  <div class="flex -space-x-2">
    <FaAvatar src="https://example.com/avatar1.jpg" class="size-8 rounded-full ring-2 ring-white" />
    <FaAvatar src="https://example.com/avatar2.jpg" class="size-8 rounded-full ring-2 ring-white" />
    <FaAvatar src="https://example.com/avatar3.jpg" class="size-8 rounded-full ring-2 ring-white" />
    <FaAvatar fallback="+5" class="size-8 rounded-full ring-2 ring-white bg-muted" />
  </div>
</template>
```

### 带状态标识

```vue
<template>
  <div class="relative">
    <FaAvatar src="https://example.com/avatar.jpg" class="size-12 rounded-full" />
    <span class="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white" />
  </div>
</template>
```

## 注意事项

1. **图片加载失败**：当图片加载失败时，会自动显示 `fallback` 文本或自定义 slot 内容
2. **默认尺寸**：头像默认尺寸由 CSS 类控制，可通过 `class` 属性调整
3. **形状**：默认为圆角方形，添加 `rounded-full` 类可变为圆形
4. **降级文本**：`fallback` 默认只显示前 2 个字符
