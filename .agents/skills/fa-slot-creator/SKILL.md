---
name: fa-slot-creator
description: 在 Fantastic-admin 框架中创建插槽，向布局的任意位置注入自定义内容。当用户提到以下任何需求时必须使用此技能：在头部/侧边栏/工具栏/标签栏加东西、logo 旁边加内容、侧边栏底部加用户信息、加个悬浮按钮、在导航菜单右侧加自定义组件、想在框架布局某个区域插入内容、在页面顶部或底部插入全局横幅/公告/版权栏。即使用户只是说"在顶部加个 XX"或"侧边栏加点东西"，也应触发此技能。支持 19 个插槽位置。
---

# Fantastic-admin 插槽创建器

框架通过约定自动发现插槽：目录名必须与插槽名完全匹配（区分大小写），文件名固定为 `index.vue`。不符合约定的文件不会被加载，这是框架的自动发现机制决定的。

## 第一步：确认工作区（必须阻塞等待用户回复）

本项目是 monorepo 架构，`apps/` 目录下存放各应用。**在执行任何文件读写操作之前**，必须先确认目标应用：

1. 执行 `ls apps/` 列出所有可用应用
2. **立即向用户提问**，明确询问要在哪个应用中创建插槽，并**停止等待回复**
3. 收到用户明确回复后，才能继续后续步骤

> **严格规则**：如果用户没有在请求中明确说明目标应用（例如"在 example 应用中"、"apps/core"），则必须提问，不得自行猜测或默认选择任何应用。

确认后，后续所有文件路径均以该应用目录为根，例如 `apps/<app>/src/slots/`。

## 创建插槽（手动步骤）

1. 创建目录：`apps/<app>/src/slots/{插槽名称}/`
2. 在该目录下创建 `index.vue` 文件，内容参考下方模板

### 普通插槽模板

```vue
<script setup lang="ts">
// 在此添加插槽逻辑
</script>

<template>
  <div>
    <!-- 在此添加插槽内容 -->
  </div>
</template>

<style scoped>
/* 在此添加插槽样式 */
</style>
```

### FreePosition 插槽模板

```vue
<script setup lang="ts">
// 在此添加插槽逻辑
</script>

<template>
  <div class="free-position-slot">
    <!-- 在此添加插槽内容 -->
    <!-- 注意：此插槽需要绝对定位 -->
  </div>
</template>

<style scoped>
.free-position-slot {
  position: absolute;
  /* 在此设置定位坐标，例如： */
  /* bottom: 20px; */
  /* right: 20px; */
  /* z-index: 1000; */
}
</style>
```

## 可用插槽位置

| 区域 | 插槽名称 |
|------|---------|
| 布局 | `LayoutTop`、`LayoutBottom` |
| 头部 | `HeaderStart`、`HeaderAfterLogo`、`HeaderAfterMenu`、`HeaderEnd` |
| 主侧边栏 | `MainSidebarTop`、`MainSidebarAfterLogo`、`MainSidebarAfterMenu`、`MainSidebarBottom` |
| 子侧边栏 | `SubSidebarTop`、`SubSidebarAfterLogo`、`SubSidebarAfterMenu`、`SubSidebarBottom` |
| 标签栏 | `TabbarStart`、`TabbarEnd` |
| 工具栏 | `ToolbarStart`、`ToolbarEnd` |
| 自由定位 | `FreePosition` |

## 选择指南

- 全局顶部横幅/公告（覆盖整个布局最上方） → `LayoutTop`
- 全局底部栏/版权声明（覆盖整个布局最下方） → `LayoutBottom`
- 全局导航元素 → `HeaderStart` / `HeaderEnd`
- 侧边栏用户信息/品牌内容 → `MainSidebarTop` / `MainSidebarAfterLogo`
- 工具栏自定义操作 → `ToolbarStart` / `ToolbarEnd`
- 悬浮元素（需要绝对定位） → `FreePosition`

> `LayoutTop` / `LayoutBottom` 位于整个布局的最外层，内容会横跨全宽，适合全局公告横幅、版权栏等需要独占一行的场景。

## FreePosition 特殊说明

`FreePosition` 插槽需要在样式中手动设置定位，否则内容不可见（模板见上方"FreePosition 插槽模板"）。

## 故障排除

插槽未显示？检查：
- 目录名是否与插槽名完全匹配（区分大小写）
- 文件名是否为 `index.vue`
- `apps/<app>/src/slots/` 目录是否存在
