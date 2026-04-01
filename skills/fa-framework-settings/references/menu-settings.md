# 导航菜单设置 (menu)

## 目录
- [导航菜单模式 (mode)](#导航菜单模式-mode)
- [导航菜单风格 (style)](#导航菜单风格-style)
- [暗色模式 (dark)](#暗色模式-dark)
- [主导航点击模式 (mainMenuClickMode)](#主导航点击模式-mainmenuclickmode)
- [次导航展开行为](#次导航展开行为)
- [快捷键 (hotkeys)](#快捷键-hotkeys)

## 导航菜单模式 (mode)

- **类型**: `'side' | 'head' | 'single' | 'only-side' | 'only-head' | 'side-panel' | 'head-panel'`
- **默认值**: `'side'`
- **说明**: 设置导航菜单的显示模式
  - `'side'` - 侧边栏模式(有主导航菜单)
  - `'head'` - 顶部模式
  - `'single'` - 侧边栏模式(无主导航菜单)
  - `'only-side'` - 侧边栏精简模式
  - `'only-head'` - 顶部精简模式
  - `'side-panel'` - 侧边栏面板模式
  - `'head-panel'` - 顶部面板模式

## 导航菜单风格 (style)

- **类型**: `'' | 'arrow' | 'line' | 'dot'`
- **默认值**: `''`
- **说明**: 设置导航菜单的视觉风格
  - `''` - 默认风格
  - `'arrow'` - 箭头风格
  - `'line'` - 线条风格
  - `'dot'` - 圆点风格

## 暗色模式 (dark)

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 仅在亮色模式下生效,控制导航菜单是否使用暗色主题

## 主导航菜单点击模式 (mainMenuClickMode)

- **类型**: `'switch' | 'jump' | 'smart'`
- **默认值**: `'switch'`
- **说明**: 设置主导航菜单项的点击行为
  - `'switch'` - 切换
  - `'jump'` - 跳转
  - `'smart'` - 智能选择,判断次导航是否只有且只有一个可访问的菜单进行切换或跳转操作

## 次导航菜单展开行为

### subMenuUniqueExpand

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 次导航菜单是否只保持一个子项的展开

### subMenuCollapse

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 次导航菜单是否收起

### subMenuAutoCollapse

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 次导航菜单是否自动收起

### subMenuCollapseButton

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否开启次导航菜单的展开/收起按钮

## 快捷键 (hotkeys)

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 控制是否启用导航菜单相关的快捷键功能

## 完整示例

```typescript
menu: {
  mode: 'side',
  style: 'dot',
  dark: false,
  mainMenuClickMode: 'switch',
  subMenuUniqueExpand: true,
  subMenuCollapse: false,
  subMenuAutoCollapse: false,
  subMenuCollapseButton: true,
  hotkeys: true,
}
```

## 常见配置

**顶部导航菜单模式:**
```typescript
menu: {
  mode: 'head',
}
```

**侧边栏精简模式:**
```typescript
menu: {
  mode: 'only-side',
}
```

**启用暗色导航菜单(仅亮色模式下):**
```typescript
menu: {
  dark: true,
}
```

**智能主导航菜单点击:**
```typescript
menu: {
  mainMenuClickMode: 'smart',
}
```

**启用次导航菜单收起按钮:**
```typescript
menu: {
  subMenuCollapseButton: true,
}
```
