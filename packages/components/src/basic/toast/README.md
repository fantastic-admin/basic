# FaToast 轻提示

全局轻提示组件，用于展示操作反馈消息。

## 使用场景

- 表单提交反馈
- 操作成功/失败提示
- 删除确认反馈
- 上传/下载进度提示
- 系统通知
- 数据保存提示

## Props

无（通过 `useFaToast()` 函数调用配置）

## API

### useFaToast 方法

| 方法 | 说明 |
|------|------|
| `useFaToast()(message)` | 普通提示 |
| `useFaToast().success(message)` | 成功提示 |
| `useFaToast().error(message)` | 错误提示 |
| `useFaToast().warning(message)` | 警告提示 |
| `useFaToast().info(message)` | 信息提示 |
| `useFaToast().loading(message)` | 加载提示 |
| `useFaToast().promise(promise, options)` | Promise 提示 |

## 注意事项

1. **全局组件**：`<FaToast />` 需要在应用根组件中添加一次
2. **自动消失**：提示默认 3 秒后自动消失
3. **堆叠显示**：多个提示会堆叠显示
4. **可点击关闭**：每个提示都可以手动点击关闭
