# FaFileUpload 文件上传组件

支持拖拽、点击和粘贴上传的文件上传组件，带进度显示和文件管理功能。

## 使用场景

- 头像/图片上传
- 附件文件上传
- 批量文件上传
- 资料文件上传
- 证据/凭证上传
- 文档上传

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `action` | `string` | **必需** | 上传接口地址 |
| `method` | `string` | `'post'` | 请求方法 |
| `headers` | `Headers \| Record<string, any>` | `{}` | 请求头 |
| `data` | `Record<string, any>` | `{}` | 额外表单数据 |
| `name` | `string` | `'file'` | 文件字段名 |
| `afterUpload` | `(response: any) => string \| Promise<string>` | - | 上传成功后的处理函数，返回文件 URL |
| `multiple` | `boolean` | `false` | 是否支持多选 |
| `ext` | `string[]` | `[]` | 允许的文件扩展名 |
| `size` | `number` | `10485760` (10MB) | 单个文件大小限制（字节） |
| `max` | `number` | `0` (无限制) | 最大上传数量 |
| `hideTips` | `boolean` | `false` | 是否隐藏提示信息 |
| `disabled` | `boolean` | `false` | 是否禁用 |

### Model

| 名称 | 类型 | 说明 |
|------|------|------|
| `modelValue` | `FileItem[]` | 已上传的文件列表（必需） |

### FileItem 接口

```ts
interface FileItem {
  name: string
  size: number
  url?: string
  status?: 'uploading' | 'success' | 'error'
  progress?: number
  file?: File
}
```

## Slots

| 名称 | 说明 |
|------|------|
| `default` | 自定义上传区域内容 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `onSuccess` | `response: any, file: File` | 单个文件上传成功时触发 |
| `onClick` | `fileItem: FileItem, index: number` | 点击文件项时触发 |

## 粘贴上传

将鼠标移入当前组件，或通过 `Tab` 聚焦当前组件后，可直接按 `Ctrl+V` / `Cmd+V` 粘贴剪贴板中的文件。粘贴上传会复用组件现有的数量、格式和大小校验逻辑。

## 示例

### 基础用法

```vue
<script setup lang="ts">
const fileList = ref([])
</script>

<template>
  <FaFileUpload 
    v-model="fileList"
    action="/api/upload"
  />
</template>
```

### 基础上传

```vue
<script setup lang="ts">
const fileList = ref([])
</script>

<template>
  <FaFileUpload 
    v-model="fileList"
    action="/api/upload"
  />
</template>
```

### 限制文件类型

```vue
<script setup lang="ts">
const fileList = ref([])
</script>

<template>
  <FaFileUpload 
    v-model="fileList"
    action="/api/upload"
    :ext="['jpg', 'png', 'gif']"
  />
</template>
```

### 限制文件大小

```vue
<script setup lang="ts">
const fileList = ref([])
const maxSize = 5 * 1024 * 1024 // 5MB
</script>

<template>
  <FaFileUpload 
    v-model="fileList"
    action="/api/upload"
    :size="maxSize"
  />
</template>
```

### 限制上传数量

```vue
<script setup lang="ts">
const fileList = ref([])
</script>

<template>
  <FaFileUpload 
    v-model="fileList"
    action="/api/upload"
    :max="3"
    multiple
  />
</template>
```

### 多选上传

```vue
<script setup lang="ts">
const fileList = ref([])
</script>

<template>
  <FaFileUpload 
    v-model="fileList"
    action="/api/upload"
    multiple
  />
</template>
```

### 带额外参数

```vue
<script setup lang="ts">
const fileList = ref([])
const token = useToken()
</script>

<template>
  <FaFileUpload 
    v-model="fileList"
    action="/api/upload"
    method="post"
    :headers="{ Authorization: token.value }"
    :data="{ userId: 123, type: 'avatar' }"
  />
</template>
```

### 处理上传结果

```vue
<script setup lang="ts">
const fileList = ref([])

function afterUpload(response: any) {
  // 假设后端返回 { code: 200, data: { url: '...' } }
  if (response.code === 200) {
    return response.data.url
  }
  throw new Error('上传失败')
}
</script>

<template>
  <FaFileUpload 
    v-model="fileList"
    action="/api/upload"
    :after-upload="afterUpload"
  />
</template>
```

### 监听上传成功

```vue
<script setup lang="ts">
const fileList = ref([])

function handleSuccess(response: any, file: File) {
  console.log('上传成功:', response)
  console.log('文件:', file)
}
</script>

<template>
  <FaFileUpload 
    v-model="fileList"
    action="/api/upload"
    @on-success="handleSuccess"
  />
</template>
```

### 自定义上传区域

```vue
<script setup lang="ts">
const fileList = ref([])
</script>

<template>
  <FaFileUpload 
    v-model="fileList"
    action="/api/upload"
  >
    <div class="flex flex-col items-center justify-center h-48">
      <FaIcon name="i-lucide:cloud-upload" class="text-4xl text-primary mb-4" />
      <p class="text-sm text-muted-foreground">点击或拖拽文件到此处上传</p>
    </div>
  </FaFileUpload>
</template>
```

### 头像上传

```vue
<script setup lang="ts">
const fileList = ref([])

function handleClick(fileItem: FileItem) {
  if (fileItem.url) {
    // 预览头像
    window.open(fileItem.url)
  }
}
</script>

<template>
  <FaFileUpload 
    v-model="fileList"
    action="/api/upload"
    :ext="['jpg', 'png']"
    :size="2 * 1024 * 1024"
    :max="1"
    @on-click="handleClick"
  />
</template>
```

### 附件上传列表

```vue
<script setup lang="ts">
const fileList = ref<FileItem[]>([])

function handleFileClick(fileItem: FileItem) {
  if (fileItem.url) {
    window.open(fileItem.url, '_blank')
  }
}
</script>

<template>
  <FaFileUpload 
    v-model="fileList"
    action="/api/upload"
    multiple
    :max="10"
    @on-click="handleFileClick"
  />
</template>
```

## 注意事项

1. **文件列表**：`modelValue` 是必需的双向绑定属性
2. **上传进度**：上传过程中会显示进度条
3. **状态显示**：上传中/成功/失败状态会自动显示
4. **重新上传**：失败的文件可以点击重试
5. **删除文件**：上传成功的文件可以删除
6. **拖拽上传**：支持拖拽文件到上传区域
