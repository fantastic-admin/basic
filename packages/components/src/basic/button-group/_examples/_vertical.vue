<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaIcon from '../../icon/index.vue'
import FaButtonGroup from '../index.vue'
</script>

<template>
  <FaButtonGroup orientation="vertical">
    <FaButton>
      <FaIcon name="i-mdi:eye" class="size-4" />
      查看详情
    </FaButton>
    <FaButton>
      <FaIcon name="i-mdi:pencil" class="size-4" />
      编辑
    </FaButton>
    <FaButton>
      <FaIcon name="i-mdi:delete" class="size-4" />
      删除
    </FaButton>
  </FaButtonGroup>
</template>
