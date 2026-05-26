# FaPasswordStrength 密码强度

实时显示密码强度指示，帮助用户创建更安全的密码。组件默认提供一组常见密码规则，也支持通过 `rules` 和 `colorThresholds` 完全自定义校验规则与强度颜色。

## 使用场景

- 用户注册密码设置
- 修改密码页面
- 重置密码表单
- 账号安全设置
- 密码强度要求提示

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `password` | `string` | `''` | 密码值 |
| `rules` | `{ label: string, rule: (value: string) => boolean }[]` | 默认密码强度规则 | 密码强度校验规则，命中规则数即为强度分数 |
| `colorThresholds` | `{ min: number, color: string }[]` | 默认强度色阶 | 强度颜色阈值，按 `min` 从高到低匹配 |

## 默认规则

```ts
const defaultRules = [
  { label: '长度至少为8个字符', rule: value => value.length >= 8 },
  { label: '包含大写字母', rule: value => /[A-Z]/.test(value) },
  { label: '包含小写字母', rule: value => /[a-z]/.test(value) },
  { label: '包含数字', rule: value => /\d/.test(value) },
  { label: '包含特殊字符', rule: value => /[^A-Z0-9]/i.test(value) },
]
```

## 默认颜色阈值

```ts
const defaultColorThresholds = [
  { min: 0, color: 'bg-red-500' },
  { min: 1, color: 'bg-orange-500' },
  { min: 3, color: 'bg-yellow-500' },
  { min: 5, color: 'bg-green-500' },
]
```

`colorThresholds` 会按照 `min` 从高到低匹配，例如当前命中 4 条规则时，会使用 `min: 3` 对应的颜色。

## 注意事项

1. **实时反馈**：密码强度会随输入实时更新。
2. **规则数量**：强度满分等于 `rules.length`，进度条宽度按命中规则数占比计算。
3. **颜色阈值**：`colorThresholds` 使用命中规则数匹配，而不是百分比匹配。
