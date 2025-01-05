<script setup lang="ts">
function upgrade() {
  window.open('https://fantastic-admin.hurui.me/buy.html', '_blank')
}
</script>

<template>
  <div class="flex-center p-4">
    <FaPopover align="end" side="right" class="min-w-auto p-0">
      <FaButton size="icon" variant="ghost" class="size-12">
        <FaIcon name="i-noto:crown" class="text-8 filter-grayscale" />
      </FaButton>
      <template #panel>
        <FaCard title="升级到专业版" description="解锁所有功能，享受极致体验" class="w-60 border-none">
          <FaButton size="sm" class="w-full" @click="upgrade">
            升级
          </FaButton>
        </FaCard>
      </template>
    </FaPopover>
  </div>
</template>
