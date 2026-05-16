# FaToast 轻提示

全局轻提示组件，用于展示操作反馈消息。

## 使用场景

- 表单提交反馈
- 操作成功/失败提示
- 删除确认反馈
- 上传/下载进度提示
- 系统通知
- 数据保存提示

## Props

无（通过 `useFaToast()` 函数调用配置）

## API

### useFaToast 方法

| 方法 | 说明 |
|------|------|
| `useFaToast()(message)` | 普通提示 |
| `useFaToast().success(message)` | 成功提示 |
| `useFaToast().error(message)` | 错误提示 |
| `useFaToast().warning(message)` | 警告提示 |
| `useFaToast().info(message)` | 信息提示 |
| `useFaToast().loading(message)` | 加载提示 |
| `useFaToast().promise(promise, options)` | Promise 提示 |

## 示例

### 基础用法

```vue
<script setup lang="ts">
function showToast() {
  useFaToast().success('操作成功！')
}
</script>

<template>
  <FaButton @click="showToast">显示成功提示</FaButton>
  <!-- 在应用根组件中添加 -->
  <FaToast />
</template>
```

### 成功提示

```vue
<script setup lang="ts">
function handleSuccess() {
  useFaToast().success('保存成功！')
}
</script>

<template>
  <FaButton @click="handleSuccess">保存</FaButton>
</template>
```

### 错误提示

```vue
<script setup lang="ts">
function handleError() {
  useFaToast().error('操作失败，请稍后重试')
}
</script>

<template>
  <FaButton @click="handleError">触发错误</FaButton>
</template>
```

### 警告提示

```vue
<script setup lang="ts">
function handleWarning() {
  useFaToast().warning('数据即将过期，请及时更新')
}
</script>

<template>
  <FaButton @click="handleWarning">警告提示</FaButton>
</template>
```

### 信息提示

```vue
<script setup lang="ts">
function handleInfo() {
  useFaToast().info('系统将于今晚 22:00 进行维护')
}
</script>

<template>
  <FaButton @click="handleInfo">信息提示</FaButton>
</template>
```

### 加载提示

```vue
<script setup lang="ts">
function handleLoading() {
  const loadingToast = useFaToast().loading('正在处理...')

  setTimeout(() => {
    useFaToast().dismiss(loadingToast)
    useFaToast().success('处理完成！')
  }, 2000)
}
</script>

<template>
  <FaButton @click="handleLoading">加载提示</FaButton>
</template>
```

### Promise 提示

```vue
<script setup lang="ts">
async function handlePromise() {
  useFaToast().promise(
    new Promise((resolve) => {
      setTimeout(resolve, 2000)
    }),
    {
      loading: '正在保存...',
      success: '保存成功！',
      error: '保存失败',
    }
  )
}
</script>

<template>
  <FaButton @click="handlePromise">Promise 提示</FaButton>
</template>
```

### 带描述的提示

```vue
<script setup lang="ts">
function handleDescription() {
  useFaToast().success('上传成功', {
    description: '文件已上传到服务器',
  })
}
</script>

<template>
  <FaButton @click="handleDescription">带描述的提示</FaButton>
</template>
```

### 带操作的提示

```vue
<script setup lang="ts">
function handleAction() {
  useFaToast().success('删除成功', {
    action: {
      label: '撤销',
      onClick: () => {
        // 撤销操作
        console.log('撤销删除')
      },
    },
  })
}
</script>

<template>
  <FaButton @click="handleAction">带操作的提示</FaButton>
</template>
```

### 多个提示

```vue
<script setup lang="ts">
function handleMultiple() {
  useFaToast().success('第一条消息')
  setTimeout(() => {
    useFaToast().error('第二条消息')
  }, 500)
  setTimeout(() => {
    useFaToast().warning('第三条消息')
  }, 1000)
}
</script>

<template>
  <FaButton @click="handleMultiple">显示多个提示</FaButton>
</template>
```

## 注意事项

1. **全局组件**：`<FaToast />` 需要在应用根组件中添加一次
2. **自动消失**：提示默认 3 秒后自动消失
3. **堆叠显示**：多个提示会堆叠显示
4. **可点击关闭**：每个提示都可以手动点击关闭
