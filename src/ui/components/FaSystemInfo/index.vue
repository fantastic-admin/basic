<script setup lang="ts">
import hotkeys from 'hotkeys-js'

defineOptions({
  name: 'FaSystemInfo',
})

const isShow = ref(false)

const { pkg, lastBuildTime } = __SYSTEM_INFO__

onMounted(() => {
  hotkeys('command+i, ctrl+i', () => {
    isShow.value = true
  })
})
</script>

<template>
  <FaDrawer v-model="isShow" title="系统信息" :footer="false">
    <div v-if="pkg.version">
      <FaDivider>
        系统信息
      </FaDivider>
      <div class="text-center text-lg font-bold font-sans">
        {{ pkg.version }}
      </div>
    </div>
    <div>
      <FaDivider>
        最后编译时间
      </FaDivider>
      <div class="text-center text-lg font-bold font-sans">
        {{ lastBuildTime }}
      </div>
    </div>
    <div>
      <FaDivider>
        生产环境依赖
      </FaDivider>
      <ul class="list-none text-sm">
        <li v-for="(val, key) in (pkg.dependencies as object)" :key="key" class="flex items-center justify-between rounded-lg px-2 py-1.5 hover-bg-secondary">
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
      <ul class="list-none text-sm">
        <li v-for="(val, key) in (pkg.devDependencies as object)" :key="key" class="flex items-center justify-between rounded-lg px-2 py-1.5 hover-bg-secondary">
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
