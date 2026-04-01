# 标签栏设置 (tabbar)

## 目录
- [标签栏风格 (style)](#标签栏风格-style)
- [最小最大宽度 (minMaxWidth)](#最小最大宽度-minmaxwidth)
- [显示图标 (icon)](#显示图标-icon)
- [双击执行动作 (dblclickAction)](#双击执行动作-dblclickaction)
- [记忆功能 (memory)](#记忆功能-memory)
- [快捷键 (hotkeys)](#快捷键-hotkeys)

## 标签栏风格 (style)

- **类型**: `'' | 'fashion' | 'card' | 'square'`
- **默认值**: `''`
- **说明**: 设置标签栏的视觉风格
  - `''` - 默认风格
  - `'fashion'` - 时尚风格
  - `'card'` - 卡片风格
  - `'square'` - 方块风格

## 最小最大宽度 (minMaxWidth)

- **类型**: `readonly [number | 'unset', number | 'unset']`
- **默认值**: `[150, 150]`
- **说明**: 设置标签的最小和最大宽度,当设置为 `'unset'` 时为自适应
  - `[150, 150]` - 固定宽度 150px
  - `[150, 'unset']` - 最小宽度 150px
  - `['unset', 150]` - 最大宽度 150px
  - `['unset', 'unset']` - 跟随文字长度自适应

## 显示图标 (icon)

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 控制标签是否显示图标

## 双击执行动作 (dblclickAction)

- **类型**: `'reload' | 'close' | 'pin' | 'maximize' | 'window'`
- **默认值**: `'close'`
- **说明**: 设置双击标签时执行的动作
  - `'reload'` - 刷新
  - `'close'` - 关闭
  - `'pin'` - 固定/取消固定
  - `'maximize'` - 最大化
  - `'window'` - 新窗口打开

## 记忆功能 (memory)

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 控制是否记住用户的标签操作状态

## 快捷键 (hotkeys)

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 控制是否启用标签栏相关的快捷键功能

## 完整示例

```typescript
tabbar: {
  style: 'fashion',
  minMaxWidth: [150, 150],
  icon: true,
  dblclickAction: 'close',
  memory: true,
  hotkeys: true,
}
```

## 常见配置

**时尚风格标签栏:**
```typescript
tabbar: {
  style: 'fashion',
}
```

**显示图标:**
```typescript
tabbar: {
  icon: true,
}
```

**自适应宽度:**
```typescript
tabbar: {
  minMaxWidth: ['unset', 'unset'],
}
```

**双击刷新:**
```typescript
tabbar: {
  dblclickAction: 'reload',
}
```

**启用记忆功能:**
```typescript
tabbar: {
  memory: true,
}
```
