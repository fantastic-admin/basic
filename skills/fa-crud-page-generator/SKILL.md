---
name: fa-crud-page-generator
description: "为 Fantastic-admin 框架生成完整的 CRUD 业务模块，遵循框架标准模块结构和内建 Fa* 组件体系，产出列表页、详情/编辑页、DetailForm 表单组件、API 模块、fake mock 数据、可选路由。用户说：'帮我做一个商品管理页面'、'搭一个用户列表，能搜索分页新增编辑删除'、'生成订单模块'、'新建 XX 管理模块'、'快速搭一个标准模块/CRUD 页面' 时，即使没有明确说 CRUD，也应触发此技能。"
---

# CRUD 页面生成器

在 Fantastic-admin 框架中生成标准 CRUD 业务模块。生成时遵循框架当前标准模块结构：
列表页、独立详情页、`DetailForm` 表单组件、API 模块、fake mock、可选路由
要一次性配套生成。

优先复刻框架现有写法，而不是重新发明页面结构：列表页用 `FaSearchBar` + `FaTable` +
`FaPagination`，详情表单抽成 `components/DetailForm/index.vue`，独立详情页用
`FaFixedBar` 固定顶部标题和底部提交区。

**生成文件清单：**
- `apps/<app>/src/views/{path}/{module}/list.vue` — 列表页
- `apps/<app>/src/views/{path}/{module}/detail.vue` — 独立详情页，仅 `router` 模式需要
- `apps/<app>/src/views/{path}/{module}/components/DetailForm/index.vue` — 新增/编辑表单
- `apps/<app>/src/api/modules/{fileName}.ts` — API 模块
- `apps/<app>/src/api/fake_modules/{fileName}.fake.ts` — fake mock 数据，可选
- `apps/<app>/src/router/modules/{routeFileName}.ts` — 前端路由，可选

---

## 先确认应用

本项目是 pnpm monorepo。开始写文件前先确认目标应用：

1. 如果用户已经明确写了 `apps/<app>`、`admin 应用`、`pro 应用` 等目标应用，直接使用该应用。
2. 如果没有明确目标应用，先执行 `ls apps/` 查看可用应用，然后询问用户要生成到哪个应用，并等待回复。
3. 后续所有路径都以 `apps/<app>/src/` 为根。

不要默认猜测应用；生成到错误应用的返工成本很高。

---

## 信息收集

尽量一次性收集会影响文件结构的信息：

- **模块名**：英文，用于目录、API 文件和路由，如 `product`、`order`、`systemUser`
- **模块中文名**：用于标题和提示，如 `商品`、`订单`、`用户`
- **存放路径**：位于 `src/views/` 下的子路径，如 `mall`、`system/user`，可为空
- **字段清单**：字段名、中文标签、类型、是否列表显示、是否搜索、是否表单显示、是否必填
- **详情展示模式**：`router`、`modal`、`drawer`，默认 `router`
- **是否启用批量删除**：默认启用
- **是否支持列表高度自适应**：默认生成 `tableAutoHeight` 代码
- **是否生成 fake mock**：开发阶段默认推荐生成
- **是否生成路由**：仅当前端路由由本地配置维护时生成

如果用户只给出模块名和很少字段，使用一个最小可运行字段：
`title`（标题，`string`，列表/搜索/表单显示，必填），并在完成后提醒用户继续替换业务字段。

---

## 命名规范

给定模块名 `name` 和路径 `path`（相对于 `apps/<app>/src/views/`）：

| 用途 | 规则 | 示例（path 为空，name=product） |
|------|------|----------------------------------------|
| 视图目录 | `src/views/{path}/{snake_case(name)}/` | `src/views/product/` |
| API 文件名 | path 参与业务命名时使用 camelCase；普通模块用 `camelCase(name)` | `product` |
| fake 文件名 | 与 API 文件名一致，放到 `src/api/fake_modules/` | `product.fake.ts` |
| 列表组件名 | `PascalCase({path}-{name}-list)` | `ProductList` |
| 详情组件名 | `PascalCase({path}-{name}-detail)` | `ProductDetail` |
| 路由 name | `camelCase(name)List` / `camelCase(name)Detail` | `productList` |
| API URL 前缀 | `snake_case(path/name)`，无前导斜杠 | `product` |

`snake_case` 用下划线连接多个单词，如 `productCategory` -> `product_category`。

---

## 代码生成规则

详细模板见 [references/templates.md](references/templates.md)。生成时按这些规则填充模板：

- `list.vue` 使用 `<script setup lang="ts">`，导入 `type { TableColumn } from '@fantastic-admin/components'`。
- 表格列使用 `computed<TableColumn<Item>[]>(...)` 定义，页面模板使用 `FaTable` 的 `:columns` 与 `#cell-xxx` 插槽。
- 搜索区使用 `FaSearchBar` + `FaLabel`，按钮保持“重置 / 筛选 / 展开收起”的顺序。
- 工具栏通过 `FaTable` 的 `#toolbar` 插槽放“新增”和批量操作。
- 行操作用 `FaButton size="icon-sm"` 编辑按钮和 `FaDropdown` 删除菜单。
- 删除确认统一使用 `useFaModal().confirm`，提示成功统一使用 `useFaToast().success`。
- `router` 模式在列表页通过 `eventBus.on('get-data-list')` 接收详情页提交后的刷新事件；卸载时 `eventBus.off('get-data-list')`。
- `modal` / `drawer` 模式通过 `useFaModal().create` 或 `useFaDrawer().create` 渲染 `DetailForm`，confirm 时调用表单暴露的 `submit()`，成功后刷新列表并关闭。
- `DetailForm` 使用 Element Plus `FormInstance` / `FormRules`，通过 `useTemplateRef<FormInstance>('formRef')` 获取表单引用，并 `defineExpose({ submit() { ... } })` 给外部调用。
- fake mock 文件放在 `apps/<app>/src/api/fake_modules/`，不是 `api/modules/`。
- API 模块开启 mock 时在每个请求配置中设置 `fake: true`；不生成 fake 时去掉 `fake: true`。

---

## 路由生成

如果用户选择生成路由，优先调用或参考 `fa-route-generator`，并遵循最新标准模块路由模式：

- 父级路由指向 `Layout`，`meta.title` 使用 `$t('route.<module>.root')`，设置合适图标。
- 列表子路由 `path: ''`，`name: '<module>List'`，组件指向 `list.vue`。
- 当父级路由只作为菜单入口、列表页作为默认子页时，列表路由使用 `meta.menu: false` 和 `breadcrumb: false`；业务模块如需列表作为独立菜单项，可按用户需求保留菜单。
- `router` 模式详情路由为 `detail/:id?`，`meta.menu: false`，`activeMenu` 指向列表/父菜单路径。
- 为避免列表和详情标签页状态混乱，列表路由设置 `keepAlive: '<module>Detail'`，详情路由设置 `keepAlive: true` 与 `noKeepAlive: '<module>List'`。

---

## 生成前后检查

写文件前展示将生成/修改的文件列表，确认不会覆盖用户已有业务文件。若目标文件已存在，先读取并说明将如何合并。

完成后简要说明：
- 已生成哪些文件；
- 若未生成路由，提示可继续用 `fa-route-generator` 添加；
- 若生成 fake mock，说明请求已配置 `fake: true`；
- 若字段是枚举、状态、日期、上传等复杂类型，提醒用户按业务替换控件和 mock 取值。

不要修改 `packages/components/` 内建组件；确实需要改内建组件时先征得用户确认。
