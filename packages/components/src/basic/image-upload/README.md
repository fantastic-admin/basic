# FaImageUpload 图片上传

专门用于图片上传的组件，支持预览、排序、粘贴上传、自定义上传请求和文件夹上传。

## 使用场景

- 用户头像上传
- 商品图片上传
- 文章配图上传
- 相册图片上传
- 证据/凭证图片上传
- Banner 图上传

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `action` | `string` | `''` | 默认上传请求地址，使用 `httpRequest` 时可不传 |
| `method` | `string` | `'post'` | 默认上传请求方法 |
| `headers` | `Headers \| Record<string, any>` | `{}` | 默认上传请求头 |
| `data` | `Record<string, any>` | `{}` | 默认上传附加表单数据 |
| `name` | `string` | `'file'` | 默认上传文件字段名 |
| `afterUpload` | `(response: any) => string \| Promise<string>` | - | 上传成功后从响应中提取图片 URL |
| `beforeUpload` | `(file: File) => boolean \| Promise<boolean>` | - | 上传前钩子，返回 `false` 时跳过该文件 |
| `httpRequest` | `(options: UploadRequestOptions) => any \| Promise<any>` | - | 自定义上传请求，返回值会传给 `afterUpload` 和 `onSuccess` |
| `multiple` | `boolean` | `false` | 是否支持多选文件 |
| `max` | `number` | `1` | 最大上传数量，`0` 表示不限制 |
| `width` | `number` | `100` | 预览图宽度 (px) |
| `height` | `number` | `100` | 预览图高度 (px) |
| `directory` | `boolean` | `false` | 是否选择文件夹；启用后只能选择文件夹，文件夹内文件会扁平化上传 |
| `disabled` | `boolean` | `false` | 是否禁用 |

```ts
interface UploadRequestOptions {
  action: string
  method: string
  headers: Headers | Record<string, any>
  data: Record<string, any>
  name: string
  file: File
  onProgress: (percent: number) => void
}
```

### Model

| 名称 | 类型 | 说明 |
|------|------|------|
| `modelValue` | `string[]` | 已上传图片 URL 列表（必需） |

## Slots

| 名称 | 说明 |
|------|------|
| `default` | 自定义上传按钮内容 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `onSuccess` | `response: any, file: File` | 单张图片上传成功时触发 |

## 粘贴上传

将鼠标移入当前组件，或通过 `Tab` 聚焦当前组件后，可直接按 `Ctrl+V` / `Cmd+V` 粘贴剪贴板中的图片。启用 `directory` 后，粘贴上传不可用。

## 示例

### 基础用法

```vue
<script setup lang="ts">
const images = ref<string[]>([])

function afterUpload(response: any) {
  return response.url
}
</script>

<template>
  <FaImageUpload
    v-model="images"
    action="/api/upload"
    :after-upload="afterUpload"
  />
</template>
```

### 多图上传

```vue
<script setup lang="ts">
const gallery = ref<string[]>([])

function afterUpload(response: any) {
  return response.data.url
}
</script>

<template>
  <FaImageUpload
    v-model="gallery"
    action="/api/upload"
    multiple
    :max="9"
    :width="120"
    :height="120"
    :after-upload="afterUpload"
  />
</template>
```

### 上传前校验

组件不再内置图片格式、大小或尺寸校验。如需校验，请通过 `beforeUpload` 实现。

```vue
<script setup lang="ts">
const images = ref<string[]>([])

function beforeUpload(file: File) {
  const isImage = file.type.startsWith('image/')
  const isLt3M = file.size <= 3 * 1024 * 1024

  if (!isImage) {
    useFaToast().error('只能上传图片')
    return false
  }
  if (!isLt3M) {
    useFaToast().error('图片不能超过 3MB')
    return false
  }
  return true
}

function afterUpload(response: any) {
  return response.url
}
</script>

<template>
  <FaImageUpload
    v-model="images"
    action="/api/upload"
    :before-upload="beforeUpload"
    :after-upload="afterUpload"
  />
</template>
```

### 自定义上传请求

```vue
<script setup lang="ts">
const images = ref<string[]>([])

async function httpRequest({ file, onProgress }: any) {
  onProgress(20)

  const formData = new FormData()
  formData.append('image', file)

  const response = await fetch('/api/custom-upload', {
    method: 'POST',
    body: formData,
  })

  onProgress(100)
  return await response.json()
}

function afterUpload(response: any) {
  return response.data.url
}
</script>

<template>
  <FaImageUpload
    v-model="images"
    :http-request="httpRequest"
    :after-upload="afterUpload"
  />
</template>
```

### 文件夹上传

启用 `directory` 后，文件选择器只能选择文件夹。选择文件夹后，文件夹内的文件会作为扁平文件列表逐个上传。

```vue
<script setup lang="ts">
const images = ref<string[]>([])

function afterUpload(response: any) {
  return response.url
}
</script>

<template>
  <FaImageUpload
    v-model="images"
    action="/api/upload"
    directory
    :max="0"
    :after-upload="afterUpload"
  />
</template>
```

### 自定义上传按钮

```vue
<script setup lang="ts">
const images = ref<string[]>([])
</script>

<template>
  <FaImageUpload v-model="images" action="/api/upload">
    <div class="flex flex-col items-center justify-center size-full">
      <FaIcon name="i-lucide:image-plus" class="text-3xl text-primary mb-2" />
      <span class="text-sm text-muted-foreground">添加图片</span>
    </div>
  </FaImageUpload>
</template>
```

## 注意事项

1. **图片预览**：上传成功后可点击预览大图。
2. **图片排序**：多图上传时可通过左右箭头调整顺序。
3. **删除图片**：鼠标悬停显示删除按钮。
4. **上传进度**：默认上传请求会自动更新进度；自定义 `httpRequest` 可调用 `onProgress` 更新进度。
5. **上传校验**：组件不再内置格式、大小、尺寸校验，请使用 `beforeUpload` 自行处理。
