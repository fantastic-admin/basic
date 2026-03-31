<template>
  <div class="space-y-4">
    <div>
      <p class="text-sm text-muted-foreground mb-2">
        前缀和后缀
      </p>
      <div class="flex flex-wrap gap-2 items-center">
        <FaTrend value="12.3" prefix="$" variant="soft" />
        <FaTrend value="12.3" suffix="%" variant="soft" />
        <FaTrend value="1,234" prefix="¥" variant="outline" />
        <FaTrend value="45.6" suffix="kg" variant="outline" />
      </div>
    </div>
    <div>
      <p class="text-sm text-muted-foreground mb-2">
        组合使用
      </p>
      <div class="flex flex-wrap gap-2 items-center">
        <FaTrend value="2,345" prefix="$" suffix=".00" variant="filled" />
        <FaTrend value="98.5" suffix="%" variant="filled" />
        <FaTrend value="+123" prefix="↑" variant="soft" />
        <FaTrend value="-45" prefix="↓" variant="soft" type="down" />
      </div>
    </div>
  </div>
</template>
