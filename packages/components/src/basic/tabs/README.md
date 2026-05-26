# FaTabs 标签页

标签页切换组件，支持图标和自定义样式。

## 使用场景

- 设置页面分类
- 详情信息分栏
- 数据视图切换（列表/图表）
- 表单分步
- 内容分类展示

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `modelValue` | `string \| number` | - | 当前激活的标签值 |
| `list` | `Array<{ icon?: string, label: string, value: string \| number, class?: HTMLAttributes['class'] }>` | **必需** | 标签列表 |
| `class` | `HTMLAttributes['class']` | - | 容器 CSS 类 |
| `listClass` | `HTMLAttributes['class']` | - | 标签列表 CSS 类 |
| `contentClass` | `HTMLAttributes['class']` | - | 内容区 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `[value]` | 对应标签值的内容（动态插槽名） |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `update:modelValue` | `value: string \| number` | 标签切换时触发 |

## 注意事项

1. **动态插槽**：内容插槽名对应标签的 `value` 值
2. **value 唯一性**：确保每个标签的 `value` 唯一
3. **类型支持**：`value` 支持字符串和数字两种类型
4. **图标可选**：标签可以设置图标也可以不设置
