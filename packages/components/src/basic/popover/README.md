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

## 注意事项

1. **panel 插槽**：弹出内容必须放在 `#panel` 插槽中
2. **宽度控制**：弹出面板默认最小宽度 `18rem`（`min-w-72`），可通过 `class` 调整
3. **自动定位**：组件会自动调整位置避免超出视口
4. **焦点管理**：打开时会自动阻止焦点自动聚焦到弹出内容
5. **点击外部**：点击弹出框外部会自动关闭
