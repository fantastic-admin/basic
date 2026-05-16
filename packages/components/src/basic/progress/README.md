# FaProgress 进度条

线性进度条组件，展示任务的完成进度。

## 使用场景

- 文件上传/下载进度
- 任务处理进度
- 加载进度
- 安装/更新进度
- 表单提交进度
- 多步骤流程进度

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `class` | `HTMLAttributes['class']` | - | 自定义 CSS 类 |

### Model

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `modelValue` | `number` | `0` | 进度值（0-100） |

## 示例

### 基础用法

```vue
<script setup lang="ts">
const progress = ref(50)
</script>

<template>
  <FaProgress v-model="progress" />
</template>
```

### 基础进度条

```vue
<script setup lang="ts">
const progress = ref(60)
</script>

<template>
  <FaProgress v-model="progress" />
  <p class="text-sm text-muted-foreground mt-2">当前进度：{{ progress }}%</p>
</template>
```

### 不同进度值

```vue
<template>
  <div class="space-y-4">
    <FaProgress :model-value="25" />
    <FaProgress :model-value="50" />
    <FaProgress :model-value="75" />
    <FaProgress :model-value="100" />
  </div>
</template>
```

### 动态进度

```vue
<script setup lang="ts">
const progress = ref(0)
const timer = ref()

function startProgress() {
  progress.value = 0
  timer.value = setInterval(() => {
    progress.value += 10
    if (progress.value >= 100) {
      clearInterval(timer.value)
    }
  }, 500)
}

function resetProgress() {
  clearInterval(timer.value)
  progress.value = 0
}

onUnmounted(() => {
  clearInterval(timer.value)
})
</script>

<template>
  <div class="space-y-4">
    <FaProgress v-model="progress" />
    <div class="flex gap-2">
      <FaButton @click="startProgress">开始</FaButton>
      <FaButton variant="outline" @click="resetProgress">重置</FaButton>
    </div>
  </div>
</template>
```

### 自定义尺寸

```vue
<template>
  <div class="space-y-4">
    <FaProgress :model-value="50" class="h-2" />
    <FaProgress :model-value="50" class="h-4" />
    <FaProgress :model-value="50" class="h-6" />
  </div>
</template>
```

### 自定义颜色

```vue
<template>
  <div class="space-y-4">
    <FaProgress :model-value="50" class="h-2 [&>[data-slot=progress-indicator]]:bg-blue-500" />
    <FaProgress :model-value="50" class="h-2 [&>[data-slot=progress-indicator]]:bg-green-500" />
    <FaProgress :model-value="50" class="h-2 [&>[data-slot=progress-indicator]]:bg-purple-500" />
  </div>
</template>
```

### 带百分比显示

```vue
<script setup lang="ts">
const progress = ref(75)
</script>

<template>
  <div>
    <div class="flex justify-between text-sm mb-1">
      <span>上传进度</span>
      <span class="text-muted-foreground">{{ progress }}%</span>
    </div>
    <FaProgress v-model="progress" class="h-3" />
  </div>
</template>
```

### 多任务进度

```vue
<script setup lang="ts">
const tasks = ref([
  { name: '上传文件', progress: 100 },
  { name: '处理数据', progress: 60 },
  { name: '生成报告', progress: 30 },
])
</script>

<template>
  <div class="space-y-4">
    <div v-for="task in tasks" :key="task.name" class="space-y-1">
      <div class="flex justify-between text-sm">
        <span>{{ task.name }}</span>
        <span class="text-muted-foreground">{{ task.progress }}%</span>
      </div>
      <FaProgress v-model="task.progress" class="h-2" />
    </div>
  </div>
</template>
```

### 文件上传进度

```vue
<script setup lang="ts">
const uploadProgress = ref(0)

function handleUpload() {
  // 模拟上传
  const timer = setInterval(() => {
    uploadProgress.value += 10
    if (uploadProgress.value >= 100) {
      clearInterval(timer)
    }
  }, 300)
}
</script>

<template>
  <FaCard title="文件上传">
    <div v-if="uploadProgress > 0 && uploadProgress < 100" class="space-y-2">
      <div class="flex justify-between text-sm">
        <span>uploading_file.zip</span>
        <span class="text-muted-foreground">{{ uploadProgress }}%</span>
      </div>
      <FaProgress v-model="uploadProgress" class="h-2" />
    </div>
    <div v-else-if="uploadProgress === 100" class="flex items-center gap-2 text-green-600">
      <FaIcon name="i-lucide:check-circle" />
      <span>上传完成</span>
    </div>
    <FaButton v-else @click="handleUpload">选择文件上传</FaButton>
  </FaCard>
</template>
```

## 注意事项

1. **进度范围**：进度值范围为 0-100
2. **动画效果**：进度变化时有平滑的过渡动画
3. **自定义样式**：可通过 CSS 类自定义高度、颜色等
4. **双向绑定**：支持 `v-model` 双向绑定
