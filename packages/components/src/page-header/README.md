# FaPageHeader 页面头部组件

页面级标题组件，支持标题、描述和右侧操作区。

## 基础用法

```vue
<template>
  <FaPageHeader title="页面标题" description="页面描述" />
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 页面标题 |
| `description` | `string` | - | 页面描述 |
| `class` | `HTMLAttributes['class']` | - | 容器 CSS 类 |
| `mainClass` | `HTMLAttributes['class']` | - | 主内容区（标题+描述）CSS 类 |
| `defaultClass` | `HTMLAttributes['class']` | - | 右侧操作区 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `title` | 自定义标题内容 |
| `description` | 自定义描述内容 |
| `default` | 右侧操作区内容（按钮等） |

## Events

无

## 示例

### 基础标题

```vue
<template>
  <FaPageHeader title="用户管理" />
</template>
```

### 标题加描述

```vue
<template>
  <FaPageHeader 
    title="用户管理" 
    description="管理系统用户信息和权限"
  />
</template>
```

### 自定义标题

```vue
<template>
  <FaPageHeader>
    <template #title>
      <span class="flex items-center gap-2">
        <FaIcon name="i-lucide:user" />
        用户管理
      </span>
    </template>
  </FaPageHeader>
</template>
```

### 带操作按钮

```vue
<template>
  <FaPageHeader title="用户管理" description="管理系统用户">
    <FaButton>
      <FaIcon name="i-lucide:plus" />
      新增用户
    </FaButton>
  </FaPageHeader>
</template>
```

### 多个操作按钮

```vue
<template>
  <FaPageHeader title="数据报表">
    <div class="flex gap-2">
      <FaButton variant="outline">
        <FaIcon name="i-lucide:download" />
        导出
      </FaButton>
      <FaButton>
        <FaIcon name="i-lucide:refresh-cw" />
        刷新
      </FaButton>
    </div>
  </FaPageHeader>
</template>
```

### 自定义样式

```vue
<template>
  <FaPageHeader 
    title="自定义样式"
    class="bg-primary text-primary-foreground"
    main-class="text-center"
  >
    <template #description>
      <span class="opacity-70">自定义描述的样式</span>
    </template>
  </FaPageHeader>
</template>
```

## 注意事项

1. **响应式布局**：标题区在左侧，操作区在右侧，小屏幕时会自动换行
2. **自动隐藏**：操作区没有内容时会自动隐藏
3. **描述为空**：description 为空字符串时不会显示描述区域
4. **典型位置**：通常放在 `FaPageMain` 组件上方使用

## 典型使用场景

- 列表页面头部
- 详情页面标题
- 表单页面头部
- 仪表盘页面标题
- 设置页面头部
