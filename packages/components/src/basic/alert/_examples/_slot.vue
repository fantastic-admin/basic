<script lang="ts" setup>
// 组件实际使用时无需手动导入，框架会自动导入
import FaButton from '../../button/index.vue'
import FaAlert from '../index.vue'
</script>

<template>
  <FaAlert icon="i-lucide:terminal" title="命令执行完成">
    <template #description>
      <div>
        已成功生成文件，可继续进行下一步操作。
        <FaButton variant="link" class="px-0 h-auto">
          查看详情
        </FaButton>
      </div>
    </template>
  </FaAlert>
</template>
