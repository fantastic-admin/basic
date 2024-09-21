<script setup lang="ts">
import eventBus from '@/utils/eventBus'

const isShow = ref(false)

const { pkg, lastBuildTime } = __SYSTEM_INFO__

onMounted(() => {
  eventBus.on('global-system-info-toggle', () => {
    isShow.value = !isShow.value
  })
})
</script>

<template>
  <HSlideover v-model="isShow" title="系统信息">
    <div v-if="pkg.version" class="px-4">
      <h2 class="m-0 text-lg font-bold">
        版本号
      </h2>
      <div class="my-4 text-center text-lg font-sans">
        {{ pkg.version }}
      </div>
    </div>
    <div class="px-4">
      <h2 class="m-0 text-lg font-bold">
        最后编译时间
      </h2>
      <div class="my-4 text-center text-lg font-sans">
        {{ lastBuildTime }}
      </div>
    </div>
    <div class="px-4">
      <h2 class="m-0 text-lg font-bold">
        生产环境依赖
      </h2>
      <ul class="list-none pl-0 text-sm">
        <li v-for="(val, key) in (pkg.dependencies as object)" :key="key" class="flex items-center justify-between rounded px-2 py-1.5 hover-bg-stone-1 dark-hover-bg-stone-9">
          <div class="font-bold">
            {{ key }}
          </div>
          <div class="font-sans">
            {{ val }}
          </div>
        </li>
      </ul>
    </div>
    <div class="px-4">
      <h2 class="m-0 text-lg font-bold">
        开发环境依赖
      </h2>
      <ul class="list-none pl-0 text-sm">
        <li v-for="(val, key) in (pkg.devDependencies as object)" :key="key" class="flex items-center justify-between rounded px-2 py-1.5 hover-bg-stone-1 dark-hover-bg-stone-9">
          <div class="font-bold">
            {{ key }}
          </div>
          <div class="font-sans">
            {{ val }}
          </div>
        </li>
      </ul>
    </div>
  </HSlideover>
</template>
