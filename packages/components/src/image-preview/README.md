# FaImagePreview 图片预览组件

带加载状态和错误处理的图片预览组件，支持点击放大查看。

## 基础用法

```vue
<template>
  <FaImagePreview src="https://example.com/image.jpg" />
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `src` | `string` | **必需** | 图片 URL |
| `class` | `HTMLAttributes['class']` | - | 自定义 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `loading` | 自定义加载状态内容 |
| `error` | 自定义错误状态内容 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `load` | - | 图片加载成功时触发 |
| `error` | - | 图片加载失败时触发 |

## 示例

### 基础图片预览

```vue
<template>
  <FaImagePreview src="https://example.com/image.jpg" />
</template>
```

### 自定义尺寸

```vue
<template>
  <FaImagePreview src="https://example.com/image.jpg" class="w-64 h-48" />
  <FaImagePreview src="https://example.com/image.jpg" class="w-96 h-72" />
</template>
```

### 图片列表

```vue
<template>
  <div class="grid grid-cols-3 gap-4">
    <FaImagePreview 
      v-for="(image, index) in images" 
      :key="index"
      :src="image" 
    />
  </div>
</template>

<script setup lang="ts">
const images = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg',
]
</script>
```

### 自定义加载状态

```vue
<template>
  <FaImagePreview src="https://example.com/image.jpg">
    <template #loading>
      <div class="flex flex-col items-center gap-2">
        <FaIcon name="i-line-md:loading-twotone-loop" class="size-8 text-primary" />
        <span class="text-sm text-muted-foreground">加载中...</span>
      </div>
    </template>
  </FaImagePreview>
</template>
```

### 自定义错误状态

```vue
<template>
  <FaImagePreview src="invalid-url.jpg">
    <template #error>
      <div class="flex flex-col items-center gap-2">
        <FaIcon name="i-lucide:image-off" class="size-8 text-muted-foreground" />
        <span class="text-sm text-muted-foreground">加载失败</span>
      </div>
    </template>
  </FaImagePreview>
</template>
```

### 监听加载事件

```vue
<script setup lang="ts">
function handleLoad() {
  console.log('图片加载成功')
}

function handleError() {
  console.log('图片加载失败')
}
</script>

<template>
  <FaImagePreview 
    src="https://example.com/image.jpg" 
    @load="handleLoad"
    @error="handleError"
  />
</template>
```

### 头像式预览

```vue
<template>
  <FaImagePreview src="https://example.com/avatar.jpg" class="rounded-full" />
</template>
```

### 商品图片预览

```vue
<template>
  <FaCard title="商品图片">
    <div class="grid grid-cols-2 gap-4">
      <FaImagePreview 
        v-for="(image, index) in productImages" 
        :key="index"
        :src="image"
        class="aspect-square"
      />
    </div>
  </FaCard>
</template>

<script setup lang="ts">
const productImages = [
  'https://example.com/product1.jpg',
  'https://example.com/product2.jpg',
  'https://example.com/product3.jpg',
  'https://example.com/product4.jpg',
]
</script>
```

### 带描述的画廊

```vue
<template>
  <div class="grid grid-cols-3 gap-6">
    <div v-for="(photo, index) in photos" :key="index">
      <FaImagePreview :src="photo.url" class="w-full aspect-video" />
      <p class="text-sm text-center mt-2 text-muted-foreground">{{ photo.title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const photos = [
  { url: 'https://example.com/photo1.jpg', title: '风景 1' },
  { url: 'https://example.com/photo2.jpg', title: '风景 2' },
  { url: 'https://example.com/photo3.jpg', title: '风景 3' },
]
</script>
```

## 注意事项

1. **点击放大**：点击图片会自动打开全屏预览
2. **加载状态**：图片加载时显示 loading 图标
3. **错误处理**：加载失败时显示错误图标
4. **hover 效果**：鼠标悬停时图片会轻微放大
5. **响应式**：建议设置合适的尺寸或使用响应式类

## 典型使用场景

- 商品图片展示
- 用户头像预览
- 图片画廊
- 附件图片预览
- 缩略图列表
- 相册展示
