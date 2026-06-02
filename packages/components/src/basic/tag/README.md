# FaTag 标签

基础标签组件，用于标记和分类信息，支持多种样式变体和可关闭功能。

## 使用场景

- 状态标记（成功、失败、进行中）
- 分类标签
- 筛选条件标签
- 展示多个属性或特征
- 可删除的标签列表

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary'` | `'default'` | 标签样式变体 |
| `icon` | `string` | - | 图标名称，使用 FaIcon 渲染 |
| `closable` | `boolean` | `false` | 是否显示关闭按钮 |
| `class` | `HTMLAttributes['class']` | - | 自定义 CSS 类 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `close` | `event: MouseEvent` | 点击关闭按钮时触发 |

## Slots

| 名称 | 说明 |
|------|------|
| `default` | 标签内容 |

## 注意事项

1. **变体选择**：
   - `default`：主色调标签，用于重要标记
   - `destructive`：危险/错误状态标签
   - `outline`：边框样式，用于次要标记
   - `secondary`：次级标签，用于一般分类
2. **可关闭标签**：设置 `closable` 为 `true` 时，标签右侧会显示关闭按钮，点击触发 `close` 事件
3. **关闭事件处理**：需要监听 `close` 事件来自定义关闭逻辑（如从列表中移除标签）