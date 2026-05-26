# FaIcon 图标

统一的图标组件，支持 UnoCSS 图标类、Iconify、SVG 雪碧图和外部图片 URL 四种图标来源。

## 使用场景

- 按钮图标
- 导航菜单图标
- 状态指示图标
- 操作图标（编辑、删除、查看等）
- 表单装饰图标

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `name` | `string` | **必需** | 图标名称（支持多种格式） |
| `transition` | `boolean` | `false` | 是否开启图标切换动画 |
| `class` | `HTMLAttributes['class']` | - | 自定义 CSS 类 |

## 注意事项

### 图标格式说明

| 格式 | 示例 | 说明 |
|------|------|------|
| UnoCSS | `i-lucide:search` | 使用 UnoCSS 图标类 |
| Iconify | `heroicons:information-circle` | 使用 Iconify 在线图标 |
| SVG 雪碧图 | `icon-my-icon` | 使用项目内 SVG 雪碧图 |
| 图片 URL | `https://example.com/icon.svg` 或 `/assets/icon.svg` | 使用外部图片或本地图片 |

1. **图标尺寸**：图标默认尺寸为 `1em`，可通过父元素的 `font-size` 或图标的 `class` 控制
2. **图标颜色**：使用 `currentColor`，继承父元素的文字颜色
3. **加载状态**：使用图片 URL 时，加载失败会显示破损图片图标
4. **切换动画**：默认图标切换时无动画，可通过 `transition` prop 开启轻量的缩放 + blur 过渡动画（0.24s）
