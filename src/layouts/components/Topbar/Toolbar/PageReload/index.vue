<script setup lang="ts">
defineOptions({
  name: 'PageReload',
})

const mainPage = useMainPage()
</script>

<template>
  <span class="flex-center cursor-pointer px-2 py-1" @click="mainPage.reload()">
    <SvgIcon name="i-iconoir:refresh-double" />
  </span>
</template>
