<template>
  <div class="space-y-4">
    <div>
      <p class="text-sm text-muted-foreground mb-2">
        Reverse 模式（用于成本、错误率等下降是好事的场景）
      </p>
      <div class="flex gap-2 items-center">
        <FaTrend value="错误率 -12.3%" type="down" reverse variant="filled" />
        <FaTrend value="成本节省 15%" type="down" reverse variant="soft" prefix="↓" />
      </div>
    </div>
    <div>
      <p class="text-sm text-muted-foreground mb-2">
        不同风格对比
      </p>
      <div class="flex flex-wrap gap-2 items-center">
        <FaTrend value="12.3%" reverse />
        <FaTrend value="12.3%" reverse variant="filled" />
        <FaTrend value="12.3%" reverse variant="soft" />
        <FaTrend value="12.3%" reverse variant="outline" />
      </div>
    </div>
  </div>
</template>
