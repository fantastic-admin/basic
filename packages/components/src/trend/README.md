# FaTrend 趋势标识组件

带箭头的趋势标识组件，用于展示数据上升/下降趋势，提供多种视觉风格。

## 使用场景

- 股票涨跌幅
- 销售数据趋势
- 网站流量变化
- 成本/费用变化
- 错误率变化
- 性能指标升降

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `string` | **必需** | 趋势值（百分比等） |
| `type` | `'up' \| 'down'` | `'up'` | 趋势类型 |
| `prefix` | `string` | `''` | 前缀 |
| `suffix` | `string` | `''` | 后缀 |
| `reverse` | `boolean` | `false` | 是否反转颜色含义 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸大小 |
| `variant` | `'default' \| 'filled' \| 'soft' \| 'outline'` | `'default'` | 视觉风格 |

## 示例

### 基础用法

```vue
<template>
  <FaTrend value="12.5%" type="up" />
</template>
```

### 不同风格

```vue
<template>
  <!-- 默认风格 -->
  <FaTrend value="12.5%" />
  
  <!-- 填充风格，带渐变背景和阴影 -->
  <FaTrend value="12.5%" variant="filled" />
  
  <!-- 柔和风格，带浅色背景 -->
  <FaTrend value="12.5%" variant="soft" />
  
  <!-- 边框风格 -->
  <FaTrend value="12.5%" variant="outline" />
</template>
```

### 尺寸对比

```vue
<template>
  <FaTrend value="12.5%" size="small" />
  <FaTrend value="12.5%" size="medium" />
  <FaTrend value="12.5%" size="large" />
</template>
```

### 带前后缀

```vue
<template>
  <FaTrend value="12.5" type="up" suffix="%" />
  <FaTrend value="¥1,234" type="up" prefix="↑ " />
  <FaTrend value="$2,345.00" prefix="$" suffix=".00" variant="filled" />
</template>
```

### 反转颜色含义

```vue
<!-- 用于下跌是好事的场景（如错误率、成本等） -->
<template>
  <!-- 错误率下降是好事，显示绿色 -->
  <FaTrend value="5.2%" type="down" reverse variant="filled" />
  
  <!-- 成本下降是好事，显示绿色 -->
  <FaTrend value="¥2,000" type="down" reverse prefix="节省 " variant="soft" />
</template>
```

### 数据卡片

```vue
<template>
  <div class="grid grid-cols-3 gap-4">
    <FaCard>
      <p class="text-sm text-muted-foreground">销售额</p>
      <p class="text-2xl font-bold">¥123,456</p>
      <FaTrend value="12.5%" type="up" variant="soft" />
    </FaCard>
    <FaCard>
      <p class="text-sm text-muted-foreground">访问量</p>
      <p class="text-2xl font-bold">45,678</p>
      <FaTrend value="8.3%" type="up" variant="filled" />
    </FaCard>
    <FaCard>
      <p class="text-sm text-muted-foreground">转化率</p>
      <p class="text-2xl font-bold">3.2%</p>
      <FaTrend value="2.1%" type="down" variant="outline" />
    </FaCard>
  </div>
</template>
```

### 表格趋势列

```vue
<script setup lang="ts">
const stocks = [
  { name: '股票 A', price: 123.45, change: 5.67, type: 'up' as const },
  { name: '股票 B', price: 87.65, change: -3.21, type: 'down' as const },
  { name: '股票 C', price: 54.32, change: 1.23, type: 'up' as const },
]
</script>

<template>
  <table class="w-full">
    <thead>
      <tr>
        <th>股票</th>
        <th>价格</th>
        <th>涨跌幅</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="stock in stocks" :key="stock.name">
        <td>{{ stock.name }}</td>
        <td>{{ stock.price }}</td>
        <td>
          <FaTrend :value="`${Math.abs(stock.change)}%`" :type="stock.type" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
```

### 成本下降（好事）

```vue
<script setup lang="ts">
const costData = {
  current: 8500,
  last: 10000,
  change: 15,
}
</script>

<template>
  <div>
    <p class="text-sm text-muted-foreground">本月成本</p>
    <p class="text-2xl font-bold">¥{{ costData.current.toLocaleString() }}</p>
    <!-- 成本下降是好事，使用 reverse -->
    <FaTrend value={`${costData.change}%`} type="down" reverse prefix="↓ 优化 " />
  </div>
</template>
```

### 组合使用

```vue
<template>
  <div class="flex items-center gap-4">
    <div>
      <span class="text-sm text-muted-foreground">较上周</span>
      <div class="flex items-center gap-2">
        <span class="text-lg font-medium">+1,234</span>
        <FaTrend value="12.5%" type="up" />
      </div>
    </div>
    <div>
      <span class="text-sm text-muted-foreground">环比</span>
      <div class="flex items-center gap-2">
        <span class="text-lg font-medium">+5.6%</span>
        <FaTrend value="5.6%" type="up" />
      </div>
    </div>
  </div>
</template>
```

## 注意事项

### 颜色规则

- **上升（up）**：
  - 默认：绿色（上涨是好事）
  - `reverse` 为 `true`：红色
- **下降（down）**：
  - 默认：红色（下降是坏事）
  - `reverse` 为 `true`：绿色

1. **颜色含义**：
   - 默认：绿色=上升，红色=下降
   - `reverse` 模式：绿色=下降，红色=上升
2. **使用场景**：
   - 销售、访问量等增长指标：使用默认模式
   - 成本、错误率等下降指标：使用 `reverse` 模式
3. **箭头方向**：自动根据 `type` 显示向上/向下箭头
