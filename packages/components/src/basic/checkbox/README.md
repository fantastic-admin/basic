# FaCheckbox 复选框

单个复选框组件，支持普通选中、禁用和半选状态。

## 使用场景

- 表单中的同意协议选项
- 单个布尔开关配置
- 树形结构中的半选状态展示
- 单项功能启用/禁用

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `id` | `string` | 自动生成 | 复选框 id |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `class` | `HTMLAttributes['class']` | - | 外层容器类名 |
| `itemClass` | `HTMLAttributes['class']` | - | 复选框本体类名 |
| `labelClass` | `HTMLAttributes['class']` | - | 标签内容类名 |

## Slots

| 名称 | 说明 |
|------|------|
| `default` | 复选框标签内容 |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `change` | 选中值变化时触发 | `value: boolean \| 'indeterminate' \| undefined` |

通过 `v-model` 实现双向绑定。

## 注意事项

1. **单个使用**：`FaCheckbox` 只负责单个复选框，不承担组选项逻辑。
2. **v-model 类型**：支持 `boolean` 和 `'indeterminate'` 两种状态值。
3. **标签点击**：点击标签文字也能触发复选框状态切换。
4. **空标签隐藏**：当不提供默认插槽内容时，标签元素会自动隐藏。
5. **禁用状态**：禁用状态下复选框和标签都无法点击。

## FaCheckboxGroup 复选框组

基于选项数组的复选框组组件，支持描述文案、自定义布局样式和选项插槽扩展。

## 使用场景

- 表单中的多选配置项
- 多标签偏好选择
- 权限点批量选择
- 带说明文案的多选列表
- 需要卡片式多选交互的场景

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `options` | `CheckboxGroupOption[]` | **必需** | 复选框组选项数据 |
| `disabled` | `boolean` | `false` | 是否整体禁用 |
| `min` | `number` | - | 最少选中数量，达到后已选项会被禁用 |
| `max` | `number` | - | 最多选中数量，达到后未选项会被禁用 |
| `dir` | `'ltr' \| 'rtl'` | - | 文本方向 |
| `class` | `HTMLAttributes['class']` | - | 组容器类名 |
| `optionClass` | `HTMLAttributes['class']` | - | 每个选项外层容器类名 |
| `itemClass` | `HTMLAttributes['class']` | - | 复选框本体类名 |
| `labelClass` | `HTMLAttributes['class']` | - | 标签内容类名 |

### CheckboxGroupOption 接口

```ts
export interface CheckboxGroupOption {
  label: string
  value: AcceptableValue
  description?: string
  disabled?: boolean
  id?: string
}
```

## Slots

| 名称 | 说明 |
|------|------|
| `option` | 自定义选项内容，slot props: `{ option, checked, disabled, id }`，`option` 会保留 `options` 中的扩展字段类型 |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `change` | 选中值变化时触发 | `value: AcceptableValue[]` |

通过 `v-model` 实现双向绑定。

## 注意事项

1. **数据驱动**：组选项必须通过 `options` 传入，不再使用多个 `FaCheckbox` 手工拼接。
2. **v-model 类型**：组件通过 `v-model` 管理选中值数组。
3. **禁用优先级**：组件整体 `disabled` 为 `true` 时，会覆盖单项可用状态。
4. **数量限制**：当选中数量小于等于 `min` 时，已选项会被禁用；当选中数量大于等于 `max` 时，未选项会被禁用。
5. **布局控制**：通过 `class` 和 `optionClass` 自定义多列或卡片式排列，不再提供 `orientation`。
6. **描述文案布局**：存在 `description` 时，选项会自动切换为顶部对齐布局。
7. **自定义插槽**：使用 `option` 插槽后，默认复选框本体会隐藏，需要由插槽内容自行承担完整视觉表现。
