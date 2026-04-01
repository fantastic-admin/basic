# 工具栏设置 (toolbar)

## 目录
- [面包屑导航 (breadcrumb)](#面包屑导航-breadcrumb)
- [导航搜索 (menuSearch)](#导航搜索-menusearch)
- [全屏功能 (fullscreen)](#全屏功能-fullscreen)
- [页面刷新 (pageReload)](#页面刷新-pagereload)
- [颜色主题切换 (colorScheme)](#颜色主题切换-colorscheme)

## 面包屑导航 (breadcrumb)

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 控制是否显示面包屑导航

## 导航搜索 (menuSearch)

### enable
- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 控制是否启用菜单搜索功能

### hotkeys
- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 控制是否启用导航搜索的快捷键

**示例:**
```typescript
toolbar: {
  menuSearch: {
    enable: true,
    hotkeys: true,
  }
}
```

## 全屏功能 (fullscreen)

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 控制是否启用全屏切换功能

## 页面刷新 (pageReload)

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 控制是否启用页面刷新功能

## 颜色主题切换 (colorScheme)

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 控制是否启用颜色主题切换功能

## 完整示例

```typescript
toolbar: {
  breadcrumb: true,
  menuSearch: {
    enable: true,
    hotkeys: true,
  },
  fullscreen: true,
  pageReload: true,
  colorScheme: true,
}
```

## 常见配置

**启用所有工具栏功能:**
```typescript
toolbar: {
  breadcrumb: true,
  menuSearch: { enable: true },
  fullscreen: true,
  pageReload: true,
  colorScheme: true,
}
```
