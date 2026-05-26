# FaAlert 提示

提示组件，用于展示重要信息、状态反馈和警告内容。

## 使用场景

- 表单校验提示
- 操作结果反馈
- 页面公告说明
- 风险或错误警告
- 功能状态提示

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `icon` | `string` | - | 图标名称，传入 Iconify 图标名 |
| `title` | `string` | - | 提示标题 |
| `description` | `string` | - | 提示描述 |
| `variant` | `'default' \| 'destructive'` | `'default'` | 提示样式变体 |
| `class` | `HTMLAttributes['class']` | - | 自定义 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `description` | 自定义描述内容，会覆盖 `description` prop 的显示 |

## 注意事项

1. **图标设置**：`icon` 使用 Iconify 图标名称，留空则不显示图标
2. **描述内容**：同时传入 `description` prop 和 `description` slot 时，优先显示 slot 内容
3. **样式变体**：`destructive` 适合错误、风险、危险操作等提示
4. **底层实现**：组件基于 shadcn-vue Alert 实现，保留其基础结构和样式
