# FaPageMain 页面主内容区

页面主内容容器组件，支持标题和可折叠的内容区域。

## 使用场景

- 表单内容容器
- 详情信息展示
- 数据列表容器
- 可折叠的信息区块
- 页面分节容器

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | `''` | 内容区标题 |
| `collaspe` | `boolean` | `false` | 是否可折叠 |
| `height` | `string` | `''` | 折叠后的高度 |
| `class` | `HTMLAttributes['class']` | - | 容器 CSS 类 |
| `titleClass` | `HTMLAttributes['class']` | - | 标题区 CSS 类 |
| `mainClass` | `HTMLAttributes['class']` | - | 主内容区 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `title` | 自定义标题内容 |
| `default` | 主内容 |

## 示例

### 基础用法

```vue
<template>
  <FaPageMain title="内容标题">
    页面主内容
  </FaPageMain>
</template>
```

### 基础内容区

```vue
<template>
  <FaPageMain>
    <p>这是页面的主要内容区域。</p>
  </FaPageMain>
</template>
```

### 带标题

```vue
<template>
  <FaPageMain title="基本信息">
    <p>用户的基本信息内容。</p>
  </FaPageMain>
</template>
```

### 可折叠内容区

```vue
<template>
  <FaPageMain title="详细信息" :collaspe="true">
    <div class="space-y-4">
      <p>详细内容 1...</p>
      <p>详细内容 2...</p>
      <p>详细内容 3...</p>
    </div>
  </FaPageMain>
</template>
```

### 自定义折叠高度

```vue
<template>
  <FaPageMain title="日志信息" :collaspe="true" height="200px">
    <div class="space-y-2">
      <p v-for="i in 20" :key="i">日志条目 {{ i }}</p>
    </div>
  </FaPageMain>
</template>
```

### 自定义标题

```vue
<template>
  <FaPageMain>
    <template #title>
      <div class="flex items-center gap-2">
        <FaIcon name="i-lucide:info" />
        系统信息
      </div>
    </template>
    <p>系统信息内容...</p>
  </FaPageMain>
</template>
```

### 与 FaPageHeader 配合使用

```vue
<template>
  <FaPageHeader title="用户管理" description="管理系统用户信息" />
  <FaPageMain title="用户列表">
    <!-- 用户列表内容 -->
  </FaPageMain>
</template>
```

### 多个内容区

```vue
<template>
  <FaPageMain title="基本信息" :collaspe="true">
    <p>基本信息内容...</p>
  </FaPageMain>
  <FaPageMain title="扩展信息" :collaspe="true">
    <p>扩展信息内容...</p>
  </FaPageMain>
  <FaPageMain title="备注信息" :collaspe="true">
    <p>备注信息内容...</p>
  </FaPageMain>
</template>
```

## 注意事项

1. **折叠功能**：设置 `collaspe` 为 `true` 后，内容区可以折叠，折叠后会显示渐变遮罩
2. **折叠按钮**：鼠标悬停时会在底部显示展开/收起按钮
3. **高度设置**：`height` 属性仅在 `collaspe` 为 `true` 时生效
4. **典型搭配**：通常与 `FaPageHeader` 配合使用，构成完整的页面布局
