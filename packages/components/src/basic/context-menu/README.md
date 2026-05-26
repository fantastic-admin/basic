# FaContextMenu 右键菜单

右键点击时弹出的上下文菜单，支持分组、子菜单和图标。

## 使用场景

- 表格行操作菜单
- 文件/文件夹右键菜单
- 画布/编辑器上下文菜单
- 列表项操作菜单
- 图片/媒体文件操作菜单

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `(MenuItem \| MenuSubItem)[][]` | **必需** | 菜单项数组（二维数组） |

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
| `label` | 菜单头部标签 |

## 注意事项

1. **items 结构**：二维数组，每个子数组为一组，组间自动添加分割线
2. **图标一致性**：组内任一菜单项有图标时，整组预留图标位置
3. **触发区域**：default slot 的元素为右键触发区域
4. **子菜单**：通过 `items` 属性嵌套实现多级菜单
5. **危险操作**：设置 `variant: 'destructive'` 标记为危险操作（红色）
