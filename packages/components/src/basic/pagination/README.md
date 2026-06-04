# FaPagination 分页

功能完整的分页组件，支持总条数显示、每页条数选择、页码跳转和自定义布局。

## 使用场景

- 数据列表分页
- 表格分页
- 搜索结果分页
- 文章列表分页
- 评论列表分页

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `total` | `number` | **必需** | 数据总条数 |
| `sizes` | `number[]` | `[10, 20, 30, 40, 50, 100]` | 每页条数选项 |
| `layout` | `string` | `'total, sizes, ->, pager, jumper'` | 布局配置 |
| `textTemplates` | `object` | 见下方 | 文本模板配置，用于国际化 |
| `page` | `number` | **必需** | 当前页码（支持 v-model） |
| `size` | `number` | **必需** | 每页条数（支持 v-model） |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `pageChange` | `page: number` | 页码变化时触发 |
| `sizeChange` | `size: number` | 每页条数变化时触发 |

## 注意事项

### 布局配置说明

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

### textTemplates 配置

`textTemplates` 属性用于自定义分页组件中的文本，支持国际化场景。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `total` | `(total: number) => string` | `(total) => \`共 ${total} 条\`` | 总条数文本格式化函数 |
| `sizes` | `(size: number) => string` | `(size) => \`${size} 条/页\`` | 每页条数文本格式化函数 |
| `jumper` | `{ before: string, after: string }` | `{ before: '前往', after: '页' }` | 页码跳转前后文本 |

#### 国际化示例

```vue
<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <FaPagination
    :text-templates="{
      total: (total) => t('pagination.total', { total }),
      sizes: (size) => t('pagination.sizes', { size }),
      jumper: {
        before: t('pagination.jumperBefore'),
        after: t('pagination.jumperAfter'),
      },
    }"
  />
</template>
```

1. **必需属性**：`total`、`page`、`size` 为必需属性
2. **双向绑定**：`page` 和 `size` 支持 `v-model` 双向绑定
3. **页码范围**：跳转页码会自动限制在有效范围内
4. **自动聚焦**：跳转输入框获得焦点时会自动选中文本
5. **回车跳转**：在跳转输入框中按回车键可触发跳转
