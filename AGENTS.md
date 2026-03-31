# Fantastic-admin

## 项目概述

Fantastic-admin 是一个基于 Vue 3 的后台管理框架。

## 技术栈

- **框架**: Vue 3.6 + TypeScript + Vite 8
- **UI 组件**: Element Plus（默认，可替换） + Reka UI + UnoCSS（原子化 CSS）
- **状态管理**: Pinia + pinia-plugin-persistedstate
- **路由**: Vue Router 5
- **包管理器**: pnpm（必须使用 pnpm，禁止使用 npm/yarn）
- **HTTP**: Axios
- **Mock**: vite-plugin-fake-server

## 目录结构

采用 pnpm monorepo 架构：

```
├── apps/
│   └── <app>/                # 应用
│       └── src/
│           ├── api/          # API 请求模块
│           ├── assets/       # 静态资源
│           ├── components/   # 全局业务组件
│           ├── composables/  # 组合式函数
│           ├── layouts/      # 布局组件
│           ├── router/       # 路由配置
│           ├── slots/        # 插槽组件
│           ├── store/        # Pinia store
│           ├── types/        # TypeScript 类型定义
│           ├── ui/           # 框架内建 UI 组件（本地）
│           ├── utils/        # 工具函数
│           └── views/        # 页面视图
├── packages/
│   ├── components/           # 框架内建 UI 组件库（子包，跨应用共享）
│   ├── settings/             # 框架设置（子包，跨应用共享）
│   └── themes/               # 主题配置（子包，跨应用共享）
├── scripts/                  # 工程脚本
└── pnpm-workspace.yaml       # monorepo workspace 配置
```

## 常用命令

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建
pnpm lint         # 运行全量 lint（tsc + eslint + stylelint）
```

## 开发规范

- 使用 `<script setup lang="ts">` 语法
- 样式优先使用 UnoCSS 原子类，复杂样式用 SCSS
- 组件命名使用 PascalCase，文件名与组件名一致
- API 模块放在 `apps/<app>/src/api/modules/`，按业务模块拆分
- Store 模块放在 `apps/<app>/src/store/modules/`，使用 Pinia composition API 风格
- 路由配置在 `apps/<app>/src/router/`，meta 属性可借助 fa-route-generator skill

## 注意事项

- 框架内建组件在 `packages/components/` 子包中，优先使用内建组件而非第三方组件或自定义实现
- 在任何情况下都请勿直接修改内建组件，确定修改前需要和用户进行确认
- Mock 数据使用 `vite-plugin-fake-server`，文件放在 `apps/<app>/src/api/modules/` 对应模块旁
- 代码提交前会自动运行 lint-staged，确保代码符合规范
- Node.js 版本要求以根目录下 `package.json` 中定义的为准

## 反复修改检测

在使用任何 fa-* 系列技能时，如果用户针对同一功能点已经要求修改 3 次及以上仍未达到预期（例如连续说"不对"、"再改改"、"还是不行"），必须触发 fa-feedback 技能，询问用户是否将问题反馈给框架作者。
