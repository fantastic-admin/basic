# FaPageHeader 页面头部

页面级标题组件，支持标题、描述和右侧操作区。

## 使用场景

- 列表页面头部
- 详情页面标题
- 表单页面头部
- 仪表盘页面标题
- 设置页面头部

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 页面标题 |
| `description` | `string` | - | 页面描述 |
| `class` | `HTMLAttributes['class']` | - | 容器 CSS 类 |
| `mainClass` | `HTMLAttributes['class']` | - | 主内容区（标题+描述）CSS 类 |
| `defaultClass` | `HTMLAttributes['class']` | - | 右侧操作区 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `title` | 自定义标题内容 |
| `description` | 自定义描述内容 |
| `default` | 右侧操作区内容（按钮等） |

## 注意事项

1. **响应式布局**：标题区在左侧，操作区在右侧，小屏幕时会自动换行
2. **自动隐藏**：操作区没有内容时会自动隐藏
3. **描述为空**：description 为空字符串时不会显示描述区域
4. **典型位置**：通常放在 `FaPageMain` 组件上方使用
