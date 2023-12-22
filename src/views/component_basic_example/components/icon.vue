<script setup lang="ts">
import { icons } from '@/iconify'

const icon = icons.filter(item => item.prefix === 'ep')[0]
</script>

<template>
  <div>
    <div class="demo">
      <SvgIcon name="ep:edit" />
      <SvgIcon name="ep:share" />
      <SvgIcon name="ep:delete" />
      <ElButton type="primary">
        <template #icon>
          <SvgIcon name="ep:search" />
        </template>
        搜索
      </ElButton>
    </div>
    <ElDivider content-position="left">
      图标集合
    </ElDivider>
    <div v-for="(item, index) in icon.icons" :key="index" class="list-icon">
      <ElTooltip class="item" effect="dark" :content="`ep:${item}`" placement="top">
        <SvgIcon :name="`ep:${item}`" />
      </ElTooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo {
  > i {
    margin: 0 20px;
    font-size: 1.5em;
    color: #606266;
    vertical-align: middle;
  }

  button {
    margin: 0 20px;
  }
}

.list-icon {
  display: inline-block;
  margin: 10px;

  i {
    font-size: 32px;
    color: #606266;
  }
}
</style>
