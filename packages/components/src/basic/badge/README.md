# FaBadge 徽章

用于展示数量、状态的小徽章，支持数字、文本和点状模式，带有入场动画。

## 使用场景

- 消息通知数量提示
- 未读消息数显示
- 状态指示器（在线/离线）
- 新内容标记（NEW、HOT 等）
- 购物车商品数量

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `string \| number \| boolean` | - | 徽章显示内容，为空/0/false 时自动隐藏 |
| `variant` | `'default' \| 'secondary' \| 'destructive'` | `'default'` | 徽章颜色变体 |
| `class` | `HTMLAttributes['class']` | - | 容器 CSS 类 |
| `badgeClass` | `HTMLAttributes['class']` | - | 徽章本身的 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `default` | 被包裹的内容（如图标、头像等） |

## 注意事项

1. **自动隐藏**：
   - 当 `value` 为 `0`、`false`、空字符串、`null` 或 `undefined` 时，徽章会自动隐藏
   - 布尔值 `true` 会显示为一个小圆点

2. **动画效果**：徽章显示/隐藏时有淡入淡出动画

3. **变体说明**：
   - `default`：主色（蓝色）
   - `secondary`：次要色（灰色）
   - `destructive`：危险色（红色）
