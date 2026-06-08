# FaTable 表格

基于 TanStack Table 封装的数据表格组件，提供基础展示、树型数据、工具栏、列显示控制、排序、边框、斑马纹、固定列、固定高度、单选、多选和插槽自定义能力。

## 使用场景

- 常规数据列表展示
- 通过 `children` 或 `getSubRows` 展示树型层级数据
- 需要单选或多选的数据表格
- 固定列、固定高度等复杂表格布局
- 需要外部处理排序状态的数据表格
- 通过工具栏插槽放置新增、刷新、批量操作等自定义功能
- 通过插槽自定义单元格、表头、表尾和空状态

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `columns` | `TableColumn[]` | **必需** | 表格列配置 |
| `data` | `TData[]` | **必需** | 表格数据 |
| `border` | `boolean` | `false` | 是否显示外边框和单元格纵向分割线 |
| `caption` | `string` | - | 表格标题 |
| `columnVisibility` | `boolean` | `false` | 是否在工具栏右侧显示列显示控制按钮 |
| `defaultSorting` | `TableSortingState` | `[]` | 初始排序状态，仅在未受控时生效 |
| `defaultExpanded` | `TableExpandedState` | `{}` | 初始展开状态，仅在未受控时生效 |
| `emptyText` | `string` | `'暂无数据'` | 空数据文本 |
| `enableMultiSort` | `boolean` | `true` | 是否允许多列排序 |
| `enableSortingRemoval` | `boolean` | `true` | 是否允许清除排序 |
| `expanded` | `TableExpandedState` | - | 受控展开状态 |
| `getRowId` | `TableOptions<TData>['getRowId']` | - | 自定义行 ID 获取方法 |
| `getSubRows` | `TableOptions<TData>['getSubRows']` | - | 自定义子行获取方法，未设置时默认读取 `children` |
| `indentSize` | `number` | `20` | 树型数据每一级缩进像素 |
| `manualExpanding` | `boolean` | `false` | 是否由外部手动处理展开数据 |
| `multiple` | `boolean` | `false` | 是否为多选模式 |
| `rowKey` | `keyof TData \| string \| ((row: TData, index: number) => string \| number)` | - | 行唯一标识 |
| `selectable` | `boolean` | `false` | 是否启用选择列 |
| `sortable` | `boolean` | `false` | 是否启用排序交互 |
| `sorting` | `TableSortingState` | - | 受控排序状态 |
| `sortDescFirst` | `boolean` | `true` | 首次排序是否从降序开始 |
| `stripe` | `boolean` | `false` | 是否显示斑马纹 |
| `class` | `HTMLAttributes['class']` | - | 外层根节点 class，包含工具栏和表格 |
| `tableRootClass` | `HTMLAttributes['class']` | - | 表格根节点 class，仅作用于表格区域 |
| `tableClass` | `HTMLAttributes['class']` | - | 表格 class |
| `headerClass` | `HTMLAttributes['class']` | - | 表头 class |
| `headerRowClass` | `HTMLAttributes['class']` | - | 表头行 class |
| `bodyClass` | `HTMLAttributes['class']` | - | 表体 class |
| `rowClass` | `HTMLAttributes['class'] \| ((row: Row<TData>) => HTMLAttributes['class'])` | - | 表格行 class |
| `selectionColumnClass` | `HTMLAttributes['class']` | - | 选择列 class |
| `tree` | `boolean` | `false` | 是否启用树型数据展示，展开图标渲染在首列 |

## TableColumn

| 属性 | 类型 | 说明 |
|------|------|------|
| `accessorKey` | `string` | 数据字段名 |
| `header` | `string \| Function` | 表头内容 |
| `cell` | `string \| Function` | 单元格内容 |
| `columns` | `TableColumn[]` | 多级表头子列 |
| `align` | `'left' \| 'center' \| 'right'` | 对齐方式 |
| `fixed` | `boolean \| 'left' \| 'right'` | 固定列位置 |
| `enableSorting` | `boolean` | 是否允许当前列排序 |
| `enableMultiSort` | `boolean` | 是否允许当前列参与多列排序 |
| `sortDescFirst` | `boolean` | 当前列首次排序是否从降序开始 |
| `sortingFn` | `string \| Function` | 排序函数（组件内部不执行实际排序） |
| `width` | `number \| string` | 列宽 |
| `minWidth` | `number \| string` | 最小列宽 |
| `maxWidth` | `number \| string` | 最大列宽 |
| `class` | `HTMLAttributes['class']` | 列 class |
| `headerClass` | `HTMLAttributes['class'] \| Function` | 表头 class |
| `cellClass` | `HTMLAttributes['class'] \| Function` | 单元格 class |

选择列可配置 `{ type: 'selection' }`，并可通过 `disabled` 控制某一行是否禁用选择。

排序能力基于 TanStack Table 的 `SortingState` 实现。开启 `sortable` 后，支持单列排序与 `Shift + 点击` 多列排序；组件只维护排序状态并触发事件，不会对传入数据做实际排序，当前参与排序的列会显示独立背景。

树型数据能力基于 TanStack Table 的 Expanding Row Model 实现。开启 `tree` 后，组件默认读取每行的 `children` 字段作为子行，也可以通过 `getSubRows` 自定义子行来源；展开图标固定渲染在首个可见列。

## Slots

| 名称 | 说明 | 作用域参数 |
|------|------|------------|
| `caption` | 自定义表格标题 | - |
| `empty` | 自定义空状态 | `table` |
| `toolbar` | 自定义工具栏左侧内容 | `table` |
| `header-{columnId}` | 自定义指定列表头 | `column`、`header`、`table` |
| `cell-{columnId}` | 自定义指定列单元格 | `cell`、`column`、`index`、`row`、`table`、`value` |
| `footer-{columnId}` | 自定义指定列表尾 | `column`、`header`、`table` |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `row-click` | 点击表格行时触发 | `(row: TData, index: number, event: MouseEvent)` |
| `selection-change` | 选择状态变化时触发 | `(rows: TData[], rowSelection: RowSelectionState)` |
| `sorting-change` | 排序状态变化时触发 | `(sorting: TableSortingState, table: TanStackTable<TData>)` |
| `expanded-change` | 展开状态变化时触发 | `(expanded: TableExpandedState, table: TanStackTable<TData>)` |
| `update:expanded` | 受控展开状态更新时触发 | `(expanded: TableExpandedState)` |

## 注意事项

1. 推荐为复杂表格设置 `rowKey` 或 `getRowId`，保证选择状态和行更新稳定。
2. 启用选择能力时需要设置 `selectable`，多选场景再配合 `multiple` 使用。
3. 固定列建议显式设置列宽，避免横向滚动时出现宽度计算不稳定。
4. 普通列默认可被列显示控制隐藏，设置 `enableHiding: false` 可禁止某列出现在列显示菜单中。
5. 排序仅负责状态管理，真正的数据排序请在外部根据 `sorting-change` 自行处理。
6. 树型数据建议设置 `rowKey` 或 `getRowId`，避免展开状态在数据更新后错位。
