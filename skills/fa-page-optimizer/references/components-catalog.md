# Fantastic Admin 内建组件目录

本文档列出所有可用的框架内建组件及其使用场景。组件位于 `packages/components/src/`。

> **提示**: 每个组件目录下都有 `README.md` 使用文档，包含完整的 API 说明 (Props/Slots/Events/Methods) 和示例代码。
> 查阅方式：`Read: packages/components/src/<component-name>/README.md`

## 基础组件

### FaButton
**用途**: 按钮组件，支持多种样式和状态
**变体**: default, destructive, outline, secondary, ghost, link
**特性**: loading 状态、disabled 状态

### FaBadge
**用途**: 徽章标签，用于状态标识和分类

### FaIcon
**用途**: 图标组件，基于 [iconify](https://icon-sets.iconify.design/)
**示例**: <FaIcon name="i-mdi:home" />

### FaKbd / FaKbdGroup
**用途**: 键盘按键显示组件

### FaLabel
**用途**: 表单标签组件

## 布局组件

### FaCard
**用途**: 卡片容器，支持标题、描述、内容、底部插槽
**特性**: title, description, footer slot

### FaDivider
**用途**: 分割线组件

### FaLayoutContainer
**用途**: 布局容器组件

### FaPageHeader
**用途**: 页面头部组件

### FaPageMain
**用途**: 页面主体容器

### FaScrollArea
**用途**: 滚动区域容器

### FaScrollingText
**用途**: 滚动文字特效

## 表单组件

### FaInput
**用途**: 输入框组件，支持 v-model
**特性**: placeholder, disabled 等标准输入属性

### FaTextarea
**用途**: 多行文本输入

### FaCheckbox
**用途**: 复选框组件

### FaSwitch
**用途**: 开关切换组件

### FaSelect
**用途**: 下拉选择组件

### FaSlider
**用途**: 滑块组件

### FaNumberField
**用途**: 数字输入组件

### FaInputOTP
**用途**: OTP 验证码输入组件

### FaPasswordStrength
**用途**: 密码强度显示组件

### FaFileUpload
**用途**: 文件上传组件

### FaImageUpload
**用途**: 图片上传组件

### FaIconPicker
**用途**: 图标选择器

### FaSearchBar
**用途**: 搜索栏组件

### FaCascader
**用途**: 级联选择组件，支持多级树形数据选择

## 交互组件

### FaModal
**用途**: 模态对话框，支持拖拽、最大化等功能
**特性**: maximizable, closable, draggable, alignCenter, loading, before-close
**API**: useFaModal() 用于编程式调用

### FaDrawer
**用途**: 抽屉组件

### FaDropdown
**用途**: 下拉菜单

### FaContextMenu
**用途**: 右键上下文菜单

### FaPopover
**用途**: 弹出框组件

### FaTooltip
**用途**: 工具提示

### FaHoverCard
**用途**: 悬停卡片

### FaCollapsible
**用途**: 可折叠容器

## 反馈组件

### FaToast
**用途**: 轻提示组件

### FaLoading
**用途**: 加载状态组件

### FaProgress
**用途**: 进度条组件

### FaEmpty
**用途**: 空状态组件

## 数据展示组件

### FaTabs
**用途**: 标签页组件

### FaTimeline
**用途**: 时间轴组件

### FaTree
**用途**: 树形组件

### FaPagination
**用途**: 分页组件
**特性**: page, size, total

### FaAvatar
**用途**: 头像组件

### FaCarousel
**用途**: 轮播图组件

### FaImagePreview
**用途**: 图片预览组件

## 数据可视化组件

### FaSparkline
**用途**: 迷你图表组件

### FaTrend
**用途**: 趋势指示器

### FaCountTo
**用途**: 数字动画组件

### FaAnimatedCountTo
**用途**: 动画数字组件

### FaAnimatedCountToGroup
**用途**: 动画数字组组件

## 特效组件

### FaBorderBeam
**用途**: 边框光束特效

### FaGlowyCard / FaGlowyCardWrapper
**用途**: 发光卡片特效

### FaSpotlightCard
**用途**: 聚光灯卡片特效

### FaParticlesBg
**用途**: 粒子背景特效

### FaPatternBg
**用途**: 图案背景

### FaBlurReveal
**用途**: 模糊揭示特效

### FaAnimatedBeam
**用途**: 动画光束特效

### FaFlipCard
**用途**: 翻转卡片

### FaFlipWords
**用途**: 翻转文字特效

### FaSparklesText
**用途**: 闪光文字特效

### FaTextHighlight
**用途**: 文字高亮特效

### FaMarquee
**用途**: 跑马灯组件

### FaSmoothSwipe
**用途**: 平滑滑动组件

## 高级组件

### FaButtonGroup
**用途**: 按钮组组件

### FaGradientButton
**用途**: 渐变按钮

### FaInteractiveButton
**用途**: 交互式按钮

### FaDigitalCard
**用途**: 数字卡片

### FaMultiStepLoader
**用途**: 多步骤加载器

### FaLinkPreview
**用途**: 链接预览组件

### FaTimeAgo
**用途**: 相对时间显示

### FaCode
**用途**: 代码展示组件

### FaCodePreview
**用途**: 代码预览组件

### FaQrcode
**用途**: 二维码生成组件

### FaStorageBox
**用途**: 存储盒组件

### FaScratchOff
**用途**: 刮刮卡组件

### FaBackToTop
**用途**: 返回顶部按钮

### FaFixedBar
**用途**: 固定栏组件

## 组件选择指南

### 替换原生 HTML 元素

| 原生元素 | 推荐组件 | 说明 |
|---------|---------|------|
| `<button>` | `FaButton` | 统一的按钮样式和状态管理 |
| `<input>` | `FaInput` | 统一的输入框样式 |
| `<textarea>` | `FaTextarea` | 统一的多行输入样式 |
| `<select>` | `FaSelect` | 更好的下拉选择体验 |
| `<div class="card">` | `FaCard` | 标准化的卡片布局 |
| `<hr>` | `FaDivider` | 统一的分割线样式 |
| `<img>` (头像) | `FaAvatar` | 头像专用组件 |
| `<span class="badge">` | `FaBadge` | 统一的徽章样式 |

### 替换常见功能实现

| 功能 | 推荐组件 | 说明 |
|------|---------|------|
| 模态对话框 | `FaModal` | 替代自定义 modal 实现 |
| 分页逻辑 | `FaPagination` | 替代自定义分页组件 |
| 加载状态 | `FaLoading` | 替代自定义 loading 动画 |
| 空状态提示 | `FaEmpty` | 替代自定义空状态页面 |
| 消息提示 | `FaToast` | 替代 alert 或自定义提示 |
| 标签页切换 | `FaTabs` | 替代自定义 tab 实现 |
| 树形数据 | `FaTree` | 替代自定义树形组件 |
| 图片预览 | `FaImagePreview` | 替代自定义图片查看器 |
| 搜索框 | `FaSearchBar` | 替代普通 input + 搜索逻辑 |
| 级联选择 | `FaCascader` | 替代自定义多级联动下拉选择 |
