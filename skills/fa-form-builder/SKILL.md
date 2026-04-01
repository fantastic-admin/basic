---
name: fa-form-builder
description: "为 Fantastic-admin 框架生成独立的表单页面，使用 vee-validate + zod 验证，全部使用框架内建 Fa* 组件。当用户说：'帮我做一个用户信息填写页'、'我只需要一个提交表单，不需要列表'、'做个设置页面，有几个输入框和保存按钮'、'生成一个注册/编辑/配置表单页'、'只要表单页，不需要增删改查'，即使用户只是说'做个表单页面'也应触发此技能。"
---

# 表单页面生成器

在 Fantastic-admin 框架中生成独立的 Router 表单页面，使用 vee-validate + zod 完成表单验证，全部使用框架内建 Fa* 组件，不引入任何 Element Plus 组件。

**生成的文件：**
- `apps/<app>/src/views/{path}/{name}/index.vue` — 表单页面（含验证、提交骨架、固定操作栏）

---

## 第一步：确认工作区（必须阻塞等待用户回复）

本项目是 monorepo 架构，`apps/` 目录下存放各应用。**在执行任何文件读写操作之前**，必须先确认目标应用：

1. 执行 `ls apps/` 列出所有可用应用
2. **立即向用户提问**，明确询问要在哪个应用中生成表单页面，并**停止等待回复**
3. 收到用户明确回复后，才能继续后续步骤

> **严格规则**：如果用户没有在请求中明确说明目标应用（例如"在 example 应用中"、"apps/core"），则必须提问，不得自行猜测或默认选择任何应用。

确认后，后续所有文件路径均以该应用目录为根。

---

## 工作流程

### Step 1：收集基本信息

向用户询问（可合并为一次提问）：

1. **模块名**（英文，用于文件路径，如 `user`、`profile`、`setting`）
2. **模块中文名**（用于页面标题，如 `用户信息`、`个人资料`）
3. **存放路径**（在 `apps/<app>/src/views/` 下的子目录，如 `system`、`account`，留空则直接放在 `src/views/` 下）

### Step 2：收集字段信息

询问用户该表单有哪些字段，每个字段需要：
- **字段名**（英文，如 `name`、`avatar`、`status`）
- **中文标签**（如 `姓名`、`头像`、`状态`）
- **字段类型**（见 references/templates.md 中的字段类型映射表）
- **是否必填**

如果用户没有提供字段信息，使用默认字段 `title`（标题，string，必填）作为示例占位，并在生成后提示用户替换。

### Step 3：判断布局

字段较多时单列会导致页面过长，双列更紧凑。根据字段数量和复杂度判断是否询问用户布局偏好：

- **单列**：`max-w-600px`，`space-y-6`（字段少、字段较长时适合）
- **双列**：`max-w-1200px`，`grid grid-cols-1 gap-x-8 gap-y-6 items-start md:grid-cols-2`（字段多、字段较短时适合）

### Step 4：确认并生成

汇总信息，展示将要生成的文件，确认后写入。

生成完成后提示：如需配置路由，请使用 `fa-route-generator` 技能；如需 API 模块，请手动创建。

---

## 命名规范

给定模块名 `name` 和路径 `path`（相对于 `apps/<app>/src/views/`）：

| 用途 | 规则 | 示例（path=system, name=user） |
|------|------|-------------------------------|
| 视图目录 | `apps/<app>/src/views/{path}/{name}/` | `apps/<app>/src/views/system/user/` |
| 组件名 | `PascalCase({path}-{name}-form)` | `SystemUserForm` |

---

## 代码模板

详细的代码模板和字段类型映射表见 [references/templates.md](references/templates.md)。

生成代码时替换模板中的占位符：
- `{cname}` → 模块中文名
- `{componentName}` → PascalCase 组件名
- `{zodSchema}` → zod 字段定义（每个必填字段对应一行 zod 规则）
- `{initialValues}` → 字段初始值（string 默认 `''`，boolean 默认 `false`，number 默认 `0`，array 默认 `[]`）
- `{formItems}` → 各字段对应的 FormField 代码片段
- `{maxWidth}` → 单列 `max-w-600px` / 双列 `max-w-1200px`
- `{gridClass}` → 双列时 `grid grid-cols-1 gap-x-8 gap-y-6 items-start md:grid-cols-2` / 单列时 `space-y-6`

生成的代码是骨架：API 调用处用 `// TODO:` 注释标记，动态数据源（select options、upload action 等）用占位注释标记，用户根据实际接口替换。操作栏按钮使用 `FaButton`：取消用 `variant="outline"`，提交用默认 variant 并传 `:loading="isSubmitting"`。
