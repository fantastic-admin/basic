# FaDrawer 抽屉组件

侧滑抽屉组件，支持从四个方向弹出，内置头部、内容区和底部操作区。

## 基础用法

```vue
<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <FaButton @click="open = true">打开抽屉</FaButton>
  <FaDrawer v-model="open" title="抽屉标题">
    <div>抽屉内容</div>
  </FaDrawer>
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `id` | `string` | - | 抽屉唯一标识 |
| `modelValue` | `boolean` | `false` | 是否打开抽屉 |
| `zIndex` | `number` | `2000` | 层级 |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'right'` | 弹出方向 |
| `title` | `string \| () => string` | - | 标题 |
| `description` | `string \| () => string` | - | 描述文字 |
| `loading` | `boolean` | `false` | 是否显示加载状态 |
| `closable` | `boolean` | `true` | 是否显示关闭按钮 |
| `centered` | `boolean` | `false` | 是否居中显示 |
| `bordered` | `boolean` | `true` | 是否有边框分割线 |
| `overlay` | `boolean` | `true` | 是否显示遮罩 |
| `overlayBlur` | `boolean` | `false` | 遮罩是否模糊 |
| `showConfirmButton` | `boolean` | `true` | 是否显示确定按钮 |
| `showCancelButton` | `boolean` | `false` | 是否显示取消按钮 |
| `confirmButtonText` | `string \| () => string` | `'确定'` | 确定按钮文字 |
| `cancelButtonText` | `string \| () => string` | `'取消'` | 取消按钮文字 |
| `confirmButtonDisabled` | `boolean` | `false` | 确定按钮是否禁用 |
| `confirmButtonLoading` | `boolean` | `false` | 确定按钮加载状态 |
| `beforeClose` | `(action, done) => void` | - | 关闭前回调 |
| `header` | `boolean` | `true` | 是否显示头部 |
| `footer` | `boolean` | `true` | 是否显示底部 |
| `closeOnClickOverlay` | `boolean` | `true` | 点击遮罩是否关闭 |
| `closeOnPressEscape` | `boolean` | `true` | 按 ESC 是否关闭 |
| `destroyOnClose` | `boolean` | `true` | 关闭时销毁内容 |
| `openAutoFocus` | `boolean` | `false` | 打开时自动聚焦 |
| `contentClass` | `HTMLAttributes['class']` | - | 内容区 CSS 类 |
| `headerClass` | `HTMLAttributes['class']` | - | 头部 CSS 类 |
| `footerClass` | `HTMLAttributes['class']` | - | 底部 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `header` | 自定义头部内容 |
| `default` | 抽屉主体内容 |
| `footer` | 自定义底部内容 |

## Events

| 事件名 | 说明 |
|--------|------|
| `update:modelValue` | 打开状态变化时触发 |
| `open` | 打开时触发 |
| `opened` | 打开动画完成后触发 |
| `close` | 关闭时触发 |
| `closed` | 关闭动画完成后触发 |
| `confirm` | 点击确定按钮时触发 |
| `cancel` | 点击取消按钮时触发 |

## Exposed Methods

无

## 示例

### 基础抽屉

```vue
<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <FaButton @click="open = true">打开抽屉</FaButton>
  <FaDrawer v-model="open" title="抽屉标题" description="抽屉描述">
    <div>这是抽屉内容</div>
  </FaDrawer>
</template>
```

### 不同弹出方向

```vue
<script setup lang="ts">
const drawers = reactive({
  top: false,
  bottom: false,
  left: false,
  right: false,
})
</script>

<template>
  <div class="flex gap-2">
    <FaButton @click="drawers.top = true">上方抽屉</FaButton>
    <FaButton @click="drawers.bottom = true">下方抽屉</FaButton>
    <FaButton @click="drawers.left = true">左侧抽屉</FaButton>
    <FaButton @click="drawers.right = true">右侧抽屉</FaButton>
  </div>
  
  <FaDrawer v-model="drawers.top" side="top" title="上方抽屉">内容</FaDrawer>
  <FaDrawer v-model="drawers.bottom" side="bottom" title="下方抽屉">内容</FaDrawer>
  <FaDrawer v-model="drawers.left" side="left" title="左侧抽屉">内容</FaDrawer>
  <FaDrawer v-model="drawers.right" side="right" title="右侧抽屉">内容</FaDrawer>
</template>
```

