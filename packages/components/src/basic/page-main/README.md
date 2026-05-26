# FaPageMain 页面主内容区

页面主内容容器组件，支持标题和可折叠的内容区域。

## 使用场景

- 表单内容容器
- 详情信息展示
- 数据列表容器
- 可折叠的信息区块
- 页面分节容器

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | `''` | 内容区标题 |
| `collaspe` | `boolean` | `false` | 是否可折叠 |
| `height` | `string` | `''` | 折叠后的高度 |
| `class` | `HTMLAttributes['class']` | - | 容器 CSS 类 |
| `titleClass` | `HTMLAttributes['class']` | - | 标题区 CSS 类 |
| `mainClass` | `HTMLAttributes['class']` | - | 主内容区 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `title` | 自定义标题内容 |
| `default` | 主内容 |

## 注意事项

1. **折叠功能**：设置 `collaspe` 为 `true` 后，内容区可以折叠，折叠后会显示渐变遮罩
2. **折叠按钮**：鼠标悬停时会在底部显示展开/收起按钮
3. **高度设置**：`height` 属性仅在 `collaspe` 为 `true` 时生效
4. **典型搭配**：通常与 `FaPageHeader` 配合使用，构成完整的页面布局
