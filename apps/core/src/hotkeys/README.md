# Hotkeys 设计说明

这个目录参考 `fantastic-admin/v6-dev/apps/example/src/hotkeys` 的设计，目标是把当前项目里分散在各组件中的快捷键逻辑收拢成一套轻量方案。

## 设计目标

当前方案只解决 4 件事：

1. 快捷键定义不要散落在多个组件里重复写
2. 快捷键帮助面板不要再手写一份展示文案
3. 业务组件不要反复手写 `hotkeys()` / `unbind()`
4. 不引入过重的 command system

所以采用：

- `registry.ts` 统一定义
- `useHotkeys.ts` 统一注册
- 业务 handler 仍留在业务组件

这是一种“集中定义 + 就地执行”的轻量折中方案。

## 目录职责

### `registry.ts`

统一维护当前项目的快捷键元数据：

- id
- keys
- enabled
- help

这里负责：

- 统一的 id 常量
- 真实键位
- 是否启用的条件
- 帮助面板展示文案
- 聚合业务扩展

> 注意：这里不放业务逻辑 handler。

### `registry.extend.ts`

用于放置项目自定义扩展快捷键，避免把业务项全部堆进内建定义中。

### `types.ts`

定义快捷键系统的基础类型，包括：

- `HotkeyBinding`
- `HotkeyContext`
- `HotkeyHelpMeta`
- `HotkeyHandler`

### `useHotkeys.ts`

对 `hotkeys-js` 的薄封装，提供：

- `useHotkey`：注册单个快捷键
- `useHotkeyBindings`：批量注册快捷键

并统一处理：

- 注册 / 卸载
- `active` 启停
- `binding.enabled` 可用性判断
- 默认 `preventDefault`

## 当前项目已落地的快捷键

### 全局

- `system.info.open`
- `menuSearch.open`
- `page.reload`

### 主导航

- `menu.next`
- `menu.prev`

### 标签栏

- `tabbar.prev`
- `tabbar.next`
- `tabbar.closeCurrent`
- `tabbar.gotoVisibleIndex`
- `tabbar.gotoLast`

### 菜单搜索弹窗

- `menuSearch.moveUp`
- `menuSearch.moveDown`
- `menuSearch.confirm`
- `menuSearch.close`

## 使用约定

1. 新增快捷键，优先在 `registry.ts` 或 `registry.extend.ts` 补定义
2. 展示在帮助面板中的快捷键，必须配置 `help`
3. handler 尽量保留在最了解业务的组件中
4. 不直接在业务组件里继续散写 `hotkeys('xxx')`

## 现阶段差异

参考项目里还有页面最大化相关快捷键；当前项目暂未引入对应页面最大化能力，所以本次迁移只保留当前项目已有功能，并把原有 `F5` 页面刷新也纳入统一 registry 管理。
