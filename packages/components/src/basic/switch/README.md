# FaSwitch 开关

开关切换组件，支持图标和状态变化前的回调处理。

## 使用场景

- 深色模式切换
- 通知设置开关
- 功能启用/禁用
- 布尔值配置项
- 快速状态切换

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `disabled` | `boolean` | `false` | 是否禁用 |
| `onIcon` | `string` | - | 开启状态图标 |
| `offIcon` | `string` | - | 关闭状态图标 |
| `beforeChange` | `() => boolean \| Promise<boolean>` | - | 状态变化前回调 |

## Events

通过 `v-model` 双向绑定，无需单独事件

## 注意事项

1. **v-model 绑定**：使用 `v-model` 实现双向数据绑定，值为 boolean 类型
2. **图标显示**：`onIcon` 在开启状态显示，`offIcon` 在关闭状态显示
3. **异步确认**：`beforeChange` 支持返回 Promise，可用于异步确认操作
4. **取消变化**：`beforeChange` 返回 false 或 Promise resolve false 时，状态不会改变
5. **禁用状态**：禁用状态下开关无法点击，也无法切换状态
