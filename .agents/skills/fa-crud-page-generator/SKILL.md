---
name: fa-crud-page-generator
description: "为 Fantastic-admin 框架生成完整的 CRUD 业务模块，包含列表页、详情/编辑页、表单组件、API 模块和 Mock 数据。当用户说：'帮我做一个商品管理页面'、'搭一个用户列表，能搜索、能分页、能新增编辑删除'、'生成一个订单模块'、'我需要一个带增删改查的页面'、'快速搭一个管理页面骨架'，即使用户只是说'新建一个 XX 管理模块'也应触发此技能。"
---

# CRUD 页面生成器

在 Fantastic-admin 框架中生成完整的 CRUD 业务模块，一次性生成所有相关文件，让开发者专注于业务逻辑而非重复代码。

**生成的文件清单：**
- `apps/<app>/src/views/{path}/{name}/list.vue` — 列表页（搜索栏 + 表格 + 分页）
- `apps/<app>/src/views/{path}/{name}/detail.vue` — 详情/编辑页（仅 router 模式需要）
- `apps/<app>/src/views/{path}/{name}/components/DetailForm/index.vue` — 表单组件
- `apps/<app>/src/api/modules/{fileName}.ts` — API 模块
- `apps/<app>/src/api/modules/{fileName}.fake.ts` — Mock 数据（可选）

---

## 第一步：确认工作区（必须阻塞等待用户回复）

本项目是 monorepo 架构，`apps/` 目录下存放各应用。**在执行任何文件读写操作之前**，必须先确认目标应用：

1. 执行 `ls apps/` 列出所有可用应用
2. **立即向用户提问**，明确询问要在哪个应用中生成 CRUD 模块，并**停止等待回复**
3. 收到用户明确回复后，才能继续后续步骤

> **严格规则**：如果用户没有在请求中明确说明目标应用（例如"在 example 应用中"、"apps/core"），则必须提问，不得自行猜测或默认选择任何应用。

确认后，后续所有文件路径均以该应用目录为根。

---

## 工作流程

### Step 1：收集基本信息

向用户询问以下内容（可合并为一次提问）：

1. **模块名**（英文，用于文件名和路由，如 `user`、`product`、`order`）
2. **模块中文名**（用于页面标题和提示文字，如 `用户`、`商品`、`订单`）
3. **存放路径**（在 `apps/<app>/src/views/` 下的子目录，如 `system`、`mall/product`，留空则直接放在 `src/views/` 下）

### Step 2：收集字段信息

询问用户该模块有哪些字段，每个字段需要：
- **字段名**（英文，如 `name`、`status`、`createdAt`）
- **中文标签**（如 `姓名`、`状态`、`创建时间`）
- **字段类型**（`string` | `number` | `boolean` | `date`）
- **是否在列表中显示**
- **是否在搜索栏中显示**
- **是否在表单中显示**（新增/编辑）
- **是否必填**（表单验证）

如果用户没有提供字段信息，使用默认字段 `title`（标题，string，必填）作为示例占位，并在生成后提示用户替换。

### Step 3：收集功能选项

以下三个选项会直接影响生成的文件结构，需要在同一轮提问中一起确认，避免后续重复生成：

4. **详情展示模式**：
   - `router` — 跳转到独立的详情页（默认，适合复杂表单）
   - `modal` — 弹窗（适合简单表单）
   - `drawer` — 抽屉（适合中等复杂度表单）
5. **是否生成 Mock 数据**（是/否，开发阶段推荐开启）
6. **是否同时生成路由配置**（是/否，仅 `app.routeBaseOn` 为 `frontend` 时有效；选是时需额外询问归属的主导航分组名称）

### Step 4：确认并生成

汇总信息，展示将要生成的文件列表，确认后写入文件。

---

## 命名规范

给定模块名 `name` 和路径 `path`（相对于 `apps/<app>/src/views/`）：

| 用途 | 规则 | 示例（path=system, name=user） |
|------|------|-------------------------------|
| 视图目录 | `apps/<app>/src/views/{path}/{snakeCase(name)}/` | `apps/<app>/src/views/system/user/` |
| API 文件名 | path 非空时：`{camelCase(path)}_{camelCase(name)}`；path 为空时：`{camelCase(name)}` | `systemUser` |
| 组件名 | `PascalCase({path}-{name}-list/detail)` | `SystemUserList` |
| API URL 前缀 | `/{path}/{snakeCase(name)}/` | `/system/user/` |

**snakeCase 规则**：多个单词用下划线连接，如 `productCategory` → `product_category`

---

## 代码模板

详细的代码模板见 [references/templates.md](references/templates.md)，其中也包含 faker.js 字段类型映射表。

生成代码时，根据用户提供的字段信息替换模板中的占位符：
- 列表页的 `ElTableColumn` 根据"列表显示"字段生成
- 搜索栏的 `ElFormItem` 根据"搜索显示"字段生成
- 表单组件的 `ElFormItem` 根据"表单显示"字段生成
- API 模块的 TypeScript 类型根据字段定义生成
- Mock 数据根据字段类型使用合适的 faker.js 方法生成（见 templates.md 中的映射表）

---

## 路由生成（可选）

如果用户选择同时生成路由，先读取 `apps/<app>/src/settings.ts` 确认 `app.routeBaseOn === 'frontend'`，然后使用 `fa-route-generator` 技能生成对应路由配置：
- **router 模式**：生成列表路由 + 详情路由（详情路由带 `menu: false` 和 `activeMenu` 指向列表）
- **modal/drawer 模式**：只生成列表路由

---

## 生成后提示用户

文件生成完成后简要告知：如果未生成路由，可用 `fa-route-generator` 技能添加；生成了 `.fake.ts` 则 API 请求会自动走 mock；表单字段类型（Select、DatePicker 等）需根据业务自行替换。
