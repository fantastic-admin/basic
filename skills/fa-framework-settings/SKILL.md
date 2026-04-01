---
name: fa-framework-settings
description: 管理和配置 Fantastic-admin 框架设置。当用户提到以下任何需求时必须使用此技能：开启/关闭水印、锁屏、错误日志、更新检查、哀悼模式、移动端访问；切换暗色/亮色/跟随系统主题；修改菜单模式（侧边栏/顶部/精简/面板）；配置标签栏风格（fashion/card/square）；启用/禁用工具栏功能（收藏夹、面包屑、搜索、通知、国际化、全屏、刷新）；设置版权信息；配置认证/权限/登录过期；调整页面切换动画；配置居中布局；修改路由模式；以及任何涉及 src/settings/index.ts 的修改。
---

# 框架设置

## 第一步：确认工作区（必须阻塞等待用户回复）

本项目是 monorepo 架构，`apps/` 目录下存放各应用。**在执行任何文件读写操作之前**，必须先确认目标应用：

1. 执行 `ls apps/` 列出所有可用应用
2. **立即向用户提问**，明确询问要在哪个应用中修改设置，并**停止等待回复**
3. 收到用户明确回复后，才能继续后续步骤

> **严格规则**：如果用户没有在请求中明确说明目标应用（例如"在 example 应用中"、"apps/core"），则必须提问，不得自行猜测或默认选择任何应用。

确认后，后续所有文件路径均以该应用目录为根，例如 `apps/<app>/src/settings.ts`。

## 核心文件

- `apps/<app>/src/settings.ts` - 当前配置文件（修改此文件）
- `packages/settings/types.ts` - TypeScript 类型定义（只读参考）
- `packages/settings/src/default.ts` - 默认完整配置（禁止修改，仅供参考）

## 工作流程

1. 读取 `apps/<app>/src/settings.ts` 了解当前配置
2. 查阅 `packages/settings/types.ts` 中的类型定义了解可用选项
3. 查阅 `packages/settings/src/default.ts` 了解默认值
4. 仅修改 `apps/<app>/src/settings.ts`
5. 修改后检查：与默认值相同的配置项直接移除——`settings.ts` 只需保留真正自定义的内容，框架会自动继承默认配置，这样维护时一眼就能看出哪些是项目定制的

## 配置领域

详细配置选项请参考：
- **应用设置**: [references/app-settings.md](references/app-settings.md) - 认证、路由、功能开关、布局、主页、版权等
- **主题设置**: [references/theme-settings.md](references/theme-settings.md) - 颜色方案、主题同步、圆角、色弱模式等
- **导航菜单设置**: [references/menu-settings.md](references/menu-settings.md) - 导航菜单模式、风格、展开/收起行为、快捷键等
- **顶栏设置**: [references/topbar-settings.md](references/topbar-settings.md) - 标签栏、工具栏、显示模式等
- **标签栏设置**: [references/tabbar-settings.md](references/tabbar-settings.md) - 风格、图标、双击动作、记忆功能等
- **工具栏设置**: [references/toolbar-settings.md](references/toolbar-settings.md) - 收藏夹、面包屑、搜索、通知、国际化等
- **页面设置**: [references/page-settings.md](references/page-settings.md) - 快捷键、iframe 保活、切换动画、进度条等
