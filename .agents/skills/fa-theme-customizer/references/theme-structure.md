# 主题 CSS 变量结构说明

## 变量分类

主题由两类变量组成：
1. **shadcn 标准 token** — 通用设计系统变量，控制组件颜色
2. **框架专属 token（`--g-*`）** — 控制布局区域颜色

---

## shadcn 标准 Token

格式：`'L C H'`（OKLCH 三个数值，不含 `oklch()` 包裹）

| 变量 | 作用 |
|------|------|
| `--background` | 页面主背景色 |
| `--foreground` | 主文字颜色 |
| `--card` | 卡片背景色（通常同 background） |
| `--card-foreground` | 卡片文字颜色 |
| `--popover` | 弹出层背景色 |
| `--popover-foreground` | 弹出层文字颜色 |
| `--primary` | 主色调（按钮、高亮、激活状态） |
| `--primary-foreground` | 主色上的文字颜色 |
| `--secondary` | 次要色（次要按钮、标签背景） |
| `--secondary-foreground` | 次要色上的文字颜色 |
| `--muted` | 静音色（禁用状态、次要背景） |
| `--muted-foreground` | 静音色上的文字颜色 |
| `--accent` | 强调色（hover 状态背景） |
| `--accent-foreground` | 强调色上的文字颜色 |
| `--destructive` | 危险/错误色（删除、警告） |
| `--border` | 边框颜色 |
| `--input` | 输入框边框颜色 |
| `--ring` | 焦点环颜色（通常同 primary） |

---

## 框架专属 Token（`--g-*`）

格式：`'oklch(L C H)'` 或 `'oklch(var(--xxx))'`（含 `oklch()` 包裹）

| 变量 | 作用 |
|------|------|
| `--g-main-area-bg` | 主内容区域背景 |
| `--g-header-bg` | 顶部背景 |
| `--g-header-color` | 顶部文字颜色 |
| `--g-header-menu-color` | 顶部导航菜单项文字颜色 |
| `--g-header-menu-hover-bg` | 顶部导航菜单项 hover 背景 |
| `--g-header-menu-hover-color` | 顶部导航菜单项 hover 文字颜色 |
| `--g-header-menu-active-bg` | 顶部导航菜单项激活背景 |
| `--g-header-menu-active-color` | 顶部导航菜单项激活文字颜色 |
| `--g-main-sidebar-bg` | 主侧边栏背景 |
| `--g-main-sidebar-menu-color` | 主侧边栏导航菜单文字颜色 |
| `--g-main-sidebar-menu-hover-bg` | 主侧边栏导航菜单 hover 背景 |
| `--g-main-sidebar-menu-hover-color` | 主侧边栏导航菜单 hover 文字颜色 |
| `--g-main-sidebar-menu-active-bg` | 主侧边栏导航菜单激活背景 |
| `--g-main-sidebar-menu-active-color` | 主侧边栏导航菜单激活文字颜色 |
| `--g-sub-sidebar-bg` | 次侧边栏背景 |
| `--g-sub-sidebar-menu-color` | 次侧边栏导航菜单文字颜色 |
| `--g-sub-sidebar-menu-hover-bg` | 次侧边栏导航菜单 hover 背景 |
| `--g-sub-sidebar-menu-hover-color` | 次侧边栏导航菜单 hover 文字颜色 |
| `--g-sub-sidebar-menu-active-bg` | 次侧边栏导航菜单激活背景 |
| `--g-sub-sidebar-menu-active-color` | 次侧边栏导航菜单激活文字颜色 |
| `--g-tabbar-bg` | 标签栏背景 |
| `--g-tabbar-tab-color` | 标签项文字颜色 |
| `--g-tabbar-tab-hover-bg` | 标签项 hover 背景 |
| `--g-tabbar-tab-hover-color` | 标签项 hover 文字颜色 |
| `--g-tabbar-tab-active-bg` | 标签项激活背景 |
| `--g-tabbar-tab-active-color` | 标签项激活文字颜色 |
| `--g-toolbar-bg` | 工具栏背景 |

---

## 明色与暗色的关键差异

