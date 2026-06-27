# FaForm 表单

基于 `vee-validate` 的表单组件，提供接近 Element Plus / Naive UI 的声明式写法。

## 基础用法

```vue
<FaForm :validation-schema="schema" :model="model" @submit="onSubmit">
  <FaFormItem name="account" label="账号" required>
    <FaInput />
  </FaFormItem>
  <FaButton type="submit">
    提交
  </FaButton>
</FaForm>
```

## model 与 initialValues

常规业务表单推荐使用 `model` 传入整个表单对象。字段变化会同步回该对象，也可以使用 `v-model:model` 接收完整表单对象更新。

`initialValues` 仍然保留，适合只需要初始化表单、不关心外部表单对象同步的非受控用法。`model` 和 `initialValues` 同时传入时，以 `model` 为准。

## FaForm Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `as` | `'form' \| 'div'` | `'form'` | 根节点类型 |
| `model` | `FormOptions['initialValues']` | - | 表单数据对象，推荐用法，字段变化会同步回该对象 |
| `validationSchema` | `Partial<Record<Path, Rule>> \| TypedSchema \| YupSchema` | - | vee-validate 校验 schema |
| `initialValues` | `FormOptions['initialValues']` | - | 非受控表单初始值；同时传入 `model` 时以 `model` 为准 |
| `labelPlacement` | `'top' \| 'left' \| 'right'` | `'top'` | 标签位置 |
| `labelWidth` | `string \| number` | `'96px'` | 横向布局标签宽度 |
| `disabled` | `boolean` | `false` | 是否禁用表单控件 |
| `scrollToError` | `boolean` | `false` | 提交失败时滚动到首个错误字段 |

## FaFormItem Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `name` | `string` | - | 字段路径，支持 vee-validate 路径语法 |
| `label` | `string` | - | 标签 |
| `description` | `string` | - | 辅助说明 |
| `rules` | `RuleExpression` | - | 字段级校验规则 |
| `required` | `boolean` | `false` | 是否显示必填标记 |
| `autoBind` | `boolean` | `true` | 是否自动向默认插槽第一个节点注入字段值、事件、禁用状态等绑定 |
| `labelPlacement` | `'top' \| 'left' \| 'right'` | - | 局部覆盖标签位置 |
| `labelWidth` | `string \| number` | - | 局部覆盖标签宽度 |

## 复合输入

`FaFormItem` 默认会向默认插槽的第一个节点自动注入表单绑定，让普通输入控件无需手写 `v-model`。

当字段由多个控件共同维护，或默认插槽第一个节点只是布局容器时，可设置 `auto-bind="false"` 关闭自动绑定。关闭后，`FaFormItem` 不会自动向默认插槽第一个节点注入字段值、事件、禁用状态和 `name` 等属性，仅保留表单项的说明、错误信息和无障碍状态关联。

默认插槽仅暴露 `componentField`。普通自定义控件可手动 `v-bind="componentField"`，复合输入在 `auto-bind="false"` 时直接维护传入 `FaForm` 的 `model`。

## Expose

| 方法 | 说明 |
|------|------|
| `submit()` | 触发表单提交 |
| `validate()` | 校验整个表单 |
| `resetFields()` | 重置表单 |
| `clearValidate(name?)` | 清空单个或全部字段错误 |
| `setFieldValue(name, value, shouldValidate?)` | 设置字段值 |
| `setFieldError(name, message?)` | 设置字段错误 |
| `scrollToField(name)` | 滚动并聚焦到字段 |
