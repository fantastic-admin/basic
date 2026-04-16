# 页面设置 (page)

## 目录
- [页面切换动画 (transitionMode)](#页面切换动画-transitionmode)
- [载入进度条 (progress)](#载入进度条-progress)
- [快捷键 (hotkeys)](#快捷键-hotkeys)

## 页面切换动画 (transitionMode)

- **类型**: `'' | 'fade' | 'slide-left' | 'slide-right' | 'slide-top' | 'slide-bottom'`
- **默认值**: `''`
- **说明**: 设置页面切换时的动画效果
  - `''` - 无动画
  - `'fade'` - 淡入淡出
  - `'slide-left'` - 向左滑动
  - `'slide-right'` - 向右滑动
  - `'slide-top'` - 向上滑动
  - `'slide-bottom'` - 向下滑动

## 载入进度条 (progress)

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 控制是否显示页面载入进度条

## 快捷键 (hotkeys)

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 控制是否启用页面相关的快捷键功能

## 完整示例

```typescript
page: {
  transitionMode: 'fade',
  progress: true,
  hotkeys: true,
}
```

## 常见配置

**启用页面切换动画:**
```typescript
page: {
  transitionMode: 'slide-right',
}
```

**禁用进度条:**
```typescript
page: {
  progress: false,
}
```

**禁用快捷键:**
```typescript
page: {
  hotkeys: false,
}
```