### 带底部按钮

```vue
<script setup lang="ts">
const open = ref(false)

function handleConfirm() {
  console.log('确认操作')
  open.value = false
}

function handleCancel() {
  console.log('取消操作')
  open.value = false
}
</script>

<template>
  <FaButton @click="open = true">打开抽屉</FaButton>
  <FaDrawer
    v-model="open"
    title="确认操作"
    show-cancel-button
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <div>请确认是否继续？</div>
  </FaDrawer>
</template>
```

### 关闭前确认

```vue
<script setup lang="ts">
import { useFaModal } from '@/ui/components/modal'

const open = ref(false)

function handleBeforeClose(action: 'confirm' | 'cancel' | 'close', done: () => void) {
  if (action === 'close') {
    useFaModal().confirm({
      title: '提示',
      content: '确定要关闭吗？未保存的内容将丢失。',
      onConfirm: () => done(),
    })
  }
  else {
    done()
  }
}
</script>

<template>
  <FaDrawer v-model="open" title="编辑" :before-close="handleBeforeClose">
    <form>
      <FaInput placeholder="请输入..." />
    </form>
  </FaDrawer>
</template>
```

### 加载状态

```vue
<script setup lang="ts">
const open = ref(false)
const loading = ref(false)

function handleSubmit() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    open.value = false
  }, 2000)
}
</script>

<template>
  <FaDrawer v-model="open" title="提交表单" :loading="loading" :confirm-button-loading="loading" @confirm="handleSubmit">
    <form class="flex flex-col gap-4">
      <FaInput placeholder="输入内容" />
    </form>
  </FaDrawer>
</template>
```

### 自定义头部和底部

```vue
<template>
  <FaDrawer v-model="open">
    <template #header>
      <div class="flex-between">
        <span class="font-bold">自定义标题</span>
        <FaIcon name="i-lucide:info" />
      </div>
    </template>
    <div>抽屉内容</div>
    <template #footer>
      <div class="flex gap-2">
        <FaButton variant="outline">取消</FaButton>
        <FaButton>保存</FaButton>
      </div>
    </template>
  </FaDrawer>
</template>
```

### 调整抽屉宽度

```vue
<template>
  <FaDrawer v-model="open" title="大抽屉" content-class="sm:max-w-2xl">
    <div>这是一个较宽的抽屉</div>
  </FaDrawer>
</template>
```

### 居中显示

```vue
<template>
  <FaDrawer v-model="open" title="居中抽屉" centered show-cancel-button>
    <div class="text-center">
      <p>这是一个居中的抽屉</p>
      <p>按钮也会居中对齐</p>
    </div>
  </FaDrawer>
</template>
```

## 函数式调用

```vue
<script setup lang="ts">
const drawer = useFaDrawer()

function openDrawer() {
  drawer.create({
    title: '提示',
    content: '这是一个抽屉',
    onConfirm: () => {
      console.log('确认操作')
    },
  }).open()
}
</script>
```

## 注意事项

1. **v-model 绑定**：使用 `v-model` 控制抽屉打开状态
2. **方向选择**：`side` 支持 `top`、`bottom`、`left`、`right` 四个方向
3. **关闭回调**：`beforeClose` 接收 `action`（`confirm`/`cancel`/`close`）和 `done` 函数
4. **加载状态**：`loading` 会显示遮罩层，`confirmButtonLoading` 只影响按钮
5. **动画事件**：`opened` 和 `closed` 在动画完成后触发
6. **默认关闭行为**：点击确定/取消按钮会自动关闭抽屉，如需阻止请在 `beforeClose` 中处理

## 典型使用场景

- 表单编辑
- 详情展示
- 过滤筛选条件
- 配置设置
- 确认对话框（使用 show-cancel-button）
