# 顶栏设置 (topbar)

## 目录
- [标签栏 (tabbar)](#标签栏-tabbar)
- [工具栏 (toolbar)](#工具栏-toolbar)
- [顶栏模式 (mode)](#顶栏模式-mode)

## 标签栏 (tabbar)

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 控制是否在顶栏显示标签栏

## 工具栏 (toolbar)

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 控制是否在顶栏显示工具栏

## 顶栏模式 (mode)

- **类型**: `'static' | 'fixed' | 'sticky'`
- **默认值**: `'static'`
- **说明**: 设置顶栏的显示模式
  - `'static'` - 静止,跟随页面滚动
  - `'fixed'` - 固定,不跟随页面滚动,始终固定在顶部
  - `'sticky'` - 粘性,页面往下滚动时隐藏,往上滚动时显示

## 完整示例

```typescript
topbar: {
  tabbar: true,
  toolbar: true,
  mode: 'fixed',
}
```

## 常见配置

**启用标签栏和工具栏:**
```typescript
topbar: {
  tabbar: true,
  toolbar: true,
}
```

**固定顶栏:**
```typescript
topbar: {
  mode: 'fixed',
}
```

**粘性顶栏(智能显示/隐藏):**
```typescript
topbar: {
  mode: 'sticky',
}
```
