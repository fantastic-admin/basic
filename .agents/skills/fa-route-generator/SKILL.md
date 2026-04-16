---
name: fa-route-generator
description: 管理 Vue Router 路由配置，用于 Fantastic-admin 框架。当用户提到以下任何需求时必须使用此技能：新建页面需要加路由、详情页不想显示在菜单里、新增页和编辑页老是开两个标签、从列表跳详情返回后状态丢失、给菜单项加 NEW 标签或红点、路由需要权限控制、配置页面保活、修改路由 meta、添加面包屑配置。即使用户只是说"加个路由"或"新建了一个页面"，也应触发此技能。
---

# 路由生成器

框架通过路由自动生成导航菜单，路由配置需要遵循特定约定。

## 第一步：确认工作区（必须阻塞等待用户回复）

本项目是 monorepo 架构，`apps/` 目录下存放各应用。**在执行任何文件读写操作之前**，必须先确认目标应用：

1. 执行 `ls apps/` 列出所有可用应用
2. **立即向用户提问**，明确询问要在哪个应用中操作路由，并**停止等待回复**
3. 收到用户明确回复后，才能继续后续步骤

> **严格规则**：如果用户没有在请求中明确说明目标应用（例如"在 example 应用中"、"apps/core"），则必须提问，不得自行猜测或默认选择任何应用。

确认后，后续所有文件路径均以该应用目录为根，例如 `apps/<app>/src/router/`。

## 前置检查

读取 `apps/<app>/src/settings.ts`，检查 `app.routeBaseOn` 的值：

- `'frontend'`（默认）：可以继续
- `'backend'`：路由由后端驱动，手动创建的路由文件会被忽略，告知用户此模式不支持前端路由文件生成

## 工作流程

### 场景 A: 创建新路由

#### 1. 收集路由信息

向用户询问或确认：路由路径、页面标题、图标（可选）、是否多级路由、所属主导航分组。

#### 2. 创建路由文件

在 `apps/<app>/src/router/modules/` 下创建 `<模块名>.ts`：

```typescript
import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/example',
  component: Layout,
  name: 'example',
  meta: {
    title: '示例',
    icon: 'i-ep:menu',
  },
  children: [
    {
      path: '',
      name: 'exampleIndex',
      component: () => import('@/views/example/index.vue'),
      meta: {
        title: '示例页面',
      },
    },
  ],
}

export default routes
```

#### 3. 更新 routes.ts

在 `apps/<app>/src/router/routes.ts` 中添加 import 并注册到对应主导航分组的 `children` 数组。

### 场景 B: 修改现有路由

定位路由文件（在 `apps/<app>/src/router/modules/` 下搜索），读取后按需修改 meta 属性。常见修改：

**权限控制**：
```typescript
meta: { auth: 'user:view' }  // 或数组 ['user:view', 'user:edit']
```

**页面保活**（从详情返回列表时保留列表状态）：
```typescript
// 列表页
meta: { keepAlive: ['productDetail'] }
// 详情页
meta: { menu: false, activeMenu: '/product', noKeepAlive: 'productList' }
```

**隐藏菜单项**：
```typescript
meta: { menu: false, activeMenu: '/parent/path' }
```

## 框架约定

- 一级路由 `path` 必须以 `/` 开头，`component` 必须是 `Layout`
- 子路由 `path` 不要以 `/` 开头
- 多级路由的中间层级无需设置 `component`
- 所有路由的 `name` 必须全局唯一

## Meta 属性配置

详细属性说明见 [references/route-meta.md](references/route-meta.md)，更多示例见 [references/examples.md](references/examples.md)。

常用属性：`title`（必需）、`icon`、`menu`、`auth`、`keepAlive`、`activeMenu`、`breadcrumb`
