<template>
  <div class="space-y-4">
    <FaAlert
      icon="i-lucide:info"
      title="普通提示"
      description="数据已同步完成，可以继续后续操作。"
    />
    <FaAlert
      icon="i-lucide:circle-alert"
      title="危险提示"
      description="删除后数据将无法恢复，请谨慎操作。"
      variant="destructive"
    />
  </div>
</template>
