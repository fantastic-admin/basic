# FaPagination 分页组件

功能完整的分页组件，支持总条数显示、每页条数选择、页码跳转和自定义布局。

## 基础用法

```vue
<script setup lang="ts">
const page = ref(1)
const size = ref(10)
const total = ref(100)
</script>

<template>
  <FaPagination v-model:page="page" v-model:size="size" :total="total" />
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `total` | `number` | **必需** | 数据总条数 |
| `sizes` | `number[]` | `[10, 20, 30, 40, 50, 100]` | 每页条数选项 |
| `layout` | `string` | `'total, sizes, ->, pager, jumper'` | 布局配置 |
| `page` | `number` | **必需** | 当前页码（支持 v-model） |
| `size` | `number` | **必需** | 每页条数（支持 v-model） |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `pageChange` | `page: number` | 页码变化时触发 |
| `sizeChange` | `size: number` | 每页条数变化时触发 |

## Slots

无

## 示例

### 基础分页

```vue
<script setup lang="ts">
const page = ref(1)
const total = ref(100)
</script>

<template>
  <FaPagination v-model:page="page" :total="total" />
</template>
```

### 带每页条数选择

```vue
<script setup lang="ts">
const page = ref(1)
const size = ref(10)
const total = ref(500)
</script>

<template>
  <FaPagination v-model:page="page" v-model:size="size" :total="total" />
</template>
```

### 自定义每页条数选项

```vue
<script setup lang="ts">
const page = ref(1)
const size = ref(20)
const total = ref(500)
</script>

<template>
  <FaPagination 
    v-model:page="page" 
    v-model:size="size" 
    :total="total"
    :sizes="[20, 50, 100, 200]"
  />
</template>
```

### 自定义布局（仅页码）

```vue
<script setup lang="ts">
const page = ref(1)
const total = ref(100)
</script>

<template>
  <FaPagination v-model:page="page" :total="total" layout="pager" />
</template>
```

### 自定义布局（总条数 + 页码）

```vue
<template>
  <FaPagination 
    v-model:page="page" 
    :total="total" 
    layout="total, ->, pager"
  />
</template>
```

### 完整布局

```vue
<script setup lang="ts">
const page = ref(1)
const size = ref(10)
const total = ref(1000)
</script>

<template>
  <FaPagination 
    v-model:page="page" 
    v-model:size="size" 
    :total="total"
    layout="total, sizes, ->, pager, jumper"
  />
</template>
```

### 监听分页变化

```vue
<script setup lang="ts">
const page = ref(1)
const size = ref(10)
const total = ref(100)

function onPageChange(newPage: number) {
  console.log('页码变为:', newPage)
  // 加载新页面数据
}

function onSizeChange(newSize: number) {
  console.log('每页条数变为:', newSize)
  page.value = 1 // 重置页码
  // 加载新数据
}
</script>

<template>
  <FaPagination 
    v-model:page="page" 
    v-model:size="size" 
    :total="total"
    @page-change="onPageChange"
    @size-change="onSizeChange"
  />
</template>
```

### 在表格中使用

```vue
<script setup lang="ts">
const page = ref(1)
const size = ref(10)
const total = ref(100)
const data = ref([])

// 加载数据
function loadData() {
  // API 调用获取数据
}

watch([page, size], loadData)
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>姓名</th>
          <th>邮箱</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
        </tr>
      </tbody>
    </table>
    <FaPagination v-model:page="page" v-model:size="size" :total="total" />
  </div>
</template>
```

## 布局配置说明

`layout` 属性控制分页组件的布局和元素顺序，支持以下元素：

| 元素 | 说明 |
|------|------|
| `total` | 显示总条数 |
| `sizes` | 每页条数选择器 |
| `pager` | 页码按钮组 |
| `jumper` | 页码跳转输入框 |
| `->` | 弹性占位符（将后续元素推到右侧） |

### 布局示例

```vue
<!-- 左侧总条数，中间页码，右侧跳转 -->
<FaPagination layout="total, ->, pager, jumper" />

<!-- 仅显示页码 -->
<FaPagination layout="pager" />

<!-- 总条数 + 每页条数 + 分页器 -->
<FaPagination layout="total, sizes, pager" />
```

## 注意事项

1. **必需属性**：`total`、`page`、`size` 为必需属性
2. **双向绑定**：`page` 和 `size` 支持 `v-model` 双向绑定
3. **页码范围**：跳转页码会自动限制在有效范围内
4. **自动聚焦**：跳转输入框获得焦点时会自动选中文本
5. **回车跳转**：在跳转输入框中按回车键可触发跳转

## 典型使用场景

- 数据列表分页
- 表格分页
- 搜索结果分页
- 文章列表分页
- 评论列表分页
