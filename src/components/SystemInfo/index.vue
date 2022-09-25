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
  <div>
    <el-drawer v-model="isShow" title="系统信息" direction="rtl" :size="360">
      <el-descriptions direction="vertical" :column="1" border>
        <el-descriptions-item label="版本号" align="center">
          {{ pkg.version }}
        </el-descriptions-item>
        <el-descriptions-item label="最后编译时间" align="center">
          {{ lastBuildTime }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions title="生产环境依赖" :column="1" size="small" border>
        <el-descriptions-item v-for="(val, key) in (pkg.dependencies as object)" :key="key" :label="key">
          {{ val }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions title="开发环境依赖" :column="1" size="small" border>
        <el-descriptions-item v-for="(val, key) in (pkg.devDependencies as object)" :key="key" :label="key">
          {{ val }}
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-drawer__header) {
  margin-bottom: initial;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--el-border-color);
  transition: var(--el-transition-border);
}

:deep(.el-descriptions) {
  margin-bottom: 20px;
}
</style>
