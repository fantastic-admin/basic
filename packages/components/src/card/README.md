# FaCard 卡片组件

基础卡片容器组件，支持标题、描述、内容和页脚区域。

## 基础用法

```vue
<template>
  <FaCard title="卡片标题" description="卡片描述">
    卡片内容
  </FaCard>
</template>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 卡片标题 |
| `description` | `string` | - | 卡片描述 |
| `class` | `HTMLAttributes['class']` | - | 卡片容器 CSS 类 |
| `headerClass` | `HTMLAttributes['class']` | - | 卡片头部 CSS 类 |
| `contentClass` | `HTMLAttributes['class']` | - | 卡片内容 CSS 类 |
| `footerClass` | `HTMLAttributes['class']` | - | 卡片页脚 CSS 类 |

## Slots

| 名称 | 说明 |
|------|------|
| `header` | 卡片头部（会覆盖 `title` 和 `description`） |
| `default` | 卡片内容 |
| `footer` | 卡片页脚 |

## Events

无

## 示例

### 基础卡片

```vue
<template>
  <FaCard title="标题" description="描述信息">
    <p>这是卡片的内容区域。</p>
  </FaCard>
</template>
```

### 仅标题

```vue
<template>
  <FaCard title="卡片标题">
    <p>只有标题的卡片内容。</p>
  </FaCard>
</template>
```

### 自定义头部

```vue
<template>
  <FaCard>
    <template #header>
      <div class="flex items-center gap-2">
        <FaIcon name="i-lucide:user" />
        <span>用户信息</span>
      </div>
    </template>
    <p>卡片内容...</p>
  </FaCard>
</template>
```

### 带页脚

```vue
<template>
  <FaCard title="操作卡片">
    <p>卡片内容...</p>
    <template #footer>
      <div class="flex justify-end gap-2">
        <FaButton variant="outline">取消</FaButton>
        <FaButton>确定</FaButton>
      </div>
    </template>
  </FaCard>
</template>
```

### 完整卡片

```vue
<template>
  <FaCard 
    title="用户信息" 
    description="用户的基本信息"
    class="w-96"
  >
    <div class="space-y-2">
      <p><strong>姓名：</strong>张三</p>
      <p><strong>邮箱：</strong>zhangsan@example.com</p>
      <p><strong>手机：</strong>13800138000</p>
    </div>
    <template #footer>
      <FaButton variant="outline" class="w-full">查看详情</FaButton>
    </template>
  </FaCard>
</template>
```

### 自定义样式

```vue
<template>
  <FaCard 
    title="自定义样式"
    header-class="bg-primary text-primary-foreground"
    content-class="p-6"
    footer-class="border-t bg-muted"
  >
    <p>自定义样式的卡片内容。</p>
  </FaCard>
</template>
```

## 注意事项

1. **区域显示**：只有提供对应内容（props 或 slots）的区域才会显示
2. **slot 优先**：如果提供了 `header` slot，会覆盖 `title` 和 `description` props
3. **结构组成**：卡片由 CardHeader、CardContent、CardFooter 三部分组成
4. **响应式**：卡片宽度自适应父容器，可通过 `class` 设置固定宽度

## 典型使用场景

- 信息展示卡片
- 表单容器
- 数据统计卡片
- 列表项容器
- 对话框内容区
