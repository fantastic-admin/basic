# FaDropdown 下拉菜单

功能强大的下拉菜单组件，支持分组、子菜单、图标和自定义内容。

## 使用场景

- 用户头像下拉菜单
- 表格行操作菜单
- 工具栏更多操作
- 导航菜单
- 快捷操作菜单

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `(MenuItem \| MenuSubItem)[][]` | **必需** | 菜单项数组（二维数组，每组为一行） |
| `align` | `'start' \| 'end' \| 'center'` | - | 水平对齐方式 |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | 弹出方向 |
| `sideOffset` | `number` | `4` | 与触发元素的偏移距离 |
| `alignOffset` | `number` | `0` | 对齐偏移量 |
| `collisionPadding` | `number` | `0` | 与视口边缘的碰撞内边距 |

### MenuItem 接口

```ts
interface MenuItem {
  label: string
  icon?: string
  variant?: 'default' | 'destructive'
  disabled?: boolean
  handle?: () => void
}
```

### MenuSubItem 接口（子菜单）

```ts
interface MenuSubItem {
  label: string
  items: (MenuItem | MenuSubItem)[][]
}
```

## Slots

| 名称 | 说明 |
|------|------|
| `default` | 触发元素（必填） |
| `header` | 菜单头部内容 |
| `footer` | 菜单底部内容 |

## 注意事项

1. **items 结构**：`items` 是二维数组，每个子数组为一组，组与组之间会自动添加分割线
2. **图标一致性**：如果组内任一菜单项有图标，整组都会预留图标位置
3. **子菜单**：通过 `items` 属性嵌套可实现多级子菜单
4. **事件处理**：通过 `handle` 函数处理点击事件
5. **危险操作**：设置 `variant: 'destructive'` 可将菜单项标记为危险操作（红色）
