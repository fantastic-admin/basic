# FaButtonGroup 按钮组

将多个按钮组合在一起的容器组件，支持水平/垂直排列和分割线。

## 基础用法

```vue
<template>
  <FaButtonGroup>
    <FaButton>
      <FaIcon name="i-mdi:eye" />
      查看详情
    </FaButton>
    <FaButton>
      <FaIcon name="i-mdi:pencil" />
      编辑
    </FaButton>
    <FaButton>
      <FaIcon name="i-mdi:delete" />
      删除
    </FaButton>
  </FaButtonGroup>
</template>
```

## 垂直排列

```vue
<template>
  <FaButtonGroup orientation="vertical">
    <FaButton>操作 1</FaButton>
    <FaButton>操作 2</FaButton>
    <FaButton>操作 3</FaButton>
  </FaButtonGroup>
</template>
```

## 带分割线

```vue
<template>
  <FaButtonGroup :separator="true">
    <FaButton variant="outline">复制</FaButton>
    <FaButton variant="outline">粘贴</FaButton>
    <FaButton variant="outline">剪切</FaButton>
  </FaButtonGroup>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| orientation | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| separator | 是否显示分割线 | `boolean` | `false` |
| class | 自定义类名 | `HTMLAttributes['class']` | `undefined` |

### Slots

| 名称 | 说明 |
|------|------|
| default | 默认插槽，放置 FaButton 组件 |

## 示例

### 工具栏按钮组

```vue
<template>
  <FaButtonGroup>
    <FaButton variant="ghost" size="icon">
      <FaIcon name="i-lucide:bold" />
    </FaButton>
    <FaButton variant="ghost" size="icon">
      <FaIcon name="i-lucide:italic" />
    </FaButton>
    <FaButton variant="ghost" size="icon">
      <FaIcon name="i-lucide:underline" />
    </FaButton>
  </FaButtonGroup>
</template>
```

### 垂直菜单

```vue
<template>
  <FaButtonGroup orientation="vertical" :separator="true" class="w-48">
    <FaButton variant="ghost" class="justify-start">
      <FaIcon name="i-heroicons:user" class="mr-2" />
      个人资料
    </FaButton>
    <FaButton variant="ghost" class="justify-start">
      <FaIcon name="i-heroicons:cog" class="mr-2" />
      账户设置
    </FaButton>
    <FaButton variant="ghost" class="justify-start">
      <FaIcon name="i-heroicons:shield-check" class="mr-2" />
      安全选项
    </FaButton>
  </FaButtonGroup>
</template>
```

### 与其他组件组合

```vue
<template>
  <FaButtonGroup>
    <FaSelect v-model="action" class="w-32">
      <FaSelectOption value="export">导出</FaSelectOption>
      <FaSelectOption value="import">导入</FaSelectOption>
    </FaSelect>
    <FaButton>执行</FaButton>
  </FaButtonGroup>
</template>
```

### 嵌套按钮组

```vue
<template>
  <FaButtonGroup>
    <FaButton>左侧</FaButton>
    <FaButtonGroup :separator="true">
      <FaButton>嵌套 1</FaButton>
      <FaButton>嵌套 2</FaButton>
    </FaButtonGroup>
    <FaButton>右侧</FaButton>
  </FaButtonGroup>
</template>
```
