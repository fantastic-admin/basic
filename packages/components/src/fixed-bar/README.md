# FaFixedBar 固定栏

固定在页面顶部或底部的栏位组件，适用于展示操作栏、筛选条件等内容。

## 基础用法

### 固定在顶部

```vue
<template>
  <FaFixedBar position="top">
    <div class="flex items-center gap-4">
      <FaInput v-model="keyword" placeholder="搜索..." />
      <FaButton>搜索</FaButton>
    </div>
  </FaFixedBar>
</template>
```

### 固定在底部

```vue
<template>
  <FaFixedBar position="bottom">
    <div class="flex justify-end gap-2">
      <FaButton variant="outline">取消</FaButton>
      <FaButton type="primary">确认提交</FaButton>
    </div>
  </FaFixedBar>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| position | 固定位置 | `'top' \| 'bottom'` | `required` |
| class | 自定义类名 | `HTMLAttributes['class']` | `undefined` |

### Slots

| 名称 | 说明 |
|------|------|
| default | 默认插槽，固定栏内容 |

## 示例

### 顶部筛选栏

```vue
<script setup lang="ts">
const filters = ref([50])
</script>

<template>
  <FaFixedBar position="top">
    <div class="flex items-center gap-4">
      <span class="text-sm font-bold">透明度：</span>
      <FaSlider v-model="filters" :min="0" :max="100" />
      <span class="text-sm w-12">{{ filters[0] }}%</span>
    </div>
  </FaFixedBar>

  <!-- 页面内容 -->
  <div class="pt-20">
    <div v-for="i in 50" :key="i" class="h-24 border-b">
      内容 {{ i }}
    </div>
  </div>
</template>
```

### 底部操作栏

```vue
<template>
  <FaPageMain title="订单详情">
    <div v-for="i in 30" :key="i" class="py-4 border-b">
      订单项 {{ i }}
    </div>
  </FaPageMain>

  <FaFixedBar position="bottom">
    <div class="flex items-center justify-between w-full">
      <div>
        <span class="text-sm text-muted-foreground">合计：</span>
        <span class="text-xl font-bold text-primary">¥ 1,234.00</span>
      </div>
      <div class="flex gap-2">
        <FaButton variant="outline">联系客服</FaButton>
        <FaButton type="primary">立即支付</FaButton>
      </div>
    </div>
  </FaFixedBar>
</template>
```

### 顶部搜索栏

```vue
<script setup lang="ts">
const keyword = ref('')
const searchHistory = ref([])
</script>

<template>
  <FaFixedBar position="top">
    <div class="flex items-center gap-2">
      <FaInput
        v-model="keyword"
        placeholder="输入关键词搜索"
        class="w-64"
        @enter="search"
      />
      <FaButton @click="search">
        <FaIcon name="i-heroicons:magnifying-glass" />
      </FaButton>
    </div>
  </FaFixedBar>

  <div class="pt-16">
    <!-- 搜索结果列表 -->
  </div>
</template>
```

### 底部表单提交栏

```vue
<script setup lang="ts">
const formData = ref({})
const isSubmitting = ref(false)

async function submit() {
  isSubmitting.value = true
  try {
    await saveData(formData.value)
    faToast.success('保存成功')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <FaPageMain title="编辑资料">
    <div class="space-y-4 pb-20">
      <FaFormItem label="姓名">
        <FaInput v-model="formData.name" />
      </FaFormItem>
      <FaFormItem label="邮箱">
        <FaInput v-model="formData.email" />
      </FaFormItem>
      <!-- 更多表单项 -->
    </div>
  </FaPageMain>

  <FaFixedBar position="bottom">
    <div class="flex justify-end gap-2">
      <FaButton variant="outline" @click="reset">重置</FaButton>
      <FaButton
        type="primary"
        :loading="isSubmitting"
        @click="submit"
      >
        保存修改
      </FaButton>
    </div>
  </FaFixedBar>
</template>
```

## 注意事项

1. 固定栏会自动计算侧边栏宽度并适配
2. 顶部固定栏在静态顶栏模式下会跟随滚动
3. 移动端模式下全宽显示
4. 建议给内容区域添加对应的 padding 避免遮挡
