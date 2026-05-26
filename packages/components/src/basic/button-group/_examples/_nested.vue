<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaIcon from '../../icon/index.vue'
import FaButtonGroup from '../index.vue'
</script>

<template>
  <FaButtonGroup>
    <FaButtonGroup>
      <FaButton variant="outline">
        1
      </FaButton>
      <FaButton variant="outline">
        2
      </FaButton>
      <FaButton variant="outline">
        3
      </FaButton>
      <FaButton variant="outline">
        4
      </FaButton>
      <FaButton variant="outline">
        5
      </FaButton>
    </FaButtonGroup>
    <FaButtonGroup>
      <FaButton variant="outline" size="icon">
        <FaIcon name="i-ep:arrow-left" />
      </FaButton>
      <FaButton variant="outline" size="icon">
        <FaIcon name="i-ep:arrow-right" />
      </FaButton>
    </FaButtonGroup>
  </FaButtonGroup>
</template>
