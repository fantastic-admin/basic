# FaSelect 选择器

下拉选择器组件，支持单选、多选、分组和下拉内容定位方式。

## 使用场景

- 表单下拉选择
- 筛选条件选择
- 城市/地区选择
- 分类/标签选择
- 单选/多选配置项

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `multiple` | `boolean` | `false` | 是否多选 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `position` | `'popper' \| 'item-aligned'` | `'popper'` | 下拉内容的定位模式 |
| `options` | `(Option \| GroupOption)[]` | **必需** | 选项数据 |
| `placeholder` | `string` | - | 占位提示文本 |
| `class` | `HTMLAttributes['class']` | - | 自定义 CSS 类 |

### Option 接口

```ts
interface Option {
  label: string
  value: AcceptableValue
  disabled?: boolean
}
```

### GroupOption 接口（分组选项）

```ts
interface GroupOption {
  label: string
  options: Option[]
}
```

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `change` | 选项变化时触发 | `value: AcceptableValue \| undefined` |

## 注意事项

1. **v-model 绑定**：使用 `v-model` 实现双向数据绑定
2. **选项数据结构**：`options` 支持普通选项和分组选项两种格式
3. **值类型**：`value` 可以是字符串、数字等类型
4. **分组显示**：当 `options` 中包含 `options` 属性时，会自动识别为分组选项
5. **z-index**：下拉菜单的 z-index 默认为 2000，确保在其他内容上方显示
6. **定位模式**：`position="popper"` 时下拉内容跟随触发器定位，`position="item-aligned"` 时会更接近原生 Select 的对齐方式
