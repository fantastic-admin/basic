# FaButtonGroup 按钮组

将多个按钮组合在一起的容器组件，支持水平/垂直排列和分割线。

## 使用场景

- 将多个按钮组合在一起的容器组件，支持水平/垂直排列和分割线。
- 常见用法：垂直排列、带分割线、工具栏按钮组、垂直菜单。

## Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| orientation | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| separator | 是否显示分割线 | `boolean` | `false` |
| class | 自定义类名 | `HTMLAttributes['class']` | `undefined` |

## Slots

| 名称 | 说明 |
|------|------|
| default | 默认插槽，放置 FaButton 组件 |

## 注意事项

- 无特殊限制，建议按示例中的受控方式接入，并结合业务容器尺寸验证最终展示效果。
