---
name: fa-theme-customizer
description: 为 Fantastic-admin 框架创建和定制主题配色方案，始终同时生成明色（light）和暗色（dark）两套主题。当用户提到以下任何需求时必须使用此技能：换主题颜色、换配色、做一个 XX 风格的主题、主题太单调了、品牌色是 XXX 帮我生成主题、把 tweakcn 配色转成框架主题、想要暗色/冷色/暖色调、根据设计稿颜色生成主题。即使用户只是描述一种感觉（"清新"、"沉稳"、"科技感"）或提供一个颜色值（"#2563EB"），也应触发此技能。支持"吉卜力"、"赛博朋克"、"莫兰迪"、"北欧极简"等专业设计风格关键词。
---

# 主题定制器

为 Fantastic-admin 框架生成符合规范的主题配色。

## 主题文件位置

- 主题定义：`packages/themes/index.ts`（在此替换新主题，跨所有应用共享）
- 类型推断：自动从 `packages/themes/index.ts` 的 key 推断，无需手动更新类型

## 工作流程

### 第一步：确认设计风格

如果用户没有明确指定颜色，先提供风格参考。读取 `references/design-styles.md` 获取完整的风格目录和配色建议。

### 第二步：生成 OKLCH 色值

框架使用 **OKLCH 色彩空间**，格式为 `L C H`（不含 `oklch()` 包裹，直接写三个数值）。

转换规则：
- 明色背景：`1 0 0`（纯白）或接近白色的暖/冷色调
- 暗色背景：`0.141 0.005 285.823`（默认深灰）或更深的色调
- 主色（primary）：明色通常比暗色亮度（L值）高 0.05~0.1

读取 `references/theme-structure.md` 了解完整的 CSS 变量说明和取值规范。

### 第三步：输出主题代码

在 `packages/themes/index.ts` 中替换新主题，格式严格遵循现有主题结构：

```typescript
export const lightTheme = {
  // shadcn 标准 token（必填）
  '--background': 'L C H',
  '--foreground': 'L C H',
  '--card': 'L C H',
  '--card-foreground': 'L C H',
  '--popover': 'L C H',
  '--popover-foreground': 'L C H',
  '--primary': 'L C H',
  '--primary-foreground': 'L C H',
  '--secondary': 'L C H',
  '--secondary-foreground': 'L C H',
  '--muted': 'L C H',
  '--muted-foreground': 'L C H',
  '--accent': 'L C H',
  '--accent-foreground': 'L C H',
  '--destructive': '0.577 0.245 27.325',  // 通常保持不变
  '--border': 'L C H',
  '--input': 'L C H',
  '--ring': 'L C H',  // 通常与 primary 相同
  // 框架专属 token（必填）
  '--g-main-area-bg': 'oklch(L C H)',  // 明色略深于背景，形成层次感
  '--g-header-bg': 'oklch(var(--background))',
  '--g-header-color': 'oklch(var(--foreground))',
  '--g-header-menu-color': 'oklch(var(--accent-foreground))',
  '--g-header-menu-hover-bg': 'oklch(var(--accent))',
  '--g-header-menu-hover-color': 'oklch(var(--accent-foreground))',
  '--g-header-menu-active-bg': 'oklch(var(--primary))',
  '--g-header-menu-active-color': 'oklch(var(--primary-foreground))',
  '--g-main-sidebar-bg': 'oklch(var(--background))',
  '--g-main-sidebar-menu-color': 'oklch(var(--accent-foreground))',
  '--g-main-sidebar-menu-hover-bg': 'oklch(var(--accent))',
  '--g-main-sidebar-menu-hover-color': 'oklch(var(--accent-foreground))',
  '--g-main-sidebar-menu-active-bg': 'oklch(var(--primary))',
  '--g-main-sidebar-menu-active-color': 'oklch(var(--primary-foreground))',
  '--g-sub-sidebar-bg': 'oklch(var(--background))',
  '--g-sub-sidebar-menu-color': 'oklch(var(--accent-foreground))',
  '--g-sub-sidebar-menu-hover-bg': 'oklch(var(--accent))',
  '--g-sub-sidebar-menu-hover-color': 'oklch(var(--accent-foreground))',
  '--g-sub-sidebar-menu-active-bg': 'oklch(var(--primary))',
  '--g-sub-sidebar-menu-active-color': 'oklch(var(--primary-foreground))',
  '--g-tabbar-bg': 'oklch(var(--background))',
  '--g-tabbar-tab-color': 'oklch(var(--accent-foreground) / 50%)',
  '--g-tabbar-tab-hover-bg': 'oklch(var(--accent) / 50%)',
  '--g-tabbar-tab-hover-color': 'oklch(var(--accent-foreground) / 50%)',
  '--g-tabbar-tab-active-bg': 'oklch(var(--accent))',
  '--g-tabbar-tab-active-color': 'oklch(var(--foreground))',
  '--g-toolbar-bg': 'oklch(var(--background))',
} as const

export const darkTheme = {
  // shadcn 标准 token（同明色结构，但色值更深）
  '--background': 'L C H',
  // ... 其余 shadcn token
  // 框架专属 token（暗色与明色有 5 处关键差异，见 references/theme-structure.md）
  '--g-main-area-bg': 'oklch(var(--background))',  // 暗色与背景相同，避免过多层次
  '--g-header-bg': 'oklch(var(--background))',
  '--g-header-color': 'oklch(var(--foreground))',
  '--g-header-menu-color': 'oklch(var(--muted-foreground))',       // 差异：用 muted-foreground
  '--g-header-menu-hover-bg': 'oklch(var(--muted))',               // 差异：用 muted
  '--g-header-menu-hover-color': 'oklch(var(--muted-foreground))',
  '--g-header-menu-active-bg': 'oklch(var(--accent))',             // 差异：用 accent 而非 primary
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
} as const
```

## 参考资源

- **设计风格目录**：`references/design-styles.md` — 包含 20+ 种专业设计风格的配色方案和灵感来源
- **CSS 变量说明**：`references/theme-structure.md` — 每个变量的作用、取值规范和明暗差异（含完整暗色模板）
- **社区配色**：https://tweakcn.com/community — 可直接参考社区主题的 shadcn CSS 变量
