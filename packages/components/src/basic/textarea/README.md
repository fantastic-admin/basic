# FaTextarea 文本域

多行文本输入组件，支持前后缀插槽和自定义样式。

## 使用场景

- 文章/内容编辑器
- 评论输入框
- 意见反馈
- 多行表单字段
- 代码/文本展示

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `align` | `'inline' \| 'block'` | `'inline'` | 前后缀对齐方式 |
| `disabled` | `boolean` | `false` | 是否禁用文本域 |
| `class` | `HTMLAttributes['class']` | - | 组件外层 CSS 类 |
| `inputClass` | `HTMLAttributes['class']` | - | 文本域 CSS 类 |
| `startClass` | `HTMLAttributes['class']` | - | 前缀区域 CSS 类 |
| `endClass` | `HTMLAttributes['class']` | - | 后缀区域 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `start` | 文本域前缀内容 |
| `end` | 文本域后缀内容 |

## 注意事项

1. **v-model 绑定**：使用 `v-model` 实现双向数据绑定
2. **原生属性**：支持所有原生 textarea 属性（rows、cols、maxlength、readonly 等）
3. **自动调整**：可通过 CSS 实现自动高度调整
4. **对齐方式**：`align="block"` 时前后缀会上下排列
5. **滚动行为**：超出高度时自动显示滚动条
