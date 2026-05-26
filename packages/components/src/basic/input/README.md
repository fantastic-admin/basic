# FaInput 输入框

基础输入框组件，支持密码显示切换、清空按钮和前后缀插槽。

## 使用场景

- 表单输入字段
- 搜索框
- 密码输入
- 带单位的数值输入
- 带前缀的账号输入（如 +86）

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `'text' \| 'password'` | `'text'` | 输入类型 |
| `align` | `'inline' \| 'block'` | `'inline'` | 前后缀对齐方式 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `clearable` | `boolean` | `false` | 是否显示清空按钮 |
| `class` | `HTMLAttributes['class']` | - | 组件外层 CSS 类 |
| `inputClass` | `HTMLAttributes['class']` | - | 输入框 CSS 类 |
| `startClass` | `HTMLAttributes['class']` | - | 前缀区域 CSS 类 |
| `endClass` | `HTMLAttributes['class']` | - | 后缀区域 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `start` | 输入框前缀内容（图标、文字等） |
| `end` | 输入框后缀内容（图标、按钮等） |

## Events

| 事件名 | 说明 |
|--------|------|
| `clear` | 点击清空按钮时触发 |

## Exposed Methods

| 方法名 | 说明 |
|--------|------|
| `ref` | 获取原生 input 元素引用 |

## 注意事项

1. **v-model 绑定**：使用 `v-model` 实现双向数据绑定
2. **密码切换**：`type="password"` 时自动显示眼睛图标切换明文/密文
3. **清空按钮**：`clearable` 模式下，仅当输入框有值且获得焦点或悬停时显示清空按钮
4. **原生属性**：支持所有原生 input 属性（placeholder、autocomplete 等）
5. **对齐方式**：`align="inline"` 时前后缀与输入内容同行，`align="block"` 时上下排列
