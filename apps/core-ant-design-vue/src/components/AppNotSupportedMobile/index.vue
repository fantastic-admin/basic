<script setup lang="ts">
defineOptions({
  name: 'AppNotSupportedMobile',
})
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex h-[5vh] lg:h-[10vh]">
      <div class="w-[5vh] lg:w-[10vh]" />
      <div class="border-inline border-dashed flex-1" />
      <div class="w-[5vh] lg:w-[10vh]" />
    </div>
    <div class="border-block border-dashed flex flex-1">
      <div class="w-[5vh] lg:w-[10vh]" />
      <div class="border-inline border-dashed flex-center flex-1 relative">
        <div class="p-4 flex-col-center gap-4 lg:p-12">
          <h1 class="text-6xl font-bold m-0 lg:text-9xl">
            <FaIcon name="i-tdesign:mobile-blocked-filled" />
          </h1>
          <div class="text-xl text-secondary-foreground/50 mx-0 text-center">
            抱歉，本网站不支持移动设备访问，请切换到桌面设备
          </div>
        </div>
      </div>
      <div class="w-[5vh] lg:w-[10vh]" />
    </div>
    <div class="flex h-[5vh] lg:h-[10vh]">
      <div class="w-[5vh] lg:w-[10vh]" />
      <div class="border-inline border-dashed flex-1" />
      <div class="w-[5vh] lg:w-[10vh]" />
    </div>
  </div>
</template>
