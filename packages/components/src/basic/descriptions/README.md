# FaDescriptions 描述列表

纯展示信息组件，用于详情页、资料卡片、审核信息等只读数据场景。支持横向与纵向布局、边框、跨列、具名插槽和单项扩展字段。

## 使用场景

- 用户、订单、商品等详情信息展示
- 表单提交后的只读确认信息
- 弹窗中的轻量信息摘要
- 卡片内的结构化字段展示

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `DescriptionItem[]` | `[]` | 描述项配置 |
| `column` | `number` | `3` | 每行展示的描述项数量 |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | 布局方向 |
| `border` | `boolean` | `false` | 是否显示边框和单元格分割线 |
| `labelWidth` | `string \| number` | - | label 区域宽度，仅横向布局生效 |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 单元格密度 |
| `emptyText` | `string` | `'-'` | value 为空时的占位文本 |
| `class` | `HTMLAttributes['class']` | - | 根节点 class |
| `labelClass` | `HTMLAttributes['class']` | - | 全局 label 单元格 class |
| `valueClass` | `HTMLAttributes['class']` | - | 全局 value 单元格 class |

## DescriptionItem

| 属性 | 类型 | 说明 |
|------|------|------|
| `key` | `string` | 插槽标识。使用具名插槽时需要提供，组件不会自动转换 |
| `label` | `string` | label 文本 |
| `value` | `string \| number \| boolean \| null \| undefined` | value 文本 |
| `span` | `number` | 占用几个描述项列，默认 `1` |
| `class` | `HTMLAttributes['class']` | 当前项 label 和 value 的公共 class |
| `labelClass` | `HTMLAttributes['class']` | 当前项 label 单元格 class |
| `valueClass` | `HTMLAttributes['class']` | 当前项 value 单元格 class |

`DescriptionItem` 支持扩展字段，扩展字段会原样保留在插槽参数的 `item` 中。

## Slots

| 名称 | 说明 | 作用域参数 |
|------|------|------------|
| `label-{key}` | 自定义指定项 label | `item`、`index`、`label`、`value` |
| `value-{key}` | 自定义指定项 value | `item`、`index`、`label`、`value` |

## 注意事项

1. `key` 只用于生成具名插槽，不用于读取数据。
2. `key` 不会自动转换，建议使用字母、数字、短横线和下划线。
3. `value` 为 `null`、`undefined` 或空字符串时显示 `emptyText`；`0` 和 `false` 会正常显示。
4. `span` 表示占用几个描述项列，超出 `column` 时会按 `column` 处理。
5. 最后一行不足 `column` 时会自动补齐空单元格，保证边框网格完整。
6. 组件不内置标题、空状态和点击事件，可与 `FaCard`、`FaEmpty` 等组件组合使用。
