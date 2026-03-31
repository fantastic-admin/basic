# FaHoverCard 悬浮卡片组件

鼠标悬停时显示的卡片，用于展示额外信息。

## 基础用法

```vue
<template>
  <FaHoverCard>
    <a href="#">悬停我</a>
    <template #card>
      <div class="p-4">
        <p>悬浮卡片内容</p>
      </div>
    </template>
  </FaHoverCard>
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `align` | `'start' \| 'end' \| 'center'` | `'center'` | 水平对齐方式 |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | 弹出方向 |
| `sideOffset` | `number` | `4` | 与触发元素的偏移距离 |
| `alignOffset` | `number` | `0` | 对齐偏移量 |
| `collisionPadding` | `number` | `0` | 与视口边缘的碰撞内边距 |
| `class` | `HTMLAttributes['class']` | - | 卡片 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `default` | 触发元素（必填） |
| `card` | 悬浮卡片内容 |

## Events

无

## 示例

### 基础悬浮卡片

```vue
<template>
  <FaHoverCard>
    <a href="#" class="text-primary hover:underline">@张三</a>
    <template #card>
      <div class="p-4 w-64">
        <div class="flex items-center gap-3">
          <FaAvatar src="https://example.com/avatar.jpg" class="size-10 rounded-full" />
          <div>
            <p class="font-medium">张三</p>
            <p class="text-sm text-muted-foreground">@zhangsan</p>
          </div>
        </div>
      </div>
    </template>
  </FaHoverCard>
</template>
```

### 链接预览

```vue
<template>
  <FaHoverCard>
    <a href="https://github.com" class="text-primary hover:underline">GitHub</a>
    <template #card>
      <div class="p-4 w-80">
        <div class="flex items-start gap-3">
          <FaIcon name="i-ri:github-fill" class="size-8" />
          <div>
            <p class="font-medium">GitHub</p>
            <p class="text-sm text-muted-foreground mt-1">
              全球最大的代码托管平台，提供代码仓库、Issue 跟踪、CI/CD 等功能。
            </p>
          </div>
        </div>
      </div>
    </template>
  </FaHoverCard>
</template>
```

### 图片预览

```vue
<template>
  <FaHoverCard>
    <img src="https://example.com/thumb.jpg" class="w-32 rounded cursor-pointer" />
    <template #card>
      <img src="https://example.com/large.jpg" class="w-80 rounded" />
    </template>
  </FaHoverCard>
</template>
```

### 日期悬停提示

```vue
<template>
  <FaHoverCard>
    <span class="border-b border-dotted cursor-help">2024-01-15</span>
    <template #card>
      <div class="p-3">
        <p class="text-sm">2024 年 1 月 15 日 星期一</p>
        <p class="text-xs text-muted-foreground mt-1">距今 30 天</p>
      </div>
    </template>
  </FaHoverCard>
</template>
```

### 不同弹出方向

```vue
<template>
  <div class="space-y-8 p-8">
    <div class="flex gap-4">
      <FaHoverCard side="top">
        <FaButton>上方弹出</FaButton>
        <template #card>上方内容</template>
      </FaHoverCard>
      <FaHoverCard side="bottom">
        <FaButton>下方弹出</FaButton>
        <template #card>下方内容</template>
      </FaHoverCard>
    </div>
    <div class="flex gap-4">
      <FaHoverCard side="left">
        <FaButton>左侧弹出</FaButton>
        <template #card>左侧内容</template>
      </FaHoverCard>
      <FaHoverCard side="right">
        <FaButton>右侧弹出</FaButton>
        <template #card>右侧内容</template>
      </FaHoverCard>
    </div>
  </div>
</template>
```

### 用户详细信息

```vue
<template>
  <FaHoverCard>
    <div class="flex items-center gap-3 cursor-pointer">
      <FaAvatar src="https://example.com/avatar.jpg" class="size-10 rounded-full" />
      <div>
        <p class="font-medium">张三</p>
        <p class="text-sm text-muted-foreground">产品经理</p>
      </div>
    </div>
    <template #card>
      <div class="p-4 w-72">
        <div class="flex items-center gap-3 mb-3">
          <FaAvatar src="https://example.com/avatar.jpg" class="size-12 rounded-full" />
          <div>
            <p class="font-medium">张三</p>
            <p class="text-sm text-muted-foreground">zhangsan@example.com</p>
          </div>
        </div>
        <div class="space-y-2 text-sm">
          <p><strong>部门：</strong>产品部</p>
          <p><strong>职位：</strong>高级产品经理</p>
          <p><strong>入职时间：</strong>2020-03-15</p>
        </div>
      </div>
    </template>
  </FaHoverCard>
</template>
```

## 注意事项

1. **触发元素**：必须提供 `default` slot 作为触发元素
2. **自动延迟**：默认有短暂的延迟才显示，避免鼠标划过时误触发
3. **自动定位**：组件会自动调整位置避免超出视口
4. **内容宽度**：卡片内容建议设置合适的宽度

## 典型使用场景

- 用户信息预览
- 链接/引用预览
- 术语解释
- 图片放大预览
- 日期/时间详情
- 标签详情
