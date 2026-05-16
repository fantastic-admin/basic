# FaPopover 弹出框

灵活的弹出容器组件，支持自定义内容和多种弹出位置。

## 使用场景

- 高级筛选面板
- 快速操作面板
- 信息详情卡片
- 颜色/日期选择器
- 简易表单弹窗
- 上下文信息展示

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `open` | `boolean` | `false` | 是否打开（支持 v-model） |
| `align` | `'start' \| 'end' \| 'center'` | `'center'` | 水平对齐方式 |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | 弹出方向 |
| `sideOffset` | `number` | `4` | 与触发元素的偏移距离 |
| `alignOffset` | `number` | `0` | 对齐偏移量 |
| `collisionPadding` | `number` | `0` | 与视口边缘的碰撞内边距 |
| `class` | `HTMLAttributes['class']` | - | 弹出面板 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `default` | 触发元素 |
| `panel` | 弹出面板内容 |

## 示例

### 基础用法

```vue
<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <FaPopover v-model:open="open">
    <FaButton>打开弹出框</FaButton>
    <template #panel>
      <div class="p-4">
        <p>弹出框内容</p>
      </div>
    </template>
  </FaPopover>
</template>
```

### 基础弹出框

```vue
<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <FaPopover v-model:open="open">
    <FaButton variant="outline">点击打开</FaButton>
    <template #panel>
      <div class="p-4 w-64">
        <p class="font-medium">弹出框标题</p>
        <p class="text-sm text-muted-foreground mt-1">这是弹出框的内容区域。</p>
      </div>
    </template>
  </FaPopover>
</template>
```

### 不同弹出方向

```vue
<template>
  <div class="flex gap-4">
    <FaPopover side="top">
      <FaButton>向上弹出</FaButton>
      <template #panel>上方内容</template>
    </FaPopover>
    <FaPopover side="bottom">
      <FaButton>向下弹出</FaButton>
      <template #panel>下方内容</template>
    </FaPopover>
    <FaPopover side="left">
      <FaButton>向左弹出</FaButton>
      <template #panel>左侧内容</template>
    </FaPopover>
    <FaPopover side="right">
      <FaButton>向右弹出</FaButton>
      <template #panel>右侧内容</template>
    </FaPopover>
  </div>
</template>
```

### 选择器面板

```vue
<script setup lang="ts">
const open = ref(false)
const selectedColor = ref('')
const colors = ['#ef4444', '#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6']
</script>

<template>
  <FaPopover v-model:open="open">
    <FaButton variant="outline">
      <span :style="{ backgroundColor: selectedColor }" class="inline-block size-4 rounded mr-2" />
      选择颜色
    </FaButton>
    <template #panel>
      <div class="p-3">
        <div class="flex gap-2">
          <button
            v-for="color in colors"
            :key="color"
            :style="{ backgroundColor: color }"
            class="size-8 rounded cursor-pointer hover:ring-2 hover:ring-offset-2"
            @click="selectedColor = color; open = false"
          />
        </div>
      </div>
    </template>
  </FaPopover>
</template>
```

### 日期选择器

```vue
<script setup lang="ts">
const open = ref(false)
const selectedDate = ref('')
</script>

<template>
  <FaPopover v-model:open="open">
    <FaInput v-model="selectedDate" placeholder="选择日期" readonly @click="open = true" />
    <template #panel>
      <div class="p-4">
        <!-- 日历组件 -->
        <p>日历选择器内容</p>
      </div>
    </template>
  </FaPopover>
</template>
```

### 用户信息卡片

```vue
<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <FaPopover v-model:open="open" side="right" :side-offset="10">
    <FaAvatar src="https://example.com/avatar.jpg" class="size-10 rounded-full cursor-pointer" />
    <template #panel>
      <div class="p-4 w-72">
        <div class="flex items-center gap-3">
          <FaAvatar src="https://example.com/avatar.jpg" class="size-12 rounded-full" />
          <div>
            <p class="font-medium">张三</p>
            <p class="text-sm text-muted-foreground">前端工程师</p>
          </div>
        </div>
        <div class="mt-4 space-y-2">
          <p class="text-sm"><strong>邮箱：</strong>zhangsan@example.com</p>
          <p class="text-sm"><strong>电话：</strong>13800138000</p>
        </div>
        <FaButton class="w-full mt-4" @click="open = false">查看主页</FaButton>
      </div>
    </template>
  </FaPopover>
</template>
```

### 表单弹窗

```vue
<script setup lang="ts">
const open = ref(false)
const form = ref({ name: '', email: '' })
</script>

<template>
  <FaPopover v-model:open="open">
    <FaButton>新增用户</FaButton>
    <template #panel>
      <div class="p-4 w-80">
        <div class="space-y-4">
          <FaInput v-model="form.name" label="姓名" />
          <FaInput v-model="form.email" label="邮箱" />
          <div class="flex justify-end gap-2">
            <FaButton variant="outline" @click="open = false">取消</FaButton>
            <FaButton>确定</FaButton>
          </div>
        </div>
      </div>
    </template>
  </FaPopover>
</template>
```

## 注意事项

1. **panel 插槽**：弹出内容必须放在 `#panel` 插槽中
2. **宽度控制**：弹出面板默认最小宽度 `18rem`（`min-w-72`），可通过 `class` 调整
3. **自动定位**：组件会自动调整位置避免超出视口
4. **焦点管理**：打开时会自动阻止焦点自动聚焦到弹出内容
5. **点击外部**：点击弹出框外部会自动关闭
