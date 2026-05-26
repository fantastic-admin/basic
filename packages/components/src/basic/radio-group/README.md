# FaRadioGroup 单选组

基于选项数组的单选组件，支持描述文案、自定义布局样式和选项插槽扩展。

## 使用场景

- 表单中的单选配置项
- 布局模式切换
- 套餐、规格、主题方案选择
- 带说明文案的单选列表
- 需要自定义选项卡片样式的单选交互

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `options` | `RadioGroupOption[]` | **必需** | 单选组选项数据 |
| `disabled` | `boolean` | `false` | 是否整体禁用 |
| `dir` | `'ltr' \| 'rtl'` | - | 文本方向 |
| `class` | `HTMLAttributes['class']` | - | 单选组容器类名 |
| `optionClass` | `HTMLAttributes['class']` | - | 每个选项外层容器类名 |
| `itemClass` | `HTMLAttributes['class']` | - | `RadioGroupItem` 类名 |

### RadioGroupOption 接口

```ts
export interface RadioGroupOption {
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
| `change` | 选中值变化时触发 | `value: AcceptableValue \| undefined` |

通过 `v-model` 实现双向绑定。

## 注意事项

1. **初始化值**：组件当前通过 `v-model` 管理选中值，不再提供 `defaultValue`。
2. **选项结构**：`options` 至少需要 `label` 和 `value` 两个字段。
3. **禁用优先级**：组件整体 `disabled` 为 `true` 时，会覆盖单项可用状态。
4. **布局控制**：通过 `class` 和 `optionClass` 自定义多列或卡片式排列，不再提供 `orientation`。
5. **描述文案布局**：存在 `description` 时，选项会自动切换为顶部对齐布局。
6. **自定义插槽**：使用 `option` 插槽后，默认 `RadioGroupItem` 会隐藏，需要由插槽内容自行承担完整视觉表现。
7. **点击区域**：默认选项内容包裹在 `Label` 中，点击文字区域也能切换选中状态。
