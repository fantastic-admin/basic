# FaScrollArea 滚动区域

自定义滚动条的滚动容器，支持水平/垂直滚动、渐变遮罩和滚动事件监听。

## 使用场景

- 长列表内容滚动
- 侧边栏滚动区域
- 聊天消息滚动
- 水平滚动的卡片列表
- 固定高度的内容容器

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `horizontal` | `boolean` | `false` | 是否启用水平滚动 |
| `scrollbar` | `boolean` | `true` | 是否显示滚动条 |
| `mask` | `boolean` | `false` | 是否显示渐变遮罩 |
| `class` | `HTMLAttributes['class']` | - | 容器 CSS 类 |
| `contentClass` | `HTMLAttributes['class']` | - | 滚动内容区 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `default` | 滚动内容 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `onScroll` | `Event` | 滚动时触发 |

## Exposed Methods

| 方法名 | 参数 | 说明 |
|--------|------|------|
| `scrollTo` | `(scrollNumber: number, behavior?: ScrollBehavior) => void` | 滚动到指定位置 |
| `ref` | - | 内部 ScrollArea 引用 |

## 注意事项

1. **必须设置尺寸**：需要设置 `height` 或 `max-height` 等限制高度的样式才能触发滚动
2. **水平滚动**：启用 `horizontal` 时，内容需要超出容器宽度才能触发水平滚动
3. **渐变遮罩**：`mask` 为 `true` 时会在内容顶部/底部显示渐变遮罩效果
4. **滚动条样式**：使用自定义滚动条样式，与系统默认滚动条不同