### 差异一：菜单激活状态

明色使用 `primary`，暗色使用 `accent`：

```typescript
// 明色
'--g-header-menu-active-bg': 'oklch(var(--primary))',
'--g-header-menu-active-color': 'oklch(var(--primary-foreground))',

// 暗色
'--g-header-menu-active-bg': 'oklch(var(--accent))',
'--g-header-menu-active-color': 'oklch(var(--accent-foreground))',
```

同样适用于 `--g-main-sidebar-menu-active-*` 和 `--g-sub-sidebar-menu-active-*`。

### 差异二：主内容区背景

```typescript
// 明色：略深于背景，形成层次感
'--g-main-area-bg': 'oklch(0.9612 0 0)',

// 暗色：与背景相同，避免过多层次
'--g-main-area-bg': 'oklch(var(--background))',
```

### 差异三：标签栏 hover 背景

```typescript
// 明色
'--g-tabbar-tab-hover-bg': 'oklch(var(--border))',

// 暗色
'--g-tabbar-tab-hover-bg': 'oklch(var(--accent) / 50%)',
```

### 差异四：标签栏激活背景

```typescript
// 明色
'--g-tabbar-tab-active-bg': 'oklch(var(--background))',

// 暗色
'--g-tabbar-tab-active-bg': 'oklch(var(--secondary))',
```

### 差异五：菜单颜色引用

```typescript
// 明色：使用 accent-foreground
'--g-header-menu-color': 'oklch(var(--accent-foreground))',
'--g-header-menu-hover-color': 'oklch(var(--accent-foreground))',

// 暗色：使用 muted-foreground
'--g-header-menu-color': 'oklch(var(--muted-foreground))',
'--g-header-menu-hover-color': 'oklch(var(--muted-foreground))',
```

---

## 完整暗色 `--g-*` 模板

```typescript
dark: {
  // shadcn token ...
  '--g-main-area-bg': 'oklch(var(--background))',
  '--g-header-bg': 'oklch(var(--background))',
  '--g-header-color': 'oklch(var(--foreground))',
  '--g-header-menu-color': 'oklch(var(--muted-foreground))',
  '--g-header-menu-hover-bg': 'oklch(var(--muted))',
  '--g-header-menu-hover-color': 'oklch(var(--muted-foreground))',
  '--g-header-menu-active-bg': 'oklch(var(--accent))',
  '--g-header-menu-active-color': 'oklch(var(--accent-foreground))',
  '--g-main-sidebar-bg': 'oklch(var(--background))',
  '--g-main-sidebar-menu-color': 'oklch(var(--muted-foreground))',
  '--g-main-sidebar-menu-hover-bg': 'oklch(var(--muted))',
  '--g-main-sidebar-menu-hover-color': 'oklch(var(--muted-foreground))',
  '--g-main-sidebar-menu-active-bg': 'oklch(var(--accent))',
  '--g-main-sidebar-menu-active-color': 'oklch(var(--accent-foreground))',
  '--g-sub-sidebar-bg': 'oklch(var(--background))',
  '--g-sub-sidebar-menu-color': 'oklch(var(--muted-foreground))',
  '--g-sub-sidebar-menu-hover-bg': 'oklch(var(--muted))',
  '--g-sub-sidebar-menu-hover-color': 'oklch(var(--muted-foreground))',
  '--g-sub-sidebar-menu-active-bg': 'oklch(var(--accent))',
  '--g-sub-sidebar-menu-active-color': 'oklch(var(--accent-foreground))',
  '--g-tabbar-bg': 'oklch(var(--background))',
  '--g-tabbar-tab-color': 'oklch(var(--accent-foreground) / 50%)',
  '--g-tabbar-tab-hover-bg': 'oklch(var(--accent) / 50%)',
  '--g-tabbar-tab-hover-color': 'oklch(var(--accent-foreground) / 50%)',
  '--g-tabbar-tab-active-bg': 'oklch(var(--accent))',
  '--g-tabbar-tab-active-color': 'oklch(var(--foreground))',
  '--g-toolbar-bg': 'oklch(var(--background))',
},
```
