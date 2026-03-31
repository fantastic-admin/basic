<script setup lang="ts">
import eventBus from '@/utils/eventBus'

defineOptions({
  name: 'AppSystemInfo',
})

const isShow = ref(false)

const { pkg, lastBuildTime } = __SYSTEM_INFO__

onMounted(() => {
  eventBus.on('global-system-info-open', () => {
    isShow.value = true
  })
})

onUnmounted(() => {
  eventBus.off('global-system-info-open')
})
</script>

<template>
  <FaDrawer v-model="isShow" title="系统信息" :footer="false">
    <div v-if="pkg.version">
      <FaDivider>
        版本号
      </FaDivider>
      <div class="text-lg font-bold font-sans text-center">
        {{ pkg.version }}
      </div>
    </div>
    <div>
      <FaDivider>
        最后编译时间
      </FaDivider>
      <div class="text-lg font-bold font-sans text-center">
        {{ lastBuildTime }}
      </div>
    </div>
    <div>
      <FaDivider>
        生产环境依赖
      </FaDivider>
      <ul class="text-sm list-none">
        <li v-for="(val, key) in (pkg.dependencies as object)" :key="key" class="px-2 py-1.5 rounded-lg flex items-center justify-between hover-bg-secondary">
          <div class="font-bold">
            {{ key }}
          </div>
          <div class="font-sans">
            {{ val }}
          </div>
        </li>
      </ul>
    </div>
    <div>
      <FaDivider>
        开发环境依赖
      </FaDivider>
      <ul class="text-sm list-none">
        <li v-for="(val, key) in (pkg.devDependencies as object)" :key="key" class="px-2 py-1.5 rounded-lg flex items-center justify-between hover-bg-secondary">
          <div class="font-bold">
            {{ key }}
          </div>
          <div class="font-sans">
            {{ val }}
          </div>
        </li>
      </ul>
    </div>
  </FaDrawer>
</template>
