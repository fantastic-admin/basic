<script setup lang="ts">
function upgrade() {
  window.open('https://fantastic-admin.hurui.me/buy.html', '_blank')
}
</script>

<template>
  <div class="flex-center">
    <FaPopover align="end" side="right" class="p-0 min-w-auto">
      <FaButton size="icon" variant="ghost" class="size-12">
        <FaIcon name="i-noto:crown" class="text-8 filter-grayscale" />
      </FaButton>
      <template #panel>
        <FaCard title="升级到专业版" description="解锁全部功能，享受极致体验" class="border-none w-60">
          <FaButton size="sm" class="w-full" @click="upgrade">
            升级
          </FaButton>
        </FaCard>
      </template>
    </FaPopover>
  </div>
</template>
