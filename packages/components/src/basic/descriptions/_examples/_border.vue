<script setup lang="ts">
// 组件实际使用时无需手动导入，框架会自动导入
import FaDescriptions from '../index.vue'

const items = [
  { label: 'Username', value: 'kooriokami' },
  { label: 'Telephone', value: '18100000000' },
  { label: 'Place', value: 'Suzhou' },
  { label: 'Remarks', value: 'School' },
  { label: 'Address', value: 'No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province', span: 2 },
]
</script>

<template>
  <FaDescriptions :items="items" border label-width="120px" />
</template>
