# FaSearchBar 搜索栏

可折叠的搜索区域容器组件，用于表单筛选条件区域。

## 使用场景

- 列表页面筛选区
- 高级搜索表单
- 数据查询条件
- 报表筛选选区
- 可折叠的表单区域

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `showToggle` | `boolean` | `true` | 是否显示折叠按钮 |
| `background` | `boolean` | `false` | 是否显示背景色 |
| `fold` | `boolean` | `false` | 折叠状态（支持 v-model） |

## Slots

| 名称 | 说明 |
|------|------|
| `default` | 搜索表单内容，slot props: `{ fold: boolean, toggle: () => void }` |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `toggle` | `value: boolean` | 折叠状态变化时触发 |

## 注意事项

1. **折叠内容**：当 `fold` 为 `true` 时，内容区域会被折叠（通过 slot 控制显示逻辑）
2. **折叠按钮**：默认在底部显示折叠/展开按钮
3. **双向绑定**：`fold` 支持 `v-model` 双向绑定
4. **内容控制**：需要在 slot 内根据 `fold` 值控制内容的显示
