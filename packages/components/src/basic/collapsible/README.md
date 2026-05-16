# FaCollapsible 折叠面板

可折叠的内容面板，支持展开/收起动画。

## 使用场景

- FAQ 问答列表
- 手风琴菜单
- 可展开的详情区域
- 目录折叠
- 高级筛选条件展开

## Props

### Model

| 名称 | 类型 | 说明 |
|------|------|------|
| `modelValue` | `boolean` | 展开/收起状态（支持 v-model） |

## Slots

| 名称 | 说明 |
|------|------|
| `trigger` | 触发元素，slot props: `{ open: boolean }` |
| `default` | 可折叠的内容 |

## 示例

### 基础用法

```vue
<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <FaCollapsible v-model="open">
    <template #trigger="{ open }">
      <FaButton variant="ghost">点击{{ open ? '收起' : '展开' }}</FaButton>
    </template>
    <div class="mt-2">
      这是可折叠的内容区域。
    </div>
  </FaCollapsible>
</template>
```

### 基础折叠

```vue
<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <FaCollapsible v-model="open">
    <template #trigger>
      <div class="flex items-center justify-between p-4 border rounded-lg cursor-pointer" @click="open = !open">
        <span>点击展开详情</span>
        <FaIcon :name="open ? 'i-lucide:chevron-up' : 'i-lucide:chevron-down'" />
      </div>
    </template>
    <div class="mt-2 p-4 border rounded-lg bg-muted">
      <p>这是折叠的内容...</p>
    </div>
  </FaCollapsible>
</template>
```

### FAQ 折叠列表

```vue
<script setup lang="ts">
const openIndex = ref<number | null>(null)

const faqs = [
  { question: '如何重置密码？', answer: '在设置页面点击"重置密码"...' },
  { question: '如何修改邮箱？', answer: '在个人中心修改邮箱地址...' },
  { question: '如何联系客服？', answer: '点击右下角在线客服图标...' },
]
</script>

<template>
  <div class="space-y-2">
    <FaCollapsible v-for="(faq, index) in faqs" :key="index" v-model="faqs[index].open">
      <template #trigger>
        <div 
          class="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted"
          @click="openIndex = openIndex === index ? null : index"
        >
          <span class="font-medium">{{ faq.question }}</span>
          <FaIcon :name="openIndex === index ? 'i-lucide:chevron-up' : 'i-lucide:chevron-down'" />
        </div>
      </template>
      <div class="p-4 pt-0 text-muted-foreground">
        {{ faq.answer }}
      </div>
    </FaCollapsible>
  </div>
</template>
```

### 手风琴效果（互斥展开）

```vue
<script setup lang="ts">
const activeIndex = ref(0)
const items = [
  { title: '章节一', content: '内容一...' },
  { title: '章节二', content: '内容二...' },
  { title: '章节三', content: '内容三...' },
]
</script>

<template>
  <div class="space-y-2">
    <FaCollapsible 
      v-for="(item, index) in items" 
      :key="index" 
      :model-value="activeIndex === index"
    >
      <template #trigger>
        <div 
          class="p-4 border rounded-lg cursor-pointer hover:bg-muted"
          @click="activeIndex = activeIndex === index ? -1 : index"
        >
          {{ item.title }}
        </div>
      </template>
      <div class="p-4 pt-0">
        {{ item.content }}
      </div>
    </FaCollapsible>
  </div>
</template>
```

### 带动画图标

```vue
<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <FaCollapsible v-model="open">
    <template #trigger="{ open }">
      <div class="flex items-center gap-2">
        <FaIcon 
          :name="'i-lucide:folder'" 
          class="transition-transform duration-200" 
          :class="open ? 'rotate-180' : ''"
        />
        <span>项目文件</span>
      </div>
    </template>
    <div class="mt-2 pl-8">
      <ul class="space-y-1">
        <li>文件 1</li>
        <li>文件 2</li>
        <li>文件 3</li>
      </ul>
    </div>
  </FaCollapsible>
</template>
```

## 注意事项

1. **触发器可选**：不提供 `trigger` slot 时，仅渲染可折叠内容
2. **动画效果**：展开/收起时有平滑的高度动画
3. **状态同步**：通过 `v-model` 双向绑定控制展开状态
4. **内容要求**：折叠内容应该有明确的高度，避免嵌套复杂布局
