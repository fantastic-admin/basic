<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <FaPageHeader title="卡片" description="FaCard" />
    <FaPageMain>
      <div class="flex gap-4">
        <FaCard title="卡片标题" description="卡片描述" class="w-80">
          卡片内容
          <template #footer>
            卡片底部
          </template>
        </FaCard>
      </div>
    </FaPageMain>
  </div>
</template>
