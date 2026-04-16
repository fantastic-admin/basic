# FaImageUpload 图片上传组件

专门用于图片上传的组件，支持预览、排序和拖拽上传。

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
| `action` | `string` | **必需** | 上传接口地址 |
| `method` | `string` | `'post'` | 请求方法 |
| `headers` | `Headers \| Record<string, any>` | `{}` | 请求头 |
| `data` | `Record<string, any>` | `{}` | 额外表单数据 |
| `name` | `string` | `'file'` | 文件字段名 |
| `afterUpload` | `(response: any) => string \| Promise<string>` | - | 上传成功后处理函数 |
| `multiple` | `boolean` | `false` | 是否支持多选 |
| `ext` | `string[]` | `[]` | 允许的图片格式 |
| `max` | `number` | `1` | 最大上传数量 |
| `dimension` | `{ width: number, height: number }` | - | 建议图片尺寸 |
| `width` | `number` | `100` | 预览图宽度 (px) |
| `height` | `number` | `100` | 预览图高度 (px) |
| `size` | `number` | `5242880` (5MB) | 单张图片大小限制 |
| `hideTips` | `boolean` | `false` | 是否隐藏提示 |
| `disabled` | `boolean` | `false` | 是否禁用 |

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

## 示例

### 基础用法

```vue
<script setup lang="ts">
const images = ref([])
</script>

<template>
  <FaImageUpload 
    v-model="images"
    action="/api/upload"
  />
</template>
```

### 基础图片上传

```vue
<script setup lang="ts">
const images = ref([])
</script>

<template>
  <FaImageUpload 
    v-model="images"
    action="/api/upload"
  />
</template>
```

### 头像上传（单张）

```vue
<script setup lang="ts">
const avatar = ref([])
</script>

<template>
  <FaImageUpload 
    v-model="avatar"
    action="/api/upload"
    :max="1"
    :width="150"
    :height="150"
  />
</template>
```

### 多图上传

```vue
<script setup lang="ts">
const gallery = ref([])
</script>

<template>
  <FaImageUpload 
    v-model="gallery"
    action="/api/upload"
    multiple
    :max="9"
    :width="120"
    :height="120"
  />
</template>
```

### 限制图片格式

```vue
<script setup lang="ts">
const images = ref([])
</script>

<template>
  <FaImageUpload 
    v-model="images"
    action="/api/upload"
    :ext="['jpg', 'png', 'gif']"
  />
</template>
```

### 带尺寸提示

```vue
<script setup lang="ts">
const images = ref([])
</script>

<template>
  <FaImageUpload 
    v-model="images"
    action="/api/upload"
    :dimension="{ width: 800, height: 600 }"
    :max="1"
  />
</template>
```

### 处理上传结果

```vue
<script setup lang="ts">
const images = ref([])

function afterUpload(response: any) {
  // 假设后端返回 { code: 200, data: { url: '...' } }
  if (response.code === 200) {
    return response.data.url
  }
  throw new Error('上传失败')
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

### 商品图片上传

```vue
<script setup lang="ts">
const productImages = ref([])

function handleSuccess(response: any) {
  console.log('上传成功:', response)
}
</script>

<template>
  <FaCard title="商品图片">
    <FaImageUpload 
      v-model="productImages"
      action="/api/upload"
      multiple
      :max="9"
      :width="150"
      :height="150"
      :ext="['jpg', 'png', 'webp']"
      :size="3 * 1024 * 1024"
      @on-success="handleSuccess"
    />
    <p class="text-sm text-muted-foreground mt-2">
      建议尺寸 800x800，支持 JPG、PNG、WebP 格式，单张不超过 3MB
    </p>
  </FaCard>
</template>
```

### 自定义上传按钮

```vue
<script setup lang="ts">
const images = ref([])
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

### 带加载状态

```vue
<script setup lang="ts">
const images = ref([])
const uploading = ref(false)

function handleUploadStart() {
  uploading.value = true
}

function handleSuccess() {
  uploading.value = false
}
</script>

<template>
  <div>
    <FaImageUpload 
      v-model="images"
      action="/api/upload"
      @on-success="handleSuccess"
    />
    <div v-if="uploading" class="mt-2 text-sm text-muted-foreground">
      正在上传图片...
    </div>
  </div>
</template>
```

### 图片编辑表单

```vue
<script setup lang="ts">
const form = ref({
  title: '',
  cover: [],
  gallery: [],
})

function handleSubmit() {
  // 提交表单
  console.log(form.value)
}
</script>

<template>
  <form class="space-y-6">
    <FaInput v-model="form.title" label="标题" />
    
    <div>
      <FaLabel label="封面图片" />
      <FaImageUpload 
        v-model="form.cover"
        action="/api/upload"
        :max="1"
        :width="200"
        :height="150"
      />
    </div>
    
    <div>
      <FaLabel label="详情图片" />
      <FaImageUpload 
        v-model="form.gallery"
        action="/api/upload"
        multiple
        :max="9"
        :width="100"
        :height="100"
      />
    </div>
    
    <FaButton @click="handleSubmit">保存</FaButton>
  </form>
</template>
```

## 注意事项

1. **图片预览**：上传成功后可点击预览大图
2. **图片排序**：多图上传时可拖拽排序（通过左右箭头按钮）
3. **删除图片**：鼠标悬停显示删除按钮
4. **上传进度**：上传时显示进度条
5. **格式校验**：根据 `ext` 属性校验图片格式
6. **大小限制**：根据 `size` 属性校验图片大小
