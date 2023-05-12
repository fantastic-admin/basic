<script setup lang="ts">
import { icons } from '@iconify-json/ep'
</script>

<template>
  <div>
    <div class="demo">
      <el-icon><svg-icon name="ep:edit" /></el-icon>
      <el-icon><svg-icon name="ep:share" /></el-icon>
      <el-icon><svg-icon name="ep:delete" /></el-icon>
      <el-button type="primary">
        <template #icon>
          <el-icon>
            <svg-icon name="ep:search" />
          </el-icon>
        </template>
        搜索
      </el-button>
    </div>
    <el-divider content-position="left">
      图标集合
    </el-divider>
    <div v-for="(item, index) in icons.icons" :key="index" class="list-icon">
      <el-tooltip class="item" effect="dark" :content="`ep:${index}`" placement="top">
        <el-icon>
          <svg-icon :name="`ep:${index}`" />
        </el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo {
  > .el-icon {
    color: #606266;
    margin: 0 20px;
    font-size: 1.5em;
    vertical-align: middle;
  }

  button {
    margin: 0 20px;
  }
}

.list-icon {
  display: inline-block;
  margin: 10px;

  .el-icon {
    font-size: 32px;
    color: #606266;
  }
}
</style>
